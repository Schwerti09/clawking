import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import { buildEEATArticleSchema } from "@/lib/seo/eeat-helper"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-access-control"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Access Control: Zugriffskontrolle für AI-Agents | ClawGuru", "AI Agent Access Control: Access Control for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Access Control für Moltbot. RBAC, ABAC, Policy-based Access Control und granulare Berechtigungsmodelle für AI-Agent-Systeme.", "AI agent access control for Moltbot. RBAC, ABAC, policy-based access control and granular permission models for AI agent systems.")
  
  const articleSchema = buildEEATArticleSchema({
    headline: title,
    description,
    url: pageUrl,
    datePublished: "2026-04-28",
    dateModified: "2026-05-04",
    locale,
    articleType: "TechArticle",
  })

  return {
    title, description,
    keywords: ["ai agent access control", "rbac", "abac", "policy based access control", "permissions", "moltbot security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
    other: {
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}

export default function AIAgentAccessControlPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Access Control", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Access Control Guide", "Moltbot AI Agent Access Control Guide"), description: pick(isDE, "AI Agent Access Control", "AI agent access control"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Access-Control-Guide für eigene KI-Systeme.", "Access control guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Access Control</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Access Control", "AI Agent Access Control")}</h1>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">{pick(isDE, "AI Agent Access Control für Moltbot. RBAC, ABAC, Policy-based Access Control und granulare Berechtigungsmodelle für AI-Agent-Systeme.", "AI agent access control for Moltbot. RBAC, ABAC, policy-based access control and granular permission models for AI agent systems.")}</p>
          <LastUpdated
            date="2026-05-04"
            publishedDate="2026-04-28"
            locale={locale}
            showPublished={true}
            className="mb-4"
          />
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Access Control? Einfach erklärt", "What is Access Control? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Access Control ist wie ein Türsteher für AI-Agent-Aktionen: es entscheidet, was ein Agent tun darf und was nicht. RBAC (Role-Based Access Control) weist Rollen mit Berechtigungen zu. ABAC (Attribute-Based Access Control) nutzt Kontext-Attribute für feingranulare Entscheidungen. Least Privilege bedeutet minimal notwendige Rechte. Just-In-Time Access gibt temporäre Rechte nur wenn benötigt. Access Policy as Code definiert Richtlinien programmatisch mit OPA. Ohne Access Control können AI-Agents unbefugt auf Daten zugreifen, sensible Operationen ausführen oder das System kompromittieren.", "Access control is like a bouncer for AI agent actions: it decides what an agent can and cannot do. RBAC (Role-Based Access Control) assigns roles with permissions. ABAC (Attribute-Based Access Control) uses context attributes for fine-grained decisions. Least privilege means minimal necessary rights. Just-In-Time access grants temporary rights only when needed. Access Policy as Code defines policies programmatically with OPA. Without access control, AI agents can access data unauthorized, perform sensitive operations, or compromise the system.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Role-Based Access Control (RBAC)", pick(isDE, "Rollenbasierte Zugriffskontrolle für AI-Agents. Klare Rollen mit definierten Berechtigungen — kein Wildcard-Zugriff.", "Role-based access control for AI agents. Clear roles with defined permissions — no wildcard access.")],
              ["2. Attribute-Based Access Control (ABAC)", pick(isDE, "Attribut-basierte Zugriffsentscheidungen für feingranulare Kontrolle. Kontext-awareness in Zugriffsrichtlinien.", "Attribute-based access decisions for fine-grained control. Context-awareness in access policies.")],
              ["3. Least Privilege Enforcement", pick(isDE, "Durchsetzung des Least-Privilege-Prinzips für jeden Agent. Regelmäßige Access Reviews und Privilege Cleanup.", "Enforcement of the least-privilege principle for every agent. Regular access reviews and privilege cleanup.")],
              ["4. Just-In-Time Access", pick(isDE, "Temporärer Zugriff nur wenn benötigt. AI-Agents erhalten erhöhte Berechtigungen nur für die Dauer einer Aufgabe.", "Temporary access only when needed. AI agents receive elevated permissions only for the duration of a task.")],
              ["5. Access Policy as Code", pick(isDE, "Zugriffsrichtlinien als Code mit Open Policy Agent (OPA). Versioniert, testbar und automatisch durchgesetzt.", "Access policies as code with Open Policy Agent (OPA). Versioned, testable and automatically enforced.")],
            ].map(([t, d]) => (
              <div key={t as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{t}</h3>
                <p className="text-sm text-gray-300">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-green-300 mb-2">OPA Gatekeeper</h3><p className="text-sm text-green-200">{pick(isDE, "OPA Gatekeeper für Kubernetes Policy Enforcement. AI-Agent-Pods ohne korrekte Annotations werden geblockt.", "OPA Gatekeeper for Kubernetes policy enforcement. AI agent pods without correct annotations are blocked.")}</p></div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Dynamic Authorization", "Dynamic Authorization")}</h3><p className="text-sm text-blue-200">{pick(isDE, "Kontextabhängige Autorisierung zur Laufzeit. Zugriffsrechte basierend auf aktuellem Risikolevel und Kontext.", "Context-dependent authorization at runtime. Access rights based on current risk level and context.")}</p></div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Access Governance", "Access Governance")}</h3><p className="text-sm text-yellow-200">{pick(isDE, "Regelmäßige Access Certification Campaigns. Manager-Bestätigung aller Agent-Berechtigungen quartalsweise.", "Regular access certification campaigns. Manager confirmation of all agent permissions quarterly.")}</p></div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Privilege Escalation Detection", "Privilege Escalation Detection")}</h3><p className="text-sm text-red-200">{pick(isDE, "Erkennung von Privilege Escalation Versuchen durch AI-Agents. Alert bei unerwarteten Berechtigungsänderungen.", "Detection of privilege escalation attempts by AI agents. Alert on unexpected permission changes.")}</p></div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "Berechtigungsmatrix erstellen", "Create permission matrix"), pick(isDE, "Für jeden Agent-Typ die benötigten Berechtigungen dokumentieren. Basis für RBAC-Design.", "Document required permissions for each agent type. Basis for RBAC design.")],
              [2, pick(isDE, "RBAC-Rollen definieren", "Define RBAC roles"), pick(isDE, "Minimale Rollen-Hierarchie erstellen. Kein Catch-all-Admin-Role für AI-Agents.", "Create minimal role hierarchy. No catch-all admin role for AI agents.")],
              [3, pick(isDE, "OPA Policies schreiben", "Write OPA policies"), pick(isDE, "Zugriffsregeln als Rego-Code formulieren. Policies in CI/CD testen bevor sie produktiv gehen.", "Formulate access rules as Rego code. Test policies in CI/CD before going to production.")],
              [4, pick(isDE, "Just-In-Time implementieren", "Implement Just-In-Time"), pick(isDE, "JIT-Zugriff für sensitive Operationen einrichten. Automatischer Entzug nach Task-Abschluss.", "Set up JIT access for sensitive operations. Automatic revocation after task completion.")],
              [5, pick(isDE, "Access Reviews automatisieren", "Automate access reviews"), pick(isDE, "Quartalsweise Access Reviews automatisieren. Ungenutzte Berechtigungen automatisch entziehen.", "Automate quarterly access reviews. Automatically revoke unused permissions.")],
            ].map(([n, t, d]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div><div className="font-semibold text-gray-100 mb-2">{t}</div><div className="text-sm text-gray-300">{d}</div></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div></a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div></a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div></a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">AI Agent Security</div><div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10", "OWASP LLM Top 10")}</div></a>
          </div>
        </section>

        {/* E-E-A-T AuthorBox */}
        <AuthorBox
          locale={locale}
          variant="full"
          className="mb-8"
        />
      </div>
    </div>
  )
}
