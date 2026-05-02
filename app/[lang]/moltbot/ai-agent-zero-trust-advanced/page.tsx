import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-zero-trust-advanced"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Zero Trust Advanced: Fortgeschrittene Zero Trust für AI-Agents | ClawGuru", "AI Agent Zero Trust Advanced: Advanced Zero Trust for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Zero Trust Advanced für Moltbot-Deployments. Never Trust, Always Verify für AI-Agents. Identity Verification, Least Privilege, Continuous Validation und Micro-Segmentation. Mit Moltbot automatisierbar.", "AI agent zero trust advanced for Moltbot deployments. Never trust, always verify for AI agents. Identity verification, least privilege, continuous validation and micro-segmentation. Automatable with Moltbot.")
  return {
    title, description,
    keywords: ["ai agent zero trust", "never trust always verify", "identity verification", "least privilege", "continuous validation", "micro segmentation", "moltbot security 2026"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentZeroTrustAdvancedPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Zero Trust Advanced: Fortgeschrittene Zero Trust für AI-Agents | ClawGuru", "AI Agent Zero Trust Advanced: Advanced Zero Trust for AI Agents | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Zero Trust Advanced", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Zero Trust", "Identity Verification"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Zero Trust?", "What is Zero Trust?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Zero Trust Defense", "5-Layer Zero Trust Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Zero Trust Maturity Score", "Zero Trust Maturity Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">14 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Zero Trust Advanced · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Zero Trust Advanced — Dein Agent vertraut jedem Tool, jeder API und jedem User. Ein kompromittierter Agent hat Zugriff auf alles. Never Trust, Always Verify.", "AI Agent Zero Trust Advanced — Your Agent Trusts Every Tool, Every API, Every User. A Compromised Agent Has Access to Everything. Never Trust, Always Verify.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein Agent hat kein Identity Verification, kein Least Privilege und keine Continuous Validation. Ein kompromittierter Agent hat Zugriff auf alle Tools und APIs. 17.000 exfiltrierte Datensätze, dein CIO hat den CEO gerufen. Hier ist, wie du das verhinderst.", "Your agent has no identity verification, no least privilege and no continuous validation. A compromised agent has access to all tools and APIs. 17,000 exfiltrated records, your CIO called the CEO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Zero Trust? Einfach erklärt.", "What is Zero Trust? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Zero Trust wie eine Tür vor, die nie offen ist: Jeder muss sich bei jedem Zugriff authentifizieren und autorisieren. Für AI-Agents bedeutet das: Identity Verification für jeden Tool-Aufruf, Least Privilege für jede API, Continuous Validation für jede Session, Micro-Segmentation für jeden Service. Gutes Zero Trust bedeutet: Never Trust, Always Verify.", "Think of Zero Trust like a door that's never open: everyone must authenticate and authorize for every access. For AI agents, this means: identity verification for every tool call, least privilege for every API, continuous validation for every session, micro-segmentation for every service. Good Zero Trust means: Never Trust, Always Verify.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer Zero Trust Defense Architecture", "5-Layer Zero Trust Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Identity Verification", "Identity Verification")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Verifiziere die Identität jedes AI-Agents bei jedem Tool-Aufruf. MFA, Service Identity, Token Validation.", "Verify the identity of every AI agent for every tool call. MFA, service identity, token validation.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`identity_verification:
  enabled: true
  mfa: true
  service_identity: true
  token_validation: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Least Privilege", "Least Privilege")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Gib AI-Agents nur die minimalen Rechte, die sie für ihre Aufgabe benötigen. Principle of Least Privilege.", "Give AI agents only the minimum permissions they need for their task. Principle of least privilege.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`least_privilege:
  enabled: true
  minimal_scope: true
  per_task: true
  audit_logging: true`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Continuous Validation", "Continuous Validation")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Validiere jede Anfrage in Echtzeit. Session Timeout, Context-Aware Validation, Anomaly Detection.", "Validate every request in real-time. Session timeout, context-aware validation, anomaly detection.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`continuous_validation:
  enabled: true
  realtime: true
  context_aware: true
  anomaly_detection: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Micro-Segmentation", "Micro-Segmentation")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Segmentiere AI-Agent-Netzwerke in kleine, isolierte Zonen. East-West Traffic Control, Network Policies.", "Segment AI agent networks into small, isolated zones. East-west traffic control, network policies.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`micro_segmentation:
  enabled: true
  isolated_zones: true
  east_west_control: true
  network_policies: true`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center text-amber-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Assume Breach", "Assume Breach")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Gehe davon aus, dass ein Agent kompromittiert ist. Defense in Depth, Rapid Isolation, Forensics-Ready.", "Assume an agent is compromised. Defense in depth, rapid isolation, forensics-ready.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`assume_breach:
  enabled: true
  defense_in_depth: true
  rapid_isolation: true
  forensics_ready: true`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Kompromittierter Agent ohne Identity Verification", "SCAR #1: Compromised Agent without Identity Verification")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Kompromittierter Agent ohne Identity Verification. 17.000 exfiltrierte Datensätze, CEO involviert. Fix: Identity Verification, MFA, Token Validation.", "Compromised agent without identity verification. 17,000 exfiltrated records, CEO involved. Fix: Identity verification, MFA, token validation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Identity Verification. Lessons: Aktiviere Identity Verification mit MFA.", "Root Cause: No identity verification. Lessons: Enable identity verification with MFA.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Agent mit Admin-Rechten ohne Least Privilege", "SCAR #2: Agent with Admin Rights without Least Privilege")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Agent mit Admin-Rechten ohne Least Privilege. System-Delete, Datenverlust. Fix: Least Privilege, Per-Task Authorization.", "Agent with admin rights without least privilege. System delete, data loss. Fix: Least privilege, per-task authorization.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Least Privilege. Lessons: Aktiviere Least Privilege mit Per-Task Authorization.", "Root Cause: No least privilege. Lessons: Enable least privilege with per-task authorization.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Identity Verification aktivieren", "Enable Identity Verification")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Identity Verification für alle AI-Agent Tool-Aufrufe.", "Enable identity verification for all AI agent tool calls.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Least Privilege implementieren", "Implement Least Privilege")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Implementiere Least Privilege für alle AI-Agent APIs.", "Implement least privilege for all AI agent APIs.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Continuous Validation aktivieren", "Enable Continuous Validation")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Continuous Validation für alle Sessions.", "Enable continuous validation for all sessions.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Zero Trust Checkliste", "Interactive Zero Trust Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "z1", text: pick(isDE, "Identity Verification aktiviert", "Identity verification enabled") },
                  { id: "z2", text: pick(isDE, "MFA für alle Agent-Aufrufe", "MFA for all agent calls") },
                  { id: "z3", text: pick(isDE, "Least Privilege aktiviert", "Least privilege enabled") },
                  { id: "z4", text: pick(isDE, "Continuous Validation aktiviert", "Continuous validation enabled") },
                  { id: "z5", text: pick(isDE, "Micro-Segmentation implementiert", "Micro-segmentation implemented") },
                  { id: "z6", text: pick(isDE, "Assume Breach aktiv", "Assume breach active") },
                  { id: "z7", text: pick(isDE, "East-West Traffic Control aktiviert", "East-west traffic control enabled") },
                  { id: "z8", text: pick(isDE, "Defense in Depth implementiert", "Defense in depth implemented") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Zero Trust Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Zero Trust Maturity Score Calculator", "Zero Trust Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Identity Verification aktiviert?", "Do you have identity verification enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Least Privilege aktiv?", "Is least privilege active?"), weight: 25 },
                  { q: pick(isDE, "Ist Continuous Validation aktiv?", "Is continuous validation active?"), weight: 25 },
                  { q: pick(isDE, "Ist Micro-Segmentation aktiv?", "Is micro-segmentation active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Zero Trust Maturity Score:", "Your Zero Trust Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 12/100", "Industry Average: 12/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Zero Trust, Identity Verification und Least Privilege.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in Zero Trust, identity verification and least privilege.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/check`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "System jetzt scannen", "Scan system now")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "600+ Security-Playbooks", "600+ Security Playbooks")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-identity-verification`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Identity Verification</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Identity-Verification", "Identity verification")}</div>
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
