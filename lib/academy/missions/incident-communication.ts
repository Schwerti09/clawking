import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/communication",
  fs: {
    "/communication/README": {
      content: `Mission: Incident Communication — Transparent and Timely
=========================================================

The incident is happening. Communicate transparently. Trust is on the line.

OBJECTIVES:
1. Assess communication needs
2. Draft internal message
3. Draft external message
4. Send communications

COMMANDS:
- assess [audience]
- draft [message-type]
- review [message]
- send [channel]

AUDIENCES:
- internal-team
- management
- customers
- public

MESSAGE TYPES:
- status-update
- impact-assessment
- remediation-plan
- timeline

CHANNELS:
- email
- slack
- status-page
- social-media`,
      mode: "ro",
    },
  },
  env: {
    "needs-assessed": "false",
    "messages-drafted": "false",
    "messages-reviewed": "false",
    "communications-sent": "false",
  },
  goalsMet: [],
  history: [],
}

export const incidentCommunicationMission: Mission = {
  slug: "incident-communication",
  title: "Incident communication — transparent and timely",
  brief: "The incident is happening. Communicate transparently. Trust is on the line.",
  welcome: "Welcome to the Incident Communication mission. The incident is happening — communicate transparently. Use 'assess [audience]' to identify who needs to know, 'draft [message-type]' to create messages, 'review [message]' to validate accuracy, and 'send [channel]' to deliver communications. Trust is on the line.",
  prompt: "comms@hodlberg-soc:/communication$ ",
  goals: [
    { id: "assess", label: "Assess communication needs", hint: "assess internal-team" },
    { id: "draft", label: "Draft internal message", hint: "draft status-update" },
    { id: "review", label: "Review messages", hint: "review status-update" },
    { id: "send", label: "Send communications", hint: "send email" },
  ],
  commands: {
    assess: ({ state, args }) => {
      const audience = args[0]
      const validAudiences = ["internal-team", "management", "customers", "public"]
      if (validAudiences.includes(audience)) {
        return {
          stdout: `✅ Communication needs assessed: ${audience}. Priority level determined. Timing planned.`,
          statePatch: { env: { "needs-assessed": "true" } },
          goalMet: "assess",
        }
      }
      return { stdout: `Unknown audience: ${audience}. Available: ${validAudiences.join(", ")}` }
    },
    draft: ({ state, args }) => {
      const message = args[0]
      const validMessages = ["status-update", "impact-assessment", "remediation-plan", "timeline"]
      if (validMessages.includes(message)) {
        if (state.env["needs-assessed"] === "true") {
          return {
            stdout: `✅ Message drafted: ${message}. Clear, accurate, transparent. Ready for review.`,
            statePatch: { env: { "messages-drafted": "true" } },
            goalMet: "draft",
          }
        }
        return {
          stdout: "❌ Drafting failed: Assess communication needs first.",
        }
      }
      return { stdout: `Unknown message: ${message}. Available: ${validMessages.join(", ")}` }
    },
    review: ({ state, args }) => {
      if (args[0] === "status-update") {
        if (state.env["messages-drafted"] === "true") {
          return {
            stdout: "✅ Message reviewed: Accurate, transparent, timely. No sensitive information leaked. Approved for sending.",
            statePatch: { env: { "messages-reviewed": "true" } },
            goalMet: "review",
          }
        }
        return {
          stdout: "❌ Review failed: Draft messages first.",
        }
      }
      return { stdout: "Usage: review [message-type]" }
    },
    send: ({ state, args }) => {
      const channel = args[0]
      const validChannels = ["email", "slack", "status-page", "social-media"]
      if (validChannels.includes(channel)) {
        if (state.env["messages-reviewed"] === "true") {
          return {
            stdout: `✅ Communication sent: ${channel}. All stakeholders informed. Trust maintained through transparency.`,
            statePatch: { env: { "communications-sent": "true" } },
            goalMet: "send",
          }
        }
        return {
          stdout: "❌ Sending failed: Review messages first.",
        }
      }
      return { stdout: `Unknown channel: ${channel}. Available: ${validChannels.join(", ")}` }
    },
  },
  initialState,
  success: "Incident communication completed successfully. You assessed needs, drafted messages, reviewed for accuracy, and sent communications. Trust was maintained through transparency. Stakeholders informed.",
}
