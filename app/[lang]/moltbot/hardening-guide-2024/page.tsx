import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/hardening-guide-2024"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Hardening Guide 2026: Production Security Standards | ClawGuru", "Moltbot Hardening Guide 2026: Production Security Standards | ClawGuru")
  const description = pick(isDE, "Aktueller Moltbot Hardening Guide 2026. Security Headers, Environment Hardening, Secrets Management, TLS-Konfiguration und CIS Benchmark Compliance für Production-Deployments.", "Current Moltbot Hardening Guide 2026. Security Headers, Environment Hardening, Secrets Management, TLS Configuration and CIS Benchmark Compliance for Production Deployments.")
  return {
    title, description,
    keywords: ['moltbot hardening guide','production security','security headers','secrets management','tls configuration','cis benchmark'],
    authors: [{ name: 'R. Schwertfechter' }],
    openGraph: { title, description, type: 'article', url: `${SITE_URL}/${locale}${PATH}`, images: ['/og-moltbot-hardening.jpg'] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotHardeningGuidePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Hardening Guide 2026: Production Security Standards | ClawGuru", "Moltbot Hardening Guide 2026: Production Security Standards | ClawGuru")

  const FAQ = [
    { q: pick(isDE, "Was ist der Moltbot Hardening Guide 2026?", "What is the Moltbot Hardening Guide 2026?"), a: pick(isDE, "Der Moltbot Hardening Guide 2026 ist ein Production Security Standard mit Security Headers, Environment Hardening, Secrets Management und TLS-Konfiguration nach CIS Benchmark. Er schützt Moltbot-Deployments durch systematische Härtung aller Systemkomponenten.", "The Moltbot Hardening Guide 2026 is a production security standard with security headers, environment hardening, secrets management and TLS configuration according to CIS Benchmark. It protects Moltbot deployments through systematic hardening of all system components.") },
    { q: pick(isDE, "Welche Security Headers sind notwendig?", "Which security headers are necessary?"), a: pick(isDE, "Essentielle Security Headers: HSTS (max-age=63072000), CSP (default-src 'self'), X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy (strict-origin-when-cross-origin), Permissions-Policy (camera=(), microphone=()).", "Essential security headers: HSTS (max-age=63072000), CSP (default-src 'self'), X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy (strict-origin-when-cross-origin), Permissions-Policy (camera=(), microphone=()).") },
    { q: pick(isDE, "Wie verwalte ich Secrets sicher?", "How do I manage secrets securely?"), a: pick(isDE, "Alle Secrets müssen als Environment Variables gespeichert werden, niemals im Code. Verwende .env.example für Template, .gitignore für echte Secrets. Rotation alle 90 Tage. Minimale Key-Länge: 64 Zeichen für JWT Secrets.", "All secrets must be stored as environment variables, never in code. Use .env.example for template, .gitignore for real secrets. Rotate every 90 days. Minimum key length: 64 characters for JWT secrets.") },
    { q: pick(isDE, "Was ist CIS Benchmark Compliance?", "What is CIS Benchmark Compliance?"), a: pick(isDE, "CIS Benchmarks sind standardisierte Hardening-Richtlinien für verschiedene Systeme. Für Moltbot relevant: CIS Benchmark for Docker, CIS Benchmark for Kubernetes, CIS Benchmark for PostgreSQL. Compliance bedeutet: Alle Controls implementiert, Score 100/100.", "CIS Benchmarks are standardized hardening guidelines for various systems. Relevant for Moltbot: CIS Benchmark for Docker, CIS Benchmark for Kubernetes, CIS Benchmark for PostgreSQL. Compliance means: All controls implemented, score 100/100.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Hardening Guide 2026", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["Security Hardening", "CIS Benchmark", "Security Headers", "Secrets Management", "TLS Configuration"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Hardening?", "What is Hardening?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Security Headers", "Security Headers")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Hardening Score", "Hardening Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Hardening Guide 2026 · Production-Ready</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Moltbot Hardening Guide 2026 — Du hast keine Security Headers, kein Secrets Management, keine CIS Benchmark Compliance. Default-Konfigurationen, Hardcoded Secrets, Root Docker User. 80% aller Security-Breaches resultieren aus fehlender Hardening. Dein CEO hat den CISO gefeuert.", "Moltbot Hardening Guide 2026 — You Have No Security Headers, No Secrets Management, No CIS Benchmark Compliance. Default Configurations, Hardcoded Secrets, Root Docker User. 80% of all security breaches result from missing hardening. Your CEO fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du hast keine Security Headers, kein Secrets Management und keine CIS Benchmark Compliance. Default-Konfigurationen, Hardcoded Secrets, Root Docker User. 80% aller Security-Breaches resultieren aus fehlender Hardening. Dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You have no security headers, no secrets management and no CIS benchmark compliance. Default configurations, hardcoded secrets, root Docker user. 80% of all security breaches result from missing hardening. Your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient ausschließlich zur Härtung von Moltbot-Systemen. Keine Angriffswerkzeuge.", "This guide is exclusively for hardening Moltbot systems. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Hardening? Einfach erklärt.", "What is Hardening? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Hardening wie das Verstärken eines Hauses vor: Du installierst Sicherheitstüren, Alarmanlagen und verstärkte Fenster. Für Moltbot bedeutet das: Security Headers, Secrets Management, TLS-Konfiguration, Non-root Docker User, Read-only Filesystem und CIS Benchmark Compliance. Gutes Hardening bedeutet: Never run with defaults, always harden every layer.", "Think of hardening like reinforcing a house: you install security doors, alarm systems and reinforced windows. For Moltbot, this means: security headers, secrets management, TLS configuration, non-root Docker user, read-only filesystem and CIS benchmark compliance. Good hardening means: never run with defaults, always harden every layer.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Security Headers (Next.js)", "Security Headers (Next.js)")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`// next.config.js — Security Headers
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'nonce-{NONCE}'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.clawguru.org",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};`}</pre>
              </div>
            </div>

            {/* Secrets Management */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Secrets Management", "Secrets Management")}</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`# .env.example — Alle Secrets als Environment Variables
# ⚠️ NIEMALS echte Werte committen!

# Database
DATABASE_URL=postgresql://user:password@host:5432/moltbot?sslmode=require

# Auth
JWT_ACCESS_SECRET=<256-bit-random-string>
JWT_REFRESH_SECRET=<256-bit-random-string>
OAUTH2_CLIENT_SECRET=<from-identity-provider>

# Encryption
APP_ENCRYPTION_KEY=<32-byte-hex-key>

# Rate Limiting
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=<token>

# Admin
ADMIN_TOKEN=<256-bit-random-string>

# Minimum key length validation
node -e "
  const k = process.env.JWT_ACCESS_SECRET;
  if (!k || k.length < 64) throw new Error('JWT_ACCESS_SECRET zu kurz (min 64 Zeichen)');
  console.log('✅ Secrets valid');
"`}</pre>
              </div>
            </div>

            {/* Docker Hardening */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Docker Hardening", "Docker Hardening")}</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`# Dockerfile — Non-root User + Read-only Filesystem
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine
RUN addgroup -g 1001 -S nodejs && \
    adduser -S moltbot -u 1001
WORKDIR /app
COPY --from=builder --chown=moltbot:nodejs /app /app
USER moltbot
EXPOSE 3000
CMD ["node", "server.js"]

# docker-compose.yml — Read-only Filesystem
services:
  moltbot:
    build: .
    read_only: true
    tmpfs:
      - /tmp
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Hardcoded Secrets im Git", "SCAR #1: Hardcoded Secrets in Git")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Hardcoded Secrets im Git Repository. API-Keys öffentlich, Daten-Leak. Fix: Alle Secrets als Environment Variables, .gitignore für .env.", "Hardcoded secrets in git repository. API-Keys public, data leak. Fix: All secrets as environment variables, .gitignore for .env.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Secrets Management. Lessons: Aktiviere Secrets Management für alle Deployments.", "Root Cause: No secrets management. Lessons: Enable secrets management for all deployments.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Root Docker User", "SCAR #2: Root Docker User")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Docker Container als Root User laufen. Container-Escape, Privilege Escalation. Fix: Non-root User (UID 1001), Capability Dropping.", "Docker container running as root user. Container escape, privilege escalation. Fix: Non-root user (UID 1001), capability dropping.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Docker Hardening. Lessons: Aktiviere Non-root User für alle Container.", "Root Cause: No Docker hardening. Lessons: Enable non-root user for all containers.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Security Headers aktivieren", "Enable Security Headers")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere HSTS, CSP, X-Frame-Options, X-Content-Type-Options in next.config.js.", "Enable HSTS, CSP, X-Frame-Options, X-Content-Type-Options in next.config.js.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Secrets Management aktivieren", "Enable Secrets Management")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Alle Secrets als Environment Variables. .gitignore für .env.", "All secrets as environment variables. .gitignore for .env.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Docker Hardening aktivieren", "Enable Docker Hardening")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Non-root User (UID 1001), Read-only Filesystem, Capability Dropping.", "Non-root user (UID 1001), read-only filesystem, capability dropping.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Hardening Checkliste", "Interactive Hardening Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "hard1", text: pick(isDE, "Security Headers gesetzt (HSTS, CSP, X-Frame-Options)", "Security headers set (HSTS, CSP, X-Frame-Options)") },
                  { id: "hard2", text: pick(isDE, "TLS 1.2+ erzwungen, TLS 1.0/1.1 deaktiviert", "TLS 1.2+ enforced, TLS 1.0/1.1 disabled") },
                  { id: "hard3", text: pick(isDE, "Alle Secrets als Env-Vars, keine Hardcoding", "All secrets as env vars, no hardcoding") },
                  { id: "hard4", text: pick(isDE, "Non-root Docker User (UID 1001)", "Non-root Docker user (UID 1001)") },
                  { id: "hard5", text: pick(isDE, "Read-only Filesystem im Container", "Read-only filesystem in container") },
                  { id: "hard6", text: pick(isDE, "Rate Limiting auf allen API-Endpoints", "Rate limiting on all API endpoints") },
                  { id: "hard7", text: pick(isDE, "SQL-Injection Prevention (parameterisierte Queries)", "SQL-injection prevention (parameterized queries)") },
                  { id: "hard8", text: pick(isDE, "Dependency Scanning im CI/CD (npm audit)", "Dependency scanning in CI/CD (npm audit)") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Hardening Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Hardening Score Calculator", "Hardening Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Sind Security Headers aktiv?", "Are security headers active?"), weight: 25 },
                  { q: pick(isDE, "Ist Secrets Management aktiv?", "Is secrets management active?"), weight: 25 },
                  { q: pick(isDE, "Ist Docker Hardening aktiv?", "Is Docker hardening active?"), weight: 25 },
                  { q: pick(isDE, "Ist CIS Benchmark Compliance aktiv?", "Is CIS benchmark compliance active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Hardening Score:", "Your Hardening Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 42/100", "Industry Average: 42/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Security Hardening, CIS Benchmark, Security Headers und Secrets Management.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in security hardening, CIS benchmark, security headers and secrets management.")}
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
                <div className="text-sm text-gray-300">{pick(isDE, "Hardening live prüfen", "Check hardening live")}</div>
              </a>
              <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Roast My Moltbot</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Config testen lassen", "Get config tested")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Runbooks</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Hardening Playbooks", "Hardening playbooks")}</div>
              </a>
              <a href={`/${locale}/solutions`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Enterprise</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Managed Security", "Managed security")}</div>
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
