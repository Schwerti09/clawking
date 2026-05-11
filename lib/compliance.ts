// lib/compliance.ts
// Single Source of Truth for ClawGuru's compliance status.
// ALL pages, components, and marketing surfaces MUST import from here.
// Never hardcode compliance claims — import from this file.
//
// Last updated: 11.05.2026
// Why: Homepage said "SOC2 & ISO 27001 Aligned", Pricing said "geplant H2 2026".
// Enterprise buyers open both tabs. Contradiction = deal killer.

export const COMPLIANCE_STATUS = {
  // ── IMPLEMENTED (can claim today) ─────────────────────────────
  gdpr: {
    status: "implemented" as const,
    label_de: "DSGVO Art. 25 & 32 umgesetzt",
    label_en: "GDPR Art. 25 & 32 implemented",
    detail_de: "Privacy by Design, Verschlüsselung at rest (AES-256) und in transit (TLS 1.3)",
    detail_en: "Privacy by Design, encryption at rest (AES-256) and in transit (TLS 1.3)",
  },
  euHosting: {
    status: "implemented" as const,
    label_de: "Alle Daten in Frankfurt (EU)",
    label_en: "All data in Frankfurt (EU)",
    detail_de: "Kein Datentransfer in Drittländer. Hosting: Hetzner/Vercel EU.",
    detail_en: "No data transfer to third countries. Hosting: Hetzner/Vercel EU.",
  },
  auditTrail: {
    status: "implemented" as const,
    label_de: "Audit-Trail für jede Aktion",
    label_en: "Audit trail for every action",
  },
  encryption: {
    status: "implemented" as const,
    label_de: "AES-256 at rest, TLS 1.3 in transit",
    label_en: "AES-256 at rest, TLS 1.3 in transit",
  },

  // ── IN PROGRESS (can claim timeline, not status) ──────────────
  soc2: {
    status: "in_progress" as const,
    target: "Q3 2026",
    label_de: "SOC 2 Type II Audit: Q3 2026",
    label_en: "SOC 2 Type II Audit: Q3 2026",
  },
  iso27001: {
    status: "in_progress" as const,
    target: "H2 2026",
    label_de: "ISO 27001 Zertifizierung: H2 2026",
    label_en: "ISO 27001 Certification: H2 2026",
  },
  pentest: {
    status: "in_progress" as const,
    label_de: "Pentest-Report auf Anfrage verfügbar",
    label_en: "Pentest report available on request",
  },
} as const

export type ComplianceKey = keyof typeof COMPLIANCE_STATUS

// Short trust block for pricing pages and comparison pages (max ~80 words)
export function complianceTrustBlock(locale: string): { today: string[]; upcoming: string[] } {
  const isDE = locale === "de"
  return {
    today: [
      isDE ? COMPLIANCE_STATUS.gdpr.label_de : COMPLIANCE_STATUS.gdpr.label_en,
      isDE ? COMPLIANCE_STATUS.euHosting.label_de : COMPLIANCE_STATUS.euHosting.label_en,
      isDE ? COMPLIANCE_STATUS.encryption.label_de : COMPLIANCE_STATUS.encryption.label_en,
      isDE ? COMPLIANCE_STATUS.auditTrail.label_de : COMPLIANCE_STATUS.auditTrail.label_en,
    ],
    upcoming: [
      isDE ? COMPLIANCE_STATUS.soc2.label_de : COMPLIANCE_STATUS.soc2.label_en,
      isDE ? COMPLIANCE_STATUS.iso27001.label_de : COMPLIANCE_STATUS.iso27001.label_en,
      isDE ? COMPLIANCE_STATUS.pentest.label_de : COMPLIANCE_STATUS.pentest.label_en,
    ],
  }
}
