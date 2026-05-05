import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/blue-team",
  fs: {
    "/blue-team/README": {
      content: `Mission: Blue Teaming — Defend the Fortress
=================================================

The attacker is coming. Defend the fortress. Detect, respond, recover.

OBJECTIVES:
1. Monitor for threats
2. Detect intrusions
3. Respond to incidents
4. Improve defenses

COMMANDS:
- monitor [threat-vector]
- detect [intrusion]
- respond [incident]
- improve [defense]

THREAT VECTORS:
- network-traffic
- system-logs
- application-events
- user-behavior

INTRUSIONS:
- unauthorized-access
- data-exfiltration
- privilege-escalation
- malware-infection

INCIDENTS:
- containment
- eradication
- recovery
- lessons-learned

DEFENSES:
- detection-rules
- response-playbooks
- security-controls
- monitoring-upgrades`,
      mode: "ro",
    },
  },
  env: {
    "monitoring-active": "false",
    "intrusion-detected": "false",
    "incident-responded": "false",
    "defenses-improved": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialBlueTeamingMission: Mission = {
  slug: "adversarial-blue-teaming",
  title: "Blue teaming — defend the fortress",
  brief: "The attacker is coming. Defend the fortress. Detect, respond, recover.",
  welcome: "Welcome to the Blue Teaming mission. The attacker is coming. Use 'monitor [threat-vector]' to watch for attacks, 'detect [intrusion]' to identify breaches, 'respond [incident]' to handle incidents, and 'improve [defense]' to strengthen security.",
  prompt: "blueteam@hodlberg-security:/blue-team$ ",
  goals: [
    { id: "monitor", label: "Monitor for threats", hint: "monitor network-traffic" },
    { id: "detect", label: "Detect intrusions", hint: "detect unauthorized-access" },
    { id: "respond", label: "Respond to incidents", hint: "respond containment" },
    { id: "improve", label: "Improve defenses", hint: "improve detection-rules" },
  ],
  commands: {
    monitor: ({ state, args }) => {
      const vector = args[0]
      const validVectors = ["network-traffic", "system-logs", "application-events", "user-behavior"]
      if (validVectors.includes(vector)) {
        return {
          stdout: `✅ Monitoring active: ${vector}. Threat vector monitored. Baselines established. Anomalies tracked.`,
          statePatch: { env: { "monitoring-active": "true" } },
          goalMet: "monitor",
        }
      }
      return { stdout: `Unknown vector: ${vector}. Available: ${validVectors.join(", ")}` }
    },
    detect: ({ state, args }) => {
      const intrusion = args[0]
      const validIntrusions = ["unauthorized-access", "data-exfiltration", "privilege-escalation", "malware-infection"]
      if (validIntrusions.includes(intrusion)) {
        if (state.env["monitoring-active"] === "true") {
          return {
            stdout: `✅ Intrusion detected: ${intrusion}. Attack identified. Impact assessed. Alert triggered.`,
            statePatch: { env: { "intrusion-detected": "true" } },
            goalMet: "detect",
          }
        }
        return {
          stdout: "❌ Detection failed: Monitor threats first.",
        }
      }
      return { stdout: `Unknown intrusion: ${intrusion}. Available: ${validIntrusions.join(", ")}` }
    },
    respond: ({ state, args }) => {
      const incident = args[0]
      const validIncidents = ["containment", "eradication", "recovery", "lessons-learned"]
      if (validIncidents.includes(incident)) {
        if (state.env["intrusion-detected"] === "true") {
          return {
            stdout: `✅ Incident responded: ${incident}. Response executed. Attacker contained. Damage minimized.`,
            statePatch: { env: { "incident-responded": "true" } },
            goalMet: "respond",
          }
        }
        return {
          stdout: "❌ Response failed: Detect intrusion first.",
        }
      }
      return { stdout: `Unknown incident: ${incident}. Available: ${validIncidents.join(", ")}` }
    },
    improve: ({ state, args }) => {
      const defense = args[0]
      const validDefenses = ["detection-rules", "response-playbooks", "security-controls", "monitoring-upgrades"]
      if (validDefenses.includes(defense)) {
        if (state.env["incident-responded"] === "true") {
          return {
            stdout: `✅ Defenses improved: ${defense}. Security posture enhanced. Gaps closed. Lessons incorporated.`,
            statePatch: { env: { "defenses-improved": "true" } },
            goalMet: "improve",
          }
        }
        return {
          stdout: "❌ Improvement failed: Respond to incident first.",
        }
      }
      return { stdout: `Unknown defense: ${defense}. Available: ${validDefenses.join(", ")}` }
    },
  },
  initialState,
  success: "Blue teaming completed successfully. You monitored threats, detected intrusions, responded to incidents, and improved defenses. The fortress is stronger.",
}
