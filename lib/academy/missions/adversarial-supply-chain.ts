import type { Mission, MissionState } from "../missionEngine"

const initialState: MissionState = {
  cwd: "/supply-chain",
  fs: {
    "/supply-chain/README": {
      content: `Mission: Supply Chain Security — Trust No One
================================================

Your dependencies are attack vectors. Secure the supply chain.

OBJECTIVES:
1. Inventory dependencies
2. Verify package integrity
3. Implement SBOM
4. Verify supply chain security

COMMANDS:
- inventory [dependency-type]
- verify [integrity-check]
- implement [sbom]
- verify supply-chain

DEPENDENCY TYPES:
- npm-packages
- python-packages
- docker-images
- go-modules

INTEGRITY CHECKS:
- hash-verification
- signature-verification
- provenance-check
- vulnerability-scan

SBOM:
- cyclonedx
- spdx
- bom-generation
- dependency-tracking`,
      mode: "ro",
    },
  },
  env: {
    "inventory-complete": "false",
    "integrity-verified": "false",
    "sbom-implemented": "false",
    "supply-chain-verified": "false",
  },
  goalsMet: [],
  history: [],
}

export const adversarialSupplyChainMission: Mission = {
  slug: "adversarial-supply-chain",
  title: "Supply chain security — trust no one",
  brief: "Your dependencies are attack vectors. Secure the supply chain.",
  welcome: "Welcome to the Supply Chain Security mission. Your dependencies are attack vectors. Use 'inventory [dependency-type]' to catalog dependencies, 'verify [integrity-check]' to validate packages, 'implement [sbom]' to create software bill of materials, and 'verify supply-chain' to confirm security.",
  prompt: "defender@hodlberg-security:/supply-chain$ ",
  goals: [
    { id: "inventory", label: "Inventory dependencies", hint: "inventory npm-packages" },
    { id: "verify", label: "Verify package integrity", hint: "verify hash-verification" },
    { id: "implement", label: "Implement SBOM", hint: "implement cyclonedx" },
    { id: "verify", label: "Verify supply chain security", hint: "verify supply-chain" },
  ],
  commands: {
    inventory: ({ state, args }) => {
      const dep = args[0]
      const validDeps = ["npm-packages", "python-packages", "docker-images", "go-modules"]
      if (validDeps.includes(dep)) {
        return {
          stdout: `✅ Dependency inventory: ${dep}. All dependencies cataloged. Versions locked. Licenses reviewed.`,
          statePatch: { env: { "inventory-complete": "true" } },
          goalMet: "inventory",
        }
      }
      return { stdout: `Unknown dependency: ${dep}. Available: ${validDeps.join(", ")}` }
    },
    verify: ({ state, args }) => {
      const check = args[0]
      const validChecks = ["hash-verification", "signature-verification", "provenance-check", "vulnerability-scan"]
      if (validChecks.includes(check)) {
        if (state.env["inventory-complete"] === "true") {
          return {
            stdout: `✅ Integrity verified: ${check}. Package hashes validated. Signatures verified. No tampering detected.`,
            statePatch: { env: { "integrity-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Inventory dependencies first.",
        }
      }
      return { stdout: `Unknown check: ${check}. Available: ${validChecks.join(", ")}` }
    },
    implement: ({ state, args }) => {
      const sbom = args[0]
      const validSbom = ["cyclonedx", "spdx", "bom-generation", "dependency-tracking"]
      if (validSbom.includes(sbom)) {
        if (state.env["integrity-verified"] === "true") {
          return {
            stdout: `✅ SBOM implemented: ${sbom}. Software bill of materials generated. Dependencies tracked. Transparency achieved.`,
            statePatch: { env: { "sbom-implemented": "true" } },
            goalMet: "implement",
          }
        }
        return {
          stdout: "❌ Implementation failed: Verify integrity first.",
        }
      }
      return { stdout: `Unknown SBOM: ${sbom}. Available: ${validSbom.join(", ")}` }
    },
    verify: ({ state, args }) => {
      if (args[0] === "supply-chain") {
        if (state.env["sbom-implemented"] === "true") {
          return {
            stdout: "✅ SUPPLY CHAIN SECURE: Dependencies inventoried, integrity verified, SBOM implemented. Supply chain attack surface minimized.",
            statePatch: { env: { "supply-chain-verified": "true" } },
            goalMet: "verify",
          }
        }
        return {
          stdout: "❌ Verification failed: Implement SBOM first.",
        }
      }
      return { stdout: "Usage: verify supply-chain" }
    },
  },
  initialState,
  success: "Supply chain security achieved. You inventoried dependencies, verified integrity, implemented SBOM, and verified the supply chain. Trust no one — verify everything.",
}
