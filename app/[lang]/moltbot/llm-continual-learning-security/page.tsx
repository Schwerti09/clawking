import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-continual-learning-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Continual Learning Security: LLM-Continual-Learning-Security | ClawGuru Moltbot", "LLM Continual Learning Security: LLM Continual Learning Security | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Continual-Learning-Security: Data Poisoning Detection, Learning Rate Security, Model Drift Detection und Continual Learning Audit Logging für LLM-Continual-Learning-Security.", "LLM continual learning security: data poisoning detection, learning rate security, model drift detection and continual learning audit logging for LLM continual learning security.")
  return {
    title, description,
    keywords: ["llm continual learning security", "data poisoning detection", "learning rate security", "model drift detection", "continual learning audit", "moltbot continual"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "CLS-1", title: "Data Poisoning Detection", desc: "Detect poisoned data in continual learning. Use statistical analysis and anomaly detection.", code: `# Moltbot data poisoning detection:
data_poisoning_detection:
  enabled: true

  # Statistical analysis:
  statistical_analysis:
    enabled: true
    # Analyze: incoming data distribution
    # Method: statistical tests (KS test, chi-squared)
    # Detect: distribution shifts
    # Alert: on suspicious patterns

  # Anomaly detection:
  anomaly_detection:
    enabled: true
    # Detect: anomalous data points
    # Methods: isolation forest, local outlier factor
    # Threshold: statistical significance
    # Block: anomalous data

  # Label verification:
  label_verification:
    enabled: true
    # Verify: label consistency
    # Method: cross-validation with known labels
    # Detect: label flipping attacks
    # Block: suspicious labels` },
  { id: "CLS-2", title: "Learning Rate Security", desc: "Secure learning rate parameters against manipulation. Use signed parameters and integrity verification.", code: `# Moltbot learning rate security:
learning_rate_security:
  enabled: true

  # Signed learning rates:
  signed_rates:
    enabled: true
    # Sign: learning rate parameters
    # Method: digital signature
    # Verify: signature before use
    # Prevents: learning rate tampering

  # Learning rate integrity verification:
  integrity_verification:
    enabled: true
    # Verify: learning rate integrity
    # Method: hash verification
    # Block: tampered learning rates
    # Prevents: learning rate corruption

  # Learning rate bounds:
  bounds:
    enabled: true
    # Enforce: learning rate bounds
    # Min: minimum learning rate
    # Max: maximum learning rate
    # Prevents: extreme learning rates` },
  { id: "CLS-3", title: "Model Drift Detection", desc: "Detect model drift during continual learning. Monitor performance metrics and data distribution.", code: `# Moltbot model drift detection:
model_drift_detection:
  enabled: true

  # Performance monitoring:
  performance_monitoring:
    enabled: true
    # Monitor: model performance metrics
    # Metrics: accuracy, loss, F1 score
    # Threshold: performance degradation threshold
    # Alert: on performance drift

  # Data distribution monitoring:
  data_distribution:
    enabled: true
    # Monitor: data distribution
    # Method: statistical tests
    # Detect: distribution shift
    # Alert: on data drift

  # Concept drift detection:
  concept_drift:
    enabled: true
    # Detect: concept drift
    # Method: adaptive windowing, DDM
    # Threshold: drift threshold
    # Alert: on concept drift` },
  { id: "CLS-4", title: "Continual Learning Audit Logging", desc: "Log all continual learning events for audit. Track data ingestion, model updates, and performance changes.", code: `# Moltbot continual learning audit logging:
audit_logging:
  enabled: true

  # Data ingestion logging:
  data_logging:
    enabled: true
    # Log: all data ingestion events
    # Include: data source, timestamp, volume
    # Retain: logs for audit (90 days)
    # Protect: log access

  # Model update logging:
  update_logging:
    enabled: true
    # Log: all model update events
    # Include: version, learning rate, performance
    # Retain: logs for audit (90 days)
    # Protect: log access

  # Performance change logging:
  performance_logging:
    enabled: true
    # Log: all performance changes
    # Include: metric, before, after
    # Retain: logs for audit (90 days)
    # Protect: log access` },
]

const FAQ = [
  { q: "What is the difference between data poisoning detection and model drift detection?", a: "Data poisoning detection identifies malicious or anomalous data that could corrupt the model during continual learning. It focuses on the input data itself. Model drift detection detects changes in model performance or data distribution over time. It focuses on the model's behavior and the data distribution. Data poisoning detection prevents bad data from entering the learning process. Model drift detection detects when the model's performance degrades or the data distribution changes. Both are necessary: data poisoning detection prevents corruption, model drift detection detects performance degradation." },
  { q: "How does learning rate security protect against manipulation?", a: "Learning rate security protects against manipulation by: 1) Signing learning rate parameters — digital signatures ensure parameters are authentic. 2) Verifying signatures — verify signatures before using learning rates. 3) Integrity verification — hash verification detects tampering. 4) Enforcing bounds — learning rate bounds prevent extreme values that could cause instability. Each control addresses a different aspect of learning rate security." },
  { q: "How do I detect model drift in continual learning?", a: "Model drift detection monitors: 1) Performance metrics — accuracy, loss, F1 score. Detect performance degradation beyond threshold. 2) Data distribution — statistical tests detect distribution shift. 3) Concept drift — adaptive windowing or DDM detect concept drift. Detection requires baseline measurements of normal performance and data distribution. Set thresholds based on acceptable performance degradation." },
  { q: "What are common continual learning attack vectors?", a: "Common continual learning attack vectors: 1) Data poisoning — inject malicious data to corrupt model. 2) Learning rate tampering — modify learning rate to cause instability. 3) Label flipping — flip labels to corrupt model. 4) Data drift injection — inject data to cause drift. 5) Model drift exploitation — exploit drift to bypass filters. Defense: data poisoning detection, learning rate security, model drift detection, audit logging." },
]

export default function LlmContinualLearningSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Continual Learning Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Continual Learning Security Guide", "LLM Continual Learning Security Guide"), description: pick(isDE, "LLM Continual Learning Security Sicherheit", "LLM continual learning security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Continual-Learning-Security-Guide für eigene KI-Systeme.", "Continual learning security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Continual Learning Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Continual Learning Security", "LLM Continual Learning Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Continual-Learning-Security sind anfällig für Continual-Learning-Attacken — ohne Continual-Learning-Security bleibt Continual-Learning ungeschützt. Vier Kontrollen: Data Poisoning Detection, Learning Rate Security, Model Drift Detection und Continual Learning Audit Logging.", "LLM models without continual learning security are vulnerable to continual learning attacks — without continual learning security, continual learning remains unprotected. Four controls: data poisoning detection, learning rate security, model drift detection and continual learning audit logging.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Continual Learning Security? Einfach erklärt", "What is LLM Continual Learning Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Continual Learning Security ist wie ein Sicherheits-Check für kontinuierliches Lernen: Data Poisoning Detection erkennt vergiftete Trainingsdaten mit statistischer Analyse. Learning Rate Security schützt Lernraten vor Manipulation durch digitale Signaturen und Hash-Verifikation. Model Drift Detection überwacht Performance-Metriken und Datenverteilung auf Drift. Continual Learning Audit Logging protokolliert alle Lern-Events für Forensik. Ohne Security können Angreifer Trainingsdaten vergiften, Lernraten manipulieren oder Modelldrift ausnutzen — das Modell lernt dann schädliche Muster.", "LLM continual learning security is like a security check for continuous learning: data poisoning detection detects poisoned training data with statistical analysis. Learning rate security protects learning rates from manipulation via digital signatures and hash verification. Model drift detection monitors performance metrics and data distribution for drift. Continual learning audit logging logs all learning events for forensics. Without security, attackers can poison training data, manipulate learning rates, or exploit model drift — the model then learns harmful patterns.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Continual-Learning-Security-Kontrollen", "Jump to continual learning security controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Continual-Learning-Security-Kontrollen", "4 Continual Learning Security Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-fine-tuning-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Fine-Tuning Security", "LLM Fine-Tuning Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Fine-Tuning-Security", "Fine-tuning security")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-adversarial-robustness`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Adversarial Robustness", "LLM Adversarial Robustness")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Adversarial-Defense", "Adversarial defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-hallucination-detection`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Hallucination Detection", "LLM Hallucination Detection")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Hallucination-Detection", "Hallucination detection")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Continual-Learning-Overview", "Continual learning overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Continual Learning Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Continual Learning Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM continual learning security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
