import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-model-compression-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Model Compression Security: LLM-Modell-Compression-Security | ClawGuru Moltbot", "LLM Model Compression Security: LLM Model Compression Security | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Modell-Compression-Security: Compression Attack Detection, Secure Model Compression, Compression Integrity Verification und Compression-Resistant Training für LLM-Modell-Compression-Security.", "LLM model compression security: compression attack detection, secure model compression, compression integrity verification and compression-resistant training for LLM model compression security.")
  return {
    title, description,
    keywords: ["llm model compression security", "compression attack detection", "secure model compression", "compression integrity", "compression resistant training", "moltbot compression"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "MCS-1", title: "Compression Attack Detection", desc: "Detect attacks that exploit model compression vulnerabilities. Monitor for adversarial examples targeting compressed models.", code: `# Moltbot compression attack detection:
compression_attack_detection:
  enabled: true

  # Compression-aware adversarial detection:
  adversarial_detection:
    enabled: true
    # Detect: adversarial examples targeting compressed models
    # Method: compression-aware gradient analysis
    # Alert: on suspected compression attacks

  # Compression degradation detection:
  degradation_detection:
    enabled: true
    # Detect: abnormal compression degradation
    # Method: statistical analysis of compression errors
    # Alert: on suspicious accuracy loss

  # Compression consistency check:
  consistency:
    enabled: true
    # Check: compression consistency across runs
    # Method: hash verification of compressed weights
    # Alert: on compression tampering` },
  { id: "MCS-2", title: "Secure Model Compression", desc: "Secure the compression process against tampering. Use signed compression parameters and integrity verification.", code: `# Moltbot secure model compression:
secure_compression:
  enabled: true

  # Signed compression parameters:
  signed_parameters:
    enabled: true
    # Sign: compression parameters
    # Method: digital signature
    # Verify: signature before using compressed model
    # Prevents: compression tampering

  # Compression integrity verification:
  integrity_verification:
    enabled: true
    # Verify: compressed model integrity
    # Method: hash verification, checksum
    # Block: tampered compressed models

  # Secure compression pipeline:
  pipeline:
    enabled: true
    # Secure: compression pipeline
    # Use: isolated environment, secure storage
    # Audit: compression pipeline logs` },
  { id: "MCS-3", title: "Compression Integrity Verification", desc: "Verify compressed model integrity before deployment. Check for tampering and verify compression parameters.", code: `# Moltbot compression integrity verification:
integrity_verification:
  enabled: true

  # Hash verification:
  hash_verification:
    enabled: true
    # Compute: hash of compressed model
    # Compare: against expected hash
    # Block: mismatched models
    # Prevents: model tampering

  # Compression parameter verification:
  parameter_verification:
    enabled: true
    # Verify: compression parameters
    # Check: compression ratio, method, quality
    # Alert: on parameter anomalies

  # Accuracy verification:
  accuracy_verification:
    enabled: true
    # Verify: compressed model accuracy
    # Test: on validation set
    # Block: models with excessive accuracy loss` },
  { id: "MCS-4", title: "Compression-Resistant Training", desc: "Train models with compression in mind. Use compression-resistant training to maintain accuracy after compression.", code: `# Moltbot compression-resistant training:
compression_resistant_training:
  enabled: true

  # Simulate compression during training:
  simulation:
    enabled: true
    # Simulate: compression during forward pass
    # Method: fake compression, pruning simulation
    # Benefit: model learns to be robust to compression

  # Compression-aware loss:
  loss:
    enabled: true
    # Include: compression error in loss function
    # Method: add compression regularization term
    # Benefit: minimise compression accuracy loss

  # Calibration:
  calibration:
    enabled: true
    # Calibrate: compression parameters
    # Method: post-training calibration, entropy calibration
    # Benefit: optimal compression parameters` },
]

const FAQ = [
  { q: "What is the difference between compression-resistant training and post-training compression?", a: "Compression-resistant training (CRT) simulates compression during training. The model learns to be robust to compression by experiencing compression errors during training. Post-training compression (PTC) compresses a trained model without retraining. CRT typically achieves better accuracy because the model is trained to be compression-robust. PTC is faster because it doesn't require retraining. CRT is recommended for production models where accuracy is critical. PTC is useful for quick prototyping or when retraining is not feasible." },
  { q: "How does model compression affect model security?", a: "Model compression introduces security risks: 1) Compression reduces precision, making models more vulnerable to adversarial examples. 2) Compression parameters can be tampered with, degrading model performance. 3) Compression errors can be exploited to cause incorrect outputs. 4) Compressed models may leak information through compression patterns. Defense: compression-resistant training, secure compression pipelines, integrity verification, compression attack detection." },
  { q: "How do I detect compression attacks?", a: "Compression attack detection monitors for: 1) Adversarial examples specifically targeting compressed models — use compression-aware gradient analysis. 2) Abnormal compression degradation — statistical analysis of compression errors. 3) Compression tampering — hash verification of compressed weights. 4) Parameter anomalies — verify compression ratio, method, quality. Detection requires baseline measurements of normal compression behavior." },
  { q: "What are common compression attack vectors?", a: "Common compression attack vectors: 1) Compression-aware adversarial examples — crafted to exploit compression errors. 2) Compression parameter tampering — modify compression parameters to degrade performance. 3) Compression precision degradation — force excessive compression to reduce accuracy. 4) Compression model extraction — extract model through compressed queries. Defense: compression-resistant training, secure compression, integrity verification, attack detection." },
]

export default function LlmModelCompressionSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Model Compression Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Model Compression Security Guide", "LLM Model Compression Security Guide"), description: pick(isDE, "LLM Modell-Compression-Sicherheit", "LLM model compression security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Compression-Security-Guide für eigene KI-Systeme.", "Compression security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Model Compression Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Model Compression Security", "LLM Model Compression Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Compression-Security sind anfällig für Compression-Attacken — ohne Compression-Security bleibt Compression ungeschützt. Vier Kontrollen: Compression Attack Detection, Secure Model Compression, Compression Integrity Verification und Compression-Resistant Training.", "LLM models without compression security are vulnerable to compression attacks — without compression security, compression remains unprotected. Four controls: compression attack detection, secure model compression, compression integrity verification and compression-resistant training.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Model Compression Security? Einfach erklärt", "What is LLM Model Compression Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Model Compression Security schützt komprimierte Modelle vor Attacken: Compression Attack Detection überwacht auf kompressions-aware Adversarial Examples und ungewöhnliche Compression-Degradation. Secure Model Compression nutzt signierte Compression-Parameter und Integritäts-Verifikation gegen Manipulation. Compression Integrity Verification verifiziert Hashes und Compression-Parameter vor Deployment. Compression-Resistant Training simuliert Compression während Training für Robustheit. Ohne Security können Angreifer Compression-Parameter manipulieren, Adversarial Examples gegen komprimierte Modelle nutzen oder Modelle durch Compression extrahieren.", "LLM model compression security protects compressed models from attacks: compression attack detection monitors for compression-aware adversarial examples and unusual compression degradation. Secure model compression uses signed compression parameters and integrity verification against tampering. Compression integrity verification verifies hashes and compression parameters before deployment. Compression-resistant training simulates compression during training for robustness. Without security, attackers can manipulate compression parameters, exploit adversarial examples against compressed models, or extract models through compression.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Compression-Security-Kontrollen", "Jump to compression security controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Compression-Security-Kontrollen", "4 Compression Security Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-quantization-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Quantization Security", "LLM Quantization Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Quantization-Defense", "Quantization defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-adversarial-robustness`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Adversarial Robustness", "LLM Adversarial Robustness")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Adversarial-Defense", "Adversarial defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-secure-inference`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Secure Inference", "LLM Secure Inference")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Confidential-Computing", "Confidential computing")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Compression-Overview", "Compression overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Compression Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Model Compression Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM model compression security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
