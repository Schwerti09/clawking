import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/eu-ai-act",
  fs: {
    "/eu-ai-act/README": {
      content: `Mission: EU AI Act — Technical Obligations
=============================================

EU AI Act imposes technical obligations on AI systems. Implement the controls.

OBJECTIVES:
1. Classify AI system risk
2. Implement quality management
3. Document technical documentation
4. Verify EU AI Act compliance

COMMANDS:
- classify [risk-level]
- implement [quality-control]
- document [technical-doc]
- verify eu-ai-act

RISK LEVELS:
- minimal
- limited
- high
- unacceptable

QUALITY CONTROLS:
- data-governance
- transparency
- human-oversight
- robustness

TECHNICAL DOCS:
- system-description
- data-sheets
- testing-results
- compliance-evidence`,
      mode: "ro",
    },
  },
  env: {
    "risk-classified": "false",
    "quality-implemented": "false",
    "docs-documented": "false",
    "eu-ai-act-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const complianceEuAiActMission: Mission = {
  slug: "compliance-eu-ai-act",
  title: "EU AI Act compliance — technical obligations",
  brief: "EU AI Act imposes technical obligations on AI systems. Implement the controls.",
  welcome: "Welcome to the EU AI Act Compliance mission. EU AI Act imposes technical obligations on AI systems. Use 'classify [risk-level]' to determine the risk category, 'implement [quality-control]' to add controls, 'document [technical-doc]' to create documentation, and 'verify eu-ai-act' to confirm compliance.",
  prompt: "compliance@hodlberg-compliance:/eu-ai-act$ ",
  goals: [
    { id: "classify", label: "Classify AI system risk", hint: "classify high" },
    { id: "implement", label: "Implement quality management", hint: "implement data-governance" },
    { id: "document", label: "Document technical documentation", hint: "document system-description" },
    { id: "verify", label: "Verify EU AI Act compliance", hint: "verify eu-ai-act" },
  ],
  commands: {
    classify: ({ state, args }) => {
      const level = args[0]
      const validLevels = ["minimal", "limited", "high", "unacceptable"]
      if (validLevels.includes(level)) {
        return {
          stdout: `✅ AI system classified: ${level} risk. Obligations determined. Compliance requirements identified.`,
          statePatch: { env: { "risk-classified": "true" } },
          goalMet: "classify",
        }
      }
      return { stdout: `Unknown level: ${level}. Available: ${validLevels.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const control = args[0]
      const validControls = ["data-governance", "transparency", "human-oversight", "robustness"]
      if (validControls.includes(control)) {
        if (state.env["risk-classified"] === "true") {
          return {
            stdout: `✅ Quality control implemented: ${control}. Technical measures in place. Monitoring active.`,
            statePatch: { env: { "quality-implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Classify AI system risk first.",
        }
      }
      return { stdout: `Unknown control: ${control}. Available: ${validControls.join(", ")}` }
    },
    document: ({ state, args }) => {
      const doc = args[0]
      const validDocs = ["system-description", "data-sheets", "testing-results", "compliance-evidence"]
      if (validDocs.includes(doc)) {
        if (state.env["quality-implemented"] === "true") {
          return {
            stdout: `✅ Technical documentation: ${doc}. Documentation complete. Evidence collected.`,
            statePatch: { env: { "docs-documented": "true" } },
            goalMet: "document",
          }
        }
        return {
          stdout: "❌ Documentation failed: Implement quality management first.",
        }
      }
      return { stdout: `Unknown doc: ${doc}. Available: ${validDocs.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "eu-ai-act") {
        if (state.env["docs-documented"] === "true") {
          return {
            stdout: "✅ EU AI ACT COMPLIANT: AI system classified, quality controls implemented, technical documentation complete. Ready for regulatory review.",
            statePatch: { env: { "eu-ai-act-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Document technical documentation first.",
        }
      }
      return { stdout: "Usage: verify eu-ai-act" }
    },
  },
  initialState,
  success: "EU AI Act compliance achieved. You classified the AI system, implemented quality controls, documented technical requirements, and verified compliance. EU AI Act obligations translated into engineering controls.",
}
