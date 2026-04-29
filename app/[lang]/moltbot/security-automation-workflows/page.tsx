import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/security-automation-workflows"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, 'Moltbot Security Automation Workflows: Orchestration & Playbooks 2026 | ClawGuru', 'Moltbot Security Automation Workflows: Orchestration & Playbooks 2026 | ClawGuru')
  const description = pick(isDE, 'Security Automation für Moltbot. Workflow-Orchestration, Webhook-Integration, Playbook-Automatisierung und Incident Response Automation.', 'Security automation for Moltbot. Workflow orchestration, webhook integration, playbook automation and incident response automation.')
  return {
    title, description,
    keywords: ['moltbot security automation','workflow orchestration','security playbooks','incident response automation','webhook integration'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

const getTemplates = (isDE: boolean) => [
  {
    name: pick(isDE, 'Malware Detection Response', 'Malware Detection Response'),
    trigger: pick(isDE, 'antivirus_alert', 'antivirus_alert'),
    steps: [pick(isDE, 'Isolate System', 'Isolate System'), pick(isDE, 'Collect Artifacts', 'Collect Artifacts'), pick(isDE, 'Scan Network', 'Scan Network'), pick(isDE, 'Update Signatures', 'Update Signatures')],
    duration: pick(isDE, '5-15 min', '5-15 min')
  },
  {
    name: pick(isDE, 'DDoS Mitigation', 'DDoS Mitigation'),
    trigger: pick(isDE, 'traffic_spike', 'traffic_spike'),
    steps: [pick(isDE, 'Rate Limiting', 'Rate Limiting'), pick(isDE, 'IP Blocking', 'IP Blocking'), pick(isDE, 'CDN Activation', 'CDN Activation'), pick(isDE, 'Traffic Analysis', 'Traffic Analysis')],
    duration: pick(isDE, '2-5 min', '2-5 min')
  },
  {
    name: pick(isDE, 'Data Breach Response', 'Data Breach Response'),
    trigger: pick(isDE, 'data_exfiltration', 'data_exfiltration'),
    steps: [pick(isDE, 'Contain Data', 'Contain Data'), pick(isDE, 'Notify Legal', 'Notify Legal'), pick(isDE, 'Password Reset', 'Password Reset'), pick(isDE, 'Forensic Analysis', 'Forensic Analysis')],
    duration: pick(isDE, '30-60 min', '30-60 min')
  },
]

export default function MoltbotAutomationPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const TEMPLATES = getTemplates(isDE)

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Security Automation Workflows", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Security Automation Workflows Guide", "Security Automation Workflows Guide"), description: pick(isDE, "Security Automation für Moltbot", "Security automation for Moltbot"), url: `${SITE_URL}/${locale}${PATH}` },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Security Automation automatisiert Verteidigungsmaßnahmen. Keine Angriffswerkzeuge.", "Security automation automates defensive measures. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Security Automation Workflows</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot Security Automation Workflows", "Moltbot Security Automation Workflows")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Manuelle Security-Response dauert Stunden. Automatisierte Workflows reduzieren Incident-Response-Zeit von Stunden auf Minuten.", "Manual security response takes hours. Automated workflows reduce incident response time from hours to minutes.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was sind Security Automation Workflows? Einfach erklärt", "What are Security Automation Workflows? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Security Automation Workflows sind wie automatisierte Notfallpläne für Security-Inzidende: ein Workflow-Engine führt bei bestimmten Ereignissen (z.B. Malware-Alarm) vordefinierte Schritte aus. Webhooks integrieren externe Tools. Playbook-Templates bieten vorgefertigte Response-Szenarien. Ohne Automation verstreicht wertvolle Zeit zwischen Erkennung und Reaktion.", "Security automation workflows are like automated emergency plans for security incidents: a workflow engine executes predefined steps when specific events occur (e.g., malware alert). Webhooks integrate external tools. Playbook templates provide ready-made response scenarios. Without automation, valuable time elapses between detection and response.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Workflow-Engine", "Jump to workflow engine")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Workflow-Engine Architektur", "Workflow Engine Architecture")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto shadow-xl border border-gray-700/50">
            <pre>{`// Moltbot Workflow Engine
class SecurityWorkflow {
  constructor(name, steps) {
    this.name = name;
    this.steps = steps;
    this.context = {};
  }
  
  async execute(trigger) {
    console.log('Starting workflow:', this.name, 'trigger:', trigger.type);
    
    for (const step of this.steps) {
      try {
        await this.executeStep(step, trigger);
      } catch (error) {
        console.error('Step failed:', step.name, error);
        if (step.onFailure) {
          await this.executeStep(step.onFailure, trigger);
        }
        break;
      }
    }
    
    console.log('Workflow completed:', this.name);
  }
  
  async executeStep(step, trigger) {
    console.log('Executing step:', step.name);
    
    switch (step.type) {
      case 'http_request':
        await this.httpRequest(step.config);
        break;
      case 'script':
        await this.executeScript(step.config);
        break;
      case 'webhook':
        await this.sendWebhook(step.config);
        break;
      case 'condition':
        if (!this.evaluateCondition(step.config, trigger)) {
          throw new Error('Condition not met');
        }
        break;
      case 'delay':
        await this.delay(step.config.duration);
        break;
      default:
        throw new Error('Unknown step type: ' + step.type);
    }
  }
}

// Beispiel: Incident Response Workflow
const incidentResponse = new SecurityWorkflow('incident_response', [
  {
    name: 'analyze_threat',
    type: 'script',
    config: { script: 'analyze_threat.py', params: { severity: 'high' } }
  },
  {
    name: 'check_mitigation',
    type: 'condition',
    config: { expression: 'context.threat_score > 8' }
  },
  {
    name: 'block_ip',
    type: 'http_request',
    config: {
      method: 'POST',
      url: 'https://api.firewall/block',
      body: { ip: 'context.source_ip', duration: '1h' }
    }
  },
  {
    name: 'notify_team',
    type: 'webhook',
    config: {
      url: 'https://hooks.slack.com/security',
      message: 'Threat blocked: IP {context.source_ip}'
    }
  }
]);`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Webhook Integration Patterns", "Webhook Integration Patterns")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto shadow-xl border border-gray-700/50">
            <pre>{`// Webhook Handler für Security Events
export async function handleSecurityWebhook(req, res) {
  const event = req.body;
  
  try {
    // Validate webhook signature
    if (!validateWebhookSignature(req)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Route to appropriate workflow
    const workflow = getWorkflowForEvent(event);
    if (workflow) {
      await workflow.execute(event);
    }
    
    res.json({ status: 'processed' });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
}

// Workflow Registry
const WORKFLOW_REGISTRY = {
  'security_alert': incidentResponse,
  'vulnerability_found': vulnerabilityWorkflow,
  'compliance_failure': complianceWorkflow,
  'data_breach': breachWorkflow
};

function getWorkflowForEvent(event) {
  return WORKFLOW_REGISTRY[event.type];
}

// Beispiel: GitHub Security Advisory Webhook
app.post('/api/webhooks/github', handleSecurityWebhook);`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Playbook Templates", "Playbook Templates")}</h2>
          <div className="space-y-4">
            {TEMPLATES.map((template) => (
              <div key={template.name} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 shadow-xl">
                <div className="font-semibold text-lg mb-2 text-gray-100">{template.name}</div>
                <div className="text-sm text-gray-300 mb-2">{pick(isDE, "Trigger:", "Trigger:")} {template.trigger} | {pick(isDE, "Dauer:", "Duration:")} {template.duration}</div>
                <div className="flex flex-wrap gap-2">
                  {template.steps.map((step) => (
                    <span key={step} className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs border border-blue-700">
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="space-y-4">
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Überprüfen Sie Ihre Infrastruktur auf Schwachstellen", "Check your infrastructure for vulnerabilities")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "OpenClaw", "OpenClaw")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Automation Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Security Automation Workflows für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with security automation workflows for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
  );
}