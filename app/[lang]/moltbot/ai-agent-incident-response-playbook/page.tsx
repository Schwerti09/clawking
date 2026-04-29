import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-incident-response-playbook"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Incident Response Playbook: IR für AI-Agent-Sicherheitsvorfälle | ClawGuru", "AI Agent Incident Response Playbook: IR for AI Agent Security Incidents | ClawGuru")
  const description = pick(isDE, "AI Agent Incident Response Playbook für Moltbot. Strukturierte Reaktion auf Prompt Injection, Model Compromise, Data Breach und Jailbreak-Vorfälle bei AI-Agents.", "AI agent incident response playbook for Moltbot. Structured response to prompt injection, model compromise, data breach and jailbreak incidents for AI agents.")
  return {
    title, description,
    keywords: ["ai agent incident response", "ir playbook", "prompt injection response", "model compromise", "jailbreak incident", "moltbot security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentIncidentResponsePlaybookPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Incident Response Playbook", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Incident Response Playbook Guide", "Moltbot AI Agent Incident Response Playbook Guide"), description: pick(isDE, "AI Agent Incident Response", "AI agent incident response"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Incident-Response-Playbook für eigene KI-Systeme.", "Incident response playbook for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Incident Response</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Incident Response Playbook", "AI Agent Incident Response Playbook")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Incident Response Playbook für Moltbot. Strukturierte Reaktion auf Prompt Injection, Model Compromise, Data Breach und Jailbreak-Vorfälle bei AI-Agents.", "AI agent incident response playbook for Moltbot. Structured response to prompt injection, model compromise, data breach and jailbreak incidents for AI agents.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Incident Response für AI-Agents? Einfach erklärt", "What is Incident Response for AI Agents? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Incident Response für AI-Agents ist wie ein Notfallplan für KI-Sicherheitsvorfälle: es definiert, was zu tun ist, wenn ein AI-Agent gehackt wird oder Sicherheitsrichtlinien verletzt. Prompt Injection Attack manipuliert das Agent-Verhalten durch bösartige Prompts. Model Compromise bedeutet, das Modell wurde manipuliert. Data Exfiltration ist das Leaken von sensiblen Daten. Jailbreak & Policy Bypass umgeht Sicherheitsrichtlinien. Supply Chain Attack ist eine bösartige Komponente in Abhängigkeiten. Der IR-Prozess hat 4 Phasen: Erkennung & Triage, Eindämmung, Forensik & Analyse, Recovery & Hardening.", "Incident response for AI agents is like an emergency plan for AI security incidents: it defines what to do when an AI agent is hacked or violates security policies. Prompt injection attack manipulates agent behavior through malicious prompts. Model compromise means the model was manipulated. Data exfiltration is leaking sensitive data. Jailbreak & policy bypass circumvents security policies. Supply chain attack is a malicious component in dependencies. The IR process has 4 phases: detection & triage, containment, forensics & analysis, recovery & hardening.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Incident-Typen und IR-Phasen", "Jump to incident types and IR phases")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Incident-Typen für AI-Agents", "Incident Types for AI Agents")}</h2>
          <div className="space-y-4">
            {[
              ["1. Prompt Injection Attack", pick(isDE, "Angreifer manipuliert AI-Agent-Verhalten durch bösartige Prompts. Sofort-Maßnahme: Agent isolieren, Logs sichern.", "Attacker manipulates AI agent behavior through malicious prompts. Immediate action: isolate agent, secure logs.")],
              ["2. Model Compromise", pick(isDE, "AI-Modell wurde manipuliert oder ersetzt. Nachweis durch Integrity Checks. Rollback auf verified Version.", "AI model has been manipulated or replaced. Proof through integrity checks. Rollback to verified version.")],
              ["3. Data Exfiltration", pick(isDE, "AI-Agent hat sensitive Daten nach außen geleakt. Egress-Traffic analysieren, betroffene Daten identifizieren.", "AI agent has leaked sensitive data externally. Analyze egress traffic, identify affected data.")],
              ["4. Jailbreak & Policy Bypass", pick(isDE, "AI-Agent wurde dazu gebracht, Sicherheitsrichtlinien zu umgehen. Systemlogs auswerten, Pattern identifizieren.", "AI agent was made to bypass security policies. Evaluate system logs, identify pattern.")],
              ["5. Supply Chain Attack", pick(isDE, "Bösartige Komponente in AI-Agent-Abhängigkeiten. SBOM-basierte Impact-Analyse und Rollback.", "Malicious component in AI agent dependencies. SBOM-based impact analysis and rollback.")],
            ].map(([t, d]) => (
              <div key={t as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{t}</h3>
                <p className="text-sm text-gray-300">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "IR-Phasen für AI-Incidents", "IR Phases for AI Incidents")}</h2>
          <div className="space-y-4">
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Phase 1: Erkennung & Triage", "Phase 1: Detection & Triage")}</h3><p className="text-sm text-red-200">{pick(isDE, "Alert empfangen → Schweregrad bestimmen → IR-Team aktivieren. Zeitfenster: max. 15 Minuten.", "Receive alert → determine severity → activate IR team. Time window: max 15 minutes.")}</p></div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Phase 2: Eindämmung", "Phase 2: Containment")}</h3><p className="text-sm text-yellow-200">{pick(isDE, "Betroffenen Agent isolieren → Traffic blockieren → Credentials rotieren. Kein Fortschreiten des Incidents.", "Isolate affected agent → block traffic → rotate credentials. No progression of incident.")}</p></div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Phase 3: Forensik & Analyse", "Phase 3: Forensics & Analysis")}</h3><p className="text-sm text-blue-200">{pick(isDE, "Logs sichern → Root Cause Analysis → Angriffsvektor verstehen → Impact Assessment.", "Secure logs → root cause analysis → understand attack vector → impact assessment.")}</p></div>
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Phase 4: Recovery & Hardening", "Phase 4: Recovery & Hardening")}</h3><p className="text-sm text-green-200">{pick(isDE, "Sauberes System wiederherstellen → Schwachstelle schließen → Lessons Learned dokumentieren.", "Restore clean system → close vulnerability → document lessons learned.")}</p></div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "IR-Team und Rollen definieren", "Define IR team and roles"), pick(isDE, "Wer ist Incident Commander? Wer ist für AI-Forensik zuständig? Wer kommuniziert extern?", "Who is incident commander? Who handles AI forensics? Who communicates externally?")],
              [2, pick(isDE, "Playbooks pro Incident-Typ", "Playbooks per incident type"), pick(isDE, "Eigenes Runbook für jeden AI-Incident-Typ. Schritt-für-Schritt-Anleitung ohne Raten.", "Individual runbook for each AI incident type. Step-by-step guide without guessing.")],
              [3, pick(isDE, "Forensik-Tools vorbereiten", "Prepare forensics tools"), pick(isDE, "Log-Aggregation, Memory Dumps und Agent-State-Snapshots vorbereiten. Vor dem Incident, nicht danach.", "Prepare log aggregation, memory dumps and agent state snapshots. Before the incident, not after.")],
              [4, pick(isDE, "Tabletop Exercises durchführen", "Conduct tabletop exercises"), pick(isDE, "Regelmäßige Simulationen von AI-Sicherheitsvorfällen. Schwächen im IR-Prozess frühzeitig finden.", "Regular simulations of AI security incidents. Find weaknesses in IR process early.")],
              [5, pick(isDE, "Post-Incident Review", "Post-incident review"), pick(isDE, "Nach jedem Incident strukturiertes Post-Mortem. Was hat funktioniert? Was muss verbessert werden?", "Structured post-mortem after every incident. What worked? What needs improvement?")],
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Incident Response Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Incident-Response-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with incident response implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
