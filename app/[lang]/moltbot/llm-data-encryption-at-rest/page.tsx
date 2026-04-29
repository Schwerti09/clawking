import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-data-encryption-at-rest"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Data Encryption at Rest: LLM-Daten-Encryption-at-Rest | ClawGuru Moltbot", "LLM Data Encryption at Rest: LLM Data Encryption at Rest | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Daten-Encryption-at-Rest: Database Encryption, Filesystem Encryption, Key Management und Encryption-at-Rest Policies für LLM-Datenverschlüsselung.", "LLM data encryption at rest: database encryption, filesystem encryption, key management and encryption-at-rest policies for LLM data encryption.")
  return {
    title, description,
    keywords: ["llm data encryption at rest", "database encryption", "filesystem encryption", "key management", "encryption at rest", "moltbot encryption"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "DER-1", title: "Database Encryption", desc: "Encrypt LLM data at rest in databases. Use transparent data encryption (TDE) or application-level encryption for sensitive data.", code: `# Moltbot database encryption:
database_encryption:
  enabled: true

  # Transparent data encryption (TDE):
  tde:
    enabled: true
    # Use database-native TDE for encryption at rest
    # Encrypts: data files, log files, backups
    # Supported: PostgreSQL, MySQL, MongoDB
    # Key management: database KMS integration

  # Application-level encryption:
  app_level:
    enabled: true
    # Encrypt sensitive fields before storage
    # Use: AES-256-GCM for field-level encryption
    algorithm: "AES-256-GCM"
    # Key management: per-tenant keys or KMS

  # Column encryption:
  column_encryption:
    enabled: true
    # Encrypt specific columns:
    # - User prompts (may contain PII)
    # - Agent outputs (may contain sensitive data)
    # - API keys (if stored)
    columns:
      - user_prompt
      - agent_output
      - api_keys` },
  { id: "DER-2", title: "Filesystem Encryption", desc: "Encrypt LLM data at rest on filesystems. Use full-disk encryption or encrypted volumes for sensitive data storage.", code: `# Moltbot filesystem encryption:
filesystem_encryption:
  enabled: true

  # Full-disk encryption:
  full_disk:
    enabled: true
    # Use LUKS (Linux) or BitLocker (Windows)
    # Encrypts: entire disk, including OS and data
    # Protects against: physical theft, disk access

  # Encrypted volumes:
  encrypted_volumes:
    enabled: true
    # Use encrypted volumes for LLM data storage
    # Mount: /var/lib/moltbot (encrypted)
    # Filesystem: ext4 with LUKS encryption
    # Key management: key file or KMS

  # Encrypted directories:
  encrypted_dirs:
    enabled: true
    # Use eCryptfs or fscrypt for directory encryption
    # Encrypts: specific directories only
    # Example: /var/lib/moltbot/prompts, /var/lib/moltbot/outputs
    # Key management: per-directory keys` },
  { id: "DER-3", title: "Key Management", desc: "Manage encryption keys securely. Use key management service (KMS) or hardware security module (HSM) for key storage and rotation.", code: `# Moltbot key management:
key_management:
  enabled: true

  # Key management service (KMS):
  kms:
    enabled: true
    # Use cloud KMS for key storage
    # Providers: AWS KMS, GCP KMS, Azure Key Vault
    # Features: key rotation, access control, audit logging
    provider: "aws_kms"

  # Hardware security module (HSM):
  hsm:
    enabled: true
    # Use HSM for on-premises key storage
    # Protects: keys in hardware tamper-resistant module
    # Use: for highest security requirements

  # Key rotation:
  rotation:
    enabled: true
    # Rotate encryption keys periodically
    # Interval: 90 days
    # Automatic: yes
    # Re-encrypt data: on rotation

  # Key access control:
  access_control:
    enabled: true
    # Restrict key access to authorized users
    # Use: IAM roles, least privilege
    # Audit: all key access` },
  { id: "DER-4", title: "Encryption-at-Rest Policies", desc: "Define and enforce encryption-at-rest policies. Ensure all LLM data is encrypted according to policy.", code: `# Moltbot encryption-at-rest policies:
encryption_policies:
  enabled: true

  # Default encryption policy:
  default:
    # Encrypt all LLM data by default
    # Exceptions: public data only
    enabled: true
    # Algorithm: AES-256-GCM
    # Key size: 256 bits

  # Data classification:
  classification:
    # Classify data by sensitivity:
    # - Public: no encryption required
    # - Internal: encryption recommended
    # - Confidential: encryption required
    # - PII: encryption required + key isolation
    enabled: true

  # Policy enforcement:
  enforcement:
    # Block writes to unencrypted storage
    # Audit: encryption violations
    # Alert: policy violations
    enabled: true` },
]

const FAQ = [
  { q: "What is the difference between TDE and application-level encryption?", a: "Transparent data encryption (TDE) is database-native encryption that encrypts data at the storage layer. The database handles encryption and decryption transparently to the application. Application-level encryption encrypts data at the application layer before sending it to the database. The application handles encryption and decryption. Both are necessary: TDE provides protection against disk theft and unauthorised database access. Application-level encryption provides protection against database administrators and database compromise. Example: TDE encrypts the entire database file. Application-level encryption encrypts specific fields (user prompts, agent outputs) with per-tenant keys." },
  { q: "How do I choose between KMS and HSM for key management?", a: "KMS (Key Management Service) is a cloud-based key management service (AWS KMS, GCP KMS, Azure Key Vault). It provides key storage, rotation, access control, and audit logging. HSM (Hardware Security Module) is a hardware device that stores keys in a tamper-resistant module. HSM provides the highest security but is more expensive and complex to manage. Choose KMS for cloud deployments and cost-effective key management. Choose HSM for on-premises deployments and highest security requirements (e.g., regulated industries). Both provide secure key storage, but HSM provides additional protection against physical attacks." },
  { q: "How does key rotation work with encrypted data?", a: "Key rotation involves generating a new encryption key and re-encrypting data with the new key. The process: 1) Generate new key. 2) Decrypt data with old key. 3) Encrypt data with new key. 4) Delete old key. For large datasets, this can be time-consuming. Optimisation strategies: 1) Rotate keys incrementally — re-encrypt data in batches. 2) Use key hierarchy — encrypt data with data encryption keys (DEKs), encrypt DEKs with master keys, rotate master keys only. 3) Schedule rotation during low-traffic periods. 4) Use lazy re-encryption — re-encrypt data on access." },
  { q: "What are the risks of not encrypting LLM data at rest?", a: "Not encrypting LLM data at rest can lead to: 1) Data theft — attackers can steal unencrypted data from disk, backups, or database dumps. 2) Regulatory violations — non-compliance with GDPR, HIPAA, PCI DSS, etc., which require encryption of sensitive data. 3) Legal liability — lawsuits for data breaches. 4) Reputation damage — public backlash for data breaches. 5) Insider threats — database administrators or employees with database access can read unencrypted data. 6) Physical theft — stolen servers or disks contain unencrypted data. Encryption at rest protects against these risks by rendering data unreadable without the encryption key." },
]

export default function LlmDataEncryptionAtRestPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Data Encryption at Rest", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Data Encryption at Rest Guide", "LLM Data Encryption at Rest Guide"), description: pick(isDE, "LLM Daten-Encryption-at-Rest Sicherheit", "LLM data encryption at rest security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Data-Encryption-at-Rest-Guide für eigene KI-Systeme.", "Data encryption at rest guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Data Encryption at Rest</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Data Encryption at Rest", "LLM Data Encryption at Rest")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Daten ohne Encryption-at-Rest können bei Diebstahl oder Datenbank-Kompromittierung offengelegt werden. Vier Kontrollen: Database Encryption, Filesystem Encryption, Key Management und Encryption-at-Rest Policies.", "LLM data without encryption at rest can be exposed in case of theft or database compromise. Four controls: database encryption, filesystem encryption, key management and encryption-at-rest policies.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Data Encryption at Rest? Einfach erklärt", "What is LLM Data Encryption at Rest? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Data Encryption at Rest ist wie ein Safe für ruhende Daten: Database Encryption verschlüsselt Datenbank-Files mit TDE oder Feld-Ebene. Filesystem Encryption verschlüsselt Festplatten oder Volumes mit LUKS/BitLocker. Key Management speichert Schlüssel sicher in KMS oder HSM mit automatischer Rotation. Encryption-at-Rest Policies erzwingen Verschlüsselung für alle LLM-Daten nach Sensitivitätsklassifizierung. Ohne Encryption-at-Rest können Angreifer bei Diebstahl oder Datenbank-Kompromittierung Klartext lesen — GDPR-Compliance ist unmöglich.", "LLM data encryption at rest is like a safe for data at rest: database encryption encrypts database files with TDE or field-level. Filesystem encryption encrypts disks or volumes with LUKS/BitLocker. Key management stores keys securely in KMS or HSM with automatic rotation. Encryption-at-rest policies enforce encryption for all LLM data by sensitivity classification. Without encryption at rest, attackers can read plaintext in case of theft or database compromise — GDPR compliance is impossible.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Encryption-at-Rest-Kontrollen", "Jump to encryption at rest controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Data-Encryption-at-Rest-Kontrollen", "4 Data Encryption at Rest Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-data-encryption-in-transit`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Data Encryption in Transit", "LLM Data Encryption in Transit")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "TLS-Verschlüsselung", "TLS encryption")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-communication-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Communication Security", "AI Agent Communication Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Agent-Kommunikation", "Agent communication")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-data-loss-prevention`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Data Loss Prevention", "AI Data Loss Prevention")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "DLP", "DLP")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-context-isolation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Context Isolation", "LLM Context Isolation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Multi-Tenant-Keys", "Multi-tenant keys")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Encryption Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Data Encryption at Rest-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM data encryption at rest implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
