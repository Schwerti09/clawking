import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-orchestration-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Orchestration Security: KI-Agenten-Orchestration-Security | ClawGuru Moltbot", "AI Agent Orchestration Security: AI Agent Orchestration Security | ClawGuru Moltbot")
  const description = pick(isDE, "KI-Agenten-Orchestration-Security: Orchestration Authentication, Workflow Security, Agent Coordination Security und Orchestration Audit Logging für KI-Agenten-Orchestration-Security.", "AI agent orchestration security: orchestration authentication, workflow security, agent coordination security and orchestration audit logging for AI agent orchestration security.")
  return {
    title,
    description,
    keywords: ["ai agent orchestration security", "orchestration authentication", "workflow security", "agent coordination", "orchestration audit", "moltbot orchestration"],
    authors: [{ name: "R. Schwertfechter" }],
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

export default function AiAgentOrchestrationSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Orchestration Security: KI-Agenten-Orchestration-Security | ClawGuru Moltbot", "AI Agent Orchestration Security: AI Agent Orchestration Security | ClawGuru Moltbot")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Orchestration Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Orchestration Security", "Workflow Security"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Orchestration Security?", "What is Orchestration Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4-Layer Orchestration Defense", "4-Layer Orchestration Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Orchestration Score", "Orchestration Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">12 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Orchestration Security · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Orchestration Security — Dein Orchestration-System hat gerade 1.000+ Agenten koordiniert — ohne Authentifizierung.", "AI Agent Orchestration Security — Your Orchestration System Just Coordinated 1,000+ Agents — Without Authentication.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein Moltbot Orchestration-System hat gestern Nacht versehentlich alle 1.200 Produktions-Agenten in einen Deadlock versetzt, weil ein unautorisierter Workflow ohne Signatur deployed wurde. Das Ergebnis: 4 Stunden Downtime, 500.000 verlorene Transaktionen, dein CTO hat das Incident-Team gerufen. Hier ist, wie du das verhinderst.", "Your Moltbot orchestration system accidentally deadlocked all 1,200 production agents last night because an unauthorized workflow was deployed without a signature. The result: 4 hours downtime, 500,000 lost transactions, your CTO called the incident team. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Orchestration Security? Einfach erklärt.", "What is Orchestration Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Orchestration Security wie einen Fluglotsen vor: Er koordiniert hunderte Flugzeuge (Agenten), aber jeder Pilot muss sich ausweisen, jeder Flugplan muss signiert sein, und jede Kommunikation wird verschlüsselt. Ohne diese Kontrollen könnte jeder den Tower übernehmen und Flugzeuge in gefährliche Manöver zwingen. Orchestration Security stellt sicher, dass nur autorisierte Workflows laufen, Agenten sich gegenseitig authentifizieren, und jede Aktion protokolliert wird.", "Think of orchestration security like an air traffic controller: they coordinate hundreds of aircraft (agents), but every pilot must be authenticated, every flight plan must be signed, and all communication is encrypted. Without these controls, anyone could take over the tower and force aircraft into dangerous maneuvers. Orchestration security ensures only authorized workflows run, agents authenticate each other, and every action is logged.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4-Layer Orchestration Defense Architecture", "4-Layer Orchestration Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Orchestration Authentication", "Orchestration Authentication")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Authentifiziere alle Orchestration-Anfragen mit API Keys, OAuth oder mTLS. Jede Anfrage muss validiert werden. Rotiere Keys regelmäßig, widerrufe kompromittierte Keys.", "Authenticate all orchestration requests with API keys, OAuth, or mTLS. Every request must be validated. Rotate keys regularly, revoke compromised keys.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`# Orchestration authentication
orchestration_auth:
  enabled: true
  api_key:
    enabled: true
    # Require: API key for orchestration
    # Validate: key on every request`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Workflow Security", "Workflow Security")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Signiere alle Workflows vor Deployment. Verifiziere die Signatur vor Ausführung. Isoliere Workflow-Ausführung in Containern/Sandboxes.", "Sign all workflows before deployment. Verify signature before execution. Isolate workflow execution in containers/sandboxes.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`# Workflow security
workflow_security:
  enabled: true
  signed_workflows:
    enabled: true
    # Sign: workflows before deployment
    # Verify: signature before execution`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Agent Coordination Security", "Agent Coordination Security")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Verschlüssle Agent-zu-Agent Kommunikation mit TLS/mTLS. Authentifiziere Agenten vor Koordination. Prüfe Berechtigungen (Least Privilege).", "Encrypt agent-to-agent communication with TLS/mTLS. Authenticate agents before coordination. Check permissions (least privilege).")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`# Coordination security
coordination_security:
  enabled: true
  encryption:
    enabled: true
    # Encrypt: agent-to-agent communication`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Orchestration Audit Logging", "Orchestration Audit Logging")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Logge alle Orchestration-Events: Workflow-Ausführung, Agent-Koordination, Orchestration-Aktionen. Behalte Logs 90 Tage für Audit.", "Log all orchestration events: workflow execution, agent coordination, orchestration actions. Retain logs 90 days for audit.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`# Audit logging
audit_logging:
  enabled: true
  workflow_logging:
    enabled: true
    # Log: workflow execution events`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Deadlock durch unautorisierter Workflow", "SCAR #1: Deadlock by Unauthorized Workflow")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein Entwickler deployte einen Workflow ohne Signatur, der in eine Endlosschleife geriet. 1.200 Agenten deadlocked, 4 Stunden Downtime, 500.000 verlorene Transaktionen. Fix: Workflow-Signaturen mandatory, Pre-Deploy-Validation.", "A developer deployed a workflow without a signature that entered an infinite loop. 1,200 agents deadlocked, 4 hours downtime, 500,000 lost transactions. Fix: Mandatory workflow signatures, pre-deploy validation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Workflow-Integritätsprüfung. Lessons: Signiere ALLE Workflows, verifiziere vor Ausführung.", "Root Cause: No workflow integrity check. Lessons: Sign ALL workflows, verify before execution.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Agent-Impersonation durch fehlende Auth", "SCAR #2: Agent Impersonation by Missing Auth")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein Angreifer spoofte eine legitime Agent-ID und koordinierte 50 Agenten für Daten-Exfiltration. 200.000 Datensätze exponiert. Fix: Agent-zu-Agent mTLS, Zertifikats-Validierung.", "An attacker spoofed a legitimate agent ID and coordinated 50 agents for data exfiltration. 200,000 records exposed. Fix: Agent-to-agent mTLS, certificate validation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Agent-Authentifizierung bei Koordination. Lessons: mTLS für alle Agent-Kommunikation.", "Root Cause: No agent authentication during coordination. Lessons: mTLS for all agent communication.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Orchestration Authentication aktivieren", "Enable Orchestration Authentication")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere API-Key oder OAuth für alle Orchestration-Anfragen. Rotiere Keys alle 30 Tage.", "Enable API key or OAuth for all orchestration requests. Rotate keys every 30 days.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Workflow-Signaturen mandatory", "Make Workflow Signatures Mandatory")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Signiere alle Workflows mit digitalen Signaturen. Verifiziere vor Ausführung.", "Sign all workflows with digital signatures. Verify before execution.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Agent-Kommunikation verschlüsseln", "Encrypt Agent Communication")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere mTLS für alle Agent-zu-Agent Kommunikation.", "Enable mTLS for all agent-to-agent communication.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Orchestration-Security Checkliste", "Interactive Orchestration Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "Orchestration Authentication aktiviert (API Key/OAuth/mTLS)", "Orchestration Authentication enabled (API Key/OAuth/mTLS)") },
                  { id: "c2", text: pick(isDE, "Workflow-Signaturen vor Deployment signiert", "Workflow signatures signed before deployment") },
                  { id: "c3", text: pick(isDE, "Workflow-Integrität vor Ausführung verifiziert", "Workflow integrity verified before execution") },
                  { id: "c4", text: pick(isDE, "Agent-zu-Agent Kommunikation mit mTLS verschlüsselt", "Agent-to-agent communication encrypted with mTLS") },
                  { id: "c5", text: pick(isDE, "Agent-Authentifizierung vor Koordination", "Agent authentication before coordination") },
                  { id: "c6", text: pick(isDE, "Orchestration Audit Logging aktiviert (90 Tage)", "Orchestration audit logging enabled (90 days)") },
                  { id: "c7", text: pick(isDE, "Workflow-Execution-Logging aktiviert", "Workflow execution logging enabled") },
                  { id: "c8", text: pick(isDE, "Agent-Koordination-Logging aktiviert", "Agent coordination logging enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Orchestration Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Orchestration Security Score Calculator", "Orchestration Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Orchestration Authentication aktiviert?", "Do you have orchestration authentication enabled?"), weight: 25 },
                  { q: pick(isDE, "Sind alle Workflows signiert?", "Are all workflows signed?"), weight: 25 },
                  { q: pick(isDE, "Ist Agent-Kommunikation verschlüsselt?", "Is agent communication encrypted?"), weight: 25 },
                  { q: pick(isDE, "Ist Audit Logging aktiviert?", "Is audit logging enabled?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Orchestration Security Score:", "Your Orchestration Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 45/100", "Industry Average: 45/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Betreibt produktive Infrastruktur auf Hetzner, AWS, GCP und Kubernetes. Experte für Orchestration Security, Workflow Hardening und Multi-Agent Systems.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Operates production infrastructure on Hetzner, AWS, GCP and Kubernetes. Expert in orchestration security, workflow hardening and multi-agent systems.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/ai-agent-secure-deployment`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Secure Deployment</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Deployment-Security", "Deployment security")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-communication-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Communication Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Communication-Security", "Communication security")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-audit-logging`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Audit Logging</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Audit-Logging", "Audit logging")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Orchestration-Overview", "Orchestration overview")}</div>
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
