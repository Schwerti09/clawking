import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Series A Breach — Act II
=============================================

Six months later. Series A closed. But the attacker is back. This time, they're after the codebase.

OBJECTIVES:
1. Investigate the new breach
2. Identify the attack vector
3. Contain the damage
4. Decide: Pay or fight?

COMMANDS:
- investigate [evidence]
- identify [vector]
- contain [damage]
- decide [action]

EVIDENCE:
- git-logs
- access-logs
- employee-devices
- third-party-access

VECTORS:
- compromised-credentials
- supply-chain-attack
- insider-threat
- zero-day-exploit

DAMAGE:
- source-code-exposure
- ip-theft
- customer-data
- reputation

ACTIONS:
- pay-ransom
- fight-attacker
- negotiate
- public-disclosure`,
      mode: "ro",
    },
  },
  env: {
    "investigated": "false",
    "identified": "false",
    "contained": "false",
    "decided": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergSeriesABreachMission: Mission = {
  slug: "hodlberg-series-a-breach",
  title: "The Series A Breach — Act II",
  brief: "Six months later. Series A closed. The attacker is back. This time, they're after the codebase.",
  welcome: "Welcome to the Hodlberg Series A Breach mission. Six months later, Series A closed. The attacker is back — this time after the codebase. Use 'investigate [evidence]' to gather clues, 'identify [vector]' to find the attack path, 'contain [damage]' to stop the bleeding, and 'decide [action]' to choose your response. Pay or fight?",
  prompt: "cto@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "investigate", label: "Investigate the new breach", hint: "investigate git-logs" },
    { id: "identify", label: "Identify the attack vector", hint: "identify compromised-credentials" },
    { id: "contain", label: "Contain the damage", hint: "contain source-code-exposure" },
    { id: "decide", label: "Decide: Pay or fight?", hint: "decide fight-attacker" },
  ],
  commands: {
    investigate: ({ state, args }) => {
      const evidence = args[0]
      const validEvidence = ["git-logs", "access-logs", "employee-devices", "third-party-access"]
      if (validEvidence.includes(evidence)) {
        return {
          stdout: `✅ Evidence investigated: ${evidence}. Clues gathered. Timeline reconstructed. Suspects identified.`,
          statePatch: { env: { "investigated": "true" } },
          goalMet: "investigate",
        }
      }
      return { stdout: `Unknown evidence: ${evidence}. Available: ${validEvidence.join(", ")}` }
    },
    identify: ({ state, args }) => {
      const vector = args[0]
      const validVectors = ["compromised-credentials", "supply-chain-attack", "insider-threat", "zero-day-exploit"]
      if (validVectors.includes(vector)) {
        if (state.env["investigated"] === "true") {
          return {
            stdout: `✅ Vector identified: ${vector}. Attack path confirmed. Attacker motives understood.`,
            statePatch: { env: { "identified": "true" } },
            goalMet: "identify",
          }
        }
        return {
          stdout: "❌ Identification failed: Investigate evidence first.",
        }
      }
      return { stdout: `Unknown vector: ${vector}. Available: ${validVectors.join(", ")}` }
    },
    contain: ({ state, args }) => {
      const damage = args[0]
      const validDamage = ["source-code-exposure", "ip-theft", "customer-data", "reputation"]
      if (validDamage.includes(damage)) {
        if (state.env["identified"] === "true") {
          return {
            stdout: `✅ Damage contained: ${damage}. Attack stopped. Systems secured. Damage assessed.`,
            statePatch: { env: { "contained": "true" } },
            goalMet: "contain",
          }
        }
        return {
          stdout: "❌ Containment failed: Identify vector first.",
        }
      }
      return { stdout: `Unknown damage: ${damage}. Available: ${validDamage.join(", ")}` }
    },
    decide: ({ state, args }) => {
      const action = args[0]
      const validActions = ["pay-ransom", "fight-attacker", "negotiate", "public-disclosure"]
      if (validActions.includes(action)) {
        if (state.env["contained"] === "true") {
          return {
            stdout: `✅ Decision made: ${action}. Course of action chosen. Stakeholders informed. Next steps planned.`,
            statePatch: { env: { "decided": "true" } },
            goalMet: "decide",
          }
        }
        return {
          stdout: "❌ Decision failed: Contain damage first.",
        }
      }
      return { stdout: `Unknown action: ${action}. Available: ${validActions.join(", ")}` }
    },
  },
  initialState,
  success: "Series A breach handled. You investigated, identified, contained, and decided. The attacker is back, but Hodlberg AG is stronger. The story continues.",
}
