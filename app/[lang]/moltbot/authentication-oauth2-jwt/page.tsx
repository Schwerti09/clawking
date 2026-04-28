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
    title: pick(isDE, 'Moltbot Authentication: OAuth2 & JWT Setup Guide 2026', 'Moltbot Authentication: OAuth2 & JWT Setup Guide 2026'),
    description: pick(isDE, 'Sichere Authentication mit OAuth2 und JWT für Moltbot. MFA, Session Management, Token Rotation und PKCE Flow – mit vollständigen TypeScript-Implementierungsbeispielen.', 'Secure authentication with OAuth2 and JWT for Moltbot. MFA, session management, token rotation and PKCE flow – with complete TypeScript implementation examples.'),
    keywords: ['moltbot authentication','oauth2 jwt','mfa setup','session management','jwt security','oauth2 pkce'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: { title: 'Moltbot Authentication: OAuth2 & JWT Setup Guide 2024', description: 'Sichere Authentication mit OAuth2 und JWT für Moltbot.', type: 'article', url: `https://clawguru.org/${lang}/moltbot/authentication-oauth2-jwt`, images: ['/og-moltbot-auth.jpg'] },
    alternates: buildLocalizedAlternates(lang as Locale, '/moltbot/authentication-oauth2-jwt'),
    robots: 'index, follow',
  };
}

export default function MoltbotAuthPage({ params }: { params: { lang: string } }) {
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, 'Dieser Guide dient ausschließlich zur Implementierung sicherer Authentication-Systeme. Keine Angriffswerkzeuge.', 'This guide is exclusively for implementing secure authentication systems. No attack tools.')}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Authentication</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, 'Moltbot Authentication: OAuth2 & JWT Setup', 'Moltbot Authentication: OAuth2 & JWT Setup')}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, 'Production-ready Authentication für Moltbot mit OAuth2 PKCE Flow, JWT Token Rotation, MFA und sicherem Session Management.', 'Production-ready authentication for Moltbot with OAuth2 PKCE flow, JWT token rotation, MFA and secure session management.')}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Was ist OAuth2? Einfach erklärt', 'What is OAuth2? Simply Explained')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, 'OAuth2 ist wie ein Ausweis für deine App. Statt Passwörter direkt zu speichern (gefährlich!), delegiert die App die Authentifizierung an einen vertrauenswürdigen Dienst wie Google oder GitHub. Die App bekommt nur ein "Ticket" (Token), das beweist, dass der Nutzer authentifiziert ist. Das Ticket kann ablaufen und jederzeit widerrufen werden.', 'OAuth2 is like an ID card for your app. Instead of storing passwords directly (dangerous!), the app delegates authentication to a trusted service like Google or GitHub. The app gets only a "ticket" (token) that proves the user is authenticated. The ticket can expire and be revoked at any time.')}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, 'Springe zu PKCE Flow, JWT Rotation, MFA und Ressourcen', 'Jump to PKCE flow, JWT rotation, MFA, and resources')}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">🔐 OAuth2 PKCE Flow</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm">
            <pre>{`// moltbot/lib/oauth2.ts
import crypto from 'crypto';

export function generatePKCEChallenge() {
  const verifier = crypto.randomBytes(32).toString('base64url');
  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');
  return { verifier, challenge };
}

export function buildAuthorizationURL(challenge: string) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.OAUTH2_CLIENT_ID!,
    redirect_uri: process.env.OAUTH2_REDIRECT_URI!,
    scope: 'openid profile email',
    code_challenge: challenge,
    code_challenge_method: 'S256',
    state: crypto.randomBytes(16).toString('hex'),
  });
  return \`\${process.env.OAUTH2_AUTH_URL}?\${params}\`;
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">🔄 JWT Token Rotation</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-blue-400 font-mono text-sm">
            <pre>{`// moltbot/lib/token-rotation.ts
import { SignJWT, jwtVerify } from 'jose';

const ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!);

export async function issueTokenPair(userId: string) {
  const accessToken = await new SignJWT({ sub: userId, type: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')  // Short-lived access token
    .setIssuer('clawguru-moltbot')
    .sign(ACCESS_SECRET);

  const refreshToken = await new SignJWT({ sub: userId, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')   // Longer-lived refresh token
    .setIssuer('clawguru-moltbot')
    .sign(REFRESH_SECRET);

  return { accessToken, refreshToken };
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">📱 TOTP Multi-Factor Authentication</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-yellow-400 font-mono text-sm">
            <pre>{`// moltbot/lib/mfa.ts
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

authenticator.options = { step: 30, window: 1 };

export function generateMFASecret(userEmail: string) {
  const secret = authenticator.generateSecret(32);
  const otpauth = authenticator.keyuri(userEmail, 'ClawGuru Moltbot', secret);
  return { secret, otpauth };
}

export async function generateQRCode(otpauth: string): Promise<string> {
  return QRCode.toDataURL(otpauth);
}

export function verifyMFAToken(token: string, secret: string): boolean {
  return authenticator.verify({ token, secret });
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${lang}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'Auth-Setup live prüfen', 'Check auth setup live')}</div></a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, 'Implementierungsguides', 'Implementation guides')}</div></a>
            <a href={`/${lang}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Oracle</div><div className="text-sm text-gray-300">{pick(isDE, 'Security Intelligence', 'Security intelligence')}</div></a>
            <a href={`/${lang}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Enterprise</div><div className="text-sm text-gray-300">{pick(isDE, 'Enterprise SSO', 'Enterprise SSO')}</div></a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Authentication Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit OAuth2 und JWT in Produktionsumgebungen. Die beschriebenen Implementierungen sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with OAuth2 and JWT in production environments. The described implementations have been proven in real deployments and continuously improved.')}
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
              { "@type": "ListItem", position: 3, name: "Authentication OAuth2 JWT", item: `https://clawguru.org/${lang}/moltbot/authentication-oauth2-jwt` }
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
            name: pick(isDE, 'Moltbot Authentication OAuth2 JWT Guide', 'Moltbot Authentication OAuth2 JWT Guide'),
            description: pick(isDE, 'Executable Security Runbooks und Hardening-Guides für Moltbot-Infrastrukturen.', 'Executable security runbooks and hardening guides for Moltbot infrastructures.'),
            url: `https://clawguru.org/${lang}/moltbot/authentication-oauth2-jwt`
          }
        ]) }} />
      </div>
    </div>
  );
}
