// Mission M-025 — "Incident Response: analyze logs to detect breach"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const LOG_FILE_INITIAL = `# /var/log/auth.log — recent authentication attempts
May  5 10:23:15 hodlberg sshd[1234]: Accepted publickey for admin from 192.168.1.100 port 22
May  5 10:24:02 hodlberg sshd[1235]: Failed password for root from 203.0.113.42 port 22
May  5 10:24:45 hodlberg sshd[1236]: Failed password for root from 203.0.113.42 port 22
May  5 10:25:30 hodlberg sshd[1237]: Failed password for root from 203.0.113.42 port 22
May  5 10:26:15 hodlberg sshd[1238]: Accepted publickey for admin from 203.0.113.42 port 22
May  5 10:27:00 hodlberg sshd[1239]: sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/bash
May  5 10:28:45 hodlberg sshd[1240]: Failed password for admin from 198.51.100.23 port 22
May  5 10:29:30 hodlberg sshd[1241]: Failed password for admin from 198.51.100.23 port 22
May  5 10:30:15 hodlberg sshd[1242]: Failed password for admin from 198.51.100.23 port 22
May  5 10:31:00 hodlberg sshd[1243]: Accepted publickey for admin from 198.51.100.23 port 22
May  5 10:32:45 hodlberg sshd[1244]: sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/cat /etc/shadow
`

const README = `Mission M-025 — Incident Log Analysis
=====================================

BRIEF
  Your auth.log shows suspicious login patterns. Analyze the logs to
  detect a potential breach, identify the attacker IP, and recommend
  containment actions.

OBJECTIVES
  1. Inspect the auth.log
  2. Identify suspicious IP addresses
  3. Count failed login attempts per IP
  4. Identify successful breach
  5. Generate incident report
  6. Recommend containment actions

HINTS
  cat /var/log/auth.log
  grep Failed
  grep Accepted
  analyze ips
  generate report
  recommend containment
`

const initialState: MissionState = {
  cwd: "/var/log",
  fs: {
    "/var/log/README": { content: README, mode: "ro" },
    "/var/log/auth.log": { content: LOG_FILE_INITIAL, mode: "rw" },
  },
  env: { INSPECTED: "no", SUSPICIOUS_IPS: "no", FAILED_COUNT: "no", BREACH_ID: "no", REPORT: "no", CONTAINMENT: "no" },
  goalsMet: [],
  history: [],
}

export const incidentLogAnalysisMission: Mission = {
  slug: "incident-log-analysis",
  title: "Incident Response: analyze logs to detect breach",
  brief: "Your auth.log shows suspicious login patterns. Analyze logs: identify suspicious IPs, count failed attempts, detect breach, generate report.",
  prompt: "defender@hodlberg-ir:/var/log$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-025 — INCIDENT LOG ANALYSIS") + bold(cyan("  │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "auth.log · incident response · breach detection\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "inspect", label: "Inspect the auth.log", hint: "cat /var/log/auth.log" },
    { id: "suspicious", label: "Identify suspicious IP addresses", hint: "analyze ips" },
    { id: "failed", label: "Count failed login attempts per IP", hint: "grep Failed" },
    { id: "breach", label: "Identify successful breach", hint: "grep Accepted" },
    { id: "report", label: "Generate incident report", hint: "generate report" },
    { id: "containment", label: "Recommend containment actions", hint: "recommend containment" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — BREACH DETECTED   │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+280") + dim("   Incident: 203.0.113.42 breached (3 failed + 1 success). Containment: block IP, rotate keys.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("grep Failed | Accepted") + "\r\n" +
      "  " + cyan("analyze ips | generate report | recommend containment") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/var/log") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/var/log/README"] : undefined) ?? (args[0] === "auth.log" ? state.fs["/var/log/auth.log"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/var/log/auth.log" ? "inspect" : undefined }
    },
    grep: ({ state, args }) => {
      const c = state.fs["/var/log/auth.log"]?.content ?? ""
      if (args[0] === "Failed") {
        const lines = c.split("\n").filter((l) => l.includes("Failed"))
        return { stdout: lines.join("\n"), goalMet: "failed" }
      }
      if (args[0] === "Accepted") {
        const lines = c.split("\n").filter((l) => l.includes("Accepted"))
        return { stdout: lines.join("\n"), goalMet: "breach" }
      }
      return { stderr: "grep: pattern not found. Try 'grep Failed' or 'grep Accepted'" }
    },
    analyze: ({ state, args }) => {
      if (args[0] === "ips") {
        const c = state.fs["/var/log/auth.log"]?.content ?? ""
        const ips = c.match(/\d+\.\d+\.\d+\.\d+/g) ?? []
        const uniqueIps = [...new Set(ips)]
        return {
          stdout: green("Suspicious IPs detected:\n  203.0.113.42 (3 failed + 1 success)\n  198.51.100.23 (3 failed + 1 success)\n  192.168.1.100 (1 success - internal)"),
          statePatch: { env: { ...state.env, SUSPICIOUS_IPS: "yes" } },
          goalMet: "suspicious",
        }
      }
      return { stderr: "analyze: command not supported. Try 'analyze ips'" }
    },
    generate: ({ state, args }) => {
      if (args[0] === "report") {
        return {
          stdout: green("INCIDENT REPORT\n=============\nTime: 2026-05-05 10:23-10:32\nSeverity: HIGH\nAttacker IPs: 203.0.113.42, 198.51.100.23\nBreach confirmed: 203.0.113.42 (root access)\nPrivilege escalation: sudo /bin/cat /etc/shadow\nRecommendation: Immediate containment"),
          statePatch: { env: { ...state.env, REPORT: "yes" } },
          goalMet: "report",
        }
      }
      return { stderr: "generate: command not supported. Try 'generate report'" }
    },
    recommend: ({ state, args }) => {
      if (args[0] === "containment") {
        return {
          stdout: green("CONTAINMENT ACTIONS\n===================\n1. Block 203.0.113.42 and 198.51.100.23 in firewall\n2. Revoke admin SSH keys\n3. Rotate all credentials\n4. Enable fail2ban\n5. Audit system for persistence"),
          statePatch: { env: { ...state.env, CONTAINMENT: "yes" } },
          goalMet: "containment",
        }
      }
      return { stderr: "recommend: command not supported. Try 'recommend containment'" }
    },
    hint: ({ state }) => {
      const r = incidentLogAnalysisMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + incidentLogAnalysisMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
