import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/purple-team",
  fs: {
    "/purple-team/README": {
      content: `Mission: Purple Teaming — Red + Blue Collaboration
=========================================================

Red and blue teams working together. Collaborative security testing.

OBJECTIVES:
1. Coordinate red team engagement
2. Monitor blue team response
3. Analyze gaps
4. Improve collaboration

COMMANDS:
- coordinate [engagement]
- monitor [response]
- analyze [gap]
- improve [collaboration]

ENGAGEMENTS:
- rules-of-engagement
- scope-definition
- communication-plan
- success-criteria

RESPONSES:
- detection-time
- containment-time
- remediation-time
- communication-effectiveness

GAPS:
- detection-gaps
- response-gaps
- process-gaps
- tooling-gaps

COLLABORATION:
- joint-planning
- shared-intelligence
- unified-dashboard
- continuous-improvement`,
      mode: "ro",
    },
  },
  env: {
    "engagement-coordinated": "false",
    "response-monitored": "false",
    "gaps-analyzed": "false",
    "collaboration-improved": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialPurpleTeamingMission: Mission = {
  slug: "adversarial-purple-teaming",
  title: "Purple teaming — red + blue collaboration",
  brief: "Red and blue teams working together. Collaborative security testing.",
  welcome: "Welcome to the Purple Teaming mission. Red and blue teams working together. Use 'coordinate [engagement]' to plan the exercise, 'monitor [response]' to track blue team, 'analyze [gap]' to identify weaknesses, and 'improve [collaboration]' to strengthen teamwork.",
  prompt: "purpleteam@hodlberg-security:/purple-team$ ",
  goals: [
    { id: "coordinate", label: "Coordinate red team engagement", hint: "coordinate rules-of-engagement" },
    { id: "monitor", label: "Monitor blue team response", hint: "monitor detection-time" },
    { id: "analyze", label: "Analyze gaps", hint: "analyze detection-gaps" },
    { id: "improve", label: "Improve collaboration", hint: "improve joint-planning" },
  ],
  commands: {
    coordinate: ({ state, args }) => {
      const engagement = args[0]
      const validEngagements = ["rules-of-engagement", "scope-definition", "communication-plan", "success-criteria"]
      if (validEngagements.includes(engagement)) {
        return {
          stdout: `✅ Engagement coordinated: ${engagement}. Red team briefed. Blue team notified. Exercise scope defined.`,
          statePatch: { env: { "engagement-coordinated": "true" } },
          goalMet: "coordinate",
        }
      }
      return { stdout: `Unknown engagement: ${engagement}. Available: ${validEngagements.join(", ")}` }
    },
    monitor: ({ state, args }) => {
      const response = args[0]
      const validResponses = ["detection-time", "containment-time", "remediation-time", "communication-effectiveness"]
      if (validResponses.includes(response)) {
        if (state.env["engagement-coordinated"] === "true") {
          return {
            stdout: `✅ Response monitored: ${response}. Blue team performance tracked. Metrics collected. Response time measured.`,
            statePatch: { env: { "response-monitored": "true" } },
            goalMet: "monitor",
          }
        }
        return {
          stdout: "❌ Monitoring failed: Coordinate engagement first.",
        }
      }
      return { stdout: `Unknown response: ${response}. Available: ${validResponses.join(", ")}` }
    },
    analyze: ({ state, args }) => {
      const gap = args[0]
      const validGaps = ["detection-gaps", "response-gaps", "process-gaps", "tooling-gaps"]
      if (validGaps.includes(gap)) {
        if (state.env["response-monitored"] === "true") {
          return {
            stdout: `✅ Gap analyzed: ${gap}. Security weaknesses identified. Root causes determined. Priorities set.`,
            statePatch: { env: { "gaps-analyzed": "true" } },
            goalMet: "analyze",
          }
        }
        return {
          stdout: "❌ Analysis failed: Monitor response first.",
        }
      }
      return { stdout: `Unknown gap: ${gap}. Available: ${validGaps.join(", ")}` }
    },
    improve: ({ state, args }) => {
      const collaboration = args[0]
      const validCollaborations = ["joint-planning", "shared-intelligence", "unified-dashboard", "continuous-improvement"]
      if (validCollaborations.includes(collaboration)) {
        if (state.env["gaps-analyzed"] === "true") {
          return {
            stdout: `✅ Collaboration improved: ${collaboration}. Red-blue teamwork strengthened. Intelligence shared. Processes integrated.`,
            statePatch: { env: { "collaboration-improved": "true" } },
            goalMet: "improve",
          }
        }
        return {
          stdout: "❌ Improvement failed: Analyze gaps first.",
        }
      }
      return { stdout: `Unknown collaboration: ${collaboration}. Available: ${validCollaborations.join(", ")}` }
    },
  },
  initialState,
  success: "Purple teaming completed successfully. You coordinated engagement, monitored response, analyzed gaps, and improved collaboration. Red and blue teams now work together effectively.",
}
