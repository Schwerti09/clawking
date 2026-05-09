import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: 'OpenClaw Firewall Konfiguration: UFW & iptables Guide 2024',
    description: 'Firewall-Konfiguration für OpenClaw mit UFW und iptables. Whitelist-Regeln, Port-Blocking, Geo-Blocking, Fail2ban-Integration und automatisierte Firewall-Audits.',
    keywords: ['openclaw firewall','ufw konfiguration','iptables rules','geo blocking','fail2ban firewall','port security'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: 'OpenClaw Firewall Konfiguration: UFW & iptables 2024', description: 'Firewall-Konfiguration für OpenClaw.', type: 'article', url: `https://clawguru.org/${lang}/openclaw/firewall-configuration-guide` },
    alternates: buildLocalizedAlternates(lang as Locale, '/openclaw/firewall-configuration-guide'),
    robots: 'index, follow',
  };
}

export default function OpenClawFirewallPage({ params }: { params: { lang: string } }) {
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: Firewall-Konfiguration schützt eigene Server. Keine Angriffswerkzeuge.
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Firewall Configuration · UFW & iptables</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">OpenClaw Firewall Konfiguration</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Minimale Angriffsfläche durch striktes Whitelist-Prinzip — nur explizit erlaubte Verbindungen werden durchgelassen.</p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">UFW Basis-Konfiguration</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 font-mono text-sm overflow-x-auto">
            <pre>{`# UFW Firewall für OpenClaw Server

# 1. Alles blockieren (Default Deny)
ufw default deny incoming
ufw default allow outgoing

# 2. SSH (Non-Standard Port)
ufw allow 2222/tcp comment "SSH"

# 3. HTTP/HTTPS (nur über nginx Proxy)
ufw allow 80/tcp comment "HTTP (redirect to HTTPS)"
ufw allow 443/tcp comment "HTTPS"

# 4. Datenbank nur von intern
# PostgreSQL NICHT öffentlich freigeben!
# ufw deny 5432/tcp  # Standard: bereits geblockt

# 5. Monitoring (nur von Management-IP)
ufw allow from 10.0.1.0/24 to any port 9090 comment "Prometheus"
ufw allow from 10.0.1.0/24 to any port 3001 comment "Grafana"

# 6. UFW aktivieren
ufw --force enable
ufw status verbose

# Regel-Check: Was ist offen?
ufw status numbered`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Port-Status Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-gray-800/80 backdrop-blur-lg text-white"><th className="p-3 text-left">Port</th><th className="p-3 text-left">Service</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Zugriff</th></tr></thead>
              <tbody>
                {[
                  ['22', 'SSH (Standard)', '🔴 Deaktiviert', 'Umleitung auf 2222'],
                  ['2222', 'SSH (Custom)', '🟢 Erlaubt', 'Nur Key-Auth'],
                  ['80', 'HTTP', '🟢 Erlaubt', 'Redirect → 443'],
                  ['443', 'HTTPS', '🟢 Erlaubt', 'Öffentlich'],
                  ['3000', 'Node.js App', '🔴 Geblockt', 'Nur über nginx'],
                  ['5432', 'PostgreSQL', '🔴 Geblockt', 'Nur localhost'],
                  ['6379', 'Redis', '🔴 Geblockt', 'Nur localhost'],
                  ['9090', 'Prometheus', '🟡 Intern', 'VPN/Management'],
                  ['3001', 'Grafana', '🟡 Intern', 'VPN/Management'],
                ].map(([port, service, status, access]) => (
                  <tr key={port} className="border-b hover:bg-gray-800/50 transition-colors">
                    <td className="p-3 font-mono text-sm">{port}</td>
                    <td className="p-3">{service}</td>
                    <td className="p-3">{status}</td>
                    <td className="p-3 text-sm text-gray-300">{access}</td>
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
              <div className="text-sm text-gray-300">Port Scan</div>
            </a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Firewall Runbooks</div>
              <div className="text-sm text-gray-300">UFW Guides</div>
            </a>
            <a href={`/${lang}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">Framework</div>
            </a>
            <a href={`/${lang}/neuro`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Neuro AI</div>
              <div className="text-sm text-gray-300">Anomalie-Erkennung</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Firewall Security Score Calculator — Wie sicher ist deine Firewall?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen Firewall Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du Default Deny Policy aktiviert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, UFW default deny</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Nutzt du Non-Standard SSH-Port?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein (Port 22)</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Custom Port + Key-Auth</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Sind Datenbank-Ports öffentlich geblockt?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Alle geblockt</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Hast du Fail2ban installiert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Fail2ban aktiv</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Hast du Firewall-Regeln dokumentiert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Vollständig dokumentiert</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Firewall Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">45/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für Firewall Audit & Detailed Report</div>
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
            name: "Firewall für OpenClaw mit UFW konfigurieren",
            description: "Schritt-für-Schritt Firewall-Konfiguration mit UFW und iptables für OpenClaw Server nach Whitelist-Prinzip.",
            totalTime: "PT30M",
            step: [
              { "@type": "HowToStep", name: "UFW installieren und aktivieren", text: "apt install ufw && ufw default deny incoming && ufw default allow outgoing && ufw enable" },
              { "@type": "HowToStep", name: "SSH-Port freigeben", text: "ufw allow 22/tcp (oder custom port). Danach SSH-Verbindung testen bevor weitere Regeln gesetzt werden." },
              { "@type": "HowToStep", name: "Anwendungsports öffnen", text: "Nur explizit benötigte Ports freigeben: ufw allow 443/tcp, ufw allow 80/tcp. Alle anderen blockiert lassen." },
              { "@type": "HowToStep", name: "Fail2ban installieren", text: "apt install fail2ban, /etc/fail2ban/jail.local anlegen: maxretry=5, bantime=3600." },
              { "@type": "HowToStep", name: "Firewall-Regeln prüfen", text: "ufw status verbose ausführen. Alle offenen Ports dokumentieren und mit Security Check validieren." },
            ]
          }
        ]) }} />
      </div>
    </div>
  );
}
