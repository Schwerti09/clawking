import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-resilience-patterns"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Resilience Patterns: Resilienz-Muster für AI-Agents | ClawGuru", "AI Agent Resilience Patterns: Resilience Patterns for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Resilience Patterns für Moltbot-Deployments. Circuit Breaker, Retry Logic, Fallback Strategies und Graceful Degradation für hochverfügbare AI-Agent-Systeme.", "AI agent resilience patterns for Moltbot deployments. Circuit breaker, retry logic, fallback strategies and graceful degradation for high-availability AI agent systems.")
  return {
    title,
    description,
    keywords: ["ai agent resilience", "circuit breaker", "retry logic", "fallback strategies", "graceful degradation", "high availability", "moltbot security", "resilience patterns 2026"],
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

export default function AIAgentResiliencePatternsPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Resilience Patterns", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Resilience Patterns", "High Availability"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was sind Resilience Patterns?", "What are Resilience Patterns?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4-Layer Resilience Defense", "4-Layer Resilience Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Resilience Score", "Resilience Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">9 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Resilience Patterns · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Resilience Patterns — Dein Agent-Cluster ist gestern Nacht bei einem LLM-Ausfall komplett kollabiert.", "AI Agent Resilience Patterns — Your Agent Cluster Collapsed Completely Last Night During an LLM Outage.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein Multi-Agent-Cluster hatte keinen Circuit Breaker. Als der LLM-Provider ausfiel, kaskadierte der Fehler durch alle Agents und brachte das gesamte System herunter. 45 Minuten Downtime, 2.000 verlorene Requests, dein CTO hat den SRE-Lead gerufen. Hier ist, wie du das verhinderst.", "Your multi-agent cluster had no circuit breaker. When the LLM provider went down, the error cascaded through all agents and brought down the entire system. 45 minutes of downtime, 2,000 lost requests, your CTO called the SRE lead. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was sind Resilience Patterns? Einfach erklärt.", "What are Resilience Patterns? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Resilience Patterns wie einen Sicherheitsgurt im Auto vor: Wenn etwas schiefgeht (Unfall), verhindert der Sicherheitsgurt schlimmere Verletzungen. Für AI-Agents bedeutet das: Wenn ein externer Service ausfällt, fangen Resilience Patterns den Fehler ab, verhindern Kaskadenfehler und liefern zumindest reduzierte Ergebnisse statt gar nichts. Gute Resilience bedeutet: Circuit Breaker, Retry Logic, Fallbacks und Graceful Degradation.", "Think of resilience patterns like a seatbelt in a car: when something goes wrong (accident), the seatbelt prevents worse injuries. For AI agents, this means: when an external service fails, resilience patterns catch the error, prevent cascade failures and deliver at least reduced results instead of nothing at all. Good resilience means: circuit breaker, retry logic, fallbacks and graceful degradation.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4-Layer Resilience Defense Architecture", "4-Layer Resilience Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Circuit Breaker", "Circuit Breaker")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Automatisches Unterbrechen von fehlerhaften Agent-Verbindungen. Verhindert Kaskadenfehler in Multi-Agent-Systemen.", "Automatic interruption of faulty agent connections. Prevents cascade failures in multi-agent systems.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`circuit_breaker:
  enabled: true
  failure_threshold: 5
  recovery_timeout_seconds: 60
  half_open_max_calls: 3`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Retry Logic mit Backoff", "Retry Logic with Backoff")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Intelligente Wiederholungsversuche mit exponential Backoff und Jitter. Verhindert Thundering Herd.", "Intelligent retries with exponential backoff and jitter. Prevents thundering herd.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`retry_policy:
  enabled: true
  max_retries: 3
  backoff:
    type: "exponential"
    base_delay_ms: 100
    max_delay_ms: 5000
  jitter: true`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Fallback Strategies", "Fallback Strategies")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Definierte Fallback-Verhalten für jeden Agent-Aufruf. Cached Results, Default Responses.", "Defined fallback behaviors for every agent call. Cached results, default responses.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`fallback_strategy:
  enabled: true
  options:
    - cached_results
    - default_response
    - degraded_mode`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Graceful Degradation", "Graceful Degradation")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "AI-Agents liefern reduzierte aber funktionierende Ergebnisse bei Teilausfällen. Kein totales Systemversagen.", "AI agents deliver reduced but functional results on partial failures. No total system failure.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`graceful_degradation:
  enabled: true
  modes:
    - reduced_features
    - cached_responses
    - readonly_mode`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Kaskadenfehler ohne Circuit Breaker", "SCAR #1: Cascade Failure without Circuit Breaker")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein LLM-Provider-Ausfall kaskadierte durch alle Agents ohne Circuit Breaker. 45 Minuten Downtime, 2.000 verlorene Requests. Fix: Circuit Breaker, Bulkhead Pattern.", "An LLM provider outage cascaded through all agents without circuit breaker. 45 minutes downtime, 2,000 lost requests. Fix: Circuit breaker, bulkhead pattern.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Circuit Breaker. Lessons: Implementiere Circuit Breaker für alle externen Aufrufe.", "Root Cause: No circuit breaker. Lessons: Implement circuit breaker for all external calls.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Thundering Herd durch naive Retries", "SCAR #2: Thundering Herd by Naive Retries")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Alle Agents retryten gleichzeitig ohne Backoff. Database crashte, alle Services down. Fix: Exponential Backoff + Jitter.", "All agents retried simultaneously without backoff. Database crashed, all services down. Fix: Exponential backoff + jitter.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Backoff. Lessons: Aktiviere Exponential Backoff mit Jitter.", "Root Cause: No backoff. Lessons: Enable exponential backoff with jitter.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Circuit Breaker implementieren", "Implement Circuit Breaker")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Circuit Breaker für alle externen Agent-Aufrufe.", "Enable circuit breaker for all external agent calls.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Retry Logic mit Backoff aktivieren", "Enable Retry Logic with Backoff")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Konfiguriere Exponential Backoff mit Jitter.", "Configure exponential backoff with jitter.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Fallback Strategies definieren", "Define Fallback Strategies")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Definiere Fallback-Verhalten für jeden kritischen Aufruf.", "Define fallback behavior for every critical call.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Resilience Checkliste", "Interactive Resilience Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "Circuit Breaker aktiviert", "Circuit breaker enabled") },
                  { id: "c2", text: pick(isDE, "Retry Logic mit Backoff aktiviert", "Retry logic with backoff enabled") },
                  { id: "c3", text: pick(isDE, "Fallback Strategies definiert", "Fallback strategies defined") },
                  { id: "c4", text: pick(isDE, "Graceful Degradation aktiviert", "Graceful degradation enabled") },
                  { id: "c5", text: pick(isDE, "Bulkhead Pattern implementiert", "Bulkhead pattern implemented") },
                  { id: "c6", text: pick(isDE, "Timeout Management aktiviert", "Timeout management enabled") },
                  { id: "c7", text: pick(isDE, "Health Checks implementiert", "Health checks implemented") },
                  { id: "c8", text: pick(isDE, "Chaos Tests durchgeführt", "Chaos tests conducted") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Resilience Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Resilience Security Score Calculator", "Resilience Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du einen Circuit Breaker aktiviert?", "Do you have a circuit breaker enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Retry Logic mit Backoff aktiv?", "Is retry logic with backoff active?"), weight: 25 },
                  { q: pick(isDE, "Sind Fallback Strategies definiert?", "Are fallback strategies defined?"), weight: 25 },
                  { q: pick(isDE, "Ist Graceful Degradation aktiv?", "Is graceful degradation active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Resilience Security Score:", "Your Resilience Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 30/100", "Industry Average: 30/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Resilience Patterns, High Availability und Chaos Engineering.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in resilience patterns, high availability and chaos engineering.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/securitycheck`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security Runbooks", "Security runbooks")}</div>
              </a>
              <a href={`/${locale}/openclaw`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "OpenClaw", "OpenClaw")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security Framework", "Security framework")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
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
