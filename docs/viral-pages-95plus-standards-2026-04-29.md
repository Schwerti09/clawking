# Viral Pages 95+ Lighthouse-Score Standards (29.04.2026)

> **Ziel:** Alle viral pages auf 95+ Lighthouse-Score bringen mit einzigartigem Content.
> **Anti-Spam-Regel:** Keine wiederholten Module/Content — jede Seite muss einzigartig sein.

---

## 🎯 95+ Lighthouse-Score Standards

### 1. Performance (95+)
- **Animated Shell mit CSS-only Animationen** — keine JS-basierten Animationen
- **Reading Progress Bar** — fixed top, gradient fill, smooth transitions
- **Lazy Loading** — Bilder und nicht-kritische Components
- **Critical CSS Inline** — above-the-fold content ohne render-blocking
- **Minimal JavaScript** — nur für interaktive Features (Checklist, Calculator)

### 2. Accessibility (95+)
- **Semantic HTML** — richtige heading hierarchy (h1 → h2 → h3)
- **ARIA Labels** — alle interaktiven Elements
- **Keyboard Navigation** — Tab-Index, Focus States
- **Color Contrast** — WCAG AA (4.5:1 für Text, 3:1 für große Texte)
- **Alt Text** — alle Bilder

### 3. Best Practices (95+)
- **HTTPS** — alle Ressourcen über HTTPS
- **No Mixed Content** — keine HTTP-Ressourcen
- **Meta Tags** — viewport, description, keywords, og:*
- **Schema.org JSON-LD** — BreadcrumbList + WebPage/FAQPage/Article
- **No Console Errors** — alle JavaScript-Fehler behoben

### 4. SEO (95+)
- **Unique Title & Description** — keine Duplikate
- **Canonical URL** — rel="canonical" gesetzt
- **OpenGraph & Twitter Cards** — alle social platforms
- **Structured Data** — Schema.org Markup korrekt
- **Mobile-First** — responsive design

---

## 📋 Content-Struktur für 95+ (Reference-Level)

### 1. Sticky Table of Contents (Desktop)
```tsx
<aside className="hidden lg:block w-64 flex-shrink-0">
  <div className="sticky top-4">
    {/* TOC mit Links zu allen Sections */}
  </div>
</aside>
```

### 2. Hero/Hook — Problem Statement mit Real-World Scenario
- **Emotional Hook** — "Dein Agent hat gerade deine gesamte Infrastruktur kompromittiert"
- **Real-World Impact** — Zahlen, Kosten, Konsequenzen
- **Gradient Heading** — `bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text`

### 3. Amateur-Section — "Was ist X? Einfach erklärt" (200-300 Wörter)
- **Einfache Analogie** — "Wie ein Schloss an deiner Haustür"
- **Kernkonzept erklärt** — ohne Fachjargon
- **Jump-Link** — "↓ Springe direkt zur technischen Tiefe"

### 4. Deep-Dive Expertise — 1000-1500 Wörter
- **5-Layer Defense Architecture** (oder äquivalent)
- **Production-Ready Patterns** — echte Best Practices
- **Real-World Scars** — Fallstudien mit Details
- **Code Examples** — copy-paste ready

### 5. Real-World Scars — Production Stories
- **Detaillierte Fallstudien** — 2-3 Stories pro Seite
- **Struktur:** Root Cause, Was passierte, Fix, Lessons
- **Farbcodiert** — rot/orange/gelb für Severity
- **Einzigartig pro Seite** — keine Copy-Paste-Fallstudien

### 6. Interactive Checklist — LocalStorage-basiert
- **9-12 Items** — spezifisch für das Thema
- **Progress Bar** — Visualisierung
- **LocalStorage Persistenz** — speichert Progress
- **Export/Reset Buttons**

### 7. Security Score Calculator
- **5 Fragen** — spezifisch für das Thema
- **Score-Berechnung** — 0-100
- **Industry Comparison** — Durchschnittswerte
- **Upgrade CTA** — Link zu Pricing

### 8. Share Badge Generator
- **Badge mit Score** — PNG Download
- **Social Sharing** — LinkedIn/X Buttons
- **Branding** — clawguru.org URL

### 9. Author Box — E-E-A-T Signals
- **Avatar Initials** — CG für ClawGuru
- **Verified Badge** — ✓ Verified
- **Publication Info** — Datum, Last Reviewed
- **Description** — Expertise, Experience

### 10. Further Resources — 5+ Internal Links
- **Relevante Seiten** — thematisch verwandt
- **Glassmorphism Cards** — hover effects
- **Icon/Emoji** — 🔗 für Links

---

## 🚫 Anti-Spam-Regeln — Einzigartiger Content

### 1. Keine Copy-Paste-Module
- **Jede Seite muss eigenen Content haben** — keine generischen "best practices"
- **Real-World Scars müssen einzigartig sein** — keine wiederholten Fallstudien
- **Checklist-Items müssen spezifisch sein** — keine generischen "Review IAM"

### 2. Content-Variation pro Seite
- **Thema-spezifische Fallstudien** — z.B. für AI Agent Security: Prompt Injection Incident
- **Thema-spezifische Checklist** — z.B. für LLM Security: Prompt Hardening Checklist
- **Thema-spezifische Calculator-Fragen** — z.B. für Network Security: Firewall Rules

### 3. Content-Generation Guidelines
- **Kein KI-generierter Template-Content** — menschliche Stimme
- **Echte Expertise** — production scars, real-world experience
- **Storytelling** — narrative statt bullet-points
- **Unique Insights** — nicht überall verfügbar

---

## 📊 Upgrade-Plan für alle 115+ Seiten

### Phase 1: Standards Dokumentieren ✅
- [x] 95+ Standards dokumentieren
- [ ] Anti-Spam-Regeln dokumentieren
- [ ] Template/Pattern erstellen

### Phase 2: Alle 115 Seiten auf 95+ Upgrade
- [ ] Batch 1-10: Basis-Seiten (13) → bereits auf 95+
- [ ] Batch 11-20: TIER 1 (25) → auf 95+ bringen
- [ ] Batch 21-30: TIER 2 (35) → auf 95+ bringen
- [ ] Batch 31-40: TIER 3 LLM (40) → auf 95+ bringen
- [ ] Batch 41-45: TIER 3 Rest (15) → auf 95+ bringen

### Phase 3: Verbleibende Batches (Y, Z, AA, AB, AD)
- [ ] Batch Y (5) → direkt auf 95+ erstellen
- [ ] Batch Z (5) → direkt auf 95+ erstellen
- [ ] Batch AA (5) → direkt auf 95+ erstellen
- [ ] Batch AB (5) → direkt auf 95+ erstellen
- [ ] Batch AD (5) → direkt auf 95+ erstellen

---

## 🎨 Design-System für 95+

### Dark Theme (Mandatory)
- **Background:** `bg-[#0a0a0a]` — kein `bg-gray-50/100/200`, kein `bg-white`
- **Text:** `text-gray-100/300/400` — kein `text-gray-600/800`
- **Cards:** `bg-gray-800/80 backdrop-blur-lg` — glassmorphism
- **Borders:** `border-gray-700/50` — semi-transparent
- **Shadows:** `shadow-2xl`, `hover:shadow-cyan-500/20`

### Animated Shell
```tsx
<div className="fixed inset-0 -z-10">
  <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
</div>
```

### Reading Progress Bar
```tsx
<div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
  <div id="reading-progress" className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{width: '0%'}}></div>
</div>
```

---

## 🔍 Quality-Check-Liste für jede Seite

### Pre-Push Check
- [ ] Lighthouse-Score ≥ 95 (alle 4 Kategorien)
- [ ] Keine forbidden CSS classes (bg-gray-50/100/200, bg-white, text-gray-600/800)
- [ ] Schema.org JSON-LD korrekt (BreadcrumbList + WebPage/FAQPage)
- [ ] Alle user-facing Text lokalisiert mit pick()
- [ ] Animated Shell + Reading Progress Bar vorhanden
- [ ] Amateur-Section mit einzigartigem Content
- [ ] Real-World Scars mit einzigartigen Fallstudien
- [ ] Interactive Checklist mit LocalStorage
- [ ] Security Score Calculator (optional, empfohlen)
- [ ] Share Badge Generator (optional, empfohlen)
- [ ] Sticky TOC (Desktop)
- [ ] Author Box mit E-E-A-T Signals
- [ ] 5+ Internal Links
- [ ] Kein Copy-Paste-Content von anderen Seiten

### Lighthouse-Check-Command
```bash
npx lighthouse https://clawguru.org/de/moltbot/[slug] --view
```

---

## 📝 Content-Generation-Template (Pro Seite)

### 1. Hero/Hook
```
[Emotional Hook]: "Dein [System/Komponente] hat gerade [schlimme Konsequenz]"
[Real-World Impact]: [Zahlen, Kosten, Konsequenzen]
[Gradient Heading]: [Titel mit Gradient]
```

### 2. Amateur-Section
```
[Einfache Analogie]: "Wie ein [Alltags-Objekt]"
[Kernkonzept erklärt]: [ohne Fachjargon]
[Jump-Link]: "↓ Springe direkt zur technischen Tiefe"
```

### 3. Deep-Dive
```
[5-Layer Architecture oder äquivalent]
[Production-Ready Patterns]
[Code Examples]
[Real-World Scars]
```

### 4. Real-World Scars
```
[Fallstudie 1]: Root Cause, Was passierte, Fix, Lessons
[Fallstudie 2]: Root Cause, Was passierte, Fix, Lessons
[Fallstudie 3]: Root Cause, Was passierte, Fix, Lessons
```

### 5. Interactive Checklist
```
[9-12 spezifische Items für das Thema]
[Progress Bar]
[LocalStorage Persistenz]
[Export/Reset Buttons]
```

---

## 🚀 Next Steps

1. **Standards dokumentieren** ✅
2. **Template erstellen** — React Component mit allen 95+ Features
3. **Batch-Upgrade starten** — 10 Seiten pro Batch für Geschwindigkeit
4. **Quality-Check** — Lighthouse ≥ 95 für jede Seite
5. **Anti-Spam-Check** — einzigartiger Content pro Seite

---

> **Status:** Planning Phase — Standards dokumentiert, Template in Arbeit
