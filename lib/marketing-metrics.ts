/**
 * Single source of truth for all marketing statistics and numbers
 * Used across pricing pages, emergency pages, team pages, and all marketing copy
 * Update here once, and all pages automatically stay in sync
 */

export const MARKETING_METRICS = {
  // Content & Knowledge Base
  runbooksCount: "EU-Hosted",
  cveFixGuides: "30+",
  indexedPages: "25k+",
  knowledgeNodes: "1M+",
  highQualityPages: "250+",

  // Platform Scope
  languagesSupported: 16,
  toolsCovered: "500+",

  // Team & Experience
  yearsExperience: "15+",
  specialistsCount: "10+",

  // Service Level
  incidentResponse: "24/7",

  // Events & Community
  summitAttendees: "500+",
  virtualAttendees: "1,000+",
  conferencePeakAttendees: "300+",

  // For display formatting
  formatNumber: (value: string | number): string => {
    if (typeof value === "number") {
      return value.toLocaleString("de-DE")
    }
    return value
  },
} as const

/**
 * Helper for consistent stat display in cards/sections
 */
export function formatStat(label: string, value: string | number, locale: "de" | "en" = "de"): { label: string; value: string } {
  const formattedValue = MARKETING_METRICS.formatNumber(value)
  return { label, value: formattedValue }
}
