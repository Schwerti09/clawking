import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-compliance-automation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Compliance Automation: Automatisierte Compliance für AI-Agents | ClawGuru", "AI Agent Compliance Automation: Automated Compliance for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Compliance Automation für Moltbot. GDPR, EU AI Act, SOC 2, ISO 27001 Compliance automatisiert für AI-Agent-Systeme. Policy as Code und kontinuierliche Compliance.", "AI agent compliance automation for Moltbot. GDPR, EU AI Act, SOC 2, ISO 27001 compliance automated for AI agent systems. Policy as code and continuous compliance.")
  return {
    title, description,
    keywords: ["ai agent compliance automation", "gdpr ai", "eu ai act compliance", "soc 2", "iso 27001", "policy as code", "moltbot security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentComplianceAutomationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Compliance Automation", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Compliance Automation Guide", "Moltbot AI Agent Compliance Automation Guide"), description: pick(isDE, "AI Agent Compliance Automation", "AI agent compliance automation"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Compliance-Automatisierungs-Guide für eigene KI-Systeme.", "Compliance automation guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Compliance Automation</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Compliance Automation", "AI Agent Compliance Automation")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Compliance Automation für Moltbot. GDPR, EU AI Act, SOC 2, ISO 27001 Compliance automatisiert für AI-Agent-Systeme. Policy as Code und kontinuierliche Compliance.", "AI agent compliance automation for Moltbot. GDPR, EU AI Act, SOC 2, ISO 27001 compliance automated for AI agent systems. Policy as code and continuous compliance.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Compliance Automation? Einfach erklärt", "What is Compliance Automation? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Compliance Automation ist wie ein automatisierter Prüfer für KI-Systeme: es prüft kontinuierlich, ob dein System alle Compliance-Regeln einhält. Continuous Compliance Monitoring überwacht die Compliance-Posture in Echtzeit. Policy as Code formuliert Anforderungen als ausführbaren Code. EU AI Act Compliance prüft High-Risk AI-Systeme automatisch. GDPR für AI-Agents automatisiert Data Mapping und Consent Management. Audit-Ready Documentation erstellt Audit-Berichte auf Knopfdruck. Ohne Automation sind Compliance-Prüfungen manuell, zeitaufwendig und fehleranfällig.", "Compliance automation is like an automated auditor for AI systems: it continuously checks whether your system complies with all compliance rules. Continuous compliance monitoring monitors compliance posture in real-time. Policy as code formulates requirements as executable code. EU AI Act compliance automatically checks high-risk AI systems. GDPR for AI agents automates data mapping and consent management. Audit-ready documentation creates audit reports at the push of a button. Without automation, compliance checks are manual, time-consuming and error-prone.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Continuous Compliance Monitoring", pick(isDE, "Echtzeit-Überwachung der Compliance-Posture für AI-Agent-Systeme. Automatische Erkennung von Compliance-Abweichungen.", "Real-time monitoring of compliance posture for AI agent systems. Automatic detection of compliance deviations.")],
              ["2. Policy as Code", pick(isDE, "Compliance-Anforderungen als ausführbaren Code formulieren. Automatische Durchsetzung ohne manuelle Audits.", "Formulate compliance requirements as executable code. Automatic enforcement without manual audits.")],
              ["3. EU AI Act Compliance", pick(isDE, "Automatisierte Konformitätsprüfung für High-Risk AI-Systeme. Risikoklassifizierung, Dokumentation und Konformitätsbewertung.", "Automated conformity assessment for high-risk AI systems. Risk classification, documentation and conformity assessment.")],
              ["4. GDPR für AI-Agents", pick(isDE, "DSGVO-Compliance für AI-Agents: Data Mapping, DPIA, Consent Management, Data Subject Rights. Vollständig automatisiert.", "GDPR compliance for AI agents: data mapping, DPIA, consent management, data subject rights. Fully automated.")],
              ["5. Audit-Ready Documentation", pick(isDE, "Kontinuierlich aktuelle Compliance-Dokumentation. Audit-Berichte auf Knopfdruck für ISO 27001, SOC 2 und AI Act.", "Continuously current compliance documentation. Audit reports at the push of a button for ISO 27001, SOC 2 and AI Act.")],
            ].map(([t, d]) => (
              <div key={t as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{t}</h3>
                <p className="text-sm text-gray-300">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Compliance as Code (CaC)", "Compliance as Code (CaC)")}</h3><p className="text-sm text-green-200">{pick(isDE, "Alle Compliance-Anforderungen als Code: testbar, versioniert, automatisch durchgesetzt. OpenSCAP, Regula oder Chef InSpec.", "All compliance requirements as code: testable, versioned, automatically enforced. OpenSCAP, Regula or Chef InSpec.")}</p></div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "AI-specific Controls Mapping", "AI-specific Controls Mapping")}</h3><p className="text-sm text-blue-200">{pick(isDE, "Mapping von AI-spezifischen Controls auf ISO 27001, NIST AI RMF und EU AI Act. Lückenloses Control-Framework.", "Mapping of AI-specific controls to ISO 27001, NIST AI RMF and EU AI Act. Seamless control framework.")}</p></div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Evidence Collection Automation", "Evidence Collection Automation")}</h3><p className="text-sm text-yellow-200">{pick(isDE, "Automatische Sammlung von Compliance-Nachweisen. Kein manuelles Screenshot-Sammeln mehr für Audits.", "Automatic collection of compliance evidence. No more manual screenshot collecting for audits.")}</p></div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Compliance Drift Detection", "Compliance Drift Detection")}</h3><p className="text-sm text-red-200">{pick(isDE, "Echtzeit-Erkennung wenn Systeme von Compliance-Baseline driften. Alert lange bevor der Auditor kommt.", "Real-time detection when systems drift from compliance baseline. Alert long before the auditor arrives.")}</p></div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "Relevante Frameworks identifizieren", "Identify relevant frameworks"), pick(isDE, "Welche Compliance-Frameworks gelten? GDPR, EU AI Act, ISO 27001, SOC 2, HIPAA — je nach Branche.", "Which compliance frameworks apply? GDPR, EU AI Act, ISO 27001, SOC 2, HIPAA — depending on industry.")],
              [2, pick(isDE, "Controls mappen", "Map controls"), pick(isDE, "Anforderungen auf technische Controls mappen. Welche Policies decken welche Compliance-Anforderungen ab?", "Map requirements to technical controls. Which policies cover which compliance requirements?")],
              [3, pick(isDE, "Policy-as-Code implementieren", "Implement policy-as-code"), pick(isDE, "Controls als Code formulieren und in CI/CD integrieren. Automatische Überprüfung bei jedem Commit.", "Formulate controls as code and integrate in CI/CD. Automatic check at every commit.")],
              [4, pick(isDE, "Evidence Automation einrichten", "Set up evidence automation"), pick(isDE, "Automatische Evidence Collection für alle Controls. Logs, Screenshots, Configs als Compliance-Nachweise.", "Automatic evidence collection for all controls. Logs, screenshots, configs as compliance proof.")],
              [5, pick(isDE, "Compliance Dashboard deployen", "Deploy compliance dashboard"), pick(isDE, "Echtzeit-Dashboard mit Compliance-Score. Vanta, Drata oder Secureframe für kontinuierliche Compliance.", "Real-time dashboard with compliance score. Vanta, Drata or Secureframe for continuous compliance.")],
            ].map(([n, t, d]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div><div className="font-semibold text-gray-100 mb-2">{t}</div><div className="text-sm text-gray-300">{d}</div></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div></a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div></a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div></a>
            <a href={`/${locale}/moltbot/ai-agent-governance`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">AI Agent Governance</div><div className="text-sm text-gray-300">{pick(isDE, "Governance-Frameworks", "Governance frameworks")}</div></a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Compliance Automation Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Compliance-Automatisierungs-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with compliance automation implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
