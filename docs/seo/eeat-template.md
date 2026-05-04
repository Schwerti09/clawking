# E-E-A-T Template für neue Seiten

Quality Improvement Master Plan - Phase 2.3

## Übersicht

Dieses Template zeigt, wie E-E-A-T (Experience, Expertise, Authoritativeness, Trust) auf neue Seiten angewendet wird. Es basiert auf den existierenden Komponenten und dem E-E-A-T Helper.

## Komponenten

### 1. AuthorBox

Zeigt den Autor mit Name, Jobtitel, Bio und Link zur About-Seite.

```tsx
import AuthorBox from "@/components/seo/AuthorBox"

// Im JSX:
<AuthorBox
  locale={locale}
  variant="full"  // oder "compact"
  className="mb-6"
/>
```

### 2. LastUpdated

Zeigt das Aktualisierungsdatum (optional auch Veröffentlichungsdatum).

```tsx
import LastUpdated from "@/components/seo/LastUpdated"

// Im JSX:
<LastUpdated
  date="2026-05-04"
  publishedDate="2026-05-04"
  locale={locale}
  showPublished={true}
  className="mb-4"
/>
```

### 3. Article Schema (JSON-LD)

Strukturierte Daten für Google Rich Results.

```tsx
import { buildAuthoredArticleSchema } from "@/lib/seo/author"

// In generateMetadata oder als <script> Tag:
const articleSchema = buildAuthoredArticleSchema({
  headline: title,
  description: description,
  url: `https://clawguru.org/${locale}/${slug}`,
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
  articleType: "TechArticle",
  inLanguage: locale,
})

// Im JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
/>
```

## Vollständiges Beispiel mit E-E-A-T Helper

Der E-E-A-T Helper (`lib/seo/eeat-helper.tsx`) vereinfacht die Integration:

```tsx
import { setupEEAT } from "@/lib/seo/eeat-helper"

export default function Page({ params }: { params: { lang: string } }) {
  const locale = params.lang

  const { authorBox, lastUpdated, articleSchemaJson } = setupEEAT({
    locale,
    headline: locale === "de" ? "Linux Hardening 2026" : "Linux Hardening 2026",
    description: locale === "de" ? "Komplette Hardening-Checkliste" : "Complete Security Checklist",
    url: `https://clawguru.org/${locale}/linux-hardening`,
    datePublished: "2026-05-04",
    dateModified: "2026-05-04",
    variant: "full",
    showPublished: true,
  })

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchemaJson) }}
      />
      <h1>Linux Hardening 2026</h1>
      {lastUpdated}
      <p>Komplette Hardening-Checkliste...</p>
      {authorBox}
    </div>
  )
}
```

## Best Practices

### Placement

- **Article Schema**: Als erstes `<script>` Tag im `<head>` oder ganz oben im JSX
- **LastUpdated**: Direkt nach dem `<h1>` oder im Header-Bereich
- **AuthorBox**: Am Ende des Inhalts (before footer) oder in der Sidebar

### Dates

- `datePublished`: Erstellungsdatum der Seite
- `dateModified`: Letztes Aktualisierungsdatum
- Beide im ISO 8601 Format: `YYYY-MM-DD`
- Bei neuen Seiten: `datePublished = dateModified`

### Locale

- `locale` muss mit der aktuellen Sprache übereinstimmen
- Für DE: `locale = "de"`, für EN: `locale = "en"`
- `inLanguage` im Schema muss gleich sein

### Variant

- `variant="full"`: Vollständige AuthorBox mit Avatar, Bio, Link
- `variant="compact"`: Kompakte AuthorBox mit nur Name und Link
- Empfohlen für lange Inhalte: `full`
- Empfohlen für kurze Inhalte/Listen: `compact`

### Schema Type

- `TechArticle`: Für technische Guides, Hardening, Security
- `Article`: Für allgemeine Blog-Posts
- `NewsArticle`: Für News/Updates

## Integration in generateMetadata

Für Seiten mit `generateMetadata`:

```tsx
import { buildEEATArticleSchema } from "@/lib/seo/eeat-helper"

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const locale = params.lang as Locale

  const articleSchema = buildEEATArticleSchema({
    headline: locale === "de" ? "Linux Hardening 2026" : "Linux Hardening 2026",
    description: locale === "de" ? "Komplette Hardening-Checkliste" : "Complete Security Checklist",
    url: `https://clawguru.org/${locale}/linux-hardening`,
    datePublished: "2026-05-04",
    dateModified: "2026-05-04",
    locale,
    articleType: "TechArticle",
  })

  return {
    title: locale === "de" ? "Linux Hardening 2026" : "Linux Hardening 2026",
    description: locale === "de" ? "Komplette Hardening-Checkliste" : "Complete Security Checklist",
    other: {
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}
```

## Checkliste für neue Seiten

- [ ] AuthorBox importieren und rendern
- [ ] LastUpdated importieren und rendern
- [ ] Article Schema (JSON-LD) hinzufügen
- [ ] `datePublished` und `dateModified` setzen
- [ ] `locale` korrekt übergeben
- [ ] `inLanguage` im Schema setzen
- [ ] Schema Type wählen (TechArticle/Article/NewsArticle)
- [ ] Pre-Push Check ausführen: `powershell -ExecutionPolicy Bypass -File scripts/check-dark-theme.ps1`

## Referenzen

- AGENTS.md - Rule 6: Dark Theme Design System
- lib/seo/author.ts - Author & Organization Daten
- lib/seo/eeat-helper.tsx - E-E-A-T Helper
- components/seo/AuthorBox.tsx - AuthorBox Komponente
- components/seo/LastUpdated.tsx - LastUpdated Komponente
