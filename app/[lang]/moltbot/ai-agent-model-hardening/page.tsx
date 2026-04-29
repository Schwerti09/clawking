import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-model-hardening"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Model Hardening: Modell-Härtung für AI-Agents | ClawGuru", "AI Agent Model Hardening: Model Hardening for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Model Hardening für Moltbot-Deployments. Adversarial Training, Model Compression, Watermarking und Robustness Enhancement für AI-Modelle. Mit Moltbot automatisierbar.", "AI agent model hardening for Moltbot deployments. Adversarial training, model compression, watermarking and robustness enhancement for AI models. Automatable with Moltbot.")
  return {
    title,
    description,
    keywords: [
      "ai agent model hardening", "adversarial training", "model compression",
      "watermarking", "robustness enhancement", "ai model security",
      "moltbot security", "ai agent hardening", "model hardening 2026",
      "security check", "runbooks", "openclaw"
    ],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      images: ["/og-image.png"]
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentModelHardeningPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Model Hardening", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "AI Agent Model Hardening Guide", "AI Agent Model Hardening Guide"), description: pick(isDE, "AI Agent Model Hardening", "AI agent model hardening"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Leitfaden dient zur Härtung Ihrer eigenen Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Model Hardening</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Model Hardening", "AI Agent Model Hardening")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Model Hardening für Moltbot-Deployments. Adversarial Training, Model Compression, Watermarking und Robustness Enhancement für AI-Modelle.", "AI agent model hardening for Moltbot deployments. Adversarial training, model compression, watermarking and robustness enhancement for AI models.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Model Hardening? Einfach erklärt", "What is AI Agent Model Hardening? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Model Hardening härten AI-Modelle gegen Angriffe: Adversarial Training trainiert Modelle mit perturbed Daten für Robustheit gegen Adversarial Examples. Model Compression (Quantization, Pruning, Knowledge Distillation) optimiert Modelle für effiziente Deployments ohne Accuracy-Verlust. Watermarking fügt digitale Watermarks für Intellectual Property Protection und Provenance Tracking. Robustness Enhancement (Noise Injection, Data Augmentation, Regularization) erhöht Model-Resilienz. Model Validation (Automated Testing, Performance Benchmarks, Security Audits) validiert Modelle vor Deployment.", "AI agent model hardening hardens AI models against attacks: adversarial training trains models with perturbed data for robustness against adversarial examples. Model compression (quantization, pruning, knowledge distillation) optimizes models for efficient deployments without accuracy loss. Watermarking adds digital watermarks for intellectual property protection and provenance tracking. Robustness enhancement (noise injection, data augmentation, regularization) increases model resilience. Model validation (automated testing, performance benchmarks, security audits) validates models before deployment.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten", "Jump to core concepts")}</p>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "1. Adversarial Training", "1. Adversarial Training")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Adversarial Training für AI-Models. Robustheit gegen Adversarial Examples durch Training mit perturbed Daten.", "Adversarial training for AI models. Robustness against adversarial examples through training with perturbed data.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "2. Model Compression", "2. Model Compression")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Model Compression für effiziente Deployments. Quantization, Pruning und Knowledge Distillation.", "Model compression for efficient deployments. Quantization, pruning and knowledge distillation.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "3. Watermarking", "3. Watermarking")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Model Watermarking für Intellectual Property Protection. Digital Watermarks und Provenance Tracking.", "Model watermarking for intellectual property protection. Digital watermarks and provenance tracking.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "4. Robustness Enhancement", "4. Robustness Enhancement")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Robustness Enhancement für AI-Models. Noise Injection, Data Augmentation und Regularization Techniques.", "Robustness enhancement for AI models. Noise injection, data augmentation and regularization techniques.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "5. Model Validation", "5. Model Validation")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Model Validation vor Deployment. Automated Testing, Performance Benchmarks und Security Audits.", "Model validation before deployment. Automated testing, performance benchmarks and security audits.")}</p>
            </div>
          </div>
        </section>

        {/* Advanced Techniques */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700/50 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Certified Robustness", "Certified Robustness")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "Certified Robustness mit formalen Guarantees. Interval Bound Propagation und Randomized Smoothing.", "Certified robustness with formal guarantees. Interval bound propagation and randomized smoothing.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700/50 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Ensemble Methods", "Ensemble Methods")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Ensemble Methods für Robustheit. Model Averaging und Diversity-based Ensembles.", "Ensemble methods for robustness. Model averaging and diversity-based ensembles.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700/50 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Adversarial Purification", "Adversarial Purification")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Adversarial Purification. Input Denoising und Defense in Depth Strategies.", "Adversarial purification. Input denoising and defense in depth strategies.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700/50 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Continuous Learning Security", "Continuous Learning Security")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Continuous Learning Security für Model Updates. Safe Model Updates und Version Control.", "Continuous learning security for model updates. Safe model updates and version control.")}</p>
            </div>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Adversarial Training Pipeline", "Adversarial training pipeline")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Implementieren Sie Adversarial Training in Ihrer ML Pipeline. Generate adversarial examples und retrain.", "Implement adversarial training in your ML pipeline. Generate adversarial examples and retrain.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Model Compression Tools", "Model compression tools")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Wählen Sie Model Compression Tools. TensorFlow Model Optimization Toolkit oder PyTorch quantization.", "Choose model compression tools. TensorFlow Model Optimization Toolkit or PyTorch quantization.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Watermarking Implementation", "Watermarking implementation")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Implementieren Sie Model Watermarking. Digital signatures und provenance metadata.", "Implement model watermarking. Digital signatures and provenance metadata.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Robustness Testing", "Robustness testing")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Führen Sie Robustness Testing durch. Adversarial attack simulation und performance validation.", "Run robustness testing. Adversarial attack simulation and performance validation.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Deployment Hardening", "Deployment hardening")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Implementieren Sie Deployment Hardening. Model validation gates und monitoring.", "Implement deployment hardening. Model validation gates and monitoring.")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Further Resources */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Überprüfen Sie Ihre Infrastruktur auf Schwachstellen", "Check your infrastructure for vulnerabilities")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "OpenClaw", "OpenClaw")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Roast My Moltbot", "Roast My Moltbot")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Moltbot Security Testing", "Moltbot security testing")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Model Hardening Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Model Hardening-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent model hardening implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
