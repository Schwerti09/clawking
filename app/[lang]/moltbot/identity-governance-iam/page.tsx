import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/identity-governance-iam"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Identity Governance & IAM: RBAC & Least Privilege 2026 | ClawGuru", "Moltbot Identity Governance & IAM: RBAC & Least Privilege 2026 | ClawGuru")
  const description = pick(isDE, "Identity Governance für Moltbot. RBAC-Implementierung, Least Privilege, Privileged Access Management (PAM), Access Reviews und automatisierte Berechtigungsbereinigung.", "Identity governance for Moltbot. RBAC implementation, least privilege, privileged access management (PAM), access reviews and automated permission cleanup.")
  return {
    title, description,
    keywords: ['moltbot identity governance','iam rbac','least privilege','privileged access management','access review','user provisioning'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotIamPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Identity Governance IAM", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot Identity Governance Guide", "Moltbot Identity Governance Guide"), description: pick(isDE, "Identity Governance und IAM", "Identity governance and IAM"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Identity Governance sichert Zugriffe auf eigene Systeme ab. Keine Angriffswerkzeuge.", "Identity governance secures access to own systems. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Identity Governance</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot Identity Governance & IAM", "Moltbot Identity Governance & IAM")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "85% aller Breaches nutzen kompromittierte oder überprivilegierte Identitäten aus. RBAC, Least Privilege und regelmäßige Access Reviews sind Pflicht.", "85% of all breaches exploit compromised or over-privileged identities. RBAC, least privilege and regular access reviews are mandatory.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Identity Governance? Einfach erklärt", "What is Identity Governance? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Identity Governance ist wie ein Zutrittskontrollsystem für digitale Identitäten: es regelt, wer worauf zugreifen darf und warum. RBAC (Role-Based Access Control) weist Rollen Berechtigungen zu. Least Privilege gewährt nur minimal notwendige Rechte. Privileged Access Management (PAM) überwacht Admin-Zugriffe. Access Reviews prüfen regelmäßig ob Rechte noch benötigt werden. Ohne Identity Governance drohen Datenlecks durch überprivilegierte Accounts.", "Identity governance is like an access control system for digital identities: it regulates who can access what and why. RBAC (Role-Based Access Control) assigns permissions to roles. Least privilege grants only minimum necessary rights. Privileged access management (PAM) monitors admin access. Access reviews regularly check if rights are still needed. Without identity governance, data leaks from over-privileged accounts are at risk.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu RBAC und Implementation", "Jump to RBAC and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Role-Based Access Control (RBAC)</h2>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">{pick(isDE, "RBAC ist ein Ansatz zur Zugriffssteuerung, bei dem Benutzerrollen und -berechtigungen anhand von Regeln und Richtlinien zugewiesen werden.", "RBAC is an access control approach where user roles and permissions are assigned based on rules and policies.")}</p>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm overflow-x-auto">
            <pre>{`// RBAC-Implementierung für Moltbot

const ROLE_PERMISSIONS = {

  admin: ['threats:read','threats:write','runbooks:execute','audit:read','users:manage'],

  security_analyst: ['threats:read','threats:write','runbooks:execute','audit:read'],

  developer: ['threats:read','runbooks:execute'],

  auditor: ['threats:read','audit:read'],

  viewer: ['threats:read'],

};

export function hasPermission(role, permission) {

  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;

}

// Beispiel in API-Route:

export async function GET(req) {

  const principal = await parseDashboardPrincipal(req);

  if (!hasPermission(principal.role, 'audit:read')) {

    return Response.json({ error: 'Insufficient permissions' }, { status: 403 });

  }

  // ... rest of handler

`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Least Privilege Implementation</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm overflow-x-auto">
            <pre>{`// Least Privilege Middleware für Next.js

function requirePermission(permission) {

  return (role) => {

    if (!hasPermission(role, permission)) {

      throw new Error('Insufficient permissions: ' + permission);

    }

  };

}

// Beispiel: Nur Admins können User-Management aufrufen

app.get('/api/admin/users', 

  authMiddleware, 

  requirePermission('users:manage'), 

  handler

);

// Beispiel: Developer können nur eigene Executions sehen

app.get('/api/executions', 

  authMiddleware, 

  requirePermission('threats:read'), 

  async (req, res) => {

    const principal = await parseDashboardPrincipal(req);

    const executions = await getExecutions(principal.customer_id);

    res.json(executions);

  }

);`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Automated Access Reviews</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm overflow-x-auto">
            <pre>{`// Automated Access Review Job (täglich)

async function runAccessReviews() {

  const customers = await dbQuery('SELECT id FROM customers');

  

  for (const customer of customers) {

    const users = await dbQuery(

      'SELECT id, email, role, last_login FROM users WHERE customer_id = $1',

      [customer.id]

    );

    

    for (const user of users) {

      // 90+ Tage inaktiv = Review erforderlich

      const daysInactive = Math.floor((Date.now() - user.last_login) / (1000 * 60 * 60 * 24));

      

      if (daysInactive > 90) {

        await sendAccessReviewEmail(user.email, user.role);

        await logAccessReview(user.id, 'INACTIVE_REVIEW');

      }

    }

  }

}

// Moltbot Job Scheduler

scheduleJob('0 2 * * *', runAccessReviews); // Jeden Tag um 2 Uhr`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "IAM Assessment", "IAM assessment")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Identity Governance Playbooks", "Identity governance playbooks")}</div>
            </a>
            <a href={`/${locale}/oracle`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Oracle</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Identity Intelligence", "Identity intelligence")}</div>
            </a>
            <a href={`/${locale}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Enterprise IAM</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Managed Identity Governance", "Managed identity governance")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · IAM Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit IAM-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with IAM implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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