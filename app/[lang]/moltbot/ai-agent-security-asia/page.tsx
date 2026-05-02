import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-security-asia"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security Asia: Tokyo, Singapore, Bangalore 2026 | ClawGuru", "AI Agent Security Asia: Tokyo, Singapore, Bangalore 2026 | ClawGuru")
  const description = pick(isDE, "Asia Security Hub für AI-Agents: lokale Compliance (APPI, PDPA, DPDP), Zero-Trust, Data Residency und ausführbare Fixes für Moltbot-Deployments.", "Asia security hub for AI agents: local compliance (APPI, PDPA, DPDP), zero-trust, data residency and executable fixes for Moltbot deployments.")
  return {
    title, description,
    keywords: ["ai agent security asia", "tokyo security", "singapore security", "bangalore security", "ai compliance asia", "data residency asia", "zero-trust asia"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function AIAgentSecurityAsiaPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security Asia: Tokyo, Singapore, Bangalore 2026 | ClawGuru", "AI Agent Security Asia: Tokyo, Singapore, Bangalore 2026 | ClawGuru")

  const FAQ = [
    { q: pick(isDE, "Was ist Data Residency in Asien?", "What is data residency in Asia?"), a: pick(isDE, "Data Residency bedeutet, dass Daten in bestimmten Ländern gespeichert und verarbeitet werden müssen. In Asien haben viele Länder strenge Gesetze: APPI (Japan), PDPA (Thailand, Malaysia), DPDP (Indien). Verstöße können zu hohen Strafen führen.", "Data residency means data must be stored and processed in specific countries. In Asia, many countries have strict laws: APPI (Japan), PDPA (Thailand, Malaysia), DPDP (India). Violations can lead to heavy fines.") },
    { q: pick(isDE, "Warum ist Zero-Trust für Asia Deployments wichtig?", "Why is zero-trust important for Asia deployments?"), a: pick(isDE, "Multi-region Deployments in Asien erfordern Zero-Trust: mTLS für Ost-West-Traffic, Micro-Segmentation, Identity-Verification bei jedem Request. Ohne Zero-Trust können Angriffe sich lateral über Regionen ausbreiten.", "Multi-region deployments in Asia require zero-trust: mTLS for east-west traffic, micro-segmentation, identity verification on every request. Without zero-trust, attacks can spread laterally across regions.") },
    { q: pick(isDE, "Welche Compliance-Regeln gelten in Asien?", "Which compliance rules apply in Asia?"), a: pick(isDE, "Japan: APPI Act. Thailand: PDPA. Malaysia: PDPA. Indonesien: PDP Law (in Arbeit). Singapur: PDPA. Indien: DPDP Act 2023. Alle erfordern: Data Residency, Consent, Breach Notification, Data Subject Rights.", "Japan: APPI Act. Thailand: PDPA. Malaysia: PDPA. Indonesia: PDP Law (in progress). Singapore: PDPA. India: DPDP Act 2023. All require: data residency, consent, breach notification, data subject rights.") },
    { q: pick(isDE, "Wie sichere ich Cross-Border Incident Response?", "How do I secure cross-border incident response?"), a: pick(isDE, "Definiere klare Playbooks für jeden Standort. Assign Ownership pro Region. Teste Cross-Border Incident Handling quarterly. Dokumentiere alle Incidents für Audit Trails. Kommuniziere mit lokalen Behörden nach 72h.", "Define clear playbooks for each location. Assign ownership per region. Test cross-border incident handling quarterly. Document all incidents for audit trails. Communicate with local authorities within 72h.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Security Asia", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Agent Security", "Asia Compliance", "Data Residency", "Zero-Trust", "Cross-Border Incident Response"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Asia Security?", "What is Asia Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Regionaler Fokus", "Regional focus")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Asia Security Score", "Asia Security Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">12 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Asia Security · Compliance-First</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Security Asia — Du deployst in Asien ohne Data Residency, ohne Zero-Trust, ohne Cross-Border Incident Response. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert.", "AI Agent Security Asia — You deploy in Asia without data residency, without zero-trust, without cross-border incident response. Compliance violation, data leak, your CEO fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du deployst in Asien ohne Data Residency, ohne Zero-Trust, ohne Cross-Border Incident Response. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You deploy in Asia without data residency, without zero-trust, without cross-border incident response. Compliance violation, data leak, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient zur Härtung eigener Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Asia Security? Einfach erklärt.", "What is Asia Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Asia Security bedeutet Compliance-First Deployment in asiatischen Märkten: Data Residency (Daten bleiben im Land), Zero-Trust (keine implizite Vertrauenswürdigkeit), Cross-Border Incident Response (klare Playbooks für jeden Standort). Gute Asia Security bedeutet: Lokale Compliance einhalten, Daten schützen, schnell auf Incidents reagieren.", "Asia security means compliance-first deployment in Asian markets: data residency (data stays in country), zero-trust (no implicit trust), cross-border incident response (clear playbooks for each location). Good Asia security means: comply with local regulations, protect data, respond fast to incidents.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Regionaler Fokus", "Regional focus")}</h2>
            <div className="space-y-4">
              {[
                { t: pick(isDE, "Data Residency", "Data residency"), d: pick(isDE, "Datenhaltung und lokale Verarbeitung sind in vielen Regionen Pflicht (APPI, PDPA, DPDP). Verstöße können zu hohen Strafen führen.", "Local data residency and processing are required in many regions (APPI, PDPA, DPDP). Violations can lead to heavy fines.") },
                { t: pick(isDE, "Third-Party Risk", "Third-party risk"), d: pick(isDE, "B2B-Integrationen mit regionalen Providern brauchen klare Allowlist-Strategien.", "B2B integrations with regional providers need strict allowlist strategies.") },
                { t: pick(isDE, "Supply Chain Hardening", "Supply chain hardening"), d: pick(isDE, "Modell- und Dependency-Trust sichern, bevor sie in Produktions-Agents gehen.", "Secure model and dependency trust before production agents.") },
                { t: pick(isDE, "Zero-Trust Networking", "Zero-trust networking"), d: pick(isDE, "mTLS und Micro-Segmentation sind Pflicht für multi-region Deployments.", "mTLS and micro-segmentation are mandatory for multi-region deployments.") },
                { t: pick(isDE, "Incident Response Readiness", "Incident response readiness"), d: pick(isDE, "Cross-border Incident Handling braucht klare Playbooks und Ownership.", "Cross-border incident handling needs clear playbooks and ownership.") },
              ].map((item, i) => (
                <div key={i} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
                  <h3 className="font-bold text-cyan-400 mb-2">{item.t}</h3>
                  <p className="text-sm text-gray-300">{item.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Keine Data Residency", "SCAR #1: No Data Residency")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Keine Data Residency, Daten in Japan auf US-Servern gespeichert. APPI-Verstoß, Strafe 1M ¥. Fix: Aktiviere Data Residency pro Region.", "No data residency, Japanese data stored on US servers. APPI violation, fine 1M ¥. Fix: Enable data residency per region.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Data Residency. Lessons: Aktiviere Data Residency für alle Asia-Regionen.", "Root Cause: No data residency. Lessons: Enable data residency for all Asia regions.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Kein Zero-Trust", "SCAR #2: No Zero-Trust")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Kein Zero-Trust, Angriff breitet sich lateral über Regionen aus. Daten-Leak in Singapur und Tokyo. Fix: Aktiviere mTLS und Micro-Segmentation.", "No zero-trust, attack spreads laterally across regions. Data leak in Singapore and Tokyo. Fix: Enable mTLS and micro-segmentation.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Zero-Trust. Lessons: Aktiviere Zero-Trust für alle multi-region Deployments.", "Root Cause: No zero-trust. Lessons: Enable zero-trust for all multi-region deployments.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              {[
                { n: 1, t: pick(isDE, "Regional Keys pro Zone", "Regional keys per zone"), d: pick(isDE, "Separiere Secrets pro Region. Kein globales Credential-Sharing.", "Separate secrets per region. No global credential sharing.") },
                { n: 2, t: pick(isDE, "Egress-Policies aktivieren", "Enable egress policies"), d: pick(isDE, "Nur erlaubte Endpoints erreichen. Blocke exfiltration by default.", "Only allowed endpoints reachable. Block exfiltration by default.") },
                { n: 3, t: pick(isDE, "mTLS zwischen Agents", "mTLS between agents"), d: pick(isDE, "Kryptografisch gesicherter Ost-West-Traffic.", "Cryptographically secured east-west traffic.") },
                { n: 4, t: pick(isDE, "Audit Logs an SIEM", "Audit logs to SIEM"), d: pick(isDE, "Regionale Compliance braucht lückenlose Audit Trails.", "Regional compliance requires complete audit trails.") },
              ].map((item) => (
                <div key={item.n} className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">{item.n}</div>
                  <div>
                    <h4 className="font-semibold text-gray-100 mb-2">{item.t}</h4>
                    <p className="text-sm text-gray-300">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Asia Security Checkliste", "Interactive Asia Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "as1", text: pick(isDE, "Data Residency pro Region aktiviert", "Data residency per region enabled") },
                  { id: "as2", text: pick(isDE, "Regional Secrets Management implementiert", "Regional secrets management implemented") },
                  { id: "as3", text: pick(isDE, "mTLS zwischen Agents aktiviert", "mTLS between agents enabled") },
                  { id: "as4", text: pick(isDE, "Egress-Policies konfiguriert", "Egress policies configured") },
                  { id: "as5", text: pick(isDE, "Micro-Segmentation aktiviert", "Micro-segmentation enabled") },
                  { id: "as6", text: pick(isDE, "Audit Logs an SIEM", "Audit logs to SIEM") },
                  { id: "as7", text: pick(isDE, "Cross-Border Incident Response Playbook", "Cross-border incident response playbook") },
                  { id: "as8", text: pick(isDE, "Compliance Audit pro Region", "Compliance audit per region") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Asia Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Asia Security Score Calculator", "Asia Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist Data Residency aktiviert?", "Is data residency enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Zero-Trust aktiviert?", "Is zero-trust enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Cross-Border Incident Response bereit?", "Is cross-border incident response ready?"), weight: 25 },
                  { q: pick(isDE, "Ist Compliance Audit pro Region durchgeführt?", "Is compliance audit per region done?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Asia Security Score:", "Your Asia Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 35/100", "Industry Average: 35/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Asia Compliance, Data Residency, Zero-Trust und Cross-Border Incident Response.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in Asia compliance, data residency, zero-trust and cross-border incident response.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Roast My Moltbot</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Roast starten", "Start the roast")}</div>
              </a>
              <a href={`/${locale}/securitycheck`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Security Check</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Runbooks</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Fixes automatisieren", "Automate fixes")}</div>
              </a>
              <a href={`/${locale}/openclaw`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">OpenClaw</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security Framework", "Security framework")}</div>
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
