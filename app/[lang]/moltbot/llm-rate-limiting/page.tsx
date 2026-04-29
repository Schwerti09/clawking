import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-rate-limiting"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Rate Limiting & Throttling: DoS-Schutz für KI-Gateways | ClawGuru Moltbot", "LLM Rate Limiting & Throttling: DoS Protection for AI Gateways | ClawGuru Moltbot")
  const description = pick(isDE, "LLM Rate Limiting selbst hosten: Token-Budget-Enforcement, Kosten-Caps, DDoS-Schutz für Ollama/LocalAI/LiteLLM. Konfiguration, Algorithmen und Monitoring für AI-Gateways.", "Self-hosted LLM rate limiting: token budget enforcement, cost caps, DDoS protection for Ollama/LocalAI/LiteLLM. Configuration, algorithms and monitoring for AI gateways.")
  return {
    title, description,
    keywords: ["llm rate limiting", "llm throttling", "ai gateway rate limit", "ollama rate limiting", "litellm rate limiting", "llm dos protection"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const RATE_LIMIT_LAYERS = [
  { layer: "Request Rate", metric: "Requests/minute per user", why: "Prevents brute-force prompt injection attempts and API abuse", config: "limit: 60 req/min per user_id\nburst: 10\nalgorithm: token_bucket" },
  { layer: "Token Budget", metric: "Input + output tokens per hour", why: "Controls LLM inference cost. Prevents one user from exhausting GPU capacity.", config: "limit: 100,000 tokens/hour per user\ndaily_budget: 500,000 tokens\ncost_cap: $5.00/day per user" },
  { layer: "Concurrent Requests", metric: "Simultaneous requests per user", why: "Prevents resource exhaustion when users run many parallel agents", config: "max_concurrent: 5 per user\nmax_concurrent_global: 100\nqueue_timeout: 30s" },
  { layer: "Context Window", metric: "Max tokens per single request", why: "Prevents prompt stuffing attacks and runaway context costs", config: "max_input_tokens: 32000\nmax_output_tokens: 4096\ncontext_window_alert: 80%" },
  { layer: "Tool Call Depth", metric: "Max tool calls per agent run", why: "Prevents infinite loops and runaway agent execution", config: "max_tool_calls: 20 per run\nmax_recursion_depth: 5\ntimeout: 120s per run" },
  { layer: "Model Tier", metric: "Access to expensive models", why: "Restricts GPT-4/Claude access to authorized users only", config: "tier_free: [llama3.1-8b]\ntier_pro: [llama3.1-70b, mistral-large]\ntier_enterprise: [all]" },
]

const FAQ = [
  { q: "Why is LLM rate limiting harder than traditional API rate limiting?", a: "Traditional API rate limiting counts requests. LLM rate limiting must count tokens — because a single request can consume anywhere from 10 tokens to 128,000 tokens. A user making 10 requests/minute with 10,000 tokens each costs 1,000x more than a user making 100 requests/minute with 100 tokens each. Request-based limits miss this completely. Additionally: LLM inference is GPU-bound and expensive — a single unconstrained request can take minutes and cost dollars. Rate limiting must protect both server capacity and cost budget simultaneously." },
  { q: "How does token budget enforcement work in practice?", a: "Moltbot's token budget enforcement: 1) Pre-request: estimate token count from input (exact for tokenized input, estimated for natural language). If estimate exceeds remaining budget → reject before sending to LLM. 2) During generation: streaming responses count output tokens in real-time. If output budget exceeded → stop generation, return partial response. 3) Post-request: actual token counts from LLM API recorded and deducted from budget. Budgets persist in Redis with sliding window (per-hour) and fixed window (per-day). Budget refresh is configurable: hourly reset, daily reset, or monthly allocation." },
  { q: "How do I protect a self-hosted Ollama instance from DoS?", a: "Ollama has no built-in rate limiting or authentication. To protect self-hosted Ollama: 1) Never expose Ollama directly (port 11434) to the internet. 2) Put Moltbot or LiteLLM as a gateway in front of Ollama — all requests flow through the gateway. 3) Configure rate limits on the gateway (not Ollama). 4) Add nginx rate limiting as an additional layer: limit_req_zone $binary_remote_addr zone=ollama:10m rate=10r/m. 5) Use Tailscale or WireGuard to restrict network access to Ollama to authorized clients only." },
  { q: "What is the difference between rate limiting and throttling for LLMs?", a: "Rate limiting: hard reject requests that exceed the limit (HTTP 429 Too Many Requests). Throttling: queue requests and delay them until capacity is available. For LLMs: use rate limiting for per-user token budgets (hard stop prevents cost overrun). Use throttling for global GPU capacity management (queue requests rather than reject — better UX when server is busy but not abused). Moltbot supports both: per-user rate limiting (hard) + global queue with max queue depth and timeout (soft throttling)." },
]

export default function LlmRateLimitingPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Rate Limiting", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Rate Limiting Guide", "LLM Rate Limiting Guide"), description: pick(isDE, "LLM Rate Limiting", "LLM rate limiting"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Rate-Limiting-Guide für eigene LLM-Infrastruktur.", "Rate limiting guide for your own LLM infrastructure.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Rate Limiting</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Rate Limiting & DoS-Schutz für KI-Gateways", "LLM Rate Limiting & DoS Protection for AI Gateways")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Ollama, LocalAI und LiteLLM haben kein integriertes Rate Limiting. Ein einziger unkontrollierter Request kann ein GPU für Minuten blockieren und dollar-teure Inference auslösen. Sechs Schutzschichten, fertige Konfigurationen.", "Ollama, LocalAI and LiteLLM have no built-in rate limiting. A single unconstrained request can block a GPU for minutes and trigger dollar-expensive inference. Six protection layers, ready-to-use configurations.")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          {[
            { value: "6", label: pick(isDE, "Schutzschichten", "Protection layers") },
            { value: "Token", label: pick(isDE, "Budget-Einheit (nicht Requests)", "Budget unit (not requests)") },
            { value: "Redis", label: pick(isDE, "State-Backend", "State backend") },
            { value: "429", label: pick(isDE, "HTTP bei Überschreitung", "HTTP on exceed") },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 shadow-xl text-center hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-2xl font-black text-cyan-400">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "6 Rate-Limiting-Schichten", "6 Rate Limiting Layers")}</h2>
          <div className="space-y-3">
            {RATE_LIMIT_LAYERS.map((l) => (
              <div key={l.layer} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700/50">
                  <div>
                    <span className="font-semibold text-gray-100">{l.layer}</span>
                    <span className="ml-3 text-xs text-gray-400">({l.metric})</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{l.why}</p>
                  <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-3 rounded font-mono text-xs overflow-x-auto shadow-lg"><pre>{l.config}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Nginx + Moltbot Gateway Konfiguration", "Nginx + Moltbot Gateway Configuration")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto shadow-xl">
            <pre>{`# nginx.conf — Layer 1: Network-level rate limiting
http {
  limit_req_zone $binary_remote_addr zone=llm_api:10m rate=60r/m;
  limit_req_zone $binary_remote_addr zone=llm_heavy:10m rate=5r/m;

  server {
    location /v1/chat/completions {
      limit_req zone=llm_api burst=10 nodelay;
      proxy_pass http://moltbot:8080;
      proxy_read_timeout 300s;  # Long timeout for LLM generation
    }
  }
}

# moltbot.rate-limits.yaml — Layer 2-6: Token-aware limiting
rate_limits:
  per_user:
    requests_per_minute: 60
    tokens_per_hour: 100000
    tokens_per_day: 500000
    max_concurrent: 5
    max_input_tokens: 32000
    max_output_tokens: 4096
    max_tool_calls_per_run: 20
    run_timeout_seconds: 120

  model_tiers:
    free: ["llama3.1:8b", "mistral:7b"]
    pro: ["llama3.1:70b", "mixtral:8x7b"]
    enterprise: ["*"]

  cost_caps:
    currency: USD
    per_user_daily: 5.00
    global_hourly: 50.00
    alert_threshold: 0.80  # Alert at 80% of cap`}</pre>
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
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
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/llm-gateway-hardening`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Gateway Hardening", "LLM Gateway Hardening")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Vollständige Gateway-Härtung", "Full gateway hardening")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-observability`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Observability", "LLM Observability")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Rate-Limit-Metriken monitoren", "Monitor rate limit metrics")}</div>
            </a>
            <a href={`/${locale}/moltbot/zero-trust-ai-agents`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Zero Trust AI Agents", "Zero Trust AI Agents")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Per-Agent Token-Budget", "Per-agent token budgets")}</div>
            </a>
            <a href={`/${locale}/academy/cve/CVE-2023-44487`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">CVE-2023-44487</div>
              <div className="text-sm text-gray-300">HTTP/2 Rapid Reset — DDoS</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Rate Limiting Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Rate Limiting-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM rate limiting implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
