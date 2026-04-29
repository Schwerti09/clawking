import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-federated-inference"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Federated Inference: LLM-Federated-Inference | ClawGuru Moltbot", "LLM Federated Inference: LLM Federated Inference | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Federated-Inference: Distributed Inference, Model Sharding, Inference Aggregation und Privacy-Preserving Inference für LLM-Federated-Inference.", "LLM federated inference: distributed inference, model sharding, inference aggregation and privacy-preserving inference for LLM federated inference.")
  return {
    title, description,
    keywords: ["llm federated inference", "distributed inference", "model sharding", "inference aggregation", "privacy preserving", "moltbot federated"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "FI-1", title: "Distributed Inference", desc: "Distribute LLM inference across multiple devices or servers. Use model parallelism and data parallelism for scalability.", code: `# Moltbot distributed inference:
distributed_inference:
  enabled: true

  # Model parallelism:
  model_parallelism:
    enabled: true
    # Split: model across devices
    # Layers: distribute layers across GPUs
    # Communication: gradient synchronization
    # Framework: PyTorch, TensorFlow

  # Data parallelism:
  data_parallelism:
    enabled: true
    # Replicate: model across devices
    # Batch: split batch across devices
    # Aggregate: gradients across devices
    # Framework: PyTorch DDP, TensorFlow MirroredStrategy

  # Pipeline parallelism:
  pipeline_parallelism:
    enabled: true
    # Split: model into pipeline stages
    # Stages: each stage on different device
    # Communication: intermediate activations
    # Benefit: memory efficiency` },
  { id: "FI-2", title: "Model Sharding", desc: "Shard LLM models across multiple devices for memory efficiency. Use tensor sharding and pipeline sharding.", code: `# Moltbot model sharding:
model_sharding:
  enabled: true

  # Tensor sharding:
  tensor_sharding:
    enabled: true
    # Split: tensor across devices
    # Method: ZeRO, FSDP
    # Memory: reduces memory per device
    # Communication: all-to-all

  # Pipeline sharding:
  pipeline_sharding:
    enabled: true
    # Split: model into pipeline stages
    # Stages: each stage on different device
    # Benefit: memory efficiency
    # Latency: pipeline parallelism

  # Hybrid sharding:
  hybrid_sharding:
    enabled: true
    # Combine: tensor + pipeline sharding
    # Benefit: memory + compute efficiency
    # Complexity: higher implementation complexity` },
  { id: "FI-3", title: "Inference Aggregation", desc: "Aggregate inference results from multiple models or devices. Use ensemble methods and voting.", code: `# Moltbot inference aggregation:
inference_aggregation:
  enabled: true

  # Ensemble methods:
  ensemble:
    enabled: true
    # Methods: bagging, boosting, stacking
    # Benefit: improved accuracy
    # Cost: increased inference time

  # Voting:
  voting:
    enabled: true
    # Methods: majority voting, weighted voting
    # Use: for classification tasks
    # Benefit: robustness to individual errors

  # Averaging:
  averaging:
    enabled: true
    # Methods: simple averaging, weighted averaging
    # Use: for regression tasks
    # Benefit: reduced variance` },
  { id: "FI-4", title: "Privacy-Preserving Inference", desc: "Perform inference on encrypted data without decryption. Use homomorphic encryption or secure multi-party computation.", code: `# Moltbot privacy-preserving inference:
privacy_preserving:
  enabled: true

  # Homomorphic encryption:
  homomorphic_encryption:
    enabled: true
    # Encrypt: input data before inference
    # Compute: on encrypted data
    # Decrypt: only output
    # Use: FHE or PHE

  # Secure multi-party computation:
  smpc:
    enabled: true
    # Split: input data across parties
    # Compute: without revealing inputs
    # Reveal: only final output
    # Use: for collaborative inference

  # Trusted execution:
  tee:
    enabled: true
    # Use: TEE for secure inference
    # Providers: AWS Nitro, Azure Confidential Computing
    # Benefit: hardware-based isolation` },
]

const FAQ = [
  { q: "What is the difference between model parallelism and data parallelism?", a: "Model parallelism splits the model across devices. Each device holds a portion of the model, and the input is processed sequentially across devices. Data parallelism replicates the entire model across devices, and the input batch is split across devices. Model parallelism is useful for large models that don't fit on a single device. Data parallelism is useful for scaling throughput with larger batches. Pipeline parallelism combines both by splitting the model into stages across devices." },
  { q: "How does tensor sharding reduce memory usage?", a: "Tensor sharding (e.g., ZeRO, FSDP) splits tensors across devices. Instead of each device holding a full copy of the model parameters, each device holds a shard. During computation, shards are gathered as needed. This reduces memory per device, allowing larger models to be trained or inferred on fewer devices. The trade-off is increased communication overhead for gathering and scattering shards." },
  { q: "How does ensemble inference improve accuracy?", a: "Ensemble inference combines predictions from multiple models. By aggregating diverse models (different architectures, training data, hyperparameters), ensemble methods reduce variance and bias. Common aggregation methods: majority voting (classification), averaging (regression), stacking (learned meta-model). The benefit is improved accuracy, but the cost is increased inference time and resource consumption." },
  { q: "What are the trade-offs of privacy-preserving inference?", a: "Privacy-preserving inference (homomorphic encryption, SMPC, TEE) provides strong privacy guarantees but has significant trade-offs: 1) Performance — homomorphic encryption is 100-1000x slower than plaintext computation. 2) Complexity — SMPC requires coordination across parties. 3) Cost — TEE requires specialised hardware. 4) Compatibility — not all operations are supported in encrypted domain. 5) Latency — communication overhead in SMPC. Choose the technique that matches your privacy and performance requirements." },
]

export default function LlmFederatedInferencePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Federated Inference", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Federated Inference Guide", "LLM Federated Inference Guide"), description: pick(isDE, "LLM Federated-Inference-Sicherheit", "LLM federated inference security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Federated-Inference-Guide für eigene KI-Systeme.", "Federated inference guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Federated Inference</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Federated Inference", "LLM Federated Inference")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Federated-Inference sind skaliert und ungeschützt — ohne Federated-Inference bleibt Inference zentralisiert. Vier Kontrollen: Distributed Inference, Model Sharding, Inference Aggregation und Privacy-Preserving Inference.", "LLM models without federated inference are centralised and unprotected — without federated inference, inference remains centralised. Four controls: distributed inference, model sharding, inference aggregation and privacy-preserving inference.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Federated Inference? Einfach erklärt", "What is LLM Federated Inference? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Federated Inference ist wie ein verteiltes Super-Team für KI: Distributed Inference verteilt Inference über mehrere Geräte mit Model- und Data-Parallelism. Model Sharding splittet große Modelle über mehrere GPUs mit Tensor- und Pipeline-Sharding. Inference Aggregation kombiniert Ergebnisse aus mehreren Modellen mit Ensemble-Methoden und Voting. Privacy-Preserving Inference führt Berechnungen auf verschlüsselten Daten durch mit Homomorpher Verschlüsselung oder SMPC. Ohne Security können Angreifer zentralisierte Inference kompromittieren, Daten leaken oder Privacy-Verletzungen durchführen.", "LLM federated inference is like a distributed super-team for AI: distributed inference distributes inference across multiple devices with model and data parallelism. Model sharding splits large models across multiple GPUs with tensor and pipeline sharding. Inference aggregation combines results from multiple models with ensemble methods and voting. Privacy-preserving inference performs computations on encrypted data with homomorphic encryption or SMPC. Without security, attackers can compromise centralised inference, leak data, or conduct privacy violations.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Federated-Inference-Kontrollen", "Jump to federated inference controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Federated-Inference-Kontrollen", "4 Federated Inference Controls")}</h2>
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
            <a href={`/${locale}/moltbot/ai-agent-federated-learning`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Federated Learning", "AI Agent Federated Learning")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Federated-Learning", "Federated learning")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-privacy-preserving-computation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Privacy-Preserving Computation", "LLM Privacy-Preserving Computation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Privacy-Techniques", "Privacy techniques")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-secure-inference`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Secure Inference", "LLM Secure Inference")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Secure-Execution", "Secure execution")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Federated-Overview", "Federated overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Federated Inference Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Federated Inference-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM federated inference implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
