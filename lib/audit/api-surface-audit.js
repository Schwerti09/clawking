const path = require("node:path")

function normalizeRoutePath(absolutePath, rootDir) {
  return path.relative(rootDir, absolutePath).replace(/\\/g, "/")
}

function classifyRoute(routePath) {
  if (/\/admin\//.test(routePath)) return "admin"
  if (/\/internal\//.test(routePath)) return "internal"
  if (/\/webhooks?\//.test(routePath) || /\/stripe\/webhook\//.test(routePath)) return "webhook"
  if (/\/cron\//.test(routePath) || /\/cron$/.test(routePath)) return "cron"
  return "public"
}

function extractMethods(content) {
  const methods = []
  const regex = /export\s+async\s+function\s+(GET|POST|PUT|PATCH|DELETE)\s*\(/g
  let match = regex.exec(content)
  while (match) {
    methods.push(match[1])
    match = regex.exec(content)
  }
  return methods.length > 0 ? Array.from(new Set(methods)) : ["GET"]
}

function detectGuards(content) {
  const markers = {
    adminAuth: /verifyAdminToken|adminCookieName/.test(content),
    sharedSecret: /isAuthorizedBySharedSecret|CRON_SECRET|GEO_[A-Z0-9_]*SECRET|ADMIN_API_TOKEN|WEBHOOK_SHARED_SECRET|process\.env\.[A-Z0-9_]*SECRET/.test(content),
    apiKeyAuth: /validateApiKey|X-API-Key|INTEL_API_KEYS|x-admin-token|Authorization:\s*Bearer/.test(content),
    sessionAuth: /verifyAccessToken|getAuthToken|customer_entitlements|\/api\/auth\//.test(content),
    rateLimit: /checkRateLimit|allowBurstInMemory|RATE_LIMIT|rateLimit/.test(content),
    telemetry: /logTelemetry|getRequestId|x-request-id/.test(content),
  }

  return {
    ...markers,
    hasAuth: markers.adminAuth || markers.sharedSecret || markers.apiKeyAuth || markers.sessionAuth,
  }
}

function assessRisk(routeClass, guardInfo) {
  const privileged = routeClass === "admin" || routeClass === "internal" || routeClass === "cron" || routeClass === "webhook"
  if (!privileged) return "low"
  if (!guardInfo.hasAuth) return "critical"
  if (!guardInfo.rateLimit && (routeClass === "webhook" || routeClass === "public")) return "medium"
  return "low"
}

function summarize(entries) {
  const summary = {
    totalRoutes: entries.length,
    classes: { public: 0, internal: 0, admin: 0, cron: 0, webhook: 0 },
    risk: { critical: 0, medium: 0, low: 0 },
    telemetryCoveragePct: 0,
    authCoveragePct: 0,
  }

  let telemetryCount = 0
  let authCount = 0

  for (const entry of entries) {
    summary.classes[entry.class] = (summary.classes[entry.class] || 0) + 1
    summary.risk[entry.risk] = (summary.risk[entry.risk] || 0) + 1
    if (entry.guards.telemetry) telemetryCount += 1
    if (entry.guards.hasAuth) authCount += 1
  }

  summary.telemetryCoveragePct = entries.length ? Number(((telemetryCount / entries.length) * 100).toFixed(1)) : 0
  summary.authCoveragePct = entries.length ? Number(((authCount / entries.length) * 100).toFixed(1)) : 0
  return summary
}

module.exports = {
  normalizeRoutePath,
  classifyRoute,
  extractMethods,
  detectGuards,
  assessRisk,
  summarize,
}
