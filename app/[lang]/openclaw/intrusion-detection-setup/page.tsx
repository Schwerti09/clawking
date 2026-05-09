import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: 'OpenClaw Intrusion Detection: OSSEC & Fail2ban Setup 2024',
    description: 'Intrusion Detection für OpenClaw mit OSSEC, Fail2ban und Suricata. Echtzeit-Alerts, Log-Analyse, Brute-Force-Erkennung und automatische IP-Blockierung.',
    keywords: ['openclaw intrusion detection','ossec ids','fail2ban setup','suricata ids','brute force protection','log analysis security'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: 'OpenClaw Intrusion Detection Setup 2024', description: 'IDS für OpenClaw mit OSSEC und Fail2ban.', type: 'article', url: `https://clawguru.org/${lang}/openclaw/intrusion-detection-setup` },
    alternates: buildLocalizedAlternates(lang as Locale, '/openclaw/intrusion-detection-setup'),
    robots: 'index, follow',
  };
}

export default function OpenClawIntrusionDetectionPage({ params }: { params: { lang: string } }) {
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: IDS dient der defensiven Erkennung von Angriffen auf eigene Systeme. Keine Angriffswerkzeuge.
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Intrusion Detection · OSSEC & Fail2ban</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">OpenClaw Intrusion Detection Setup</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Früherkennung von Angriffen auf OpenClaw — OSSEC für Log-Analyse, Fail2ban für automatisches IP-Blocking und Suricata für Netzwerk-IDS.</p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Fail2ban Konfiguration</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 font-mono text-sm overflow-x-auto">
            <pre>{`# /etc/fail2ban/jail.local — OpenClaw Konfiguration

[DEFAULT]
bantime  = 3600    # 1 Stunde
findtime = 600     # 10 Minuten Fenster
maxretry = 5       # Max Fehlversuche
backend  = systemd

# SSH Brute Force
[sshd]
enabled = true
port    = 2222
filter  = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400  # 24h bei SSH

# OpenClaw API Auth Failures
[openclaw-auth]
enabled  = true
port     = http,https
filter   = openclaw-auth
logpath  = /var/log/nginx/access.log
maxretry = 10
findtime = 60
bantime  = 3600

# nginx Rapid Request (DDoS)
[nginx-limit-req]
enabled = true
port    = http,https
filter  = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 10
bantime = 600

# /etc/fail2ban/filter.d/openclaw-auth.conf
[Definition]
failregex = ^<HOST> .* POST /api/auth/activate HTTP.* 401
            ^<HOST> .* POST /api/auth/login HTTP.* 401`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">IDS Alert Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { level: 'Level 15 (Critical)', desc: 'Rootkit oder System Compromise', action: 'Sofort-Alert + Auto-Block', color: 'red' },
              { level: 'Level 12 (High)', desc: 'Privilege Escalation Versuch', action: 'Alert Security Team', color: 'orange' },
              { level: 'Level 8 (Medium)', desc: 'Wiederholte Auth-Fehler', action: 'Fail2ban Block + Log', color: 'yellow' },
              { level: 'Level 5 (Low)', desc: 'Einzelne fehlgeschlagene Logins', action: 'Log + Statistik', color: 'green' },
            ].map(({ level, desc, action, color }) => (
              <div key={level} className={`p-4 rounded-xl border shadow-2xl hover:shadow-lg transition-all duration-300 ${color === 'red' ? 'bg-red-900/80 backdrop-blur-lg border-red-700 hover:border-red-500' : color === 'orange' ? 'bg-orange-900/80 backdrop-blur-lg border-orange-700 hover:border-orange-500' : color === 'yellow' ? 'bg-amber-900/80 backdrop-blur-lg border-amber-700 hover:border-amber-500' : 'bg-green-900/80 backdrop-blur-lg border-green-700 hover:border-green-500'}`}>
                <div className="font-bold text-sm mb-1 text-white">{level}</div>
                <div className="text-sm text-gray-300 mb-2">{desc}</div>
                <div className="text-xs text-gray-400 font-mono">{action}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Weiterführende Ressourcen</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">IDS Assessment</div>
            </a>
            <a href={`/${lang}/neuro`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Neuro AI</div>
              <div className="text-sm text-gray-300">AI Threat Detection</div>
            </a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">IDS Runbooks</div>
              <div className="text-sm text-gray-300">Detection Guides</div>
            </a>
            <a href={`/${lang}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Oracle</div>
              <div className="text-sm text-gray-300">Threat Intelligence</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">IDS Security Score Calculator — Wie sicher ist dein Intrusion Detection?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen IDS Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du Fail2ban installiert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Fail2ban aktiv</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Hast du OSSEC oder ähnliche IDS?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, OSSEC aktiv</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Hast du Suricata oder Netzwerk-IDS?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Suricata aktiv</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Hast du Alert-Routing (Email/Slack)?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Alert-Routing aktiv</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Hast du IDS-Regeln getestet?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Regeln getestet</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              IDS Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">50/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für IDS Audit & Detailed Report</div>
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
            name: "Intrusion Detection für OpenClaw einrichten",
            description: "OSSEC, Fail2ban und Suricata für Echtzeit-IDS auf OpenClaw Servern konfigurieren.",
            totalTime: "PT60M",
            step: [
              { "@type": "HowToStep", name: "OSSEC installieren", text: "apt install ossec-hids-server. ossec.conf bearbeiten: localfile-Einträge für /var/log/auth.log, /var/log/syslog hinzufügen." },
              { "@type": "HowToStep", name: "Fail2ban konfigurieren", text: "/etc/fail2ban/jail.local anlegen: [sshd] enabled=true, maxretry=5, bantime=3600, findtime=600." },
              { "@type": "HowToStep", name: "Suricata für Netzwerk-IDS", text: "apt install suricata. suricata-update ausführen, Interface in suricata.yaml setzen, als Service starten." },
              { "@type": "HowToStep", name: "Alert-Routing einrichten", text: "OSSEC-Alerts per E-Mail oder Slack-Webhook weiterleiten. Threshold für false-positives kalibrieren." },
              { "@type": "HowToStep", name: "Erkennung testen", text: "Kontrollierten Brute-Force-Versuch (eigene IP) durchführen und Fail2ban-Ban verifizieren." },
            ]
          }
        ]) }} />
      </div>
    </div>
  );
}
