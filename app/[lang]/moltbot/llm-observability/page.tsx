import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-observability"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Observability: Monitoring & Tracing für KI-Agenten | ClawGuru Moltbot", "LLM Observability: Monitoring & Tracing for AI Agents | ClawGuru Moltbot")
  const description = pick(isDE, "Vollständige LLM Observability mit Moltbot: Token-Verbrauch, Latenz, Halluzinationsrate, Prompt-Traces, Security-Events und Cost-Tracking — self-hosted ohne SaaS-Abhängigkeit.", "Full LLM observability with Moltbot: token usage, latency, hallucination rate, prompt traces, security events and cost tracking — self-hosted without SaaS dependency.")
  return {
    title, description,
    keywords: ["llm observability", "llm monitoring", "ai agent tracing", "moltbot observability", "llm cost tracking", "prompt tracing self-hosted"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const METRICS = [
  { category: "Performance", items: [
    { name: "Latency P50/P95/P99", desc: "End-to-end response time per model and agent. Alert on regressions.", unit: "ms" },
    { name: "Time to First Token (TTFT)", desc: "Streaming latency — time until first token arrives at client.", unit: "ms" },
    { name: "Tokens per Second", desc: "Model throughput. Critical for capacity planning and SLA.", unit: "tok/s" },
    { name: "Context Window Utilization", desc: "% of context window used per request. Alert at 80%+ — quality degrades.", unit: "%" },
  ]},
  { category: "Cost", items: [
    { name: "Token Usage", desc: "Input + output tokens per request, agent, user, and time period.", unit: "tokens" },
    { name: "Cost per Request", desc: "Calculated cost based on model pricing. Budget alerts per team/project.", unit: "$" },
    { name: "Cost per Outcome", desc: "Business-level metric: cost per successful task completion.", unit: "$" },
    { name: "Cache Hit Rate", desc: "Semantic cache hits. Higher = lower cost. Track per prompt template.", unit: "%" },
  ]},
  { category: "Quality & Security", items: [
    { name: "Hallucination Rate", desc: "% responses flagged by factual consistency checker. Track per model version.", unit: "%" },
    { name: "Refusal Rate", desc: "% requests refused by model. Spike = prompt engineering issue or injection attempt.", unit: "%" },
    { name: "Injection Detection Rate", desc: "% inputs flagged as potential prompt injection. Spike = active attack.", unit: "%" },
    { name: "PII Exposure Rate", desc: "% responses containing PII before redaction. Must be 0% in production.", unit: "%" },
  ]},
]

const FAQ = [
  { q: "Why is LLM observability different from traditional APM?", a: "Traditional APM measures deterministic systems: same input → same output → same latency. LLMs are stochastic: same input can produce different outputs with different quality levels. This requires new metrics: hallucination rate (did the model make up facts?), refusal rate (is the model refusing valid requests?), semantic similarity (is the output meaningfully different from last week?). Traditional APM tools miss all of these. Moltbot's LLM observability layer was built specifically for probabilistic AI systems." },
  { q: "How does prompt tracing work?", a: "Every LLM call is recorded with: input prompt (hashed + optionally stored), system message, model parameters (temperature, top_p, max_tokens), output tokens generated, latency breakdown (time to first token, generation time), tool calls made, security scan results, and a unique trace ID that links parent agent calls to child LLM calls. This creates a complete causal trace from user request → agent decision → LLM call → tool execution → response." },
  { q: "How do I detect LLM quality regressions?", a: "Moltbot supports three quality regression detection methods: 1) Automated evals — run a fixed test set against every model/prompt change, compare output similarity to golden set. 2) Statistical process control — flag when hallucination rate or refusal rate exceeds 2-sigma from baseline. 3) User feedback correlation — link thumbs down / escalations to specific prompt versions and model settings. Any of these triggers a regression alert in your monitoring dashboard." },
  { q: "Can I run LLM observability without sending data to the cloud?", a: "Yes — this is Moltbot's primary value proposition. All traces, metrics and logs are stored locally in your infrastructure (ClickHouse or PostgreSQL). The observability dashboard runs as a self-hosted web app. No data leaves your network. For air-gapped or high-security environments, Moltbot supports offline mode where even model calls go to local Ollama/LocalAI — full observability with zero external dependencies." },
]

export default function LlmObservabilityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Observability", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Observability Guide", "LLM Observability Guide"), description: pick(isDE, "LLM Monitoring & Tracing", "LLM monitoring & tracing"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Observability-Guide für eigene KI-Systeme.", "Observability guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Observability</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Observability: Monitoring & Tracing für KI-Agenten", "LLM Observability: Monitoring & Tracing for AI Agents")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLMs sind nicht deterministisch — klassische APM-Tools versagen. Moltbot bringt vollständige Observability: Prompt-Traces, Qualitätsmetriken, Sicherheits-Events und Cost-Tracking — vollständig self-hosted.", "LLMs are non-deterministic — classical APM tools fail. Moltbot delivers complete observability: prompt traces, quality metrics, security events and cost tracking — fully self-hosted.")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          {[
            { value: "12+", label: pick(isDE, "Metriken überwacht", "Metrics tracked") },
            { value: "100%", label: pick(isDE, "Self-Hosted", "Self-hosted") },
            { value: "P99", label: pick(isDE, "Latenz-Tracking", "Latency tracking") },
            { value: "0", label: pick(isDE, "Cloud-Abhängigkeiten", "Cloud dependencies") },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 text-center shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-2xl font-black text-cyan-400">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Observability? Einfach erklärt", "What is LLM Observability? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Observability überwacht nicht-deterministische KI-Systeme: Performance-Metriken wie Latenz P50/P95/P99, Time to First Token und Tokens per Second messen Modell-Throughput. Cost-Metriken wie Token Usage, Cost per Request und Cache Hit Rate kontrollieren Budget. Quality & Security-Metriken wie Halluzination Rate, Refusal Rate, Injection Detection Rate und PII Exposure Rate schützen vor Quality-Degradation und Angriffen. Prompt-Traces erstellen vollständige Causal-Trace von User Request bis Response. Ohne Observability sind KI-Systeme Black-Boxes ohne Insight.", "LLM observability monitors non-deterministic AI systems: performance metrics like latency P50/P95/P99, time to first token and tokens per second measure model throughput. Cost metrics like token usage, cost per request and cache hit rate control budget. Quality & security metrics like hallucination rate, refusal rate, injection detection rate and PII exposure rate protect against quality degradation and attacks. Prompt traces create complete causal trace from user request to response. Without observability, AI systems are black boxes without insight.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Schlüsselmetriken", "Jump to key metrics")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Schlüsselmetriken", "Key Metrics")}
          </h2>
          <div className="space-y-6">
            {METRICS.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-bold text-cyan-400 mb-3">{cat.category}</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {cat.items.map((m) => (
                    <div key={m.name} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 shadow-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-100 text-sm">{m.name}</span>
                        <span className="font-mono text-xs bg-gray-700/80 backdrop-blur-lg text-gray-300 px-2 py-0.5 rounded">{m.unit}</span>
                      </div>
                      <p className="text-xs text-gray-400">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Prometheus-Integration", "Prometheus Integration")}
          </h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto shadow-xl">
            <pre>{`# Moltbot exposes Prometheus metrics at /metrics
# prometheus.yml scrape config:
scrape_configs:
  - job_name: moltbot_llm
    static_configs:
      - targets: ['moltbot:9090']
    metrics_path: /metrics

# Key metrics exposed:
# moltbot_llm_request_duration_seconds{model, agent, status}
# moltbot_llm_tokens_total{model, type}           # type: input|output
# moltbot_llm_cost_usd_total{model, agent}
# moltbot_security_injections_detected_total
# moltbot_security_pii_redactions_total
# moltbot_agent_tool_calls_total{tool, agent, status}
# moltbot_hitl_pending_approvals

# Grafana dashboard import:
# ClawGuru LLM Dashboard ID: 21847 (grafana.com/dashboards)`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/ai-compliance-automation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Compliance Automation", "AI Compliance Automation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Observability-Daten für Audits nutzen", "Use observability data for audits")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-gateway-hardening`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Gateway Hardening", "LLM Gateway Hardening")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Gateway-Metriken absichern", "Secure gateway metrics")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security Hub", "AI Agent Security Hub")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Security-Events in Observability", "Security events in observability")}</div>
            </a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Roast My Moltbot", "Roast My Moltbot")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Observability-Setup kostenlos prüfen", "Free observability setup review")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Observability Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Observability-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM observability implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
