import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Resurrection — Act VIII
===========================================

From the ashes, a new beginning. The catastrophe destroyed the old Hodlberg AG. Now, a new company rises.

OBJECTIVES:
1. Assess the damage
2. Design the new architecture
3. Implement security-first
4. Launch the new Hodlberg

COMMANDS:
- assess [damage]
- design [architecture]
- implement [security]
- launch [company]

DAMAGE:
- financial-loss
- brand-damage
- talent-loss
- customer-churn

ARCHITECTURE:
- zero-trust
- defense-in-depth
- security-by-design
- resilience

SECURITY:
- encryption
- mfa
- monitoring
- incident-response

COMPANY:
- brand-relaunch
- customer-reacquisition
- talent-hiring
- market-reentry`,
      mode: "ro",
    },
  },
  env: {
    "assessed": "false",
    "designed": "false",
    "implemented": "false",
    "launched": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergResurrectionMission: Mission = {
  slug: "hodlberg-resurrection",
  title: "The Resurrection — Act VIII",
  brief: "From the ashes, a new beginning. The catastrophe destroyed the old Hodlberg AG. Now, a new company rises.",
  welcome: "Welcome to the Hodlberg Resurrection mission. From the ashes, a new beginning. Use 'assess [damage]' to understand what was lost, 'design [architecture]' to plan the new foundation, 'implement [security]' to build security-first, and 'launch [company]' to bring Hodlberg back.",
  prompt: "founder@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "assess", label: "Assess the damage", hint: "assess financial-loss" },
    { id: "design", label: "Design the new architecture", hint: "design zero-trust" },
    { id: "implement", label: "Implement security-first", hint: "implement encryption" },
    { id: "launch", label: "Launch the new Hodlberg", hint: "launch brand-relaunch" },
  ],
  commands: {
    assess: ({ state, args }) => {
      const damage = args[0]
      const validDamages = ["financial-loss", "brand-damage", "talent-loss", "customer-churn"]
      if (validDamages.includes(damage)) {
        return {
          stdout: `✅ Damage assessed: ${damage}. Losses quantified. Recovery baseline established. Lessons learned.`,
          statePatch: { env: { "assessed": "true" } },
          goalMet: "assess",
        }
      }
      return { stdout: `Unknown damage: ${damage}. Available: ${validDamages.join(", ")}` }
    },
    design: ({ state, args }) => {
      const architecture = args[0]
      const validArchitectures = ["zero-trust", "defense-in-depth", "security-by-design", "resilience"]
      if (validArchitectures.includes(architecture)) {
        if (state.env["assessed"] === "true") {
          return {
            stdout: `✅ Architecture designed: ${architecture}. New foundation planned. Security baked in. Resilience prioritized.`,
            statePatch: { env: { "designed": "true" } },
            goalMet: "design",
          }
        }
        return {
          stdout: "❌ Design failed: Assess damage first.",
        }
      }
      return { stdout: `Unknown architecture: ${architecture}. Available: ${validArchitectures.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const security = args[0]
      const validSecurities = ["encryption", "mfa", "monitoring", "incident-response"]
      if (validSecurities.includes(security)) {
        if (state.env["designed"] === "true") {
          return {
            stdout: `✅ Security implemented: ${security}. Security-first deployed. Controls active. Monitoring enabled.`,
            statePatch: { env: { "implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Design architecture first.",
        }
      }
      return { stdout: `Unknown security: ${security}. Available: ${validSecurities.join(", ")}` }
    },
    launch: ({ state, args }) => {
      const company = args[0]
      const validCompanies = ["brand-relaunch", "customer-reacquisition", "talent-hiring", "market-reentry"]
      if (validCompanies.includes(company)) {
        if (state.env["implemented"] === "true") {
          return {
            stdout: `✅ Company launched: ${company}. New Hodlberg AG live. Security-first proven. Trust rebuilt.`,
            statePatch: { env: { "launched": "true" } },
            goalMet: "launch",
          }
        }
        return {
          stdout: "❌ Launch failed: Implement security first.",
        }
      }
      return { stdout: `Unknown company: ${company}. Available: ${validCompanies.join(", ")}` }
    },
  },
  initialState,
  success: "Resurrection complete. You assessed damage, designed architecture, implemented security-first, and launched the new Hodlberg. From the ashes, a stronger company rises.",
}
