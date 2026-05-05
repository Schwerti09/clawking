// Mission M-028 — "GitHub Actions Hardening: secure CI/CD pipeline"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const WORKFLOW_INITIAL = `# .github/workflows/deploy.yml — insecure workflow
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          echo "Deploying..."
          # No secrets validation
          # No branch protection
          # No required reviewers
`

const README = `Mission M-028 — GitHub Actions Hardening
==========================================

BRIEF
  Your CI/CD pipeline has no security controls. Anyone can deploy to
  production, secrets are exposed in logs, and there's no branch
  protection. Harden the workflow with required reviewers, secrets
  validation, and environment protection.

OBJECTIVES
  1. Inspect the workflow
  2. Add required reviewers
  3. Add environment protection
  4. Add secrets validation
  5. Add branch protection rules
  6. Test the hardened workflow

HINTS
  cat .github/workflows/deploy.yml
  patch reviewers
  patch environment
  patch secrets
  patch branch-protection
  test workflow
`

const initialState: MissionState = {
  cwd: "/app/.github/workflows",
  fs: {
    "/app/.github/workflows/README": { content: README, mode: "ro" },
    "/app/.github/workflows/deploy.yml": { content: WORKFLOW_INITIAL, mode: "rw" },
  },
  env: { INSPECTED: "no", REVIEWERS: "no", ENVIRONMENT: "no", SECRETS: "no", BRANCH_PROTECTION: "no", TESTED: "no" },
  goalsMet: [],
  history: [],
}

export const githubActionsHardeningMission: Mission = {
  slug: "github-actions-hardening",
  title: "GitHub Actions Hardening: secure CI/CD pipeline",
  brief: "Your CI/CD pipeline has no security controls. Harden it: add required reviewers, environment protection, secrets validation, branch protection rules.",
  prompt: "defender@hodlberg-cicd:/app/.github/workflows$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-028 — GITHUB ACTIONS") + bold(cyan("          │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "CI/CD pipeline · GitHub Actions · security hardening\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "inspect", label: "Inspect the workflow", hint: "cat .github/workflows/deploy.yml" },
    { id: "reviewers", label: "Add required reviewers", hint: "patch reviewers" },
    { id: "environment", label: "Add environment protection", hint: "patch environment" },
    { id: "secrets", label: "Add secrets validation", hint: "patch secrets" },
    { id: "branch", label: "Add branch protection rules", hint: "patch branch-protection" },
    { id: "test", label: "Test the hardened workflow", hint: "test workflow" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — PIPELINE SECURED   │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+270") + dim("   GitHub Actions: required reviewers, environment protection, secrets validation, branch protection configured.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("patch reviewers | environment | secrets | branch-protection") + "\r\n" +
      "  " + cyan("test workflow") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app/.github/workflows") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/app/.github/workflows/README"] : undefined) ?? (args[0] === "deploy.yml" ? state.fs["/app/.github/workflows/deploy.yml"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/app/.github/workflows/deploy.yml" ? "inspect" : undefined }
    },
    patch: ({ state, args }) => {
      const p = "/app/.github/workflows/deploy.yml"
      let c = state.fs[p]?.content ?? ""
      if (args[0] === "reviewers") {
        if (/required-reviewers/m.test(c)) return { stdout: yellow("already patched"), goalMet: "reviewers" }
        c = c.replace("jobs:", "jobs:\n  deploy:\n    environment:\n      name: production\n      url: https://api.hodlberg.ag\n    runs-on: ubuntu-latest\n    steps:")
        return { stdout: green("Added required reviewers (via environment protection)"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, REVIEWERS: "yes" } }, goalMet: "reviewers" }
      }
      if (args[0] === "environment") {
        if (/environment:/m.test(c)) return { stdout: yellow("already patched"), goalMet: "environment" }
        c = c.replace("jobs:", "jobs:\n  deploy:\n    environment:\n      name: production\n      url: https://api.hodlberg.ag\n    runs-on: ubuntu-latest\n    steps:")
        return { stdout: green("Added environment protection"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, ENVIRONMENT: "yes" } }, goalMet: "environment" }
      }
      if (args[0] === "secrets") {
        if (/ACTIONS_STEP_DEBUG/m.test(c)) return { stdout: yellow("already patched"), goalMet: "secrets" }
        c = c.replace("runs-on: ubuntu-latest", "runs-on: ubuntu-latest\n    env:\n      ACTIONS_STEP_DEBUG: false")
        return { stdout: green("Added secrets validation (debug disabled)"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, SECRETS: "yes" } }, goalMet: "secrets" }
      }
      if (args[0] === "branch-protection") {
        if (/branch-protection/m.test(c)) return { stdout: yellow("already patched"), goalMet: "branch" }
        c = c.replace("# No branch protection", "# Branch protection: require PR approval, status checks, no direct push")
        return { stdout: green("Added branch protection rules (documentation)"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, BRANCH_PROTECTION: "yes" } }, goalMet: "branch" }
      }
      return { stderr: "patch: unknown. Try 'patch reviewers' / 'patch environment' / 'patch secrets' / 'patch branch-protection'" }
    },
    test: ({ state, args }) => {
      if (args[0] === "workflow") {
        if (state.env.ENVIRONMENT !== "yes" || state.env.SECRETS !== "yes") return { stderr: "test: error — workflow not properly hardened" }
        return {
          stdout: green("Workflow validation:\n  ✓ Environment protection: production\n  ✓ Required reviewers: configured\n  ✓ Secrets validation: debug disabled\n  ✓ Branch protection: documented\n  ✓ Ready for deployment"),
          statePatch: { env: { ...state.env, TESTED: "yes" } },
          goalMet: "test",
        }
      }
      return { stderr: "test: command not supported. Try 'test workflow'" }
    },
    hint: ({ state }) => {
      const r = githubActionsHardeningMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + githubActionsHardeningMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
