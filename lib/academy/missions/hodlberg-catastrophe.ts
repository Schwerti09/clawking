import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Catastrophe — Act VII
=========================================

The ultimate test. A catastrophic breach threatens everything. The company's survival is at stake.

OBJECTIVES:
1. Assess catastrophe impact
2. Activate crisis response
3. Execute recovery plan
4. Rebuild trust

COMMANDS:
- assess [catastrophe]
- activate [response]
- execute [recovery]
- rebuild [trust]

CATASTROPHES:
- total-data-loss
- system-destruction
- brand-destruction
- existential-threat

RESPONSE:
- crisis-team
- war-room
- executive-escalation
- board-notification

RECOVERY:
- data-restoration
- system-rebuild
- brand-recovery
- business-continuity

TRUST:
- transparency
- compensation
- security-upgrade
- cultural-change`,
      mode: "ro",
    },
  },
  env: {
    "assessed": "false",
    "activated": "false",
    "executed": "false",
    "rebuilt": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergCatastropheMission: Mission = {
  slug: "hodlberg-catastrophe",
  title: "The Catastrophe — Act VII",
  brief: "The ultimate test. A catastrophic breach threatens everything. The company's survival is at stake.",
  welcome: "Welcome to the Hodlberg Catastrophe mission. The ultimate test. A catastrophic breach threatens everything. Use 'assess [catastrophe]' to understand the damage, 'activate [response]' to mobilize the crisis team, 'execute [recovery]' to rebuild systems, and 'rebuild [trust]' to restore confidence.",
  prompt: "ceo@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "assess", label: "Assess catastrophe impact", hint: "assess total-data-loss" },
    { id: "activate", label: "Activate crisis response", hint: "activate crisis-team" },
    { id: "execute", label: "Execute recovery plan", hint: "execute data-restoration" },
    { id: "rebuild", label: "Rebuild trust", hint: "rebuild transparency" },
  ],
  commands: {
    assess: ({ state, args }) => {
      const catastrophe = args[0]
      const validCatastrophes = ["total-data-loss", "system-destruction", "brand-destruction", "existential-threat"]
      if (validCatastrophes.includes(catastrophe)) {
        return {
          stdout: `✅ Catastrophe assessed: ${catastrophe}. Impact quantified. Survival probability calculated. Recovery timeline estimated.`,
          statePatch: { env: { "assessed": "true" } },
          goalMet: "assess",
        }
      }
      return { stdout: `Unknown catastrophe: ${catastrophe}. Available: ${validCatastrophes.join(", ")}` }
    },
    activate: ({ state, args }) => {
      const response = args[0]
      const validResponses = ["crisis-team", "war-room", "executive-escalation", "board-notification"]
      if (validResponses.includes(response)) {
        if (state.env["assessed"] === "true") {
          return {
            stdout: `✅ Response activated: ${response}. Crisis team mobilized. War room established. Leadership engaged.`,
            statePatch: { env: { "activated": "true" } },
            goalMet: "activate",
          }
        }
        return {
          stdout: "❌ Activation failed: Assess catastrophe first.",
        }
      }
      return { stdout: `Unknown response: ${response}. Available: ${validResponses.join(", ")}` }
    },
    execute: ({ state, args }) => {
      const recovery = args[0]
      const validRecoveries = ["data-restoration", "system-rebuild", "brand-recovery", "business-continuity"]
      if (validRecoveries.includes(recovery)) {
        if (state.env["activated"] === "true") {
          return {
            stdout: `✅ Recovery executed: ${recovery}. Systems restored. Data recovered. Business continuity achieved.`,
            statePatch: { env: { "executed": "true" } },
            goalMet: "execute",
          }
        }
        return {
          stdout: "❌ Execution failed: Activate response first.",
        }
      }
      return { stdout: `Unknown recovery: ${recovery}. Available: ${validRecoveries.join(", ")}` }
    },
    rebuild: ({ state, args }) => {
      const trust = args[0]
      const validTrusts = ["transparency", "compensation", "security-upgrade", "cultural-change"]
      if (validTrusts.includes(trust)) {
        if (state.env["executed"] === "true") {
          return {
            stdout: `✅ Trust rebuilt: ${trust}. Transparency demonstrated. Compensation paid. Security upgraded. Culture changed.`,
            statePatch: { env: { "rebuilt": "true" } },
            goalMet: "rebuild",
          }
        }
        return {
          stdout: "❌ Rebuilding failed: Execute recovery first.",
        }
      }
      return { stdout: `Unknown trust: ${trust}. Available: ${validTrusts.join(", ")}` }
    },
  },
  initialState,
  success: "Catastrophe survived. You assessed impact, activated response, executed recovery, and rebuilt trust. Hodlberg AG survived the ultimate test. The company is stronger than ever.",
}
