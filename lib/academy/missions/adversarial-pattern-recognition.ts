import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/defense",
  fs: {
    "/defense/README": {
      content: `Mission: Adversarial Pattern Recognition
===========================================

Recognize attack patterns under fire. The attacker is live — can you spot the patterns?

OBJECTIVES:
1. Inspect the attack stream
2. Identify the pattern
3. Deploy the countermeasure
4. Verify the defense

COMMANDS:
- inspect stream
- identify [pattern-name]
- deploy [countermeasure]
- verify defense

PATTERNS:
- brute-force
- injection
- supply-chain
- social-engineering

COUNTERMEASURES:
- rate-limit
- input-sanitization
- dependency-pinning
- mfa-enforcement`,
      mode: "ro",
    },
  },
  env: {
    "attack-stream": "active",
    "pattern-identified": "false",
    "countermeasure-deployed": "false",
    "defense-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialPatternRecognitionMission: Mission = {
  slug: "adversarial-pattern-recognition",
  title: "Recognize attack patterns under fire",
  brief: "The attacker is live. Spot the pattern, deploy the countermeasure, level up.",
  welcome: "Welcome to the Adversarial Pattern Recognition mission. The attacker is live — can you spot the patterns? Use 'inspect stream' to see the attack, 'identify [pattern-name]' to recognize the pattern, 'deploy [countermeasure]' to defend, and 'verify defense' to confirm.",
  prompt: "defender@hodlberg-defense:/defense$ ",
  goals: [
    { id: "inspect", label: "Inspect the attack stream", hint: "inspect stream" },
    { id: "identify", label: "Identify the attack pattern", hint: "identify brute-force" },
    { id: "deploy", label: "Deploy the countermeasure", hint: "deploy rate-limit" },
    { id: "verify", label: "Verify the defense", hint: "verify defense" },
  ],
  commands: {
    inspect: ({ state, args }) => {
      if (args[0] === "stream") {
        return {
          stdout: `Attack stream detected:\n\n[2026-05-05 03:12:45] POST /api/auth/login - 401 (user: admin)\n[2026-05-05 03:12:46] POST /api/auth/login - 401 (user: admin)\n[2026-05-05 03:12:47] POST /api/auth/login - 401 (user: admin)\n[2026-05-05 03:12:48] POST /api/auth/login - 401 (user: admin)\n[2026-05-05 03:12:49] POST /api/auth/login - 401 (user: admin)\n\nPattern: Repeated failed login attempts from same IP. This looks like a brute-force attack.`,
        }
      }
      return { stdout: "Usage: inspect stream" }
    },
    identify: ({ state, args }) => {
      const pattern = args[0]
      const validPatterns = ["brute-force", "injection", "supply-chain", "social-engineering"]
      if (validPatterns.includes(pattern)) {
        return {
          stdout: `✅ Pattern identified: ${pattern}. This matches the attack signature.`,
          statePatch: { env: { "pattern-identified": "true" } },
          goalMet: "identify",
        }
      }
      return { stdout: `Unknown pattern: ${pattern}. Available: ${validPatterns.join(", ")}` }
    },
    deploy: ({ state, args }) => {
      const countermeasure = args[0]
      const validCountermeasures = ["rate-limit", "input-sanitization", "dependency-pinning", "mfa-enforcement"]
      if (validCountermeasures.includes(countermeasure)) {
        return {
          stdout: `✅ Countermeasure '${countermeasure}' deployed. Defense active.`,
          statePatch: { env: { "countermeasure-deployed": "true" } },
          goalMet: "deploy",
        }
      }
      return { stdout: `Unknown countermeasure: ${countermeasure}. Available: ${validCountermeasures.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "defense") {
        if (state.env["pattern-identified"] === "true" && state.env["countermeasure-deployed"] === "true") {
          return {
            stdout: "✅ DEFENSE VERIFIED: Attack pattern recognized and countermeasure deployed. The attacker is blocked.",
            statePatch: { env: { "defense-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ DEFENSE FAILED: Pattern not identified or countermeasure not deployed. Complete the previous steps first.",
        }
      }
      return { stdout: "Usage: verify defense" }
    },
  },
  initialState,
  success: "Attack pattern recognized and countermeasure deployed. You've leveled up your adversarial defense skills. The attacker is blocked.",
}
