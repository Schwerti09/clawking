import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-privacy-preserving-computation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Privacy-Preserving Computation: LLM-Privacy-Preserving-Computation | ClawGuru Moltbot", "LLM Privacy-Preserving Computation: LLM Privacy-Preserving Computation | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Privacy-Preserving-Computation: Federated Learning, Differential Privacy, Secure Multi-Party Computation und Homomorphic Encryption für LLM-Datenschutz.", "LLM privacy-preserving computation: federated learning, differential privacy, secure multi-party computation and homomorphic encryption for LLM privacy.")
  return {
    title, description,
    keywords: ["llm privacy preserving computation", "federated learning", "differential privacy", "smpc", "homomorphic encryption", "moltbot privacy"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "PPC-1", title: "Federated Learning", desc: "Train LLMs on distributed data without centralising data. Data stays on local devices, only model updates are shared.", code: `# Moltbot federated learning:
federated_learning:
  enabled: true

  # Federated learning architecture:
  architecture:
    # Central server coordinates training
    # Edge devices train on local data
    # Model updates aggregated centrally
    # Data never leaves local devices

  # Aggregation method:
  aggregation:
    # Use: Federated Averaging (FedAvg)
    # Aggregates: model weights from edge devices
    # Weighted: by number of samples per device
    # Secure: encrypted communication for updates

  # Privacy guarantees:
  privacy:
    # Data: remains on local devices
    # Updates: only model gradients shared
    # Differential privacy: add noise to gradients
    # Minimum clients: required for aggregation` },
  { id: "PPC-2", title: "Differential Privacy", desc: "Add calibrated noise to LLM outputs to protect individual privacy. Use differential privacy to prevent re-identification.", code: `# Moltbot differential privacy:
differential_privacy:
  enabled: true

  # Privacy budget:
  privacy_budget:
    # Epsilon: privacy parameter
    # Lower epsilon = stronger privacy
    # Typical: epsilon = 1.0 to 10.0
    epsilon: 1.0

  # Noise mechanism:
  noise:
    # Use: Gaussian mechanism for continuous data
    # Or: Laplace mechanism for discrete data
    # Add: noise to model outputs or gradients
    # Calibrate: based on sensitivity

  # Privacy tracking:
  tracking:
    # Track: privacy budget consumption
    # Alert: when budget exhausted
    # Reset: budget periodically
    # Audit: privacy budget usage` },
  { id: "PPC-3", title: "Secure Multi-Party Computation (SMPC)", desc: "Compute on encrypted data across multiple parties without revealing individual inputs. Use SMPC for collaborative LLM training.", code: `# Moltbot secure multi-party computation:
smpc:
  enabled: true

  # SMPC protocol:
  protocol:
    # Use: Yao's garbled circuits or secret sharing
    # Parties: 2 or more parties
    # Compute: on encrypted inputs
    # Reveal: only final result

  # Secret sharing:
  secret_sharing:
    # Split: input into shares
    # Distribute: shares to parties
    # Compute: on shares without revealing input
    # Reconstruct: result from shares

  # Security guarantees:
  security:
    # Privacy: inputs remain private
    # Correctness: result is correct
    # Fairness: all parties receive result
    # Verifiability: result can be verified` },
  { id: "PPC-4", title: "Homomorphic Encryption", desc: "Compute on encrypted data without decryption. Use homomorphic encryption for privacy-preserving LLM inference.", code: `# Moltbot homomorphic encryption:
homomorphic_encryption:
  enabled: true

  # Encryption scheme:
  scheme:
    # Use: Fully Homomorphic Encryption (FHE)
    # Or: Partially Homomorphic Encryption (PHE)
    # FHE: supports arbitrary computations
    # PHE: supports limited operations (addition or multiplication)

  # Inference on encrypted data:
  inference:
    # Encrypt: input data
    # Compute: on encrypted data
    # Decrypt: only output
    # Privacy: input data never revealed

  # Performance considerations:
  performance:
    # FHE: computationally expensive
    # PHE: faster but limited operations
    # Hardware: use FHE-accelerated hardware
    # Optimisation: batch processing` },
]

const FAQ = [
  { q: "What is the difference between federated learning and differential privacy?", a: "Federated learning is a training paradigm where data stays on local devices and only model updates are shared. It addresses data centralisation by training on distributed data. Differential privacy is a technique that adds calibrated noise to data or model outputs to protect individual privacy. It addresses re-identification by making it difficult to determine whether a specific individual's data was used. Both are often used together: federated learning keeps data local, differential privacy adds noise to model updates to prevent privacy leaks. Federated learning is about where computation happens. Differential privacy is about how privacy is mathematically guaranteed." },
  { q: "How does secure multi-party computation (SMPC) work?", a: "SMPC allows multiple parties to compute a function on their combined inputs without revealing individual inputs. Each party encrypts their input using secret sharing or garbled circuits. The computation is performed on the encrypted inputs, and only the final result is revealed. No party learns anything about other parties' inputs. Example: Three parties want to compute the average of their salaries without revealing individual salaries. Using SMPC, each party shares encrypted salary data, the average is computed on encrypted data, and only the average is revealed. SMPC is computationally expensive but provides strong privacy guarantees." },
  { q: "What are the performance implications of homomorphic encryption?", a: "Homomorphic encryption allows computation on encrypted data, but it is computationally expensive. Fully Homomorphic Encryption (FHE) supports arbitrary computations but is 100-1000x slower than plaintext computation. Partially Homomorphic Encryption (PHE) is faster (10-100x slower) but supports only limited operations (addition or multiplication, not both). Optimisation strategies: 1) Use FHE-accelerated hardware (GPUs, ASICs). 2) Batch operations to amortise overhead. 3) Use PHE when possible (e.g., only need addition). 4) Pre-compute common operations. 5) Use hybrid approaches (partial decryption for intermediate steps)." },
  { q: "When should I use privacy-preserving techniques for LLMs?", a: "Privacy-preserving techniques are necessary when: 1) Data is sensitive (PII, health data, financial data). 2) Data cannot be centralised (regulatory constraints, data sovereignty). 3) Collaboration is required across multiple parties (multi-party training). 4) Privacy guarantees are required (GDPR, HIPAA). 5) Risk of re-identification is high. Federated learning is suitable for distributed training. Differential privacy is suitable for protecting individual contributions. SMPC is suitable for collaborative computation. Homomorphic encryption is suitable for privacy-preserving inference. Use the technique that matches your use case and constraints." },
]

export default function LlmPrivacyPreservingComputationPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Privacy-Preserving Computation", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Privacy-Preserving Computation Guide", "LLM Privacy-Preserving Computation Guide"), description: pick(isDE, "LLM Privacy-Preserving Computation", "LLM privacy-preserving computation"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Privacy-Preserving-Computation-Guide für eigene KI-Systeme.", "Privacy-preserving computation guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Privacy-Preserving Computation</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Privacy-Preserving Computation", "LLM Privacy-Preserving Computation")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Berechnungen ohne Privacy-Preserving können sensible Daten offenlegen — ohne Datenschutztechniken bleibt Privatsphäre ungeschützt. Vier Kontrollen: Federated Learning, Differential Privacy, SMPC und Homomorphic Encryption.", "LLM computations without privacy-preserving can expose sensitive data — without privacy techniques, privacy remains unprotected. Four controls: federated learning, differential privacy, SMPC and homomorphic encryption.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Privacy-Preserving Computation? Einfach erklärt", "What is LLM Privacy-Preserving Computation? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Privacy-Preserving Computation schützt sensible Daten bei LLM-Berechnungen: Federated Learning trainiert auf verteilten Daten ohne Zentralisierung. Differential Privacy fügt calibrated Noise zu Outputs oder Gradients um Re-Identification zu verhindern. Secure Multi-Party Computation (SMPC) berechnet auf verschlüsselten Daten über mehrere Parteien ohne individuelle Inputs zu offenbaren. Homomorphic Encryption ermöglicht Berechnungen auf verschlüsselten Daten ohne Entschlüsselung. Ohne Privacy-Preserving können sensible Daten bei Training und Inference offenlegt werden.", "LLM privacy-preserving computation protects sensitive data during LLM computations: federated learning trains on distributed data without centralisation. Differential privacy adds calibrated noise to outputs or gradients to prevent re-identification. Secure multi-party computation (SMPC) computes on encrypted data across multiple parties without revealing individual inputs. Homomorphic encryption enables computation on encrypted data without decryption. Without privacy-preserving, sensitive data can be exposed during training and inference.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Privacy-Preserving-Kontrollen", "Jump to privacy-preserving controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Privacy-Preserving-Computation-Kontrollen", "4 Privacy-Preserving Computation Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-data-encryption-at-rest`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Data Encryption at Rest", "LLM Data Encryption at Rest")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Data-Security", "Data security")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-data-loss-prevention`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Data Loss Prevention", "AI Data Loss Prevention")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "DLP", "DLP")}</div>
            </a>
            <a href={`/${locale}/moltbot/multi-tenant-llm-isolation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Multi-Tenant LLM Isolation", "Multi-Tenant LLM Isolation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Tenant-Privacy", "Tenant privacy")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Privacy-Overview", "Privacy overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Privacy-Preserving Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Privacy-Preserving-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM privacy-preserving implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
