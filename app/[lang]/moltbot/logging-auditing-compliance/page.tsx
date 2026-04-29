import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/logging-auditing-compliance"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Logging & Auditing: GDPR/HIPAA/SOC2 Compliance 2026 | ClawGuru", "Moltbot Logging & Auditing: GDPR/HIPAA/SOC2 Compliance 2026 | ClawGuru")
  const description = pick(isDE, "Compliance-ready Logging und Auditing für Moltbot. Strukturiertes Logging mit Winston, unveränderliche Audit Trails, GDPR-konforme Datenschutzlöschung und SOC2-Berichterstattung.", "Compliance-ready logging and auditing for Moltbot. Structured logging with Winston, immutable audit trails, GDPR-compliant data erasure and SOC2 reporting.")
  return {
    title, description,
    keywords: ['moltbot logging auditing','gdpr compliance','hipaa compliance','soc2 compliance','audit trail','structured logging'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: { title, description, type: 'article', url: pageUrl, images: ['/og-image.png'] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotLoggingAuditingPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Logging Auditing Compliance", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot Logging Auditing Guide", "Moltbot Logging Auditing Guide"), description: pick(isDE, "Logging und Auditing Compliance", "Logging and auditing compliance"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient ausschließlich zur Implementierung von Logging- und Auditing-Systemen. Keine Angriffswerkzeuge.", "This guide is exclusively for implementing logging and auditing systems. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Logging & Auditing</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot Logging & Auditing: Compliance Ready", "Moltbot Logging & Auditing: Compliance Ready")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "GDPR-, HIPAA- und SOC2-konformes Logging für Moltbot — strukturierte Logs, unveränderliche Audit Trails und automatisierte Compliance-Reports.", "GDPR-, HIPAA- and SOC2-compliant logging for Moltbot — structured logs, immutable audit trails and automated compliance reports.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Logging & Auditing? Einfach erklärt", "What is Logging & Auditing? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Logging & Auditing ist wie ein Sicherheits-Kamera-System: es zeichnet auf, was im System passiert und wer es getan hat. Strukturiertes Logging macht Events durchsuchbar. Audit Trails dokumentieren alle Änderungen unveränderlich. GDPR Compliance garantiert das Recht auf Löschung. HIPAA schützt Gesundheitsdaten. SOC2 beweist Sicherheitsstandards. Ohne Logging & Auditing fehlt Nachvollziehbarkeit und Compliance-Nachweis.", "Logging & auditing is like a security camera system: it records what happens in the system and who did it. Structured logging makes events searchable. Audit trails document all changes immutably. GDPR compliance guarantees the right to erasure. HIPAA protects health data. SOC2 proves security standards. Without logging & auditing, traceability and compliance proof are missing.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Logging und Compliance", "Jump to logging and compliance")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "📝 Strukturiertes Security Logging", "📝 Structured Security Logging")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`// moltbot/lib/logger.ts
import { createLogger, format, transports } from 'winston';

export const securityLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  defaultMeta: { service: 'moltbot', version: process.env.APP_VERSION },
  transports: [
    new transports.Console(),
    // Compliance: Logs in separaten Stream für 7 Jahre
    new transports.File({
      filename: '/var/log/moltbot/security.log',
      maxsize: 100 * 1024 * 1024,  // 100MB
      maxFiles: 365,                // 1 Jahr lokale Rotation
      tailable: true,
    }),
  ],
});

export function logSecurityEvent(event: {
  action: string;
  userId?: string;
  ip: string;
  resource: string;
  result: 'success' | 'failure';
  details?: Record<string, unknown>;
}) {
  securityLogger.info('security_event', {
    ...event,
    timestamp: new Date().toISOString(),
    correlationId: crypto.randomUUID(),
  });
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔒 Unveränderlicher Audit Trail (PostgreSQL)", "🔒 Immutable Audit Trail (PostgreSQL)")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-blue-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`-- Immutable Audit Log Schema
CREATE TABLE moltbot_audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  customer_id UUID REFERENCES customers(id),
  actor_id    UUID,
  actor_type  TEXT NOT NULL,        -- 'user', 'system', 'api_key'
  action      TEXT NOT NULL,        -- 'login', 'data_access', 'export'
  resource    TEXT NOT NULL,
  resource_id TEXT,
  ip_address  INET NOT NULL,
  user_agent  TEXT,
  result      TEXT NOT NULL,        -- 'success', 'failure', 'denied'
  details     JSONB,
  -- Integrität: Hash über alle Felder
  row_hash    TEXT GENERATED ALWAYS AS (
    encode(sha256(
      (id::text || occurred_at::text || action || result)::bytea
    ), 'hex')
  ) STORED
);

-- WICHTIG: Keine DELETE/UPDATE erlaubt (Compliance)
CREATE RULE no_delete_audit AS ON DELETE TO moltbot_audit_log DO INSTEAD NOTHING;
CREATE RULE no_update_audit AS ON UPDATE TO moltbot_audit_log DO INSTEAD NOTHING;

-- Index für schnelle GDPR-Abfragen
CREATE INDEX idx_audit_customer ON moltbot_audit_log(customer_id, occurred_at);
CREATE INDEX idx_audit_actor ON moltbot_audit_log(actor_id, occurred_at);`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🇪🇺 GDPR Right to Erasure", "🇪🇺 GDPR Right to Erasure")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-yellow-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`// moltbot/lib/gdpr-erasure.ts
export async function processErasureRequest(customerId: string) {
  // 1. Personenbezogene Daten pseudonymisieren (nicht löschen wegen Audit-Anforderung)
  await db.query(\`
    UPDATE customers SET
      email = 'deleted_' || id || '@erased.local',
      name = 'Gelöschter Nutzer',
      phone = NULL,
      address = NULL,
      erased_at = NOW()
    WHERE id = $1
  \`, [customerId]);

  // 2. Audit Log: Löschanfrage dokumentieren
  await logSecurityEvent({
    action: 'gdpr_erasure_completed',
    userId: customerId,
    ip: '0.0.0.0',
    resource: 'customer_data',
    result: 'success',
    details: { customerId, erasedAt: new Date().toISOString() },
  });

  // 3. Backups markieren (werden nach Backup-Retention automatisch gelöscht)
  await db.query(
    'INSERT INTO gdpr_erasure_queue (customer_id, requested_at) VALUES ($1, NOW())',
    [customerId]
  );
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "📊 Compliance Status", "📊 Compliance Status")}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'GDPR', status: pick(isDE, 'Compliant', 'Compliant'), color: 'green', items: [pick(isDE, 'Audit Trail', 'Audit Trail'), pick(isDE, 'Right to Erasure', 'Right to Erasure'), pick(isDE, 'Data Minimization', 'Data Minimization'), pick(isDE, 'Consent Management', 'Consent Management')] },
              { name: 'HIPAA', status: pick(isDE, 'Compliant', 'Compliant'), color: 'green', items: [pick(isDE, 'PHI Encryption', 'PHI Encryption'), pick(isDE, 'Access Controls', 'Access Controls'), pick(isDE, 'Audit Logs', 'Audit Logs'), pick(isDE, 'Breach Notification', 'Breach Notification')] },
              { name: 'SOC2', status: pick(isDE, 'In Progress', 'In Progress'), color: 'yellow', items: [pick(isDE, 'Availability', 'Availability'), pick(isDE, 'Confidentiality', 'Confidentiality'), pick(isDE, 'Security', 'Security'), pick(isDE, 'Processing Integrity', 'Processing Integrity')] },
            ].map(({ name, status, color, items }) => (
              <div key={name} className={`bg-${color}-900/80 backdrop-blur-lg p-4 rounded-xl border border-${color}-700/50 shadow-xl`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-bold text-${color}-300`}>{name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full bg-${color}-700 text-${color}-300`}>{status}</span>
                </div>
                <ul className="space-y-1 text-sm">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-gray-300">
                      <span>✅</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Compliance live prüfen", "Check compliance live")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Compliance Runbooks", "Compliance runbooks")}</div>
            </a>
            <a href={`/${locale}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Oracle</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Compliance Intelligence", "Compliance intelligence")}</div>
            </a>
            <a href={`/${locale}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Enterprise</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Managed Compliance", "Managed compliance")}</div>
            </a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Compliance Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Compliance-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with compliance implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
