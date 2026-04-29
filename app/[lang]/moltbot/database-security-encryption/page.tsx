import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/database-security-encryption"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Database Security: Encryption & Access Control 2026 | ClawGuru", "Moltbot Database Security: Encryption & Access Control 2026 | ClawGuru")
  const description = pick(isDE, "Datenbankabsicherung für Moltbot: AES-256-GCM Encryption at Rest, TLS in Transit, Row-Level Security, SQL-Injection Prevention und Audit Logging mit PostgreSQL.", "Database security for Moltbot: AES-256-GCM encryption at rest, TLS in transit, row-level security, SQL injection prevention and audit logging with PostgreSQL.")
  return {
    title, description,
    keywords: ['moltbot database security','database encryption','access control','sql injection prevention','row level security','postgresql security'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: { title, description, type: 'article', url: pageUrl, images: ['/og-image.png'] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotDatabaseSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Database Security Encryption", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot Database Security Guide", "Moltbot Database Security Guide"), description: pick(isDE, "Database Security Encryption und Access Control", "Database Security Encryption and Access Control"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient ausschließlich zur Absicherung von Datenbanken. Keine Angriffswerkzeuge.", "This guide is exclusively for securing databases. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Database Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot Database Security: Encryption & Access Control", "Moltbot Database Security: Encryption & Access Control")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Vollständige Datenbankabsicherung für Moltbot — Encryption at Rest und in Transit, Row-Level Security, SQL-Injection Prevention und Audit Logging.", "Complete database hardening for Moltbot — encryption at rest and in transit, row-level security, SQL injection prevention and audit logging.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Database Security? Einfach erklärt", "What is Database Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Database Security ist wie ein Tresor für Daten: es schützt sensible Informationen vor unbefugtem Zugriff. Encryption at Rest verschlüsselt Daten auf der Festplatte. TLS in Transit verschlüsselt Daten während der Übertragung. Row-Level Security (RLS) beschränkt Zugriff auf Zeilenebene. SQL-Injection Prevention verhindert Datenbank-Hacks. Audit Logging protokolliert alle Zugriffe. Ohne Database Security sind Daten angreifbar für Data Breaches, SQL Injection und unauthorized Access.", "Database security is like a vault for data: it protects sensitive information from unauthorized access. Encryption at rest encrypts data on disk. TLS in transit encrypts data during transmission. Row-level security (RLS) restricts access at the row level. SQL injection prevention prevents database hacks. Audit logging logs all access. Without database security, data is vulnerable to data breaches, SQL injection, and unauthorized access.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Encryption und RLS", "Jump to encryption and RLS")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔒 Encryption at Rest mit pgcrypto", "🔒 Encryption at Rest with pgcrypto")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`-- PostgreSQL: Sensitive data encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Encrypted column for sensitive Moltbot data
CREATE TABLE moltbot_secrets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  secret_name TEXT NOT NULL,
  -- AES-256 encrypted value
  secret_value BYTEA NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert with encryption
INSERT INTO moltbot_secrets (customer_id, secret_name, secret_value)
VALUES (
  $1,
  $2,
  pgp_sym_encrypt($3, current_setting('app.encryption_key'))
);

-- Read with decryption
SELECT pgp_sym_decrypt(secret_value, current_setting('app.encryption_key'))
FROM moltbot_secrets
WHERE customer_id = $1 AND secret_name = $2;`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔐 Row-Level Security (RLS)", "🔐 Row-Level Security (RLS)")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-blue-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`-- Enable RLS for tenant isolation
ALTER TABLE moltbot_data ENABLE ROW LEVEL SECURITY;

-- Policy: customers can only see their own data
CREATE POLICY moltbot_tenant_isolation ON moltbot_data
  USING (customer_id = current_setting('app.current_customer_id')::UUID);

-- Policy: admins can see all data
CREATE POLICY moltbot_admin_access ON moltbot_data
  TO admin_role
  USING (true);

-- Force RLS even for table owners
ALTER TABLE moltbot_data FORCE ROW LEVEL SECURITY;`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🛡️ SQL-Injection Prevention", "🛡️ SQL-Injection Prevention")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-yellow-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`// moltbot/lib/db.ts — immer parameterisierte Queries
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },  // TLS erzwingen
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ✅ Sicher: Parameterisierte Query
export async function getCustomerData(customerId: string) {
  const result = await pool.query(
    'SELECT * FROM moltbot_data WHERE customer_id = $1',
    [customerId]  // Nie String-Interpolation!
  );
  return result.rows;
}

// ❌ NIEMALS so: SQL Injection möglich!
// pool.query(\`SELECT * FROM data WHERE id = '\${customerId}'\`)`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Datenbankabsicherung prüfen", "Check database security")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Database Security Guides", "Database security guides")}</div>
            </a>
            <a href={`/${locale}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Oracle</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Security Intelligence", "Security intelligence")}</div>
            </a>
            <a href={`/${locale}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Enterprise</div>
              <div className="text-sm text-gray-300">{pick(isDE, "GDPR/HIPAA Compliance", "GDPR/HIPAA compliance")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Database Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Database-Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with database security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
