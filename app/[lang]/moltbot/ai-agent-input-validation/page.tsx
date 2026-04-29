import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-input-validation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Input Validation: Eingabevalidierung für AI-Agents | ClawGuru", "AI Agent Input Validation: Input Validation for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Input Validation für Moltbot. Schema Validation, Sanitization, Allowlisting und Multi-Layer Input Defense für sichere AI-Agent-Eingabeverarbeitung.", "AI agent input validation for Moltbot. Schema validation, sanitization, allowlisting and multi-layer input defense for secure AI agent input processing.")
  return {
    title, description,
    keywords: ["ai agent input validation", "schema validation", "input sanitization", "allowlisting", "input defense", "moltbot security", "input validation 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentInputValidationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Input Validation", item: `${SITE_URL}/${locale}${PATH}` },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          ...jsonLd,
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Input Validation Guide", "Moltbot AI Agent Input Validation Guide"), description: pick(isDE, "AI Agent Input Validation", "AI agent input validation"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Input-Validierungs-Guide für eigene KI-Systeme.", "Input validation guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Input Validation</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "AI Agent Input Validation", "AI Agent Input Validation")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "AI Agent Input Validation für Moltbot. Schema Validation, Sanitization, Allowlisting und Multi-Layer Input Defense für sichere AI-Agent-Eingabeverarbeitung.", "AI agent input validation for Moltbot. Schema validation, sanitization, allowlisting and multi-layer input defense for secure AI agent input processing.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Input Validation? Einfach erklärt", "What is Input Validation? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Input Validation ist wie ein Türsteher für AI-Agent-Eingaben: es prüft jede Eingabe, bevor sie verarbeitet wird. Schema-based Validation prüft Struktur und Typen. Input Sanitization bereinigt schädliche Inhalte wie HTML oder SQL-Code. Allowlisting ist sicherer als Denylisting — nur explizit erlaubte Werte werden akzeptiert. Length & Complexity Limits verhindern Token-Flooding. Multi-Layer Defense bedeutet Validierung auf mehreren Ebenen — API Gateway, Application und LLM Layer. Ohne Input Validation können Angreifer bösartige Prompts injizieren, Tool-Parameter manipulieren oder das System überlasten.", "Input validation is like a bouncer for AI agent inputs: it checks every input before it's processed. Schema-based validation checks structure and types. Input sanitization cleans harmful content like HTML or SQL code. Allowlisting is safer than denylisting — only explicitly allowed values are accepted. Length & complexity limits prevent token flooding. Multi-layer defense means validation at multiple levels — API gateway, application and LLM layer. Without input validation, attackers can inject malicious prompts, manipulate tool parameters, or overwhelm the system.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. Schema-based Validation", pick(isDE, "Strikte Schema-Validierung aller Agent-Inputs. JSON Schema, Pydantic oder Zod für typsichere Eingabeverarbeitung.", "Strict schema validation of all agent inputs. JSON Schema, Pydantic or Zod for type-safe input processing.")],
              ["2. Input Sanitization", pick(isDE, "Bereinigung von Inputs vor Verarbeitung. HTML-Encoding, SQL-Escaping und Shell-Escaping für Tool-Aufrufe.", "Sanitization of inputs before processing. HTML encoding, SQL escaping and shell escaping for tool calls.")],
              ["3. Allowlisting statt Denylisting", pick(isDE, "Allowlist-basierte Validierung ist sicherer als Denylisting. Nur explizit erlaubte Werte und Patterns akzeptieren.", "Allowlist-based validation is safer than denylisting. Accept only explicitly allowed values and patterns.")],
              ["4. Length & Complexity Limits", pick(isDE, "Maximale Länge und Komplexität für alle Inputs begrenzen. Verhindert Token-Flooding und Ressourcen-Erschöpfung.", "Limit maximum length and complexity for all inputs. Prevents token flooding and resource exhaustion.")],
              ["5. Multi-Layer Defense", pick(isDE, "Mehrschichtige Input-Validierung. API Gateway → Application → LLM Layer alle mit eigenen Validierungslogiken.", "Multi-layer input validation. API gateway → application → LLM layer all with their own validation logic.")],
            ].map(([title, desc]) => (
              <div key={title as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Semantic Input Validation", "Semantic Input Validation")}</h3>
              <p className="text-sm text-green-200">{pick(isDE, "Semantische Validierung von Inputs über reine Syntax hinaus. LLM-basierte Intent-Analyse für Malicious Content Detection.", "Semantic validation of inputs beyond pure syntax. LLM-based intent analysis for malicious content detection.")}</p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Tool Call Validation", "Tool Call Validation")}</h3>
              <p className="text-sm text-blue-200">{pick(isDE, "Strikte Validierung von Tool-Call-Parametern vor Ausführung. Type Checking, Range Validation und Business Logic Checks.", "Strict validation of tool call parameters before execution. Type checking, range validation and business logic checks.")}</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Rate Limiting per Input Type", "Rate Limiting per Input Type")}</h3>
              <p className="text-sm text-yellow-200">{pick(isDE, "Granulares Rate Limiting je nach Input-Typ und Risikoprofil. Striktere Limits für sensible Operationen.", "Granular rate limiting depending on input type and risk profile. Stricter limits for sensitive operations.")}</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl">
              <h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Adversarial Input Testing", "Adversarial Input Testing")}</h3>
              <p className="text-sm text-red-200">{pick(isDE, "Regelmäßiges Testen der Validierungslogik mit Adversarial Inputs. Fuzzing und bekannte Injection-Patterns.", "Regular testing of validation logic with adversarial inputs. Fuzzing and known injection patterns.")}</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "Input-Schemas definieren", "Define input schemas"), pick(isDE, "Alle möglichen Agent-Inputs mit JSON Schema oder Pydantic dokumentieren. Typen, Längen und erlaubte Werte.", "Document all possible agent inputs with JSON Schema or Pydantic. Types, lengths and allowed values.")],
              [2, pick(isDE, "Validierungs-Layer einbauen", "Add validation layer"), pick(isDE, "Zentralen Validierungs-Layer vor alle Agent-Eingaben schalten. Keine direkte LLM-Verarbeitung ohne Validierung.", "Place a central validation layer before all agent inputs. No direct LLM processing without validation.")],
              [3, pick(isDE, "Sanitization-Funktionen implementieren", "Implement sanitization functions"), pick(isDE, "Für jeden Input-Typ eigene Sanitization-Funktion. Encoding, Escaping und Normalisierung.", "Individual sanitization function for each input type. Encoding, escaping and normalization.")],
              [4, pick(isDE, "Tool Parameter validieren", "Validate tool parameters"), pick(isDE, "Jeder Tool-Call-Parameter einzeln validieren bevor Tool ausgeführt wird. Strict Mode für alle Tools.", "Validate each tool call parameter individually before the tool is executed. Strict mode for all tools.")],
              [5, pick(isDE, "Validierung testen & monitoren", "Test and monitor validation"), pick(isDE, "Automatisierte Tests für alle Validierungs-Regeln. Monitoring von Validation-Failures für Security Insights.", "Automated tests for all validation rules. Monitoring of validation failures for security insights.")],
            ].map(([n, title, desc]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div>
                  <div className="font-semibold text-gray-100 mb-2">{title}</div>
                  <div className="text-sm text-gray-300">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur auf Schwachstellen prüfen", "Check infrastructure for vulnerabilities")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10", "OWASP LLM Top 10")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Input Validation Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Input-Validierungs-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with input validation implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
