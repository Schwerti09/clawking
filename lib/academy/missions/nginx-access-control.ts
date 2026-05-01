// Mission M-012 — "The /admin endpoint is public. 03:00 call in 4 hours. Lock it down."
//
// Track: Intermediate (Stack Hardening)
// Scenario: Hodlberg AG's nginx reverse-proxy exposes /admin to the whole internet.
// A log review found 12,000 brute-force attempts on /admin in the last 24 h.
// The firewall allows all traffic on :443. Lock down /admin with IP allow-list +
// HTTP Basic Auth as a second factor, and confirm a 403 from an unauthorized IP.
//
// Pedagogy:
//   - IP-based allow-lists using "allow / deny" directives inside location blocks
//   - HTTP Basic Auth as a mandatory second check even for allowed IPs
//   - ngx_http_auth_basic_module + htpasswd file workflow
//   - Reloading nginx without dropping connections (nginx -t then nginx -s reload)
//   - Why allow-list alone is not enough (shared office IP, VPN leaks)

import type { CommandResult, Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, red, resolvePath, yellow } from "../missionEngine"

const VHOST_BEFORE = `# /etc/nginx/sites-available/hodlberg.conf
server {
    listen 443 ssl;
    server_name api.hodlberg.io;

    ssl_certificate     /etc/ssl/hodlberg/fullchain.pem;
    ssl_certificate_key /etc/ssl/hodlberg/privkey.pem;

    # Public API
    location /api/ {
        proxy_pass http://127.0.0.1:8080;
    }

    # Admin panel — CURRENTLY UNPROTECTED
    location /admin {
        proxy_pass http://127.0.0.1:8080;
    }
}
`

const VHOST_SOLUTION = `# /etc/nginx/sites-available/hodlberg.conf
server {
    listen 443 ssl;
    server_name api.hodlberg.io;

    ssl_certificate     /etc/ssl/hodlberg/fullchain.pem;
    ssl_certificate_key /etc/ssl/hodlberg/privkey.pem;

    # Public API
    location /api/ {
        proxy_pass http://127.0.0.1:8080;
    }

    # Admin panel — IP allowlist + Basic Auth
    location /admin {
        allow 10.0.0.0/8;          # VPN subnet
        allow 172.16.0.0/12;       # Office subnet
        deny  all;                 # Block everyone else

        auth_basic           "Hodlberg Admin";
        auth_basic_user_file /etc/nginx/.htpasswd;

        proxy_pass http://127.0.0.1:8080;
    }
}
`

const HTPASSWD_CONTENT = `# Generated with: htpasswd -nbB admin <password>
# Format: user:bcrypt_hash
admin:$2y$12$hXzQ9Kz5bL2mN3pO7rS1UOvWdFhGjIkLmNoPqRsTuVwXyZaBcDeF`

const README = `Mission M-012 — nginx /admin Access Control
============================================

BRIEF
  Security audit flagged /admin at api.hodlberg.io is open to the internet.
  Logs show 12,000 brute-force attempts in 24h. Fix it before the board call.

OBJECTIVES
  1. Inspect the current vhost — understand the missing protections
  2. Edit the vhost: add "allow" + "deny all" directives to /admin
  3. Create an .htpasswd file with HTTP Basic Auth credentials
  4. Enable auth_basic in the /admin location
  5. Test the config: nginx -t (must pass)
  6. Reload nginx without dropping connections
  7. Verify: probe /admin from an unauthorized IP → 403

FILES
  /etc/nginx/sites-available/hodlberg.conf   (edit this)
  /etc/nginx/.htpasswd                        (create this)

COMMANDS
  cat <file>              inspect file
  edit vhost allow        add IP allow-list to /admin
  edit vhost auth         add HTTP Basic Auth to /admin
  htpasswd create         create /etc/nginx/.htpasswd
  nginx -t                test configuration syntax
  nginx reload            graceful reload
  probe admin <ip>        simulate HTTP request from <ip>
`

const initialState: MissionState = {
  cwd: "/etc/nginx",
  fs: {
    "/etc/nginx/README":                            { content: README,         mode: "ro" },
    "/etc/nginx/sites-available/hodlberg.conf":     { content: VHOST_BEFORE,   mode: "rw" },
    "/etc/nginx/.htpasswd":                         { content: "",             mode: "rw" },
  },
  env: {
    INSPECTED:        "no",
    ALLOW_ADDED:      "no",
    AUTH_ADDED:       "no",
    HTPASSWD_CREATED: "no",
    NGINX_TESTED:     "no",
    NGINX_RELOADED:   "no",
    PROBE_BLOCKED:    "no",
  },
  goalsMet: [],
  history: [],
}

export const nginxAccessControlMission: Mission = {
  slug: "nginx-access-control",
  title: "Lock down the public /admin endpoint with IP allowlist + HTTP Basic Auth",
  brief: "12,000 brute-force attempts on /admin in 24 h. Add IP-based allow-list and HTTP Basic Auth to the nginx vhost — then verify a 403 from an unauthorized IP.",
  prompt: "ops@hodlberg-nginx:/etc/nginx$ ",
  welcome:
    bold(red("╭──────────────────────────────────────────────────────╮")) + "\r\n" +
    bold(red("│ ")) + bold("MISSION M-012 — NGINX /ADMIN ACCESS CONTROL") + bold(red("           │")) + "\r\n" +
    bold(red("╰──────────────────────────────────────────────────────╯")) + "\r\n\r\n" +
    yellow("Incident: ") + "12,000 brute-force attempts on /admin in the last 24 h.\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  Current vhost: ") + cyan("cat sites-available/hodlberg.conf") + "\r\n",
  goals: [
    { id: "inspect",   label: "Inspect current vhost — identify unprotected /admin",       hint: "cat sites-available/hodlberg.conf" },
    { id: "allow",     label: "Add IP allow-list (allow + deny all) to /admin location",   hint: "edit vhost allow" },
    { id: "htpasswd",  label: "Create /etc/nginx/.htpasswd with admin credentials",        hint: "htpasswd create" },
    { id: "auth",      label: "Add auth_basic + auth_basic_user_file to /admin location",  hint: "edit vhost auth" },
    { id: "test",      label: "Test nginx config — nginx -t must pass",                    hint: "nginx -t" },
    { id: "reload",    label: "Reload nginx gracefully",                                   hint: "nginx reload" },
    { id: "probe",     label: "Verify: unauthorized IP receives 403 Forbidden",            hint: "probe admin 8.8.8.8" },
  ],
  success:
    gold("╭────────────────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — /ADMIN LOCKED DOWN              │") + "\r\n" +
    gold("╰────────────────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+180") + dim("   IP allowlist + HTTP Basic Auth. 12k bot requests → all 403.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("cat <file>") + "  inspect file\r\n" +
      "  " + cyan("edit vhost allow") + "   add IP allow-list to /admin\r\n" +
      "  " + cyan("edit vhost auth") + "    add HTTP Basic Auth to /admin\r\n" +
      "  " + cyan("htpasswd create") + "    create .htpasswd for 'admin'\r\n" +
      "  " + cyan("nginx -t") + "           test config syntax\r\n" +
      "  " + cyan("nginx reload") + "       graceful reload\r\n" +
      "  " + cyan("probe admin <ip>") + "   simulate request to /admin from IP\r\n" +
      "  " + cyan("goals  hint  clear") + "\r\n",
    }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/etc/nginx") }, stdout: "" }),
    ls: ({ state, args }): CommandResult => {
      const dir = args[0] ? resolvePath(state.cwd, args[0]) : state.cwd
      const entries = Object.keys(state.fs).filter((p) => {
        const parent = p.substring(0, p.lastIndexOf("/"))
        return parent === dir
      }).map((p) => p.substring(p.lastIndexOf("/") + 1))
      if (entries.length === 0) {
        // try to see if it's a "directory" path
        const subDirs = new Set(Object.keys(state.fs).filter((p) => p.startsWith(dir + "/")).map((p) => p.replace(dir + "/", "").split("/")[0]))
        return { stdout: [...subDirs].join("  ") || dim("(empty)") }
      }
      return { stdout: entries.join("  ") }
    },
    cat: ({ state, args }): CommandResult => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const normalized = args[0].startsWith("/") ? args[0] : resolvePath(state.cwd, args[0])
      const f = state.fs[normalized]
      if (!f) return { stderr: `cat: ${args[0]}: no such file` }
      const env = { ...state.env }
      if (normalized.endsWith("hodlberg.conf") && env.INSPECTED === "no") {
        env.INSPECTED = "yes"
        return { stdout: f.content, statePatch: { env }, goalMet: "inspect" }
      }
      return { stdout: f.content || dim("(empty file)") }
    },
    edit: ({ state, args }): CommandResult => {
      if (args[0] !== "vhost") return { stderr: "edit: usage: edit vhost allow|auth" }
      const confPath = "/etc/nginx/sites-available/hodlberg.conf"
      const env = { ...state.env }
      if (args[1] === "allow") {
        if (env.ALLOW_ADDED === "yes") return { stdout: yellow("IP allow-list already in vhost") }
        env.ALLOW_ADDED = "yes"
        const newConf = state.fs[confPath].content.replace(
          "    location /admin {\n        proxy_pass http://127.0.0.1:8080;\n    }",
          "    location /admin {\n        allow 10.0.0.0/8;\n        allow 172.16.0.0/12;\n        deny  all;\n\n        proxy_pass http://127.0.0.1:8080;\n    }"
        )
        const fs = { ...state.fs, [confPath]: { content: newConf, mode: "rw" as const } }
        return {
          stdout:
            green("vhost updated — added IP allow-list to /admin:") + "\r\n" +
            dim("  allow 10.0.0.0/8;     # VPN subnet") + "\r\n" +
            dim("  allow 172.16.0.0/12;  # Office subnet") + "\r\n" +
            dim("  deny  all;"),
          statePatch: { env, fs },
          goalMet: "allow",
        }
      }
      if (args[1] === "auth") {
        if (env.AUTH_ADDED === "yes") return { stdout: yellow("auth_basic already in vhost") }
        if (env.HTPASSWD_CREATED === "no") {
          return { stderr: red("auth_basic_user_file points to .htpasswd — create it first with: htpasswd create") }
        }
        env.AUTH_ADDED = "yes"
        const current = state.fs[confPath].content
        const updated = current.replace(
          /( +proxy_pass http:\/\/127\.0\.0\.1:8080;\n    \}\n\})/,
          `        auth_basic           "Hodlberg Admin";\n        auth_basic_user_file /etc/nginx/.htpasswd;\n\n        proxy_pass http://127.0.0.1:8080;\n    }\n}`
        )
        const fs = { ...state.fs, [confPath]: { content: updated, mode: "rw" as const } }
        return {
          stdout:
            green("vhost updated — added auth_basic to /admin:") + "\r\n" +
            dim("  auth_basic           \"Hodlberg Admin\";") + "\r\n" +
            dim("  auth_basic_user_file /etc/nginx/.htpasswd;"),
          statePatch: { env, fs },
          goalMet: "auth",
        }
      }
      return { stderr: "edit vhost: expected 'allow' or 'auth'" }
    },
    htpasswd: ({ state, args }): CommandResult => {
      if (args[0] !== "create") return { stderr: "htpasswd: usage: htpasswd create" }
      const env = { ...state.env }
      if (env.HTPASSWD_CREATED === "yes") return { stdout: yellow(".htpasswd already exists") }
      env.HTPASSWD_CREATED = "yes"
      const fs = { ...state.fs, "/etc/nginx/.htpasswd": { content: HTPASSWD_CONTENT, mode: "rw" as const } }
      return {
        stdout:
          green("Adding password for user admin") + "\r\n" +
          green("Created: /etc/nginx/.htpasswd") + "\r\n" +
          dim("bcrypt hash stored (cost=12). Never store plain passwords."),
        statePatch: { env, fs },
        goalMet: "htpasswd",
      }
    },
    nginx: ({ state, args }): CommandResult => {
      if (args[0] === "-t") {
        const env = { ...state.env }
        if (env.ALLOW_ADDED !== "yes") {
          return { stderr: red("nginx: [emerg] no 'allow/deny' block in /admin — /admin still world-accessible. Edit vhost first.") }
        }
        if (env.AUTH_ADDED !== "yes") {
          return {
            stdout:
              yellow("nginx: [warn] /admin has IP restrict but no auth_basic — add HTTP Basic Auth too.") + "\r\n" +
              green("nginx: configuration file /etc/nginx/nginx.conf test is successful"),
            statePatch: { env: { ...env, NGINX_TESTED: "yes" } },
            goalMet: "test",
          }
        }
        env.NGINX_TESTED = "yes"
        return {
          stdout:
            green("nginx: the configuration file /etc/nginx/nginx.conf syntax is ok") + "\r\n" +
            green("nginx: configuration file /etc/nginx/nginx.conf test is successful"),
          statePatch: { env },
          goalMet: "test",
        }
      }
      if (args[0] === "reload") {
        const env = { ...state.env }
        if (env.NGINX_TESTED !== "yes") {
          return { stderr: red("nginx: always run 'nginx -t' before reload to avoid dropping live connections.") }
        }
        env.NGINX_RELOADED = "yes"
        return {
          stdout:
            green("nginx: graceful reload sent (SIGHUP). Workers serving existing connections, new config active.") + "\r\n" +
            dim("Zero downtime — in-flight requests completed with old config."),
          statePatch: { env },
          goalMet: "reload",
        }
      }
      return { stderr: "nginx: supported: nginx -t | nginx reload" }
    },
    probe: ({ state, args }): CommandResult => {
      if (args[0] !== "admin") return { stderr: "probe: usage: probe admin <ip-address>" }
      const ip = args[1]
      if (!ip) return { stderr: "probe: missing IP address (e.g. probe admin 8.8.8.8)" }
      const { ALLOW_ADDED, AUTH_ADDED, NGINX_RELOADED } = state.env
      const env = { ...state.env }

      if (ALLOW_ADDED !== "yes" || NGINX_RELOADED !== "yes") {
        return {
          stdout:
            red("HTTP/1.1 200 OK") + "\r\n" +
            dim("  /admin is reachable from " + ip + " — no restrictions in effect yet."),
        }
      }

      // Determine if IP is in allowed range
      const isAllowed = ip.startsWith("10.") ||
        // 172.16.0.0/12 covers 172.16.x.x through 172.31.x.x
        (ip.startsWith("172.") && (() => { const second = parseInt(ip.split(".")[1], 10); return second >= 16 && second <= 31 })())

      if (!isAllowed) {
        env.PROBE_BLOCKED = "yes"
        return {
          stdout:
            green("HTTP/1.1 403 Forbidden") + "\r\n" +
            dim("  IP " + ip + " not in allow-list (10.0.0.0/8, 172.16.0.0/12).") + "\r\n" +
            green("✓ Unauthorized IP blocked at nginx level."),
          statePatch: { env },
          goalMet: "probe",
        }
      }

      // IP is allowed — check auth
      if (AUTH_ADDED !== "yes") {
        return {
          stdout:
            yellow("HTTP/1.1 200 OK") + "\r\n" +
            dim("  IP " + ip + " is in allow-list. No HTTP Basic Auth yet — reachable without credentials.") + "\r\n" +
            yellow("⚠ IP allow-list alone is insufficient — add auth_basic too."),
        }
      }

      return {
        stdout:
          yellow("HTTP/1.1 401 Unauthorized") + "\r\n" +
          dim("  IP " + ip + " is in allow-list, but credentials required.") + "\r\n" +
          green("✓ auth_basic challenge returned."),
      }
    },
    hint: ({ state }) => {
      const r = nginxAccessControlMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({
      stdout: bold("Goals") + "\r\n" + nginxAccessControlMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n"),
    }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
