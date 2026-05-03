const {
  classifyRoute,
  extractMethods,
  detectGuards,
  assessRisk,
  summarize,
} = require("@/lib/audit/api-surface-audit")

describe("api surface audit helpers", () => {
  it("classifies admin, internal, webhook, cron and public routes", () => {
    expect(classifyRoute("app/api/admin/overview/route.ts")).toBe("admin")
    expect(classifyRoute("app/api/internal/pseo/stats/route.ts")).toBe("internal")
    expect(classifyRoute("app/api/webhooks/line/route.ts")).toBe("webhook")
    expect(classifyRoute("app/api/health/cron/route.ts")).toBe("cron")
    expect(classifyRoute("app/api/intel/route.ts")).toBe("public")
  })

  it("extracts exported HTTP methods", () => {
    const content = `export async function GET() {}\nexport async function POST() {}`
    expect(extractMethods(content)).toEqual(["GET", "POST"])
  })

  it("detects auth and telemetry markers", () => {
    const content = `verifyAdminToken(token); logTelemetry({ requestId: getRequestId(req) }); checkRateLimit(ip)`
    const guards = detectGuards(content)
    expect(guards.adminAuth).toBe(true)
    expect(guards.telemetry).toBe(true)
    expect(guards.rateLimit).toBe(true)
    expect(guards.hasAuth).toBe(true)
  })

  it("marks privileged unguarded route as critical", () => {
    const risk = assessRisk("admin", {
      adminAuth: false,
      sharedSecret: false,
      apiKeyAuth: false,
      sessionAuth: false,
      rateLimit: false,
      telemetry: false,
      hasAuth: false,
    })
    expect(risk).toBe("critical")
  })

  it("summarizes coverage and risk", () => {
    const summary = summarize([
      { class: "admin", risk: "critical", guards: { telemetry: true, hasAuth: false } },
      { class: "public", risk: "low", guards: { telemetry: false, hasAuth: true } },
    ])
    expect(summary.totalRoutes).toBe(2)
    expect(summary.risk.critical).toBe(1)
    expect(summary.telemetryCoveragePct).toBe(50)
    expect(summary.authCoveragePct).toBe(50)
  })
})
