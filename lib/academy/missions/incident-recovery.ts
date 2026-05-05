import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/recovery",
  fs: {
    "/recovery/README": {
      content: `Mission: Incident Recovery — Restore and Verify
================================================

The breach is contained. Now restore services and verify integrity.

OBJECTIVES:
1. Restore from backups
2. Verify system integrity
3. Monitor for anomalies
4. Declare recovery complete

COMMANDS:
- restore [system]
- verify [integrity-check]
- monitor [anomaly-detection]
- declare recovery

SYSTEMS:
- web-server
- database
- api-gateway
- auth-service

INTEGRITY CHECKS:
- hash-verification
- config-audit
- dependency-check
- log-review

ANOMALY DETECTION:
- traffic-analysis
- behavior-analysis
- resource-monitoring
- security-scan`,
      mode: "ro",
    },
  },
  env: {
    "systems-restored": "false",
    "integrity-verified": "false",
    "anomalies-monitored": "false",
    "recovery-declared": "false",
  },
  goalsMet: [],
  history: [],
}

export const incidentRecoveryMission: Mission = {
  slug: "incident-recovery",
  title: "Incident recovery — restore and verify",
  brief: "The breach is contained. Restore services from backups and verify system integrity.",
  welcome: "Welcome to the Incident Recovery mission. The breach is contained — now restore services and verify integrity. Use 'restore [system]' to bring systems back online, 'verify [integrity-check]' to confirm no backdoors, 'monitor [anomaly-detection]' to watch for suspicious activity, and 'declare recovery' when confident.",
  prompt: "recovery@hodlberg-soc:/recovery$ ",
  goals: [
    { id: "restore", label: "Restore from backups", hint: "restore web-server" },
    { id: "verify", label: "Verify system integrity", hint: "verify hash-verification" },
    { id: "monitor", label: "Monitor for anomalies", hint: "monitor traffic-analysis" },
    { id: "declare", label: "Declare recovery complete", hint: "declare recovery" },
  ],
  commands: {
    restore: ({ state, args }) => {
      const system = args[0]
      const validSystems = ["web-server", "database", "api-gateway", "auth-service"]
      if (validSystems.includes(system)) {
        return {
          stdout: `✅ System restored: ${system}. Restored from clean backup. Configuration verified.`,
          statePatch: { env: { "systems-restored": "true" } },
          goalMet: "restore",
        }
      }
      return { stdout: `Unknown system: ${system}. Available: ${validSystems.join(", ")}` }
    },
    verify: ({ state, args }) => {
      const check = args[0]
      const validChecks = ["hash-verification", "config-audit", "dependency-check", "log-review"]
      if (validChecks.includes(check)) {
        if (state.env["systems-restored"] === "true") {
          return {
            stdout: `✅ Integrity verified: ${check}. No backdoors detected. System integrity confirmed.`,
            statePatch: { env: { "integrity-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Restore systems first.",
        }
      }
      return { stdout: `Unknown check: ${check}. Available: ${validChecks.join(", ")}` }
    },
    monitor: ({ state, args }) => {
      const monitoring = args[0]
      const validMonitoring = ["traffic-analysis", "behavior-analysis", "resource-monitoring", "security-scan"]
      if (validMonitoring.includes(monitoring)) {
        if (state.env["integrity-verified"] === "true") {
          return {
            stdout: `✅ Monitoring active: ${monitoring}. No anomalies detected. Systems stable.`,
            statePatch: { env: { "anomalies-monitored": "true" } },
            goalMet: "monitor",
          }
        }
        return {
          stdout: "❌ Monitoring failed: Verify integrity first.",
        }
      }
      return { stdout: `Unknown monitoring: ${monitoring}. Available: ${validMonitoring.join(", ")}` }
    },
    declare: ({ state, args }) => {
      if (args[0] === "recovery") {
        if (state.env["anomalies-monitored"] === "true") {
          return {
            stdout: "✅ Recovery declared: All systems restored, integrity verified, no anomalies detected. Incident recovery complete. Services back to normal operation.",
            statePatch: { env: { "recovery-declared": "true" } },
            goalMet: "declare",
          }
        }
        return {
          stdout: "❌ Recovery declaration failed: Monitor for anomalies first.",
        }
      }
      return { stdout: "Usage: declare recovery" }
    },
  },
  initialState,
  success: "Incident recovery completed successfully. You restored systems from backups, verified integrity, monitored for anomalies, and declared recovery complete. Services are back to normal operation with confidence.",
}
