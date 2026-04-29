import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-inference-privacy"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Inference Privacy: LLM-Inferenz-Datenschutz | ClawGuru Moltbot", "LLM Inference Privacy: LLM Inference Privacy Protection | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Inferenz-Datenschutz: Query Privacy, Differential Privacy Inference, Private Inference Protocols und Inference Data Minimization für LLM-Inferenz-Datenschutz und DSGVO-Compliance.", "LLM inference privacy: query privacy, differential privacy inference, private inference protocols and inference data minimization for LLM inference privacy and GDPR compliance.")
  return {
    title, description,
    keywords: ["llm inference privacy", "query privacy llm", "differential privacy inference", "private inference protocols", "inference data minimization", "gdpr llm privacy"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "IFP-1", title: "Query Privacy", desc: "Protect the privacy of user queries sent to LLMs. Prevent query logging and exposure.", code: `# Moltbot query privacy:
query_privacy:
  enabled: true

  # PII Scrubbing:
  pii_scrubbing:
    enabled: true
    # Detect: PII in queries (names, emails, SSN)
    # Scrub: before logging
    # Pseudonymize: user identifiers
    # Retain: scrubbed logs only

  # Query Anonymization:
  anonymization:
    enabled: true
    # Remove: identifying information
    # Generalize: specific values
    # Add: k-anonymity to query logs
    # Certify: anonymization effectiveness

  # Minimal Logging:
  minimal_logging:
    enabled: true
    # Log: only what is needed
    # Avoid: logging full query content
    # Retention: shortest required period
    # Delete: after retention period` },
  { id: "IFP-2", title: "Differential Privacy Inference", desc: "Apply differential privacy to LLM inference to prevent membership inference attacks.", code: `# Moltbot differential privacy inference:
differential_privacy:
  enabled: true

  # Output Noise Injection:
  noise:
    enabled: true
    # Apply: calibrated Gaussian noise to outputs
    # Epsilon: privacy budget (e.g., 1.0)
    # Delta: failure probability (e.g., 1e-5)
    # Track: cumulative privacy budget

  # Privacy Budget Management:
  budget:
    enabled: true
    # Define: per-user privacy budget
    # Track: budget consumption
    # Halt: inference when budget exhausted
    # Reset: budget per time period

  # Membership Inference Defense:
  membership_inference:
    enabled: true
    # Detect: membership inference attacks
    # Measure: model memorization
    # Mitigate: with output noise
    # Audit: training data exposure` },
  { id: "IFP-3", title: "Private Inference Protocols", desc: "Use cryptographic protocols to enable private LLM inference. Protect query content from the server.", code: `# Moltbot private inference protocols:
private_inference:
  enabled: true

  # Secure Multi-Party Computation:
  smpc:
    enabled: false  # High overhead — use for highest sensitivity
    # Protocol: secret sharing or garbled circuits
    # Compute: inference without seeing plaintext
    # Use case: medical, legal, financial queries

  # Homomorphic Encryption:
  homomorphic:
    enabled: false  # Very high overhead — research use
    # Encrypt: query before sending
    # Compute: on encrypted data
    # Decrypt: only at client

  # Trusted Execution Environments:
  tee:
    enabled: true   # Practical for production
    # Run: LLM inference in TEE (SGX, TDX)
    # Attest: TEE integrity to client
    # Protect: query from cloud provider
    # Use: for cloud inference privacy` },
  { id: "IFP-4", title: "Inference Data Minimization", desc: "Minimize data collected during LLM inference. Send only what is needed, retain only what is required.", code: `# Moltbot inference data minimization:
data_minimization:
  enabled: true

  # Query Minimization:
  query:
    enabled: true
    # Strip: unnecessary context from queries
    # Truncate: queries to minimum required length
    # Remove: metadata not needed for inference
    # Validate: necessity of each query field

  # Context Window Management:
  context:
    enabled: true
    # Expire: old context after session ends
    # Limit: context window to necessary history
    # Encrypt: stored context
    # Delete: context on user request

  # Retention Minimization:
  retention:
    enabled: true
    # Define: minimum retention per data type
    # Delete: automatically after retention period
    # GDPR: support right to erasure
    # Audit: retention compliance` },
]

const FAQ = [
  { q: "Why is LLM inference privacy a concern?", a: "LLM inference privacy matters because: 1) Queries reveal sensitive information — users share personal, medical, legal, and financial details with LLMs. 2) Query logging exposes this data — every inference may be logged by the LLM provider. 3) Membership inference attacks — attackers can determine whether specific data was in training data by querying the model. 4) Model inversion — attackers can reconstruct training data from model outputs. 5) GDPR implications — processing personal data in queries requires legal basis and must respect data subject rights. 6) Third-party cloud risk — sending queries to cloud LLM APIs exposes data to the provider and its subprocessors." },
  { q: "What is differential privacy for LLM inference?", a: "Differential privacy (DP) for inference adds mathematically calibrated noise to model outputs to prevent privacy attacks. The key guarantee: the probability of any output changes by at most a factor of e^epsilon whether or not any individual's data was in the training set. For inference: DP output perturbation adds noise to logits or output tokens. Privacy budget (epsilon) controls the tradeoff — lower epsilon = stronger privacy but lower utility. Practical challenge: DP for LLMs is computationally expensive and degrades output quality. Used selectively for high-sensitivity applications." },
  { q: "What is a Trusted Execution Environment (TEE) for LLM inference?", a: "A Trusted Execution Environment (TEE) is a secure enclave within a processor where code and data are protected from the host OS and cloud provider. For LLM inference: 1) The LLM runs inside the TEE (e.g., Intel SGX, Intel TDX, AMD SEV). 2) Queries are encrypted by the client and only decrypted inside the TEE. 3) The cloud provider cannot see query content — only the encrypted data. 4) The client can verify TEE integrity via remote attestation. Practical: TEE-based private inference is production-ready and used by services like Azure Confidential Computing, Intel Tiber. It provides strong cloud provider privacy without the extreme overhead of FHE." },
  { q: "How does LLM inference privacy relate to GDPR?", a: "GDPR applies to LLM inference when queries contain personal data (very common): 1) Legal basis — you need a lawful basis to process personal data in queries (consent, contract, legitimate interest). 2) Data minimization (Article 5) — only process personal data necessary for the purpose. 3) Right to erasure (Article 17) — users can request deletion of their inference history. 4) Data transfers — sending queries to non-EU LLM providers requires GDPR-compliant transfer mechanisms (SCCs, adequacy decision). 5) Processor agreements — if using a cloud LLM provider, a Data Processing Agreement is required. Self-hosted LLMs significantly simplify GDPR compliance for inference." },
]

export default function LlmInferencePrivacyPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Inference Privacy", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Inference Privacy Guide", "LLM Inference Privacy Guide"), description: pick(isDE, "LLM Inferenz-Datenschutz", "LLM inference privacy"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Inferenz-Datenschutz-Guide für eigene LLM-Systeme. DSGVO-Compliance.", "Inference privacy guide for your own LLM systems. GDPR compliance.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Inference Privacy</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Inference Privacy", "LLM Inference Privacy")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Jede LLM-Anfrage enthält potentiell personenbezogene Daten — und ist damit DSGVO-relevant. Vier Kontrollen: Query Privacy, Differential Privacy Inference, Private Inference Protocols und Data Minimization.", "Every LLM query potentially contains personal data — making it GDPR-relevant. Four controls: query privacy, differential privacy inference, private inference protocols and data minimization.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Inference Privacy? Einfach erklärt", "What is LLM Inference Privacy? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Inference Privacy schützt persönliche Daten in KI-Anfragen: Query Privacy scrubt PII und anonymisiert Queries vor Logging. Differential Privacy Inference fügt mathematisch kalibriertes Rauschen zu Outputs hinzu um Membership Inference Angriffe zu verhindern. Private Inference Protocols nutzen TEEs oder Homomorphe Verschlüsselung für Cloud-Provider-Privacy. Data Minimization sendet nur notwendige Daten und löscht Logs nach Retention-Fristen. Ohne Privacy können Angreifer persönliche Daten aus Queries extrahieren, Membership Inference durchführen oder DSGVO-Verletzungen verursachen.", "LLM inference privacy protects personal data in AI queries: query privacy scrubs PII and anonymizes queries before logging. Differential privacy inference adds mathematically calibrated noise to outputs to prevent membership inference attacks. Private inference protocols use TEEs or homomorphic encryption for cloud provider privacy. Data minimization sends only necessary data and deletes logs after retention periods. Without privacy, attackers can extract personal data from queries, conduct membership inference, or cause GDPR violations.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Inferenz-Datenschutz-Kontrollen", "Jump to inference privacy controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Inferenz-Datenschutz-Kontrollen", "4 Inference Privacy Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-privacy-preserving-computation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Privacy Preserving Computation", "LLM Privacy Preserving Computation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Privacy-Computation", "Privacy computation")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-data-encryption-at-rest`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Data Encryption at Rest", "LLM Data Encryption at Rest")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Datenverschlüsselung", "Data encryption")}</div>
            </a>
            <a href={`/${locale}/solutions/eu-ai-act-compliance-checklist`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "EU AI Act Compliance", "EU AI Act Compliance")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "EU-KI-Gesetz", "EU AI Act")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-data-loss-prevention`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Data Loss Prevention", "AI Data Loss Prevention")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "DLP für AI", "DLP for AI")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Privacy Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Inference Privacy-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM inference privacy implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
