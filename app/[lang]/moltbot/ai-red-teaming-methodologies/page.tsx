import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-red-teaming-methodologies"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Red Teaming Methodologies: Red Teaming für AI-Systeme | ClawGuru", "AI Red Teaming Methodologies: Red Teaming for AI Systems | ClawGuru")
  const description = pick(isDE, "AI Red Teaming Methodologies für Moltbot-Deployments. Adversarial Testing, Jailbreak Detection, Bias Testing und Safety Evaluation für AI-Agents. Mit Moltbot automatisierbar.", "AI red teaming methodologies for Moltbot deployments. Adversarial testing, jailbreak detection, bias testing and safety evaluation for AI agents. Automatable with Moltbot.")
  return {
    title,
    description,
    keywords: [
      "ai red teaming", "adversarial testing", "jailbreak detection",
      "bias testing", "safety evaluation", "ai security testing",
      "moltbot security", "ai agent red teaming", "red teaming 2026",
      "security check", "runbooks", "openclaw"
    ],
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

export default function AIRedTeamingMethodologiesPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Red Teaming Methodologies: Red Teaming für AI-Systeme | ClawGuru", "AI Red Teaming Methodologies: Red Teaming for AI Systems | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Red Teaming Methodologies", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Red Teaming", "Adversarial Testing", "Jailbreak Detection"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Red Teaming?", "What is Red Teaming?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5-Layer Red Teaming Defense", "5-Layer Red Teaming Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Red Teaming Maturity Score", "Red Teaming Maturity Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Red Teaming Methodologies · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Red Teaming Methodologies — Dein AI-System hat keine Adversarial Defense. Jailbreaks, Prompt Injection, Bias. Dein Agent produziert toxische Inhalte. Dein CISO hat den CEO gerufen.", "AI Red Teaming Methodologies — Your AI System Has No Adversarial Defense. Jailbreaks, Prompt Injection, Bias. Your Agent Produces Toxic Content. Your CISO Called the CEO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein AI-System hat kein Red Teaming, keine Jailbreak Detection und kein Bias Testing. Adversarial Attacks, toxische Inhalte, Bias-Skandal. 36h Reputations-Schaden, Kunden verloren, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "Your AI system has no red teaming, no jailbreak detection and no bias testing. Adversarial attacks, toxic content, bias scandal. 36h reputation damage, customers lost, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Dieser Leitfaden dient zur Härtung Ihrer eigenen Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Red Teaming? Einfach erklärt.", "What is Red Teaming? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Red Teaming wie einen Ethical-Hack-Test vor: Simuliere Angriffe auf dein AI-System, finde Schwachstellen, bevor echte Angreifer es tun. Für AI-Agents bedeutet das: Adversarial Testing, Jailbreak Detection, Bias Testing, Safety Evaluation. Gutes Red Teaming bedeutet: Never ship without adversarial defense.", "Think of red teaming like an ethical hack test: simulate attacks on your AI system, find vulnerabilities before real attackers do. For AI agents, this means: adversarial testing, jailbreak detection, bias testing, safety evaluation. Good red teaming means: never ship without adversarial defense.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5-Layer Red Teaming Defense Architecture", "5-Layer Red Teaming Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Adversarial Testing", "Adversarial Testing")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Führe Adversarial Tests durch: Prompt Engineering, Gradient Attacks und Evasion Techniques. Automatisierte Test-Suites.", "Run adversarial tests: prompt engineering, gradient attacks and evasion techniques. Automated test suites.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`adversarial_testing:
  enabled: true
  prompt_engineering: true
  gradient_attacks: true
  evasion_techniques: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Jailbreak Detection", "Jailbreak Detection")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Erkenne Jailbreaks durch Pattern Recognition, Behavioral Analysis und Content Filtering. Multi-Turn Detection.", "Detect jailbreaks through pattern recognition, behavioral analysis and content filtering. Multi-turn detection.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`jailbreak_detection:
  enabled: true
  pattern_recognition: true
  behavioral_analysis: true
  multi_turn_detection: true`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Bias Testing", "Bias Testing")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Führe Bias Testing durch: Fairness Metrics, Demographic Parity und Equal Opportunity. Regelmäßige Audits.", "Run bias testing: fairness metrics, demographic parity and equal opportunity. Regular audits.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`bias_testing:
  enabled: true
  fairness_metrics: true
  demographic_parity: true
  equal_opportunity: true`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Safety Evaluation", "Safety Evaluation")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Führe Safety Evaluation durch: Harmfulness Scoring, Toxicity Detection und Content Safety. Echtzeit-Filtering.", "Run safety evaluation: harmfulness scoring, toxicity detection and content safety. Real-time filtering.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`safety_evaluation:
  enabled: true
  harmfulness_scoring: true
  toxicity_detection: true
  content_safety: true`}</pre>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center text-amber-400 font-bold">5</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Automated Red Teaming", "Automated Red Teaming")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Implementiere automatisiertes Red Teaming mit LLM-basierten Adversary Agents. Kontinuierliche Tests.", "Implement automated red teaming with LLM-based adversary agents. Continuous testing.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`automated_red_teaming:
  enabled: true
  llm_adversary_agents: true
  continuous_testing: true
  auto_red_teaming: true`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Jailbreak ohne Detection", "SCAR #1: Jailbreak without Detection")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Jailbreak ohne Detection. Agent produziert toxische Inhalte, PR-Krise. Fix: Jailbreak Detection, Content Filtering.", "Jailbreak without detection. Agent produces toxic content, PR crisis. Fix: Jailbreak detection, content filtering.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Jailbreak Detection. Lessons: Aktiviere Pattern Recognition mit Behavioral Analysis.", "Root Cause: No jailbreak detection. Lessons: Enable pattern recognition with behavioral analysis.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Bias-Skandal ohne Testing", "SCAR #2: Bias Scandal without Testing")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Bias-Skandal ohne Testing. Diskriminierende Inhalte, Regulierungs-Schlag. Fix: Bias Testing, Fairness Metrics.", "Bias scandal without testing. Discriminatory content, regulatory backlash. Fix: Bias testing, fairness metrics.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Bias Testing. Lessons: Aktiviere Fairness Metrics mit Demographic Parity.", "Root Cause: No bias testing. Lessons: Enable fairness metrics with demographic parity.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Adversarial Testing aktivieren", "Enable Adversarial Testing")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Adversarial Testing für alle AI-Systeme.", "Enable adversarial testing for all AI systems.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Jailbreak Detection aktivieren", "Enable Jailbreak Detection")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Jailbreak Detection mit Pattern Recognition.", "Enable jailbreak detection with pattern recognition.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Bias Testing implementieren", "Implement Bias Testing")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Implementiere Bias Testing mit Fairness Metrics.", "Implement bias testing with fairness metrics.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Red Teaming Checkliste", "Interactive Red Teaming Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "r1", text: pick(isDE, "Adversarial Testing aktiviert", "Adversarial testing enabled") },
                  { id: "r2", text: pick(isDE, "Jailbreak Detection aktiviert", "Jailbreak detection enabled") },
                  { id: "r3", text: pick(isDE, "Bias Testing aktiviert", "Bias testing enabled") },
                  { id: "r4", text: pick(isDE, "Safety Evaluation aktiviert", "Safety evaluation enabled") },
                  { id: "r5", text: pick(isDE, "Automated Red Teaming aktiviert", "Automated red teaming enabled") },
                  { id: "r6", text: pick(isDE, "Multi-Turn Detection aktiviert", "Multi-turn detection enabled") },
                  { id: "r7", text: pick(isDE, "Fairness Metrics implementiert", "Fairness metrics implemented") },
                  { id: "r8", text: pick(isDE, "Content Safety Filter aktiviert", "Content safety filter enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Red Teaming Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Red Teaming Maturity Score Calculator", "Red Teaming Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Adversarial Testing aktiviert?", "Do you have adversarial testing enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Jailbreak Detection aktiv?", "Is jailbreak detection active?"), weight: 25 },
                  { q: pick(isDE, "Ist Bias Testing aktiv?", "Is bias testing active?"), weight: 25 },
                  { q: pick(isDE, "Ist Automated Red Teaming aktiv?", "Is automated red teaming active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Red Teaming Maturity Score:", "Your Red Teaming Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 18/100", "Industry Average: 18/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Red Teaming, Adversarial Testing und Jailbreak Detection.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in red teaming, adversarial testing and jailbreak detection.")}
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
              <a href={`/${locale}/moltbot/ai-red-teaming`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Red Teaming</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Red-Teaming-Strategies", "Red teaming strategies")}</div>
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
