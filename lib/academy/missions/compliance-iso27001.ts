import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/iso27001",
  fs: {
    "/iso27001/README": {
      content: `Mission: ISO27001 — ISMS Implementation
=============================================

ISO27001 requires an Information Security Management System. Build it.

OBJECTIVES:
1. Define ISMS scope
2. Implement risk management
3. Establish security controls
4. Verify ISO27001 compliance

COMMANDS:
- define [scope]
- implement [risk-treatment]
- establish [control]
- verify iso27001

SCOPES:
- cloud-infrastructure
- data-processing
- network-security
- access-management

RISK TREATMENTS:
- risk-avoidance
- risk-mitigation
- risk-transfer
- risk-acceptance

CONTROLS:
- annex-a-controls
- security-policies
- asset-management
- access-controls`,
      mode: "ro",
    },
  },
  env: {
    "scope-defined": "false",
    "risk-implemented": "false",
    "controls-established": "false",
    "iso27001-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const complianceIso27001Mission: Mission = {
  slug: "compliance-iso27001",
  title: "ISO27001 compliance — ISMS implementation",
  brief: "ISO27001 requires an Information Security Management System. Build it.",
  welcome: "Welcome to the ISO27001 Compliance mission. ISO27001 requires an Information Security Management System. Use 'define [scope]' to set boundaries, 'implement [risk-treatment]' to manage risks, 'establish [control]' to add controls, and 'verify iso27001' to confirm compliance.",
  prompt: "compliance@hodlberg-compliance:/iso27001$ ",
  goals: [
    { id: "define", label: "Define ISMS scope", hint: "define cloud-infrastructure" },
    { id: "implement", label: "Implement risk management", hint: "implement risk-mitigation" },
    { id: "establish", label: "Establish security controls", hint: "establish annex-a-controls" },
    { id: "verify", label: "Verify ISO27001 compliance", hint: "verify iso27001" },
  ],
  commands: {
    define: ({ state, args }) => {
      const scope = args[0]
      const validScopes = ["cloud-infrastructure", "data-processing", "network-security", "access-management"]
      if (validScopes.includes(scope)) {
        return {
          stdout: `✅ ISMS scope defined: ${scope}. Boundaries established. Assets identified. Stakeholders engaged.`,
          statePatch: { env: { "scope-defined": "true" } },
          goalMet: "define",
        }
      }
      return { stdout: `Unknown scope: ${scope}. Available: ${validScopes.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const treatment = args[0]
      const validTreatments = ["risk-avoidance", "risk-mitigation", "risk-transfer", "risk-acceptance"]
      if (validTreatments.includes(treatment)) {
        if (state.env["scope-defined"] === "true") {
          return {
            stdout: `✅ Risk treatment implemented: ${treatment}. Risk management process active. Risk register maintained.`,
            statePatch: { env: { "risk-implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Define ISMS scope first.",
        }
      }
      return { stdout: `Unknown treatment: ${treatment}. Available: ${validTreatments.join(", ")}` }
    },
    establish: ({ state, args }) => {
      const control = args[0]
      const validControls = ["annex-a-controls", "security-policies", "asset-management", "access-controls"]
      if (validControls.includes(control)) {
        if (state.env["risk-implemented"] === "true") {
          return {
            stdout: `✅ Control established: ${control}. ISO27001 Annex A controls implemented. Policies published.`,
            statePatch: { env: { "controls-established": "true" } },
            goalMet: "establish",
          }
        }
        return {
          stdout: "❌ Establishment failed: Implement risk management first.",
        }
      }
      return { stdout: `Unknown control: ${control}. Available: ${validControls.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "iso27001") {
        if (state.env["controls-established"] === "true") {
          return {
            stdout: "✅ ISO27001 COMPLIANT: ISMS scope defined, risk management implemented, controls established. Ready for ISO27001 certification audit.",
            statePatch: { env: { "iso27001-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Establish controls first.",
        }
      }
      return { stdout: "Usage: verify iso27001" }
    },
  },
  initialState,
  success: "ISO27001 compliance achieved. You defined ISMS scope, implemented risk management, established controls, and verified compliance. ISO27001 requirements translated into an operational ISMS.",
}
