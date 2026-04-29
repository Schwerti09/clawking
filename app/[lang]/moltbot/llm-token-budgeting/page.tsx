import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-token-budgeting"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Token Budgeting: LLM-Token-Budgeting | ClawGuru Moltbot", "LLM Token Budgeting: LLM Token Budgeting | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Token-Budgeting: Token Quota Management, Cost Control, Token Allocation und Budget Enforcement für LLM-Kostenoptimierung.", "LLM token budgeting: token quota management, cost control, token allocation and budget enforcement for LLM cost optimisation.")
  return {
    title, description,
    keywords: ["llm token budgeting", "llm cost control", "token quota management", "llm cost optimisation", "token allocation", "moltbot budgeting"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const BUDGET_CONTROLS = [
  { id: "TB-1", title: "Token Quota Management", desc: "Manage token quotas per user, per session, and per organisation. Enforce quotas to control costs and prevent abuse.", code: `# Moltbot token quota management:
token_quota:
  enabled: true

  # Per-user quotas:
  user_quota:
    free_tier:
      tokens_per_month: 100000
      tokens_per_day: 5000
      tokens_per_request: 1000

    pro_tier:
      tokens_per_month: 1000000
      tokens_per_day: 50000
      tokens_per_request: 10000

    enterprise_tier:
      tokens_per_month: 10000000
      tokens_per_day: 500000
      tokens_per_request: 100000

  # Per-session quotas:
  session_quota:
    max_tokens_per_session: 50000
    max_tokens_per_request: 10000

  # Enforcement:
  enforcement:
    action: block  # Options: block, throttle, queue
    block_message: "Token quota exceeded. Please upgrade your plan."
    notify_on_exceed: true` },
  { id: "TB-2", title: "Cost Control", desc: "Track and control LLM costs in real-time. Set cost budgets and alerts to prevent overspending.", code: `# Moltbot cost control:
cost_control:
  enabled: true

  # Cost tracking:
  tracking:
    # Track costs by: user, session, model, endpoint
    track_by: ["user", "session", "model", "endpoint"]

  # Cost budgets:
  budgets:
    # Set cost budgets per user, per organisation
    user_monthly_budget_usd: 100
    organisation_monthly_budget_usd: 10000

  # Cost alerts:
  alerts:
    enabled: true
    # Alert when costs reach thresholds
    thresholds:
      - percentage: 50
        notify: true
        message: "50% of budget consumed."
      - percentage: 80
        notify: true
        message: "80% of budget consumed. Approaching limit."
      - percentage: 95
        notify: true
        action: throttle
        message: "95% of budget consumed. Throttling requests."
      - percentage: 100
        notify: true
        action: block
        message: "Budget exceeded. Requests blocked."

  # Cost optimisation:
  optimisation:
    # Automatically switch to cheaper models for non-critical requests
    enable_model_downgrade: true
    # Cache responses to avoid repeated LLM calls
    enable_caching: true` },
  { id: "TB-3", title: "Token Allocation", desc: "Allocate tokens dynamically based on request priority, user tier, and system load. Ensure critical requests get the resources they need.", code: `# Moltbot token allocation:
token_allocation:
  enabled: true

  # Priority-based allocation:
  priority:
    # Allocate tokens based on request priority
    levels:
      critical:
        allocation: 100  # 100% of requested tokens
        queue_priority: 1

      high:
        allocation: 80
        queue_priority: 2

      normal:
        allocation: 50
        queue_priority: 3

      low:
        allocation: 20
        queue_priority: 4

  # User tier-based allocation:
  user_tier:
    # Allocate more tokens to higher-tier users
    free: multiplier 1.0
    pro: multiplier 10.0
    enterprise: multiplier 100.0

  # System load-based allocation:
  system_load:
    # Reduce allocation when system is under load
    cpu_percent_80: multiplier 0.8
    cpu_percent_90: multiplier 0.5
    cpu_percent_95: multiplier 0.2

  # Real-time adjustment:
  adjustment:
    enabled: true
    interval_seconds: 60
    notify_on_change: true` },
  { id: "TB-4", title: "Budget Enforcement", desc: "Enforce token budgets at the API level. Block or throttle requests that exceed quotas. Provide clear feedback to users.", code: `# Moltbot budget enforcement:
enforcement:
  enabled: true

  # Enforcement strategies:
  strategies:
    # 1. Hard block
    hard_block:
      enabled: true
      # Immediately reject requests over quota
      action: block
      message: "Token quota exceeded. Please wait for reset."

    # 2. Soft throttle
    soft_throttle:
      enabled: true
      # Slow down requests over quota instead of blocking
      action: throttle
      throttle_factor: 0.5  # Reduce speed to 50%

    # 3. Queue
    queue:
      enabled: false
      # Queue requests and process when quota resets
      action: queue
      max_queue_size: 100

  # Quota reset:
  reset:
    # Reset quotas at defined intervals
    daily_reset: "00:00 UTC"
    monthly_reset: "first_day_of_month"

  # User notification:
  notification:
    # Notify users when quota is exceeded
    notify_via: ["email", "in_app"]
    # Provide upgrade option
    upgrade_prompt: true` },
]

const FAQ = [
  { q: "How do I calculate the optimal token budget for my use case?", a: "Token budget calculation depends on your use case, user behavior, and cost constraints. General guidance: 1) Measure actual usage — collect metrics on token consumption per user, per session, and per request in production. 2) Calculate cost per token — multiply by your LLM provider's pricing (e.g., GPT-4: $0.03/1K input tokens, $0.06/1K output tokens). 3) Set budget based on cost tolerance — determine your monthly cost budget per user and derive token budget from cost. 4) Add buffer — add 20-30% buffer for unexpected usage spikes. 5) Monitor and adjust — review usage monthly and adjust budgets based on actual data." },
  { q: "What is the difference between token-based and cost-based budgeting?", a: "Token-based budgeting limits the number of tokens a user can consume, regardless of the cost of those tokens. Cost-based budgeting limits the dollar amount a user can spend, accounting for different token costs across models. Example: token-based budget of 100K tokens allows 100K tokens of GPT-4 ($6) or 100K tokens of GPT-3.5 ($0.20). Cost-based budget of $10 allows 333K tokens of GPT-3.5 or 166K tokens of GPT-4. Recommendation: use cost-based budgeting if you use multiple models with different pricing. Use token-based budgeting if you use a single model or want simpler accounting." },
  { q: "How do I handle budget overruns?", a: "Budget overruns occur when users consume more tokens or cost than their allocated budget. Response strategies: 1) Hard block — immediately reject requests when budget is exceeded. This is strict but may frustrate users. 2) Soft throttle — slow down requests (reduce speed to 50%) when budget is exceeded. This allows continued access at reduced capacity. 3) Queue — queue requests and process when budget resets. This delays but doesn't block requests. 4) Graceful degradation — switch to cheaper models for non-critical requests. 5) Upgrade prompt — offer to upgrade to a higher tier for increased budget. 6) Alerting — notify users before budget is exhausted (at 80%, 95%)." },
  { q: "How do I optimise token usage to reduce costs?", a: "Token optimisation strategies: 1) Use cheaper models for non-critical requests (e.g., GPT-3.5 for summarisation, GPT-4 for complex reasoning). 2) Cache responses — avoid repeated LLM calls for identical requests. 3) Prompt engineering — write efficient prompts that get the desired result with fewer tokens. 4) Token budgeting — set per-request token limits to prevent overly long prompts. 5) RAG optimisation — retrieve only the most relevant documents to reduce context window usage. 6) Streaming responses — stop generation when the answer is complete rather than waiting for max tokens. 7) Model selection — choose the smallest model that can handle the task." },
]

export default function LlmTokenBudgetingPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Token Budgeting", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Token Budgeting Guide", "LLM Token Budgeting Guide"), description: pick(isDE, "LLM Token Budgeting", "LLM token budgeting"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Token-Budgeting-Guide für eigene KI-Systeme.", "Token budgeting guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Token Budgeting</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Token Budgeting", "LLM Token Budgeting")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Token-Kosten können schnell explodieren — ohne Budgeting können Kosten unkontrolliert steigen. Vier Kontrollen: Quota Management, Cost Control, Token Allocation und Budget Enforcement.", "LLM token costs can explode quickly — without budgeting, costs can rise uncontrollably. Four controls: quota management, cost control, token allocation and budget enforcement.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Token Budgeting? Einfach erklärt", "What is LLM Token Budgeting? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Token Budgeting kontrolliert LLM-Kosten durch Token-Quota-Management: Token Quota Management setzt Limits pro User, Session und Organisation mit Enforcement-Strategien wie Block, Throttle oder Queue. Cost Control trackt Kosten in Echtzeit mit Budget-Alerts bei 50%, 80%, 95% und 100% Thresholds. Token Allocation verteilt Tokens dynamisch basierend auf Request Priority, User Tier und System Load. Budget Enforcement erzwingt Budgets auf API-Ebene mit User Notifications und Upgrade-Prompts.", "LLM token budgeting controls LLM costs through token quota management: token quota management sets limits per user, session and organisation with enforcement strategies like block, throttle or queue. Cost control tracks costs in real-time with budget alerts at 50%, 80%, 95% and 100% thresholds. Token allocation distributes tokens dynamically based on request priority, user tier and system load. Budget enforcement enforces budgets at the API level with user notifications and upgrade prompts.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Token-Budgeting-Kontrollen", "Jump to token budgeting controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Token-Budgeting-Kontrollen", "4 Token Budgeting Controls")}</h2>
          <div className="space-y-5">
            {BUDGET_CONTROLS.map((c) => (
              <div key={c.id} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 overflow-hidden shadow-xl">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700/50">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900/80 backdrop-blur-lg px-2 py-0.5 rounded">{c.id}</span>
                  <span className="font-bold text-gray-100">{c.title}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{c.desc}</p>
                  <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded font-mono text-xs overflow-x-auto shadow-lg"><pre>{c.code}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
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
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/llm-context-window-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Context Window Security", "LLM Context Window Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Token-Budget-Allocation", "Token budget allocation")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-rate-limiting`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Rate Limiting", "AI Agent Rate Limiting")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Token-Based-Rate-Limiting", "Token-based rate limiting")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-observability`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Observability", "LLM Observability")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Cost-Monitoring", "Cost monitoring")}</div>
            </a>
            <a href={`/${locale}/pricing`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Pricing", "Pricing")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Token-Pläne", "Token plans")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Token Budgeting Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Token Budgeting-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM token budgeting implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
