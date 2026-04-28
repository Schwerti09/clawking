import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-secrets-management"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Secrets Management: Sichere Credentials für AI-Agents | ClawGuru", "AI Agent Secrets Management: Secure Credentials for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Secrets Management für Moltbot. HashiCorp Vault, Kubernetes Secrets, API Key Rotation und Zero-Secret-Deployments für sichere AI-Agent-Systeme.", "AI agent secrets management for Moltbot. HashiCorp Vault, Kubernetes Secrets, API key rotation and zero-secret deployments for secure AI agent systems.")
  return {
    title, description,
    keywords: ["ai agent secrets management", "hashicorp vault", "api key rotation", "zero secret deployment", "kubernetes secrets", "moltbot security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentSecretsManagementPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  
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
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Dieser Leitfaden dient zur Härtung Ihrer eigenen Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Secrets Management</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "AI Agent Secrets Management", "AI Agent Secrets Management")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "AI Agent Secrets Management für Moltbot. HashiCorp Vault, Kubernetes Secrets, API Key Rotation und Zero-Secret-Deployments für sichere AI-Agent-Systeme.", "AI agent secrets management for Moltbot. HashiCorp Vault, Kubernetes Secrets, API key rotation and zero-secret deployments for secure AI agent systems.")}
          </p>
        </div>
        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Secrets Management? Einfach erklärt", "What is Secrets Management? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Stell dir Secrets Management wie einen digitalen Tresor vor. Anstatt Passwörter und API-Keys im Code oder in Config-Dateien zu speichern (wo jeder sie sehen kann), werden sie in einem sicheren Speicher wie HashiCorp Vault aufbewahrt. AI-Agents holen sich kurzlebige Credentials nur, wenn sie sie brauchen — und diese verfallen automatisch nach kurzer Zeit.", "Think of secrets management like a digital vault. Instead of storing passwords and API keys in code or config files (where anyone can see them), they're kept in a secure storage like HashiCorp Vault. AI agents fetch short-lived credentials only when they need them — and these expire automatically after a short time.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten, Fortgeschrittene Techniken und Implementierungsschritte", "Jump to core concepts, advanced techniques, and implementation steps")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">1. Zero Hardcoded Secrets</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Keine Secrets im Code, in Config-Dateien oder in Environment-Variablen direkt. Ausnahmslos externalisierte Secret-Verwaltung.", "No secrets in code, config files or environment variables directly. Exclusively externalized secret management.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">2. Dynamic Secrets</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Kurzlebige, dynamisch generierte Credentials für jeden AI-Agent-Aufruf. HashiCorp Vault Dynamic Secrets für Datenbanken und APIs.", "Short-lived, dynamically generated credentials for every AI agent call. HashiCorp Vault dynamic secrets for databases and APIs.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">3. Automatic Key Rotation</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Automatische Rotation aller API Keys und Credentials. Kein manueller Prozess, der vergessen werden kann.", "Automatic rotation of all API keys and credentials. No manual process that can be forgotten.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">4. Least Privilege Access</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Jeder AI-Agent erhält nur die minimal notwendigen Credentials. Service-Account pro Agent-Typ mit spezifischen Berechtigungen.", "Each AI agent receives only the minimally necessary credentials. Service account per agent type with specific permissions.")}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">5. Secret Scanning</h3>
              <p className="text-sm text-gray-300">{pick(isDE, "Automatisches Scannen von Code und Commits auf versehentlich eingecheckte Secrets. GitGuardian, Trufflehog oder GitHub Secret Scanning.", "Automatic scanning of code and commits for accidentally checked-in secrets. GitGuardian, Trufflehog or GitHub Secret Scanning.")}</p>
            </div>
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 shadow-xl hover:border-green-500/30 transition-all duration-300"><h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Vault Agent Sidecar", "Vault Agent Sidecar")}</h3><p className="text-sm text-green-200">{pick(isDE, "HashiCorp Vault Agent als Sidecar-Container. Secrets werden direkt in das Dateisystem des AI-Agents gemountet, nie in Env-Variablen.", "HashiCorp Vault Agent as sidecar container. Secrets mounted directly into the AI agent filesystem, never in env vars.")}</p></div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 shadow-xl hover:border-blue-500/30 transition-all duration-300"><h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "OIDC Workload Identity", "OIDC Workload Identity")}</h3><p className="text-sm text-blue-200">{pick(isDE, "Workload Identity Federation mit OIDC. AI-Agents authentifizieren sich über Kubernetes Service Accounts, keine statischen Keys.", "Workload Identity Federation with OIDC. AI agents authenticate via Kubernetes Service Accounts, no static keys.")}</p></div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 shadow-xl hover:border-yellow-500/30 transition-all duration-300"><h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Secret Versioning & Rollback", "Secret Versioning & Rollback")}</h3><p className="text-sm text-yellow-200">{pick(isDE, "Versionierung aller Secrets mit Rollback-Fähigkeit. Bei Kompromittierung sofortiger Wechsel zur vorherigen Version.", "Versioning of all secrets with rollback capability. Immediate switch to previous version on compromise.")}</p></div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 shadow-xl hover:border-red-500/30 transition-all duration-300"><h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Break-Glass Prozedur", "Break-Glass Procedure")}</h3><p className="text-sm text-red-200">{pick(isDE, "Notfall-Zugriffsverfahren für kritische Secrets. Dokumentiert, auditiert und nur in definierten Notfallszenarien nutzbar.", "Emergency access procedures for critical secrets. Documented, audited and usable only in defined emergency scenarios.")}</p></div>
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div><div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Secret Inventory erstellen", "Create secret inventory")}</div><div className="text-sm text-gray-300">{pick(isDE, "Alle verwendeten Secrets und API Keys inventarisieren. Wer hat Zugriff? Wann wurde zuletzt rotiert?", "Inventory all used secrets and API keys. Who has access? When was last rotation?")}</div></div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div><div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Vault oder AWS Secrets Manager einrichten", "Set up Vault or AWS Secrets Manager")}</div><div className="text-sm text-gray-300">{pick(isDE, "Central Secret Store deployen. HashiCorp Vault On-Premise oder managed Service.", "Deploy central secret store. HashiCorp Vault on-premise or managed service.")}</div></div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div><div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Hardcoded Secrets entfernen", "Remove hardcoded secrets")}</div><div className="text-sm text-gray-300">{pick(isDE, "Code auf hardcoded Secrets scannen. Trufflehog oder GitGuardian für historische Commits.", "Scan code for hardcoded secrets. Trufflehog or GitGuardian for historical commits.")}</div></div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div><div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Dynamic Secrets konfigurieren", "Configure dynamic secrets")}</div><div className="text-sm text-gray-300">{pick(isDE, "Vault Dynamic Secrets für alle Datenbankverbindungen. TTL von maximal 1 Stunde für AI-Agent-Credentials.", "Vault dynamic secrets for all database connections. TTL of maximum 1 hour for AI agent credentials.")}</div></div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div><div className="font-semibold text-gray-100 mb-2">{pick(isDE, "Rotation automatisieren", "Automate rotation")}</div><div className="text-sm text-gray-300">{pick(isDE, "Automatische Rotation aller statischen Secrets einrichten. Alert wenn Rotation fehlschlägt.", "Set up automatic rotation of all static secrets. Alert when rotation fails.")}</div></div>
            </div>
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div></a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div></a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div></a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Roast My Moltbot</div><div className="text-sm text-gray-300">{pick(isDE, "Moltbot Security Testing", "Moltbot security testing")}</div></a>
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
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Secrets Management in Produktionsumgebungen. Die beschriebenen Techniken sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with secrets management in production environments. The described techniques have been proven in real deployments and continuously improved.')}
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
