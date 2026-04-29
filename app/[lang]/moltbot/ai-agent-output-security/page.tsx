import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-output-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Output Security: Ausgabe-Sicherheit für AI-Agents | ClawGuru", "AI Agent Output Security: Output Security for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Output Security für Moltbot. Output Filtering, Content Moderation, Data Leakage Prevention und sichere Ausgabeverarbeitung für AI-Agent-Systeme.", "AI agent output security for Moltbot. Output filtering, content moderation, data leakage prevention and secure output processing for AI agent systems.")
  return {
    title, description,
    keywords: ["ai agent output security", "output filtering", "content moderation", "data leakage prevention", "output validation", "moltbot security", "output security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentOutputSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Output Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div id="reading-progress" className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{width: '0%'}}></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          ...jsonLd,
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Output Security Guide", "Moltbot AI Agent Output Security Guide"), description: pick(isDE, "AI Agent Output Security", "AI agent output security"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Output-Security-Guide für eigene KI-Systeme.", "Output security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Output Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Output Security", "AI Agent Output Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Output Security für Moltbot. Output Filtering, Content Moderation, Data Leakage Prevention und sichere Ausgabeverarbeitung für AI-Agent-Systeme.", "AI agent output security for Moltbot. Output filtering, content moderation, data leakage prevention and secure output processing for AI agent systems.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Output Security? Einfach erklärt", "What is Output Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Output Security ist wie ein Content-Filter für AI-Agent-Antworten: es prüft, was der Agent ausgibt, bevor es den Nutzer erreicht. Output Filtering entfernt schädliche oder falsche Inhalte. PII Detection & Masking schützt persönliche Daten. Content Moderation blockiert unangemessene Inhalte. Hallucination Detection erkennt erfundene Fakten. Output Encoding verhindert XSS und Injection-Angriffe. Ohne Output Security können AI-Agents sensible Daten泄露, schädliche Inhalte generieren oder halluzinierte Informationen als Fakten ausgeben.", "Output security is like a content filter for AI agent responses: it checks what the agent outputs before it reaches the user. Output filtering removes harmful or false content. PII detection & masking protects personal data. Content moderation blocks inappropriate content. Hallucination detection detects fabricated facts. Output encoding prevents XSS and injection attacks. Without output security, AI agents can leak sensitive data, generate harmful content, or present hallucinated information as facts.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Output Filtering", pick(isDE, "Systematische Filterung aller Agent-Outputs vor Auslieferung. Erkennung und Entfernung von schädlichen, falschen oder verbotenen Inhalten.", "Systematic filtering of all agent outputs before delivery. Detection and removal of harmful, false or forbidden content.")],
              ["2. PII Detection & Masking", pick(isDE, "Automatische Erkennung und Maskierung von PII (Personally Identifiable Information) in Agent-Outputs. GDPR-konformes Output Management.", "Automatic detection and masking of PII (Personally Identifiable Information) in agent outputs. GDPR-compliant output management.")],
              ["3. Content Moderation", pick(isDE, "Echtzeit Content Moderation für Agent-Outputs. Automated Moderation APIs und custom Classifier für Domain-spezifische Regeln.", "Real-time content moderation for agent outputs. Automated moderation APIs and custom classifiers for domain-specific rules.")],
              ["4. Hallucination Detection", pick(isDE, "Erkennung und Flagging von halluzinierten Fakten in Agent-Outputs. Confidence Scoring und Fact Verification.", "Detection and flagging of hallucinated facts in agent outputs. Confidence scoring and fact verification.")],
              ["5. Output Encoding", pick(isDE, "Kontextgerechtes Encoding aller Agent-Outputs. HTML, JSON, Shell und SQL Encoding je nach Ausgabe-Kontext.", "Context-appropriate encoding of all agent outputs. HTML, JSON, shell and SQL encoding depending on output context.")],
            ].map(([title, desc]) => (
              <div key={title as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Constitutional AI Output Checks", "Constitutional AI Output Checks")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "Automatische Überprüfung von Outputs gegen definierte Constitutional AI Principles. Self-critique und Revision.", "Automatic checking of outputs against defined Constitutional AI principles. Self-critique and revision.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Watermarking für Outputs", "Watermarking for Outputs")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Kryptographisches Watermarking von AI-generierten Outputs. Herkunfts-Nachweis und Manipulation-Erkennung.", "Cryptographic watermarking of AI-generated outputs. Provenance proof and manipulation detection.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Semantic Output Validation", "Semantic Output Validation")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Semantische Validierung von Outputs auf Konsistenz und Korrektheit. Cross-check mit vertrauenswürdigen Datenquellen.", "Semantic validation of outputs for consistency and correctness. Cross-check with trusted data sources.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Output Audit Trails", "Output Audit Trails")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Vollständige Protokollierung aller Agent-Outputs für Compliance und Incident Investigation. Tamper-proof Logging.", "Complete logging of all agent outputs for compliance and incident investigation. Tamper-proof logging.")}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "Output-Policies definieren", "Define output policies"), pick(isDE, "Klare Regeln was AI-Agents ausgeben dürfen und was nicht. Policies für jeden Ausgabe-Kontext dokumentieren.", "Clear rules for what AI agents may and may not output. Document policies for each output context.")],
              [2, pick(isDE, "PII Scanner integrieren", "Integrate PII scanner"), pick(isDE, "PII Detection in Output-Pipeline einbauen. Microsoft Presidio, AWS Comprehend oder custom NER Modelle.", "Build PII detection into output pipeline. Microsoft Presidio, AWS Comprehend or custom NER models.")],
              [3, pick(isDE, "Content Moderation API einbinden", "Integrate content moderation API"), pick(isDE, "Moderation API für alle Outputs aufrufen. OpenAI Moderation, Perspective API oder Custom Classifier.", "Call moderation API for all outputs. OpenAI Moderation, Perspective API or custom classifier.")],
              [4, pick(isDE, "Output Encoding implementieren", "Implement output encoding"), pick(isDE, "Kontextgerechtes Encoding vor jeder Ausgabe. Rendering-Kontext bestimmen und entsprechend encodieren.", "Context-appropriate encoding before every output. Determine rendering context and encode accordingly.")],
              [5, pick(isDE, "Output Monitoring aktivieren", "Enable output monitoring"), pick(isDE, "Alle Outputs loggen und auf Anomalien monitoren. Statistiken über gefilterte/blockierte Outputs für Security Team.", "Log all outputs and monitor for anomalies. Statistics on filtered/blocked outputs for security team.")],
            ].map(([n, title, desc]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div>
                  <div className="font-semibold text-gray-100 mb-2">{title}</div>
                  <div className="text-sm text-gray-300">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur auf Schwachstellen prüfen", "Check infrastructure for vulnerabilities")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10", "OWASP LLM Top 10")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Output Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Output-Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with output security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-700/50">
              <div className="flex items-center gap-2 text-xs text-cyan-300">
                <span className="bg-cyan-800/80 backdrop-blur-lg px-2 py-1 rounded">🔒 {pick(isDE, 'Verifiziert von ClawGuru Security Team', 'Verified by ClawGuru Security Team')}</span>
                <span>·</span>
                <span>{pick(isDE, 'Alle Informationen fact-checked und peer-reviewed', 'All information fact-checked and peer-reviewed')}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
