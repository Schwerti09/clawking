import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Redemption — Act IX
=========================================

The new Hodlberg AG is successful. But the past haunts. The original attacker returns. This time, it's personal.

OBJECTIVES:
1. Confront the past
2. Defend the new company
3. Turn the tables
4. Achieve redemption

COMMANDS:
- confront [past]
- defend [company]
- turn [tables]
- achieve [redemption]

PAST:
- original-attacker
- old-vulnerabilities
- past-mistakes
- lost-trust

COMPANY:
- new-architecture
- security-first
- team-readiness
- customer-loyalty

TABLES:
- counter-attack
- legal-action
- public-exposure
- cooperation

REDEMPTION:
- closure
- forgiveness
- leadership
- legacy`,
      mode: "ro",
    },
  },
  env: {
    "confronted": "false",
    "defended": "false",
    "turned": "false",
    "achieved": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergRedemptionMission: Mission = {
  slug: "hodlberg-redemption",
  title: "The Redemption — Act IX",
  brief: "The new Hodlberg AG is successful. But the past haunts. The original attacker returns. This time, it's personal.",
  welcome: "Welcome to the Hodlberg Redemption mission. The new Hodlberg AG is successful. But the past haunts. Use 'confront [past]' to face the old enemy, 'defend [company]' to protect the new business, 'turn [tables]' to fight back, and 'achieve [redemption]' to finally close the chapter.",
  prompt: "ceo@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "confront", label: "Confront the past", hint: "confront original-attacker" },
    { id: "defend", label: "Defend the new company", hint: "defend new-architecture" },
    { id: "turn", label: "Turn the tables", hint: "turn counter-attack" },
    { id: "achieve", label: "Achieve redemption", hint: "achieve closure" },
  ],
  commands: {
    confront: ({ state, args }) => {
      const past = args[0]
      const validPasts = ["original-attacker", "old-vulnerabilities", "past-mistakes", "lost-trust"]
      if (validPasts.includes(past)) {
        return {
          stdout: `✅ Past confronted: ${past}. Old enemy faced. Vulnerabilities acknowledged. Mistakes owned.`,
          statePatch: { env: { "confronted": "true" } },
          goalMet: "confront",
        }
      }
      return { stdout: `Unknown past: ${past}. Available: ${validPasts.join(", ")}` }
    },
    defend: ({ state, args }) => {
      const company = args[0]
      const validCompanies = ["new-architecture", "security-first", "team-readiness", "customer-loyalty"]
      if (validCompanies.includes(company)) {
        if (state.env["confronted"] === "true") {
          return {
            stdout: `✅ Company defended: ${company}. New architecture holds. Security-first works. Team stands ready.`,
            statePatch: { env: { "defended": "true" } },
            goalMet: "defend",
          }
        }
        return {
          stdout: "❌ Defense failed: Confront past first.",
        }
      }
      return { stdout: `Unknown company: ${company}. Available: ${validCompanies.join(", ")}` }
    },
    turn: ({ state, args }) => {
      const tables = args[0]
      const validTables = ["counter-attack", "legal-action", "public-exposure", "cooperation"]
      if (validTables.includes(tables)) {
        if (state.env["defended"] === "true") {
          return {
            stdout: `✅ Tables turned: ${tables}. Attacker countered. Legal action taken. Public informed. Cooperation offered.`,
            statePatch: { env: { "turned": "true" } },
            goalMet: "turn",
          }
        }
        return {
          stdout: "❌ Turning failed: Defend company first.",
        }
      }
      return { stdout: `Unknown tables: ${tables}. Available: ${validTables.join(", ")}` }
    },
    achieve: ({ state, args }) => {
      const redemption = args[0]
      const validRedemptions = ["closure", "forgiveness", "leadership", "legacy"]
      if (validRedemptions.includes(redemption)) {
        if (state.env["turned"] === "true") {
          return {
            stdout: `✅ Redemption achieved: ${redemption}. Chapter closed. Trust restored. Leadership proven. Legacy secured.`,
            statePatch: { env: { "achieved": "true" } },
            goalMet: "achieve",
          }
        }
        return {
          stdout: "❌ Achievement failed: Turn tables first.",
        }
      }
      return { stdout: `Unknown redemption: ${redemption}. Available: ${validRedemptions.join(", ")}` }
    },
  },
  initialState,
  success: "Redemption achieved. You confronted the past, defended the company, turned the tables, and achieved closure. The original attacker is defeated. Hodlberg AG is redeemed.",
}
