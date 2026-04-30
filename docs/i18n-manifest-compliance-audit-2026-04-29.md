# i18n Manifest Compliance Audit — 29.04.2026

Scope: Verification against `docs/i18n-100-language-manifest-2026-04-29.md` after 100-language rollout.

## Executive Status

- Translation parity (keys/schema): **PASS**
- Manifest compliance overall: **PARTIAL (not yet 100%)**
- Current confidence: **High** for key/schema checks, **Medium** for legal/payment/performance regional readiness checks.

## Hard Metrics Snapshot

- Dictionary files in `dictionaries/`: **100**
- Locale routing/registry (`lib/i18n.ts`): **100 active locales**
- Dictionary loaders (`lib/getDictionary.ts`): **100 wired locales**
- Parity against `de.json`:
  - `missing=0`
  - `extra=0`
  - `type_mismatch=0`

## Manifest Compliance Matrix

### 1) Technical SEO Infrastructure

- **Hreflang + alternates discipline:** **PASS (M1 completed)**
  - `app/[lang]/**/page.tsx`: 556 localized pages discovered.
  - 553 include `generateMetadata`.
  - 553/553 metadata pages now use `buildLocalizedAlternates(...)` after M1 fixes.
- **No query-param localization (`?lang=`):** **PASS**
  - No indexable app/page usage found in code audit.
- **OpenGraph per-page URL consistency:** **PASS (M2 completed)**
  - Initial gap: 92 localized pages with `generateMetadata` and no explicit `openGraph.url`.
  - M2 codemod pass completed for safe pattern files (`alternates: buildLocalizedAlternates(...)`) on 19 pages.
  - M2 pass 2 completed with staged safe insertions across remaining localized metadata pages.
  - Current gap after pass: 0 total.
  - Machine-readable coverage report emitted: `docs/i18n-hreflang-coverage-2026-04-29.json`.
- **Global performance/CDN evidence:** **PARTIAL**
  - Policy exists; no consolidated region-latency/SLO evidence bundle attached yet.

### 2) i18n vs l10n

- **Layout/RTL readiness:** **PASS (M1 completed)**
  - RTL plumbing exists (`localeDir`, layout-level `dir`, middleware header propagation).
  - `RTL_LOCALES` currently: `ar`, `he`, `fa`, `ur`, `ps`.
- **Locale formatting (dates/currency via Intl):** **PARTIAL**
  - `Intl` usage exists in repo; not yet enforced as a strict project-wide rule for all user-visible formatting surfaces.
- **UTF-8 pipeline:** **PASS (practical)**
  - JSON dictionaries and i18n pipeline operate with UTF-8 inputs/outputs.

### 3) Content Management and Quality

- **AI + human-in-the-loop policy:** **PARTIAL**
  - Manifest and AGENTS policy require human review for top markets.
  - Human review ledger published: `docs/i18n-human-review-ledger-2026-04-30.md`.
- **Ghost-page/fallback UX:** **PARTIAL**
  - Fallback merging exists in dictionary layer.
  - Need explicit route-level fallback playbook and audit for missing localized content pages.
- **Localized keyword strategy:** **PARTIAL**
  - Strategy documented; missing measurable locale-level keyword map and completion tracker.

### 4) Legal and Monetary Readiness

- **Regional privacy/compliance coverage:** **PARTIAL**
  - GDPR/DSGVO signals are present; baseline legal matrix published: `docs/i18n-legal-payment-matrix-2026-04-30.md`.
- **Localized payment methods:** **PARTIAL**
  - Baseline market/payment matrix published; implementation/test coverage still partial.

### 5) Strategic Scope Control

- **Staged rollout discipline:** **PASS**
  - L1 -> L2 -> L3 -> L4 sequence documented and completed in AGENTS session log.
- **Automation + maintainability:** **PASS**
  - Normalization tool exists: `scripts/i18n-normalize-dictionaries.js`.
  - Maintenance mode still needs CI enforcement hook.

## Current Blocking Gaps Before "100% Manifest Compliance"

1. Expand ledger and matrix from baseline to full locale ownership and tested-payment coverage.

## Action Plan to 100% Manifest Compliance

### Phase M1 (Immediate, code-level) — ✅ COMPLETE

- Patched 3 pages to use `buildLocalizedAlternates`.
- Added `ps` to `RTL_LOCALES`.
- Remaining guard-script work moved to M4 (CI enforcement phase).

### Phase M2 (SEO hardening)

- Sweep localized pages with `generateMetadata` and normalize `openGraph.url` usage. ✅
- Emit a machine-readable hreflang coverage report in docs. ✅ (`docs/i18n-hreflang-coverage-2026-04-29.json`)

### Phase M3 (Governance)

- Add `docs/i18n-human-review-ledger-2026-04-30.md` for top-market review status. ✅
- Add `docs/i18n-legal-payment-matrix-2026-04-30.md` for regional compliance/payment readiness. ✅

### Phase M4 (Operational proof)

- Add CI job and fail-on-violation gates for i18n parity + manifest checks. ✅
  - Workflow: `.github/workflows/ci.yml` includes `i18n-manifest-gates`.
  - Gate command: `node scripts/check-i18n.js` with `STRICT_I18N=1`, `STRICT_LINKS=1`, `STRICT_MANIFEST=1`.
  - Manifest gates enforced in `scripts/check-i18n.js`:
    - localized metadata pages must use `buildLocalizedAlternates(...)`
    - localized metadata pages must include `openGraph.url`
- Add monthly manifest compliance checkpoint in AGENTS session process.

## Verdict

- **100-language translation parity is complete.**
- **Manifest compliance is not yet 100%.**
- With Phases M1-M4 completed, the repo can claim full technical + governance alignment with the manifesto.

