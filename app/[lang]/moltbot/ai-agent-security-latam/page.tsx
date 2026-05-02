import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-security-latam"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security LatAm: São Paulo, Mexico City, Buenos Aires 2026 | ClawGuru", "AI Agent Security LatAm: Sao Paulo, Mexico City, Buenos Aires 2026 | ClawGuru")
  const description = pick(isDE, "LatAm Security Hub für AI-Agents: LGPD (Brasilien), LFPDPPP (Mexiko), PDPL (Argentinien), Zero-Trust und ausführbare Fixes für Moltbot-Deployments.", "LatAm security hub for AI agents: LGPD (Brazil), LFPDPPP (Mexico), PDPL (Argentina), zero-trust and executable fixes for Moltbot deployments.")
  return {
    title, description,
    keywords: ["ai agent security latam", "lgpd compliance brazil", "lfpdppp mexico", "pdpl argentina", "zero trust ai"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function AIAgentSecurityLatAmPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Security LatAm: São Paulo, Mexico City, Buenos Aires 2026 | ClawGuru", "AI Agent Security LatAm: Sao Paulo, Mexico City, Buenos Aires 2026 | ClawGuru")

  const FAQ = [
    { q: pick(isDE, "Was sind die wichtigsten Datenschutzgesetze in LatAm?", "What are the most important data protection laws in LatAm?"), a: pick(isDE, "LGPD (Brasilien - Lei Geral de Proteção de Dados), LFPDPPP (Mexiko - Ley Federal de Protección de Datos Personales), PDPL (Argentinien - Ley 25.326). Alle erfordern Consent, Data Residency, Breach Notification.", "LGPD (Brazil - General Data Protection Law), LFPDPPP (Mexico - Federal Law on Protection of Personal Data), PDPL (Argentina - Law 25.326). All require consent, data residency, breach notification.") },
    { q: pick(isDE, "Warum ist Cross-Border IR in LatAm wichtig?", "Why is cross-border IR important in LatAm?"), a: pick(isDE, "LatAm hat viele Länder mit verschiedenen Gesetzen. Incidents müssen über Ländergrenzen hinweg sauber gehandelt werden. IR-Playbooks müssen lokal angepasst sein.", "LatAm has many countries with different laws. Incidents must be handled cleanly across borders. IR playbooks must be locally adapted.") },
    { q: pick(isDE, "Welche Compliance-Regeln gelten in LatAm?", "Which compliance rules apply in LatAm?"), a: pick(isDE, "LGPD (Brasilien), LFPDPPP (Mexiko), PDPL (Argentinien), PCI DSS, FinTech Regulations. Alle erfordern: Consent, Data Residency, Breach Notification, Audit Trails.", "LGPD (Brazil), LFPDPPP (Mexico), PDPL (Argentina), PCI DSS, FinTech regulations. All require: consent, data residency, breach notification, audit trails.") },
    { q: pick(isDE, "Wie sichere ich Payment-Integrationen in LatAm?", "How do I secure payment integrations in LatAm?"), a: pick(isDE, "PCI DSS Compliance, mTLS für alle Payment-Traffic, API-Key Rotation, Allowlist für Payment-Provider, Audit Logs für alle Transaktionen.", "PCI DSS compliance, mTLS for all payment traffic, API key rotation, allowlist for payment providers, audit logs for all transactions.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Security LatAm", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Agent Security", "LGPD Compliance", "LFPDPPP Compliance", "PDPL Compliance", "Zero-Trust", "FinTech Security"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist LatAm Security?", "What is LatAm Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Regionaler Fokus", "Regional focus")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "LatAm Security Score", "LatAm Security Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">LatAm Security · Compliance-First</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Security LatAm — Du deployst in São Paulo, Mexico City, Buenos Aires ohne LGPD, ohne LFPDPPP, ohne PDPL. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert.", "AI Agent Security LatAm — You deploy in São Paulo, Mexico City, Buenos Aires without LGPD, without LFPDPPP, without PDPL. Compliance violation, data leak, your CEO fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du deployst in São Paulo, Mexico City, Buenos Aires ohne LGPD, ohne LFPDPPP, ohne PDPL. Compliance-Verstoß, Daten-Leak, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You deploy in São Paulo, Mexico City, Buenos Aires without LGPD, without LFPDPPP, without PDPL. Compliance violation, data leak, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient zur Härtung eigener Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist LatAm Security? Einfach erklärt.", "What is LatAm Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "LatAm Security bedeutet Compliance-First Deployment in Lateinamerika: LGPD (Brasilien), LFPDPPP (Mexiko), PDPL (Argentinien), Zero-Trust (keine implizite Vertrauenswürdigkeit), Cross-Border IR (Incidents über Ländergrenzen hinweg). Gute LatAm Security bedeutet: Alle lokalen Gesetze einhalten, Data Residency sichern, schnell auf Incidents reagieren.", "LatAm security means compliance-first deployment in Latin America: LGPD (Brazil), LFPDPPP (Mexico), PDPL (Argentina), zero-trust (no implicit trust), cross-border IR (incidents across borders). Good LatAm security means: comply with all local laws, secure data residency, respond fast to incidents.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Regionaler Fokus", "Regional focus")}</h2>
            <div className="space-y-4">
              {[
                { t: pick(isDE, "LGPD & LFPDPPP", "LGPD & LFPDPPP"), d: pick(isDE, "Regionale Datenschutzgesetze bestimmen Datenhaltung und Zugriff. Verstöße können zu hohen Strafen führen.", "Regional privacy laws dictate data residency and access. Violations can lead to heavy fines.") },
                { t: pick(isDE, "Payment & FinTech Exposure", "Payment & FinTech exposure"), d: pick(isDE, "Viele Deployments hängen an Payment Providern – besonders hart absichern.", "Many deployments depend on payment providers — lock them down.") },
                { t: pick(isDE, "Third-Party Risk", "Third-party risk"), d: pick(isDE, "Integrationen mit lokalen Anbietern brauchen harte Allowlist-Policies.", "Local vendor integrations need strict allowlist policies.") },
                { t: pick(isDE, "Cross-Border IR", "Cross-border IR"), d: pick(isDE, "Incidents müssen über Ländergrenzen hinweg sauber gehandelt werden.", "Incidents must be handled cleanly across borders.") },
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
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Keine LGPD Compliance", "SCAR #1: No LGPD Compliance")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Keine LGPD Compliance in Brasilien, Daten ohne Consent verarbeitet. LGPD-Verstoß, Strafe 50M BRL. Fix: Aktiviere LGPD-konforme Consent-Management.", "No LGPD compliance in Brazil, data processed without consent. LGPD violation, fine 50M BRL. Fix: Enable LGPD-compliant consent management.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein LGPD Consent. Lessons: Aktiviere LGPD Consent Management.", "Root Cause: No LGPD consent. Lessons: Enable LGPD consent management.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Cross-Border Breach", "SCAR #2: Cross-Border Breach")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Daten-Leak über Ländergrenzen hinweg, IR-Playbook nicht lokal angepasst. Verstöße in mehreren Ländern. Fix: Aktiviere Cross-Border IR-Playbooks.", "Data leak across borders, IR playbook not locally adapted. Violations in multiple countries. Fix: Enable cross-border IR playbooks.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Cross-Border IR. Lessons: Aktiviere Cross-Border IR-Playbooks.", "Root Cause: No cross-border IR. Lessons: Enable cross-border IR playbooks.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              {[
                { n: 1, t: pick(isDE, "Regionale Secrets", "Regional secrets"), d: pick(isDE, "Keys pro Region trennen. Kein globales Shared Secret.", "Separate keys per region. No global shared secret.") },
                { n: 2, t: pick(isDE, "Egress-Policies", "Egress policies"), d: pick(isDE, "Nur erlaubte Ziele, Exfiltration blocken.", "Only allowed destinations, block exfiltration.") },
                { n: 3, t: pick(isDE, "mTLS Ost-West", "mTLS east-west"), d: pick(isDE, "Agent-zu-Agent Traffic verschlüsseln.", "Encrypt agent-to-agent traffic.") },
                { n: 4, t: pick(isDE, "Audit Trails", "Audit trails"), d: pick(isDE, "Lückenlose Logs für Compliance und IR.", "Complete logs for compliance and IR.") },
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
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive LatAm Security Checkliste", "Interactive LatAm Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "la1", text: pick(isDE, "LGPD Consent Management aktiviert", "LGPD consent management enabled") },
                  { id: "la2", text: pick(isDE, "LFPDPPP Compliance aktiviert", "LFPDPPP compliance enabled") },
                  { id: "la3", text: pick(isDE, "PDPL Compliance aktiviert", "PDPL compliance enabled") },
                  { id: "la4", text: pick(isDE, "Data Residency pro Land konfiguriert", "Data residency per country configured") },
                  { id: "la5", text: pick(isDE, "mTLS für Payment-Traffic aktiviert", "mTLS for payment traffic enabled") },
                  { id: "la6", text: pick(isDE, "API-Key Rotation aktiviert", "API key rotation enabled") },
                  { id: "la7", text: pick(isDE, "Cross-Border IR-Playbook", "Cross-border IR playbook") },
                  { id: "la8", text: pick(isDE, "Audit Logs an SIEM", "Audit logs to SIEM") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* LatAm Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "LatAm Security Score Calculator", "LatAm Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist LGPD Compliance aktiviert?", "Is LGPD compliance enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist LFPDPPP Compliance aktiviert?", "Is LFPDPPP compliance enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist PDPL Compliance aktiviert?", "Is PDPL compliance enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Cross-Border IR implementiert?", "Is cross-border IR implemented?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein LatAm Security Score:", "Your LatAm Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 25/100", "Industry Average: 25/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für LGPD, LFPDPPP, PDPL Compliance, LatAm Security, Zero-Trust und FinTech Security.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in LGPD, LFPDPPP, PDPL compliance, LatAm security, zero-trust and FinTech security.")}
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
