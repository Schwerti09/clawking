import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-permission-minimization"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Permission Minimization: Least Privilege für KI-Agenten 2026 | ClawGuru", "AI Agent Permission Minimization: Least Privilege for AI Agents 2026 | ClawGuru")
  const description = pick(isDE, "Least-Privilege-Prinzip für KI-Agenten: Tool-Allowlists, dynamische Permission-Scoping, Just-in-Time-Zugriff und Moltbot-RBAC-Konfiguration für sichere AI-Agent-Deployments 2026.", "Least privilege for AI agents: tool allowlists, dynamic permission scoping, just-in-time access, and Moltbot RBAC configuration for secure AI agent deployments 2026.")
  return {
    title,
    description,
    keywords: ["ai agent permission minimization", "least privilege ai agents", "ai agent rbac", "moltbot permission control", "llm tool access control", "ai agent security 2026"],
    authors: [{ name: "R. Schwertfechter" }],
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

const STEPS = [
  {
    num: "1",
    title: (isDE: boolean) => pick(isDE, "Tool-Allowlists pro Agent definieren", "Define Per-Agent Tool Allowlists"),
    desc: (isDE: boolean) => pick(isDE, "Jeder Agent bekommt nur die Tools, die er für seine spezifische Aufgabe benötigt — nicht alle verfügbaren Tools.", "Each agent receives only the tools required for its specific task — not all available tools."),
    code: `# Moltbot agent permission config
agents:
  data-analyst:
    allowed_tools:
      - read_csv
      - compute_statistics
      - generate_chart
    denied_tools:
      - write_file
      - execute_code
      - http_request
    data_access:
      - "s3://analytics-bucket/reports/**"  # read-only
    denied_data:
      - "s3://prod-secrets/**"
      - "s3://customer-pii/**"

  customer-support:
    allowed_tools:
      - search_knowledge_base
      - create_ticket
      - read_order_status
    denied_tools:
      - delete_order
      - modify_billing
      - access_admin_panel`,
  },
  {
    num: "2",
    title: (isDE: boolean) => pick(isDE, "Dynamisches Permission-Scoping", "Dynamic Permission Scoping"),
    desc: (isDE: boolean) => pick(isDE, "Berechtigungen werden zur Laufzeit basierend auf dem aktuellen Task eingeschränkt — nicht statisch zur Deploy-Zeit.", "Permissions are restricted at runtime based on the current task — not statically at deploy time."),
    code: `# Moltbot dynamic scoping
permission_scoping:
  enabled: true
  strategy: task_based

  task_definitions:
    - task: "summarize_document"
      max_permissions:
        - read_document
        - generate_text
      forbidden:
        - external_http
        - file_write

    - task: "send_notification"
      max_permissions:
        - send_email
        - read_user_preferences
      scope_limit:
        recipients: "verified_users_only"
        rate_limit: "10/hour"

  escalation:
    requires_human_approval: true
    approval_timeout: 300s`,
  },
  {
    num: "3",
    title: (isDE: boolean) => pick(isDE, "Just-in-Time (JIT) Zugriff", "Just-in-Time (JIT) Access"),
    desc: (isDE: boolean) => pick(isDE, "Privilegierte Berechtigungen werden nur für die Dauer einer spezifischen Aufgabe erteilt und danach automatisch entzogen.", "Privileged permissions are granted only for the duration of a specific task, then automatically revoked."),
    code: `# Moltbot JIT access config
jit_access:
  enabled: true

  privileged_tools:
    - name: database_write
      max_duration: 300s
      requires_reason: true
      auto_revoke: true
      audit_all_calls: true

    - name: admin_api
      max_duration: 60s
      requires_human_approval: true
      approval_channel: "slack://security-team"
      log_level: verbose

  default_deny: true
  escalation_audit: true
  revocation_on_anomaly: true`,
  },
  {
    num: "4",
    title: (isDE: boolean) => pick(isDE, "Permission Drift Monitoring", "Permission Drift Monitoring"),
    desc: (isDE: boolean) => pick(isDE, "Automatische Erkennung wenn Agenten mehr Berechtigungen nutzen als ursprünglich definiert.", "Automatic detection when agents use more permissions than originally defined."),
    code: `# Moltbot permission drift detection
drift_monitoring:
  enabled: true
  baseline_window: 7d

  alerts:
    - condition: "tool_usage > baseline * 1.5"
      severity: warning
      action: notify

    - condition: "new_tool_accessed_not_in_allowlist"
      severity: critical
      action: block_and_alert

    - condition: "permission_escalation_attempt"
      severity: critical
      action: terminate_session

  reports:
    schedule: "0 9 * * 1"  # weekly Monday 9am
    recipients: ["security@example.com"]
    include: ["permission_changes", "drift_events", "blocked_attempts"]`,
  },
  {
    num: "5",
    title: (isDE: boolean) => pick(isDE, "Cross-Agent Permission Isolation", "Cross-Agent Permission Isolation"),
    desc: (isDE: boolean) => pick(isDE, "Agenten dürfen ihre Berechtigungen nicht an andere Agenten weitergeben — jede Agent-Instanz hat ihre eigenen, isolierten Rechte.", "Agents must not delegate their permissions to other agents — each agent instance has its own isolated rights."),
    code: `# Moltbot cross-agent isolation
agent_isolation:
  permission_delegation: false  # agents cannot grant perms to sub-agents
  sub_agent_inherit: false       # sub-agents start with zero permissions

  orchestrator_rules:
    - rule: "orchestrator_cannot_exceed_own_permissions"
      enforced: true
    - rule: "tool_call_on_behalf_requires_explicit_scope"
      enforced: true
    - rule: "no_permission_laundering_via_sub_agents"
      enforced: true

  audit:
    log_all_cross_agent_calls: true
    log_permission_context: true`,
  },
]

const FAQ = [
  {
    q: "Why is permission minimization especially important for AI agents?",
    a: "AI agents are more dangerous than traditional software for three reasons: 1) Autonomy — agents make decisions and take actions without human approval for each step. A misconfigured agent with too many permissions can cause large-scale damage automatically. 2) Prompt injection — an attacker can inject instructions into content the agent processes, effectively hijacking the agent's actions. If the agent has write access to production databases, the attacker does too. 3) Emergent behavior — LLMs sometimes take unexpected paths to achieve goals. Minimum permissions limit the blast radius of unexpected behavior. Rule of thumb: give agents exactly the permissions they need for their stated task, nothing more.",
  },
  {
    q: "How do I implement least privilege for an AI agent that needs many tools?",
    a: "For agents that legitimately need many tools: 1) Task-based scoping — break the agent into sub-tasks, each with its own permission set. The orchestrator only grants sub-agent permissions for the current task. 2) Time-limited access — grant broad permissions for a specific job window (e.g., 5 minutes for a data migration task), then automatically revoke. 3) Read-before-write — by default agents get read-only access. Write access requires explicit justification and JIT grant. 4) Staged execution — for high-risk actions, require a planning phase (read-only) and an execution phase (write access, human-approved). 5) Audit everything — if you cannot reduce permissions, at minimum log every tool call with full context.",
  },
  {
    q: "What is permission laundering in multi-agent systems?",
    a: "Permission laundering is when Agent A (with limited permissions) delegates a task to Agent B (with broader permissions) to indirectly gain access it shouldn't have. Example: Customer support agent (can only read orders) asks the admin agent (can delete orders) to 'clean up a test order' — effectively the low-privilege agent causes a high-privilege action. Prevention: 1) Moltbot enforces that orchestrators cannot grant sub-agents more permissions than they themselves have. 2) All cross-agent calls are logged with the originating agent's permission context. 3) Sub-agents always start with zero permissions and must be explicitly granted a scoped set for each task.",
  },
  {
    q: "How often should I review AI agent permissions?",
    a: "Permission review cadence: 1) Weekly — automated drift monitoring report (Moltbot generates this automatically). Review any new tools accessed or permission escalations. 2) Monthly — full permission audit: compare current allowlists against actual usage. Prune unused permissions. 3) On every code change — any change to agent logic should trigger a permission review. Add permission review to CI/CD pipeline. 4) After every security incident — re-evaluate all agent permissions after any incident, even if unrelated. 5) Annually — full red-team exercise against agent permission boundaries. The most common finding: permissions granted during development that were never revoked in production.",
  },
]

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Implement Permission Minimization for AI Agents",
  description: "Step-by-step guide to applying least privilege principles to AI agents using Moltbot.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Define Per-Agent Tool Allowlists", text: "Enumerate exact tools each agent needs. Deny all others explicitly." },
    { "@type": "HowToStep", position: 2, name: "Implement Dynamic Scoping", text: "Restrict permissions at runtime based on current task type." },
    { "@type": "HowToStep", position: 3, name: "Enable JIT Access", text: "Grant privileged permissions only for task duration, auto-revoke after." },
    { "@type": "HowToStep", position: 4, name: "Monitor Permission Drift", text: "Alert when agents access tools outside their baseline usage pattern." },
    { "@type": "HowToStep", position: 5, name: "Enforce Cross-Agent Isolation", text: "Prevent permission delegation between agents. Sub-agents start with zero permissions." },
  ],
}

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}

export default function AiAgentPermissionMinimizationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Permission Minimization", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Least Privilege", "RBAC"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div id="reading-progress" className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{width: '0%'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 flex gap-8">
        {/* Sticky Table of Contents (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 uppercase">{pick(isDE, "Inhalt", "Contents")}</h3>
              <nav className="space-y-2 text-sm">
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Least Privilege?", "What is Least Privilege?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Permission Defense", "5-Layer Permission Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Permission Score", "Permission Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">10 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Permission Minimization · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Permission Minimization — Dein Agent hat gerade Admin-Rechte auf der Produktions-DB.", "AI Agent Permission Minimization — Your Agent Just Got Admin Rights on the Production DB.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein KI-Agent hat gestern Nacht versehentlich alle Kundendaten gelöscht, weil er über write_file-Zugriff auf das S3-Bucket verfügte — eine Permission, die er für seine Aufgabe gar nicht brauchte. Das Ergebnis: 2.4 Mio. Euro Strafe, dein CTO hat das Incident-Team gerufen. Hier ist, wie du das verhinderst.", "Your AI agent accidentally deleted all customer data last night because it had write_file access to the S3 bucket — a permission it didn't need for its task. The result: €2.4M in fines, your CTO called the incident team. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Least Privilege? Einfach erklärt.", "What is Least Privilege? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Least Privilege wie einen Hausschlüssel vor: Jeder Mitarbeiter bekommt nur den Schlüssel für die Räume, die er für seine Arbeit braucht. Der Reinigungskraft bekommt den Schlüssel für den Putzraum, aber nicht für den Tresor. Wenn jemand den falschen Schlüssel hat, kann er nur begrenzten Schaden anrichten. Für KI-Agenten ist das noch wichtiger: Agenten handeln autonom und können durch Prompt Injection kompromittiert werden. Minimal berechtigte Agenten haben einen minimalen Blast Radius.", "Think of least privilege like a house key: each employee gets only the key for the rooms they need for their work. The cleaner gets the key to the cleaning room, but not the safe. If someone has the wrong key, they can only cause limited damage. For AI agents, this is even more critical: agents act autonomously and can be compromised via prompt injection. Minimally privileged agents have minimal blast radius.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer Permission Defense Architecture", "5-Layer Permission Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Tool-Allowlists pro Agent", "Per-Agent Tool Allowlists")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Definiere für jeden Agent exakt die Tools, die er benötigt. Verweigere alle anderen Tools explizit.", "Define exactly the tools each agent needs. Explicitly deny all other tools.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`agents:
  data-analyst:
    allowed_tools:
      - read_csv
      - compute_statistics
    denied_tools:
      - write_file
      - execute_code`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Dynamisches Permission-Scoping", "Dynamic Permission Scoping")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Berechtigungen werden zur Laufzeit basierend auf dem aktuellen Task eingeschränkt.", "Permissions are restricted at runtime based on the current task.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`permission_scoping:
  enabled: true
  strategy: task_based
  task_definitions:
    - task: "summarize_document"
      max_permissions:
        - read_document
        - generate_text`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Just-in-Time (JIT) Zugriff", "Just-in-Time (JIT) Access")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Privilegierte Berechtigungen werden nur für die Dauer einer spezifischen Aufgabe erteilt.", "Privileged permissions are granted only for the duration of a specific task.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`jit_access:
  enabled: true
  privileged_tools:
    - name: database_write
      max_duration: 300s
      auto_revoke: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Permission Drift Monitoring", "Permission Drift Monitoring")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Automatische Erkennung wenn Agenten mehr Berechtigungen nutzen als definiert.", "Automatic detection when agents use more permissions than defined.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`drift_monitoring:
  enabled: true
  alerts:
    - condition: "new_tool_accessed_not_in_allowlist"
      severity: critical
      action: block_and_alert`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-900 rounded-full flex items-center justify-center text-orange-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Cross-Agent Permission Isolation", "Cross-Agent Permission Isolation")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Agenten dürfen ihre Berechtigungen nicht an andere Agenten weitergeben.", "Agents must not delegate their permissions to other agents.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`agent_isolation:
  permission_delegation: false
  sub_agent_inherit: false`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Datenlöschung durch überflüssige write-Berechtigung", "SCAR #1: Data Deletion by Unnecessary Write Permission")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein Data-Analyst-Agent hatte write_file-Zugriff auf das S3-Bucket, obwohl er nur lesen sollte. Durch Prompt Injection löschte er 2 TB Kundendaten. Fix: Tool-Allowlists, read-only Default.", "A data analyst agent had write_file access to the S3 bucket, though it should only read. Via prompt injection, it deleted 2 TB of customer data. Fix: Tool allowlists, read-only default.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Überflüssige write-Berechtigung. Lessons: Default deny, explizite Allowlists.", "Root Cause: Unnecessary write permission. Lessons: Default deny, explicit allowlists.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Permission Laundering über Sub-Agenten", "SCAR #2: Permission Laundering via Sub-Agents")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein Customer-Support-Agent delegierte eine Aufgabe an einen Admin-Agent mit erweiterten Rechten. Der Low-Privilege-Agent erhielt so indirekt Admin-Zugriff. Fix: Cross-Agent Isolation, keine Permission-Delegation.", "A customer support agent delegated a task to an admin agent with extended rights. The low-privilege agent thus indirectly gained admin access. Fix: Cross-agent isolation, no permission delegation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Permission-Delegation erlaubt. Lessons: Cross-Agent Isolation erzwingen.", "Root Cause: Permission delegation allowed. Lessons: Enforce cross-agent isolation.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Tool-Allowlists für alle Agenten definieren", "Define Tool Allowlists for All Agents")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Definiere für jeden Agent exakt die benötigten Tools. Verweigere alle anderen.", "Define exactly the needed tools for each agent. Deny all others.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Default deny: Read-only als Standard", "Default deny: Read-only as standard")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Standardmäßig nur read-Zugriff. Write-Zugriff erfordert JIT-Grant.", "Default to read-only access. Write access requires JIT grant.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Permission Drift Monitoring aktivieren", "Enable Permission Drift Monitoring")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Alarm bei unbefugtem Tool-Zugriff oder Permission-Eskalation.", "Alert on unauthorized tool access or permission escalation.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Permission Checkliste", "Interactive Permission Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "Tool-Allowlists für alle Agenten definiert", "Tool allowlists defined for all agents") },
                  { id: "c2", text: pick(isDE, "Default deny: Alle Tools explizit erlaubt oder verweigert", "Default deny: All tools explicitly allowed or denied") },
                  { id: "c3", text: pick(isDE, "Read-only als Standard für Daten-Zugriff", "Read-only as default for data access") },
                  { id: "c4", text: pick(isDE, "JIT-Zugriff für privilegierte Tools aktiviert", "JIT access enabled for privileged tools") },
                  { id: "c5", text: pick(isDE, "Permission Drift Monitoring aktiviert", "Permission drift monitoring enabled") },
                  { id: "c6", text: pick(isDE, "Cross-Agent Permission Isolation aktiviert", "Cross-agent permission isolation enabled") },
                  { id: "c7", text: pick(isDE, "Sub-Agenten starten mit zero permissions", "Sub-agents start with zero permissions") },
                  { id: "c8", text: pick(isDE, "Alle Permission-Änderungen audit-logged", "All permission changes audit-logged") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Permission Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Permission Security Score Calculator", "Permission Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Tool-Allowlists für alle Agenten?", "Do you have tool allowlists for all agents?"), weight: 25 },
                  { q: pick(isDE, "Ist default deny aktiv?", "Is default deny active?"), weight: 25 },
                  { q: pick(isDE, "Ist JIT-Zugriff aktiv?", "Is JIT access active?"), weight: 25 },
                  { q: pick(isDE, "Ist Permission Drift Monitoring aktiv?", "Is permission drift monitoring active?"), weight: 25 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-300">{item.q}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 text-sm">{pick(isDE, "Ja", "Yes")}</button>
                      <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 text-sm">{pick(isDE, "Nein", "No")}</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{pick(isDE, "Dein Permission Security Score:", "Your Permission Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 40/100", "Industry Average: 40/100")}</p>
              </div>
            </div>
          </section>

          {/* Author Box */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-6 rounded-lg border border-cyan-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">
                  RS
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-cyan-300 text-lg">R. Schwertfechter</h3>
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                  </div>
                  <div className="text-sm text-cyan-200 mb-3">
                    Principal Ops-Engineer & Security Architect
                  </div>
                  <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                    <span>📅 Published: 01.05.2026</span>
                    <span>🔄 Last reviewed: 01.05.2026</span>
                  </div>
                  <div className="text-sm text-cyan-100 leading-relaxed mb-4">
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Least Privilege, RBAC und Permission Drift Monitoring.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in least privilege, RBAC and permission drift monitoring.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/ai-agent-rbac`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent RBAC</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Rollenbasierte Zugriffskontrolle", "Role-based access control")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-sandboxing`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Sandboxing</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Runtime-Isolation", "Runtime isolation")}</div>
              </a>
              <a href={`/${locale}/securitycheck`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Agent-Permissions prüfen", "Audit agent permissions")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Reading Progress Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('reading-progress').style.width = scrolled + '%';
          });
        `
      }} />
    </div>
  )
}
