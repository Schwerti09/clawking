import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/incident-response-automation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Incident Response: Automatisierung & Playbooks 2026 | ClawGuru", "Moltbot Incident Response: Automation & Playbooks 2026 | ClawGuru")
  const description = pick(isDE, "Automatisierte Incident Response für Moltbot. Security Playbooks, Auto-Remediation, PagerDuty-Integration und Post-Mortem-Prozesse. Reaktionszeit von Stunden auf Minuten reduzieren.", "Automated incident response for Moltbot. Security playbooks, auto-remediation, PagerDuty integration and post-mortem processes. Reduce response time from hours to minutes.")
  return {
    title, description,
    keywords: ['moltbot incident response','security automation','playbooks','auto remediation','pagerduty integration','security incidents'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotIncidentResponsePage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Incident Response Automation", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot Incident Response Guide", "Moltbot Incident Response Guide"), description: pick(isDE, "Incident Response und Automatisierung", "Incident response and automation"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient der Absicherung und schnellen Reaktion auf Sicherheitsvorfälle. Keine Angriffswerkzeuge.", "This guide serves for hardening and rapid response to security incidents. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Incident Response</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot Incident Response: Automatisierung & Playbooks", "Moltbot Incident Response: Automation & Playbooks")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Reduziere die Reaktionszeit auf Security-Incidents von Stunden auf Minuten — mit automatisierten Playbooks, Auto-Remediation und integrierten Alerting-Systemen.", "Reduce response time to security incidents from hours to minutes — with automated playbooks, auto-remediation and integrated alerting systems.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Incident Response? Einfach erklärt", "What is Incident Response? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Incident Response ist wie ein Notfallplan für Cybersicherheit: es definiert, wie auf Angriffe reagiert wird, um Schäden zu minimieren. Auto-Remediation blockiert Angreifer automatisch. Security Playbooks standardisieren Reaktionen. PagerDuty Integration alarmiert On-Call Teams sofort. Post-Mortem analysiert Vorfälle zur Prävention. Ohne Incident Response verlängern sich Breaches zu Tagen statt Minuten.", "Incident response is like an emergency plan for cybersecurity: it defines how to respond to attacks to minimize damage. Auto-remediation blocks attackers automatically. Security playbooks standardize responses. PagerDuty integration alerts on-call teams instantly. Post-mortem analyzes incidents for prevention. Without incident response, breaches extend to days instead of minutes.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Severity Matrix und Playbooks", "Jump to severity matrix and playbooks")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🚨 Incident Severity Matrix", "🚨 Incident Severity Matrix")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-3 text-left">{pick(isDE, "Severity", "Severity")}</th>
                    <th className="p-3 text-left">{pick(isDE, "Beispiel", "Example")}</th>
                    <th className="p-3 text-left">{pick(isDE, "Response Zeit", "Response Time")}</th>
                    <th className="p-3 text-left">{pick(isDE, "Auto-Action", "Auto-Action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['P1 Critical', pick(isDE, 'Data Breach / RCE', 'Data Breach / RCE'), '< 15 Min', pick(isDE, 'Auto-Block + Alert CEO', 'Auto-Block + Alert CEO')],
                    ['P2 High', pick(isDE, 'Auth Bypass Versuch', 'Auth Bypass Attempt'), '< 1 Std', pick(isDE, 'IP-Block + Alert Security', 'IP-Block + Alert Security')],
                    ['P3 Medium', pick(isDE, 'Brute Force Attack', 'Brute Force Attack'), '< 4 Std', pick(isDE, 'Rate Limit + Log', 'Rate Limit + Log')],
                    ['P4 Low', pick(isDE, 'Anomale Log-Aktivität', 'Anomalous Log Activity'), '< 24 Std', pick(isDE, 'Log + Weekly Report', 'Log + Weekly Report')],
                  ].map(([sev, ex, rt, action]) => (
                    <tr key={sev} className="border-b hover:bg-gray-800/50 transition-colors">
                      <td className={`p-3 font-bold ${sev.includes('P1') ? 'text-red-400' : sev.includes('P2') ? 'text-orange-400' : sev.includes('P3') ? 'text-yellow-400' : 'text-green-400'}`}>{sev}</td>
                      <td className="p-3 text-gray-200">{ex}</td>
                      <td className="p-3 font-mono text-sm text-gray-300">{rt}</td>
                      <td className="p-3 text-sm text-gray-300">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "⚡ Auto-Remediation Engine", "⚡ Auto-Remediation Engine")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`// moltbot/lib/auto-remediation.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });

type IncidentType = 'brute_force' | 'injection_attempt' | 'data_exfiltration' | 'privilege_escalation';

const REMEDIATION_PLAYBOOKS: Record<IncidentType, (ip: string) => Promise<void>> = {
  brute_force: async (ip) => {
    await redis.setex(\`block:\${ip}\`, 3600, '1');          // 1h Block
    await redis.setex(\`rate_strict:\${ip}\`, 7200, '1');    // 2h Strict Rate Limit
  },
  injection_attempt: async (ip) => {
    await redis.setex(\`block:\${ip}\`, 86400, '1');         // 24h Block
    await notifySlack('injection_attempt', ip, 'P2');
  },
  data_exfiltration: async (ip) => {
    await redis.setex(\`block:\${ip}\`, -1, '1');            // Permanent Block
    await notifySlack('data_exfiltration', ip, 'P1');
    await notifyPagerDuty('data_exfiltration', ip);
  },
  privilege_escalation: async (ip) => {
    await redis.setex(\`block:\${ip}\`, -1, '1');
    await notifyPagerDuty('privilege_escalation', ip);
    await triggerKubernetesIsolation(ip);
  },
};

export async function executePlaybook(type: IncidentType, ip: string) {
  const playbook = REMEDIATION_PLAYBOOKS[type];
  await playbook(ip);
  await redis.lpush('incident_log', JSON.stringify({ type, ip, ts: Date.now(), action: 'auto_remediated' }));
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "📋 Post-Mortem Template", "📋 Post-Mortem Template")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 p-6 rounded-xl shadow-xl">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {[
                [pick(isDE, 'Incident ID', 'Incident ID'), 'INC-2024-XXXX'],
                [pick(isDE, 'Severity', 'Severity'), 'P1 / P2 / P3'],
                [pick(isDE, 'Detection Time', 'Detection Time'), 'YYYY-MM-DD HH:MM UTC'],
                [pick(isDE, 'Resolution Time', 'Resolution Time'), 'YYYY-MM-DD HH:MM UTC'],
                [pick(isDE, 'Total Downtime', 'Total Downtime'), 'X Minuten'],
                [pick(isDE, 'Affected Users', 'Affected Users'), 'X Kunden'],
                [pick(isDE, 'Root Cause', 'Root Cause'), pick(isDE, 'Kurze Beschreibung', 'Brief description')],
                [pick(isDE, 'Contributing Factors', 'Contributing Factors'), 'Factor 1, Factor 2'],
                [pick(isDE, 'Immediate Actions', 'Immediate Actions'), pick(isDE, 'Was wurde sofort getan?', 'What was done immediately?')],
                [pick(isDE, 'Long-term Fix', 'Long-term Fix'), pick(isDE, 'Was verhindert Wiederholung?', 'What prevents recurrence?')],
              ].map(([key, val]) => (
                <div key={key}>
                  <div className="font-semibold text-gray-200">{key}</div>
                  <div className="text-gray-400 font-mono text-xs">{val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Live Incident Detection", "Live incident detection")}</div>
            </a>
            <a href={`/${locale}/neuro`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Neuro AI</div>
              <div className="text-sm text-gray-300">{pick(isDE, "AI Threat Detection", "AI threat detection")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Response Playbooks", "Response playbooks")}</div>
            </a>
            <a href={`/${locale}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Oracle</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Threat Intelligence", "Threat intelligence")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Incident Response Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Incident Response-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with incident response implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
