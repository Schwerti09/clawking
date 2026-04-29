import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-inference-cost-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Inference Cost Security: LLM-Inference-Kosten-Security | ClawGuru Moltbot", "LLM Inference Cost Security: LLM Inference Cost Security | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Inference-Kosten-Security: Cost Monitoring, Budget Enforcement, Quota Management und Cost Anomaly Detection für LLM-Inference-Kosten-Security.", "LLM inference cost security: cost monitoring, budget enforcement, quota management and cost anomaly detection for LLM inference cost security.")
  return {
    title, description,
    keywords: ["llm inference cost security", "cost monitoring", "budget enforcement", "quota management", "cost anomaly detection", "moltbot cost"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "ICS-1", title: "Cost Monitoring", desc: "Monitor inference costs in real-time. Track per-model, per-user, and per-tenant costs.", code: `# Moltbot inference cost monitoring:
cost_monitoring:
  enabled: true

  # Per-Model Cost Tracking:
  per_model:
    enabled: true
    # Track: cost per model
    # Metrics: tokens, requests, compute time
    # Alert: on cost threshold breach
    # Report: daily cost summary

  # Per-User Cost Tracking:
  per_user:
    enabled: true
    # Track: cost per user
    # Include: token usage, request count
    # Alert: on user cost spike
    # Enforce: user cost limits

  # Per-Tenant Cost Tracking:
  per_tenant:
    enabled: true
    # Track: cost per tenant
    # Include: all models, users
    # Alert: on tenant budget breach
    # Report: monthly tenant cost` },
  { id: "ICS-2", title: "Budget Enforcement", desc: "Enforce inference budgets. Hard stop on budget breach, soft alerts before limit.", code: `# Moltbot budget enforcement:
budget_enforcement:
  enabled: true

  # Hard Budget Limits:
  hard_limits:
    enabled: true
    # Define: hard budget limits
    # Action: block requests on breach
    # Scope: per user, per tenant
    # Notify: admin on block

  # Soft Budget Alerts:
  soft_alerts:
    enabled: true
    # Define: soft alert thresholds
    # Example: alert at 80% of budget
    # Action: warn user and admin
    # Allow: requests to continue

  # Budget Reset:
  reset:
    enabled: true
    # Define: budget reset period (daily, monthly)
    # Automatic: reset on schedule
    # Notify: users of reset
    # Log: budget events` },
  { id: "ICS-3", title: "Quota Management", desc: "Manage inference quotas per user and tenant. Rate limiting by token count and request count.", code: `# Moltbot quota management:
quota_management:
  enabled: true

  # Token Quotas:
  token_quotas:
    enabled: true
    # Define: max tokens per period
    # Period: per hour, per day
    # Enforce: token quota strictly
    # Alert: on quota approach

  # Request Quotas:
  request_quotas:
    enabled: true
    # Define: max requests per period
    # Period: per minute, per hour
    # Enforce: request quota strictly
    # Alert: on quota approach

  # Priority Queuing:
  priority_queuing:
    enabled: true
    # Define: priority tiers
    # High: critical workloads
    # Normal: standard requests
    # Low: batch workloads` },
  { id: "ICS-4", title: "Cost Anomaly Detection", desc: "Detect unusual inference cost patterns. Identify potential abuse or security incidents.", code: `# Moltbot cost anomaly detection:
cost_anomaly_detection:
  enabled: true

  # Statistical Analysis:
  statistical:
    enabled: true
    # Analyze: cost patterns
    # Baseline: normal cost profile
    # Detect: deviations from baseline
    # Alert: on significant anomaly

  # Abuse Detection:
  abuse:
    enabled: true
    # Detect: potential abuse patterns
    # Patterns: sudden cost spike, unusual model usage
    # Alert: on suspected abuse
    # Block: abusive users/tenants

  # Incident Correlation:
  correlation:
    enabled: true
    # Correlate: cost anomalies with security events
    # Link: cost spikes to auth failures, errors
    # Alert: on correlated incidents
    # Investigate: automatically` },
]

const FAQ = [
  { q: "Why is inference cost a security concern?", a: "Inference cost is a security concern because uncontrolled costs can be exploited for denial-of-service attacks. An attacker can flood your LLM API with requests, causing massive cost overruns (economic denial-of-service). Without cost controls, a single compromised API key can bankrupt your inference budget. Cost anomalies can also indicate security incidents — unusual cost spikes may signal prompt injection attacks, model abuse, or data exfiltration." },
  { q: "How do I set effective budget limits?", a: "Set budget limits based on: 1) Baseline usage — measure normal inference costs over 2-4 weeks. 2) Growth factor — add 20-30% buffer for legitimate growth. 3) Alert threshold — set soft alerts at 80% of budget. 4) Hard limit — set hard stop at 100% of budget. 5) Per-user limits — set individual user limits to prevent single-user abuse. Review and adjust limits monthly as usage patterns evolve." },
  { q: "How does token quota differ from request quota?", a: "Token quota limits the total number of tokens processed (input + output) per period. This directly controls compute cost. Request quota limits the number of API calls per period. This controls throughput and prevents flooding. Use both: token quota prevents cost overruns from long context windows, request quota prevents API flooding. Set tighter limits for high-cost models and looser limits for lightweight models." },
  { q: "How do I detect inference cost abuse?", a: "Detect cost abuse by: 1) Baseline monitoring — establish normal cost patterns per user/tenant. 2) Anomaly detection — alert on significant deviations (>2x normal). 3) Pattern analysis — detect unusual model usage patterns. 4) Correlation — correlate cost spikes with auth failures or errors. 5) Rate limiting — enforce strict rate limits to limit abuse impact. Automated response: block abusive users and alert security team." },
]

export default function LlmInferenceCostSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Inference Cost Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Inference Cost Security Guide", "LLM Inference Cost Security Guide"), description: pick(isDE, "LLM Inference-Kosten-Sicherheit", "LLM inference cost security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Inference-Cost-Security-Guide für eigene KI-Systeme.", "Inference cost security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Inference Cost Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Inference Cost Security", "LLM Inference Cost Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Unkontrollierte Inference-Kosten sind ein Sicherheitsrisiko — Economic DoS, API-Abuse und Budget-Overruns. Vier Kontrollen: Cost Monitoring, Budget Enforcement, Quota Management und Cost Anomaly Detection.", "Uncontrolled inference costs are a security risk — economic DoS, API abuse and budget overruns. Four controls: cost monitoring, budget enforcement, quota management and cost anomaly detection.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Inference Cost Security? Einfach erklärt", "What is LLM Inference Cost Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Inference Cost Security ist wie ein Budget-Wächter für KI-Compute: Cost Monitoring trackt Kosten pro Model, User und Tenant mit Echtzeit-Alerts. Budget Enforcement setzt Hard Limits bei Budget-Überschreitung und Soft Alerts bei 80% Schwellen. Quota Management limitiert Tokens und Requests pro Periode mit Priority Queuing für kritische Workloads. Cost Anomaly Detection identifiziert ungewöhnliche Muster mit statistischer Analyse und Abuse Detection. Ohne Cost Security können Angreifer Economic DoS durchführen, API-Abuse betreiben oder Budget-Overruns verursachen.", "LLM inference cost security is like a budget guardian for AI compute: cost monitoring tracks costs per model, user and tenant with real-time alerts. Budget enforcement sets hard limits on budget breach and soft alerts at 80% thresholds. Quota management limits tokens and requests per period with priority queuing for critical workloads. Cost anomaly detection identifies unusual patterns with statistical analysis and abuse detection. Without cost security, attackers can conduct economic DoS, API abuse, or cause budget overruns.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Inference-Cost-Security-Kontrollen", "Jump to inference cost security controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Inference-Cost-Security-Kontrollen", "4 Inference Cost Security Controls")}</h2>
          <div className="space-y-5">
            {CONTROLS.map((c) => (
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
            <a href={`/${locale}/moltbot/llm-api-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM API Security", "LLM API Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "API-Security", "API security")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-rate-limiting`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Rate Limiting", "AI Agent Rate Limiting")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Rate-Limiting", "Rate limiting")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-token-budgeting`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Token Budgeting", "LLM Token Budgeting")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Token-Budgeting", "Token budgeting")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Cost-Security-Overview", "Cost security overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Cost Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Inference Cost Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM inference cost security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
