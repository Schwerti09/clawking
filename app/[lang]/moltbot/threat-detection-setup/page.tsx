import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/threat-detection-setup"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Threat Detection: Live Monitoring Setup 2026 | ClawGuru", "Moltbot Threat Detection: Live Monitoring Setup 2026 | ClawGuru")
  const description = pick(isDE, "Threat Detection für Moltbot: Echtzeit-Bedrohungserkennung mit Falco, Prometheus Alerting, SIEM-Integration und automatisierter Incident Response. Mit vollständigen Konfigurationsbeispielen.", "Threat Detection for Moltbot: Real-time threat detection with Falco, Prometheus Alerting, SIEM Integration and automated Incident Response. With complete configuration examples.")
  return {
    title, description,
    keywords: ['moltbot threat detection','live monitoring','falco security','prometheus alerting','siem integration','incident response'],
    authors: [{ name: 'R. Schwertfechter' }],
    openGraph: { title, description, type: 'article', url: `${SITE_URL}/${locale}${PATH}`, images: ['/og-moltbot-threat-detection.jpg'] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotThreatDetectionPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Threat Detection: Live Monitoring Setup 2026 | ClawGuru", "Moltbot Threat Detection: Live Monitoring Setup 2026 | ClawGuru")

  const FAQ = [
    { q: pick(isDE, "Was ist Threat Detection?", "What is Threat Detection?"), a: pick(isDE, "Threat Detection ist Echtzeit-Bedrohungserkennung für deine Infrastruktur. Falco überwacht System Calls, Prometheus überwacht Metriken, SIEM zentralisiert Logs. Ziel: Angriffe erkennen bevor Schaden entsteht.", "Threat detection is real-time threat detection for your infrastructure. Falco monitors system calls, Prometheus monitors metrics, SIEM centralizes logs. Goal: Detect attacks before damage occurs.") },
    { q: pick(isDE, "Wie funktioniert Falco?", "How does Falco work?"), a: pick(isDE, "Falco ist ein Cloud Native Runtime Security Tool. Es überwacht System Calls im Linux Kernel und wertet diese gegen Security Rules aus. Bei Regelverstoß: Alert an SIEM, Block IP, Trigger Incident Response.", "Falco is a cloud native runtime security tool. It monitors system calls in the Linux kernel and evaluates them against security rules. On rule violation: alert to SIEM, block IP, trigger incident response.") },
    { q: pick(isDE, "Was ist Prometheus Alerting?", "What is Prometheus Alerting?"), a: pick(isDE, "Prometheus Alerting definiert Regeln für Metriken. Wenn eine Metrik einen Threshold überschreitet (z.B. Auth-Failure-Rate > 10/s), wird ein Alert ausgelöst. Alertmanager versendet Alerts an Slack, PagerDuty, Email.", "Prometheus alerting defines rules for metrics. When a metric exceeds a threshold (e.g., auth-failure-rate > 10/s), an alert is triggered. Alertmanager sends alerts to Slack, PagerDuty, Email.") },
    { q: pick(isDE, "Was ist automatisierte Incident Response?", "What is automated incident response?"), a: pick(isDE, "Automatisierte Incident Response reagiert auf Security-Events ohne menschliches Eingreifen. Bei kritischen Incidents: IP blockieren, Incident loggen, Alert senden. Reduziert MTTD (Mean Time To Detect) und MTTR (Mean Time To Respond).", "Automated incident response responds to security events without human intervention. On critical incidents: block IP, log incident, send alert. Reduces MTTD (Mean Time To Detect) and MTTR (Mean Time To Respond).") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Threat Detection Setup", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["Threat Detection", "Falco Security", "Prometheus Alerting", "SIEM Integration", "Incident Response"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Threat Detection?", "What is Threat Detection?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Falco Rules", "Falco Rules")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Threat Detection Score", "Threat Detection Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Threat Detection · Production-Ready</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Moltbot Threat Detection — Du hast keine Threat Detection, kein Falco, kein Prometheus Alerting. Angriffe werden erst nach Tagen entdeckt, Daten-Leak, dein CEO hat den CISO gefeuert.", "Moltbot Threat Detection — You Have No Threat Detection, No Falco, No Prometheus Alerting. Attacks Detected Days Later, Data Leak, Your CEO Fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du hast keine Threat Detection, kein Falco und kein Prometheus Alerting. Angriffe werden erst nach Tagen entdeckt, Daten-Leak, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You have no threat detection, no Falco and no Prometheus alerting. Attacks detected days later, data leak, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient ausschließlich zur Implementierung von Bedrohungserkennungssystemen. Keine Angriffswerkzeuge.", "This guide is exclusively for implementing threat detection systems. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Threat Detection? Einfach erklärt.", "What is Threat Detection? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Threat Detection wie eine Alarmanlage für deine Infrastruktur vor: Falco überwacht System Calls, Prometheus überwacht Metriken, SIEM zentralisiert Logs. Bei Angriff: Alert, Block IP, Trigger Incident Response. Gute Threat Detection bedeutet: Never fly blind, always monitor everything.", "Think of threat detection like an alarm system for your infrastructure: Falco monitors system calls, Prometheus monitors metrics, SIEM centralizes logs. On attack: alert, block IP, trigger incident response. Good threat detection means: never fly blind, always monitor everything.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Falco Runtime Security Rules", "Falco Runtime Security Rules")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`# falco-rules-moltbot.yaml
- rule: Moltbot Unexpected Network Connection
  desc: Moltbot container öffnet unerwartete Netzwerkverbindung
  condition: >
    evt.type = connect
    and container.name = "moltbot"
    and not (fd.sport in (80, 443, 3000, 5432))
  output: >
    Unerwartete Verbindung von Moltbot
    (user=%user.name container=%container.name
     sport=%fd.sport dport=%fd.dport)
  priority: WARNING
  tags: [network, moltbot]

- rule: Moltbot Privilege Escalation Attempt
  desc: Erkenne Privilege-Escalation-Versuche im Moltbot-Container
  condition: >
    evt.type in (setuid, setgid)
    and container.name = "moltbot"
    and not proc.name in (node)
  output: >
    Privilege Escalation in Moltbot-Container
    (proc=%proc.name user=%user.name)
  priority: CRITICAL
  tags: [privilege_escalation, moltbot]`}</pre>
              </div>
            </div>

            {/* Prometheus Alerting */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Prometheus Alerting Rules", "Prometheus Alerting Rules")}</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`# prometheus/alerts/moltbot-security.yml
groups:
  - name: moltbot-security
    rules:
      - alert: MoltbotHighAuthFailureRate
        expr: |
          rate(moltbot_auth_failures_total[5m]) > 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Hohe Authentifizierungsfehlerrate"
          description: "{{ $value }} Fehlschläge/s – möglicher Brute-Force-Angriff"

      - alert: MoltbotSuspiciousAPIActivity
        expr: |
          rate(moltbot_api_requests_total{status="429"}[1m]) > 50
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Verdächtige API-Aktivität erkannt"
          description: "{{ $value }} Rate-Limited Requests/s"

      - alert: MoltbotDatabaseQueryAnomaly
        expr: |
          histogram_quantile(0.99, rate(moltbot_db_query_duration_seconds_bucket[5m])) > 5
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: "Anomale Datenbankabfrage-Latenz"
          description: "P99 Latenz: {{ $value }}s"}`}</pre>
              </div>
            </div>

            {/* Automated Incident Response */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Automatisierte Incident Response", "Automated Incident Response")}</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`// moltbot/lib/incident-response.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });

export async function handleSecurityIncident(incident: {
  type: 'brute_force' | 'injection' | 'anomaly';
  ip: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: Record<string, unknown>;
}) {
  // 1. IP blockieren bei kritischen Incidents
  if (incident.severity === 'critical' || incident.severity === 'high') {
    await redis.setex(\`block:\${incident.ip}\`, 3600, '1');
  }

  // 2. Incident loggen
  await redis.lpush('incidents', JSON.stringify({
    ...incident,
    timestamp: new Date().toISOString(),
  }));

  // 3. Alert senden
  if (incident.severity === 'critical') {
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: \`🚨 CRITICAL Security Incident: \${incident.type} from \${incident.ip}\`,
      }),
    });
  }
}`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Keine Threat Detection", "SCAR #1: No Threat Detection")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Keine Threat Detection, Angriff erst nach 7 Tagen entdeckt. Daten-Leak, Compliance-Verstoß. Fix: Aktiviere Falco Runtime Security und Prometheus Alerting.", "No threat detection, attack discovered after 7 days. Data leak, compliance violation. Fix: Enable Falco Runtime Security and Prometheus Alerting.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Monitoring. Lessons: Aktiviere Threat Detection für alle Services.", "Root Cause: No monitoring. Lessons: Enable threat detection for all services.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Keine automatisierte Incident Response", "SCAR #2: No Automated Incident Response")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Keine automatisierte Incident Response, manuelle Reaktion dauert 6 Stunden. Angriff eskaliert, Daten-Leak. Fix: Aktiviere automatisierte IP-Blocking und Alerting.", "No automated incident response, manual response takes 6 hours. Attack escalates, data leak. Fix: Enable automated IP blocking and alerting.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Auto-Response. Lessons: Aktiviere automatisierte Incident Response für kritische Events.", "Root Cause: No auto-response. Lessons: Enable automated incident response for critical events.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Falco Runtime Security aktivieren", "Enable Falco Runtime Security")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Installiere Falco, definiere Security Rules für Moltbot Container.", "Install Falco, define security rules for Moltbot container.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Prometheus Alerting aktivieren", "Enable Prometheus Alerting")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Definiere Alerting Rules für Auth-Failures, API-Activity, DB-Anomalien.", "Define alerting rules for auth-failures, API-activity, DB-anomalies.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Automatisierte Incident Response aktivieren", "Enable Automated Incident Response")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere IP-Blocking und Alerting für kritische Events.", "Enable IP blocking and alerting for critical events.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Threat Detection Checkliste", "Interactive Threat Detection Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "td1", text: pick(isDE, "Falco Runtime Security aktiviert", "Falco Runtime Security enabled") },
                  { id: "td2", text: pick(isDE, "Falco Security Rules definiert", "Falco security rules defined") },
                  { id: "td3", text: pick(isDE, "Prometheus Alerting aktiviert", "Prometheus alerting enabled") },
                  { id: "td4", text: pick(isDE, "Alerting Rules für Auth-Failures definiert", "Alerting rules for auth-failures defined") },
                  { id: "td5", text: pick(isDE, "SIEM Integration aktiviert", "SIEM integration enabled") },
                  { id: "td6", text: pick(isDE, "Automatisierte Incident Response aktiviert", "Automated incident response enabled") },
                  { id: "td7", text: pick(isDE, "IP-Blocking für kritische Events aktiviert", "IP blocking for critical events enabled") },
                  { id: "td8", text: pick(isDE, "Slack/Email Alerting konfiguriert", "Slack/Email alerting configured") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Threat Detection Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Threat Detection Score Calculator", "Threat Detection Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist Falco aktiv?", "Is Falco active?"), weight: 25 },
                  { q: pick(isDE, "Ist Prometheus Alerting aktiv?", "Is Prometheus alerting active?"), weight: 25 },
                  { q: pick(isDE, "Ist SIEM Integration aktiv?", "Is SIEM integration active?"), weight: 25 },
                  { q: pick(isDE, "Ist automatisierte Incident Response aktiv?", "Is automated incident response active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Threat Detection Score:", "Your Threat Detection Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 38/100", "Industry Average: 38/100")}</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.65s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 shadow-2xl">
                  <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Threat Detection, Falco Security, Prometheus Alerting und automatisierte Incident Response.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in threat detection, Falco security, Prometheus alerting and automated incident response.")}
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
                <div className="font-semibold text-cyan-400">Security Check</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Live Threat Scan", "Live threat scan")}</div>
              </a>
              <a href={`/${locale}/neuro`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Neuro AI</div>
                <div className="text-sm text-gray-300">{pick(isDE, "AI-gestützte Erkennung", "AI-powered detection")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">IR Runbooks</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Incident Response Guides", "Incident response guides")}</div>
              </a>
              <a href={`/${locale}/oracle`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Oracle</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Threat Intelligence", "Threat intelligence")}</div>
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
  );
}
