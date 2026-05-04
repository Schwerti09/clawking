import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import { buildEEATArticleSchema } from "@/lib/seo/eeat-helper"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-deployment-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Deployment Security: Sichere Deployments für AI-Agents | ClawGuru", "AI Agent Deployment Security: Secure Deployments for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Deployment Security für Moltbot. Sichere CI/CD-Pipelines, Container Hardening, Secrets Management und Blue/Green Deployments für AI-Agent-Systeme.", "AI agent deployment security for Moltbot. Secure CI/CD pipelines, container hardening, secrets management and blue/green deployments for AI agent systems.")
  
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
    keywords: ["ai agent deployment security", "cicd security", "container hardening", "secrets management", "blue green deployment", "moltbot security", "deployment security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
    other: {
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}

export default function AIAgentDeploymentSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Deployment Security", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Deployment Security Guide", "Moltbot AI Agent Deployment Security Guide"), description: pick(isDE, "AI Agent Deployment Security", "AI agent deployment security"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Deployment-Security-Guide für eigene KI-Systeme.", "Deployment security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Deployment Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Deployment Security", "AI Agent Deployment Security")}</h1>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">{pick(isDE, "AI Agent Deployment Security für Moltbot. Sichere CI/CD-Pipelines, Container Hardening, Secrets Management und Blue/Green Deployments für AI-Agent-Systeme.", "AI agent deployment security for Moltbot. Secure CI/CD pipelines, container hardening, secrets management and blue/green deployments for AI agent systems.")}</p>
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Deployment Security? Einfach erklärt", "What is Deployment Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Deployment Security ist wie ein Sicherheitsgurt für Software-Deployments: es stellt sicher, dass AI-Agents sicher und kontrolliert in Produktion gehen. Secure CI/CD Pipelines prüfen Code vor jedem Deploy. Container Hardening minimiert Angriffsfläche. Secrets Management schützt Credentials. Immutable Infrastructure verhindert unautorisierte Änderungen. Blue/Green Deployments ermöglichen risikoarme Rollouts. Ohne Deployment Security können kompromittierte oder unsichere AI-Agents in Produktion gelangen, Secrets泄露 oder Angriffsvektoren entstehen.", "Deployment security is like a seatbelt for software deployments: it ensures AI agents go to production safely and under control. Secure CI/CD pipelines check code before every deploy. Container hardening minimizes attack surface. Secrets management protects credentials. Immutable infrastructure prevents unauthorized changes. Blue/green deployments enable low-risk rollouts. Without deployment security, compromised or insecure AI agents can reach production, secrets can leak, or attack vectors can emerge.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Secure CI/CD Pipelines", pick(isDE, "Security Integration in jeder Phase der CI/CD-Pipeline. SAST, DAST, Container Scanning und Dependency Checks vor jedem Deploy.", "Security integration at every stage of the CI/CD pipeline. SAST, DAST, container scanning and dependency checks before every deploy.")],
              ["2. Container Hardening", pick(isDE, "Gehärtete Container-Images für AI-Agent-Deployments. Distroless Images, Read-Only Filesystems und Non-Root Execution.", "Hardened container images for AI agent deployments. Distroless images, read-only filesystems and non-root execution.")],
              ["3. Secrets Management", pick(isDE, "Sicheres Management von API Keys, Tokens und Credentials. HashiCorp Vault, AWS Secrets Manager oder Kubernetes Secrets mit Encryption.", "Secure management of API keys, tokens and credentials. HashiCorp Vault, AWS Secrets Manager or Kubernetes Secrets with encryption.")],
              ["4. Immutable Infrastructure", pick(isDE, "Unveränderliche Infrastruktur für AI-Agent-Deployments. Keine manuellen Änderungen in Produktion, alles über IaC.", "Immutable infrastructure for AI agent deployments. No manual changes in production, everything via IaC.")],
              ["5. Blue/Green & Canary Deployments", pick(isDE, "Risikoarme Deployment-Strategien für AI-Agents. Schrittweise Rollouts mit automatischem Rollback bei Fehlern.", "Low-risk deployment strategies for AI agents. Gradual rollouts with automatic rollback on errors.")],
            ].map(([title, desc]) => (
              <div key={title as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "GitOps Security", "GitOps Security")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "GitOps-Workflows mit Security Gates. Branch Protection, Signed Commits und Automated Policy Enforcement.", "GitOps workflows with security gates. Branch protection, signed commits and automated policy enforcement.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Runtime Security", "Runtime Security")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Laufzeit-Sicherheit für AI-Agent-Container. Falco, Sysdig oder eBPF-basiertes Monitoring.", "Runtime security for AI agent containers. Falco, Sysdig or eBPF-based monitoring.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Policy as Code (OPA)", "Policy as Code (OPA)")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Open Policy Agent für automatisierte Security Policies im Deployment-Prozess. Deployment Gate Validation.", "Open Policy Agent for automated security policies in the deployment process. Deployment gate validation.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Deployment Attestation", "Deployment Attestation")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Kryptographische Attestierung jedes Deployments. SLSA Framework und in-toto Attestations.", "Cryptographic attestation of every deployment. SLSA framework and in-toto attestations.")}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "CI/CD Security Gates einbauen", "Add CI/CD security gates"), pick(isDE, "SAST und Dependency Scanning in CI-Pipeline integrieren. Kein Merge ohne grüne Security Checks.", "Integrate SAST and dependency scanning in CI pipeline. No merge without green security checks.")],
              [2, pick(isDE, "Container Images härten", "Harden container images"), pick(isDE, "Minimale Base Images verwenden. Distroless oder Alpine. Non-root User, Read-only FS.", "Use minimal base images. Distroless or Alpine. Non-root user, read-only FS.")],
              [3, pick(isDE, "Secrets aus Code entfernen", "Remove secrets from code"), pick(isDE, "Alle Secrets aus Codebase entfernen. Vault oder Sealed Secrets für Kubernetes nutzen.", "Remove all secrets from codebase. Use Vault or Sealed Secrets for Kubernetes.")],
              [4, pick(isDE, "IaC Security scannen", "Scan IaC security"), pick(isDE, "Terraform, Helm Charts und K8s Manifests mit Checkov oder tfsec scannen.", "Scan Terraform, Helm charts and K8s manifests with Checkov or tfsec.")],
              [5, pick(isDE, "Canary Deployment einrichten", "Set up canary deployment"), pick(isDE, "Schrittweise Rollouts mit 5% → 25% → 100% Traffic. Automatischer Rollback bei Error Rate > 1%.", "Gradual rollouts with 5% → 25% → 100% traffic. Automatic rollback when error rate > 1%.")],
            ].map(([n, title, desc]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div>
                  <div className="font-semibold text-gray-100 mb-2">{title}</div>
                  <div className="text-sm text-gray-300">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur auf Schwachstellen prüfen", "Check infrastructure for vulnerabilities")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10", "OWASP LLM Top 10")}</div>
            </a>
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
