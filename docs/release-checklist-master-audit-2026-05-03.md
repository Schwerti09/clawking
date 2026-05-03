# Release Checklist — Master Audit Baseline

Use this checklist before every production release.

## 1) Baseline quality gates

- [ ] `npm run check:static-db`
- [ ] `npm run check:i18n-seo-consistency`
- [ ] `npm run test:autopilot`
- [ ] `npm run test:security-core`
- [ ] `npm run test:audit`

## 2) Audit artifacts refresh

- [ ] `npm run audit:refresh`
- [ ] Review `status/api-surface-audit.md`
- [ ] Review `status/MASTER_AUDIT_SCORECARD.md`

## 3) Security governance

- [ ] Verify admin/internal routes require at least one explicit auth guard marker
- [ ] Verify cron/webhook routes require secret-based auth
- [ ] Verify critical mutating routes have abuse controls (rate limit and/or guarded execution)

## 4) i18n / SEO governance

- [ ] Ensure `SUPPORTED_LOCALES` remains 100
- [ ] Ensure `QUALITY_LOCALES` remains 32 unless explicitly promoted
- [ ] Ensure `SITEMAP_100K_LOCALES` mirrors `QUALITY_LOCALES`
- [ ] Ensure non-quality locales are still noindexed in middleware

## 5) Env / secrets governance

- [ ] Keep build-only variables in `scripts/netlify-build-env.sh`
- [ ] Keep runtime-only secrets in deployment platform env
- [ ] Confirm no secrets were introduced in tracked files

## 6) Build and deploy

- [ ] Execute repository build command and confirm successful completion in CI
- [ ] Validate production smoke checks after deployment
- [ ] If regressions occur, roll back and open incident follow-up
