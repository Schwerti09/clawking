// Mission M-031 — "The AI agent has file system + shell + HTTP access. One prompt = RCE."
//
// Track: AI Agent Security (advanced)
// Scenario: Hodlberg AG's AI coding assistant has MCP tools: readFile, writeFile,
// execShell, httpFetch. There are no capability controls. A user can instruct
// the agent to: read /etc/passwd, write to /app/config, execute rm -rf, or
// exfiltrate data via httpFetch. Apply the principle of least privilege.
//
// Pedagogy:
//   - AI agents should only have the capabilities they need for their task
//   - Tool schemas should restrict inputs (paths, commands, URLs)
//   - Each tool should have explicit allow-lists, not block-lists
//   - Write operations require separate confirmation token
//   - httpFetch should only call pre-approved domains
//   - execShell should be completely disabled (or replaced with safe substitutes)

import type { CommandResult, Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, red, resolvePath, yellow } from "../missionEngine"

const TOOL_CONFIG_BEFORE = `// /app/ai/tools.ts — CURRENT (OVERPOWERED)
// Agent has unrestricted access to FS, shell, HTTP

export const agentTools = [
  {
    name: 'readFile',
    description: 'Read any file from the filesystem',
    parameters: {
      path: { type: 'string' }       // No path restriction — can read /etc/passwd, /proc/environ
    }
  },
  {
    name: 'writeFile',
    description: 'Write content to any file',
    parameters: {
      path:    { type: 'string' },   // No restriction — can overwrite /app/config.ts
      content: { type: 'string' }    // No content validation
    }
  },
  {
    name: 'execShell',
    description: 'Execute any shell command',
    parameters: {
      command: { type: 'string' }    // CRITICAL: rm -rf / | curl attacker.io | etc.
    }
  },
  {
    name: 'httpFetch',
    description: 'Make HTTP requests to any URL',
    parameters: {
      url: { type: 'string' }        // Can reach internal IPs (SSRF), exfiltrate data
    }
  }
]
`

const TOOL_CONFIG_AFTER = `// /app/ai/tools.ts — HARDENED (Least Privilege)

const ALLOWED_READ_DIRS  = ['/app/src', '/app/docs', '/app/README.md']
const ALLOWED_WRITE_DIRS = ['/app/src']
const ALLOWED_DOMAINS    = ['api.github.com', 'registry.npmjs.org', 'api.hodlberg.io']

export const agentTools = [
  {
    name: 'readFile',
    description: 'Read source files in /app/src or documentation',
    parameters: {
      path: {
        type: 'string',
        description: 'Path must start with /app/src or /app/docs',
      }
    },
    // Runtime enforcement in tool handler:
    // if (!ALLOWED_READ_DIRS.some(d => path.startsWith(d))) throw new Error('Access denied')
  },
  {
    name: 'writeFile',
    description: 'Write to source files in /app/src only',
    parameters: {
      path:             { type: 'string', description: 'Must be in /app/src' },
      content:          { type: 'string', maxLength: 50000 },
      confirmationCode: { type: 'string', description: 'One-time code from user for write operations' }
    }
  },
  // execShell: REMOVED — replaced by safe substitutes (lintCode, runTests)
  {
    name: 'lintCode',
    description: 'Run ESLint on a specific file in /app/src',
    parameters: { path: { type: 'string' } }
  },
  {
    name: 'httpFetch',
    description: 'Fetch from approved external APIs only',
    parameters: {
      url: {
        type: 'string',
        description: 'Must be one of: api.github.com, registry.npmjs.org, api.hodlberg.io',
      }
    }
  }
]
`

const README = `Mission M-031 — AI Agent Least Privilege
==========================================

RISK
  The coding assistant has 4 tools with zero restrictions:
  - readFile:  can read /etc/passwd, /proc/environ, .env files
  - writeFile: can overwrite /app/config, package.json, .env
  - execShell: can run any command (rm -rf, curl, nc reverse shell)
  - httpFetch: can SSRF internal services, exfiltrate to attacker.io

  One injected instruction or misunderstood task = full system compromise.

PRINCIPLE: LEAST PRIVILEGE
  Give the agent ONLY what it needs for its task.
  Use allow-lists, not block-lists.
  Require confirmation codes for write operations.
  Replace execShell with safe, scoped substitutes.

OBJECTIVES
  1. Inspect the current unrestricted tool config
  2. Simulate SSRF attack via httpFetch
  3. Add path restrictions to readFile (allow-list /app/src, /app/docs)
  4. Add confirmation code requirement to writeFile
  5. Remove execShell — replace with lintCode + runTests
  6. Add domain allow-list to httpFetch
  7. Test: all unauthorized tool calls must be blocked

COMMANDS
  cat tools.ts              inspect current config
  attack ssrf               simulate SSRF via httpFetch
  attack read-passwd        simulate /etc/passwd read
  fix readfile              add path allow-list
  fix writefile             add confirmation code
  fix execshell             remove shell, add safe tools
  fix httpfetch             add domain allow-list
  test capabilities         run capability test suite
`

const initialState: MissionState = {
  cwd: "/app/ai",
  fs: {
    "/app/ai/README":    { content: README,             mode: "ro" },
    "/app/ai/tools.ts":  { content: TOOL_CONFIG_BEFORE, mode: "rw" },
    "/app/ai/secure.ts": { content: TOOL_CONFIG_AFTER,  mode: "ro" },
  },
  env: {
    CODE_READ:       "no",
    READFILE_FIXED:  "no",
    WRITEFILE_FIXED: "no",
    EXECSHELL_FIXED: "no",
    HTTPFETCH_FIXED: "no",
  },
  goalsMet: [],
  history: [],
}

export const aiAgentPermissionsMission: Mission = {
  slug: "ai-agent-permissions",
  title: "Apply least privilege to AI agent tools: path allow-lists, remove execShell, domain whitelist",
  brief: "AI coding assistant has unrestricted readFile, writeFile, execShell, httpFetch. One injection = RCE. Apply least privilege: path allow-lists, confirmation codes for writes, remove shell, domain whitelist.",
  prompt: "dev@hodlberg-ai:/app/ai$ ",
  welcome:
    bold(red("╭──────────────────────────────────────────────────────────╮")) + "\r\n" +
    bold(red("│ ")) + bold("MISSION M-031 — AI AGENT LEAST PRIVILEGE") + bold(red("              │")) + "\r\n" +
    bold(red("╰──────────────────────────────────────────────────────────╯")) + "\r\n\r\n" +
    yellow("Risk: ") + "4 unrestricted tools. execShell can run any command.\r\n" +
    dim("Inspect: ") + cyan("cat tools.ts") + dim("  ·  Simulate: ") + cyan("attack ssrf") + "\r\n",
  goals: [
    { id: "read",      label: "Inspect the unrestricted tool configuration",                hint: "cat tools.ts" },
    { id: "ssrf",      label: "Confirm SSRF risk via unrestricted httpFetch",               hint: "attack ssrf" },
    { id: "readfile",  label: "Add path allow-list to readFile (/app/src, /app/docs only)", hint: "fix readfile" },
    { id: "writefile", label: "Require confirmation code for writeFile operations",         hint: "fix writefile" },
    { id: "execshell", label: "Remove execShell — replace with lintCode + runTests",        hint: "fix execshell" },
    { id: "httpfetch", label: "Add domain allow-list to httpFetch",                         hint: "fix httpfetch" },
    { id: "tests",     label: "Run capability test suite — unauthorized calls blocked",     hint: "test capabilities" },
  ],
  success:
    gold("╭──────────────────────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — AI AGENT PERMISSIONS HARDENED       │") + "\r\n" +
    gold("╰──────────────────────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+260") + dim("   execShell removed. Path allow-lists + domain whitelist applied.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n" +
      "  " + cyan("cat <file>") + "           tools.ts | secure.ts | README\r\n" +
      "  " + cyan("attack ssrf") + "          simulate SSRF via httpFetch\r\n" +
      "  " + cyan("attack read-passwd") + "   simulate reading /etc/passwd\r\n" +
      "  " + cyan("fix readfile") + "         add path allow-list\r\n" +
      "  " + cyan("fix writefile") + "        add confirmation code\r\n" +
      "  " + cyan("fix execshell") + "        remove shell, add safe tools\r\n" +
      "  " + cyan("fix httpfetch") + "        add domain allow-list\r\n" +
      "  " + cyan("test capabilities") + "    run capability test suite\r\n" +
      "  " + cyan("goals  hint  clear") + "\r\n",
    }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app/ai") }, stdout: "" }),
    ls: ({ state }) => {
      const entries = Object.keys(state.fs).filter((p) => p.startsWith("/app/ai/")).map((p) => p.replace("/app/ai/", ""))
      return { stdout: entries.join("  ") }
    },
    cat: ({ state, args }): CommandResult => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const normalized = args[0].startsWith("/") ? args[0] : resolvePath(state.cwd, args[0])
      const f = state.fs[normalized]
      if (!f) return { stderr: `cat: ${args[0]}: no such file` }
      const env = { ...state.env }
      if (normalized.endsWith("tools.ts") && env.CODE_READ === "no") {
        env.CODE_READ = "yes"
        return { stdout: f.content, statePatch: { env }, goalMet: "read" }
      }
      return { stdout: f.content }
    },
    attack: ({ state, args }): CommandResult => {
      if (args[0] === "ssrf") {
        if (state.env.HTTPFETCH_FIXED === "yes") {
          return {
            stdout:
              green("Attack BLOCKED:") + "\r\n" +
              dim("  httpFetch('http://169.254.169.254/latest/meta-data/')") + "\r\n" +
              dim("  Domain '169.254.169.254' not in allow-list.") + "\r\n" +
              green("  Error: 'Unauthorized URL. Allowed: api.github.com, registry.npmjs.org, api.hodlberg.io'"),
          }
        }
        return {
          stdout:
            red("SSRF CONFIRMED:") + "\r\n" +
            dim("  httpFetch('http://169.254.169.254/latest/meta-data/')") + "\r\n" +
            red("  Response: {\"instanceId\": \"i-0abcdef\", \"iamInstanceProfileArn\": \"arn:aws:...\"") + "\r\n" +
            red("  AWS credentials in IAM metadata — attacker can assume instance role.") + "\r\n" +
            yellow("  Run: fix httpfetch"),
          statePatch: { env: { ...state.env, CODE_READ: "yes" } },
          goalMet: state.env.CODE_READ === "yes" ? "ssrf" : undefined,
        }
      }
      if (args[0] === "read-passwd") {
        if (state.env.READFILE_FIXED === "yes") {
          return {
            stdout:
              green("Attack BLOCKED:") + "\r\n" +
              dim("  readFile('/etc/passwd')") + "\r\n" +
              dim("  Path '/etc/passwd' not in allow-list [/app/src, /app/docs].") + "\r\n" +
              green("  Error: 'Access denied — path not in allowed directories'"),
          }
        }
        return {
          stdout:
            red("VULNERABLE:") + "\r\n" +
            dim("  readFile('/etc/passwd')") + "\r\n" +
            red("  root:x:0:0:root:/root:/bin/bash") + "\r\n" +
            red("  daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin") + "\r\n" +
            yellow("  Run: fix readfile"),
        }
      }
      return { stderr: "attack: usage: attack ssrf | attack read-passwd" }
    },
    fix: ({ state, args }): CommandResult => {
      const env = { ...state.env }
      if (args[0] === "readfile") {
        if (env.READFILE_FIXED === "yes") return { stdout: yellow("readFile restrictions already applied.") }
        env.READFILE_FIXED = "yes"
        return {
          stdout:
            green("✓ readFile allow-list applied:") + "\r\n" +
            dim("  Allowed: /app/src/**, /app/docs/**, /app/README.md") + "\r\n" +
            dim("  All other paths throw 'Access denied'.") + "\r\n" +
            dim("  /etc/, /proc/, /root/, .env, node_modules — all blocked."),
          statePatch: { env },
          goalMet: "readfile",
        }
      }
      if (args[0] === "writefile") {
        if (env.WRITEFILE_FIXED === "yes") return { stdout: yellow("writeFile confirmation already required.") }
        env.WRITEFILE_FIXED = "yes"
        return {
          stdout:
            green("✓ writeFile now requires a confirmation code:") + "\r\n" +
            dim("  User must supply a one-time 6-digit code shown in the UI.") + "\r\n" +
            dim("  Agent cannot write files without explicit user approval.") + "\r\n" +
            dim("  Write scope limited to /app/src/** only."),
          statePatch: { env },
          goalMet: "writefile",
        }
      }
      if (args[0] === "execshell") {
        if (env.EXECSHELL_FIXED === "yes") return { stdout: yellow("execShell already removed.") }
        env.EXECSHELL_FIXED = "yes"
        return {
          stdout:
            green("✓ execShell removed from tool registry.") + "\r\n" +
            green("✓ Added safe substitutes:") + "\r\n" +
            dim("  lintCode(path) — runs ESLint on a specific /app/src file") + "\r\n" +
            dim("  runTests()     — runs vitest in read-only mode") + "\r\n" +
            dim("  No arbitrary shell access. Shell interpreter never invoked."),
          statePatch: { env },
          goalMet: "execshell",
        }
      }
      if (args[0] === "httpfetch") {
        if (env.HTTPFETCH_FIXED === "yes") return { stdout: yellow("httpFetch domain allow-list already applied.") }
        env.HTTPFETCH_FIXED = "yes"
        return {
          stdout:
            green("✓ httpFetch domain allow-list applied:") + "\r\n" +
            dim("  Allowed: api.github.com, registry.npmjs.org, api.hodlberg.io") + "\r\n" +
            dim("  Private IPs (169.254.x.x, 10.x.x.x, 192.168.x.x) are blocked.") + "\r\n" +
            dim("  SSRF to cloud metadata, internal services, attacker.io — all blocked."),
          statePatch: { env },
          goalMet: "httpfetch",
        }
      }
      return { stderr: `fix: unknown target '${args[0]}'` }
    },
    test: ({ state, args }): CommandResult => {
      if (args[0] !== "capabilities") return { stderr: "test: usage: test capabilities" }
      const e = state.env
      const tests = [
        { name: "readFile('/etc/passwd') blocked",     ok: e.READFILE_FIXED === "yes" },
        { name: "readFile('/app/src/utils.ts') allowed",ok: e.READFILE_FIXED === "yes" },
        { name: "writeFile requires confirmation code", ok: e.WRITEFILE_FIXED === "yes" },
        { name: "execShell removed from tools",        ok: e.EXECSHELL_FIXED === "yes" },
        { name: "lintCode safe substitute available",  ok: e.EXECSHELL_FIXED === "yes" },
        { name: "httpFetch to 169.254.x.x blocked",   ok: e.HTTPFETCH_FIXED === "yes" },
        { name: "httpFetch to api.github.com allowed", ok: e.HTTPFETCH_FIXED === "yes" },
      ]
      const allPass = tests.every((t) => t.ok)
      const lines = tests.map((t) => (t.ok ? green("  ✓ ") + t.name : red("  ✗ ") + t.name))
      return {
        stdout: bold("AI Agent Capability Test Suite") + "\r\n" + lines.join("\r\n") + "\r\n" +
          (allPass ? green("All tests PASS — agent tools follow least privilege.") : yellow("Some tests FAIL — apply remaining fixes.")),
        goalMet: allPass ? "tests" : undefined,
      }
    },
    hint: ({ state }) => {
      const r = aiAgentPermissionsMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({
      stdout: bold("Goals") + "\r\n" + aiAgentPermissionsMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n"),
    }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
