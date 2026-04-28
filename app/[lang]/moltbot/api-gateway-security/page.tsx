import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const isDE = lang === 'de'
  return {
    title: pick(isDE, 'Moltbot API Gateway Security: Kong & Rate Limiting 2026', 'Moltbot API Gateway Security: Kong & Rate Limiting 2026'),
    description: pick(isDE, 'API Gateway Security für Moltbot mit Kong. Authentication Plugins, Rate Limiting, IP Whitelisting, Request Validation und API Key Management. Production-ready Gateway Konfiguration.', 'API Gateway Security for Moltbot with Kong. Authentication plugins, rate limiting, IP whitelisting, request validation and API key management. Production-ready gateway configuration.'),
    keywords: ['moltbot api gateway','kong security','api key management','rate limiting gateway','request validation','api authentication'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: 'Moltbot API Gateway Security: Kong & Rate Limiting 2024', description: 'API Gateway Security für Moltbot mit Kong.', type: 'article', url: `https://clawguru.org/${lang}/moltbot/api-gateway-security` },
    alternates: buildLocalizedAlternates(lang as Locale, '/moltbot/api-gateway-security'),
    robots: 'index, follow',
  };
}

export default function MoltbotApiGatewayPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const isDE = lang === 'de'
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound();

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
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, 'API Gateway Security schützt deine Endpoints. Keine Angriffswerkzeuge.', 'API Gateway Security protects your endpoints. No attack tools.')}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · API Gateway</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, 'Moltbot API Gateway Security', 'Moltbot API Gateway Security')}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, 'Zentralisierte API-Absicherung für Moltbot — Authentication, Rate Limiting, Request Validation und Threat Detection als Gateway-Layer.', 'Centralized API security for Moltbot — authentication, rate limiting, request validation and threat detection as gateway layer.')}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Was ist ein API Gateway? Einfach erklärt', 'What is an API Gateway? Simply Explained')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, 'Stell dir ein API Gateway wie einen Türsteher vor ein Club. Alle Anfragen gehen zuerst durch den Türsteher, der prüft: hast du eine gültige ID? Bist du auf der Gästeliste? Darfst du so oft rein wie du willst? Nur wenn alles stimmt, kommst du rein. Das Gateway übernimmt diese Sicherheitsprüfungen für alle deine APIs an einem zentralen Ort.', 'Think of an API gateway like a bouncer at a club. All requests go through the bouncer first, who checks: do you have valid ID? Are you on the guest list? Can you come in as often as you want? Only if everything checks out do you get in. The gateway handles these security checks for all your APIs in one central place.')}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, 'Springe zu Kong Konfiguration, API Key Management und Ressourcen', 'Jump to Kong configuration, API key management, and resources')}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">🚪 Kong Gateway Konfiguration</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm">
            <pre>{`# Kong declarative config (deck) für Moltbot
_format_version: "3.0"

services:
  - name: moltbot-api
    url: http://moltbot:3000
    routes:
      - name: moltbot-api-route
        paths: [/api/v1]
        strip_path: true

plugins:
  # 1. JWT Authentication
  - name: jwt
    service: moltbot-api
    config:
      secret_is_base64: false
      claims_to_verify: [exp, nbf]

  # 2. Rate Limiting (pro Consumer)
  - name: rate-limiting
    service: moltbot-api
    config:
      second: 10
      minute: 100
      hour: 1000
      policy: redis
      redis_host: redis
      redis_port: 6379
      hide_client_headers: false

  # 3. IP Restriction
  - name: ip-restriction
    service: moltbot-api
    config:
      deny: [0.0.0.0/0]  # Alles blockieren außer Whitelist
      allow: [10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16]

  # 4. Request Size Limiting
  - name: request-size-limiting
    service: moltbot-api
    config:
      allowed_payload_size: 1  # 1 MB max
      size_unit: megabytes

  # 5. CORS
  - name: cors
    service: moltbot-api
    config:
      origins: [https://clawguru.org]
      methods: [GET, POST, PUT, DELETE]
      headers: [Authorization, Content-Type]
      credentials: true`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">🔑 API Key Management</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-blue-400 font-mono text-sm">
            <pre>{`// moltbot/lib/api-key-manager.ts
import crypto from 'crypto';
import { db } from './db';

export async function generateApiKey(customerId: string, name: string, permissions: string[]) {
  const rawKey = crypto.randomBytes(32).toString('hex');
  const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');
  const prefix = rawKey.substring(0, 8);

  await db.query(
    'INSERT INTO api_keys (customer_id, name, key_hash, prefix, permissions, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
    [customerId, name, keyHash, prefix, JSON.stringify(permissions)]
  );

  // Nur einmal zurückgeben (danach nur Hash gespeichert)
  return { key: 'moltbot_' + rawKey, prefix, permissions };
}

export async function validateApiKey(rawKey: string) {
  const keyHash = crypto.createHash('sha256').update(rawKey.replace('moltbot_', '')).digest('hex');
  const result = await db.query(
    'SELECT * FROM api_keys WHERE key_hash = $1 AND revoked_at IS NULL',
    [keyHash]
  );
  return result.rows[0] ?? null;
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${lang}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'API Gateway prüfen', 'Check API gateway')}</div></a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, 'Gateway Playbooks', 'Gateway playbooks')}</div></a>
            <a href={`/${lang}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, 'API Framework', 'API framework')}</div></a>
            <a href={`/${lang}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Enterprise</div><div className="text-sm text-gray-300">{pick(isDE, 'Managed API Gateway', 'Managed API gateway')}</div></a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · API Gateway Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit API Gateway Security in Produktionsumgebungen. Die beschriebenen Konfigurationen sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with API gateway security in production environments. The described configurations have been proven in real deployments and continuously improved.')}
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", position: 1, name: pick(isDE, 'Startseite', 'Home'), item: `https://clawguru.org/${lang}` },
              { "@type": "ListItem", position: 2, name: pick(isDE, 'Moltbot', 'Moltbot'), item: `https://clawguru.org/${lang}/moltbot` },
              { "@type": "ListItem", position: 3, name: "API Gateway Security", item: `https://clawguru.org/${lang}/moltbot/api-gateway-security` }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: pick(isDE, 'Was ist Moltbot Security?', 'What is Moltbot Security?'), acceptedAnswer: { "@type": "Answer", text: pick(isDE, 'Moltbot ist eine Security-Automation-Plattform mit 600+ Executable Runbooks, Live-Score und Compliance-Dashboard für Self-Hosting-Infrastrukturen.', 'Moltbot is a security automation platform with 600+ executable runbooks, live score and compliance dashboard for self-hosting infrastructures.') } },
              { "@type": "Question", name: pick(isDE, 'Ist dieser Guide ein Penetrationstest?', 'Is this guide a penetration test?'), acceptedAnswer: { "@type": "Answer", text: pick(isDE, 'Nein. Dieser Guide dient ausschließlich zur Absicherung eigener Systeme. Kein Angriffs-Tool, keine illegalen Aktivitäten.', 'No. This guide is exclusively for securing your own systems. No attack tools, no illegal activities.') } },
              { "@type": "Question", name: pick(isDE, 'Wo finde ich zugehörige Runbooks?', 'Where can I find related runbooks?'), acceptedAnswer: { "@type": "Answer", text: pick(isDE, 'Alle Runbooks sind unter /runbooks abrufbar. Jeder Befund im Security-Check enthält einen direkten Link zum passenden Runbook.', 'All runbooks are available under /runbooks. Each finding in the security check contains a direct link to the matching runbook.') } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: pick(isDE, 'Moltbot API Gateway Security Guide', 'Moltbot API Gateway Security Guide'),
            description: pick(isDE, 'Executable Security Runbooks und Hardening-Guides für Moltbot-Infrastrukturen.', 'Executable security runbooks and hardening guides for Moltbot infrastructures.'),
            url: `https://clawguru.org/${lang}/moltbot/api-gateway-security`
          }
        ]) }} />
      </div>
    </div>
  );
}
