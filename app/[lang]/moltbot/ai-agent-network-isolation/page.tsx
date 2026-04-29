import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-network-isolation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Network Isolation: Netzwerk-Isolierung für AI-Agents | ClawGuru", "AI Agent Network Isolation: Network Isolation for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Network Isolation für Moltbot. Network Policies, Micro-Segmentation, Egress Control und Air-Gapped Deployments für maximale AI-Agent-Sicherheit.", "AI agent network isolation for Moltbot. Network policies, micro-segmentation, egress control and air-gapped deployments for maximum AI agent security.")
  return {
    title, description,
    keywords: ["ai agent network isolation", "network policies", "micro segmentation", "egress control", "air gapped", "moltbot security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentNetworkIsolationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Network Isolation", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Network Isolation Guide", "Moltbot AI Agent Network Isolation Guide"), description: pick(isDE, "AI Agent Network Isolation", "AI agent network isolation"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Network-Isolierungs-Guide für eigene KI-Systeme.", "Network isolation guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Network Isolation</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Network Isolation", "AI Agent Network Isolation")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Network Isolation für Moltbot. Network Policies, Micro-Segmentation, Egress Control und Air-Gapped Deployments für maximale AI-Agent-Sicherheit.", "AI agent network isolation for Moltbot. Network policies, micro-segmentation, egress control and air-gapped deployments for maximum AI agent security.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Network Isolation? Einfach erklärt", "What is Network Isolation? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Network Isolation ist wie eine Firewall für AI-Agents: es kontrolliert, mit wem sie sprechen dürfen und was sie nach außen senden können. Network Policies definieren Regeln für Pod-zu-Pod-Kommunikation. Micro-Segmentation unterteilt das Netzwerk in isolierte Zonen. Egress Control beschränkt ausgehende Verbindungen auf erlaubte Endpunkte. Service Mesh Security verschlüsselt alle internen Verbindungen mit mTLS. DNS Security sichert die Namensauflösung. Ohne Network Isolation können AI-Agents lateral durch das Netzwerk bewegen, Daten exfiltrieren oder mit kompromittierten Endpunkten kommunizieren.", "Network isolation is like a firewall for AI agents: it controls who they can talk to and what they can send out. Network policies define rules for pod-to-pod communication. Micro-segmentation divides the network into isolated zones. Egress control restricts outgoing connections to allowed endpoints. Service mesh security encrypts all internal connections with mTLS. DNS security secures name resolution. Without network isolation, AI agents can move laterally through the network, exfiltrate data, or communicate with compromised endpoints.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Network Policies", pick(isDE, "Kubernetes Network Policies für granulare Pod-zu-Pod Kommunikationskontrolle. Default-Deny und explizite Allowlists.", "Kubernetes Network Policies for granular pod-to-pod communication control. Default-deny and explicit allowlists.")],
              ["2. Micro-Segmentation", pick(isDE, "Feinkörnige Netzwerk-Segmentierung für jeden AI-Agent-Typ. Verhindert laterale Bewegung bei Kompromittierung.", "Fine-grained network segmentation for each AI agent type. Prevents lateral movement on compromise.")],
              ["3. Egress Control", pick(isDE, "Strikte Kontrolle ausgehender Verbindungen von AI-Agents. Nur explizit erlaubte externe Endpunkte erreichbar.", "Strict control of outgoing connections from AI agents. Only explicitly allowed external endpoints reachable.")],
              ["4. Service Mesh Security", pick(isDE, "mTLS für alle Service-zu-Service Kommunikation über Istio oder Linkerd. Verschlüsselung und Authentifizierung im Cluster.", "mTLS for all service-to-service communication via Istio or Linkerd. Encryption and authentication in the cluster.")],
              ["5. DNS Security", pick(isDE, "Sichere DNS-Auflösung für AI-Agents. DNS-over-TLS, DNSSEC und Filterung von Malicious Domains.", "Secure DNS resolution for AI agents. DNS-over-TLS, DNSSEC and filtering of malicious domains.")],
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
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "eBPF-basierte Netzwerksicherheit", "eBPF-based Network Security")}</h3><p className="text-sm text-green-200">{pick(isDE, "Cilium mit eBPF für hochperformante Netzwerkpolicies. L7-Sichtbarkeit ohne Performance-Einbußen.", "Cilium with eBPF for high-performance network policies. L7 visibility without performance overhead.")}</p></div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Air-Gapped Deployments", "Air-Gapped Deployments")}</h3><p className="text-sm text-blue-200">{pick(isDE, "Vollständig isolierte AI-Agent-Deployments ohne Internet-Zugang. Für hochsensible Anwendungsfälle.", "Fully isolated AI agent deployments without internet access. For highly sensitive use cases.")}</p></div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Network Traffic Analysis", "Network Traffic Analysis")}</h3><p className="text-sm text-yellow-200">{pick(isDE, "Echtzeit-Analyse des Netzwerkverkehrs auf Anomalien. Erkennung von Data Exfiltration und C2-Kommunikation.", "Real-time network traffic analysis for anomalies. Detection of data exfiltration and C2 communication.")}</p></div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Private Endpoints", "Private Endpoints")}</h3><p className="text-sm text-red-200">{pick(isDE, "Alle Cloud-Service-Verbindungen über Private Endpoints. Kein Traffic über Public Internet für sensitive Daten.", "All cloud service connections via private endpoints. No traffic over public internet for sensitive data.")}</p></div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "Netzwerk-Topologie planen", "Plan network topology"), pick(isDE, "AI-Agent-Netzwerke segmentieren. DMZ für externe Agents, interne Zone für sensitive Verarbeitung.", "Segment AI agent networks. DMZ for external agents, internal zone for sensitive processing.")],
              [2, pick(isDE, "Default-Deny Policy einrichten", "Set up default-deny policy"), pick(isDE, "Kubernetes NetworkPolicy mit Default-Deny für alle Pods. Dann explizite Allowlists definieren.", "Kubernetes NetworkPolicy with default-deny for all pods. Then define explicit allowlists.")],
              [3, pick(isDE, "Egress-Filterung aktivieren", "Enable egress filtering"), pick(isDE, "Ausgehende Verbindungen auf erlaubte Endpunkte beschränken. FQDN-basierte Policies mit Cilium.", "Restrict outgoing connections to allowed endpoints. FQDN-based policies with Cilium.")],
              [4, pick(isDE, "Service Mesh deployen", "Deploy service mesh"), pick(isDE, "Istio oder Linkerd für mTLS im Cluster einrichten. Alle Agent-zu-Agent-Verbindungen verschlüsselt.", "Set up Istio or Linkerd for mTLS in the cluster. All agent-to-agent connections encrypted.")],
              [5, pick(isDE, "Netzwerk-Monitoring aktivieren", "Enable network monitoring"), pick(isDE, "Network Flow Logs aktivieren und an SIEM weiterleiten. Alerts bei ungewöhnlichen Verbindungen.", "Enable network flow logs and forward to SIEM. Alerts on unusual connections.")],
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Network Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Network-Isolierungs-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with network isolation implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
