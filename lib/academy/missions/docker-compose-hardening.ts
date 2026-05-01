// Mission M-013 — "Your docker-compose.yml runs everything as root with secrets in env vars."
//
// Track: Intermediate (Stack Hardening)
// Scenario: Hodlberg AG's staging compose stack leaks DB credentials via `docker inspect`,
// runs as root, mounts the Docker socket, and has no resource limits. A container escape
// from any service = game over. Harden it before it reaches prod.
//
// Pedagogy:
//   - user: "1000:1000" — drop root inside containers
//   - read_only: true + tmpfs for /tmp — immutable rootfs
//   - Removing the Docker socket mount (privilege escalation path)
//   - Moving secrets to Docker Secrets / .env file (not inline)
//   - Adding memory/CPU limits (blast-radius control)
//   - security_opt: no-new-privileges:true

import type { CommandResult, Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, red, resolvePath, yellow } from "../missionEngine"

const COMPOSE_BEFORE = `version: "3.9"

services:
  api:
    image: hodlberg/api:latest
    ports:
      - "8080:8080"
    environment:
      DB_PASSWORD: supersecret123       # BAD: secret in compose file
      JWT_SECRET: jwt-prod-secret-key   # BAD: secret in compose file
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock  # CRITICAL: socket mount
    restart: always

  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: supersecret123  # BAD: same plain text
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
`

const COMPOSE_AFTER = `version: "3.9"

services:
  api:
    image: hodlberg/api:latest
    ports:
      - "8080:8080"
    user: "1000:1000"
    read_only: true
    tmpfs:
      - /tmp
    environment:
      DB_PASSWORD_FILE: /run/secrets/db_password
      JWT_SECRET_FILE:  /run/secrets/jwt_secret
    secrets:
      - db_password
      - jwt_secret
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: "0.5"
    security_opt:
      - no-new-privileges:true
    restart: always

  postgres:
    image: postgres:16
    user: "999:999"
    read_only: true
    tmpfs:
      - /tmp
      - /run/postgresql
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password
    volumes:
      - pgdata:/var/lib/postgresql/data
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: "1.0"
    security_opt:
      - no-new-privileges:true

secrets:
  db_password:
    file: ./secrets/db_password.txt
  jwt_secret:
    file: ./secrets/jwt_secret.txt

volumes:
  pgdata:
`

const README = `Mission M-013 — Docker Compose Production Hardening
====================================================

BRIEF
  A security scan of staging found 5 critical issues in docker-compose.yml:
  1. DB/JWT secrets in plain text environment variables
  2. Docker socket mounted into the API container (container escape = host root)
  3. Services run as root inside containers
  4. No resource limits (one runaway container kills the host)
  5. Mutable rootfs (attacker can persist files inside a container)

  Fix all five. The prod deploy is in 6 hours.

COMMANDS
  cat compose.yml            inspect current config
  fix socket                 remove Docker socket mount
  fix secrets                move env vars to Docker Secrets
  fix user                   add non-root user: "1000:1000"
  fix readonly               add read_only: true + tmpfs
  fix limits                 add memory/CPU resource limits
  fix security               add no-new-privileges:true
  audit                      run security checklist
  show compose               display updated compose file
`

const initialState: MissionState = {
  cwd: "/app",
  fs: {
    "/app/README":           { content: README,          mode: "ro" },
    "/app/compose.yml":      { content: COMPOSE_BEFORE,  mode: "rw" },
    "/app/compose.fixed":    { content: COMPOSE_AFTER,   mode: "ro" },
  },
  env: {
    SOCKET_FIXED:   "no",
    SECRETS_FIXED:  "no",
    USER_FIXED:     "no",
    READONLY_FIXED: "no",
    LIMITS_FIXED:   "no",
    SECURITY_FIXED: "no",
  },
  goalsMet: [],
  history: [],
}

function countFixed(env: Record<string, string>): number {
  return ["SOCKET_FIXED", "SECRETS_FIXED", "USER_FIXED", "READONLY_FIXED", "LIMITS_FIXED", "SECURITY_FIXED"]
    .filter((k) => env[k] === "yes").length
}

export const dockerComposeHardeningMission: Mission = {
  slug: "docker-compose-hardening",
  title: "Harden the docker-compose stack: drop root, remove socket, move secrets",
  brief: "Staging compose file has 5 critical issues: plain-text secrets, Docker socket mount, root user, no resource limits, mutable rootfs. Fix all five before prod.",
  prompt: "ops@hodlberg-staging:/app$ ",
  welcome:
    bold(red("╭──────────────────────────────────────────────────────────╮")) + "\r\n" +
    bold(red("│ ")) + bold("MISSION M-013 — DOCKER COMPOSE PRODUCTION HARDENING") + bold(red("   │")) + "\r\n" +
    bold(red("╰──────────────────────────────────────────────────────────╯")) + "\r\n\r\n" +
    yellow("Security scan: ") + "5 critical issues in docker-compose.yml.\r\n" +
    dim("Start: ") + cyan("cat compose.yml") + dim("  ·  Checklist: ") + cyan("audit") + "\r\n",
  goals: [
    { id: "socket",   label: "Remove Docker socket mount from API container",          hint: "fix socket" },
    { id: "secrets",  label: "Move DB/JWT secrets from env vars to Docker Secrets",    hint: "fix secrets" },
    { id: "user",     label: "Run containers as non-root user (user: '1000:1000')",    hint: "fix user" },
    { id: "readonly", label: "Set read_only: true + tmpfs for /tmp",                   hint: "fix readonly" },
    { id: "limits",   label: "Add memory + CPU resource limits",                       hint: "fix limits" },
    { id: "security", label: "Add security_opt: no-new-privileges:true",               hint: "fix security" },
  ],
  success:
    gold("╭────────────────────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — COMPOSE STACK PRODUCTION-HARDENED  │") + "\r\n" +
    gold("╰────────────────────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+195") + dim("   6/6 issues fixed. Blast radius minimal. Secrets out of env vars.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n" +
      "  " + cyan("cat <file>") + "         inspect file  (compose.yml, compose.fixed, README)\r\n" +
      "  " + cyan("fix socket") + "         remove Docker socket mount\r\n" +
      "  " + cyan("fix secrets") + "        move secrets to Docker Secrets\r\n" +
      "  " + cyan("fix user") + "           add non-root user directive\r\n" +
      "  " + cyan("fix readonly") + "       read_only rootfs + tmpfs\r\n" +
      "  " + cyan("fix limits") + "         memory / CPU resource limits\r\n" +
      "  " + cyan("fix security") + "       no-new-privileges\r\n" +
      "  " + cyan("audit") + "              run security checklist\r\n" +
      "  " + cyan("show compose") + "       display updated compose.yml\r\n" +
      "  " + cyan("goals  hint  clear") + "\r\n",
    }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app") }, stdout: "" }),
    ls: ({ state }) => {
      const entries = Object.keys(state.fs).filter((p) => p.startsWith("/app/")).map((p) => p.replace("/app/", ""))
      return { stdout: entries.join("  ") }
    },
    cat: ({ state, args }): CommandResult => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const normalized = args[0].startsWith("/") ? args[0] : resolvePath(state.cwd, args[0])
      const f = state.fs[normalized]
      if (!f) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: f.content || dim("(empty)") }
    },
    show: ({ state, args }): CommandResult => {
      if (args[0] !== "compose") return { stderr: "show: usage: show compose" }
      return { stdout: state.fs["/app/compose.yml"].content }
    },
    fix: ({ state, args }): CommandResult => {
      if (!args[0]) return { stderr: "fix: usage: fix <socket|secrets|user|readonly|limits|security>" }
      const env = { ...state.env }
      const action = args[0]

      if (action === "socket") {
        if (env.SOCKET_FIXED === "yes") return { stdout: yellow("Socket mount already removed.") }
        env.SOCKET_FIXED = "yes"
        return {
          stdout:
            green("✓ Removed: /var/run/docker.sock mount from 'api' service.") + "\r\n" +
            dim("  Docker socket = root on the host. Any breakout from the container = full host compromise.") + "\r\n" +
            dim("  If your app needs Docker access, use a dedicated proxy (docker-socket-proxy) with allow-list."),
          statePatch: { env },
          goalMet: "socket",
        }
      }
      if (action === "secrets") {
        if (env.SECRETS_FIXED === "yes") return { stdout: yellow("Secrets already moved to Docker Secrets.") }
        env.SECRETS_FIXED = "yes"
        return {
          stdout:
            green("✓ Moved DB_PASSWORD and JWT_SECRET to Docker Secrets.") + "\r\n" +
            dim("  Created ./secrets/db_password.txt + ./secrets/jwt_secret.txt (gitignored).") + "\r\n" +
            dim("  Services now read via *_FILE convention — never visible in `docker inspect`."),
          statePatch: { env },
          goalMet: "secrets",
        }
      }
      if (action === "user") {
        if (env.USER_FIXED === "yes") return { stdout: yellow("Non-root user already configured.") }
        env.USER_FIXED = "yes"
        return {
          stdout:
            green("✓ Added user: \"1000:1000\" to api and user: \"999:999\" to postgres.") + "\r\n" +
            dim("  Processes inside containers no longer run as UID 0.") + "\r\n" +
            dim("  Ensure image supports this UID — add a non-root user in Dockerfile if needed."),
          statePatch: { env },
          goalMet: "user",
        }
      }
      if (action === "readonly") {
        if (env.READONLY_FIXED === "yes") return { stdout: yellow("read_only already configured.") }
        env.READONLY_FIXED = "yes"
        return {
          stdout:
            green("✓ Added read_only: true and tmpfs: [/tmp] to both services.") + "\r\n" +
            dim("  Container filesystem is now immutable — attacker cannot persist files.") + "\r\n" +
            dim("  postgres also gets tmpfs /run/postgresql for socket files."),
          statePatch: { env },
          goalMet: "readonly",
        }
      }
      if (action === "limits") {
        if (env.LIMITS_FIXED === "yes") return { stdout: yellow("Resource limits already set.") }
        env.LIMITS_FIXED = "yes"
        return {
          stdout:
            green("✓ Added memory: 512M / cpus: 0.5 for api, memory: 1G / cpus: 1.0 for postgres.") + "\r\n" +
            dim("  Blast-radius control: runaway container cannot starve the host.") + "\r\n" +
            dim("  OOM killer will terminate the container, not the host kernel."),
          statePatch: { env },
          goalMet: "limits",
        }
      }
      if (action === "security") {
        if (env.SECURITY_FIXED === "yes") return { stdout: yellow("security_opt already configured.") }
        env.SECURITY_FIXED = "yes"
        return {
          stdout:
            green("✓ Added security_opt: [no-new-privileges:true] to all services.") + "\r\n" +
            dim("  Prevents setuid/setgid binaries from escalating privileges inside the container.") + "\r\n" +
            dim("  Equivalent to --security-opt=no-new-privileges in docker run."),
          statePatch: { env },
          goalMet: "security",
        }
      }
      return { stderr: `fix: unknown target '${action}'` }
    },
    audit: ({ state }): CommandResult => {
      const checks = [
        { name: "Docker socket NOT mounted",                    ok: state.env.SOCKET_FIXED === "yes" },
        { name: "Secrets via Docker Secrets (not env vars)",    ok: state.env.SECRETS_FIXED === "yes" },
        { name: "Non-root user configured",                     ok: state.env.USER_FIXED === "yes" },
        { name: "read_only rootfs + tmpfs",                     ok: state.env.READONLY_FIXED === "yes" },
        { name: "Memory + CPU limits set",                      ok: state.env.LIMITS_FIXED === "yes" },
        { name: "no-new-privileges security option",            ok: state.env.SECURITY_FIXED === "yes" },
      ]
      const fixed = countFixed(state.env)
      const lines = checks.map((c) => (c.ok ? green("  ✓ ") + c.name : red("  ✗ ") + c.name))
      return {
        stdout:
          bold("Docker Compose Security Audit") + "\r\n" +
          lines.join("\r\n") + "\r\n" +
          (fixed === 6 ? green(`Result: PASS — all 6 issues resolved. Production-ready.`) : yellow(`Result: ${fixed}/6 fixed — complete the remaining items.`)),
        goalMet: fixed === 6 ? undefined : undefined,
      }
    },
    hint: ({ state }) => {
      const r = dockerComposeHardeningMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({
      stdout: bold("Goals") + "\r\n" + dockerComposeHardeningMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n"),
    }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
