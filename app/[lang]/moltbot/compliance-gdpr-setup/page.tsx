import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/compliance-gdpr-setup"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot GDPR Compliance Setup: Datenschutz Implementation 2026 | ClawGuru", "Moltbot GDPR Compliance Setup: Data Protection Implementation 2026 | ClawGuru")
  const description = pick(isDE, "GDPR-konforme Implementierung für Moltbot. Einwilligungsmanagement, Datenschutzerklärung, Right-to-Erasure, Data Minimization und Verzeichnis von Verarbeitungstätigkeiten (VVT).", "GDPR-compliant implementation for Moltbot. Consent management, privacy policy, right-to-erasure, data minimization and record of processing activities (ROPA).")
  return {
    title, description,
    keywords: ['moltbot gdpr compliance','datenschutz implementation','einwilligungsmanagement','data minimization','right to erasure','vvt'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotGdprCompliancePage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "GDPR Compliance Setup", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot GDPR Compliance Guide", "Moltbot GDPR Compliance Guide"), description: pick(isDE, "GDPR Compliance und Datenschutz", "GDPR compliance and data protection"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "GDPR Compliance dient dem Schutz personenbezogener Daten. Keine Angriffswerkzeuge.", "GDPR compliance serves to protect personal data. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · GDPR Compliance</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot GDPR Compliance Setup", "Moltbot GDPR Compliance Setup")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Datenschutz by Design für Moltbot — GDPR-konforme Implementierung mit Einwilligungsmanagement, Data Minimization und Betroffenenrechten.", "Privacy by Design for Moltbot — GDPR-compliant implementation with consent management, data minimization and data subject rights.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist GDPR Compliance? Einfach erklärt", "What is GDPR Compliance? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "GDPR (General Data Protection Regulation) ist wie ein Datenschutz-Verfassung für Europa: sie regelt, wie Unternehmen personenbezogene Daten sammeln, speichern und verarbeiten dürfen. Einwilligungsmanagement erfasst explizite Zustimmungen. Data Minimization reduziert Daten auf das Notwendige. Right to Erasure garantiert Löschung auf Wunsch. Verzeichnis von Verarbeitungstätigkeiten (VVT) dokumentiert alle Datenflüsse. Ohne GDPR Compliance drohen Bußgelder bis 20 Mio. € und Reputationsschäden.", "GDPR (General Data Protection Regulation) is like a data protection constitution for Europe: it regulates how companies collect, store and process personal data. Consent management captures explicit consents. Data minimization reduces data to the necessary. Right to erasure guarantees deletion on request. Record of processing activities (ROPA) documents all data flows. Without GDPR compliance, fines up to €20 million and reputation damage are at risk.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu GDPR Checkliste und API", "Jump to GDPR checklist and API")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "📋 GDPR Compliance Checkliste", "📋 GDPR Compliance Checklist")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl">
            <div className="space-y-2">
              {[
                { item: pick(isDE, 'Verzeichnis von Verarbeitungstätigkeiten (VVT) erstellt', 'Record of processing activities (ROPA) created'), art: 'Art. 30', done: true },
                { item: pick(isDE, 'Datenschutzerklärung aktuell und vollständig', 'Privacy policy current and complete'), art: 'Art. 13/14', done: true },
                { item: pick(isDE, 'Einwilligungsmanagement implementiert', 'Consent management implemented'), art: 'Art. 7', done: true },
                { item: pick(isDE, 'Cookie Banner DSGVO-konform', 'Cookie banner GDPR-compliant'), art: 'Art. 5/6', done: true },
                { item: pick(isDE, 'Recht auf Auskunft implementiert', 'Right to information implemented'), art: 'Art. 15', done: true },
                { item: pick(isDE, 'Recht auf Löschung implementiert', 'Right to erasure implemented'), art: 'Art. 17', done: true },
                { item: pick(isDE, 'Recht auf Datenübertragbarkeit', 'Right to data portability'), art: 'Art. 20', done: false },
                { item: pick(isDE, 'Data Processing Agreements (DPA) mit Drittanbietern', 'Data Processing Agreements (DPA) with third parties'), art: 'Art. 28', done: true },
                { item: pick(isDE, 'Datenpanne Prozess (72h Meldepflicht)', 'Data breach process (72h notification)'), art: 'Art. 33', done: true },
                { item: pick(isDE, 'Datenschutzfolgenabschätzung (DSFA)', 'Data protection impact assessment (DPIA)'), art: 'Art. 35', done: false },
              ].map(({ item, art, done }) => (
                <div key={item} className={`flex items-start gap-3 p-3 rounded-lg ${done ? 'bg-green-900/80' : 'bg-amber-900/80'}`}>
                  <span className="mt-0.5">{done ? '✅' : '⚠️'}</span>
                  <div className="flex-1">
                    <span className="text-sm text-gray-200">{item}</span>
                    <span className="ml-2 text-xs text-gray-400 font-mono">{art}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔐 Consent Management API", "🔐 Consent Management API")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`// moltbot/lib/consent-manager.ts
import { db } from './db';

type ConsentPurpose = 'analytics' | 'marketing' | 'functional' | 'necessary';

interface ConsentRecord {
  customerId: string;
  purposes: Record<ConsentPurpose, boolean>;
  consentVersion: string;
  ipAddress: string;
  userAgent: string;
  givenAt: Date;
}

export async function recordConsent(consent: ConsentRecord) {
  await db.query(
    'INSERT INTO consent_log (customer_id, purposes, version, ip, user_agent, given_at) VALUES ($1, $2, $3, $4, $5, $6)',
    [consent.customerId, JSON.stringify(consent.purposes), consent.consentVersion, consent.ipAddress, consent.userAgent, consent.givenAt]
  );
}

export async function checkConsent(customerId: string, purpose: ConsentPurpose) {
  const result = await db.query(
    'SELECT purposes FROM consent_log WHERE customer_id = $1 ORDER BY given_at DESC LIMIT 1',
    [customerId]
  );
  if (!result.rows[0]) return false;
  return result.rows[0].purposes[purpose] === true;
}

export async function withdrawConsent(customerId: string) {
  await db.query(
    'INSERT INTO consent_log (customer_id, purposes, version, ip, user_agent, given_at) VALUES ($1, $2, $3, $4, $5, NOW())',
    [customerId, JSON.stringify({ analytics: false, marketing: false, functional: false, necessary: true }), 'withdrawal', '0.0.0.0', 'system']
  );
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "GDPR Assessment", "GDPR assessment")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "GDPR Implementation", "GDPR implementation")}</div>
            </a>
            <a href={`/${locale}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Oracle</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Compliance Intelligence", "Compliance intelligence")}</div>
            </a>
            <a href={`/${locale}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Enterprise</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Managed GDPR", "Managed GDPR")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · GDPR Compliance Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit GDPR-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with GDPR implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
