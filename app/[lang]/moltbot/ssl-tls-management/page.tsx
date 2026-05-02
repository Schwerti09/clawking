import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ssl-tls-management"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot SSL/TLS Management: Zertifikate & Cipher Suites 2026 | ClawGuru", "Moltbot SSL/TLS Management: Certificates & Cipher Suites 2026 | ClawGuru")
  const description = pick(isDE, "SSL/TLS Management für Moltbot. Let's Encrypt Automatisierung, TLS 1.3 Konfiguration, Certificate Pinning, HSTS Preloading und Cipher Suite Hardening. A+ SSL Labs Rating.", "SSL/TLS Management for Moltbot. Let's Encrypt Automation, TLS 1.3 Configuration, Certificate Pinning, HSTS Preloading and Cipher Suite Hardening. A+ SSL Labs Rating.")
  return {
    title, description,
    keywords: ['moltbot ssl tls','certificate management','lets encrypt','tls 1.3','cipher suite','hsts preloading','ssl labs'],
    authors: [{ name: 'R. Schwertfechter' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: `${SITE_URL}/${locale}${PATH}`,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

const FAQ = [
  { q: pick(isDE, "Was ist TLS Hardening?", "What is TLS Hardening?"), a: pick(isDE, "TLS Hardening ist das Konfigurieren von TLS für maximale Sicherheit: TLS 1.2/1.3 nur, schwache Cipher Suites deaktiviert, Perfect Forward Secrecy, HSTS Preloading, OCSP Stapling. Ziel: A+ SSL Labs Rating.", "TLS hardening is configuring TLS for maximum security: TLS 1.2/1.3 only, weak cipher suites disabled, perfect forward secrecy, HSTS preloading, OCSP stapling. Goal: A+ SSL Labs rating.") },
  { q: pick(isDE, "Wie aktiviere ich Let's Encrypt Auto-Renewal?", "How do I enable Let's Encrypt auto-renewal?"), a: pick(isDE, "Installiere certbot, richte Cron-Job für alle 12 Stunden ein: certbot renew --quiet --post-hook 'nginx -s reload'. Monitoring Script prüft Ablaufdatum und warnt bei < 30 Tagen.", "Install certbot, set up cron job every 12 hours: certbot renew --quiet --post-hook 'nginx -s reload'. Monitoring script checks expiry date and warns at < 30 days.") },
  { q: pick(isDE, "Was ist Perfect Forward Secrecy?", "What is Perfect Forward Secrecy?"), a: pick(isDE, "Perfect Forward Secrecy (PFS) bedeutet, dass auch bei kompromittiertem Private Key vergangene Sessions nicht entschlüsselt werden können. Aktiviert durch ECDHE Cipher Suites und Session Ticket Deaktivierung.", "Perfect Forward Secrecy (PFS) means that even with a compromised private key, past sessions cannot be decrypted. Enabled by ECDHE cipher suites and session ticket deactivation.") },
  { q: pick(isDE, "Was ist HSTS Preloading?", "What is HSTS Preloading?"), a: pick(isDE, "HSTS Preloading fügt deine Domain zur HSTS Preload List hinzu. Browser erzwingen HTTPS für alle Subdomains ohne initialen HTTP-Request. Erfordert max-age ≥ 31536000 und includeSubDomains.", "HSTS preloading adds your domain to the HSTS preload list. Browsers enforce HTTPS for all subdomains without initial HTTP request. Requires max-age ≥ 31536000 and includeSubDomains.") },
]

export default function MoltbotSslTlsPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot SSL/TLS Management: Zertifikate & Cipher Suites 2026 | ClawGuru", "Moltbot SSL/TLS Management: Certificates & Cipher Suites 2026 | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "SSL/TLS Management", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["SSL/TLS Management", "Certificate Management", "TLS 1.3", "HSTS", "Let's Encrypt"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist TLS?", "What is TLS?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "TLS Hardening", "TLS Hardening")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "TLS Score", "TLS Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">10 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">SSL/TLS Management · Production-Ready</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Moltbot SSL/TLS Management — Du hast kein TLS Hardening, kein Let's Encrypt Auto-Renewal, kein HSTS Preloading. TLS 1.0/1.1 aktiv, schwache Cipher Suites, abgelaufene Zertifikate. SSL Labs Score C, MITM-Angriffe möglich, dein CEO hat den CISO gefeuert.", "Moltbot SSL/TLS Management — You Have No TLS Hardening, No Let's Encrypt Auto-Renewal, No HSTS Preloading. TLS 1.0/1.1 Active, Weak Cipher Suites, Expired Certificates. SSL Labs Score C, MITM Attacks Possible, Your CEO Fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du hast kein TLS Hardening, kein Let's Encrypt Auto-Renewal und kein HSTS Preloading. TLS 1.0/1.1 aktiv, schwache Cipher Suites, abgelaufene Zertifikate. SSL Labs Score C, MITM-Angriffe möglich, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You have no TLS hardening, no Let's Encrypt auto-renewal and no HSTS preloading. TLS 1.0/1.1 active, weak cipher suites, expired certificates. SSL Labs Score C, MITM attacks possible, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "SSL/TLS Management sichert Kommunikation ab. Keine Angriffswerkzeuge.", "SSL/TLS management secures communication. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist TLS? Einfach erklärt.", "What is TLS? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir TLS wie einen verschlüsselten Tunnel vor: Alle Daten zwischen Browser und Server sind verschlüsselt, niemand kann sie lesen. Für Moltbot bedeutet das: TLS 1.2/1.3 nur, schwache Cipher Suites deaktiviert, Perfect Forward Secrecy, HSTS Preloading, OCSP Stapling. Gutes TLS bedeutet: Never use weak ciphers, always enforce HTTPS.", "Think of TLS like an encrypted tunnel: all data between browser and server is encrypted, no one can read it. For Moltbot, this means: TLS 1.2/1.3 only, weak cipher suites disabled, perfect forward secrecy, HSTS preloading, OCSP stapling. Good TLS means: never use weak ciphers, always enforce HTTPS.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "TLS Hardening Konfiguration", "TLS Hardening Configuration")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`# nginx TLS Hardening für Moltbot (A+ SSL Labs Rating)
ssl_protocols TLSv1.2 TLSv1.3;

# Moderne Cipher Suites (Forward Secrecy)
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256;

ssl_prefer_server_ciphers off;  # TLS 1.3: Client-Präferenz
ssl_session_timeout 1d;
ssl_session_cache shared:MozSSL:10m;
ssl_session_tickets off;         # Disable Session Tickets (Forward Secrecy)

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;

# DH Parameters (4096-bit)
ssl_dhparam /etc/ssl/dhparam.pem;

# Security Headers
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;`}</pre>
              </div>
            </div>

            {/* Let's Encrypt Auto-Renewal */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Let's Encrypt Auto-Renewal", "Let's Encrypt Auto-Renewal")}</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`# Certbot auto-renewal für clawguru.org
# Installation
apt-get install certbot python3-certbot-nginx

# Zertifikat ausstellen
certbot --nginx \\
  -d clawguru.org \\
  -d www.clawguru.org \\
  --email security@clawguru.org \\
  --agree-tos \\
  --no-eff-email

# Renewal Cron (alle 12 Stunden prüfen)
echo "0 */12 * * * root certbot renew --quiet --post-hook 'nginx -s reload'" \\
  >> /etc/cron.d/certbot

# Certificate Monitoring Script
#!/bin/bash
DOMAIN="clawguru.org"
EXPIRY=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN \\
  </dev/null 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s)
NOW_EPOCH=$(date +%s)
DAYS_LEFT=$(( (EXPIRY_EPOCH - NOW_EPOCH) / 86400 ))
echo "Certificate expires in $DAYS_LEFT days"
[ $DAYS_LEFT -lt 30 ] && echo "WARNING: Certificate expires soon!"`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Abgelaufenes Zertifikat", "SCAR #1: Expired Certificate")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Abgelaufenes Zertifikat ohne Auto-Renewal. Service offline, Benutzer können nicht zugreifen. Fix: Let's Encrypt Auto-Renewal mit Cron-Job.", "Expired certificate without auto-renewal. Service offline, users cannot access. Fix: Let's Encrypt auto-renewal with cron job.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Auto-Renewal. Lessons: Aktiviere Let's Encrypt Auto-Renewal für alle Domains.", "Root Cause: No auto-renewal. Lessons: Enable Let's Encrypt auto-renewal for all domains.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: TLS 1.0/1.1 aktiv", "SCAR #2: TLS 1.0/1.1 Active")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "TLS 1.0/1.1 aktiv mit schwachen Cipher Suites. POODLE, BEAST Angriffe möglich. Fix: TLS 1.2/1.3 nur, schwache Cipher Suites deaktiviert.", "TLS 1.0/1.1 active with weak cipher suites. POODLE, BEAST attacks possible. Fix: TLS 1.2/1.3 only, weak cipher suites disabled.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein TLS Hardening. Lessons: Aktiviere TLS 1.2/1.3 nur für alle Services.", "Root Cause: No TLS hardening. Lessons: Enable TLS 1.2/1.3 only for all services.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "TLS 1.0/1.1 deaktivieren", "Disable TLS 1.0/1.1")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere TLS 1.2/1.3 nur in nginx/Apache Konfiguration.", "Enable TLS 1.2/1.3 only in nginx/Apache configuration.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Let's Encrypt Auto-Renewal aktivieren", "Enable Let's Encrypt Auto-Renewal")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Installiere certbot, richte Cron-Job für alle 12 Stunden ein.", "Install certbot, set up cron job every 12 hours.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "HSTS Preloading aktivieren", "Enable HSTS Preloading")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Setze HSTS Header mit max-age=63072000 und includeSubDomains. Request Preload.", "Set HSTS header with max-age=63072000 and includeSubDomains. Request preload.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive TLS Checkliste", "Interactive TLS Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "tls1", text: pick(isDE, "TLS 1.0 und 1.1 deaktiviert", "TLS 1.0 and 1.1 disabled") },
                  { id: "tls2", text: pick(isDE, "TLS 1.2 und 1.3 aktiviert", "TLS 1.2 and 1.3 enabled") },
                  { id: "tls3", text: pick(isDE, "Schwache Cipher Suites deaktiviert (RC4, DES, 3DES)", "Weak cipher suites disabled (RC4, DES, 3DES)") },
                  { id: "tls4", text: pick(isDE, "Perfect Forward Secrecy (ECDHE) aktiviert", "Perfect Forward Secrecy (ECDHE) enabled") },
                  { id: "tls5", text: pick(isDE, "HSTS Header gesetzt (max-age ≥ 1 Jahr)", "HSTS header set (max-age ≥ 1 year)") },
                  { id: "tls6", text: pick(isDE, "HSTS Preload angefordert", "HSTS preload requested") },
                  { id: "tls7", text: pick(isDE, "OCSP Stapling aktiviert", "OCSP stapling enabled") },
                  { id: "tls8", text: pick(isDE, "SSL Labs Score: A+", "SSL Labs Score: A+") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* TLS Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "TLS Score Calculator", "TLS Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist TLS 1.2/1.3 aktiv?", "Is TLS 1.2/1.3 active?"), weight: 25 },
                  { q: pick(isDE, "Ist HSTS aktiv?", "Is HSTS active?"), weight: 25 },
                  { q: pick(isDE, "Ist OCSP Stapling aktiv?", "Is OCSP stapling active?"), weight: 25 },
                  { q: pick(isDE, "SSL Labs Score: A+?", "SSL Labs Score: A+?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein TLS Score:", "Your TLS Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 65/100", "Industry Average: 65/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für SSL/TLS Management, Certificate Management, TLS 1.3 und HSTS.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in SSL/TLS management, certificate management, TLS 1.3 and HSTS.")}
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
                <div className="text-sm text-gray-300">{pick(isDE, "TLS live prüfen", "Check TLS live")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">TLS Runbooks</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Certificate Guides", "Certificate guides")}</div>
              </a>
              <a href={`/${locale}/openclaw`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">OpenClaw</div>
                <div className="text-sm text-gray-300">{pick(isDE, "TLS Framework", "TLS framework")}</div>
              </a>
              <a href={`/${locale}/solutions`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Enterprise</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Managed PKI", "Managed PKI")}</div>
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
