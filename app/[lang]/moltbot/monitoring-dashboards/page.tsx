import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/monitoring-dashboards"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Monitoring & Security Dashboards: Grafana Setup 2026 | ClawGuru", "Moltbot Monitoring & Security Dashboards: Grafana Setup 2026 | ClawGuru")
  const description = pick(isDE, "Security Monitoring für Moltbot mit Grafana und Prometheus. Real-time Dashboards, Anomalie-Erkennung, SLA-Tracking und Security KPIs. Production-ready Monitoring Stack.", "Security monitoring for Moltbot with Grafana and Prometheus. Real-time dashboards, anomaly detection, SLA tracking and security KPIs. Production-ready monitoring stack.")
  return {
    title, description,
    keywords: ['moltbot monitoring','grafana security dashboard','prometheus metrics','security kpi','anomaly detection','sla monitoring'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotMonitoringPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Monitoring Dashboards", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot Monitoring Guide", "Moltbot Monitoring Guide"), description: pick(isDE, "Monitoring und Security Dashboards", "Monitoring and security dashboards"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Monitoring dient der defensiven Überwachung eigener Systeme. Keine Angriffswerkzeuge.", "Monitoring serves defensive surveillance of own systems. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Monitoring</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot Monitoring & Security Dashboards", "Moltbot Monitoring & Security Dashboards")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Real-time Security Visibility für Moltbot — Grafana Dashboards, Prometheus Metriken und automatisierte Anomalie-Erkennung.", "Real-time security visibility for Moltbot — Grafana dashboards, Prometheus metrics and automated anomaly detection.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Security Monitoring? Einfach erklärt", "What is Security Monitoring? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Security Monitoring ist wie ein Sicherheits-Kamera-System für IT-Infrastruktur: es überwacht Systeme in Echtzeit und alarmiert bei Anomalien. Prometheus sammelt Metriken wie CPU, Speicher und Requests. Grafana visualisiert Daten in Dashboards. Anomalie-Erkennung identifiziert ungewöhnliches Verhalten. SLA-Tracking überwacht Service-Level-Agreements. Ohne Monitoring bleiben Angriffe unbemerkt bis zu spät.", "Security monitoring is like a security camera system for IT infrastructure: it monitors systems in real-time and alerts on anomalies. Prometheus collects metrics like CPU, memory and requests. Grafana visualizes data in dashboards. Anomaly detection identifies unusual behavior. SLA tracking monitors service-level agreements. Without monitoring, attacks remain unnoticed until too late.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu KPIs und Metriken", "Jump to KPIs and metrics")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "📊 Security KPIs Dashboard", "📊 Security KPIs Dashboard")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { kpi: pick(isDE, 'Auth Failure Rate', 'Auth Failure Rate'), target: '< 1%', current: '0.3%', status: 'green' },
                { kpi: pick(isDE, 'API Error Rate', 'API Error Rate'), target: '< 0.5%', current: '0.1%', status: 'green' },
                { kpi: pick(isDE, 'P99 Latency', 'P99 Latency'), target: '< 200ms', current: '145ms', status: 'green' },
                { kpi: pick(isDE, 'Blocked IPs (24h)', 'Blocked IPs (24h)'), target: '< 100', current: '23', status: 'green' },
                { kpi: pick(isDE, 'Security Incidents', 'Security Incidents'), target: '0 P1/P2', current: '0', status: 'green' },
                { kpi: pick(isDE, 'SSL Cert Expiry', 'SSL Cert Expiry'), target: '> 30 Tage', current: '87 Tage', status: 'green' },
              ].map(({ kpi, target, current, status }) => (
                <div key={kpi} className={`p-4 rounded-lg border backdrop-blur-lg ${status === 'green' ? 'bg-green-900/80 border-green-700' : status === 'yellow' ? 'bg-amber-900/80 border-yellow-700' : 'bg-red-900/80 border-red-700'}`}>
                  <div className="font-semibold text-sm mb-1 text-gray-200">{kpi}</div>
                  <div className="text-2xl font-bold text-gray-100">{current}</div>
                  <div className="text-xs text-gray-400">{pick(isDE, 'Ziel:', 'Target:')} {target}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "📈 Prometheus Metriken für Moltbot", "📈 Prometheus Metrics for Moltbot")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`// moltbot/lib/metrics.ts
import { Counter, Histogram, Gauge, register } from 'prom-client';

export const metrics = {
  authRequests: new Counter({
    name: 'moltbot_auth_requests_total',
    help: 'Gesamte Auth-Anfragen',
    labelNames: ['method', 'status'],
  }),

  authLatency: new Histogram({
    name: 'moltbot_auth_duration_seconds',
    help: 'Auth-Anfrage Latenz',
    buckets: [0.001, 0.01, 0.05, 0.1, 0.5, 1.0],
  }),

  activeConnections: new Gauge({
    name: 'moltbot_active_connections',
    help: 'Aktive WebSocket/HTTP Verbindungen',
  }),

  blockedRequests: new Counter({
    name: 'moltbot_blocked_requests_total',
    help: 'Geblockte Requests',
    labelNames: ['reason'],  // 'rate_limit', 'ip_block', 'auth_fail'
  }),

  threatScore: new Histogram({
    name: 'moltbot_threat_score',
    help: 'Bedrohungs-Score pro Request',
    buckets: [10, 20, 40, 60, 80, 90, 100],
  }),
};

// /api/metrics Endpoint (Prometheus scrape target)
export async function GET() {
  return new Response(await register.metrics(), {
    headers: { 'Content-Type': register.contentType },
  });
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Live Metrics", "Live metrics")}</div>
            </a>
            <a href={`/${locale}/neuro`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Neuro AI</div>
              <div className="text-sm text-gray-300">{pick(isDE, "AI Anomalie-Erkennung", "AI anomaly detection")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Monitoring Guides", "Monitoring guides")}</div>
            </a>
            <a href={`/${locale}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Oracle</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Threat Intelligence", "Threat intelligence")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Monitoring Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Monitoring-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with monitoring implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
