import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg State-Sponsored Attack — Act VI
======================================================

Five years later. Hodlberg AG is a unicorn. A state-sponsored actor targets the company. This is cyber warfare.

OBJECTIVES:
1. Identify the threat actor
2. Assess geopolitical impact
3. Coordinate with government
4. Defend the company

COMMANDS:
- identify [actor]
- assess [geopolitical-impact]
- coordinate [government]
- defend [company]

ACTORS:
- apt-group
- nation-state
- proxy-group
- unknown-sponsor

GEOPOLITICAL IMPACTS:
- sanctions-risk
- export-controls
- diplomatic-tension
- national-security

GOVERNMENT:
- law-enforcement
- intelligence-agency
- regulator
- embassy

DEFENSE:
- threat-hunting
- attribution
- public-disclosure
- countermeasures`,
      mode: "ro",
    },
  },
  env: {
    "identified": "false",
    "assessed": "false",
    "coordinated": "false",
    "defended": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergStateSponsoredMission: Mission = {
  slug: "hodlberg-state-sponsored",
  title: "The State-Sponsored Attack — Act VI",
  brief: "Five years later. Hodlberg AG is a unicorn. A state-sponsored actor targets the company. This is cyber warfare.",
  welcome: "Welcome to the Hodlberg State-Sponsored Attack mission. Five years later, Hodlberg AG is a unicorn. A state-sponsored actor targets the company. Use 'identify [actor]' to recognize the threat, 'assess [geopolitical-impact]' to understand implications, 'coordinate [government]' to work with authorities, and 'defend [company]' to protect the business.",
  prompt: "csirt@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "identify", label: "Identify the threat actor", hint: "identify apt-group" },
    { id: "assess", label: "Assess geopolitical impact", hint: "assess sanctions-risk" },
    { id: "coordinate", label: "Coordinate with government", hint: "coordinate law-enforcement" },
    { id: "defend", label: "Defend the company", hint: "defend threat-hunting" },
  ],
  commands: {
    identify: ({ state, args }) => {
      const actor = args[0]
      const validActors = ["apt-group", "nation-state", "proxy-group", "unknown-sponsor"]
      if (validActors.includes(actor)) {
        return {
          stdout: `✅ Actor identified: ${actor}. Threat actor recognized. TTPs matched. Attribution attempted.`,
          statePatch: { env: { "identified": "true" } },
          goalMet: "identify",
        }
      }
      return { stdout: `Unknown actor: ${actor}. Available: ${validActors.join(", ")}` }
    },
    assess: ({ state, args }) => {
      const impact = args[0]
      const validImpacts = ["sanctions-risk", "export-controls", "diplomatic-tension", "national-security"]
      if (validImpacts.includes(impact)) {
        if (state.env["identified"] === "true") {
          return {
            stdout: `✅ Impact assessed: ${impact}. Geopolitical implications understood. Legal counsel engaged. Risk quantified.`,
            statePatch: { env: { "assessed": "true" } },
            goalMet: "assess",
          }
        }
        return {
          stdout: "❌ Assessment failed: Identify actor first.",
        }
      }
      return { stdout: `Unknown impact: ${impact}. Available: ${validImpacts.join(", ")}` }
    },
    coordinate: ({ state, args }) => {
      const government = args[0]
      const validGovernments = ["law-enforcement", "intelligence-agency", "regulator", "embassy"]
      if (validGovernments.includes(government)) {
        if (state.env["assessed"] === "true") {
          return {
            stdout: `✅ Government coordinated: ${government}. Authorities notified. Intelligence shared. Joint response planned.`,
            statePatch: { env: { "coordinated": "true" } },
            goalMet: "coordinate",
          }
        }
        return {
          stdout: "❌ Coordination failed: Assess impact first.",
        }
      }
      return { stdout: `Unknown government: ${government}. Available: ${validGovernments.join(", ")}` }
    },
    defend: ({ state, args }) => {
      const defense = args[0]
      const validDefenses = ["threat-hunting", "attribution", "public-disclosure", "countermeasures"]
      if (validDefenses.includes(defense)) {
        if (state.env["coordinated"] === "true") {
          return {
            stdout: `✅ Company defended: ${defense}. Defense deployed. Attacker blocked. Company protected.`,
            statePatch: { env: { "defended": "true" } },
            goalMet: "defend",
          }
        }
        return {
          stdout: "❌ Defense failed: Coordinate with government first.",
        }
      }
      return { stdout: `Unknown defense: ${defense}. Available: ${validDefenses.join(", ")}` }
    },
  },
  initialState,
  success: "State-sponsored attack handled. You identified the actor, assessed impact, coordinated with government, and defended the company. This was cyber warfare, and Hodlberg AG survived.",
}
