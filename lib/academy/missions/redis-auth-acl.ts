// Mission M-014 — "Redis is listening on 0.0.0.0:6379 with no auth. Prod data exposed."
//
// Track: Intermediate (Stack Hardening)
// Scenario: Hodlberg AG's Redis instance is on a VPS with a public IP.
// It binds to all interfaces, has no password, and does not use TLS.
// The penetration tester just dumped all keys with: redis-cli -h <public-ip> KEYS '*'
// Fix it: bind to localhost only, set a strong password, enable ACL, disable dangerous commands.
//
// Pedagogy:
//   - bind 127.0.0.1 — don't expose Redis to the network
//   - requirepass — password authentication
//   - ACL SETUSER — least-privilege users
//   - rename-command FLUSHALL "" — disable dangerous commands
//   - CONFIG REWRITE — persist config changes

import type { CommandResult, Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, red, resolvePath, yellow } from "../missionEngine"

const REDIS_CONF_BEFORE = `# /etc/redis/redis.conf — CURRENT (INSECURE)

# Bind to all interfaces — DANGEROUS on public VPS
bind 0.0.0.0

# No authentication
# requirepass (commented out)

# Default port
port 6379

# No TLS
# tls-port 6380

# Dangerous commands enabled
# rename-command FLUSHALL ""
# rename-command CONFIG ""

# Logging
loglevel notice
logfile /var/log/redis/redis-server.log
`

const REDIS_CONF_SECURE = `# /etc/redis/redis.conf — HARDENED

# Bind to loopback only — not reachable from outside
bind 127.0.0.1 ::1

# Strong password authentication
requirepass Hod1berg@Str0ngRed1sPassw0rd!

# Default port
port 6379

# Disable dangerous commands
rename-command FLUSHALL ""
rename-command FLUSHDB  ""
rename-command DEBUG    ""
rename-command CONFIG   "CONFIG_RESTRICTED_ae2f9c"

# Logging
loglevel notice
logfile /var/log/redis/redis-server.log
`

const README = `Mission M-014 — Redis Security: Auth, ACL, Bind Restriction
==============================================================

BRIEF
  Penetration tester just dumped all keys from production Redis:
    redis-cli -h <public-ip> KEYS '*'
  No auth. Bound to 0.0.0.0. No ACL. FLUSHALL available.
  
  Redis stores session tokens and rate-limit counters. This is critical.

OBJECTIVES
  1. Check current config — see what's exposed
  2. Fix bind: change 0.0.0.0 → 127.0.0.1
  3. Set requirepass with a strong password
  4. Disable dangerous commands (FLUSHALL, FLUSHDB, DEBUG)
  5. Create a least-privilege ACL user for the API service
  6. Verify: test connection with and without password
  7. Reload config

COMMANDS
  cat redis.conf             inspect current config
  fix bind                   change bind to 127.0.0.1
  fix requirepass            set a strong password
  fix dangerous-commands     disable FLUSHALL, FLUSHDB, DEBUG
  acl create api-user        create least-privilege API user
  redis-cli CONFIG REWRITE   persist changes to disk
  test auth                  verify password-protected connection
  redis-cli PING             verify Redis is running
`

const initialState: MissionState = {
  cwd: "/etc/redis",
  fs: {
    "/etc/redis/README":        { content: README,              mode: "ro" },
    "/etc/redis/redis.conf":    { content: REDIS_CONF_BEFORE,   mode: "rw" },
  },
  env: {
    BIND_FIXED:        "no",
    AUTH_FIXED:        "no",
    COMMANDS_DISABLED: "no",
    ACL_CREATED:       "no",
    CONFIG_SAVED:      "no",
    AUTH_TESTED:       "no",
  },
  goalsMet: [],
  history: [],
}

export const redisAuthAclMission: Mission = {
  slug: "redis-auth-acl",
  title: "Secure Redis: bind restriction, requirepass, ACL, disable dangerous commands",
  brief: "Redis is on 0.0.0.0 with no auth. Pen-tester dumped all keys in seconds. Bind to localhost, set requirepass, disable FLUSHALL/DEBUG, create a least-privilege API ACL user.",
  prompt: "ops@hodlberg-redis:/etc/redis$ ",
  welcome:
    bold(red("╭──────────────────────────────────────────────────────────╮")) + "\r\n" +
    bold(red("│ ")) + bold("MISSION M-014 — REDIS SECURITY: AUTH + ACL + BIND") + bold(red("      │")) + "\r\n" +
    bold(red("╰──────────────────────────────────────────────────────────╯")) + "\r\n\r\n" +
    yellow("Breach: ") + "pen-tester dumped all keys from public Redis with zero auth.\r\n" +
    dim("Start: ") + cyan("cat redis.conf") + dim("  ·  Checklist: ") + cyan("cat README") + "\r\n",
  goals: [
    { id: "bind",      label: "Change bind to 127.0.0.1 (loopback only)",              hint: "fix bind" },
    { id: "auth",      label: "Set requirepass with a strong password",                 hint: "fix requirepass" },
    { id: "commands",  label: "Disable FLUSHALL, FLUSHDB, DEBUG",                       hint: "fix dangerous-commands" },
    { id: "acl",       label: "Create least-privilege ACL user for API service",        hint: "acl create api-user" },
    { id: "save",      label: "Persist config changes to disk",                         hint: "redis-cli CONFIG REWRITE" },
    { id: "testauth",  label: "Verify password-protected connection",                   hint: "test auth" },
  ],
  success:
    gold("╭─────────────────────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — REDIS LOCKED DOWN                   │") + "\r\n" +
    gold("╰─────────────────────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+210") + dim("   bind restricted, auth enabled, ACL set, dangerous cmds disabled.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n" +
      "  " + cyan("cat redis.conf") + "           inspect config\r\n" +
      "  " + cyan("fix bind") + "                 change bind to 127.0.0.1\r\n" +
      "  " + cyan("fix requirepass") + "          set strong password\r\n" +
      "  " + cyan("fix dangerous-commands") + "   disable FLUSHALL, FLUSHDB, DEBUG\r\n" +
      "  " + cyan("acl create api-user") + "      create least-privilege ACL user\r\n" +
      "  " + cyan("redis-cli CONFIG REWRITE") + "  persist config to disk\r\n" +
      "  " + cyan("test auth") + "                verify auth works\r\n" +
      "  " + cyan("redis-cli PING") + "           check Redis is running\r\n" +
      "  " + cyan("goals  hint  clear") + "\r\n",
    }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/etc/redis") }, stdout: "" }),
    ls: ({ state }) => {
      const entries = Object.keys(state.fs).filter((p) => p.startsWith("/etc/redis/")).map((p) => p.replace("/etc/redis/", ""))
      return { stdout: entries.join("  ") }
    },
    cat: ({ state, args }): CommandResult => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const normalized = args[0].startsWith("/") ? args[0] : resolvePath(state.cwd, args[0])
      const f = state.fs[normalized]
      if (!f) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: f.content }
    },
    fix: ({ state, args }): CommandResult => {
      if (!args[0]) return { stderr: "fix: usage: fix <bind|requirepass|dangerous-commands>" }
      const env = { ...state.env }
      const confPath = "/etc/redis/redis.conf"

      if (args[0] === "bind") {
        if (env.BIND_FIXED === "yes") return { stdout: yellow("bind already fixed.") }
        env.BIND_FIXED = "yes"
        const conf = state.fs[confPath].content.replace("bind 0.0.0.0", "bind 127.0.0.1 ::1")
        const fs = { ...state.fs, [confPath]: { content: conf, mode: "rw" as const } }
        return {
          stdout:
            green("✓ bind changed: 0.0.0.0 → 127.0.0.1 ::1") + "\r\n" +
            dim("  Redis is now only reachable from the local machine.") + "\r\n" +
            dim("  Applications on the same host connect via 127.0.0.1:6379.") + "\r\n" +
            dim("  For multi-host setups, use a VPN/overlay network, not a public bind."),
          statePatch: { env, fs },
          goalMet: "bind",
        }
      }
      if (args[0] === "requirepass") {
        if (env.AUTH_FIXED === "yes") return { stdout: yellow("requirepass already set.") }
        env.AUTH_FIXED = "yes"
        const conf = state.fs[confPath].content.replace(
          "# requirepass (commented out)",
          "requirepass Hod1berg@Str0ngRed1sPassw0rd!"
        )
        const fs = { ...state.fs, [confPath]: { content: conf, mode: "rw" as const } }
        return {
          stdout:
            green("✓ requirepass set. Password: Hod1berg@Str0ngRed1sPassw0rd!") + "\r\n" +
            dim("  All redis-cli connections must now include: AUTH <password>") + "\r\n" +
            dim("  Minimum 32 chars, mixed case + numbers + symbols. Store in Vault/Secret Manager."),
          statePatch: { env, fs },
          goalMet: "auth",
        }
      }
      if (args[0] === "dangerous-commands") {
        if (env.COMMANDS_DISABLED === "yes") return { stdout: yellow("Dangerous commands already disabled.") }
        env.COMMANDS_DISABLED = "yes"
        const conf = state.fs[confPath].content
          .replace("# rename-command FLUSHALL \"\"", "rename-command FLUSHALL \"\"")
          .replace("# rename-command FLUSHDB  \"\"", "rename-command FLUSHDB  \"\"")
          .replace("# rename-command DEBUG    \"\"", "rename-command DEBUG    \"\"")
          .replace("# rename-command CONFIG   \"CONFIG_RESTRICTED_ae2f9c\"", "rename-command CONFIG   \"CONFIG_RESTRICTED_ae2f9c\"")
        const fs = { ...state.fs, [confPath]: { content: conf, mode: "rw" as const } }
        return {
          stdout:
            green("✓ Dangerous commands disabled:") + "\r\n" +
            dim("  FLUSHALL → \"\" (completely removed)") + "\r\n" +
            dim("  FLUSHDB  → \"\" (completely removed)") + "\r\n" +
            dim("  DEBUG    → \"\" (completely removed)") + "\r\n" +
            dim("  CONFIG   → \"CONFIG_RESTRICTED_ae2f9c\" (renamed, known only to admins)") + "\r\n" +
            yellow("  ⚠ Apps using CONFIG must switch to the renamed command."),
          statePatch: { env, fs },
          goalMet: "commands",
        }
      }
      return { stderr: `fix: unknown target '${args[0]}'` }
    },
    acl: ({ state, args }): CommandResult => {
      if (args[0] !== "create" || args[1] !== "api-user") {
        return { stderr: "acl: usage: acl create api-user" }
      }
      const env = { ...state.env }
      if (env.ACL_CREATED === "yes") return { stdout: yellow("ACL user 'api' already created.") }
      env.ACL_CREATED = "yes"
      return {
        stdout:
          green("✓ ACL user 'api' created:") + "\r\n" +
          dim("  ACL SETUSER api on >Api@Secr3tPass resetkeys ~session:* ~ratelimit:* +GET +SET +DEL +EXPIRE +TTL") + "\r\n" +
          dim("  Permissions: GET/SET/DEL/EXPIRE/TTL only") + "\r\n" +
          dim("  Key namespace: session:* and ratelimit:* only") + "\r\n" +
          dim("  FLUSHALL, KEYS *, CONFIG — not permitted for this user."),
        statePatch: { env },
        goalMet: "acl",
      }
    },
    "redis-cli": ({ state, args }): CommandResult => {
      const subArgs = args.join(" ")
      if (subArgs === "PING" || subArgs === "ping") {
        return {
          stdout: state.env.AUTH_FIXED === "yes"
            ? red("NOAUTH Authentication required.") + "\r\n" + dim("  Good — password is enforced. Use: redis-cli -a <password> PING")
            : green("PONG"),
        }
      }
      if (args[0] === "CONFIG" && args[1] === "REWRITE") {
        const env = { ...state.env }
        if (env.CONFIG_SAVED === "yes") return { stdout: yellow("Config already saved.") }
        const pending = [env.BIND_FIXED, env.AUTH_FIXED, env.COMMANDS_DISABLED, env.ACL_CREATED].filter((v) => v !== "yes").length
        if (pending > 3) {
          return { stderr: red("CONFIG REWRITE: apply at least one fix first.") }
        }
        env.CONFIG_SAVED = "yes"
        return {
          stdout: green("OK — /etc/redis/redis.conf updated on disk."),
          statePatch: { env },
          goalMet: "save",
        }
      }
      return { stderr: "redis-cli: supported: PING | CONFIG REWRITE" }
    },
    test: ({ state, args }): CommandResult => {
      if (args[0] !== "auth") return { stderr: "test: usage: test auth" }
      const env = { ...state.env }
      if (env.AUTH_FIXED !== "yes") {
        return {
          stdout:
            red("test: requirepass is not set — anyone can connect without a password.") + "\r\n" +
            dim("  Run: fix requirepass"),
        }
      }
      env.AUTH_TESTED = "yes"
      return {
        stdout:
          green("✓ Connection without password: NOAUTH Authentication required. (expected)") + "\r\n" +
          green("✓ Connection with password:    PONG (authenticated successfully)") + "\r\n" +
          dim("  Auth layer is working correctly."),
        statePatch: { env },
        goalMet: "testauth",
      }
    },
    hint: ({ state }) => {
      const r = redisAuthAclMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({
      stdout: bold("Goals") + "\r\n" + redisAuthAclMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n"),
    }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
