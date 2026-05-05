import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/osint",
  fs: {
    "/osint/README": {
      content: `Mission: OSINT — Open Source Intelligence
===============================================

Public information is intelligence. Gather, analyze, act.

OBJECTIVES:
1. Identify intelligence needs
2. Collect OSINT data
3. Analyze findings
4. Apply intelligence

COMMANDS:
- identify [need]
- collect [osint-source]
- analyze [finding]
- apply [osint-intel]

NEEDS:
- threat-landscape
- vulnerability-exposure
- brand-reputation
- competitor-intel

OSINT SOURCES:
- social-media
- dark-web
- public-registries
- bug-bounties

FINDINGS:
- exposed-credentials
- misconfigurations
- data-leaks
- attack-plans

INTEL:
- risk-mitigation
- threat-hunting
- incident-response
- strategic-planning`,
      mode: "ro",
    },
  },
  env: {
    "needs-identified": "false",
    "osint-collected": "false",
    "findings-analyzed": "false",
    "osint-applied": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialOsintMission: Mission = {
  slug: "adversarial-osint",
  title: "OSINT — open source intelligence",
  brief: "Public information is intelligence. Gather, analyze, act.",
  welcome: "Welcome to the OSINT mission. Public information is intelligence. Use 'identify [need]' to define requirements, 'collect [osint-source]' to gather data, 'analyze [finding]' to interpret results, and 'apply [osint-intel]' to take action.",
  prompt: "osint@hodlberg-security:/osint$ ",
  goals: [
    { id: "identify", label: "Identify intelligence needs", hint: "identify threat-landscape" },
    { id: "collect", label: "Collect OSINT data", hint: "collect social-media" },
    { id: "analyze", label: "Analyze findings", hint: "analyze exposed-credentials" },
    { id: "apply", label: "Apply intelligence", hint: "apply risk-mitigation" },
  ],
  commands: {
    identify: ({ state, args }) => {
      const need = args[0]
      const validNeeds = ["threat-landscape", "vulnerability-exposure", "brand-reputation", "competitor-intel"]
      if (validNeeds.includes(need)) {
        return {
          stdout: `✅ Need identified: ${need}. Intelligence requirements defined. Scope established. Priorities set.`,
          statePatch: { env: { "needs-identified": "true" } },
          goalMet: "identify",
        }
      }
      return { stdout: `Unknown need: ${need}. Available: ${validNeeds.join(", ")}` }
    },
    collect: ({ state, args }) => {
      const source = args[0]
      const validSources = ["social-media", "dark-web", "public-registries", "bug-bounties"]
      if (validSources.includes(source)) {
        if (state.env["needs-identified"] === "true") {
          return {
            stdout: `✅ OSINT collected: ${source}. Public data gathered. Information extracted. Metadata preserved.`,
            statePatch: { env: { "osint-collected": "true" } },
            goalMet: "collect",
          }
        }
        return {
          stdout: "❌ Collection failed: Identify intelligence needs first.",
        }
      }
      return { stdout: `Unknown source: ${source}. Available: ${validSources.join(", ")}` }
    },
    analyze: ({ state, args }) => {
      const finding = args[0]
      const validFindings = ["exposed-credentials", "misconfigurations", "data-leaks", "attack-plans"]
      if (validFindings.includes(finding)) {
        if (state.env["osint-collected"] === "true") {
          return {
            stdout: `✅ Finding analyzed: ${finding}. OSINT interpreted. Patterns identified. Risk assessed.`,
            statePatch: { env: { "findings-analyzed": "true" } },
            goalMet: "analyze",
          }
        }
        return {
          stdout: "❌ Analysis failed: Collect OSINT data first.",
        }
      }
      return { stdout: `Unknown finding: ${finding}. Available: ${validFindings.join(", ")}` }
    },
    apply: ({ state, args }) => {
      const intel = args[0]
      const validIntel = ["risk-mitigation", "threat-hunting", "incident-response", "strategic-planning"]
      if (validIntel.includes(intel)) {
        if (state.env["findings-analyzed"] === "true") {
          return {
            stdout: `✅ OSINT applied: ${intel}. Intelligence operationalized. Actions taken. Risks mitigated.`,
            statePatch: { env: { "osint-applied": "true" } },
            goalMet: "apply",
          }
        }
        return {
          stdout: "❌ Application failed: Analyze findings first.",
        }
      }
      return { stdout: `Unknown intel: ${intel}. Available: ${validIntel.join(", ")}` }
    },
  },
  initialState,
  success: "OSINT completed successfully. You identified needs, collected data, analyzed findings, and applied intelligence. Public information is now actionable intelligence.",
}
