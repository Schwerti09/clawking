import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/ransomware",
  fs: {
    "/ransomware/README": {
      content: `Mission: Ransomware Defense — Prepare for the Worst
====================================================

Ransomware is inevitable. Prepare, detect, respond.

OBJECTIVES:
1. Implement backup strategy
2. Deploy detection
3. Create response plan
4. Verify ransomware defense

COMMANDS:
- implement [backup-type]
- deploy [detection]
- create [response-plan]
- verify ransomware-defense

BACKUP TYPES:
- offline-backups
- immutable-backups
- cloud-backups
- air-gapped-backups

DETECTION:
- behavior-analysis
- file-integrity-monitoring
- anomaly-detection
- honeypots

RESPONSE PLANS:
- isolation-procedures
- communication-plan
- recovery-procedures
- legal-response`,
      mode: "ro",
    },
  },
  env: {
    "backups-implemented": "false",
    "detection-deployed": "false",
    "response-created": "false",
    "ransomware-defense-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialRansomwareMission: Mission = {
  slug: "adversarial-ransomware",
  title: "Ransomware defense — prepare for the worst",
  brief: "Ransomware is inevitable. Prepare, detect, respond.",
  welcome: "Welcome to the Ransomware Defense mission. Ransomware is inevitable. Use 'implement [backup-type]' to create backups, 'deploy [detection]' to add monitoring, 'create [response-plan]' to prepare for attack, and 'verify ransomware-defense' to confirm readiness.",
  prompt: "defender@hodlberg-security:/ransomware$ ",
  goals: [
    { id: "implement", label: "Implement backup strategy", hint: "implement offline-backups" },
    { id: "deploy", label: "Deploy detection", hint: "deploy behavior-analysis" },
    { id: "create", label: "Create response plan", hint: "create isolation-procedures" },
    { id: "verify", label: "Verify ransomware defense", hint: "verify ransomware-defense" },
  ],
  commands: {
    implement: ({ state, args }) => {
      const backup = args[0]
      const validBackups = ["offline-backups", "immutable-backups", "cloud-backups", "air-gapped-backups"]
      if (validBackups.includes(backup)) {
        return {
          stdout: `✅ Backup implemented: ${backup}. Backup strategy active. Recovery tested. Data protected.`,
          statePatch: { env: { "backups-implemented": "true" } },
          goalMet: "implement",
        }
      }
      return { stdout: `Unknown backup: ${backup}. Available: ${validBackups.join(", ")}` }
    },
    deploy: ({ state, args }) => {
      const detection = args[0]
      const validDetections = ["behavior-analysis", "file-integrity-monitoring", "anomaly-detection", "honeypots"]
      if (validDetections.includes(detection)) {
        if (state.env["backups-implemented"] === "true") {
          return {
            stdout: `✅ Detection deployed: ${detection}. Ransomware detection active. Alerting configured. Early warning enabled.`,
            statePatch: { env: { "detection-deployed": "true" } },
            goalMet: "deploy",
          }
        }
        return {
          stdout: "❌ Deployment failed: Implement backups first.",
        }
      }
      return { stdout: `Unknown detection: ${detection}. Available: ${validDetections.join(", ")}` }
    },
    create: ({ state, args }) => {
      const plan = args[0]
      const validPlans = ["isolation-procedures", "communication-plan", "recovery-procedures", "legal-response"]
      if (validPlans.includes(plan)) {
        if (state.env["detection-deployed"] === "true") {
          return {
            stdout: `✅ Response plan created: ${plan}. Ransomware response documented. Playbook ready. Team trained.`,
            statePatch: { env: { "response-created": "true" } },
            goalMet: "create",
          }
        }
        return {
          stdout: "❌ Creation failed: Deploy detection first.",
        }
      }
      return { stdout: `Unknown plan: ${plan}. Available: ${validPlans.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "ransomware-defense") {
        if (state.env["response-created"] === "true") {
          return {
            stdout: "✅ RANSOMWARE DEFENSE VERIFIED: Backups implemented, detection deployed, response plan created. Ready for ransomware attack.",
            statePatch: { env: { "ransomware-defense-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Create response plan first.",
        }
      }
      return { stdout: "Usage: verify ransomware-defense" }
    },
  },
  initialState,
  success: "Ransomware defense achieved. You implemented backups, deployed detection, created response plan, and verified defense. When ransomware hits, you're ready.",
}
