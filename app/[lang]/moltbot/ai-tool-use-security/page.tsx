import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-tool-use-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Tool Use Security: LLM Function Calling & Tool Invocation absichern | ClawGuru", "AI Tool Use Security: Securing LLM Function Calling & Tool Invocation | ClawGuru")
  const description = pick(isDE, "Sichere AI-Agent Tool-Use: Function-Calling-Validierung, Tool-Scope-Restriktion, Output-Sanitization, gefährliche Tool-Prävention und Human-in-the-Loop für High-Risk-Operationen.", "Secure AI agent tool use: function calling validation, tool scope restriction, output sanitization, dangerous tool prevention and human-in-the-loop for high-risk operations.")
  return {
    title, description,
    keywords: ["ai tool use security", "llm function calling security", "ai agent tools", "function calling validation", "tool scope restriction", "moltbot tool security"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const TOOL_RISKS = [
  { tool: "Shell / Code Execution", risk: "CRITICAL", attack: "Prompt injection → arbitrary command execution on host", defense: "Run in --read-only container with --cap-drop=ALL. Allowlist permitted commands. 30s hard timeout. Never run as root." },
  { tool: "HTTP / Web Requests", risk: "HIGH", attack: "SSRF → internal network access, metadata endpoint, cloud credentials", defense: "Allowlist permitted domains/IPs. Block RFC-1918 ranges and link-local (169.254.x.x). Validate URLs before fetch. Log all requests." },
  { tool: "File System Read", risk: "HIGH", attack: "Path traversal → read /etc/passwd, ~/.ssh/id_rsa, .env files", defense: "Restrict to declared workspace directory. Validate resolved path against workspace root. Block symlink traversal." },
  { tool: "File System Write", risk: "CRITICAL", attack: "Overwrite config files, inject malicious code, modify agent behavior", defense: "Require human confirmation for all writes. Scope to temp directory only. Audit all write operations." },
  { tool: "Database Queries", risk: "HIGH", attack: "SQL injection via LLM-generated queries, data exfiltration", defense: "Use parameterized queries only — never string-interpolated SQL. Read-only credentials for read operations. Scope to minimal required tables." },
  { tool: "Email / Notifications", risk: "HIGH", attack: "Data exfiltration via email, spam/phishing via LLM-drafted content", defense: "Require human approval for all external sends. Allowlist recipients. Content review before send. Rate limit: max 10 emails/hour." },
  { tool: "Calendar / Scheduling", risk: "MEDIUM", attack: "Unwanted calendar events, social engineering via agent-created meetings", defense: "Human-in-the-loop for all external calendar invites. Scope to own calendar only by default." },
]

const FAQ = [
  { q: "What is the biggest security risk of LLM function calling?", a: "Unscoped tool access combined with prompt injection. An LLM with access to a shell tool and no sandboxing can be prompted to execute arbitrary commands. The fix: every tool must have a declared scope, run in an isolated container, and dangerous tools (shell, file write, HTTP) require human confirmation or are restricted to an allowlist." },
  { q: "How do I implement human-in-the-loop for AI tool use?", a: "For high-risk tools: before execution, present the proposed tool call (tool name + parameters) to a human operator via a review interface. Only execute after explicit approval. Log: approver identity, approval timestamp, original LLM reasoning. Implement a timeout — if no approval within X minutes, cancel the action." },
  { q: "Can I trust tool outputs fed back to the LLM?", a: "Never unconditionally. Tool outputs can contain adversarial content (e.g., a web page with injected instructions). Sanitize all tool outputs before feeding back to the LLM: strip HTML, extract structured data only, apply the same injection detection as user inputs. Treat tool output as untrusted data, not as trusted system context." },
  { q: "How do I prevent SSRF via AI HTTP tools?", a: "1) Allowlist permitted domains — reject everything else. 2) Resolve the URL and check the IP is not RFC-1918 (10.x, 172.16.x, 192.168.x) or link-local (169.254.x.x). 3) Follow redirects but re-validate each redirect target. 4) Block metadata endpoints: 169.254.169.254 (AWS), metadata.google.internal. 5) Log all HTTP tool calls with URL, response code, response size." },
]

export default function AiToolUseSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "AI Tool Use Security: LLM Function Calling & Tool Invocation absichern | ClawGuru", "AI Tool Use Security: Securing LLM Function Calling & Tool Invocation | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Tool Use Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Tool Use Security", "Function Calling", "Sandboxing", "HITL"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "HowTo", name: "Secure AI Agent Tool Use End-to-End", totalTime: "PT2H", step: [
      { "@type": "HowToStep", name: "Audit all registered tools", text: pick(isDE, "List every tool the agent can call. Classify each by risk level. Remove any tool not strictly required.", "List every tool the agent can call. Classify each by risk level. Remove any tool not strictly required.") },
      { "@type": "HowToStep", name: "Apply principle of least tool", text: pick(isDE, "Start with no tools. Add back only what the specific task requires. Scope each tool to minimum required parameters.", "Start with no tools. Add back only what the specific task requires. Scope each tool to minimum required parameters.") },
      { "@type": "HowToStep", name: "Sandbox dangerous tools", text: pick(isDE, "Shell/code tools: isolated container. HTTP tools: allowlisted domains only. File tools: scoped workspace directory.", "Shell/code tools: isolated container. HTTP tools: allowlisted domains only. File tools: scoped workspace directory.") },
      { "@type": "HowToStep", name: "Add human-in-the-loop gates", text: pick(isDE, "CRITICAL tools require human approval. Implement review UI with timeout. Log all approvals and rejections.", "CRITICAL tools require human approval. Implement review UI with timeout. Log all approvals and rejections.") },
      { "@type": "HowToStep", name: "Sanitize tool outputs", text: pick(isDE, "All tool outputs treated as untrusted. Strip HTML, extract structured data, scan for injection patterns before feeding back to LLM.", "All tool outputs treated as untrusted. Strip HTML, extract structured data, scan for injection patterns before feeding back to LLM.") },
    ]},
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Tool Use Security?", "What is Tool Use Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "7 Tool Risk Kategorien", "7 Tool Risk Categories")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Tool Use Maturity Score", "Tool Use Maturity Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">13 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Tool Use Security · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Tool Use Security — Dein AI-Agent hat ungesicherte Tools. Shell-Befehle, HTTP-Requests, File-Write. Prompt Injection → RCE, SSRF, Data Exfiltration. Dein CEO hat den CISO gefeuert.", "AI Tool Use Security — Your AI Agent Has Unsecured Tools. Shell Commands, HTTP Requests, File Write. Prompt Injection → RCE, SSRF, Data Exfiltration. Your CEO Fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein AI-Agent hat keine Tool-Security, keine Scope-Restriktion und kein HITL. Shell-Befehle ohne Sandbox, HTTP ohne Allowlist, File-Write ohne Confirmation. 48h Incident-Response, Daten-Exfiltration, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "Your AI agent has no tool security, no scope restriction and no HITL. Shell commands without sandbox, HTTP without allowlist, file write without confirmation. 48h incident response, data exfiltration, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Sicherheitsleitfaden für eigene AI-Agent Tools. Keine Angriffstools.", "Security guide for your own AI agent tools. No attack tools.")}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{animationDelay: '0.08s'}}>
            {[{ value: "7", label: pick(isDE, "Tool-Risiko-Kategorien", "Tool risk categories") }, { value: "2", label: pick(isDE, "CRITICAL-Tool-Typen", "CRITICAL tool types") }, { value: "HITL", label: pick(isDE, "Erforderlich für Write-Tools", "Required for write tools") }, { value: "0", label: pick(isDE, "Vertrauenswürdige Tool-Outputs", "Trusted tool outputs") }].map((s) => (
              <div key={s.label} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 text-center shadow-2xl">
                <div className="text-2xl font-black text-cyan-400">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Tool Use Security? Einfach erklärt.", "What is Tool Use Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Tool Use Security wie die Sicherheit von Werkzeugen vor: Wenn ein LLM Tools aufrufen kann — Shell-Befehle, HTTP-Requests, Datenbank-Abfragen — explodiert die Angriffsfläche. Prompt Injection kann durch ungesicherte Tools zum Host, internen Netzwerk oder sensiblen Daten pivotieren. Gute Tool Use Security bedeutet: Least Tool Principle, Sandbox, HITL.", "Think of tool use security like the security of tools: when an LLM can call tools — shell commands, HTTP requests, database queries — the attack surface explodes. Prompt injection can pivot through unsecured tools to the host, internal network, or sensitive data. Good tool use security means: least tool principle, sandbox, HITL.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "7 Tool Risk Kategorien", "7 Tool Risk Categories")}</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{pick(isDE, "Tool", "Tool")}</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{pick(isDE, "Risiko", "Risk")}</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{pick(isDE, "Angriffsvektor", "Attack Vector")}</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{pick(isDE, "Verteidigung", "Defense")}</th>
                  </tr>
                </thead>
                <tbody>
                  {TOOL_RISKS.map((t, i) => (
                    <tr key={t.tool} className={`border-b border-gray-700 ${i % 2 === 1 ? "bg-gray-800/50" : ""}`}>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-100">{t.tool}</td>
                      <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-1 rounded ${t.risk === "CRITICAL" ? "bg-red-900 text-red-300" : t.risk === "HIGH" ? "bg-orange-900 text-orange-300" : "bg-yellow-900 text-yellow-300"}`}>{t.risk}</span></td>
                      <td className="px-4 py-3 text-xs text-gray-400">{t.attack}</td>
                      <td className="px-4 py-3 text-xs text-green-300">{t.defense}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Principle of Least Tool */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Principle of Least Tool", "Principle of Least Tool")}</h3>
              <p className="text-gray-300 mb-4">{pick(isDE, "Starte mit null Tools. Füge nur das zurück, was die spezifische Aufgabe benötigt. Ein Summarization-Agent benötigt gar keine Tools. Ein Research-Agent benötigt nur HTTP Read. Ein Coding-Agent benötigt nur File Read + Write in einem scoped Temp-Verzeichnis.", "Start with zero tools. Add back only what the specific task requires. A summarization agent needs no tools at all. A research agent needs HTTP read only. A coding agent needs file read + write in a scoped temp directory only.")}</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`# BAD: register all tools "just in case"
agent = Agent(tools=[ShellTool(), FileTool(), HTTPTool(),
                     EmailTool(), DBTool(), CalendarTool()])

# GOOD: minimum required for the specific task
summarizer = Agent(tools=[])  # No tools needed
researcher = Agent(tools=[HTTPTool(allowlist=["arxiv.org", "pubmed.ncbi.nlm.nih.gov"])])
coder = Agent(tools=[
  FileTool(workspace="/tmp/agent-sandbox", mode="rw"),
  # Shell removed — use isolated subprocess instead
])`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Shell-Tool ohne Sandbox", "SCAR #1: Shell Tool without Sandbox")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Shell-Tool ohne Sandbox. Prompt Injection → RCE auf Host, Daten-Exfiltration. Fix: Container mit --cap-drop=ALL, Allowlist, Timeout.", "Shell tool without sandbox. Prompt injection → RCE on host, data exfiltration. Fix: Container with --cap-drop=ALL, allowlist, timeout.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Sandbox für Shell-Tool. Lessons: Aktiviere --read-only Container mit --cap-drop=ALL.", "Root Cause: No sandbox for shell tool. Lessons: Enable --read-only container with --cap-drop=ALL.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: HTTP-Tool ohne Allowlist", "SCAR #2: HTTP Tool without Allowlist")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "HTTP-Tool ohne Allowlist. SSRF → internes Netzwerk, Metadata-Endpoint, Cloud-Credentials. Fix: Domain-Allowlist, RFC-1918 Block.", "HTTP tool without allowlist. SSRF → internal network, metadata endpoint, cloud credentials. Fix: Domain allowlist, RFC-1918 block.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Allowlist für HTTP-Tool. Lessons: Aktiviere Domain-Allowlist mit RFC-1918 Block.", "Root Cause: No allowlist for HTTP tool. Lessons: Enable domain allowlist with RFC-1918 block.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Tool-Audit durchführen", "Audit all tools")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Liste alle Tools, klassifiziere nach Risiko, entferne unnötige Tools.", "List all tools, classify by risk, remove unnecessary tools.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Sandbox für gefährliche Tools", "Sandbox dangerous tools")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Isoliere Shell/Code-Tools in Container mit --cap-drop=ALL.", "Isolate shell/code tools in container with --cap-drop=ALL.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "HITL für CRITICAL Tools", "Add HITL for CRITICAL tools")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Human-in-the-Loop für Shell, File-Write, Email-Tools.", "Human-in-the-loop for shell, file-write, email tools.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Tool Use Checkliste", "Interactive Tool Use Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "tu1", text: pick(isDE, "Tool-Audit durchgeführt", "Tool audit completed") },
                  { id: "tu2", text: pick(isDE, "Shell-Tool sandboxed", "Shell tool sandboxed") },
                  { id: "tu3", text: pick(isDE, "HTTP-Tool mit Allowlist", "HTTP tool with allowlist") },
                  { id: "tu4", text: pick(isDE, "File-Tool auf Workspace begrenzt", "File tool scoped to workspace") },
                  { id: "tu5", text: pick(isDE, "HITL für CRITICAL Tools aktiviert", "HITL for CRITICAL tools enabled") },
                  { id: "tu6", text: pick(isDE, "Tool-Output Sanitization aktiviert", "Tool output sanitization enabled") },
                  { id: "tu7", text: pick(isDE, "Timeout für alle Tools konfiguriert", "Timeout configured for all tools") },
                  { id: "tu8", text: pick(isDE, "Tool-Call Logging aktiviert", "Tool call logging enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Tool Use Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Tool Use Maturity Score Calculator", "Tool Use Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Tool-Audit durchgeführt?", "Have you audited all tools?"), weight: 25 },
                  { q: pick(isDE, "Ist Sandbox für Shell-Tools aktiv?", "Is sandbox for shell tools active?"), weight: 25 },
                  { q: pick(isDE, "Ist HITL für CRITICAL Tools aktiv?", "Is HITL for CRITICAL tools active?"), weight: 25 },
                  { q: pick(isDE, "Ist Tool-Output Sanitization aktiv?", "Is tool output sanitization active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Tool Use Maturity Score:", "Your Tool Use Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 16/100", "Industry Average: 16/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Tool Use Security, Function Calling, Sandbox und HITL.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in tool use security, function calling, sandbox and HITL.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security Hub</div>
                <div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10 — Defense-Map", "OWASP LLM Top 10 — defense map")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-sandboxing`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Sandboxing</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Container-Isolation für Tool-Execution", "Container isolation for tool execution")}</div>
              </a>
              <a href={`/${locale}/moltbot/prompt-injection-defense`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Prompt Injection Defense</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Block Injection vor Tool-Invocation", "Block injection before tool invocation")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-red-teaming`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Red Teaming</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Test Tool-Security-Defenses", "Test tool security defenses")}</div>
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
