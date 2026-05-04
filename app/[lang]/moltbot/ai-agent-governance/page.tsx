import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import { buildEEATArticleSchema } from "@/lib/seo/eeat-helper"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-governance"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Governance: Governance-Frameworks für AI-Agents | ClawGuru", "AI Agent Governance: Governance Frameworks for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Governance für Moltbot-Deployments. Policy Enforcement, Audit Trails, Compliance Monitoring und Risk Management für AI-Agents. Mit Moltbot automatisierbar.", "AI agent governance for Moltbot deployments. Policy enforcement, audit trails, compliance monitoring and risk management for AI agents. Automatable with Moltbot.")
  
  const articleSchema = buildEEATArticleSchema({
    headline: title,
    description,
    url: pageUrl,
    datePublished: "2026-04-28",
    dateModified: "2026-05-04",
    locale,
    articleType: "TechArticle",
  })

  return {
    title,
    description,
    keywords: [
      "ai agent governance", "policy enforcement", "audit trails",
      "compliance monitoring", "risk management", "ai agent oversight",
      "moltbot security", "ai agent compliance", "governance 2026",
      "security check", "runbooks", "openclaw"
    ],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      images: ["/og-image.png"]
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
    other: {
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}

export default function AIAgentGovernancePage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Governance", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Governance Guide", "Moltbot AI Agent Governance Guide"), description: pick(isDE, "AI Agent Governance", "AI agent governance"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Governance-Guide für eigene KI-Systeme.", "Governance guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Agent Governance</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "AI Agent Governance", "AI Agent Governance")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "AI Agent Governance für Moltbot-Deployments. Policy Enforcement, Audit Trails, Compliance Monitoring und Risk Management für AI-Agents.", "AI agent governance for Moltbot deployments. Policy enforcement, audit trails, compliance monitoring and risk management for AI agents.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Governance? Einfach erklärt", "What is AI Agent Governance? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Governance ist wie ein Management-System für KI-Agenten: es definiert Regeln, überwacht das Verhalten und stellt sicher, dass Agenten sich an Compliance-Standards halten. Policy Enforcement erzwingt Regeln für Agent-Verhalten. Audit Trails zeichnen alle Aktionen auf. Compliance Monitoring prüft Einhaltung von GDPR und AI Act. Risk Management bewertet und mindert Risiken. Human Oversight stellt sicher, dass kritische Entscheidungen von Menschen geprüft werden. Ohne Governance können Agenten unkontrolliert agieren, Compliance-Verstöße begehen oder Sicherheitsrisiken verursachen.", "AI agent governance is like a management system for AI agents: it defines rules, monitors behavior, and ensures agents comply with compliance standards. Policy enforcement enforces rules for agent behavior. Audit trails record all actions. Compliance monitoring checks GDPR and AI Act compliance. Risk management assesses and mitigates risks. Human oversight ensures critical decisions are reviewed by humans. Without governance, agents can act uncontrollably, commit compliance violations, or cause security risks.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Kernkonzepte", "Core Concepts")}
          </h2>
          <div className="space-y-4">
            {[
              { title: pick(isDE, "1. Policy Enforcement", "1. Policy Enforcement"), desc: pick(isDE, "Policy Enforcement für AI-Agents. Regeln und Constraints für Agent-Verhalten und Entscheidungen.", "Policy enforcement for AI agents. Rules and constraints for agent behavior and decisions.") },
              { title: pick(isDE, "2. Audit Trails", "2. Audit Trails"), desc: pick(isDE, "Audit Trails für AI-Agents. Vollständige Aufzeichnung von Agent-Aktionen, Entscheidungen und Kontext.", "Audit trails for AI agents. Complete recording of agent actions, decisions and context.") },
              { title: pick(isDE, "3. Compliance Monitoring", "3. Compliance Monitoring"), desc: pick(isDE, "Compliance Monitoring für AI-Agents. Überwachung von GDPR/DSGVO, AI Act und anderen Standards.", "Compliance monitoring for AI agents. Monitoring GDPR, AI Act and other standards.") },
              { title: pick(isDE, "4. Risk Management", "4. Risk Management"), desc: pick(isDE, "Risk Management für AI-Agents. Risikobewertung, Mitigation und Incident Response.", "Risk management for AI agents. Risk assessment, mitigation and incident response.") },
              { title: pick(isDE, "5. Human Oversight", "5. Human Oversight"), desc: pick(isDE, "Human Oversight für AI-Agents. Human-in-the-Loop und Approval Workflows für kritische Aktionen.", "Human oversight for AI agents. Human-in-the-loop and approval workflows for critical actions.") },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Techniques */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}
          </h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Policy-as-Code", "Policy-as-Code")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "Policy-as-Code für AI-Agent-Governance. Declarative Policies und Automated Enforcement.", "Policy-as-code for AI agent governance. Declarative policies and automated enforcement.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Explainability & Transparency", "Explainability & Transparency")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Explainability und Transparency für AI-Agent-Entscheidungen. Decision Logging und Reasoning Traces.", "Explainability and transparency for AI agent decisions. Decision logging and reasoning traces.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Ethical Guidelines", "Ethical Guidelines")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Ethical Guidelines für AI-Agents. Fairness, Bias Mitigation und Responsible AI.", "Ethical guidelines for AI agents. Fairness, bias mitigation and responsible AI.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Governance Dashboard", "Governance Dashboard")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Governance Dashboard für AI-Agents. Real-time Monitoring von Policies, Compliance und Risiken.", "Governance dashboard for AI agents. Real-time monitoring of policies, compliance and risks.")}</p>
            </div>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Implementierungsschritte", "Implementation Steps")}
          </h2>
          <div className="space-y-6">
            {[
              { step: "1", title: pick(isDE, "Governance Framework definieren", "Define governance framework"), desc: pick(isDE, "Definieren Sie ein Governance Framework für AI-Agents. Policies, Rollen und Verantwortlichkeiten.", "Define a governance framework for AI agents. Policies, roles and responsibilities.") },
              { step: "2", title: pick(isDE, "Policy Enforcement implementieren", "Implement policy enforcement"), desc: pick(isDE, "Implementieren Sie Policy Enforcement mit Policy-as-Code. Automatisierte Validierung.", "Implement policy enforcement with policy-as-code. Automated validation.") },
              { step: "3", title: pick(isDE, "Audit Trails einrichten", "Set up audit trails"), desc: pick(isDE, "Richten Sie Audit Trails für alle Agent-Aktionen ein. Vollständige Logging und Traceability.", "Set up audit trails for all agent actions. Complete logging and traceability.") },
              { step: "4", title: pick(isDE, "Compliance Monitoring", "Compliance monitoring"), desc: pick(isDE, "Implementieren Sie Compliance Monitoring für AI-Agents. GDPR, AI Act und Standards überwachen.", "Implement compliance monitoring for AI agents. Monitor GDPR, AI Act and standards.") },
              { step: "5", title: pick(isDE, "Governance Dashboard", "Governance dashboard"), desc: pick(isDE, "Erstellen Sie ein Governance Dashboard für Monitoring und Reporting. Real-time Insights.", "Create a governance dashboard for monitoring and reporting. Real-time insights.") },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{item.step}</div>
                <div>
                  <div className="font-semibold text-gray-100 mb-2">{item.title}</div>
                  <div className="text-sm text-gray-300">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Further Resources */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
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
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Governance Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI-Agent-Governance-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent governance implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
