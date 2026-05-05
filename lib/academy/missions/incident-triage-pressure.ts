import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/incident",
  fs: {
    "/incident/README": {
      content: `Mission: Incident Triage under Pressure
==========================================

03:00 AM. PagerDuty goes off. You have 5 minutes to triage. No panic.

OBJECTIVES:
1. Assess the incident severity
2. Classify the incident type
3. Determine the response level
4. Escalate to the right team

COMMANDS:
- assess severity
- classify [type]
- determine [level]
- escalate [team]

SEVERITY LEVELS:
- low
- medium
- high
- critical

INCIDENT TYPES:
- data-breach
- service-outage
- security-incident
- compliance-violation

RESPONSE LEVELS:
- level-1 (monitor)
- level-2 (investigate)
- level-3 (respond)
- level-4 (crisis)

TEAMS:
- ops
- security
- legal
- executive`,
      mode: "ro",
    },
  },
  env: {
    "severity-assessed": "false",
    "type-classified": "false",
    "level-determined": "false",
    "team-escalated": "false",
  },
  goalsMet: [],
  history: [],
}

export const incidentTriagePressureMission: Mission = {
  slug: "incident-triage-pressure",
  title: "Triage under pressure — 03:00 AM wake-up call",
  brief: "PagerDuty goes off at 03:00. You have 5 minutes to triage. No panic.",
  welcome: "Welcome to the Incident Triage under Pressure mission. It's 03:00 AM and PagerDuty is going off. You have 5 minutes to triage the incident. Use 'assess severity' to evaluate impact, 'classify [type]' to identify the incident type, 'determine [level]' to set the response level, and 'escalate [team]' to notify the right team. Stay calm.",
  prompt: "oncall@hodlberg-soc:/incident$ ",
  goals: [
    { id: "assess", label: "Assess the incident severity", hint: "assess severity" },
    { id: "classify", label: "Classify the incident type", hint: "classify data-breach" },
    { id: "determine", label: "Determine the response level", hint: "determine level-4" },
    { id: "escalate", label: "Escalate to the right team", hint: "escalate executive" },
  ],
  commands: {
    assess: ({ state, args }) => {
      if (args[0] === "severity") {
        return {
          stdout: "Incident severity assessment:\n\n- User impact: 10,000 users affected\n- Data exposure: Potential PII exposure\n- Service availability: 50% of services down\n- Financial impact: Estimated €50K/hour loss\n\nSeverity: CRITICAL. This requires immediate executive escalation.",
          statePatch: { env: { "severity-assessed": "true" } },
          goalMet: "assess",
        }
      }
      return { stdout: "Usage: assess severity" }
    },
    classify: ({ state, args }) => {
      const type = args[0]
      const validTypes = ["data-breach", "service-outage", "security-incident", "compliance-violation"]
      if (validTypes.includes(type)) {
        return {
          stdout: `✅ Incident classified: ${type}. This matches the observed patterns.`,
          statePatch: { env: { "type-classified": "true" } },
          goalMet: "classify",
        }
      }
      return { stdout: `Unknown type: ${type}. Available: ${validTypes.join(", ")}` }
    },
    determine: ({ state, args }) => {
      const level = args[0]
      const validLevels = ["level-1", "level-2", "level-3", "level-4"]
      if (validLevels.includes(level)) {
        return {
          stdout: `✅ Response level determined: ${level}. Crisis response activated.`,
          statePatch: { env: { "level-determined": "true" } },
          goalMet: "determine",
        }
      }
      return { stdout: `Unknown level: ${level}. Available: ${validLevels.join(", ")}` }
    },
    escalate: ({ state, args }) => {
      const team = args[0]
      const validTeams = ["ops", "security", "legal", "executive"]
      if (validTeams.includes(team)) {
        if (state.env["severity-assessed"] === "true" && state.env["type-classified"] === "true" && state.env["level-determined"] === "true") {
          return {
            stdout: `✅ Escalated to ${team}. Crisis team notified. Incident response activated.`,
            statePatch: { env: { "team-escalated": "true" } },
            goalMet: "escalate",
          }
        }
        return {
          stdout: "❌ Escalation failed: Complete assessment, classification, and level determination first.",
        }
      }
      return { stdout: `Unknown team: ${team}. Available: ${validTeams.join(", ")}` }
    },
  },
  initialState,
  success: "Incident triaged successfully under pressure. You assessed severity, classified the incident, determined the response level, and escalated to the right team. The crisis response is now active. You're ready for the 03:00 wake-up call.",
}
