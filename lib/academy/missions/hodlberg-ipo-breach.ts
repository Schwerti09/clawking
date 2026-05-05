import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg IPO Breach — Act III
========================================

Two years later. IPO filing imminent. The attacker strikes at the worst possible time.

OBJECTIVES:
1. Assess IPO impact
2. Manage stakeholder communication
3. Navigate legal obligations
4. Protect the IPO

COMMANDS:
- assess [impact]
- communicate [stakeholder]
- navigate [obligation]
- protect [ipo]

IMPACTS:
- financial-disclosure
- material-weakness
- regulatory-investigation
- investor-confidence

STAKEHOLDERS:
- board-of-directors
- investors
- regulators
- employees

OBLIGATIONS:
- sec-filing
- data-breach-notification
- legal-disclosure
- insurance-claim

IPO PROTECTION:
- timing-adjustment
- narrative-control
- security-upgrade
- pr-strategy`,
      mode: "ro",
    },
  },
  env: {
    "assessed": "false",
    "communicated": "false",
    "navigated": "false",
    "protected": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergIpoBreachMission: Mission = {
  slug: "hodlberg-ipo-breach",
  title: "The IPO Breach — Act III",
  brief: "Two years later. IPO filing imminent. The attacker strikes at the worst possible time.",
  welcome: "Welcome to the Hodlberg IPO Breach mission. Two years later, IPO filing imminent. The attacker strikes at the worst possible time. Use 'assess [impact]' to evaluate damage, 'communicate [stakeholder]' to manage messaging, 'navigate [obligation]' to handle legal requirements, and 'protect [ipo]' to save the offering.",
  prompt: "ceo@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "assess", label: "Assess IPO impact", hint: "assess financial-disclosure" },
    { id: "communicate", label: "Manage stakeholder communication", hint: "communicate board-of-directors" },
    { id: "navigate", label: "Navigate legal obligations", hint: "navigate sec-filing" },
    { id: "protect", label: "Protect the IPO", hint: "protect timing-adjustment" },
  ],
  commands: {
    assess: ({ state, args }) => {
      const impact = args[0]
      const validImpacts = ["financial-disclosure", "material-weakness", "regulatory-investigation", "investor-confidence"]
      if (validImpacts.includes(impact)) {
        return {
          stdout: `✅ Impact assessed: ${impact}. IPO implications evaluated. Risk quantified. Timeline impact determined.`,
          statePatch: { env: { "assessed": "true" } },
          goalMet: "assess",
        }
      }
      return { stdout: `Unknown impact: ${impact}. Available: ${validImpacts.join(", ")}` }
    },
    communicate: ({ state, args }) => {
      const stakeholder = args[0]
      const validStakeholders = ["board-of-directors", "investors", "regulators", "employees"]
      if (validStakeholders.includes(stakeholder)) {
        if (state.env["assessed"] === "true") {
          return {
            stdout: `✅ Stakeholder communicated: ${stakeholder}. Messaging aligned. Expectations managed. Trust maintained.`,
            statePatch: { env: { "communicated": "true" } },
            goalMet: "communicate",
          }
        }
        return {
          stdout: "❌ Communication failed: Assess impact first.",
        }
      }
      return { stdout: `Unknown stakeholder: ${stakeholder}. Available: ${validStakeholders.join(", ")}` }
    },
    navigate: ({ state, args }) => {
      const obligation = args[0]
      const validObligations = ["sec-filing", "data-breach-notification", "legal-disclosure", "insurance-claim"]
      if (validObligations.includes(obligation)) {
        if (state.env["communicated"] === "true") {
          return {
            stdout: `✅ Obligation navigated: ${obligation}. Legal requirements met. Disclosures filed. Compliance achieved.`,
            statePatch: { env: { "navigated": "true" } },
            goalMet: "navigate",
          }
        }
        return {
          stdout: "❌ Navigation failed: Communicate stakeholders first.",
        }
      }
      return { stdout: `Unknown obligation: ${obligation}. Available: ${validObligations.join(", ")}` }
    },
    protect: ({ state, args }) => {
      const protection = args[0]
      const validProtections = ["timing-adjustment", "narrative-control", "security-upgrade", "pr-strategy"]
      if (validProtections.includes(protection)) {
        if (state.env["navigated"] === "true") {
          return {
            stdout: `✅ IPO protected: ${protection}. Offering secured. Narrative controlled. IPO proceeds.`,
            statePatch: { env: { "protected": "true" } },
            goalMet: "protect",
          }
        }
        return {
          stdout: "❌ Protection failed: Navigate obligations first.",
        }
      }
      return { stdout: `Unknown protection: ${protection}. Available: ${validProtections.join(", ")}` }
    },
  },
  initialState,
  success: "IPO breach handled. You assessed impact, communicated stakeholders, navigated obligations, and protected the IPO. The attacker tried to kill the IPO, but Hodlberg AG survived.",
}
