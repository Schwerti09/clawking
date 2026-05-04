import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import { buildEEATArticleSchema } from "@/lib/seo/eeat-helper"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-escalation-prevention"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Escalation Prevention: KI-Agenten-Eskalations-Prävention | ClawGuru Moltbot", "AI Agent Escalation Prevention: AI Agent Privilege Escalation Prevention | ClawGuru Moltbot")
  const description = pick(isDE, "KI-Agenten-Eskalations-Prävention: Privilege Escalation Detection, Agent Permission Boundaries, Escalation Audit Logging und Automated Rollback für KI-Agenten-Eskalations-Prävention.", "AI agent escalation prevention: privilege escalation detection, agent permission boundaries, escalation audit logging and automated rollback for AI agent escalation prevention.")
  
  const articleSchema = buildEEATArticleSchema({
    headline: title,
    description,
    url: pageUrl,
    datePublished: "2026-04-28",
    dateModified: "2026-05-04",
    locale,
    articleType: "TechArticle",
  })

  return {
    title, description,
    keywords: ["ai agent escalation prevention", "privilege escalation detection", "agent permission boundaries", "escalation audit logging", "automated rollback", "moltbot escalation"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
    other: {
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}

const CONTROLS = [
  { id: "AEP-1", title: "Privilege Escalation Detection", desc: "Detect when AI agents attempt to acquire capabilities beyond their defined scope.", code: `# Moltbot privilege escalation detection:
escalation_detection:
  enabled: true

  # Permission Boundary Monitoring:
  boundaries:
    enabled: true
    # Monitor: all capability requests
    # Alert: on requests beyond scope
    # Block: escalation attempts
    # Log: escalation events

  # Cross-Agent Escalation:
  cross_agent:
    enabled: true
    # Detect: Agent A granting Agent B extra permissions
    # Detect: agents claiming inherited authority
    # Block: unauthorized permission transfers
    # Alert: on cross-agent escalation

  # Tool Invocation Monitoring:
  tool_monitoring:
    enabled: true
    # Monitor: all tool calls
    # Compare: against allowed tool list
    # Block: unauthorized tool calls
    # Alert: on new tool access attempts` },
  { id: "AEP-2", title: "Agent Permission Boundaries", desc: "Define and enforce hard permission boundaries for AI agents. No exceptions.", code: `# Moltbot agent permission boundaries:
permission_boundaries:
  enabled: true

  # Hard Limits:
  hard_limits:
    enabled: true
    # Define: absolute maximum permissions
    # Enforce: regardless of agent instructions
    # Cannot: be overridden by agent
    # Examples:
    #   - Never: delete production data
    #   - Never: send external emails
    #   - Never: access /etc/shadow
    #   - Never: modify system configs

  # Soft Limits:
  soft_limits:
    enabled: true
    # Define: preferred permission scope
    # Alert: when approaching soft limit
    # Require: approval to exceed
    # Log: all soft limit events

  # Dynamic Boundaries:
  dynamic:
    enabled: true
    # Adjust: permissions based on context
    # Reduce: permissions for sensitive operations
    # Expand: only with explicit approval
    # Expire: temporary expansions` },
  { id: "AEP-3", title: "Escalation Audit Logging", desc: "Log all escalation attempts and permission changes for audit and forensics.", code: `# Moltbot escalation audit logging:
escalation_audit:
  enabled: true

  # Attempt Logging:
  attempts:
    enabled: true
    # Log: all escalation attempts
    # Include: agent ID, requested permission, outcome
    # Timestamp: UTC with nanosecond precision
    # Tamper-evident: cryptographic log signing

  # Granted Escalations:
  grants:
    enabled: true
    # Log: all approved permission expansions
    # Include: approver, justification, duration
    # Alert: immediate notification to security team
    # Review: all grants weekly

  # Denied Escalations:
  denials:
    enabled: true
    # Log: all blocked escalation attempts
    # Pattern: detect repeated attempts
    # Alert: on escalation attack patterns
    # Investigate: anomalous patterns` },
  { id: "AEP-4", title: "Automated Rollback", desc: "Automatically roll back agent permissions when escalation is detected. Restore safe state.", code: `# Moltbot automated rollback:
automated_rollback:
  enabled: true

  # Trigger Conditions:
  triggers:
    enabled: true
    # Trigger: on detected escalation attempt
    # Trigger: on anomalous permission usage
    # Trigger: on security alert
    # Trigger: on manual override

  # Rollback Actions:
  actions:
    enabled: true
    # Revoke: all temporary permissions
    # Reset: agent to baseline capabilities
    # Terminate: active agent session
    # Notify: security team

  # Recovery Process:
  recovery:
    enabled: true
    # Investigate: root cause before restart
    # Verify: agent integrity
    # Approve: restart request
    # Document: incident` },
]

const FAQ = [
  { q: "How do AI agents escalate privileges?", a: "AI agents can escalate privileges through: 1) Prompt injection — malicious input instructs the agent to claim additional authorities. 2) Social engineering — agent convinces tool or human to grant extra permissions. 3) Authority injection via memory — poisoned memory contains fake authority claims. 4) Cross-agent injection — one agent injects escalation instructions into another. 5) Tool misuse — using authorized tools in unauthorized ways to gain additional access. 6) Instruction override — crafted inputs override capability restrictions in the system prompt." },
  { q: "What is the difference between hard and soft permission limits?", a: "Hard limits are absolute boundaries that cannot be overridden under any circumstances — not by the agent, not by user instruction, not even by an admin. Examples: never delete production databases, never send emails to external addresses, never read /etc/shadow. These are enforced at the infrastructure level, not just in prompts. Soft limits are the preferred permission scope — exceeding them requires explicit approval and logging, but is possible in exceptional cases. Hard limits protect against catastrophic failures; soft limits enable controlled flexibility." },
  { q: "How does escalation prevention relate to capability control?", a: "Escalation prevention is a subset of capability control. Capability control defines what an agent is allowed to do (allowlisting, scoping). Escalation prevention specifically focuses on detecting and blocking attempts to acquire capabilities beyond the defined scope — whether through prompt injection, cross-agent manipulation, or other attack vectors. Together: capability control defines the permission envelope, escalation prevention ensures agents stay within it. Both are required for secure AI agent deployments." },
  { q: "What should trigger an automated rollback?", a: "Automated rollback triggers: 1) Detected escalation attempt — agent requested permissions beyond its scope. 2) Anomalous tool invocation pattern — unusual tool call sequence. 3) Permission boundary breach — agent action exceeded defined limits. 4) Security alert from monitoring system — SIEM detected suspicious pattern. 5) Human override — security team manually triggers rollback. 6) Integrity failure — agent memory or configuration was modified. For each trigger, roll back to the last known-good state, revoke temporary permissions, terminate active session, and notify the security team." },
]

export default function AiAgentEscalationPreventionPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Escalation Prevention", item: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Eskalations-Prävention-Guide für eigene KI-Agenten-Systeme.", "Escalation prevention guide for your own AI agent systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Escalation Prevention</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Escalation Prevention", "AI Agent Escalation Prevention")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Privilege Escalation bei KI-Agenten ist real — Prompt Injection kann einen Agenten dazu bringen, sich selbst Admin-Rechte zu verschaffen. Vier Kontrollen: Escalation Detection, Permission Boundaries, Audit Logging und Automated Rollback.", "Privilege escalation in AI agents is real — prompt injection can make an agent grant itself admin rights. Four controls: escalation detection, permission boundaries, audit logging and automated rollback.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Escalation Prevention? Einfach erklärt", "What is AI Agent Escalation Prevention? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Escalation Prevention verhindert Privilege Escalation bei KI-Agenten: Privilege Escalation Detection überwacht alle Capability-Requests und erkennt Versuche, Berechtigungen über den definierten Scope hinaus zu erweitern. Agent Permission Boundaries definieren und erzwingen harte Limits (z.B. nie Produktionsdaten löschen, nie externe E-Mails senden) und weiche Limits mit Genehmigungspflicht. Escalation Audit Logging protokolliert alle Eskalationsversuche mit kryptographischer Log-Signierung für Forensik. Automated Rollback setzt bei erkannter Eskalation alle temporären Berechtigungen zurück und terminiert die Agent-Session.", "AI agent escalation prevention prevents privilege escalation in AI agents: privilege escalation detection monitors all capability requests and detects attempts to acquire permissions beyond the defined scope. Agent permission boundaries define and enforce hard limits (e.g., never delete production data, never send external emails) and soft limits requiring approval. Escalation audit logging logs all escalation attempts with cryptographic log signing for forensics. Automated rollback revokes all temporary permissions and terminates the agent session when escalation is detected.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kontrollen", "Jump to controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Eskalations-Prävention-Kontrollen", "4 Escalation Prevention Controls")}</h2>
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
            <a href={`/${locale}/moltbot/ai-agent-capability-control`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Capability Control</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Capability-Control", "Capability control")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-rbac`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent RBAC</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Role-Based Access", "Role-based access")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-prompt-leakage-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Prompt Leakage Defense</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Prompt-Leakage", "Prompt leakage")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Escalation Prevention Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Escalation Prevention-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent escalation prevention implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
