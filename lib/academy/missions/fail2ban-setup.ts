// Mission M-024 — "Fail2ban: protect SSH from brute-force attacks"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const FAIL2BAN_CONFIG_INITIAL = `# /etc/fail2ban/jail.local — default configuration
[DEFAULT]
bantime = 600
findtime = 600
maxretry = 5

[sshd]
enabled = false
port = ssh
logpath = /var/log/auth.log
maxretry = 5
`

const README = `Mission M-024 — Fail2ban Setup
==============================

BRIEF
  Your SSH server is under brute-force attack. Fail2ban is installed but
  not configured for SSH. Enable it, tighten the rules, and protect
  against repeated login attempts.

OBJECTIVES
  1. Inspect the fail2ban config
  2. Enable sshd jail
  3. Reduce bantime to 3600 seconds
  4. Reduce maxretry to 3
  5. Add port hardening
  6. Restart fail2ban service
  7. Check jail status

HINTS
  cat /etc/fail2ban/jail.local
  patch enable
  patch bantime
  patch maxretry
  patch port
  systemctl restart fail2ban
  fail2ban-client status sshd
`

const initialState: MissionState = {
  cwd: "/etc/fail2ban",
  fs: {
    "/etc/fail2ban/README": { content: README, mode: "ro" },
    "/etc/fail2ban/jail.local": { content: FAIL2BAN_CONFIG_INITIAL, mode: "rw" },
  },
  env: { ENABLED: "false", BANTIME: "600", MAXRETRY: "5", PORT: "default", RESTARTED: "no", STATUS_OK: "no" },
  goalsMet: [],
  history: [],
}

export const fail2banSetupMission: Mission = {
  slug: "fail2ban-setup",
  title: "Fail2ban: protect SSH from brute-force attacks",
  brief: "Your SSH server is under brute-force attack. Configure fail2ban: enable sshd jail, reduce bantime to 3600s, maxretry to 3, harden port.",
  prompt: "defender@hodlberg-server:/etc/fail2ban$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-024 — FAIL2BAN SETUP") + bold(cyan("           │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "SSH server · fail2ban · brute-force protection\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "inspect", label: "Inspect the fail2ban config", hint: "cat /etc/fail2ban/jail.local" },
    { id: "enable", label: "Enable sshd jail", hint: "patch enable" },
    { id: "bantime", label: "Reduce bantime to 3600 seconds", hint: "patch bantime" },
    { id: "maxretry", label: "Reduce maxretry to 3", hint: "patch maxretry" },
    { id: "port", label: "Add port hardening", hint: "patch port" },
    { id: "restart", label: "Restart fail2ban service", hint: "systemctl restart fail2ban" },
    { id: "status", label: "Check jail status", hint: "fail2ban-client status sshd" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — SSH PROTECTED      │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+200") + dim("   Fail2ban: sshd jail enabled, 3 attempts = 1h ban, port hardened.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("patch enable | bantime | maxretry | port") + "\r\n" +
      "  " + cyan("systemctl restart fail2ban") + "  ·  " + cyan("fail2ban-client status sshd") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/etc/fail2ban") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/etc/fail2ban/README"] : undefined) ?? (args[0] === "jail.local" ? state.fs["/etc/fail2ban/jail.local"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/etc/fail2ban/jail.local" ? "inspect" : undefined }
    },
    patch: ({ state, args }) => {
      const p = "/etc/fail2ban/jail.local"
      let c = state.fs[p]?.content ?? ""
      if (args[0] === "enable") {
        if (/enabled = true/m.test(c)) return { stdout: yellow("already patched"), goalMet: "enable" }
        c = c.replace("enabled = false", "enabled = true")
        return { stdout: green("Enabled sshd jail"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, ENABLED: "true" } }, goalMet: "enable" }
      }
      if (args[0] === "bantime") {
        if (/bantime = 3600/m.test(c)) return { stdout: yellow("already patched"), goalMet: "bantime" }
        c = c.replace("bantime = 600", "bantime = 3600")
        return { stdout: green("Reduced bantime to 3600 seconds"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, BANTIME: "3600" } }, goalMet: "bantime" }
      }
      if (args[0] === "maxretry") {
        if (/maxretry = 3/m.test(c)) return { stdout: yellow("already patched"), goalMet: "maxretry" }
        c = c.replace(/maxretry = 5/g, "maxretry = 3")
        return { stdout: green("Reduced maxretry to 3"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, MAXRETRY: "3" } }, goalMet: "maxretry" }
      }
      if (args[0] === "port") {
        if (/port = 2222/m.test(c)) return { stdout: yellow("already patched"), goalMet: "port" }
        c = c.replace("port = ssh", "port = 2222")
        return { stdout: green("Changed port to 2222 (hardened)"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, PORT: "hardened" } }, goalMet: "port" }
      }
      return { stderr: "patch: unknown. Try 'patch enable' / 'patch bantime' / 'patch maxretry' / 'patch port'" }
    },
    systemctl: ({ state, args }) => {
      if (args[0] === "restart" && args[1] === "fail2ban") {
        if (state.env.ENABLED !== "true") return { stderr: "systemctl: error — sshd jail not enabled" }
        return {
          stdout: green("fail2ban service restarted"),
          statePatch: { env: { ...state.env, RESTARTED: "yes" } },
          goalMet: "restart",
        }
      }
      return { stderr: "systemctl: command not supported. Try 'systemctl restart fail2ban'" }
    },
    "fail2ban-client": ({ state, args }) => {
      if (args[0] === "status" && args[1] === "sshd") {
        if (state.env.RESTARTED !== "yes") return { stderr: "fail2ban-client: error — service not restarted" }
        return {
          stdout: green("Status for the jail: sshd\n|- Filter\n|  |- Currently failed: 0\n|  |- Total failed:     0\n|  `- File list:       /var/log/auth.log\n`- Actions\n   |- Currently banned: 0\n   |- Total banned:     0\n   `- Banned IP list:"),
          statePatch: { env: { ...state.env, STATUS_OK: "yes" } },
          goalMet: "status",
        }
      }
      return { stderr: "fail2ban-client: command not supported. Try 'fail2ban-client status sshd'" }
    },
    hint: ({ state }) => {
      const r = fail2banSetupMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + fail2banSetupMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
