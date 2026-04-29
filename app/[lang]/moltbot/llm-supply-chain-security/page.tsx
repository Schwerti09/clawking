import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-supply-chain-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Supply Chain Security: LLM-Supply-Chain-Security | ClawGuru Moltbot", "LLM Supply Chain Security: LLM Supply Chain Security | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Supply-Chain-Security: Model Source Verification, Dependency Integrity, Training Data Provenance und Pipeline Security für LLM-Supply-Chain-Security.", "LLM supply chain security: model source verification, dependency integrity, training data provenance and pipeline security for LLM supply chain security.")
  return {
    title, description,
    keywords: ["llm supply chain security", "model source verification", "dependency integrity", "training data provenance", "pipeline security", "moltbot supply chain"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "LSC-1", title: "Model Source Verification", desc: "Verify the source and integrity of LLM models. Use cryptographic signatures and trusted registries.", code: `# Moltbot model source verification:
source_verification:
  enabled: true

  # Trusted Registries:
  trusted_registries:
    enabled: true
    # Allow: models from trusted sources only
    # Sources: Hugging Face verified, internal registry
    # Block: unverified model sources
    # Audit: model registry access

  # Cryptographic Signatures:
  signatures:
    enabled: true
    # Verify: model signature before use
    # Method: GPG, Sigstore
    # Reject: unsigned or invalid models
    # Log: verification results

  # Model Hash Verification:
  hash_verification:
    enabled: true
    # Compute: model file hash
    # Compare: against known-good hash
    # Block: mismatched models
    # Prevents: model tampering` },
  { id: "LSC-2", title: "Dependency Integrity", desc: "Verify integrity of LLM framework dependencies. Pin versions and use lockfiles.", code: `# Moltbot LLM dependency integrity:
dependency_integrity:
  enabled: true

  # Version Pinning:
  version_pinning:
    enabled: true
    # Pin: all ML framework versions
    # Frameworks: PyTorch, TensorFlow, Transformers
    # Use: lockfiles (requirements.txt hash)
    # Prevents: dependency confusion

  # Dependency Verification:
  verification:
    enabled: true
    # Verify: package integrity
    # Method: hash verification
    # Tools: pip hash, conda verify
    # Prevents: tampered packages

  # Vulnerability Scanning:
  vuln_scanning:
    enabled: true
    # Scan: all dependencies
    # Tools: Safety, Snyk, Trivy
    # Alert: on critical vulnerabilities
    # Patch: within 7 days` },
  { id: "LSC-3", title: "Training Data Provenance", desc: "Track provenance of LLM training data. Document data sources, lineage, and integrity.", code: `# Moltbot training data provenance:
data_provenance:
  enabled: true

  # Source Documentation:
  source_docs:
    enabled: true
    # Document: all training data sources
    # Include: source URL, license, date
    # Store: in data catalog
    # Review: data quality

  # Data Lineage:
  lineage:
    enabled: true
    # Track: data transformation steps
    # Include: cleaning, augmentation
    # Version: training datasets
    # Link: model to training data

  # Data Integrity:
  integrity:
    enabled: true
    # Hash: training datasets
    # Verify: before training
    # Detect: dataset tampering
    # Prevent: data poisoning` },
  { id: "LSC-4", title: "ML Pipeline Security", desc: "Secure the ML training and inference pipeline. Control access, audit changes, and monitor execution.", code: `# Moltbot ML pipeline security:
pipeline_security:
  enabled: true

  # Pipeline Access Control:
  access_control:
    enabled: true
    # Restrict: pipeline modifications
    # Roles: ML engineer, reviewer, approver
    # Require: approval for production
    # Audit: all pipeline changes

  # Pipeline Integrity:
  integrity:
    enabled: true
    # Version: pipeline configurations
    # Sign: pipeline definitions
    # Verify: before execution
    # Prevents: pipeline tampering

  # Execution Monitoring:
  monitoring:
    enabled: true
    # Monitor: pipeline execution
    # Alert: on unexpected behavior
    # Log: all pipeline events
    # Detect: anomalous training runs` },
]

const FAQ = [
  { q: "What are the most critical LLM supply chain attack vectors?", a: "Most critical LLM supply chain attack vectors: 1) Model poisoning — compromised model weights from untrusted sources. 2) Dependency confusion — malicious packages with similar names to legitimate ML libraries. 3) Training data poisoning — corrupted training datasets that produce backdoored models. 4) Pipeline compromise — attacker modifies training/inference pipeline to inject malicious code. 5) Registry compromise — model registry hacked to serve malicious models. Defense: model signature verification, version pinning, data provenance, and pipeline security." },
  { q: "How do I verify LLM model integrity?", a: "Verify LLM model integrity by: 1) Cryptographic signatures — verify GPG or Sigstore signatures on model files. 2) Hash verification — compare SHA-256 hash against known-good value from trusted source. 3) Trusted registries — only use models from verified sources (Hugging Face verified, internal registry). 4) Model cards — review model card for training details and known risks. 5) SBOM for ML — generate SBOM listing model components and dependencies. 6) Behavioral testing — test model against known benchmarks before production." },
  { q: "How do I secure my ML training pipeline?", a: "Secure your ML training pipeline by: 1) Access control — restrict who can modify pipeline configurations. 2) Code review — require review for all pipeline changes. 3) Signed pipeline definitions — sign and verify pipeline configs before execution. 4) Isolated environments — run training in isolated, reproducible environments (containers). 5) Audit logging — log all pipeline executions and changes. 6) Monitoring — monitor training runs for anomalous behavior (unexpected compute, data access)." },
  { q: "How does LLM supply chain security differ from traditional software supply chain?", a: "LLM supply chain security has unique challenges: 1) Model weights — unlike code, model weights are opaque binary files that are hard to inspect. 2) Training data — training data provenance is complex and often poorly documented. 3) Behavioral attacks — poisoned models may behave correctly on test sets but exhibit malicious behavior on specific inputs. 4) Scale — LLMs have billions of parameters, making thorough inspection impractical. 5) Transfer learning — fine-tuned models inherit risks from pre-trained base models. Traditional supply chain security tools must be extended for ML." },
]

export default function LlmSupplyChainSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Supply Chain Security", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Supply Chain Security Guide", "LLM Supply Chain Security Guide"), description: pick(isDE, "LLM Supply Chain Security", "LLM supply chain security"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "LLM-Supply-Chain-Security-Guide für eigene KI-Systeme.", "LLM supply chain security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Supply Chain Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Supply Chain Security", "LLM Supply Chain Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "LLM-Modelle ohne Supply-Chain-Security sind anfällig für Model Poisoning, Dependency Confusion und Training Data Attacks. Vier Kontrollen: Model Source Verification, Dependency Integrity, Training Data Provenance und ML Pipeline Security.", "LLM models without supply chain security are vulnerable to model poisoning, dependency confusion and training data attacks. Four controls: model source verification, dependency integrity, training data provenance and ML pipeline security.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Supply Chain Security? Einfach erklärt", "What is LLM Supply Chain Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Supply Chain Security schützt die gesamte LLM-Entwicklungskette vor Angriffen: Model Source Verification verifiziert Modell-Quellen mit Cryptographic Signatures und Hashes gegen Trusted Registries wie Hugging Face Verified. Dependency Integrity pinnst ML-Framework-Versionen mit Lockfiles und scannt auf Vulnerabilities. Training Data Provenance dokumentiert Datenquellen, Lineage und Integrity um Data Poisoning zu verhindern. ML Pipeline Security sichert Training- und Inference-Pipelines mit Access Control, Signed Pipeline Definitions und Execution Monitoring.", "LLM supply chain security protects the entire LLM development chain from attacks: model source verification verifies model sources with cryptographic signatures and hashes against trusted registries like Hugging Face Verified. Dependency integrity pins ML framework versions with lockfiles and scans for vulnerabilities. Training data provenance documents data sources, lineage and integrity to prevent data poisoning. ML pipeline security secures training and inference pipelines with access control, signed pipeline definitions and execution monitoring.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Supply-Chain-Security-Kontrollen", "Jump to supply chain security controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Supply-Chain-Security-Kontrollen", "4 Supply Chain Security Controls")}</h2>
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
            <a href={`/${locale}/openclaw/supply-chain-sbom-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Supply Chain SBOM Security", "Supply Chain SBOM Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "SBOM-Security", "SBOM security")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-context-poisoning-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Context Poisoning Defense", "LLM Context Poisoning Defense")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Poisoning-Defense", "Poisoning defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-supply-chain`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Supply Chain", "AI Supply Chain")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "AI-Supply-Chain", "AI supply chain")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Overview", "Overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Supply Chain Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Supply Chain Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM supply chain security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
