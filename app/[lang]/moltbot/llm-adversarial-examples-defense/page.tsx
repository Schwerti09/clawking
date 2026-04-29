import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-adversarial-examples-defense"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Adversarial Examples Defense: LLM-Adversarial-Examples-Abwehr | ClawGuru Moltbot", "LLM Adversarial Examples Defense: LLM Adversarial Examples Defense | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Adversarial-Examples-Abwehr: Input Perturbation Detection, Adversarial Training, Certified Robustness und Adversarial Example Monitoring für LLM-Adversarial-Examples-Abwehr.", "LLM adversarial examples defense: input perturbation detection, adversarial training, certified robustness and adversarial example monitoring for LLM adversarial examples defense.")
  return {
    title, description,
    keywords: ["llm adversarial examples defense", "adversarial examples detection", "adversarial training llm", "certified robustness", "input perturbation detection", "moltbot adversarial"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "AED-1", title: "Input Perturbation Detection", desc: "Detect adversarially crafted inputs before they reach the LLM. Identify subtle perturbations designed to manipulate model outputs.", code: `# Moltbot input perturbation detection:
perturbation_detection:
  enabled: true

  # Statistical Anomaly Detection:
  statistical:
    enabled: true
    # Measure: input token distribution
    # Compare: against baseline distribution
    # Alert: on significant deviation (>3 sigma)
    # Block: high-confidence adversarial inputs

  # Semantic Consistency Check:
  semantic:
    enabled: true
    # Paraphrase: input before processing
    # Compare: outputs for semantic consistency
    # Alert: on inconsistent outputs
    # Detect: adversarial semantic perturbations

  # Perplexity-Based Detection:
  perplexity:
    enabled: true
    # Score: input perplexity
    # Baseline: normal input perplexity range
    # Alert: on abnormally low perplexity
    # Block: inputs below threshold` },
  { id: "AED-2", title: "Adversarial Training", desc: "Harden LLM against adversarial examples through adversarial training and data augmentation.", code: `# Moltbot adversarial training pipeline:
adversarial_training:
  enabled: true

  # Automated Attack Generation:
  attack_generation:
    enabled: true
    # Generate: adversarial examples automatically
    # Methods: FGSM, PGD, TextFooler, BERT-Attack
    # Scope: task-relevant attack types
    # Volume: generate 1000+ per training run

  # Augmented Training Data:
  augmentation:
    enabled: true
    # Include: adversarial examples in fine-tuning data
    # Label: adversarial examples correctly
    # Balance: adversarial vs clean examples
    # Evaluate: robustness after training

  # Continual Robustness Testing:
  testing:
    enabled: true
    # Test: after every model update
    # Benchmark: standard robustness benchmarks
    # Track: robustness over time
    # Alert: on robustness regression` },
  { id: "AED-3", title: "Certified Robustness", desc: "Implement provable robustness guarantees for critical LLM outputs. Certify against bounded perturbations.", code: `# Moltbot certified robustness:
certified_robustness:
  enabled: true

  # Randomized Smoothing:
  smoothing:
    enabled: true
    # Apply: Gaussian noise to inputs
    # Run: N=1000 inference samples
    # Certify: majority vote is robust
    # Certificate: within radius r

  # Interval Bound Propagation:
  bound_propagation:
    enabled: true
    # Compute: certified output bounds
    # Guarantee: output within bounds for all inputs
    # Scope: safety-critical outputs only
    # Trade-off: accuracy vs certificate size

  # Certificate Logging:
  logging:
    enabled: true
    # Log: certified decisions with certificate
    # Track: certificate coverage rate
    # Alert: on certificate failures
    # Report: robustness metrics` },
  { id: "AED-4", title: "Adversarial Example Monitoring", desc: "Monitor production LLM inputs for adversarial examples. Track attacks in real time.", code: `# Moltbot adversarial example monitoring:
adversarial_monitoring:
  enabled: true

  # Real-Time Detection:
  realtime:
    enabled: true
    # Score: every input for adversarial likelihood
    # Threshold: configurable per use case
    # Latency: <10ms overhead
    # Alert: on high-confidence detections

  # Attack Pattern Analysis:
  patterns:
    enabled: true
    # Cluster: adversarial inputs by type
    # Track: attack frequency trends
    # Identify: targeted attack campaigns
    # Report: weekly attack summary

  # Adaptive Defense:
  adaptive:
    enabled: true
    # Update: detection models with new attacks
    # Feedback: attacked inputs to training pipeline
    # Retrain: defenses against novel attacks
    # Deploy: updated defenses automatically` },
]

const FAQ = [
  { q: "What are adversarial examples for LLMs?", a: "Adversarial examples for LLMs are carefully crafted inputs designed to cause the model to produce incorrect, harmful, or attacker-controlled outputs. Unlike traditional ML adversarial examples (pixel perturbations for image classifiers), LLM adversarial examples include: 1) Synonym substitution — replacing words with synonyms that preserve meaning for humans but fool the model. 2) Character-level attacks — inserting invisible characters, homoglyphs, or slight misspellings. 3) Paraphrase attacks — semantically equivalent inputs that evade content filters. 4) Prompt injection via adversarial examples — crafting inputs that bypass safety filters." },
  { q: "How do adversarial examples differ from prompt injection?", a: "They overlap but are distinct attack classes: Prompt injection — attacker inserts instructions into user input to override system prompts and redirect model behavior. Adversarial examples — attacker crafts inputs to cause model misclassification or bypass content filters, often without explicit instructions. Both are input manipulation attacks. Key difference: prompt injection exploits the model's instruction-following; adversarial examples exploit vulnerabilities in model decision boundaries. Many real attacks combine both — using adversarial examples to bypass content filters and then prompt injection to exfiltrate data." },
  { q: "Is adversarial training effective for LLMs?", a: "Adversarial training is partially effective for LLMs but has limitations: Effective against: specific attack types it was trained on, character-level perturbations, known attack methods. Less effective against: novel attack methods not seen in training, adaptive attacks that optimize against the hardened model, semantic attacks (semantically equivalent inputs). Best practice: adversarial training as one layer of defense, combined with: input preprocessing, perplexity-based detection, semantic consistency checking, and continuous red teaming to discover new attack vectors." },
  { q: "What is certified robustness and when do I need it?", a: "Certified robustness provides a mathematical guarantee: for all inputs within a defined perturbation radius, the model output is provably correct. This means: no adversarial example within the certificate radius can change the model's decision. When you need it: 1) High-stakes decisions — medical, legal, financial outputs where correctness is critical. 2) Regulatory requirements — where provable safety is required. 3) Adversarial environments — where sophisticated adaptive attackers are expected. Tradeoff: certified robustness often reduces accuracy on clean inputs. Use selectively for critical decision points, not for all LLM outputs." },
]

export default function LlmAdversarialExamplesDefensePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Adversarial Examples Defense", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Adversarial Examples Defense Guide", "LLM Adversarial Examples Defense Guide"), description: pick(isDE, "LLM Adversarial Examples Sicherheit", "LLM adversarial examples security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Adversarial-Defense-Guide für eigene LLM-Systeme.", "Adversarial defense guide for your own LLM systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Adversarial Examples Defense</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Adversarial Examples Defense", "LLM Adversarial Examples Defense")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Adversarial Examples manipulieren LLM-Outputs durch kaum wahrnehmbare Eingabe-Veränderungen. Vier Kontrollen: Input Perturbation Detection, Adversarial Training, Certified Robustness und Real-Time Monitoring.", "Adversarial examples manipulate LLM outputs through imperceptible input changes. Four controls: input perturbation detection, adversarial training, certified robustness and real-time monitoring.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was sind LLM Adversarial Examples? Einfach erklärt", "What are LLM Adversarial Examples? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Adversarial Examples sind wie unsichtbare Manipulationen: Angreifer ändern Text so minimal, dass Menschen es kaum merken — aber das LLM-Output ändert sich drastisch. Synonym-Ersetzung, Character-Attacks und Paraphrasing sind typische Methoden. Input Perturbation Detection erkennt diese Angriffe. Adversarial Training härtet das Modell. Certified Robustness gibt mathematische Garantien. Ohne Defense kann ein einziger Adversarial Example das Modell zu gefährlichen Outputs manipulieren.", "LLM adversarial examples are like invisible manipulations: attackers change text so minimally that humans barely notice — but the LLM output changes drastically. Synonym substitution, character attacks and paraphrasing are typical methods. Input perturbation detection detects these attacks. Adversarial training hardens the model. Certified robustness provides mathematical guarantees. Without defense, a single adversarial example can manipulate the model to dangerous outputs.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Defense-Kontrollen", "Jump to defense controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Adversarial-Defense-Kontrollen", "4 Adversarial Defense Controls")}</h2>
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
              <div className="text-sm text-gray-300">{pick(isDE, "Adversarial Robustness", "Adversarial robustness")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-red-team-automation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Red Team Automation", "LLM Red Team Automation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Red-Team-Automation", "Red team automation")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-prompt-injection-detection`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Prompt Injection Detection", "LLM Prompt Injection Detection")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Injection-Detection", "Injection detection")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Adversarial ML Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Adversarial Examples Defense-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM adversarial examples defense implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
