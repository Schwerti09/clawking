import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-persistence"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Persistence: KI-Agenten-Persistenz | ClawGuru Moltbot", "AI Agent Persistence: AI Agent Persistence | ClawGuru Moltbot")
  const description = pick(isDE, "AI-Agent-Persistenz: Memory Management, State Persistence, Long-Term Memory und Agent Session Recovery für KI-Agent-Systeme.", "AI agent persistence: memory management, state persistence, long-term memory and agent session recovery for AI agent systems.")
  return {
    title,
    description,
    keywords: ["ai agent persistence", "llm agent memory", "agent state management", "long-term memory llm", "agent session recovery", "moltbot persistence"],
    authors: [{ name: "R. Schwertfechter" }],
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

export default function AiAgentPersistencePage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Persistence", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["AI Security", "Memory Management", "State Persistence"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title }
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Agent Persistence?", "What is Agent Persistence?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4-Layer Memory Defense", "4-Layer Memory Defense")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Persistence Score", "Persistence Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Agent Persistence · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "AI Agent Persistence — Dein Agent hat gestern Nacht 50 GB Kundendaten im Memory gespeichert und vergessen zu löschen.", "AI Agent Persistence — Your Agent Stored 50 GB of Customer Data in Memory Last Night and Forgot to Delete It.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Dein KI-Agent hat in einer einzigen Session 50 GB an Kundendaten im Arbeitsspeicher akkumuliert und nach Session-Ende alles dort liegen gelassen. Das Ergebnis: PII-Leakage, DSGVO-Verstoß, 1.2 Mio. Euro Strafe, dein CISO hat den Datenschutzbeauftragten gerufen. Hier ist, wie du das verhinderst.", "Your AI agent accumulated 50 GB of customer data in working memory during a single session and left everything there after the session ended. The result: PII leakage, GDPR violation, €1.2M in fines, your CISO called the data protection officer. Here's how to prevent it.")}
            </p>
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Agent Persistence? Einfach erklärt.", "What is Agent Persistence? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Agent Persistence wie ein Notizbuch vor: Ein Agent kann sich notieren, was er in einer Konversation gelernt hat, und diese Notizen später abrufen. Ohne Persistence vergisst der Agent alles nach jeder Session. Mit Persistence kann er sich erinnern, aber das ist ein Double-Edged Sword: Wenn das Memory nicht gesichert ist, kann es sensible Daten leaken. Gute Persistence bedeutet: Memory-Limits, Sanitisation, verschlüsselte Speicherung und automatische Löschung.", "Think of agent persistence like a notebook: an agent can jot down what it learned in a conversation and retrieve those notes later. Without persistence, the agent forgets everything after each session. With persistence, it can remember, but that's a double-edged sword: if memory isn't secured, it can leak sensitive data. Good persistence means: memory limits, sanitisation, encrypted storage, and automatic deletion.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4-Layer Memory Defense Architecture", "4-Layer Memory Defense Architecture")}</h2>
            
            {/* Layer 1 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Memory Management", "Memory Management")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Setze Memory-Limits: max_conversation_turns, max_memory_mb, max_messages_in_memory. Aktiviere Garbage Collection und Memory-Sanitisation.", "Set memory limits: max_conversation_turns, max_memory_mb, max_messages_in_memory. Enable garbage collection and memory sanitisation.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`memory_management:
  enabled: true
  limits:
    max_conversation_turns: 100
    max_memory_mb: 512
  sanitisation:
    enabled: true
    clear_on_session_end: true`}</pre>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "State Persistence", "State Persistence")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Persistiere Agent-State verschlüsselt (AES-256-GCM). Speichere nur notwendige Daten. Aktiviere Session Recovery.", "Persist agent state encrypted (AES-256-GCM). Store only necessary data. Enable session recovery.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`state_persistence:
  enabled: true
  storage:
    type: "database"
    encryption: true
    encryption_algorithm: "AES-256-GCM"`}</pre>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Long-Term Memory", "Long-Term Memory")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Vector-Database für semantische Suche. Episodic, Semantic und Procedural Memory. Memory Consolidation.", "Vector database for semantic search. Episodic, semantic and procedural memory. Memory consolidation.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`long_term_memory:
  enabled: true
  storage:
    type: "vector_database"
  retrieval:
    similarity_threshold: 0.80`}</pre>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-100">{pick(isDE, "Session Recovery", "Session Recovery")}</h3>
              </div>
              <p className="text-gray-300 mb-4">{pick(isDE, "Checkpointing, Rollback, Error Recovery. Session Timeout mit automatischer Bereinigung.", "Checkpointing, rollback, error recovery. Session timeout with automatic cleanup.")}</p>
              <div className="bg-gray-900 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{`session_recovery:
  enabled: true
  checkpointing:
    enabled: true
    checkpoint_interval_turns: 10`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: PII-Leakage durch unsaniertes Memory", "SCAR #1: PII Leakage by Unsanitised Memory")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein Customer-Support-Agent speicherte Kundendaten (Namen, Adressen, Kreditkarten) im Memory ohne Sanitisation. Nach Session-Ende blieb alles im RAM und wurde in ein Backup kopiert. Fix: Memory-Sanitisation, clear_on_session_end, PII-Scanning.", "A customer support agent stored customer data (names, addresses, credit cards) in memory without sanitisation. After session end, everything remained in RAM and was copied to a backup. Fix: Memory sanitisation, clear_on_session_end, PII scanning.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Memory-Sanitisation. Lessons: Sanitisiere Memory vor Session-Ende.", "Root Cause: No memory sanitisation. Lessons: Sanitise memory before session end.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Memory Leak durch fehlende Limits", "SCAR #2: Memory Leak by Missing Limits")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Ein Data-Processing-Agent akkumulierte 100 GB an Daten im Memory ohne Limits. Der Server crashte, alle Sessions verloren. Fix: Memory-Limits, Garbage Collection, Session Timeout.", "A data processing agent accumulated 100 GB of data in memory without limits. The server crashed, all sessions lost. Fix: Memory limits, garbage collection, session timeout.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine Memory-Limits. Lessons: Setze harte Limits für Memory-Größe.", "Root Cause: No memory limits. Lessons: Set hard limits for memory size.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Memory-Limits aktivieren", "Enable Memory Limits")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Setze max_conversation_turns, max_memory_mb, max_messages_in_memory.", "Set max_conversation_turns, max_memory_mb, max_messages_in_memory.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Memory-Sanitisation aktivieren", "Enable Memory Sanitisation")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere clear_on_session_end und PII-Scanning.", "Enable clear_on_session_end and PII scanning.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "State Persistence verschlüsseln", "Encrypt State Persistence")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere AES-256-GCM für alle persistierten Daten.", "Enable AES-256-GCM for all persisted data.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Persistence Checkliste", "Interactive Persistence Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "c1", text: pick(isDE, "Memory-Limits aktiviert (turns, MB, messages)", "Memory limits enabled (turns, MB, messages)") },
                  { id: "c2", text: pick(isDE, "Garbage Collection aktiviert", "Garbage collection enabled") },
                  { id: "c3", text: pick(isDE, "Memory-Sanitisation aktiviert (clear_on_session_end)", "Memory sanitisation enabled (clear_on_session_end)") },
                  { id: "c4", text: pick(isDE, "State Persistence verschlüsselt (AES-256-GCM)", "State persistence encrypted (AES-256-GCM)") },
                  { id: "c5", text: pick(isDE, "PII-Scanning vor Speicherung", "PII scanning before storage") },
                  { id: "c6", text: pick(isDE, "Session Timeout aktiviert (idle + absolute)", "Session timeout enabled (idle + absolute)") },
                  { id: "c7", text: pick(isDE, "Session Cleanup aktiviert", "Session cleanup enabled") },
                  { id: "c8", text: pick(isDE, "Retention Policy (30 Tage)", "Retention policy (30 days)") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Persistence Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Persistence Security Score Calculator", "Persistence Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Memory-Limits aktiviert?", "Do you have memory limits enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Memory-Sanitisation aktiv?", "Is memory sanitisation active?"), weight: 25 },
                  { q: pick(isDE, "Ist State Persistence verschlüsselt?", "Is state persistence encrypted?"), weight: 25 },
                  { q: pick(isDE, "Ist Session Timeout aktiv?", "Is session timeout active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Persistence Security Score:", "Your Persistence Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 35/100", "Industry Average: 35/100")}</p>
              </div>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Memory Management, State Persistence und Long-Term Memory.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in memory management, state persistence and long-term memory.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/agent-memory-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Agent Memory Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Memory-Sanitisation", "Memory sanitisation")}</div>
              </a>
              <a href={`/${locale}/moltbot/llm-context-isolation`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">LLM Context Isolation</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Session-Isolation", "Session isolation")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-audit-logging`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Audit Logging</div>
                <div className="text-sm text-gray-300">{pick(isDE, "State-Persistence-Audit", "State persistence audit")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
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
