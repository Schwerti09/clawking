import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-output-filtering"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Output Filtering: KI-Ausgabe-Filterung | ClawGuru Moltbot", "LLM Output Filtering: AI Output Filtering | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Ausgabe-Filterung: Content Safety Classifier, PII-Filterung, Policy-Violation-Detection und Output-Post-Processing für KI-Systeme.", "LLM output filtering: content safety classifier, PII filtering, policy violation detection and output post-processing for AI systems.")
  return {
    title, description,
    keywords: ["llm output filtering", "ai content filtering", "llm safety classifier", "pii filtering llm", "policy violation detection", "moltbot output filtering"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const FILTER_TYPES = [
  { id: "OF-1", title: "Content Safety Classifier", desc: "Run a safety classifier on every LLM output before returning it to the user. Detect harmful content and block or replace it.", code: `# Moltbot output safety classifier:
output_filtering:
  enabled: true
  classifier: "moltbot-safety-v3"

  # Safety categories:
  categories:
    violence:
      enabled: true
      threshold: 0.70  # Block if confidence > 70%
      action: block_and_replace
      replacement: "I cannot provide information about violence."

    hate_speech:
      enabled: true
      threshold: 0.75
      action: block_and_replace
      replacement: "I cannot generate hate speech."

    self_harm:
      enabled: true
      threshold: 0.80
      action: block_and_alert  # High severity — alert security team

    sexual_content:
      enabled: true
      threshold: 0.70
      action: block_and_replace

    illegal_activities:
      enabled: true
      threshold: 0.75
      action: block_and_replace

    phishing:
      enabled: true
      threshold: 0.85
      action: block_and_alert

  # Fallback output:
  fallback:
    enabled: true
    message: "I cannot provide that information. For assistance, contact support."

  # Logging:
  logging:
    log_blocked_outputs: true
    log_classifier_scores: true
    alert_on_high_severity: true` },
  { id: "OF-2", title: "PII Filtering", desc: "Detect and redact personally identifiable information (PII) in LLM outputs. Protect user privacy and comply with GDPR.", code: `# Moltbot PII output filtering:
pii_filtering:
  enabled: true
  engine: "presidio"

  # PII entities to detect:
  entities:
    - PERSON
    - EMAIL_ADDRESS
    - PHONE_NUMBER
    - IBAN_CODE
    - CREDIT_CARD
    - IP_ADDRESS
    - URL
    - LOCATION
    - DATE_OF_BIRTH
    - NATIONAL_ID
    - PASSPORT

  # Action on detection:
  action: redact  # Options: redact, block, alert

  # Redaction format:
  redaction_format: "<PII_REDACTED>"

  # Context-aware redaction:
  context_aware: true
  # If the user explicitly asks for their own PII (e.g., "show me my email"),
  # allow it with user consent. If PII appears unexpectedly, redact it.

  # Audit logging:
  logging:
    log_pii_detections: true
    log_redaction_count: true
    # Required for GDPR accountability (Art. 30 RoPA)` },
  { id: "OF-3", title: "Policy Violation Detection", desc: "Detect policy violations specific to your organisation (e.g., competitor disparagement, legal advice without disclaimer, financial advice without disclaimer).", code: `# Moltbot policy violation detection:
policy_filtering:
  enabled: true
  policies:
    competitor_disparagement:
      enabled: true
      keywords: ["competitor is bad", "competitor sucks", "avoid competitor"]
      threshold: 0.60
      action: add_disclaimer
      disclaimer: "This is an AI-generated response. For objective comparisons, consult independent sources."

    legal_advice:
      enabled: true
      keywords: ["you should sue", "legal advice", "file a lawsuit"]
      threshold: 0.70
      action: add_disclaimer
      disclaimer: "This is not legal advice. Consult a qualified attorney for legal matters."

    medical_advice:
      enabled: true
      keywords: ["take this medication", "medical diagnosis", "prescribe"]
      threshold: 0.70
      action: add_disclaimer
      disclaimer: "This is not medical advice. Consult a healthcare professional."

    financial_advice:
      enabled: true
      keywords: ["invest in", "buy stock", "sell stock"]
      threshold: 0.70
      action: add_disclaimer
      disclaimer: "This is not financial advice. Consult a financial advisor."

  # Disclaimer placement:
  disclaimer_placement: append  # append to end of output

  # Policy-specific logging:
  logging:
    log_policy_violations: true
    log_disclaimer_added: true` },
  { id: "OF-4", title: "Output Post-Processing", desc: "Post-process LLM outputs for consistency, formatting, and safety. Apply transformations before returning to the user.", code: `# Moltbot output post-processing:
post_processing:
  enabled: true

  # Transformations:
  transformations:
    # 1. Code formatting
    code_formatting:
      enabled: true
      language_detection: true
      syntax_highlighting: true

    # 2. Markdown sanitisation
    markdown_sanitisation:
      enabled: true
      # Remove potentially harmful markdown:
      # - HTML tags (unless whitelisted)
      # - Javascript execution
      # - External images from untrusted sources
      allowed_html_tags: ["b", "i", "u", "strong", "em", "code", "pre"]

    # 3. Link validation
    link_validation:
      enabled: true
      # Validate all links in output:
      # - Block links to malicious domains
      # - Add rel="nofollow" to external links
      block_domains: ["malicious-site.com", "phishing-site.com"]
      add_nofollow: true

    # 4. Length limit
    length_limit:
      enabled: true
      max_characters: 10000
      on_exceed: truncate_with_ellipsis

  # Safety check after post-processing:
  safety_check:
    enabled: true
    # Re-run safety classifier after transformations
    # This catches cases where transformations introduce safety issues

  # Output caching:
  caching:
    enabled: true
    cache_duration_seconds: 300
    # Cache safe outputs to reduce LLM calls
    # Do not cache outputs that required disclaimers or redactions` },
]

const FAQ = [
  { q: "What is the difference between input filtering and output filtering for LLMs?", a: "Input filtering happens BEFORE the LLM processes the prompt. It scans user input for malicious patterns, prompt injection attempts, and policy violations. If input is blocked, the LLM never sees it. Output filtering happens AFTER the LLM generates a response. It scans the LLM's output for harmful content, PII, and policy violations. If output is blocked, the LLM has already done the work, but the user never sees the harmful response. Both are necessary: input filtering reduces the chance the LLM produces harmful content in the first place. Output filtering catches harmful content that slips through input filtering or is generated by the LLM despite safe input. Output filtering is particularly important for: jailbreak attempts that bypass input filters, PII that the LLM retrieves from RAG corpus, policy violations the LLM generates inadvertently." },
  { q: "How accurate are LLM safety classifiers?", a: "LLM safety classifier accuracy varies by model and training data. State-of-the-art classifiers (2025-2026): 90-95% accuracy for clear-cut harmful content (hate speech, explicit violence). 75-85% accuracy for nuanced content (satire, fictional violence, medical information). False positives: 5-15% — safe content incorrectly flagged as harmful. False negatives: 5-10% — harmful content incorrectly allowed. Tradeoffs: Higher threshold = fewer false positives, more false negatives. Lower threshold = more false positives, fewer false negatives. Recommendation: set thresholds based on your use case. For customer-facing applications, prioritize safety over false positives (higher threshold). For internal tools, balance safety with usability (lower threshold). Always log classifier scores to tune thresholds over time." },
  { q: "How do I handle PII in LLM outputs for GDPR compliance?", a: "GDPR requires that you minimise PII disclosure and have a lawful basis for processing PII. For LLM outputs: 1) PII filtering — detect and redact PII in all outputs before returning to the user. 2) Context-aware filtering — if the user explicitly asks for their own PII (e.g., 'show me my email'), allow it only with user consent and clear disclosure. 3) Logging — log all PII detections and redactions for GDPR accountability (Art. 30 RoPA). 4) Data minimisation — configure your RAG system to avoid retrieving PII in the first place. 5) User rights — implement a mechanism for users to request deletion of their PII from the RAG corpus. 6) Legal basis — ensure you have a legal basis (Art. 6 GDPR) for any PII processing. For most AI assistants, legitimate interest or contract performance applies." },
  { q: "Can output filtering introduce latency?", a: "Yes — output filtering adds latency because the output must be processed through the classifier before being returned to the user. Typical latency impact: 50-200ms for content safety classification. 100-300ms for PII detection with multiple entities. 50-150ms for policy violation detection. Total: 200-650ms additional latency. Mitigation: 1) Use fast classifier models (quantised models, distilled models). 2) Run classification in parallel with LLM generation for streaming outputs (classify chunks as they are generated). 3) Cache classifier results for repeated outputs. 4) Use GPU acceleration for classification. 5) For low-latency use cases, consider a two-tier approach: fast classifier for obvious violations, slow classifier for edge cases." },
]

export default function LlmOutputFilteringPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Output Filtering", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          ...jsonLd,
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot LLM Output Filtering Guide", "Moltbot LLM Output Filtering Guide"), description: pick(isDE, "LLM-Ausgabe-Filterung", "LLM output filtering"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Output-Filtering-Guide für eigene KI-Systeme.", "Output filtering guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Output Filtering</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "LLM Output Filtering", "LLM Output Filtering")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "LLM-Ausgaben können schädliche Inhalte enthalten — PII, Policy-Verstöße oder harmful content. Vier Filter-Typen: Safety Classifier, PII-Filterung, Policy-Violation-Detection und Post-Processing.", "LLM outputs can contain harmful content — PII, policy violations or harmful content. Four filter types: safety classifier, PII filtering, policy violation detection and post-processing.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Output Filtering für LLMs? Einfach erklärt", "What is Output Filtering for LLMs? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Output Filtering für LLMs ist wie ein Content-Filter für KI-Antworten: es prüft jede Ausgabe, bevor sie dem Nutzer angezeigt wird. Safety Classifier erkennt schädliche Inhalte (Hate Speech, Gewalt, Selbstmord). PII-Filterung entfernt persönliche Daten (E-Mail, Telefonnummer, Kreditkarte). Policy-Violation-Detection fügt Disclaimer bei Rechts-, Finanz- oder Medizinberatung. Post-Processing formatiert Code, bereinigt Markdown und validiert Links. Ohne Output Filtering könnte ein KI-Modell versehentlich PII preisgeben, harmful content generieren oder rechtliche Probleme verursachen.", "Output filtering for LLMs is like a content filter for AI responses: it checks every output before showing it to the user. Safety classifier detects harmful content (hate speech, violence, self-harm). PII filtering removes personal data (email, phone number, credit card). Policy violation detection adds disclaimers for legal, financial, or medical advice. Post-processing formats code, sanitizes markdown, and validates links. Without output filtering, an AI model could accidentally leak PII, generate harmful content, or cause legal issues.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu 4 Filter-Typen und FAQ", "Jump to 4 filter types and FAQ")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Output-Filter-Typen", "4 Output Filter Types")}</h2>
          <div className="space-y-5">
            {FILTER_TYPES.map((f) => (
              <div key={f.id} className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700/50">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900/80 backdrop-blur-lg px-2 py-0.5 rounded">{f.id}</span>
                  <span className="font-bold text-gray-100">{f.title}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{f.desc}</p>
                  <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 text-green-400 font-mono text-xs overflow-x-auto"><pre>{f.code}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 hover:border-cyan-500/30 transition-all duration-300">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/llm-output-validation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Output Validation</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Output-Safety-Classifier", "Output safety classifier")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-data-loss-prevention`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Data Loss Prevention</div>
              <div className="text-sm text-gray-300">{pick(isDE, "PII-Filterung", "PII filtering")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-jailbreak-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Jailbreak Defense</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Input-Filtering", "Input filtering")}</div>
            </a>
            <a href={`/${locale}/solutions/gdpr-ai-data-processing`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">GDPR AI Data Processing</div>
              <div className="text-sm text-gray-300">{pick(isDE, "DSGVO-konforme Filterung", "GDPR-compliant filtering")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Output Filtering Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Output-Filtering-Implementierungen für LLM-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with output filtering implementations for LLM systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
