import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/cloud-security-posture-management"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === 'de'
  const title = pick(isDE, "Cloud Security Posture Management (CSPM) 2026", "Cloud Security Posture Management (CSPM) 2026")
  const description = pick(isDE, "CSPM mit Moltbot für AWS, GCP und Azure. Misconfiguration Detection, Policy-as-Code, Drift Detection und automatisierte Cloud-Remediation. CIS Cloud Benchmarks.", "CSPM with Moltbot for AWS, GCP and Azure. Misconfiguration detection, policy-as-code, drift detection and automated cloud remediation. CIS Cloud Benchmarks.")
  return {
    title,
    description,
    keywords: ['moltbot cspm','cloud security posture management','aws misconfiguration','policy as code','cloud drift detection','cis cloud benchmark'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotCspmPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === 'de'
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: pick(isDE, 'Was ist Cloud Security Posture Management (CSPM)?', 'What is Cloud Security Posture Management (CSPM)?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'CSPM ist die kontinuierliche Überwachung und Verwaltung von Cloud-Infrastrukturen auf Sicherheitslücken und Fehlkonfigurationen. Es scannt automatisch AWS, GCP und Azure auf Verstöße gegen Security Best Practices wie CIS Benchmarks und Policy-as-Code Regeln.', 'CSPM is the continuous monitoring and management of cloud infrastructures for security gaps and misconfigurations. It automatically scans AWS, GCP and Azure for violations of security best practices like CIS benchmarks and policy-as-code rules.') } },
      { '@type': 'Question', name: pick(isDE, 'Was sind die häufigsten Cloud-Fehlkonfigurationen?', 'What are the most common cloud misconfigurations?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'Top-Fehlkonfigurationen: Öffentliche S3/GCS-Buckets, Security Groups ohne IP-Whitelist (0.0.0.0/0), Root-Account ohne MFA, unverschlüsselte EBS/RDS-Volumes, IAM-User mit Admin-Rechten, CloudTrail nicht in allen Regionen, VM ohne Firewall-Regeln.', 'Top misconfigurations: Public S3/GCS buckets, Security Groups without IP whitelist (0.0.0.0/0), Root account without MFA, unencrypted EBS/RDS volumes, IAM users with admin rights, CloudTrail not in all regions, VM without firewall rules.') } },
      { '@type': 'Question', name: pick(isDE, 'Wie funktioniert Drift Detection?', 'How does drift detection work?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'Drift Detection vergleicht den aktuellen Cloud-Zustand mit der definierten Policy-as-Code-Baseline (z.B. Terraform, CloudFormation). Wenn ein manuelle Änderung die Policy verletzt, wird ein Alert ausgelöst und optional automatisch remediiert.', 'Drift detection compares the current cloud state with the defined policy-as-code baseline (e.g., Terraform, CloudFormation). If a manual change violates the policy, an alert is triggered and optionally automatically remediated.') } },
    ],
  }

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, 'CSPM überwacht eigene Cloud-Konfigurationen defensiv. Keine Angriffswerkzeuge.', 'CSPM monitors your own cloud configurations defensively. No attack tools.')}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Cloud Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, 'Cloud Security Posture Management', 'Cloud Security Posture Management')}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, '70% aller Cloud-Breaches entstehen durch Fehlkonfigurationen. Moltbot erkennt sie automatisch und remediert sie — bevor Angreifer sie finden.', '70% of all cloud breaches are caused by misconfigurations. Moltbot detects them automatically and remediates them — before attackers find them.')}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Was ist CSPM? Einfach erklärt', 'What is CSPM? Simply Explained')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, 'Cloud Security Posture Management (CSPM) ist wie ein automatisierter Sicherheits-Check für deine Cloud-Infrastruktur. Es überwacht AWS, GCP und Azure auf Fehlkonfigurationen: öffentliche S3-Buckets, Security Groups ohne IP-Whitelist, Root-Account ohne MFA, unverschlüsselte Daten. CSPM vergleicht den aktuellen Zustand mit Security Best Practices (CIS Benchmarks) und Policy-as-Code Regeln. Wenn eine Fehlkonfiguration entdeckt wird, wird ein Alert ausgelöst und optional automatisch korrigiert. So bleiben deine Cloud-Ressourcen sicher und compliant.', 'Cloud Security Posture Management (CSPM) is like an automated security check for your cloud infrastructure. It monitors AWS, GCP and Azure for misconfigurations: public S3 buckets, Security Groups without IP whitelist, Root account without MFA, unencrypted data. CSPM compares the current state with security best practices (CIS benchmarks) and policy-as-code rules. When a misconfiguration is detected, an alert is triggered and optionally automatically corrected. This keeps your cloud resources secure and compliant.')}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, 'Springe zu Top Misconfigurations und Cloud Resources', 'Jump to top misconfigurations and cloud resources')}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, '☁️ Top Cloud Misconfigurations', '☁️ Top Cloud Misconfigurations')}</h2>
          <div className="space-y-3">
            {[
              { issue: 'S3-Bucket öffentlich erreichbar', severity: 'CRITICAL', cloud: 'AWS', fix: 'Block Public Access + Bucket Policy' },
              { issue: 'Security Group 0.0.0.0/0 auf Port 22/3389', severity: 'CRITICAL', cloud: 'AWS/GCP', fix: 'IP Whitelist oder VPN-Only' },
              { issue: 'Root Account ohne MFA', severity: 'CRITICAL', cloud: 'AWS', fix: 'MFA sofort aktivieren' },
              { issue: 'Unverschlüsselte EBS/RDS-Volumes', severity: 'HIGH', cloud: 'AWS', fix: 'KMS-Verschlüsselung aktivieren' },
              { issue: 'IAM User mit Admin-Rechten + aktive Keys', severity: 'HIGH', cloud: 'AWS', fix: 'Role-based + Key Rotation' },
              { issue: 'CloudTrail nicht in allen Regionen', severity: 'HIGH', cloud: 'AWS', fix: 'Multi-Region Trail aktivieren' },
              { issue: 'GCS-Bucket AllUsers Lesezugriff', severity: 'CRITICAL', cloud: 'GCP', fix: 'IAM-Policy stricter' },
              { issue: 'VM Instance mit externer IP ohne Firewall-Regel', severity: 'HIGH', cloud: 'GCP', fix: 'VPC Firewall + Cloud Armor' },
            ].map(({ issue, severity, cloud, fix }) => (
              <div key={issue} className={`flex items-start gap-3 p-3 rounded-lg border backdrop-blur-lg hover:border-cyan-500/30 transition-all duration-300 ${severity === 'CRITICAL' ? 'bg-red-900/80 border-red-700/50' : 'bg-orange-900/80 border-orange-700/50'}`}>
                <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${severity === 'CRITICAL' ? 'bg-red-700 text-red-200' : 'bg-orange-700 text-orange-200'}`}>{severity}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-100">{issue}</div>
                  <div className="text-xs text-gray-300 mt-0.5">Cloud: {cloud} · Fix: {fix}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, '🔗 Weiterführende Ressourcen', '🔗 Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'Cloud Posture prüfen', 'Check cloud posture')}</div></a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, 'CSPM Guides', 'CSPM guides')}</div></a>
            <a href={`/${locale}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Oracle</div><div className="text-sm text-gray-300">{pick(isDE, 'Cloud Threat Intel', 'Cloud threat intel')}</div></a>
            <a href={`/${locale}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Enterprise</div><div className="text-sm text-gray-300">{pick(isDE, 'Managed CSPM', 'Managed CSPM')}</div></a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Cloud Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Cloud Security Posture Management und CSPM-Implementierungen in AWS, GCP und Azure. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with cloud security posture management and CSPM implementations in AWS, GCP and Azure. The described best practices have been proven in real deployments and continuously improved.')}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", position: 1, name: pick(isDE, 'Startseite', 'Home'), item: `https://clawguru.org/${locale}` },
            { "@type": "ListItem", position: 2, name: pick(isDE, 'Moltbot', 'Moltbot'), item: `https://clawguru.org/${locale}/moltbot` },
            { "@type": "ListItem", position: 3, name: "Cloud Security Posture Management", item: `https://clawguru.org/${locale}/moltbot/cloud-security-posture-management` }
          ]
        },
        faqSchema,
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: pick(isDE, 'Moltbot Cloud Security Posture Management Guide', 'Moltbot Cloud Security Posture Management Guide'),
          description: pick(isDE, 'Executable Security Runbooks und Hardening-Guides für Moltbot-Infrastrukturen.', 'Executable security runbooks and hardening guides for Moltbot infrastructures.'),
          url: `https://clawguru.org/${locale}/moltbot/cloud-security-posture-management`
        }
      ]) }} />
    </div>
  )
}
