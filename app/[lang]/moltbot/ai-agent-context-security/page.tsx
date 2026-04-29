import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-context-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Context Security: Kontext-Sicherheit für AI-Agents | ClawGuru", "AI Agent Context Security: Context Security for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Context Security für Moltbot. Context Window Isolation, Prompt Injection Prevention, Cross-Session Contamination und Kontext-Manipulation verhindern.", "AI agent context security for Moltbot. Context window isolation, prompt injection prevention, cross-session contamination and context manipulation prevention.")
  return {
    title, description,
    keywords: ["ai agent context security", "context window isolation", "prompt injection", "cross session contamination", "context manipulation", "moltbot security", "context security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentContextSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Context Security", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "AI Agent Context Security Guide", "AI Agent Context Security Guide"), description: pick(isDE, "AI Agent Context Security", "AI agent context security"), url: `${SITE_URL}/${locale}${PATH}` }
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Leitfaden dient zur Härtung Ihrer eigenen Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Context Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Context Security", "AI Agent Context Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Context Security für Moltbot. Context Window Isolation, Prompt Injection Prevention, Cross-Session Contamination und Kontext-Manipulation verhindern.", "AI agent context security for Moltbot. Context window isolation, prompt injection prevention, cross-session contamination and context manipulation prevention.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Context Security? Einfach erklärt", "What is AI Agent Context Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Context Security schützt den Kontext von KI-Agenten: Context Window Isolation isoliert Kontext-Fenster strikt zwischen Nutzern und Sessions um Cross-Tenant Datenlecks zu verhindern. Prompt Injection Prevention nutzt Input Sanitization und Instruction Hierarchy (System > Developer > User) um User-Override von System-Anweisungen zu blocken. Cross-Session Contamination Prevention isoliert Agent-Sessions vollständig mit Memory Isolation und Session Cleanup. Context Validation validiert alle Kontext-Inputs auf Malicious Content mit Schema-Validierung und Content-Filtering. System Prompt Hardening härte den System-Prompt mit Anti-Jailbreak-Formulierungen.", "AI agent context security protects AI agent context: context window isolation strictly isolates context windows between users and sessions to prevent cross-tenant data leaks. Prompt injection prevention uses input sanitization and instruction hierarchy (system > developer > user) to block user override of system instructions. Cross-session contamination prevention fully isolates agent sessions with memory isolation and session cleanup. Context validation validates all context inputs for malicious content with schema validation and content filtering. System prompt hardening hardens the system prompt with anti-jailbreak formulations.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten", "Jump to core concepts")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Context Window Isolation", pick(isDE, "Strikte Isolierung von Kontext-Fenstern zwischen verschiedenen Nutzern und Sessions. Verhindert Cross-Tenant Datenlecks.", "Strict isolation of context windows between different users and sessions. Prevents cross-tenant data leaks.")],
              ["2. Prompt Injection Prevention", pick(isDE, "Schutz vor Prompt Injection durch Input Sanitization und Instruction Hierarchies. System Prompt Integrität sicherstellen.", "Protection against prompt injection through input sanitization and instruction hierarchies. Ensure system prompt integrity.")],
              ["3. Cross-Session Contamination", pick(isDE, "Verhinderung von Datenkontamination zwischen unabhängigen Agent-Sessions. Memory Isolation und Session Cleanup.", "Prevention of data contamination between independent agent sessions. Memory isolation and session cleanup.")],
              ["4. Context Validation", pick(isDE, "Validierung aller Kontext-Inputs auf Malicious Content. Schema-Validierung und Content-Filterung für Agent-Prompts.", "Validation of all context inputs for malicious content. Schema validation and content filtering for agent prompts.")],
              ["5. System Prompt Hardening", pick(isDE, "Härtung des System-Prompts gegen Manipulation. Jailbreak-resistente Formulierungen und Instruction Defense.", "Hardening of the system prompt against manipulation. Jailbreak-resistant formulations and instruction defense.")],
            ].map(([title, desc]) => (
              <div key={title as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700/50 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Instruction Hierarchy Enforcement", "Instruction Hierarchy Enforcement")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "Durchsetzung einer klaren Instruction Hierarchy: System > Developer > User. Verhindert User-Override von System-Anweisungen.", "Enforcement of a clear instruction hierarchy: System > Developer > User. Prevents user override of system instructions.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700/50 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Context Integrity Monitoring", "Context Integrity Monitoring")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Real-time Monitoring der Kontext-Integrität. Erkennung von Injection-Versuchen und manipulierten Inputs.", "Real-time monitoring of context integrity. Detection of injection attempts and manipulated inputs.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700/50 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Secure Context Handoff", "Secure Context Handoff")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Sicherer Kontext-Transfer zwischen Agents in Multi-Agent-Systemen. Signierte Kontext-Pakete und Integritätsprüfung.", "Secure context transfer between agents in multi-agent systems. Signed context packages and integrity verification.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700/50 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Context Poisoning Defense", "Context Poisoning Defense")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Schutz vor gezielter Vergiftung des Agent-Kontexts durch externe Datenquellen (Web, RAG, Tools).", "Protection against deliberate poisoning of agent context through external data sources (web, RAG, tools).")}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "Context Boundaries definieren", "Define context boundaries"), pick(isDE, "Klare Grenzen zwischen System-, Developer- und User-Kontext definieren. Isolation auf Ebene der LLM API.", "Define clear boundaries between system, developer and user context. Isolation at the LLM API level.")],
              [2, pick(isDE, "Input Sanitization implementieren", "Implement input sanitization"), pick(isDE, "Alle User-Inputs bereinigen bevor sie in den Kontext einfließen. Filterung von Injection-Patterns.", "Sanitize all user inputs before they flow into context. Filter injection patterns.")],
              [3, pick(isDE, "Session Isolation sicherstellen", "Ensure session isolation"), pick(isDE, "Jede Agent-Session vollständig isolieren. Kein Kontext-Sharing zwischen verschiedenen Nutzern.", "Fully isolate every agent session. No context sharing between different users.")],
              [4, pick(isDE, "System Prompt härten", "Harden system prompt"), pick(isDE, "System Prompt mit Anti-Jailbreak-Formulierungen versehen. Regelmäßige Tests gegen bekannte Jailbreak-Patterns.", "Equip system prompt with anti-jailbreak formulations. Regular tests against known jailbreak patterns.")],
              [5, pick(isDE, "Context Monitoring aktivieren", "Enable context monitoring"), pick(isDE, "Alle Kontext-Manipulationsversuche loggen und alerten. Integration mit SIEM für Korrelation.", "Log and alert all context manipulation attempts. Integration with SIEM for correlation.")],
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
            <a href={`/${locale}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur auf Schwachstellen prüfen", "Check infrastructure for vulnerabilities")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "OpenClaw", "OpenClaw")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Roast My Moltbot", "Roast My Moltbot")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Moltbot Security Testing", "Moltbot security testing")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Context Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Context Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent context security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
