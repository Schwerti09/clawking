# i18n 100-Language Manifest (Senior-Level) — 29.04.2026

This manifesto defines the non-negotiable operating standard for scaling this platform to 100 languages.

## Why This Exists

Scaling a website to 100 languages is a major technical and strategic program. Doing it without architecture and quality gates creates duplicate content, broken UX, and SEO losses.

## 1) Technical SEO Infrastructure

Without solid architecture, search engines classify multilingual pages as low quality.

- **Hreflang discipline**: Every localized URL must map to correct language/region variants. At 100 languages, sitemap governance is mandatory.
- **URL strategy**: Use locale paths or subdomains (`example.com/fr/` or `fr.example.com`). Do not rely on query parameters (`?lang=fr`) for indexable content.
- **Global performance**: 100-language scale increases data volume significantly. Use aggressive caching and a global CDN so latency is stable across regions.

## 2) Internationalization (i18n) vs Localization (l10n)

Translation alone is not enough. Rendering, semantics, and user context must adapt.

- **Layout resilience**: Text expansion, long compounds, and RTL scripts must not break design. Use CSS logical properties and locale-aware UI rules.
- **Locale-safe formatting**: Dates, numbers, currency, and units must use locale-aware formatting (`Intl` or equivalent).
- **Unicode everywhere**: End-to-end UTF-8 across database, backend, and frontend is required for script correctness and data integrity.

## 3) Content Operations and Quality

Manual maintenance for 100 languages is not viable; quality automation is required.

- **AI-assisted workflow + human review**: Use machine translation at scale, but enforce human-in-the-loop review for top revenue/traffic languages.
- **No ghost pages**: If localized content is missing, do not serve dead ends. Fallback gracefully with clear language notices.
- **Local keyword strategy**: Direct translation is not SEO strategy. Each key market needs localized search intent and keyword mapping.

## 4) Legal and Commercial Readiness

Language expansion without legal and payment localization creates conversion and compliance risk.

- **Compliance by region**: Privacy and legal disclosures must match regional frameworks (e.g. GDPR, CCPA, and local equivalents).
- **Payment localization**: Support region-preferred methods where commercialized (e.g. local rails beyond cards).

## 5) Strategic Scope Control

The goal is not language vanity; the goal is sustainable growth.

- **Prioritize impact**: A focused top-language set often drives most revenue.
- **Scale with automation**: Keep deployment and translation synchronized via TMS/workflow tooling connected to source control.

## ClawGuru Operating Policy

Effective immediately, this repo follows:

1. 100-language growth must pass SEO, UX, and parity gates before rollout.
2. Locale expansion is staged and measurable; no uncontrolled language activation.
3. Dictionary/schema parity gates remain mandatory (`missing=0`, `extra=0`, `type_mismatch=0`).
4. Top-market locales require human quality review before "complete" status.
5. Every expansion step must be documented in `AGENTS.md` session log and active tasks.

