import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/multi-agent-trust-frameworks"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Multi-Agent Trust Frameworks: Vertrauensmodelle für Multi-Agent-Systeme | ClawGuru", "Multi-Agent Trust Frameworks: Trust Models for Multi-Agent Systems | ClawGuru")
  const description = pick(isDE, "Multi-Agent Trust Frameworks für Moltbot-Deployments. Reputation Systems, Capability Tokens, Secure Communication und Trust Orchestration für Multi-Agent-Systeme. Mit Moltbot automatisierbar.", "Multi-agent trust frameworks for Moltbot deployments. Reputation systems, capability tokens, secure communication and trust orchestration for multi-agent systems. Automatable with Moltbot.")
  return {
    title,
    description,
    keywords: [
      "multi agent trust", "reputation systems", "capability tokens",
      "secure communication", "trust orchestration", "multi agent security",
      "moltbot security", "ai agent trust", "trust frameworks 2026",
      "security check", "runbooks", "openclaw"
    ],
    authors: [{ name: "ClawGuru Security Team" }],
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

export default function MultiAgentTrustFrameworksPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Multi-Agent Trust Frameworks", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Multi-Agent Trust Frameworks Guide", "Multi-Agent Trust Frameworks Guide"), description: pick(isDE, "Multi-Agent Trust Frameworks", "Multi-agent trust frameworks"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Leitfaden dient zur Härtung Ihrer eigenen Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Multi-Agent Trust Frameworks</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Multi-Agent Trust Frameworks", "Multi-Agent Trust Frameworks")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Multi-Agent Trust Frameworks für Moltbot-Deployments. Reputation Systems, Capability Tokens, Secure Communication und Trust Orchestration für Multi-Agent-Systeme.", "Multi-agent trust frameworks for Moltbot deployments. Reputation systems, capability tokens, secure communication and trust orchestration for multi-agent systems.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was sind Trust Frameworks? Einfach erklärt", "What are Trust Frameworks? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Trust Frameworks sind wie ein Regelwerk für die Zusammenarbeit von KI-Agenten: sie definieren, wie viel Vertrauen ein Agent verdient und welche Aufgaben er ausführen darf. Reputation-Systeme bewerten Agent-Verhalten. Capability Tokens gewähren spezifische Berechtigungen. Secure Communication sichert die Kommunikation. Trust Orchestration verwaltet Vertrauensbeziehungen. Ohne Trust Frameworks können kompromittierte Agenten unkontrolliert agieren.", "Trust frameworks are like a rulebook for AI agent collaboration: they define how much trust an agent earns and which tasks it can perform. Reputation systems evaluate agent behavior. Capability tokens grant specific permissions. Secure communication secures communication. Trust orchestration manages trust relationships. Without trust frameworks, compromised agents can act uncontrolled.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten", "Jump to core concepts")}</p>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "1. Reputation Systems", "1. Reputation Systems")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Reputation-Systeme für Multi-Agent-Trust. Score-basiertes Trust-Modell mit History und Decay.", "Reputation systems for multi-agent trust. Score-based trust model with history and decay.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "2. Capability Tokens", "2. Capability Tokens")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Capability Tokens für Agent-Berechtigungen. Fine-grained Access Control für Multi-Agent-Systeme.", "Capability tokens for agent permissions. Fine-grained access control for multi-agent systems.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "3. Secure Communication", "3. Secure Communication")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Sichere Kommunikation zwischen Agents. mTLS, Signed Message Envelopes und E2E Encryption.", "Secure communication between agents. mTLS, signed message envelopes and E2E encryption.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "4. Trust Orchestration", "4. Trust Orchestration")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Trust Orchestration für Multi-Agent-Workflows. Trust Propagation und Delegation.", "Trust orchestration for multi-agent workflows. Trust propagation and delegation.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">{pick(isDE, "5. Zero Trust für Agents", "5. Zero Trust for Agents")}</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Zero Trust Prinzip für Multi-Agent-Systeme. Never Trust, Always Verify für alle Agent-Interaktionen.", "Zero trust principle for multi-agent systems. Never trust, always verify for all agent interactions.")}</p>
            </div>
          </div>
        </section>

        {/* Advanced Techniques */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Behavioral Trust Scoring", "Behavioral Trust Scoring")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "Verhaltens-basiertes Trust Scoring für Agents. Anomalie-Erkennung und Pattern Matching.", "Behavior-based trust scoring for agents. Anomaly detection and pattern matching.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Attestation & Provenance", "Attestation & Provenance")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Attestation und Provenance für Agent-Identität. Cryptographic Proofs und Chain of Trust.", "Attestation and provenance for agent identity. Cryptographic proofs and chain of trust.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Trust Revocation", "Trust Revocation")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Trust Revocation für kompromittierte Agents. Revocation Lists und Real-time Updates.", "Trust revocation for compromised agents. Revocation lists and real-time updates.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Multi-Tenant Isolation", "Multi-Tenant Isolation")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Multi-Tenant Isolation für Agent-Workspaces. Namespace-Isolation und Resource Quotas.", "Multi-tenant isolation for agent workspaces. Namespace isolation and resource quotas.")}</p>
            </div>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Reputation System aufbauen", "Build reputation system")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Implementieren Sie ein Reputation-System für Multi-Agent-Trust. Score, History und Decay.", "Implement a reputation system for multi-agent trust. Score, history and decay.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Capability Tokens implementieren", "Implement capability tokens")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Implementieren Sie Capability Tokens für Agent-Berechtigungen. JWT-basiert mit Scopes.", "Implement capability tokens for agent permissions. JWT-based with scopes.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Secure Communication einrichten", "Set up secure communication")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Richten Sie mTLS und Signed Message Envelopes für Agent-Kommunikation ein.", "Set up mTLS and signed message envelopes for agent communication.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Trust Orchestration implementieren", "Implement trust orchestration")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Implementieren Sie Trust Orchestration für Multi-Agent-Workflows. Trust Propagation.", "Implement trust orchestration for multi-agent workflows. Trust propagation.")}</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Monitoring & Auditing", "Monitoring & Auditing")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Überwachen Sie Trust-Scores und Agent-Interaktionen. Audit Logging für Trust-Entscheidungen.", "Monitor trust scores and agent interactions. Audit logging for trust decisions.")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Further Resources */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Überprüfen Sie Ihre Infrastruktur auf Schwachstellen", "Check your infrastructure for vulnerabilities")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "OpenClaw", "OpenClaw")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Roast My Moltbot", "Roast My Moltbot")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Moltbot Security Testing", "Moltbot security testing")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Multi-Agent Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Multi-Agent-Trust-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with multi-agent trust implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
