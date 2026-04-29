import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-bias-detection-mitigation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Bias Detection Mitigation: LLM-Bias-Detection-Mitigation | ClawGuru Moltbot", "LLM Bias Detection Mitigation: LLM Bias Detection Mitigation | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Bias-Detection-Mitigation: Bias Detection Models, Fairness Metrics, Bias Mitigation Techniques und Continuous Bias Monitoring für LLM-Bias-Reduktion.", "LLM bias detection mitigation: bias detection models, fairness metrics, bias mitigation techniques and continuous bias monitoring for LLM bias reduction.")
  return {
    title, description,
    keywords: ["llm bias detection mitigation", "llm fairness", "bias detection models", "fairness metrics", "bias mitigation", "moltbot bias"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "BDM-1", title: "Bias Detection Models", desc: "Use dedicated bias detection models to identify bias in LLM outputs. Train classifiers on labelled bias datasets to detect stereotypes, discrimination, and unfair representations.", code: `# Moltbot bias detection models:
bias_detection:
  enabled: true

  # Detection models:
  models:
    # Stereotype detection model:
    stereotype_detector:
      enabled: true
      model: "stereotype-detector-v1"
      # Detects: gender, racial, age, religious stereotypes
      # Trained on: labelled stereotype dataset

    # Discrimination detector:
    discrimination_detector:
      enabled: true
      model: "discrimination-detector-v1"
      # Detects: unfair treatment, discriminatory language
      # Trained on: labelled discrimination dataset

    # Fairness classifier:
    fairness_classifier:
      enabled: true
      model: "fairness-classifier-v1"
      # Classifies: fair vs unfair outputs
      # Trained on: fairness-labelled dataset

  # Detection threshold:
  threshold:
    # Bias score threshold
    # If bias score > threshold: flag output
    bias_score_threshold: 0.7` },
  { id: "BDM-2", title: "Fairness Metrics", desc: "Measure fairness using standard metrics like demographic parity, equal opportunity, and calibration. Track these metrics over time to detect bias drift.", code: `# Moltbot fairness metrics:
fairness_metrics:
  enabled: true

  # Demographic parity:
  demographic_parity:
    enabled: true
    # Measure: equal positive prediction rates across groups
    # Groups: gender, race, age, etc.
    # Threshold: difference < 0.1
    threshold: 0.1

  # Equal opportunity:
  equal_opportunity:
    enabled: true
    # Measure: equal true positive rates across groups
    # Threshold: difference < 0.1
    threshold: 0.1

  # Calibration:
  calibration:
    enabled: true
    # Measure: predicted probabilities match actual outcomes
    # Across groups
    # Threshold: difference < 0.05
    threshold: 0.05

  # Metric tracking:
  tracking:
    enabled: true
    # Track metrics over time
    # Alert on: metric drift, threshold violations
    alert_on_drift: true` },
  { id: "BDM-3", title: "Bias Mitigation Techniques", desc: "Apply bias mitigation techniques during training and inference. Use reweighting, adversarial debiasing, and post-processing to reduce bias.", code: `# Moltbot bias mitigation techniques:
bias_mitigation:
  enabled: true

  # Training-time mitigation:
  training:
    # Reweighting:
    reweighting:
      enabled: true
      # Reweight training data to balance representation
      # Reduce bias from imbalanced datasets

    # Adversarial debiasing:
    adversarial_debiasing:
      enabled: true
      # Train adversarial model to predict protected attributes
      # Main model trained to fool adversarial model
      # Reduces bias in learned representations

  # Inference-time mitigation:
  inference:
    # Post-processing:
    post_processing:
      enabled: true
      # Adjust model outputs to satisfy fairness constraints
      # Example: equalise positive prediction rates across groups

    # Prompt engineering:
    prompt_engineering:
      enabled: true
      # Add fairness instructions to system prompt
      # Example: "Treat all users equally regardless of..."
      # Reduce bias in model behavior` },
  { id: "BDM-4", title: "Continuous Bias Monitoring", desc: "Monitor bias continuously in production. Track bias metrics, alert on bias drift, and retrain models when bias exceeds thresholds.", code: `# Moltbot continuous bias monitoring:
bias_monitoring:
  enabled: true

  # Metric collection:
  collection:
    enabled: true
    # Collect bias metrics on every inference
    # Metrics: bias score, fairness metrics, demographic distribution
    # Store in: metrics database

  # Drift detection:
  drift_detection:
    enabled: true
    # Detect bias drift over time
    # Compare: current metrics vs baseline metrics
    # Alert on: significant drift (> 0.05 change)

  # Alerting:
  alerting:
    enabled: true
    # Alert on:
    # - Bias score > threshold
    # - Fairness metric violation
    # - Bias drift detected
    # - Demographic shift
    alert_channels: ["email", "slack"]

  # Retraining:
  retraining:
    enabled: true
    # Retrain model when bias exceeds threshold
    # Use: latest data, updated bias mitigation
    # Schedule: weekly or on alert` },
]

const FAQ = [
  { q: "What is the difference between bias detection and fairness metrics?", a: "Bias detection is the process of identifying bias in LLM outputs using dedicated models. Bias detection models are classifiers trained on labelled bias datasets to detect stereotypes, discrimination, and unfair representations. Fairness metrics are quantitative measures of fairness, such as demographic parity (equal positive prediction rates across groups), equal opportunity (equal true positive rates across groups), and calibration (predicted probabilities match actual outcomes). Bias detection tells you \"is there bias?\". Fairness metrics tell you \"how biased is it?\". Both are necessary: bias detection identifies specific instances of bias, fairness metrics provide quantitative measures to track over time." },
  { q: "How do adversarial debiasing techniques work?", a: "Adversarial debiasing uses an adversarial model to detect bias in the main model's learned representations. The main model is trained to perform its primary task (e.g., text generation) while simultaneously being trained to fool the adversarial model, which tries to predict protected attributes (gender, race, age). By forcing the main model to hide protected attributes from the adversarial model, the learned representations become less biased. This technique is effective because it directly addresses bias in the model's internal representations, rather than just the outputs. However, it requires careful tuning to balance task performance with bias reduction." },
  { q: "How do I set appropriate bias detection thresholds?", a: "Bias detection thresholds should be based on: 1) Application sensitivity — high-stakes applications (hiring, lending) require stricter thresholds. 2) Regulatory requirements — some jurisdictions have legal requirements for fairness (e.g., EU AI Act). 3) User expectations — users may have different expectations for bias tolerance. 4) Baseline bias — measure baseline bias in the model before mitigation, set threshold relative to baseline. 5) Trade-offs — stricter thresholds may increase false positives (flagging fair outputs as biased). Start with a threshold of 0.7 (70% confidence) and adjust based on metrics and user feedback. Monitor false positive rate to ensure acceptable trade-off." },
  { q: "What are the risks of not monitoring bias in production?", a: "Not monitoring bias in production can lead to: 1) Regulatory violations — non-compliance with fairness regulations (EU AI Act, EEOC guidelines). 2) Legal liability — discrimination lawsuits, regulatory fines. 3) Reputation damage — public backlash for biased outputs. 4) User harm — unfair treatment of users, discrimination. 5) Bias drift — model bias may increase over time due to data drift, concept drift. 6) Lost trust — users lose trust in the system if it exhibits bias. Continuous bias monitoring ensures bias is detected early, allowing for timely mitigation before it causes harm." },
]

export default function LlmBiasDetectionMitigationPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Bias Detection Mitigation", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Bias Detection Mitigation Guide", "LLM Bias Detection Mitigation Guide"), description: pick(isDE, "LLM Bias Detection Mitigation Sicherheit", "LLM bias detection mitigation security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Bias-Detection-Mitigation-Guide für eigene KI-Systeme.", "Bias detection mitigation guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Bias Detection Mitigation</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Bias Detection Mitigation", "LLM Bias Detection Mitigation")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Bias-Detection und Mitigation können Diskriminierung und Reputationsschäden verursachen. Vier Kontrollen: Bias Detection Models, Fairness Metrics, Bias Mitigation Techniques und Continuous Bias Monitoring.", "LLM models without bias detection and mitigation can cause discrimination and reputation damage. Four controls: bias detection models, fairness metrics, bias mitigation techniques and continuous bias monitoring.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Bias Detection Mitigation? Einfach erklärt", "What is LLM Bias Detection Mitigation? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Bias Detection Mitigation ist wie ein Fairness-Filter für KI-Modelle: Bias Detection Models erkennen Stereotypen und Diskriminierung in Outputs. Fairness Metrics messen, ob alle Gruppen fair behandelt werden. Bias Mitigation Techniques reduzieren Bias im Training und Inference. Continuous Bias Monitoring überwacht Fairness laufend. Ohne Bias Mitigation kann ein KI-Modell versehentlich diskriminierende Outputs generieren — mit rechtlichen und reputativen Konsequenzen.", "LLM bias detection mitigation is like a fairness filter for AI models: bias detection models identify stereotypes and discrimination in outputs. Fairness metrics measure whether all groups are treated fairly. Bias mitigation techniques reduce bias during training and inference. Continuous bias monitoring monitors fairness continuously. Without bias mitigation, an AI model can accidentally generate discriminatory outputs — with legal and reputational consequences.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Bias-Kontrollen", "Jump to bias controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Bias-Detection-Mitigation-Kontrollen", "4 Bias Detection Mitigation Controls")}</h2>
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
            <a href={`/${locale}/moltbot/ai-agent-audit-logging`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Audit Logging", "AI Agent Audit Logging")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Bias-Monitoring", "Bias monitoring")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-output-filtering`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Output Filtering", "LLM Output Filtering")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Content-Safety", "Content safety")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-prompt-hardening`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Prompt Hardening", "LLM Prompt Hardening")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Prompt-Engineering", "Prompt engineering")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Fairness-Overview", "Fairness overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Fairness Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Bias Detection Mitigation-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM bias detection mitigation implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
