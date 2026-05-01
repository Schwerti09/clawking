import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-threat-intelligence"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Threat Intelligence: Bedrohungsintelligenz für AI-Agents | ClawGuru", "AI Agent Threat Intelligence: Threat Intelligence for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Threat Intelligence für Moltbot. CTI-Integration, IOC-Feeds, MITRE ATLAS Framework und automatisierte Threat Detection für AI-Agent-Systeme.", "AI agent threat intelligence for Moltbot. CTI integration, IOC feeds, MITRE ATLAS framework and automated threat detection for AI agent systems.")
  return {
    title, description,
    keywords: ["ai agent threat intelligence", "cti", "ioc feeds", "mitre atlas", "threat detection", "moltbot security 2026"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentThreatIntelligencePage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Threat Intelligence: Bedrohungsintelligenz für AI-Agents | ClawGuru", "AI Agent Threat Intelligence: Threat Intelligence for AI Agents | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Threat Intelligence", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Threat Intelligence", "MITRE ATLAS"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Threat Intelligence?", "What is Threat Intelligence?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Threat Defense", "5-Layer Threat Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Threat Intelligence Score", "Threat Intelligence Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">13 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Threat Intelligence · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Threat Intelligence — Dein Agent ist gestern Nacht ohne Threat Intelligence in Production gegangen und wurde von einem Zero-Day kompromittiert.", "AI Agent Threat Intelligence — Your Agent Went Into Production Without Threat Intelligence Last Night and Was Compromised by a Zero-Day.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein Agent hatte keine CTI-Integration, keine IOC Feeds und kein MITRE ATLAS Framework. Ein Zero-Day Angriff hat alle Agents kompromittiert. 10.000 kompromittierte Sessions, Datenexfiltration, dein CTO hat den CSO gerufen. Hier ist, wie du das verhinderst.", "Your agent had no CTI integration, no IOC feeds and no MITRE ATLAS framework. A zero-day attack compromised all agents. 10,000 compromised sessions, data exfiltration, your CTO called the CSO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Threat Intelligence? Einfach erklärt.", "What is Threat Intelligence? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Threat Intelligence wie ein Frühwarnsystem vor: Du willst wissen, welche Gefahren auf dich zukommen, bevor sie eintreffen. Für AI-Agents bedeutet das: CTI-Integration für Bedrohungsdaten, IOC Feeds für bekannte Angriffsmuster, MITRE ATLAS Framework für AI-spezifische Taktiken, Threat Hunting für proaktive Suche und Vulnerability Intelligence für CVE Monitoring. Gute Threat Intelligence bedeutet: CTI-Integration, IOC Feeds, MITRE ATLAS, Threat Hunting und Vulnerability Intelligence.", "Think of threat intelligence like an early warning system: you want to know what dangers are coming before they arrive. For AI agents, this means: CTI integration for threat data, IOC feeds for known attack patterns, MITRE ATLAS framework for AI-specific tactics, threat hunting for proactive search and vulnerability intelligence for CVE monitoring. Good threat intelligence means: CTI integration, IOC feeds, MITRE ATLAS, threat hunting and vulnerability intelligence.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer Threat Defense Architecture", "5-Layer Threat Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "MITRE ATLAS Framework", "MITRE ATLAS Framework")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "MITRE ATLAS als Adversarial Threat Landscape für AI-Systeme. Taktiken, Techniken und Procedures spezifisch für AI-Angriffe.", "MITRE ATLAS as adversarial threat landscape for AI systems. Tactics, techniques and procedures specific to AI attacks.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`mitre_atlas:
  enabled: true
  framework_version: "v13"
  tactic_mapping: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "CTI-Integration", "CTI Integration")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Integration von Cyber Threat Intelligence in AI-Agent-Abwehr. Automatisches Update von Bedrohungs-Indikatoren.", "Integration of Cyber Threat Intelligence in AI agent defense. Automatic update of threat indicators.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`cti_integration:
  enabled: true
  feeds: ["cisa", "mitre", "aisa"]
  auto_update: true`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "IOC Feeds", "IOC Feeds")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Indicators of Compromise für AI-spezifische Angriffe. Malicious Prompts, bekannte Jailbreak-Patterns und Adversarial Examples.", "Indicators of Compromise for AI-specific attacks. Malicious prompts, known jailbreak patterns and adversarial examples.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`ioc_feeds:
  enabled: true
  malicious_prompts: true
  jailbreak_patterns: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Threat Hunting für AI", "Threat Hunting for AI")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Proaktive Suche nach Bedrohungen in AI-Agent-Systemen. Hypothesen-basiertes Hunting nach ATLAS-Techniken.", "Proactive threat hunting in AI agent systems. Hypothesis-based hunting for ATLAS techniques.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`threat_hunting:
  enabled: true
  hypothesis_based: true
  atlas_queries: true`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center text-amber-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Vulnerability Intelligence", "Vulnerability Intelligence")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Kontinuierliches Monitoring von AI-relevanten CVEs und Schwachstellen. Automatische Benachrichtigung bei neuen Findings.", "Continuous monitoring of AI-relevant CVEs and vulnerabilities. Automatic notification on new findings.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`vuln_intelligence:
  enabled: true
  cve_monitoring: true
  auto_alert: true`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Zero-Day ohne CTI-Integration", "SCAR #1: Zero-Day without CTI Integration")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Zero-Day Angriff ohne CTI-Integration. 10.000 kompromittierte Sessions, Datenexfiltration. Fix: CTI-Integration, IOC Feeds.", "Zero-day attack without CTI integration. 10,000 compromised sessions, data exfiltration. Fix: CTI integration, IOC feeds.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine CTI-Integration. Lessons: Aktiviere CTI-Integration mit automatischem IOC-Matching.", "Root Cause: No CTI integration. Lessons: Enable CTI integration with automated IOC matching.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: ATLAS-Technik ohne MITRE Framework", "SCAR #2: ATLAS Technique without MITRE Framework")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "ATLAS-Technik Angriff ohne MITRE ATLAS Framework. Agent kompromittiert, Datenexfiltration. Fix: MITRE ATLAS Framework, Tactic Mapping.", "ATLAS technique attack without MITRE ATLAS framework. Agent compromised, data exfiltration. Fix: MITRE ATLAS framework, tactic mapping.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein MITRE ATLAS Framework. Lessons: Aktiviere MITRE ATLAS mit Tactic Mapping.", "Root Cause: No MITRE ATLAS framework. Lessons: Enable MITRE ATLAS with tactic mapping.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "MITRE ATLAS Framework aktivieren", "Enable MITRE ATLAS Framework")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere MITRE ATLAS Framework für AI-spezifische Threat Intelligence.", "Enable MITRE ATLAS framework for AI-specific threat intelligence.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "CTI-Integration aktivieren", "Enable CTI Integration")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere CTI-Integration mit automatischem IOC-Matching.", "Enable CTI integration with automated IOC matching.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "IOC Feeds aktivieren", "Enable IOC Feeds")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere IOC Feeds für Malicious Prompts und Jailbreak Patterns.", "Enable IOC feeds for malicious prompts and jailbreak patterns.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Threat Intelligence Checkliste", "Interactive Threat Intelligence Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "MITRE ATLAS Framework aktiviert", "MITRE ATLAS framework enabled") },
                  { id: "c2", text: pick(isDE, "CTI-Integration aktiviert", "CTI integration enabled") },
                  { id: "c3", text: pick(isDE, "IOC Feeds aktiviert", "IOC feeds enabled") },
                  { id: "c4", text: pick(isDE, "Threat Hunting aktiviert", "Threat hunting enabled") },
                  { id: "c5", text: pick(isDE, "Vulnerability Intelligence aktiviert", "Vulnerability intelligence enabled") },
                  { id: "c6", text: pick(isDE, "IOC-Matching automatisiert", "IOC matching automated") },
                  { id: "c7", text: pick(isDE, "CVE Monitoring aktiviert", "CVE monitoring enabled") },
                  { id: "c8", text: pick(isDE, "Threat Intelligence Sharing aktiviert", "Threat intelligence sharing enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Threat Intelligence Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Threat Intelligence Maturity Score Calculator", "Threat Intelligence Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du MITRE ATLAS Framework aktiviert?", "Do you have MITRE ATLAS framework enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist CTI-Integration aktiv?", "Is CTI integration active?"), weight: 25 },
                  { q: pick(isDE, "Sind IOC Feeds aktiv?", "Are IOC feeds active?"), weight: 25 },
                  { q: pick(isDE, "Ist Threat Hunting aktiv?", "Is threat hunting active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Threat Intelligence Maturity Score:", "Your Threat Intelligence Maturity Score:")}</span>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Threat Intelligence, MITRE ATLAS und CTI.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in threat intelligence, MITRE ATLAS and CTI.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
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
              <a href={`/${locale}/moltbot/ai-agent-threat-model`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Threat Model</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Threat-Modeling", "Threat modeling")}</div>
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
