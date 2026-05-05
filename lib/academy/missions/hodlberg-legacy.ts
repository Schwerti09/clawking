import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Legacy — Act X
====================================

Ten years later. Hodlberg AG is a security leader. The lessons learned become industry standards.

OBJECTIVES:
1. Document the journey
2. Share the lessons
3. Influence the industry
4. Build the legacy

COMMANDS:
- document [journey]
- share [lesson]
- influence [industry]
- build [legacy]

JOURNEY:
- breach-history
- recovery-story
- transformation
- growth

LESSONS:
- security-first
- resilience
- transparency
- human-factor

INDUSTRY:
- standards
- best-practices
- open-source
- mentorship

LEGACY:
- security-culture
- next-generation
- lasting-impact
- industry-leadership`,
      mode: "ro",
    },
  },
  env: {
    "documented": "false",
    "shared": "false",
    "influenced": "false",
    "built": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergLegacyMission: Mission = {
  slug: "hodlberg-legacy",
  title: "The Legacy — Act X",
  brief: "Ten years later. Hodlberg AG is a security leader. The lessons learned become industry standards.",
  welcome: "Welcome to the Hodlberg Legacy mission. Ten years later, Hodlberg AG is a security leader. Use 'document [journey]' to record the history, 'share [lesson]' to teach others, 'influence [industry]' to set standards, and 'build [legacy]' to create lasting impact.",
  prompt: "founder@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "document", label: "Document the journey", hint: "document breach-history" },
    { id: "share", label: "Share the lessons", hint: "share security-first" },
    { id: "influence", label: "Influence the industry", hint: "influence standards" },
    { id: "build", label: "Build the legacy", hint: "build security-culture" },
  ],
  commands: {
    document: ({ state, args }) => {
      const journey = args[0]
      const validJourneys = ["breach-history", "recovery-story", "transformation", "growth"]
      if (validJourneys.includes(journey)) {
        return {
          stdout: `✅ Journey documented: ${journey}. History recorded. Story preserved. Lessons captured.`,
          statePatch: { env: { "documented": "true" } },
          goalMet: "document",
        }
      }
      return { stdout: `Unknown journey: ${journey}. Available: ${validJourneys.join(", ")}` }
    },
    share: ({ state, args }) => {
      const lesson = args[0]
      const validLessons = ["security-first", "resilience", "transparency", "human-factor"]
      if (validLessons.includes(lesson)) {
        if (state.env["documented"] === "true") {
          return {
            stdout: `✅ Lesson shared: ${lesson}. Knowledge disseminated. Best practices published. Community educated.`,
            statePatch: { env: { "shared": "true" } },
            goalMet: "share",
          }
        }
        return {
          stdout: "❌ Sharing failed: Document journey first.",
        }
      }
      return { stdout: `Unknown lesson: ${lesson}. Available: ${validLessons.join(", ")}` }
    },
    influence: ({ state, args }) => {
      const industry = args[0]
      const validIndustries = ["standards", "best-practices", "open-source", "mentorship"]
      if (validIndustries.includes(industry)) {
        if (state.env["shared"] === "true") {
          return {
            stdout: `✅ Industry influenced: ${industry}. Standards set. Practices adopted. Open source contributed. Mentors trained.`,
            statePatch: { env: { "influenced": "true" } },
            goalMet: "influence",
          }
        }
        return {
          stdout: "❌ Influence failed: Share lessons first.",
        }
      }
      return { stdout: `Unknown industry: ${industry}. Available: ${validIndustries.join(", ")}` }
    },
    build: ({ state, args }) => {
      const legacy = args[0]
      const validLegacies = ["security-culture", "next-generation", "lasting-impact", "industry-leadership"]
      if (validLegacies.includes(legacy)) {
        if (state.env["influenced"] === "true") {
          return {
            stdout: `✅ Legacy built: ${legacy}. Security culture established. Next generation trained. Lasting impact created. Industry leadership secured.`,
            statePatch: { env: { "built": "true" } },
            goalMet: "build",
          }
        }
        return {
          stdout: "❌ Building failed: Influence industry first.",
        }
      }
      return { stdout: `Unknown legacy: ${legacy}. Available: ${validLegacies.join(", ")}` }
    },
  },
  initialState,
  success: "Legacy built. You documented the journey, shared lessons, influenced the industry, and built a lasting legacy. Hodlberg AG's lessons are now industry standards.",
}
