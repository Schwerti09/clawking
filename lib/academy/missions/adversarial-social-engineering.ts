import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/social-engineering",
  fs: {
    "/social-engineering/README": {
      content: `Mission: Social Engineering Defense — Humans Are the Weakest Link
====================================================================

The most sophisticated attack targets humans. Defend against social engineering.

OBJECTIVES:
1. Identify phishing vectors
2. Implement email security
3. Train the team
4. Verify defense

COMMANDS:
- identify [vector]
- implement [security-control]
- train [audience]
- verify defense

VECTORS:
- email-phishing
- smishing
- vishing
- business-email-compromise

SECURITY CONTROLS:
- spf-dkim-dmarc
- email-filtering
- mfa-enforcement
- url-scanning

AUDIENCES:
- employees
- executives
- developers
- support`,
      mode: "ro",
    },
  },
  env: {
    "vectors-identified": "false",
    "controls-implemented": "false",
    "team-trained": "false",
    "defense-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialSocialEngineeringMission: Mission = {
  slug: "adversarial-social-engineering",
  title: "Social engineering defense — humans are the weakest link",
  brief: "The most sophisticated attack targets humans. Defend against social engineering.",
  welcome: "Welcome to the Social Engineering Defense mission. The most sophisticated attack targets humans. Use 'identify [vector]' to recognize attack vectors, 'implement [security-control]' to add protections, 'train [audience]' to educate the team, and 'verify defense' to confirm readiness.",
  prompt: "defender@hodlberg-security:/social-engineering$ ",
  goals: [
    { id: "identify", label: "Identify phishing vectors", hint: "identify email-phishing" },
    { id: "implement", label: "Implement email security", hint: "implement spf-dkim-dmarc" },
    { id: "train", label: "Train the team", hint: "train employees" },
    { id: "verify", label: "Verify defense", hint: "verify defense" },
  ],
  commands: {
    identify: ({ state, args }) => {
      const vector = args[0]
      const validVectors = ["email-phishing", "smishing", "vishing", "business-email-compromise"]
      if (validVectors.includes(vector)) {
        return {
          stdout: `✅ Vector identified: ${vector}. Attack patterns recognized. Indicators documented. Detection rules created.`,
          statePatch: { env: { "vectors-identified": "true" } },
          goalMet: "identify",
        }
      }
      return { stdout: `Unknown vector: ${vector}. Available: ${validVectors.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const control = args[0]
      const validControls = ["spf-dkim-dmarc", "email-filtering", "mfa-enforcement", "url-scanning"]
      if (validControls.includes(control)) {
        if (state.env["vectors-identified"] === "true") {
          return {
            stdout: `✅ Control implemented: ${control}. Email security configured. Phishing filters active. Spoofing blocked.`,
            statePatch: { env: { "controls-implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Identify vectors first.",
        }
      }
      return { stdout: `Unknown control: ${control}. Available: ${validControls.join(", ")}` }
    },
    train: ({ state, args }) => {
      const audience = args[0]
      const validAudiences = ["employees", "executives", "developers", "support"]
      if (validAudiences.includes(audience)) {
        if (state.env["controls-implemented"] === "true") {
          return {
            stdout: `✅ Team trained: ${audience}. Security awareness completed. Phishing simulation conducted. Reporting procedures established.`,
            statePatch: { env: { "team-trained": "true" } },
            goalMet: "train",
          }
        }
        return {
          stdout: "❌ Training failed: Implement controls first.",
        }
      }
      return { stdout: `Unknown audience: ${audience}. Available: ${validAudiences.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "defense") {
        if (state.env["team-trained"] === "true") {
          return {
            stdout: "✅ DEFENSE VERIFIED: Vectors identified, controls implemented, team trained. Social engineering defense active. Humans are no longer the weakest link.",
            statePatch: { env: { "defense-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Train the team first.",
        }
      }
      return { stdout: "Usage: verify defense" }
    },
  },
  initialState,
  success: "Social engineering defense achieved. You identified vectors, implemented controls, trained the team, and verified defense. Humans are no longer the weakest link.",
}
