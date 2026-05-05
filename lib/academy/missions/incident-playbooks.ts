import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/playbooks",
  fs: {
    "/playbooks/README": {
      content: `Mission: Incident Response Playbooks — Ready to Run
======================================================

When the alarm goes off, you don't think. You execute. Build the playbooks.

OBJECTIVES:
1. Create detection playbook
2. Create containment playbook
3. Create recovery playbook
4. Test the playbooks

COMMANDS:
- create [playbook-type]
- add [step]
- test [playbook]
- verify readiness

PLAYBOOK TYPES:
- detection
- containment
- recovery
- communication

STEPS:
- trigger-conditions
- escalation-path
- action-items
- success-criteria

TESTING:
- dry-run
- table-exercise
- full-drill
- post-drill-review`,
      mode: "ro",
    },
  },
  env: {
    "playbooks-created": "false",
    "steps-added": "false",
    "playbooks-tested": "false",
    "readiness-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const incidentPlaybooksMission: Mission = {
  slug: "incident-playbooks",
  title: "Incident response playbooks — ready to run",
  brief: "When the alarm goes off, you don't think. You execute. Build the playbooks.",
  welcome: "Welcome to the Incident Response Playbooks mission. When the alarm goes off, you don't think — you execute. Use 'create [playbook-type]' to build playbooks, 'add [step]' to add steps, 'test [playbook]' to validate, and 'verify readiness' to confirm your team is prepared.",
  prompt: "playbook@hodlberg-soc:/playbooks$ ",
  goals: [
    { id: "create", label: "Create detection playbook", hint: "create detection" },
    { id: "add", label: "Add steps to playbooks", hint: "add trigger-conditions" },
    { id: "test", label: "Test the playbooks", hint: "test dry-run" },
    { id: "verify", label: "Verify readiness", hint: "verify readiness" },
  ],
  commands: {
    create: ({ state, args }) => {
      const playbook = args[0]
      const validPlaybooks = ["detection", "containment", "recovery", "communication"]
      if (validPlaybooks.includes(playbook)) {
        return {
          stdout: `✅ Playbook created: ${playbook}. Template loaded. Ready for steps.`,
          statePatch: { env: { "playbooks-created": "true" } },
          goalMet: "create",
        }
      }
      return { stdout: `Unknown playbook: ${playbook}. Available: ${validPlaybooks.join(", ")}` }
    },
    add: ({ state, args }) => {
      const step = args[0]
      const validSteps = ["trigger-conditions", "escalation-path", "action-items", "success-criteria"]
      if (validSteps.includes(step)) {
        if (state.env["playbooks-created"] === "true") {
          return {
            stdout: `✅ Step added: ${step}. Playbook updated with clear instructions.`,
            statePatch: { env: { "steps-added": "true" } },
            goalMet: "add",
          }
        }
        return {
          stdout: "❌ Step addition failed: Create playbooks first.",
        }
      }
      return { stdout: `Unknown step: ${step}. Available: ${validSteps.join(", ")}` }
    },
    test: ({ state, args }) => {
      const test = args[0]
      const validTests = ["dry-run", "table-exercise", "full-drill", "post-drill-review"]
      if (validTests.includes(test)) {
        if (state.env["steps-added"] === "true") {
          return {
            stdout: `✅ Playbook tested: ${test}. Dry-run successful. Playbook validated.`,
            statePatch: { env: { "playbooks-tested": "true" } },
            goalMet: "test",
          }
        }
        return {
          stdout: "❌ Testing failed: Add steps first.",
        }
      }
      return { stdout: `Unknown test: ${test}. Available: ${validTests.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "readiness") {
        if (state.env["playbooks-tested"] === "true") {
          return {
            stdout: "✅ Readiness verified: All playbooks created, steps added, tested successfully. Team is ready to execute when the alarm goes off.",
            statePatch: { env: { "readiness-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Test playbooks first.",
        }
      }
      return { stdout: "Usage: verify readiness" }
    },
  },
  initialState,
  success: "Incident response playbooks completed successfully. You created playbooks, added steps, tested them, and verified readiness. When the alarm goes off, your team won't think — they'll execute.",
}
