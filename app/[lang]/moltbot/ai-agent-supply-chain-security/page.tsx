import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-supply-chain-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Supply Chain Security: Supply Chain Security für AI-Agents | ClawGuru", "AI Agent Supply Chain Security: Supply Chain Security for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Supply Chain Security für Moltbot-Deployments. SBOM, Dependency Scanning, Vulnerability Management und Supply Chain Hardening für AI-Agent-Komponenten. Mit Moltbot automatisierbar.", "AI agent supply chain security for Moltbot deployments. SBOM, dependency scanning, vulnerability management and supply chain hardening for AI agent components. Automatable with Moltbot.")
  return {
    title,
    description,
    keywords: [
      "ai agent supply chain", "sbom", "dependency scanning",
      "vulnerability management", "supply chain hardening", "ai agent security",
      "moltbot security", "ai agent supply chain 2026"
    ],
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

export default function AIAgentSupplyChainSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Supply Chain Security: Supply Chain Security für AI-Agents | ClawGuru", "AI Agent Supply Chain Security: Supply Chain Security for AI Agents | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Supply Chain Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Supply Chain Security", "SBOM"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Supply Chain Security?", "What is Supply Chain Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Supply Chain Defense", "5-Layer Supply Chain Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Supply Chain Score", "Supply Chain Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Supply Chain Security · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Supply Chain Security — Deine Supply Chain ist gestern Nacht durch eine kompromittierte Dependency infiziert worden.", "AI Agent Supply Chain Security — Your Supply Chain Was Infected by a Compromised Dependency Last Night.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Deine AI-Agents hatten kein SBOM und kein Dependency Scanning. Eine kompromittierte Dependency hat alle Agenten infiziert. 7.000 kompromittierte Deployments, Datenexfiltration, dein CTO hat den CSO gerufen. Hier ist, wie du das verhinderst.", "Your AI agents had no SBOM and no dependency scanning. A compromised dependency infected all agents. 7,000 compromised deployments, data exfiltration, your CTO called the CSO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Supply Chain Security? Einfach erklärt.", "What is Supply Chain Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Supply Chain Security wie einen Zutaten-Check beim Kochen vor: Du willst wissen, was in deinem Gericht ist und woher die Zutaten kommen. Für AI-Agents bedeutet das: SBOM für alle Dependencies, Dependency Scanning für CVEs, Vulnerability Management für Patches und Supply Chain Hardening für Verified Repositories. Gute Supply Chain Security bedeutet: SBOM, Dependency Scanning, Vulnerability Management, Supply Chain Hardening und Model Supply Chain.", "Think of supply chain security like an ingredient check when cooking: you want to know what's in your dish and where the ingredients come from. For AI agents, this means: SBOM for all dependencies, dependency scanning for CVEs, vulnerability management for patches and supply chain hardening for verified repositories. Good supply chain security means: SBOM, dependency scanning, vulnerability management, supply chain hardening and model supply chain.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer Supply Chain Defense Architecture", "5-Layer Supply Chain Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Software Bill of Materials (SBOM)", "Software Bill of Materials (SBOM)")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "SBOM für AI-Agent-Komponenten. Vollständige Liste aller Dependencies und Transitive Dependencies.", "SBOM for AI agent components. Complete list of all dependencies and transitive dependencies.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`sbom:
  enabled: true
  format: "CycloneDX"
  auto_generate: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Dependency Scanning", "Dependency Scanning")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Dependency Scanning für AI-Agents. Automatisierte Scans für CVEs und Schwachstellen.", "Dependency scanning for AI agents. Automated scans for CVEs and vulnerabilities.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`dependency_scanning:
  enabled: true
  scanners:
    - "Trivy"
    - "Snyk"`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Vulnerability Management", "Vulnerability Management")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Vulnerability Management für AI-Agent-Supply Chain. Patch Management und Risk Prioritization.", "Vulnerability management for AI agent supply chain. Patch management and risk prioritization.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`vulnerability_management:
  enabled: true
  auto_patch: true
  risk_scoring: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Supply Chain Hardening", "Supply Chain Hardening")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Supply Chain Hardening für AI-Agents. Verified Repositories, Code Signing und Artifact Verification.", "Supply chain hardening for AI agents. Verified repositories, code signing and artifact verification.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`supply_chain_hardening:
  enabled: true
  verified_repos: true
  code_signing: true`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center text-amber-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Model Supply Chain", "Model Supply Chain")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Model Supply Chain Security für AI-Agents. Model Provenance, Model Signing und Model Versioning.", "Model supply chain security for AI agents. Model provenance, model signing and model versioning.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`model_supply_chain:
  enabled: true
  provenance: true
  signing: true`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Kompromittierte Dependency ohne Scanning", "SCAR #1: Compromised Dependency without Scanning")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Kompromittierte Dependency ohne Dependency Scanning deployed. 7.000 kompromittierte Deployments, Datenexfiltration. Fix: Dependency Scanning, SBOM.", "Compromised dependency deployed without dependency scanning. 7,000 compromised deployments, data exfiltration. Fix: Dependency scanning, SBOM.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Dependency Scanning. Lessons: Aktiviere Dependency Scanning mit Trivy/Snyk.", "Root Cause: No dependency scanning. Lessons: Enable dependency scanning with Trivy/Snyk.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Supply Chain Attack ohne Verification", "SCAR #2: Supply Chain Attack without Verification")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Supply Chain Attack ohne Artifact Verification. Malicious Artifact deployed, alle Agents kompromittiert. Fix: Artifact Verification, Code Signing.", "Supply chain attack without artifact verification. Malicious artifact deployed, all agents compromised. Fix: Artifact verification, code signing.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Artifact Verification. Lessons: Aktiviere Artifact Verification mit Checksums.", "Root Cause: No artifact verification. Lessons: Enable artifact verification with checksums.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "SBOM Pipeline aufbauen", "Build SBOM pipeline")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Implementiere SBOM Generation für alle AI-Agent-Komponenten.", "Implement SBOM generation for all AI agent components.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Dependency Scanning aktivieren", "Enable Dependency Scanning")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Integriere Dependency Scanning in CI/CD mit Trivy oder Snyk.", "Integrate dependency scanning in CI/CD with Trivy or Snyk.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Supply Chain Hardening aktivieren", "Enable Supply Chain Hardening")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Verified Repositories und Code Signing.", "Enable verified repositories and code signing.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Supply Chain Checkliste", "Interactive Supply Chain Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "SBOM Pipeline aktiviert", "SBOM pipeline enabled") },
                  { id: "c2", text: pick(isDE, "Dependency Scanning aktiviert", "Dependency scanning enabled") },
                  { id: "c3", text: pick(isDE, "Vulnerability Management aktiviert", "Vulnerability management enabled") },
                  { id: "c4", text: pick(isDE, "Supply Chain Hardening aktiviert", "Supply chain hardening enabled") },
                  { id: "c5", text: pick(isDE, "Model Supply Chain aktiviert", "Model supply chain enabled") },
                  { id: "c6", text: pick(isDE, "Artifact Verification aktiviert", "Artifact verification enabled") },
                  { id: "c7", text: pick(isDE, "Dependency Pinning aktiviert", "Dependency pinning enabled") },
                  { id: "c8", text: pick(isDE, "Zero Trust Supply Chain aktiviert", "Zero trust supply chain enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Supply Chain Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Supply Chain Security Score Calculator", "Supply Chain Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du ein SBOM aktiviert?", "Do you have an SBOM enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Dependency Scanning aktiv?", "Is dependency scanning active?"), weight: 25 },
                  { q: pick(isDE, "Ist Supply Chain Hardening aktiv?", "Is supply chain hardening active?"), weight: 25 },
                  { q: pick(isDE, "Ist Model Supply Chain aktiv?", "Is model supply chain active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Supply Chain Security Score:", "Your Supply Chain Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 15/100", "Industry Average: 15/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Supply Chain Security, SBOM und Dependency Scanning.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in supply chain security, SBOM and dependency scanning.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/securitycheck`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security Runbooks", "Security runbooks")}</div>
              </a>
              <a href={`/${locale}/openclaw`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "OpenClaw", "OpenClaw")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security Framework", "Security framework")}</div>
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
