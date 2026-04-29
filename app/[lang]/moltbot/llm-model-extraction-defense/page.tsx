import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-model-extraction-defense"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Model Extraction Defense: LLM-Modell-Extraction-Defense | ClawGuru Moltbot", "LLM Model Extraction Defense: LLM Model Extraction Defense | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Modell-Extraction-Defense: Query Rate Limiting, Output Truncation, Watermark Detection und Model Access Control für LLM-Modell-Extraction-Defense.", "LLM model extraction defense: query rate limiting, output truncation, watermark detection and model access control for LLM model extraction defense.")
  return {
    title, description,
    keywords: ["llm model extraction defense", "query rate limiting", "output truncation", "watermark detection", "model access control", "moltbot extraction"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "MED-1", title: "Query Rate Limiting", desc: "Limit the number of queries per user to prevent model extraction. Use token-based and IP-based rate limiting.", code: `# Moltbot query rate limiting:
query_rate_limiting:
  enabled: true

  # Token-based rate limiting:
  token_based:
    enabled: true
    # Limit: queries per API token
    # Window: 1 minute
    # Limit: 100 queries per minute
    # Burst: 10 queries per second

  # IP-based rate limiting:
  ip_based:
    enabled: true
    # Limit: queries per IP address
    # Window: 1 minute
    # Limit: 50 queries per minute
    # Burst: 5 queries per second

  # Rate limiting enforcement:
  enforcement:
    # Action: block, throttle, or warn
    # Block: reject exceeding queries
    # Throttle: delay exceeding queries
    # Warn: alert on exceeding queries
    action: "block"` },
  { id: "MED-2", title: "Output Truncation", desc: "Truncate outputs to prevent model parameter extraction. Limit output length and diversity.", code: `# Moltbot output truncation:
output_truncation:
  enabled: true

  # Output length limit:
  length_limit:
    enabled: true
    # Limit: maximum output tokens
    # Value: 512 tokens
    # Rationale: insufficient for full model extraction
    # Apply: to all outputs

  # Output diversity limit:
  diversity_limit:
    enabled: true
    # Limit: output diversity per session
    # Method: track output entropy
    # Threshold: block low-entropy queries
    # Rationale: prevent systematic probing

  # Output filtering:
  filtering:
    enabled: true
    # Filter: sensitive model information
    # Examples: layer weights, activation patterns
    # Block: queries requesting internal model info` },
  { id: "MED-3", title: "Watermark Detection", desc: "Detect watermark patterns in queries to identify model extraction attempts. Use statistical analysis.", code: `# Moltbot watermark detection:
watermark_detection:
  enabled: true

  # Statistical detection:
  statistical_detection:
    enabled: true
    # Analyze: query patterns for extraction signatures
    # Method: statistical analysis of query distribution
    # Threshold: p-value < 0.01 indicates extraction
    # Alert: on suspected extraction

  # Pattern detection:
  pattern_detection:
    enabled: true
    # Detect: systematic query patterns
    # Examples: grid search, gradient estimation
    # Method: sequence analysis, clustering
    # Block: extraction attempts

  # Detection logging:
  logging:
    enabled: true
    # Log: all detection events
    # Track: detection success/failure
    # Audit: detection history` },
  { id: "MED-4", title: "Model Access Control", desc: "Control access to the model to prevent unauthorised extraction. Use authentication, authorisation, and monitoring.", code: `# Moltbot model access control:
model_access_control:
  enabled: true

  # Authentication:
  authentication:
    enabled: true
    # Require: API key or token
    # Validate: credentials on every request
    # Rotate: credentials periodically
    # Revoke: compromised credentials

  # Authorisation:
  authorisation:
    enabled: true
    # Check: user permissions
    # Roles: admin, user, guest
    # Permissions: read, write, execute
    # Enforce: least privilege

  # Access monitoring:
  monitoring:
    enabled: true
    # Monitor: all model access attempts
    # Log: user, timestamp, query, result
    # Alert: on suspicious access patterns
    # Audit: access history` },
]

const FAQ = [
  { q: "What is the difference between query rate limiting and output truncation?", a: "Query rate limiting limits the number of queries a user can make, preventing attackers from making the large number of queries needed for model extraction. Output truncation limits the amount of information returned per query, making it harder to extract model parameters. Query rate limiting is a quantitative limit on queries. Output truncation is a qualitative limit on outputs. Both are necessary: rate limiting prevents brute-force extraction, truncation limits the information gained per query." },
  { q: "How does watermark detection identify model extraction?", a: "Watermark detection identifies model extraction by analysing query patterns. Model extraction typically involves systematic query patterns (e.g., grid search, gradient estimation) that differ from normal usage. Statistical analysis detects these patterns by comparing the query distribution to expected patterns. Pattern detection uses sequence analysis and clustering to identify systematic probing. When extraction is detected, the system can block the user or alert administrators. Watermark detection is most effective when combined with other defenses." },
  { q: "How do I set effective rate limits for model access?", a: "Effective rate limits balance security with usability: 1) Start with conservative limits (e.g., 100 queries/minute per token, 50 queries/minute per IP). 2) Monitor legitimate usage patterns. 3) Adjust limits based on operational data. 4) Implement burst allowances for legitimate spikes. 5) Use tiered limits for different user roles (higher limits for trusted users). 6) Alert on rate limit violations to detect extraction attempts. 7) Regularly review and update limits as usage patterns evolve." },
  { q: "What are common model extraction attacks?", a: "Common model extraction attacks: 1) Membership inference — determine if data was used in training. 2) Model inversion — reconstruct training data from model outputs. 3) Model extraction — extract model parameters through queries. 4) Gradient estimation — estimate model gradients through queries. 5) Watermark removal — remove embedded watermarks. Defense: query rate limiting, output truncation, watermark detection, model access control, secure inference environments." },
]

export default function LlmModelExtractionDefensePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Model Extraction Defense", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Model Extraction Defense Guide", "LLM Model Extraction Defense Guide"), description: pick(isDE, "LLM Modell-Extraction-Defense", "LLM model extraction defense"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Model-Extraction-Defense-Guide für eigene KI-Systeme.", "Model extraction defense guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Model Extraction Defense</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Model Extraction Defense", "LLM Model Extraction Defense")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Extraction-Defense können extrahiert werden — ohne Extraction-Defense bleiben Modellparameter ungeschützt. Vier Kontrollen: Query Rate Limiting, Output Truncation, Watermark Detection und Model Access Control.", "LLM models without extraction defense can be extracted — without extraction defense, model parameters remain unprotected. Four controls: query rate limiting, output truncation, watermark detection and model access control.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Model Extraction Defense? Einfach erklärt", "What is LLM Model Extraction Defense? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Model Extraction Defense schützt Modellparameter vor Diebstahl: Query Rate Limiting limitiert Anfragen pro User und IP um Brute-Force-Extraction zu verhindern. Output Truncation kürzt Outputs auf 512 Tokens um Information pro Query zu minimieren. Watermark Detection erkennt systematische Extraction-Patterns mit statistischer Analyse. Model Access Control authentifiziert und authorisiert User mit Least-Privilege-Prinzip. Ohne Defense können Angreifer Modellparameter extrahieren, Training Data rekonstruieren oder Gradienten schätzen.", "LLM model extraction defense protects model parameters from theft: query rate limiting limits requests per user and IP to prevent brute-force extraction. Output truncation shortens outputs to 512 tokens to minimize information per query. Watermark detection detects systematic extraction patterns with statistical analysis. Model access control authenticates and authorizes users with least privilege principle. Without defense, attackers can extract model parameters, reconstruct training data, or estimate gradients.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Model-Extraction-Defense-Kontrollen", "Jump to model extraction defense controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Model-Extraction-Defense-Kontrollen", "4 Model Extraction Defense Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-model-watermarking`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Model Watermarking", "LLM Model Watermarking")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Watermarking", "Watermarking")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-api-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM API Security", "LLM API Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "API-Security", "API security")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-secure-inference`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Secure Inference", "LLM Secure Inference")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Confidential-Computing", "Confidential computing")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Extraction-Overview", "Extraction overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Extraction Defense Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Model Extraction Defense-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM model extraction defense implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
