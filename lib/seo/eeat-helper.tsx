/**
 * E-E-A-T Helper - Centralisiertes Rendering von AuthorBox, LastUpdated und Article Schema
 * 
 * Quality Improvement Master Plan - Phase 2.1
 * Ziel: Skalierbares E-E-A-T für Bulk Rollout über alle Kategorien
 */

import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"
import { buildAuthoredArticleSchema, DEFAULT_AUTHOR, type Author } from "@/lib/seo/author"

export interface EEATConfig {
  locale: string
  author?: Author
  dateModified?: string | Date
  publishedDate?: string | Date
  variant?: "full" | "compact"
  showPublished?: boolean
  className?: string
}

export interface EEATSchemaConfig {
  headline: string
  description: string
  url: string
  datePublished: string | Date
  dateModified?: string | Date
  image?: string
  articleType?: "Article" | "TechArticle" | "NewsArticle"
  author?: Author
  inLanguage?: string
}

/**
 * Render E-E-A-T Komponenten für eine Seite
 * 
 * @example
 * const { authorBox, lastUpdated, articleSchema } = renderEEAT({
 *   locale: "de",
 *   dateModified: "2026-05-04",
 *   publishedDate: "2026-05-04",
 *   variant: "full"
 * })
 */
export function renderEEAT(config: EEATConfig) {
  const {
    locale = "de",
    author = DEFAULT_AUTHOR,
    dateModified,
    publishedDate,
    variant = "full",
    showPublished = false,
    className = ""
  } = config

  return {
    authorBox: (
      <AuthorBox
        locale={locale}
        author={author}
        variant={variant}
        className={className}
      />
    ),
    lastUpdated: dateModified ? (
      <LastUpdated
        date={dateModified}
        publishedDate={publishedDate}
        locale={locale}
        showPublished={showPublished}
        className={className}
      />
    ) : null,
  }
}

/**
 * Build Article Schema mit E-E-A-T Daten
 * 
 * @example
 * const schema = buildEEATArticleSchema({
 *   headline: "Linux Hardening 2026",
 *   description: "Komplette Hardening-Checkliste",
 *   url: "https://clawguru.org/de/linux-hardening",
 *   datePublished: "2026-05-04",
 *   dateModified: "2026-05-04",
 *   locale: "de"
 * })
 */
export function buildEEATArticleSchema(config: EEATSchemaConfig & { locale?: string }) {
  const {
    headline,
    description,
    url,
    datePublished,
    dateModified,
    image,
    articleType = "TechArticle",
    author = DEFAULT_AUTHOR,
    inLanguage,
    locale,
  } = config

  const datePublishedISO = typeof datePublished === "string" ? datePublished : datePublished.toISOString()
  const dateModifiedISO = dateModified 
    ? (typeof dateModified === "string" ? dateModified : dateModified.toISOString())
    : datePublishedISO

  return buildAuthoredArticleSchema({
    headline,
    description,
    url,
    datePublished: datePublishedISO,
    dateModified: dateModifiedISO,
    image,
    articleType,
    author,
    inLanguage: inLanguage ?? locale ?? "de",
  })
}

/**
 * Vollständiges E-E-A-T Setup für eine Seite
 * Gibt sowohl JSX Komponenten als auch JSON-LD Schema zurück
 * 
 * @example
 * const { authorBox, lastUpdated, articleSchemaJson } = setupEEAT({
 *   headline: "Linux Hardening 2026",
 *   description: "Komplette Hardening-Checkliste",
 *   url: "https://clawguru.org/de/linux-hardening",
 *   locale: "de",
 *   dateModified: "2026-05-04"
 * })
 * 
 * // Im JSX:
 * // <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchemaJson) }} />
 * // {authorBox}
 * // {lastUpdated}
 */
export function setupEEAT(config: EEATConfig & EEATSchemaConfig & { url: string }) {
  const { locale, url, headline, description, datePublished, dateModified, image, articleType, author, variant, showPublished, className } = config

  const { authorBox, lastUpdated } = renderEEAT({
    locale,
    author,
    dateModified,
    publishedDate: datePublished,
    variant,
    showPublished,
    className,
  })

  const articleSchemaJson = buildEEATArticleSchema({
    headline,
    description,
    url,
    datePublished: datePublished ?? dateModified ?? new Date(),
    dateModified,
    image,
    articleType,
    author,
    inLanguage: locale,
  })

  return {
    authorBox,
    lastUpdated,
    articleSchemaJson,
  }
}
