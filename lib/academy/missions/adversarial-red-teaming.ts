import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/red-team",
  fs: {
    "/red-team/README": {
      content: `Mission: Red Teaming — Think Like the Attacker
=================================================

To defend, you must attack. Think like the attacker to find vulnerabilities.

OBJECTIVES:
1. Reconnaissance
2. Exploit vulnerabilities
3. Maintain access
4. Document findings

COMMANDS:
- recon [target]
- exploit [vulnerability]
- maintain [access-method]
- document findings

TARGETS:
- web-application
- api-endpoints
- network-infrastructure
- cloud-resources

VULNERABILITIES:
- sql-injection
- xss
- misconfiguration
- weak-authentication

ACCESS METHODS:
- backdoor
- persistence
- privilege-escalation
- lateral-movement`,
      mode: "ro",
    },
  },
  env: {
    "recon-complete": "false",
    "exploit-successful": "false",
    "access-maintained": "false",
    "findings-documented": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialRedTeamingMission: Mission = {
  slug: "adversarial-red-teaming",
  title: "Red teaming — think like the attacker",
  brief: "To defend, you must attack. Think like the attacker to find vulnerabilities.",
  welcome: "Welcome to the Red Teaming mission. To defend, you must attack. Use 'recon [target]' to gather intelligence, 'exploit [vulnerability]' to test defenses, 'maintain [access-method]' to simulate persistence, and 'document findings' to report vulnerabilities.",
  prompt: "redteam@hodlberg-security:/red-team$ ",
  goals: [
    { id: "recon", label: "Reconnaissance", hint: "recon web-application" },
    { id: "exploit", label: "Exploit vulnerabilities", hint: "exploit sql-injection" },
    { id: "maintain", label: "Maintain access", hint: "maintain backdoor" },
    { id: "document", label: "Document findings", hint: "document findings" },
  ],
  commands: {
    recon: ({ state, args }) => {
      const target = args[0]
      const validTargets = ["web-application", "api-endpoints", "network-infrastructure", "cloud-resources"]
      if (validTargets.includes(target)) {
        return {
          stdout: `✅ Reconnaissance complete: ${target}. Attack surface mapped. Services enumerated. Vulnerabilities identified.`,
          statePatch: { env: { "recon-complete": "true" } },
          goalMet: "recon",
        }
      }
      return { stdout: `Unknown target: ${target}. Available: ${validTargets.join(", ")}` }
    },
    exploit: ({ state, args }) => {
      const vulnerability = args[0]
      const validVulnerabilities = ["sql-injection", "xss", "misconfiguration", "weak-authentication"]
      if (validVulnerabilities.includes(vulnerability)) {
        if (state.env["recon-complete"] === "true") {
          return {
            stdout: `✅ Exploit successful: ${vulnerability}. Vulnerability confirmed. Impact assessed. Proof of concept demonstrated.`,
            statePatch: { env: { "exploit-successful": "true" } },
            goalMet: "exploit",
          }
        }
        return {
          stdout: "❌ Exploitation failed: Complete reconnaissance first.",
        }
      }
      return { stdout: `Unknown vulnerability: ${vulnerability}. Available: ${validVulnerabilities.join(", ")}` }
    },
    maintain: ({ state, args }) => {
      const access = args[0]
      const validAccess = ["backdoor", "persistence", "privilege-escalation", "lateral-movement"]
      if (validAccess.includes(access)) {
        if (state.env["exploit-successful"] === "true") {
          return {
            stdout: `✅ Access maintained: ${access}. Persistence mechanism deployed. Access verified. Evasion techniques tested.`,
            statePatch: { env: { "access-maintained": "true" } },
            goalMet: "maintain",
          }
        }
        return {
          stdout: "❌ Access maintenance failed: Exploit vulnerabilities first.",
        }
      }
      return { stdout: `Unknown access: ${access}. Available: ${validAccess.join(", ")}` }
    },
    document: ({ state, args }) => {
      if (args[0] === "findings") {
        if (state.env["access-maintained"] === "true") {
          return {
            stdout: "✅ Findings documented: Red team report complete. Vulnerabilities detailed. Remediation recommendations provided. Attack timeline reconstructed.",
            statePatch: { env: { "findings-documented": "true" } },
            goalMet: "document",
          }
        }
        return {
          stdout: "❌ Documentation failed: Maintain access first.",
        }
      }
      return { stdout: "Usage: document findings" }
    },
  },
  initialState,
  success: "Red teaming completed successfully. You performed reconnaissance, exploited vulnerabilities, maintained access, and documented findings. You now think like the attacker to defend better.",
}
