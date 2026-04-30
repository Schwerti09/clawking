# i18n Legal and Payment Matrix — 2026-04-30

Purpose: track regional legal readiness and payment-method localization for 100-language rollout.

## Compliance Matrix (regional baseline)

| Region | Primary regimes | Required artifacts | Status |
|---|---|---|---|
| EU/EEA | GDPR, ePrivacy, consumer law | privacy policy locale fit, consent copy, DPA references | partial |
| UK | UK GDPR, PECR | UK-specific privacy wording, cookie/consent text | partial |
| US | CCPA/CPRA (+state variants) | privacy notice variants, data rights flow copy | partial |
| Canada | PIPEDA | consent and retention wording checks | partial |
| Brazil | LGPD | lawful-basis wording + rights references | partial |
| India | DPDP Act | local rights text + contact process wording | partial |
| APAC mixed | local consumer/privacy rules | locale-specific legal fallback policy | partial |

## Payment Localization Matrix

| Market cluster | Priority locales | Expected methods | Current status |
|---|---|---|---|
| DACH/EU core | `de`, `fr`, `it`, `nl` | cards, SEPA, wallets | partial |
| US/CA | `en`, `es` | cards, wallets | partial |
| Brazil | `pt` | cards + PIX-style local rail (if supported) | pending |
| Poland/Central EU | `pl`, `cs`, `hu` | cards + local transfer options | pending |
| Netherlands | `nl` | cards + iDEAL-style local option | pending |
| APAC developed | `ja`, `ko`, `zh` | cards + local wallet rails | pending |

## Operational Gaps

1. No single artifact yet that maps each locale to a verified legal text owner.
2. No explicit “market -> enabled payment rails -> fallback behavior” register in docs.
3. No CI gate verifying presence/consistency of legal/payment readiness metadata.

## Required Deliverables to close M3

- Legal ownership table: locale -> reviewer -> last legal signoff date.
- Payment capability table: locale -> checkout rails -> tested status.
- Exception register: locales with English legal fallback and planned completion date.

## Next Action

- Start with top-market locales from `docs/i18n-human-review-ledger-2026-04-30.md`, then extend to full 100-locale governance coverage.
