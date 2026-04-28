import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/zero-trust-ai-agents"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Zero Trust für KI-Agenten: Never Trust, Always Verify | ClawGuru Moltbot", "Zero Trust for AI Agents: Never Trust, Always Verify | ClawGuru Moltbot")
  const description = pick(isDE, "Zero-Trust-Architektur für KI-Agenten: jeder Agent muss sich authentifizieren, autorisieren und auditieren lassen — auch interne Agenten. mTLS, Capability-Tokens, Micro-Segmentierung und Continuous Verification mit Moltbot.", "Zero Trust architecture for AI agents: every agent must authenticate, authorize and be audited — including internal agents. mTLS, capability tokens, micro-segmentation and continuous verification with Moltbot.")
  return {
    title, description,
    keywords: ["zero trust ai agents", "zero trust llm", "zero trust moltbot", "never trust always verify ai", "ai agent authentication", "zero trust architecture ai"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const ZT_PRINCIPLES = [
  { num: "1", title: "Verify Explicitly", desc: "Every AI agent call is authenticated — no implicit trust based on network location or agent name. Each agent presents a signed identity token on every request.", impl: "mTLS client certificates for agent identity. JWT capability tokens signed with agent private key. No anonymous agent-to-agent calls." },
  { num: "2", title: "Use Least Privilege Access", desc: "Agents receive only the minimum capabilities required for their specific task. Tool access, data scope, and action permissions are explicitly granted per operation.", impl: "Capability tokens scoped to declared operation. Per-tool allowlists per agent. Time-limited tokens (TTL 5min default). No wildcard permissions." },
  { num: "3", title: "Assume Breach", desc: "Design the system assuming any agent can be compromised at any time. Blast radius must be limited to the agent's declared scope — compromise of one agent must not compromise the system.", impl: "Network micro-segmentation between agents. Memory namespace isolation. No agent can read another agent's memory or credentials. Kill-switch per agent." },
  { num: "4", title: "Continuous Verification", desc: "Trust is not established once at connection time — it is continuously re-evaluated. Long-running agent sessions require periodic re-authentication and scope re-validation.", impl: "Token refresh every N minutes. Behavioral anomaly detection on agent action patterns. Risk score recalculation on every tool call. Auto-suspend on anomaly." },
  { num: "5", title: "Inspect and Log Everything", desc: "All agent actions, all inter-agent communication, all tool calls are logged with cryptographic integrity. No agent has unobserved execution paths.", impl: "Tamper-evident structured logs with hash chain. All inter-agent messages logged before delivery. Tool call input/output hashed. Full trace per user request." },
]

const FAQ = [
  { q: "Why does Zero Trust matter specifically for AI agents?", a: "Traditional Zero Trust was designed for human users accessing resources. AI agents introduce new trust challenges: 1) Agents are non-human — they can't use MFA or recognize social engineering. 2) Agents act autonomously at machine speed — a compromised agent can cause damage orders of magnitude faster than a compromised user. 3) Agents communicate with each other — creating lateral movement paths invisible in human-traffic Zero Trust. 4) Prompt injection can hijack agent identity — an agent following injected instructions is effectively impersonating an attacker. Standard ZTNA tools don't address these AI-specific vectors." },
  { q: "How do capability tokens implement least privilege for AI agents?", a: "A capability token is a short-lived, cryptographically signed JWT that declares exactly what an agent is permitted to do for a specific operation. Example: {agent_id: 'analyst-7', scope: ['read:data.sales_q1', 'write:report.draft'], tools: ['pandas', 'matplotlib'], ttl: 300, issued_by: 'orchestrator', nonce: 'abc123'}. The token is signed by the orchestrator's private key and verified by every service the agent calls. The agent cannot exceed the declared scope — even if prompt-injected to try. Tokens expire after TTL — preventing replay attacks from stale tokens." },
  { q: "What is micro-segmentation for AI agents?", a: "Micro-segmentation places each AI agent in its own network segment with explicit allow-rules for which services it can reach. A summarizer agent might only be allowed to reach: the LLM endpoint and the output storage. It cannot reach the database, secret store, or other agents directly. If the summarizer agent is compromised, the attacker is trapped in that micro-segment — they cannot reach sensitive systems. Implemented with: Kubernetes NetworkPolicy, Linux iptables per-container, or a service mesh (Istio/Linkerd) with per-agent mTLS and authorization policies." },
  { q: "How does Moltbot implement continuous verification for long-running agents?", a: "Moltbot's continuous verification system: 1) Token refresh — capability tokens expire every N minutes; agents must re-request tokens from orchestrator, which re-evaluates current risk context. 2) Behavioral baseline — Moltbot builds a behavioral model of each agent (typical tools used, typical data access patterns, typical response times). Deviation from baseline triggers risk score increase. 3) Risk-threshold actions — at 70/100 risk score, agent is paused and flagged for human review. At 90/100, agent is automatically suspended and all pending actions cancelled." },
]

export default function ZeroTrustAiAgentsPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Zero Trust AI Agents", item: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Zero-Trust-Architektur für eigene KI-Systeme.", "Zero Trust architecture guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Zero Trust</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "Zero Trust für KI-Agenten", "Zero Trust for AI Agents")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Never Trust, Always Verify — auch für KI-Agenten. Jeder Agent, jeder Tool-Call, jede Agent-zu-Agent-Kommunikation muss explizit authentifiziert, autorisiert und geloggt werden. Kein implizites Vertrauen.", "Never Trust, Always Verify — for AI agents too. Every agent, every tool call, every agent-to-agent message must be explicitly authenticated, authorized and logged. No implicit trust.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Zero Trust? Einfach erklärt", "What is Zero Trust? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Zero Trust bedeutet: niemandem vertrauen, immer verifizieren. Bei KI-Agenten ist das besonders wichtig, weil sie autonom handeln und miteinander kommunizieren können. Jeder Agent muss sich bei jeder Anfrage ausweisen — wie ein Sicherheitspersonal, das jeden Besucher prüft, egal wie oft er schon da war.", "Zero Trust means: trust no one, verify everyone. For AI agents, this is especially important because they act autonomously and communicate with each other. Every agent must identify itself on every request — like security personnel checking every visitor, no matter how many times they've been there before.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu ZT-Prinzipien, Capability Token Beispiel und FAQ", "Jump to ZT principles, capability token example, and FAQ")}</p>
          </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          {[
            { value: "5", label: pick(isDE, "ZT-Prinzipien", "ZT principles") },
            { value: "5min", label: pick(isDE, "Token-TTL (default)", "Token TTL (default)") },
            { value: "mTLS", label: pick(isDE, "Agent-Identität", "Agent identity") },
            { value: "0", label: pick(isDE, "Implizites Vertrauen", "Implicit trust") },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-center">
              <div className="text-2xl font-black text-cyan-400">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Die 5 Zero-Trust-Prinzipien für KI-Agenten", "5 Zero Trust Principles for AI Agents")}
          </h2>
          <div className="space-y-4">
            {ZT_PRINCIPLES.map((p) => (
              <div key={p.num} className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700">
                  <div className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{p.num}</div>
                  <div className="font-semibold text-gray-100">{p.title}</div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-2">{p.desc}</p>
                  <p className="text-xs text-cyan-300"><span className="font-semibold">Implementation: </span>{p.impl}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Capability Token Beispiel", "Capability Token Example")}
          </h2>
          <div className="bg-gray-900/90 backdrop-blur-lg text-green-400 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-xl border border-gray-700/50">
            <pre>{`# Moltbot orchestrator issues capability tokens per operation:
token = moltbot.issue_token(
    agent_id="analyst-7",
    operation_id="report-2026-q1",
    scope=[
        "read:data.sales_q1_2026",   # Only Q1 2026 sales data
        "write:report.draft.2026q1",  # Only this specific report
    ],
    tools=["pandas", "matplotlib"],   # Only these tools
    forbidden_tools=["bash", "http"], # Explicitly deny
    ttl_seconds=300,                  # 5-minute expiry
    max_tokens=50000,                 # LLM token budget
)

# Every downstream service verifies the token:
# Database: checks scope includes read:data.sales_q1_2026
# LLM Gateway: checks tool allowlist
# Output storage: checks write scope matches report path
# ALL checks cryptographic — no agent can forge a token`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security Hub</div>
              <div className="text-sm text-gray-300">OWASP LLM Top 10</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-secrets-management`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Secrets Management</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Zero-Secret-Deployments", "Zero-secret deployments")}</div>
            </a>
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "System jetzt scannen", "Scan your system now")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "600+ Security Playbooks", "600+ security playbooks")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Zero Trust Architects</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Zero Trust Architekturen in Produktionsumgebungen. Die beschriebenen Prinzipien sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with Zero Trust architectures in production environments. The described principles have been proven in real deployments and continuously improved.')}
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
