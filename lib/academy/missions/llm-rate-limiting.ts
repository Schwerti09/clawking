// Mission M-033 — "LLM endpoint: 0 rate limits, 0 auth, $47,000 OpenAI bill in 4 hours."
//
// Track: AI Agent Security (advanced)
// Scenario: The Sentinel AI API endpoint (/api/ai/chat) has no rate limiting,
// no token budget, and no cost circuit-breaker. An automated script sent
// 8,000 requests in 4 hours using max_tokens=4096 on GPT-4.
// The bill: $47,000. Add rate limiting, per-user token budgets, and a circuit breaker.
//
// Pedagogy:
//   - LLM APIs are expensive at scale — cost DoS is a real attack vector
//   - Rate limiting per IP + per authenticated user
//   - Token budget: per-user daily limit (free tier: 50k tokens, pro: 500k)
//   - Request-level: max_tokens cap (never let callers set their own)
//   - Circuit breaker: if spend exceeds daily budget, pause all LLM calls
//   - Abuse detection: log anomalous request patterns (same prompt, rapid fire)

import type { CommandResult, Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, red, resolvePath, yellow } from "../missionEngine"

const VULN_ROUTE = `// VULNERABLE — /app/api/ai/chat/route.ts
// No auth, no rate limiting, no token budget

export async function POST(req: Request) {
  const { message, max_tokens } = await req.json()
  // Bug 1: user can set max_tokens = 128000 (fills entire context window)
  // Bug 2: no auth — anonymous callers can use the endpoint
  // Bug 3: no rate limiting — 8,000 req/4h from one IP = $47k bill
  // Bug 4: no circuit breaker — even when daily budget exceeded, requests continue

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: message }],
    max_tokens: max_tokens ?? 4096,   // caller controls token count
  })
  return Response.json({ reply: response.choices[0].message.content })
}
`

const SECURE_ROUTE = `// SECURE — /app/api/ai/chat/route.ts

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { verifySession } from '@/lib/auth'

const rl = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '1 m'),   // 20 req/min per IP
})

const MAX_TOKENS_CAP  = 1024       // server-side cap — callers cannot override
const FREE_DAILY_TOKENS  = 50_000  // free tier: 50k tokens/day
const PRO_DAILY_TOKENS   = 500_000 // pro tier: 500k tokens/day

async function getDailyTokensUsed(userId: string): Promise<number> {
  const key = \`tokens:\${userId}:\${new Date().toISOString().slice(0,10)}\`
  return parseInt((await redis.get(key)) ?? '0', 10)
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

  // 1. Rate limit by IP
  const { success } = await rl.limit(ip)
  if (!success) return Response.json({ error: 'Rate limit exceeded' }, { status: 429 })

  // 2. Require authentication
  const session = await verifySession(req)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // 3. Check daily token budget
  const used   = await getDailyTokensUsed(session.userId)
  const budget = session.plan === 'pro' ? PRO_DAILY_TOKENS : FREE_DAILY_TOKENS
  if (used >= budget) return Response.json({ error: 'Daily token budget exceeded' }, { status: 429 })

  // 4. Circuit breaker: global daily spend check
  const globalSpend = parseFloat((await redis.get('llm:spend:today')) ?? '0')
  if (globalSpend > 500) {
    await alertOpsTeam('LLM daily budget exceeded — circuit breaker open')
    return Response.json({ error: 'Service temporarily unavailable' }, { status: 503 })
  }

  const { message } = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: message }],
    max_tokens: MAX_TOKENS_CAP,  // server-side cap — caller cannot override
  })

  // 5. Update usage counters
  await redis.incr(\`tokens:\${session.userId}:\${today}\`)
  return Response.json({ reply: response.choices[0].message.content })
}
`

const README = `Mission M-033 — LLM Rate Limiting & Cost Protection
=====================================================

INCIDENT
  Date: Last Tuesday, 02:00–06:00 UTC
  Attacker: automated script, single IP, 8,000 POST requests
  Endpoint: /api/ai/chat
  Model: gpt-4o, max_tokens: 4096 per request
  Cost: $47,438 in 4 hours
  Auth: none required — anonymous endpoint

VULNERABILITIES
  1. No authentication — any anonymous caller can use the API
  2. No rate limiting — 8,000 req/hour, no throttle
  3. Caller-controlled max_tokens — set to 4096, could be 128k
  4. No token budget — no per-user daily quota
  5. No circuit breaker — billing kept climbing after $500 trigger

OBJECTIVES
  1. Read vulnerable route — understand all 5 flaws
  2. Add IP-based rate limiting (20 req/min)
  3. Require authentication (session token)
  4. Set server-side max_tokens cap (1,024)
  5. Implement per-user daily token budget
  6. Add global circuit breaker (daily spend > $500 → pause)
  7. Test: cost DoS attack must be blocked

COMMANDS
  cat route.ts            inspect vulnerable code
  attack cost-dos         simulate automated cost DoS
  fix rate-limit          add IP rate limiting (20 req/min)
  fix auth                require authentication
  fix token-cap           cap max_tokens server-side
  fix budget              add per-user daily token budget
  fix circuit-breaker     add global spend circuit breaker
  test cost-protection    run cost protection test suite
`

const initialState: MissionState = {
  cwd: "/app/api/ai",
  fs: {
    "/app/api/ai/README":    { content: README,       mode: "ro" },
    "/app/api/ai/route.ts":  { content: VULN_ROUTE,   mode: "rw" },
    "/app/api/ai/secure.ts": { content: SECURE_ROUTE, mode: "ro" },
  },
  env: {
    CODE_READ:       "no",
    RATE_LIMIT:      "no",
    AUTH_REQUIRED:   "no",
    TOKEN_CAP:       "no",
    BUDGET:          "no",
    CIRCUIT_BREAKER: "no",
  },
  goalsMet: [],
  history: [],
}

export const llmRateLimitingMission: Mission = {
  slug: "llm-rate-limiting",
  title: "LLM API cost protection: rate limiting, auth, token budgets, circuit breaker",
  brief: "$47k OpenAI bill in 4 hours from anonymous cost-DoS. Add IP rate limiting, authentication, server-side token cap, per-user daily budget, and a global circuit breaker at $500/day.",
  prompt: "dev@hodlberg-ai:/app/api/ai$ ",
  welcome:
    bold(red("╭──────────────────────────────────────────────────────────╮")) + "\r\n" +
    bold(red("│ ")) + bold("MISSION M-033 — LLM RATE LIMITING & COST GUARD") + bold(red("        │")) + "\r\n" +
    bold(red("╰──────────────────────────────────────────────────────────╯")) + "\r\n\r\n" +
    red("Incident: ") + "$47,438 OpenAI bill from unauthenticated cost-DoS.\r\n" +
    dim("Inspect: ") + cyan("cat route.ts") + dim("  ·  Simulate: ") + cyan("attack cost-dos") + "\r\n",
  goals: [
    { id: "read",      label: "Read vulnerable route — identify all 5 flaws",                hint: "cat route.ts" },
    { id: "ratelimit", label: "Add IP rate limiting — 20 requests per minute",               hint: "fix rate-limit" },
    { id: "auth",      label: "Require authentication — reject anonymous callers",           hint: "fix auth" },
    { id: "tokencap",  label: "Cap max_tokens server-side (1,024 — callers cannot override)", hint: "fix token-cap" },
    { id: "budget",    label: "Implement per-user daily token budget",                       hint: "fix budget" },
    { id: "circuit",   label: "Add global circuit breaker: pause all LLM if spend > $500/day",hint: "fix circuit-breaker" },
    { id: "tests",     label: "Run cost protection test suite",                               hint: "test cost-protection" },
  ],
  success:
    gold("╭────────────────────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — LLM COST PROTECTION ACTIVE        │") + "\r\n" +
    gold("╰────────────────────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+250") + dim("   Rate-limited. Auth-gated. Token-budgeted. Circuit-breaker live.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n" +
      "  " + cyan("cat <file>") + "            route.ts | secure.ts | README\r\n" +
      "  " + cyan("attack cost-dos") + "       simulate automated cost DoS\r\n" +
      "  " + cyan("fix rate-limit") + "        add 20 req/min IP rate limit\r\n" +
      "  " + cyan("fix auth") + "              require authentication\r\n" +
      "  " + cyan("fix token-cap") + "         cap max_tokens server-side\r\n" +
      "  " + cyan("fix budget") + "            per-user daily token budget\r\n" +
      "  " + cyan("fix circuit-breaker") + "   global spend circuit breaker\r\n" +
      "  " + cyan("test cost-protection") + "  run protection test suite\r\n" +
      "  " + cyan("goals  hint  clear") + "\r\n",
    }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app/api/ai") }, stdout: "" }),
    ls: ({ state }) => {
      const entries = Object.keys(state.fs).filter((p) => p.startsWith("/app/api/ai/")).map((p) => p.replace("/app/api/ai/", ""))
      return { stdout: entries.join("  ") }
    },
    cat: ({ state, args }): CommandResult => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const normalized = args[0].startsWith("/") ? args[0] : resolvePath(state.cwd, args[0])
      const f = state.fs[normalized]
      if (!f) return { stderr: `cat: ${args[0]}: no such file` }
      const env = { ...state.env }
      if (normalized.endsWith("route.ts") && env.CODE_READ === "no") {
        env.CODE_READ = "yes"
        return { stdout: f.content, statePatch: { env }, goalMet: "read" }
      }
      return { stdout: f.content }
    },
    attack: ({ state, args }): CommandResult => {
      if (args[0] !== "cost-dos") return { stderr: "attack: usage: attack cost-dos" }
      const e = state.env
      const blocked = e.RATE_LIMIT === "yes" && e.AUTH_REQUIRED === "yes"
      if (blocked) {
        return {
          stdout:
            green("Attack BLOCKED:") + "\r\n" +
            dim("  Request 1-20: served normally (within rate limit)") + "\r\n" +
            dim("  Request 21: 429 Too Many Requests (rate limit hit)") + "\r\n" +
            dim("  Anonymous request: 401 Unauthorized (auth required)") + "\r\n" +
            green("  Estimated cost: $0.12 (20 requests × max 1,024 tokens each)"),
        }
      }
      const env = { ...state.env }
      env.CODE_READ = "yes"
      return {
        stdout:
          red("COST DOS SUCCEEDS:") + "\r\n" +
          dim("  8,000 anonymous requests sent over 4 hours") + "\r\n" +
          dim("  Each with max_tokens=4096") + "\r\n" +
          red("  Total cost: $47,438") + "\r\n" +
          red("  No auth. No rate limit. No circuit breaker. No stop.") + "\r\n" +
          yellow("  Run: fix rate-limit  +  fix auth"),
        statePatch: { env },
        goalMet: state.env.CODE_READ === "yes" ? undefined : "read",
      }
    },
    fix: ({ state, args }): CommandResult => {
      const env = { ...state.env }
      const fixes: Record<string, () => CommandResult> = {
        "rate-limit": () => {
          if (env.RATE_LIMIT === "yes") return { stdout: yellow("Rate limiting already applied.") }
          env.RATE_LIMIT = "yes"
          return {
            stdout:
              green("✓ Rate limit: 20 requests/min per IP (sliding window via Upstash Redis).") + "\r\n" +
              dim("  Burst above 20 → 429 with Retry-After header.") + "\r\n" +
              dim("  Separate rate limit for authenticated users: 100 req/min."),
            statePatch: { env },
            goalMet: "ratelimit",
          }
        },
        "auth": () => {
          if (env.AUTH_REQUIRED === "yes") return { stdout: yellow("Auth already required.") }
          env.AUTH_REQUIRED = "yes"
          return {
            stdout:
              green("✓ Authentication required: verifySession() checks session token.") + "\r\n" +
              dim("  Anonymous callers → 401 Unauthorized.") + "\r\n" +
              dim("  Session from HttpOnly cookie — not a bearer token in URL."),
            statePatch: { env },
            goalMet: "auth",
          }
        },
        "token-cap": () => {
          if (env.TOKEN_CAP === "yes") return { stdout: yellow("Token cap already enforced.") }
          env.TOKEN_CAP = "yes"
          return {
            stdout:
              green("✓ max_tokens capped server-side to 1,024.") + "\r\n" +
              dim("  Callers cannot pass max_tokens in request body — ignored.") + "\r\n" +
              dim("  Even if attacker authenticates, max cost per request is bounded."),
            statePatch: { env },
            goalMet: "tokencap",
          }
        },
        "budget": () => {
          if (env.BUDGET === "yes") return { stdout: yellow("Token budget already in place.") }
          env.BUDGET = "yes"
          return {
            stdout:
              green("✓ Per-user daily token budget:") + "\r\n" +
              dim("  Free tier: 50,000 tokens/day (≈ 50 conversations)") + "\r\n" +
              dim("  Pro tier:  500,000 tokens/day") + "\r\n" +
              dim("  Counter stored in Redis with 24h TTL, resets at midnight UTC."),
            statePatch: { env },
            goalMet: "budget",
          }
        },
        "circuit-breaker": () => {
          if (env.CIRCUIT_BREAKER === "yes") return { stdout: yellow("Circuit breaker already active.") }
          env.CIRCUIT_BREAKER = "yes"
          return {
            stdout:
              green("✓ Global circuit breaker: daily LLM spend threshold = $500.") + "\r\n" +
              dim("  If spend > $500 today: all LLM calls → 503, ops team alerted.") + "\r\n" +
              dim("  Manual reset required: ops team reviews, then re-enables.") + "\r\n" +
              dim("  Separate dev/staging budgets to avoid cross-environment impact."),
            statePatch: { env },
            goalMet: "circuit",
          }
        },
      }
      const action = fixes[args[0]]
      if (!action) return { stderr: `fix: unknown target '${args[0]}'` }
      return action()
    },
    test: ({ state, args }): CommandResult => {
      if (args[0] !== "cost-protection") return { stderr: "test: usage: test cost-protection" }
      const e = state.env
      const tests = [
        { name: "Anonymous request → 401 Unauthorized",      ok: e.AUTH_REQUIRED === "yes" },
        { name: ">20 req/min from same IP → 429",            ok: e.RATE_LIMIT === "yes" },
        { name: "max_tokens=128000 in body → ignored",       ok: e.TOKEN_CAP === "yes" },
        { name: "Free user exhausted 50k tokens → 429",      ok: e.BUDGET === "yes" },
        { name: "Daily spend > $500 → 503 (circuit breaker)",ok: e.CIRCUIT_BREAKER === "yes" },
        { name: "Legitimate pro user: first 100 req served", ok: e.RATE_LIMIT === "yes" && e.AUTH_REQUIRED === "yes" },
      ]
      const allPass = tests.every((t) => t.ok)
      const lines = tests.map((t) => (t.ok ? green("  ✓ ") + t.name : red("  ✗ ") + t.name))
      return {
        stdout: bold("LLM Cost Protection Test Suite") + "\r\n" + lines.join("\r\n") + "\r\n" +
          (allPass ? green("All tests PASS — LLM endpoint is cost-protected.") : yellow("Some tests FAIL — apply remaining fixes.")),
        goalMet: allPass ? "tests" : undefined,
      }
    },
    hint: ({ state }) => {
      const r = llmRateLimitingMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({
      stdout: bold("Goals") + "\r\n" + llmRateLimitingMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n"),
    }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
