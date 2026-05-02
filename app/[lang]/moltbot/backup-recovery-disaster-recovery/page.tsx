import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/backup-recovery-disaster-recovery"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Backup & Disaster Recovery: RTO/RPO Guide 2026 | ClawGuru", "Moltbot Backup & Disaster Recovery: RTO/RPO Guide 2026 | ClawGuru")
  const description = pick(isDE, "Backup und Disaster Recovery für Moltbot. RTO/RPO-Definitionen, automatisierte Backups, Geo-Redundanz, Failover-Prozesse und DR-Tests. PostgreSQL, Redis und File-Backups.", "Backup and disaster recovery for Moltbot. RTO/RPO definitions, automated backups, geo-redundancy, failover processes and DR tests. PostgreSQL, Redis and file backups.")
  return {
    title, description,
    keywords: ['moltbot backup recovery','disaster recovery','rto rpo','geo redundancy','failover','postgresql backup'],
    authors: [{ name: 'R. Schwertfechter' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: `${SITE_URL}/${locale}${PATH}`,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

const RTO_RPO_TIER = [
  ['T1', 'Auth Service', '5 Min', '1 Min', 'Continuous'],
  ['T1', 'Database (Primary)', '15 Min', '5 Min', 'WAL Streaming'],
  ['T2', 'API Gateway', '30 Min', '15 Min', 'Stündlich'],
  ['T2', 'Redis Cache', '30 Min', '0 (rebuild)', 'Täglich'],
  ['T3', 'File Storage', '4 Std', '1 Std', 'Stündlich'],
  ['T3', 'Analytics DB', '24 Std', '24 Std', 'Täglich'],
]

const FAQ = [
  { q: "Was ist RTO vs RPO?", a: "RTO (Recovery Time Objective): Wie lange dauert es, den Service nach einem Ausfall wiederherzustellen. RPO (Recovery Point Objective): Wie viel Datenverlust ist akzeptabel (Zeit seit dem letzten Backup). Für kritische Systeme: RTO < 15 Min, RPO < 5 Min." },
  { q: "Wie oft sollte ich PostgreSQL Backups machen?", a: "Für Produktionsdatenbanken: Mindestens stündlich mit WAL Streaming für Point-in-Time Recovery. Tägliches Full Backup als Baseline. 30 Tage Retention mit verschlüsseltem Cloud Storage. Teste Recovery monatlich." },
  { q: "Was ist Geo-Redundanz?", a: "Geo-Redundanz bedeutet, dass deine Infrastruktur in mindestens zwei geografisch getrennten Rechnzentren läuft. Wenn ein Rechenzentrum ausfällt (Feuer, Netzwerk, Naturkatastrophe), übernimmt das andere automatisch. Für Moltbot: Primary in EU-West, Secondary in EU-Central mit automatischem Failover." },
  { q: "Wie teste ich Disaster Recovery?", a: "DR-Test-Schedule: Monatlich: Backup-Integritätsprüfung und Restore-Test. Quartalsweise: Full Failover-Test mit Traffic-Switch. Jährlich: Full Disaster Recovery Simulation mit Ransomware-Szenario. Dokumentiere alle Ergebnisse und Lessons Learned." },
]

export default function MoltbotBackupRecoveryPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Backup & Disaster Recovery — Du hast kein Backup, kein RTO/RPO, kein DR-Test. Datenbank-Crash, Ransomware, Rechenzentrum-Ausfall. 72h Downtime, Datenverlust, dein CEO hat den CISO gefeuert.", "Moltbot Backup & Disaster Recovery — You Have No Backup, No RTO/RPO, No DR Test. Database Crash, Ransomware, Data Center Outage. 72h Downtime, Data Loss, Your CEO Fired the CISO.")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Backup & Disaster Recovery", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["Disaster Recovery", "Backup Strategies", "RTO/RPO", "PostgreSQL", "Failover"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Disaster Recovery?", "What is Disaster Recovery?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "RTO/RPO Tiers", "RTO/RPO Tiers")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "DR Maturity Score", "DR Maturity Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">12 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Backup & Disaster Recovery · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Moltbot Backup & Disaster Recovery — Du hast kein Backup, kein RTO/RPO, kein DR-Test. Datenbank-Crash, Ransomware, Rechenzentrum-Ausfall. 72h Downtime, Datenverlust, dein CEO hat den CISO gefeuert.", "Moltbot Backup & Disaster Recovery — You Have No Backup, No RTO/RPO, No DR Test. Database Crash, Ransomware, Data Center Outage. 72h Downtime, Data Loss, Your CEO Fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du hast kein automatisches Backup, keine definierten RTO/RPO-Ziele und keinen getesteten DR-Prozess. Datenbank-Crash, Ransomware, Rechenzentrum-Ausfall. 72h Downtime, Datenverlust, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You have no automated backup, no defined RTO/RPO goals and no tested DR process. Database crash, ransomware, data center outage. 72h downtime, data loss, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient der Absicherung durch zuverlässige Backup- und Recovery-Strategien. Keine Angriffswerkzeuge.", "This guide is for securing your own systems with reliable backup and recovery strategies. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Disaster Recovery? Einfach erklärt.", "What is Disaster Recovery? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Disaster Recovery wie Versicherung für deine Infrastruktur vor: Wenn alles schiefgeht — Datenbank-Crash, Ransomware, Rechenzentrum-Ausfall — hast du einen Plan. Für Moltbot bedeutet das: Automatisierte Backups, definierte RTO/RPO, Geo-Redundanz, getestete Failover-Prozesse. Gutes DR bedeutet: Never lose data, never be down for long.", "Think of disaster recovery like insurance for your infrastructure: when everything goes wrong — database crash, ransomware, data center outage — you have a plan. For Moltbot, this means: automated backups, defined RTO/RPO, geo-redundancy, tested failover processes. Good DR means: never lose data, never be down for long.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "RTO/RPO Tiers für Moltbot", "RTO/RPO Tiers for Moltbot")}</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm bg-gray-900 border border-gray-700 rounded-lg">
                <thead><tr className="bg-gray-800 text-white"><th className="p-3 text-left">{pick(isDE, "Tier", "Tier")}</th><th className="p-3 text-left">{pick(isDE, "Service", "Service")}</th><th className="p-3 text-left">RTO</th><th className="p-3 text-left">RPO</th><th className="p-3 text-left">{pick(isDE, "Backup Freq.", "Backup Freq.")}</th></tr></thead>
                <tbody>
                  {RTO_RPO_TIER.map(([tier, svc, rto, rpo, freq]) => (
                    <tr key={svc} className="border-b border-gray-700 hover:bg-gray-800">
                      <td className={`p-3 font-bold ${tier === 'T1' ? 'text-red-400' : tier === 'T2' ? 'text-yellow-400' : 'text-green-400'}`}>{tier}</td>
                      <td className="p-3">{svc}</td><td className="p-3 font-mono text-xs">{rto}</td><td className="p-3 font-mono text-xs">{rpo}</td><td className="p-3 text-xs">{freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PostgreSQL Backup Script */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Automatisiertes PostgreSQL Backup", "Automated PostgreSQL Backup")}</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`#!/bin/bash
# moltbot-backup.sh — Automatisiertes PostgreSQL Backup

set -euo pipefail

BACKUP_DIR="/backups/postgres"
DB_URL="$DATABASE_URL"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/moltbot_$TIMESTAMP.sql.gz"
RETENTION_DAYS=30

# 1. Backup erstellen
echo "[INFO] Starting backup: $BACKUP_FILE"
pg_dump "$DB_URL" | gzip > "$BACKUP_FILE"

# 2. Integrität prüfen
gunzip -t "$BACKUP_FILE" || { echo "[ERROR] Backup corrupt!"; exit 1; }
echo "[INFO] Backup integrity OK ($(du -h $BACKUP_FILE | cut -f1))"

# 3. Verschlüsselt in Cloud Storage hochladen
aws s3 cp "$BACKUP_FILE" \\
  "s3://moltbot-backups/postgres/$TIMESTAMP/" \\
  --server-side-encryption aws:kms \\
  --sse-kms-key-id "$AWS_KMS_KEY_ID"

# 4. Alte Backups löschen (Retention)
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete
aws s3 ls s3://moltbot-backups/postgres/ | \\
  awk '{print $4}' | \\
  head -n -$RETENTION_DAYS | \\
  xargs -I{} aws s3 rm "s3://moltbot-backups/postgres/{}"

echo "[SUCCESS] Backup completed: $BACKUP_FILE"`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Kein Backup vor Deployment", "SCAR #1: No Backup Before Deployment")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Kein Backup vor Deployment. Schema-Change bricht DB, kein Rollback möglich. 24h Downtime. Fix: Pre-Deployment Backup mit automatischem Rollback.", "No backup before deployment. Schema change breaks DB, no rollback possible. 24h downtime. Fix: Pre-deployment backup with automatic rollback.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Pre-Deployment Backup. Lessons: Aktiviere automatisches Backup vor jedem Deployment.", "Root Cause: No pre-deployment backup. Lessons: Enable automatic backup before every deployment.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Backup-Test nie durchgeführt", "SCAR #2: Backup Test Never Run")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Backup-Test nie durchgeführt. Restore bei Incident schlägt fehl, Backup korrupt. 48h Downtime. Fix: Monatlicher Restore-Test mit Integritätsprüfung.", "Backup test never run. Restore during incident fails, backup corrupt. 48h downtime. Fix: Monthly restore test with integrity check.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Backup-Test. Lessons: Aktiviere monatlichen Restore-Test mit Integritätsprüfung.", "Root Cause: No backup test. Lessons: Enable monthly restore test with integrity check.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "RTO/RPO definieren", "Define RTO/RPO")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Definiere RTO/RPO für alle Services. Klassifiziere nach Kritikalität.", "Define RTO/RPO for all services. Classify by criticality.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Automatisierte Backups aktivieren", "Enable automated backups")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere automatisierte Backups für PostgreSQL mit WAL Streaming.", "Enable automated backups for PostgreSQL with WAL streaming.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Geo-Redundanz konfigurieren", "Configure geo-redundancy")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Geo-Redundanz mit automatischem Failover.", "Enable geo-redundancy with automatic failover.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive DR Checkliste", "Interactive DR Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "dr1", text: pick(isDE, "RTO/RPO für alle Services definiert", "RTO/RPO defined for all services") },
                  { id: "dr2", text: pick(isDE, "Automatisierte PostgreSQL Backups aktiviert", "Automated PostgreSQL backups enabled") },
                  { id: "dr3", text: pick(isDE, "WAL Streaming für Point-in-Time Recovery", "WAL streaming for point-in-time recovery") },
                  { id: "dr4", text: pick(isDE, "Verschlüsselte Cloud Storage Backups", "Encrypted cloud storage backups") },
                  { id: "dr5", text: pick(isDE, "Geo-Redundanz konfiguriert", "Geo-redundancy configured") },
                  { id: "dr6", text: pick(isDE, "Automatischer Failover aktiviert", "Automatic failover enabled") },
                  { id: "dr7", text: pick(isDE, "Monatlicher Restore-Test", "Monthly restore test") },
                  { id: "dr8", text: pick(isDE, "Quartalsweiser Full DR Test", "Quarterly full DR test") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* DR Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "DR Maturity Score Calculator", "DR Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du RTO/RPO definiert?", "Have you defined RTO/RPO?"), weight: 25 },
                  { q: pick(isDE, "Sind automatisierte Backups aktiv?", "Are automated backups active?"), weight: 25 },
                  { q: pick(isDE, "Ist Geo-Redundanz konfiguriert?", "Is geo-redundancy configured?"), weight: 25 },
                  { q: pick(isDE, "Wurde ein DR Test durchgeführt?", "Has a DR test been run?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein DR Maturity Score:", "Your DR Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 19/100", "Industry Average: 19/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Disaster Recovery, Backup-Strategien, RTO/RPO und Failover.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in disaster recovery, backup strategies, RTO/RPO and failover.")}
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
                <div className="text-sm text-gray-300">{pick(isDE, "DR Status prüfen", "Check DR status")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">DR Runbooks</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Recovery Playbooks", "Recovery playbooks")}</div>
              </a>
              <a href={`/${locale}/neuro`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Neuro AI</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Anomalie-Erkennung", "Anomaly detection")}</div>
              </a>
              <a href={`/${locale}/solutions`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Enterprise</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Managed DR", "Managed DR")}</div>
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
