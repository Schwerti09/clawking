import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/soc2",
  fs: {
    "/soc2/README": {
      content: `Mission: SOC2 Type II — Security Controls
============================================

SOC2 Type II requires documented security controls. Implement and evidence.

OBJECTIVES:
1. Map SOC2 trust services
2. Implement security controls
3. Document control evidence
4. Verify SOC2 compliance

COMMANDS:
- map [trust-service]
- implement [control]
- document [evidence]
- verify soc2

TRUST SERVICES:
- security
- availability
- processing-integrity
- confidentiality
- privacy

CONTROLS:
- access-control
- encryption
- monitoring
- incident-response

EVIDENCE:
- policy-documents
- system-logs
- audit-reports
- test-results`,
      mode: "ro",
    },
  },
  env: {
    "trust-mapped": "false",
    "controls-implemented": "false",
    "evidence-documented": "false",
    "soc2-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const complianceSoc2Mission: Mission = {
  slug: "compliance-soc2",
  title: "SOC2 Type II compliance — security controls",
  brief: "SOC2 Type II requires documented security controls. Implement and evidence.",
  welcome: "Welcome to the SOC2 Type II Compliance mission. SOC2 Type II requires documented security controls. Use 'map [trust-service]' to identify requirements, 'implement [control]' to add controls, 'document [evidence]' to create evidence, and 'verify soc2' to confirm compliance.",
  prompt: "compliance@hodlberg-compliance:/soc2$ ",
  goals: [
    { id: "map", label: "Map SOC2 trust services", hint: "map security" },
    { id: "implement", label: "Implement security controls", hint: "implement access-control" },
    { id: "document", label: "Document control evidence", hint: "document policy-documents" },
    { id: "verify", label: "Verify SOC2 compliance", hint: "verify soc2" },
  ],
  commands: {
    map: ({ state, args }) => {
      const service = args[0]
      const validServices = ["security", "availability", "processing-integrity", "confidentiality", "privacy"]
      if (validServices.includes(service)) {
        return {
          stdout: `✅ Trust service mapped: ${service}. SOC2 requirements identified. Control criteria determined.`,
          statePatch: { env: { "trust-mapped": "true" } },
          goalMet: "map",
        }
      }
      return { stdout: `Unknown service: ${service}. Available: ${validServices.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const control = args[0]
      const validControls = ["access-control", "encryption", "monitoring", "incident-response"]
      if (validControls.includes(control)) {
        if (state.env["trust-mapped"] === "true") {
          return {
            stdout: `✅ Control implemented: ${control}. Security control deployed. Configuration verified.`,
            statePatch: { env: { "controls-implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Map trust services first.",
        }
      }
      return { stdout: `Unknown control: ${control}. Available: ${validControls.join(", ")}` }
    },
    document: ({ state, args }) => {
      const evidence = args[0]
      const validEvidence = ["policy-documents", "system-logs", "audit-reports", "test-results"]
      if (validEvidence.includes(evidence)) {
        if (state.env["controls-implemented"] === "true") {
          return {
            stdout: `✅ Evidence documented: ${evidence}. Control evidence collected. Audit trail complete.`,
            statePatch: { env: { "evidence-documented": "true" } },
            goalMet: "document",
          }
        }
        return {
          stdout: "❌ Documentation failed: Implement controls first.",
        }
      }
      return { stdout: `Unknown evidence: ${evidence}. Available: ${validEvidence.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "soc2") {
        if (state.env["evidence-documented"] === "true") {
          return {
            stdout: "✅ SOC2 TYPE II COMPLIANT: Trust services mapped, controls implemented, evidence documented. Ready for SOC2 audit.",
            statePatch: { env: { "soc2-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Document evidence first.",
        }
      }
      return { stdout: "Usage: verify soc2" }
    },
  },
  initialState,
  success: "SOC2 Type II compliance achieved. You mapped trust services, implemented controls, documented evidence, and verified compliance. SOC2 requirements translated into engineering controls.",
}
