import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/controls",
  fs: {
    "/controls/README": {
      content: `Mission: NIS2 Engineering Controls
=====================================

Translate NIS2 legal requirements into concrete technical controls.

OBJECTIVES:
1. Assess current controls
2. Implement incident response control
3. Implement business continuity control
4. Implement supply chain control
5. Verify NIS2 compliance

COMMANDS:
- assess controls
- implement [control-name]
- verify nis2

CONTROLS:
- incident-response
- business-continuity
- supply-chain
- vulnerability-management
- training`,
      mode: "ro",
    },
  },
  env: {
    "incident-response": "false",
    "business-continuity": "false",
    "supply-chain": "false",
    "vulnerability-management": "false",
    "training": "false",
    "nis2-compliant": "false",
  },
  goalsMet: [],
  history: [],
}

export const nis2EngineeringControlsMission: Mission = {
  slug: "nis2-engineering-controls",
  title: "Translate NIS2 into engineering controls",
  brief: "Map NIS2 requirements to concrete technical controls. No more paragraph-reading.",
  welcome: "Welcome to the NIS2 Engineering Controls mission. Your task is to translate legal requirements into concrete technical controls. Use 'assess controls' to see current status, 'implement [control-name]' to add controls, and 'verify nis2' to check compliance.",
  prompt: "engineer@hodlberg-compliance:/controls$ ",
  goals: [
    { id: "assess", label: "Assess current controls", hint: "assess controls" },
    { id: "incident", label: "Implement incident response control", hint: "implement incident-response" },
    { id: "continuity", label: "Implement business continuity control", hint: "implement business-continuity" },
    { id: "supply", label: "Implement supply chain control", hint: "implement supply-chain" },
    { id: "verify", label: "Verify NIS2 compliance", hint: "verify nis2" },
  ],
  commands: {
    assess: ({ state, args }) => {
      if (args[0] === "controls") {
        const controls = ["incident-response", "business-continuity", "supply-chain", "vulnerability-management", "training"]
        const implemented = controls.filter((c) => state.env[c] === "true").length
        return {
          stdout: `Current control status: ${implemented}/5 implemented\n\nControls:\n${controls.map((c) => `- ${c}: ${state.env[c] === "true" ? "✅" : "❌"}`).join("\n")}`,
        }
      }
      return { stdout: "Usage: assess controls" }
    },
    implement: ({ state, args }) => {
      const control = args[0]
      const validControls = ["incident-response", "business-continuity", "supply-chain", "vulnerability-management", "training"]
      if (validControls.includes(control)) {
        return {
          stdout: `✅ Control '${control}' implemented. Evidence collected and documented.`,
          statePatch: { 
            env: { [control]: "true" },
          },
          goalMet: control,
        }
      }
      return { stdout: `Unknown control: ${control}. Available: ${validControls.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "nis2") {
        const controls = ["incident-response", "business-continuity", "supply-chain", "vulnerability-management", "training"]
        const implemented = controls.filter((c) => state.env[c] === "true").length
        const required = 4 // NIS2 requires 4 out of 5 core controls
        if (implemented >= required) {
          return {
            stdout: "✅ NIS2 COMPLIANT: All required engineering controls implemented. Evidence audit-ready.",
            statePatch: { env: { "nis2-compliant": "true" } },
            goalMet: "verify",
          }
        }
        const gaps = controls.filter((c) => state.env[c] !== "true")
        return {
          stdout: `❌ NIS2 NOT COMPLIANT: Missing ${required - implemented} required controls.\nGaps: ${gaps.join(", ")}`,
        }
      }
      return { stdout: "Usage: verify nis2" }
    },
  },
  initialState,
  success: "NIS2 compliance achieved. You've translated legal requirements into concrete engineering controls. No more paragraph-reading — just technical implementation.",
}
