# Quality Improvement Master Plan - "Alles in einem Rutsch"
**Datum:** 04.05.2026  
**Scope:** ~10.000+ indexierte Seiten über alle Kategorien  
**Ziel:** Durchschnittlicher Score von 68-75/100 auf 85-90/100 heben

---

## Strategie: 5-Phasen Rollout

### Phase 1: Kritische Fixes (Woche 1)
**Ziel:** Blockierende Issues beheben, die SEO/UX negativ beeinflussen

#### 1.1 Dark Theme Compliance - SECURITY_SLUGS 🔴 KRITISCH
**Problem:** bg-red-900 mit text-red-900 (unlesbar), bg-amber-900 mit text-amber-300 ok  
**Betroffen:** ~896 Seiten (28 Slugs × 32 Locales)  
**Lösung:** Automatisierter Find/Replace mit PowerShell

```powershell
# Script: fix-dark-theme-security.ps1
$files = Get-ChildItem -Path "app\[lang]" -Recurse -Filter "*.tsx"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'bg-red-900', 'bg-red-900 border border-red-700'
    $content = $content -replace 'text-red-900', 'text-red-300'
    Set-Content $file.FullName $content
}
```

#### 1.2 Duplicate Title Bug 🟡 WICHTIG
**Problem:** `/linux-hardening` hat identischen Title für DE/EN  
**Betroffen:** Einige SECURITY_SLUGS  
**Lösung:** pick() für Title in generateMetadata verwenden

```typescript
// Vorher
title: 'Linux Hardening Guide 2024'

// Nachher
title: pick(isDE, 'Linux Hardening Guide 2024', 'Linux Hardening Guide 2024')
```

#### 1.3 bg-orange-50 Bug 🟡 WICHTIG
**Problem:** `/solutions/soc2-compliance-automation` Zeile 86 hat bg-orange-50  
**Betroffen:** Einige SOLUTIONS_SLUGS  
**Lösung:** Automatisierter Find/Replace

```powershell
# Script: fix-orange-50.ps1
$files = Get-ChildItem -Path "app\[lang]\solutions" -Recurse -Filter "*.tsx"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'bg-orange-50', 'bg-orange-900 border border-orange-700'
    Set-Content $file.FullName $content
}
```

---

### Phase 2: E-E-A-T Infrastruktur (Woche 1-2)
**Ziel:** Template und Helper erstellen für skalierbares E-E-A-T

#### 2.1 E-E-A-T Helper erstellen
**Datei:** `lib/seo/eeat-helper.ts`

```typescript
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"
import { buildAuthoredArticleSchema } from "@/lib/seo/author"

interface EEATConfig {
  locale: string
  author?: string
  dateModified?: string
  publishedDate?: string
  variant?: "full" | "compact"
}

export function renderEEAT(config: EEATConfig) {
  return {
    authorBox: <AuthorBox locale={config.locale} variant={config.variant || "full"} />,
    lastUpdated: config.dateModified ? (
      <LastUpdated dateModified={config.dateModified} publishedDate={config.publishedDate} />
    ) : null,
    articleSchema: buildAuthoredArticleSchema({
      locale: config.locale,
      author: config.author || "Schwerti",
      dateModified: config.dateModified || new Date().toISOString(),
      publishedDate: config.publishedDate,
    }),
  }
}
```

#### 2.2 Pre-Push Check Script
**Datei:** `scripts/check-dark-theme.ps1`

```powershell
# Check für verbotene Klassen
$forbidden = @("bg-gray-50", "bg-gray-100", "bg-gray-200", "bg-white", "bg-teal-50", "bg-orange-50", "bg-amber-50", "bg-cyan-50", "bg-pink-50", "bg-indigo-50", "text-gray-600", "text-gray-800", "text-blue-600", "text-teal-600")

$files = Get-ChildItem -Path "app\[lang]" -Recurse -Filter "*.tsx"
$issues = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    foreach ($class in $forbidden) {
        if ($content -match $class) {
            $issues += "$($file.FullName): $class gefunden"
        }
    }
}

if ($issues.Count -gt 0) {
    Write-Host "❌ Dark Theme Issues gefunden:" -ForegroundColor Red
    $issues | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
    exit 1
} else {
    Write-Host "✅ Keine Dark Theme Issues" -ForegroundColor Green
}
```

#### 2.3 E-E-A-T Template für neue Seiten
**Datei:** `docs/seo/eeat-template.md`

```markdown
# E-E-A-T Template für neue Seiten

## Imports
```typescript
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"
import { buildAuthoredArticleSchema } from "@/lib/seo/author"
```

## JSX Render
```typescript
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAuthoredArticleSchema({...})) }} />
<AuthorBox locale={locale} variant="full" />
<LastUpdated dateModified="2026-05-04" publishedDate="2026-05-04" />
```

## Checklist
- [ ] AuthorBox gerendert
- [ ] LastUpdated gerendert
- [ ] Article Schema eingebunden
- [ ] Dark Theme Klassen korrekt (bg-gray-800, bg-*-900)
- [ ] Text-Farben korrekt (text-gray-300/400, text-*-300/400)
- [ ] Border-Kontrast korrekt (border-gray-700/800)
```

---

### Phase 3: Bulk Rollout - Priority Categories (Woche 2-3)
**Ziel:** E-E-A-T auf wichtigsten Kategorien rollen

#### 3.1 MOLTbot Priority 1 (Core 10 Slugs)
**Betroffen:** ~320 Seiten (10 Slugs × 32 Locales)  
**Slugs:** moltbot-security-fundamentals, moltbot-threat-modeling-guide, moltbot-iam-hardening, moltbot-network-security, moltbot-data-encryption, moltbot-logging-monitoring, moltbot-compliance-framework, moltbot-incident-response, moltbot-backup-recovery, moltbot-security-automation

**Prozess:**
1. Template auf alle 10 Slugs anwenden
2. Review und Test
3. Commit pro Slug (10 Commits)

#### 3.2 OPENCLAW_SLUGS (alle 20 Slugs)
**Betroffen:** ~640 Seiten (20 Slugs × 32 Locales)  
**Prozess:**
1. Bulk Apply mit Script
2. Stichproben-Review (3-5 Slugs)
3. Commit als Bundle (1-2 Commits)

#### 3.3 SOLUTIONS_SLUGS (alle 30 Slugs)
**Betroffen:** ~960 Seiten (30 Slugs × 32 Locales)  
**Prozess:**
1. Bulk Apply mit Script
2. Stichproben-Review (5-8 Slugs)
3. Commit als Bundle (2-3 Commits)

---

### Phase 4: Bulk Rollout - Secondary Categories (Woche 3-4)
**Ziel:** E-E-A-T auf restlichen Content-Kategorien rollen

#### 4.1 SECURITY_SLUGS (alle 28 Slugs)
**Betroffen:** ~896 Seiten (28 Slugs × 32 Locales)  
**Prozess:**
1. Bulk Apply mit Script
2. Stichproben-Review (8-10 Slugs)
3. Commit als Bundle (2-3 Commits)

#### 4.2 COMPARE_SLUGS (alle 32 Slugs)
**Betroffen:** ~1.024 Seiten (32 Slugs × 32 Locales)  
**Prozess:**
1. Bulk Apply mit Script
2. Stichproben-Review (10-12 Slugs)
3. Commit als Bundle (2-3 Commits)

---

### Phase 5: Enhancement & Polish (Woche 4-6)
**Ziel:** Interaktivität und verbleibende Kategorien

#### 5.1 Interactive Checklist auf SECURITY_SLUGS
**Problem:** Viele Seiten haben nur statischen Content  
**Lösung:** Interactive Checklist Component wiederverwenden

```typescript
// Component: components/seo/InteractiveChecklist.tsx
// Wiederverwendbare Checklist mit Checkboxen und Score
```

#### 5.2 GEO_QUALITY_SLUGS Audit
**Betroffen:** ~1.600 Seiten (50 Slugs × 32 Locales)  
**Prozess:**
1. Audit auf E-E-A-T und Content-Tiefe
2. Priority Slugs (Berlin, München, Hamburg, etc.)
3. Rollout auf Priority Slugs

#### 5.3 Academy ∞ E-E-A-T Rollout
**Betroffen:** ~500+ Seiten (Missions, Breaches, Tools, CVEs)  
**Prozess:**
1. Mission Pages Priority 1
2. Breach Scenarios Priority 2
3. Tools & CVEs Priority 3

#### 5.4 Runbooks E-E-A-T Rollout
**Betroffen:** ~2.000+ Seiten  
**Prozess:**
1. Bulk Apply mit Script (da sehr viele)
2. Stichproben-Review (20-30 Slugs)
3. Commit als Bundle (5-10 Commits)

---

## Rollout-Strategie

### Commit-Hygiene (AGENTS.md Rule 6)
- **Single Concern:** Jeder Commit = eine Kategorie oder ein Slug
- **No Mega-Bundles:** Nicht 100+ Dateien in einem Commit
- **Staged Files:** Nur relevante Files stagen, nicht `git add -A`

### Testing & Verification
1. **Pre-Push Check:** `scripts/check-dark-theme.ps1` muss passieren
2. **Lighthouse Score:** Nach jedem Bundle auf 3-5 Seiten testen
3. **Schema Validator:** Google Rich Results Test auf Stichproben

### Rollback-Plan
- Git Branch pro Phase (`quality-phase-1`, `quality-phase-2`, etc.)
- Merge erst nach Verification
- Rollback mit `git revert` falls Probleme

---

## Zeitplan

| Woche | Phase | Deliverables |
|-------|-------|--------------|
| Woche 1 | Phase 1 | Dark Theme Fixes, Title Bug, bg-orange-50 Bug |
| Woche 1-2 | Phase 2 | E-E-A-T Helper, Pre-Push Script, Template |
| Woche 2-3 | Phase 3 | Moltbot Priority 1, OpenClaw, Solutions |
| Woche 3-4 | Phase 4 | Security, Compare |
| Woche 4-6 | Phase 5 | Interactive Checklist, Geo, Academy, Runbooks |

**Gesamtdauer:** 6 Wochen  
**Erwarteter Score-Anstieg:** 68-75/100 → 85-90/100

---

## Erfolgsmessung

### KPIs
- **Durchschnitts-Score:** 68-75/100 → 85-90/100
- **E-E-A-T Coverage:** 10% → 90%+
- **Dark Theme Compliance:** 70% → 99%+
- **Lighthouse Performance:** 85+ → 90+

### Verification
- Weekly Lighthouse Audit auf 10 Stichproben
- Schema Validation auf 5 Stichproben pro Woche
- Google Search Console Monitoring (Impressions, CTR)

---

## Risiken & Mitigation

### Risiko 1: Bulk Rollout bricht Build
**Mitigation:** 
- Phase 1-4 auf Branch testen
- Lint/Build Check vor Merge

### Risiko 2: Schema Validation Errors
**Mitigation:**
- Google Rich Results Test auf Stichproben
- Schema.org Validator Integration

### Risiko 3: Performance Impact
**Mitigation:**
- Lighthouse Performance Monitoring
- Keine schweren Components hinzufügen

### Risiko 4: I18n Issues
**Mitigation:**
- pick() für alle Titles/Descriptions
- Manual Review auf DE/EN Stichproben
