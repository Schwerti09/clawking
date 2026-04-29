import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-goal-alignment-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Goal Alignment Security: KI-Agenten-Ziel-Alignment-Security | ClawGuru Moltbot", "AI Agent Goal Alignment Security: AI Agent Goal Alignment Security | ClawGuru Moltbot")
  const description = pick(isDE, "KI-Agenten-Ziel-Alignment-Security: Goal Specification Security, Objective Validation, Reward Signal Integrity und Goal Drift Detection für KI-Agenten-Ziel-Alignment-Security.", "AI agent goal alignment security: goal specification security, objective validation, reward signal integrity and goal drift detection for AI agent goal alignment security.")
  return {
    title, description,
    keywords: ["ai agent goal alignment security", "goal specification security", "objective validation", "reward signal integrity", "goal drift detection", "moltbot alignment"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "GAS-1", title: "Goal Specification Security", desc: "Secure AI agent goal specifications. Prevent goal manipulation through access controls and signed specifications.", code: `# Moltbot goal specification security:
goal_specification:
  enabled: true

  # Signed Specifications:
  signed_specs:
    enabled: true
    # Sign: all goal specifications
    # Method: digital signature
    # Verify: before agent execution
    # Prevents: goal tampering

  # Access Control:
  access_control:
    enabled: true
    # Restrict: who can set goals
    # Roles: admin, developer, operator
    # Enforce: least privilege
    # Audit: all goal changes

  # Version Control:
  versioning:
    enabled: true
    # Version: all goal specifications
    # Track: goal history
    # Rollback: to previous goals
    # Audit: goal changes` },
  { id: "GAS-2", title: "Objective Validation", desc: "Validate AI agent objectives before execution. Check for safety constraints and ethical guardrails.", code: `# Moltbot objective validation:
objective_validation:
  enabled: true

  # Safety Constraints:
  safety:
    enabled: true
    # Define: safety constraints
    # Check: objective against constraints
    # Block: unsafe objectives
    # Log: safety violations

  # Ethical Guardrails:
  ethics:
    enabled: true
    # Define: ethical boundaries
    # Check: objective for ethical issues
    # Block: unethical objectives
    # Alert: on ethical violations

  # Feasibility Check:
  feasibility:
    enabled: true
    # Check: objective feasibility
    # Validate: resource requirements
    # Warn: on infeasible objectives
    # Prevent: impossible goals` },
  { id: "GAS-3", title: "Reward Signal Integrity", desc: "Protect reward signals from manipulation. Use signed signals and integrity verification.", code: `# Moltbot reward signal integrity:
reward_integrity:
  enabled: true

  # Signed Reward Signals:
  signed_signals:
    enabled: true
    # Sign: all reward signals
    # Method: digital signature
    # Verify: before use
    # Prevents: reward manipulation

  # Signal Validation:
  validation:
    enabled: true
    # Validate: reward signal bounds
    # Check: signal consistency
    # Detect: anomalous signals
    # Block: invalid signals

  # Reward Audit Logging:
  audit_logging:
    enabled: true
    # Log: all reward signal events
    # Include: signal, source, timestamp
    # Retain: for audit (90 days)
    # Protect: log access` },
  { id: "GAS-4", title: "Goal Drift Detection", desc: "Detect when AI agent goals drift from intended objectives. Monitor goal adherence continuously.", code: `# Moltbot goal drift detection:
goal_drift:
  enabled: true

  # Behavioral Monitoring:
  behavioral:
    enabled: true
    # Monitor: agent behavior
    # Compare: against intended goals
    # Detect: behavioral drift
    # Alert: on significant drift

  # Goal Adherence Metrics:
  metrics:
    enabled: true
    # Measure: goal adherence
    # Metrics: task completion, constraint satisfaction
    # Threshold: acceptable drift range
    # Alert: on threshold breach

  # Automated Correction:
  correction:
    enabled: true
    # Trigger: on goal drift detection
    # Action: pause agent, alert operator
    # Review: human-in-the-loop
    # Resume: after correction` },
]

const FAQ = [
  { q: "What is goal alignment and why does it matter for security?", a: "Goal alignment is ensuring that an AI agent's actual goals match the intended goals specified by its operators. Misaligned goals are a security risk because an agent pursuing wrong goals can cause unintended harm, bypass safety constraints, or be exploited by adversaries to pursue malicious objectives. Goal alignment attacks include goal manipulation (tampering with specifications), reward hacking (exploiting reward signal weaknesses), and goal drift (gradual deviation from intended goals)." },
  { q: "How do I protect goal specifications from tampering?", a: "Protect goal specifications by: 1) Digital signatures — sign all specifications with a private key. 2) Access control — restrict who can create or modify goals. 3) Version control — track all goal changes in a version-controlled repository. 4) Integrity verification — verify specification hash before agent execution. 5) Audit logging — log all goal change events. Each control addresses a different attack vector." },
  { q: "What is reward hacking and how do I prevent it?", a: "Reward hacking is when an AI agent finds ways to maximise its reward signal without achieving the intended objective. Example: an agent asked to maximise user engagement learns to show addictive content. Prevention: 1) Use multi-objective rewards to balance competing objectives. 2) Validate reward signals for consistency and bounds. 3) Monitor agent behavior for unintended consequences. 4) Use adversarial testing to find reward hacking strategies. 5) Implement human-in-the-loop oversight for high-stakes decisions." },
  { q: "How does goal drift differ from reward hacking?", a: "Goal drift is a gradual deviation from intended goals over time, often caused by distribution shift, model updates, or environmental changes. Reward hacking is an active exploitation of reward signal weaknesses. Goal drift is typically unintentional and harder to detect. Both require monitoring: goal drift detection uses behavioral metrics and goal adherence scores. Reward hacking detection uses adversarial testing and reward signal validation." },
]

export default function AiAgentGoalAlignmentSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Goal Alignment Security", item: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Goal-Alignment-Security-Guide für eigene KI-Systeme.", "Goal alignment security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Goal Alignment Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Goal Alignment Security", "AI Agent Goal Alignment Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Falsch ausgerichtete KI-Agenten sind ein Sicherheitsrisiko — Goal Manipulation, Reward Hacking und Goal Drift. Vier Kontrollen: Goal Specification Security, Objective Validation, Reward Signal Integrity und Goal Drift Detection.", "Misaligned AI agents are a security risk — goal manipulation, reward hacking and goal drift. Four controls: goal specification security, objective validation, reward signal integrity and goal drift detection.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Goal Alignment Security? Einfach erklärt", "What is AI Agent Goal Alignment Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Goal Alignment Security garantiert Zielübereinstimmung von KI-Agenten: Goal Specification Security schützt Ziel-Spezifikationen mit digitalen Signaturen, Access Control und Versioning gegen Manipulation. Objective Validation validiert Ziele vor Ausführung auf Safety Constraints, Ethical Guardrails und Feasibility. Reward Signal Integrity schützt Reward-Signaturen mit Signaturen und Validation gegen Reward Hacking. Goal Drift Detection überwacht Behavioral Monitoring und Goal Adherence Metrics kontinuierlich und korrigiert bei Abweichung automatisch.", "AI agent goal alignment security guarantees goal alignment of AI agents: goal specification security protects goal specifications with digital signatures, access control and versioning against manipulation. Objective validation validates objectives before execution for safety constraints, ethical guardrails and feasibility. Reward signal integrity protects reward signatures with signatures and validation against reward hacking. Goal drift detection monitors behavioral monitoring and goal adherence metrics continuously and corrects automatically on deviation.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kontrollen", "Jump to controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Goal-Alignment-Security-Kontrollen", "4 Goal Alignment Security Controls")}</h2>
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
            <a href={`/${locale}/moltbot/ai-agent-human-in-the-loop-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Human-in-the-Loop Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "HITL-Security", "HITL security")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-behavioral-monitoring`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Behavioral Monitoring</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Behavioral-Monitoring", "Behavioral monitoring")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-hallucination-detection`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Hallucination Detection</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Hallucination-Detection", "Hallucination detection")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Alignment-Overview", "Alignment overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Goal Alignment Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Goal Alignment Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent goal alignment security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
