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
    title: pick(isDE, 'Moltbot Secrets & Vault Management: HashiCorp Vault Setup 2026', 'Moltbot Secrets & Vault Management: HashiCorp Vault Setup 2026'),
    description: pick(isDE, 'Sicheres Secrets Management für Moltbot mit HashiCorp Vault. Dynamic Secrets, Secret Rotation, Vault Agent Injection und Environment Variable Best Practices.', 'Secure secrets management for Moltbot with HashiCorp Vault. Dynamic secrets, secret rotation, vault agent injection and environment variable best practices.'),
    keywords: ['moltbot secrets management','hashicorp vault','dynamic secrets','secret rotation','vault agent','env variables security'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: pick(isDE, 'Moltbot Secrets & Vault Management: HashiCorp Vault Setup 2026', 'Moltbot Secrets & Vault Management: HashiCorp Vault Setup 2026'), description: pick(isDE, 'Sicheres Secrets Management für Moltbot mit HashiCorp Vault.', 'Secure secrets management for Moltbot with HashiCorp Vault.'), type: 'article', url: `https://clawguru.org/${lang}/moltbot/secrets-vault-management` },
    alternates: buildLocalizedAlternates(lang as Locale, '/moltbot/secrets-vault-management'),
    robots: 'index, follow',
  };
}

export default function MoltbotSecretsVaultPage({ params }: { params: { lang: string } }) {
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, 'Secrets Management schützt kritische Zugangsdaten. Keine Angriffswerkzeuge.', 'Secrets management protects critical access credentials. No attack tools.')}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Secrets Vault</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, 'Moltbot Secrets & Vault Management', 'Moltbot Secrets & Vault Management')}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, 'Keine Hardcoded Secrets mehr — zentrales, rotierendes Secrets Management für Moltbot mit HashiCorp Vault und dynamischen Credentials.', 'No more hardcoded secrets — centralized, rotating secrets management for Moltbot with HashiCorp Vault and dynamic credentials.')}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Was ist Secrets Management? Einfach erklärt', 'What is Secrets Management? Simply Explained')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, 'Secrets Management ist wie ein digitaler Tresor für deine Passwörter und API-Keys. Statt Passwörter in Code zu schreiben (wie auf einem Post-it am Monitor), speicherst du sie in einem sicheren Tresor. Wenn ein Programm ein Passwort braucht, fragt es den Tresor — der Tresor gibt ein kurzlebiges Passwort, das automatisch nach einer Zeit abläuft. Wenn jemand ein Passwort stiehlt, ist es bald wertlos.', 'Secrets management is like a digital vault for your passwords and API keys. Instead of writing passwords in code (like on a sticky note on your monitor), you store them in a secure vault. When a program needs a password, it asks the vault — the vault gives a short-lived password that automatically expires after a time. If someone steals a password, it will soon be worthless.')}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, 'Springe zu Anti-Patterns, Vault Integration und Rotation Policy', 'Jump to anti-patterns, vault integration, and rotation policy')}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, '🔐 Secrets Anti-Patterns (vermeiden!)', '🔐 Secrets Anti-Patterns (avoid!)')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-900/80 backdrop-blur-lg border border-red-700 p-4 rounded-lg hover:border-red-500/30 transition-all duration-300">
              <h3 className="font-bold text-red-300 mb-2">❌ {pick(isDE, 'NIEMALS SO!', 'NEVER LIKE THIS!')}</h3>
              <div className="bg-gray-900/80 backdrop-blur-lg text-red-400 p-3 rounded font-mono text-xs border border-red-800">
                <pre>{`// ❌ Hardcoded secrets
const db = new Pool({
  password: 'sup3r_s3cr3t_pw!'
});

// ❌ In Code committed
const API_KEY = 'sk_live_abc123';

// ❌ In .env committed
DATABASE_PASSWORD=mypassword123`}</pre>
              </div>
            </div>
            <div className="bg-green-900/80 backdrop-blur-lg border border-green-700 p-4 rounded-lg hover:border-green-500/30 transition-all duration-300">
              <h3 className="font-bold text-green-300 mb-2">✅ {pick(isDE, 'RICHTIG SO!', 'CORRECT LIKE THIS!')}</h3>
              <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-3 rounded font-mono text-xs border border-green-800">
                <pre>{`// ✅ Aus Environment Variable
const db = new Pool({
  password: process.env.DB_PASSWORD
});

// ✅ Vault-injected zur Runtime
// process.env.API_KEY = vault.read()

// ✅ .env.local (gitignored!)
# .gitignore: .env*.local`}</pre>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">🏛️ {pick(isDE, 'HashiCorp Vault Integration', 'HashiCorp Vault Integration')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`// moltbot/lib/vault-client.ts
import vault from 'node-vault';

const vaultClient = vault({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
});

// Dynamic Database Credentials (rotieren automatisch!)
export async function getDatabaseCredentials() {
  const { data } = await vaultClient.read('database/creds/moltbot-role');
  return {
    username: data.username,  // Temporärer User (TTL: 1h)
    password: data.password,  // Auto-rotiert
    host: process.env.DB_HOST,
    database: 'moltbot_prod',
  };
}

// Application Secrets mit Lease
export async function getAppSecret(secretPath: string) {
  const { data } = await vaultClient.read('secret/data/' + secretPath);
  return data.data;
}

// Secret Rotation (täglich via Cron)
export async function rotateAppSecrets() {
  await vaultClient.write('sys/rotate');
  console.log('[Vault] Secrets rotiert:', new Date().toISOString());
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, '🔄 Secrets Rotation Policy', '🔄 Secrets Rotation Policy')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-gray-800 text-white"><th className="p-3 text-left">Secret Type</th><th className="p-3 text-left">Rotation Interval</th><th className="p-3 text-left">Methode</th><th className="p-3 text-left">Automation</th></tr></thead>
              <tbody>
                {[
                  ['DB Passwords', '24 Stunden', 'Vault Dynamic Creds', '✅ Vollautomatisch'],
                  ['API Keys', '90 Tage', 'Key Rotation API', '⚠️ Halb-automatisch'],
                  ['JWT Secret', '30 Tage', 'Vault KV Secret', '✅ Vollautomatisch'],
                  ['SSL Zertifikate', 'Jährlich', "Let's Encrypt", '✅ Vollautomatisch'],
                  ['OAuth Client Secret', '180 Tage', 'Provider API', '⚠️ Manuell'],
                  ['Admin Tokens', '7 Tage', 'Vault TTL', '✅ Vollautomatisch'],
                ].map(([type, interval, method, auto]) => (
                  <tr key={type} className="border-b hover:bg-gray-800">
                    <td className="p-3 font-medium">{type}</td>
                    <td className="p-3 font-mono text-xs">{interval}</td>
                    <td className="p-3 text-sm text-gray-300">{method}</td>
                    <td className="p-3 text-sm">{auto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, '🔗 Weiterführende Ressourcen', '🔗 Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">🛡️ Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'Secrets Scan', 'Secrets scan')}</div></a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">📚 Vault Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, 'Secrets Playbooks', 'Secrets playbooks')}</div></a>
            <a href={`/${lang}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">🔓 OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, 'Secrets Framework', 'Secrets framework')}</div></a>
            <a href={`/${lang}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">🏢 Enterprise</div><div className="text-sm text-gray-300">{pick(isDE, 'Managed Vault', 'Managed vault')}</div></a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Secrets Management Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Secrets Management in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with secrets management in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", position: 1, name: pick(isDE, 'Startseite', 'Home'), item: `https://clawguru.org/${lang}` },
            { "@type": "ListItem", position: 2, name: pick(isDE, 'Moltbot', 'Moltbot'), item: `https://clawguru.org/${lang}/moltbot` },
            { "@type": "ListItem", position: 3, name: "Secrets Vault Management", item: `https://clawguru.org/${lang}/moltbot/secrets-vault-management` }
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
          name: pick(isDE, 'Moltbot Secrets Vault Management Guide', 'Moltbot Secrets Vault Management Guide'),
          description: pick(isDE, 'Executable Security Runbooks und Hardening-Guides für Moltbot-Infrastrukturen.', 'Executable security runbooks and hardening guides for Moltbot infrastructures.'),
          url: `https://clawguru.org/${lang}/moltbot/secrets-vault-management`
        }
      ]) }} />
    </div>
  )
}
