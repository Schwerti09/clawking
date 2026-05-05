import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/third-party",
  fs: {
    "/third-party/README": {
      content: `Mission: Third-Party Risk Management
========================================

Your security is only as strong as your weakest vendor. Manage third-party risk.

OBJECTIVES:
1. Inventory third parties
2. Assess vendor risk
3. Implement monitoring
4. Verify risk management

COMMANDS:
- inventory [vendor-type]
- assess [risk-level]
- implement [monitoring]
- verify risk-management

VENDOR TYPES:
- cloud-providers
- saas-vendors
- payment-processors
- data-processors

RISK LEVELS:
- critical
- high
- medium
- low

MONITORING:
- continuous-monitoring
- periodic-audits
- security-questionnaires
- contract-reviews`,
      mode: "ro",
    },
  },
  env: {
    "inventory-complete": "false",
    "risk-assessed": "false",
    "monitoring-implemented": "false",
    "risk-management-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const complianceThirdPartyRiskMission: Mission = {
  slug: "compliance-third-party-risk",
  title: "Third-party risk management",
  brief: "Your security is only as strong as your weakest vendor. Manage third-party risk.",
  welcome: "Welcome to the Third-Party Risk Management mission. Your security is only as strong as your weakest vendor. Use 'inventory [vendor-type]' to catalog vendors, 'assess [risk-level]' to evaluate risk, 'implement [monitoring]' to add oversight, and 'verify risk-management' to confirm coverage.",
  prompt: "compliance@hodlberg-compliance:/third-party$ ",
  goals: [
    { id: "inventory", label: "Inventory third parties", hint: "inventory cloud-providers" },
    { id: "assess", label: "Assess vendor risk", hint: "assess critical" },
    { id: "implement", label: "Implement monitoring", hint: "implement continuous-monitoring" },
    { id: "verify", label: "Verify risk management", hint: "verify risk-management" },
  ],
  commands: {
    inventory: ({ state, args }) => {
      const vendor = args[0]
      const validVendors = ["cloud-providers", "saas-vendors", "payment-processors", "data-processors"]
      if (validVendors.includes(vendor)) {
        return {
          stdout: `✅ Vendor inventory: ${vendor}. Third parties cataloged. Dependencies mapped. Contracts reviewed.`,
          statePatch: { env: { "inventory-complete": "true" } },
          goalMet: "inventory",
        }
      }
      return { stdout: `Unknown vendor: ${vendor}. Available: ${validVendors.join(", ")}` }
    },
    assess: ({ state, args }) => {
      const risk = args[0]
      const validRisks = ["critical", "high", "medium", "low"]
      if (validRisks.includes(risk)) {
        if (state.env["inventory-complete"] === "true") {
          return {
            stdout: `✅ Risk assessed: ${risk}. Vendor risk evaluated. Impact analysis complete. Risk treatment determined.`,
            statePatch: { env: { "risk-assessed": "true" } },
            goalMet: "assess",
          }
        }
        return {
          stdout: "❌ Assessment failed: Inventory third parties first.",
        }
      }
      return { stdout: `Unknown risk: ${risk}. Available: ${validRisks.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const monitoring = args[0]
      const validMonitoring = ["continuous-monitoring", "periodic-audits", "security-questionnaires", "contract-reviews"]
      if (validMonitoring.includes(monitoring)) {
        if (state.env["risk-assessed"] === "true") {
          return {
            stdout: `✅ Monitoring implemented: ${monitoring}. Vendor oversight active. Alerting configured.`,
            statePatch: { env: { "monitoring-implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Assess vendor risk first.",
        }
      }
      return { stdout: `Unknown monitoring: ${monitoring}. Available: ${validMonitoring.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "risk-management") {
        if (state.env["monitoring-implemented"] === "true") {
          return {
            stdout: "✅ RISK MANAGEMENT VERIFIED: Third-party inventory complete, risk assessed, monitoring implemented. Vendor risk under control.",
            statePatch: { env: { "risk-management-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Implement monitoring first.",
        }
      }
      return { stdout: "Usage: verify risk-management" }
    },
  },
  initialState,
  success: "Third-party risk management completed successfully. You inventoried vendors, assessed risk, implemented monitoring, and verified coverage. Your weakest vendor is now monitored.",
}
