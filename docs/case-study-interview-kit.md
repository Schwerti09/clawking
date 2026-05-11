# Customer Case Study — Interview-Kit & Playbook

> Stand: 11.05.2026 | Zielgruppe: DevOps Leads & CTOs in DACH-SaaS-Startups (10–100 MA)

---

## 1. Vorbereitung

- **Wer eignet sich?** Zahlende Kunden, die ClawGuru ≥4 Wochen aktiv nutzen und mindestens 1 konkreten Vorfall/Audit damit gelöst haben.
- **Zeitaufwand für Kunden:** 20 Minuten Call, keine Vorbereitung nötig.
- **Output:** 250–300 Wörter Case Study + 1 Zitat mit Name/Rolle/Firma (nach Freigabe).
- **Gegenleistung:**
  - Backlink von clawguru.org auf deren Website
  - Case Study darf von ihnen selbst genutzt werden (Investor-Deck, Blog, LinkedIn)
  - Sichtbarkeit bei 3.000+ DevOps-Leads in DACH
  - Optional: 1 Monat Pro-Upgrade gratis

---

## 2. Die 6 Interview-Fragen

Lockerer Gesprächston, Du-Form. Frag nach, wenn Zahlen kommen ("Kannst du das genauer beziffern?").

1. **Auslöser:** "Was war die konkrete Situation, in der ihr gemerkt habt: Wir brauchen hier eine Lösung?"
2. **Vorher-Zustand:** "Bevor ClawGuru — wie habt ihr das gelöst? Eigene Scripts, Wiki-Seiten, gar nichts?"
3. **Entscheidung:** "Was hat euch an ClawGuru überzeugt — im Vergleich zu Alternativen?"
4. **Einführung:** "Wie lange hat es gedauert, bis ihr produktiv damit gearbeitet habt? Tage, Stunden?"
5. **Konkretes Ergebnis:** "Könnt ihr ein Beispiel nennen — einen Incident, einen Audit, eine Nachtschicht — wo ClawGuru den Unterschied gemacht hat?"
6. **Skeptiker-Antwort:** "Ein CTO fragt euch: 'Braucht man das wirklich?' — was antwortet ihr?"

### Bonus-Fragen (wenn Zeit bleibt)

- "Welches Feature nutzt ihr am häufigsten?"
- "Was fehlt euch noch?"
- "Dürfen wir euren Firmennamen und dein Zitat verwenden?"

---

## 3. Case-Study-Struktur (max. 300 Wörter)

```
TITEL: [Firmenname] — [Ergebnis in einem Satz]
       z.B. "StackHaus — Incident-Response von 45 Minuten auf 4 Minuten"

---

KONTEXT (2–3 Sätze)
- Branche, Teamgröße, Stack-Komplexität
- Regulatorischer Druck (NIS2, SOC 2, ISO 27001)

PROBLEM (3–4 Sätze)
- Konkrete Schmerzpunkte (Zeit, Risiko, Kosten)
- Was war die bisherige Nicht-Lösung?
- Was stand auf dem Spiel?

LÖSUNG (3–4 Sätze)
- Welches ClawGuru-Feature löst das Problem?
- Wie schnell war das Setup?
- EU-Hosting / DSGVO als Entscheidungsfaktor erwähnen

ERGEBNIS (3–4 Sätze, mit Zahlen)
- Vorher → Nachher (MTTR, Audit-Vorbereitung, On-Call-Last)
- Mindestens 1 harte Metrik + 1 qualitative Aussage
- Zitat des Interviewpartners (1 Satz, direkt)

CTA (1 Satz)
- "Jetzt eigenen Security-Check starten → clawguru.org/check"
```

---

## 4. Outreach-E-Mail (Copy-Paste-Ready)

**Betreff:** Kurze Frage — dürfen wir eure Story erzählen?

---

Hey [Vorname],

kurze Frage: Wir bauen gerade unsere ersten Case Studies auf und ich würde eure Erfahrung mit ClawGuru gerne als Referenz zeigen — natürlich nur, wenn ihr euch damit wohlfühlt.

Der Aufwand für euch: ein 20-Minuten-Call, lockeres Gespräch — keine PR-Abteilung nötig. Ihr bekommt den Text vorab zum Freigeben.

Was springt für euch raus:
- Sichtbarkeit bei 3.000+ DevOps-Leads in DACH
- Backlink von clawguru.org auf eure Seite
- Ihr dürft den Case Study auch selbst nutzen (Investor-Deck, Blog, LinkedIn)

Alle Details: https://clawguru.org/de/case-studies/teilnehmen

Passt das für euch? Dann schick ich einen Calendly-Link für nächste Woche.

Beste Grüße
[Dein Name]

---

## 5. Nach dem Interview — Checkliste

- [ ] Transkript in Stichpunkte zusammenfassen
- [ ] 1 Headline-Metrik identifizieren (z.B. "MTTR -80%")
- [ ] 1 Zitat extrahieren (max. 2 Sätze)
- [ ] Draft schreiben (max. 300 Wörter, Struktur oben)
- [ ] Draft an Kunden zur Freigabe schicken
- [ ] Freigabe erhalten → Page bauen unter `/case-studies/[slug]`
- [ ] LinkedIn-Post vorbereiten (Tag den Kunden)
- [ ] Newsletter-Mention planen

---

## 6. Technische Umsetzung

Sobald eine Case Study freigegeben ist:

```bash
# Neue Seite erstellen
app/[lang]/case-studies/[slug]/page.tsx
```

Pflicht-Elemente pro Case-Study-Page:
- `generateMetadata()` mit eigenem Title/Description
- `buildAuthoredArticleSchema()` JSON-LD
- `<AuthorBox>` + `<LastUpdated>`
- Interne Links zu relevanten Runbooks/Guides
- CTA: Security-Check oder Pro-Plan
