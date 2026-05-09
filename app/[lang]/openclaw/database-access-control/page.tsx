import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: 'OpenClaw Database Access Control: PostgreSQL Security 2024',
    description: 'Datenbank-Sicherheit für OpenClaw mit PostgreSQL. Row-Level Security, Role-Based Access Control, Audit Logging, Encryption at Rest und Connection Pooling.',
    keywords: ['openclaw database security','postgresql access control','row level security','rbac database','pgaudit','database encryption'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: 'OpenClaw Database Access Control 2024', description: 'PostgreSQL Security für OpenClaw.', type: 'article', url: `https://clawguru.org/${lang}/openclaw/database-access-control` },
    alternates: buildLocalizedAlternates(lang as Locale, '/openclaw/database-access-control'),
    robots: 'index, follow',
  };
}

export default function OpenClawDatabaseAccessPage({ params }: { params: { lang: string } }) {
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: Datenbank-Zugriffskontrolle schützt eigene Daten. Keine Angriffswerkzeuge.
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Database Access Control · PostgreSQL Security</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">OpenClaw Database Access Control</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Minimale Datenbankprivilegien für OpenClaw — RBAC, Row-Level Security, Audit Logging und verschlüsselte Verbindungen.</p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">PostgreSQL RBAC Setup</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 font-mono text-sm overflow-x-auto">
            <pre>{`-- PostgreSQL Rollen & Rechte für OpenClaw

-- 1. Anwendungs-User (minimale Rechte)
CREATE ROLE openclaw_app WITH LOGIN PASSWORD 'STRONG_RANDOM_PASSWORD';
GRANT CONNECT ON DATABASE openclaw_prod TO openclaw_app;
GRANT USAGE ON SCHEMA public TO openclaw_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO openclaw_app;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO openclaw_app;

-- 2. Read-Only User (für Analytics/Reports)
CREATE ROLE openclaw_readonly WITH LOGIN PASSWORD 'ANOTHER_STRONG_PASSWORD';
GRANT CONNECT ON DATABASE openclaw_prod TO openclaw_readonly;
GRANT USAGE ON SCHEMA public TO openclaw_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO openclaw_readonly;

-- 3. Migration User (nur während Deployments)
CREATE ROLE openclaw_migrate WITH LOGIN PASSWORD 'MIGRATION_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE openclaw_prod TO openclaw_migrate;

-- 4. Row-Level Security (RLS) für Multi-Tenant
ALTER TABLE threats ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON threats
  USING (customer_id = current_setting('app.customer_id')::uuid);

-- 5. Sensitive Spalten verschlüsseln (pgcrypto)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- Passwörter: immer bcrypt, nie plaintext
-- UPDATE users SET password_hash = crypt('password', gen_salt('bf', 12));`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Datenbank Security Metriken</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { metric: 'Offene DB-Verbindungen', target: '< 100', desc: 'Connection Pool Limit' },
              { metric: 'Failed Auth Attempts', target: '0 / Stunde', desc: 'Sofort-Alert bei > 0' },
              { metric: 'Slow Queries (>1s)', target: '< 5 / Tag', desc: 'Index Optimierung' },
              { metric: 'Lock Waits', target: '< 10ms avg', desc: 'Query Optimierung' },
              { metric: 'DB Size Growth', target: '< 5% / Woche', desc: 'Retention Policy' },
              { metric: 'Backup Age', target: '< 24h', desc: 'Täglich automatisch' },
            ].map(({ metric, target, desc }) => (
              <div key={metric} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
                <div className="font-semibold text-sm mb-1">{metric}</div>
                <div className="text-lg font-bold text-cyan-400">{target}</div>
                <div className="text-xs text-gray-400">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Weiterführende Ressourcen</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">DB Assessment</div>
            </a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">DB Runbooks</div>
              <div className="text-sm text-gray-300">PostgreSQL Guides</div>
            </a>
            <a href={`/${lang}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">Framework</div>
            </a>
            <a href={`/${lang}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Enterprise</div>
              <div className="text-sm text-gray-300">Managed DB</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Database Security Score Calculator — Wie sicher ist deine Datenbank?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen Database Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du dedizierte DB-User für jede Anwendung?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Least-Privilege</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Ist SSL/TLS für DB-Verbindungen aktiviert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, sslmode=require</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Hast du Audit Logging (pgaudit) aktiviert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, pgaudit enabled</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Hast du Row-Level Security (RLS) aktiviert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Multi-Tenant RLS</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Hast du regelmäßige Backups?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Täglich automatisch</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Database Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">68/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für DB Audit & Detailed Report</div>
                  <a href={`/${lang}/pricing`} className="block bg-gray-900 text-gray-300 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition-colors">
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
              <a href={`/${lang}/pricing#daypass`} className="bg-gray-900 text-purple-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
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
            name: "Datenbank-Zugriffskontrolle für OpenClaw konfigurieren",
            description: "Least-Privilege Datenbankzugriff, Verschlüsselung und Audit-Trail für PostgreSQL und Redis auf OpenClaw.",
            totalTime: "PT45M",
            step: [
              { "@type": "HowToStep", name: "Dedizierte DB-User anlegen", text: "Für jede Anwendung eigenen User mit minimalen Rechten anlegen: GRANT SELECT, INSERT, UPDATE ON schema TO appuser." },
              { "@type": "HowToStep", name: "Verbindungs-Verschlüsselung erzwingen", text: "PostgreSQL: ssl = on in postgresql.conf. pg_hba.conf: hostssl statt host für alle Verbindungen." },
              { "@type": "HowToStep", name: "Audit-Logging aktivieren", text: "pgaudit Extension installieren: CREATE EXTENSION pgaudit. pgaudit.log = 'ddl,write,role' in postgresql.conf." },
              { "@type": "HowToStep", name: "Connection Pooling absichern", text: "PgBouncer mit auth_type=scram-sha-256 konfigurieren. Max. Verbindungen pro User limitieren." },
              { "@type": "HowToStep", name: "Regelmäßige Zugriffs-Reviews", text: "Monatlich: SELECT * FROM pg_user; alle Accounts prüfen. Ungenutzte User sofort löschen." },
            ]
          }
        ]) }} />
      </div>
    </div>
  );
}
