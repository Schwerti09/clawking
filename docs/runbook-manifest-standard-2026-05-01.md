# Runbook Manifest Standard

**Status:** Production-Ready (2026-05-01)

**Template:** `app/runbook/[slug]/page.tsx`

**Purpose:** ClawGuru Runbook Meisterstück — 95+ Lighthouse Score, E-E-A-T optimiert, Schema.org maximiert.

---

## Design Pattern

### Hero Section
- **HeroMesh** background (animated gradient)
- **Title** + **Subtitle** + **Meta Badges** (reading time, difficulty, last updated)
- **Quick Stats** (3-column grid: Provider, Stack, Estimated Time)
- **Primary CTA** (Copy Code / Start Check)

### 3-Column Layout (Desktop)
- **Left:** Table of Contents (StickyTOC) — scroll-spy navigation
- **Center:** Content (numbered step-bubbles, code blocks, callouts)
- **Right:** Interactive Checklist (stateful, localStorage persistence)

### Content Components
- **Step-Bubbles:** Numbered circles (1, 2, 3...) with connecting lines
- **CodeBlock:** Syntax highlighting + CopyCodeButton
- **Callout Boxes:** Tip / Warning / Info / Success tones
- **Common Mistakes:** "Was andere Tools nicht sagen" section
- **Sources Grid:** External links to CIS, OWASP, NIST, etc.

### E-E-A-T Section
- **Author Box:** Name, Role, Experience, Sources, Last Updated
- **Sources Grid:** Linked references
- **Last Reviewed:** Date + "Review Schedule"
- **Compliance Map:** GDPR, SOC2, HIPAA badges

### Schema.org
- **Person Author:** name, jobTitle, knowsAbout
- **AggregateRating:** ratingValue, reviewCount, bestRating
- **HowTo:** steps, tool, supply
- **TechArticle:** headline, author, datePublished
- **FAQPage:** mainEntity (Question + Answer)
- **BreadcrumbList:** itemListElement

### Final CTA Block
- **Primary CTA:** Security Check / Runbooks / OpenClaw
- **Secondary CTA:** Share / Bookmark / Feedback

---

## Technical Stack

### Client Components
- `ReadingProgressBar` — scroll progress indicator (top)
- `StickyTOC` — table of contents (desktop sticky)
- `InteractiveChecklist` — stateful checklist (localStorage)
- `CopyCodeButton` — copy-to-clipboard for code blocks
- `CodeBlock` — syntax highlighting wrapper
- `MetaBadges` — reading time, difficulty, last updated
- `HeroMesh` — animated gradient background

### Server Component
- `page.tsx` — server component (no `"use client"`)
- `generateStaticParams()` — all runbook slugs
- `generateMetadata()` — SEO + OpenGraph + alternates

### i18n
- Locale: `de` (default) + optional `en` via `buildLocalizedAlternates()`
- `pick()` helper for bilingual content
- `notFound()` for invalid slugs

---

## Lighthouse Targets

| Metric | Target | Status |
|---|---|---|
| Performance | 90+ | ✅ |
| Accessibility | 95+ | ✅ |
| Best Practices | 95+ | ✅ |
| SEO | 100 | ✅ |

---

## Author Standard

**Name:** R. Schwertfechter  
**Role:** Principal Ops-Engineer & Security Architect  
**Sources:** CIS Benchmarks 2026, OWASP Top 10 2025, NIST SP 800-190, Personal Incident Experience  

---

## Usage

**New Runbook:**
1. Copy `app/runbook/[slug]/page.tsx`
2. Update `slug`, `title`, `summary`, `tags`
3. Add custom content blocks
4. Run `npx next build` → verify 0 errors

**Commit Pattern:**
```
feat(runbook): add [provider]-[topic] runbook
```

---

## Notes

- **No `"use client"` in page.tsx** — server-only exports (generateStaticParams, generateMetadata)
- **All interactive logic in client components** — PageClient pattern if needed
- **Dark theme mandatory** — AGENTS.md Rule 6 (bg-gray-800, no bg-white/gray-50)
- **Motion reduce** — `prefers-reduced-motion` for accessibility
