import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-observability-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Observability Security: Sicherheits-Observability für AI-Agents | ClawGuru", "AI Agent Observability Security: Security Observability for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Observability Security für Moltbot. Metrics, Traces, Logs und Security Events für AI-Agents. OpenTelemetry, SIEM-Integration und Anomaly Detection in Echtzeit.", "AI agent observability security for Moltbot. Metrics, traces, logs and security events for AI agents. OpenTelemetry, SIEM integration and real-time anomaly detection.")
  return {
    title, description,
    keywords: ["ai agent observability", "security monitoring", "opentelemetry", "siem integration", "anomaly detection", "moltbot security", "observability security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentObservabilitySecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Observability Security", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "AI Agent Observability Security Guide", "AI Agent Observability Security Guide"), description: pick(isDE, "AI Agent Observability Security", "AI agent observability security"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Leitfaden dient zur Härtung Ihrer eigenen Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Observability Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Observability Security", "AI Agent Observability Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Observability Security für Moltbot. Metrics, Traces, Logs und Security Events für AI-Agents. OpenTelemetry, SIEM-Integration und Anomaly Detection in Echtzeit.", "AI agent observability security for Moltbot. Metrics, traces, logs and security events for AI agents. OpenTelemetry, SIEM integration and real-time anomaly detection.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Observability Security? Einfach erklärt", "What is AI Agent Observability Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Observability Security garantiert volle Transparenz über KI-Agenten: Security Metrics (Error Rates, Latency, Token Usage, Tool-Call Frequency, Anomalie-Indikatoren) liefern Echtzeit-Insights. Distributed Tracing bietet End-to-End-Sichtbarkeit über Multi-Agent-Workflows mit vollständigen Agent-Ketten und Tool-Aufrufen. Structured Security Logging loggt alle sicherheitsrelevanten Agent-Aktionen im JSON-Format für SIEM-Kompatibilität. Anomaly Detection erkennt ungewöhnliche Agent-Verhaltensweisen mit ML-basierten Baseline-Modellen und Rule-basierten Alerts. SIEM Integration verbindet mit Splunk, Elastic SIEM oder Microsoft Sentinel für zentrale Security-Monitoring.", "AI agent observability security guarantees full transparency over AI agents: security metrics (error rates, latency, token usage, tool-call frequency, anomaly indicators) provide real-time insights. Distributed tracing offers end-to-end visibility over multi-agent workflows with complete agent chains and tool calls. Structured security logging logs all security-relevant agent actions in JSON format for SIEM compatibility. Anomaly detection detects unusual agent behaviors with ML-based baseline models and rule-based alerts. SIEM integration connects with Splunk, Elastic SIEM or Microsoft Sentinel for central security monitoring.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten", "Jump to core concepts")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Security Metrics", pick(isDE, "Sicherheits-relevante Metriken für AI-Agents. Error Rates, Latency, Token Usage, Tool-Call Frequency und Anomalie-Indikatoren.", "Security-relevant metrics for AI agents. Error rates, latency, token usage, tool-call frequency and anomaly indicators.")],
              ["2. Distributed Tracing", pick(isDE, "End-to-End Tracing für Multi-Agent-Workflows. Vollständige Sichtbarkeit über Agent-Ketten und Tool-Aufrufe.", "End-to-end tracing for multi-agent workflows. Full visibility over agent chains and tool calls.")],
              ["3. Structured Security Logging", pick(isDE, "Strukturiertes Logging aller sicherheitsrelevanten Agent-Aktionen. JSON-Format für SIEM-Kompatibilität.", "Structured logging of all security-relevant agent actions. JSON format for SIEM compatibility.")],
              ["4. Anomaly Detection", pick(isDE, "Automatische Erkennung ungewöhnlicher Agent-Verhaltensweisen. ML-basierte Baseline-Modelle und Rule-basierte Alerts.", "Automatic detection of unusual agent behaviors. ML-based baseline models and rule-based alerts.")],
              ["5. SIEM Integration", pick(isDE, "Integration mit Security Information and Event Management Systemen. Splunk, Elastic SIEM oder Microsoft Sentinel.", "Integration with Security Information and Event Management systems. Splunk, Elastic SIEM or Microsoft Sentinel.")],
            ].map(([title, desc]) => (
              <div key={title as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700/50 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "OpenTelemetry für AI-Agents", "OpenTelemetry for AI Agents")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "Standardisierte Observability mit OpenTelemetry. Einheitliche Traces, Metrics und Logs über alle Agent-Komponenten.", "Standardized observability with OpenTelemetry. Unified traces, metrics and logs across all agent components.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700/50 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Behavioral Baselines", "Behavioral Baselines")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "ML-basierte Verhaltens-Baselines für jeden Agent. Erkennung von Drift und abnormalem Verhalten in Echtzeit.", "ML-based behavioral baselines for each agent. Detection of drift and abnormal behavior in real-time.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700/50 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Security Dashboards", "Security Dashboards")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Echtzeit Security Dashboards mit Grafana oder Kibana. SOC-ready Visualisierungen für AI-Agent-Security.", "Real-time security dashboards with Grafana or Kibana. SOC-ready visualizations for AI agent security.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700/50 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Alert Fatigue vermeiden", "Avoid Alert Fatigue")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Intelligente Alert-Aggregation und Priorisierung. ML-basiertes Alert Scoring und automatische Deduplizierung.", "Intelligent alert aggregation and prioritization. ML-based alert scoring and automatic deduplication.")}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "OpenTelemetry SDK integrieren", "Integrate OpenTelemetry SDK"), pick(isDE, "OTel SDK in alle Agent-Komponenten einbinden. Auto-Instrumentation wo möglich, manuell für Custom Spans.", "Integrate OTel SDK into all agent components. Auto-instrumentation where possible, manual for custom spans.")],
              [2, pick(isDE, "Security Events definieren", "Define security events"), pick(isDE, "Katalog sicherheitsrelevanter Events erstellen. Tool-Calls, Fehler, Auth-Events und Policy-Verletzungen.", "Create catalog of security-relevant events. Tool calls, errors, auth events and policy violations.")],
              [3, pick(isDE, "SIEM verbinden", "Connect SIEM"), pick(isDE, "Logs und Events an SIEM weiterleiten. Format normalisieren (CEF oder LEEF) für einfache Korrelation.", "Forward logs and events to SIEM. Normalize format (CEF or LEEF) for easy correlation.")],
              [4, pick(isDE, "Anomaly Detection konfigurieren", "Configure anomaly detection"), pick(isDE, "ML-Modelle für Baseline-Verhalten trainieren. Alerts bei Abweichungen > 2 Standardabweichungen.", "Train ML models for baseline behavior. Alerts on deviations > 2 standard deviations.")],
              [5, pick(isDE, "Incident Response verknüpfen", "Link incident response"), pick(isDE, "Alerts direkt mit IR-Playbooks verknüpfen. PagerDuty, Opsgenie oder automatisierte SOAR-Workflows.", "Link alerts directly to IR playbooks. PagerDuty, Opsgenie or automated SOAR workflows.")],
            ].map(([n, title, desc]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div>
                  <div className="font-semibold text-gray-100 mb-2">{title}</div>
                  <div className="text-sm text-gray-300">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur auf Schwachstellen prüfen", "Check infrastructure for vulnerabilities")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Roast My Moltbot</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Moltbot Security Testing", "Moltbot security testing")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Observability Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Observability Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent observability security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
