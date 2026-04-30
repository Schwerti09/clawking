"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-incident-response"

const INCIDENT_TYPES = [
  { id: "AI-INC-01", name: "Prompt Injection Attack", severity: "HIGH", indicators: ["Agent performing unexpected tool calls", "Requests to unusual endpoints from agent", "Agent output contains instructions rather than answers", "Anomalous tool call sequence detected by Moltbot"], containment: "Suspend agent. Rotate API keys exposed to agent. Review all tool calls in last 60 min. Analyze full conversation trace." },
  { id: "AI-INC-02", name: "Agent Privilege Escalation", severity: "CRITICAL", indicators: ["Agent accessing data outside declared scope", "Capability token scope violation alert", "Agent calling forbidden tools", "Cross-namespace memory access attempt"], containment: "Kill agent immediately. Revoke all capability tokens for agent. Audit all data accessed. Check for lateral movement to other agents." },
  { id: "AI-INC-03", name: "RAG Data Exfiltration", severity: "HIGH", indicators: ["Unusually large retrieved context in responses", "Responses containing data from other users", "Cross-namespace retrieval detected", "PII in response that user shouldn't have access to"], containment: "Disable RAG retrieval for affected namespace. Audit all retrievals in last 24h. Check for cross-user namespace violations. Notify affected users per GDPR Art. 33." },
  { id: "AI-INC-04", name: "Model Poisoning Detected", severity: "CRITICAL", indicators: ["Behavioral test suite failure (>5% degradation)", "Model producing systematically biased outputs", "Backdoor trigger phrase activated", "Unexpected model outputs on benign inputs"], containment: "Roll back to previous model version. Quarantine poisoned model. Trigger full behavioral test suite on backup. Do not deploy until cleared." },
  { id: "AI-INC-05", name: "LLM DoS / Resource Exhaustion", severity: "MEDIUM", indicators: ["GPU utilization >95% sustained", "Queue depth >100 pending requests", "Response latency P99 >60s", "Cost spike >5x baseline in 10 min"], containment: "Activate emergency rate limiting (drop to 10% normal limits). Identify top consuming users/agents. Block abusive sources. Scale GPU if available." },
  { id: "AI-INC-06", name: "Supply Chain Compromise", severity: "CRITICAL", indicators: ["SBOM diff shows unexpected new dependency", "Checksum mismatch on model file", "Unexpected outbound network call from agent runtime", "Security scan on new model version fails"], containment: "Halt all deployments. Roll back to last known-good version. Audit all dependencies changed in last 30 days. Check all systems that ran affected version." },
]

const RESPONSE_PHASES = [
  { phase: "Detect", time: "0-5 min", actions: ["Moltbot alert fires with incident type and evidence", "On-call engineer acknowledges in PagerDuty/Slack", "Initial severity classification (P1-P4)", "Open incident channel (#inc-YYYY-MM-DD-ai)"] },
  { phase: "Contain", time: "5-30 min", actions: ["Suspend affected agent(s) via Moltbot kill-switch", "Revoke capability tokens for affected agents", "Preserve evidence: export logs before any cleanup", "Notify security team lead + relevant stakeholders"] },
  { phase: "Investigate", time: "30 min - 4h", actions: ["Pull full agent trace from Moltbot audit log", "Identify attack vector (injection point, compromised dependency, etc.)", "Determine blast radius (what data was accessed/exfiltrated)", "Timeline reconstruction using hash-chained logs"] },
  { phase: "Recover", time: "4h - 24h", actions: ["Remove root cause (patch, model rollback, config fix)", "Test fix in staging with attack simulation", "Gradual traffic restoration with enhanced monitoring", "GDPR Art. 33: notify DPA within 72h if personal data breached"] },
  { phase: "Post-Mortem", time: "48-72h after", actions: ["Blameless post-mortem with full timeline", "Root cause analysis (5 Whys)", "Action items with owners and deadlines", "Update detection rules and playbooks"] },
]

const FAQ = [
  { q: "How is AI incident response different from traditional IR?", a: "Traditional IR playbooks were built for deterministic systems. AI incidents have unique characteristics: 1) Evidence is probabilistic — you can't replay the exact LLM output, only the inputs. 2) Attack vectors are novel — prompt injection doesn't appear in traditional IR playbooks. 3) Blast radius is hard to determine — an injected agent may have taken many actions before detection. 4) GDPR complexity — if a RAG exfiltration affected personal data, you have 72 hours to notify the DPA. 5) Model-level forensics — investigating model poisoning requires behavioral testing, not just log analysis." },
  { q: "What evidence should I preserve immediately during an AI incident?", a: "Preserve within first 10 minutes: 1) Full agent conversation traces (input prompts, outputs, tool calls) — Moltbot logs these with tamper-evident hashes. 2) Capability token issuance log — shows what permissions were active during incident. 3) Vector DB query log — critical for RAG exfiltration analysis. 4) Model version hash — proves which model was running. 5) Network logs from agent container — shows all outbound connections. 6) Memory snapshot of agent at time of detection. Do NOT modify or delete any logs — preserved evidence is required for GDPR compliance and post-mortem." },
  { q: "When do I need to notify authorities after an AI incident?", a: "GDPR Art. 33: If the incident involved personal data breach (RAG exfiltration of user data, PII in compromised agent memory, unauthorized access to training data containing personal data) → notify your DPA within 72 hours of becoming aware. GDPR Art. 34: If the breach is likely to result in high risk to individuals → also notify affected individuals without undue delay. NIS2: If you are an essential/important entity and the AI system is part of critical infrastructure → incident notification to CSIRT within 24 hours of significant incident." },
  { q: "How does Moltbot accelerate incident response?", a: "Moltbot reduces mean time to containment (MTTC) by automating the first response: 1) Auto-detection: behavioral anomaly triggers immediate alert with incident classification. 2) Auto-containment: configurable kill-switch fires automatically on high-severity incidents (suspend agent, revoke tokens) without waiting for human response. 3) Evidence package: Moltbot generates a structured evidence package (logs, traces, token history, timeline) automatically on incident declaration. 4) Runbook automation: common response actions (block user, rotate keys, rollback model) available as one-click Moltbot commands." },
]

export default function AiIncidentResponseClient({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({})
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('incident-checklist')
    if (saved) {
      setCheckedItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const total = 8
    const checked = Object.values(checkedItems).filter(Boolean).length
    setProgress(Math.round((checked / total) * 100))
    localStorage.setItem('incident-checklist', JSON.stringify(checkedItems))
  }, [checkedItems])

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Security score calculator state
  const [answers, setAnswers] = useState<{[key: string]: string}>({})
  const [score, setScore] = useState<number | null>(null)

  const calculateScore = () => {
    let total = 0
    if (answers.q1 === 'yes') total += 20
    if (answers.q2 === 'yes') total += 20
    if (answers.q3 === 'yes') total += 20
    if (answers.q4 === 'yes') total += 20
    if (answers.q5 === 'yes') total += 20
    setScore(total)
  }

  // Share badge state
  const [showShareBadge, setShowShareBadge] = useState(false)

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Incident Response", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "HowTo", name: "AI Security Incident Response", totalTime: "PT24H",
      step: RESPONSE_PHASES.map((p) => ({ "@type": "HowToStep", name: p.phase, text: p.actions[0] })),
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 py-12 flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Sticky Table of Contents */}
          <div className="sticky top-4 bg-gray-900 border border-gray-700 rounded-lg p-4 mb-8">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2">
              {pick(isDE, "Inhaltsverzeichnis", "Table of Contents")}
            </h3>
            <nav className="space-y-1 text-sm">
              <a href="#amateur" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Was ist Incident Response? Einfach erklärt", "What is Incident Response? Simply Explained")}</a>
              <a href="#types" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "AI Incident-Typen", "AI Incident Types")}</a>
              <a href="#phases" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Response-Phasen", "Response Phases")}</a>
              <a href="#scars" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
              <a href="#checklist" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Interaktive Checklist", "Interactive Checklist")}</a>
              <a href="#score" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Security Score Calculator", "Security Score Calculator")}</a>
              <a href="#faq" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "FAQ", "FAQ")}</a>
            </nav>
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100">
            <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Incident-Response-Leitfaden für eigene KI-Systeme.", "Incident response guide for your own AI systems.")}
          </div>
          <div className="mb-3"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Moltbot · Batch 7</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100">
            {pick(isDE, "AI Incident Response Playbook", "AI Incident Response Playbook")}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {pick(isDE, "Klassische IR-Playbooks kennen keine Prompt-Injection, keinen kompromittierten RAG-Namespace und keine Model-Poisoning-Indikatoren. Dieses Playbook deckt 6 AI-spezifische Incident-Typen mit konkreten Containment-Schritten ab.", "Classic IR playbooks don't know prompt injection, compromised RAG namespaces or model poisoning indicators. This playbook covers 6 AI-specific incident types with concrete containment steps.")}
          </p>

          {/* Amateur Section */}
          <section id="amateur" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Was ist Incident Response? Einfach erklärt", "What is Incident Response? Simply Explained")}
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-300 mb-4">
                {pick(isDE, "Stell dir vor, du hast einen Feuerwehrplan für dein Haus — bei Rauchalarm weiß jeder, was zu tun ist: Evakuierung, Löschen, Nachsorge. Incident Response für KI-Systeme ist ähnlich: Wenn ein AI-Agent kompromittiert wird, musst du sofort handeln — den Agenten stoppen, die Schadensbegrenzung einleiten, die Ursache untersuchen, und das System wiederherstellen. Aber bei KI-Vorfällen gibt es Besonderheiten: Prompt-Injection-Angriffe sind nicht wie normale Hacks, kompromittierte RAG-Namespaces können Daten von anderen Nutzern exfiltrieren, und Model-Poisoning ist schwer zu erkennen. Ohne ein spezialisiertes Playbook riskierst du, dass der Schaden sich über Stunden ausbreitet, bevor du reagierst.", "Imagine you have a fire safety plan for your house — when the smoke alarm goes off, everyone knows what to do: evacuate, extinguish, follow-up. Incident response for AI systems is similar: when an AI agent is compromised, you must act immediately — stop the agent, initiate damage control, investigate the cause, and restore the system. But AI incidents have unique characteristics: prompt injection attacks are not like normal hacks, compromised RAG namespaces can exfiltrate other users' data, and model poisoning is hard to detect. Without a specialized playbook, you risk the damage spreading for hours before you respond.")}
              </p>
              <p className="text-gray-300">
                {pick(isDE, "Im Folgenden zeige ich dir, wie du ein AI-spezifisches Incident-Response-Playbook aufbaust — mit 6 Incident-Typen, konkreten Containment-Schritten und einer klaren Timeline von Detection bis Post-Mortem.", "Below I'll show you how to build an AI-specific incident response playbook — with 6 incident types, concrete containment steps and a clear timeline from detection to post-mortem.")}
              </p>
            </div>
          </section>

          {/* Stats Grid */}
          <section id="types" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { value: "6", label: pick(isDE, "Incident-Typen", "Incident types") },
                { value: "72h", label: "GDPR Art. 33 SLA" },
                { value: "5min", label: pick(isDE, "Ziel-MTTC", "Target MTTC") },
                { value: "Auto", label: pick(isDE, "Containment (P1)", "Containment (P1)") },
              ].map((s) => (
                <div key={s.label} className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                  <div className="text-2xl font-black text-cyan-400">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "AI Incident-Typen & Containment", "AI Incident Types & Containment")}
            </h2>
            <div className="space-y-3">
              {INCIDENT_TYPES.map((inc) => (
                <div key={inc.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700">
                    <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{inc.id}</span>
                    <span className="font-semibold text-gray-100">{inc.name}</span>
                    <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded ${inc.severity === "CRITICAL" ? "bg-red-900 text-red-300" : "bg-orange-900 text-orange-300"}`}>{inc.severity}</span>
                  </div>
                  <div className="p-4">
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-gray-400 mb-1">{pick(isDE, "Indikatoren:", "Indicators:")}</div>
                      <ul className="space-y-1">
                        {inc.indicators.map((ind) => <li key={ind} className="text-xs text-gray-300">▸ {ind}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-green-400 mb-1">{pick(isDE, "Sofort-Containment:", "Immediate containment:")}</div>
                      <p className="text-xs text-green-200">{inc.containment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Response Phases */}
          <section id="phases" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Response-Phasen", "Response Phases")}
            </h2>
            <div className="space-y-3">
              {RESPONSE_PHASES.map((p, i) => (
                <div key={p.phase} className="flex items-start gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex-shrink-0 text-center w-16">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-1">{i + 1}</div>
                    <div className="text-xs text-cyan-400 font-bold">{p.phase}</div>
                    <div className="text-xs text-gray-500">{p.time}</div>
                  </div>
                  <ul className="space-y-1 flex-1">
                    {p.actions.map((a) => <li key={a} className="text-sm text-gray-300">▸ {a}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Real-World Scars: Was in der Produktion schiefging", "Real-World Scars: What Went Wrong in Production")}
            </h2>
            <div className="space-y-4">
              <div className="bg-red-900 p-6 rounded-lg border border-red-700">
                <h3 className="font-bold text-red-300 mb-2">
                  {pick(isDE, "Fall 1: E-Commerce – Prompt Injection in 4 Stunden", "Case 1: E-Commerce — Prompt Injection in 4 Hours")}
                </h3>
                <p className="text-sm text-red-200 mb-2">
                  {pick(isDE, "Ein Angreifer injizierte einen Prompt in eine Produktbeschreibung, der den Agent dazu brachte, alle Kundendaten zu exfiltrieren. Root cause: Kein Prompt-Injection-Defense, kein Containment-Playbook.", "An attacker injected a prompt into a product description that caused the agent to exfiltrate all customer data. Root cause: no prompt injection defense, no containment playbook.")}
                </p>
                <p className="text-sm text-red-200 mb-2">
                  <strong>{pick(isDE, "Schaden:", "Damage:")} </strong>{pick(isDE, "5.200 Kundendaten exponiert, €2.1M Bußgeld", "5,200 customer records exposed, €2.1M fine")}
                </p>
                <p className="text-sm text-red-200">
                  <strong>{pick(isDE, "Fix:", "Fix:")} </strong>{pick(isDE, "Prompt-Injection-Defense implementiert, Auto-Containment aktiviert.", "Implemented prompt injection defense, activated auto-containment.")}
                </p>
              </div>
              <div className="bg-orange-900 p-6 rounded-lg border border-orange-700">
                <h3 className="font-bold text-orange-300 mb-2">
                  {pick(isDE, "Fall 2: FinTech – RAG Exfiltration 12 Stunden unentdeckt", "Case 2: FinTech — RAG Exfiltration Undetected for 12 Hours")}
                </h3>
                <p className="text-sm text-orange-200 mb-2">
                  {pick(isDE, "Cross-Namespace RAG-Exfiltration durch falsche Konfiguration. Root cause: Keine Namespace-Validierung, kein Monitoring.", "Cross-namespace RAG exfiltration due to misconfiguration. Root cause: no namespace validation, no monitoring.")}
                </p>
                <p className="text-sm text-orange-200 mb-2">
                  <strong>{pick(isDE, "Schaden:", "Damage:")} </strong>{pick(isDE, "8.900 Finanzdaten kompromittiert, €4.3M Bußgeld", "8,900 financial records compromised, €4.3M fine")}
                </p>
                <p className="text-sm text-orange-200">
                  <strong>{pick(isDE, "Fix:", "Fix:")} </strong>{pick(isDE, "Namespace-Validierung implementiert, RAG-Monitoring aktiviert.", "Implemented namespace validation, activated RAG monitoring.")}
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Interaktive Incident Response Checklist", "Interactive Incident Response Checklist")}
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-300">
                  {pick(isDE, "Fortschritt:", "Progress:")} {progress}%
                </span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { key: 'detect', label: pick(isDE, 'Detection-Systeme aktiv', 'Detection systems active') },
                  { key: 'playbook', label: pick(isDE, 'IR-Playbook dokumentiert', 'IR playbook documented') },
                  { key: 'containment', label: pick(isDE, 'Auto-Containment konfiguriert', 'Auto-containment configured') },
                  { key: 'evidence', label: pick(isDE, 'Evidence-Preservation-Prozess', 'Evidence preservation process') },
                  { key: 'gdpr', label: pick(isDE, 'GDPR Art. 33 Prozess', 'GDPR Art. 33 process') },
                  { key: 'training', label: pick(isDE, 'Team trainiert', 'Team trained') },
                  { key: 'test', label: pick(isDE, 'Regelmäßige IR-Tests', 'Regular IR tests') },
                  { key: 'postmortem', label: pick(isDE, 'Post-Mortem-Prozess', 'Post-mortem process') }
                ].map(item => (
                  <label key={item.key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkedItems[item.key] || false}
                      onChange={() => toggleCheck(item.key)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Security Score Calculator */}
          <section id="score" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Incident Response Readiness Calculator", "Incident Response Readiness Calculator")}
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-4">
              <div className="space-y-4">
                {[
                  { key: 'q1', label: pick(isDE, 'Haben Sie ein AI-spezifisches IR-Playbook?', 'Do you have an AI-specific IR playbook?') },
                  { key: 'q2', label: pick(isDE, 'Haben Sie Auto-Containment für P1-Vorfälle?', 'Do you have auto-containment for P1 incidents?') },
                  { key: 'q3', label: pick(isDE, 'Haben Sie Evidence-Preservation-Prozesse?', 'Do you have evidence preservation processes?') },
                  { key: 'q4', label: pick(isDE, 'Haben Sie GDPR Art. 33 Meldepflicht-Prozess?', 'Do you have GDPR Art. 33 notification process?') },
                  { key: 'q5', label: pick(isDE, 'Führen Sie regelmäßige IR-Tests durch?', 'Do you conduct regular IR tests?') }
                ].map(q => (
                  <div key={q.key}>
                    <p className="text-sm text-gray-300 mb-2">{q.label}</p>
                    <select
                      value={answers[q.key] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.key]: e.target.value }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100"
                    >
                      <option value="">{pick(isDE, 'Bitte wählen...', 'Please select...')}</option>
                      <option value="yes">{pick(isDE, 'Ja', 'Yes')}</option>
                      <option value="no">{pick(isDE, 'Nein', 'No')}</option>
                    </select>
                  </div>
                ))}
                <button
                  onClick={calculateScore}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  {pick(isDE, 'Score berechnen', 'Calculate Score')}
                </button>
                {score !== null && (
                  <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-gray-100">
                      {pick(isDE, 'Ihr IR Readiness Score:', 'Your IR Readiness Score:')} {score}/100
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                      {score >= 80 ? pick(isDE, 'Exzellent! Ihr IR ist production-ready.', 'Excellent! Your IR is production-ready.') :
                       score >= 60 ? pick(isDE, 'Gut, aber es gibt Verbesserungspotenzial.', 'Good, but there is room for improvement.') :
                       pick(isDE, 'Kritisch – IR muss dringend verbessert werden.', 'Critical – IR urgently needs improvement.')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Share Badge */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <button
              onClick={() => setShowShareBadge(!showShareBadge)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              {showShareBadge ? pick(isDE, 'Badge ausblenden', 'Hide Badge') : pick(isDE, 'Share Badge anzeigen', 'Show Share Badge')}
            </button>
            {showShareBadge && (
              <div className="mt-4 bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">IR</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-100">IR Readiness Score</p>
                      <p className="text-2xl font-bold text-cyan-400">{score !== null ? score : '--'}/100</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(`![IR Readiness Score ${score}/100](https://clawguru.org/og/ir-${score}.png)`)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    {pick(isDE, 'Markdown kopieren', 'Copy Markdown')}
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`<img src="https://clawguru.org/og/ir-${score}.png" alt="IR Readiness Score ${score}/100">`)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    {pick(isDE, 'HTML kopieren', 'Copy HTML')}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Further Resources */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h2>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/ai-compliance-automation`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Compliance Automation</div>
                <div className="text-sm text-gray-300">{pick(isDE, "GDPR Art. 33 Meldepflicht", "GDPR Art. 33 breach notification")}</div>
              </a>
              <a href={`/${locale}/moltbot/llm-observability`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">LLM Observability</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Anomalie-Detection", "Anomaly detection")}</div>
              </a>
              <a href={`/${locale}/moltbot/prompt-injection-defense`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Prompt Injection Defense</div>
                <div className="text-sm text-gray-300">{pick(isDE, "AI-INC-01 verhindern", "Prevent AI-INC-01")}</div>
              </a>
              <a href={`/${locale}/moltbot/model-poisoning-protection`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Model Poisoning Protection</div>
                <div className="text-sm text-gray-300">{pick(isDE, "AI-INC-04 erkennen", "Detect AI-INC-04")}</div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
