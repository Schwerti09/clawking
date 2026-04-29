import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/secure-agent-communication"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Secure AI Agent Communication Patterns 2026 | ClawGuru", "Secure AI Agent Communication Patterns 2026 | ClawGuru")
  const description = pick(isDE, "Security patterns for AI agent-to-agent and agent-to-tool communication. mTLS, signed messages, capability tokens, and audit trails for multi-agent Moltbot systems.", "Security patterns for AI agent-to-agent and agent-to-tool communication. mTLS, signed messages, capability tokens, and audit trails for multi-agent Moltbot systems.")
  return {
    title,
    description,
    keywords: ["ai agent communication security", "multi-agent security", "agent authentication", "moltbot communication", "ai agent mtls", "capability tokens", "agent authorization"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const getPatterns = (isDE: boolean) => [
  {
    name: pick(isDE, "Pattern 1: Signed Message Envelopes", "Pattern 1: Signed Message Envelopes"),
    problem: pick(isDE, "How do you know a message from AgentB actually came from AgentB and wasn't tampered with?", "How do you know a message from AgentB actually came from AgentB and wasn't tampered with?"),
    solution: pick(isDE, "Every agent message is cryptographically signed with the sending agent's private key. Receivers verify before acting.", "Every agent message is cryptographically signed with the sending agent's private key. Receivers verify before acting."),
    risk: pick(isDE, "Without this: any process can impersonate an agent.", "Without this: any process can impersonate an agent."),
    code: `// Agent sends signed message
const payload = { action: "read_file", path: "/data/report.json", agentId: "agent-b", ts: Date.now() }
const signature = await signMessage(JSON.stringify(payload), AGENT_B_PRIVATE_KEY)
const envelope = { payload, signature, publicKey: AGENT_B_PUBLIC_KEY_ID }

// Receiver verifies
const valid = await verifySignature(JSON.stringify(envelope.payload), envelope.signature, getPublicKey(envelope.publicKey))
if (!valid) throw new Error("INVALID_AGENT_SIGNATURE — rejecting message")`
  },
  {
    name: pick(isDE, "Pattern 2: Capability Tokens", "Pattern 2: Capability Tokens"),
    problem: pick(isDE, "An orchestrator agent should only be able to grant capabilities it already has — not escalate its own permissions.", "An orchestrator agent should only be able to grant capabilities it already has — not escalate its own permissions."),
    solution: pick(isDE, "Use macaroon-style capability tokens with explicit scope lists. Agents can delegate a subset of their capabilities, never more.", "Use macaroon-style capability tokens with explicit scope lists. Agents can delegate a subset of their capabilities, never more."),
    risk: pick(isDE, "Without this: agent privilege escalation across multi-agent pipelines.", "Without this: agent privilege escalation across multi-agent pipelines."),
    code: `// Issue capability token
const token = issueCapabilityToken({
  agentId: "orchestrator-1",
  capabilities: ["read:logs", "write:reports"],  // explicit allowlist
  delegatable: ["read:logs"],  // can only delegate read access
  expires: Date.now() + 3600_000,
  issuedBy: "auth-service"
})

// Sub-agent uses delegated token
const subToken = delegateCapability(token, {
  to: "sub-agent-2",
  capabilities: ["read:logs"],  // subset only
  expires: Date.now() + 1800_000
})`
  },
  {
    name: pick(isDE, "Pattern 3: mTLS for Agent-to-Agent", "Pattern 3: mTLS for Agent-to-Agent"),
    problem: pick(isDE, "HTTP calls between agents are interceptable and spoofable without mutual authentication.", "HTTP calls between agents are interceptable and spoofable without mutual authentication."),
    solution: pick(isDE, "Issue each agent a TLS certificate. Enforce mTLS for all inter-agent communication.", "Issue each agent a TLS certificate. Enforce mTLS for all inter-agent communication."),
    risk: pick(isDE, "Without this: man-in-the-middle attacks on internal agent traffic.", "Without this: man-in-the-middle attacks on internal agent traffic."),
    code: `# Issue per-agent certificates via internal CA
vault write pki/issue/agents \\
  common_name="agent-orchestrator.moltbot.internal" \\
  ttl="24h" \\
  alt_names="agent-orchestrator,localhost"

# Agent HTTP client config (Node.js)
const agent = new https.Agent({
  cert: fs.readFileSync('/certs/agent.crt'),
  key: fs.readFileSync('/certs/agent.key'),
  ca: fs.readFileSync('/certs/internal-ca.crt'),
  rejectUnauthorized: true  // NEVER set false in production
})`
  },
]

const getChecklist = (isDE: boolean) => [
  pick(isDE, "All agent-to-agent calls use mTLS — no plain HTTP internally", "All agent-to-agent calls use mTLS — no plain HTTP internally"),
  pick(isDE, "Every message envelope includes sender ID, timestamp, and signature", "Every message envelope includes sender ID, timestamp, and signature"),
  pick(isDE, "Capability tokens with explicit scope lists — no wildcard permissions", "Capability tokens with explicit scope lists — no wildcard permissions"),
  pick(isDE, "Agent certificates rotated daily via automated vault PKI", "Agent certificates rotated daily via automated vault PKI"),
  pick(isDE, "All inter-agent calls logged with correlation IDs for full traceability", "All inter-agent calls logged with correlation IDs for full traceability"),
  pick(isDE, "Agent registry with active agent list — unlisted agents rejected", "Agent registry with active agent list — unlisted agents rejected"),
  pick(isDE, "Message replay prevention: nonce + 5-minute timestamp window", "Message replay prevention: nonce + 5-minute timestamp window"),
  pick(isDE, "Dead agent detection: heartbeat every 30s, auto-revoke on timeout", "Dead agent detection: heartbeat every 30s, auto-revoke on timeout"),
]

export default function SecureAgentCommunicationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const PATTERNS = getPatterns(isDE)
  const CHECKLIST = getChecklist(isDE)

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Secure Agent Communication", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Secure Agent Communication Guide", "Secure Agent Communication Guide"), description: pick(isDE, "AI Agent Communication Security", "AI agent communication security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Diese Patterns dienen zur Absicherung eigener Multi-Agent-Systeme. Nur defensiver Einsatz.", "These patterns are for securing your own multi-agent systems. Defensive use only.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Secure Agent Communication</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Secure AI Agent Communication Patterns 2026", "Secure AI Agent Communication Patterns 2026")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Multi-Agent-Systeme führen eine neue Angriffsfläche ein: Agent-zu-Agent-Kommunikation. Ein kompromittierter Sub-Agent kann zum gesamten Swarm pivotieren. Diese Patterns geben Ihnen kryptographisches Vertrauen zwischen Agents — nicht nur Perimeter-Security.", "Multi-agent systems introduce a new attack surface: agent-to-agent communication. One compromised sub-agent can pivot to the entire swarm. These patterns give you cryptographic trust between agents — not just perimeter security.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Secure Agent Communication? Einfach erklärt", "What is Secure Agent Communication? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Secure Agent Communication ist wie ein verschlüsselter Briefumschlag für KI-Nachrichten: jeder Agent signiert seine Nachrichten kryptographisch und authentifiziert sich mit mTLS. Capability Tokens definieren, was ein Agent darf. Signed Message Envelopes verhindern Manipulation. Replay Protection verhindert Wiedereinspielung alter Nachrichten. Ohne Secure Communication können Angreifer Nachrichten fälschen und Agents impersonieren.", "Secure agent communication is like an encrypted envelope for AI messages: every agent signs messages cryptographically and authenticates with mTLS. Capability tokens define what an agent can do. Signed message envelopes prevent tampering. Replay protection prevents replay of old messages. Without secure communication, attackers can forge messages and impersonate agents.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Security Patterns", "Jump to security patterns")}</p>
          </div>
        </section>

        <div className="bg-blue-900/80 backdrop-blur-lg border border-blue-700/50 p-5 rounded-lg mb-10 animate-fade-in-up shadow-xl" style={{animationDelay: '0.5s'}}>
          <h3 className="font-bold text-blue-300 mb-2">{pick(isDE, "Warum das 2026 wichtig ist", "Why This Matters in 2026")}</h3>
          <p className="text-sm text-blue-200">
            {pick(isDE, "Mit wachsender AI-Orchestrierung (LangGraph, CrewAI, Moltbot Multi-Agent) wird der interne Bus zwischen Agents zur kritischen Angriffsfläche. Traditionelle Netzwerk-Security hilft hier nicht — Sie brauchen <strong>identitätsbasiertes, kryptographisch erzwungenes Vertrauen</strong> auf Nachrichtenebene.", "As AI orchestration grows (LangGraph, CrewAI, Moltbot multi-agent), the internal bus between agents becomes critical attack surface. Traditional network security doesn't help here — you need <strong>identity-based, cryptographically enforced trust</strong> at the message level.")}
          </p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-100">{pick(isDE, "Security Patterns", "Security Patterns")}</h2>
          <div className="space-y-8">
            {PATTERNS.map((p) => (
              <div key={p.name} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
                <h3 className="font-bold text-cyan-400 text-lg mb-3">{p.name}</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-red-900/80 backdrop-blur-lg border border-red-700 p-3 rounded-lg">
                    <div className="text-xs font-bold text-red-300 mb-1">{pick(isDE, "PROBLEM", "PROBLEM")}</div>
                    <p className="text-sm text-red-200">{p.problem}</p>
                  </div>
                  <div className="bg-green-900/80 backdrop-blur-lg border border-green-700 p-3 rounded-lg">
                    <div className="text-xs font-bold text-green-300 mb-1">{pick(isDE, "LÖSUNG", "SOLUTION")}</div>
                    <p className="text-sm text-green-200">{p.solution}</p>
                  </div>
                </div>
                <div className="bg-orange-900/80 backdrop-blur-lg border border-orange-700 p-3 rounded-lg mb-4">
                  <p className="text-xs text-orange-200"><strong>{pick(isDE, "Ohne dies:", "Without this:")}</strong> {p.risk.replace('Without this: ', '')}</p>
                </div>
                <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto shadow-lg">
                  <pre>{p.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Production Hardening Checklist", "Production Hardening Checklist")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
            <div className="space-y-3">
              {CHECKLIST.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/ai-agent-sandboxing`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Sandboxing", "AI Agent Sandboxing")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Isolation Best Practices", "Isolation best practices")}</div>
            </a>
            <a href={`/${locale}/moltbot/prompt-injection-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Prompt Injection Defense", "Prompt Injection Defense")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Input Validation Playbook", "Input validation playbook")}</div>
            </a>
            <a href={`/${locale}/openclaw/service-mesh-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Service Mesh Security", "Service Mesh Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Istio/Linkerd mTLS Guide", "Istio/Linkerd mTLS guide")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security Hub", "AI Agent Security Hub")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10 — vollständige Defense Map", "OWASP LLM Top 10 — full defense map")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Agent Communication Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Secure Agent Communication-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with secure agent communication implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
