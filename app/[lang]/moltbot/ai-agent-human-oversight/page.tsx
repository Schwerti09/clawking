import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-human-oversight"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Human Oversight: Menschliche Aufsicht über AI-Agents | ClawGuru", "AI Agent Human Oversight: Human Oversight for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Human Oversight für Moltbot-Deployments. HITL, Approval Workflows, Escalation Patterns und Oversight Frameworks für sichere AI-Agent-Systeme. Mit Moltbot automatisierbar.", "AI agent human oversight for Moltbot deployments. HITL, approval workflows, escalation patterns and oversight frameworks for secure AI agent systems.")
  return {
    title,
    description,
    keywords: [
      "ai agent human oversight", "human in the loop", "hitl", "approval workflows",
      "escalation patterns", "ai oversight", "moltbot security", "ai agent control 2026",
      "security check", "runbooks", "openclaw"
    ],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentHumanOversightPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Human Oversight", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "AI Agent Human Oversight Guide", "AI Agent Human Oversight Guide"), description: pick(isDE, "AI Agent Human Oversight", "AI agent human oversight"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Human Oversight</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Human Oversight", "AI Agent Human Oversight")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Human Oversight für Moltbot-Deployments. HITL, Approval Workflows, Escalation Patterns und Oversight Frameworks für sichere AI-Agent-Systeme.", "AI agent human oversight for Moltbot deployments. HITL, approval workflows, escalation patterns and oversight frameworks for secure AI agent systems.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Human Oversight? Einfach erklärt", "What is AI Agent Human Oversight? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Human Oversight garantiert menschliche Aufsicht über KI-Agenten: Human-in-the-Loop (HITL) lässt den Menschen Entscheidungsträger bei kritischen Agent-Aktionen bleiben mit Approval Gates vor irreversiblen Operationen. Approval Workflows definieren strukturierte Genehmigungsprozesse für High-Risk-Aktionen mit mehrstufigen Approval Chains. Escalation Patterns eskalieren automatisch bei Unsicherheit mit Threshold-basierter Eskalation an menschliche Reviewer. Audit & Explainability liefert vollständige Audit-Trails mit Begründungen und Reasoning-Logs. Override Mechanisms ermöglichen sofortigen menschlichen Override mit Emergency-Stop und Rollback.", "AI agent human oversight guarantees human oversight over AI agents: human-in-the-loop (HITL) keeps humans as decision-makers for critical agent actions with approval gates before irreversible operations. Approval workflows define structured approval processes for high-risk actions with multi-level approval chains. Escalation patterns automatically escalate on uncertainty with threshold-based escalation to human reviewers. Audit & explainability provides complete audit trails with justifications and reasoning logs. Override mechanisms enable immediate human override with emergency stop and rollback.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten", "Jump to core concepts")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              { en: "1. Human-in-the-Loop (HITL)", de_desc: "Mensch bleibt Entscheidungsträger bei kritischen Agent-Aktionen. Approval Gates vor irreversiblen Operationen.", en_desc: "Human remains decision-maker for critical agent actions. Approval gates before irreversible operations." },
              { en: "2. Approval Workflows", de_desc: "Strukturierte Genehmigungsprozesse für Agent-Aktionen mit hohem Risiko. Mehrstufige Approval Chains.", en_desc: "Structured approval processes for high-risk agent actions. Multi-level approval chains." },
              { en: "3. Escalation Patterns", de_desc: "Automatisierte Eskalation wenn Agents Unsicherheit erkennen. Threshold-basierte Eskalation an menschliche Reviewer.", en_desc: "Automated escalation when agents detect uncertainty. Threshold-based escalation to human reviewers." },
              { en: "4. Audit & Explainability", de_desc: "Vollständige Audit-Trails für Agent-Entscheidungen. Begründungen und Reasoning-Logs für menschliche Reviewer.", en_desc: "Complete audit trails for agent decisions. Justifications and reasoning logs for human reviewers." },
              { en: "5. Override Mechanisms", de_desc: "Sofortiger menschlicher Override für jede Agent-Aktion. Notfall-Stop und Rollback-Fähigkeiten.", en_desc: "Immediate human override for any agent action. Emergency stop and rollback capabilities." },
            ].map(({ en, de_desc, en_desc }) => (
              <div key={en} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{en}</h3>
                <p className="text-sm text-gray-300">{isDE ? de_desc : en_desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700/50 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Adaptive HITL Thresholds", "Adaptive HITL Thresholds")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "Dynamische Anpassung von HITL-Schwellenwerten basierend auf Agent-Performance und Risikolevel.", "Dynamic adjustment of HITL thresholds based on agent performance and risk level.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700/50 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Confidence-Based Routing", "Confidence-Based Routing")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Automatisches Routing zu menschlichen Reviewern bei niedrigem Agent-Confidence-Score.", "Automatic routing to human reviewers when agent confidence score is low.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700/50 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Oversight Dashboard", "Oversight Dashboard")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Echtzeit-Dashboard für menschliche Aufsicht. Pending approvals, agent activity und risk scores.", "Real-time dashboard for human oversight. Pending approvals, agent activity and risk scores.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700/50 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Dead Man's Switch", "Dead Man's Switch")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Automatischer Agent-Stopp wenn keine menschliche Bestätigung innerhalb eines Zeitfensters erfolgt.", "Automatic agent stop when no human confirmation occurs within a time window.")}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              { n: 1, de: "Kritische Aktionen identifizieren", de_d: "Kategorisieren Sie Agent-Aktionen nach Risiko. Irreversible und high-impact Aktionen für HITL kennzeichnen.", en: "Identify critical actions", en_d: "Categorize agent actions by risk. Flag irreversible and high-impact actions for HITL." },
              { n: 2, de: "Approval Gates implementieren", de_d: "Bauen Sie Approval Gates in Agent-Workflows ein. Asynchrone Genehmigung über Slack, Email oder Dashboard.", en: "Implement approval gates", en_d: "Build approval gates into agent workflows. Asynchronous approval via Slack, email or dashboard." },
              { n: 3, de: "Escalation Rules definieren", de_d: "Definieren Sie Eskalationsregeln und Timeout-Verhalten. Wer wird bei welchem Risikolevel benachrichtigt?", en: "Define escalation rules", en_d: "Define escalation rules and timeout behavior. Who gets notified at which risk level?" },
              { n: 4, de: "Audit-Logging aktivieren", de_d: "Vollständiges Logging aller Agent-Entscheidungen mit Reasoning. Für menschliche Überprüfung zugänglich.", en: "Enable audit logging", en_d: "Full logging of all agent decisions with reasoning. Accessible for human review." },
              { n: 5, de: "Override-Mechanismen testen", de_d: "Testen Sie Emergency-Stop und Rollback regelmäßig. Übungsszenarien für das Oversight-Team.", en: "Test override mechanisms", en_d: "Test emergency stop and rollback regularly. Practice scenarios for the oversight team." },
            ].map(({ n, de, de_d, en, en_d }) => (
              <div key={n} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div>
                  <div className="font-semibold text-gray-100 mb-2">{isDE ? de : en}</div>
                  <div className="text-sm text-gray-300">{isDE ? de_d : en_d}</div>
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
              <div className="text-sm text-gray-300">{pick(isDE, "Überprüfen Sie Ihre Infrastruktur auf Schwachstellen", "Check your infrastructure for vulnerabilities")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Human Oversight Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Human Oversight-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent human oversight implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
