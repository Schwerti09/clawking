# API Surface Audit (Master-Audit Day 1-2)

Generated: 2026-05-03T15:31:58.451Z

## Summary

- Total routes: **147**
- Route classes: public 116, internal 1, admin 22, cron 4, webhook 4
- Auth marker coverage: **49%**
- Telemetry marker coverage: **6.1%**
- Risk buckets: critical 0, medium 4, low 143

## Critical routes (missing auth marker)

| Route | Class | Methods | Issue |
| --- | --- | --- | --- |
| _none_ | - | - | - |

## Telemetry matrix (routes with request-level telemetry markers)

| Route | Class | Methods | Telemetry Marker |
| --- | --- | --- | --- |
| `app/api/analytics/check/route.ts` | public | POST | yes |
| `app/api/analytics/copilot/route.ts` | public | POST | yes |
| `app/api/auth/activate/route.ts` | public | GET | yes |
| `app/api/copilot/route.ts` | public | POST | yes |
| `app/api/dashboard/tool-execution/route.ts` | public | POST | yes |
| `app/api/download/route.ts` | public | GET | yes |
| `app/api/indexing-request/route.ts` | public | POST, GET | yes |
| `app/api/stripe/checkout/route.ts` | public | GET, POST | yes |
| `app/api/stripe/webhook/route.ts` | webhook | POST | yes |

## Guard standard

- **Admin/Internal**: enforce admin token (verifyAdminToken) or shared secret fallback.
- **Cron/Webhook**: enforce CRON_SECRET/domain-specific secret and return 401/403 on mismatch.
- **Public mutating endpoints**: require either session/API key/shared secret, and apply rate-limit where abuse is likely.
- **Observability**: prefer getRequestId + logTelemetry for request correlation.
