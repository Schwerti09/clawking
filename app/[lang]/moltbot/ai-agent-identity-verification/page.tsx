import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-identity-verification"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Identity Verification: Identitätsverifizierung für AI-Agents | ClawGuru", "AI Agent Identity Verification: Identity Verification for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Identity Verification für Moltbot. SPIFFE/SPIRE, mTLS, Agent Attestation und starke Authentifizierung für AI-Agent-Identitäten in Zero-Trust-Architekturen.", "AI agent identity verification for Moltbot. SPIFFE/SPIRE, mTLS, agent attestation and strong authentication for AI agent identities in zero-trust architectures.")
  return {
    title, description,
    keywords: ["ai agent identity verification", "spiffe spire", "agent attestation", "mtls", "zero trust identity", "moltbot security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentIdentityVerificationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Identity Verification", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          ...jsonLd,
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Identity Verification Guide", "Moltbot AI Agent Identity Verification Guide"), description: pick(isDE, "AI Agent Identity Verification", "AI agent identity verification"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Identity-Verifizierungs-Guide für eigene KI-Systeme.", "Identity verification guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Identity Verification</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Identity Verification", "AI Agent Identity Verification")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Identity Verification für Moltbot. SPIFFE/SPIRE, mTLS, Agent Attestation und starke Authentifizierung für AI-Agent-Identitäten in Zero-Trust-Architekturen.", "AI agent identity verification for Moltbot. SPIFFE/SPIRE, mTLS, agent attestation and strong authentication for AI agent identities in zero-trust architectures.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Identity Verification? Einfach erklärt", "What is Identity Verification? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Identity Verification ist wie ein digitaler Ausweis für AI-Agents: es stellt sicher, dass jeder Agent wirklich der ist, der er vorgibt zu sein. SPIFFE/SPIRE ist ein Framework für kryptographische Identitäten. Agent Attestation verifiziert die Identität vor jeder Verbindung. mTLS Everywhere bedeutet gegenseitige TLS-Authentifizierung für alle Agent-Kommunikation. Short-lived Certificates rotieren automatisch ohne manuelle Eingriffe. Identity Federation ermöglicht einheitliche Identitäten über Cluster- und Cloud-Grenzen hinweg. Ohne Identity Verification können Angreifer Agent-Identitäten fälschen, Man-in-the-Middle-Angriffe durchführen oder unbefugten Zugriff erhalten.", "Identity verification is like a digital ID card for AI agents: it ensures every agent is really who they claim to be. SPIFFE/SPIRE is a framework for cryptographic identities. Agent attestation verifies identity before every connection. mTLS everywhere means mutual TLS authentication for all agent communication. Short-lived certificates rotate automatically without manual intervention. Identity federation enables unified identities across cluster and cloud boundaries. Without identity verification, attackers can forge agent identities, perform man-in-the-middle attacks, or gain unauthorized access.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. SPIFFE/SPIRE", pick(isDE, "Secure Production Identity Framework For Everyone. Kryptographische Identitäten für jeden AI-Agent-Workload.", "Secure Production Identity Framework For Everyone. Cryptographic identities for every AI agent workload.")],
              ["2. Agent Attestation", pick(isDE, "Kryptographische Verifikation der Agent-Identität vor jeder Verbindung. Hardware-basierte Attestation für maximale Sicherheit.", "Cryptographic verification of agent identity before every connection. Hardware-based attestation for maximum security.")],
              ["3. mTLS Everywhere", pick(isDE, "Mutual TLS für alle Agent-Kommunikation. Beide Seiten authentifizieren sich gegenseitig — keine Ein-Wege-Authentifizierung.", "Mutual TLS for all agent communication. Both sides authenticate each other — no one-way authentication.")],
              ["4. Short-lived Certificates", pick(isDE, "Kurzlebige X.509-Zertifikate für AI-Agent-Identitäten. Automatische Rotation ohne manuelle Eingriffe.", "Short-lived X.509 certificates for AI agent identities. Automatic rotation without manual intervention.")],
              ["5. Identity Federation", pick(isDE, "Föderierte Identitäten über Cluster- und Cloud-Grenzen hinweg. Einheitliche Identity-Policy für alle Environments.", "Federated identities across cluster and cloud boundaries. Unified identity policy for all environments.")],
            ].map(([t, d]) => (
              <div key={t as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{t}</h3>
                <p className="text-sm text-gray-300">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "TPM-basierte Attestation", "TPM-based Attestation")}</h3><p className="text-sm text-green-200">{pick(isDE, "Trusted Platform Module für hardware-gebundene Agent-Identitäten. Unveränderlicher Beweis der Agent-Integrität.", "Trusted Platform Module for hardware-bound agent identities. Immutable proof of agent integrity.")}</p></div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Continuous Authentication", "Continuous Authentication")}</h3><p className="text-sm text-blue-200">{pick(isDE, "Laufende Re-Authentifizierung von AI-Agents während aktiver Sessions. Token-Refresh und Session-Validierung.", "Ongoing re-authentication of AI agents during active sessions. Token refresh and session validation.")}</p></div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Identity Threat Detection", "Identity Threat Detection")}</h3><p className="text-sm text-yellow-200">{pick(isDE, "Erkennung von kompromittierten Agent-Identitäten. Anomalie-Detection in Authentifizierungsmustern.", "Detection of compromised agent identities. Anomaly detection in authentication patterns.")}</p></div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Emergency Identity Revocation", "Emergency Identity Revocation")}</h3><p className="text-sm text-red-200">{pick(isDE, "Sofortiger Widerruf aller Credentials bei kompromittierten Agents. Automatisierter Revocation-Prozess.", "Immediate revocation of all credentials for compromised agents. Automated revocation process.")}</p></div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "SPIRE Server deployen", "Deploy SPIRE Server"), pick(isDE, "SPIRE Server als zentralen Identity Provider einrichten. HA-Konfiguration für Production.", "Set up SPIRE Server as central identity provider. HA configuration for production.")],
              [2, pick(isDE, "SPIRE Agent auf allen Nodes", "SPIRE Agent on all nodes"), pick(isDE, "SPIRE Agent DaemonSet auf allen Kubernetes Nodes deployen. Node Attestation konfigurieren.", "Deploy SPIRE Agent DaemonSet on all Kubernetes nodes. Configure node attestation.")],
              [3, pick(isDE, "SVID-Ausstellung konfigurieren", "Configure SVID issuance"), pick(isDE, "Workload Attestation für AI-Agent-Pods konfigurieren. SPIFFE IDs nach Naming Convention vergeben.", "Configure workload attestation for AI agent pods. Assign SPIFFE IDs according to naming convention.")],
              [4, pick(isDE, "mTLS in Service Mesh", "mTLS in service mesh"), pick(isDE, "SPIRE mit Istio oder Envoy integrieren für automatisches mTLS. Cert-Manager Alternative evaluieren.", "Integrate SPIRE with Istio or Envoy for automatic mTLS. Evaluate Cert-Manager alternative.")],
              [5, pick(isDE, "Identity Monitoring einrichten", "Set up identity monitoring"), pick(isDE, "Authentication Events loggen und auf Anomalien monitoren. Alert bei unbekannten Agent-Identitäten.", "Log authentication events and monitor for anomalies. Alert on unknown agent identities.")],
            ].map(([n, t, d]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div><div className="font-semibold text-gray-100 mb-2">{t}</div><div className="text-sm text-gray-300">{d}</div></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div></a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div></a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div></a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">AI Agent Security</div><div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10", "OWASP LLM Top 10")}</div></a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Identity Verification Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Identity-Verifizierungs-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with identity verification implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
