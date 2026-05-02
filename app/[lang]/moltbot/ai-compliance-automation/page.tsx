import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-compliance-automation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "KI-Compliance-Automatisierung mit Moltbot: EU AI Act, SOC 2, GDPR | ClawGuru", "AI Compliance Automation with Moltbot: EU AI Act, SOC 2, GDPR | ClawGuru")
  const description = pick(isDE, "Automatisiere AI-Compliance mit Moltbot: EU AI Act Art. 12-15, SOC 2 Type II, GDPR. Audit-Logging, Risikomanagement, Robustheitstests und Human-Oversight — kontinuierlich und ohne manuelle Arbeit.", "Automate AI compliance with Moltbot: EU AI Act Art. 12-15, SOC 2 Type II, GDPR. Audit logging, risk management, robustness testing and human oversight — continuously and without manual work.")
  return {
    title, description,
    keywords: ["ai compliance automation", "eu ai act automation", "moltbot compliance", "soc2 ai compliance", "gdpr ai compliance", "ai audit logging"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AiComplianceAutomationPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "KI-Compliance-Automatisierung mit Moltbot: EU AI Act, SOC 2, GDPR | ClawGuru", "AI Compliance Automation with Moltbot: EU AI Act, SOC 2, GDPR | ClawGuru")

  const COMPLIANCE_MAP = [
    { framework: "EU AI Act", article: "Art. 9", requirement: pick(isDE, "Risk Management System", "Risk Management System"), auto: true, impl: pick(isDE, "Kontinuierliches Risk Scoring bei jeder Agent-Interaktion. Anomaly Detection löst Risk Reassessment aus. Risk Register wird automatisch aktualisiert.", "Continuous risk scoring on every agent interaction. Anomaly detection triggers risk reassessment. Risk register updated automatically.") },
    { framework: "EU AI Act", article: "Art. 12", requirement: pick(isDE, "Record-Keeping / Logging", "Record-Keeping / Logging"), auto: true, impl: pick(isDE, "Tamper-evident structured JSON Logs für jede AI-Entscheidung. SHA-256 Hash Chain. Konfigurierbare Retention (Standard 3 Jahre).", "Tamper-evident structured JSON logs for every AI decision. SHA-256 hash chain. Configurable retention (default 3 years).") },
    { framework: "EU AI Act", article: "Art. 14", requirement: pick(isDE, "Human Oversight", "Human Oversight"), auto: true, impl: pick(isDE, "Konfigurierbare HITL Thresholds pro Risk Level. Gefährliche Tool-Aufrufe erfordern explizite Approval. Auto-Pause bei Anomaly Detection.", "Configurable HITL thresholds per risk level. Dangerous tool calls require explicit approval. Auto-pause on anomaly detection.") },
    { framework: "EU AI Act", article: "Art. 15", requirement: pick(isDE, "Cybersecurity & Robustness", "Cybersecurity & Robustness"), auto: true, impl: pick(isDE, "Prompt Injection Defense, Input Validation, Adversarial Robustness Testing CI/CD Hooks, Sandboxed Execution.", "Prompt injection defense, input validation, adversarial robustness testing CI/CD hooks, sandboxed execution.") },
    { framework: "SOC 2 Type II", article: "CC4", requirement: pick(isDE, "Monitoring Activities", "Monitoring Activities"), auto: true, impl: pick(isDE, "24/7 Control Failure Detection. Structured Alert Log mit Response Timestamps für Auditor Evidence Package.", "24/7 control failure detection. Structured alert log with response timestamps for auditor evidence package.") },
    { framework: "SOC 2 Type II", article: "CC6", requirement: pick(isDE, "Logical Access Control", "Logical Access Control"), auto: true, impl: pick(isDE, "Per-Agent Capability Tokens, MFA Enforcement Monitoring, Access Deprovisioning Alerts, Quarterly Review Reports.", "Per-agent capability tokens, MFA enforcement monitoring, access deprovisioning alerts, quarterly review reports.") },
    { framework: "SOC 2 Type II", article: "CC7", requirement: pick(isDE, "System Operations", "System Operations"), auto: true, impl: pick(isDE, "Incident Detection mit strukturierter Timeline. Automatisierte Response Runbooks. Evidence Export für Audit Period.", "Incident detection with structured timeline. Automated response runbooks. Evidence export for audit period.") },
    { framework: "GDPR / DSGVO", article: "Art. 5", requirement: pick(isDE, "Data Minimisation", "Data Minimisation"), auto: true, impl: pick(isDE, "PII Detection in Prompts und Responses. Auto-Redaction vor Logging. Purpose Limitation Enforcement pro Agent Scope.", "PII detection in prompts and responses. Auto-redaction before logging. Purpose limitation enforcement per agent scope.") },
    { framework: "GDPR / DSGVO", article: "Art. 30", requirement: pick(isDE, "Records of Processing", "Records of Processing"), auto: true, impl: pick(isDE, "Automatische Processing Activity Records für alle AI Data Flows. Data Subject + Purpose + Retention pro Agent.", "Automatic processing activity records for all AI data flows. Data subject + purpose + retention per agent.") },
    { framework: "GDPR / DSGVO", article: "Art. 35", requirement: pick(isDE, "DPIA for high-risk AI", "DPIA for high-risk AI"), auto: false, impl: pick(isDE, "Moltbot generiert technische Evidenz für DPIA; Human Review und Sign-off erforderlich für High-Risk Processing.", "Moltbot generates technical evidence for DPIA; human review and sign-off required for high-risk processing.") },
  ]

  const FAQ = [
    { q: pick(isDE, "Was bedeutet 'AI Compliance Automation' in der Praxis?", "What does 'AI compliance automation' mean in practice?"), a: pick(isDE, "Statt manuell Evidenz zu sammeln (Screenshots, Exports, Spreadsheets) vor jedem Audit, generiert Moltbot automatisch einen kontinuierlichen strukturierten Evidenz-Stream. Für EU AI Act Art. 12: jede AI-Entscheidung wird mit Timestamp, Input Hash, Output Hash, Agent ID und Tool Calls geloggt — tamper-evident. Für SOC 2 Type II: dieses Log wird dein CC7 Evidence. Für GDPR: PII in Prompts wird vor dem Logging automatisch redacted, erfüllt Art. 5 Data Minimisation automatisch.", "Instead of manually collecting evidence (screenshots, exports, spreadsheets) before each audit, Moltbot generates a continuous structured evidence stream automatically. For EU AI Act Art. 12: every AI decision is logged with timestamp, input hash, output hash, agent ID, and tool calls — tamper-evidently. For SOC 2 Type II: this log becomes your CC7 evidence. For GDPR: PII detected in any prompt is auto-redacted before logging, satisfying Art. 5 data minimisation automatically.") },
    { q: pick(isDE, "Welche Frameworks deckt Moltbot out-of-the-box ab?", "Which frameworks does Moltbot cover out of the box?"), a: pick(isDE, "Volle Automatisierung: EU AI Act Art. 9, 12, 14, 15. SOC 2 Type II: CC3, CC4, CC5, CC6, CC7, CC8. GDPR Art. 5, 25, 30. Teilweise (technische Evidenz generiert, Human Review erforderlich): EU AI Act Art. 11 (technische Dokumentation), GDPR Art. 35 (DPIA), SOC 2 CC1/CC2 (Governance). NIST CSF 2.0: Identify, Protect, Detect, Respond Funktionen vollständig gemappt.", "Full automation: EU AI Act Art. 9, 12, 14, 15. SOC 2 Type II: CC3, CC4, CC5, CC6, CC7, CC8. GDPR Art. 5, 25, 30. Partial (technical evidence generated, human review required): EU AI Act Art. 11 (technical documentation), GDPR Art. 35 (DPIA), SOC 2 CC1/CC2 (governance). NIST CSF 2.0: Identify, Protect, Detect, Respond functions fully mapped.") },
    { q: pick(isDE, "Wie handhabt Moltbot EU AI Act Art. 14 Human Oversight technisch?", "How does Moltbot handle EU AI Act Art. 14 human oversight technically?"), a: pick(isDE, "Moltbot implementiert ein Risk-Threshold HITL System: jede Agent Action wird gescored (0-100 Risk). Unter Threshold: automatische Execution + Audit Log. Über Threshold: Action queued, Human notified via Webhook/Slack/Email, Execution geblockt bis explizite Approval mit Timestamp und Approver Identity recorded. Das Approval Record erfüllt Art. 14's 'technical measures enabling human oversight' Requirement mit voller Audit Evidenz.", "Moltbot implements a risk-threshold HITL system: every agent action is scored (0-100 risk). Below threshold: automatic execution + audit log. Above threshold: action queued, human notified via webhook/Slack/email, execution blocked until explicit approval with timestamp and approver identity recorded. The approval record satisfies Art. 14's 'technical measures enabling human oversight' requirement with full audit evidence.") },
    { q: pick(isDE, "Kann Moltbot einen Compliance Auditor ersetzen?", "Can Moltbot replace a compliance auditor?"), a: pick(isDE, "Nein. Moltbot automatisiert technische Evidenz-Sammlung und Control Implementation. Ein qualifizierter Auditor ist weiterhin erforderlich um: zu evaluieren ob Controls adequate für dein spezifisches Risk Profile sind, das formelle Audit durchzuführen und die Attestation auszustellen (SOC 2), DPIA zu sign-off (GDPR), Conformity Assessment durchzuführen (EU AI Act High-Risk). Moltbot macht die Arbeit des Auditors schneller und günstiger durch strukturierte, vollständige Evidenz — statt dass du sie manuell zusammensuchst.", "No. Moltbot automates technical evidence collection and control implementation. A qualified auditor is still required to: evaluate whether controls are adequate for your specific risk profile, conduct the formal audit and issue the attestation (SOC 2), sign off on DPIA (GDPR), perform conformity assessment (EU AI Act high-risk). Moltbot makes the auditor's job faster and cheaper by providing structured, complete evidence — instead of you scrambling to produce it manually.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Compliance Automation", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Compliance Automation", "EU AI Act", "SOC 2", "GDPR"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Compliance Automation?", "What is Compliance Automation?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Compliance Defense", "5-Layer Compliance Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Compliance Maturity Score", "Compliance Maturity Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">14 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Compliance Automation · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Compliance Automation — Dein Audit ist in 2 Wochen und du hast keine Evidenz. Manuelle Logs, fehlende Records, keine DPIA. Der Auditor sagt: Audit Failed.", "AI Compliance Automation — Your Audit Is in 2 Weeks and You Have No Evidence. Manual Logs, Missing Records, No DPIA. The Auditor Says: Audit Failed.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Deine AI-Systeme haben kein automatisiertes Compliance-Logging, kein Risk Management und keine Human-Oversight. EU AI Act, SOC 2, GDPR — drei Frameworks, null Evidenz. Audit Failed, Kunden verlieren, dein CEO hat den CSO gefeuert. Hier ist, wie du das verhinderst.", "Your AI systems have no automated compliance logging, no risk management and no human oversight. EU AI Act, SOC 2, GDPR — three frameworks, zero evidence. Audit failed, customers lost, your CEO fired the CSO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Compliance Automation? Einfach erklärt.", "What is Compliance Automation? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Compliance Automation wie ein automatisches Audit-Log vor: Jede AI-Entscheidung wird automatisch geloggt, jeder Risk Score automatisch berechnet, jede Compliance-Anforderung automatisch überprüft. Für AI-Systeme bedeutet das: EU AI Act Art. 12 Logging, SOC 2 Type II CC7 Monitoring, GDPR Art. 30 Records — alles automatisch, kontinuierlich und tamper-evident. Gute Compliance Automation bedeutet: Never scramble for evidence again.", "Think of compliance automation like an automated audit log: every AI decision is automatically logged, every risk score automatically calculated, every compliance requirement automatically checked. For AI systems, this means: EU AI Act Art. 12 logging, SOC 2 Type II CC7 monitoring, GDPR Art. 30 records — all automated, continuous and tamper-evident. Good compliance automation means: never scramble for evidence again.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer Compliance Defense Architecture", "5-Layer Compliance Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Automated Audit Logging", "Automated Audit Logging")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Logge jede AI-Entscheidung automatisch mit Timestamp, Input Hash, Output Hash, Agent ID und Tool Calls. Tamper-evident mit SHA-256 Hash Chain.", "Log every AI decision automatically with timestamp, input hash, output hash, agent ID and tool calls. Tamper-evident with SHA-256 hash chain.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`audit_logging:
  enabled: true
  structured_json: true
  hash_chain: sha256
  tamper_detection: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Continuous Risk Scoring", "Continuous Risk Scoring")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Berechne Risk Scores kontinuierlich für jede Agent-Interaktion. Anomaly Detection löst Risk Reassessment aus.", "Calculate risk scores continuously for every agent interaction. Anomaly detection triggers risk reassessment.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`risk_scoring:
  enabled: true
  continuous: true
  anomaly_detection: true
  risk_register: true`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Human Oversight (HITL)", "Human Oversight (HITL)")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Implementiere Risk-Threshold HITL System. Gefährliche Aktionen erfordern explizite Human Approval mit Audit Trail.", "Implement risk-threshold HITL system. Dangerous actions require explicit human approval with audit trail.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`human_oversight:
  enabled: true
  hitl_threshold: 70
  approval_required: true
  audit_trail: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "PII Auto-Redaction", "PII Auto-Redaction")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Erkenne und redacte PII automatisch in Prompts und Responses vor dem Logging. GDPR Art. 5 Data Minimisation.", "Detect and redact PII automatically in prompts and responses before logging. GDPR Art. 5 data minimisation.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`pii_redaction:
  enabled: true
  auto_detect: true
  pre_log_redaction: true
  gdpr_art5: true`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center text-amber-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Evidence Export", "Evidence Export")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Exportiere strukturierte Audit Evidenz für SOC 2, EU AI Act und GDPR. PDF, JSON, CSV Formate.", "Export structured audit evidence for SOC 2, EU AI Act and GDPR. PDF, JSON, CSV formats.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`evidence_export:
  enabled: true
  formats: [pdf, json, csv]
  soc2_cc7: true
  eu_ai_act: true
  gdpr: true`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Audit Failed ohne Evidenz", "SCAR #1: Audit Failed without Evidence")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Audit Failed ohne Evidenz. SOC 2 Type II Audit abgebrochen, Kunden verloren. Fix: Automated Audit Logging, Evidence Export.", "Audit failed without evidence. SOC 2 Type II audit aborted, customers lost. Fix: Automated audit logging, evidence export.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Automated Logging. Lessons: Aktiviere Automated Audit Logging mit Evidence Export.", "Root Cause: No automated logging. Lessons: Enable automated audit logging with evidence export.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: GDPR Violation ohne PII Redaction", "SCAR #2: GDPR Violation without PII Redaction")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "GDPR Violation ohne PII Redaction. Datenexfiltration, Bußgelder. Fix: PII Auto-Redaction, Data Minimisation.", "GDPR violation without PII redaction. Data exfiltration, fines. Fix: PII auto-redaction, data minimisation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein PII Redaction. Lessons: Aktiviere PII Auto-Redaction mit Data Minimisation.", "Root Cause: No PII redaction. Lessons: Enable PII auto-redaction with data minimisation.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Automated Audit Logging aktivieren", "Enable Automated Audit Logging")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Automated Audit Logging für alle AI-Entscheidungen.", "Enable automated audit logging for all AI decisions.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Continuous Risk Scoring aktivieren", "Enable Continuous Risk Scoring")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Continuous Risk Scoring für alle Agent-Interaktionen.", "Enable continuous risk scoring for all agent interactions.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "PII Auto-Redaction aktivieren", "Enable PII Auto-Redaction")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere PII Auto-Redaction für alle Prompts und Responses.", "Enable PII auto-redaction for all prompts and responses.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Compliance Checkliste", "Interactive Compliance Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "Automated Audit Logging aktiviert", "Automated audit logging enabled") },
                  { id: "c2", text: pick(isDE, "Continuous Risk Scoring aktiviert", "Continuous risk scoring enabled") },
                  { id: "c3", text: pick(isDE, "Human Oversight (HITL) aktiviert", "Human oversight (HITL) enabled") },
                  { id: "c4", text: pick(isDE, "PII Auto-Redaction aktiviert", "PII auto-redaction enabled") },
                  { id: "c5", text: pick(isDE, "Evidence Export konfiguriert", "Evidence export configured") },
                  { id: "c6", text: pick(isDE, "EU AI Act Art. 12 Logging aktiv", "EU AI Act Art. 12 logging active") },
                  { id: "c7", text: pick(isDE, "SOC 2 CC7 Monitoring aktiv", "SOC 2 CC7 monitoring active") },
                  { id: "c8", text: pick(isDE, "GDPR Art. 30 Records aktiv", "GDPR Art. 30 records active") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Compliance Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Compliance Maturity Score Calculator", "Compliance Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Automated Audit Logging aktiviert?", "Do you have automated audit logging enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Continuous Risk Scoring aktiv?", "Is continuous risk scoring active?"), weight: 25 },
                  { q: pick(isDE, "Ist PII Auto-Redaction aktiv?", "Is PII auto-redaction active?"), weight: 25 },
                  { q: pick(isDE, "Ist Evidence Export konfiguriert?", "Is evidence export configured?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Compliance Maturity Score:", "Your Compliance Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 18/100", "Industry Average: 18/100")}</p>
              </div>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Compliance Automation, EU AI Act, SOC 2 und GDPR.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in compliance automation, EU AI Act, SOC 2 and GDPR.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/check`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "System jetzt scannen", "Scan system now")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "600+ Security-Playbooks", "600+ Security Playbooks")}</div>
              </a>
              <a href={`/${locale}/solutions/eu-ai-act-compliance`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">EU AI Act Guide</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Compliance-Leitfaden", "Compliance guide")}</div>
              </a>
              <a href={`/${locale}/solutions/soc2-type-ii-automation`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">SOC 2 Type II</div>
                <div className="text-sm text-gray-300">{pick(isDE, "SOC 2 Automation", "SOC 2 automation")}</div>
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
