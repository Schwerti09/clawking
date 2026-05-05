import type { Mission } from "../missionEngine"

const initialState = {
  logs: [
    { timestamp: "2026-05-05 03:12:45", level: "INFO", service: "nginx", message: "Starting nginx worker process" },
    { timestamp: "2026-05-05 03:13:02", level: "INFO", service: "app", message: "Application server ready on port 3000" },
    { timestamp: "2026-05-05 03:15:33", level: "WARN", service: "auth", message: "Failed login attempt from 192.168.1.100" },
    { timestamp: "2026-05-05 03:16:18", level: "ERROR", service: "database", message: "Connection timeout to primary DB" },
    { timestamp: "2026-05-05 03:17:45", level: "CRITICAL", service: "api", message: "Rate limit exceeded for user_id: 4521" },
  ],
  alerts: [],
  triage: {
    severity: null,
    category: null,
    action: null,
  },
}

export const incidentDetectionBasicsMission: Mission = {
  slug: "incident-detection-basics",
  title: "Detect the real alert from the noise",
  brief: "Filter log noise, triage the incident, trigger the right playbook.",
  prompt: "defender@hodlberg-soc:/var/log$ ",
  goals: [
    { id: "inspect", label: "Inspect the log stream", hint: "cat /var/log/syslog" },
    { id: "filter", label: "Filter for critical events", hint: "grep -i critical /var/log/syslog" },
    { id: "triage", label: "Triage the incident severity", hint: "triage critical" },
    { id: "alert", label: "Trigger the alert", hint: "alert critical" },
  ],
  commands: {
    cat: ({ state, args }) => {
      if (args[0] === "/var/log/syslog") {
        return {
          output: state.logs.map((log) => 
            `${log.timestamp} [${log.level}] ${log.service}: ${log.message}`
          ).join("\n"),
          state,
        }
      }
      return { output: "File not found. Try: cat /var/log/syslog", state }
    },
    grep: ({ state, args }) => {
      if (args[0] === "-i" && args[1] === "critical" && args[2] === "/var/log/syslog") {
        const criticalLogs = state.logs.filter((log) => log.level === "CRITICAL")
        return {
          output: criticalLogs.map((log) => 
            `${log.timestamp} [${log.level}] ${log.service}: ${log.message}`
          ).join("\n"),
          state: { ...state, triage: { ...state.triage, severity: "critical" } },
        }
      }
      return { output: "Usage: grep -i critical /var/log/syslog", state }
    },
    triage: ({ state, args }) => {
      if (args[0] === "critical") {
        return {
          output: "Triage: CRITICAL severity detected. Category: API Abuse. Recommended action: Block IP and notify team.",
          state: { ...state, triage: { ...state.triage, category: "api-abuse", action: "block-ip" } },
        }
      }
      return { output: "Usage: triage [severity]", state }
    },
    alert: ({ state, args }) => {
      if (args[0] === "critical") {
        if (state.triage.action === "block-ip") {
          return {
            output: "✅ ALERT TRIGGERED: Critical incident escalated. IP blocked, team notified via pagerduty.",
            state: { ...state, alerts: [...state.alerts, { severity: "critical", triggered: true }] },
          }
        }
        return { output: "❌ Alert failed: Triage incomplete. Run 'triage critical' first.", state }
      }
      return { output: "Usage: alert [severity]", state }
    },
  },
  initialState,
  status: ({ state }) => {
    const criticalAlertTriggered = state.alerts.some((a) => a.severity === "critical" && a.triggered)
    if (criticalAlertTriggered) return "success"
    if (state.triage.severity === "critical") return "in_progress"
    return "pending"
  },
  successMessage: "Incident detected and escalated. The real alert was identified from the noise. You're ready for the 03:00 wake-up call.",
}
