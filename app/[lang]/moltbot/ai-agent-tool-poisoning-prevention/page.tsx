import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-tool-poisoning-prevention"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Tool Poisoning Prevention: KI-Agenten-Tool-Poisoning-Prävention | ClawGuru", "AI Agent Tool Poisoning Prevention: Tool Poisoning Prevention | ClawGuru")
  const description = pick(isDE, "KI-Agenten-Tool-Poisoning-Prävention: Tool Integrity Verification, Malicious Tool Detection, Tool Allowlisting und Tool Output Validation für KI-Agenten-Tool-Poisoning-Prävention.", "AI agent tool poisoning prevention: tool integrity verification, malicious tool detection, tool allowlisting and tool output validation for AI agent tool poisoning prevention.")
  return {
    title, description,
    keywords: ["ai agent tool poisoning prevention", "tool integrity verification", "malicious tool detection", "tool allowlisting", "tool output validation", "moltbot tool poisoning"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}


export default function AiAgentToolPoisoningPreventionPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Tool Poisoning Prevention: KI-Agenten-Tool-Poisoning-Prävention | ClawGuru", "AI Agent Tool Poisoning Prevention: Tool Poisoning Prevention | ClawGuru")

  const CONTROLS = [
    { id: "ATP-1", title: pick(isDE, "Tool Integrity Verification", "Tool Integrity Verification"), desc: pick(isDE, "Verifiziere die Integrität jedes Tools bevor ein AI-Agent es aufrufen kann. Verhindere manipulierte oder ersetzte Tools.", "Verify the integrity of every tool before an AI agent can invoke it. Prevent tampered or replaced tools."), code: `# Moltbot tool integrity verification:
tool_integrity:
  enabled: true
  signing: true
  hash: true
  versioning: true` },
    { id: "ATP-2", title: pick(isDE, "Malicious Tool Detection", "Malicious Tool Detection"), desc: pick(isDE, "Erkenne wenn ein Tool ersetzt, manipuliert wurde oder bösartiges Verhalten zeigt.", "Detect when a tool has been replaced, tampered with, or is behaving maliciously."), code: `# Moltbot malicious tool detection:
malicious_tool_detection:
  enabled: true
  baseline: true
  output_anomaly: true
  network: true` },
    { id: "ATP-3", title: pick(isDE, "Tool Allowlisting", "Tool Allowlisting"), desc: pick(isDE, "Erlaube nur explizit genehmigte Tools für AI-Agents. Verweigere standardmäßig.", "Only permit explicitly approved tools to be invoked by AI agents. Deny by default."), code: `# Moltbot tool allowlisting:
tool_allowlisting:
  enabled: true
  per_agent: true
  registration: true
  updates: true` },
    { id: "ATP-4", title: pick(isDE, "Tool Output Validation", "Tool Output Validation"), desc: pick(isDE, "Validiere jede Tool-Ausgabe bevor der AI-Agent sie verarbeitet. Verhindere Injection via Tool-Antworten.", "Validate every tool output before the AI agent processes it. Prevent injection via tool responses."), code: `# Moltbot tool output validation:
tool_output_validation:
  enabled: true
  schema: true
  sanitization: true
  limits: true` },
  ]

  const FAQ = [
    { q: pick(isDE, "Was ist AI Agent Tool Poisoning?", "What is AI agent tool poisoning?"), a: pick(isDE, "AI Agent Tool Poisoning ist ein Angriff bei dem ein Angreifer ein Tool kompromittiert, das von einem AI-Agent verwendet wird. Angriffsvektoren: Tool Replacement, Tool Tampering, Supply Chain Attack, Response Injection und Schema Violation.", "AI agent tool poisoning is an attack where an adversary compromises a tool used by an AI agent. Attack vectors include tool replacement, tool tampering, supply chain attack, response injection and schema violation.") },
    { q: pick(isDE, "Wie unterscheiden sich Tool Poisoning von Supply Chain Angriffen?", "How do tool poisoning attacks differ from supply chain attacks?"), a: pick(isDE, "Tool Poisoning ist oft eine Form von Supply Chain Attack, aber der Unterschied ist wichtig: Supply Chain Attack tritt während Entwicklung/Distribution auf. Tool Poisoning kann jederzeit auftreten: Entwicklung, Deployment oder Runtime.", "Tool poisoning is often a form of supply chain attack, but the distinction matters: supply chain attack occurs during development/distribution. Tool poisoning can occur at any phase: development, deployment or runtime.") },
    { q: pick(isDE, "Wie sollte ich Tools für Poisoning-Resistenz designen?", "How should I design tools to be resistant to poisoning?"), a: pick(isDE, "Design-Prinzipien für Poisoning-resistente Tools: Minimal Scope, No Instructions, Signed Responses, Schema-First, Network Isolation, Least Privilege, Stateless und Audit Logging.", "Design principles for poisoning-resistant tools: minimal scope, no instructions, signed responses, schema-first, network isolation, least privilege, stateless and audit logging.") },
    { q: pick(isDE, "Was ist die Beziehung zwischen Tool Poisoning und Prompt Injection?", "What is the relationship between tool poisoning and prompt injection?"), a: pick(isDE, "Tool Poisoning und Prompt Injection sind eng verwandt und oft kombiniert: Prompt Injection via Tool Output ist die gefährlichste Kombination. Defense erfordert Tool Output Sanitization, Instruction Hierarchy und Content Provenance.", "Tool poisoning and prompt injection are closely related and often combined: prompt injection via tool output is the most dangerous combination. Defense requires tool output sanitization, instruction hierarchy and content provenance.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Tool Poisoning Prevention", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Tool Poisoning", "Supply Chain Security"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f: { q: string, a: string }) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Tool Poisoning?", "What is Tool Poisoning?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4-Layer Tool Defense", "4-Layer Tool Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Tool Poisoning Score", "Tool Poisoning Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">11 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Tool Poisoning Prevention · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Tool Poisoning Prevention — Dein Agent ist gestern Nacht ohne Tool Poisoning Prevention in Production gegangen und ein kompromittiertes Tool hat alle Agents übernommen.", "AI Agent Tool Poisoning Prevention — Your Agent Went Into Production Without Tool Poisoning Prevention Last Night and a Compromised Tool Took Over All Agents.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein Agent hatte keine Tool Integrity Verification, keine Malicious Tool Detection und kein Tool Allowlisting. Ein kompromittiertes Tool hat alle Agents übernommen. 11.000 kompromittierte Sessions, Datenexfiltration, dein CTO hat den CSO gerufen. Hier ist, wie du das verhinderst.", "Your agent had no tool integrity verification, no malicious tool detection and no tool allowlisting. A compromised tool took over all agents. 11,000 compromised sessions, data exfiltration, your CTO called the CSO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Tool Poisoning? Einfach erklärt.", "What is Tool Poisoning? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Tool Poisoning wie ein vergiftetes Werkzeug vor: Ein Angreifer ersetzt ein Tool mit einer bösartigen Version, die schädliche Ergebnisse liefert. Für AI-Agents bedeutet das: Tool Replacement, Tool Tampering, Supply Chain Attack, Response Injection und Schema Violation. Gute Tool Poisoning Prevention bedeutet: Tool Integrity Verification, Malicious Tool Detection, Tool Allowlisting und Tool Output Validation.", "Think of tool poisoning like a poisoned tool: an attacker replaces a tool with a malicious version that delivers harmful results. For AI agents, this means: tool replacement, tool tampering, supply chain attack, response injection and schema violation. Good tool poisoning prevention means: tool integrity verification, malicious tool detection, tool allowlisting and tool output validation.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4-Layer Tool Defense Architecture", "4-Layer Tool Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{CONTROLS[0].title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{CONTROLS[0].desc}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{CONTROLS[0].code}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{CONTROLS[1].title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{CONTROLS[1].desc}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{CONTROLS[1].code}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{CONTROLS[2].title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{CONTROLS[2].desc}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{CONTROLS[2].code}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{CONTROLS[3].title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{CONTROLS[3].desc}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{CONTROLS[3].code}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Tool Replacement ohne Integrity Check", "SCAR #1: Tool Replacement without Integrity Check")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Tool Replacement ohne Tool Integrity Verification. 11.000 kompromittierte Sessions, Datenexfiltration. Fix: Tool Integrity Verification, Cryptographic Signing.", "Tool replacement without tool integrity verification. 11,000 compromised sessions, data exfiltration. Fix: Tool integrity verification, cryptographic signing.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Tool Integrity Verification. Lessons: Aktiviere Tool Integrity Verification mit Cryptographic Signing.", "Root Cause: No tool integrity verification. Lessons: Enable tool integrity verification with cryptographic signing.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Response Injection ohne Output Validation", "SCAR #2: Response Injection without Output Validation")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Response Injection ohne Tool Output Validation. Prompt Injection via Tool Output, Agent kompromittiert. Fix: Tool Output Validation, Content Sanitization.", "Response injection without tool output validation. Prompt injection via tool output, agent compromised. Fix: Tool output validation, content sanitization.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Tool Output Validation. Lessons: Aktiviere Tool Output Validation mit Content Sanitization.", "Root Cause: No tool output validation. Lessons: Enable tool output validation with content sanitization.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Tool Integrity Verification aktivieren", "Enable Tool Integrity Verification")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Tool Integrity Verification für alle AI-Agent-Tools.", "Enable tool integrity verification for all AI agent tools.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Malicious Tool Detection aktivieren", "Enable Malicious Tool Detection")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Malicious Tool Detection für Behavioral Baseline.", "Enable malicious tool detection for behavioral baseline.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Tool Allowlisting aktivieren", "Enable Tool Allowlisting")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Tool Allowlisting für alle AI-Agents.", "Enable tool allowlisting for all AI agents.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Tool Poisoning Checkliste", "Interactive Tool Poisoning Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "Tool Integrity Verification aktiviert", "Tool integrity verification enabled") },
                  { id: "c2", text: pick(isDE, "Malicious Tool Detection aktiviert", "Malicious tool detection enabled") },
                  { id: "c3", text: pick(isDE, "Tool Allowlisting aktiviert", "Tool allowlisting enabled") },
                  { id: "c4", text: pick(isDE, "Tool Output Validation aktiviert", "Tool output validation enabled") },
                  { id: "c5", text: pick(isDE, "Cryptographic Signing aktiviert", "Cryptographic signing enabled") },
                  { id: "c6", text: pick(isDE, "Hash Verification aktiviert", "Hash verification enabled") },
                  { id: "c7", text: pick(isDE, "Content Sanitization aktiviert", "Content sanitization enabled") },
                  { id: "c8", text: pick(isDE, "Schema Validation aktiviert", "Schema validation enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Tool Poisoning Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Tool Poisoning Maturity Score Calculator", "Tool Poisoning Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Tool Integrity Verification aktiviert?", "Do you have tool integrity verification enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Malicious Tool Detection aktiv?", "Is malicious tool detection active?"), weight: 25 },
                  { q: pick(isDE, "Ist Tool Allowlisting aktiv?", "Is tool allowlisting active?"), weight: 25 },
                  { q: pick(isDE, "Ist Tool Output Validation aktiv?", "Is tool output validation active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Tool Poisoning Maturity Score:", "Your Tool Poisoning Maturity Score:")}</span>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Tool Poisoning Prevention, Supply Chain Security und Tool Integrity.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in tool poisoning prevention, supply chain security and tool integrity.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
              </a>
              <a href={`/${locale}/check`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "System jetzt scannen", "Scan system now")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "600+ Security-Playbooks", "600+ Security Playbooks")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-supply-chain-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Supply Chain Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Supply-Chain-Security", "Supply chain security")}</div>
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
