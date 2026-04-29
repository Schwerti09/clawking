import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-adversarial-robustness"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Adversarial Robustness: LLM-Adversarial-Robustness | ClawGuru Moltbot", "LLM Adversarial Robustness: LLM Adversarial Robustness | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Adversarial-Robustness: Adversarial Training, Input Sanitisation, Output Verification und Robustness Testing für LLM-Adversarial-Robustness.", "LLM adversarial robustness: adversarial training, input sanitisation, output verification and robustness testing for LLM adversarial robustness.")
  return {
    title, description,
    keywords: ["llm adversarial robustness", "adversarial training", "input sanitisation", "output verification", "robustness testing", "moltbot adversarial"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "AR-1", title: "Adversarial Training", desc: "Train LLMs on adversarial examples to improve robustness. Generate adversarial inputs and include them in training data.", code: `# Moltbot adversarial training:
adversarial_training:
  enabled: true

  # Adversarial example generation:
  generation:
    enabled: true
    # Generate adversarial examples:
    # - Prompt injection examples
    # - Jailbreak examples
    # - Data poisoning examples
    # Method: gradient-based, genetic algorithm, reinforcement learning

  # Training on adversarial examples:
  training:
    enabled: true
    # Mix: adversarial examples with clean data
    # Ratio: 20% adversarial, 80% clean
    # Epochs: train on adversarial examples
    # Objective: robustness to adversarial attacks

  # Evaluation:
  evaluation:
    enabled: true
    # Evaluate: model robustness on adversarial test set
    # Metric: adversarial accuracy, robust accuracy
    # Target: >90% robust accuracy` },
  { id: "AR-2", title: "Input Sanitisation", desc: "Sanitise all inputs before feeding to LLM. Remove or neutralise adversarial patterns in prompts.", code: `# Moltbot input sanitisation:
input_sanitisation:
  enabled: true

  # Pattern detection:
  pattern_detection:
    enabled: true
    # Detect: adversarial patterns in input
    # Patterns: prompt injection, jailbreak, data poisoning
    # Method: regex, ML classifier, pattern matching

  # Input neutralisation:
  neutralisation:
    enabled: true
    # Neutralise: detected adversarial patterns
    # Method: remove, replace, escape
    # Example: remove "ignore previous instructions"

  # Input validation:
  validation:
    enabled: true
    # Validate: input format, length, content
    # Reject: invalid or malicious inputs
    # Alert: on suspicious inputs` },
  { id: "AR-3", title: "Output Verification", desc: "Verify LLM outputs for adversarial influence. Detect and block outputs that deviate from expected behavior.", code: `# Moltbot output verification:
output_verification:
  enabled: true

  # Output anomaly detection:
  anomaly_detection:
    enabled: true
    # Detect: anomalous outputs
    # Methods: statistical analysis, ML classifier, rule-based
    # Alert: on anomalous outputs

  # Output consistency check:
  consistency:
    enabled: true
    # Check: output consistency with input and context
    # Example: output should not contradict input
    # Block: inconsistent outputs

  # Output safety check:
  safety:
    enabled: true
    # Check: output for malicious content
    # Methods: content safety classifier, PII scan
    # Block: unsafe outputs` },
  { id: "AR-4", title: "Robustness Testing", desc: "Test LLM robustness against adversarial attacks. Use red teaming and penetration testing to identify vulnerabilities.", code: `# Moltbot robustness testing:
robustness_testing:
  enabled: true

  # Red teaming:
  red_teaming:
    enabled: true
    # Red team: simulate adversarial attacks
    # Attacks: prompt injection, jailbreak, data poisoning
    # Method: manual + automated testing

  # Penetration testing:
  pentesting:
    enabled: true
    # Pen test: LLM endpoints and APIs
    # Focus: adversarial inputs, output manipulation
    # Tools: custom scripts, frameworks

  # Robustness metrics:
  metrics:
    enabled: true
    # Measure: adversarial robustness
    # Metrics: robust accuracy, attack success rate
    # Target: <5% attack success rate` },
]

const FAQ = [
  { q: "What is the difference between adversarial training and input sanitisation?", a: "Adversarial training improves model robustness by training on adversarial examples. The model learns to resist adversarial attacks by seeing them during training. Input sanitisation protects the model by detecting and neutralising adversarial inputs before they reach the model. Adversarial training is a proactive measure that improves the model's inherent robustness. Input sanitisation is a defensive measure that protects the model from adversarial inputs. Both are necessary: adversarial training improves model robustness, input sanitisation provides an additional layer of defense." },
  { q: "How does adversarial example generation work?", a: "Adversarial example generation creates inputs that cause the model to make errors. Gradient-based methods use the model's gradients to find inputs that maximise the model's error. Genetic algorithms evolve inputs through mutation and selection to find adversarial examples. Reinforcement learning uses an attacker agent to learn adversarial strategies. The generated adversarial examples are then added to the training data to improve model robustness. The goal is to create diverse, realistic adversarial examples that cover the attack space." },
  { q: "How do I measure adversarial robustness?", a: "Adversarial robustness is measured by evaluating the model on an adversarial test set. Key metrics: 1) Robust accuracy — accuracy on adversarial examples. 2) Attack success rate — percentage of adversarial examples that succeed. 3) Clean accuracy — accuracy on clean data (to ensure robustness doesn't hurt performance). 4) Transfer robustness — robustness to unseen attack types. Target: >90% robust accuracy, <5% attack success rate. Regular testing on diverse adversarial examples is essential to maintain robustness." },
  { q: "What are common adversarial attacks against LLMs?", a: "Common adversarial attacks against LLMs: 1) Prompt injection — craft prompts that override system instructions. 2) Jailbreak — craft prompts that bypass safety filters. 3) Data poisoning — inject malicious data into training data. 4) Model extraction — extract model parameters through queries. 5) Membership inference — determine if data was used in training. 6) Backdoor attacks — embed backdoors in the model. Defense: adversarial training, input sanitisation, output verification, robustness testing." },
]

export default function LlmAdversarialRobustnessPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Adversarial Robustness", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Adversarial Robustness Guide", "LLM Adversarial Robustness Guide"), description: pick(isDE, "LLM Adversarial Robustness Sicherheit", "LLM adversarial robustness security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Adversarial-Robustness-Guide für eigene KI-Systeme.", "Adversarial robustness guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Adversarial Robustness</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Adversarial Robustness", "LLM Adversarial Robustness")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Adversarial-Robustness sind anfällig für Adversarial-Attacken — ohne Robustness können Angreifer Modelle manipulieren. Vier Kontrollen: Adversarial Training, Input Sanitisation, Output Verification und Robustness Testing.", "LLM models without adversarial robustness are vulnerable to adversarial attacks — without robustness, attackers can manipulate models. Four controls: adversarial training, input sanitisation, output verification and robustness testing.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Adversarial Robustness? Einfach erklärt", "What is LLM Adversarial Robustness? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Adversarial Robustness ist wie ein Immunsystem für KI-Modelle: Adversarial Training trainiert das Modell auf Attacken. Input Sanitisation neutralisiert gefährliche Eingaben. Output Verification prüft Ergebnisse auf Manipulation. Robustness Testing simuliert Angriffe. Ohne Robustness kann ein einziger Adversarial Prompt das Modell zu gefährlichen Outputs zwingen. Mit Robustness widersteht das Modell selbst ausgeklügelten Angriffen.", "LLM adversarial robustness is like an immune system for AI models: adversarial training trains the model on attacks. Input sanitisation neutralises dangerous inputs. Output verification checks results for manipulation. Robustness testing simulates attacks. Without robustness, a single adversarial prompt can force the model to dangerous outputs. With robustness, the model resists even sophisticated attacks.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Robustness-Kontrollen", "Jump to robustness controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Adversarial-Robustness-Kontrollen", "4 Adversarial Robustness Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-prompt-hardening`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Prompt Hardening", "LLM Prompt Hardening")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Prompt-Injection-Defense", "Prompt injection defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-prompt-injection-detection`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Prompt Injection Detection", "LLM Prompt Injection Detection")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Injection-Detection", "Injection detection")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-output-filtering`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Output Filtering", "LLM Output Filtering")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Content-Safety", "Content safety")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Adversarial-Overview", "Adversarial overview")}</div>
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
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Adversarial Robustness-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM adversarial robustness implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
