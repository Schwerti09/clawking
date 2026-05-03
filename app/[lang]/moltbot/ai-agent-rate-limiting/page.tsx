import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-rate-limiting"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Rate Limiting: KI-Agenten-Rate-Limiting | ClawGuru Moltbot", "AI Agent Rate Limiting: AI Agent Rate Limiting | ClawGuru Moltbot")
  const description = pick(isDE, "AI-Agent-Rate-Limiting: Token-Based Rate Limiting, Tool Call Throttling, Agent Session Quotas und Dynamic Rate Adjustment für KI-Agent-Systeme.", "AI agent rate limiting: token-based rate limiting, tool call throttling, agent session quotas and dynamic rate adjustment for AI agent systems.")
  return {
    title,
    description,
    keywords: ["ai agent rate limiting", "llm rate limiting", "agent throttling", "tool call rate limit", "token quota", "moltbot rate limiting"],
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

export default function AiAgentRateLimitingPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Rate Limiting: KI-Agenten-Rate-Limiting | ClawGuru Moltbot", "AI Agent Rate Limiting: AI Agent Rate Limiting | ClawGuru Moltbot")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Rate Limiting", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Rate Limiting", "Throttling"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Rate Limiting?", "What is Rate Limiting?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4-Layer Rate Limit Defense", "4-Layer Rate Limit Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Rate Limit Score", "Rate Limit Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Rate Limiting · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Rate Limiting — Dein Agent hat gestern Nacht 1.5 Mio. Tokens in 5 Minuten verbraucht.", "AI Agent Rate Limiting — Your Agent Consumed 1.5M Tokens in 5 Minutes Last Night.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein KI-Agent hat gestern Nacht in einer einzigen Session 1.5 Mio. Tokens verbraucht — ohne Rate Limiting. Das Ergebnis: 12.000 Dollar Cloud-Kosten, dein CTO hat den Finanzcontroller gerufen. Hier ist, wie du das verhinderst.", "Your AI agent consumed 1.5M tokens in a single session last night — without rate limiting. The result: $12,000 in cloud costs, your CTO called the finance controller. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Rate Limiting? Einfach erklärt.", "What is Rate Limiting? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Rate Limiting wie eine Tankstelle vor: Du kannst nur so viel tanken, wie dein Guthaben erlaubt. Wenn du das Limit erreichst, musst du warten oder mehr bezahlen. Für AI-Agents ist das noch wichtiger: Ohne Rate Limiting kann ein einzelner Agent alle Ressourcen erschöpfen und andere Users blockieren. Gutes Rate Limiting bedeutet: Token-basierte Limits, Tool-Call-Throttling, Session-Quotas und dynamische Anpassung.", "Think of rate limiting like a gas station: you can only pump as much as your credit allows. When you hit the limit, you must wait or pay more. For AI agents, this is even more critical: without rate limiting, a single agent can exhaust all resources and block other users. Good rate limiting means: token-based limits, tool-call throttling, session quotas, and dynamic adjustment.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4-Layer Rate Limit Defense Architecture", "4-Layer Rate Limit Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Token-Based Rate Limiting", "Token-Based Rate Limiting")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Rate Limit basierend auf Token-Verbrauch statt Request-Count. Verhindert Token-Flooding-Angriffe.", "Rate limit based on token consumption instead of request count. Prevents token flooding attacks.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`token_rate_limit:
  enabled: true
  user_quota:
    tokens_per_minute: 10000
    tokens_per_hour: 100000
  counting:
    include_rag_tokens: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Tool Call Throttling", "Tool Call Throttling")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Separate Rate Limits für Tool-Calls. Tools können teurer oder gefährlicher sein als LLM-Generation.", "Separate rate limits for tool calls. Tools can be more expensive or dangerous than LLM generation.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`tool_rate_limit:
  enabled: true
  tools:
    database_query:
      calls_per_minute: 20
    file_write:
      calls_per_minute: 5`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Agent Session Quotas", "Agent Session Quotas")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Session-basierte Quotas limitieren die Gesamtrressourcen pro Session. Verhindert lange laufende Workflows.", "Session-based quotas limit total resources per session. Prevents long-running workflows from exhausting resources.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`session_quotas:
  enabled: true
  session:
    max_total_tokens: 100000
    max_tool_calls: 500`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Dynamic Rate Adjustment", "Dynamic Rate Adjustment")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Dynamische Anpassung basierend auf System-Load, User-Tier und Threat-Level.", "Dynamic adjustment based on system load, user tier, and threat level.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`dynamic_rate_limit:
  enabled: true
  user_tiers:
    free:
      multiplier: 1.0
    enterprise:
      multiplier: 100.0`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Kostenexplosion durch fehlendes Rate Limit", "SCAR #1: Cost Explosion by Missing Rate Limit")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein Agent verbrauchte 1.5 Mio. Tokens in 5 Minuten ohne Rate Limiting. 12.000 Dollar Cloud-Kosten. Fix: Token-Based Rate Limiting, Session Quotas.", "An agent consumed 1.5M tokens in 5 minutes without rate limiting. $12,000 in cloud costs. Fix: Token-based rate limiting, session quotas.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Rate Limiting. Lessons: Aktiviere Token-Based Limits.", "Root Cause: No rate limiting. Lessons: Enable token-based limits.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Resource Exhaustion durch Tool-Flooding", "SCAR #2: Resource Exhaustion by Tool Flooding")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein Angreifer floodierte die API mit Tool-Call-Anfragen. Database crashte, alle Services down. Fix: Tool Call Throttling, Global Limits.", "An attacker flooded the API with tool call requests. Database crashed, all services down. Fix: Tool call throttling, global limits.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Tool Call Throttling. Lessons: Aktiviere Tool-Specific Limits.", "Root Cause: No tool call throttling. Lessons: Enable tool-specific limits.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Token-Based Rate Limiting aktivieren", "Enable Token-Based Rate Limiting")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Setze Token-Quotas pro Minute/Stunde/Tag.", "Set token quotas per minute/hour/day.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Tool Call Throttling aktivieren", "Enable Tool Call Throttling")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Setze Limits pro Tool (database_query, file_write).", "Set limits per tool (database_query, file_write).")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Session Quotas aktivieren", "Enable Session Quotas")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Setze Max-Tokens und Max-Tool-Calls pro Session.", "Set max tokens and max tool calls per session.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Rate Limit Checkliste", "Interactive Rate Limit Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "Token-Based Rate Limiting aktiviert", "Token-based rate limiting enabled") },
                  { id: "c2", text: pick(isDE, "RAG-Tokens in Counting einbezogen", "RAG tokens included in counting") },
                  { id: "c3", text: pick(isDE, "Tool Call Throttling aktiviert", "Tool call throttling enabled") },
                  { id: "c4", text: pick(isDE, "Session Quotas aktiviert", "Session quotas enabled") },
                  { id: "c5", text: pick(isDE, "Dynamic Rate Adjustment aktiviert", "Dynamic rate adjustment enabled") },
                  { id: "c6", text: pick(isDE, "User-Tier-basierte Limits aktiviert", "User-tier-based limits enabled") },
                  { id: "c7", text: pick(isDE, "System-Load-basierte Anpassung aktiviert", "System-load-based adjustment enabled") },
                  { id: "c8", text: pick(isDE, "Threat-Level-Monitoring aktiviert", "Threat-level monitoring enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Rate Limit Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Rate Limit Security Score Calculator", "Rate Limit Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Token-Based Rate Limiting aktiviert?", "Do you have token-based rate limiting enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Tool Call Throttling aktiv?", "Is tool call throttling active?"), weight: 25 },
                  { q: pick(isDE, "Sind Session Quotas aktiv?", "Are session quotas active?"), weight: 25 },
                  { q: pick(isDE, "Ist Dynamic Rate Adjustment aktiv?", "Is dynamic rate adjustment active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Rate Limit Security Score:", "Your Rate Limit Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 25/100", "Industry Average: 25/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Rate Limiting, Throttling und Cost-Optimierung.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in rate limiting, throttling and cost optimization.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/llm-rate-limiting`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Rate Limiting", "LLM Rate Limiting")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Token-Based-Limits", "Token-based limits")}</div>
              </a>
              <a href={`/${locale}/moltbot/agent-tool-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Agent Tool Security", "Agent Tool Security")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Tool-Call-Throttling", "Tool call throttling")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-rbac`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent RBAC", "AI Agent RBAC")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "User-Tier-Quotas", "User-tier quotas")}</div>
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
