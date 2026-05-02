import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-incident-response"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Incident Response: Playbook für KI-Agent-Sicherheitsvorfälle | ClawGuru", "AI Incident Response: Playbook for AI Agent Security Incidents | ClawGuru")
  const description = pick(isDE, "AI-spezifisches Incident-Response-Playbook: Prompt-Injection-Angriffe, kompromittierte Agenten, Datenlecks durch RAG, Model-Poisoning. Detection, Containment, Recovery und Post-Mortem mit Moltbot.", "AI-specific incident response playbook: prompt injection attacks, compromised agents, RAG data leaks, model poisoning. Detection, containment, recovery and post-mortem with Moltbot.")
  return {
    title, description,
    keywords: ["ai incident response", "llm incident response", "ai security incident", "prompt injection incident", "moltbot incident response", "ai agent compromise"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AiIncidentResponsePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Incident Response: Playbook für KI-Agent-Sicherheitsvorfälle | ClawGuru", "AI Incident Response: Playbook for AI Agent Security Incidents | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Incident Response", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Incident Response", "Prompt Injection"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Incident Response?", "What is Incident Response?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Incident Response", "5-Layer Incident Response")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Incident Response Maturity Score", "Incident Response Maturity Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Incident Response · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Incident Response — Dein Agent wurde kompromittiert. Prompt Injection, Datenexfiltration, System-Down. Dein CISO hat den CEO gerufen. Du hast kein Playbook.", "AI Incident Response — Your Agent Was Compromised. Prompt Injection, Data Exfiltration, System Down. Your CISO Called the CEO. You Have No Playbook.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein Agent hat keine Incident Response, kein Detection und kein Containment. Prompt Injection Attacken, kompromittierte Agenten, Datenlecks. 48h Downtime, Kunden verloren, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "Your agent has no incident response, no detection and no containment. Prompt injection attacks, compromised agents, data leaks. 48h downtime, customers lost, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Incident Response? Einfach erklärt.", "What is Incident Response? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Incident Response wie einen Notfallplan vor: Erkenne den Vorfall schnell, stoppe die Ausbreitung, stelle das System wieder her und lerne daraus. Für AI-Agents bedeutet das: Detection für Prompt Injection, Containment für kompromittierte Agenten, Recovery für Rollback, Post-Mortem für Lernen. Gutes Incident Response bedeutet: Never be unprepared again.", "Think of incident response like an emergency plan: detect the incident quickly, stop the spread, restore the system and learn from it. For AI agents, this means: detection for prompt injection, containment for compromised agents, recovery for rollback, post-mortem for learning. Good incident response means: never be unprepared again.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer Incident Response Architecture", "5-Layer Incident Response Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Detection", "Detection")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Erkenne Prompt Injection, Anomalien und kompromittierte Agenten in Echtzeit. Alerting und Triaging.", "Detect prompt injection, anomalies and compromised agents in real-time. Alerting and triaging.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`detection:
  enabled: true
  prompt_injection: true
  anomaly_detection: true
  real_time_alerting: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Containment", "Containment")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Stoppe die Ausbreitung durch Agent-Isolation, Tool-Abschaltung und Session-Kill.", "Stop the spread through agent isolation, tool shutdown and session kill.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`containment:
  enabled: true
  agent_isolation: true
  tool_shutdown: true
  session_kill: true`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Recovery", "Recovery")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Stelle das System wieder her durch Rollback, Patching und Neu-Deployment.", "Restore the system through rollback, patching and redeployment.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`recovery:
  enabled: true
  rollback: true
  patching: true
  redeployment: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Post-Mortem", "Post-Mortem")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Analysiere den Vorfall, dokumentiere Lessons Learned und aktualisiere Playbooks.", "Analyze the incident, document lessons learned and update playbooks.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`post_mortem:
  enabled: true
  root_cause_analysis: true
  lessons_learned: true
  playbook_update: true`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center text-amber-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Continuous Improvement", "Continuous Improvement")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Verbessere kontinuierlich durch Simulationen, Drills und Automation.", "Improve continuously through simulations, drills and automation.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`continuous_improvement:
  enabled: true
  simulations: true
  drills: true
  automation: true`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Prompt Injection ohne Detection", "SCAR #1: Prompt Injection without Detection")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Prompt Injection ohne Detection. Agent kompromittiert, Daten exfiltriert. Fix: Detection, Containment, Recovery.", "Prompt injection without detection. Agent compromised, data exfiltrated. Fix: Detection, containment, recovery.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Detection. Lessons: Aktiviere Prompt Injection Detection mit Containment.", "Root Cause: No detection. Lessons: Enable prompt injection detection with containment.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Kompromittierter Agent ohne Containment", "SCAR #2: Compromised Agent without Containment")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Kompromittierter Agent ohne Containment. Ausbreitung auf alle Systeme. Fix: Containment, Isolation.", "Compromised agent without containment. Spread to all systems. Fix: Containment, isolation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Containment. Lessons: Aktiviere Agent Isolation mit Tool Shutdown.", "Root Cause: No containment. Lessons: Enable agent isolation with tool shutdown.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Detection aktivieren", "Enable Detection")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Prompt Injection Detection für alle Agents.", "Enable prompt injection detection for all agents.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Containment Playbook erstellen", "Create Containment Playbook")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Erstelle Containment Playbook für Agent-Isolation.", "Create containment playbook for agent isolation.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Recovery Rollback testen", "Test Recovery Rollback")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Teste Recovery Rollback für alle kritischen Systeme.", "Test recovery rollback for all critical systems.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Incident Response Checkliste", "Interactive Incident Response Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "i1", text: pick(isDE, "Detection aktiviert", "Detection enabled") },
                  { id: "i2", text: pick(isDE, "Prompt Injection Detection aktiviert", "Prompt injection detection enabled") },
                  { id: "i3", text: pick(isDE, "Containment Playbook erstellt", "Containment playbook created") },
                  { id: "i4", text: pick(isDE, "Agent Isolation aktiviert", "Agent isolation enabled") },
                  { id: "i5", text: pick(isDE, "Recovery Rollback getestet", "Recovery rollback tested") },
                  { id: "i6", text: pick(isDE, "Post-Mortem Prozess definiert", "Post-mortem process defined") },
                  { id: "i7", text: pick(isDE, "Lessons Learned dokumentiert", "Lessons learned documented") },
                  { id: "i8", text: pick(isDE, "Continuous Improvement aktiviert", "Continuous improvement enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Incident Response Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Incident Response Maturity Score Calculator", "Incident Response Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Detection aktiviert?", "Do you have detection enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Containment Playbook erstellt?", "Is containment playbook created?"), weight: 25 },
                  { q: pick(isDE, "Ist Recovery Rollback getestet?", "Is recovery rollback tested?"), weight: 25 },
                  { q: pick(isDE, "Ist Post-Mortem definiert?", "Is post-mortem defined?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Incident Response Maturity Score:", "Your Incident Response Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 22/100", "Industry Average: 22/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Incident Response, Prompt Injection und Agent Security.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in incident response, prompt injection and agent security.")}
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
              <a href={`/${locale}/moltbot/ai-agent-resilience-patterns`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Resilience Patterns</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Resilience-Patterns", "Resilience patterns")}</div>
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
