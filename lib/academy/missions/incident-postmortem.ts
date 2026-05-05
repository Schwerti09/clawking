import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/postmortem",
  fs: {
    "/postmortem/README": {
      content: `Mission: Incident Post-Mortem — Learn and Improve
======================================================

The incident is over. Document what happened and how to improve.

OBJECTIVES:
1. Document the timeline
2. Identify lessons learned
3. Create action items
4. Share with stakeholders

COMMANDS:
- document timeline
- identify lessons
- create actions
- share stakeholders

TIMELINE ELEMENTS:
- detection
- containment
- recovery
- resolution

LESSONS LEARNED:
- what-went-well
- what-went-wrong
- what-could-be-better
- what-was-surprising

ACTION ITEMS:
- immediate-actions
- short-term-improvements
- long-term-changes
- process-updates

STAKEHOLDERS:
- team
- management
- customers
- public`,
      mode: "ro",
    },
  },
  env: {
    "timeline-documented": "false",
    "lessons-identified": "false",
    "actions-created": "false",
    "stakeholders-shared": "false",
  },
  goalsMet: [],
  history: [],
}

export const incidentPostmortemMission: Mission = {
  slug: "incident-postmortem",
  title: "Incident post-mortem — learn and improve",
  brief: "The incident is over. Document what happened, identify lessons learned, and create action items.",
  welcome: "Welcome to the Incident Post-Mortem mission. The incident is over — now learn and improve. Use 'document timeline' to record what happened, 'identify lessons' to capture insights, 'create actions' to plan improvements, and 'share stakeholders' to communicate findings. Blameless post-mortem.",
  prompt: "postmortem@hodlberg-soc:/postmortem$ ",
  goals: [
    { id: "document", label: "Document the timeline", hint: "document timeline" },
    { id: "identify", label: "Identify lessons learned", hint: "identify lessons" },
    { id: "create", label: "Create action items", hint: "create actions" },
    { id: "share", label: "Share with stakeholders", hint: "share stakeholders" },
  ],
  commands: {
    document: ({ state, args }) => {
      if (args[0] === "timeline") {
        return {
          stdout: "✅ Timeline documented:\n\n[14:30:00] Initial compromise detected\n[14:32:00] Incident response activated\n[14:35:00] Containment achieved\n[14:45:00] Recovery initiated\n[15:30:00] Services restored\n[16:00:00] Incident resolved\n\nComplete timeline recorded with timestamps and actions.",
          statePatch: { env: { "timeline-documented": "true" } },
          goalMet: "document",
        }
      }
      return { stdout: "Usage: document timeline" }
    },
    identify: ({ state, args }) => {
      if (args[0] === "lessons") {
        if (state.env["timeline-documented"] === "true") {
          return {
            stdout: "✅ Lessons identified:\n\nWhat went well: Fast detection, effective containment\nWhat went wrong: MFA not enforced, monitoring gaps\nWhat could be better: Communication, documentation\nWhat was surprising: Attack sophistication\n\nBlameless lessons learned captured.",
            statePatch: { env: { "lessons-identified": "true" } },
            goalMet: "identify",
          }
        }
        return {
          stdout: "❌ Identification failed: Document timeline first.",
        }
      }
      return { stdout: "Usage: identify lessons" }
    },
    create: ({ state, args }) => {
      if (args[0] === "actions") {
        if (state.env["lessons-identified"] === "true") {
          return {
            stdout: "✅ Action items created:\n\nImmediate: Enforce MFA for all admin accounts\nShort-term: Upgrade monitoring and alerting\nLong-term: Implement zero-trust architecture\nProcess: Update incident response playbooks\n\nAction items assigned with owners and deadlines.",
            statePatch: { env: { "actions-created": "true" } },
            goalMet: "create",
          }
        }
        return {
          stdout: "❌ Creation failed: Identify lessons first.",
        }
      }
      return { stdout: "Usage: create actions" }
    },
    share: ({ state, args }) => {
      if (args[0] === "stakeholders") {
        if (state.env["actions-created"] === "true") {
          return {
            stdout: "✅ Shared with stakeholders:\n\nTeam: Internal post-mortem completed\nManagement: Executive summary provided\nCustomers: Transparent communication sent\nPublic: Security advisory published\n\nStakeholders informed. Transparency maintained.",
            statePatch: { env: { "stakeholders-shared": "true" } },
            goalMet: "share",
          }
        }
        return {
          stdout: "❌ Sharing failed: Create action items first.",
        }
      }
      return { stdout: "Usage: share stakeholders" }
    },
  },
  initialState,
  success: "Post-mortem completed successfully. You documented the timeline, identified lessons learned, created action items, and shared with stakeholders. The incident is now a learning opportunity. Blameless culture maintained.",
}
