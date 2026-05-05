import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Acquisition Breach — Act IV
===================================================

Three years later. Acquisition offer on the table. Due diligence reveals a breach. The deal is at risk.

OBJECTIVES:
1. Conduct due diligence
2. Assess acquisition impact
3. Negotiate with acquirer
4. Close the deal

COMMANDS:
- conduct [diligence]
- assess [acquisition-impact]
- negotiate [term]
- close [deal]

DILIGENCE:
- security-audit
- breach-investigation
- liability-assessment
- remediation-plan

ACQUISITION IMPACTS:
- deal-valuation
- earn-out-adjustment
- indemnification
- representation-warranties

TERMS:
- price-adjustment
- escrow-arrangement
- insurance-requirement
- post-close-remediation

DEAL CLOSING:
- final-agreement
- regulatory-approval
- closing-conditions
- integration-planning`,
      mode: "ro",
    },
  },
  env: {
    "diligence-conducted": "false",
    "impact-assessed": "false",
    "terms-negotiated": "false",
    "deal-closed": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergAcquisitionBreachMission: Mission = {
  slug: "hodlberg-acquisition-breach",
  title: "The Acquisition Breach — Act IV",
  brief: "Three years later. Acquisition offer on the table. Due diligence reveals a breach. The deal is at risk.",
  welcome: "Welcome to the Hodlberg Acquisition Breach mission. Three years later, acquisition offer on the table. Due diligence reveals a breach. Use 'conduct [diligence]' to investigate, 'assess [acquisition-impact]' to evaluate deal impact, 'negotiate [term]' to adjust terms, and 'close [deal]' to finalize the acquisition.",
  prompt: "ceo@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "conduct", label: "Conduct due diligence", hint: "conduct security-audit" },
    { id: "assess", label: "Assess acquisition impact", hint: "assess deal-valuation" },
    { id: "negotiate", label: "Negotiate with acquirer", hint: "negotiate price-adjustment" },
    { id: "close", label: "Close the deal", hint: "close final-agreement" },
  ],
  commands: {
    conduct: ({ state, args }) => {
      const diligence = args[0]
      const validDiligence = ["security-audit", "breach-investigation", "liability-assessment", "remediation-plan"]
      if (validDiligence.includes(diligence)) {
        return {
          stdout: `✅ Diligence conducted: ${diligence}. Due diligence complete. Findings documented. Remediation planned.`,
          statePatch: { env: { "diligence-conducted": "true" } },
          goalMet: "conduct",
        }
      }
      return { stdout: `Unknown diligence: ${diligence}. Available: ${validDiligence.join(", ")}` }
    },
    assess: ({ state, args }) => {
      const impact = args[0]
      const validImpacts = ["deal-valuation", "earn-out-adjustment", "indemnification", "representation-warranties"]
      if (validImpacts.includes(impact)) {
        if (state.env["diligence-conducted"] === "true") {
          return {
            stdout: `✅ Impact assessed: ${impact}. Acquisition impact quantified. Deal implications understood. Risks priced in.`,
            statePatch: { env: { "impact-assessed": "true" } },
            goalMet: "assess",
          }
        }
        return {
          stdout: "❌ Assessment failed: Conduct diligence first.",
        }
      }
      return { stdout: `Unknown impact: ${impact}. Available: ${validImpacts.join(", ")}` }
    },
    negotiate: ({ state, args }) => {
      const term = args[0]
      const validTerms = ["price-adjustment", "escrow-arrangement", "insurance-requirement", "post-close-remediation"]
      if (validTerms.includes(term)) {
        if (state.env["impact-assessed"] === "true") {
          return {
            stdout: `✅ Term negotiated: ${term}. Acquisition terms adjusted. Deal structure modified. Risk allocation agreed.`,
            statePatch: { env: { "terms-negotiated": "true" } },
            goalMet: "negotiate",
          }
        }
        return {
          stdout: "❌ Negotiation failed: Assess impact first.",
        }
      }
      return { stdout: `Unknown term: ${term}. Available: ${validTerms.join(", ")}` }
    },
    close: ({ state, args }) => {
      const deal = args[0]
      const validDeals = ["final-agreement", "regulatory-approval", "closing-conditions", "integration-planning"]
      if (validDeals.includes(deal)) {
        if (state.env["terms-negotiated"] === "true") {
          return {
            stdout: `✅ Deal closed: ${deal}. Acquisition finalized. Integration planned. Hodlberg AG acquired.`,
            statePatch: { env: { "deal-closed": "true" } },
            goalMet: "close",
          }
        }
        return {
          stdout: "❌ Closing failed: Negotiate terms first.",
        }
      }
      return { stdout: `Unknown deal: ${deal}. Available: ${validDeals.join(", ")}` }
    },
  },
  initialState,
  success: "Acquisition breach handled. You conducted diligence, assessed impact, negotiated terms, and closed the deal. The breach nearly killed the acquisition, but Hodlberg AG was acquired.",
}
