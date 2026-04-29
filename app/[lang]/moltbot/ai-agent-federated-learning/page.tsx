import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-federated-learning"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Federated Learning: KI-Agenten-Federated-Learning | ClawGuru Moltbot", "AI Agent Federated Learning: AI Agent Federated Learning | ClawGuru Moltbot")
  const description = pick(isDE, "KI-Agenten-Federated-Learning: Federated Training, Client Selection, Aggregation Security und Privacy Budget Management für KI-Agenten-Federated-Learning.", "AI agent federated learning: federated training, client selection, aggregation security and privacy budget management for AI agent federated learning.")
  return {
    title, description,
    keywords: ["ai agent federated learning", "federated training", "client selection", "aggregation security", "privacy budget", "moltbot federated"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "AFL-1", title: "Federated Training", desc: "Train AI agents on distributed data without centralising data. Agents train locally, only model updates are shared.", code: `# Moltbot federated training:
federated_training:
  enabled: true

  # Federated learning architecture:
  architecture:
    # Central server coordinates training
    # Edge agents train on local data
    # Model updates aggregated centrally
    # Data never leaves local devices

  # Training protocol:
  protocol:
    # Round-based training
    # Each round: select clients, train locally, aggregate
    # Number of rounds: until convergence or max rounds
    # Convergence threshold: model accuracy delta < 0.001

  # Local training:
  local_training:
    # Local epochs: number of epochs per client
    local_epochs: 5
    # Batch size: local batch size
    batch_size: 32
    # Learning rate: local learning rate
    learning_rate: 0.01` },
  { id: "AFL-2", title: "Client Selection", desc: "Select which agents participate in each training round. Use strategies to ensure data diversity and security.", code: `# Moltbot client selection:
client_selection:
  enabled: true

  # Selection strategy:
  strategy:
    # Random selection: randomly select clients
    # Uniform sampling: equal probability for all clients
    # Importance sampling: weight by data quality or quantity
    # Adaptive selection: based on client performance
    method: "importance_sampling"

  # Selection criteria:
  criteria:
    # Minimum data: clients must have minimum data
    min_data_samples: 100
    # Data quality: filter low-quality data
    quality_threshold: 0.7
    # Availability: select only available clients
    availability_check: true

  # Selection size:
  size:
    # Fraction of clients to select per round
    # Trade-off: more clients = better convergence but slower
    fraction: 0.1` },
  { id: "AFL-3", title: "Aggregation Security", desc: "Securely aggregate model updates from agents. Detect and mitigate malicious or poisoned updates.", code: `# Moltbot aggregation security:
aggregation_security:
  enabled: true

  # Aggregation method:
  method:
    # Federated Averaging (FedAvg): weighted average of updates
    # Krum: detect and reject outliers
    # Trimmed Mean: trim extreme values
    # Byzantine-resilient: robust to malicious clients
    algorithm: "byzantine_resilient"

  # Poisoning detection:
  poisoning_detection:
    enabled: true
    # Detect: malicious model updates
    # Methods: statistical analysis, anomaly detection
    # Threshold: reject updates beyond threshold
    # Alert: on suspected poisoning

  # Update verification:
  verification:
    enabled: true
    # Verify: model updates before aggregation
    # Check: update magnitude, gradient direction
    # Reject: suspicious updates
    # Audit: rejected updates for analysis` },
  { id: "AFL-4", title: "Privacy Budget Management", desc: "Manage privacy budget across federated learning rounds. Use differential privacy to protect individual privacy.", code: `# Moltbot privacy budget management:
privacy_budget:
  enabled: true

  # Privacy budget:
  budget:
    # Epsilon: total privacy budget
    # Lower epsilon = stronger privacy
    # Distribute: across training rounds
    total_epsilon: 10.0
    # Per-round epsilon: budget per round
    per_round_epsilon: 0.1

  # Differential privacy:
  differential_privacy:
    enabled: true
    # Add noise to model updates
    # Mechanism: Gaussian or Laplace
    # Calibrate: based on sensitivity
    # Track: privacy budget consumption

  # Budget tracking:
  tracking:
    enabled: true
    # Track: privacy budget per client
    # Alert: when budget exhausted
    # Reset: budget periodically
    # Audit: budget usage history` },
]

const FAQ = [
  { q: "What is the difference between federated training and centralised training?", a: "Federated training trains models on distributed data without centralising data. Data stays on local devices, and only model updates (gradients or weights) are shared with a central server for aggregation. Centralised training requires all data to be centralised in one location. Federated training addresses data privacy, regulatory constraints, and data sovereignty by keeping data local. Centralised training is simpler but requires data centralisation. Federated training is more complex but enables privacy-preserving training on distributed data." },
  { q: "How does client selection affect federated learning?", a: "Client selection determines which agents participate in each training round. Random selection is simple but may not ensure data diversity. Importance sampling weights clients by data quality or quantity, improving convergence but potentially biasing training. Adaptive selection adjusts selection based on client performance, focusing on high-performing clients. The selection strategy affects convergence speed, model quality, and fairness. Too few clients may slow convergence. Too many clients may increase communication overhead. The optimal selection depends on the use case." },
  { q: "How does aggregation security protect against poisoning attacks?", a: "Aggregation security protects against poisoning attacks by detecting and rejecting malicious model updates. Byzantine-resilient aggregation algorithms (e.g., Krum, Trimmed Mean) are robust to a fraction of malicious clients. Poisoning detection uses statistical analysis and anomaly detection to identify suspicious updates. Update verification checks update magnitude and gradient direction before aggregation. These techniques ensure that malicious or poisoned updates do not affect the global model. However, they add computational overhead and may reject legitimate updates from diverse clients." },
  { q: "What is the role of differential privacy in federated learning?", a: "Differential privacy adds calibrated noise to model updates to protect individual privacy. It ensures that the presence or absence of any individual's data does not significantly affect the model output. In federated learning, differential privacy is applied to model updates before aggregation. The privacy budget (epsilon) is tracked across training rounds. When the budget is exhausted, training must stop or the budget must be reset. Differential privacy provides mathematical privacy guarantees but reduces model accuracy due to added noise. The trade-off between privacy and accuracy must be balanced." },
]

export default function AiAgentFederatedLearningPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Federated Learning", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Federated-Learning-Guide für eigene KI-Systeme.", "Federated learning guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Federated Learning</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Federated Learning", "AI Agent Federated Learning")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "KI-Agenten ohne Federated Learning zentralisieren Daten — ohne Federated-Learning bleibt Daten-Privacy ungeschützt. Vier Kontrollen: Federated Training, Client Selection, Aggregation Security und Privacy Budget Management.", "AI agents without federated learning centralise data — without federated learning, data privacy remains unprotected. Four controls: federated training, client selection, aggregation security and privacy budget management.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Federated Learning? Einfach erklärt", "What is AI Agent Federated Learning? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Federated Learning trainiert KI-Agenten auf verteilten Daten ohne Zentralisierung: Federated Training lässt Agenten lokal auf Daten trainieren und teilt nur Model-Updates mit einem zentralen Server. Client Selection wählt pro Runde Strategisch welche Agenten teilnehmen (Random, Importance Sampling, Adaptive). Aggregation Security sichert die Aggregation mit Byzantine-resilient Algorithmen (Krum, Trimmed Mean) gegen Poisoning-Attacks. Privacy Budget Management nutzt Differential Privacy mit kalkuliertem Noise und trackt das Privacy-Budget (Epsilon) über Training-Rounds.", "AI agent federated learning trains AI agents on distributed data without centralisation: federated training lets agents train locally on data and share only model updates with a central server. Client selection strategically selects which agents participate per round (random, importance sampling, adaptive). Aggregation security secures aggregation with byzantine-resilient algorithms (Krum, trimmed mean) against poisoning attacks. Privacy budget management uses differential privacy with calibrated noise and tracks the privacy budget (epsilon) across training rounds.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kontrollen", "Jump to controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Agent-Federated-Learning-Kontrollen", "4 Agent Federated Learning Controls")}</h2>
          <div className="space-y-5">
            {CONTROLS.map((c) => (
              <div key={c.id} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 shadow-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700/50">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{c.id}</span>
                  <span className="font-bold text-gray-100">{c.title}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{c.desc}</p>
                  <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded font-mono text-xs overflow-x-auto border border-gray-700/50"><pre>{c.code}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 shadow-xl">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/llm-privacy-preserving-computation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Privacy-Preserving Computation</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Privacy-Techniques", "Privacy techniques")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-audit-logging`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Audit Logging</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Training-Logging", "Training logging")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-data-encryption-at-rest`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Data Encryption at Rest</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Data-Security", "Data security")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Federated Learning Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Federated Learning-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent federated learning implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
