import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/root-cause",
  fs: {
    "/root-cause/README": {
      content: `Mission: Root Cause Analysis — Find the Why
===============================================

The incident is resolved. But why did it happen? Find the root cause.

OBJECTIVES:
1. Analyze the attack path
2. Identify the vulnerability
3. Determine the failure point
4. Recommend remediation

COMMANDS:
- analyze [attack-path]
- identify [vulnerability]
- determine [failure-point]
- recommend [remediation]

ATTACK PATHS:
- phishing-to-compromise
- supply-chain-injection
- misconfiguration-exploit
- credential-theft

VULNERABILITIES:
- missing-mfa
- outdated-dependencies
- weak-passwords
- unpatched-systems

FAILURE POINTS:
- process
- technology
- people
- monitoring

REMEDIATION:
- security-controls
- process-changes
- training
- monitoring-upgrade`,
      mode: "ro",
    },
  },
  env: {
    "attack-path-analyzed": "false",
    "vulnerability-identified": "false",
    "failure-point-determined": "false",
    "remediation-recommended": "false",
  },
  goalsMet: [],
  history: [],
}

export const incidentRootCauseMission: Mission = {
  slug: "incident-root-cause",
  title: "Root cause analysis — find the why",
  brief: "The incident is resolved. But why did it happen? Find the root cause and recommend remediation.",
  welcome: "Welcome to the Root Cause Analysis mission. The incident is resolved — but why did it happen? Use 'analyze [attack-path]' to trace the attack, 'identify [vulnerability]' to find the weakness, 'determine [failure-point]' to understand what failed, and 'recommend [remediation]' to prevent recurrence.",
  prompt: "analyst@hodlberg-soc:/root-cause$ ",
  goals: [
    { id: "analyze", label: "Analyze the attack path", hint: "analyze phishing-to-compromise" },
    { id: "identify", label: "Identify the vulnerability", hint: "identify missing-mfa" },
    { id: "determine", label: "Determine the failure point", hint: "determine process" },
    { id: "recommend", label: "Recommend remediation", hint: "recommend security-controls" },
  ],
  commands: {
    analyze: ({ state, args }) => {
      const path = args[0]
      const validPaths = ["phishing-to-compromise", "supply-chain-injection", "misconfiguration-exploit", "credential-theft"]
      if (validPaths.includes(path)) {
        return {
          stdout: `✅ Attack path analyzed: ${path}. The attacker used this path to gain access. Timeline reconstructed.`,
          statePatch: { env: { "attack-path-analyzed": "true" } },
          goalMet: "analyze",
        }
      }
      return { stdout: `Unknown path: ${path}. Available: ${validPaths.join(", ")}` }
    },
    identify: ({ state, args }) => {
      const vulnerability = args[0]
      const validVulnerabilities = ["missing-mfa", "outdated-dependencies", "weak-passwords", "unpatched-systems"]
      if (validVulnerabilities.includes(vulnerability)) {
        if (state.env["attack-path-analyzed"] === "true") {
          return {
            stdout: `✅ Vulnerability identified: ${vulnerability}. This weakness enabled the attack.`,
            statePatch: { env: { "vulnerability-identified": "true" } },
            goalMet: "identify",
          }
        }
        return {
          stdout: "❌ Identification failed: Analyze attack path first.",
        }
      }
      return { stdout: `Unknown vulnerability: ${vulnerability}. Available: ${validVulnerabilities.join(", ")}` }
    },
    determine: ({ state, args }) => {
      const failure = args[0]
      const validFailures = ["process", "technology", "people", "monitoring"]
      if (validFailures.includes(failure)) {
        if (state.env["vulnerability-identified"] === "true") {
          return {
            stdout: `✅ Failure point determined: ${failure}. This is where the system failed to prevent the incident.`,
            statePatch: { env: { "failure-point-determined": "true" } },
            goalMet: "determine",
          }
        }
        return {
          stdout: "❌ Determination failed: Identify vulnerability first.",
        }
      }
      return { stdout: `Unknown failure point: ${failure}. Available: ${validFailures.join(", ")}` }
    },
    recommend: ({ state, args }) => {
      const remediation = args[0]
      const validRemediations = ["security-controls", "process-changes", "training", "monitoring-upgrade"]
      if (validRemediations.includes(remediation)) {
        if (state.env["failure-point-determined"] === "true") {
          return {
            stdout: `✅ Remediation recommended: ${remediation}. This will prevent recurrence. Implementation plan ready.`,
            statePatch: { env: { "remediation-recommended": "true" } },
            goalMet: "recommend",
          }
        }
        return {
          stdout: "❌ Recommendation failed: Determine failure point first.",
        }
      }
      return { stdout: `Unknown remediation: ${remediation}. Available: ${validRemediations.join(", ")}` }
    },
  },
  initialState,
  success: "Root cause analysis completed successfully. You analyzed the attack path, identified the vulnerability, determined the failure point, and recommended remediation. The root cause is now understood and a prevention plan is in place.",
}
