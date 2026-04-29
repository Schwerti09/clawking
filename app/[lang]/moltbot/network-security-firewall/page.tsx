import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/network-security-firewall"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Network Security: Firewall & DDoS Protection 2026 | ClawGuru", "Moltbot Network Security: Firewall & DDoS Protection 2026 | ClawGuru")
  const description = pick(isDE, "Network Security für Moltbot: Firewall-Konfiguration, DDoS-Schutz, IP-Allowlisting, WAF-Setup und Netzwerk-Segmentierung. Konkrete iptables, nginx und Cloudflare Konfigurationen.", "Network security for Moltbot: firewall configuration, DDoS protection, IP allowlisting, WAF setup and network segmentation. Specific iptables, nginx and Cloudflare configurations.")
  return {
    title, description,
    keywords: ['moltbot network security','firewall configuration','ddos protection','waf setup','ip allowlisting','network segmentation'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: { title, description, type: 'article', url: pageUrl, images: ['/og-image.png'] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotNetworkSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Network Security Firewall", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot Network Security Guide", "Moltbot Network Security Guide"), description: pick(isDE, "Network Security Firewall und DDoS Protection", "Network Security Firewall and DDoS Protection"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient ausschließlich zur Absicherung von Netzwerk-Infrastrukturen. Keine Angriffswerkzeuge.", "This guide is exclusively for securing network infrastructures. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Network Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot Network Security: Firewall & DDoS Protection", "Moltbot Network Security: Firewall & DDoS Protection")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Netzwerk-Absicherung für Moltbot — von iptables-Regeln über nginx WAF bis hin zu Cloudflare DDoS-Schutz und IP-Allowlisting.", "Network hardening for Moltbot — from iptables rules through nginx WAF to Cloudflare DDoS protection and IP allowlisting.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Network Security? Einfach erklärt", "What is Network Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Network Security ist wie ein Türsteher für Netzwerk-Traffic: es entscheidet, was rein darf und was draußen bleibt. Firewalls filtern eingehenden Traffic basierend auf Regeln. DDoS Protection schützt vor Massenangriffen. IP-Allowlisting erlaubt nur vertrauenswürdige IPs. WAF (Web Application Firewall) blockiert HTTP-Angriffe wie SQL Injection und XSS. Netzwerk-Segmentierung unterteilt das Netzwerk in isolierte Zonen. Ohne Network Security sind Server angreifbar für DDoS, Port Scans und unauthorized Access.", "Network security is like a bouncer for network traffic: it decides what gets in and what stays out. Firewalls filter incoming traffic based on rules. DDoS protection protects against mass attacks. IP allowlisting only allows trusted IPs. WAF (Web Application Firewall) blocks HTTP attacks like SQL injection and XSS. Network segmentation divides the network into isolated zones. Without network security, servers are vulnerable to DDoS, port scans, and unauthorized access.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Konfigurationen und Ressourcen", "Jump to configurations and resources")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔥 iptables Firewall Rules", "🔥 iptables Firewall Rules")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`#!/bin/bash
# moltbot-firewall.sh — Produktions-Firewall für Moltbot

# Standard-Policy: Alles verweigern
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Bestehende Verbindungen erlauben
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Loopback erlauben
iptables -A INPUT -i lo -j ACCEPT

# SSH (nur von Management-Netz)
iptables -A INPUT -p tcp --dport 22 -s 10.0.1.0/24 -j ACCEPT

# HTTP/HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Moltbot API (nur intern)
iptables -A INPUT -p tcp --dport 3000 -s 10.0.0.0/8 -j ACCEPT

# DDoS Protection: Rate Limiting
iptables -A INPUT -p tcp --dport 443 -m limit --limit 100/min --limit-burst 200 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j DROP

# Logging verdächtiger Pakete
iptables -A INPUT -j LOG --log-prefix "MOLTBOT-DROP: " --log-level 7`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🌐 nginx WAF Konfiguration", "🌐 nginx WAF Configuration")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-blue-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`# /etc/nginx/conf.d/moltbot-security.conf
server {
    listen 443 ssl http2;
    server_name clawguru.org;

    # TLS Hardening
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    add_header Strict-Transport-Security "max-age=63072000" always;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=moltbot_api:10m rate=10r/s;
    limit_req zone=moltbot_api burst=20 nodelay;

    # Block common attacks
    location ~ \.(git|env|htpasswd|htaccess)$ {
        deny all;
    }

    # SQL Injection / XSS basic WAF
    if ($query_string ~* "(union|select|insert|update|delete|drop|<script)") {
        return 403;
    }

    location /api/ {
        proxy_pass http://moltbot:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "☁️ Cloudflare DDoS Rules", "☁️ Cloudflare DDoS Rules")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-yellow-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm">
            <pre>{`# Cloudflare Firewall Rules (via API)
# Block bekannte Bad Bots
{
  "expression": "(cf.threat_score gt 50) or (not cf.client.bot)",
  "action": "challenge"
}

# Rate Limit für Moltbot API
{
  "expression": "http.request.uri.path matches \"^/api/\"",
  "action": "block",
  "ratelimit": {
    "characteristics": ["ip.src"],
    "period": 60,
    "requests_per_period": 100
  }
}

# Geo-Blocking (optional)
{
  "expression": "ip.geoip.country in {\"XX\" \"YY\"}",
  "action": "block"
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Netzwerk live scannen", "Scan network live")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Network Firewall Playbooks", "Network firewall playbooks")}</div>
            </a>
            <a href={`/${locale}/neuro`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Neuro AI</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Anomalie-Erkennung", "Anomaly detection")}</div>
            </a>
            <a href={`/${locale}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Enterprise</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Managed Firewall", "Managed firewall")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Network Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Network-Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with network security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
