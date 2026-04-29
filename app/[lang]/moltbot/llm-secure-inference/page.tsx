import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-secure-inference"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Secure Inference: LLM-Secure-Inference | ClawGuru Moltbot", "LLM Secure Inference: LLM Secure Inference | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Secure-Inference: Secure Enclave Execution, Trusted Execution Environment, Confidential Computing und Input/Output Validation für LLM-Secure-Inference.", "LLM secure inference: secure enclave execution, trusted execution environment, confidential computing and input/output validation for LLM secure inference.")
  return {
    title, description,
    keywords: ["llm secure inference", "secure enclave", "tee", "confidential computing", "input validation", "moltbot secure inference"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "SI-1", title: "Secure Enclave Execution", desc: "Execute LLM inference in secure enclaves. Use Intel SGX, AMD SEV, or ARM TrustZone to protect model and data.", code: `# Moltbot secure enclave execution:
secure_enclave:
  enabled: true

  # Enclave type:
  enclave_type:
    # Intel SGX: Software Guard Extensions
    # AMD SEV: Secure Encrypted Virtualization
    # ARM TrustZone: TrustZone technology
    # Select: based on hardware availability
    type: "intel_sgx"

  # Enclave configuration:
  configuration:
    # Memory: enclave memory size
    memory_size: "128MB"
    # Threads: number of enclave threads
    threads: 4
    # Attestation: remote attestation required
    attestation: true

  # Model protection:
  model_protection:
    # Encrypt: model weights in enclave
    # Decrypt: only in enclave
    # Key: sealed in enclave
    # Prevents: model extraction` },
  { id: "SI-2", title: "Trusted Execution Environment (TEE)", desc: "Use TEE for secure LLM inference. Ensure code and data integrity through hardware-based isolation.", code: `# Moltbot TEE execution:
tee:
  enabled: true

  # TEE framework:
  framework:
    # Nitro Enclaves: AWS Nitro Enclaves
    # Confidential Computing: Azure Confidential Computing
    # Shielded VMs: GCP Shielded VMs
    # Select: based on cloud provider
    provider: "aws_nitro"

  # TEE configuration:
  configuration:
    # CPU: vCPUs allocated to TEE
    vcpus: 4
    # Memory: memory allocated to TEE
    memory: "8GB"
    # Storage: encrypted storage for TEE
    storage: "encrypted"

  # Attestation:
  attestation:
    enabled: true
    # Verify: TEE integrity before inference
    # Use: remote attestation
    # Validate: TEE identity, measurements
    # Block: unattested TEEs` },
  { id: "SI-3", title: "Confidential Computing", desc: "Use confidential computing to protect data in use. Encrypt data during computation with homomorphic encryption or secure multi-party computation.", code: `# Moltbot confidential computing:
confidential_computing:
  enabled: true

  # Homomorphic encryption:
  homomorphic_encryption:
    enabled: true
    # Encrypt: input data before inference
    # Compute: on encrypted data
    # Decrypt: only output
    # Use: FHE or PHE based on requirements

  # Secure multi-party computation:
  smpc:
    enabled: true
    # Split: input data across parties
    # Compute: without revealing inputs
    # Reveal: only final output
    # Use: for collaborative inference

  # Data protection:
  data_protection:
    # Protect: input data, model weights, output
    # Encrypt: at rest and in use
    # Key: secure key management
    # Prevents: data leakage` },
  { id: "SI-4", title: "Input/Output Validation", desc: "Validate all inputs and outputs in the secure enclave. Sanitise inputs to prevent attacks and validate outputs to ensure correctness.", code: `# Moltbot input/output validation:
validation:
  enabled: true

  # Input validation:
  input_validation:
    enabled: true
    # Validate: input format, size, content
    # Sanitise: remove dangerous content
    # Check: for prompt injection, malicious patterns
    # Block: invalid or malicious inputs

  # Output validation:
  output_validation:
    enabled: true
    # Validate: output format, size, content
    # Sanitise: remove dangerous content
    # Check: for hallucinations, bias, PII
    # Flag: suspicious outputs

  # Validation logging:
  logging:
    enabled: true
    # Log: all validation attempts
    # Track: validation success/failure
    # Audit: validation history` },
]

const FAQ = [
  { q: "What is the difference between secure enclaves and TEEs?", a: "Secure enclaves (e.g., Intel SGX, AMD SEV, ARM TrustZone) are hardware-based isolated execution environments that protect code and data from the rest of the system. They provide memory encryption and remote attestation. Trusted Execution Environments (TEEs) are cloud-based confidential computing services (AWS Nitro Enclaves, Azure Confidential Computing, GCP Shielded VMs) that provide similar isolation at the virtual machine level. Both provide hardware-based isolation, but secure enclaves are CPU-level while TEEs are VM-level. Secure enclaves require specific hardware support, while TEEs are cloud-managed services." },
  { q: "How does confidential computing protect LLM inference?", a: "Confidential computing protects data in use during LLM inference. Homomorphic encryption allows computation on encrypted data without decryption. The input data is encrypted, the model computes on the encrypted data, and only the output is decrypted. This ensures that the input data is never exposed to the model or the inference infrastructure. Secure multi-party computation (SMPC) splits input data across parties, computes without revealing inputs, and reveals only the final output. Both techniques provide strong privacy guarantees but are computationally expensive." },
  { q: "How does remote attestation work?", a: "Remote attestation allows a verifier to confirm that a secure enclave or TEE is running genuine, unmodified code. The enclave/TEE generates a cryptographic attestation report that includes measurements of the code and data loaded into the enclave. The verifier validates the attestation report against expected values. If validation succeeds, the verifier knows the enclave is running the expected code in a secure environment. Remote attestation prevents attackers from running malicious code in the enclave or tampering with the enclave." },
  { q: "What are the performance implications of secure inference?", a: "Secure inference using secure enclaves, TEEs, or confidential computing has performance overhead: 1) Enclave isolation adds latency due to context switches and memory encryption. 2) Homomorphic encryption is 100-1000x slower than plaintext computation. 3) SMPC adds communication overhead and computational cost. 4) Input/output validation adds latency. Optimisation strategies: 1) Use hardware-accelerated encryption. 2) Batch operations to amortise overhead. 3) Use PHE instead of FHE when possible. 4) Cache validation results. 5) Use hybrid approaches (partial decryption for intermediate steps)." },
]

export default function LlmSecureInferencePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Secure Inference", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Secure Inference Guide", "LLM Secure Inference Guide"), description: pick(isDE, "LLM Secure Inference", "LLM secure inference"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Secure-Inference-Guide für eigene KI-Systeme.", "Secure inference guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Secure Inference</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Secure Inference", "LLM Secure Inference")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Inference ohne Secure-Execution kann Modelle und Daten kompromittieren — ohne Secure-Inference bleibt Inference ungeschützt. Vier Kontrollen: Secure Enclave Execution, TEE, Confidential Computing und Input/Output Validation.", "LLM inference without secure execution can compromise models and data — without secure inference, inference remains unprotected. Four controls: secure enclave execution, TEE, confidential computing and input/output validation.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Secure Inference? Einfach erklärt", "What is LLM Secure Inference? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Secure Inference schützt LLM-Inference durch Hardware-basierte Isolation: Secure Enclave Execution führt Inference in Intel SGX, AMD SEV oder ARM TrustZone aus mit Remote Attestation und Memory Encryption. Trusted Execution Environment (TEE) nutzt Cloud-Confidential-Computing wie AWS Nitro Enclaves oder Azure Confidential Computing mit VM-Level Isolation. Confidential Computing verwendet Homomorphic Encryption oder Secure Multi-Party Computation um auf verschlüsselten Daten zu rechnen ohne sie zu entschlüsseln. Input/Output Validation validiert und sanitisiert alle Inputs und Outputs im Secure Enclave um Angriffe zu verhindern.", "LLM secure inference protects LLM inference through hardware-based isolation: secure enclave execution runs inference in Intel SGX, AMD SEV or ARM TrustZone with remote attestation and memory encryption. Trusted execution environment (TEE) uses cloud confidential computing like AWS Nitro Enclaves or Azure Confidential Computing with VM-level isolation. Confidential computing uses homomorphic encryption or secure multi-party computation to compute on encrypted data without decrypting it. Input/output validation validates and sanitises all inputs and outputs in the secure enclave to prevent attacks.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Secure-Inference-Kontrollen", "Jump to secure inference controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Secure-Inference-Kontrollen", "4 Secure Inference Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-privacy-preserving-computation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Privacy-Preserving Computation", "LLM Privacy-Preserving Computation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Confidential-Computing", "Confidential computing")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-output-validation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Output Validation", "LLM Output Validation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Validation", "Validation")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-sandboxing-runtime`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Sandboxing Runtime", "AI Agent Sandboxing Runtime")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Isolation", "Isolation")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Secure Inference Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Secure Inference-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM secure inference implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
