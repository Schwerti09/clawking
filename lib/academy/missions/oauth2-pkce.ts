// Mission M-022 — "OAuth2 PKCE: secure public client authorization flow"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const AUTH_CONFIG_INITIAL = `# /app/auth-config.json — insecure implicit flow
{
  "clientId": "clawguru-mobile-app",
  "authUrl": "https://auth.hodlberg.ag/oauth/authorize",
  "tokenUrl": "https://auth.hodlberg.ag/oauth/token",
  "responseType": "token",
  "redirectUri": "clawguru://auth/callback",
  "scopes": ["read", "write"]
}
`

const README = `Mission M-022 — OAuth2 PKCE
==============================

BRIEF
  Your mobile app uses OAuth2 implicit flow (responseType: token). This
  is deprecated and vulnerable to token leakage. Migrate to PKCE
  (Proof Key for Code Exchange) for secure public client auth.

OBJECTIVES
  1. Inspect the auth config
  2. Change responseType to 'code'
  3. Generate code verifier (SHA-256)
  4. Generate code challenge
  5. Add code_challenge to auth request
  6. Add code_verifier to token request
  7. Test the flow

HINTS
  cat auth-config.json
  patch response-type
  patch code-verifier
  patch code-challenge
  test flow
`

const initialState: MissionState = {
  cwd: "/app",
  fs: {
    "/app/README": { content: README, mode: "ro" },
    "/app/auth-config.json": { content: AUTH_CONFIG_INITIAL, mode: "rw" },
  },
  env: { RESPONSE_TYPE: "token", CODE_VERIFIER: "no", CODE_CHALLENGE: "no", FLOW_OK: "no" },
  goalsMet: [],
  history: [],
}

export const oauth2PkceMission: Mission = {
  slug: "oauth2-pkce",
  title: "OAuth2 PKCE: secure public client authorization flow",
  brief: "Your mobile app uses deprecated implicit flow. Migrate to PKCE: responseType=code, code_verifier, code_challenge (SHA-256).",
  prompt: "defender@hodlberg-mobile:/app$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-022 — OAUTH2 PKCE") + bold(cyan("               │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "clawguru-mobile-app · OAuth2 · Public Client\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "inspect", label: "Inspect the auth config", hint: "cat auth-config.json" },
    { id: "response", label: "Change responseType to 'code'", hint: "patch response-type" },
    { id: "verifier", label: "Generate code verifier", hint: "patch code-verifier" },
    { id: "challenge", label: "Generate code challenge", hint: "patch code-challenge" },
    { id: "test", label: "Test the flow", hint: "test flow" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — PKCE SECURED      │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+230") + dim("   OAuth2 PKCE flow: code_verifier (SHA-256), code_challenge, secure token exchange.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("patch response-type | code-verifier | code-challenge") + "\r\n" +
      "  " + cyan("test flow") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/app/README"] : undefined) ?? (args[0] === "auth-config.json" ? state.fs["/app/auth-config.json"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/app/auth-config.json" ? "inspect" : undefined }
    },
    patch: ({ state, args }) => {
      const p = "/app/auth-config.json"
      let c = state.fs[p]?.content ?? ""
      if (args[0] === "response-type") {
        if (/"responseType": "code"/m.test(c)) return { stdout: yellow("already patched"), goalMet: "response" }
        c = c.replace('"responseType": "token"', '"responseType": "code"')
        return { stdout: green("Changed responseType to 'code'"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, RESPONSE_TYPE: "code" } }, goalMet: "response" }
      }
      if (args[0] === "code-verifier") {
        if (/"codeVerifier"/m.test(c)) return { stdout: yellow("already patched"), goalMet: "verifier" }
        const verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
        c = c.replace('"scopes": ["read", "write"]', `"codeVerifier": "${verifier}",\n  "codeMethod": "S256",\n  "scopes": ["read", "write"]`)
        return { stdout: green("Generated code verifier (SHA-256)"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, CODE_VERIFIER: "yes" } }, goalMet: "verifier" }
      }
      if (args[0] === "code-challenge") {
        if (/"codeChallenge"/m.test(c)) return { stdout: yellow("already patched"), goalMet: "challenge" }
        const challenge = "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
        c = c.replace('"codeMethod": "S256"', `"codeChallenge": "${challenge}",\n  "codeMethod": "S256"`)
        return { stdout: green("Generated code challenge (base64url SHA-256)"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, CODE_CHALLENGE: "yes" } }, goalMet: "challenge" }
      }
      return { stderr: "patch: unknown. Try 'patch response-type' / 'patch code-verifier' / 'patch code-challenge'" }
    },
    test: ({ state, args }) => {
      if (args[0] !== "flow") return { stderr: "test: only 'test flow' supported" }
      if (state.env.RESPONSE_TYPE !== "code") return { stderr: "test: failed — responseType still 'token'" }
      if (state.env.CODE_VERIFIER !== "yes") return { stderr: "test: failed — code_verifier missing" }
      if (state.env.CODE_CHALLENGE !== "yes") return { stderr: "test: failed — code_challenge missing" }
      return {
        stdout: green("✓ Authorization request sent with code_challenge\n✓ Authorization code received\n✓ Token exchange with code_verifier successful\n✓ Access token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."),
        statePatch: { env: { ...state.env, FLOW_OK: "yes" } },
        goalMet: "test",
      }
    },
    hint: ({ state }) => {
      const r = oauth2PkceMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + oauth2PkceMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
