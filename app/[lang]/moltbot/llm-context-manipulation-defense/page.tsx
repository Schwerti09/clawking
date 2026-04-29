import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-context-manipulation-defense"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Context Manipulation Defense: LLM-Kontext-Manipulation-Defense | ClawGuru Moltbot", "LLM Context Manipulation Defense: LLM Context Manipulation Defense | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Kontext-Manipulation-Defense: Context Integrity Verification, Context Injection Prevention, Context Reconstruction und Context Anomaly Detection für LLM-Kontext-Manipulation.", "LLM context manipulation defense: context integrity verification, context injection prevention, context reconstruction and context anomaly detection for LLM context manipulation.")
  return {
    title, description,
    keywords: ["llm context manipulation defense", "context integrity verification", "context injection prevention", "context reconstruction", "context anomaly detection", "moltbot context security"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "CMD-1", title: "Context Integrity Verification", desc: "Verify the integrity of the LLM context before each generation. Ensure the context has not been tampered with between storage and use.", code: `# Moltbot context integrity verification:
context_integrity:
  enabled: true

  # Hash-based verification:
  hashing:
    # Generate hash of context when stored
    algorithm: "SHA-256"
    # Hash: user_input + system_prompt + rag_context + conversation_history

  # Verification:
  verification:
    # Verify hash before each generation
    enabled: true
    # If hash mismatch: reject request, alert security team
    on_mismatch:
      action: block_and_alert
      message: "Context integrity verification failed."

  # Timestamp verification:
  timestamp:
    # Include timestamp in hash
    enabled: true
    # Reject contexts older than max_age
    max_age_minutes: 30

  # Version verification:
  version:
    # Include context version in hash
    enabled: true
    # Increment version on each context update
    # Reject outdated context versions` },
  { id: "CMD-2", title: "Context Injection Prevention", desc: "Prevent malicious context injection from RAG, tool results, or external sources. Validate and sanitise all context before adding to the LLM context.", code: `# Moltbot context injection prevention:
context_injection_prevention:
  enabled: true

  # RAG context validation:
  rag_validation:
    enabled: true
    # Validate RAG results before adding to context:
    # - Source validation (whitelist)
    # - Content sanitisation (PII scan)
    # - Size limits (max chunks)
    # - Delimiter wrapping (to prevent prompt injection)
    source_whitelist: ["internal-wiki", "confluence", "sharepoint"]
    max_chunks: 10
    delimiter_wrapping: true

  # Tool result validation:
  tool_validation:
    enabled: true
    # Validate tool results before adding to context:
    # - Output sanitisation
    # - Size limits
    # - Delimiter wrapping
    output_sanitisation: true
    max_size_bytes: 100000

  # External context validation:
  external_validation:
    enabled: true
    # Validate external context (API calls, web scraping):
    # - Source validation
    # - Content sanitisation
    # - Rate limiting
    source_validation: true
    content_sanitisation: true` },
  { id: "CMD-3", title: "Context Reconstruction", desc: "Reconstruct the LLM context from trusted sources on each generation. This prevents context manipulation by ensuring the context is built from scratch.", code: `# Moltbot context reconstruction:
context_reconstruction:
  enabled: true

  # Reconstruction strategy:
  strategy: "from_scratch"
  # Rebuild context from trusted sources on each generation:
  # - System prompt (from secure storage)
  # - User input (from current request)
  # - RAG context (re-retrieved from vector store)
  # - Conversation history (from secure storage with truncation)

  # Trusted sources:
  trusted_sources:
    system_prompt: "secure_storage"
    user_input: "current_request"
    rag_context: "vector_store"
    conversation_history: "secure_storage"

  # Reconstruction verification:
  verification:
    # Verify reconstructed context matches expected structure
    enabled: true
    # Check: field presence, field types, field order
    # If verification fails: block request` },
  { id: "CMD-4", title: "Context Anomaly Detection", desc: "Detect anomalous context patterns that may indicate manipulation or attack. Use statistical analysis and machine learning for detection.", code: `# Moltbot context anomaly detection:
context_anomaly_detection:
  enabled: true

  # Statistical analysis:
  statistical:
    enabled: true
    # Detect anomalies in:
    # - Context size (unusually large or small)
    # - Token distribution (unusual token frequencies)
    # - Field order (unusual field ordering)
    # - Content patterns (unusual character sequences)
    metrics:
      - context_size_z_score
      - token_distribution_entropy
      - field_order_variance

  # Machine learning detection:
  ml_detection:
    enabled: true
    # Use ML model to detect anomalous contexts
    # Model trained on normal context patterns
    # Flags contexts that deviate from normal patterns
    model: "context_anomaly_detector_v1"
    threshold: 0.85  # Alert if anomaly score > 85%

  # Alerting:
  alerting:
    enabled: true
    # Alert on:
    # - High anomaly score
    # - Repeated anomalies from same user
    # - Anomalies in high-risk contexts (sensitive data)
    alert_on:
      - high_score
      - repeated_anomaly
      - high_risk_context` },
]

const FAQ = [
  { q: "What is the difference between context integrity verification and context reconstruction?", a: "Context integrity verification checks that the context has not been tampered with since it was stored. It uses cryptographic hashing to verify integrity and timestamps to ensure freshness. Context reconstruction rebuilds the context from trusted sources on each generation, rather than reusing a stored context. Integrity verification is a check: \"has this context been modified?\". Reconstruction is a rebuild: \"build a fresh context from trusted sources\". Both are necessary: integrity verification detects tampering, reconstruction prevents tampering by ensuring the context is always built from scratch. Reconstruction is more secure but may have performance overhead due to re-retrieving RAG context." },
  { q: "How does context injection prevention differ from prompt injection detection?", a: "Context injection prevention prevents malicious content from being added to the LLM context from external sources (RAG, tool results, external APIs). It validates and sanitises context before it's added to the LLM's context window. Prompt injection detection analyzes the final context (including user input) to detect malicious patterns that could cause the LLM to ignore its instructions. Context injection prevention is about the input to the context (what gets added). Prompt injection detection is about the final context (what the LLM sees). Both are necessary: context injection prevention prevents malicious content from entering the context, prompt injection detection detects malicious patterns in the final context." },
  { q: "How do I implement context reconstruction efficiently?", a: "Context reconstruction can be expensive if it requires re-retrieving RAG context on every generation. Optimisation strategies: 1) Cache RAG results with short TTL (5-10 minutes) — this allows reuse while ensuring freshness. 2) Incremental reconstruction — only reconstruct parts of the context that may have changed (user input, recent conversation history). 3) Lazy reconstruction — reconstruct context only for high-risk requests (sensitive data, privileged users). 4) Background reconstruction — reconstruct context in the background for expected requests. 5) Differential reconstruction — reconstruct only the delta between stored context and expected context." },
  { q: "What are common context manipulation attack vectors?", a: "Common context manipulation attack vectors: 1) RAG poisoning — inject malicious documents into the RAG corpus that are retrieved and added to the context. 2) Tool result injection — compromise tools to return malicious results that are added to the context. 3) Conversation history manipulation — tamper with stored conversation history to inject malicious content. 4) System prompt modification — modify the stored system prompt to weaken security constraints. 5) Context overflow — flood the context with malicious content to push out security instructions. 6) Context replay — replay old contexts to bypass security patches. Defense: integrity verification, reconstruction, injection prevention, anomaly detection." },
]

export default function LlmContextManipulationDefensePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Context Manipulation Defense", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Context Manipulation Defense Guide", "LLM Context Manipulation Defense Guide"), description: pick(isDE, "LLM Kontext-Manipulation Defense Sicherheit", "LLM context manipulation defense security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Context-Manipulation-Defense-Guide für eigene KI-Systeme.", "Context manipulation defense guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Context Manipulation Defense</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Context Manipulation Defense", "LLM Context Manipulation Defense")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Kontext-Manipulation kann Security-Regeln umgehen — ohne Defense können Angreifer Kontext manipulieren und LLM-Verhalten ändern. Vier Kontrollen: Integrity Verification, Injection Prevention, Reconstruction und Anomaly Detection.", "LLM context manipulation can bypass security rules — without defense, attackers can manipulate context and change LLM behavior. Four controls: integrity verification, injection prevention, reconstruction and anomaly detection.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Context Manipulation Defense? Einfach erklärt", "What is LLM Context Manipulation Defense? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Context Manipulation Defense ist wie ein Sicherheits-Check für den LLM-Kontext: Integrity Verification prüft mit Hashes, ob der Kontext verändert wurde. Injection Prevention validiert RAG-Ergebnisse und Tool-Outputs vor dem Hinzufügen. Reconstruction baut den Kontext bei jeder Anfrage neu aus vertrauenswürdigen Quellen. Anomaly Detection erkennt ungewöhnliche Muster im Kontext. Ohne Defense können Angreifer RAG-Corpus vergiften, Tool-Results manipulieren oder Conversation History ändern — das LLM ignoriert dann Security-Regeln.", "LLM context manipulation defense is like a security check for the LLM context: integrity verification uses hashes to check if the context was modified. Injection prevention validates RAG results and tool outputs before adding them. Reconstruction rebuilds the context from trusted sources on each request. Anomaly detection detects unusual patterns in the context. Without defense, attackers can poison the RAG corpus, manipulate tool results, or modify conversation history — the LLM then ignores security rules.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Context-Defense-Kontrollen", "Jump to context defense controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Context-Manipulation-Defense-Kontrollen", "4 Context Manipulation Defense Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-context-window-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Context Window Security", "LLM Context Window Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Context-Overflow-Prevention", "Context overflow prevention")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-context-isolation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Context Isolation", "LLM Context Isolation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Kontext-Isolation", "Context isolation")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-data-loss-prevention`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Data Loss Prevention", "AI Data Loss Prevention")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "RAG-Injection-Prevention", "RAG injection prevention")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-prompt-injection-detection`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Prompt Injection Detection", "LLM Prompt Injection Detection")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Prompt-Injection-Detection", "Prompt injection detection")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Context Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Context Manipulation Defense-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM context manipulation defense implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
