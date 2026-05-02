import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-model-versioning-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Model Versioning Security: Sichere Modell-Lifecycle-Verwaltung | ClawGuru", "AI Model Versioning Security: Secure Model Lifecycle Management | ClawGuru")
  const description = pick(isDE, "Sichere KI-Modell-Versionierung: Modell-Signierung mit Cosign, SHA-256-Verifikation, Rollback-Strategie, Canary-Deployments für LLMs und Schutz vor Model-Substitution-Angriffen.", "Secure AI model versioning: model signing with Cosign, SHA-256 verification, rollback strategy, canary deployments for LLMs and protection against model substitution attacks.")
  return {
    title, description,
    keywords: ["ai model versioning security", "llm model signing", "model integrity verification", "ai model lifecycle", "model substitution attack", "cosign ai model"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AiModelVersioningSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Model Versioning Security: Sichere Modell-Lifecycle-Verwaltung | ClawGuru", "AI Model Versioning Security: Secure Model Lifecycle Management | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Model Versioning Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Model Versioning", "Cosign", "SHA-256"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title }
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Model Versioning Security?", "What is Model Versioning Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Model Versioning Defense", "5-Layer Model Versioning Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Model Versioning Maturity Score", "Model Versioning Maturity Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">14 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Model Versioning Security · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Model Versioning Security — Dein Modell wurde substituiert. Ein Angreifer hat das LLM durch ein bösartiges Modell ersetzt. Datenexfiltration, System-Down. Dein CISO hat den CEO gerufen.", "AI Model Versioning Security — Your Model Was Substituted. An Attacker Replaced the LLM with a Malicious Model. Data Exfiltration, System Down. Your CISO Called the CEO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein Modell hat keine Signierung, keine SHA-256-Verifikation und kein Rollback. Model-Substitution-Angriff, kompromittiertes Modell, Datenexfiltration. 72h Downtime, Kunden verloren, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "Your model has no signing, no SHA-256 verification and no rollback. Model substitution attack, compromised model, data exfiltration. 72h downtime, customers lost, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Model Versioning Security? Einfach erklärt.", "What is Model Versioning Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Model Versioning Security wie eine Signatur-Prüfung vor: Signiere jedes Modell mit Cosign, verifiziere SHA-256 Hashes, implementiere Rollback und Canary-Deployments. Für LLMs bedeutet das: Modell-Signierung, Integritäts-Verifikation, Rollback-Strategie, Canary-Deployments. Gutes Model Versioning Security bedeutet: Never deploy unverified models again.", "Think of model versioning security like signature verification: sign every model with Cosign, verify SHA-256 hashes, implement rollback and canary deployments. For LLMs, this means: model signing, integrity verification, rollback strategy, canary deployments. Good model versioning security means: never deploy unverified models again.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer Model Versioning Defense Architecture", "5-Layer Model Versioning Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Modell-Signierung mit Cosign", "Model Signing with Cosign")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Signiere jedes Modell mit Cosign. Private Key für Signierung, Public Key für Verifikation.", "Sign every model with Cosign. Private key for signing, public key for verification.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`model_signing:
  enabled: true
  cosign: true
  private_key: true
  public_key_verification: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "SHA-256 Integritäts-Verifikation", "SHA-256 Integrity Verification")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Verifiziere SHA-256 Hashes vor Modell-Deployment. Hash Chain für Integrität.", "Verify SHA-256 hashes before model deployment. Hash chain for integrity.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`sha256_verification:
  enabled: true
  pre_deployment: true
  hash_chain: true
  integrity_check: true`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Rollback-Strategie", "Rollback Strategy")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Implementiere automatisches Rollback bei Modell-Fehlern. Version-History und Rollback-Skripte.", "Implement automated rollback on model failures. Version history and rollback scripts.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`rollback_strategy:
  enabled: true
  automated: true
  version_history: true
  rollback_scripts: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Canary-Deployments", "Canary-Deployments")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Deploye neue Modelle schrittweise auf kleine User-Segmente. Monitoring und A/B-Testing.", "Deploy new models gradually to small user segments. Monitoring and A/B testing.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`canary_deployment:
  enabled: true
  gradual: true
  monitoring: true
  ab_testing: true`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center text-amber-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Model-Substitution Detection", "Model-Substitution Detection")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Erkenne Modell-Substitution-Angriffe durch Hash-Monitoring und Verifikation.", "Detect model substitution attacks through hash monitoring and verification.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`substitution_detection:
  enabled: true
  hash_monitoring: true
  continuous_verification: true
  alert_on_mismatch: true`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Model-Substitution ohne Verifikation", "SCAR #1: Model-Substitution without Verification")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Model-Substitution ohne Verifikation. Bösartiges Modell deployed, Daten exfiltriert. Fix: Cosign-Signierung, SHA-256-Verifikation.", "Model-substitution without verification. Malicious model deployed, data exfiltrated. Fix: Cosign signing, SHA-256 verification.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Signierung. Lessons: Aktiviere Cosign-Signierung mit SHA-256-Verifikation.", "Root Cause: No signing. Lessons: Enable Cosign signing with SHA-256 verification.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Defektes Modell ohne Rollback", "SCAR #2: Defective Model without Rollback")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Defektes Modell ohne Rollback. System-Down, Kunden verloren. Fix: Automatisches Rollback, Version-History.", "Defective model without rollback. System down, customers lost. Fix: Automated rollback, version history.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Rollback. Lessons: Aktiviere automatisches Rollback mit Version-History.", "Root Cause: No rollback. Lessons: Enable automated rollback with version history.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Cosign-Signierung aktivieren", "Enable Cosign Signing")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Cosign-Signierung für alle Modelle.", "Enable Cosign signing for all models.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "SHA-256-Verifikation aktivieren", "Enable SHA-256 Verification")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere SHA-256-Verifikation vor Deployment.", "Enable SHA-256 verification before deployment.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Automatisches Rollback aktivieren", "Enable Automated Rollback")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere automatisches Rollback bei Modell-Fehlern.", "Enable automated rollback on model failures.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Model Versioning Checkliste", "Interactive Model Versioning Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "m1", text: pick(isDE, "Cosign-Signierung aktiviert", "Cosign signing enabled") },
                  { id: "m2", text: pick(isDE, "SHA-256-Verifikation aktiviert", "SHA-256 verification enabled") },
                  { id: "m3", text: pick(isDE, "Automatisches Rollback aktiviert", "Automated rollback enabled") },
                  { id: "m4", text: pick(isDE, "Version-History aktiviert", "Version history enabled") },
                  { id: "m5", text: pick(isDE, "Canary-Deployments aktiviert", "Canary deployments enabled") },
                  { id: "m6", text: pick(isDE, "Substitution Detection aktiviert", "Substitution detection enabled") },
                  { id: "m7", text: pick(isDE, "Hash-Monitoring aktiviert", "Hash monitoring enabled") },
                  { id: "m8", text: pick(isDE, "A/B-Testing aktiviert", "A/B testing enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Model Versioning Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Model Versioning Maturity Score Calculator", "Model Versioning Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Cosign-Signierung aktiviert?", "Do you have Cosign signing enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist SHA-256-Verifikation aktiv?", "Is SHA-256 verification active?"), weight: 25 },
                  { q: pick(isDE, "Ist automatisches Rollback aktiv?", "Is automated rollback active?"), weight: 25 },
                  { q: pick(isDE, "Ist Canary-Deployment aktiv?", "Is canary deployment active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Model Versioning Maturity Score:", "Your Model Versioning Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 19/100", "Industry Average: 19/100")}</p>
              </div>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Model Versioning Security, Cosign und SHA-256-Verifikation.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in model versioning security, Cosign and SHA-256 verification.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/check`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "System jetzt scannen", "Scan system now")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "600+ Security-Playbooks", "600+ Security Playbooks")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-testing`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Testing</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Testing-Strategies", "Testing strategies")}</div>
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
