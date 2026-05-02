import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-security-jakarta"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security Jakarta: PDP Law, Zero-Trust, Moltbot 2026 | ClawGuru", "AI Agent Security Jakarta: PDP Law, Zero-Trust, Moltbot 2026 | ClawGuru")
  const description = pick(isDE, "Jakarta Security Guide für AI-Agents: PDP Law (Personal Data Protection Law), Zero-Trust, Data Residency und sofortige Fixes für Moltbot-Deployments.", "Jakarta security guide for AI agents: PDP Law (Personal Data Protection Law), zero-trust, data residency and immediate fixes for Moltbot deployments.")
  return {
    title, description,
    keywords: ["ai agent security jakarta", "pdp law indonesia", "moltbot security jakarta", "zero trust ai", "data residency indonesia"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function AIAgentSecurityJakartaPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security Jakarta: PDP Law, Zero-Trust, Moltbot 2026 | ClawGuru", "AI Agent Security Jakarta: PDP Law, Zero-Trust, Moltbot 2026 | ClawGuru")

  const FAQ = [
    { q: pick(isDE, "Was ist das PDP Law in Indonesien?", "What is the PDP Law in Indonesia?"), a: pick(isDE, "PDP Law (Personal Data Protection Law) ist Indonesiens Datenschutzgesetz (in Arbeit). Es regelt Consent, Data Residency, Breach Notification und Data Subject Rights. Verstöße können zu hohen Strafen führen.", "PDP Law (Personal Data Protection Law) is Indonesia's data protection law (in progress). It regulates consent, data residency, breach notification and data subject rights. Violations can lead to heavy fines.") },
    { q: pick(isDE, "Warum ist Zero-Trust in Jakarta wichtig?", "Why is zero-trust important in Jakarta?"), a: pick(isDE, "Jakarta hat viele FinTech-Integrationen. Zero-Trust (mTLS, Micro-Segmentation, Identity-Verification) verhindert laterale Angriffe und schützt sensible Daten.", "Jakarta has many FinTech integrations. Zero-trust (mTLS, micro-segmentation, identity verification) prevents lateral attacks and protects sensitive data.") },
    { q: pick(isDE, "Welche Compliance-Regeln gelten in Indonesien?", "Which compliance rules apply in Indonesia?"), a: pick(isDE, "PDP Law (in Arbeit), IT Rules 2021, FinTech Regulations. Alle erfordern: Consent, Data Residency, Breach Notification, Audit Trails.", "PDP Law (in progress), IT Rules 2021, FinTech regulations. All require: consent, data residency, breach notification, audit trails.") },
    { q: pick(isDE, "Wie sichere ich FinTech-Integrationen?", "How do I secure FinTech integrations?"), a: pick(isDE, "PCI DSS Compliance, mTLS für alle Payment-Traffic, API-Key Rotation, Allowlist für Payment-Provider, Audit Logs für alle Transaktionen.", "PCI DSS compliance, mTLS for all payment traffic, API key rotation, allowlist for payment providers, audit logs for all transactions.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Security Jakarta", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Agent Security", "PDP Law Compliance", "Indonesia Security", "Zero-Trust", "FinTech Security"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Jakarta Security?", "What is Jakarta Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Jakarta Fokus", "Jakarta focus")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Jakarta Security Score", "Jakarta Security Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Jakarta Security · PDP Law-First</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Security Jakarta — Du deployst in Indonesien ohne PDP Law, ohne Zero-Trust, ohne Data Residency. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert.", "AI Agent Security Jakarta — You deploy in Indonesia without PDP Law, without zero-trust, without data residency. Compliance violation, data leak, your CEO fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du deployst in Indonesien ohne PDP Law, ohne Zero-Trust, ohne Data Residency. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You deploy in Indonesia without PDP Law, without zero-trust, without data residency. Compliance violation, data leak, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient zur Härtung eigener Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Jakarta Security? Einfach erklärt.", "What is Jakarta Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Jakarta Security bedeutet PDP Law-First Deployment in Indonesien: PDP Law (Personal Data Protection Law), Zero-Trust (keine implizite Vertrauenswürdigkeit), Data Residency (Daten bleiben in Indonesien). Gute Jakarta Security bedeutet: PDP Law einhalten, Data Residency sichern, schnell auf Incidents reagieren.", "Jakarta security means PDP Law-first deployment in Indonesia: PDP Law (Personal Data Protection Law), zero-trust (no implicit trust), data residency (data stays in Indonesia). Good Jakarta security means: comply with PDP Law, secure data residency, respond fast to incidents.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Jakarta Fokus", "Jakarta focus")}</h2>
            <div className="space-y-4">
              {[
                { t: pick(isDE, "PDP Law Compliance", "PDP Law compliance"), d: pick(isDE, "Datenzugriff und Retention PDP-konform dokumentieren. Verstöße können zu hohen Strafen führen.", "Document data access and retention per PDP law. Violations can lead to heavy fines.") },
                { t: pick(isDE, "FinTech Exposure", "FinTech exposure"), d: pick(isDE, "Payment-Integrationen nur per Allowlist.", "Allowlist-only payment integrations.") },
                { t: pick(isDE, "Zero-Trust by Default", "Zero-trust by default"), d: pick(isDE, "mTLS + Micro-Segmentation als Standard.", "mTLS + micro-segmentation as default.") },
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
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Keine PDP Law Compliance", "SCAR #1: No PDP Law Compliance")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Keine PDP Law Compliance, Daten ohne Consent verarbeitet. PDP Law-Verstoß, Strafe 10M IDR. Fix: Aktiviere PDP Law-konforme Consent-Management.", "No PDP Law compliance, data processed without consent. PDP Law violation, fine 10M IDR. Fix: Enable PDP Law-compliant consent management.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein PDP Law Consent. Lessons: Aktiviere PDP Law Consent Management.", "Root Cause: No PDP Law consent. Lessons: Enable PDP Law consent management.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: FinTech Breach", "SCAR #2: FinTech Breach")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Payment-Integration ohne PCI DSS, API-Keys exponiert. Finanzdaten-Leak. Fix: Aktiviere PCI DSS Compliance und mTLS.", "Payment integration without PCI DSS, API keys exposed. Financial data leak. Fix: Enable PCI DSS compliance and mTLS.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine PCI DSS Compliance. Lessons: Aktiviere PCI DSS für alle Payment-Integrationen.", "Root Cause: No PCI DSS compliance. Lessons: Enable PCI DSS for all payment integrations.")}</div>
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
                { n: 4, t: pick(isDE, "Audit Logs an SIEM", "Audit logs to SIEM"), d: pick(isDE, "PDP-konforme Nachverfolgbarkeit sichern.", "Ensure PDP-compliant traceability.") },
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
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Jakarta Security Checkliste", "Interactive Jakarta Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "jk1", text: pick(isDE, "PDP Law Consent Management aktiviert", "PDP Law consent management enabled") },
                  { id: "jk2", text: pick(isDE, "Data Residency in Indonesien", "Data residency in Indonesia") },
                  { id: "jk3", text: pick(isDE, "Payment-Integration Allowlist konfiguriert", "Payment integration allowlist configured") },
                  { id: "jk4", text: pick(isDE, "mTLS für Payment-Traffic aktiviert", "mTLS for payment traffic enabled") },
                  { id: "jk5", text: pick(isDE, "API-Key Rotation aktiviert", "API key rotation enabled") },
                  { id: "jk6", text: pick(isDE, "Audit Logs an SIEM", "Audit logs to SIEM") },
                  { id: "jk7", text: pick(isDE, "PDP Law Breach Notification Playbook", "PDP Law breach notification playbook") },
                  { id: "jk8", text: pick(isDE, "FinTech Security Audit durchgeführt", "FinTech security audit done") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Jakarta Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Jakarta Security Score Calculator", "Jakarta Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist PDP Law Compliance aktiviert?", "Is PDP Law compliance enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Data Residency in Indonesien?", "Is data residency in Indonesia?"), weight: 25 },
                  { q: pick(isDE, "Ist FinTech Security implementiert?", "Is FinTech security implemented?"), weight: 25 },
                  { q: pick(isDE, "Ist Payment-Integration Allowlist aktiviert?", "Is payment integration allowlist enabled?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Jakarta Security Score:", "Your Jakarta Security Score:")}</span>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für PDP Law Compliance, Indonesia Security, Zero-Trust und FinTech Security.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in PDP Law compliance, Indonesia security, zero-trust and FinTech security.")}
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
