import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/hodlberg",
  fs: {
    "/hodlberg/README": {
      content: `Mission: Hodlberg Seed Round Breach
=========================================

Act I — The Seed Round Breach. Twelve acts. One company. You decide if they survive.

OBJECTIVES:
1. Investigate the breach
2. Identify the attack vector
3. Contain the breach
4. Notify stakeholders

COMMANDS:
- investigate logs
- identify vector
- contain breach
- notify stakeholders

CONTEXT:
Hodlberg AG just closed their seed round. $2M in the bank. But someone just accessed the investor portal with admin credentials. Is this a breach? Or a false alarm? Your decision determines the company's fate.`,
      mode: "ro",
    },
  },
  env: {
    "breach-investigated": "false",
    "vector-identified": "false",
    "breach-contained": "false",
    "stakeholders-notified": "false",
  },
  goalsMet: [],
  history: [],
}

export const hodlbergSeedRoundBreachMission: Mission = {
  slug: "hodlberg-seed-round-breach",
  title: "The Seed Round Breach — Act I",
  brief: "Hodlberg AG closed seed round. But someone accessed the investor portal. Breach or false alarm? You decide.",
  welcome: "Welcome to the Hodlberg Seed Round Breach mission. Hodlberg AG just closed their seed round — $2M in the bank. But someone just accessed the investor portal with admin credentials. Is this a breach? Or a false alarm? Your decision determines the company's fate. Use 'investigate logs' to see what happened, 'identify vector' to find the attack path, 'contain breach' to stop the damage, and 'notify stakeholders' to handle the fallout.",
  prompt: "cto@hodlberg-ag:/hodlberg$ ",
  goals: [
    { id: "investigate", label: "Investigate the breach", hint: "investigate logs" },
    { id: "identify", label: "Identify the attack vector", hint: "identify vector" },
    { id: "contain", label: "Contain the breach", hint: "contain breach" },
    { id: "notify", label: "Notify stakeholders", hint: "notify stakeholders" },
  ],
  commands: {
    investigate: ({ state, args }) => {
      if (args[0] === "logs") {
        return {
          stdout: `Investigation findings:\n\n[2026-05-05 14:32:15] SUCCESS: login to investor portal (user: admin, ip: 203.0.113.42)\n[2026-05-05 14:32:18] DOWNLOAD: investor_deck.pdf (user: admin)\n[2026-05-05 14:32:22] DOWNLOAD: financial_projections.xlsx (user: admin)\n[2026-05-05 14:32:25] ATTEMPT: export investor database (user: admin) — BLOCKED by MFA\n[2026-05-05 14:32:30] LOGOUT: user: admin\n\nIP 203.0.113.42 is not in the office VPN range. This is external access. The admin credentials were compromised.`,
        }
      }
      return { stdout: "Usage: investigate logs" }
    },
    identify: ({ state, args }) => {
      if (args[0] === "vector") {
        return {
          stdout: "✅ Attack vector identified: Credential theft. The admin credentials were likely phished or stolen. The attacker used them to access the investor portal from an external IP. MFA blocked the database export, but sensitive documents were already downloaded.",
          statePatch: { env: { "vector-identified": "true" } },
          goalMet: "identify",
        }
      }
      return { stdout: "Usage: identify vector" }
    },
    contain: ({ state, args }) => {
      if (args[0] === "breach") {
        if (state.env["vector-identified"] === "true") {
          return {
            stdout: "✅ Breach contained: Admin credentials revoked, investor portal locked, all sessions invalidated. MFA requirements enforced for all admin accounts. Incident response team activated.",
            statePatch: { env: { "breach-contained": "true" } },
            goalMet: "contain",
          }
        }
        return {
          stdout: "❌ Containment failed: Attack vector not identified. Run 'identify vector' first.",
        }
      }
      return { stdout: "Usage: contain breach" }
    },
    notify: ({ state, args }) => {
      if (args[0] === "stakeholders") {
        if (state.env["breach-contained"] === "true") {
          return {
            stdout: "✅ Stakeholders notified: Investors informed of potential data exposure. Legal counsel engaged. Data protection authority notified within 72-hour GDPR window. Crisis communication plan activated. Hodlberg AG survives — but trust is damaged.",
            statePatch: { env: { "stakeholders-notified": "true" } },
            goalMet: "notify",
          }
        }
        return {
          stdout: "❌ Notification failed: Breach not contained. Run 'contain breach' first.",
        }
      }
      return { stdout: "Usage: notify stakeholders" }
    },
  },
  initialState,
  success: "The Seed Round Breach contained. You identified the attack vector, contained the damage, and notified stakeholders. Hodlberg AG survives — but trust is damaged. The next act will test your ability to rebuild.",
}
