import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Insider Threat — Act V
===========================================

Post-acquisition. Integration complete. But the real threat is inside. A trusted employee is selling data.

OBJECTIVES:
1. Detect insider activity
2. Investigate the employee
3. Gather evidence
4. Decide: Fire or prosecute?

COMMANDS:
- detect [activity]
- investigate [employee]
- gather [evidence]
- decide [action]

ACTIVITY:
- data-exfiltration
- unauthorized-access
- credential-sharing
- system-modification

EMPLOYEE:
- background-check
- access-logs
- communication-logs
- financial-records

EVIDENCE:
- screenshots
- logs
- emails
- witness-testimony

ACTIONS:
- fire-employee
- prosecute
- negotiate-nda
- internal-discipline`,
      mode: "ro",
    },
  },
  env: {
    "detected": "false",
    "investigated": "false",
    "evidence-gathered": "false",
    "decided": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergInsiderThreatMission: Mission = {
  slug: "hodlberg-insider-threat",
  title: "The Insider Threat — Act V",
  brief: "Post-acquisition. Integration complete. But the real threat is inside. A trusted employee is selling data.",
  welcome: "Welcome to the Hodlberg Insider Threat mission. Post-acquisition, integration complete. But the real threat is inside. Use 'detect [activity]' to find suspicious behavior, 'investigate [employee]' to check the suspect, 'gather [evidence]' to build a case, and 'decide [action]' to choose your response.",
  prompt: "security@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "detect", label: "Detect insider activity", hint: "detect data-exfiltration" },
    { id: "investigate", label: "Investigate the employee", hint: "investigate background-check" },
    { id: "gather", label: "Gather evidence", hint: "gather screenshots" },
    { id: "decide", label: "Decide: Fire or prosecute?", hint: "decide prosecute" },
  ],
  commands: {
    detect: ({ state, args }) => {
      const activity = args[0]
      const validActivities = ["data-exfiltration", "unauthorized-access", "credential-sharing", "system-modification"]
      if (validActivities.includes(activity)) {
        return {
          stdout: `✅ Activity detected: ${activity}. Insider threat identified. Pattern recognized. Risk assessed.`,
          statePatch: { env: { "detected": "true" } },
          goalMet: "detect",
        }
      }
      return { stdout: `Unknown activity: ${activity}. Available: ${validActivities.join(", ")}` }
    },
    investigate: ({ state, args }) => {
      const employee = args[0]
      const validEmployees = ["background-check", "access-logs", "communication-logs", "financial-records"]
      if (validEmployees.includes(employee)) {
        if (state.env["detected"] === "true") {
          return {
            stdout: `✅ Employee investigated: ${employee}. Suspect profiled. Motives understood. Opportunity confirmed.`,
            statePatch: { env: { "investigated": "true" } },
            goalMet: "investigate",
          }
        }
        return {
          stdout: "❌ Investigation failed: Detect activity first.",
        }
      }
      return { stdout: `Unknown employee: ${employee}. Available: ${validEmployees.join(", ")}` }
    },
    gather: ({ state, args }) => {
      const evidence = args[0]
      const validEvidence = ["screenshots", "logs", "emails", "witness-testimony"]
      if (validEvidence.includes(evidence)) {
        if (state.env["investigated"] === "true") {
          return {
            stdout: `✅ Evidence gathered: ${evidence}. Case built. Documentation complete. Legal review ready.`,
            statePatch: { env: { "evidence-gathered": "true" } },
            goalMet: "gather",
          }
        }
        return {
          stdout: "❌ Gathering failed: Investigate employee first.",
        }
      }
      return { stdout: `Unknown evidence: ${evidence}. Available: ${validEvidence.join(", ")}` }
    },
    decide: ({ state, args }) => {
      const action = args[0]
      const validActions = ["fire-employee", "prosecute", "negotiate-nda", "internal-discipline"]
      if (validActions.includes(action)) {
        if (state.env["evidence-gathered"] === "true") {
          return {
            stdout: `✅ Decision made: ${action}. Course of action chosen. Legal counsel consulted. HR notified.`,
            statePatch: { env: { "decided": "true" } },
            goalMet: "decide",
          }
        }
        return {
          stdout: "❌ Decision failed: Gather evidence first.",
        }
      }
      return { stdout: `Unknown action: ${action}. Available: ${validActions.join(", ")}` }
    },
  },
  initialState,
  success: "Insider threat handled. You detected activity, investigated the employee, gathered evidence, and decided on action. The insider threat is neutralized. Trust is rebuilt.",
}
