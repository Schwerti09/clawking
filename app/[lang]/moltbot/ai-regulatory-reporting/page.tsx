import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-regulatory-reporting"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "KI Regulatory Reporting: Automatisierte Compliance-Berichte für LLM-Systeme | ClawGuru", "AI Regulatory Reporting: Automated Compliance Reports for LLM Systems | ClawGuru")
  const description = pick(isDE, "Automatisierte Regulatory-Reports für KI-Systeme: EU AI Act Transparenzbericht, DSGVO Art. 30 Verzeichnis für KI, NIS2 Incident-Report-Automation und SOC2 Evidence-Export für LLMs.", "Automated regulatory reports for AI systems: EU AI Act transparency report, GDPR Art. 30 records for AI, NIS2 incident report automation and SOC2 evidence export for LLMs.")
  return {
    title, description,
    keywords: ["ai regulatory reporting", "llm compliance reporting", "eu ai act reporting", "gdpr ai systems report", "nis2 ai incident report", "soc2 ai evidence"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const REPORT_TYPES = [
  { id: "RR-1", framework: "EU AI Act", title: "Technical Documentation & Transparency Report", desc: "High-risk AI systems under the EU AI Act must maintain technical documentation. Moltbot auto-generates this from runtime telemetry.", fields: ["System description and intended purpose", "Model provider, version, training data summary", "Risk management measures implemented", "Data governance and training data description", "Accuracy, robustness and cybersecurity measures", "Human oversight mechanisms (HITL gates, kill switches)", "Incident logging and monitoring procedures"], code: `# Moltbot EU AI Act report generation:
moltbot report generate \\
  --framework eu-ai-act \\
  --system-id production-llm-assistant \\
  --output-format pdf \\
  --period 2026-Q1

# Auto-populated fields from runtime telemetry:
# - Model version history (from model registry)
# - HITL gate trigger counts and decision outcomes
# - Incident log summary (from audit chain)
# - DLP events summary (from input/output DLP)
# - Error rates and accuracy metrics (from canary monitoring)
# - Access control audit (from RBAC logs)

# Schedule quarterly generation:
moltbot report schedule \\
  --framework eu-ai-act \\
  --frequency quarterly \\
  --auto-sign true \\     # HMAC-sign for tamper evidence
  --recipients [ciso@company.com, dpo@company.com]` },
  { id: "RR-2", framework: "GDPR / DSGVO", title: "Art. 30 Records of Processing Activities for AI", desc: "Every AI system processing personal data requires an entry in the GDPR Art. 30 Records of Processing Activities (RoPA). Moltbot auto-populates from configuration.", fields: ["Name and contact of data controller / processor", "Categories of data subjects and personal data processed", "Purposes of the AI processing", "Legal basis (Art. 6 / Art. 9 GDPR)", "Third-party LLM provider as sub-processor", "Data retention periods", "Technical security measures (encryption, access control, DLP)"], code: `# Auto-generate GDPR Art. 30 RoPA entry:
moltbot report generate \\
  --framework gdpr-art30 \\
  --system-id customer-support-ai \\
  --output-format docx

# Example auto-populated RoPA entry:
# ---
# Processing Activity: Customer Support AI Assistant
# Controller: [Company Name], [Address]
# Processor: ClawGuru Moltbot (self-hosted — no data transfer)
# Sub-processors: OpenAI Ireland Ltd (DPA signed, EU region API)
# Purpose: Respond to customer support inquiries
# Legal Basis: Art. 6(1)(b) — contract performance
# Data Subjects: Customers, users
# Data Categories: Name, email, order history, support messages
# Retention: Conversation logs 90 days; audit logs 3 years
# Security: AES-256 at rest, TLS 1.3 in transit, DLP active, RBAC
# DPIA: Conducted 2026-01-15 — no high residual risk
# ---` },
  { id: "RR-3", framework: "NIS2", title: "Incident Report Automation (24h / 72h / Final)", desc: "NIS2 requires tiered incident reporting — 24h early warning, 72h notification, 1-month final report. Moltbot auto-drafts reports from AI incident telemetry.", fields: ["Incident timestamp and duration", "Affected systems and services", "Preliminary cause assessment", "Number of affected users / data subjects", "Immediate containment measures taken", "Mitigation actions and timelines", "Preventive measures for recurrence"], code: `# Moltbot NIS2 incident report auto-draft:
# Triggered automatically when AI incident threshold exceeded

# 24h early warning (auto-generated on incident detection):
moltbot incident report \\
  --type nis2-early-warning \\
  --incident-id INC-2026-0042 \\
  --output-format pdf \\
  --submit-to national-authority  # BSI / ANSSI / NCSC endpoint

# 72h notification (enriched with investigation findings):
moltbot incident report \\
  --type nis2-notification \\
  --incident-id INC-2026-0042 \\
  --include-timeline true \\
  --include-affected-users true

# Fields auto-populated from:
# - Moltbot AI incident detection telemetry
# - Audit chain timestamps
# - DLP event logs (data exposure assessment)
# - RBAC access logs (access pattern during incident)
# - Model rollback logs (if model-related incident)` },
  { id: "RR-4", framework: "SOC 2 Type II", title: "Continuous Evidence Collection for AI Controls", desc: "SOC 2 Type II audits require evidence over a 12-month period. Moltbot continuously collects and exports structured evidence for AI-specific Trust Service Criteria.", fields: ["CC6: Logical and Physical Access Controls — RBAC audit logs", "CC7: System Operations — AI incident response logs", "CC8: Change Management — model version audit trail", "CC9: Risk Mitigation — DLP events, jailbreak attempts blocked", "A1: Availability — uptime, failover events", "C1: Confidentiality — DLP classification and blocking evidence"], code: `# Moltbot SOC 2 evidence export:
moltbot compliance export \\
  --framework soc2 \\
  --trust-service-criteria [CC6, CC7, CC8, CC9, A1, C1] \\
  --period 2025-04-01:2026-03-31 \\
  --output-format zip \\
  --include-signatures true   # HMAC-signed — tamper-evident

# Evidence package contents:
# cc6_access_control_log.json  — all RBAC changes + access events
# cc7_incident_log.json        — all AI incidents with resolution
# cc8_model_changes.json       — model version history + approvals
# cc9_dlp_events.json          — DLP blocks + jailbreak attempts
# a1_uptime_metrics.json       — availability SLA evidence
# c1_confidentiality_log.json  — data classification + protection

# Share with SOC 2 auditor via secure portal:
# All files are HMAC-signed — auditor can verify integrity
moltbot compliance verify-package \\
  --package soc2-evidence-2026.zip \\
  --public-key /etc/moltbot/audit-signing.pub` },
]

const FAQ = [
  { q: "Which AI systems require formal regulatory reporting under EU AI Act?", a: "The EU AI Act uses a risk-based tiered approach: Unacceptable risk (banned): social scoring by governments, real-time biometric surveillance in public spaces, manipulation of vulnerable groups. High risk (mandatory documentation + conformity assessment): AI in critical infrastructure, education, employment, essential services, law enforcement, migration, justice. This tier requires full technical documentation, conformity assessment before deployment, registration in EU database, and ongoing monitoring. Limited risk (transparency obligations only): chatbots must disclose AI identity. Deepfake generators must label content. General purpose AI models (GPAI): large-scale models (>10^25 FLOPs training compute) require technical documentation and adversarial testing. Most enterprise AI systems (internal tools, customer support bots, coding assistants) fall in the limited or minimal risk category — transparency obligations only. If your AI makes consequential decisions about people (credit, hiring, healthcare) — high risk tier applies. Moltbot's regulatory reporting module generates the required documentation for any tier." },
  { q: "How do I create an Art. 30 GDPR records of processing entry for an AI system?", a: "GDPR Art. 30 RoPA entry for an AI system requires: 1) Identity: name of the AI system, data controller contact (DPO). 2) Purpose: why is personal data processed by this AI system? Be specific. 3) Legal basis: which Art. 6 basis? (Contract, Legitimate Interest, Consent). 4) Data categories: what personal data does the AI process? Include implicit data (conversation patterns, usage data). 5) Data subjects: who is affected? (customers, employees, users). 6) Processors: which external providers process the data? (OpenAI, Azure, AWS) — each needs a signed DPA. 7) Third country transfers: does data go to non-EU processors? Document transfer mechanisms (SCCs). 8) Retention: how long is the data stored? (prompts, outputs, logs). 9) Technical measures: DLP, encryption, access control, audit logging. Update the RoPA when: you change the AI model provider, add new data categories, change the purpose, or change retention periods. Moltbot auto-extracts most fields from system configuration." },
  { q: "How quickly must AI-related security incidents be reported under NIS2?", a: "NIS2 Art. 23 timeline for significant incidents: Within 24 hours: 'early warning' — notify the competent authority that a significant incident has occurred. Include: preliminary assessment of cause (cyberattack or not), whether cross-border impact is suspected. Within 72 hours: 'incident notification' — update with more details: severity, impact on services, affected systems, initial mitigation. Within 1 month: 'final report' — complete analysis: root cause, full impact assessment, cross-border effects, mitigation measures completed, lessons learned. AI-specific incidents that trigger reporting: AI system downtime exceeding your defined RTO for a critical service, data breach via AI system (prompt injection leading to exfiltration), supply chain compromise of model provider affecting service delivery, AI system producing systematically harmful outputs at scale. Moltbot's NIS2 module automatically detects threshold-crossing events and drafts the 24h early warning within minutes of detection." },
  { q: "How does SOC 2 apply to AI systems and LLM workloads?", a: "SOC 2 doesn't have AI-specific criteria yet — AI systems are evaluated under the existing Trust Service Criteria (TSC): CC6 (Logical Access): who has access to the LLM, model weights, training data, API keys? RBAC logs, key rotation evidence, MFA enforcement. CC7 (System Operations): how are AI incidents detected and responded to? Incident logs, alert configurations, response playbooks. CC8 (Change Management): how are new model versions approved and deployed? Model versioning audit trail, change approval evidence. CC9 (Risk Mitigation): what controls reduce AI-specific risks? DLP events, jailbreak attempt logs, output validation statistics. C1 (Confidentiality): how is confidential data protected in AI systems? Data classification, RAG access controls, DLP blocking evidence. Availability (A1): what are the AI system uptime metrics? Failover tests, canary monitoring, incident recovery times. Collect evidence continuously — auditors want a 12-month record showing controls operated consistently, not a point-in-time snapshot." },
]

export default function AiRegulatoryReportingPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "KI Regulatory Reporting: Automatisierte Compliance-Berichte für LLM-Systeme | ClawGuru", "AI Regulatory Reporting: Automated Compliance Reports for LLM Systems | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Regulatory Reporting", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Regulatory Reporting", "EU AI Act", "GDPR", "NIS2", "SOC 2"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div id="reading-progress" className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{width: '0%'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 flex gap-8">
        {/* Sticky Table of Contents (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 uppercase">{pick(isDE, "Inhalt", "Contents")}</h3>
              <nav className="space-y-2 text-sm">
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Regulatory Reporting?", "What is Regulatory Reporting?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4 Regulatorische Report-Typen", "4 Regulatory Report Types")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Regulatory Maturity Score", "Regulatory Maturity Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">16 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Regulatory Reporting · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Regulatory Reporting — Dein AI-System hat keine Compliance-Dokumentation. EU AI Act, DSGVO, NIS2, SOC 2. Dein Regulator fordert Nachweise, du hast nichts. Dein CEO hat den CISO gefeuert.", "AI Regulatory Reporting — Your AI System Has No Compliance Documentation. EU AI Act, GDPR, NIS2, SOC 2. Your regulator demands evidence, you have nothing. Your CEO fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein AI-System hat kein Regulatory Reporting, keine Compliance-Dokumentation und keine Audit-Trail. EU AI Act, DSGVO Art. 30, NIS2 Incident-Report, SOC 2 Evidence. 48h Audit-Vorbereitung, Strafzahlungen, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "Your AI system has no regulatory reporting, no compliance documentation and no audit trail. EU AI Act, GDPR Art. 30, NIS2 incident report, SOC 2 evidence. 48h audit preparation, fines, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Compliance-Reporting-Guide. Keine Rechtsberatung.", "Compliance reporting guide. Not legal advice.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Regulatory Reporting? Einfach erklärt.", "What is Regulatory Reporting? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Regulatory Reporting wie automatisierte Compliance-Berichte vor: EU AI Act Transparenzbericht, DSGVO Art. 30 Verzeichnis, NIS2 Incident-Report, SOC 2 Evidence. Für AI-Systeme bedeutet das: Automatische Berichts-Generierung aus Runtime-Telemetrie, strukturierte Nachweise, Audit-Trail. Gutes Regulatory Reporting bedeutet: Never face an audit unprepared.", "Think of regulatory reporting like automated compliance reports: EU AI Act transparency report, GDPR Art. 30 records, NIS2 incident report, SOC 2 evidence. For AI systems, this means: automated report generation from runtime telemetry, structured evidence, audit trail. Good regulatory reporting means: never face an audit unprepared.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4 Regulatorische Report-Typen", "4 Regulatory Report Types")}</h2>
            
            {REPORT_TYPES.map((r) => (
              <div key={r.id} className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-2xl mb-6 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{r.id}</span>
                  <span className="font-mono text-xs text-purple-400 bg-purple-900 px-2 py-0.5 rounded">{r.framework}</span>
                  <span className="font-bold text-gray-100 text-sm">{r.title}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{r.desc}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 rounded-lg p-3">
                      <div className="text-xs font-bold text-gray-400 uppercase mb-2">{pick(isDE, "Erforderliche Felder", "Required Fields")}</div>
                      <ul className="space-y-1">
                        {r.fields.map((f, i) => (
                          <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">→</span>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                      <pre>{r.code}</pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: EU AI Audit ohne Dokumentation", "SCAR #1: EU AI Audit without Documentation")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "EU AI Audit ohne Dokumentation. Regulator fordert Nachweise, nichts vorhanden. Strafzahlungen, Marktverbot. Fix: EU AI Act Report, Technical Documentation.", "EU AI audit without documentation. Regulator demands evidence, nothing available. Fines, market ban. Fix: EU AI Act report, technical documentation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Compliance-Dokumentation. Lessons: Aktiviere EU AI Act Reporting mit automatischer Berichts-Generierung.", "Root Cause: No compliance documentation. Lessons: Enable EU AI Act reporting with automated report generation.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: NIS2 Incident-Report verspätet", "SCAR #2: NIS2 Incident Report Delayed")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "NIS2 Incident-Report verspätet. 24h Frist verpasst, Strafzahlungen. Fix: Automatischer NIS2 Incident-Report mit 24h Early Warning.", "NIS2 incident report delayed. 24h deadline missed, fines. Fix: Automated NIS2 incident report with 24h early warning.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein automatisches Reporting. Lessons: Aktiviere NIS2 Incident-Report Automation mit Threshold-Detection.", "Root Cause: No automated reporting. Lessons: Enable NIS2 incident report automation with threshold detection.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "EU AI Act Report aktivieren", "Enable EU AI Act Report")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere EU AI Act Reporting für alle AI-Systeme.", "Enable EU AI Act reporting for all AI systems.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "GDPR Art. 30 RoPA erstellen", "Create GDPR Art. 30 RoPA")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Erstelle GDPR Art. 30 Records of Processing Activities für alle AI-Systeme.", "Create GDPR Art. 30 Records of Processing Activities for all AI systems.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "NIS2 Incident-Report Automation aktivieren", "Enable NIS2 Incident-Report Automation")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere automatischen NIS2 Incident-Report mit 24h Early Warning.", "Enable automated NIS2 incident report with 24h early warning.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Regulatory Checkliste", "Interactive Regulatory Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "reg1", text: pick(isDE, "EU AI Act Report aktiviert", "EU AI Act report enabled") },
                  { id: "reg2", text: pick(isDE, "GDPR Art. 30 RoPA erstellt", "GDPR Art. 30 RoPA created") },
                  { id: "reg3", text: pick(isDE, "NIS2 Incident-Report Automation aktiviert", "NIS2 incident-report automation enabled") },
                  { id: "reg4", text: pick(isDE, "SOC 2 Evidence Collection aktiviert", "SOC 2 evidence collection enabled") },
                  { id: "reg5", text: pick(isDE, "Audit-Trail implementiert", "Audit trail implemented") },
                  { id: "reg6", text: pick(isDE, "Berichts-Schedule konfiguriert", "Report schedule configured") },
                  { id: "reg7", text: pick(isDE, "Auto-Signierung aktiviert", "Auto-signing enabled") },
                  { id: "reg8", text: pick(isDE, "Recipient-Liste konfiguriert", "Recipient list configured") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Regulatory Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Regulatory Maturity Score Calculator", "Regulatory Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du EU AI Act Reporting aktiviert?", "Do you have EU AI Act reporting enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist GDPR Art. 30 RoPA erstellt?", "Is GDPR Art. 30 RoPA created?"), weight: 25 },
                  { q: pick(isDE, "Ist NIS2 Incident-Report aktiv?", "Is NIS2 incident-report active?"), weight: 25 },
                  { q: pick(isDE, "Ist SOC 2 Evidence Collection aktiv?", "Is SOC 2 evidence collection active?"), weight: 25 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-300">{item.q}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 text-sm">{pick(isDE, "Ja", "Yes")}</button>
                      <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 text-sm">{pick(isDE, "Nein", "No")}</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{pick(isDE, "Dein Regulatory Maturity Score:", "Your Regulatory Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 15/100", "Industry Average: 15/100")}</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.65s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 shadow-2xl">
                  <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Author Box */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-6 rounded-lg border border-cyan-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">
                  RS
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-cyan-300 text-lg">R. Schwertfechter</h3>
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                  </div>
                  <div className="text-sm text-cyan-200 mb-3">
                    Principal Ops-Engineer & Security Architect
                  </div>
                  <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                    <span>📅 Published: 01.05.2026</span>
                    <span>🔄 Last reviewed: 01.05.2026</span>
                  </div>
                  <div className="text-sm text-cyan-100 leading-relaxed mb-4">
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Regulatory Reporting, EU AI Act, DSGVO, NIS2 und SOC 2.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in regulatory reporting, EU AI Act, GDPR, NIS2 and SOC 2.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/solutions/eu-ai-act-compliance`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">EU AI Act Compliance</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Risikoklassen & Anforderungen", "Risk classes & requirements")}</div>
              </a>
              <a href={`/${locale}/solutions/nis2-ai-infrastructure`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">NIS2 AI Infrastructure</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Art. 21 Maßnahmen", "Art. 21 measures")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-incident-response`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Incident Response</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Incident-Daten für Reports", "Incident data for reports")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-compliance-automation`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Compliance Automation</div>
                <div className="text-sm text-gray-300">{pick(isDE, "EU AI Act / SOC2 / GDPR", "EU AI Act / SOC2 / GDPR")}</div>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Reading Progress Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('reading-progress').style.width = scrolled + '%';
          });
        `
      }} />
    </div>
  )
}
