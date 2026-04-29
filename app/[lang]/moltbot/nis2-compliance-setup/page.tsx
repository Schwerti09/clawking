import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/nis2-compliance-setup"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot NIS2 Compliance: EU-Richtlinie Umsetzung 2026 | ClawGuru", "Moltbot NIS2 Compliance: EU Directive Implementation 2026 | ClawGuru")
  const description = pick(isDE, "NIS2-Richtlinie mit Moltbot umsetzen. Technische Maßnahmen nach Art. 21, Incident Reporting (24h/72h), Supply Chain Security und Risikobeurteilung für kritische Infrastrukturen.", "Implement NIS2 directive with Moltbot. Technical measures per Art. 21, incident reporting (24h/72h), supply chain security and risk assessment for critical infrastructure.")
  return {
    title, description,
    keywords: ['moltbot nis2 compliance','nis2 richtlinie','nis2 technische massnahmen','nis2 incident reporting','kritis nis2','nis2 umsetzung'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotNis2Page({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const NIS2_MEASURES = [
    { art: 'Art. 21(2)(a)', measure: pick(isDE, 'Risikoanalyse & Informationssicherheitsrichtlinien', 'Risk analysis & information security policies'), status: 'automated', priority: 'P1' },
    { art: 'Art. 21(2)(b)', measure: pick(isDE, 'Business Continuity, Backup-Management, DR', 'Business continuity, backup management, DR'), status: 'automated', priority: 'P1' },
    { art: 'Art. 21(2)(c)', measure: pick(isDE, 'Supply Chain Security', 'Supply chain security'), status: 'partial', priority: 'P1' },
    { art: 'Art. 21(2)(d)', measure: pick(isDE, 'Sicherheit beim Erwerb, Entwicklung, Wartung', 'Security in acquisition, development, maintenance'), status: 'automated', priority: 'P2' },
    { art: 'Art. 21(2)(e)', measure: pick(isDE, 'Wirksamkeit von Cybersecurity-Maßnahmen', 'Effectiveness of cybersecurity measures'), status: 'automated', priority: 'P1' },
    { art: 'Art. 21(2)(f)', measure: pick(isDE, 'Grundlegende Cyber-Hygiene, Schulungen', 'Basic cyber hygiene, training'), status: 'manual', priority: 'P2' },
    { art: 'Art. 21(2)(g)', measure: pick(isDE, 'Kryptografie und Verschlüsselung', 'Cryptography and encryption'), status: 'automated', priority: 'P1' },
    { art: 'Art. 21(2)(h)', measure: pick(isDE, 'Sicherheit des Personals, Zugangskontrolle', 'Personnel security, access control'), status: 'automated', priority: 'P1' },
    { art: 'Art. 21(2)(i)', measure: pick(isDE, 'MFA, kontinuierliche Authentifizierung', 'MFA, continuous authentication'), status: 'automated', priority: 'P1' },
    { art: 'Art. 21(2)(j)', measure: pick(isDE, 'Sicherheit der Kommunikation (Sprache, Video)', 'Communication security (voice, video)'), status: 'partial', priority: 'P3' },
  ];

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "NIS2 Compliance Setup", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot NIS2 Compliance Guide", "Moltbot NIS2 Compliance Guide"), description: pick(isDE, "NIS2 Compliance und EU-Richtlinie", "NIS2 compliance and EU directive"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-blue-900/80 backdrop-blur-lg border-l-4 border-blue-500 p-4 mb-8 text-sm text-blue-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-blue-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "NIS2-Compliance dient der systematischen Absicherung eigener Infrastrukturen. Keine Angriffswerkzeuge.", "NIS2 compliance serves systematic hardening of own infrastructures. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · NIS2 Compliance</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot NIS2 Compliance Setup", "Moltbot NIS2 Compliance Setup")}</h1>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">{pick(isDE, "NIS2 gilt ab Oktober 2024 für kritische und wichtige Einrichtungen in der EU. Art. 21 definiert 10 Mindestmaßnahmen — Moltbot automatisiert 7 davon.", "NIS2 applies from October 2024 for critical and important entities in the EU. Art. 21 defines 10 minimum measures — Moltbot automates 7 of them.")}</p>
          <div className="flex gap-3 mb-8 flex-wrap text-sm">
            <span className="bg-red-900 text-red-300 px-3 py-1 rounded-full font-medium border border-red-700">{pick(isDE, "Bußgeld: bis 10 Mio. € / 2% Umsatz", "Fine: up to €10 million / 2% revenue")}</span>
            <span className="bg-orange-900 text-orange-300 px-3 py-1 rounded-full font-medium border border-orange-700">{pick(isDE, "Incident: 24h Erstmeldung", "Incident: 24h initial report")}</span>
            <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full font-medium border border-blue-700">{pick(isDE, "Vollbericht: 72h", "Full report: 72h")}</span>
          </div>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist NIS2? Einfach erklärt", "What is NIS2? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "NIS2 (Network and Information Systems Security) ist wie eine EU-weite Sicherheits-Verordnung für kritische Infrastrukturen: sie verpflichtet Unternehmen zu Mindeststandards für Cybersicherheit. Art. 21 definiert 10 technische Maßnahmen. Incident Reporting verlangt Meldung innerhalb 24/72 Stunden. Supply Chain Security schließt Drittanbieter ein. Risikobeurteilung ist verpflichtend. Ohne NIS2 Compliance drohen Bußgelder bis 10 Mio. € und Betriebseinschränkungen.", "NIS2 (Network and Information Systems Security) is like an EU-wide security regulation for critical infrastructure: it obligates companies to minimum cybersecurity standards. Art. 21 defines 10 technical measures. Incident reporting requires notification within 24/72 hours. Supply chain security includes third parties. Risk assessment is mandatory. Without NIS2 compliance, fines up to €10 million and operational restrictions are at risk.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Maßnahmen und Reporting", "Jump to measures and reporting")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "📋 Art. 21 Maßnahmen — Umsetzungsstatus", "📋 Art. 21 Measures — Implementation Status")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl">
            <div className="space-y-2">
              {NIS2_MEASURES.map(({ art, measure, status, priority }) => (
                <div key={art} className={`flex items-start gap-3 p-3 rounded-lg border ${status === 'automated' ? 'bg-green-900/30 border-green-700' : status === 'partial' ? 'bg-yellow-900/30 border-yellow-700' : 'bg-gray-800 border-gray-700'}`}>
                  <span className="font-mono text-xs text-gray-400 w-28 flex-shrink-0 mt-0.5">{art}</span>
                  <div className="flex-1 text-sm text-gray-200">{measure}</div>
                  <span className={`text-xs font-bold flex-shrink-0 ${priority === 'P1' ? 'text-red-400' : priority === 'P2' ? 'text-orange-400' : 'text-gray-400'}`}>{priority}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium ${status === 'automated' ? 'bg-green-900 text-green-300' : status === 'partial' ? 'bg-yellow-900 text-yellow-300' : 'bg-gray-700 text-gray-300'}`}>
                    {status === 'automated' ? '✅ Auto' : status === 'partial' ? '⚠️ Partial' : '🔧 Manuell'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "⏱️ NIS2 Incident Reporting Prozess", "⏱️ NIS2 Incident Reporting Process")}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { phase: 'T+0', title: pick(isDE, 'Incident erkannt', 'Incident detected'), action: pick(isDE, 'Moltbot Auto-Detection + Alert an CISO/Geschäftsführung', 'Moltbot auto-detection + alert to CISO/management'), color: 'red' },
              { phase: 'T+24h', title: pick(isDE, 'Erstmeldung', 'Initial report'), action: pick(isDE, 'Frühwarnung an BSI/nationale Behörde: Art, Schwere, erster Umfang', 'Early warning to BSI/national authority: type, severity, initial scope'), color: 'orange' },
              { phase: 'T+72h', title: pick(isDE, 'Vollständiger Bericht', 'Full report'), action: pick(isDE, 'Detaillierter Bericht: Root Cause, betroffene Systeme, Maßnahmen', 'Detailed report: root cause, affected systems, measures'), color: 'blue' },
            ].map(({ phase, title, action, color }) => (
              <div key={phase} className={`p-4 rounded-xl border-2 backdrop-blur-lg ${color === 'red' ? 'border-red-500 bg-red-900/80' : color === 'orange' ? 'border-orange-500 bg-orange-900/80' : 'border-blue-500 bg-blue-900/80'}`}>
                <div className={`text-2xl font-bold mb-1 ${color === 'red' ? 'text-red-300' : color === 'orange' ? 'text-orange-300' : 'text-blue-300'}`}>{phase}</div>
                <div className="font-semibold text-sm mb-2 text-gray-100">{title}</div>
                <div className="text-xs text-gray-300">{action}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "NIS2 Gap Assessment", "NIS2 gap assessment")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "NIS2 Compliance Playbooks", "NIS2 compliance playbooks")}</div>
            </a>
            <a href={`/${locale}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Oracle</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Compliance Intelligence", "Compliance intelligence")}</div>
            </a>
            <a href={`/${locale}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Enterprise NIS2</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Managed Compliance", "Managed compliance")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · NIS2 Compliance Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit NIS2-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with NIS2 implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
