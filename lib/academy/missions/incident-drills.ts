import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/drills",
  fs: {
    "/drills/README": {
      content: `Mission: Incident Drills — Practice Makes Perfect
===================================================

Playbooks are useless if you haven't practiced. Run the drills.

OBJECTIVES:
1. Design drill scenario
2. Execute the drill
3. Evaluate performance
4. Update playbooks

COMMANDS:
- design [scenario]
- execute [drill-type]
- evaluate [metric]
- update [playbook]

SCENARIOS:
- data-breach
- service-outage
- ransomware
- insider-threat

DRILL TYPES:
- table-exercise
- simulation
- full-scale
- functional

METRICS:
- response-time
- communication-timeliness
- containment-effectiveness
- stakeholder-satisfaction`,
      mode: "ro",
    },
  },
  env: {
    "scenario-designed": "false",
    "drill-executed": "false",
    "performance-evaluated": "false",
    "playbooks-updated": "false",
  },
  goalsMet: [],
  history: [],
}

export const incidentDrillsMission: Mission = {
  slug: "incident-drills",
  title: "Incident drills — practice makes perfect",
  brief: "Playbooks are useless if you haven't practiced. Run the drills and improve.",
  welcome: "Welcome to the Incident Drills mission. Playbooks are useless if you haven't practiced. Use 'design [scenario]' to create a realistic drill, 'execute [drill-type]' to run it, 'evaluate [metric]' to measure performance, and 'update [playbook]' to incorporate lessons learned.",
  prompt: "drill@hodlberg-soc:/drills$ ",
  goals: [
    { id: "design", label: "Design drill scenario", hint: "design data-breach" },
    { id: "execute", label: "Execute the drill", hint: "execute table-exercise" },
    { id: "evaluate", label: "Evaluate performance", hint: "evaluate response-time" },
    { id: "update", label: "Update playbooks", hint: "update playbook" },
  ],
  commands: {
    design: ({ state, args }) => {
      const scenario = args[0]
      const validScenarios = ["data-breach", "service-outage", "ransomware", "insider-threat"]
      if (validScenarios.includes(scenario)) {
        return {
          stdout: `✅ Scenario designed: ${scenario}. Realistic parameters set. Objectives defined. Success criteria established.`,
          statePatch: { env: { "scenario-designed": "true" } },
          goalMet: "design",
        }
      }
      return { stdout: `Unknown scenario: ${scenario}. Available: ${validScenarios.join(", ")}` }
    },
    execute: ({ state, args }) => {
      const drill = args[0]
      const validDrills = ["table-exercise", "simulation", "full-scale", "functional"]
      if (validDrills.includes(drill)) {
        if (state.env["scenario-designed"] === "true") {
          return {
            stdout: `✅ Drill executed: ${drill}. Team response observed. Performance data collected.`,
            statePatch: { env: { "drill-executed": "true" } },
            goalMet: "execute",
          }
        }
        return {
          stdout: "❌ Execution failed: Design scenario first.",
        }
      }
      return { stdout: `Unknown drill: ${drill}. Available: ${validDrills.join(", ")}` }
    },
    evaluate: ({ state, args }) => {
      const metric = args[0]
      const validMetrics = ["response-time", "communication-timeliness", "containment-effectiveness", "stakeholder-satisfaction"]
      if (validMetrics.includes(metric)) {
        if (state.env["drill-executed"] === "true") {
          return {
            stdout: `✅ Performance evaluated: ${metric}. Gaps identified. Improvement areas noted.`,
            statePatch: { env: { "performance-evaluated": "true" } },
            goalMet: "evaluate",
          }
        }
        return {
          stdout: "❌ Evaluation failed: Execute drill first.",
        }
      }
      return { stdout: `Unknown metric: ${metric}. Available: ${validMetrics.join(", ")}` }
    },
    update: ({ state, args }) => {
      if (args[0] === "playbook") {
        if (state.env["performance-evaluated"] === "true") {
          return {
            stdout: "✅ Playbooks updated: Lessons learned incorporated. Playbooks improved. Team better prepared for real incidents.",
            statePatch: { env: { "playbooks-updated": "true" } },
            goalMet: "update",
          }
        }
        return {
          stdout: "❌ Update failed: Evaluate performance first.",
        }
      }
      return { stdout: "Usage: update playbook" }
    },
  },
  initialState,
  success: "Incident drills completed successfully. You designed a scenario, executed the drill, evaluated performance, and updated playbooks. Practice makes perfect — your team is now better prepared for real incidents.",
}
