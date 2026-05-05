import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/containment",
  fs: {
    "/containment/README": {
      content: `Mission: Incident Containment Playbooks
==========================================

The breach is live. Stop the bleeding. Contain the damage.

OBJECTIVES:
1. Identify the attack vector
2. Isolate affected systems
3. Block the attacker
4. Verify containment

COMMANDS:
- identify vector
- isolate [system]
- block [attacker]
- verify containment

ATTACK VECTORS:
- phishing
- malware
- vulnerability-exploit
- insider-threat

SYSTEMS:
- web-server
- database
- api-gateway
- auth-service

ATTACKER BLOCKING:
- ip-block
- account-suspension
- firewall-rule
- network-segmentation`,
      mode: "ro",
    },
  },
  env: {
    "vector-identified": "false",
    "systems-isolated": "false",
    "attacker-blocked": "false",
    "containment-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const incidentContainmentPlaybooksMission: Mission = {
  slug: "incident-containment-playbooks",
  title: "Containment playbooks — stop the bleeding",
  brief: "The breach is live. Isolate systems, block the attacker, stop the damage.",
  welcome: "Welcome to the Incident Containment Playbooks mission. The breach is live — you need to stop the bleeding. Use 'identify vector' to find the attack path, 'isolate [system]' to cut off affected systems, 'block [attacker]' to stop the attacker, and 'verify containment' to confirm the damage is contained. Speed is critical.",
  prompt: "responder@hodlberg-soc:/containment$ ",
  goals: [
    { id: "identify", label: "Identify the attack vector", hint: "identify phishing" },
    { id: "isolate", label: "Isolate affected systems", hint: "isolate web-server" },
    { id: "block", label: "Block the attacker", hint: "block ip-block" },
    { id: "verify", label: "Verify containment", hint: "verify containment" },
  ],
  commands: {
    identify: ({ state, args }) => {
      const vector = args[0]
      const validVectors = ["phishing", "malware", "vulnerability-exploit", "insider-threat"]
      if (validVectors.includes(vector)) {
        return {
          stdout: `✅ Attack vector identified: ${vector}. The attacker used this vector to gain access.`,
          statePatch: { env: { "vector-identified": "true" } },
          goalMet: "identify",
        }
      }
      return { stdout: `Unknown vector: ${vector}. Available: ${validVectors.join(", ")}` }
    },
    isolate: ({ state, args }) => {
      const system = args[0]
      const validSystems = ["web-server", "database", "api-gateway", "auth-service"]
      if (validSystems.includes(system)) {
        return {
          stdout: `✅ System isolated: ${system}. Network segmentation applied. Traffic blocked.`,
          statePatch: { env: { "systems-isolated": "true" } },
          goalMet: "isolate",
        }
      }
      return { stdout: `Unknown system: ${system}. Available: ${validSystems.join(", ")}` }
    },
    block: ({ state, args }) => {
      const blocking = args[0]
      const validBlocking = ["ip-block", "account-suspension", "firewall-rule", "network-segmentation"]
      if (validBlocking.includes(blocking)) {
        if (state.env["vector-identified"] === "true" && state.env["systems-isolated"] === "true") {
          return {
            stdout: `✅ Attacker blocked: ${blocking}. The attacker can no longer access the systems.`,
            statePatch: { env: { "attacker-blocked": "true" } },
            goalMet: "block",
          }
        }
        return {
          stdout: "❌ Blocking failed: Identify vector and isolate systems first.",
        }
      }
      return { stdout: `Unknown blocking method: ${blocking}. Available: ${validBlocking.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "containment") {
        if (state.env["attacker-blocked"] === "true") {
          return {
            stdout: "✅ Containment verified: No further attacker activity detected. Systems isolated. Damage contained.",
            statePatch: { env: { "containment-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Containment verification failed: Attacker not blocked. Complete the previous steps first.",
        }
      }
      return { stdout: "Usage: verify containment" }
    },
  },
  initialState,
  success: "Incident contained successfully. You identified the attack vector, isolated affected systems, blocked the attacker, and verified containment. The bleeding has stopped. Now you can focus on recovery.",
}
