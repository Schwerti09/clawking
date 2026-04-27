# Consulting Automation — Abschluss-Dokument (27.04.2026)

> **Status:** Code 100 % fertig. Wartet auf manuelle Railway-Dashboard-Schritte (nur User).
> **Owner:** Windsurf (delegiert durch User). Hand-off an Cursor für zukünftige Wartung.
> **Referenz-Dokument:** [`docs/consult-automation-gaps-2026-04-26.md`](consult-automation-gaps-2026-04-26.md)

---

## 1. Gesamtstatus — alle 6 Steps

| Step | Thema | Code | Commit | Wartet auf |
|---|---|---|---|---|
| Step 1 | ENV-Doku + Healthcheck-Endpoint | ✅ | `6dca59a1` | — |
| Step 2 | Railway-native Cron (15 min) | ✅ | `52b4e07b` | Railway Dashboard Setup (→ Abschnitt 3) |
| Step 3 | Source-Filter (check_funnel_events) | ✅ | `f244c072` | — |
| Step 4 | DB-persistenter Cooldown | ✅ | `9f270106` | — |
| Step 5 | Cal.com URL-Validierung + Fallback | ✅ | `4efecd87` | Railway Dashboard ENVs (→ Abschnitt 3) |
| Step 6 | E2E Stripe-Tests + Webhook-Smoke | ✅ | `0fc3d523` | Tests manuell ausführen (→ Abschnitt 4) |
| Bugfix | Foreign-Agent-Regression (Doppel-Handler) | ✅ | `8b44692c` | — |

**160/160 Unit-Tests grün. Kein offener Code-Task.**

---

## 2. Was genau gebaut wurde (Kurzübersicht)

### Neue Dateien
| Datei | Zweck |
|---|---|
| `docs/consult-automation-env-2026-04-26.md` | 35 ENV-Vars dokumentiert (10 required, 7 recommended, 18 optional) |
| `docs/consult-automation-gaps-2026-04-26.md` | Gap-Analyse + Step-by-Step-Plan (alle 6 Steps) |
| `lib/booking-url.ts` | URL-Validierung für Cal.com/Calendly ENVs |
| `__tests__/booking-url.test.ts` | 39 Unit-Tests für URL-Validierung |
| `e2e/payment-flow/consulting-checkout.spec.ts` | 10 Playwright E2E-Tests (Stripe-Flow + Booking) |
| `scripts/test-stripe-webhook.mjs` | Webhook-Smoke-Test (Mode A: direkt, Mode B: Stripe CLI) |

### Geänderte Dateien
| Datei | Änderung |
|---|---|
| `components/booking/BookingButton.tsx` | `resolveBookingUrl()` für sichere Cal.com-URL-Nutzung |
| `app/api/consult-health/env-check/route.ts` | `validator`-Funktion pro ENV-Check + URL-Validierung |
| `lib/consult-health-notify.ts` | Sync-Memory-Cooldown wiederhergestellt (Bugfix Foreign-Agent) |
| `__tests__/consult-health-env-check-route.test.ts` | 5 neue Tests für URL-Validierungsverhalten |
| `package.json` | `test:e2e:consulting` + `test:webhook` Skripte |

---

## 3. ⚠️ DEINE AKTION — Railway Dashboard (Pflicht für Produktion)

Diese Schritte **kann nur du** erledigen. Ohne sie sind Booking-CTAs und Cron nicht aktiv.

### 3.1 Railway Web Service — ENV Variables

Öffne: **Railway Dashboard → Project → Web Service → Variables**

#### Pflicht (Cron + Webhook):
```
CRON_SECRET=<langer-zufälliger-string>          # z.B. openssl rand -hex 32
CONSULT_HEALTH_WARN_WEBHOOK_URL=<slack-url>      # z.B. https://hooks.slack.com/services/T.../B.../xxx
STRIPE_WEBHOOK_SECRET=<von-stripe-dashboard>    # Stripe Dashboard → Webhooks → Signing secret
```

#### Empfohlen (Cal.com Booking-CTAs):
```
NEXT_PUBLIC_CAL_DEMO_URL=https://cal.com/<dein-username>/demo
NEXT_PUBLIC_CAL_STRATEGY_URL=https://cal.com/<dein-username>/strategy
NEXT_PUBLIC_CAL_AUDIT_URL=https://cal.com/<dein-username>/audit
```
> **Validierungsregel:** URL muss mit `https://` starten und Host muss `cal.com`, `calendly.com`
> oder eine Subdomain davon sein. Falsche URLs → automatischer mailto-Fallback (kein Fehler).

#### Optional (Seiten-Paging):
```
CONSULT_HEALTH_PAGE_WEBHOOK_URL=<webhook-für-kritische-alerts>
```

### 3.2 Railway Cron Service einrichten

```
Service → + New Service → Cron Job
Command:    curl -s -o /dev/null -w "%{http_code}" \
              -X POST \
              -H "x-cron-secret: $CRON_SECRET" \
              "$RAILWAY_STATIC_URL/api/consult-health/cron"
Schedule:   */15 * * * *
```

> **Hinweis:** `RAILWAY_STATIC_URL` = deine Railway-URL ohne trailing slash,
> z.B. `https://clawguru-production.up.railway.app`

### 3.3 Stripe Webhook registrieren

1. [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. **Endpoint URL:** `https://clawguru.org/api/stripe/webhook`
3. **Events:** `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`
4. **Signing Secret** kopieren → als `STRIPE_WEBHOOK_SECRET` in Railway eintragen

---

## 4. Tests ausführen (nach Railway-Setup)

### Unit-Tests (lokal, jederzeit):
```bash
npx jest --runInBand --ci
# Erwartet: 160/160 passed
```

### E2E Consulting-Checkout (Dev-Server muss laufen):
```bash
npm run dev &
npm run test:e2e:consulting
# Erwartet: 10/10 passed
```

### Webhook-Smoke-Test (gegen Produktion):
```bash
SITE_URL=https://clawguru.org \
STRIPE_WEBHOOK_SECRET=<dein-signing-secret> \
npm run test:webhook
# Erwartet: exit 0, status 200 oder erwartetes 400
```

### Healthcheck-Endpoint prüfen:
```bash
curl -s -H "x-cron-secret: $CRON_SECRET" \
  https://clawguru.org/api/consult-health/env-check | jq .
# Erwartet: {"status":"ok"} oder {"status":"degraded"} mit details
```

---

## 5. Produktions-Verifikation (Checkliste)

Nach Railway-Setup diese Schritte manuell prüfen:

- [ ] `https://clawguru.org/de/consulting` lädt ohne Fehler
- [ ] "Pro aktivieren" → Stripe Checkout öffnet (kein 500)
- [ ] "Scale anfragen" → Cal.com-Seite öffnet (wenn ENV gesetzt) oder mailto-Link
- [ ] Healthcheck: `GET /api/consult-health/env-check` gibt `"status":"ok"` zurück
- [ ] Cron: Railway Dashboard zeigt Cron-Runs alle 15 Min ohne Fehler
- [ ] Slack-Webhook empfängt Alert (wenn Score < 70, d.h. wenige Checkouts)
- [ ] Stripe Webhook Dashboard zeigt grüne Events nach Test-Kauf

---

## 6. Architektur (Schnellreferenz)

```
User → /[lang]/consulting
  ├─ Starter/Pro → BuyButton → POST /api/stripe/checkout → Stripe Hosted Page
  │   → checkout.session.completed Webhook → /api/stripe/webhook
  │   → sendAccessEmail() + upsertEntitlement() → claw_access Cookie
  └─ Scale → BookingButton → Cal.com (NEXT_PUBLIC_CAL_DEMO_URL) oder mailto-Fallback

Jeder CTA-Klick → trackEvent("booking_click") → /api/analytics/check
  → check_funnel_events (DB)

Railway Cron */15 min:
  POST /api/consult-health/cron
    → getCheckFunnelSnapshotPersistent() → buildProfitFunnel() [score 0-100]
    → maybeNotifyConsultHealthAlerts()
      ├─ Sync: memPrev-Cooldown (in-process, 4h)
      └─ Async: DB-Cooldown (cross-pod, lookupLastSentFromDb)
        → Slack/JSON Webhook
        → consult_health_notify_events (DB telemetry)
```

---

## 7. Offene Punkte (kein Code — nur User-Action)

| # | Was | Wer | Priorität |
|---|---|---|---|
| A | Cal.com Account erstellen + 3 Meeting-Links einrichten | User | P1 — ohne das kein Booking |
| B | Railway ENVs setzen (Abschnitt 3.1) | User | P1 — ohne das kein Cron + kein Webhook |
| C | Railway Cron Job anlegen (Abschnitt 3.2) | User | P1 — ohne das kein Health-Monitoring |
| D | Stripe Webhook registrieren (Abschnitt 3.3) | User | P1 — ohne das kein Entitlement nach Kauf |
| E | E2E-Tests live ausführen (Abschnitt 4) | User | P2 — nach ENVs |
| F | Webhook-Smoke-Test gegen Produktion (Abschnitt 4) | User | P2 — nach Stripe-Webhook |
| G | Produktions-Checkliste abhaken (Abschnitt 5) | User | P2 — finaler Abnahme-Test |

---

> **Consulting Automation: Code-fertig. Sobald du A–D erledigt hast, ist alles 100 % live.**
