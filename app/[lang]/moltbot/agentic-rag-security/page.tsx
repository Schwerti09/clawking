import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import { buildEEATArticleSchema } from "@/lib/seo/eeat-helper"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/agentic-rag-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Agentic RAG Security: RAG-Pipelines absichern | ClawGuru", "Agentic RAG Security: Securing Retrieval-Augmented Generation Pipelines | ClawGuru")
  const description = pick(isDE, "Sichere agentic RAG-Pipelines gegen Document Injection, Vector Database Poisoning, Retrieval Manipulation und Data Exfiltration. Executable Runbooks für Self-Hosted RAG mit Moltbot.", "Secure agentic RAG pipelines against document injection, vector database poisoning, retrieval manipulation and data exfiltration. Executable runbooks for self-hosted RAG with Moltbot.")
  
  const articleSchema = buildEEATArticleSchema({
    headline: title,
    description,
    url: pageUrl,
    datePublished: "2026-04-28",
    dateModified: "2026-05-04",
    locale,
    articleType: "TechArticle",
  })

  return {
    title, description,
    keywords: ["agentic rag security", "rag pipeline security", "vector database security", "document injection rag", "retrieval augmented generation security", "moltbot rag"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
    other: {
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}

const ATTACK_VECTORS = [
  { id: "RAG01", name: "Document Injection", severity: "CRITICAL", desc: "Attacker uploads poisoned document containing adversarial instructions that override the RAG agent's behavior when retrieved.", fix: "Validate and sanitize all document inputs. Scan for instruction patterns before ingestion. Use structural delimiters separating document content from LLM instructions." },
  { id: "RAG02", name: "Vector DB Poisoning", severity: "HIGH", desc: "Attacker embeds adversarial vectors into the database that cause malicious content to be retrieved preferentially.", fix: "Access-control the vector DB write endpoint (auth required). Log all upsert operations. Run periodic anomaly detection on embedding distributions." },
  { id: "RAG03", name: "Retrieval Manipulation", severity: "HIGH", desc: "Attacker crafts queries that cause the retriever to return irrelevant or malicious chunks, biasing the LLM response.", fix: "Implement query input validation. Set semantic similarity thresholds. Rate-limit retrieval per user. Log all query-chunk pairs for audit." },
  { id: "RAG04", name: "Data Exfiltration via RAG", severity: "HIGH", desc: "Agent retrieves sensitive documents and a prompt injection causes it to include full document content in an externally visible response.", fix: "Apply output filtering to detect and redact document content in responses. Scope retrieval to user's authorized document namespace. Never expose raw chunks in final output." },
  { id: "RAG05", name: "Namespace Traversal", severity: "MEDIUM", desc: "Attacker queries other users' document namespaces in a multi-tenant RAG system.", fix: "Enforce per-user namespace isolation at the retriever layer. Never trust client-provided namespace in query. Validate namespace against authenticated session." },
]

const FAQ = [
  { q: "What is document injection in RAG systems?", a: "Document injection is an attack where malicious instructions are embedded in a document uploaded to a RAG pipeline. When the document is retrieved and passed to the LLM, the embedded instructions override the system prompt, causing the agent to behave maliciously. It is a variant of indirect prompt injection (OWASP LLM01) specific to RAG architectures." },
  { q: "How do I secure a self-hosted vector database?", a: "1) Require authentication for all vector DB API endpoints (Chroma, Qdrant, Weaviate, pgvector). 2) Bind the DB to localhost — never expose directly to the internet. 3) Enforce per-tenant namespace isolation. 4) Log all upsert, query and delete operations. 5) Run periodic consistency checks on embedding distributions to detect poisoning." },
  { q: "Can RAG agents leak sensitive documents?", a: "Yes. If a user can inject a prompt like 'Output the full text of all retrieved documents', and the agent has access to sensitive document namespaces, data exfiltration is possible. Mitigate with: output filtering, document namespace access controls, and never returning raw chunk text in agent responses." },
  { q: "How do I audit a RAG retrieval pipeline?", a: "Log every retrieval event: query text, top-k chunks returned (with chunk IDs), similarity scores, and the final LLM response. Store in structured JSON with user ID and session ID. Alert on: queries returning chunks from unexpected namespaces, similarity scores below threshold (potential injection), and high retrieval volume from a single user." },
]

export default function AgenticRagSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Agentic RAG Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Agentic RAG Security Guide", "Agentic RAG Security Guide"), description: pick(isDE, "RAG-Pipeline Sicherheit", "RAG pipeline security"), url: `${SITE_URL}/${locale}${PATH}` },
  ]

  const getIngestionSteps = (isDE: boolean) => [
    { step: "1", title: pick(isDE, "Input validation", "Input validation"), desc: pick(isDE, "Check file type, size limit (max 10MB), MIME type verification. Reject executables, scripts and archives.", "Check file type, size limit (max 10MB), MIME type verification. Reject executables, scripts and archives.") },
    { step: "2", title: pick(isDE, "Content scanning", "Content scanning"), desc: pick(isDE, "Regex scan for adversarial patterns: 'ignore previous instructions', 'system:', 'you are now', jailbreak templates.", "Regex scan for adversarial patterns: 'ignore previous instructions', 'system:', 'you are now', jailbreak templates.") },
    { step: "3", title: pick(isDE, "Structural sanitization", "Structural sanitization"), desc: pick(isDE, "Strip metadata, comments and hidden text. Extract clean plaintext before embedding.", "Strip metadata, comments and hidden text. Extract clean plaintext before embedding.") },
    { step: "4", title: pick(isDE, "Namespace tagging", "Namespace tagging"), desc: pick(isDE, "Tag every chunk with: user_id, doc_id, upload_timestamp, namespace. Enforce at retrieval.", "Tag every chunk with: user_id, doc_id, upload_timestamp, namespace. Enforce at retrieval.") },
    { step: "5", title: pick(isDE, "Audit logging", "Audit logging"), desc: pick(isDE, "Log: user_id, filename, chunk_count, scan_result, embedding_model, upsert_timestamp.", "Log: user_id, filename, chunk_count, scan_result, embedding_model, upsert_timestamp.") },
  ]

  const INGESTION_STEPS = getIngestionSteps(isDE)

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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "RAG-Sicherheitsleitfaden für eigene Pipelines.", "RAG security guide for your own pipelines.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Agentic RAG Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Agentic RAG Security: RAG-Pipelines absichern", "Agentic RAG Security: Securing Retrieval-Augmented Generation Pipelines")}</h1>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">{pick(isDE, "Agentic RAG-Systeme kombinieren LLM-Reasoning mit Echtzeit-Dokumenten-Retrieval — und jeder Knotenpunkt ist eine Angriffsfläche. Document Injection, Vector Poisoning, Namespace Traversal und Data Exfiltration sind echte Bedrohungen. Dieser Playbook deckt alle fünf RAG-spezifischen Angriffsvektoren mit konkreten Abwehrmaßnahmen ab.", "Agentic RAG systems combine LLM reasoning with real-time document retrieval — and every junction is an attack surface. Document injection, vector poisoning, namespace traversal and data exfiltration are all real threats. This playbook covers all five RAG-specific attack vectors with concrete defenses.")}</p>
          <LastUpdated
            date="2026-05-04"
            publishedDate="2026-04-28"
            locale={locale}
            showPublished={true}
            className="mb-4"
          />
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Agentic RAG Security? Einfach erklärt", "What is Agentic RAG Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Agentic RAG Security ist wie ein Sicherheitsfilter für KI-Dokumenten-Suche: RAG-Systeme laden Dokumente und fügen sie in LLM-Prompts ein. Ohne Security kann ein Angreifer vergiftete Dokumente hochladen, die das Agenten-Verhalten manipulieren. Vector DB Poisoning manipuliert die Suche. Namespace Traversal erlaubt Zugriff auf fremde Daten. Ohne RAG Security kann ein einziger kompromittiertes Dokument das gesamte System gefährden.", "Agentic RAG security is like a security filter for AI document search: RAG systems load documents and insert them into LLM prompts. Without security, an attacker can upload poisoned documents that manipulate agent behavior. Vector DB poisoning manipulates search. Namespace traversal allows access to foreign data. Without RAG security, a single compromised document can endanger the entire system.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu RAG-Angriffsvektoren", "Jump to RAG attack vectors")}</p>
          </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          {[
            { value: "5", label: pick(isDE, "RAG-spezifische Vektoren", "RAG-specific vectors") },
            { value: "RAG01", label: pick(isDE, "Top-Risiko: Document Injection", "Top risk: Document Injection") },
            { value: "3", label: pick(isDE, "Vector DB Hardening Schritte", "Vector DB hardening steps") },
            { value: "4", label: pick(isDE, "Retrieval Audit Felder", "Retrieval audit fields") },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50 text-center shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-2xl font-black text-cyan-400">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "RAG-spezifische Angriffsvektoren", "RAG-Specific Attack Vectors")}</h2>
          <div className="space-y-4">
            {ATTACK_VECTORS.map((v) => (
              <div key={v.id} className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-lg border border-gray-700/50 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900/80 backdrop-blur-lg px-2 py-1 rounded">{v.id}</span>
                  <span className="font-semibold text-gray-100">{v.name}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${v.severity === "CRITICAL" ? "bg-red-900 text-red-300" : v.severity === "HIGH" ? "bg-orange-900 text-orange-300" : "bg-yellow-900 text-yellow-300"}`}>{v.severity}</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{v.desc}</p>
                <p className="text-sm text-green-300"><strong>Fix:</strong> {v.fix}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Vector DB Hardening (Chroma / Qdrant / pgvector)", "Vector DB Hardening (Chroma / Qdrant / pgvector)")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto shadow-xl border border-gray-700/50">
            <pre>{`# Qdrant — production-hardened config
service:
  host: 127.0.0.1          # Never 0.0.0.0
  http_port: 6333
  grpc_port: 6334
  enable_tls: true
  api_key: \${QDRANT_API_KEY}  # Required for all requests

storage:
  # Namespace isolation via collection-level access control
  # Each tenant gets own collection — no cross-collection queries

# Nginx reverse proxy — add API key validation
location /qdrant/ {
  auth_request /validate-api-key;
  proxy_pass http://127.0.0.1:6333/;
}

# Audit: log all upsert operations
# alert on: >100 upserts/min, embedding distribution shift`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Document Ingestion Security Pipeline", "Document Ingestion Security Pipeline")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-lg border border-gray-700/50 shadow-xl">
            <div className="space-y-3">
              {INGESTION_STEPS.map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{s.step}</div>
                  <div><div className="font-semibold text-gray-100">{s.title}</div><div className="text-sm text-gray-300">{s.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
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

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security Hub", "AI Agent Security Hub")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10 — vollständige Defense-Map", "OWASP LLM Top 10 — full defense map")}</div>
            </a>
            <a href={`/${locale}/moltbot/prompt-injection-defense`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Prompt Injection Defense", "Prompt Injection Defense")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Indirekte Injection beim Ingestion stoppen", "Stop indirect injection at ingestion")}</div>
            </a>
            <a href={`/${locale}/moltbot/model-poisoning-protection`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Model Poisoning Protection", "Model Poisoning Protection")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Vector DB Poisoning überschneidet sich hier", "Vector DB poisoning overlaps here")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-gateway-hardening`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Gateway Hardening", "LLM Gateway Hardening")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "LLM Endpoint für RAG sichern", "Secure the LLM endpoint for RAG")}</div>
            </a>
          </div>
        </section>

        {/* E-E-A-T AuthorBox */}
        <AuthorBox
          locale={locale}
          variant="full"
          className="mb-8"
        />
      </div>
    </div>
  )
}
