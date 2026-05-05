import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Epilogue — Act XI
======================================

The story concludes. What started as a seed round breach became a journey of transformation. The final chapter.

OBJECTIVES:
1. Reflect on the journey
2. Celebrate the achievements
3. Honor the fallen
4. Pass the torch

COMMANDS:
- reflect [journey]
- celebrate [achievement]
- honor [fallen]
- pass [torch]

JOURNEY:
- growth
- resilience
- transformation
- leadership

ACHIEVEMENTS:
- security-leadership
- industry-impact
- customer-trust
- team-excellence

FALLEN:
- lost-data
- lost-talent
- lost-time
- lost-opportunities

TORCH:
- next-generation
- community
- open-source
- future-leaders`,
      mode: "ro",
    },
  },
  env: {
    "reflected": "false",
    "celebrated": "false",
    "honored": "false",
    "passed": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergEpilogueMission: Mission = {
  slug: "hodlberg-epilogue",
  title: "The Epilogue — Act XI",
  brief: "The story concludes. What started as a seed round breach became a journey of transformation. The final chapter.",
  welcome: "Welcome to the Hodlberg Epilogue mission. The story concludes. Use 'reflect [journey]' to look back, 'celebrate [achievement]' to recognize success, 'honor [fallen]' to remember losses, and 'pass [torch]' to ensure the future.",
  prompt: "founder@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "reflect", label: "Reflect on the journey", hint: "reflect growth" },
    { id: "celebrate", label: "Celebrate the achievements", hint: "celebrate security-leadership" },
    { id: "honor", label: "Honor the fallen", hint: "honor lost-talent" },
    { id: "pass", label: "Pass the torch", hint: "pass next-generation" },
  ],
  commands: {
    reflect: ({ state, args }) => {
      const journey = args[0]
      const validJourneys = ["growth", "resilience", "transformation", "leadership"]
      if (validJourneys.includes(journey)) {
        return {
          stdout: `✅ Journey reflected: ${journey}. Looking back with perspective. Growth acknowledged. Resilience appreciated. Transformation celebrated.`,
          statePatch: { env: { "reflected": "true" } },
          goalMet: "reflect",
        }
      }
      return { stdout: `Unknown journey: ${journey}. Available: ${validJourneys.join(", ")}` }
    },
    celebrate: ({ state, args }) => {
      const achievement = args[0]
      const validAchievements = ["security-leadership", "industry-impact", "customer-trust", "team-excellence"]
      if (validAchievements.includes(achievement)) {
        if (state.env["reflected"] === "true") {
          return {
            stdout: `✅ Achievement celebrated: ${achievement}. Success recognized. Impact measured. Trust valued. Excellence honored.`,
            statePatch: { env: { "celebrated": "true" } },
            goalMet: "celebrate",
          }
        }
        return {
          stdout: "❌ Celebration failed: Reflect on journey first.",
        }
      }
      return { stdout: `Unknown achievement: ${achievement}. Available: ${validAchievements.join(", ")}` }
    },
    honor: ({ state, args }) => {
      const fallen = args[0]
      const validFallen = ["lost-data", "lost-talent", "lost-time", "lost-opportunities"]
      if (validFallen.includes(fallen)) {
        if (state.env["celebrated"] === "true") {
          return {
            stdout: `✅ Fallen honored: ${fallen}. Losses remembered. Sacrifices acknowledged. Lessons preserved. Memory kept alive.`,
            statePatch: { env: { "honored": "true" } },
            goalMet: "honor",
          }
        }
        return {
          stdout: "❌ Honoring failed: Celebrate achievements first.",
        }
      }
      return { stdout: `Unknown fallen: ${fallen}. Available: ${validFallen.join(", ")}` }
    },
    pass: ({ state, args }) => {
      const torch = args[0]
      const validTorches = ["next-generation", "community", "open-source", "future-leaders"]
      if (validTorches.includes(torch)) {
        if (state.env["honored"] === "true") {
          return {
            stdout: `✅ Torch passed: ${torch}. Next generation empowered. Community strengthened. Open source sustained. Future leaders prepared.`,
            statePatch: { env: { "passed": "true" } },
            goalMet: "pass",
          }
        }
        return {
          stdout: "❌ Passing failed: Honor the fallen first.",
        }
      }
      return { stdout: `Unknown torch: ${torch}. Available: ${validTorches.join(", ")}` }
    },
  },
  initialState,
  success: "Epilogue complete. You reflected on the journey, celebrated achievements, honored the fallen, and passed the torch. The Hodlberg story concludes, but the legacy lives on.",
}
