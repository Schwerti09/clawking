import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-continuous-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Continuous Security: Kontinuierliche Sicherheit für AI-Agents | ClawGuru", "AI Agent Continuous Security: Continuous Security for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Continuous Security für Moltbot-Deployments. Continuous Monitoring, Automated Patching, Security Scanning und Incident Response für AI-Agents. Mit Moltbot automatisierbar.", "AI agent continuous security for Moltbot deployments. Continuous monitoring, automated patching, security scanning and incident response for AI agents. Automatable with Moltbot.")
  return {
    title,
    description,
    keywords: [
      "ai agent continuous security", "continuous monitoring", "automated patching",
      "security scanning", "incident response", "ai agent devsecops",
      "moltbot security", "ai agent automation", "continuous security 2026",
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
    robots: "index, follow"
  }
}

export default function AIAgentContinuousSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Continuous Security", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "AI Agent Continuous Security Guide", "AI Agent Continuous Security Guide"), description: pick(isDE, "AI Agent Continuous Security", "AI agent continuous security"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Continuous Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Continuous Security", "AI Agent Continuous Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Continuous Security für Moltbot-Deployments. Continuous Monitoring, Automated Patching, Security Scanning und Incident Response für AI-Agents.", "AI agent continuous security for Moltbot deployments. Continuous monitoring, automated patching, security scanning and incident response for AI agents.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Continuous Security? Einfach erklärt", "What is AI Agent Continuous Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Continuous Security automatisiert Security-Prozesse für KI-Agenten: Continuous Monitoring überwacht Agent-Aktivitäten und Metriken in Real-time. Automated Patching auto-updatet Dependencies und Models mit Auto-Update Workflows. Security Scanning integriert SAST/DAST/Dependency Scans in CI/CD-Pipelines. Incident Response automatisiert Auto-Remediation und Escalation Workflows für Security Events. Security Posture Management führt Continuous Assessment und Risk Scoring durch.", "AI agent continuous security automates security processes for AI agents: continuous monitoring monitors agent activities and metrics in real-time. Automated patching auto-updates dependencies and models with auto-update workflows. Security scanning integrates SAST/DAST/dependency scans in CI/CD pipelines. Incident response automates auto-remediation and escalation workflows for security events. Security posture management performs continuous assessment and risk scoring.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten", "Jump to core concepts")}</p>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "1. Continuous Monitoring", "1. Continuous Monitoring")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Continuous Monitoring für AI-Agents. Real-time Überwachung von Agent-Aktivitäten und Metriken.", "Continuous monitoring for AI agents. Real-time monitoring of agent activities and metrics.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "2. Automated Patching", "2. Automated Patching")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Automated Patching für AI-Agent-Komponenten. Auto-Updates für Dependencies und Models.", "Automated patching for AI agent components. Auto-updates for dependencies and models.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "3. Security Scanning", "3. Security Scanning")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Security Scanning für AI-Agents. Automatisierte Vulnerability Scans in CI/CD-Pipelines.", "Security scanning for AI agents. Automated vulnerability scans in CI/CD pipelines.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "4. Incident Response", "4. Incident Response")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Automated Incident Response für AI-Agents. Auto-Remediation und Alerting für Security Events.", "Automated incident response for AI agents. Auto-remediation and alerting for security events.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "5. Security Posture Management", "5. Security Posture Management")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Security Posture Management für AI-Agents. Continuous Assessment und Risk Scoring.", "Security posture management for AI agents. Continuous assessment and risk scoring.")}</p>
            </div>
          </div>
        </section>

        {/* Advanced Techniques */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700/50 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "DevSecOps Integration", "DevSecOps Integration")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "DevSecOps Integration für AI-Agents. Security als First-Class Citizen in CI/CD.", "DevSecOps integration for AI agents. Security as first-class citizen in CI/CD.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700/50 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Security as Code", "Security as Code")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Security as Code für AI-Agents. Declarative Security Policies und Automated Enforcement.", "Security as code for AI agents. Declarative security policies and automated enforcement.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700/50 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Auto-Remediation", "Auto-Remediation")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Auto-Remediation für AI-Agent-Security Issues. Automated Fixes für Common Vulnerabilities.", "Auto-remediation for AI agent security issues. Automated fixes for common vulnerabilities.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700/50 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Continuous Compliance", "Continuous Compliance")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Continuous Compliance für AI-Agents. Automatisierte Compliance Checks und Reporting.", "Continuous compliance for AI agents. Automated compliance checks and reporting.")}</p>
            </div>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Monitoring Pipeline aufbauen", "Build monitoring pipeline")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Implementieren Sie Continuous Monitoring für AI-Agents. Metrics, Logs und Alerts.", "Implement continuous monitoring for AI agents. Metrics, logs and alerts.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Automated Patching implementieren", "Implement automated patching")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Implementieren Sie Automated Patching für Dependencies und Models. Auto-Update Workflows.", "Implement automated patching for dependencies and models. Auto-update workflows.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Security Scanning in CI/CD", "Security scanning in CI/CD")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Integrieren Sie Security Scanning in CI/CD-Pipelines. SAST, DAST und Dependency Scans.", "Integrate security scanning in CI/CD pipelines. SAST, DAST and dependency scans.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Incident Response Automation", "Incident response automation")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Implementieren Sie Automated Incident Response. Auto-Remediation und Escalation Workflows.", "Implement automated incident response. Auto-remediation and escalation workflows.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Security Posture Dashboard", "Security posture dashboard")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Erstellen Sie ein Security Posture Dashboard für Continuous Assessment und Reporting.", "Create a security posture dashboard for continuous assessment and reporting.")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Further Resources */}
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Continuous Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Continuous Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent continuous security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
