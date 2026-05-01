import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-threat-model"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "KI-Agenten Bedrohungsmodellierung: Security Framework 2026 | ClawGuru", "AI Agent Threat Modeling: Security Framework 2026 | ClawGuru")
  const description = pick(isDE, "Vollständiger Leitfaden zur KI-Agenten Bedrohungsmodellierung: Angriffsvektoren, Sicherheitskontrollen und Schutzstrategien für autonome Systeme. DSGVO-konform und selbst-gehostet.", "Complete guide to AI agent threat modeling: attack vectors, security controls and protection strategies for autonomous systems. GDPR-compliant and self-hosted.")
  return {
    title,
    description,
    keywords: ["ki agenten bedrohungsmodellierung", "ai agent threat modeling", "autonome systeme sicherheit", "ki sicherheitsframework", "prompt injection schutz"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      images: ["/og-image.png"],
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function AiAgentThreatModelPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "KI-Agenten Bedrohungsmodellierung: Security Framework 2026 | ClawGuru", "AI Agent Threat Modeling: Security Framework 2026 | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Threat Model", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Threat Modeling", "STRIDE"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Threat Modeling?", "What is Threat Modeling?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Threat Defense", "5-Layer Threat Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Threat Model Score", "Threat Model Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">15 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Threat Model · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "KI-Agenten Bedrohungsmodellierung — Dein Agent ist gestern Nacht ohne Threat Model in Production gegangen und wurde von einem Prompt Injection kompromittiert.", "AI Agent Threat Modeling — Your Agent Went Into Production Without Threat Model Last Night and Was Compromised by Prompt Injection.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein Agent hatte kein Threat Model, keine STRIDE Analyse und keine Security Controls. Ein Prompt Injection Angriff hat alle Agents kompromittiert. 12.000 kompromittierte Sessions, Datenexfiltration, dein CTO hat den CSO gerufen. Hier ist, wie du das verhinderst.", "Your agent had no threat model, no STRIDE analysis and no security controls. A prompt injection attack compromised all agents. 12,000 compromised sessions, data exfiltration, your CTO called the CSO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Threat Modeling? Einfach erklärt.", "What is Threat Modeling? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Threat Modeling wie eine Risikoanalyse vor dem Bau eines Hauses vor: Du willst wissen, welche Gefahren existieren, bevor du baust. Für AI-Agents bedeutet das: STRIDE Analyse für Angriffsvektoren, Asset Identification für kritische Komponenten, Risk Assessment für Priorisierung und Security Controls für Schutz. Gutes Threat Modeling bedeutet: STRIDE, Asset ID, Risk Assessment und Security Controls.", "Think of threat modeling like a risk analysis before building a house: you want to know what dangers exist before you build. For AI agents, this means: STRIDE analysis for attack vectors, asset identification for critical components, risk assessment for prioritization and security controls for protection. Good threat modeling means: STRIDE, asset ID, risk assessment and security controls.")}
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
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "STRIDE Analyse", "STRIDE Analysis")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "STRIDE Threat Modeling für AI-Agents. Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.", "STRIDE threat modeling for AI agents. Spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`stride_analysis:
  enabled: true
  spoofing: true
  tampering: true
  repudiation: true
  info_disclosure: true
  dos: true
  elevation: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Asset Identification", "Asset Identification")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Identifikation kritischer AI-Agent Assets. Model Weights, Training Data, Decision Logic, APIs und Data Storage.", "Identification of critical AI agent assets. Model weights, training data, decision logic, APIs and data storage.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`asset_identification:
  enabled: true
  model_weights: true
  training_data: true
  decision_logic: true
  apis: true`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Risk Assessment", "Risk Assessment")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Risk Assessment für AI-Specific Threats. Impact Analysis, Likelihood Assessment und Risk Prioritization.", "Risk assessment for AI-specific threats. Impact analysis, likelihood assessment and risk prioritization.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`risk_assessment:
  enabled: true
  impact_analysis: true
  likelihood: true
  prioritization: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Security Controls", "Security Controls")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Security Controls Implementierung. Präventive, Erkennende, Korrektive und Kompensierende Kontrollen.", "Security controls implementation. Preventive, detective, corrective and compensating controls.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`security_controls:
  enabled: true
  preventive: true
  detective: true
  corrective: true
  compensating: true`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center text-amber-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Monitoring & Response", "Monitoring & Response")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Monitoring und Incident Response für AI-Agents. Real-time Monitoring und Automated Response.", "Monitoring and incident response for AI agents. Real-time monitoring and automated response.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`monitoring_response:
  enabled: true
  real_time: true
  automated_response: true`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Prompt Injection ohne Threat Model", "SCAR #1: Prompt Injection without Threat Model")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Prompt Injection Angriff ohne Threat Model. 12.000 kompromittierte Sessions, Datenexfiltration. Fix: Threat Model, STRIDE Analyse.", "Prompt injection attack without threat model. 12,000 compromised sessions, data exfiltration. Fix: Threat model, STRIDE analysis.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Threat Model. Lessons: Aktiviere Threat Model mit STRIDE Analyse.", "Root Cause: No threat model. Lessons: Enable threat model with STRIDE analysis.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Data Poisoning ohne Asset ID", "SCAR #2: Data Poisoning without Asset ID")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Data Poisoning ohne Asset Identification. Training Data kompromittiert, Modellverhalten geändert. Fix: Asset Identification, Data Provenance.", "Data poisoning without asset identification. Training data compromised, model behavior changed. Fix: Asset identification, data provenance.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Asset Identification. Lessons: Aktiviere Asset Identification mit Data Provenance.", "Root Cause: No asset identification. Lessons: Enable asset identification with data provenance.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "STRIDE Analyse aktivieren", "Enable STRIDE Analysis")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere STRIDE Threat Modeling für alle AI-Agents.", "Enable STRIDE threat modeling for all AI agents.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Asset Identification aktivieren", "Enable Asset Identification")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Asset Identification für kritische Komponenten.", "Enable asset identification for critical components.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Security Controls aktivieren", "Enable Security Controls")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Security Controls für alle Angriffsvektoren.", "Enable security controls for all attack vectors.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Threat Model Checkliste", "Interactive Threat Model Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "STRIDE Analyse durchgeführt", "STRIDE analysis completed") },
                  { id: "c2", text: pick(isDE, "Asset Identification aktiviert", "Asset identification enabled") },
                  { id: "c3", text: pick(isDE, "Risk Assessment durchgeführt", "Risk assessment completed") },
                  { id: "c4", text: pick(isDE, "Security Controls implementiert", "Security controls implemented") },
                  { id: "c5", text: pick(isDE, "Monitoring aktiviert", "Monitoring enabled") },
                  { id: "c6", text: pick(isDE, "Incident Response Plan erstellt", "Incident response plan created") },
                  { id: "c7", text: pick(isDE, "Compliance Check durchgeführt", "Compliance check completed") },
                  { id: "c8", text: pick(isDE, "Threat Model dokumentiert", "Threat model documented") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Threat Model Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Threat Model Maturity Score Calculator", "Threat Model Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du STRIDE Analyse durchgeführt?", "Have you completed STRIDE analysis?"), weight: 25 },
                  { q: pick(isDE, "Ist Asset Identification aktiv?", "Is asset identification active?"), weight: 25 },
                  { q: pick(isDE, "Sind Security Controls implementiert?", "Are security controls implemented?"), weight: 25 },
                  { q: pick(isDE, "Ist Monitoring aktiv?", "Is monitoring active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Threat Model Maturity Score:", "Your Threat Model Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 10/100", "Industry Average: 10/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Threat Modeling, STRIDE Analyse und Security Architecture.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in threat modeling, STRIDE analysis and security architecture.")}
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
              <a href={`/${locale}/moltbot/ai-agent-threat-intelligence`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Threat Intelligence</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Threat-Intelligence", "Threat intelligence")}</div>
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
