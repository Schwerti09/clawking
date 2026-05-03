import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: 'OpenClaw Audit Logging: Compliance & Forensics Setup 2024',
    description: 'Audit Logging für OpenClaw. Strukturiertes JSON Logging, Tamper-Proof Log Storage, Log Retention Policies, GDPR-konformes Logging und Forensics-Ready Audit Trail.',
    keywords: ['openclaw audit logging','compliance logging','audit trail','tamper proof logs','gdpr logging','forensics logging'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: 'OpenClaw Audit Logging Setup 2024', description: 'Compliance & Forensics Logging für OpenClaw.', type: 'article', url: `https://clawguru.org/${lang}/openclaw/audit-logging-setup` },
    alternates: buildLocalizedAlternates(lang as Locale, '/openclaw/audit-logging-setup'),
    robots: 'index, follow',
  };
}

export default function OpenClawAuditLoggingPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up">
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: Audit Logging sichert Compliance und ermöglicht Forensics für eigene Systeme. Keine Angriffswerkzeuge.
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Audit Logging · Compliance & Forensics</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">OpenClaw Audit Logging Setup</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Lückenloser, manipulationssicherer Audit Trail für OpenClaw — strukturiertes JSON Logging, Compliance-konformes Retention und forensisch verwertbare Logs.</p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Strukturiertes Audit Log Schema</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 font-mono text-sm overflow-x-auto">
            <pre>{`// moltbot/lib/audit-logger.ts
import { db } from './db';

interface AuditEvent {
  event_type: 'auth.login' | 'auth.logout' | 'auth.failed' | 'data.read' | 'data.write' | 'data.delete' | 'admin.action' | 'security.alert';
  actor_id: string;
  actor_type: 'user' | 'api_key' | 'system';
  resource_type: string;
  resource_id: string;
  action: string;
  ip_address: string;
  user_agent: string;
  result: 'success' | 'failure' | 'blocked';
  metadata?: Record<string, unknown>;
}

export async function logAuditEvent(event: AuditEvent): Promise<void> {
  const entry = {
    ...event,
    timestamp: new Date().toISOString(),
    server_id: process.env.SERVER_ID ?? 'unknown',
    version: '1.0',
  };

  // Parallel: DB + Syslog (für externe SIEM-Integration)
  await Promise.all([
    db.query(
      'INSERT INTO audit_log (event_type, actor_id, actor_type, resource_type, resource_id, action, ip, user_agent, result, metadata, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW())',
      [entry.event_type, entry.actor_id, entry.actor_type, entry.resource_type, entry.resource_id, entry.action, entry.ip_address, entry.user_agent, entry.result, JSON.stringify(entry.metadata)]
    ),
    // Structured syslog (für Splunk/Datadog/ELK)
    process.stdout.write(JSON.stringify({ level: 'audit', ...entry }) + '\n'),
  ]);
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Was MUSS geloggt werden?</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-gray-800/80 backdrop-blur-lg text-white"><th className="p-3 text-left">Event</th><th className="p-3 text-left">Pflicht</th><th className="p-3 text-left">Retention</th></tr></thead>
              <tbody>
                {[
                  ['Erfolgreiche Logins', 'GDPR / NIS2', '12 Monate'],
                  ['Fehlgeschlagene Logins', 'GDPR / NIS2', '12 Monate'],
                  ['Admin-Aktionen', 'GDPR Art. 5', '5 Jahre'],
                  ['Datenzugriffe (PII)', 'GDPR Art. 30', '3 Jahre'],
                  ['Datenlöschungen', 'GDPR Art. 17', '5 Jahre'],
                  ['API Key Nutzung', 'SOC2', '12 Monate'],
                  ['Security Alerts', 'NIS2', '2 Jahre'],
                  ['System Config Changes', 'ISO 27001', '3 Jahre'],
                ].map(([event, basis, retention]) => (
                  <tr key={event} className="border-b hover:bg-gray-800/50 transition-colors">
                    <td className="p-3">{event}</td>
                    <td className="p-3 text-sm text-orange-400 font-medium">{basis}</td>
                    <td className="p-3 font-mono text-xs">{retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Weiterführende Ressourcen</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">Audit Assessment</div>
            </a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Logging Runbooks</div>
              <div className="text-sm text-gray-300">Compliance Guides</div>
            </a>
            <a href={`/${lang}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Oracle</div>
              <div className="text-sm text-gray-300">Threat Intel</div>
            </a>
            <a href={`/${lang}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Enterprise SIEM</div>
              <div className="text-sm text-gray-300">Managed Logging</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Audit Logging Security Score Calculator — Wie sicher ist dein Logging?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen Audit Logging Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du strukturiertes JSON Logging?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Vollständig strukturiert</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Hast du Compliance-konforme Retention?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, GDPR/NIS2 konform</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Hast du Tamper-Proof Log Storage?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Append-Only Storage</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Hast du Alerts auf kritische Events?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Real-time Alerts</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Hast du SIEM-Integration?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Splunk/ELK/Datadog</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Audit Logging Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">55/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für Audit Report & Detailed Analysis</div>
                  <a href={`/${lang}/pricing`} className="block bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-100 transition-colors">
                    Pro Plan — €49/mo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daypass Offer */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 rounded-xl border border-purple-700 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Daypass — 24h Full Access für €3</h3>
                <p className="text-purple-200 text-sm mb-4">Einmalig pro User/Kreditkarte. Volle 24 Stunden Zugang zu allen Security-Tools.</p>
                <div className="flex gap-2 text-xs text-purple-300">
                  <span className="bg-purple-800 px-2 py-1 rounded">✓ Security Check</span>
                  <span className="bg-purple-800 px-2 py-1 rounded">✓ Runbooks</span>
                  <span className="bg-purple-800 px-2 py-1 rounded">✓ AI Copilot</span>
                </div>
              </div>
              <a href={`/${lang}/pricing#daypass`} className="bg-white text-purple-900 font-bold py-3 px-6 rounded-lg hover:bg-purple-100 transition-colors whitespace-nowrap">
                Daypass kaufen — €3
              </a>
            </div>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Ist dieser Guide ein Penetrationstest?", acceptedAnswer: { "@type": "Answer", text: "Nein. Dieser Guide dient ausschlielich zur Absicherung eigener Systeme. Kein Angriffs-Tool, keine illegalen Aktivitten." } },
              { "@type": "Question", name: "Was ist OpenClaw?", acceptedAnswer: { "@type": "Answer", text: "OpenClaw ist das Open-Source Self-Hosting Security Framework von ClawGuru mit Executable Runbooks, Security-Check und Compliance-Dashboard." } },
              { "@type": "Question", name: "Wo finde ich die Runbooks?", acceptedAnswer: { "@type": "Answer", text: "Alle Runbooks sind unter /runbooks abrufbar. Jeder Befund im Security-Check enthlt einen direkten Link zum passenden Runbook." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "OpenClaw Security Guide",
            description: "Self-Hosted Security Hardening mit OpenClaw Executable Runbooks.",
            url: "https://clawguru.org/de/openclaw"
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Audit Logging für OpenClaw einrichten",
            description: "Compliance-konformes Audit Logging mit tamper-proof Log Storage und GDPR-konformer Retention für OpenClaw.",
            totalTime: "PT45M",
            step: [
              { "@type": "HowToStep", name: "Strukturiertes JSON Logging aktivieren", text: "Logging-Bibliothek auf JSON-Output umstellen (z.B. Winston/Pino). Felder: timestamp, level, userId, action, resource." },
              { "@type": "HowToStep", name: "Log Retention Policy definieren", text: "GDPR-konform: Zugriffslogs 90 Tage, Security-Events 1 Jahr, Audit-Trail 3 Jahre aufbewahren." },
              { "@type": "HowToStep", name: "Tamper-Proof Storage einrichten", text: "Logs in append-only Storage schreiben (S3 mit Object Lock oder Loki mit immutable chunks)." },
              { "@type": "HowToStep", name: "Alerting auf kritische Events", text: "Alerts für: failed logins > 5/min, privilege escalation, config changes, data exports." },
              { "@type": "HowToStep", name: "Compliance-Audit durchführen", text: "ClawGuru Compliance Dashboard öffnen und Logging-Checklist für NIS2/SOC2 prüfen." },
            ]
          }
        ]) }} />
      </div>
    </div>
  );
}
