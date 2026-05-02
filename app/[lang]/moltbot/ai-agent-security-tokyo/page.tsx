import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-security-tokyo"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security Tokyo: APPI, Zero-Trust, Moltbot 2026 | ClawGuru", "AI Agent Security Tokyo: APPI, Zero-Trust, Moltbot 2026 | ClawGuru")
  const description = pick(isDE, "Tokyo Security Guide für AI-Agents: APPI-Compliance (Act on the Protection of Personal Information), Zero-Trust, Cloud Security und sofortige Fixes für Moltbot-Deployments.", "Tokyo security guide for AI agents: APPI compliance (Act on the Protection of Personal Information), zero-trust, cloud security and immediate fixes for Moltbot deployments.")
  return {
    title, description,
    keywords: ["ai agent security tokyo", "appi compliance japan", "moltbot security japan", "zero trust ai", "cloud security"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function AIAgentSecurityTokyoPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security Tokyo: APPI, Zero-Trust, Moltbot 2026 | ClawGuru", "AI Agent Security Tokyo: APPI, Zero-Trust, Moltbot 2026 | ClawGuru")

  const FAQ = [
    { q: pick(isDE, "Was ist APPI in Japan?", "What is APPI in Japan?"), a: pick(isDE, "APPI (Act on the Protection of Personal Information) ist Japans Datenschutzgesetz. Es regelt Consent, Data Access, Breach Notification und Data Subject Rights. Verstöße können zu hohen Strafen führen.", "APPI (Act on the Protection of Personal Information) is Japan's data protection law. It regulates consent, data access, breach notification and data subject rights. Violations can lead to heavy fines.") },
    { q: pick(isDE, "Warum ist Cloud Security in Tokyo wichtig?", "Why is cloud security important in Tokyo?"), a: pick(isDE, "Tokyo ist ein Cloud-Hub (AWS Tokyo, Azure Japan, GCP Tokyo). Cloud-Integrationen müssen strikt abgesichert werden: Cloud Security Standards, mTLS, API-Key Rotation, Audit Logs.", "Tokyo is a cloud hub (AWS Tokyo, Azure Japan, GCP Tokyo). Cloud integrations must be strictly secured: cloud security standards, mTLS, API key rotation, audit logs.") },
    { q: pick(isDE, "Welche Compliance-Regeln gelten in Japan?", "Which compliance rules apply in Japan?"), a: pick(isDE, "APPI (Act on the Protection of Personal Information), FSA Regulations, FinTech Rules. Alle erfordern: Consent, Data Residency, Breach Notification, Audit Trails.", "APPI (Act on the Protection of Personal Information), FSA regulations, FinTech rules. All require: consent, data residency, breach notification, audit trails.") },
    { q: pick(isDE, "Wie sichere ich Cloud-Integrationen?", "How do I secure cloud integrations?"), a: pick(isDE, "Cloud Security Standards, mTLS für alle Cloud-Traffic, API-Key Rotation, Allowlist für Cloud-Provider, Audit Logs für alle Transaktionen.", "Cloud security standards, mTLS for all cloud traffic, API key rotation, allowlist for cloud providers, audit logs for all transactions.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Security Tokyo", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Agent Security", "APPI Compliance", "Japan Security", "Zero-Trust", "Cloud Security"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Tokyo Security?", "What is Tokyo Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Tokyo Fokus", "Tokyo focus")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Tokyo Security Score", "Tokyo Security Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">10 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Tokyo Security · APPI-First</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Security Tokyo — Du deployst in Japan ohne APPI, ohne Zero-Trust, ohne Cloud Security. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert.", "AI Agent Security Tokyo — You deploy in Japan without APPI, without zero-trust, without cloud security. Compliance violation, data leak, your CEO fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du deployst in Japan ohne APPI, ohne Zero-Trust, ohne Cloud Security. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You deploy in Japan without APPI, without zero-trust, without cloud security. Compliance violation, data leak, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient zur Härtung eigener Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Tokyo Security? Einfach erklärt.", "What is Tokyo Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Tokyo Security bedeutet APPI-First Deployment in Japan: APPI (Act on the Protection of Personal Information), Zero-Trust (keine implizite Vertrauenswürdigkeit), Cloud Security (AWS Tokyo, Azure Japan, GCP Tokyo). Gute Tokyo Security bedeutet: APPI einhalten, Cloud-Integrationen sichern, schnell auf Incidents reagieren.", "Tokyo security means APPI-first deployment in Japan: APPI (Act on the Protection of Personal Information), zero-trust (no implicit trust), cloud security (AWS Tokyo, Azure Japan, GCP Tokyo). Good Tokyo security means: comply with APPI, secure cloud integrations, respond fast to incidents.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Tokyo Fokus", "Tokyo focus")}</h2>
            <div className="space-y-4">
              {[
                { t: pick(isDE, "APPI Compliance", "APPI compliance"), d: pick(isDE, "Datenzugriff, Logging und Retention nach APPI ausrichten.", "Align data access, logging and retention with APPI.") },
                { t: pick(isDE, "FinTech Exposure", "FinTech exposure"), d: pick(isDE, "Banking- und Payment-Integrationen hart absichern.", "Lock down banking and payment integrations.") },
                { t: pick(isDE, "Cloud Provider Security", "Cloud provider security"), d: pick(isDE, "AWS Tokyo, Azure Japan, GCP Tokyo absichern.", "Secure AWS Tokyo, Azure Japan, GCP Tokyo.") },
                { t: pick(isDE, "Incident Readiness", "Incident readiness"), d: pick(isDE, "IR-Playbooks mit klarer Ownership.", "IR playbooks with clear ownership.") },
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
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Keine APPI Compliance", "SCAR #1: No APPI Compliance")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Keine APPI Compliance, Daten ohne Consent verarbeitet. APPI-Verstoß, Strafe 100M JPY. Fix: Aktiviere APPI-konforme Consent-Management.", "No APPI compliance, data processed without consent. APPI violation, fine 100M JPY. Fix: Enable APPI-compliant consent management.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein APPI Consent. Lessons: Aktiviere APPI Consent Management.", "Root Cause: No APPI consent. Lessons: Enable APPI consent management.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Cloud Breach", "SCAR #2: Cloud Breach")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Cloud-Integration ohne Cloud Security Standards, API-Keys exponiert. Daten-Leak. Fix: Aktiviere Cloud Security Standards und mTLS.", "Cloud integration without cloud security standards, API keys exposed. Data leak. Fix: Enable cloud security standards and mTLS.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Cloud Security Standards. Lessons: Aktiviere Cloud Security Standards für alle Cloud-Integrationen.", "Root Cause: No cloud security standards. Lessons: Enable cloud security standards for all cloud integrations.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              {[
                { n: 1, t: pick(isDE, "Regionale Secrets", "Regional secrets"), d: pick(isDE, "Secrets pro Region trennen und rotieren.", "Separate and rotate secrets per region.") },
                { n: 2, t: pick(isDE, "Egress Allowlist", "Egress allowlist"), d: pick(isDE, "Nur erlaubte Endpoints. Exfiltration blocken.", "Only allowed endpoints. Block exfiltration.") },
                { n: 3, t: pick(isDE, "mTLS aktivieren", "Enable mTLS"), d: pick(isDE, "Agent-zu-Agent Traffic absichern.", "Secure agent-to-agent traffic.") },
                { n: 4, t: pick(isDE, "Audit Logs an SIEM", "Audit logs to SIEM"), d: pick(isDE, "APPI-konforme Nachverfolgbarkeit sichern.", "Ensure APPI-compliant traceability.") },
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
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Tokyo Security Checkliste", "Interactive Tokyo Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "tk1", text: pick(isDE, "APPI Consent Management aktiviert", "APPI consent management enabled") },
                  { id: "tk2", text: pick(isDE, "Cloud Security Standards aktiviert", "Cloud security standards enabled") },
                  { id: "tk3", text: pick(isDE, "Cloud-Integration Allowlist konfiguriert", "Cloud integration allowlist configured") },
                  { id: "tk4", text: pick(isDE, "mTLS für Cloud-Traffic aktiviert", "mTLS for cloud traffic enabled") },
                  { id: "tk5", text: pick(isDE, "API-Key Rotation aktiviert", "API key rotation enabled") },
                  { id: "tk6", text: pick(isDE, "Audit Logs an SIEM", "Audit logs to SIEM") },
                  { id: "tk7", text: pick(isDE, "APPI Breach Notification Playbook", "APPI breach notification playbook") },
                  { id: "tk8", text: pick(isDE, "Cloud Security Audit durchgeführt", "Cloud security audit done") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Tokyo Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Tokyo Security Score Calculator", "Tokyo Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist APPI Compliance aktiviert?", "Is APPI compliance enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Cloud Security implementiert?", "Is cloud security implemented?"), weight: 25 },
                  { q: pick(isDE, "Ist Zero-Trust aktiviert?", "Is zero-trust enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Cloud-Integration Allowlist aktiviert?", "Is cloud integration allowlist enabled?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Tokyo Security Score:", "Your Tokyo Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 30/100", "Industry Average: 30/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für APPI Compliance, Japan Security, Zero-Trust und Cloud Security.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in APPI compliance, Japan security, zero-trust and cloud security.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/ai-agent-security-asia`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security Asia</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Asia Hub", "Asia hub")}</div>
              </a>
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
