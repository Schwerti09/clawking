import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-model-versioning-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Model Versioning Security: LLM-Modell-Versioning-Security | ClawGuru Moltbot", "LLM Model Versioning Security: LLM Model Versioning Security | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Modell-Versioning-Security: Version Authentication, Rollback Security, Version Access Control und Version Audit Logging für LLM-Modell-Versioning-Security.", "LLM model versioning security: version authentication, rollback security, version access control and version audit logging for LLM model versioning security.")
  return {
    title, description,
    keywords: ["llm model versioning security", "version authentication", "rollback security", "version access control", "version audit logging", "moltbot versioning"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "MVS-1", title: "Version Authentication", desc: "Authenticate all model versions. Use digital signatures and hash verification to ensure version integrity.", code: `# Moltbot version authentication:
version_authentication:
  enabled: true

  # Digital signatures:
  digital_signatures:
    enabled: true
    # Sign: all model versions
    # Method: RSA, ECDSA
    # Verify: signature before deployment
    # Prevents: version tampering

  # Hash verification:
  hash_verification:
    enabled: true
    # Compute: hash of model version
    # Compare: against expected hash
    # Block: mismatched versions
    # Prevents: version corruption

  # Version metadata:
  metadata:
    enabled: true
    # Include: version metadata in signature
    # Fields: version ID, timestamp, author
    # Verify: metadata integrity
    # Prevents: metadata tampering` },
  { id: "MVS-2", title: "Rollback Security", desc: "Secure model rollback mechanisms. Use signed rollback configurations and integrity verification.", code: `# Moltbot rollback security:
rollback_security:
  enabled: true

  # Signed rollback configurations:
  signed_configs:
    enabled: true
    # Sign: rollback configurations
    # Verify: signature before rollback
    # Prevents: unauthorised rollback

  # Rollback integrity verification:
  integrity_verification:
    enabled: true
    # Verify: rollback target integrity
    # Method: hash verification
    # Block: corrupted rollback targets
    # Prevents: rollback to corrupted version

  # Rollback audit logging:
  audit_logging:
    enabled: true
    # Log: all rollback events
    # Include: version, reason, user
    # Retain: logs for audit (90 days)
    # Protect: log access` },
  { id: "MVS-3", title: "Version Access Control", desc: "Control access to model versions. Use role-based access control and version-specific permissions.", code: `# Moltbot version access control:
version_access_control:
  enabled: true

  # Role-based access control:
  rbac:
    enabled: true
    # Define: roles for version access
    # Roles: admin, developer, viewer
    # Grant: version-specific permissions
    # Enforce: least privilege

  # Version-specific permissions:
  version_permissions:
    enabled: true
    # Define: permissions per version
    # Permissions: read, write, deploy, rollback
    # Enforce: version-specific access
    # Prevents: unauthorised version access

  # Version approval workflow:
  approval_workflow:
    enabled: true
    # Require: approval for version deployment
    # Workflow: developer → reviewer → approver
    # Track: approval status
    # Prevents: unapproved deployment` },
  { id: "MVS-4", title: "Version Audit Logging", desc: "Log all version-related events for audit. Track version creation, deployment, and rollback.", code: `# Moltbot version audit logging:
audit_logging:
  enabled: true

  # Version creation logging:
  creation_logging:
    enabled: true
    # Log: version creation events
    # Include: version ID, author, timestamp
    # Retain: logs for audit (90 days)
    # Protect: log access

  # Version deployment logging:
  deployment_logging:
    enabled: true
    # Log: version deployment events
    # Include: version, target, user
    # Retain: logs for audit (90 days)
    # Protect: log access

  # Version rollback logging:
  rollback_logging:
    enabled: true
    # Log: version rollback events
    # Include: from version, to version, reason
    # Retain: logs for audit (90 days)
    # Protect: log access` },
]

const FAQ = [
  { q: "What is the difference between version authentication and rollback security?", a: "Version authentication ensures that model versions are authentic and unmodified. This is done through digital signatures and hash verification. Rollback security ensures that rollback operations are authorised and the rollback target is intact. Version authentication protects against version tampering during storage and transfer. Rollback security protects against unauthorised rollback to corrupted or malicious versions. Both are necessary: version authentication protects the version, rollback security protects the rollback operation." },
  { q: "How does version-specific access control work?", a: "Version-specific access control allows you to define different permissions for different versions. For example, you might allow developers to read development versions but not production versions. You might allow admins to deploy any version but only read access to historical versions. Version-specific permissions are implemented through RBAC with version-specific rules. This ensures that users only have access to the versions they need for their role." },
  { q: "How do I secure the rollback process?", a: "Secure rollback requires: 1) Signed rollback configurations — sign rollback configs and verify before rollback. 2) Rollback integrity verification — verify the rollback target is intact before rollback. 3) Rollback audit logging — log all rollback events for compliance. 4) Approval workflow — require approval for rollback to production. 5) Version-specific permissions — only allow authorised users to rollback. Each control addresses a different aspect of rollback security." },
  { q: "What are common versioning attack vectors?", a: "Common versioning attack vectors: 1) Version tampering — modify model version to inject malicious code. 2) Unauthorised rollback — rollback to vulnerable or malicious version. 3) Version metadata tampering — modify version metadata to hide tampering. 4) Unapproved deployment — deploy unapproved version to production. 5) Version access bypass — bypass version access controls. Defense: version authentication, rollback security, version access control, audit logging." },
]

export default function LlmModelVersioningSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Model Versioning Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Model Versioning Security Guide", "LLM Model Versioning Security Guide"), description: pick(isDE, "LLM Modell-Versioning-Sicherheit", "LLM model versioning security"), url: `${SITE_URL}/${locale}${PATH}` },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Versioning-Security-Guide für eigene KI-Systeme.", "Versioning security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Model Versioning Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Model Versioning Security", "LLM Model Versioning Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Versioning-Security sind anfällig für Versioning-Attacken — ohne Versioning-Security bleibt Versioning ungeschützt. Vier Kontrollen: Version Authentication, Rollback Security, Version Access Control und Version Audit Logging.", "LLM models without versioning security are vulnerable to versioning attacks — without versioning security, versioning remains unprotected. Four controls: version authentication, rollback security, version access control and version audit logging.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Model Versioning Security? Einfach erklärt", "What is LLM Model Versioning Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Model Versioning Security schützt Modellversionen vor Manipulation: Version Authentication nutzt digitale Signaturen und Hash-Verifikation um Version-Integrität sicherzustellen. Rollback Security sichert Rollback-Operationen mit signierten Konfigurationen und Integritäts-Verifikation. Version Access Control nutzt RBAC mit versionsspezifischen Permissions für Least-Privilege. Version Audit Logging loggt alle Version-Events für Compliance. Ohne Security können Angreifer Versionen manipulieren, unauthorisierte Rollbacks durchführen oder unapproved Deployments erzwingen.", "LLM model versioning security protects model versions from tampering: version authentication uses digital signatures and hash verification to ensure version integrity. Rollback security secures rollback operations with signed configurations and integrity verification. Version access control uses RBAC with version-specific permissions for least privilege. Version audit logging logs all version events for compliance. Without security, attackers can tamper with versions, perform unauthorised rollbacks, or force unapproved deployments.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Versioning-Security-Kontrollen", "Jump to versioning security controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Versioning-Security-Kontrollen", "4 Versioning Security Controls")}</h2>
          <div className="space-y-5">
            {CONTROLS.map((c) => (
              <div key={c.id} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 overflow-hidden shadow-xl">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700/50">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900/80 backdrop-blur-lg px-2 py-0.5 rounded">{c.id}</span>
                  <span className="font-bold text-gray-100">{c.title}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{c.desc}</p>
                  <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded font-mono text-xs overflow-x-auto shadow-lg"><pre>{c.code}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/llm-model-extraction-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Model Extraction Defense", "LLM Model Extraction Defense")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Extraction-Defense", "Extraction defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-model-watermarking`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Model Watermarking", "LLM Model Watermarking")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Watermarking", "Watermarking")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-api-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM API Security", "LLM API Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "API-Security", "API security")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Versioning-Overview", "Versioning overview")}</div>
            </a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Versioning Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Model Versioning Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM model versioning security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
  )
}
