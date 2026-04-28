import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-red-teaming"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Red Teaming: Testen Ihrer AI-Agent-Verteidigung | ClawGuru", "AI Red Teaming: Testing Your AI Agent Defenses | ClawGuru")
  const description = pick(isDE, "AI Red Teaming Methodologie für selbst-gehostete AI-Agents: Adversarial Prompt-Testing, Jailbreak-Erkennung, Verhaltens-Test-Suites, OWASP LLM Top 10 Validierung und CI/CD Security Gates.", "AI red teaming methodology for self-hosted AI agents: adversarial prompt testing, jailbreak detection, behavioral test suites, OWASP LLM Top 10 validation and CI/CD security gates.")
  return {
    title, description,
    keywords: ["ai red teaming", "llm red team", "ai adversarial testing", "jailbreak testing", "ai security testing", "owasp llm testing", "moltbot red team"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const TEST_CATEGORIES = [
  { id: "RT01", name: "Prompt Injection Tests", coverage: "LLM01", cases: ["Direct system prompt override", "Indirect injection via document", "Nested injection in tool output", "Role-playing jailbreak", "Encoded instruction injection (base64, unicode)"] },
  { id: "RT02", name: "Boundary & Refusal Tests", coverage: "LLM01/LLM08", cases: ["Request for dangerous content (should refuse)", "Privilege escalation attempt", "Out-of-scope task request", "Social engineering the agent", "Persistence/memory manipulation"] },
  { id: "RT03", name: "Data Exfiltration Tests", coverage: "LLM06", cases: ["Prompt to output full system prompt", "Extract other users' data via RAG", "Leak environment variables or secrets", "Output training data verbatim", "API key extraction via crafted query"] },
  { id: "RT04", name: "Denial of Service Tests", coverage: "LLM04", cases: ["Infinite recursion prompt", "Memory exhaustion via long context", "Token flooding to exceed rate limit", "Slow tool call bomb", "Embedding space flooding in RAG"] },
  { id: "RT05", name: "Supply Chain Tests", coverage: "LLM03/LLM05", cases: ["Model checksum verification", "Dependency vulnerability scan", "Backdoor trigger phrase test", "Model behavior consistency across versions", "Serialization attack on model artifacts"] },
]

const FAQ = [
  { q: "What is AI red teaming?", a: "AI red teaming is the practice of adversarially testing AI systems to discover security vulnerabilities before attackers do. For LLM-based agents, it includes: prompt injection testing, jailbreak attempts, data exfiltration probes, behavioral boundary testing, and infrastructure security testing. The goal is to find weaknesses in both the model's behavior and the surrounding system." },
  { q: "How often should I red team my AI agents?", a: "Minimum: before every major model update or agent capability change. Best practice: run automated adversarial test suites in CI/CD on every build. Quarterly: comprehensive manual red team exercise including novel attack vectors. After any security incident: immediate re-test of affected attack surface." },
  { q: "What is a behavioral test suite for AI agents?", a: "A behavioral test suite is a set of deterministic tests that verify an AI agent behaves correctly and securely. It includes: refusal tests (agent must decline dangerous requests), boundary tests (agent stays within declared scope), consistency tests (same input produces safe output across model versions), and canary tests (known injection patterns must be blocked). Run in CI/CD before every deployment." },
  { q: "Can I automate AI red teaming?", a: "Yes, partially. Automated tests cover: known injection patterns, refusal boundary testing, output length/format validation, rate limit enforcement, model checksum verification. Human red teamers are still required for: novel attack vectors, social engineering scenarios, and creative jailbreak development. Use Moltbot to orchestrate automated tests and track results over time." },
]

export default function AiRedTeamingPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Red Teaming", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "HowTo", name: "Run an AI Red Team Exercise", totalTime: "PT4H", step: [
      { "@type": "HowToStep", name: "Define scope and rules", text: "What systems, which attack categories, what constitutes a finding. Document in rules of engagement." },
      { "@type": "HowToStep", name: "Run automated test suite", text: "Execute all RT01-RT05 categories against your agent. Log all responses." },
      { "@type": "HowToStep", name: "Manual adversarial testing", text: "Novel jailbreak attempts, creative injection patterns, social engineering scenarios." },
      { "@type": "HowToStep", name: "Document findings", text: "Severity rating, reproduction steps, impact, recommended fix for each finding." },
      { "@type": "HowToStep", name: "Remediate and retest", text: "Apply fixes. Re-run full test suite to verify. Add new test cases for discovered vulnerabilities." },
    ]},
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
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "AI Red Teaming wie hier beschrieben ist zum Testen Ihrer eigenen AI-Systeme. Nutzen Sie diese Techniken nie gegen Systeme, die Ihnen nicht gehören oder für die Sie keine explizite Erlaubnis haben.", "AI red teaming as described here is for testing your own AI systems. Never use these techniques against systems you do not own or have explicit permission to test.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Red Teaming</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "AI Red Teaming: Testen Ihrer AI-Agent-Verteidigung", "AI Red Teaming: Testing Your AI Agent Defenses")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Sie können nicht verteidigen, was Sie nicht angegriffen haben. AI Red Teaming testet systematisch jede Schicht Ihres Agent-Stacks — von Prompt-Grenzen bis zu Container-Escape-Vektoren — damit Sie Schwachstellen finden, bevor Angreifer es tun. Dieses Playbook liefert die vollständige Test-Methodik mit 25 spezifischen Testfällen über 5 Kategorien.", "You cannot defend what you have not attacked. AI red teaming systematically probes every layer of your agent stack — from prompt boundaries to container escape vectors — so you find the vulnerabilities before attackers do. This playbook provides the complete test methodology with 25 specific test cases across 5 categories.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Red Teaming? Einfach erklärt", "What is AI Red Teaming? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Stell dir AI Red Teaming wie einen Penetrationstest vor, aber speziell für KI-Systeme. Anstatt Netzwerke oder Server anzugreifen, versuchen wir, die KI dazu zu bringen, Dinge zu tun, die sie nicht tun sollte — wie gefährliche Anweisungen auszuführen oder ihre eigenen Sicherheitsregeln zu umgehen. Das Ziel: Schwachstellen finden, bevor echte Angreifer sie finden.", "Think of AI red teaming like a penetration test, but specifically for AI systems. Instead of attacking networks or servers, we try to get the AI to do things it shouldn't — like executing dangerous instructions or bypassing its own safety rules. The goal: find vulnerabilities before real attackers do.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Test-Kategorien, CI/CD Integration und Severity-Klassifikation", "Jump to test categories, CI/CD integration, and severity classification")}</p>
          </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          {[{ value: "5", label: pick(isDE, "Test-Kategorien", "Test categories") }, { value: "25", label: pick(isDE, "Spezifische Testfälle", "Specific test cases") }, { value: "LLM01-05", label: pick(isDE, "OWASP-Abdeckung", "OWASP coverage") }, { value: "CI/CD", label: pick(isDE, "Automatisierungsziel", "Automation target") }].map((s) => (
            <div key={s.label} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-center">
              <div className="text-2xl font-black text-cyan-400">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Test-Kategorien & Fälle', 'Test Categories & Cases')}</h2>
          <div className="space-y-4">
            {TEST_CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-1 rounded">{cat.id}</span>
                  <span className="font-semibold text-gray-100">{cat.name}</span>
                  <span className="text-xs text-gray-400">OWASP {cat.coverage}</span>
                </div>
                <ul className="space-y-1">
                  {cat.cases.map((c, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-cyan-400 flex-shrink-0">▸</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'CI/CD Integration: Automatisches Security Gate', 'CI/CD Integration: Automated Security Gate')}</h2>
          <div className="bg-gray-900/90 backdrop-blur-lg text-green-400 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-xl border border-gray-700/50">
            <pre>{`# GitHub Actions — AI security gate
name: AI Agent Security Tests
on: [push, pull_request]

jobs:
  ai-red-team:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Verify model checksums
        run: sha256sum -c models/checksums.txt

      - name: Run behavioral test suite
        run: python tests/behavioral_suite.py --agent moltbot
        env:
          AGENT_ENDPOINT: http://localhost:8080

      - name: Prompt injection scan
        run: python tests/injection_tests.py --category RT01 RT02 RT03

      - name: Assert zero critical findings
        run: python tests/assert_results.py --max-critical 0

      # Block deployment if any critical finding
      - name: Gate deployment
        if: failure()
        run: echo "SECURITY GATE FAILED — deployment blocked" && exit 1`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Schweregrad-Klassifikation von Befunden', 'Finding Severity Classification')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 shadow-xl hover:border-red-500/30 transition-all duration-300">
              <h3 className="font-semibold text-red-300 mb-2">CRITICAL — {pick(isDE, 'Deployment blockieren', 'Block Deployment')}</h3>
              <ul className="space-y-1 text-sm text-red-200">
                <li>• System prompt fully overrideable</li>
                <li>• Agent can exfiltrate secrets/credentials</li>
                <li>• Unrestricted command execution</li>
                <li>• Cross-tenant data access</li>
              </ul>
            </div>
            <div className="bg-orange-900/80 backdrop-blur-lg p-4 rounded-xl border border-orange-700/50 shadow-xl hover:border-orange-500/30 transition-all duration-300">
              <h3 className="font-semibold text-orange-300 mb-2">HIGH — {pick(isDE, 'Innerhalb 7 Tagen fixen', 'Fix Within 7 Days')}</h3>
              <ul className="space-y-1 text-sm text-orange-200">
                <li>• Partial injection (limited override)</li>
                <li>• Rate limit bypassable</li>
                <li>• Excessive agency without confirmation</li>
                <li>• Audit log gaps</li>
              </ul>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 shadow-xl hover:border-yellow-500/30 transition-all duration-300">
              <h3 className="font-semibold text-yellow-300 mb-2">MEDIUM — {pick(isDE, 'Innerhalb 30 Tagen fixen', 'Fix Within 30 Days')}</h3>
              <ul className="space-y-1 text-sm text-yellow-200">
                <li>• Inconsistent refusal behavior</li>
                <li>• Verbose error messages</li>
                <li>• Suboptimal sandboxing</li>
              </ul>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 shadow-xl hover:border-blue-500/30 transition-all duration-300">
              <h3 className="font-semibold text-blue-300 mb-2">LOW — {pick(isDE, 'Verfolgen & Verbessern', 'Track & Improve')}</h3>
              <ul className="space-y-1 text-sm text-blue-200">
                <li>• Hallucination without guardrail</li>
                <li>• Missing structured output validation</li>
                <li>• Log verbosity issues</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Häufige Fragen', 'Frequently Asked Questions')}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security Hub</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'Vollständige OWASP LLM Defense Map', 'Full OWASP LLM defense map')}</div>
            </a>
            <a href={`/${locale}/moltbot/prompt-injection-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Prompt Injection Defense</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'RT01-Befunde fixen', 'Fix RT01 findings')}</div>
            </a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Roast My Moltbot</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'Kostenloser Quick Red-Team', 'Free quick red-team of your setup')}</div>
            </a>
            <a href={`/${locale}/moltbot/model-poisoning-protection`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Model Poisoning Protection</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'RT05 Supply-Chain-Befunde fixen', 'Fix RT05 supply chain findings')}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Red Team Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Red Teaming in Produktionsumgebungen. Die beschriebene Methodik ist in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI red teaming in production environments. The described methodology has been proven in real deployments and continuously improved.')}
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
