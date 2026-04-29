import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-edge-deployment-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Edge Deployment Security: LLM-Edge-Deployment-Security | ClawGuru Moltbot", "LLM Edge Deployment Security: LLM Edge Deployment Security | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Edge-Deployment-Security: Edge Device Authentication, Secure Edge Inference, Edge Update Security und Edge Monitoring für LLM-Edge-Deployment-Security.", "LLM edge deployment security: edge device authentication, secure edge inference, edge update security and edge monitoring for LLM edge deployment security.")
  return {
    title, description,
    keywords: ["llm edge deployment security", "edge device authentication", "secure edge inference", "edge update security", "edge monitoring", "moltbot edge"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "EDS-1", title: "Edge Device Authentication", desc: "Authenticate all edge devices. Use device certificates, TPM, or secure boot for secure edge deployment.", code: `# Moltbot edge device authentication:
edge_device_auth:
  enabled: true

  # Device certificates:
  device_certificates:
    enabled: true
    # Require: device certificates for edge access
    # Validate: certificate on every request
    # Revoke: compromised certificates
    # Use: X.509 certificates

  # TPM authentication:
  tpm:
    enabled: true
    # Use: TPM for device attestation
    # Verify: TPM quote on device boot
    # Prevents: device impersonation
    # Use: for high-security edge

  # Secure boot:
  secure_boot:
    enabled: true
    # Enable: secure boot on edge devices
    # Verify: boot chain integrity
    # Prevents: boot tampering
    # Use: for production edge` },
  { id: "EDS-2", title: "Secure Edge Inference", desc: "Secure inference on edge devices. Use TEE, encrypted models, and secure model loading.", code: `# Moltbot secure edge inference:
secure_edge_inference:
  enabled: true

  # Trusted execution environment:
  tee:
    enabled: true
    # Use: TEE for edge inference
    # Providers: Intel SGX, ARM TrustZone
    # Benefit: hardware-based isolation
    # Protects: model and data

  # Encrypted models:
  encrypted_models:
    enabled: true
    # Encrypt: models at rest on edge
    # Decrypt: only in TEE
    # Key management: KMS or HSM
    # Prevents: model theft

  # Secure model loading:
  secure_loading:
    enabled: true
    # Verify: model signature before loading
    # Check: model integrity
    # Block: tampered models
    # Prevents: model tampering` },
  { id: "EDS-3", title: "Edge Update Security", desc: "Secure edge device updates. Use signed updates, delta updates, and rollback mechanisms.", code: `# Moltbot edge update security:
edge_update_security:
  enabled: true

  # Signed updates:
  signed_updates:
    enabled: true
    # Sign: all edge updates
    # Verify: signature before applying
    # Revoke: compromised signing keys
    # Prevents: update tampering

  # Delta updates:
  delta_updates:
    enabled: true
    # Use: delta updates for efficiency
    # Verify: delta integrity
    # Benefit: reduced bandwidth
    # Use: for large models

  # Rollback mechanism:
  rollback:
    enabled: true
    # Implement: automatic rollback on failure
    # Monitor: update success/failure
    # Benefit: minimise downtime
    # Use: for production edge` },
  { id: "EDS-4", title: "Edge Monitoring", desc: "Monitor edge devices for security events. Use telemetry, anomaly detection, and alerting.", code: `# Moltbot edge monitoring:
edge_monitoring:
  enabled: true

  # Device telemetry:
  telemetry:
    enabled: true
    # Collect: device health metrics
    # Metrics: CPU, memory, inference latency
    # Upload: to central monitoring
    # Alert: on anomalies

  # Anomaly detection:
  anomaly_detection:
    enabled: true
    # Detect: anomalous device behavior
    # Methods: statistical analysis, ML classifier
    # Alert: on suspicious activity
    # Block: compromised devices

  # Security event logging:
  event_logging:
    enabled: true
    # Log: all security events
    # Include: timestamp, device, event, result
    # Retain: logs for audit (90 days)
    # Protect: log access` },
]

const FAQ = [
  { q: "What is the difference between edge device authentication and orchestration authentication?", a: "Edge device authentication authenticates the physical or virtual edge device running the model. This ensures that only authorised devices can run edge inference. Orchestration authentication authenticates the orchestration system that manages edge devices. Edge device authentication is typically handled by device certificates, TPM, or secure boot. Orchestration authentication is typically handled by API keys or OAuth. Both are necessary: edge device authentication protects the device, orchestration authentication protects the orchestration system." },
  { q: "How does TEE protect edge inference?", a: "Trusted Execution Environment (TEE) protects edge inference by providing hardware-based isolation. The model and data are encrypted at rest and decrypted only inside the TEE. The TEE prevents external access to the model and data, even if the edge device is compromised. TEE also provides attestation, allowing the orchestration system to verify that the edge device is running trusted code. Common TEE implementations: Intel SGX, ARM TrustZone, AMD SEV." },
  { q: "How do I secure edge device updates?", a: "Secure edge device updates require: 1) Signed updates — sign all updates and verify before applying. 2) Delta updates — use delta updates for efficiency and verify integrity. 3) Rollback mechanism — automatic rollback on failure to minimise downtime. 4) Staged rollout — deploy to subset of devices first. 5) Monitoring — monitor update success/failure. 6) Key management — secure signing keys with KMS or HSM. Each control addresses a different aspect of update security." },
  { q: "What are common edge deployment attack vectors?", a: "Common edge deployment attack vectors: 1) Device impersonation — impersonate legitimate edge devices. 2) Model theft — extract model from edge device. 3) Update tampering — tamper with device updates. 4) Edge device compromise — compromise edge device to access model/data. 5) Edge DoS — overload edge devices. Defense: edge device authentication, secure edge inference, edge update security, edge monitoring, rate limiting." },
]

export default function LlmEdgeDeploymentSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Edge Deployment Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Edge Deployment Security Guide", "LLM Edge Deployment Security Guide"), description: pick(isDE, "LLM Edge-Deployment-Sicherheit", "LLM edge deployment security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Edge-Deployment-Security-Guide für eigene KI-Systeme.", "Edge deployment security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Edge Deployment Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Edge Deployment Security", "LLM Edge Deployment Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Edge-Deployment-Security sind anfällig für Edge-Attacken — ohne Edge-Deployment-Security bleibt Edge-Deployment ungeschützt. Vier Kontrollen: Edge Device Authentication, Secure Edge Inference, Edge Update Security und Edge Monitoring.", "LLM models without edge deployment security are vulnerable to edge attacks — without edge deployment security, edge deployment remains unprotected. Four controls: edge device authentication, secure edge inference, edge update security and edge monitoring.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Edge Deployment Security? Einfach erklärt", "What is LLM Edge Deployment Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Edge Deployment Security ist wie ein Sicherheits-Check für Edge-Geräte: Edge Device Authentication authentifiziert Geräte mit Zertifikaten, TPM oder Secure Boot. Secure Edge Inference nutzt TEE für hardware-basierte Isolation und verschlüsselte Modelle. Edge Update Security signiert Updates und bietet automatisches Rollback bei Fehlern. Edge Monitoring überwacht Geräte-Telemetrie und erkennt Anomalien. Ohne Security können Angreifer Geräte impersonieren, Modelle stehlen oder Updates manipulieren — das Edge-Deployment wird zur Sicherheitslücke.", "LLM edge deployment security is like a security check for edge devices: edge device authentication authenticates devices with certificates, TPM or secure boot. Secure edge inference uses TEE for hardware-based isolation and encrypted models. Edge update security signs updates and provides automatic rollback on failure. Edge monitoring monitors device telemetry and detects anomalies. Without security, attackers can impersonate devices, steal models, or manipulate updates — the edge deployment becomes a security vulnerability.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Edge-Deployment-Security-Kontrollen", "Jump to edge deployment security controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Edge-Deployment-Security-Kontrollen", "4 Edge Deployment Security Controls")}</h2>
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
            <a href={`/${locale}/moltbot/ai-agent-secure-deployment`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Secure Deployment", "AI Agent Secure Deployment")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Deployment-Security", "Deployment security")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-secure-inference`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Secure Inference", "LLM Secure Inference")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Confidential-Computing", "Confidential computing")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-data-encryption-at-rest`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Data Encryption at Rest", "LLM Data Encryption at Rest")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Encryption-at-Rest", "Encryption at rest")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Edge-Overview", "Edge overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Edge Deployment Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Edge Deployment Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM edge deployment security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
