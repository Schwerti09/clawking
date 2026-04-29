import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-threat-model-template"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === 'de'
  const title = pick(isDE, "AI Agent Threat Model Template: Complete Framework 2026", "AI Agent Threat Model Template: Complete Framework 2026")
  const description = pick(isDE, "Vollständiges AI Agent Threat Model Template mit standardisierter Bedrohungsanalyse, Risikoanalyse und Sicherheitssteuerungs-Dokumentation für autonome Systeme.", "Complete AI agent threat model template with standardized threat assessment, risk analysis, and security control documentation for autonomous systems.")
  return {
    title,
    description,
    keywords: ["ai agent threat model", "threat modeling template", "security framework", "risk assessment", "autonomous system security"],
    authors: [{ name: "ClawGuru Security Team" }],
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

export default function AiAgentThreatModelTemplatePage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === 'de'
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: pick(isDE, 'Was ist ein Threat Model f\u00fcr AI Agenten?', 'What is a threat model for AI agents?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'Ein AI Agent Threat Model identifiziert systematisch alle m\u00f6glichen Angriffsvektoren auf autonome KI-Systeme. Bereiche: Prompt Injection (direkt/indirekt), Model Poisoning, Data Exfiltration durch den Agenten, Privilege Escalation \u00fcber Agent-Aktionen, Supply-Chain-Angriffe auf LLM-Provider, Denial-of-Service via Token-Flooding. STRIDE-Methodik auf AI-spezifische Bedrohungen angewendet.', 'An AI agent threat model systematically identifies all possible attack vectors on autonomous AI systems. Areas: prompt injection (direct/indirect), model poisoning, data exfiltration by the agent, privilege escalation through agent actions, supply chain attacks on LLM providers, denial-of-service via token flooding. STRIDE methodology applied to AI-specific threats.') } },
      { '@type': 'Question', name: pick(isDE, 'Welche Schritte hat ein AI Agent Threat Modeling?', 'What steps does AI agent threat modeling involve?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'AI Agent Threat Modeling Schritte: 1) System-Diagramm erstellen (Agent, Tools, Datenquellen, externe APIs). 2) Trust Boundaries definieren (was darf der Agent, was nicht?). 3) STRIDE-Analyse: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege. 4) AI-spezifische Bedrohungen: Prompt Injection, Jailbreaking, Indirect Injection. 5) Mitigations definieren und priorisieren.', 'AI agent threat modeling steps: 1) create system diagram (agent, tools, data sources, external APIs). 2) Define trust boundaries (what may the agent do, what not?). 3) STRIDE analysis: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege. 4) AI-specific threats: prompt injection, jailbreaking, indirect injection. 5) Define and prioritize mitigations.') } },
      { '@type': 'Question', name: pick(isDE, 'Was sind die h\u00e4ufigsten AI Agent Sicherheitsbedrohungen?', 'What are the most common AI agent security threats?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'Top AI Agent Bedrohungen 2026: 1) Indirect Prompt Injection (b\u00f6sartige Inhalte in Webseiten/Docs die der Agent liest). 2) Tool Misuse (Agent nutzt Tools f\u00fcr unbeabsichtigte Aktionen). 3) Data Exfiltration (Agent sendet sensible Daten an externe Endpunkte). 4) Persistent Jailbreaks (eingebettete Instruktionen \u00fcberleben Kontextwechsel). 5) Agent-zu-Agent Angriffe (kompromittierter Sub-Agent infiziert Haupt-Agent).', 'Top AI agent threats 2026: 1) Indirect prompt injection (malicious content in web pages/docs the agent reads). 2) Tool misuse (agent uses tools for unintended actions). 3) Data exfiltration (agent sends sensitive data to external endpoints). 4) Persistent jailbreaks (embedded instructions survive context switches). 5) Agent-to-agent attacks (compromised sub-agent infects main agent).') } },
      { '@type': 'Question', name: pick(isDE, 'Wie dokumentiere ich ein AI Threat Model?', 'How do I document an AI threat model?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'AI Threat Model Dokumentation: Datenflussdiagramm (DFD) mit Agent-Komponenten und Trust Boundaries. Bedrohungs-Register: Bedrohung, STRIDE-Kategorie, Wahrscheinlichkeit, Impact, Risiko-Score. Mitigation-Register: Gegenma\u00dfnahme, Verantwortlicher, Status, Test-Evidenz. Template: OWASP Threat Dragon (kostenlos, Open Source). ClawGuru Moltbot stellt vorgefertigte AI-Agent-Templates bereit.', 'AI threat model documentation: data flow diagram (DFD) with agent components and trust boundaries. Threat register: threat, STRIDE category, probability, impact, risk score. Mitigation register: countermeasure, owner, status, test evidence. Template: OWASP Threat Dragon (free, open source). ClawGuru Moltbot provides pre-built AI agent templates.') } },
    ],
  }

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
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", position: 1, name: pick(isDE, 'Startseite', 'Home'), item: `${SITE_URL}/${locale}` },
              { "@type": "ListItem", position: 2, name: pick(isDE, 'Moltbot', 'Moltbot'), item: `${SITE_URL}/${locale}/moltbot` },
              { "@type": "ListItem", position: 3, name: "AI Agent Threat Model Template", item: `${SITE_URL}/${locale}${PATH}` }
            ]
          },
          faqSchema,
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Threat Model Template Guide", "Moltbot AI Agent Threat Model Template Guide"), description: pick(isDE, "Vollständiges AI Agent Threat Model Template", "Complete AI agent threat model template"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, 'Threat Modeling Guide für eigene KI-Agent-Systeme.', 'Threat modeling guide for your own AI agent systems.')}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Threat Modeling</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "AI Agent Threat Model Template", "AI Agent Threat Model Template")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Vollständiges AI Agent Threat Model Template mit standardisierter Bedrohungsanalyse, Risikoanalyse und Sicherheitssteuerungs-Dokumentation für autonome Systeme.", "Complete AI agent threat model template with standardized threat assessment, risk analysis, and security control documentation for autonomous systems.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Threat Modeling für KI-Agenten? Einfach erklärt", "What is Threat Modeling for AI Agents? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Threat Modeling für KI-Agenten ist wie eine systematische Sicherheitsanalyse: man identifiziert alle möglichen Angriffsvektoren, bevor sie passieren. Das Template hilft dabei, STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) auf AI-spezifische Bedrohungen anzuwenden: Prompt Injection, Model Poisoning, Data Exfiltration durch den Agenten, Privilege Escalation über Agent-Aktionen. Das Ergebnis ist ein strukturiertes Bedrohungs-Register mit Mitigations-Maßnahmen.", "Threat modeling for AI agents is like a systematic security analysis: you identify all possible attack vectors before they happen. The template helps apply STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) to AI-specific threats: prompt injection, model poisoning, data exfiltration by the agent, privilege escalation through agent actions. The result is a structured threat register with mitigation measures.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Template-Komponenten, STRIDE-Analyse und Best Practices", "Jump to template components, STRIDE analysis, and best practices")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Threat Model Template Overview', 'Threat Model Template Overview')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl mb-4 border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <h3 className="font-semibold mb-2 text-gray-100">Template Components</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>System architecture documentation</li>
              <li>Asset identification and classification</li>
              <li>Threat analysis and categorization</li>
              <li>Risk assessment and prioritization</li>
              <li>Security control recommendations</li>
            </ul>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'System Architecture Documentation', 'System Architecture Documentation')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Architecture Components</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>AI model and algorithms</li>
                  <li>Data processing pipelines</li>
                  <li>Decision-making logic</li>
                  <li>Interaction interfaces</li>
                  <li>External integrations</li>
                </ul>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Trust Boundaries</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Data flow boundaries</li>
                  <li>Control flow boundaries</li>
                  <li>Network segmentation</li>
                  <li>Access control boundaries</li>
                  <li>Privilege escalation paths</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Asset Identification', 'Asset Identification')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>
{`# Asset Classification Framework
## Critical Assets
- AI model weights and parameters
- Training datasets and pipelines
- Decision logic and policies
- Authentication and authorization data
- Audit logs and monitoring data

## Important Assets
- Configuration files and settings
- API keys and secrets
- User data and preferences
- Performance metrics
- Communication interfaces

## Supporting Assets
- Documentation and manuals
- Development and testing environments
- Backup and recovery systems
- Monitoring and alerting tools
- Third-party integrations`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Threat Analysis Framework', 'Threat Analysis Framework')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-green-400 mb-3">STRIDE Categories</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><strong>S</strong>poofing - Identity impersonation</li>
                  <li><strong>T</strong>ampering - Data or system modification</li>
                  <li><strong>R</strong>epudiation - Denial of actions</li>
                  <li><strong>I</strong>nformation Disclosure - Data leakage</li>
                  <li><strong>D</strong>enial of Service - Service disruption</li>
                  <li><strong>E</strong>levation of Privilege - Access escalation</li>
                </ul>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-green-400 mb-3">AI-Specific Threats</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Prompt injection attacks</li>
                  <li>Data poisoning and manipulation</li>
                  <li>Model inversion attacks</li>
                  <li>Membership inference attacks</li>
                  <li>Adversarial examples</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Risk Assessment Methodology', 'Risk Assessment Methodology')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300 flex-1">
                  <div className="font-semibold text-gray-100">Likelihood Assessment</div>
                  <div className="text-sm text-gray-300">Assess the probability of threat occurrence based on historical data and current conditions</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300 flex-1">
                  <div className="font-semibold text-gray-100">Impact Analysis</div>
                  <div className="text-sm text-gray-300">Evaluate potential impact on confidentiality, integrity, and availability</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300 flex-1">
                  <div className="font-semibold text-gray-100">Risk Calculation</div>
                  <div className="text-sm text-gray-300">Calculate risk scores using likelihood x impact methodology</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300 flex-1">
                  <div className="font-semibold text-gray-100">Risk Prioritization</div>
                  <div className="text-sm text-gray-300">Prioritize risks based on calculated scores and business impact</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Security Control Recommendations', 'Security Control Recommendations')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>
{`# Security Control Framework
## Preventive Controls
- Input validation and sanitization
- Authentication and authorization mechanisms
- Network segmentation and isolation
- Encryption at rest and in transit
- Secure development practices

## Detective Controls
- Real-time monitoring and alerting
- Behavioral analysis and anomaly detection
- Security logging and audit trails
- Intrusion detection systems
- Regular security assessments

## Corrective Controls
- Incident response procedures
- System recovery and restoration
- Security patch management
- Configuration management
- Forensic analysis capabilities

## Compensating Controls
- Multi-factor authentication
- Defense-in-depth architecture
- Redundancy and failover systems
- Insurance and risk transfer
- Compliance frameworks`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Threat Model Documentation Template', 'Threat Model Documentation Template')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Executive Summary</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>System overview and purpose</li>
                  <li>Key findings and risks</li>
                  <li>Business impact assessment</li>
                  <li>Recommendations summary</li>
                  <li>Implementation timeline</li>
                </ul>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Technical Details</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Architecture diagrams</li>
                  <li>Data flow documentation</li>
                  <li>Threat analysis details</li>
                  <li>Risk assessment matrices</li>
                  <li>Control specifications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Implementation Guidelines', 'Implementation Guidelines')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Development Phase</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Secure development lifecycle</li>
                  <li>Code review and analysis</li>
                  <li>Security testing integration</li>
                  <li>Threat model updates</li>
                  <li>Documentation maintenance</li>
                </ul>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Operational Phase</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Continuous monitoring</li>
                  <li>Regular security assessments</li>
                  <li>Incident response procedures</li>
                  <li>Security awareness training</li>
                  <li>Compliance verification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Review and Maintenance', 'Review and Maintenance')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>
{`# Threat Model Maintenance Process
## Regular Reviews
- Quarterly threat model reviews
- Annual comprehensive assessments
- Architecture change triggers
- New threat intelligence integration
- Control effectiveness evaluation

## Update Triggers
- System architecture changes
- New technology adoption
- Security incident analysis
- Regulatory requirement changes
- Emerging threat identification

## Documentation Updates
- Version control management
- Change documentation
- Stakeholder communication
- Training material updates
- Compliance documentation`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Best Practices', 'Best Practices')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, 'Regular Updates', 'Regular Updates')}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, 'Update threat models regularly to reflect system changes and new threats', 'Update threat models regularly to reflect system changes and new threats')}</p>
            </div>
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, 'Stakeholder Involvement', 'Stakeholder Involvement')}</h3>
              <p className="text-sm text-green-200">{pick(isDE, 'Involve all relevant stakeholders in threat modeling process', 'Involve all relevant stakeholders in threat modeling process')}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, 'Documentation', 'Documentation')}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, 'Maintain comprehensive documentation for threat models and controls', 'Maintain comprehensive documentation for threat models and controls')}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, 'Continuous Monitoring', 'Continuous Monitoring')}</h3>
              <p className="text-sm text-red-200">{pick(isDE, 'Continuously monitor for new threats and control effectiveness', 'Continuously monitor for new threats and control effectiveness')}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Template Examples', 'Template Examples')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Chatbot Threat Model</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Prompt injection threats</li>
                  <li>Data leakage risks</li>
                  <li>Unauthorized access controls</li>
                  <li>Privacy compliance requirements</li>
                  <li>Service availability concerns</li>
                </ul>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Autonomous Agent Threat Model</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Decision manipulation threats</li>
                  <li>Goal hijacking risks</li>
                  <li>Resource exploitation controls</li>
                  <li>Behavioral monitoring requirements</li>
                  <li>Fail-safe implementation needs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, '🔗 Weiterführende Ressourcen', '🔗 Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'System scannen', 'Scan your system')}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, '600+ Security Playbooks', '600+ security playbooks')}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'Self-hosted Security', 'Self-hosted security')}</div>
            </a>
            <a href={`/${locale}/moltbot/threat-modeling-guide`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Threat Modeling Guide</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'STRIDE für AI', 'STRIDE for AI')}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.7s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Threat Modeling Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Threat Modeling für KI-Agenten in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with threat modeling for AI agents in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
