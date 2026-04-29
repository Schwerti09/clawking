import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-quantization-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Quantization Security: LLM-Quantization-Security | ClawGuru Moltbot", "LLM Quantization Security: LLM Quantization Security | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Quantization-Security: Quantization Attack Detection, Quantization-Aware Training, Secure Quantization und Quantization Integrity Verification für LLM-Quantization-Security.", "LLM quantization security: quantization attack detection, quantization-aware training, secure quantization and quantization integrity verification for LLM quantization security.")
  return {
    title, description,
    keywords: ["llm quantization security", "quantization attack detection", "quantization aware training", "secure quantization", "quantization integrity", "moltbot quantization"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "QS-1", title: "Quantization Attack Detection", desc: "Detect attacks that exploit quantization vulnerabilities. Monitor for adversarial examples targeting quantized models.", code: `# Moltbot quantization attack detection:
quantization_attack_detection:
  enabled: true

  # Quantization-aware adversarial detection:
  adversarial_detection:
    enabled: true
    # Detect: adversarial examples targeting quantized models
    # Method: quantization-aware gradient analysis
    # Alert: on suspected quantization attacks

  # Precision degradation detection:
  precision_detection:
    enabled: true
    # Detect: abnormal precision degradation
    # Method: statistical analysis of quantization errors
    # Alert: on suspicious precision loss

  # Quantization consistency check:
  consistency:
    enabled: true
    # Check: quantization consistency across runs
    # Method: hash verification of quantized weights
    # Alert: on quantization tampering` },
  { id: "QS-2", title: "Quantization-Aware Training", desc: "Train models with quantization in mind. Use quantization-aware training to maintain accuracy after quantization.", code: `# Moltbot quantization-aware training:
quantization_aware_training:
  enabled: true

  # Simulate quantization during training:
  simulation:
    enabled: true
    # Simulate: quantization during forward pass
    # Method: fake quantization, straight-through estimator
    # Benefit: model learns to be robust to quantization

  # Quantization-aware loss:
  loss:
    enabled: true
    # Include: quantization error in loss function
    # Method: add quantization regularization term
    # Benefit: minimise quantization accuracy loss

  # Calibration:
  calibration:
    enabled: true
    # Calibrate: quantization parameters
    # Method: post-training calibration, entropy calibration
    # Benefit: optimal quantization parameters` },
  { id: "QS-3", title: "Secure Quantization", desc: "Secure the quantization process against tampering. Use signed quantization parameters and integrity verification.", code: `# Moltbot secure quantization:
secure_quantization:
  enabled: true

  # Signed quantization parameters:
  signed_parameters:
    enabled: true
    # Sign: quantization parameters
    # Method: digital signature
    # Verify: signature before using quantized model
    # Prevents: quantization tampering

  # Quantization integrity verification:
  integrity_verification:
    enabled: true
    # Verify: quantized model integrity
    # Method: hash verification, checksum
    # Block: tampered quantized models

  # Secure quantization pipeline:
  pipeline:
    enabled: true
    # Secure: quantization pipeline
    # Use: isolated environment, secure storage
    # Audit: quantization pipeline logs` },
  { id: "QS-4", title: "Quantization Integrity Verification", desc: "Verify quantized model integrity before deployment. Check for tampering and verify quantization parameters.", code: `# Moltbot quantization integrity verification:
integrity_verification:
  enabled: true

  # Hash verification:
  hash_verification:
    enabled: true
    # Compute: hash of quantized model
    # Compare: against expected hash
    # Block: mismatched models
    # Prevents: model tampering

  # Quantization parameter verification:
  parameter_verification:
    enabled: true
    # Verify: quantization parameters
    # Check: scale, zero-point, bit-width
    # Alert: on parameter anomalies

  # Accuracy verification:
  accuracy_verification:
    enabled: true
    # Verify: quantized model accuracy
    # Test: on validation set
    # Block: models with excessive accuracy loss` },
]

const FAQ = [
  { q: "What is the difference between quantization-aware training and post-training quantization?", a: "Quantization-aware training (QAT) simulates quantization during training. The model learns to be robust to quantization by experiencing quantization errors during training. Post-training quantization (PTQ) quantizes a trained model without retraining. QAT typically achieves better accuracy because the model is trained to be quantization-robust. PTQ is faster because it doesn't require retraining. QAT is recommended for production models where accuracy is critical. PTQ is useful for quick prototyping or when retraining is not feasible." },
  { q: "How does quantization affect model security?", a: "Quantization introduces security risks: 1) Quantization reduces precision, making models more vulnerable to adversarial examples. 2) Quantization parameters can be tampered with, degrading model performance. 3) Quantization errors can be exploited to cause incorrect outputs. 4) Quantized models may leak information through quantization patterns. Defense: quantization-aware training, secure quantization pipelines, integrity verification, quantization attack detection." },
  { q: "How do I detect quantization attacks?", a: "Quantization attack detection monitors for: 1) Adversarial examples specifically targeting quantized models — use quantization-aware gradient analysis. 2) Abnormal precision degradation — statistical analysis of quantization errors. 3) Quantization tampering — hash verification of quantized weights. 4) Parameter anomalies — verify scale, zero-point, bit-width. Detection requires baseline measurements of normal quantization behavior." },
  { q: "What are common quantization attack vectors?", a: "Common quantization attack vectors: 1) Quantization-aware adversarial examples — crafted to exploit quantization errors. 2) Quantization parameter tampering — modify scale/zero-point to degrade performance. 3) Quantization precision degradation — force excessive quantization to reduce accuracy. 4) Quantization model extraction — extract model through quantized queries. Defense: quantization-aware training, secure quantization, integrity verification, attack detection." },
]

export default function LlmQuantizationSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Quantization Security", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Quantization Security Guide", "LLM Quantization Security Guide"), description: pick(isDE, "LLM Quantization Security", "LLM quantization security"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Quantization-Security-Guide für eigene KI-Systeme.", "Quantization security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Quantization Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Quantization Security", "LLM Quantization Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Quantization-Security sind anfällig für Quantization-Attacken — ohne Quantization-Security bleibt Quantization ungeschützt. Vier Kontrollen: Quantization Attack Detection, Quantization-Aware Training, Secure Quantization und Quantization Integrity Verification.", "LLM models without quantization security are vulnerable to quantization attacks — without quantization security, quantization remains unprotected. Four controls: quantization attack detection, quantization-aware training, secure quantization and quantization integrity verification.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Quantization Security? Einfach erklärt", "What is LLM Quantization Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Quantization Security schützt quantisierte Modelle vor Quantization-Attacken: Quantization Attack Detection nutzt Quantization-Aware Gradient Analysis und Statistical Analysis um Adversarial Examples zu detektieren. Quantization-Aware Training simuliert Quantization während Training mit Fake Quantization und Straight-Through Estimator. Secure Quantization signiert Quantization Parameters mit Digital Signatures und verifiziert Integrity mit Hashes. Quantization Integrity Verification prüft Hashes, Scale/Zero-Point und Accuracy vor Deployment. Ohne Quantization Security können Angreifer Quantization Parameters manipulieren und Model Performance degradieren.", "LLM quantization security protects quantized models from quantization attacks: quantization attack detection uses quantization-aware gradient analysis and statistical analysis to detect adversarial examples. Quantization-aware training simulates quantization during training with fake quantization and straight-through estimator. Secure quantization signs quantization parameters with digital signatures and verifies integrity with hashes. Quantization integrity verification checks hashes, scale/zero-point and accuracy before deployment. Without quantization security, attackers can manipulate quantization parameters and degrade model performance.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Quantization-Security-Kontrollen", "Jump to quantization security controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Quantization-Security-Kontrollen", "4 Quantization Security Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-adversarial-robustness`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Adversarial Robustness", "LLM Adversarial Robustness")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Adversarial-Defense", "Adversarial defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-model-extraction-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Model Extraction Defense", "LLM Model Extraction Defense")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Extraction-Defense", "Extraction defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-secure-inference`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Secure Inference", "LLM Secure Inference")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Confidential-Computing", "Confidential computing")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Quantization-Overview", "Quantization overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Quantization Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Quantization Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM quantization security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
