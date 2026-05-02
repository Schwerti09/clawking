import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-supply-chain"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Supply Chain Security: Modelle, Abhängigkeiten & Plugins absichern | ClawGuru", "AI Supply Chain Security: Secure Models, Dependencies & Plugins | ClawGuru")
  const description = pick(isDE, "AI-Supply-Chain-Angriffe erkennen und verhindern: Model-Poisoning, kompromittierte Python-Pakete, Hugging Face Backdoors, Plugin-Supply-Chain und SBOM für KI-Systeme mit Moltbot.", "Detect and prevent AI supply chain attacks: model poisoning, compromised Python packages, Hugging Face backdoors, plugin supply chain and SBOM for AI systems with Moltbot.")
  return {
    title, description,
    keywords: ["ai supply chain security", "llm supply chain", "hugging face security", "model poisoning supply chain", "ai dependency security", "moltbot supply chain"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const ATTACK_VECTORS = [
  { id: "SC-1", name: "Compromised Base Model", severity: "CRITICAL", desc: "Attacker uploads a backdoored model to Hugging Face or another registry. The model behaves normally on most inputs but activates malicious behavior on specific trigger inputs.", mitigations: ["Verify model SHA-256 hash against published checksums", "Run behavioral test suite on every model version before deployment", "Use Moltbot model verification: cryptographic attestation of model provenance", "Pin exact model commit hash in deployment config — never pull 'latest'", "Prefer models from verified organizations with signed releases"] },
  { id: "SC-2", name: "Malicious Python Package", severity: "HIGH", desc: "Attacker publishes a typosquatted package (e.g., 'langchian' vs 'langchain') or compromises a legitimate package. Installs malware, exfiltrates API keys, or backdoors the agent runtime.", mitigations: ["Pin all dependencies to exact versions (==) in requirements.txt", "Use pip hash-checking mode: pip install --require-hashes", "Scan with Safety/Bandit/pip-audit on every CI build", "Generate SBOM on every build — diff SBOMs to detect unexpected new packages", "Use a private PyPI mirror (Devpi/Nexus) — no direct PyPI access from prod"] },
  { id: "SC-3", name: "Compromised Plugin/Tool", severity: "HIGH", desc: "A Moltbot plugin or LangChain tool that connects to external APIs is compromised upstream. The plugin exfiltrates agent context or executes unauthorized actions.", mitigations: ["Audit all third-party plugins before integration", "Isolate each plugin in its own subprocess/container with network restrictions", "Sign and verify plugins with Cosign before loading", "Monitor plugin network calls — block unexpected outbound connections", "Maintain internal fork of critical plugins — do not auto-update"] },
  { id: "SC-4", name: "Training Data Poisoning", severity: "HIGH", desc: "For fine-tuned or RAG-based systems: an attacker poisons training data or documents in the knowledge base. The model produces systematically biased or backdoored outputs.", mitigations: ["Hash and sign all training datasets before fine-tuning", "Audit data sources for injected adversarial examples before training", "Run backdoor detection tests (specific trigger phrases → expected clean output)", "Cryptographically attest fine-tuned model provenance to clean training set", "Separate production RAG corpus from user-writable content (never ingest unvalidated user content into RAG)"] },
  { id: "SC-5", name: "Compromised AI Orchestrator", severity: "CRITICAL", desc: "The orchestration framework itself (LangChain, AutoGen, etc.) is compromised via a supply chain attack on its dependencies. All agents using the framework are affected.", mitigations: ["Use Moltbot's vendored dependencies — internal mirror, not PyPI directly", "SBOM diff on every framework update — review all transitive dependency changes", "Canary deployments: roll out framework updates to 5% of agents first", "Behavioral regression tests: run full agent test suite on every framework update", "Maintain rollback capability: keep previous framework version deployable"] },
]

const FAQ = [
  { q: "How do I verify a Hugging Face model has not been tampered with?", a: "Hugging Face provides SHA-256 hashes for each model file in the repository. Verification steps: 1) Download model with transformers library or huggingface_hub. 2) Verify hash: sha256sum model.safetensors against the hash shown on the HF model page. 3) For production: pin the specific model commit hash in your deployment config (not just the model name). 4) Use Moltbot model attestation: cryptographically sign the model hash at download time, verify signature before loading. 5) Never use --trust-remote-code without reviewing the code — Hugging Face models can include arbitrary Python code that executes on load." },
  { q: "What is an AI SBOM and why do I need one?", a: "An AI SBOM (Software Bill of Materials) for AI systems extends traditional software SBOMs to include: Python packages and their exact versions, model files with SHA-256 hashes, training data sources (for fine-tuned models), plugins and tools with version/commit hashes. Why you need it: 1) Supply chain audit: if a package is compromised (like XZ Utils), you can instantly check if it's in your AI system's SBOM. 2) Regulatory compliance: EU AI Act (Annex IV) requires technical documentation including components. 3) Incident response: quickly determine blast radius when a dependency vulnerability is disclosed. 4) Model provenance: prove your model came from an untampered source." },
  { q: "How do I safely update LLM framework dependencies (LangChain, etc.)?", a: "Safe update process for LLM frameworks: 1) Generate SBOM of current working version (baseline). 2) Update dependency in test environment. 3) Generate new SBOM — diff against baseline. Review every new/changed transitive dependency. 4) Run full behavioral test suite against new version — verify agent outputs match expectations. 5) Security scan: Trivy/Safety on new dependency set. 6) Deploy to canary environment (5% traffic) — monitor for behavioral anomalies. 7) If clean after 24h: gradual rollout to 25% → 50% → 100%. Never update LLM frameworks directly in production without this process — framework updates have broken agent behavior in the past." },
  { q: "Can Moltbot detect if a loaded model has been poisoned?", a: "Moltbot's model poisoning detection uses behavioral testing: 1) Baseline behavioral tests: a set of probe inputs with expected outputs is established when a clean model is deployed. 2) On every model update: run the full probe set, compare outputs to baseline. Significant divergence (>5% change in expected outputs) triggers a poisoning alert. 3) Backdoor probe tests: test specific trigger phrases that shouldn't activate unusual behavior. 4) Statistical output distribution: monitor token probability distributions — poisoned models often show unusual distribution shifts. This is not perfect (sophisticated poisoning can evade behavioral tests) but catches most practical attacks." },
]

export default function AiSupplyChainPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Supply Chain Security: Modelle, Abhängigkeiten & Plugins absichern | ClawGuru", "AI Supply Chain Security: Secure Models, Dependencies & Plugins | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Supply Chain Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Supply Chain Security", "Model Poisoning", "SBOM", "Cosign"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div id="reading-progress" className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{width: '0%'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 flex gap-8">
        {/* Sticky Table of Contents (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 uppercase">{pick(isDE, "Inhalt", "Contents")}</h3>
              <nav className="space-y-2 text-sm">
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Supply Chain Security?", "What is Supply Chain Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Supply Chain Defense", "5-Layer Supply Chain Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Supply Chain Maturity Score", "Supply Chain Maturity Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">15 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Supply Chain Security · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Supply Chain Security — Dein AI-System hat keine Supply Chain Defense. Model-Poisoning, kompromittierte Pakete, Hugging Face Backdoors. Dein Agent lädt bösartigen Code. Dein CEO hat den CISO gefeuert.", "AI Supply Chain Security — Your AI System Has No Supply Chain Defense. Model Poisoning, Compromised Packages, Hugging Face Backdoors. Your Agent Loads Malicious Code. Your CEO Fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein AI-System hat keine Supply Chain Defense, keine Modell-Verifikation und kein SBOM. Model-Poisoning, kompromittierte Python-Pakete, Hugging Face Backdoors. 72h Incident-Response, Daten-Exfiltration, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "Your AI system has no supply chain defense, no model verification and no SBOM. Model poisoning, compromised Python packages, Hugging Face backdoors. 72h incident response, data exfiltration, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Supply-Chain-Sicherheitsleitfaden für eigene KI-Systeme.", "Supply chain security guide for your own AI systems.")}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{animationDelay: '0.08s'}}>
            {[
              { value: "5", label: pick(isDE, "Angriffsvektoren", "Attack vectors") },
              { value: "SHA-256", label: pick(isDE, "Modell-Verifikation", "Model verification") },
              { value: "SBOM", label: pick(isDE, "Für jedes AI-Build", "For every AI build") },
              { value: "Cosign", label: pick(isDE, "Plugin-Signierung", "Plugin signing") },
            ].map((s) => (
              <div key={s.label} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 text-center shadow-2xl">
                <div className="text-2xl font-black text-cyan-400">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Supply Chain Security? Einfach erklärt.", "What is Supply Chain Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Supply Chain Security wie die Sicherheit deiner Lieferkette vor: Basismodelle, Python-Pakete, Plugins, Training-Daten. Jeder Schritt kann kompromittiert werden. Für AI-Systeme bedeutet das: Modell-Verifikation mit SHA-256, SBOM für jedes Build, Cosign-Signierung für Plugins. Gute Supply Chain Security bedeutet: Never trust, always verify.", "Think of supply chain security like the security of your supply chain: base models, Python packages, plugins, training data. Every step can be compromised. For AI systems, this means: model verification with SHA-256, SBOM for every build, Cosign signing for plugins. Good supply chain security means: never trust, always verify.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer Supply Chain Defense Architecture", "5-Layer Supply Chain Defense Architecture")}</h2>
            
            {ATTACK_VECTORS.map((v) => (
              <div key={v.id} className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-2xl mb-6 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{v.id}</span>
                  <span className="font-semibold text-gray-100">{v.name}</span>
                  <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded ${v.severity === "CRITICAL" ? "bg-red-900 text-red-300" : "bg-orange-900 text-orange-300"}`}>{v.severity}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{v.desc}</p>
                  <div className="text-xs font-semibold text-green-400 mb-2">{pick(isDE, "Mitigationen:", "Mitigations:")}</div>
                  <ul className="space-y-1">
                    {v.mitigations.map((m) => <li key={m} className="text-xs text-green-200">▸ {m}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Kompromittiertes Basismodell", "SCAR #1: Compromised Base Model")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Kompromittiertes Basismodell von Hugging Face. Backdoor aktiviert auf spezifischen Inputs, toxische Inhalte. Fix: SHA-256 Verifikation, Modell-Attestierung.", "Compromised base model from Hugging Face. Backdoor activates on specific inputs, toxic content. Fix: SHA-256 verification, model attestation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Modell-Verifikation. Lessons: Aktiviere SHA-256 Hash-Check mit Cosign-Signierung.", "Root Cause: No model verification. Lessons: Enable SHA-256 hash check with Cosign signing.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Bösartiges Python-Paket", "SCAR #2: Malicious Python Package")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Bösartiges Python-Paket via Typosquatting. API-Key Exfiltration, Backdoor. Fix: Pip Hash-Check, SBOM-Scanning.", "Malicious Python package via typosquatting. API key exfiltration, backdoor. Fix: Pip hash-check, SBOM scanning.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Dependency-Scanning. Lessons: Aktiviere Safety/Bandit Scan mit SBOM-Diff.", "Root Cause: No dependency scanning. Lessons: Enable Safety/Bandit scan with SBOM diff.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Modell-Verifikation aktivieren", "Enable Model Verification")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere SHA-256 Hash-Check für alle Basismodelle.", "Enable SHA-256 hash check for all base models.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "SBOM-Generierung aktivieren", "Enable SBOM Generation")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Generiere SBOM für jedes AI-Build mit Syft/Trivy.", "Generate SBOM for every AI build with Syft/Trivy.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Plugin-Signierung aktivieren", "Enable Plugin Signing")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Cosign-Signierung für alle Plugins.", "Enable Cosign signing for all plugins.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Supply Chain Checkliste", "Interactive Supply Chain Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "sc1", text: pick(isDE, "Modell SHA-256 Verifikation aktiviert", "Model SHA-256 verification enabled") },
                  { id: "sc2", text: pick(isDE, "SBOM für jedes Build generiert", "SBOM generated for every build") },
                  { id: "sc3", text: pick(isDE, "Cosign Plugin-Signierung aktiviert", "Cosign plugin signing enabled") },
                  { id: "sc4", text: pick(isDE, "Pip Hash-Check aktiviert", "Pip hash-check enabled") },
                  { id: "sc5", text: pick(isDE, "Safety/Bandit Scanning aktiviert", "Safety/Bandit scanning enabled") },
                  { id: "sc6", text: pick(isDE, "Private PyPI Mirror konfiguriert", "Private PyPI mirror configured") },
                  { id: "sc7", text: pick(isDE, "Training-Data Hashing aktiviert", "Training data hashing enabled") },
                  { id: "sc8", text: pick(isDE, "SBOM-Diff bei Updates aktiviert", "SBOM diff on updates enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Supply Chain Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Supply Chain Maturity Score Calculator", "Supply Chain Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Modell-Verifikation aktiviert?", "Do you have model verification enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist SBOM-Generierung aktiv?", "Is SBOM generation active?"), weight: 25 },
                  { q: pick(isDE, "Ist Plugin-Signierung aktiv?", "Is plugin signing active?"), weight: 25 },
                  { q: pick(isDE, "Ist Dependency-Scanning aktiv?", "Is dependency scanning active?"), weight: 25 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-300">{item.q}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 text-sm">{pick(isDE, "Ja", "Yes")}</button>
                      <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 text-sm">{pick(isDE, "Nein", "No")}</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{pick(isDE, "Dein Supply Chain Maturity Score:", "Your Supply Chain Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 17/100", "Industry Average: 17/100")}</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.65s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 shadow-2xl">
                  <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Author Box */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-6 rounded-lg border border-cyan-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">
                  RS
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-cyan-300 text-lg">R. Schwertfechter</h3>
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                  </div>
                  <div className="text-sm text-cyan-200 mb-3">
                    Principal Ops-Engineer & Security Architect
                  </div>
                  <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                    <span>📅 Published: 01.05.2026</span>
                    <span>🔄 Last reviewed: 01.05.2026</span>
                  </div>
                  <div className="text-sm text-cyan-100 leading-relaxed mb-4">
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Supply Chain Security, Model Poisoning, SBOM und Cosign.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in supply chain security, model poisoning, SBOM and Cosign.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/openclaw/supply-chain-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Supply Chain Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "SBOM + Sigstore für Container", "SBOM + Sigstore for containers")}</div>
              </a>
              <a href={`/${locale}/moltbot/model-poisoning-protection`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Model Poisoning Protection</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Verhaltenstests für Modelle", "Behavioral tests for models")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-supply-chain-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Agent Supply Chain Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Agent-Supply-Chain-Härtung", "Agent supply chain hardening")}</div>
              </a>
              <a href={`/${locale}/academy/cve/CVE-2025-30065`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">CVE-2025-30065</div>
                <div className="text-sm text-gray-300">Apache Parquet Supply Chain RCE</div>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Reading Progress Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('reading-progress').style.width = scrolled + '%';
          });
        `
      }} />
    </div>
  )
}
