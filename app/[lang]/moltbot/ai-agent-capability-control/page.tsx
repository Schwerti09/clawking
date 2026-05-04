import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import { buildEEATArticleSchema } from "@/lib/seo/eeat-helper"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-capability-control"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Capability Control: KI-Agenten-Capability-Control | ClawGuru Moltbot", "AI Agent Capability Control: AI Agent Capability Control | ClawGuru Moltbot")
  const description = pick(isDE, "KI-Agenten-Capability-Control: Tool Access Control, Action Allowlisting, Capability Scoping und Capability Monitoring für KI-Agenten-Capability-Control.", "AI agent capability control: tool access control, action allowlisting, capability scoping and capability monitoring for AI agent capability control.")
  
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
    keywords: ["ai agent capability control", "tool access control", "action allowlisting", "capability scoping", "capability monitoring", "moltbot capability control"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
    other: {
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}

const CONTROLS = [
  { id: "ACC-1", title: "Tool Access Control", desc: "Control which tools AI agents can access. Define per-agent tool allowlists.", code: `# Moltbot tool access control:
tool_access:
  enabled: true

  # Per-Agent Tool Allowlist:
  allowlist:
    enabled: true
    # Define: tools per agent role
    # Customer support agent:
    #   - knowledge_base_search (read-only)
    #   - ticket_create (create only)
    #   - NOT: code_execution, file_delete
    # Admin agent:
    #   - all_tools (with approval workflow)

  # Tool Permission Matrix:
  permissions:
    enabled: true
    # Read: allowed for most agents
    # Write: requires approval
    # Execute: requires explicit grant
    # Delete: requires human-in-the-loop

  # Tool Call Rate Limiting:
  rate_limiting:
    enabled: true
    # Limit: tool calls per minute
    # Alert: on unusual tool usage patterns
    # Block: excessive tool calls
    # Log: all tool invocations` },
  { id: "ACC-2", title: "Action Allowlisting", desc: "Define allowed actions for AI agents. Block all actions not explicitly permitted.", code: `# Moltbot action allowlisting:
action_allowlisting:
  enabled: true

  # Default Deny:
  default_policy:
    enabled: true
    # Policy: deny-all by default
    # Grant: only explicitly permitted actions
    # Principle: least privilege
    # Audit: all action grants

  # Action Categories:
  categories:
    enabled: true
    # Read-only actions:
    #   - search, retrieve, query, list
    # Write actions (require approval):
    #   - create, update, send, post
    # Destructive actions (human-in-the-loop):
    #   - delete, execute, transfer, modify

  # Action Approval Workflow:
  approval:
    enabled: true
    # Require: human approval for destructive actions
    # Timeout: 30 seconds (then block)
    # Log: all approval requests
    # Alert: on auto-blocked actions` },
  { id: "ACC-3", title: "Capability Scoping", desc: "Scope AI agent capabilities to their specific task domain. Prevent capability creep.", code: `# Moltbot capability scoping:
capability_scoping:
  enabled: true

  # Domain Restrictions:
  domains:
    enabled: true
    # Scope: agent to specific business domain
    # Example: sales agent
    #   - CRM access only
    #   - No: IT systems, HR data
    # Example: IT support agent
    #   - Ticketing system only
    #   - No: production systems

  # Data Scope:
  data:
    enabled: true
    # Restrict: data access by agent type
    # PII: only agents with explicit PII grant
    # Financial: only finance agents
    # IP: only authorized agents

  # Temporal Scoping:
  temporal:
    enabled: true
    # Limit: capability duration
    # Expire: temporary capabilities
    # Review: capability grants quarterly
    # Revoke: unused capabilities` },
  { id: "ACC-4", title: "Capability Monitoring", desc: "Monitor AI agent capability usage. Detect capability abuse and anomalies.", code: `# Moltbot capability monitoring:
capability_monitoring:
  enabled: true

  # Usage Analytics:
  analytics:
    enabled: true
    # Track: capability usage per agent
    # Baseline: normal usage patterns
    # Detect: deviations from baseline
    # Alert: on anomalous usage

  # Abuse Detection:
  abuse_detection:
    enabled: true
    # Detect: unusual data access patterns
    # Detect: high-volume operations
    # Detect: access outside business hours
    # Alert: immediate on abuse indicators

  # Capability Audit Log:
  audit:
    enabled: true
    # Log: all capability usage
    # Include: agent, action, target, timestamp
    # Retain: 90 days
    # Protect: log integrity` },
]

const FAQ = [
  { q: "Why is AI agent capability control critical for security?", a: "AI agents can take real-world actions — unlike traditional chatbots. An unconstrained AI agent that can call APIs, execute code, or delete files is extremely dangerous if compromised via prompt injection or misaligned goals. Capability control enforces the principle of least privilege: agents can only do what they are explicitly authorized to do. This limits blast radius when an agent is manipulated — a customer service agent with only knowledge base access cannot delete production data even if injected with malicious instructions." },
  { q: "How do I implement a default-deny capability model?", a: "Implement default-deny by: 1) Start with no capabilities — no agent has any tool access by default. 2) Explicitly grant capabilities — document why each capability is granted. 3) Use capability roles — define capability bundles for agent types (read-only, writer, executor). 4) Require approval for dangerous capabilities — human-in-the-loop for delete, execute, transfer. 5) Review quarterly — remove unused capabilities. 6) Audit all capability grants — log who granted what and why. This is the same model as zero-trust networking applied to AI agents." },
  { q: "What is the difference between tool access control and action allowlisting?", a: "Tool access control restricts which tools an agent can invoke (e.g., only knowledge_base_search, not code_executor). Action allowlisting restricts what actions within a tool are permitted (e.g., knowledge_base_search:read is allowed, knowledge_base_search:delete is not). Together they provide two layers: 1) Tool-level — which tools can the agent call? 2) Action-level — within each tool, what operations are permitted? Implementing both layers is defense in depth." },
  { q: "How does capability control interact with agentic workflow chains?", a: "In multi-agent workflows, capability control must be enforced at each step: 1) Agent A cannot grant Agent B capabilities it doesn't have (no privilege escalation). 2) Each agent operates with its own capability scope, even within a chain. 3) Tool outputs don't inherit the capabilities of the tool that generated them. 4) Human-in-the-loop approvals should be required at each destructive step, not just the first. 5) Audit logs must capture the full capability chain for forensics. Design workflows with explicit capability boundaries between agents." },
]

export default function AiAgentCapabilityControlPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Capability Control", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "AI Agent Capability Control Guide", "AI Agent Capability Control Guide"), description: pick(isDE, "AI Agent Capability Control", "AI agent capability control"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Capability-Control-Guide für eigene KI-Agenten-Systeme.", "Capability control guide for your own AI agent systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Capability Control</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Capability Control", "AI Agent Capability Control")}</h1>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">{pick(isDE, "Ein unkontrollierter KI-Agent mit Zugriff auf alle Tools ist eine Zeitbombe — Prompt Injection kann ihn alles löschen lassen. Vier Kontrollen: Tool Access Control, Action Allowlisting, Capability Scoping und Capability Monitoring.", "An unconstrained AI agent with access to all tools is a ticking bomb — prompt injection can make it delete everything. Four controls: tool access control, action allowlisting, capability scoping and capability monitoring.")}</p>
          <LastUpdated
            date="2026-05-04"
            publishedDate="2026-04-28"
            locale={locale}
            showPublished={true}
            className="mb-4"
          />
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Capability Control? Einfach erklärt", "What is AI Agent Capability Control? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Capability Control kontrolliert was KI-Agenten tun dürfen: Tool Access Control definiert Per-Agent Tool Allowlists mit Permission Matrix (Read/Write/Execute/Delete) und Tool Call Rate Limiting. Action Allowlisting implementiert Default-Deny mit Action Categories (Read-only/Write/Destructive) und Approval Workflow für destruktive Actions. Capability Scoping beschränkt Capabilities auf Domains, Data Scope (PII/Financial/IP nur für autorisierte Agents) und Temporal Scoping mit Capability Expiration. Capability Monitoring trackt Usage Analytics, Abuse Detection und Capability Audit Logs.", "AI agent capability control controls what AI agents can do: tool access control defines per-agent tool allowlists with permission matrix (read/write/execute/delete) and tool call rate limiting. Action allowlisting implements default-deny with action categories (read-only/write/destructive) and approval workflow for destructive actions. Capability scoping restricts capabilities to domains, data scope (PII/financial/IP only for authorized agents) and temporal scoping with capability expiration. Capability monitoring tracks usage analytics, abuse detection and capability audit logs.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Capability-Control-Kontrollen", "Jump to capability control controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Capability-Control-Kontrollen", "4 Capability Control Controls")}</h2>
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
            <a href={`/${locale}/moltbot/ai-agent-goal-alignment-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Goal Alignment Security", "AI Agent Goal Alignment Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Goal-Alignment", "Goal alignment")}</div>
            </a>
            <a href={`/${locale}/moltbot/agent-tool-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Agent Tool Security", "Agent Tool Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Tool-Security", "Tool security")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-behavioral-monitoring`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Behavioral Monitoring", "AI Agent Behavioral Monitoring")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Behavioral-Monitoring", "Behavioral monitoring")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
            </a>
          </div>
        </section>

        {/* E-E-A-T AuthorBox */}
        <AuthorBox
          locale={locale}
          variant="full"
          className="mb-8"
        />
      </div>
    </div>
  )
}
