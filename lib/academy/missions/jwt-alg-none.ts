// Mission M-020 — "The JWT library defaults to alg:none. Every session is forgeable."
//
// Track: Auth & Identity
// Scenario: Hodlberg AG's API server uses a popular JWT library. A researcher
// discovered that the library accepts tokens with algorithm "none" — no signature
// required. Anyone can craft an admin token by base64-encoding {"alg":"none"}
// as the header and setting {"sub":"admin","role":"admin"} as the payload.
//
// Pedagogy:
//   - The alg:none attack: JWT spec allows "none" as algorithm (no signature needed)
//   - Why "accept any alg from the token header" is the bug (not the spec)
//   - Fix 1: Explicitly whitelist the algorithm on verification (RS256 / ES256)
//   - Fix 2: Never use HS256 in stateless tokens unless secret is strong + rotated
//   - Fix 3: Validate "iss" + "aud" + "exp" claims always
//   - Fix 4: Use short-lived tokens (15 min) + refresh token rotation

import type { CommandResult, Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, red, resolvePath, yellow } from "../missionEngine"

const VULN_VERIFY_CODE = `// VULNERABLE — accepts alg from the token header
function verifyToken(token) {
  const decoded = jwt.decode(token, { complete: true })
  const alg = decoded.header.alg          // <-- attacker controls this!
  return jwt.verify(token, SECRET, { algorithms: [alg] })
}

// Attack: craft a token with alg:"none"
// Header:  {"alg":"none","typ":"JWT"}
// Payload: {"sub":"1337","role":"admin","exp":9999999999}
// Signature: (empty — not needed)
// Result: verifyToken(maliciousToken) SUCCEEDS with role:admin
`

const SECURE_VERIFY_CODE = `// SECURE — algorithm pinned server-side
const ALLOWED_ALGORITHMS = ['RS256']    // or 'ES256' — never 'none' or 'HS256' with weak secret

function verifyToken(token) {
  return jwt.verify(token, PUBLIC_KEY, {
    algorithms: ALLOWED_ALGORITHMS,  // ← whitelist, not from token header
    issuer:     'https://auth.hodlberg.io',
    audience:   'https://api.hodlberg.io',
  })
  // jwt.verify throws if: alg mismatch, bad signature, expired, wrong iss/aud
}
`

const ATTACK_SCRIPT = `#!/usr/bin/env python3
# Proof-of-concept: forge an admin JWT with alg:none

import base64, json

def b64url(data):
    return base64.urlsafe_b64encode(json.dumps(data).encode()).rstrip(b'=').decode()

header  = {"alg": "none", "typ": "JWT"}
payload = {"sub": "1337", "role": "admin", "exp": 9999999999, "iss": "attacker"}

forged = f"{b64url(header)}.{b64url(payload)}."   # empty signature
print(f"Forged token: {forged}")
# This token PASSES jwt.verify() on vulnerable servers
`

const README = `Mission M-020 — JWT alg:none Attack Defense
=============================================

VULNERABILITY
  The API's JWT verification reads the algorithm from the token header itself.
  An attacker can set alg:"none" in the header → no signature required.
  The verify() call succeeds with any payload (e.g. role:"admin").

  CVE class: CWE-327 / JWT "algorithm confusion attack"
  Risk: Complete authentication bypass, privilege escalation.

OBJECTIVES
  1. Read the vulnerable verify code — understand the flaw
  2. Forge a token with alg:none to confirm the vulnerability
  3. Pin the algorithm server-side (only RS256 accepted)
  4. Add issuer + audience validation
  5. Set token expiry to 15 minutes
  6. Run the test suite — all auth bypass attempts must fail

COMMANDS
  cat verify.js          see the vulnerable code
  cat attack.py          see the PoC attack script
  attack forge           simulate the alg:none attack on vulnerable server
  fix alg-pin            pin allowed algorithms to RS256
  fix claims             add iss + aud + exp validation
  fix expiry             reduce token lifetime to 15 min
  test auth              run authentication test suite
  show diff              show before/after code diff
`

const initialState: MissionState = {
  cwd: "/app/auth",
  fs: {
    "/app/auth/README":        { content: README,             mode: "ro" },
    "/app/auth/verify.js":     { content: VULN_VERIFY_CODE,   mode: "rw" },
    "/app/auth/secure.js":     { content: SECURE_VERIFY_CODE, mode: "ro" },
    "/app/auth/attack.py":     { content: ATTACK_SCRIPT,      mode: "ro" },
  },
  env: {
    VULN_READ:    "no",
    ALG_PINNED:   "no",
    CLAIMS_FIXED: "no",
    EXPIRY_FIXED: "no",
    TESTS_PASS:   "no",
  },
  goalsMet: [],
  history: [],
}

export const jwtAlgNoneMission: Mission = {
  slug: "jwt-alg-none",
  title: "Defend against the JWT alg:none attack — pin algorithm, validate claims",
  brief: "The JWT library trusts the algorithm from the token header. Attacker sets alg:none → forges any role. Pin RS256 server-side, validate iss/aud/exp, cut token lifetime to 15 min.",
  prompt: "dev@hodlberg-api:/app/auth$ ",
  welcome:
    bold(red("╭──────────────────────────────────────────────────────────╮")) + "\r\n" +
    bold(red("│ ")) + bold("MISSION M-020 — JWT ALG:NONE ATTACK DEFENSE") + bold(red("           │")) + "\r\n" +
    bold(red("╰──────────────────────────────────────────────────────────╯")) + "\r\n\r\n" +
    yellow("Critical bug: ") + "JWT verification trusts the algorithm from the token header.\r\n" +
    dim("Inspect: ") + cyan("cat verify.js") + dim("  ·  PoC attack: ") + cyan("cat attack.py") + "\r\n",
  goals: [
    { id: "read",    label: "Read and understand the vulnerable verification code",     hint: "cat verify.js" },
    { id: "forge",   label: "Confirm vulnerability: forge an admin token with alg:none",hint: "attack forge" },
    { id: "algpin",  label: "Pin allowed algorithms to RS256 (remove dynamic alg)",     hint: "fix alg-pin" },
    { id: "claims",  label: "Add issuer + audience claim validation",                   hint: "fix claims" },
    { id: "expiry",  label: "Reduce token lifetime to 15 minutes",                      hint: "fix expiry" },
    { id: "tests",   label: "Run test suite — all bypass attempts must fail",            hint: "test auth" },
  ],
  success:
    gold("╭──────────────────────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — JWT ALGORITHM CONFUSION PATCHED      │") + "\r\n" +
    gold("╰──────────────────────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+200") + dim("   alg:none attack impossible. RS256 pinned. Claims validated. 15min TTL.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n" +
      "  " + cyan("cat <file>") + "       inspect file (verify.js | secure.js | attack.py | README)\r\n" +
      "  " + cyan("attack forge") + "     simulate alg:none attack\r\n" +
      "  " + cyan("fix alg-pin") + "      pin algorithm to RS256\r\n" +
      "  " + cyan("fix claims") + "       add iss + aud validation\r\n" +
      "  " + cyan("fix expiry") + "       reduce token lifetime to 15 min\r\n" +
      "  " + cyan("test auth") + "        run auth test suite\r\n" +
      "  " + cyan("show diff") + "        before/after code diff\r\n" +
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
      if (normalized.endsWith("verify.js") && env.VULN_READ === "no") {
        env.VULN_READ = "yes"
        return { stdout: f.content, statePatch: { env }, goalMet: "read" }
      }
      return { stdout: f.content }
    },
    attack: ({ state, args }): CommandResult => {
      if (args[0] !== "forge") return { stderr: "attack: usage: attack forge" }
      const env = { ...state.env }
      if (env.ALG_PINNED === "yes") {
        return {
          stdout:
            green("Attack BLOCKED:") + "\r\n" +
            dim("  jwt.verify() rejected token: algorithm 'none' not in whitelist ['RS256'].") + "\r\n" +
            green("  ✓ alg-pin fix is effective."),
        }
      }
      return {
        stdout:
          red("VULNERABLE:") + "\r\n" +
          dim("  Forged token: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMzM3Iiwicm9sZSI6ImFkbWluIn0.") + "\r\n" +
          red("  jwt.verify() returned: { sub: '1337', role: 'admin' }") + "\r\n" +
          red("  Authentication BYPASSED — attacker has admin role.") + "\r\n" +
          yellow("  Run: fix alg-pin"),
        statePatch: { env: { ...env, VULN_READ: "yes" } },
        goalMet: state.env.VULN_READ === "yes" ? "forge" : undefined,
      }
    },
    fix: ({ state, args }): CommandResult => {
      const env = { ...state.env }
      if (args[0] === "alg-pin") {
        if (env.ALG_PINNED === "yes") return { stdout: yellow("Algorithm pinning already applied.") }
        env.ALG_PINNED = "yes"
        return {
          stdout:
            green("✓ Algorithm pinned to RS256.") + "\r\n" +
            dim("  const ALLOWED_ALGORITHMS = ['RS256']") + "\r\n" +
            dim("  jwt.verify(token, PUBLIC_KEY, { algorithms: ALLOWED_ALGORITHMS })") + "\r\n" +
            dim("  The algorithm comes from your server config — not the token header.") + "\r\n" +
            yellow("  Next: validate iss + aud claims (fix claims)."),
          statePatch: { env },
          goalMet: "algpin",
        }
      }
      if (args[0] === "claims") {
        if (env.CLAIMS_FIXED === "yes") return { stdout: yellow("Claim validation already added.") }
        if (env.ALG_PINNED !== "yes") return { stderr: red("Pin the algorithm first (fix alg-pin), then add claim validation.") }
        env.CLAIMS_FIXED = "yes"
        return {
          stdout:
            green("✓ Issuer + audience validation added:") + "\r\n" +
            dim("  issuer:   'https://auth.hodlberg.io'") + "\r\n" +
            dim("  audience: 'https://api.hodlberg.io'") + "\r\n" +
            dim("  Tokens from other issuers are now rejected even if the signature is valid.") + "\r\n" +
            yellow("  Next: reduce token lifetime (fix expiry)."),
          statePatch: { env },
          goalMet: "claims",
        }
      }
      if (args[0] === "expiry") {
        if (env.EXPIRY_FIXED === "yes") return { stdout: yellow("Token expiry already set.") }
        env.EXPIRY_FIXED = "yes"
        return {
          stdout:
            green("✓ Token lifetime reduced to 15 minutes (expiresIn: '15m').") + "\r\n" +
            dim("  Short-lived access tokens limit the damage window if a token is stolen.") + "\r\n" +
            dim("  Use refresh tokens (HttpOnly cookie, server-side rotation) for session continuity."),
          statePatch: { env },
          goalMet: "expiry",
        }
      }
      return { stderr: `fix: unknown target '${args[0]}'. Use: alg-pin | claims | expiry` }
    },
    test: ({ state, args }): CommandResult => {
      if (args[0] !== "auth") return { stderr: "test: usage: test auth" }
      const env = { ...state.env }
      const { ALG_PINNED, CLAIMS_FIXED, EXPIRY_FIXED } = state.env
      const results = [
        { name: "alg:none token rejected",          ok: ALG_PINNED === "yes" },
        { name: "alg:HS256 with RS256 key rejected", ok: ALG_PINNED === "yes" },
        { name: "Wrong issuer rejected",             ok: CLAIMS_FIXED === "yes" },
        { name: "Wrong audience rejected",           ok: CLAIMS_FIXED === "yes" },
        { name: "Expired token rejected",            ok: EXPIRY_FIXED === "yes" },
        { name: "Valid RS256 token accepted",        ok: ALG_PINNED === "yes" },
      ]
      const allPass = results.every((r) => r.ok)
      const lines = results.map((r) => (r.ok ? green("  ✓ ") + r.name : red("  ✗ ") + r.name))
      if (allPass) env.TESTS_PASS = "yes"
      return {
        stdout:
          bold("JWT Auth Test Suite") + "\r\n" + lines.join("\r\n") + "\r\n" +
          (allPass
            ? green("All tests PASS — authentication bypass impossible.")
            : yellow("Some tests FAIL — apply remaining fixes.")),
        statePatch: { env },
        goalMet: allPass ? "tests" : undefined,
      }
    },
    show: ({ state, args }): CommandResult => {
      if (args[0] !== "diff") return { stderr: "show: usage: show diff" }
      return {
        stdout:
          red("- // BEFORE: alg from token header") + "\r\n" +
          red("- const alg = decoded.header.alg") + "\r\n" +
          red("- return jwt.verify(token, SECRET, { algorithms: [alg] })") + "\r\n\r\n" +
          green("+ // AFTER: algorithm pinned server-side") + "\r\n" +
          green("+ const ALLOWED_ALGORITHMS = ['RS256']") + "\r\n" +
          green("+ return jwt.verify(token, PUBLIC_KEY, { algorithms: ALLOWED_ALGORITHMS, issuer: '...', audience: '...' })"),
      }
    },
    hint: ({ state }) => {
      const r = jwtAlgNoneMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({
      stdout: bold("Goals") + "\r\n" + jwtAlgNoneMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n"),
    }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
