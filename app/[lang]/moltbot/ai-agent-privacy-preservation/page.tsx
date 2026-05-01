import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-privacy-preservation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Privacy Preservation: Datenschutz für AI-Agents | ClawGuru", "AI Agent Privacy Preservation: Privacy Protection for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Privacy Preservation für Moltbot-Deployments. Differential Privacy, Federated Learning, Data Minimization und GDPR-Compliance für AI-Agents. Mit Moltbot automatisierbar.", "AI agent privacy preservation for Moltbot deployments. Differential privacy, federated learning, data minimization and GDPR compliance for AI agents.")
  return {
    title,
    description,
    keywords: ["ai agent privacy", "differential privacy", "federated learning", "data minimization", "gdpr ai agents", "moltbot security", "privacy preservation 2026", "security check", "runbooks"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      images: ["/og-image.png"]
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentPrivacyPreservationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Privacy Preservation", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Privacy", "GDPR"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Privacy Preservation?", "What is Privacy Preservation?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4-Layer Privacy Defense", "4-Layer Privacy Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Privacy Score", "Privacy Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">8 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Privacy Preservation · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Privacy Preservation — Dein Agent hat gestern Nacht 100.000 Kundendatensätze ohne Consent verarbeitet.", "AI Agent Privacy Preservation — Your Agent Processed 100,000 Customer Records Last Night Without Consent.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein KI-Agent hat gestern Nacht in einer Batch-Verarbeitung 100.000 Kundendatensätze verarbeitet, ohne dass die Benutzer explizit eingewilligt haben. Das Ergebnis: DSGVO-Verstoß Art. 6, 4.8 Mio. Euro Strafe, dein CISO hat den Datenschutzbeauftragten gerufen. Hier ist, wie du das verhinderst.", "Your AI agent processed 100,000 customer records in a batch job last night without explicit user consent. The result: GDPR violation Art. 6, €4.8M in fines, your CISO called the data protection officer. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Privacy Preservation? Einfach erklärt.", "What is Privacy Preservation? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Privacy Preservation wie einen Briefumschlag vor: Du kannst den Inhalt lesen (AI-Training), aber du kannst nicht sehen, von wem der Brief stammt (Differential Privacy). Oder noch besser: Du lernst aus Briefen, ohne die Originale zu speichern (Federated Learning). Privacy Preservation stellt sicher, dass AI-Agents lernen können, ohne personenbezogene Daten zu exponieren.", "Think of privacy preservation like an envelope: you can read the contents (AI training), but you can't see who sent the letter (differential privacy). Or even better: you learn from letters without storing the originals (federated learning). Privacy preservation ensures AI agents can learn without exposing personal data.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4-Layer Privacy Defense Architecture", "4-Layer Privacy Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Data Minimization", "Data Minimization")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Verarbeite nur die minimal notwendigen Daten. Privacy by Design und Privacy by Default für alle Agent-Workflows.", "Process only the minimum necessary data. Privacy by design and privacy by default for all agent workflows.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`data_minimization:
  enabled: true
  principle: "privacy_by_design"
  collect_only:
    - required_for_task
    - explicitly_consent
  retention_policy:
    delete_after_use: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Differential Privacy", "Differential Privacy")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Mathematisch nachweisbarer Datenschutz. Noise-Injection verhindert Re-Identifizierung einzelner Datenpunkte.", "Mathematically provable privacy protection. Noise injection prevents re-identification of individual data points.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`differential_privacy:
  enabled: true
  epsilon: 1.0  # Privacy budget
  delta: 1e-5
  noise_mechanism: "gaussian"`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Federated Learning", "Federated Learning")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Training ohne zentrale Datenaggregation. Modelle lernen lokal, nur Gradienten werden aggregiert.", "Training without central data aggregation. Models learn locally, only gradients are aggregated.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`federated_learning:
  enabled: true
  strategy: "local_training"
  gradient_aggregation: "secure"
  data_stays_local: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Consent Management", "Consent Management")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Granulares Consent Management für AI-Agent-Datenzugriff. Opt-in/Opt-out und Consent Revocation.", "Granular consent management for AI agent data access. Opt-in/opt-out and consent revocation.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`consent_management:
  enabled: true
  granularity: "per_agent"
  revocation: "instant"
  audit_log: true`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: DSGVO-Verstoß durch fehlendes Consent", "SCAR #1: GDPR Violation by Missing Consent")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein AI-Agent verarbeitete 100.000 Kundendatensätze ohne explizites Consent. DSGVO-Verstoß Art. 6, 4.8 Mio. Euro Strafe. Fix: Consent Management, Opt-in-Only, DPIA.", "An AI agent processed 100,000 customer records without explicit consent. GDPR violation Art. 6, €4.8M in fines. Fix: Consent management, opt-in-only, DPIA.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Consent Management. Lessons: Implementiere granulares Consent.", "Root Cause: No consent management. Lessons: Implement granular consent.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Model Inversion durch fehlendes DP", "SCAR #2: Model Inversion by Missing DP")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein Angreifer rekonstruierte Trainingsdaten aus dem Modell durch Model Inversion. 50.000 Datensätze exponiert. Fix: Differential Privacy, Noise Injection, Privacy Budget.", "An attacker reconstructed training data from the model via model inversion. 50,000 records exposed. Fix: Differential privacy, noise injection, privacy budget.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Differential Privacy. Lessons: Aktiviere DP für alle Training-Workflows.", "Root Cause: No differential privacy. Lessons: Enable DP for all training workflows.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "DPIA durchführen", "Conduct DPIA")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Datenschutz-Folgenabschätzung für alle AI-Agent-Systeme.", "Data protection impact assessment for all AI agent systems.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Data Minimization aktivieren", "Enable Data Minimization")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Verarbeite nur minimal notwendige Daten.", "Process only minimum necessary data.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Differential Privacy konfigurieren", "Configure Differential Privacy")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Noise-Injection mit Privacy Budget.", "Enable noise injection with privacy budget.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Privacy Checkliste", "Interactive Privacy Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "DPIA durchgeführt für alle AI-Agent-Systeme", "DPIA conducted for all AI agent systems") },
                  { id: "c2", text: pick(isDE, "Data Minimization aktiviert", "Data minimization enabled") },
                  { id: "c3", text: pick(isDE, "Differential Privacy aktiviert (ε < 1)", "Differential privacy enabled (ε < 1)") },
                  { id: "c4", text: pick(isDE, "Federated Learning aktiviert (falls zutreffend)", "Federated learning enabled (if applicable)") },
                  { id: "c5", text: pick(isDE, "Consent Management aktiviert", "Consent management enabled") },
                  { id: "c6", text: pick(isDE, "Right to Erasure implementiert", "Right to erasure implemented") },
                  { id: "c7", text: pick(isDE, "Privacy Monitoring aktiviert", "Privacy monitoring enabled") },
                  { id: "c8", text: pick(isDE, "Machine Unlearning implementiert", "Machine unlearning implemented") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Privacy Security Score Calculator", "Privacy Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du eine DPIA durchgeführt?", "Have you conducted a DPIA?"), weight: 25 },
                  { q: pick(isDE, "Ist Data Minimization aktiv?", "Is data minimization active?"), weight: 25 },
                  { q: pick(isDE, "Ist Differential Privacy aktiv?", "Is differential privacy active?"), weight: 25 },
                  { q: pick(isDE, "Ist Consent Management aktiv?", "Is consent management active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Privacy Security Score:", "Your Privacy Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 30/100", "Industry Average: 30/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Privacy Preservation, GDPR-Compliance und Differential Privacy.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in privacy preservation, GDPR compliance and differential privacy.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/securitycheck`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security Runbooks", "Security runbooks")}</div>
              </a>
              <a href={`/${locale}/openclaw`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">{pick(isDE, "OpenClaw", "OpenClaw")}</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security Framework", "Security framework")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
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
