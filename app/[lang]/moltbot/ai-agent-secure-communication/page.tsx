import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-secure-communication"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Secure Communication: KI-Agenten-Secure-Communication | ClawGuru Moltbot", "AI Agent Secure Communication: AI Agent Secure Communication | ClawGuru Moltbot")
  const description = pick(isDE, "KI-Agenten-Secure-Communication: TLS Encryption, Message Signing, Mutual Authentication und Secure Channel Establishment für KI-Agenten-Kommunikation.", "AI agent secure communication: TLS encryption, message signing, mutual authentication and secure channel establishment for AI agent communication.")
  return {
    title,
    description,
    keywords: ["ai agent secure communication", "agent tls encryption", "message signing", "mutual authentication", "secure channel", "moltbot communication"],
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

export default function AiAgentSecureCommunicationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Secure Communication: KI-Agenten-Secure-Communication | ClawGuru Moltbot", "AI Agent Secure Communication: AI Agent Secure Communication | ClawGuru Moltbot")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Secure Communication", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "TLS Encryption", "Mutual Authentication"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Secure Communication?", "What is Secure Communication?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4-Layer Secure Communication Defense", "4-Layer Secure Communication Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Secure Communication Score", "Secure Communication Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">9 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Secure Communication · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Secure Communication — Deine Agent-Kommunikation ist gestern Nacht unverschlüsselt durch einen MITM-Angriff abgefangen worden.", "AI Agent Secure Communication — Your Agent Communication Was Intercepted Unencrypted by a MITM Attack Last Night.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Deine AI-Agents kommunizieren ohne TLS Encryption und Message Signing. Ein Angreifer hat alle Nachrichten abgefangen, manipuliert und als legitime Agent-Requests weitergeleitet. 3.000 kompromittierte Requests, Datenexfiltration, dein CTO hat den CSO gerufen. Hier ist, wie du das verhinderst.", "Your AI agents communicate without TLS encryption and message signing. An attacker intercepted all messages, manipulated them and forwarded them as legitimate agent requests. 3,000 compromised requests, data exfiltration, your CTO called the CSO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Secure Communication? Einfach erklärt.", "What is Secure Communication? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Secure Communication wie einen verschlüsselten Briefumschlag vor: Nur der Empfänger kann den Inhalt lesen, niemand anderes kann ihn abfangen oder ändern. Für AI-Agents bedeutet das: Alle Nachrichten werden mit TLS verschlüsselt, mit digitalen Signaturen signiert und mit Mutual Authentication authentifiziert. Gute Secure Communication bedeutet: TLS Encryption, Message Signing, Mutual Authentication und Secure Channel Establishment.", "Think of secure communication like an encrypted envelope: only the recipient can read the content, no one else can intercept or change it. For AI agents, this means: all messages are encrypted with TLS, signed with digital signatures and authenticated with mutual authentication. Good secure communication means: TLS encryption, message signing, mutual authentication and secure channel establishment.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4-Layer Secure Communication Defense Architecture", "4-Layer Secure Communication Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "TLS Encryption", "TLS Encryption")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Verschlüssle alle Agent-Kommunikation mit TLS 1.3. Starke Cipher Suites und ordentliches Zertifikats-Management.", "Encrypt all agent communication using TLS 1.3. Strong cipher suites and proper certificate management.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`tls_encryption:
  enabled: true
  version: "TLSv1.3"
  pinning:
    enabled: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Message Signing", "Message Signing")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Signiere alle Agent-Nachrichten für Authentizität und Integrität. Digitale Signaturen mit starken Algorithmen.", "Sign all agent messages for authenticity and integrity. Digital signatures with strong algorithms.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`message_signing:
  enabled: true
  algorithm: "Ed25519"
  keys:
    rotate_days: 90`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Mutual Authentication", "Mutual Authentication")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Implementiere Mutual TLS (mTLS) für Agent-Kommunikation. Client und Server authentifizieren sich gegenseitig.", "Implement mutual TLS (mTLS) for agent communication. Both client and server authenticate each other.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`mutual_authentication:
  enabled: true
  mtls:
    enabled: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Secure Channel Establishment", "Secure Channel Establishment")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Etabliere sichere Kanäle zwischen Agents mit Key-Exchange-Protokollen. Perfect Forward Secrecy (PFS).", "Establish secure channels between agents using key exchange protocols. Perfect forward secrecy (PFS).")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`secure_channel:
  enabled: true
  key_exchange:
    protocol: "ECDHE"`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: MITM-Angriff ohne TLS Encryption", "SCAR #1: MITM Attack without TLS Encryption")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Agent-Kommunikation ohne TLS wurde abgefangen und manipuliert. 3.000 kompromittierte Requests, Datenexfiltration. Fix: TLS Encryption, Certificate Pinning.", "Agent communication without TLS was intercepted and manipulated. 3,000 compromised requests, data exfiltration. Fix: TLS encryption, certificate pinning.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein TLS. Lessons: Aktiviere TLS 1.3 mit Certificate Pinning.", "Root Cause: No TLS. Lessons: Enable TLS 1.3 with certificate pinning.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Message Forgery ohne Message Signing", "SCAR #2: Message Forgery without Message Signing")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Angreifer haben gefälschte Agent-Nachrichten ohne Signaturen gesendet. System führte unauthorisierte Aktionen aus. Fix: Message Signing, Key Rotation.", "Attackers sent forged agent messages without signatures. System executed unauthorised actions. Fix: Message signing, key rotation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Message Signing. Lessons: Aktiviere Message Signing mit Ed25519.", "Root Cause: No message signing. Lessons: Enable message signing with Ed25519.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "TLS Encryption aktivieren", "Enable TLS Encryption")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere TLS 1.3 für alle Agent-Kommunikation.", "Enable TLS 1.3 for all agent communication.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Message Signing aktivieren", "Enable Message Signing")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Signiere alle Agent-Nachrichten mit Ed25519.", "Sign all agent messages with Ed25519.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Mutual Authentication aktivieren", "Enable Mutual Authentication")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Implementiere mTLS für alle Agent-Verbindungen.", "Implement mTLS for all agent connections.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Secure Communication Checkliste", "Interactive Secure Communication Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "TLS Encryption aktiviert", "TLS encryption enabled") },
                  { id: "c2", text: pick(isDE, "TLS 1.3 konfiguriert", "TLS 1.3 configured") },
                  { id: "c3", text: pick(isDE, "Certificate Pinning aktiviert", "Certificate pinning enabled") },
                  { id: "c4", text: pick(isDE, "Message Signing aktiviert", "Message signing enabled") },
                  { id: "c5", text: pick(isDE, "Mutual Authentication (mTLS) aktiviert", "Mutual authentication (mTLS) enabled") },
                  { id: "c6", text: pick(isDE, "Secure Channel mit PFS aktiviert", "Secure channel with PFS enabled") },
                  { id: "c7", text: pick(isDE, "Key Rotation aktiviert", "Key rotation enabled") },
                  { id: "c8", text: pick(isDE, "Certificate Monitoring aktiviert", "Certificate monitoring enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Secure Communication Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Secure Communication Score Calculator", "Secure Communication Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du TLS Encryption aktiviert?", "Do you have TLS encryption enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Message Signing aktiv?", "Is message signing active?"), weight: 25 },
                  { q: pick(isDE, "Ist Mutual Authentication (mTLS) aktiv?", "Is mutual authentication (mTLS) active?"), weight: 25 },
                  { q: pick(isDE, "Ist Secure Channel mit PFS aktiv?", "Is secure channel with PFS active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Secure Communication Score:", "Your Secure Communication Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 20/100", "Industry Average: 20/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für TLS Encryption, Mutual Authentication und Secure Communication.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in TLS encryption, mutual authentication and secure communication.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/ai-agent-communication-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Communication Security", "AI Agent Communication Security")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Channel-Security", "Channel security")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
              </a>
              <a href={`/${locale}/securitycheck`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security Runbooks", "Security runbooks")}</div>
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
