import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/evidence",
  fs: {
    "/evidence/README": {
      content: `Mission: Evidence Collection — Audit Ready
===========================================

Compliance is useless without evidence. Collect and organize.

OBJECTIVES:
1. Identify evidence requirements
2. Collect evidence artifacts
3. Organize evidence repository
4. Verify audit readiness

COMMANDS:
- identify [evidence-type]
- collect [artifact]
- organize [repository]
- verify audit-ready

EVIDENCE TYPES:
- policy-documents
- technical-controls
- monitoring-logs
- training-records

ARTIFACTS:
- access-logs
- configuration-backups
- penetration-test-reports
- risk-assessments

REPOSITORY:
- evidence-folder
- index-mapping
- version-control
- access-controls`,
      mode: "ro",
    },
  },
  env: {
    "evidence-identified": "false",
    "evidence-collected": "false",
    "evidence-organized": "false",
    "audit-ready-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const complianceEvidenceCollectionMission: Mission = {
  slug: "compliance-evidence-collection",
  title: "Evidence collection — audit ready",
  brief: "Compliance is useless without evidence. Collect and organize for audit.",
  welcome: "Welcome to the Evidence Collection mission. Compliance is useless without evidence. Use 'identify [evidence-type]' to determine requirements, 'collect [artifact]' to gather evidence, 'organize [repository]' to structure the repository, and 'verify audit-ready' to confirm readiness.",
  prompt: "compliance@hodlberg-compliance:/evidence$ ",
  goals: [
    { id: "identify", label: "Identify evidence requirements", hint: "identify policy-documents" },
    { id: "collect", label: "Collect evidence artifacts", hint: "collect access-logs" },
    { id: "organize", label: "Organize evidence repository", hint: "organize evidence-folder" },
    { id: "verify", label: "Verify audit readiness", hint: "verify audit-ready" },
  ],
  commands: {
    identify: ({ state, args }) => {
      const type = args[0]
      const validTypes = ["policy-documents", "technical-controls", "monitoring-logs", "training-records"]
      if (validTypes.includes(type)) {
        return {
          stdout: `✅ Evidence identified: ${type}. Requirements mapped. Artifacts listed. Collection plan ready.`,
          statePatch: { env: { "evidence-identified": "true" } },
          goalMet: "identify",
        }
      }
      return { stdout: `Unknown type: ${type}. Available: ${validTypes.join(", ")}` }
    },
    collect: ({ state, args }) => {
      const artifact = args[0]
      const validArtifacts = ["access-logs", "configuration-backups", "penetration-test-reports", "risk-assessments"]
      if (validArtifacts.includes(artifact)) {
        if (state.env["evidence-identified"] === "true") {
          return {
            stdout: `✅ Evidence collected: ${artifact}. Artifact gathered. Metadata recorded. Hash verified.`,
            statePatch: { env: { "evidence-collected": "true" } },
            goalMet: "collect",
          }
        }
        return {
          stdout: "❌ Collection failed: Identify evidence requirements first.",
        }
      }
      return { stdout: `Unknown artifact: ${artifact}. Available: ${validArtifacts.join(", ")}` }
    },
    organize: ({ state, args }) => {
      const repository = args[0]
      const validRepositories = ["evidence-folder", "index-mapping", "version-control", "access-controls"]
      if (validRepositories.includes(repository)) {
        if (state.env["evidence-collected"] === "true") {
          return {
            stdout: `✅ Evidence organized: ${repository}. Repository structured. Index created. Access controls applied.`,
            statePatch: { env: { "evidence-organized": "true" } },
            goalMet: "organize",
          }
        }
        return {
          stdout: "❌ Organization failed: Collect evidence first.",
        }
      }
      return { stdout: `Unknown repository: ${repository}. Available: ${validRepositories.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "audit-ready") {
        if (state.env["evidence-organized"] === "true") {
          return {
            stdout: "✅ AUDIT READY: Evidence collected, organized, and indexed. Repository accessible. Audit trail complete. Ready for regulatory review.",
            statePatch: { env: { "audit-ready-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Organize evidence first.",
        }
      }
      return { stdout: "Usage: verify audit-ready" }
    },
  },
  initialState,
  success: "Evidence collection completed successfully. You identified requirements, collected artifacts, organized the repository, and verified audit readiness. Compliance is now backed by evidence.",
}
