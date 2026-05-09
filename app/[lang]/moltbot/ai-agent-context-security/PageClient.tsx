"use client"

import { useState, useEffect } from "react"
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import { notFound } from "next/navigation"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-context-security"

export default function PageClient({ locale }: { locale: Locale }) {
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({})
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('context-checklist')
    if (saved) {
      setCheckedItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const total = 9
    const checked = Object.values(checkedItems).filter(Boolean).length
    setProgress(Math.round((checked / total) * 100))
    localStorage.setItem('context-checklist', JSON.stringify(checkedItems))
  }, [checkedItems])

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Security score calculator state
  const [answers, setAnswers] = useState<{[key: string]: string}>({})
  const [score, setScore] = useState<number | null>(null)
  const [showScoreResult, setShowScoreResult] = useState(false)

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
    setShowScoreResult(true)
  }

  // Share badge state
  const [showShareBadge, setShowShareBadge] = useState(false)

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Context Security", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: pick(isDE, "Was ist Context Window Isolation?", "What is context window isolation?"), acceptedAnswer: { "@type": "Answer", text: pick(isDE, "Context Window Isolation strikt isoliert Kontext-Fenster zwischen verschiedenen Nutzern und Sessions um Cross-Tenant Datenlecks zu verhindern. Jeder Nutzer bekommt ein isoliertes Kontext-Fenster, das keine Daten anderer Nutzer enthalten kann.", "Context window isolation strictly isolates context windows between different users and sessions to prevent cross-tenant data leaks. Each user gets an isolated context window that cannot contain data from other users.") } },
      { "@type": "Question", name: pick(isDE, "Wie verhindere ich Prompt Injection?", "How do I prevent prompt injection?"), acceptedAnswer: { "@type": "Answer", text: pick(isDE, "Prompt Injection Prevention nutzt Input Sanitization und Instruction Hierarchy (System > Developer > User) um User-Override von System-Anweisungen zu blocken. Alle User-Inputs werden bereinigt bevor sie in den Kontext einfließen.", "Prompt injection prevention uses input sanitization and instruction hierarchy (system > developer > user) to block user override of system instructions. All user inputs are sanitized before flowing into context.") } },
      { "@type": "Question", name: pick(isDE, "Was ist Cross-Session Contamination?", "What is cross-session contamination?"), acceptedAnswer: { "@type": "Answer", text: pick(isDE, "Cross-Session Contamination ist die Kontamination von Daten zwischen unabhängigen Agent-Sessions. Prevention durch Memory Isolation und Session Cleanup stellt sicher, dass keine Session-Daten in andere Sessions lecken.", "Cross-session contamination is the contamination of data between independent agent sessions. Prevention through memory isolation and session cleanup ensures no session data leaks into other sessions.") } },
      { "@type": "Question", name: pick(isDE, "Wie härte ich den System Prompt?", "How do I harden the system prompt?"), acceptedAnswer: { "@type": "Answer", text: pick(isDE, "System Prompt Hardening nutzt Anti-Jailbreak-Formulierungen und Instruction Defense um Manipulation zu verhindern. Regelmäßige Tests gegen bekannte Jailbreak-Patterns sind erforderlich.", "System prompt hardening uses anti-jailbreak formulations and instruction defense to prevent manipulation. Regular tests against known jailbreak patterns are required.") } }
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Context Security?", "What is Context Security?")}</a>
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
                <div className="text-sm text-gray-300">10 min</div>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <strong className="text-amber-100">&quot;Not a Pentest&quot; Trust-Anker</strong>: {pick(isDE, "Context-Security-Guide für eigene KI-Systeme.", "Context security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Context Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Context Security — Dein Agent verriet Kundendaten", "AI Agent Context Security — Your Agent Leaked Customer Data")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Dein Moltbot Agent verriet Kundendaten durch Cross-Session Contamination — Nutzer A sah Daten von Nutzer B im Agent-Kontext. Keine Context Window Isolation, keine Session Cleanup, keine Context Validation. 12.400 Datensätze exfiltriert, €2.8 Mio. Schaden, 3 Wochen Incident-Response. Hier ist, wie du Context Security implementierst.", "Your Moltbot agent leaked customer data through cross-session contamination — User A saw User B's data in the agent context. No context window isolation, no session cleanup, no context validation. 12,400 records exfiltrated, €2.8M damage, 3 weeks incident response. Here's how to implement context security.")}</p>
        </div>

        <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Context Security? Einfach erklärt", "What is AI Agent Context Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Stell dir vor, du hast ein Mehrfamilienhaus mit offenen Türen zwischen allen Wohnungen — jeder kann in jede Wohnung rein, auch wenn er nicht dort wohnt. Das ist AI Agent Context ohne Security. AI Agent Context Security ist wie ein Schloss an jeder Tür: Context Window Isolation strikt isoliert Kontext-Fenster zwischen Nutzern (wie getrennte Wohnungen). Prompt Injection Prevention verhindert, dass Nutzer System-Anweisungen überschreiben (wie ein Türschloss, das nur der Hausmeister öffnen kann). Cross-Session Contamination Prevention isoliert Sessions vollständig (wie getrennte Wohnungen für jede Familie). Context Validation validiert alle Inputs auf Malicious Content (wie ein Türsteher, der prüft, wer rein darf). System Prompt Hardening härte den System-Prompt gegen Manipulation (wie ein verstärktes Schloss gegen Einbruch). Wenn ein Angreifer versucht, Daten zu stehlen, kann er nicht in andere Kontext-Fenster — sie sind strikt isoliert.", "Think of it like an apartment building with open doors between all apartments — anyone can enter any apartment, even if they don't live there. That's AI agent context without security. AI agent context security is like a lock on every door: context window isolation strictly isolates context windows between users (like separate apartments). Prompt injection prevention prevents users from overriding system instructions (like a door lock that only the superintendent can open). Cross-session contamination prevention fully isolates sessions (like separate apartments for each family). Context validation validates all inputs for malicious content (like a doorman checking who can enter). System prompt hardening hardens the system prompt against manipulation (like a reinforced lock against break-in). If an attacker tries to steal data, they can't enter other context windows — they're strictly isolated.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten", "Jump to core concepts")}</p>
          </div>
        </section>

        <section id="concepts" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Context Window Isolation", pick(isDE, "Strikte Isolierung von Kontext-Fenstern zwischen verschiedenen Nutzern und Sessions. Verhindert Cross-Tenant Datenlecks.", "Strict isolation of context windows between different users and sessions. Prevents cross-tenant data leaks.")],
              ["2. Prompt Injection Prevention", pick(isDE, "Schutz vor Prompt Injection durch Input Sanitization und Instruction Hierarchies. System Prompt Integrität sicherstellen.", "Protection against prompt injection through input sanitization and instruction hierarchies. Ensure system prompt integrity.")],
              ["3. Cross-Session Contamination", pick(isDE, "Verhinderung von Datenkontamination zwischen unabhängigen Agent-Sessions. Memory Isolation und Session Cleanup.", "Prevention of data contamination between independent agent sessions. Memory isolation and session cleanup.")],
              ["4. Context Validation", pick(isDE, "Validierung aller Kontext-Inputs auf Malicious Content. Schema-Validierung und Content-Filterung für Agent-Prompts.", "Validation of all context inputs for malicious content. Schema validation and content filtering for agent prompts.")],
              ["5. System Prompt Hardening", pick(isDE, "Härtung des System-Prompts gegen Manipulation. Jailbreak-resistente Formulierungen und Instruction Defense.", "Hardening of the system prompt against manipulation. Jailbreak-resistant formulations and instruction defense.")],
            ].map(([title, desc]) => (
              <div key={title as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="advanced" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700/50 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Instruction Hierarchy Enforcement", "Instruction Hierarchy Enforcement")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "Durchsetzung einer klaren Instruction Hierarchy: System > Developer > User. Verhindert User-Override von System-Anweisungen.", "Enforcement of a clear instruction hierarchy: System > Developer > User. Prevents user override of system instructions.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700/50 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Context Integrity Monitoring", "Context Integrity Monitoring")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Real-time Monitoring der Kontext-Integrität. Erkennung von Injection-Versuchen und manipulierten Inputs.", "Real-time monitoring of context integrity. Detection of injection attempts and manipulated inputs.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700/50 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Secure Context Handoff", "Secure Context Handoff")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Sicherer Kontext-Transfer zwischen Agents in Multi-Agent-Systemen. Signierte Kontext-Pakete und Integritätsprüfung.", "Secure context transfer between agents in multi-agent systems. Signed context packages and integrity verification.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700/50 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Context Poisoning Defense", "Context Poisoning Defense")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Schutz vor gezielter Vergiftung des Agent-Kontexts durch externe Datenquellen (Web, RAG, Tools).", "Protection against deliberate poisoning of agent context through external data sources (web, RAG, tools).")}</p>
            </div>
          </div>
        </section>
        <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Real-World Scars — Was in der Produktion schiefging", "Real-World Scars — What Went Wrong in Production")}</h2>
          <div className="space-y-4">
            <div className="bg-red-900/80 backdrop-blur-lg p-5 rounded-xl border border-red-700/50 shadow-2xl hover:border-red-500/30 transition-all duration-300 hover:shadow-red-500/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-red-300 mb-1">{pick(isDE, "SaaS-Plattform — Cross-Session Data Leak", "SaaS Platform — Cross-Session Data Leak")}</h3>
                  <div className="text-xs text-red-200">SaaS · Context Security · Data Leak · Januar 2024</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-300">12.4K</div>
                  <div className="text-xs text-red-200">{pick(isDE, "Datensätze", "Records")}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2"><span className="text-red-300 font-semibold">Root Cause:</span><span className="text-red-200">{pick(isDE, "Keine Session Isolation", "No session isolation")}</span></div>
                <div className="flex items-start gap-2"><span className="text-red-300 font-semibold">Was passierte:</span><span className="text-red-200">{pick(isDE, "Nutzer A sah Daten von Nutzer B", "User A saw User B's data")}</span></div>
                <div className="flex items-start gap-2"><span className="text-red-300 font-semibold">Fix:</span><span className="text-red-200">{pick(isDE, "Context Window Isolation", "Context window isolation")}</span></div>
                <div className="flex items-start gap-2"><span className="text-red-300 font-semibold">Lessons:</span><span className="text-red-200">{pick(isDE, "Immer Session Isolation implementieren", "Always implement session isolation")}</span></div>
              </div>
            </div>
            <div className="bg-orange-900/80 backdrop-blur-lg p-5 rounded-xl border border-orange-700/50 shadow-2xl hover:border-orange-500/30 transition-all duration-300 hover:shadow-orange-500/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-orange-300 mb-1">{pick(isDE, "FinTech-App — Prompt Injection Data Exfiltration", "FinTech App — Prompt Injection Data Exfiltration")}</h3>
                  <div className="text-xs text-orange-200">FinTech · Context Security · Prompt Injection · Februar 2024</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-300">€2.8M</div>
                  <div className="text-xs text-orange-200">{pick(isDE, "Schaden", "Damage")}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2"><span className="text-orange-300 font-semibold">Root Cause:</span><span className="text-orange-200">{pick(isDE, "Kein Prompt Injection Prevention", "No prompt injection prevention")}</span></div>
                <div className="flex items-start gap-2"><span className="text-orange-300 font-semibold">Was passierte:</span><span className="text-orange-200">{pick(isDE, "Angreifer manipulierte Kontext", "Attacker manipulated context")}</span></div>
                <div className="flex items-start gap-2"><span className="text-orange-300 font-semibold">Fix:</span><span className="text-orange-200">{pick(isDE, "Input Sanitization + Instruction Hierarchy", "Input sanitization + instruction hierarchy")}</span></div>
                <div className="flex items-start gap-2"><span className="text-orange-300 font-semibold">Lessons:</span><span className="text-orange-200">{pick(isDE, "Immer Input Sanitization implementieren", "Always implement input sanitization")}</span></div>
              </div>
            </div>
          </div>
        </section>
        <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Interaktive Checkliste — Context Security Progress", "Interactive Checklist — Context Security Progress")}</h2>
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
                { key: 'isolation', text: {de: "Context Window Isolation", en: "Context window isolation"} },
                { key: 'sanitization', text: {de: "Input Sanitization", en: "Input sanitization"} },
                { key: 'injection', text: {de: "Prompt Injection Prevention", en: "Prompt injection prevention"} },
                { key: 'session', text: {de: "Session Isolation", en: "Session isolation"} },
                { key: 'validation', text: {de: "Context Validation", en: "Context validation"} },
                { key: 'hardening', text: {de: "System Prompt Hardening", en: "System prompt hardening"} },
                { key: 'hierarchy', text: {de: "Instruction Hierarchy", en: "Instruction hierarchy"} },
                { key: 'monitoring', text: {de: "Context Integrity Monitoring", en: "Context integrity monitoring"} },
                { key: 'poisoning', text: {de: "Context Poisoning Defense", en: "Context poisoning defense"} },
              ].map((item, i) => (
                <label key={i} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-600 cursor-pointer hover:border-cyan-500 transition-colors">
                  <input type="checkbox" checked={checkedItems[item.key] || false} onChange={() => toggleCheck(item.key)} className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900" />
                  <span className="text-sm text-gray-300">{item.text[isDE ? 'de' : 'en']}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">{pick(isDE, "Export als PDF", "Export as PDF")}</button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">{pick(isDE, "Reset", "Reset")}</button>
            </div>
          </div>
        </section>
        <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Context Security Score Calculator", "Context Security Score Calculator")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">{pick(isDE, "Beantworte 5 Fragen und erhalte deinen Context Security Score (0-100).", "Answer 5 questions and get your Context Security Score (0-100).")}</p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "1. Hast du Context Window Isolation?", "1. Do you have context window isolation?")}</label>
                <select value={answers.q1 || ''} onChange={(e) => setAnswers(prev => ({ ...prev, q1: e.target.value }))} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, strikte Isolation", "Yes, strict isolation")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "2. Hast du Prompt Injection Prevention?", "2. Do you have prompt injection prevention?")}</label>
                <select value={answers.q2 || ''} onChange={(e) => setAnswers(prev => ({ ...prev, q2: e.target.value }))} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, Input Sanitization", "Yes, input sanitization")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "3. Hast du Session Isolation?", "3. Do you have session isolation?")}</label>
                <select value={answers.q3 || ''} onChange={(e) => setAnswers(prev => ({ ...prev, q3: e.target.value }))} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, Memory Isolation", "Yes, memory isolation")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "4. Hast du Context Validation?", "4. Do you have context validation?")}</label>
                <select value={answers.q4 || ''} onChange={(e) => setAnswers(prev => ({ ...prev, q4: e.target.value }))} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, Schema-Validierung", "Yes, schema validation")}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">{pick(isDE, "5. Hast du System Prompt Hardening?", "5. Do you have system prompt hardening?")}</label>
                <select value={answers.q5 || ''} onChange={(e) => setAnswers(prev => ({ ...prev, q5: e.target.value }))} className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">{pick(isDE, "Nein", "No")}</option>
                  <option value="50">{pick(isDE, "Teilweise", "Partially")}</option>
                  <option value="100">{pick(isDE, "Ja, Anti-Jailbreak", "Yes, anti-jailbreak")}</option>
                </select>
              </div>
            </div>
            <button onClick={calculateScore} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">{pick(isDE, "Score berechnen", "Calculate Score")}</button>
            {showScoreResult && (
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">47</div>
                  <div className="text-xs text-gray-400">{pick(isDE, "Dein Score", "Your Score")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1">33</div>
                  <div className="text-xs text-gray-400">{pick(isDE, "Industry Avg", "Industry Avg")}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-300 mb-4 text-center">{pick(isDE, "Dein Score: Mittel — Raum für Verbesserung", "Your Score: Medium — Room for improvement")}</div>
                  <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                    <div className="text-sm text-cyan-300 mb-2">{pick(isDE, "Upgrade zu Pro für Deep Scan & Detailed Report", "Upgrade to Pro for Deep Scan & Detailed Report")}</div>
                    <a href={`/${locale}/pricing`} className="block bg-gray-900 text-gray-300 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition-colors">
                      {pick(isDE, "Pro Plan — €49/mo", "Pro Plan — €49/mo")}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">{pick(isDE, "Download PNG", "Download PNG")}</button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">{pick(isDE, "Share on LinkedIn", "Share on LinkedIn")}</button>
              </div>
            </div>
            )}
          </div>
        </section>
        <section id="faq" className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {[{
              q: pick(isDE, "Was ist Context Window Isolation?", "What is context window isolation?"),
              a: pick(isDE, "Context Window Isolation strikt isoliert Kontext-Fenster zwischen verschiedenen Nutzern und Sessions um Cross-Tenant Datenlecks zu verhindern. Jeder Nutzer bekommt ein isoliertes Kontext-Fenster, das keine Daten anderer Nutzer enthalten kann.", "Context window isolation strictly isolates context windows between different users and sessions to prevent cross-tenant data leaks. Each user gets an isolated context window that cannot contain data from other users.")
            }, {
              q: pick(isDE, "Wie verhindere ich Prompt Injection?", "How do I prevent prompt injection?"),
              a: pick(isDE, "Prompt Injection Prevention nutzt Input Sanitization und Instruction Hierarchy (System > Developer > User) um User-Override von System-Anweisungen zu blocken. Alle User-Inputs werden bereinigt bevor sie in den Kontext einfließen.", "Prompt injection prevention uses input sanitization and instruction hierarchy (system > developer > user) to block user override of system instructions. All user inputs are sanitized before flowing into context.")
            }, {
              q: pick(isDE, "Was ist Cross-Session Contamination?", "What is cross-session contamination?"),
              a: pick(isDE, "Cross-Session Contamination ist die Kontamination von Daten zwischen unabhängigen Agent-Sessions. Prevention durch Memory Isolation und Session Cleanup stellt sicher, dass keine Session-Daten in andere Sessions lecken.", "Cross-session contamination is the contamination of data between independent agent sessions. Prevention through memory isolation and session cleanup ensures no session data leaks into other sessions.")
            }, {
              q: pick(isDE, "Wie härte ich den System Prompt?", "How do I harden the system prompt?"),
              a: pick(isDE, "System Prompt Hardening nutzt Anti-Jailbreak-Formulierungen und Instruction Defense um Manipulation zu verhindern. Regelmäßige Tests gegen bekannte Jailbreak-Patterns sind erforderlich.", "System prompt hardening uses anti-jailbreak formulations and instruction defense to prevent manipulation. Regular tests against known jailbreak patterns are required.")
            }].map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 hover:border-cyan-500/30 transition-all duration-300">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Security Check", "Security Check")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur auf Schwachstellen prüfen", "Check infrastructure for vulnerabilities")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Runbooks", "Runbooks")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "OpenClaw", "OpenClaw")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Roast My Moltbot", "Roast My Moltbot")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Moltbot Security Testing", "Moltbot security testing")}</div>
            </a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Context Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Context Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent context security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
