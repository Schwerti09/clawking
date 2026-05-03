# Testing and Release Gates

Related operational docs (Neon quota, build-time DB, failover):

- [`docs/postmortem-2026-04-24-seven-red-deploys.md`](./postmortem-2026-04-24-seven-red-deploys.md)
- [`docs/db-failover-2026-04-24.md`](./db-failover-2026-04-24.md)

## Core Commands

- `npm run test:autopilot`
  - Runs the autopilot-focused unit suites:
    - `__tests__/autopilot-offering.test.ts`
    - `__tests__/autopilot-delivery.test.ts`
    - `__tests__/checkout-upgrade-signals.test.ts`
    - `__tests__/autopilot-thresholds.test.ts`
    - `__tests__/autopilot-retention.test.ts`
  - Uses `--ci` and `--runInBand` for deterministic CI behavior.
- `npm run build`
  - Runs `build:data` and a production `next build`.
- `npm run check:static-db`
  - Ensures every file under `app/[lang]/` that imports `@/lib/db` also exports `export const dynamic = "force-dynamic"`.
  - Prevents static prerender × many locales from hammering Neon during `next build` (see post-mortem above).
- `npm run check:i18n-seo-consistency`
  - Verifies `SUPPORTED_LOCALES` stays at 100 and `QUALITY_LOCALES` stays at 32.
  - Verifies `SITEMAP_100K_LOCALES` in `scripts/netlify-build-env.sh` exactly matches `QUALITY_LOCALES`.
- `npm run test:security-core`
  - Runs security-critical unit tests (`rate-limit`, access-token handling, deny-list, security-check-core).
- `npm run test:audit`
  - Runs unit tests for audit guardrails (API surface classification + i18n/SEO consistency parser helpers).

## CI Release Gate

The CI workflow enforces this sequence:

1. `unit-tests` job runs `npm run check:static-db`, then `npm run test:autopilot`
2. `unit-tests` also runs `npm run check:i18n-seo-consistency`, `npm run test:security-core`, `npm run test:audit`
3. `build` job runs only after unit tests pass

If any unit gate fails, the build step is blocked.

## Roast statistics API (build resilience)

Neon may return compute-quota errors (`XX000`, “exceeded the compute time quota”) during builds if a route is prerendered while querying Postgres.

- **Classifier + failover:** handled in [`lib/db.ts`](../lib/db.ts) per [`docs/db-failover-2026-04-24.md`](./db-failover-2026-04-24.md).
- **App Route + page fallbacks:** [`app/api/roast-statistics/route.ts`](../app/api/roast-statistics/route.ts) and [`app/[lang]/roast-statistics/page.tsx`](../app/[lang]/roast-statistics/page.tsx) use [`lib/roast-stats-errors.ts`](../lib/roast-stats-errors.ts) to return empty statistics instead of failing the worker, and declare `dynamic = "force-dynamic"` so the route is not statically exported like a static page.

Shipped in commit `16ff17ed` (“make roast-statistics resilient to Neon quota”).
