import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: 'Moltbot Zero Trust Architecture: Never Trust, Always Verify 2024',
    description: 'Zero Trust Implementierung für Moltbot. Micro-Segmentierung, Identity-basierter Zugriff, Continuous Verification und Least-Privilege-Prinzip. Komplette ZTA-Architektur mit Code-Beispielen.',
    keywords: ['moltbot zero trust','zero trust architecture','micro segmentation','identity based access','least privilege','continuous verification'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: 'Moltbot Zero Trust Architecture: Never Trust, Always Verify 2024', description: 'Zero Trust Implementierung für Moltbot.', type: 'article', url: `https://clawguru.org/${lang}/moltbot/zero-trust-architecture` },
    alternates: buildLocalizedAlternates(lang as Locale, '/moltbot/zero-trust-architecture'),
    robots: 'index, follow',
  };
}

export default function MoltbotZeroTrustPage({ params }: { params: { lang: string } }) {
  const lang = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : 'de') as Locale
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
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Zero Trust ist ein Sicherheitsmodell, kein Angriffswerkzeug. Dieser Guide dient ausschließlich der Absicherung von Systemen.", "Zero Trust is a security model, not an attack tool. This guide is exclusively for hardening your own systems.")}
        </div>

        <div className="mb-8 animate-fade-in-up">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Zero Trust Architecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "Zero Trust Architecture für Moltbot — Never Trust, Always Verify", "Zero Trust Architecture for Moltbot — Never Trust, Always Verify")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Zero Trust bedeutet: Kein implizites Vertrauen – weder intern noch extern. Jeder Zugriff wird kontinuierlich verifiziert, unabhängig von Netzwerkposition oder Identität. Dieser Guide zeigt dir die exakte Implementierung für Moltbot-Produktionssysteme.", "Zero Trust means: no implicit trust – neither internally nor externally. Every access is continuously verified, regardless of network position or identity. This guide shows you the exact implementation for Moltbot production systems.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Zero Trust? Einfach erklärt", "What is Zero Trust? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Traditionelle Netzwerksicherheit funktioniert wie eine Burg: Wer außen ist, kommt nicht rein. Wer drin ist, vertraut man. Das Problem: Wenn ein Angreifer einmal innen ist (z.B. durch Phishing), hat er freies Spiel. Zero Trust dreht dieses Modell um: Jeder muss sich immer ausweisen — ob im internen Netzwerk oder außen. Ein Kollege kann nicht einfach auf die Datenbank zugreifen, nur weil er im Büro-WLAN ist. Jede Anfrage braucht eine gültige Identität, Berechtigung und Kontext-Prüfung.", "Traditional network security works like a castle: those outside can't get in. Those inside are trusted. The problem: once an attacker is inside (e.g., via phishing), they have free reign. Zero Trust flips this model: everyone must authenticate at all times, whether on the internal network or outside. A colleague can't simply access the database just because they're on the office WiFi. Every request needs a valid identity, authorization, and context check.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zur Implementierung: Middleware, Micro-Segmentierung, Code-Beispiele", "Jump to implementation: middleware, micro-segmentation, code examples")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'ZTA Kernprinzipien', 'ZTA Core Principles')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { title: 'Never Trust', icon: '🚫', desc: 'Kein automatisches Vertrauen – auch nicht bei internen Netzwerken oder bekannten Geräten' },
              { title: 'Always Verify', icon: '✅', desc: 'Jeder Zugriff wird explizit authentifiziert, autorisiert und kontinuierlich verifiziert' },
              { title: 'Least Privilege', icon: '🔒', desc: 'Minimale Zugriffsrechte für jeden User, Service und Device – nur was wirklich benötigt wird' },
            ].map(({ title, icon, desc }) => (
              <div key={title} className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 shadow-xl hover:border-blue-500/30 transition-all duration-300">
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className="font-bold text-blue-300 mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Identity-Based Access Middleware', 'Identity-Based Access Middleware')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <pre>{`// moltbot/middleware/zero-trust.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/access-token';

interface ZeroTrustContext {
  userId: string;
  deviceId: string;
  riskScore: number;
  permissions: string[];
}

export async function zeroTrustMiddleware(req: NextRequest): Promise<NextResponse | null> {
  // 1. Verify Identity (JWT)
  const token = req.cookies.get('access_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const payload = await verifyAccessToken(token);
  if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  // 2. Continuous Risk Assessment
  const riskScore = await calculateRiskScore({
    ip: req.ip ?? '0.0.0.0',
    userAgent: req.headers.get('user-agent') ?? '',
    userId: payload.sub as string,
    requestPath: req.nextUrl.pathname,
  });

  // 3. Block high-risk requests even with valid tokens
  if (riskScore > 80) {
    return NextResponse.json({ error: 'Step-up authentication required' }, { status: 403 });
  }

  // 4. Least Privilege: Check specific permission
  const requiredPermission = getRequiredPermission(req.nextUrl.pathname);
  if (requiredPermission && !(payload.permissions as string[]).includes(requiredPermission)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  return null; // Allow request
}`}</pre>
          </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Micro-Segmentierung (K8s Network Policies)', 'Micro-Segmentation (K8s Network Policies)')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
          <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm">
            <pre>{`# Zero Trust Network Policies für Moltbot
# Jeder Pod kommuniziert nur mit explizit erlaubten Services

apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: moltbot-zero-trust
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: moltbot
  policyTypes: [Ingress, Egress]
  ingress:
    - from:
        - podSelector: { matchLabels: { role: api-gateway } }
      ports: [{ protocol: TCP, port: 3000 }]
  egress:
    - to:
        - podSelector: { matchLabels: { app: postgres } }
      ports: [{ protocol: TCP, port: 5432 }]
    - to:
        - podSelector: { matchLabels: { app: redis } }
      ports: [{ protocol: TCP, port: 6379 }]
    - ports: [{ protocol: UDP, port: 53 }]  # DNS only`}</pre>
          </div>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0 animate-pulse-glow">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Zero Trust Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 27.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 27.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf jahrelanger Erfahrung mit Zero-Trust-Implementierungen in produktiven Umgebungen. Wir haben ZTA für Moltbot-Deployments auf Kubernetes, AWS und GCP implementiert.', 'This guide is based on years of experience implementing Zero Trust in production environments. We have implemented ZTA for Moltbot deployments on Kubernetes, AWS, and GCP.')}
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

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'ZTA-Assessment starten', 'Start ZTA assessment')}</div></a>
            <a href={`/${lang}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">AI Agent Security Hub</div><div className="text-sm text-gray-300">{pick(isDE, 'OWASP LLM Top 10 Defense-Map', 'OWASP LLM Top 10 defense map')}</div></a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, 'Zero Trust Playbooks', 'Zero Trust playbooks')}</div></a>
            <a href={`/${lang}/moltbot/container-security-docker-kubernetes`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Container Security</div><div className="text-sm text-gray-300">{pick(isDE, 'Docker & Kubernetes Härtung', 'Docker & Kubernetes hardening')}</div></a>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Was ist Moltbot Security?", acceptedAnswer: { "@type": "Answer", text: "Moltbot ist eine Security-Automation-Plattform mit 600+ Executable Runbooks, Live-Score und Compliance-Dashboard für Self-Hosting-Infrastrukturen." } },
              { "@type": "Question", name: "Ist dieser Guide ein Penetrationstest?", acceptedAnswer: { "@type": "Answer", text: "Nein. Dieser Guide dient ausschließlich zur Absicherung eigener Systeme. Kein Angriffs-Tool, keine illegalen Aktivitäten." } },
              { "@type": "Question", name: "Wo finde ich zugehörige Runbooks?", acceptedAnswer: { "@type": "Answer", text: "Alle Runbooks sind unter /runbooks abrufbar. Jeder Befund im Security-Check enthält einen direkten Link zum passenden Runbook." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Moltbot Security Guide",
            description: "Executable Security Runbooks und Hardening-Guides für Moltbot-Infrastrukturen.",
            url: "https://clawguru.org/de/moltbot/zero-trust-architecture"
          }
        ]) }} />
      </div>
    </div>
  );
}
