import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/agentic-rag-security-patterns"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Agentic RAG Security Patterns: Sicherheit für RAG-Systeme | ClawGuru", "Agentic RAG Security Patterns: Security for RAG Systems | ClawGuru")
  const description = pick(isDE, "Agentic RAG Security Patterns für Moltbot-Deployments. Vector DB Security, Retrieval Access Control, Document Filtering und Injection Protection für RAG-Systeme. Mit Moltbot automatisierbar.", "Agentic RAG security patterns for Moltbot deployments. Vector DB security, retrieval access control, document filtering and injection protection for RAG systems. Automatable with Moltbot.")
  return {
    title,
    description,
    keywords: [
      "rag security", "vector db security", "retrieval access control",
      "document filtering", "injection protection", "agentic rag",
      "moltbot security", "ai agent rag", "rag security patterns 2026",
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

export default function AgenticRAGSecurityPatternsPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Agentic RAG Security Patterns", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Agentic RAG Security Patterns Guide", "Agentic RAG Security Patterns Guide"), description: pick(isDE, "RAG-Security Patterns", "RAG security patterns"), url: `${SITE_URL}/${locale}${PATH}` },
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
        {/* Header */}
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Leitfaden dient zur Härtung Ihrer eigenen Systeme. Keine Angriffstools.", "This guide is for hardening your own systems. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Agentic RAG Security Patterns</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "Agentic RAG Security Patterns", "Agentic RAG Security Patterns")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Agentic RAG Security Patterns für Moltbot-Deployments. Vector DB Security, Retrieval Access Control, Document Filtering und Injection Protection für RAG-Systeme.", "Agentic RAG security patterns for Moltbot deployments. Vector DB security, retrieval access control, document filtering and injection protection for RAG systems.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was sind RAG Security Patterns? Einfach erklärt", "What are RAG Security Patterns? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "RAG Security Patterns sind wie Sicherheitsvorlagen für Dokumenten-Suche-Systeme: Vector DB Security schützt die Datenbank. Retrieval Access Control filtert Ergebnisse pro User. Document Filtering entfernt PII. Injection Protection verhindert Manipulation. Ohne Security Patterns kann ein einziger kompromittiertes Dokument die gesamte RAG-Pipeline gefährden.", "RAG security patterns are like security templates for document search systems: vector DB security protects the database. Retrieval access control filters results per user. Document filtering removes PII. Injection protection prevents manipulation. Without security patterns, a single compromised document can endanger the entire RAG pipeline.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten", "Jump to core concepts")}</p>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Kernkonzepte", "Core Concepts")}
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "1. Vector DB Security", "1. Vector DB Security")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Vector Database Security für RAG-Systeme. Auth, Encryption, Network Isolation und RBAC.", "Vector database security for RAG systems. Auth, encryption, network isolation and RBAC.")}
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "2. Retrieval Access Control", "2. Retrieval Access Control")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Retrieval Access Control für RAG. User-basierte Document Filtering und Row-Level Security.", "Retrieval access control for RAG. User-based document filtering and row-level security.")}
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "3. Document Filtering", "3. Document Filtering")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Document Filtering für RAG-Systeme. PII Removal, Sensitive Data Masking und Content Classification.", "Document filtering for RAG systems. PII removal, sensitive data masking and content classification.")}
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "4. Injection Protection", "4. Injection Protection")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Injection Protection für RAG. Prompt Injection Detection und Retrieval Poisoning Prevention.", "Injection protection for RAG. Prompt injection detection and retrieval poisoning prevention.")}
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-bold text-cyan-400 mb-2">
                {pick(isDE, "5. Context Window Security", "5. Context Window Security")}
              </h3>
              <p className="text-sm text-gray-300">
                {pick(isDE, "Context Window Security für RAG. Token-Limits, Truncation und Relevance Filtering.", "Context window security for RAG. Token limits, truncation and relevance filtering.")}
              </p>
            </div>
          </div>
        </section>

        {/* Advanced Techniques */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}
          </h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700/50 shadow-xl hover:border-green-500/30 transition-all duration-300">
              <h3 className="font-semibold text-green-300 mb-2">
                {pick(isDE, "Hybrid Search Security", "Hybrid Search Security")}
              </h3>
              <p className="text-sm text-green-200">
                {pick(isDE, "Hybrid Search Security für RAG. Keyword + Vector Search mit Security Filtering.", "Hybrid search security for RAG. Keyword + vector search with security filtering.")}
              </p>
            </div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700/50 shadow-xl hover:border-blue-500/30 transition-all duration-300">
              <h3 className="font-semibold text-blue-300 mb-2">
                {pick(isDE, "Chunking Security", "Chunking Security")}
              </h3>
              <p className="text-sm text-blue-200">
                {pick(isDE, "Chunking Security für RAG-Dokumente. Secure Chunking und Boundary Detection.", "Chunking security for RAG documents. Secure chunking and boundary detection.")}
              </p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700/50 shadow-xl hover:border-yellow-500/30 transition-all duration-300">
              <h3 className="font-semibold text-yellow-300 mb-2">
                {pick(isDE, "Embedding Security", "Embedding Security")}
              </h3>
              <p className="text-sm text-yellow-200">
                {pick(isDE, "Embedding Security für RAG. Embedding Access Control und Model Isolation.", "Embedding security for RAG. Embedding access control and model isolation.")}
              </p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700/50 shadow-xl hover:border-red-500/30 transition-all duration-300">
              <h3 className="font-semibold text-red-300 mb-2">
                {pick(isDE, "Reranking Security", "Reranking Security")}
              </h3>
              <p className="text-sm text-red-200">
                {pick(isDE, "Reranking Security für RAG. Bias Detection und Fairness Filtering.", "Reranking security for RAG. Bias detection and fairness filtering.")}
              </p>
            </div>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "Implementierungsschritte", "Implementation Steps")}
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Vector DB sichern", "Secure vector DB")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Sichern Sie Vector Database mit Auth, Encryption und Network Isolation.", "Secure vector database with auth, encryption and network isolation.")}
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Retrieval Access Control implementieren", "Implement retrieval access control")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Implementieren Sie Retrieval Access Control mit User-basiertem Document Filtering.", "Implement retrieval access control with user-based document filtering.")}
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Document Filtering Pipeline", "Document filtering pipeline")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Erstellen Sie eine Document Filtering Pipeline mit PII Removal und Sensitive Data Masking.", "Create a document filtering pipeline with PII removal and sensitive data masking.")}
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Injection Protection hinzufügen", "Add injection protection")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Fügen Sie Prompt Injection Detection und Retrieval Poisoning Prevention hinzu.", "Add prompt injection detection and retrieval poisoning prevention.")}
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
              <div>
                <div className="font-semibold text-gray-100 mb-2">
                  {pick(isDE, "Monitoring & Auditing", "Monitoring & Auditing")}
                </div>
                <div className="text-sm text-gray-300">
                  {pick(isDE, "Überwachen Sie RAG-Queries und Retrieval-Results. Audit Logging für Access Control.", "Monitor RAG queries and retrieval results. Audit logging for access control.")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Further Resources */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">
                {pick(isDE, "Security Check", "Security Check")}
              </div>
              <div className="text-sm text-gray-300">
                {pick(isDE, "Überprüfen Sie Ihre Infrastruktur auf Schwachstellen", "Check your infrastructure for vulnerabilities")}
              </div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">
                {pick(isDE, "Runbooks", "Runbooks")}
              </div>
              <div className="text-sm text-gray-300">
                {pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}
              </div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">
                {pick(isDE, "OpenClaw", "OpenClaw")}
              </div>
              <div className="text-sm text-gray-300">
                {pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}
              </div>
            </a>
            <a href={`/${locale}/roast-my-moltbot`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">
                {pick(isDE, "Roast My Moltbot", "Roast My Moltbot")}
              </div>
              <div className="text-sm text-gray-300">
                {pick(isDE, "Moltbot Security Testing", "Moltbot security testing")}
              </div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · RAG Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit RAG Security Pattern-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with RAG security pattern implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
