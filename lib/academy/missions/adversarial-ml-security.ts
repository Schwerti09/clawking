import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/ml-security",
  fs: {
    "/ml-security/README": {
      content: `Mission: ML Security — Defend the Model
==========================================

ML models are attack surfaces. Defend against adversarial ML.

OBJECTIVES:
1. Assess model vulnerabilities
2. Implement data security
3. Deploy model monitoring
4. Verify ML security

COMMANDS:
- assess [vulnerability]
- implement [data-security]
- deploy [monitoring]
- verify ml-security

VULNERABILITIES:
- data-poisoning
- model-inversion
- adversarial-examples
- model-extraction

DATA SECURITY:
- data-validation
- differential-privacy
- federated-learning
- encryption

MONITORING:
- drift-detection
- anomaly-detection
- performance-monitoring
- input-validation`,
      mode: "ro",
    },
  },
  env: {
    "vulnerabilities-assessed": "false",
    "data-security-implemented": "false",
    "monitoring-deployed": "false",
    "ml-security-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialMlSecurityMission: Mission = {
  slug: "adversarial-ml-security",
  title: "ML security — defend the model",
  brief: "ML models are attack surfaces. Defend against adversarial ML.",
  welcome: "Welcome to the ML Security mission. ML models are attack surfaces. Use 'assess [vulnerability]' to identify risks, 'implement [data-security]' to protect data, 'deploy [monitoring]' to watch the model, and 'verify ml-security' to confirm defense.",
  prompt: "defender@hodlberg-security:/ml-security$ ",
  goals: [
    { id: "assess", label: "Assess model vulnerabilities", hint: "assess data-poisoning" },
    { id: "implement", label: "Implement data security", hint: "implement data-validation" },
    { id: "deploy", label: "Deploy model monitoring", hint: "deploy drift-detection" },
    { id: "verify", label: "Verify ML security", hint: "verify ml-security" },
  ],
  commands: {
    assess: ({ state, args }) => {
      const vulnerability = args[0]
      const validVulnerabilities = ["data-poisoning", "model-inversion", "adversarial-examples", "model-extraction"]
      if (validVulnerabilities.includes(vulnerability)) {
        return {
          stdout: `✅ Vulnerability assessed: ${vulnerability}. ML attack surface analyzed. Risk vectors identified. Impact evaluated.`,
          statePatch: { env: { "vulnerabilities-assessed": "true" } },
          goalMet: "assess",
        }
      }
      return { stdout: `Unknown vulnerability: ${vulnerability}. Available: ${validVulnerabilities.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const security = args[0]
      const validSecurity = ["data-validation", "differential-privacy", "federated-learning", "encryption"]
      if (validSecurity.includes(security)) {
        if (state.env["vulnerabilities-assessed"] === "true") {
          return {
            stdout: `✅ Data security implemented: ${security}. ML data protected. Privacy preserved. Training secured.`,
            statePatch: { env: { "data-security-implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Assess vulnerabilities first.",
        }
      }
      return { stdout: `Unknown security: ${security}. Available: ${validSecurity.join(", ")}` }
    },
    deploy: ({ state, args }) => {
      const monitoring = args[0]
      const validMonitoring = ["drift-detection", "anomaly-detection", "performance-monitoring", "input-validation"]
      if (validMonitoring.includes(monitoring)) {
        if (state.env["data-security-implemented"] === "true") {
          return {
            stdout: `✅ Monitoring deployed: ${monitoring}. ML model monitored. Drift detected. Anomalies flagged.`,
            statePatch: { env: { "monitoring-deployed": "true" } },
            goalMet: "deploy",
          }
        }
        return {
          stdout: "❌ Deployment failed: Implement data security first.",
        }
      }
      return { stdout: `Unknown monitoring: ${monitoring}. Available: ${validMonitoring.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "ml-security") {
        if (state.env["monitoring-deployed"] === "true") {
          return {
            stdout: "✅ ML SECURITY VERIFIED: Vulnerabilities assessed, data security implemented, monitoring deployed. ML model defended against adversarial attacks.",
            statePatch: { env: { "ml-security-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Deploy monitoring first.",
        }
      }
      return { stdout: "Usage: verify ml-security" }
    },
  },
  initialState,
  success: "ML security achieved. You assessed vulnerabilities, implemented data security, deployed monitoring, and verified defense. The ML model is now defended against adversarial attacks.",
}
