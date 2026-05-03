const fs = require("node:fs")
const path = require("node:path")
const {
  normalizeRoutePath,
  classifyRoute,
  extractMethods,
  detectGuards,
  assessRisk,
  summarize,
} = require("../lib/audit/api-surface-audit")

const ROOT = process.cwd()
const API_ROOT = path.join(ROOT, "app", "api")
const STATUS_DIR = path.join(ROOT, "status")
const DOCS_DIR = path.join(ROOT, "docs")

function walkRoutes(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkRoutes(fullPath, out)
      continue
    }
    if (entry.isFile() && entry.name === "route.ts") out.push(fullPath)
  }
  return out
}

function buildAuditEntries(routeFiles) {
  return routeFiles.map((filePath) => {
    const routePath = normalizeRoutePath(filePath, ROOT)
    const content = fs.readFileSync(filePath, "utf8")
    const routeClass = classifyRoute(routePath)
    const guards = detectGuards(content)
    const methods = extractMethods(content)
    const risk = assessRisk(routeClass, guards)

    return {
      route: routePath,
      class: routeClass,
      methods,
      guards,
      risk,
    }
  })
}

function writeMarkdownReport(entries, summary) {
  const topCritical = entries.filter((entry) => entry.risk === "critical")
  const telemetryRows = entries
    .filter((entry) => entry.guards.telemetry)
    .map((entry) => `| \`${entry.route}\` | ${entry.class} | ${entry.methods.join(", ")} | yes |`)

  const criticalRows = topCritical.length > 0
    ? topCritical.map((entry) => `| \`${entry.route}\` | ${entry.class} | ${entry.methods.join(", ")} | no auth marker |`).join("\n")
    : "| _none_ | - | - | - |"

  const telemetryBody = telemetryRows.length > 0
    ? telemetryRows.join("\n")
    : "| _none_ | - | - | - |"

  const auditMarkdown = `# API Surface Audit (Master-Audit Day 1-2)\n\nGenerated: ${new Date().toISOString()}\n\n## Summary\n\n- Total routes: **${summary.totalRoutes}**\n- Route classes: public ${summary.classes.public}, internal ${summary.classes.internal}, admin ${summary.classes.admin}, cron ${summary.classes.cron}, webhook ${summary.classes.webhook}\n- Auth marker coverage: **${summary.authCoveragePct}%**\n- Telemetry marker coverage: **${summary.telemetryCoveragePct}%**\n- Risk buckets: critical ${summary.risk.critical}, medium ${summary.risk.medium}, low ${summary.risk.low}\n\n## Critical routes (missing auth marker)\n\n| Route | Class | Methods | Issue |\n| --- | --- | --- | --- |\n${criticalRows}\n\n## Telemetry matrix (routes with request-level telemetry markers)\n\n| Route | Class | Methods | Telemetry Marker |\n| --- | --- | --- | --- |\n${telemetryBody}\n\n## Guard standard\n\n- **Admin/Internal**: enforce admin token (verifyAdminToken) or shared secret fallback.\n- **Cron/Webhook**: enforce CRON_SECRET/domain-specific secret and return 401/403 on mismatch.\n- **Public mutating endpoints**: require either session/API key/shared secret, and apply rate-limit where abuse is likely.\n- **Observability**: prefer getRequestId + logTelemetry for request correlation.\n`

  fs.writeFileSync(path.join(STATUS_DIR, "api-surface-audit.md"), auditMarkdown, "utf8")

  const telemetryMarkdown = `# API Telemetry Matrix\n\nGenerated: ${new Date().toISOString()}\n\n| Route | Class | Methods | Telemetry Marker |\n| --- | --- | --- | --- |\n${telemetryBody}\n`

  fs.writeFileSync(path.join(DOCS_DIR, "api-telemetry-matrix.md"), telemetryMarkdown, "utf8")
}

function main() {
  if (!fs.existsSync(API_ROOT)) {
    console.error("[audit:api-surface] app/api directory not found")
    process.exit(1)
  }

  fs.mkdirSync(STATUS_DIR, { recursive: true })
  fs.mkdirSync(DOCS_DIR, { recursive: true })

  const routeFiles = walkRoutes(API_ROOT)
  const entries = buildAuditEntries(routeFiles)
  const summary = summarize(entries)

  const payload = {
    generatedAt: new Date().toISOString(),
    summary,
    routes: entries,
  }

  fs.writeFileSync(
    path.join(STATUS_DIR, "api-surface-audit.json"),
    JSON.stringify(payload, null, 2),
    "utf8"
  )

  writeMarkdownReport(entries, summary)

  console.log("[audit:api-surface] OK")
  console.log(`- routes: ${summary.totalRoutes}`)
  console.log(`- critical: ${summary.risk.critical}`)
  console.log(`- telemetryCoveragePct: ${summary.telemetryCoveragePct}`)
}

main()
