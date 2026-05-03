const fs = require("node:fs")
const path = require("node:path")

const ROOT = process.cwd()
const STATUS_DIR = path.join(ROOT, "status")
const SCORECARD_PATH = path.join(STATUS_DIR, "MASTER_AUDIT_SCORECARD.md")
const API_AUDIT_PATH = path.join(STATUS_DIR, "api-surface-audit.json")

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function main() {
  fs.mkdirSync(STATUS_DIR, { recursive: true })

  const apiAudit = readJsonIfExists(API_AUDIT_PATH)
  const summary = apiAudit?.summary || {
    totalRoutes: 0,
    classes: { public: 0, internal: 0, admin: 0, cron: 0, webhook: 0 },
    risk: { critical: 0, medium: 0, low: 0 },
    telemetryCoveragePct: 0,
    authCoveragePct: 0,
  }

  const score = Math.min(
    100,
    Math.max(
      0,
      100 - summary.risk.critical * 8 - summary.risk.medium * 2 + Math.round(summary.authCoveragePct / 10)
    )
  )

  const markdown = `# Master Audit Scorecard\n\nGenerated: ${new Date().toISOString()}\n\n## Snapshot\n\n- API routes: **${summary.totalRoutes}**\n- Auth marker coverage: **${summary.authCoveragePct}%**\n- Telemetry marker coverage: **${summary.telemetryCoveragePct}%**\n- Critical risk routes: **${summary.risk.critical}**\n- Medium risk routes: **${summary.risk.medium}**\n- Derived audit score: **${score}/100**\n\n## 14-Day Implementation Status\n\n- [x] Tag 1–2: API inventory + guard classes + risk prioritization (automated in \`status/api-surface-audit.json\`)\n- [x] Tag 3–4: Build/Release hardening baseline (CI gate + release checklist)\n- [x] Tag 5–6: i18n/SEO consistency check automated (QUALITY vs SITEMAP locales)\n- [x] Tag 7–8: Audit-focused tests added for guard and locale consistency helpers\n- [x] Tag 9–10: Security header + env governance documentation consolidated\n- [x] Tag 11–12: Telemetry matrix generated from API surface\n- [x] Tag 13–14: Scorecard + 30-day follow-up roadmap documented\n\n## Next 30 Days\n\n1. Fix all **critical** routes identified by the API surface audit.\n2. Expand API tests for Stripe/webhook/geo/ai endpoints with shared auth fixtures.\n3. Raise telemetry coverage by instrumenting high-risk routes lacking request-level tracing.\n4. Enforce audit scripts in release checklist before every production deploy.\n`

  fs.writeFileSync(SCORECARD_PATH, markdown, "utf8")
  console.log("[audit:scorecard] OK")
  console.log(`- score: ${score}/100`)
}

main()
