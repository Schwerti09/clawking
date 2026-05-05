import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/threat-intel",
  fs: {
    "/threat-intel/README": {
      content: `Mission: Threat Intelligence — Know Your Enemy
===================================================

Intelligence-driven security. Know your enemy before they attack.

OBJECTIVES:
1. Collect threat data
2. Analyze threat actors
3. Produce intelligence
4. Apply intelligence

COMMANDS:
- collect [data-source]
- analyze [actor]
- produce [intel-type]
- apply [intelligence]

DATA SOURCES:
- open-source-intel
- commercial-feeds
- industry-sharing
- internal-telemetry

ACTORS:
- apt-groups
- ransomware-gangs
- hacktivists
- script-kiddies

INTEL TYPES:
- strategic-intel
- tactical-intel
- operational-intel
- technical-intel

INTELLIGENCE:
- detection-rules
- threat-hunting
- risk-scoring
- incident-response`,
      mode: "ro",
    },
  },
  env: {
    "data-collected": "false",
    "actors-analyzed": "false",
    "intel-produced": "false",
    "intelligence-applied": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialThreatIntelMission: Mission = {
  slug: "adversarial-threat-intel",
  title: "Threat intelligence — know your enemy",
  brief: "Intelligence-driven security. Know your enemy before they attack.",
  welcome: "Welcome to the Threat Intelligence mission. Intelligence-driven security. Use 'collect [data-source]' to gather threat data, 'analyze [actor]' to understand attackers, 'produce [intel-type]' to create intelligence, and 'apply [intelligence]' to strengthen defenses.",
  prompt: "intel@hodlberg-security:/threat-intel$ ",
  goals: [
    { id: "collect", label: "Collect threat data", hint: "collect open-source-intel" },
    { id: "analyze", label: "Analyze threat actors", hint: "analyze apt-groups" },
    { id: "produce", label: "Produce intelligence", hint: "produce strategic-intel" },
    { id: "apply", label: "Apply intelligence", hint: "apply detection-rules" },
  ],
  commands: {
    collect: ({ state, args }) => {
      const source = args[0]
      const validSources = ["open-source-intel", "commercial-feeds", "industry-sharing", "internal-telemetry"]
      if (validSources.includes(source)) {
        return {
          stdout: `✅ Data collected: ${source}. Threat data gathered. Indicators extracted. Context enriched.`,
          statePatch: { env: { "data-collected": "true" } },
          goalMet: "collect",
        }
      }
      return { stdout: `Unknown source: ${source}. Available: ${validSources.join(", ")}` }
    },
    analyze: ({ state, args }) => {
      const actor = args[0]
      const validActors = ["apt-groups", "ransomware-gangs", "hacktivists", "script-kiddies"]
      if (validActors.includes(actor)) {
        if (state.env["data-collected"] === "true") {
          return {
            stdout: `✅ Actor analyzed: ${actor}. Threat actor profiled. TTPs mapped. Motives understood.`,
            statePatch: { env: { "actors-analyzed": "true" } },
            goalMet: "analyze",
          }
        }
        return {
          stdout: "❌ Analysis failed: Collect threat data first.",
        }
      }
      return { stdout: `Unknown actor: ${actor}. Available: ${validActors.join(", ")}` }
    },
    produce: ({ state, args }) => {
      const intel = args[0]
      const validIntel = ["strategic-intel", "tactical-intel", "operational-intel", "technical-intel"]
      if (validIntel.includes(intel)) {
        if (state.env["actors-analyzed"] === "true") {
          return {
            stdout: `✅ Intelligence produced: ${intel}. Threat intelligence created. Reports generated. Dissemination planned.`,
            statePatch: { env: { "intel-produced": "true" } },
            goalMet: "produce",
          }
        }
        return {
          stdout: "❌ Production failed: Analyze threat actors first.",
        }
      }
      return { stdout: `Unknown intel: ${intel}. Available: ${validIntel.join(", ")}` }
    },
    apply: ({ state, args }) => {
      const intelligence = args[0]
      const validIntelligence = ["detection-rules", "threat-hunting", "risk-scoring", "incident-response"]
      if (validIntelligence.includes(intelligence)) {
        if (state.env["intel-produced"] === "true") {
          return {
            stdout: `✅ Intelligence applied: ${intelligence}. Threat intelligence operationalized. Defenses updated. Hunting queries deployed.`,
            statePatch: { env: { "intelligence-applied": "true" } },
            goalMet: "apply",
          }
        }
        return {
          stdout: "❌ Application failed: Produce intelligence first.",
        }
      }
      return { stdout: `Unknown intelligence: ${intelligence}. Available: ${validIntelligence.join(", ")}` }
    },
  },
  initialState,
  success: "Threat intelligence achieved. You collected data, analyzed actors, produced intelligence, and applied it to defenses. You now know your enemy before they attack.",
}
