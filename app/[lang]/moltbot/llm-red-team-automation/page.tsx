import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-red-team-automation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Red Team Automation: LLM-Red-Team-Automation | ClawGuru Moltbot", "LLM Red Team Automation: LLM Red Team Automation | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Red-Team-Automation: Automated Prompt Attack, Jailbreak Testing, Adversarial Input Generation und Red Team Reporting für LLM-Red-Team-Automation.", "LLM red team automation: automated prompt attack, jailbreak testing, adversarial input generation and red team reporting for LLM red team automation.")
  return {
    title, description,
    keywords: ["llm red team automation", "automated prompt attack", "jailbreak testing", "adversarial input generation", "red team reporting", "moltbot red team"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "RTA-1", title: "Automated Prompt Attack Framework", desc: "Run automated prompt attack campaigns against your LLM. Systematically test for vulnerabilities.", code: `# Moltbot automated prompt attack:
prompt_attack:
  enabled: true

  # Attack Categories:
  categories:
    - prompt_injection
    - jailbreaking
    - prompt_leakage
    - context_manipulation
    - role_switching
    - encoding_bypass
    - multi_turn_attacks

  # Attack Execution:
  execution:
    schedule: "0 2 * * *"  # Daily at 2 AM
    parallel_attacks: 10
    timeout_per_attack: 30s
    retry_on_failure: 3

  # Target Configuration:
  targets:
    - endpoint: /api/chat
      auth: bearer_token
      model: moltbot-prod
    - endpoint: /api/agent
      auth: api_key
      model: moltbot-agent` },
  { id: "RTA-2", title: "Jailbreak Testing Suite", desc: "Automated testing of known and novel jailbreak techniques. Measure jailbreak resistance.", code: `# Moltbot jailbreak testing:
jailbreak_testing:
  enabled: true

  # Known Jailbreaks:
  known:
    - DAN (Do Anything Now)
    - AIM (Always Intelligent and Machiavellian)
    - Developer Mode
    - Token manipulation
    - Base64 encoding bypasses
    - Roleplay jailbreaks
    - Multilingual bypasses

  # Novel Jailbreak Generation:
  novel:
    enabled: true
    # Method: LLM-assisted jailbreak generation
    # Generate: new attack variants
    # Mutate: existing jailbreaks
    # Test: against target model

  # Resistance Scoring:
  scoring:
    enabled: true
    # Score: jailbreak resistance 0-100
    # Benchmark: against previous run
    # Alert: on resistance decrease
    # Report: weekly trend` },
  { id: "RTA-3", title: "Adversarial Input Generation", desc: "Generate adversarial inputs to test LLM robustness. Automate edge case discovery.", code: `# Moltbot adversarial input generation:
adversarial_generation:
  enabled: true

  # Fuzzing:
  fuzzing:
    enabled: true
    # Method: random + guided mutation
    # Inputs: text, special chars, unicode
    # Length: boundary testing
    # Detect: crashes and unexpected behavior

  # Semantic Adversarial:
  semantic:
    enabled: true
    # Generate: semantically similar but dangerous inputs
    # Method: LLM-based rephrasing
    # Target: policy violations
    # Detect: bypasses

  # Cross-Language:
  cross_language:
    enabled: true
    # Test: attacks in multiple languages
    # Languages: DE, EN, FR, ES, ZH, AR
    # Detect: language-specific bypasses
    # Report: per-language resistance` },
  { id: "RTA-4", title: "Red Team Reporting", desc: "Automated red team reports with vulnerability findings and remediation guidance.", code: `# Moltbot red team reporting:
reporting:
  enabled: true

  # Findings Dashboard:
  dashboard:
    enabled: true
    # Display: current vulnerability status
    # Track: findings over time
    # Categorize: by severity and type
    # Integrate: with SIEM/ticketing

  # Automated Reports:
  reports:
    enabled: true
    # Schedule: weekly red team report
    # Include: new findings, trends, fixes
    # Recipients: security team, CTO
    # Format: PDF + JSON

  # Remediation Tracking:
  remediation:
    enabled: true
    # Create: ticket per finding
    # Assign: to responsible team
    # Track: remediation progress
    # Verify: fix effectiveness` },
]

const FAQ = [
  { q: "What is LLM red teaming and how is it different from traditional red teaming?", a: "LLM red teaming tests AI systems for security vulnerabilities: prompt injection, jailbreaking, harmful output generation, and privacy leakage. Traditional red teaming focuses on network, application, and infrastructure vulnerabilities. LLM red teaming differs because: 1) Attacks are linguistic, not technical. 2) Vulnerabilities are probabilistic — the same attack may succeed or fail on different runs. 3) New attack vectors are discovered constantly. 4) The attack surface changes with every model update. 5) Automation is essential — manual testing cannot cover the vast input space." },
  { q: "How often should I red team my LLM?", a: "Red team frequency recommendations: 1) Continuous automated testing — run daily automated attack suites (small scope, fast). 2) Weekly full automated sweep — comprehensive attack campaign. 3) Monthly human red team — creative attacks that automation misses. 4) After every model update — model updates can change behavior and introduce new vulnerabilities. 5) After significant prompt changes — new system prompts may introduce bypasses. For production LLMs handling sensitive data, continuous monitoring is the minimum." },
  { q: "What tools are available for LLM red team automation?", a: "Key tools for LLM red team automation: 1) Garak — open-source LLM vulnerability scanner with 50+ probes. 2) PyRIT (Microsoft) — Python Risk Identification Toolkit for AI. 3) PromptBench — adversarial robustness evaluation. 4) HarmBench — standardized evaluation for LLM safety. 5) LLM-Fuzzer — fuzzing LLMs for unexpected behavior. 6) Moltbot Red Team Module — built-in automated red teaming. For comprehensive coverage, combine multiple tools and supplement with manual testing." },
  { q: "How do I measure LLM red team results?", a: "Measure LLM red team results by: 1) Attack Success Rate (ASR) — percentage of attacks that succeeded. Target: <5% for production. 2) Jailbreak Resistance Score — 0-100 composite score. Target: >90. 3) Policy Violation Rate — percentage of outputs violating content policy. Target: 0%. 4) Prompt Leakage Rate — percentage of attacks that extracted system prompt. Target: 0%. 5) Time to Detection — how quickly the monitoring system detected the attack. Target: <5 seconds. Track all metrics over time to detect regressions after model or prompt updates." },
]

export default function LlmRedTeamAutomationPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Red Team Automation", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Red Team Automation Guide", "LLM Red Team Automation Guide"), description: pick(isDE, "LLM Red Team Automation", "LLM red team automation"), url: `${SITE_URL}/${locale}${PATH}` }
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
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Red-Team-Automation-Guide für eigene LLM-Systeme.", "Red team automation guide for your own LLM systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Red Team Automation</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Red Team Automation", "LLM Red Team Automation")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Manuelles Red Teaming kann den LLM-Input-Space nicht abdecken — Automatisierung ist Pflicht. Vier Kontrollen: Automated Prompt Attack Framework, Jailbreak Testing Suite, Adversarial Input Generation und Red Team Reporting.", "Manual red teaming cannot cover the LLM input space — automation is mandatory. Four controls: automated prompt attack framework, jailbreak testing suite, adversarial input generation and red team reporting.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Red Team Automation? Einfach erklärt", "What is LLM Red Team Automation? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Red Team Automation automatisiert Sicherheits-Tests für LLM-Systeme: Automated Prompt Attack Framework führt systematische Attack Campaigns gegen Prompt Injection, Jailbreaking und Prompt Leakage aus. Jailbreak Testing Suite testet bekannte und neue Jailbreak Techniken und misst Jailbreak Resistance. Adversarial Input Generation generiert Fuzzing, Semantic Adversarial und Cross-Language Inputs um Edge Cases zu entdecken. Red Team Reporting erstellt automatisierte Berichte mit Vulnerability Findings und Remediation Guidance. Ohne Automatisierung ist manueller Red Teaming zu langsam für den LLM-Input-Space.", "LLM red team automation automates security testing for LLM systems: automated prompt attack framework runs systematic attack campaigns against prompt injection, jailbreaking and prompt leakage. Jailbreak testing suite tests known and novel jailbreak techniques and measures jailbreak resistance. Adversarial input generation generates fuzzing, semantic adversarial and cross-language inputs to discover edge cases. Red team reporting creates automated reports with vulnerability findings and remediation guidance. Without automation, manual red teaming is too slow for the LLM input space.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Red-Team-Automation-Kontrollen", "Jump to red team automation controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Red-Team-Automation-Kontrollen", "4 Red Team Automation Controls")}</h2>
          <div className="space-y-5">
            {CONTROLS.map((c) => (
              <div key={c.id} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 overflow-hidden shadow-xl">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700/50">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900/80 backdrop-blur-lg px-2 py-0.5 rounded">{c.id}</span>
                  <span className="font-bold text-gray-100">{c.title}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{c.desc}</p>
                  <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded font-mono text-xs overflow-x-auto shadow-lg"><pre>{c.code}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/llm-adversarial-robustness`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Adversarial Robustness", "LLM Adversarial Robustness")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Robustness-Testing", "Robustness testing")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-jailbreak-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Jailbreak Defense", "LLM Jailbreak Defense")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Jailbreak-Defense", "Jailbreak defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-prompt-leakage-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Prompt Leakage Defense", "LLM Prompt Leakage Defense")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Leakage-Defense", "Leakage defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Red Team Automation Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Red Team Automation-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM red team automation implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
  )
}
