// Mission M-029 — "Prometheus Alerting: configure critical security alerts"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const ALERT_RULES_INITIAL = `# /app/prometheus-alerts.yml — no critical alerts
groups:
  - name: application
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        annotations:
          summary: "High error rate detected"
`

const README = `Mission M-029 — Prometheus Alerting
===================================

BRIEF
  Your Prometheus has only a basic error rate alert. Critical security
  events like brute-force attacks, suspicious logins, and certificate
  expiry are not monitored. Configure comprehensive alerting for
  security incidents.

OBJECTIVES
  1. Inspect the alert rules
  2. Add brute-force attack alert
  3. Add certificate expiry alert
  4. Add suspicious login alert
  5. Add high CPU usage alert
  6. Validate alert rules

HINTS
  cat prometheus-alerts.yml
  patch brute-force
  patch cert-expiry
  patch suspicious-login
  patch high-cpu
  validate rules
`

const initialState: MissionState = {
  cwd: "/app",
  fs: {
    "/app/README": { content: README, mode: "ro" },
    "/app/prometheus-alerts.yml": { content: ALERT_RULES_INITIAL, mode: "rw" },
  },
  env: { INSPECTED: "no", BRUTE_FORCE: "no", CERT_EXPIRY: "no", SUSPICIOUS_LOGIN: "no", HIGH_CPU: "no", VALIDATED: "no" },
  goalsMet: [],
  history: [],
}

export const prometheusAlertingMission: Mission = {
  slug: "prometheus-alerting",
  title: "Prometheus Alerting: configure critical security alerts",
  brief: "Your Prometheus has only basic error rate alert. Configure comprehensive security alerting: brute-force attacks, certificate expiry, suspicious logins, high CPU.",
  prompt: "defender@hodlberg-monitoring:/app$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-029 — PROMETHEUS ALERTING") + bold(cyan("   │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "Prometheus · Alertmanager · security monitoring\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "inspect", label: "Inspect the alert rules", hint: "cat prometheus-alerts.yml" },
    { id: "brute-force", label: "Add brute-force attack alert", hint: "patch brute-force" },
    { id: "cert-expiry", label: "Add certificate expiry alert", hint: "patch cert-expiry" },
    { id: "suspicious-login", label: "Add suspicious login alert", hint: "patch suspicious-login" },
    { id: "high-cpu", label: "Add high CPU usage alert", hint: "patch high-cpu" },
    { id: "validate", label: "Validate alert rules", hint: "validate rules" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — ALERTS CONFIGURED │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+250") + dim("   Prometheus: brute-force, cert-expiry, suspicious-login, high-CPU alerts configured and validated.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("patch brute-force | cert-expiry | suspicious-login | high-cpu") + "\r\n" +
      "  " + cyan("validate rules") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/app/README"] : undefined) ?? (args[0] === "prometheus-alerts.yml" ? state.fs["/app/prometheus-alerts.yml"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/app/prometheus-alerts.yml" ? "inspect" : undefined }
    },
    patch: ({ state, args }) => {
      const p = "/app/prometheus-alerts.yml"
      let c = state.fs[p]?.content ?? ""
      if (args[0] === "brute-force") {
        if (/BruteForceAttack/m.test(c)) return { stdout: yellow("already patched"), goalMet: "brute-force" }
        c = c.replace('summary: "High error rate detected"', 'summary: "High error rate detected"\n      - alert: BruteForceAttack\n        expr: rate(sshd_failed_logins[5m]) > 10\n        for: 2m\n        annotations:\n          summary: "Brute-force attack detected"')
        return { stdout: green("Added brute-force attack alert"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, BRUTE_FORCE: "yes" } }, goalMet: "brute-force" }
      }
      if (args[0] === "cert-expiry") {
        if (/CertificateExpiry/m.test(c)) return { stdout: yellow("already patched"), goalMet: "cert-expiry" }
        c = c.replace('summary: "Brute-force attack detected"', 'summary: "Brute-force attack detected"\n      - alert: CertificateExpiry\n        expr: (ssl_cert_not_after - time()) < 86400 * 30\n        for: 1h\n        annotations:\n          summary: "Certificate expires in less than 30 days"')
        return { stdout: green("Added certificate expiry alert"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, CERT_EXPIRY: "yes" } }, goalMet: "cert-expiry" }
      }
      if (args[0] === "suspicious-login") {
        if (/SuspiciousLogin/m.test(c)) return { stdout: yellow("already patched"), goalMet: "suspicious-login" }
        c = c.replace('summary: "Certificate expires in less than 30 days"', 'summary: "Certificate expires in less than 30 days"\n      - alert: SuspiciousLogin\n        expr: rate(auth_logins{success="false"}[5m]) > 5\n        for: 3m\n        annotations:\n          summary: "Suspicious login pattern detected"')
        return { stdout: green("Added suspicious login alert"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, SUSPICIOUS_LOGIN: "yes" } }, goalMet: "suspicious-login" }
      }
      if (args[0] === "high-cpu") {
        if (/HighCPUUsage/m.test(c)) return { stdout: yellow("already patched"), goalMet: "high-cpu" }
        c = c.replace('summary: "Suspicious login pattern detected"', 'summary: "Suspicious login pattern detected"\n      - alert: HighCPUUsage\n        expr: rate(process_cpu_seconds_total[5m]) > 0.8\n        for: 5m\n        annotations:\n          summary: "High CPU usage detected (potential crypto-mining)"')
        return { stdout: green("Added high CPU usage alert"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, HIGH_CPU: "yes" } }, goalMet: "high-cpu" }
      }
      return { stderr: "patch: unknown. Try 'patch brute-force' / 'patch cert-expiry' / 'patch suspicious-login' / 'patch high-cpu'" }
    },
    validate: ({ state, args }) => {
      if (args[0] === "rules") {
        if (state.env.BRUTE_FORCE !== "yes" || state.env.CERT_EXPIRY !== "yes" || state.env.SUSPICIOUS_LOGIN !== "yes" || state.env.HIGH_CPU !== "yes") return { stderr: "validate: error — not all alerts configured" }
        return {
          stdout: green("Alert rules validation:\n  ✓ BruteForceAttack: valid\n  ✓ CertificateExpiry: valid\n  ✓ SuspiciousLogin: valid\n  ✓ HighCPUUsage: valid\n  ✓ HighErrorRate: valid\n  ✓ All alerts ready for deployment"),
          statePatch: { env: { ...state.env, VALIDATED: "yes" } },
          goalMet: "validate",
        }
      }
      return { stderr: "validate: command not supported. Try 'validate rules'" }
    },
    hint: ({ state }) => {
      const r = prometheusAlertingMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + prometheusAlertingMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
