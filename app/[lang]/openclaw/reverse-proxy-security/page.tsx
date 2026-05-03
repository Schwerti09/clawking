import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: 'OpenClaw Reverse Proxy Security: nginx & Caddy Hardening 2024',
    description: 'Reverse Proxy Security für OpenClaw mit nginx und Caddy. Rate Limiting, IP Blocking, Security Headers, ModSecurity WAF und DDoS-Schutz. Produktionsreife Konfiguration.',
    keywords: ['openclaw reverse proxy','nginx security hardening','caddy security','modsecurity waf','rate limiting nginx','ddos protection'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: 'OpenClaw Reverse Proxy Security 2024', description: 'Reverse Proxy Hardening für OpenClaw.', type: 'article', url: `https://clawguru.org/${lang}/openclaw/reverse-proxy-security` },
    alternates: buildLocalizedAlternates(lang as Locale, '/openclaw/reverse-proxy-security'),
    robots: 'index, follow',
  };
}

export default function OpenClawReverseProxyPage({ params }: { params: { lang: string } }) {
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: Reverse Proxy Hardening schützt eigene Dienste. Keine Angriffswerkzeuge.
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OpenClaw · Reverse Proxy Security</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">OpenClaw Reverse Proxy Security</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Gehärteter nginx als Security-Layer vor OpenClaw — Rate Limiting, WAF, Security Headers und DDoS-Schutz.</p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">⚙️ nginx Hardening Konfiguration</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 font-mono text-sm overflow-x-auto">
            <pre>{`# /etc/nginx/sites-available/openclaw — Gehärtete Konfiguration

# Rate Limiting Zones
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=auth:10m rate=3r/m;
limit_conn_zone $binary_remote_addr zone=perip:10m;

server {
    listen 443 ssl http2;
    server_name openclaw.example.com;

    # TLS
    ssl_certificate /etc/letsencrypt/live/openclaw.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/openclaw.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # Security Headers
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # Server Token verstecken
    server_tokens off;

    # Connection Limits
    limit_conn perip 20;

    # Auth Endpoints: strikteres Rate Limiting
    location /api/auth/ {
        limit_req zone=auth burst=5 nodelay;
        proxy_pass http://openclaw:3000;
    }

    # API Endpoints
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://openclaw:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Blockiere bekannte Bad Paths
    location ~* (eval|base64|phpinfo|shell|cmd) {
        deny all;
        return 444;
    }
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">✅ Proxy Security Checklist</h2>
          <div className="space-y-2">
            {[
              'Rate Limiting auf alle API-Endpoints konfiguriert',
              'Auth-Endpoints mit strikterem Limit (3 req/min)',
              'Alle Security Headers gesetzt (X-Frame, CSP, HSTS)',
              'Server Version versteckt (server_tokens off)',
              'TLS 1.0/1.1 deaktiviert',
              'HTTP → HTTPS Redirect (301)',
              'Backend-Server nicht direkt erreichbar',
              'Access Logs aktiviert und gespeichert',
              'Error Logs auf keine sensiblen Infos geprüft',
              'IP-Blocking für bekannte Angreifer-Ranges',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-lg p-3 rounded-lg border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
                <span>✅</span>
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">🔗 Weiterführende Ressourcen</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">🛡️ Security Check</div>
              <div className="text-sm text-gray-300">Header Check</div>
            </a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">📚 nginx Runbooks</div>
              <div className="text-sm text-gray-300">Proxy Guides</div>
            </a>
            <a href={`/${lang}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">🔓 OpenClaw</div>
              <div className="text-sm text-gray-300">Framework</div>
            </a>
            <a href={`/${lang}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">🏢 Enterprise WAF</div>
              <div className="text-sm text-gray-300">Managed Proxy</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Reverse Proxy Security Score Calculator — Wie sicher ist dein Proxy?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen Reverse Proxy Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du Rate Limiting konfiguriert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, API und Auth Limits</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Hast du Security Headers?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, alle Header gesetzt</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Hast du TLS 1.2+?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, nur TLS 1.2/1.3</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Hast du WAF-Regeln?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, ModSecurity aktiv</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Hast du IP-Blocking?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Bad Ranges geblockt</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Reverse Proxy Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">45/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für Proxy Audit & Detailed Report</div>
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
            name: "Reverse Proxy für OpenClaw absichern",
            description: "Nginx oder Caddy als sicherer Reverse Proxy vor OpenClaw: TLS, Rate-Limiting, WAF-Basis-Regeln.",
            totalTime: "PT45M",
            step: [
              { "@type": "HowToStep", name: "TLS mit Let's Encrypt konfigurieren", text: "certbot --nginx -d example.com. SSL-Protokoll auf TLSv1.2+ limitieren, TLSv1.0/1.1 deaktivieren." },
              { "@type": "HowToStep", name: "Security Headers hinzufügen", text: "In nginx.conf: add_header Strict-Transport-Security, X-Frame-Options DENY, X-Content-Type-Options nosniff." },
              { "@type": "HowToStep", name: "Rate-Limiting aktivieren", text: "limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s. limit_req zone=api burst=20 nodelay." },
              { "@type": "HowToStep", name: "Backend-IP verstecken", text: "proxy_hide_header X-Powered-By. server_tokens off. Interne IPs niemals in Error-Pages preisgeben." },
              { "@type": "HowToStep", name: "Konfiguration prüfen", text: "nginx -t, dann Security Check auf clawguru.org ausführen um Header-Score zu verifizieren." },
            ]
          }
        ]) }} />
      </div>
    </div>
  );
}
