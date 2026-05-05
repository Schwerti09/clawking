import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Finale — Act XII
=====================================

The final mission. The ultimate test. Everything learned, everything earned, everything at stake. The finale.

OBJECTIVES:
1. Face the ultimate challenge
2. Apply all lessons
3. Defeat the final enemy
4. Complete the journey

COMMANDS:
- face [challenge]
- apply [lesson]
- defeat [enemy]
- complete [journey]

CHALLENGES:
- existential-threat
- industry-crisis
- global-attack
- unknown-unknown

LESSONS:
- security-first
- resilience
- transparency
- leadership

ENEMIES:
- original-attacker
- new-threat
- internal-weakness
- external-pressure

JOURNEY:
- closure
- fulfillment
- peace
- new-beginning`,
      mode: "ro",
    },
  },
  env: {
    "faced": "false",
    "applied": "false",
    "defeated": "false",
    "completed": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergFinaleMission: Mission = {
  slug: "hodlberg-finale",
  title: "The Finale — Act XII",
  brief: "The final mission. The ultimate test. Everything learned, everything earned, everything at stake. The finale.",
  welcome: "Welcome to the Hodlberg Finale mission. The final mission. The ultimate test. Use 'face [challenge]' to confront the ultimate threat, 'apply [lesson]' to use everything learned, 'defeat [enemy]' to overcome the final enemy, and 'complete [journey]' to finish the Hodlberg story.",
  prompt: "founder@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "face", label: "Face the ultimate challenge", hint: "face existential-threat" },
    { id: "apply", label: "Apply all lessons", hint: "apply security-first" },
    { id: "defeat", label: "Defeat the final enemy", hint: "defeat original-attacker" },
    { id: "complete", label: "Complete the journey", hint: "complete closure" },
  ],
  commands: {
    face: ({ state, args }) => {
      const challenge = args[0]
      const validChallenges = ["existential-threat", "industry-crisis", "global-attack", "unknown-unknown"]
      if (validChallenges.includes(challenge)) {
        return {
          stdout: `✅ Challenge faced: ${challenge}. Ultimate threat confronted. All resources mobilized. Leadership tested.`,
          statePatch: { env: { "faced": "true" } },
          goalMet: "face",
        }
      }
      return { stdout: `Unknown challenge: ${challenge}. Available: ${validChallenges.join(", ")}` }
    },
    apply: ({ state, args }) => {
      const lesson = args[0]
      const validLessons = ["security-first", "resilience", "transparency", "leadership"]
      if (validLessons.includes(lesson)) {
        if (state.env["faced"] === "true") {
          return {
            stdout: `✅ Lesson applied: ${lesson}. All lessons used. Every skill deployed. Complete expertise demonstrated.`,
            statePatch: { env: { "applied": "true" } },
            goalMet: "apply",
          }
        }
        return {
          stdout: "❌ Application failed: Face challenge first.",
        }
      }
      return { stdout: `Unknown lesson: ${lesson}. Available: ${validLessons.join(", ")}` }
    },
    defeat: ({ state, args }) => {
      const enemy = args[0]
      const validEnemies = ["original-attacker", "new-threat", "internal-weakness", "external-pressure"]
      if (validEnemies.includes(enemy)) {
        if (state.env["applied"] === "true") {
          return {
            stdout: `✅ Enemy defeated: ${enemy}. Final enemy overcome. Victory achieved. Threat eliminated.`,
            statePatch: { env: { "defeated": "true" } },
            goalMet: "defeat",
          }
        }
        return {
          stdout: "❌ Defeat failed: Apply lessons first.",
        }
      }
      return { stdout: `Unknown enemy: ${enemy}. Available: ${validEnemies.join(", ")}` }
    },
    complete: ({ state, args }) => {
      const journey = args[0]
      const validJourneys = ["closure", "fulfillment", "peace", "new-beginning"]
      if (validJourneys.includes(journey)) {
        if (state.env["defeated"] === "true") {
          return {
            stdout: `✅ Journey completed: ${journey}. Hodlberg story complete. Journey finished. Legacy secured. New beginning awaits.`,
            statePatch: { env: { "completed": "true" } },
            goalMet: "complete",
          }
        }
        return {
          stdout: "❌ Completion failed: Defeat enemy first.",
        }
      }
      return { stdout: `Unknown journey: ${journey}. Available: ${validJourneys.join(", ")}` }
    },
  },
  initialState,
  success: "Finale complete. You faced the ultimate challenge, applied all lessons, defeated the final enemy, and completed the journey. The Hodlberg story is complete. You are now a security master.",
}
