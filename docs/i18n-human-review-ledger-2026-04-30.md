# i18n Human Review Ledger — 2026-04-30

Purpose: auditable human-in-the-loop review tracking for top-market locales per the 100-language manifesto.

## Scope

- Canonical source locale: `de`
- Review focus: top-market locales with highest business and legal impact
- Quality gates: terminology, tone, legal phrasing, CTA clarity, metadata naturalness

## Review Status

| Locale | Reviewer | Content QA | Legal text QA | Metadata QA | Last review | Notes |
|---|---|---|---|---|---|---|
| `de` | pending | pending | pending | pending | - | canonical baseline audit pending |
| `en` | pending | pending | pending | pending | - | global fallback market |
| `fr` | pending | pending | pending | pending | - | EU legal tone review required |
| `es` | pending | pending | pending | pending | - | LATAM vs ES variant checks pending |
| `pt` | pending | pending | pending | pending | - | BR/PT lexical split review pending |
| `it` | pending | pending | pending | pending | - | legal microcopy review pending |
| `nl` | pending | pending | pending | pending | - | payment wording review pending |
| `pl` | pending | pending | pending | pending | - | onboarding CTA tone review pending |
| `ja` | pending | pending | pending | pending | - | truncation and UI fit review pending |
| `ko` | pending | pending | pending | pending | - | honorific/register consistency pending |

## Mandatory Checklist per Locale

1. Terminology consistency against security glossary.
2. No untranslated fragments in visible UI paths.
3. Legal pages use region-appropriate language and disclaimers.
4. Pricing and checkout copy is culturally clear and non-ambiguous.
5. Metadata (`title`, `description`, `openGraph`) reads natural and not machine-generated.

## Evidence Policy

- Every completed review row must include:
  - reviewer handle
  - date
  - links to changed files (or “no change required”)
  - explicit pass/fail for each QA column

## Next Action

- Fill reviewer assignments for the 10 locales above, then expand in waves (top 25 -> top 50).
