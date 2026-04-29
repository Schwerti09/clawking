import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-rbac"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent RBAC: Role-Based Access Control für KI-Agenten | ClawGuru", "AI Agent RBAC: Role-Based Access Control for AI Agents | ClawGuru")
  const description = pick(isDE, "RBAC-Design für KI-Agenten: Rollen, Berechtigungen und Tool-Zugriff nach Least-Privilege-Prinzip. Moltbot RBAC-Konfiguration, Dynamic Permission Scoping und Agent Identity Management.", "RBAC design for AI agents: roles, permissions and tool access following least-privilege principles. Moltbot RBAC configuration, dynamic permission scoping and agent identity management.")
  return {
    title, description,
    keywords: ["ai agent rbac", "llm agent permissions", "ai agent access control", "moltbot rbac", "agent least privilege", "ai agent identity"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const RBAC_ROLES = [
  { role: "read-only-analyst", desc: "Can query data sources and generate reports. No write access to any system.", tools: ["database.query", "files.read", "reports.generate"], denied: ["database.write", "files.write", "api.post", "shell.exec"], color: "green" },
  { role: "support-agent", desc: "Can read customer data, create tickets, send predefined notifications. No access to infrastructure.", tools: ["crm.read", "tickets.create", "notifications.send_template"], denied: ["crm.delete", "billing.modify", "infrastructure.*", "shell.exec"], color: "blue" },
  { role: "ops-agent", desc: "Can read infrastructure state and trigger pre-approved runbooks. No free-form shell access.", tools: ["k8s.get", "k8s.scale_approved", "runbooks.execute_approved", "metrics.read"], denied: ["k8s.delete", "shell.exec", "secrets.read", "iam.modify"], color: "yellow" },
  { role: "security-scanner", desc: "Can scan and report. Cannot modify any security configuration or access sensitive data.", tools: ["trivy.scan", "openclaw.assess", "reports.create"], denied: ["config.modify", "secrets.read", "network.modify", "users.read"], color: "red" },
]

const CONFIG_EXAMPLE = `# Moltbot RBAC configuration
agent_roles:
  read-only-analyst:
    description: "Data analysis agent — read-only"
    tools:
      allowed:
        - database.query
        - files.read
        - reports.generate
      denied:
        - "database.*write*"
        - "files.*write*"
        - "shell.*"
      default_deny: true   # Deny everything not explicitly allowed

  support-agent:
    description: "Customer support agent"
    tools:
      allowed:
        - crm.read
        - tickets.create
        - notifications.send_template
      denied:
        - "crm.delete"
        - "billing.*"
        - "infrastructure.*"
      rate_limits:
        tickets.create: {max: 50, window: "1h"}  # Rate limit sensitive ops
      require_approval:
        - notifications.send_bulk  # Human approval for bulk sends

# Bind agents to roles at deployment time
agents:
  customer-support-prod:
    role: support-agent
    identity:
      type: workload_identity  # K8s ServiceAccount — not API key
      service_account: moltbot-support-agent
      namespace: moltbot-agents`

const FAQ = [
  { q: "Why do AI agents need RBAC instead of just trusting the agent?", a: "AI agents are not deterministic systems — even a well-designed agent can produce unexpected actions due to prompt injection, model drift, or ambiguous instructions. RBAC provides a security layer that is independent of the agent's behavior: even if a prompt injection causes an agent to 'want' to delete a database, the RBAC layer prevents the tool call from executing. This is defense in depth: the agent's prompt hardening tries to prevent malicious behavior, RBAC ensures that even if prompt hardening fails, the blast radius is limited to what the role permits." },
  { q: "How should I scope tool permissions for different agent types?", a: "Follow strict least-privilege: 1) List every tool the agent needs for its normal operation. 2) Start with all denied. 3) Add only the minimum tool permissions for normal operation. 4) For sensitive tools (write, delete, modify): consider requiring human approval or rate limiting. 5) Never grant wildcard permissions (database.*) — enumerate specific operations. 6) Periodically audit: review what tools agents actually used (from audit logs) vs. what they're permitted. Remove unused permissions. The rule: an agent should not be able to do anything that wouldn't be permitted if the worst-case prompt injection succeeds." },
  { q: "How does Moltbot handle agent identity for RBAC?", a: "Moltbot supports three identity types for agents: 1) Workload Identity (recommended for Kubernetes): Kubernetes ServiceAccount → IRSA (AWS) or Workload Identity (GCP/Azure). No API keys stored in the pod. Permissions managed at the RBAC layer. 2) Signed JWT: agent presents a short-lived signed JWT (1-hour TTL) issued by Moltbot's identity service. JWT includes role claim. 3) API Key (not recommended for production): static API key mapped to role. Avoid — keys can be exfiltrated by compromised agents. Moltbot enforces that agents cannot escalate their own permissions — role assignment is only possible via the Moltbot control plane, not from within an agent." },
  { q: "Should different instances of the same agent have different RBAC roles?", a: "Yes, where possible. Context-based role variation: a support agent handling general inquiries vs. one handling VIP/financial customers should have different permission scopes. Environment-based variation: production agents should have more restricted permissions than staging agents. User-context-based variation (dynamic scoping): Moltbot supports dynamic permission scoping — the agent's effective permissions are the intersection of its role permissions and the permissions of the end user it's acting on behalf of. Example: agent role allows crm.read, but if the user only has permission to read their own record, the agent's effective permission is crm.read_own_record only." },
]

export default function AiAgentRbacPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent RBAC", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ]

  const colorMap: Record<string, string> = { green: "bg-green-900 border-green-700", blue: "bg-blue-900 border-blue-700", yellow: "bg-yellow-900 border-yellow-700", red: "bg-red-900 border-red-700" }
  const textMap: Record<string, string> = { green: "text-green-300", blue: "text-blue-300", yellow: "text-yellow-300", red: "text-red-300" }

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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "RBAC-Leitfaden für eigene KI-Agent-Systeme.", "RBAC guide for your own AI agent systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Agent RBAC</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "AI Agent RBAC: Role-Based Access Control", "AI Agent RBAC: Role-Based Access Control")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "KI-Agenten brauchen RBAC — nicht weil man ihnen misstraut, sondern weil Prompt Injection passiert. RBAC ist die letzte Verteidigungslinie: selbst ein kompromittierter Agent kann nur tun, was seine Rolle erlaubt.", "AI agents need RBAC — not because you distrust them, but because prompt injection happens. RBAC is the last line of defense: even a compromised agent can only do what its role permits.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist RBAC für KI-Agenten? Einfach erklärt", "What is RBAC for AI Agents? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Role-Based Access Control (RBAC) für KI-Agenten funktioniert wie ein Berechtigungssystem für Mitarbeiter: jeder Agent hat eine Rolle mit spezifischen Rechten. Ein 'read-only-analyst' Agent darf nur Daten lesen, nicht schreiben. Ein 'support-agent' darf Tickets erstellen, aber nicht löschen. Ein 'ops-agent' darf nur vorab genehmigte Runbooks ausführen, keine Shell-Befehle. RBAC ist kritisch, weil Prompt Injection einen Agent dazu bringen kann, Dinge zu tun, die er nicht tun sollte — RBAC verhindert, dass solche kompromittierten Agenten Schaden anrichten.", "Role-Based Access Control (RBAC) for AI agents works like a permission system for employees: each agent has a role with specific rights. A 'read-only-analyst' agent can only read data, not write. A 'support-agent' can create tickets, but not delete. An 'ops-agent' can only execute pre-approved runbooks, no shell commands. RBAC is critical because prompt injection can cause an agent to do things it shouldn't — RBAC prevents such compromised agents from causing damage.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Standard-Rollen, Konfiguration und FAQ", "Jump to standard roles, configuration, and FAQ")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Standard-Agenten-Rollen", "4 Standard Agent Roles")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RBAC_ROLES.map((r) => (
              <div key={r.role} className={`${colorMap[r.color]}/80 backdrop-blur-lg border rounded-xl p-4 hover:border-cyan-500/30 transition-all duration-300 shadow-xl`}>
                <div className={`font-mono text-sm font-bold ${textMap[r.color]} mb-2`}>{r.role}</div>
                <p className="text-xs text-gray-300 mb-3">{r.desc}</p>
                <div className="text-xs text-green-400 mb-1">✓ {pick(isDE, "Erlaubt:", "Allowed:")}</div>
                <ul className="text-xs text-green-300 mb-2">{r.tools.map((t) => <li key={t}>▸ {t}</li>)}</ul>
                <div className="text-xs text-red-400 mb-1">✗ {pick(isDE, "Blockiert:", "Blocked:")}</div>
                <ul className="text-xs text-red-300">{r.denied.map((d) => <li key={d}>▸ {d}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Moltbot RBAC Konfiguration", "Moltbot RBAC Configuration")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-xs overflow-x-auto">
            <pre>{CONFIG_EXAMPLE}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 hover:border-cyan-500/30 transition-all duration-300">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/zero-trust-ai-agents`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Zero Trust AI Agents</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Capability Tokens", "Capability tokens")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-secrets-management`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Secrets Management</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Agent Secrets", "Agent secrets")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-incident-response`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Incident Response</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Wenn RBAC umgangen wird", "When RBAC gets bypassed")}</div>
            </a>
            <a href={`/${locale}/solutions/zero-trust-architecture`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Zero Trust Architecture</div>
              <div className="text-sm text-gray-300">{pick(isDE, "RBAC im ZT-Kontext", "RBAC in ZT context")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit RBAC-Implementierungen für KI-Agenten in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with RBAC implementations for AI agents in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
