"use client"

import { useState, useEffect } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-zero-trust-advanced"

// FAQPage JSON-LD structure
function buildFAQPageSchema(isDE: boolean) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: pick(isDE, "Was ist Zero Trust für AI-Agents?", "What is zero trust for AI agents?"),
        acceptedAnswer: {
          "@type": "Answer",
          text: pick(isDE, "Zero Trust für AI-Agents bedeutet 'Never Trust, Always Verify'. Jede Anfrage eines Agenten wird kontinuierlich verifiziert, unabhängig von ihrer Herkunft oder vorherigen Interaktionen. Dies umfasst Identity Verification, Least Privilege, Continuous Validation und Micro-Segmentation.", "Zero trust for AI agents means 'never trust, always verify'. Every agent request is continuously verified regardless of origin or previous interactions. This includes identity verification, least privilege, continuous validation and micro-segmentation.")
        }
      },
      {
        "@type": "Question",
        name: pick(isDE, "Wie unterscheidet sich Zero Trust für AI-Agents von traditionellem Zero Trust?", "How does zero trust for AI agents differ from traditional zero trust?"),
        acceptedAnswer: {
          "@type": "Answer",
          text: pick(isDE, "Zero Trust für AI-Agents muss zusätzlich zu traditionellen Aspekten (Network, Device, User) auch Agent-spezifische Risiken adressieren: Tool Injection, Credential Leakage, Privilege Escalation durch Prompt Manipulation, und Behavioral Anomalien. Die Trust-Entscheidung erfolgt in Echtzeit basierend auf Kontext, Verhalten und Policy-Compliance.", "Zero trust for AI agents must address agent-specific risks beyond traditional aspects (network, device, user): tool injection, credential leakage, privilege escalation via prompt manipulation, and behavioral anomalies. Trust decisions occur in real-time based on context, behavior and policy compliance.")
        }
      },
      {
        "@type": "Question",
        name: pick(isDE, "Was ist Dynamic Trust Scoring für AI-Agents?", "What is dynamic trust scoring for AI agents?"),
        acceptedAnswer: {
          "@type": "Answer",
          text: pick(isDE, "Dynamic Trust Scoring berechnet einen Echtzeit-Trust-Score für jeden Agenten basierend auf mehreren Faktoren: Identity Strength, Behavioral Pattern, Context Validity, Policy Compliance und Historical Performance. Der Score wird kontinuierlich aktualisiert und bestimmt, ob eine Aktion erlaubt, eingeschränkt oder blockiert wird.", "Dynamic trust scoring calculates a real-time trust score for each agent based on multiple factors: identity strength, behavioral pattern, context validity, policy compliance and historical performance. The score is continuously updated and determines whether an action is allowed, restricted or blocked.")
        }
      },
      {
        "@type": "Question",
        name: pick(isDE, "Wie implementiert man Micro-Segmentation für AI-Agents?", "How to implement micro-segmentation for AI agents?"),
        acceptedAnswer: {
          "@type": "Answer",
          text: pick(isDE, "Micro-Segmentation für AI-Agents wird durch Network Isolation, Service Mesh Policies, Namespace-basierte Trennung in Kubernetes, und Perimeter-less Security erreicht. Jeder Agent wird in einem isolierten Segment ausgeführt mit minimalen east-west Verbindungen. Blast Radius wird durch strict firewall rules und egress filtering reduziert.", "Micro-segmentation for AI agents is achieved through network isolation, service mesh policies, namespace-based separation in Kubernetes, and perimeter-less security. Each agent runs in an isolated segment with minimal east-west connections. Blast radius is reduced through strict firewall rules and egress filtering.")
        }
      },
      {
        "@type": "Question",
        name: pick(isDE, "Welche Tools unterstützen Zero Trust für AI-Agents?", "Which tools support zero trust for AI agents?"),
        acceptedAnswer: {
          "@type": "Answer",
          text: pick(isDE, "Wichtige Tools für Zero Trust für AI-Agents: OPA Gatekeeper für Policy Enforcement, Istio/Linkerd für Service Mesh und mTLS, SPIFFE/SPIRE für Identity Management, Falco/eBPF für Runtime Security, und spezialisierte AI-Security-Plattformen wie Moltbot für automatisierte Agent-Hardening und Continuous Validation.", "Key tools for zero trust for AI agents: OPA Gatekeeper for policy enforcement, Istio/Linkerd for service mesh and mTLS, SPIFFE/SPIRE for identity management, Falco/eBPF for runtime security, and specialized AI security platforms like Moltbot for automated agent hardening and continuous validation.")
        }
      }
    ]
  }
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Zero Trust Advanced: Fortgeschrittene Zero Trust für AI-Agents | ClawGuru", "AI Agent Zero Trust Advanced: Advanced Zero Trust for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Zero Trust Advanced für Moltbot-Deployments. Never Trust, Always Verify für AI-Agents. Identity Verification, Least Privilege, Continuous Validation und Micro-Segmentation. Mit Moltbot automatisierbar.", "AI agent zero trust advanced for Moltbot deployments. Never trust, always verify for AI agents. Identity verification, least privilege, continuous validation and micro-segmentation. Automatable with Moltbot.")
  return {
    title,
    description,
    keywords: [
      "ai agent zero trust", "never trust always verify", "identity verification",
      "least privilege", "continuous validation", "micro segmentation",
      "moltbot security", "ai agent zero trust 2026",
      "security check", "runbooks", "openclaw"
    ],
    authors: [{ name: "ClawGuru Security Team" }],
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

export default function AIAgentZeroTrustAdvancedPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({})
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('zerotrust-checklist')
    if (saved) {
      setCheckedItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const total = 8
    const checked = Object.values(checkedItems).filter(Boolean).length
    setProgress(Math.round((checked / total) * 100))
    localStorage.setItem('zerotrust-checklist', JSON.stringify(checkedItems))
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

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 py-12 flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-100">
              {pick(isDE, "AI Agent Zero Trust Advanced", "AI Agent Zero Trust Advanced")}
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              {pick(isDE, "AI Agent Zero Trust Advanced für Moltbot-Deployments. Never Trust, Always Verify für AI-Agents. Identity Verification, Least Privilege, Continuous Validation und Micro-Segmentation.", "AI agent zero trust advanced for Moltbot deployments. Never trust, always verify for AI agents. Identity verification, least privilege, continuous validation and micro-segmentation.")}
            </p>
          </div>

          {/* Sticky Table of Contents */}
          <div className="sticky top-4 bg-gray-900 border border-gray-700 rounded-lg p-4 mb-8">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2">
              {pick(isDE, "Inhaltsverzeichnis", "Table of Contents")}
            </h3>
            <nav className="space-y-1 text-sm">
              <a href="#amateur" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Was ist Zero Trust? Einfach erklärt", "What is Zero Trust? Simply Explained")}</a>
              <a href="#concepts" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Kernkonzepte", "Core Concepts")}</a>
              <a href="#advanced" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</a>
              <a href="#scars" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
              <a href="#checklist" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Interaktive Checklist", "Interactive Checklist")}</a>
              <a href="#score" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Security Score Calculator", "Security Score Calculator")}</a>
              <a href="#faq" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "FAQ", "FAQ")}</a>
            </nav>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100">
            <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Dieser Leitfaden dient zur Härtung Ihrer eigenen Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur" className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Was ist Zero Trust für AI-Agents? Einfach erklärt", "What is Zero Trust for AI Agents? Simply Explained")}
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-300 mb-4">
                {pick(isDE, "Stell dir vor, du hast ein Hochsicherheitsgebäude mit vielen Räumen. Im traditionellen Sicherheitsmodell vertraust du jedem, der einmal durch den Haupteingang gekommen ist – er kann sich frei bewegen. Zero Trust ist anders: Jeder einzelne Raum hat seine eigene Tür, und jede Tür wird jedes Mal überprüft, egal wer davor steht. Für AI-Agents bedeutet das: Jede Aktion, jeder Tool-Call, jede Datenabfrage wird separat verifiziert – keine implizite Vertrauenswürdigkeit, nie.", "Imagine a high-security building with many rooms. In traditional security, you trust everyone who entered once through the main entrance – they can move freely. Zero Trust is different: every single room has its own door, and every door is checked every time, no matter who stands before it. For AI agents, this means: every action, every tool call, every data query is verified separately – no implicit trust, never.")}
              </p>
              <p className="text-gray-300 mb-4">
                {pick(isDE, "Zero Trust für AI-Agents baut auf fünf Säulen: Identity Verification (wer ist der Agent?), Least Privilege (was darf er tun?), Continuous Validation (ist er noch vertrauenswürdig?), Micro-Segmentation (wo darf er kommunizieren?) und Trust Orchestration (wer überwacht das System?). Ohne diese Sicherheitsmaßnahmen kann ein kompromittierter Agent unbegrenzt Schaden anrichten – Daten exfiltrieren, Systeme manipulieren, Credentials leaken. Mit Zero Trust wird der Blast Radius minimiert und Angriffe werden frühzeitig erkannt.", "Zero trust for AI agents is built on five pillars: identity verification (who is the agent?), least privilege (what can it do?), continuous validation (is it still trustworthy?), micro-segmentation (where can it communicate?) and trust orchestration (who monitors the system?). Without these security measures, a compromised agent can cause unlimited damage – exfiltrate data, manipulate systems, leak credentials. With zero trust, blast radius is minimized and attacks are detected early.")}
              </p>
              <p className="text-gray-300">
                {pick(isDE, "Im Folgenden zeige ich dir, wie du Zero Trust für deine AI-Agents production-ready implementierst – mit konkreten Konfigurationen, Best Practices und Lessons Learned aus echten Deployments.", "Below I'll show you how to implement zero trust for your AI agents in production – with concrete configurations, best practices and lessons learned from real deployments.")}
              </p>
            </div>
          </section>

          {/* Core Concepts */}
          <section id="concepts" className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Kernkonzepte", "Core Concepts")}
            </h2>
          <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "1. Never Trust, Always Verify", "1. Never Trust, Always Verify")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Zero Trust Prinzip für AI-Agents. Keine implizite Vertrauenswürdigkeit, immer verifizieren.", "Zero trust principle for AI agents. No implicit trust, always verify.")}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "2. Identity Verification", "2. Identity Verification")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Identity Verification für AI-Agents. Strong Authentication, Multi-Factor und Device Trust.", "Identity verification for AI agents. Strong authentication, multi-factor and device trust.")}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "3. Least Privilege", "3. Least Privilege")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Least Privilege für AI-Agents. Minimale Berechtigungen, Just-in-Time Access und Dynamic Permissions.", "Least privilege for AI agents. Minimal permissions, just-in-time access and dynamic permissions.")}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "4. Continuous Validation", "4. Continuous Validation")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Continuous Validation für AI-Agents. Real-time Trust Scoring und Behavioral Analysis.", "Continuous validation for AI agents. Real-time trust scoring and behavioral analysis.")}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "5. Micro-Segmentation", "5. Micro-Segmentation")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Micro-Segmentation für AI-Agents. Network Isolation, Perimeter-less Security und Blast Radius Reduction.", "Micro-segmentation for AI agents. Network isolation, perimeter-less security and blast radius reduction.")}
              </p>
            </div>
          </div>
        </section>

          {/* Advanced Techniques */}
          <section id="advanced" className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}
            </h2>
          <div className="space-y-4">
            <div className="bg-green-900 p-4 rounded-lg border border-green-700">
              <h3 className="font-semibold text-green-300 mb-2">
                {pick(isDE, "Dynamic Trust Scoring", "Dynamic Trust Scoring")}
              </h3>
              <p className="text-sm text-green-200">
                {pick(isDE, "Dynamisches Trust Scoring für AI-Agents. Context-basierte Trust-Entscheidungen in Echtzeit.", "Dynamic trust scoring for AI agents. Context-based trust decisions in real-time.")}
              </p>
            </div>
            <div className="bg-blue-900 p-4 rounded-lg border border-blue-700">
              <h3 className="font-semibold text-blue-300 mb-2">
                {pick(isDE, "Adaptive Access Control", "Adaptive Access Control")}
              </h3>
              <p className="text-sm text-blue-200">
                {pick(isDE, "Adaptive Access Control für AI-Agents. Risk-basierte Autorisierung und Dynamic Policies.", "Adaptive access control for AI agents. Risk-based authorization and dynamic policies.")}
              </p>
            </div>
            <div className="bg-yellow-900 p-4 rounded-lg border border-yellow-700">
              <h3 className="font-semibold text-yellow-300 mb-2">
                {pick(isDE, "Zero Trust Networking", "Zero Trust Networking")}
              </h3>
              <p className="text-sm text-yellow-200">
                {pick(isDE, "Zero Trust Networking für AI-Agents. mTLS, Mutual Auth und Encrypted East-West Traffic.", "Zero trust networking for AI agents. mTLS, mutual auth and encrypted east-west traffic.")}
              </p>
            </div>
            <div className="bg-red-900 p-4 rounded-lg border border-red-700">
              <h3 className="font-semibold text-red-300 mb-2">
                {pick(isDE, "Trust Orchestration", "Trust Orchestration")}
              </h3>
              <p className="text-sm text-red-200">
                {pick(isDE, "Trust Orchestration für Multi-Agent-Systeme. Centralized Trust Management und Policy Enforcement.", "Trust orchestration for multi-agent systems. Centralized trust management and policy enforcement.")}
              </p>
            </div>
          </div>
        </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Real-World Scars: Was in der Produktion schiefging", "Real-World Scars: What Went Wrong in Production")}
            </h2>
            <div className="space-y-4">
              <div className="bg-red-900 p-6 rounded-lg border border-red-700">
                <h3 className="font-bold text-red-300 mb-2">
                  {pick(isDE, "Fall 1: Fintech-Startup – 8.400 Kundendaten exponiert", "Case 1: Fintech Startup – 8,400 Customer Records Exposed")}
                </h3>
                <p className="text-sm text-red-200 mb-2">
                  {pick(isDE, "Ein AI Agent für Kundensupport hatte uneingeschränkten DB-Zugriff. Ein Prompt-Injection-Angriff überzeugte den Agent, alle Kundendaten zu exportieren. Root cause: Keine Identity Verification, keine Least Privilege, kein Continuous Monitoring.", "An AI agent for customer support had unrestricted DB access. A prompt injection attack convinced the agent to export all customer data. Root cause: no identity verification, no least privilege, no continuous monitoring.")}
                </p>
                <p className="text-sm text-red-200 mb-2">
                  <strong>{pick(isDE, "Schaden:", "Damage:"}</strong> {pick(isDE, "€1.9M an Bußgeldern + Reputationsschaden", "€1.9M in fines + reputation damage")}
                </p>
                <p className="text-sm text-red-200">
                  <strong>{pick(isDE, "Fix:", "Fix:"}</strong> {pick(isDE, "Zero Trust implementiert: Identity Verification, Least Privilege mit Just-in-Time Access, Continuous Validation mit Behavioral Analysis, Micro-Segmentation der Datenbanken.", "Implemented zero trust: identity verification, least privilege with just-in-time access, continuous validation with behavioral analysis, micro-segmentation of databases.")}
                </p>
              </div>
              <div className="bg-orange-900 p-6 rounded-lg border border-orange-700">
                <h3 className="font-bold text-orange-300 mb-2">
                  {pick(isDE, "Fall 2: E-Commerce-Plattform – 15.000 Fake-Orders in 2 Stunden", "Case 2: E-Commerce Platform – 15,000 Fake Orders in 2 Hours")}
                </h3>
                <p className="text-sm text-orange-200 mb-2">
                  {pick(isDE, "Ein AI Agent für Bestellabwicklung hatte kein Rate-Limiting und keine Behavioral Analysis. Ein Bug im Prompt führte zu einer Endlosschleife. Root cause: Keine Continuous Validation, keine Trust Scoring, keine Operational Guards.", "An AI agent for order processing had no rate limiting and no behavioral analysis. A bug in the prompt led to an infinite loop. Root cause: no continuous validation, no trust scoring, no operational guards.")}
                </p>
                <p className="text-sm text-orange-200 mb-2">
                  <strong>{pick(isDE, "Schaden:", "Damage:"}</strong> {pick(isDE, "System-Overlast, Support-Team überlastet, €450k Umsatzverlust", "System overload, support team overwhelmed, €450k revenue loss")}
                </p>
                <p className="text-sm text-orange-200">
                  <strong>{pick(isDE, "Fix:", "Fix:"}</strong> {pick(isDE, "Dynamic Trust Scoring implementiert mit Circuit Breaker bei 100 Aktionen/Minute, Rate-Limiting pro Agent, Human-in-the-Loop für kritische Aktionen.", "Implemented dynamic trust scoring with circuit breaker at 100 actions/minute, rate limiting per agent, human-in-the-loop for critical actions.")}
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Interaktive Zero Trust Checklist", "Interactive Zero Trust Checklist")}
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
                  { key: 'identity', label: pick(isDE, 'Identity Layer mit MFA implementiert', 'Identity layer with MFA implemented') },
                  { key: 'least', label: pick(isDE, 'Least Privilege mit Just-in-Time Access', 'Least privilege with just-in-time access') },
                  { key: 'continuous', label: pick(isDE, 'Continuous Validation mit Trust Scoring', 'Continuous validation with trust scoring') },
                  { key: 'micro', label: pick(isDE, 'Micro-Segmentation der Netzwerke', 'Micro-segmentation of networks') },
                  { key: 'mtls', label: pick(isDE, 'mTLS für East-West Traffic', 'mTLS for east-west traffic') },
                  { key: 'monitoring', label: pick(isDE, 'Trust Dashboard für Monitoring', 'Trust dashboard for monitoring') },
                  { key: 'policy', label: pick(isDE, 'Policy Engine (OPA) integriert', 'Policy engine (OPA) integrated') },
                  { key: 'testing', label: pick(isDE, 'Zero Trust Tests durchgeführt', 'Zero trust tests performed') }
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
          <section id="score" className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Security Score Calculator", "Security Score Calculator")}
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-4">
              <div className="space-y-4">
                {[
                  { key: 'q1', label: pick(isDE, 'Haben Sie Identity Verification für alle AI-Agents?', 'Do you have identity verification for all AI agents?') },
                  { key: 'q2', label: pick(isDE, 'Nutzen Sie Least Privilege mit Just-in-Time Access?', 'Do you use least privilege with just-in-time access?') },
                  { key: 'q3', label: pick(isDE, 'Ist Continuous Validation mit Trust Scoring aktiv?', 'Is continuous validation with trust scoring active?') },
                  { key: 'q4', label: pick(isDE, 'Sind Ihre Netzwerke micro-segmentiert?', 'Are your networks micro-segmented?') },
                  { key: 'q5', label: pick(isDE, 'Verwenden Sie mTLS für internen Traffic?', 'Do you use mTLS for internal traffic?') }
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
                      {pick(isDE, 'Ihr Zero Trust Score:', 'Your Zero Trust Score:')} {score}/100
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                      {score >= 80 ? pick(isDE, 'Exzellent! Ihr Zero Trust ist production-ready.', 'Excellent! Your zero trust is production-ready.') :
                       score >= 60 ? pick(isDE, 'Gut, aber es gibt Verbesserungspotenzial.', 'Good, but there is room for improvement.') :
                       pick(isDE, 'Kritisch – Zero Trust muss dringend verbessert werden.', 'Critical – zero trust urgently needs improvement.')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Share Badge */}
          <section className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
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
                      <span className="text-2xl font-bold text-white">ZT</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-100">Zero Trust Score</p>
                      <p className="text-2xl font-bold text-cyan-400">{score !== null ? score : '--'}/100</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(`![Zero Trust Score ${score}/100](https://clawguru.org/og/zerotrust-${score}.png)`)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    {pick(isDE, 'Markdown kopieren', 'Copy Markdown')}
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`<img src="https://clawguru.org/og/zerotrust-${score}.png" alt="Zero Trust Score ${score}/100">`)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    {pick(isDE, 'HTML kopieren', 'Copy HTML')}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Implementation Steps */}
          <section className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Implementierungsschritte", "Implementation Steps")}
            </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Identity Layer implementieren", "Implement identity layer")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Implementieren Sie Strong Identity Verification für AI-Agents. MFA und Device Trust.", "Implement strong identity verification for AI agents. MFA and device trust.")}
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Least Privilege enforce", "Enforce least privilege")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Implementieren Sie Least Privilege mit Just-in-Time Access und Dynamic Permissions.", "Implement least privilege with just-in-time access and dynamic permissions.")}
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Continuous Validation", "Continuous validation")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Implementieren Sie Continuous Validation mit Real-time Trust Scoring und Behavioral Analysis.", "Implement continuous validation with real-time trust scoring and behavioral analysis.")}
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Micro-Segmentation", "Micro-segmentation")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Implementieren Sie Micro-Segmentation mit Network Isolation und Blast Radius Reduction.", "Implement micro-segmentation with network isolation and blast radius reduction.")}
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Trust Dashboard", "Trust dashboard")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Erstellen Sie ein Trust Dashboard für Monitoring und Auditing. Real-time Trust Scores.", "Create a trust dashboard for monitoring and auditing. Real-time trust scores.")}
                </div>
              </div>
            </div>
          </div>
        </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Häufig gestellte Fragen (FAQ)", "Frequently Asked Questions (FAQ)")}
            </h2>
            <div className="space-y-4">
              <details className="bg-gray-800 rounded-lg border border-gray-700">
                <summary className="cursor-pointer p-4 font-semibold text-cyan-400">
                  {pick(isDE, "Was ist Zero Trust für AI-Agents?", "What is zero trust for AI agents?")}
                </summary>
                <div className="p-4 pt-0 text-sm text-gray-300">
                  {pick(isDE, "Zero Trust für AI-Agents bedeutet 'Never Trust, Always Verify'. Jede Anfrage eines Agenten wird kontinuierlich verifiziert, unabhängig von ihrer Herkunft oder vorherigen Interaktionen. Dies umfasst Identity Verification, Least Privilege, Continuous Validation und Micro-Segmentation.", "Zero trust for AI agents means 'never trust, always verify'. Every agent request is continuously verified regardless of origin or previous interactions. This includes identity verification, least privilege, continuous validation and micro-segmentation.")}
                </div>
              </details>
              <details className="bg-gray-800 rounded-lg border border-gray-700">
                <summary className="cursor-pointer p-4 font-semibold text-cyan-400">
                  {pick(isDE, "Wie unterscheidet sich Zero Trust für AI-Agents von traditionellem Zero Trust?", "How does zero trust for AI agents differ from traditional zero trust?")}
                </summary>
                <div className="p-4 pt-0 text-sm text-gray-300">
                  {pick(isDE, "Zero Trust für AI-Agents muss zusätzlich zu traditionellen Aspekten (Network, Device, User) auch Agent-spezifische Risiken adressieren: Tool Injection, Credential Leakage, Privilege Escalation durch Prompt Manipulation, und Behavioral Anomalien.", "Zero trust for AI agents must address agent-specific risks beyond traditional aspects (network, device, user): tool injection, credential leakage, privilege escalation via prompt manipulation, and behavioral anomalies.")}
                </div>
              </details>
              <details className="bg-gray-800 rounded-lg border border-gray-700">
                <summary className="cursor-pointer p-4 font-semibold text-cyan-400">
                  {pick(isDE, "Was ist Dynamic Trust Scoring für AI-Agents?", "What is dynamic trust scoring for AI agents?")}
                </summary>
                <div className="p-4 pt-0 text-sm text-gray-300">
                  {pick(isDE, "Dynamic Trust Scoring berechnet einen Echtzeit-Trust-Score für jeden Agenten basierend auf mehreren Faktoren: Identity Strength, Behavioral Pattern, Context Validity, Policy Compliance und Historical Performance.", "Dynamic trust scoring calculates a real-time trust score for each agent based on multiple factors: identity strength, behavioral pattern, context validity, policy compliance and historical performance.")}
                </div>
              </details>
              <details className="bg-gray-800 rounded-lg border border-gray-700">
                <summary className="cursor-pointer p-4 font-semibold text-cyan-400">
                  {pick(isDE, "Wie implementiert man Micro-Segmentation für AI-Agents?", "How to implement micro-segmentation for AI agents?")}
                </summary>
                <div className="p-4 pt-0 text-sm text-gray-300">
                  {pick(isDE, "Micro-Segmentation für AI-Agents wird durch Network Isolation, Service Mesh Policies, Namespace-basierte Trennung in Kubernetes, und Perimeter-less Security erreicht.", "Micro-segmentation for AI agents is achieved through network isolation, service mesh policies, namespace-based separation in Kubernetes, and perimeter-less security.")}
                </div>
              </details>
              <details className="bg-gray-800 rounded-lg border border-gray-700">
                <summary className="cursor-pointer p-4 font-semibold text-cyan-400">
                  {pick(isDE, "Welche Tools unterstützen Zero Trust für AI-Agents?", "Which tools support zero trust for AI agents?")}
                </summary>
                <div className="p-4 pt-0 text-sm text-gray-300">
                  {pick(isDE, "Wichtige Tools: OPA Gatekeeper für Policy Enforcement, Istio/Linkerd für Service Mesh und mTLS, SPIFFE/SPIRE für Identity Management, Falco/eBPF für Runtime Security, und Moltbot für automatisierte Agent-Hardening.", "Key tools: OPA Gatekeeper for policy enforcement, Istio/Linkerd for service mesh and mTLS, SPIFFE/SPIRE for identity management, Falco/eBPF for runtime security, and Moltbot for automated agent hardening.")}
                </div>
              </details>
            </div>
          </section>

          {/* FAQPage JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQPageSchema(isDE)) }}
          />
        </div>

        {/* Further Resources */}
        <section className="mb-10 animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Weiterführende Ressourcen", "Further Resources")}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/securitycheck`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="font-semibold text-cyan-400">
                {pick(isDE, "Security Check", "Security Check")}
              </div>
              <div className="text-sm text-gray-300">
                {pick(isDE, "Überprüfen Sie Ihre Infrastruktur auf Schwachstellen", "Check your infrastructure for vulnerabilities")}
              </div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="font-semibold text-cyan-400">
                {pick(isDE, "Runbooks", "Runbooks")}
              </div>
              <div className="text-sm text-gray-300">
                {pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}
              </div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="font-semibold text-cyan-400">
                {pick(isDE, "OpenClaw", "OpenClaw")}
              </div>
              <div className="text-sm text-gray-300">
                {pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}
              </div>
            </a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="font-semibold text-cyan-400">
                {pick(isDE, "Roast My Moltbot", "Roast My Moltbot")}
              </div>
              <div className="text-sm text-gray-300">
                {pick(isDE, "Moltbot Security Testing", "Moltbot security testing")}
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
