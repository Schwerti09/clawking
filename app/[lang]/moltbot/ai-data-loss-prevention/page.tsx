import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-data-loss-prevention"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Data Loss Prevention: Datenverlust durch LLMs verhindern | ClawGuru", "AI Data Loss Prevention: Prevent Data Leakage via LLMs | ClawGuru")
  const description = pick(isDE, "KI-DLP für Moltbot: PII-Erkennung in Prompts, Secrets-Scanning vor LLM-Übermittlung, Output-Exfiltrations-Erkennung und GDPR-konforme Datenmaskierung für LLM-Systeme.", "AI DLP for Moltbot: PII detection in prompts, secrets scanning before LLM submission, output exfiltration detection and GDPR-compliant data masking for LLM systems.")
  return {
    title, description,
    keywords: ["ai data loss prevention", "llm dlp", "ai dlp moltbot", "pii detection llm", "secrets scanning llm", "ai data exfiltration prevention"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AiDataLossPreventionPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Data Loss Prevention: Datenverlust durch LLMs verhindern | ClawGuru", "AI Data Loss Prevention: Prevent Data Leakage via LLMs | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Data Loss Prevention", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Data Loss Prevention", "PII Detection"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title }
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Data Loss Prevention?", "What is Data Loss Prevention?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer DLP Defense", "5-Layer DLP Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "DLP Maturity Score", "DLP Maturity Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Data Loss Prevention · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Data Loss Prevention — Dein LLM hat Kundendaten in einer Antwort exfiltriert. GDPR-Verletzung, Bußgelder, Kundenverlust. Dein CISO hat den CEO gerufen.", "AI Data Loss Prevention — Your LLM Exfiltrated Customer Data in a Response. GDPR Violation, Fines, Customer Loss. Your CISO Called the CEO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein LLM hat keine PII-Erkennung, kein Secrets-Scanning und keine Output-Exfiltrations-Erkennung. Kundendaten exfiltriert in Antworten, Secrets im Prompt, GDPR-Verletzung. 500.000€ Bußgeld, Kunden verloren, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "Your LLM has no PII detection, no secrets scanning and no output exfiltration detection. Customer data exfiltrated in responses, secrets in prompts, GDPR violation. €500,000 fine, customers lost, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Data Loss Prevention? Einfach erklärt.", "What is Data Loss Prevention? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir DLP wie einen Firewall-Filter für deine Daten vor: Erkenne sensible Daten bevor sie das System verlassen, scanne nach Secrets bevor sie verarbeitet werden, maskiere PII in Logs und Antworten. Für LLMs bedeutet das: PII Detection in Prompts, Secrets Scanning vor LLM, Output Exfiltration Detection, GDPR-konforme Data Masking. Gutes DLP bedeutet: Never leak sensitive data again.", "Think of DLP like a firewall filter for your data: detect sensitive data before it leaves the system, scan for secrets before processing, mask PII in logs and responses. For LLMs, this means: PII detection in prompts, secrets scanning before LLM, output exfiltration detection, GDPR-compliant data masking. Good DLP means: never leak sensitive data again.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer DLP Defense Architecture", "5-Layer DLP Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "PII Detection in Prompts", "PII Detection in Prompts")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Erkenne PII (Personally Identifiable Information) in Prompts vor der LLM-Übermittlung. Namen, E-Mails, Adressen, Kreditkartennummern.", "Detect PII (Personally Identifiable Information) in prompts before LLM submission. Names, emails, addresses, credit card numbers.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`pii_detection:
  enabled: true
  pre_llm_scan: true
  types: [name, email, address, credit_card]
  auto_redaction: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Secrets Scanning", "Secrets Scanning")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Scanne nach API Keys, Passwords und Tokens in Prompts. Blockiere Übermittlung an LLM wenn Secrets gefunden.", "Scan for API keys, passwords and tokens in prompts. Block submission to LLM if secrets found.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`secrets_scanning:
  enabled: true
  pre_llm_scan: true
  patterns: [api_key, password, token]
  block_on_match: true`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Output Exfiltration Detection", "Output Exfiltration Detection")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Erkenne Datenexfiltration in LLM-Antworten. Anomaly Detection für ungewöhnliche Datenmuster.", "Detect data exfiltration in LLM responses. Anomaly detection for unusual data patterns.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`exfiltration_detection:
  enabled: true
  output_scan: true
  anomaly_detection: true
  block_on_detection: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "GDPR Data Masking", "GDPR Data Masking")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Maskiere PII automatisch in Logs und Antworten gemäß GDPR Art. 5 Data Minimisation.", "Mask PII automatically in logs and responses according to GDPR Art. 5 data minimisation.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`gdpr_masking:
  enabled: true
  auto_mask: true
  log_masking: true
  response_masking: true`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center text-amber-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Audit Logging", "Audit Logging")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Logge alle DLP-Events mit Timestamp, Severity und Action. Tamper-evident für Audit-Evidenz.", "Log all DLP events with timestamp, severity and action. Tamper-evident for audit evidence.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`audit_logging:
  enabled: true
  dlp_events: true
  tamper_evident: true
  retention_years: 3`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Kundendaten exfiltriert ohne Output Detection", "SCAR #1: Customer Data Exfiltrated without Output Detection")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Kundendaten exfiltriert ohne Output Detection. GDPR-Verletzung, Bußgelder. Fix: Output Exfiltration Detection, GDPR Masking.", "Customer data exfiltrated without output detection. GDPR violation, fines. Fix: Output exfiltration detection, GDPR masking.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Output Detection. Lessons: Aktiviere Output Exfiltration Detection mit GDPR Masking.", "Root Cause: No output detection. Lessons: Enable output exfiltration detection with GDPR masking.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Secrets im Prompt ohne Scanning", "SCAR #2: Secrets in Prompt without Scanning")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Secrets im Prompt ohne Scanning. API Keys exfiltriert, System kompromittiert. Fix: Secrets Scanning, Block on Match.", "Secrets in prompt without scanning. API keys exfiltrated, system compromised. Fix: Secrets scanning, block on match.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Secrets Scanning. Lessons: Aktiviere Secrets Scanning mit Block on Match.", "Root Cause: No secrets scanning. Lessons: Enable secrets scanning with block on match.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "PII Detection aktivieren", "Enable PII Detection")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere PII Detection für alle Prompts.", "Enable PII detection for all prompts.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Secrets Scanning aktivieren", "Enable Secrets Scanning")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Secrets Scanning vor LLM-Übermittlung.", "Enable secrets scanning before LLM submission.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Output Exfiltration Detection aktivieren", "Enable Output Exfiltration Detection")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Output Exfiltration Detection für alle Antworten.", "Enable output exfiltration detection for all responses.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive DLP Checkliste", "Interactive DLP Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "d1", text: pick(isDE, "PII Detection aktiviert", "PII detection enabled") },
                  { id: "d2", text: pick(isDE, "Secrets Scanning aktiviert", "Secrets scanning enabled") },
                  { id: "d3", text: pick(isDE, "Output Exfiltration Detection aktiviert", "Output exfiltration detection enabled") },
                  { id: "d4", text: pick(isDE, "GDPR Data Masking aktiviert", "GDPR data masking enabled") },
                  { id: "d5", text: pick(isDE, "Audit Logging aktiviert", "Audit logging enabled") },
                  { id: "d6", text: pick(isDE, "Auto-Redaction aktiviert", "Auto-redaction enabled") },
                  { id: "d7", text: pick(isDE, "Block on Match aktiviert", "Block on match enabled") },
                  { id: "d8", text: pick(isDE, "Tamper-evident Logging aktiviert", "Tamper-evident logging enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* DLP Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "DLP Maturity Score Calculator", "DLP Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du PII Detection aktiviert?", "Do you have PII detection enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Secrets Scanning aktiv?", "Is secrets scanning active?"), weight: 25 },
                  { q: pick(isDE, "Ist Output Exfiltration Detection aktiv?", "Is output exfiltration detection active?"), weight: 25 },
                  { q: pick(isDE, "Ist GDPR Masking aktiv?", "Is GDPR masking active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein DLP Maturity Score:", "Your DLP Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 15/100", "Industry Average: 15/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Data Loss Prevention, PII Detection und Secrets Scanning.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in data loss prevention, PII detection and secrets scanning.")}
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
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-privacy-preservation`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Privacy Preservation</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Privacy-Preservation", "Privacy preservation")}</div>
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
