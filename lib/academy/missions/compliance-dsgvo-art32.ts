import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/dsgvo-art32",
  fs: {
    "/dsgvo-art32/README": {
      content: `Mission: DSGVO Art. 32 — State of the Art
==============================================

DSGVO Art. 32 requires 'state of the art' security. What does that mean?

OBJECTIVES:
1. Assess current security posture
2. Implement state of the art controls
3. Document security measures
4. Verify Art. 32 compliance

COMMANDS:
- assess [security-domain]
- implement [control]
- document [measure]
- verify art32

SECURITY DOMAINS:
- encryption
- access-control
- monitoring
- incident-response

CONTROLS:
- tls-1.3
- mfa
- siem
- automated-response

MEASURES:
- technical-measures
- organizational-measures
- physical-measures
- legal-measures`,
      mode: "ro",
    },
  },
  env: {
    "security-assessed": "false",
    "controls-implemented": "false",
    "measures-documented": "false",
    "art32-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const complianceDsgvoArt32Mission: Mission = {
  slug: "compliance-dsgvo-art32",
  title: "DSGVO Art. 32 compliance — state of the art",
  brief: "DSGVO Art. 32 requires 'state of the art' security. Implement the controls.",
  welcome: "Welcome to the DSGVO Art. 32 Compliance mission. DSGVO Art. 32 requires 'state of the art' security. Use 'assess [security-domain]' to evaluate posture, 'implement [control]' to add state of the art controls, 'document [measure]' to create documentation, and 'verify art32' to confirm compliance.",
  prompt: "compliance@hodlberg-compliance:/dsgvo-art32$ ",
  goals: [
    { id: "assess", label: "Assess current security posture", hint: "assess encryption" },
    { id: "implement", label: "Implement state of the art controls", hint: "implement tls-1.3" },
    { id: "document", label: "Document security measures", hint: "document technical-measures" },
    { id: "verify", label: "Verify Art. 32 compliance", hint: "verify art32" },
  ],
  commands: {
    assess: ({ state, args }) => {
      const domain = args[0]
      const validDomains = ["encryption", "access-control", "monitoring", "incident-response"]
      if (validDomains.includes(domain)) {
        return {
          stdout: `✅ Security assessed: ${domain}. Current posture evaluated. Gaps identified. State of the art requirements determined.`,
          statePatch: { env: { "security-assessed": "true" } },
          goalMet: "assess",
        }
      }
      return { stdout: `Unknown domain: ${domain}. Available: ${validDomains.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const control = args[0]
      const validControls = ["tls-1.3", "mfa", "siem", "automated-response"]
      if (validControls.includes(control)) {
        if (state.env["security-assessed"] === "true") {
          return {
            stdout: `✅ Control implemented: ${control}. State of the art measure deployed. Configuration verified.`,
            statePatch: { env: { "controls-implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Assess security posture first.",
        }
      }
      return { stdout: `Unknown control: ${control}. Available: ${validControls.join(", ")}` }
    },
    document: ({ state, args }) => {
      const measure = args[0]
      const validMeasures = ["technical-measures", "organizational-measures", "physical-measures", "legal-measures"]
      if (validMeasures.includes(measure)) {
        if (state.env["controls-implemented"] === "true") {
          return {
            stdout: `✅ Measure documented: ${measure}. Security measures documented. Evidence collected. Art. 32 ready.`,
            statePatch: { env: { "measures-documented": "true" } },
            goalMet: "document",
          }
        }
        return {
          stdout: "❌ Documentation failed: Implement controls first.",
        }
      }
      return { stdout: `Unknown measure: ${measure}. Available: ${validMeasures.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "art32") {
        if (state.env["measures-documented"] === "true") {
          return {
            stdout: "✅ ART. 32 COMPLIANT: State of the art security implemented. Technical and organizational measures documented. Ready for DSGVO audit.",
            statePatch: { env: { "art32-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Document security measures first.",
        }
      }
      return { stdout: "Usage: verify art32" }
    },
  },
  initialState,
  success: "DSGVO Art. 32 compliance achieved. You assessed security posture, implemented state of the art controls, documented measures, and verified compliance. 'State of the art' is now concrete engineering.",
}
