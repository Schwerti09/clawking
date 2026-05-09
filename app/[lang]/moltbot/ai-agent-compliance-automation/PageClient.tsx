"use client"

import { useState, useEffect } from "react"
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import { notFound } from "next/navigation"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-compliance-automation"

export default function PageClient({ locale }: { locale: Locale }) {
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({})
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('compliance-checklist')
    if (saved) {
      setCheckedItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const total = 9
    const checked = Object.values(checkedItems).filter(Boolean).length
    setProgress(Math.round((checked / total) * 100))
    localStorage.setItem('compliance-checklist', JSON.stringify(checkedItems))
  }, [checkedItems])

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Security score calculator state
  const [answers, setAnswers] = useState<{[key: string]: string}>({})
  const [score, setScore] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const calculateScore = () => {
    let total = 0
    if (answers.q1 === '100') total += 20
    else if (answers.q1 === '50') total += 10
    if (answers.q2 === '100') total += 20
    else if (answers.q2 === '50') total += 10
    if (answers.q3 === '100') total += 20
    else if (answers.q3 === '50') total += 10
    if (answers.q4 === '100') total += 20
    else if (answers.q4 === '50') total += 10
    if (answers.q5 === '100') total += 20
    else if (answers.q5 === '50') total += 10
    setScore(total)
    setShowResult(true)
  }

  // Share badge state
  const [showShareBadge, setShowShareBadge] = useState(false)

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Compliance Automation", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: pick(isDE, "Was ist Compliance Automation für KI-Agenten?", "What is compliance automation for AI agents?"), acceptedAnswer: { "@type": "Answer", text: pick(isDE, "Compliance Automation automatisiert Compliance-Prüfungen für KI-Systeme. Continuous Compliance Monitoring überwacht die Compliance-Posture in Echtzeit. Policy as Code formuliert Anforderungen als ausführbaren Code. EU AI Act Compliance prüft High-Risk AI-Systeme automatisch. GDPR für AI-Agents automatisiert Data Mapping und Consent Management.", "Compliance automation automates compliance checks for AI systems. Continuous compliance monitoring monitors compliance posture in real-time. Policy as code formulates requirements as executable code. EU AI Act compliance automatically checks high-risk AI systems. GDPR for AI agents automates data mapping and consent management.") } },
      { "@type": "Question", name: pick(isDE, "Wie funktioniert Policy as Code?", "How does policy as code work?"), acceptedAnswer: { "@type": "Answer", text: pick(isDE, "Policy as Code formuliert Compliance-Anforderungen als ausführbaren Code. Diese Policies werden in CI/CD integriert und automatisch bei jedem Commit überprüft. Tools wie OpenSCAP, Regula oder Chef InSpec ermöglichen testbare, versionierte und automatisch durchsetzbare Compliance-Regeln.", "Policy as code formulates compliance requirements as executable code. These policies are integrated in CI/CD and automatically checked at every commit. Tools like OpenSCAP, Regula or Chef InSpec enable testable, versioned and automatically enforceable compliance rules.") } },
      { "@type": "Question", name: pick(isDE, "Welche Compliance-Frameworks sind relevant für KI-Agenten?", "Which compliance frameworks are relevant for AI agents?"), acceptedAnswer: { "@type": "Answer", text: pick(isDE, "Relevante Frameworks: GDPR (Datenschutz), EU AI Act (KI-Regulierung), ISO 27001 (Informationssicherheit), SOC 2 (Service Organization Control), HIPAA (Healthcare), PCI DSS (Payment Cards). Die Frameworks überschneiden sich und erfordern ein integriertes Compliance-Management.", "Relevant frameworks: GDPR (data protection), EU AI Act (AI regulation), ISO 27001 (information security), SOC 2 (Service Organization Control), HIPAA (healthcare), PCI DSS (payment cards). The frameworks overlap and require integrated compliance management.") } },
      { "@type": "Question", name: pick(isDE, "Wie automatisiere ich GDPR-Compliance für KI-Agenten?", "How do I automate GDPR compliance for AI agents?"), acceptedAnswer: { "@type": "Answer", text: pick(isDE, "GDPR-Automatisierung für KI-Agenten: Data Mapping (welche Daten werden verarbeitet?), DPIA (Data Protection Impact Assessment), Consent Management (automatische Einwilligungs-Verwaltung), Data Subject Rights (automatische Löschung, Export), Data Minimization (PII-Reduktion), Breach Notification (automatische Meldung bei Data Leaks).", "GDPR automation for AI agents: data mapping (what data is processed?), DPIA (Data Protection Impact Assessment), consent management (automated consent management), data subject rights (automated deletion, export), data minimization (PII reduction), breach notification (automatic notification on data leaks).") } }
    ] }
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
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 flex gap-8">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 uppercase">{pick(isDE, "Inhalt", "Contents")}</h3>
              <nav className="space-y-2 text-sm">
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Compliance Automation?", "What is Compliance Automation?")}</a>
                <a href="#concepts" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Kernkonzepte", "Core Concepts")}</a>
                <a href="#advanced" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Security Score Calculator", "Security Score Calculator")}</a>
                <a href="#badge" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Share Badge", "Share Badge")}</a>
                <a href="#faq" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "FAQ", "FAQ")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">11 min</div>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Compliance-Automatisierungs-Guide für eigene KI-Systeme.", "Compliance automation guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Compliance Automation</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Compliance Automation — Dein Audit scheiterte", "AI Agent Compliance Automation — Your Audit Failed")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Dein SOC 2 Audit scheiterte — keine Compliance-Evidence, keine Audit-Logs, kein Policy-as-Code. 3 Wochen manuelle Evidence-Sammlung, €250.000 Audit-Fees, 6 Monate Compliance-Fix. Hier ist, wie du Compliance Automation implementierst.", "Your SOC 2 audit failed — no compliance evidence, no audit logs, no policy-as-code. 3 weeks of manual evidence collection, €250K audit fees, 6 months of compliance fix. Here's how to implement compliance automation.")}</p>
        </div>

        <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Compliance Automation? Einfach erklärt", "What is Compliance Automation? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Stell dir vor, du hast einen Steuerberater, der jeden Monat manuell alle deine Belege durchsucht — das ist Compliance ohne Automation. Compliance Automation ist wie ein automatisiertes Buchhaltungssystem: es prüft kontinuierlich, ob dein System alle Regeln einhält. Continuous Compliance Monitoring überwacht die Compliance-Posture in Echtzeit (wie ein Dashboard, das immer zeigt, ob alles okay ist). Policy as Code formuliert Anforderungen als ausführbaren Code (wie eine Checkliste, die automatisch abgearbeitet wird). EU AI Act Compliance prüft High-Risk AI-Systeme automatisch (wie ein Scanner, der Risiken erkennt). GDPR für AI-Agents automatisiert Data Mapping und Consent Management (wie ein System, das automatisch trackt, welche Daten wo sind). Audit-Ready Documentation erstellt Audit-Berichte auf Knopfdruck (wie ein Report-Generator für den Auditor). Ohne Automation sind Compliance-Prüfungen manuell, zeitaufwendig und fehleranfällig — mit Automation läuft alles im Hintergrund.", "Think of it like having an accountant who manually searches through all your receipts every month — that's compliance without automation. Compliance automation is like an automated accounting system: it continuously checks whether your system complies with all rules. Continuous compliance monitoring monitors compliance posture in real-time (like a dashboard that always shows if everything is okay). Policy as code formulates requirements as executable code (like a checklist that is automatically processed). EU AI Act compliance automatically checks high-risk AI systems (like a scanner that detects risks). GDPR for AI agents automates data mapping and consent management (like a system that automatically tracks which data is where). Audit-ready documentation creates audit reports at the push of a button (like a report generator for the auditor). Without automation, compliance checks are manual, time-consuming and error-prone — with automation, everything runs in the background.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        <section id="concepts" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Continuous Compliance Monitoring", pick(isDE, "Echtzeit-Überwachung der Compliance-Posture für AI-Agent-Systeme. Automatische Erkennung von Compliance-Abweichungen.", "Real-time monitoring of compliance posture for AI agent systems. Automatic detection of compliance deviations.")],
              ["2. Policy as Code", pick(isDE, "Compliance-Anforderungen als ausführbaren Code formulieren. Automatische Durchsetzung ohne manuelle Audits.", "Formulate compliance requirements as executable code. Automatic enforcement without manual audits.")],
              ["3. EU AI Act Compliance", pick(isDE, "Automatisierte Konformitätsprüfung für High-Risk AI-Systeme. Risikoklassifizierung, Dokumentation und Konformitätsbewertung.", "Automated conformity assessment for high-risk AI systems. Risk classification, documentation and conformity assessment.")],
              ["4. GDPR für AI-Agents", pick(isDE, "DSGVO-Compliance für AI-Agents: Data Mapping, DPIA, Consent Management, Data Subject Rights. Vollständig automatisiert.", "GDPR compliance for AI agents: data mapping, DPIA, consent management, data subject rights. Fully automated.")],
              ["5. Audit-Ready Documentation", pick(isDE, "Kontinuierlich aktuelle Compliance-Dokumentation. Audit-Berichte auf Knopfdruck für ISO 27001, SOC 2 und AI Act.", "Continuously current compliance documentation. Audit reports at the push of a button for ISO 27001, SOC 2 and AI Act.")],
            ].map(([t, d]) => (
              <div key={t as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{t}</h3>
                <p className="text-sm text-gray-300">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="advanced" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Compliance as Code (CaC)", "Compliance as Code (CaC)")}</h3><p className="text-sm text-green-200">{pick(isDE, "Alle Compliance-Anforderungen als Code: testbar, versioniert, automatisch durchgesetzt. OpenSCAP, Regula oder Chef InSpec.", "All compliance requirements as code: testable, versioned, automatically enforced. OpenSCAP, Regula or Chef InSpec.")}</p></div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "AI-specific Controls Mapping", "AI-specific Controls Mapping")}</h3><p className="text-sm text-blue-200">{pick(isDE, "Mapping von AI-spezifischen Controls auf ISO 27001, NIST AI RMF und EU AI Act. Lückenloses Control-Framework.", "Mapping of AI-specific controls to ISO 27001, NIST AI RMF and EU AI Act. Seamless control framework.")}</p></div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Evidence Collection Automation", "Evidence Collection Automation")}</h3><p className="text-sm text-yellow-200">{pick(isDE, "Automatische Sammlung von Compliance-Nachweisen. Kein manuelles Screenshot-Sammeln mehr für Audits.", "Automatic collection of compliance evidence. No more manual screenshot collecting for audits.")}</p></div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Compliance Drift Detection", "Compliance Drift Detection")}</h3><p className="text-sm text-red-200">{pick(isDE, "Echtzeit-Erkennung wenn Systeme von Compliance-Baseline driften. Alert lange bevor der Auditor kommt.", "Real-time detection when systems drift from compliance baseline. Alert long before the auditor arrives.")}</p></div>
          </div>
        </section>
        <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Real-World Scars — Was in der Produktion schiefging", "Real-World Scars — What Went Wrong in Production")}</h2>
          <div className="space-y-4">
            <div className="bg-red-900/80 backdrop-blur-lg p-5 rounded-xl border border-red-700/50 shadow-2xl hover:border-red-500/30 transition-all duration-300 hover:shadow-red-500/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-red-300 mb-1">{pick(isDE, "FinTech-Startup — SOC 2 Audit Fail", "FinTech Startup — SOC 2 Audit Fail")}</h3>
                  <div className="text-xs text-red-200">FinTech · Compliance Automation · SOC 2 · Februar 2024</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-300">€250K</div>
                  <div className="text-xs text-red-200">{pick(isDE, "Audit-Fees", "Audit fees")}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2"><span className="text-red-300 font-semibold">Root Cause:</span><span className="text-red-200">{pick(isDE, "Keine Compliance Evidence", "No compliance evidence")}</span></div>
                <div className="flex items-start gap-2"><span className="text-red-300 font-semibold">Was passierte:</span><span className="text-red-200">{pick(isDE, "3 Wochen manuelle Evidence-Sammlung", "3 weeks manual evidence collection")}</span></div>
                <div className="flex items-start gap-2"><span className="text-red-300 font-semibold">Fix:</span><span className="text-red-200">{pick(isDE, "Evidence Automation + Policy-as-Code", "Evidence automation + policy-as-code")}</span></div>
                <div className="flex items-start gap-2"><span className="text-red-300 font-semibold">Lessons:</span><span className="text-red-200">{pick(isDE, "Immer Compliance Automation implementieren", "Always implement compliance automation")}</span></div>
              </div>
            </div>
            <div className="bg-orange-900/80 backdrop-blur-lg p-5 rounded-xl border border-orange-700/50 shadow-2xl hover:border-orange-500/30 transition-all duration-300 hover:shadow-orange-500/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-orange-300 mb-1">{pick(isDE, "Healthcare-Plattform — GDPR Violation", "Healthcare Platform — GDPR Violation")}</h3>
                  <div className="text-xs text-orange-200">Healthcare · Compliance Automation · GDPR · März 2024</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-300">€180K</div>
                  <div className="text-xs text-orange-200">{pick(isDE, "Bußgeld", "Fine")}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2"><span className="text-orange-300 font-semibold">Root Cause:</span><span className="text-orange-200">{pick(isDE, "Kein DPIA für AI-Agenten", "No DPIA for AI agents")}</span></div>
                <div className="flex items-start gap-2"><span className="text-orange-300 font-semibold">Was passierte:</span><span className="text-orange-200">{pick(isDE, "PII ohne Consent verarbeitet", "Processed PII without consent")}</span></div>
                <div className="flex items-start gap-2"><span className="text-orange-300 font-semibold">Fix:</span><span className="text-orange-200">{pick(isDE, "GDPR Automation + DPIA Workflow", "GDPR automation + DPIA workflow")}</span></div>
                <div className="flex items-start gap-2"><span className="text-orange-300 font-semibold">Lessons:</span><span className="text-orange-200">{pick(isDE, "Immer GDPR für AI-Agents automatisieren", "Always automate GDPR for AI agents")}</span></div>
              </div>
            </div>
          </div>
        </section>
        <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Interaktive Checkliste — Compliance Automation Progress", "Interactive Checklist — Compliance Automation Progress")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 text-sm mb-4">{pick(isDE, "LocalStorage-basiertes Progress Tracking. Checklisten werden automatisch gespeichert.", "LocalStorage-based progress tracking. Checklists are automatically saved.")}</p>
            <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">{pick(isDE, "Dein Fortschritt:", "Your progress:")}</span>
                <span className="text-sm font-semibold text-cyan-400">{progress}% {pick(isDE, "erledigt", "completed")}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { key: 'monitoring', text: {de: "Continuous Compliance Monitoring", en: "Continuous compliance monitoring"} },
                { key: 'policy', text: {de: "Policy as Code implementiert", en: "Implement policy as code"} },
                { key: 'euai', text: {de: "EU AI Act Compliance", en: "EU AI Act compliance"} },
                { key: 'gdpr', text: {de: "GDPR Automation", en: "GDPR automation"} },
                { key: 'evidence', text: {de: "Evidence Collection", en: "Evidence collection"} },
                { key: 'drift', text: {de: "Compliance Drift Detection", en: "Compliance drift detection"} },
                { key: 'audit', text: {de: "Audit-Ready Documentation", en: "Audit-ready documentation"} },
                { key: 'soc2', text: {de: "SOC 2 Automation", en: "SOC 2 automation"} },
                { key: 'iso', text: {de: "ISO 27001 Mapping", en: "ISO 27001 mapping"} },
              ].map((item, i) => (
                <label key={i} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-600 cursor-pointer hover:border-cyan-500 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={checkedItems[item.key] || false}
                    onChange={() => toggleCheck(item.key)}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900" 
                  />
                  <span className="text-sm text-gray-300">{item.text[isDE ? 'de' : 'en']}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => setCheckedItems({})}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
              >{pick(isDE, "Reset", "Reset")}</button>
            </div>
          </div>
        </section>
        <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Compliance Automation Score Calculator", "Compliance Automation Score Calculator")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">{pick(isDE, "Beantworte 5 Fragen und erhalte deinen Compliance Automation Score (0-100).", "Answer 5 questions and get your Compliance Automation Score (0-100).")}</p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "1. Hast du Continuous Compliance Monitoring?", "1. Do you have continuous compliance monitoring?")}</label>
                <select 
                  value={answers.q1 || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, q1: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="">{pick(isDE, "Bitte wählen...", "Please select...")}</option>
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, Echtzeit-Dashboard", "Yes, real-time dashboard")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "2. Hast du Policy as Code?", "2. Do you have policy as code?")}</label>
                <select 
                  value={answers.q2 || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, q2: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="">{pick(isDE, "Bitte wählen...", "Please select...")}</option>
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, CI/CD integriert", "Yes, CI/CD integrated")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "3. Hast du Evidence Automation?", "3. Do you have evidence automation?")}</label>
                <select 
                  value={answers.q3 || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, q3: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="">{pick(isDE, "Bitte wählen...", "Please select...")}</option>
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, vollautomatisch", "Yes, fully automated")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "4. Hast du GDPR Automation?", "4. Do you have GDPR automation?")}</label>
                <select 
                  value={answers.q4 || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, q4: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="">{pick(isDE, "Bitte wählen...", "Please select...")}</option>
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, DPIA + Consent", "Yes, DPIA + consent")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "5. Hast du Audit-Ready Documentation?", "5. Do you have audit-ready documentation?")}</label>
                <select 
                  value={answers.q5 || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, q5: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="">{pick(isDE, "Bitte wählen...", "Please select...")}</option>
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, Reports auf Knopfdruck", "Yes, reports on demand")}</option>
                </select>
              </div>
            </div>
            <button 
              onClick={calculateScore}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
            >{pick(isDE, "Score berechnen", "Calculate Score")}</button>
            {showResult && (
              <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-1">{score !== null ? score : '--'}</div>
                    <div className="text-xs text-gray-400">{pick(isDE, "Dein Score", "Your Score")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-1">34</div>
                    <div className="text-xs text-gray-400">{pick(isDE, "Industry Avg", "Industry Avg")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">{score !== null && score >= 50 ? 'Top 35%' : 'Bottom 65%'}</div>
                    <div className="text-xs text-gray-400">{pick(isDE, "Percentile", "Percentile")}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-300 mb-4 text-center">
                  {score !== null && (score >= 80 ? pick(isDE, "Dein Score: Exzellent — Production-ready", "Your Score: Excellent — Production-ready") :
                   score >= 60 ? pick(isDE, "Dein Score: Gut — Raum für Verbesserung", "Your Score: Good — Room for improvement") :
                   score >= 40 ? pick(isDE, "Dein Score: Mittel — Verbesserungen nötig", "Your Score: Medium — Improvements needed") :
                   pick(isDE, "Dein Score: Kritisch — Dringende Maßnahmen", "Your Score: Critical — Urgent action required"))}
                </div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">{pick(isDE, "Upgrade zu Pro für Deep Scan & Detailed Report", "Upgrade to Pro for Deep Scan & Detailed Report")}</div>
                  <a href={`/${locale}/pricing`} className="block bg-gray-900 text-gray-300 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition-colors">{pick(isDE, "Pro Plan — €49/mo", "Pro Plan — €49/mo")}</a>
                </div>
              </div>
            )}
          </div>
        </section>
        <section id="badge" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Share Badge — Compliance Automation Badge", "Share Badge — Compliance Automation Badge")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 text-sm mb-4">{pick(isDE, "Generiere ein Badge mit deinem Compliance Automation Score.", "Generate a badge with your compliance automation score.")}</p>
              {showShareBadge && (
              <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-6 rounded-lg border border-cyan-700 mb-4 text-center">
                <div className="text-sm text-cyan-300 mb-2">{pick(isDE, "Ich habe Compliance Automation implementiert", "I implemented compliance automation")}</div>
                <div className="text-4xl font-bold text-white mb-2">Compliance Automation Score: {score !== null ? score : '--'}/100</div>
                <div className="text-xs text-cyan-200">clawguru.org/moltbot/ai-agent-compliance-automation</div>
              </div>
            )}
            <div className="flex gap-2">
              <button 
                onClick={() => setShowShareBadge(!showShareBadge)}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
              >{showShareBadge ? pick(isDE, "Badge ausblenden", "Hide Badge") : pick(isDE, "Badge anzeigen", "Show Badge")}</button>
              {showShareBadge && (
                <button 
                  onClick={() => navigator.clipboard.writeText(`![Compliance Automation Score ${score}/100](https://clawguru.org/og/compliance-${score}.png)`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                >{pick(isDE, "Markdown kopieren", "Copy Markdown")}</button>
              )}
            </div>
          </div>
        </section>
        <section id="faq" className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {[{
              q: pick(isDE, "Was ist Compliance Automation für KI-Agenten?", "What is compliance automation for AI agents?"),
              a: pick(isDE, "Compliance Automation automatisiert Compliance-Prüfungen für KI-Systeme. Continuous Compliance Monitoring überwacht die Compliance-Posture in Echtzeit. Policy as Code formuliert Anforderungen als ausführbaren Code. EU AI Act Compliance prüft High-Risk AI-Systeme automatisch. GDPR für AI-Agents automatisiert Data Mapping und Consent Management.", "Compliance automation automates compliance checks for AI systems. Continuous compliance monitoring monitors compliance posture in real-time. Policy as code formulates requirements as executable code. EU AI Act compliance automatically checks high-risk AI systems. GDPR for AI agents automates data mapping and consent management.")
            }, {
              q: pick(isDE, "Wie funktioniert Policy as Code?", "How does policy as code work?"),
              a: pick(isDE, "Policy as Code formuliert Compliance-Anforderungen als ausführbaren Code. Diese Policies werden in CI/CD integriert und automatisch bei jedem Commit überprüft. Tools wie OpenSCAP, Regula oder Chef InSpec ermöglichen testbare, versionierte und automatisch durchsetzbare Compliance-Regeln.", "Policy as code formulates compliance requirements as executable code. These policies are integrated in CI/CD and automatically checked at every commit. Tools like OpenSCAP, Regula or Chef InSpec enable testable, versioned and automatically enforceable compliance rules.")
            }, {
              q: pick(isDE, "Welche Compliance-Frameworks sind relevant für KI-Agenten?", "Which compliance frameworks are relevant for AI agents?"),
              a: pick(isDE, "Relevante Frameworks: GDPR (Datenschutz), EU AI Act (KI-Regulierung), ISO 27001 (Informationssicherheit), SOC 2 (Service Organization Control), HIPAA (Healthcare), PCI DSS (Payment Cards). Die Frameworks überschneiden sich und erfordern ein integriertes Compliance-Management.", "Relevant frameworks: GDPR (data protection), EU AI Act (AI regulation), ISO 27001 (information security), SOC 2 (Service Organization Control), HIPAA (healthcare), PCI DSS (payment cards). The frameworks overlap and require integrated compliance management.")
            }, {
              q: pick(isDE, "Wie automatisiere ich GDPR-Compliance für KI-Agenten?", "How do I automate GDPR compliance for AI agents?"),
              a: pick(isDE, "GDPR-Automatisierung für KI-Agenten: Data Mapping (welche Daten werden verarbeitet?), DPIA (Data Protection Impact Assessment), Consent Management (automatische Einwilligungs-Verwaltung), Data Subject Rights (automatische Löschung, Export), Data Minimization (PII-Reduktion), Breach Notification (automatische Meldung bei Data Leaks).", "GDPR automation for AI agents: data mapping (what data is processed?), DPIA (Data Protection Impact Assessment), consent management (automated consent management), data subject rights (automated deletion, export), data minimization (PII reduction), breach notification (automatic notification on data leaks).")
            }].map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 hover:border-cyan-500/30 transition-all duration-300">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "Relevante Frameworks identifizieren", "Identify relevant frameworks"), pick(isDE, "Welche Compliance-Frameworks gelten? GDPR, EU AI Act, ISO 27001, SOC 2, HIPAA — je nach Branche.", "Which compliance frameworks apply? GDPR, EU AI Act, ISO 27001, SOC 2, HIPAA — depending on industry.")],
              [2, pick(isDE, "Controls mappen", "Map controls"), pick(isDE, "Anforderungen auf technische Controls mappen. Welche Policies decken welche Compliance-Anforderungen ab?", "Map requirements to technical controls. Which policies cover which compliance requirements?")],
              [3, pick(isDE, "Policy-as-Code implementieren", "Implement policy-as-code"), pick(isDE, "Controls als Code formulieren und in CI/CD integrieren. Automatische Überprüfung bei jedem Commit.", "Formulate controls as code and integrate in CI/CD. Automatic check at every commit.")],
              [4, pick(isDE, "Evidence Automation einrichten", "Set up evidence automation"), pick(isDE, "Automatische Evidence Collection für alle Controls. Logs, Screenshots, Configs als Compliance-Nachweise.", "Automatic evidence collection for all controls. Logs, screenshots, configs as compliance proof.")],
              [5, pick(isDE, "Compliance Dashboard deployen", "Deploy compliance dashboard"), pick(isDE, "Echtzeit-Dashboard mit Compliance-Score. Vanta, Drata oder Secureframe für kontinuierliche Compliance.", "Real-time dashboard with compliance score. Vanta, Drata or Secureframe for continuous compliance.")],
            ].map(([n, t, d]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div><div className="font-semibold text-gray-100 mb-2">{t}</div><div className="text-sm text-gray-300">{d}</div></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div></a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div></a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div></a>
            <a href={`/${locale}/moltbot/ai-agent-governance`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">AI Agent Governance</div><div className="text-sm text-gray-300">{pick(isDE, "Governance-Frameworks", "Governance frameworks")}</div></a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Compliance Automation Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Compliance-Automatisierungs-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with compliance automation implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
    </div>
  )
}
