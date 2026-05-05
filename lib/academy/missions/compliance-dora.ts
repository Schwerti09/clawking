import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/dora",
  fs: {
    "/dora/README": {
      content: `Mission: DORA Compliance — ICT Risk Management
====================================================

DORA requires financial institutions to manage ICT risk. Translate to engineering.

OBJECTIVES:
1. Assess ICT risk
2. Implement testing regime
3. Document incident reporting
4. Verify DORA compliance

COMMANDS:
- assess [risk-domain]
- implement [testing-type]
- document [reporting]
- verify dora

RISK DOMAINS:
- operational-resilience
- third-party-risk
- cybersecurity
- data-protection

TESTING TYPES:
- penetration-testing
- vulnerability-scanning
- red-teaming
- resilience-testing

REPORTING:
- incident-reporting
- near-miss-reporting
- risk-metrics
- compliance-evidence`,
      mode: "ro",
    },
  },
  env: {
    "risk-assessed": "false",
    "testing-implemented": "false",
    "reporting-documented": "false",
    "dora-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const complianceDoraMission: Mission = {
  slug: "compliance-dora",
  title: "DORA compliance — ICT risk management",
  brief: "DORA requires financial institutions to manage ICT risk. Translate to engineering controls.",
  welcome: "Welcome to the DORA Compliance mission. DORA requires financial institutions to manage ICT risk. Use 'assess [risk-domain]' to evaluate risks, 'implement [testing-type]' to set up testing, 'document [reporting]' to create incident reporting, and 'verify dora' to confirm compliance.",
  prompt: "compliance@hodlberg-compliance:/dora$ ",
  goals: [
    { id: "assess", label: "Assess ICT risk", hint: "assess operational-resilience" },
    { id: "implement", label: "Implement testing regime", hint: "implement penetration-testing" },
    { id: "document", label: "Document incident reporting", hint: "document incident-reporting" },
    { id: "verify", label: "Verify DORA compliance", hint: "verify dora" },
  ],
  commands: {
    assess: ({ state, args }) => {
      const domain = args[0]
      const validDomains = ["operational-resilience", "third-party-risk", "cybersecurity", "data-protection"]
      if (validDomains.includes(domain)) {
        return {
          stdout: `✅ ICT risk assessed: ${domain}. Risk level determined. Mitigation controls identified.`,
          statePatch: { env: { "risk-assessed": "true" } },
          goalMet: "assess",
        }
      }
      return { stdout: `Unknown domain: ${domain}. Available: ${validDomains.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const testing = args[0]
      const validTesting = ["penetration-testing", "vulnerability-scanning", "red-teaming", "resilience-testing"]
      if (validTesting.includes(testing)) {
        if (state.env["risk-assessed"] === "true") {
          return {
            stdout: `✅ Testing implemented: ${testing}. Testing regime established. Schedule defined.`,
            statePatch: { env: { "testing-implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Assess ICT risk first.",
        }
      }
      return { stdout: `Unknown testing: ${testing}. Available: ${validTesting.join(", ")}` }
    },
    document: ({ state, args }) => {
      const reporting = args[0]
      const validReporting = ["incident-reporting", "near-miss-reporting", "risk-metrics", "compliance-evidence"]
      if (validReporting.includes(reporting)) {
        if (state.env["testing-implemented"] === "true") {
          return {
            stdout: `✅ Reporting documented: ${reporting}. Incident reporting process defined. Templates created.`,
            statePatch: { env: { "reporting-documented": "true" } },
            goalMet: "document",
          }
        }
        return {
          stdout: "❌ Documentation failed: Implement testing first.",
        }
      }
      return { stdout: `Unknown reporting: ${reporting}. Available: ${validReporting.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "dora") {
        if (state.env["reporting-documented"] === "true") {
          return {
            stdout: "✅ DORA COMPLIANT: ICT risk management implemented. Testing regime established. Incident reporting documented. Ready for regulatory review.",
            statePatch: { env: { "dora-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Document incident reporting first.",
        }
      }
      return { stdout: "Usage: verify dora" }
    },
  },
  initialState,
  success: "DORA compliance achieved. You assessed ICT risk, implemented testing regime, documented incident reporting, and verified compliance. DORA requirements translated into engineering controls.",
}
