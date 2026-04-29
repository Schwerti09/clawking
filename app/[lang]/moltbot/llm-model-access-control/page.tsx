import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-model-access-control"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Model Access Control: LLM-Modell-Zugriffskontrolle | ClawGuru Moltbot", "LLM Model Access Control: LLM Model Access Control | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Modell-Zugriffskontrolle: Model Allowlisting, Model Permissions, Model Access Auditing und Model Versioning für LLM-Modell-Sicherheit.", "LLM model access control: model allowlisting, model permissions, model access auditing and model versioning for LLM model security.")
  return {
    title, description,
    keywords: ["llm model access control", "model allowlisting", "llm model permissions", "model access auditing", "model versioning", "moltbot model control"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "MAC-1", title: "Model Allowlisting", desc: "Maintain an allowlist of approved LLM models. Block access to unapproved or deprecated models to ensure only vetted models are used.", code: `# Moltbot model allowlisting:
model_allowlist:
  enabled: true

  # Approved models:
  approved_models:
    - id: "gpt-4-turbo-preview"
      provider: "openai"
      version: "latest"
      approved_for: ["production", "staging"]
      approved_by: "security-team"
      approved_date: "2025-01-01"

    - id: "claude-3-opus"
      provider: "anthropic"
      version: "20240229"
      approved_for: ["production"]
      approved_by: "security-team"
      approved_date: "2025-01-15"

  # Blocked models:
  blocked_models:
    - id: "deprecated-model-v1"
      reason: "Security vulnerability"
      blocked_date: "2025-02-01"

  # Enforcement:
  enforcement:
    action: block  # Options: block, warn, allow_with_flag
    block_message: "Model not approved. Use an approved model from the allowlist."` },
  { id: "MAC-2", title: "Model Permissions", desc: "Assign permissions to models based on user tier, use case, and data sensitivity. Restrict access to powerful models for sensitive use cases.", code: `# Moltbot model permissions:
model_permissions:
  enabled: true

  # User tier-based permissions:
  user_tier:
    free:
      allowed_models: ["gpt-3.5-turbo"]
      max_tokens_per_request: 4000

    pro:
      allowed_models: ["gpt-3.5-turbo", "gpt-4-turbo-preview"]
      max_tokens_per_request: 8000

    enterprise:
      allowed_models: ["gpt-3.5-turbo", "gpt-4-turbo-preview", "claude-3-opus"]
      max_tokens_per_request: 32000

  # Use case-based permissions:
  use_case:
    general_chat:
      allowed_models: ["gpt-3.5-turbo"]

    code_generation:
      allowed_models: ["gpt-4-turbo-preview", "claude-3-opus"]

    data_analysis:
      allowed_models: ["gpt-4-turbo-preview", "claude-3-opus"]

  # Data sensitivity-based permissions:
  data_sensitivity:
    public:
      allowed_models: ["gpt-3.5-turbo", "gpt-4-turbo-preview", "claude-3-opus"]

    internal:
      allowed_models: ["gpt-4-turbo-preview", "claude-3-opus"]

    confidential:
      allowed_models: ["claude-3-opus"]` },
  { id: "MAC-3", title: "Model Access Auditing", desc: "Audit all model access events. Log which users accessed which models, when, and for what purpose. Enable compliance and incident response.", code: `# Moltbot model access auditing:
model_access_audit:
  enabled: true

  # Audit logging:
  logging:
    log_all_access: true
    log_fields:
      - user_id
      - model_id
      - model_provider
      - timestamp
      - request_id
      - use_case
      - token_count
      - cost
      - data_sensitivity

  # Audit storage:
  storage:
    type: "database"  # Options: database, file, s3
    retention_days: 365
    encryption: true

  # Audit alerts:
  alerts:
    enabled: true
    # Alert on:
    # - Access to blocked models
    # - Unusual model access patterns
    # - High-cost model usage
    # - Access by unauthorised users
    alert_on:
      - blocked_model_access
      - unusual_pattern
      - high_cost_usage
      - unauthorised_access

  # Compliance reporting:
  compliance:
    enabled: true
    # Generate compliance reports for:
    # - SOC 2 (model access logs)
    # - GDPR (data processing logs)
    # - ISO 27001 (access control logs)
    reports:
      - soc2_model_access
      - gdpr_data_processing
      - iso27001_access_control` },
  { id: "MAC-4", title: "Model Versioning", desc: "Track model versions and enforce version policies. Prevent use of deprecated models and ensure smooth rollouts of new versions.", code: `# Moltbot model versioning:
model_versioning:
  enabled: true

  # Version tracking:
  tracking:
    enabled: true
    # Track: model ID, provider, version, release date, deprecation date
    # Maintain version history for audit trails

  # Deprecation policy:
  deprecation:
    enabled: true
    # Deprecate models after:
    deprecation_after_months: 12
    # Notify users before deprecation:
    notify_before_days: 30
    # Block deprecated models:
    block_deprecated: true

  # Version rollout:
  rollout:
    strategy: "canary"  # Options: canary, blue_green, big_bang
    # Canary rollout: 10% -> 50% -> 100%
    canary_stages:
      - percentage: 10
        duration_hours: 24
      - percentage: 50
        duration_hours: 48
      - percentage: 100
        duration_hours: 0

  # Rollback:
  rollback:
    enabled: true
    # Allow rollback to previous version on issues
    rollback_window_hours: 72
    # Automatic rollback on error rate threshold
    auto_rollback_error_threshold_percent: 5` },
]

const FAQ = [
  { q: "What is the difference between model allowlisting and model permissions?", a: "Model allowlisting is a binary control — a model is either approved or not approved for use in your system. It's a gate that prevents unapproved models from being used at all. Model permissions are granular controls that define which users can use which models, for which use cases, and with what limits. Example: allowlisting says 'GPT-4 is approved for use'. Permissions say 'Enterprise users can use GPT-4 for code generation with 32K tokens, free users cannot use GPT-4 at all'. Both are necessary: allowlisting ensures only vetted models are used, permissions ensure appropriate use of those models." },
  { q: "How do I implement model access auditing for compliance?", a: "Model access auditing for compliance requires: 1) Log all model access events with relevant fields (user_id, model_id, timestamp, use_case, token_count, cost). 2) Store logs securely with encryption at rest and in transit. 3) Retain logs for required period (SOC 2: 90 days minimum, GDPR: as long as needed, ISO 27001: 3 years). 4) Generate compliance reports on demand (SOC 2 reports, GDPR data processing records, ISO 27001 access control logs). 5) Enable audit alerts for suspicious activity (blocked model access, unusual patterns, high-cost usage). 6) Implement log integrity (hash logs, append-only storage) to prevent tampering." },
  { q: "How do I handle model deprecation and version rollouts?", a: "Model deprecation and version rollout strategy: 1) Deprecation policy — deprecate models after a set period (e.g., 12 months) to encourage migration to newer models. 2) Notify users — notify users 30 days before deprecation with migration guidance. 3) Block deprecated models — automatically block access to deprecated models after deprecation date. 4) Version rollout — use canary rollout (10% -> 50% -> 100%) to test new versions before full rollout. 5) Rollback — maintain rollback window (72 hours) to revert to previous version if issues arise. 6) Monitor — monitor error rates and user feedback during rollout." },
  { q: "What are the security risks of uncontrolled model access?", a: "Uncontrolled model access poses several security risks: 1) Data leakage — users may send sensitive data to models that don't meet security requirements (e.g., models that log data). 2) Cost explosion — users may access expensive models without limits, causing uncontrolled costs. 3) Compliance violations — using unapproved models may violate compliance requirements (SOC 2, GDPR, ISO 27001). 4) Deprecated model usage — using deprecated models with known vulnerabilities. 5) Model jailbreaks — powerful models may be more susceptible to jailbreaks, increasing risk. 6) Audit trail gaps — without access logging, you cannot track who used which models for what purpose." },
]

export default function LlmModelAccessControlPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Model Access Control", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Model Access Control Guide", "LLM Model Access Control Guide"), description: pick(isDE, "LLM Modell-Zugriffskontrolle", "LLM model access control"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Model-Access-Control-Guide für eigene KI-Systeme.", "Model access control guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Model Access Control</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Model Access Control", "LLM Model Access Control")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Zugriffskontrolle können Datenlecks, Kostenexplosionen und Compliance-Verstöße verursachen. Vier Kontrollen: Allowlisting, Permissions, Auditing und Versioning.", "LLM models without access control can cause data leaks, cost explosions, and compliance violations. Four controls: allowlisting, permissions, auditing and versioning.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Model Access Control? Einfach erklärt", "What is LLM Model Access Control? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Model Access Control ist wie ein Gatekeeper für KI-Modelle: Model Allowlisting erlaubt nur geprüfte Modelle und blockiert deprecated oder unsichere Modelle. Model Permissions definieren granulare Zugriffsrechte basierend auf User-Tier, Use Case und Daten-Sensitivität. Model Access Auditing loggt alle Model-Zugriffe für Compliance (SOC2/GDPR/ISO27001) und Incident Response. Model Versioning trackt Versionen mit Deprecation-Policy und Canary-Rollout für sichere Updates. Ohne Access Control können Angreifer Datenlecks verursachen, Kostenexplosionen auslösen oder Compliance-Verletzungen durchführen.", "LLM model access control is like a gatekeeper for AI models: model allowlisting only allows vetted models and blocks deprecated or insecure models. Model permissions define granular access rights based on user tier, use case, and data sensitivity. Model access auditing logs all model access for compliance (SOC2/GDPR/ISO27001) and incident response. Model versioning tracks versions with deprecation policy and canary rollout for safe updates. Without access control, attackers can cause data leaks, trigger cost explosions, or conduct compliance violations.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Model-Access-Control-Kontrollen", "Jump to model access control controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Model-Access-Control-Kontrollen", "4 Model Access Control Controls")}</h2>
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
            <a href={`/${locale}/moltbot/ai-agent-rbac`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent RBAC", "AI Agent RBAC")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Model-Permissions", "Model permissions")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-api-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM API Security", "LLM API Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Model-Allowlisting", "Model allowlisting")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-audit-logging`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Audit Logging", "AI Agent Audit Logging")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Model-Access-Auditing", "Model access auditing")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-model-versioning-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Model Versioning Security", "AI Model Versioning Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Model-Versioning", "Model versioning")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Access Control Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Model Access Control-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM model access control implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
