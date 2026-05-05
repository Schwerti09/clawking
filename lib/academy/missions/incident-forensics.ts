import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/forensics",
  fs: {
    "/forensics/README": {
      content: `Mission: Incident Forensics — Don't destroy evidence
====================================================

The breach is contained. Now investigate without destroying evidence.

OBJECTIVES:
1. Collect evidence safely
2. Preserve chain of custody
3. Analyze the attack timeline
4. Document findings

COMMANDS:
- collect [evidence-type]
- preserve [evidence]
- analyze timeline
- document findings

EVIDENCE TYPES:
- logs
- memory-dump
- network-traffic
- disk-image

PRESERVATION:
- hash-verification
- write-protection
- timestamp-recording
- chain-of-custody`,
      mode: "ro",
    },
  },
  env: {
    "evidence-collected": "false",
    "evidence-preserved": "false",
    "timeline-analyzed": "false",
    "findings-documented": "false",
  },
  goalsMet: [],
  history: [],
}

export const incidentForensicsMission: Mission = {
  slug: "incident-forensics",
  title: "Forensics without destroying evidence",
  brief: "The breach is contained. Investigate without destroying evidence. Chain of custody matters.",
  welcome: "Welcome to the Incident Forensics mission. The breach is contained — now investigate without destroying evidence. Use 'collect [evidence-type]' to gather data, 'preserve [evidence]' to maintain chain of custody, 'analyze timeline' to reconstruct the attack, and 'document findings' to create the forensic report. Remember: don't destroy evidence.",
  prompt: "forensic@hodlberg-soc:/forensics$ ",
  goals: [
    { id: "collect", label: "Collect evidence safely", hint: "collect logs" },
    { id: "preserve", label: "Preserve chain of custody", hint: "preserve hash-verification" },
    { id: "analyze", label: "Analyze the attack timeline", hint: "analyze timeline" },
    { id: "document", label: "Document findings", hint: "document findings" },
  ],
  commands: {
    collect: ({ state, args }) => {
      const evidence = args[0]
      const validEvidence = ["logs", "memory-dump", "network-traffic", "disk-image"]
      if (validEvidence.includes(evidence)) {
        return {
          stdout: `✅ Evidence collected: ${evidence}. Hash generated: ${Math.random().toString(36).substring(7)}. Write protection enabled.`,
          statePatch: { env: { "evidence-collected": "true" } },
          goalMet: "collect",
        }
      }
      return { stdout: `Unknown evidence type: ${evidence}. Available: ${validEvidence.join(", ")}` }
    },
    preserve: ({ state, args }) => {
      const preservation = args[0]
      const validPreservation = ["hash-verification", "write-protection", "timestamp-recording", "chain-of-custody"]
      if (validPreservation.includes(preservation)) {
        if (state.env["evidence-collected"] === "true") {
          return {
            stdout: `✅ Evidence preserved: ${preservation}. Chain of custody maintained. Evidence integrity verified.`,
            statePatch: { env: { "evidence-preserved": "true" } },
            goalMet: "preserve",
          }
        }
        return {
          stdout: "❌ Preservation failed: Collect evidence first.",
        }
      }
      return { stdout: `Unknown preservation method: ${preservation}. Available: ${validPreservation.join(", ")}` }
    },
    analyze: ({ state, args }) => {
      if (args[0] === "timeline") {
        if (state.env["evidence-preserved"] === "true") {
          return {
            stdout: "✅ Timeline analyzed:\n\n[2026-05-05 14:30:00] Initial compromise via phishing\n[2026-05-05 14:32:15] Lateral movement to web server\n[2026-05-05 14:35:00] Data exfiltration attempt\n[2026-05-05 14:38:00] Containment activated\n\nAttack timeline reconstructed from preserved evidence.",
            statePatch: { env: { "timeline-analyzed": "true" } },
            goalMet: "analyze",
          }
        }
        return {
          stdout: "❌ Timeline analysis failed: Preserve evidence first.",
        }
      }
      return { stdout: "Usage: analyze timeline" }
    },
    document: ({ state, args }) => {
      if (args[0] === "findings") {
        if (state.env["timeline-analyzed"] === "true") {
          return {
            stdout: "✅ Findings documented: Forensic report created. Chain of custody documented. Evidence catalog complete. Ready for legal review.",
            statePatch: { env: { "findings-documented": "true" } },
            goalMet: "document",
          }
        }
        return {
          stdout: "❌ Documentation failed: Analyze timeline first.",
        }
      }
      return { stdout: "Usage: document findings" }
    },
  },
  initialState,
  success: "Forensic investigation completed successfully. You collected evidence safely, preserved chain of custody, analyzed the attack timeline, and documented findings. The evidence is preserved for legal review. No evidence was destroyed.",
}
