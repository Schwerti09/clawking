// Mission M-026 — "TLS Certificate Rotation: automate cert renewal before expiry"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const CERT_INFO_INITIAL = `# /app/cert-info.txt — certificate details
Certificate: hodlberg-api.crt
Issuer: Let's Encrypt Authority X3
Subject: CN=api.hodlberg.ag
Valid From: 2026-01-15
Valid To: 2026-05-15 (EXPIRES IN 10 DAYS)
Serial: 03:AB:CD:EF:12:34:56:78
SHA256 Fingerprint: A1:B2:C3:D4:E5:F6:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF
`

const README = `Mission M-026 — TLS Certificate Rotation
========================================

BRIEF
  Your TLS certificate expires in 10 days. Manual renewal is risky
  and error-prone. Automate the renewal process with certbot and
  set up automatic rotation.

OBJECTIVES
  1. Check certificate expiry
  2. Test renewal with certbot
  3. Configure auto-renewal cron job
  4. Set up monitoring alerts
  5. Verify new certificate
  6. Test TLS handshake

HINTS
  cat cert-info.txt
  certbot renew --dry-run
  patch cron
  patch monitoring
  verify cert
  test tls
`

const initialState: MissionState = {
  cwd: "/app",
  fs: {
    "/app/README": { content: README, mode: "ro" },
    "/app/cert-info.txt": { content: CERT_INFO_INITIAL, mode: "rw" },
  },
  env: { CHECKED: "no", RENEW_TEST: "no", CRON: "no", MONITORING: "no", VERIFIED: "no", TLS_TEST: "no" },
  goalsMet: [],
  history: [],
}

export const tlsCertificateRotationMission: Mission = {
  slug: "tls-certificate-rotation",
  title: "TLS Certificate Rotation: automate cert renewal before expiry",
  brief: "Your TLS certificate expires in 10 days. Automate renewal: certbot dry-run, cron job, monitoring alerts, verify new cert, test TLS handshake.",
  prompt: "defender@hodlberg-api:/app$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-026 — TLS CERT ROTATION") + bold(cyan("     │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "api.hodlberg.ag · Let's Encrypt · 10 days to expiry\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "check", label: "Check certificate expiry", hint: "cat cert-info.txt" },
    { id: "renew", label: "Test renewal with certbot", hint: "certbot renew --dry-run" },
    { id: "cron", label: "Configure auto-renewal cron job", hint: "patch cron" },
    { id: "monitoring", label: "Set up monitoring alerts", hint: "patch monitoring" },
    { id: "verify", label: "Verify new certificate", hint: "verify cert" },
    { id: "tls", label: "Test TLS handshake", hint: "test tls" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — CERT SECURED      │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+240") + dim("   TLS: certbot auto-renewal configured, monitoring alerts set, new cert verified, TLS handshake OK.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("certbot renew --dry-run") + "\r\n" +
      "  " + cyan("patch cron | monitoring") + "\r\n" +
      "  " + cyan("verify cert | test tls") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/app/README"] : undefined) ?? (args[0] === "cert-info.txt" ? state.fs["/app/cert-info.txt"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/app/cert-info.txt" ? "check" : undefined }
    },
    certbot: ({ state, args }) => {
      if (args[0] === "renew" && args[1] === "--dry-run") {
        return {
          stdout: green("Saving debug log to /var/log/letsencrypt/letsencrypt.log\n\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\nProcessing certificate for api.hodlberg.ag\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\nCertificate not yet due for renewal\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n** DRY RUN: simulating 'certbot renew' close to expiry\nCongratulations, all renewals succeeded."),
          statePatch: { env: { ...state.env, RENEW_TEST: "yes" } },
          goalMet: "renew",
        }
      }
      return { stderr: "certbot: command not supported. Try 'certbot renew --dry-run'" }
    },
    patch: ({ state, args }) => {
      if (args[0] === "cron") {
        return {
          stdout: green("Added cron job: 0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'"),
          statePatch: { env: { ...state.env, CRON: "yes" } },
          goalMet: "cron",
        }
      }
      if (args[0] === "monitoring") {
        return {
          stdout: green("Configured monitoring alert: Certificate expiry < 30 days triggers Slack notification"),
          statePatch: { env: { ...state.env, MONITORING: "yes" } },
          goalMet: "monitoring",
        }
      }
      return { stderr: "patch: unknown. Try 'patch cron' or 'patch monitoring'" }
    },
    verify: ({ state, args }) => {
      if (args[0] === "cert") {
        return {
          stdout: green("Certificate verified:\n  Subject: CN=api.hodlberg.ag\n  Issuer: Let's Encrypt Authority X3\n  Valid: 2026-05-15 to 2026-08-15 (90 days)\n  SANs: api.hodlberg.ag, www.api.hodlberg.ag"),
          statePatch: { env: { ...state.env, VERIFIED: "yes" } },
          goalMet: "verify",
        }
      }
      return { stderr: "verify: command not supported. Try 'verify cert'" }
    },
    test: ({ state, args }) => {
      if (args[0] === "tls") {
        if (state.env.VERIFIED !== "yes") return { stderr: "test: error — certificate not verified yet" }
        return {
          stdout: green("TLS handshake test:\n  Protocol: TLS 1.3\n  Cipher: TLS_AES_256_GCM_SHA384\n  Certificate: VALID\n  Chain: COMPLETE\n  OCSP: GOOD"),
          statePatch: { env: { ...state.env, TLS_TEST: "yes" } },
          goalMet: "tls",
        }
      }
      return { stderr: "test: command not supported. Try 'test tls'" }
    },
    hint: ({ state }) => {
      const r = tlsCertificateRotationMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + tlsCertificateRotationMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
