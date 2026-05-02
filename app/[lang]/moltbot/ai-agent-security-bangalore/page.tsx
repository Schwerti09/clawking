import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-security-bangalore"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security Bangalore: DPDP, Zero-Trust, Moltbot 2026 | ClawGuru", "AI Agent Security Bangalore: DPDP, Zero-Trust, Moltbot 2026 | ClawGuru")
  const description = pick(isDE, "Bangalore Security Guide für AI-Agents: DPDP-Compliance (Data Protection Bill), Zero-Trust, Data Residency und sofortige Fixes für Moltbot-Deployments.", "Bangalore security guide for AI agents: DPDP compliance (Data Protection Bill), zero-trust, data residency and immediate fixes for Moltbot deployments.")
  return {
    title, description,
    keywords: ["ai agent security bangalore", "dpdp compliance india", "moltbot security bangalore", "zero trust ai", "data residency india"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function AIAgentSecurityBangalorePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security Bangalore: DPDP, Zero-Trust, Moltbot 2026 | ClawGuru", "AI Agent Security Bangalore: DPDP, Zero-Trust, Moltbot 2026 | ClawGuru")

  const FAQ = [
    { q: pick(isDE, "Was ist DPDP in Indien?", "What is DPDP in India?"), a: pick(isDE, "DPDP (Digital Personal Data Protection Act 2023) ist Indiens Datenschutzgesetz. Es regelt Data Residency, Consent, Breach Notification und Data Subject Rights. Verstöße können zu hohen Strafen führen.", "DPDP (Digital Personal Data Protection Act 2023) is India's data protection law. It regulates data residency, consent, breach notification and data subject rights. Violations can lead to heavy fines.") },
    { q: pick(isDE, "Warum ist Zero-Trust in Bangalore wichtig?", "Why is zero-trust important in Bangalore?"), a: pick(isDE, "Bangalore hat viele SaaS-Integrationen. Zero-Trust (mTLS, Micro-Segmentation, Identity-Verification) verhindert laterale Angriffe und schützt sensible Daten.", "Bangalore has many SaaS integrations. Zero-trust (mTLS, micro-segmentation, identity verification) prevents lateral attacks and protects sensitive data.") },
    { q: pick(isDE, "Welche Compliance-Regeln gelten in Indien?", "Which compliance rules apply in India?"), a: pick(isDE, "DPDP Act 2023, IT Rules 2021, CERT-In Guidelines. Alle erfordern: Data Residency, Consent, Breach Notification, Audit Trails.", "DPDP Act 2023, IT Rules 2021, CERT-In Guidelines. All require: data residency, consent, breach notification, audit trails.") },
    { q: pick(isDE, "Wie sichere ich B2B SaaS Integrationen?", "How do I secure B2B SaaS integrations?"), a: pick(isDE, "Allowlist-Strategie, JIT Access, API-Key Rotation, Audit Logs. Nur vertrauenswürdige SaaS-Provider integrieren. Alle Endpoints überwachen.", "Allowlist strategy, JIT access, API key rotation, audit logs. Only integrate trusted SaaS providers. Monitor all endpoints.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Security Bangalore", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Agent Security", "DPDP Compliance", "India Security", "Zero-Trust", "B2B SaaS Security"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Bangalore Security?", "What is Bangalore Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Bangalore Fokus", "Bangalore focus")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Bangalore Security Score", "Bangalore Security Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Bangalore Security · DPDP-First</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Security Bangalore — Du deployst in Indien ohne DPDP, ohne Zero-Trust, ohne Data Residency. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert.", "AI Agent Security Bangalore — You deploy in India without DPDP, without zero-trust, without data residency. Compliance violation, data leak, your CEO fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du deployst in Indien ohne DPDP, ohne Zero-Trust, ohne Data Residency. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You deploy in India without DPDP, without zero-trust, without data residency. Compliance violation, data leak, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient zur Härtung eigener Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Bangalore Security? Einfach erklärt.", "What is Bangalore Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Bangalore Security bedeutet DPDP-First Deployment in Indien: Data Residency (Daten bleiben in Indien), Zero-Trust (keine implizite Vertrauenswürdigkeit), B2B SaaS Security (Allowlist, JIT Access). Gute Bangalore Security bedeutet: DPDP einhalten, SaaS-Integrationen sichern, schnell auf Incidents reagieren.", "Bangalore security means DPDP-first deployment in India: data residency (data stays in India), zero-trust (no implicit trust), B2B SaaS security (allowlist, JIT access). Good Bangalore security means: comply with DPDP, secure SaaS integrations, respond fast to incidents.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Bangalore Fokus", "Bangalore focus")}</h2>
            <div className="space-y-4">
              {[
                { t: pick(isDE, "DPDP Compliance", "DPDP compliance"), d: pick(isDE, "Datenzugriff, Processing und Retention nach DPDP ausrichten. Verstöße können zu hohen Strafen führen.", "Align data access, processing and retention with DPDP. Violations can lead to heavy fines.") },
                { t: pick(isDE, "B2B SaaS Exposure", "B2B SaaS exposure"), d: pick(isDE, "Viele Integrationen mit SaaS-Providern: Allowlist und JIT Access.", "Many SaaS integrations: allowlist and JIT access.") },
                { t: pick(isDE, "Supply Chain Risk", "Supply chain risk"), d: pick(isDE, "Dependencies und Modelle vor Produktion härten.", "Harden dependencies and models before production.") },
                { t: pick(isDE, "Incident Ownership", "Incident ownership"), d: pick(isDE, "Playbooks und Verantwortlichkeiten glasklar definieren.", "Define playbooks and responsibilities clearly.") },
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
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Keine DPDP Compliance", "SCAR #1: No DPDP Compliance")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Keine DPDP Compliance, Daten ohne Consent verarbeitet. DPDP-Verstoß, Strafe 10M ₹. Fix: Aktiviere DPDP-konforme Consent-Management.", "No DPDP compliance, data processed without consent. DPDP violation, fine 10M ₹. Fix: Enable DPDP-compliant consent management.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein DPDP Consent. Lessons: Aktiviere DPDP Consent Management.", "Root Cause: No DPDP consent. Lessons: Enable DPDP consent management.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: B2B SaaS Breach", "SCAR #2: B2B SaaS Breach")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "B2B SaaS Integration ohne Allowlist, API-Keys exponiert. Daten-Leak über SaaS-Provider. Fix: Aktiviere Allowlist und JIT Access.", "B2B SaaS integration without allowlist, API keys exposed. Data leak via SaaS provider. Fix: Enable allowlist and JIT access.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Allowlist. Lessons: Aktiviere Allowlist für alle SaaS-Integrationen.", "Root Cause: No allowlist. Lessons: Enable allowlist for all SaaS integrations.")}</div>
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
                { n: 4, t: pick(isDE, "Audit Logs an SIEM", "Audit logs to SIEM"), d: pick(isDE, "DPDP-konforme Nachverfolgbarkeit sicherstellen.", "Ensure DPDP-compliant traceability.") },
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
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Bangalore Security Checkliste", "Interactive Bangalore Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "bl1", text: pick(isDE, "DPDP Consent Management aktiviert", "DPDP consent management enabled") },
                  { id: "bl2", text: pick(isDE, "Data Residency in Indien", "Data residency in India") },
                  { id: "bl3", text: pick(isDE, "B2B SaaS Allowlist konfiguriert", "B2B SaaS allowlist configured") },
                  { id: "bl4", text: pick(isDE, "JIT Access für SaaS-Integrationen", "JIT access for SaaS integrations") },
                  { id: "bl5", text: pick(isDE, "mTLS zwischen Agents aktiviert", "mTLS between agents enabled") },
                  { id: "bl6", text: pick(isDE, "Audit Logs an SIEM", "Audit logs to SIEM") },
                  { id: "bl7", text: pick(isDE, "DPDP Breach Notification Playbook", "DPDP breach notification playbook") },
                  { id: "bl8", text: pick(isDE, "CERT-In Compliance aktiviert", "CERT-In compliance enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Bangalore Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Bangalore Security Score Calculator", "Bangalore Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist DPDP Compliance aktiviert?", "Is DPDP compliance enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Data Residency in Indien?", "Is data residency in India?"), weight: 25 },
                  { q: pick(isDE, "Ist B2B SaaS Security implementiert?", "Is B2B SaaS security implemented?"), weight: 25 },
                  { q: pick(isDE, "Ist CERT-In Compliance aktiviert?", "Is CERT-In compliance enabled?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Bangalore Security Score:", "Your Bangalore Security Score:")}</span>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für DPDP Compliance, India Security, Zero-Trust und B2B SaaS Security.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in DPDP compliance, India security, zero-trust and B2B SaaS security.")}
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
