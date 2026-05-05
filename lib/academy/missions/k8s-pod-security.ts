// Mission M-021 — "Kubernetes Pod Security: restrict capabilities & drop privileges"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const POD_MANIFEST_INITIAL = `# /app/deployment.yaml — default pod with privileged containers
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      containers:
      - name: api
        image: clawguru/api:latest
        ports:
        - containerPort: 3000
        securityContext:
          privileged: true
          runAsUser: 0
          capabilities:
            add:
            - NET_ADMIN
            - SYS_ADMIN
`

const README = `Mission M-021 — Kubernetes Pod Security
==========================================

BRIEF
  Your pod runs as root with NET_ADMIN and SYS_ADMIN capabilities. A
  single container escape gives full node compromise. Restrict pod
  security before production deployment.

OBJECTIVES
  1. Inspect the deployment manifest
  2. Remove privileged flag
  3. Drop all capabilities
  4. Set runAsNonRoot to true
  5. Add readOnlyRootFilesystem
  6. Add seccomp profile
  7. Validate with kubectl apply

HINTS
  cat deployment.yaml
  patch privileged
  patch capabilities
  patch nonroot
  patch readonly
  patch seccomp
  kubectl apply -f deployment.yaml
  kubectl get pods
`

const initialState: MissionState = {
  cwd: "/app",
  fs: {
    "/app/README": { content: README, mode: "ro" },
    "/app/deployment.yaml": { content: POD_MANIFEST_INITIAL, mode: "rw" },
  },
  env: { PRIVILEGED: "yes", CAPABILITIES: "no", NONROOT: "no", READONLY: "no", SECCOMP: "no", APPLIED: "no" },
  goalsMet: [],
  history: [],
}

export const k8sPodSecurityMission: Mission = {
  slug: "k8s-pod-security",
  title: "Kubernetes Pod Security: restrict capabilities & drop privileges",
  brief: "Your pod runs as root with NET_ADMIN/SYS_ADMIN. Harden it: drop privileged, remove capabilities, runAsNonRoot, readOnlyRootFilesystem, seccomp profile.",
  prompt: "defender@hodlberg-k8s:/app$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-021 — K8S POD SECURITY") + bold(cyan("            │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "production namespace · api-server deployment · 3 replicas\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "inspect", label: "Inspect the deployment manifest", hint: "cat deployment.yaml" },
    { id: "privileged", label: "Remove privileged flag", hint: "patch privileged" },
    { id: "capabilities", label: "Drop all capabilities", hint: "patch capabilities" },
    { id: "nonroot", label: "Set runAsNonRoot to true", hint: "patch nonroot" },
    { id: "readonly", label: "Add readOnlyRootFilesystem", hint: "patch readonly" },
    { id: "seccomp", label: "Add seccomp profile", hint: "patch seccomp" },
    { id: "apply", label: "Validate with kubectl apply", hint: "kubectl apply -f deployment.yaml" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — POD SECURED      │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+270") + dim("   Pod: non-root, no capabilities, read-only rootfs, seccomp runtime/default.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("patch privileged | capabilities | nonroot | readonly | seccomp") + "\r\n" +
      "  " + cyan("kubectl apply -f deployment.yaml") + "  ·  " + cyan("kubectl get pods") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/app/README"] : undefined) ?? (args[0] === "deployment.yaml" ? state.fs["/app/deployment.yaml"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/app/deployment.yaml" ? "inspect" : undefined }
    },
    patch: ({ state, args }) => {
      const p = "/app/deployment.yaml"
      let c = state.fs[p]?.content ?? ""
      if (args[0] === "privileged") {
        if (!/privileged: true/m.test(c)) return { stdout: yellow("already patched"), goalMet: "privileged" }
        c = c.replace("privileged: true", "# privileged: false")
        return { stdout: green("Removed privileged flag"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, PRIVILEGED: "no" } }, goalMet: "privileged" }
      }
      if (args[0] === "capabilities") {
        if (/drop:/m.test(c)) return { stdout: yellow("already patched"), goalMet: "capabilities" }
        c = c.replace(/capabilities:\s*\n\s*add:\s*\n\s*-\s*NET_ADMIN\n\s*-\s*SYS_ADMIN/m, "capabilities:\n          drop:\n          - ALL")
        return { stdout: green("Dropped all capabilities"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, CAPABILITIES: "yes" } }, goalMet: "capabilities" }
      }
      if (args[0] === "nonroot") {
        if (/runAsNonRoot: true/m.test(c)) return { stdout: yellow("already patched"), goalMet: "nonroot" }
        c = c.replace("runAsUser: 0", "runAsUser: 1000\n        runAsGroup: 1000\n        runAsNonRoot: true")
        return { stdout: green("Set runAsNonRoot to true"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, NONROOT: "yes" } }, goalMet: "nonroot" }
      }
      if (args[0] === "readonly") {
        if (/readOnlyRootFilesystem: true/m.test(c)) return { stdout: yellow("already patched"), goalMet: "readonly" }
        c = c.replace("ports:", "ports:\n        - containerPort: 3000\n        securityContext:\n          readOnlyRootFilesystem: true")
        return { stdout: green("Added readOnlyRootFilesystem"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, READONLY: "yes" } }, goalMet: "readonly" }
      }
      if (args[0] === "seccomp") {
        if (/seccompProfile/m.test(c)) return { stdout: yellow("already patched"), goalMet: "seccomp" }
        c = c.replace("readOnlyRootFilesystem: true", "readOnlyRootFilesystem: true\n        seccompProfile:\n          type: RuntimeDefault")
        return { stdout: green("Added seccomp profile"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, SECCOMP: "yes" } }, goalMet: "seccomp" }
      }
      return { stderr: "patch: unknown. Try 'patch privileged' / 'patch capabilities' / 'patch nonroot' / 'patch readonly' / 'patch seccomp'" }
    },
    kubectl: ({ state, args }) => {
      if (args[0] === "apply" && args[1] === "-f" && args[2] === "deployment.yaml") {
        const c = state.fs["/app/deployment.yaml"]?.content ?? ""
        if (state.env.PRIVILEGED === "yes") return { stderr: "kubectl: error — pod still has privileged flag" }
        if (state.env.CAPABILITIES === "no") return { stderr: "kubectl: error — capabilities not dropped" }
        if (state.env.NONROOT === "no") return { stderr: "kubectl: error — runAsNonRoot not set" }
        if (state.env.READONLY === "no") return { stderr: "kubectl: error — readOnlyRootFilesystem not set" }
        if (state.env.SECCOMP === "no") return { stderr: "kubectl: error — seccomp profile not set" }
        return {
          stdout: green("deployment.apps/api-server configured"),
          statePatch: { env: { ...state.env, APPLIED: "yes" } },
          goalMet: "apply",
        }
      }
      if (args[0] === "get" && args[1] === "pods") {
        if (state.env.APPLIED !== "yes") return { stderr: "kubectl: no resources found in production namespace" }
        return { stdout: "NAME                         READY   STATUS    RESTARTS   AGE\napi-server-6f7b8b9c4d-abc123   1/1     Running   0          5s\napi-server-6f7b8b9c4d-def456   1/1     Running   0          5s\napi-server-6f7b8b9c4d-ghi789   1/1     Running   0          5s" }
      }
      return { stderr: "kubectl: command not supported. Try 'kubectl apply -f deployment.yaml' or 'kubectl get pods'" }
    },
    hint: ({ state }) => {
      const r = k8sPodSecurityMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + k8sPodSecurityMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
