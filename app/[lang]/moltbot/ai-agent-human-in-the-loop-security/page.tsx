import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-human-in-the-loop-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Human-in-the-Loop Security: KI-Agenten-Human-in-the-Loop-Security | ClawGuru Moltbot", "AI Agent Human-in-the-Loop Security: AI Agent Human-in-the-Loop Security | ClawGuru Moltbot")
  const description = pick(isDE, "KI-Agenten-Human-in-the-Loop-Security: Human Approval Workflow, Override Security, Human Feedback Integrity und Human-Audit-Logging für KI-Agenten-Human-in-the-Loop-Security.", "AI agent human-in-the-loop security: human approval workflow, override security, human feedback integrity and human-audit-logging for AI agent human-in-the-loop security.")
  return {
    title, description,
    keywords: ["ai agent human in the loop security", "human approval workflow", "override security", "human feedback integrity", "human audit logging", "moltbot hitl"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "HITL-1", title: "Human Approval Workflow", desc: "Require human approval for critical agent actions. Define approval thresholds and escalation paths.", code: `# Moltbot human approval workflow:
human_approval:
  enabled: true

  # Approval thresholds:
  thresholds:
    enabled: true
    # Define: approval thresholds
    # Example: high-risk actions require approval
    # Thresholds: risk level, financial impact
    # Enforce: approval before action

  # Escalation paths:
  escalation:
    enabled: true
    # Define: escalation paths for approval
    # Path: level 1 → level 2 → level 3
    # Timeout: escalate if no response
    # Alert: on escalation

  # Approval tracking:
  tracking:
    enabled: true
    # Track: all approval requests
    # Include: request, approver, decision
    # Retain: for audit (90 days)
    # Protect: approval records` },
  { id: "HITL-2", title: "Override Security", desc: "Secure human override mechanisms. Use authentication, authorisation, and audit logging for overrides.", code: `# Moltbot override security:
override_security:
  enabled: true

  # Override authentication:
  authentication:
    enabled: true
    # Require: authentication for override
    # Method: MFA, SSO
    # Verify: identity before override
    # Prevents: unauthorised override

  # Override authorisation:
  authorisation:
    enabled: true
    # Check: override permissions
    # Roles: only authorised users can override
    # Enforce: least privilege
    # Prevents: unauthorised override

  # Override audit logging:
  audit_logging:
    enabled: true
    # Log: all override events
    # Include: user, action, reason
    # Retain: logs for audit (90 days)
    # Protect: log access` },
  { id: "HITL-3", title: "Human Feedback Integrity", desc: "Protect human feedback from tampering. Use signed feedback and integrity verification.", code: `# Moltbot human feedback integrity:
feedback_integrity:
  enabled: true

  # Signed feedback:
  signed_feedback:
    enabled: true
    # Sign: human feedback
    # Method: digital signature
    # Verify: signature before use
    # Prevents: feedback tampering

  # Feedback integrity verification:
  integrity_verification:
    enabled: true
    # Verify: feedback integrity
    # Method: hash verification
    # Block: tampered feedback
    # Prevents: feedback corruption

  # Feedback audit logging:
  audit_logging:
    enabled: true
    # Log: all feedback events
    # Include: feedback, user, timestamp
    # Retain: logs for audit (90 days)
    # Protect: log access` },
  { id: "HITL-4", title: "Human-Audit-Logging", desc: "Log all human-in-the-loop events for audit. Track approvals, overrides, and feedback.", code: `# Moltbot human-audit-logging:
human_audit_logging:
  enabled: true

  # Approval logging:
  approval_logging:
    enabled: true
    # Log: all approval events
    # Include: request, approver, decision
    # Retain: logs for audit (90 days)
    # Protect: log access

  # Override logging:
  override_logging:
    enabled: true
    # Log: all override events
    # Include: user, action, reason
    # Retain: logs for audit (90 days)
    # Protect: log access

  # Feedback logging:
  feedback_logging:
    enabled: true
    # Log: all feedback events
    # Include: feedback, user, timestamp
    # Retain: logs for audit (90 days)
    # Protect: log access` },
]

const FAQ = [
  { q: "What is the difference between human approval workflow and override security?", a: "Human approval workflow is a proactive control that requires human approval before an agent can take certain actions. This is typically used for high-risk actions. Override security is a reactive control that allows humans to override agent decisions after they are made. Approval workflow prevents unauthorised actions. Override security allows correction of agent errors. Both are necessary: approval workflow prevents bad actions, override security allows correction when mistakes happen." },
  { q: "How do I protect human feedback from tampering?", a: "Protect human feedback by: 1) Signing feedback — digitally sign feedback to ensure integrity. 2) Verifying signatures — verify signatures before using feedback for training. 3) Integrity verification — hash verification to detect tampering. 4) Audit logging — log all feedback events for compliance. 5) Access control — restrict who can provide feedback. Each control addresses a different aspect of feedback security." },
  { q: "How do I set effective approval thresholds?", a: "Effective approval thresholds balance security with usability: 1) Start with conservative thresholds (e.g., approve all actions above $1000). 2) Define risk categories (low, medium, high). 3) Map risk categories to approval levels. 4) Implement escalation paths for timeout. 5) Monitor approval patterns and adjust thresholds. 6) Regularly review and update thresholds as usage evolves. 7) Document approval policies for compliance." },
  { q: "What are common human-in-the-loop attack vectors?", a: "Common human-in-the-loop attack vectors: 1) Approval bypass — bypass approval workflow through technical means. 2) Override abuse — abuse override mechanism to take unauthorised actions. 3) Feedback tampering — tamper with human feedback to influence model. 4) Approval spoofing — spoof approval from legitimate user. 5) Feedback injection — inject malicious feedback. Defense: human approval workflow, override security, human feedback integrity, audit logging." },
]

export default function AiAgentHumanInTheLoopSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Human-in-the-Loop Security", item: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Human-in-the-Loop-Security-Guide für eigene KI-Systeme.", "Human-in-the-loop security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Human-in-the-Loop Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Human-in-the-Loop Security", "AI Agent Human-in-the-Loop Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "KI-Agenten ohne Human-in-the-Loop-Security sind anfällig für HITL-Attacken — ohne Human-in-the-Loop-Security bleibt HITL ungeschützt. Vier Kontrollen: Human Approval Workflow, Override Security, Human Feedback Integrity und Human-Audit-Logging.", "AI agents without human-in-the-loop security are vulnerable to HITL attacks — without human-in-the-loop security, HITL remains unprotected. Four controls: human approval workflow, override security, human feedback integrity and human-audit-logging.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Human-in-the-Loop Security? Einfach erklärt", "What is AI Agent Human-in-the-Loop Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Human-in-the-Loop Security sichert menschliche Eingriffe in KI-Agenten: Human Approval Workflow verlangt menschliche Genehmigung für kritische Aktionen mit Approval Thresholds und Escalation Paths. Override Security sichert menschliche Overrides mit Authentication (MFA/SSO), Authorisation und Audit Logging. Human Feedback Integrity schützt menschliches Feedback mit digitalen Signaturen und Hash-Verification gegen Manipulation. Human-Audit-Logging protokolliert alle HITL-Events (Approvals, Overrides, Feedback) für Compliance und Forensik.", "AI agent human-in-the-loop security secures human interventions in AI agents: human approval workflow requires human approval for critical actions with approval thresholds and escalation paths. Override security secures human overrides with authentication (MFA/SSO), authorisation and audit logging. Human feedback integrity protects human feedback with digital signatures and hash verification against manipulation. Human-audit-logging logs all HITL events (approvals, overrides, feedback) for compliance and forensics.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kontrollen", "Jump to controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Human-in-the-Loop-Security-Kontrollen", "4 Human-in-the-Loop Security Controls")}</h2>
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
            <a href={`/${locale}/moltbot/ai-agent-behavioral-monitoring`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Behavioral Monitoring</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Behavioral-Monitoring", "Behavioral monitoring")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-orchestration-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Orchestration Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Orchestration-Security", "Orchestration security")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-bias-detection-mitigation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Bias Detection & Mitigation</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Bias-Mitigation", "Bias mitigation")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "HITL-Overview", "HITL overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Human-in-the-Loop Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Human-in-the-Loop Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent human-in-the-loop security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
