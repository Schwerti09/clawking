import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-hardening-guide"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const title = "AI Agent Hardening Guide: Complete Security Framework 2026"
  const description = "Complete AI agent hardening guide with security best practices, configuration hardening, and defense mechanisms for autonomous systems and artificial intelligence."
  return {
    title,
    description,
    keywords: ["ai agent hardening", "security hardening", "ai security", "autonomous system security", "artificial intelligence protection"],
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

export default function AiAgentHardeningGuidePage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === 'de'
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: pick(isDE, 'Was ist AI Agent Hardening?', 'What is AI agent hardening?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'AI Agent Hardening bezeichnet die systematische Absicherung autonomer KI-Systeme gegen Angriffe und Missbrauch. Maßnahmen: Prompt Injection Prevention, Output-Validierung, Rate Limiting, Sandbox-Isolation, Principle of Least Privilege für Agenten-Berechtigungen, Audit-Logging aller Aktionen, Human-in-the-Loop für kritische Entscheidungen.', 'AI agent hardening is the systematic securing of autonomous AI systems against attacks and misuse. Measures: prompt injection prevention, output validation, rate limiting, sandbox isolation, principle of least privilege for agent permissions, audit logging of all actions, human-in-the-loop for critical decisions.') } },
      { '@type': 'Question', name: pick(isDE, 'Was ist Prompt Injection und wie verhindere ich sie?', 'What is prompt injection and how do I prevent it?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'Prompt Injection: Angreifer schmuggeln bösartige Instruktionen in LLM-Eingaben. Typen: Direct (User überschreibt System-Prompt), Indirect (externe Daten enthalten Instruktionen). Prävention: System-Prompt-Priorisierung, Input-Sanitization, Output-Parsing statt direkter Ausführung, Berechtigungs-Einschränkung (Agent darf keine gefährlichen Aktionen ohne Confirmation), Anomalie-Detection auf LLM-Outputs.', 'Prompt injection: attackers smuggle malicious instructions into LLM inputs. Types: direct (user overrides system prompt), indirect (external data contains instructions). Prevention: system prompt prioritization, input sanitization, output parsing instead of direct execution, permission restriction (agent may not perform dangerous actions without confirmation), anomaly detection on LLM outputs.') } },
      { '@type': 'Question', name: pick(isDE, 'Welche Berechtigungen sollte ein AI Agent haben?', 'What permissions should an AI agent have?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'AI Agent Least Privilege: Agent erhält nur die minimalen Berechtigungen für seinen spezifischen Task. Beispiel Coding-Agent: Lesen des Repos, Schreiben nur in Feature-Branches, kein Prod-Deployment ohne Approval. Scoped API-Keys mit Expiry. Kein Zugriff auf sensible Systeme (Finanzen, PII) ohne explizite Freigabe. Alle Aktionen loggen für Audit-Trail.', 'AI agent least privilege: agent receives only the minimal permissions for its specific task. Example coding agent: read repository, write only to feature branches, no prod deployment without approval. Scoped API keys with expiry. No access to sensitive systems (finance, PII) without explicit authorization. Log all actions for audit trail.') } },
      { '@type': 'Question', name: pick(isDE, 'Wie logge ich AI Agent Aktionen für Compliance?', 'How do I log AI agent actions for compliance?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'AI Agent Audit Logging: Jede Aktion des Agenten protokollieren: Eingabe-Prompt, LLM-Response, ausgeführte Aktionen (API-Calls, File-Änderungen), Ergebnis, Timestamp, User-ID. Structured Logging (JSON) für SIEM-Integration. Retention: je nach Compliance-Anforderung (SOC2: 1 Jahr, HIPAA: 6 Jahre). Alerts bei unerwarteten Aktionen oder Fehlerhäufungen.', 'AI agent audit logging: log every agent action: input prompt, LLM response, executed actions (API calls, file changes), result, timestamp, user ID. Structured logging (JSON) for SIEM integration. Retention: depending on compliance requirement (SOC2: 1 year, HIPAA: 6 years). Alerts on unexpected actions or error accumulations.') } },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Dieser Guide dient zur Absicherung von KI-Systemen. Kein Angriffswerkzeug.", "This guide is for security hardening and protection. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up">
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Agent Hardening Guide</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "AI Agent Hardening Guide: Vollständiges Security Framework 2026", "AI Agent Hardening Guide: Complete Security Framework 2026")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Vollständiger Guide zur Absicherung autonomer KI-Agenten: Security Best Practices, Konfigurationshärtung und Defense-Mechanismen für autonome Systeme.", "Complete AI agent hardening guide with security best practices, configuration hardening, and defense mechanisms for autonomous systems and artificial intelligence.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Hardening? Einfach erklärt", "What is AI Agent Hardening? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Stell dir vor, du hast einen KI-Agenten, der selbstständig Aktionen ausführt — E-Mails schreibt, Code deployed, APIs aufruft. Wenn dieser Agent nicht gehärtet ist, kann ein Angreifer ihn manipulieren, sensible Daten stehlen oder ihn als Hebel für Systemzugriff nutzen. Hardening bedeutet: Minimale Berechtigungen, Input-Validierung, Ausgabe-Kontrolle, Audit-Logging und Human-in-the-Loop für kritische Entscheidungen.", "Imagine an AI agent that independently executes actions — writes emails, deploys code, calls APIs. If this agent isn't hardened, an attacker can manipulate it, steal sensitive data, or use it as a lever for system access. Hardening means: minimal permissions, input validation, output control, audit logging, and human-in-the-loop for critical decisions.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Input-Härtung, Processing-Kontrollen und Infrastruktur-Security", "Jump to input hardening, processing controls, and infrastructure security")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'AI Agent Hardening Überblick', 'AI Agent Hardening Overview')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl mb-4 border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <h3 className="font-semibold mb-2 text-gray-100">Hardening Objectives</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Reduce attack surface and vulnerabilities</li>
              <li>Implement defense-in-depth security</li>
              <li>Secure data handling and processing</li>
              <li>Control autonomous decision-making</li>
              <li>Ensure compliance and governance</li>
            </ul>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Input-Härtung', 'Input Hardening')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-700/50">
                <h3 className="font-bold text-cyan-400 mb-3">Input Validation</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Strict input type validation</li>
                  <li>Length and format restrictions</li>
                  <li>Character set limitations</li>
                  <li>Encoding normalization</li>
                  <li>Malicious pattern detection</li>
                </ul>
              </div>
              <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-700/50">
                <h3 className="font-bold text-cyan-400 mb-3">Prompt Security</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Prompt injection prevention</li>
                  <li>Template-based prompts</li>
                  <li>Input sanitization</li>
                  <li>Context isolation</li>
                  <li>Behavioral constraints</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Processing-Härtung', 'Processing Hardening')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre>
{`# Processing Security Controls
## Execution Environment
- Sandboxed processing environments
- Container isolation and limits
- Resource allocation controls
- Network access restrictions
- File system isolation

## Model Protection
- Model encryption and access control
- Parameter protection mechanisms
- Weight and bias integrity checks
- Model versioning and validation
- Secure inference environments

## Memory Management
- Secure memory allocation
- Data sanitization in memory
- Memory access controls
- Heap protection mechanisms
- Stack protection measures`}
            </pre>
          </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Output-Härtung', 'Output Hardening')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-700/50">
                <h3 className="font-bold text-cyan-400 mb-3">Output Validation</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Output content validation</li>
                  <li>Format and structure checks</li>
                  <li>Malicious content filtering</li>
                  <li>Confidentiality verification</li>
                  <li>Compliance checking</li>
                </ul>
              </div>
              <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-700/50">
                <h3 className="font-bold text-cyan-400 mb-3">Data Leakage Prevention</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Sensitive data detection</li>
                  <li>PII identification and masking</li>
                  <li>Trade secret protection</li>
                  <li>Information flow control</li>
                  <li>Audit trail generation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Autonomes System Hardening', 'Autonomous System Hardening')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div>
                  <div className="font-semibold text-gray-100">Decision Validation</div>
                  <div className="text-sm text-gray-300">Implement multi-layer validation for autonomous decisions</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div>
                  <div className="font-semibold text-gray-100">Behavioral Constraints</div>
                  <div className="text-sm text-gray-300">Define and enforce behavioral boundaries and limits</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div>
                  <div className="font-semibold text-gray-100">Human Oversight</div>
                  <div className="text-sm text-gray-300">Implement human-in-the-loop oversight mechanisms</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div>
                  <div className="font-semibold text-gray-100">Fail-safe Mechanisms</div>
                  <div className="text-sm text-gray-300">Implement automatic fail-safe and emergency stop</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Network Hardening</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre>
{`# Network Security Controls
## Access Control
- Network segmentation and isolation
- Firewall rule implementation
- VPN and secure tunneling
- IP whitelisting and blacklisting
- Port and protocol restrictions

## Communication Security
- End-to-end encryption
- Certificate-based authentication
- Secure API gateways
- Message integrity verification
- Rate limiting and throttling

## Monitoring and Detection
- Network traffic analysis
- Anomaly detection systems
- Intrusion detection and prevention
- Log aggregation and analysis
- Real-time alerting mechanisms`}
            </pre>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Data Security Hardening</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Data Protection</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Encryption at rest and in transit</li>
                  <li>Key management and rotation</li>
                  <li>Data classification and labeling</li>
                  <li>Access control and permissions</li>
                  <li>Data retention and deletion</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Privacy Controls</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>PII detection and masking</li>
                  <li>Data anonymization techniques</li>
                  <li>Privacy by design principles</li>
                  <li>Consent management systems</li>
                  <li>GDPR compliance measures</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Infrastructure Hardening</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Container Security</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Minimal base images</li>
                  <li>Container image scanning</li>
                  <li>Runtime security monitoring</li>
                  <li>Resource limits and quotas</li>
                  <li>Network isolation policies</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Cloud Security</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Cloud security posture management</li>
                  <li>Identity and access management</li>
                  <li>Configuration management</li>
                  <li>Compliance monitoring</li>
                  <li>Cost and resource optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Monitoring and Logging Hardening</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre>
{`# Monitoring Security Framework
## Security Monitoring
- Real-time threat detection
- Behavioral analysis systems
- Anomaly detection algorithms
- Security event correlation
- Automated alerting mechanisms

## Logging and Auditing
- Comprehensive audit trails
- Immutable log storage
- Log aggregation and analysis
- Security log monitoring
- Forensic data preservation

## Performance Monitoring
- Resource utilization tracking
- Performance baseline establishment
- Anomaly detection in performance
- Capacity planning metrics
- Service availability monitoring`}
            </pre>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Hardening Checklist</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Input Security</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Input validation implemented</li>
                  <li>Prompt injection protection</li>
                  <li>Malicious content filtering</li>
                  <li>Rate limiting configured</li>
                  <li>Input logging enabled</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Processing Security</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Sandboxed execution environment</li>
                  <li>Resource limits enforced</li>
                  <li>Network access restricted</li>
                  <li>Memory protection enabled</li>
                  <li>Process isolation configured</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Output Security</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Output validation implemented</li>
                  <li>Data leakage prevention</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Infrastructure Security</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Container security configured</li>
                  <li>Network segmentation implemented</li>
                  <li>Access control enforced</li>
                  <li>Monitoring systems active</li>
                  <li>Backup and recovery ready</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-blue-300 mb-2">Defense in Depth</h3>
              <p className="text-sm text-blue-200">Implement multiple layers of security controls for comprehensive protection</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-green-300 mb-2">Least Privilege</h3>
              <p className="text-sm text-green-200">Apply principle of least privilege to all system components and access</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-yellow-300 mb-2">Continuous Monitoring</h3>
              <p className="text-sm text-yellow-200">Maintain continuous monitoring and regular security assessments</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-red-300 mb-2">Regular Updates</h3>
              <p className="text-sm text-red-200">Keep all systems and security controls updated and patched</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Implementation Examples</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Chatbot Hardening</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Input validation and sanitization</li>
                  <li>Prompt injection protection</li>
                  <li>Output filtering and monitoring</li>
                  <li>Rate limiting and throttling</li>
                  <li>Behavioral analysis</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-cyan-400 mb-3">Autonomous Agent Hardening</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Decision validation frameworks</li>
                  <li>Behavior monitoring systems</li>
                  <li>Human intervention mechanisms</li>
                  <li>Fail-safe implementations</li>
                  <li>Resource constraint enforcement</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 27.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 27.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI-Agent-Deployments in Produktionsumgebungen. Die beschriebenen Härtungsmaßnahmen sind in echten Moltbot-Installationen getestet und validiert.', 'This guide is based on practical experience with AI agent deployments in production environments. The hardening measures described have been tested and validated in real Moltbot installations.')}
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

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'System jetzt scannen', 'Scan your system now')}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, '600+ Security Playbooks', '600+ security playbooks')}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security Hub</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'OWASP LLM Top 10 Defense-Map', 'OWASP LLM Top 10 defense map')}</div>
            </a>
            <a href={`/${locale}/moltbot/container-security-docker-kubernetes`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Container Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'Docker & K8s Härtung', 'Docker & K8s hardening')}</div>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
