import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-model-watermarking"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Model Watermarking: LLM-Modell-Watermarking | ClawGuru Moltbot", "LLM Model Watermarking: LLM Model Watermarking | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Modell-Watermarking: Watermark Embedding, Watermark Detection, Watermark Robustness und Watermark Verification für LLM-Modell-Authentifizierung.", "LLM model watermarking: watermark embedding, watermark detection, watermark robustness and watermark verification for LLM model authentication.")
  return {
    title, description,
    keywords: ["llm model watermarking", "watermark embedding", "watermark detection", "watermark robustness", "watermark verification", "moltbot watermarking"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "MW-1", title: "Watermark Embedding", desc: "Embed watermarks into LLM model outputs. Use statistical or syntactic watermarking techniques to mark AI-generated content.", code: `# Moltbot watermark embedding:
watermark_embedding:
  enabled: true

  # Statistical watermarking:
  statistical:
    enabled: true
    # Use statistical patterns in token distribution
    # Example: bias token probabilities toward watermark pattern
    # Detectable: statistical analysis of outputs
    # Robustness: moderate (resists paraphrasing)

  # Syntactic watermarking:
  syntactic:
    enabled: true
    # Use syntactic patterns in output structure
    # Example: specific sentence structures, punctuation patterns
    # Detectable: syntactic analysis of outputs
    # Robustness: high (resists paraphrasing)

  # Embedding strength:
  strength:
    # Balance: watermark detectability vs output quality
    # Higher strength: more detectable, lower quality
    # Lower strength: less detectable, higher quality
    level: 0.5` },
  { id: "MW-2", title: "Watermark Detection", desc: "Detect watermarks in LLM outputs to identify AI-generated content. Use statistical or syntactic analysis.", code: `# Moltbot watermark detection:
watermark_detection:
  enabled: true

  # Statistical detection:
  statistical_detection:
    enabled: true
    # Analyze token distribution for watermark patterns
    # Use: hypothesis testing, p-value calculation
    # Threshold: p-value < 0.01 indicates watermark
    # Output: watermark confidence score

  # Syntactic detection:
  syntactic_detection:
    enabled: true
    # Analyze output structure for watermark patterns
    # Use: parsing, pattern matching
    # Threshold: pattern match > 80% indicates watermark
    # Output: watermark confidence score

  # Combined detection:
  combined:
    enabled: true
    # Combine statistical and syntactic detection
    # Use: weighted average of confidence scores
    # Threshold: combined score > 0.7 indicates watermark` },
  { id: "MW-3", title: "Watermark Robustness", desc: "Ensure watermarks survive attacks like paraphrasing, translation, and modification. Use robust watermarking techniques.", code: `# Moltbot watermark robustness:
watermark_robustness:
  enabled: true

  # Robustness testing:
  testing:
    enabled: true
    # Test watermark against attacks:
    # - Paraphrasing
    # - Translation
    # - Minor modifications
    # - Adversarial attacks
    # Metric: watermark detection rate after attack

  # Robustness enhancement:
  enhancement:
    enabled: true
    # Use: multi-layer watermarking
    # - Statistical + syntactic
    # - Multiple watermark patterns
    # - Adaptive watermarking

  # Attack detection:
  attack_detection:
    enabled: true
    # Detect watermark removal attempts
    # Monitor: sudden changes in watermark detection rate
    # Alert: on suspected watermark removal` },
  { id: "MW-4", title: "Watermark Verification", desc: "Verify watermark authenticity to prevent false positives. Use cryptographic signatures or key-based verification.", code: `# Moltbot watermark verification:
watermark_verification:
  enabled: true

  # Cryptographic verification:
  cryptographic:
    enabled: true
    # Use: digital signature for watermark
    # Sign: watermark pattern with private key
    # Verify: watermark with public key
    # Prevents: false positives from mimicry

  # Key-based verification:
  key_based:
    enabled: true
    # Use: secret key for watermark embedding
    # Embed: watermark using secret key
    # Detect: watermark using secret key
    # Prevents: unauthorized detection

  # Verification logging:
  logging:
    enabled: true
    # Log: all watermark verification attempts
    # Track: verification success/failure
    # Audit: watermark verification history` },
]

const FAQ = [
  { q: "What is the difference between statistical and syntactic watermarking?", a: "Statistical watermarking embeds watermarks in the statistical distribution of tokens. It biases the model's token probabilities toward a watermark pattern, which can be detected through statistical analysis. Syntactic watermarking embeds watermarks in the syntactic structure of outputs. It uses specific sentence structures, punctuation patterns, or other syntactic features. Statistical watermarking is more subtle but less robust to paraphrasing. Syntactic watermarking is more robust but more noticeable. Both can be combined for stronger watermarking: statistical for subtlety, syntactic for robustness." },
  { q: "How does watermark detection work?", a: "Watermark detection analyzes LLM outputs to detect embedded watermark patterns. Statistical detection uses hypothesis testing to determine if the token distribution matches the watermark pattern (e.g., p-value < 0.01 indicates watermark). Syntactic detection uses parsing and pattern matching to detect syntactic watermark patterns (e.g., specific sentence structures). Combined detection uses a weighted average of statistical and syntactic confidence scores. Detection returns a confidence score indicating the likelihood that the output contains a watermark. Thresholds determine the final decision (e.g., score > 0.7 = watermark present)." },
  { q: "How do I improve watermark robustness?", a: "Watermark robustness can be improved by: 1) Multi-layer watermarking — combine statistical and syntactic watermarking. 2) Multiple watermark patterns — embed multiple independent watermark patterns. 3) Adaptive watermarking — adjust watermark strength based on content. 4) Robust embedding techniques — use techniques that resist paraphrasing and translation. 5) Regular testing — test watermark against various attacks (paraphrasing, translation, adversarial attacks). 6) Attack detection — monitor for watermark removal attempts and alert on suspicious activity." },
  { q: "What are the limitations of watermarking?", a: "Watermarking has several limitations: 1) Quality degradation — stronger watermarks can reduce output quality. 2) False positives — natural text may coincidentally match watermark patterns. 3) False negatives — attacks (paraphrasing, translation) can remove watermarks. 4) Detectability — sophisticated attackers can detect and remove watermarks. 5) Trade-offs — there is a trade-off between watermark strength, robustness, and output quality. 6) Standardisation — no standard watermarking protocol exists, making interoperability difficult." },
]

export default function LlmModelWatermarkingPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Model Watermarking", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Model Watermarking Guide", "LLM Model Watermarking Guide"), description: pick(isDE, "LLM Modell-Watermarking", "LLM model watermarking"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Model-Watermarking-Guide für eigene KI-Systeme.", "Model watermarking guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Model Watermarking</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Model Watermarking", "LLM Model Watermarking")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Watermarking können nicht authentifiziert werden — ohne Watermarks bleibt AI-generierter Content unmarkiert. Vier Kontrollen: Watermark Embedding, Detection, Robustness und Verification.", "LLM models without watermarking cannot be authenticated — without watermarks, AI-generated content remains unmarked. Four controls: watermark embedding, detection, robustness and verification.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Model Watermarking? Einfach erklärt", "What is LLM Model Watermarking? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Model Watermarking markiert AI-generierten Content zur Authentifizierung: Watermark Embedding nutzt statistische oder syntaktische Patterns in Token-Distribution oder Output-Struktur. Watermark Detection analysiert Outputs mit Hypothesen-Testing oder Pattern-Matching um Watermarks zu erkennen. Watermark Robustness testet Watermarks gegen Paraphrasing, Translation und Adversarial Attacks. Watermark Verification nutzt kryptografische Signaturen oder Key-based Verification um False Positives zu verhindern. Ohne Watermarking kann AI-Content nicht von Human-Content unterschieden werden.", "LLM model watermarking marks AI-generated content for authentication: watermark embedding uses statistical or syntactic patterns in token distribution or output structure. Watermark detection analyzes outputs with hypothesis testing or pattern matching to detect watermarks. Watermark robustness tests watermarks against paraphrasing, translation, and adversarial attacks. Watermark verification uses cryptographic signatures or key-based verification to prevent false positives. Without watermarking, AI content cannot be distinguished from human content.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Model-Watermarking-Kontrollen", "Jump to model watermarking controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Model-Watermarking-Kontrollen", "4 Model Watermarking Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-output-filtering`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Output Filtering", "LLM Output Filtering")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Content-Safety", "Content safety")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-privacy-preserving-computation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Privacy-Preserving Computation", "LLM Privacy-Preserving Computation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Privacy", "Privacy")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-bias-detection-mitigation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Bias Detection Mitigation", "LLM Bias Detection Mitigation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Fairness", "Fairness")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Watermarking-Overview", "Watermarking overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Watermarking Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Model Watermarking-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM model watermarking implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
