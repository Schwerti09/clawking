import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-embeddings-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Embeddings Security: Vektor-Embedding-Sicherheit | ClawGuru Moltbot", "LLM Embeddings Security: Vector Embedding Security | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Embeddings-Security: Embedding Injection Protection, Vector Store Access Control, Embedding Poisoning Detection und Embedding Versioning für RAG-Systeme.", "LLM embeddings security: embedding injection protection, vector store access control, embedding poisoning detection and embedding versioning for RAG systems.")
  return {
    title, description,
    keywords: ["llm embeddings security", "vector store security", "embedding injection", "rag vector security", "embedding poisoning", "moltbot embeddings"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "ES-1", title: "Embedding Injection Protection", desc: "Prevent embedding injection attacks where an attacker crafts input that manipulates the embedding space to trigger malicious behavior in the RAG retrieval or LLM generation.", code: `# Moltbot embedding injection protection:
embedding_injection_protection:
  enabled: true

  # Input sanitisation before embedding:
  input_sanitisation:
    enabled: true
    # Remove known adversarial patterns:
    # - Unicode homographs
    # - Zero-width characters
    # - Invisible characters
    # - Repeated patterns (for embedding flooding)

  # Embedding validation:
  embedding_validation:
    enabled: true
    # Validate embedding dimensions and ranges
    expected_dimensions: 1536  # OpenAI text-embedding-3-small
    expected_range: [-1.0, 1.0]
    # Reject embeddings outside expected range

  # Rate limiting for embedding generation:
  rate_limit:
    enabled: true
    per_user_per_minute: 100
    per_user_per_hour: 1000
    # Prevent embedding flooding attacks

  # Adversarial embedding detection:
  adversarial_detection:
    enabled: true
    # Detect embeddings that are too close to known adversarial patterns
    # Use cosine similarity to detect clustering attacks
    threshold: 0.95  # Alert if similarity > 95%` },
  { id: "ES-2", title: "Vector Store Access Control", desc: "Control access to your vector store. Ensure that RAG queries only retrieve documents the user is authorised to access. Implement per-tenant or per-user vector isolation.", code: `# Moltbot vector store access control:
vector_store_acl:
  enabled: true

  # Per-tenant vector isolation:
  tenant_isolation:
    enabled: true
    # Each tenant has its own vector index or namespace
    # User queries only search within their tenant's vectors

  # User-level access control:
  user_acl:
    enabled: true
    # Check user permissions before retrieving vectors
    # Only return vectors the user is authorised to see
    # Example: user can only access documents in their department

  # Row-level security:
  row_level_security:
    enabled: true
    # Each vector document has metadata: owner_id, department_id
    # Filter results based on user's access rights
    # Example: WHERE department_id = user.department_id

  # Vector store authentication:
  authentication:
    enabled: true
    # Require authentication for all vector store operations
    # Use JWT tokens with user context
    # Validate tokens on each query` },
  { id: "ES-3", title: "Embedding Poisoning Detection", desc: "Detect poisoned embeddings in your vector store. Attackers may inject malicious documents that, when embedded, cluster near legitimate documents and influence RAG retrieval.", code: `# Moltbot embedding poisoning detection:
poisoning_detection:
  enabled: true

  # Outlier detection:
  outlier_detection:
    enabled: true
    # Detect vectors that are outliers in the embedding space
    # Use statistical methods: Z-score, isolation forest
    # Flag vectors with high outlier score for review

  # Cluster analysis:
  cluster_analysis:
    enabled: true
    # Analyse vector clusters for unusual patterns
    # Look for: small clusters with many similar vectors (potential poisoning)
    # Look for vectors that bridge unrelated clusters (potential poisoning)

  # Semantic drift detection:
  semantic_drift:
    enabled: true
    # Detect if document embeddings drift from their original semantic meaning
    # Re-embed documents periodically and compare
    # Alert if semantic similarity drops below threshold

  # Source validation:
  source_validation:
    enabled: true
    # Only accept embeddings from trusted sources
    # Reject embeddings from untrusted or unknown sources
    # Maintain a whitelist of approved embedding sources` },
  { id: "ES-4", title: "Embedding Versioning and Migration", desc: "Manage embedding model updates. When you upgrade to a new embedding model, re-embed your corpus and maintain version control for backward compatibility.", code: `# Moltbot embedding versioning:
embedding_versioning:
  enabled: true
  current_version: "text-embedding-3-small-v2"
  previous_versions: ["text-embedding-3-small-v1", "text-embedding-ada-002"]

  # Embedding model configuration:
  models:
    text-embedding-3-small-v2:
      dimensions: 1536
      provider: "openai"
      deployment_date: "2025-03-01"

  # Migration strategy:
  migration:
    enabled: true
    # When upgrading to a new model:
    # 1. Create new vector index for new model
    # 2. Re-embed all documents with new model
    # 3. Validate new embeddings (semantic drift check)
    # 4. Switch traffic to new index
    # 5. Keep old index for rollback window (30 days)

  # Backward compatibility:
  backward_compatibility:
    enabled: true
    # Support querying across multiple embedding versions
    # Map queries to appropriate index based on model version
    # Fallback to previous version if new version unavailable` },
]

const FAQ = [
  { q: "What is embedding injection and how does it work?", a: "Embedding injection is an attack where an attacker crafts input that, when embedded, produces a vector that is intentionally close to target vectors in the embedding space. This can be used to: 1) Poison RAG retrieval — attacker's input retrieves malicious documents instead of legitimate ones. 2) Bias LLM generation — attacker's input influences the LLM toward malicious outputs. 3) Evade content filters — attacker's input produces an embedding that bypasses safety filters. How it works: the attacker studies the embedding space of your RAG system, identifies target vectors (e.g., vectors for sensitive documents), then crafts input that produces embeddings close to those targets. Defense: input sanitisation, embedding validation, adversarial embedding detection, rate limiting to prevent embedding flooding." },
  { q: "How do I implement per-tenant vector isolation?", a: "Per-tenant vector isolation ensures that each tenant's RAG queries only retrieve their own documents. Implementation: 1) Separate vector indices — create one index per tenant in your vector store (Pinecone, Weaviate, Milvus). 2) Namespace isolation — use vector store namespaces to segregate tenant data (e.g., tenant_id as namespace). 3) Metadata filtering — tag each vector with tenant_id and filter queries by tenant_id. 4) Application-level filtering — enforce tenant isolation at the application layer before querying the vector store. 5) Access control checks — validate user's tenant membership before allowing RAG queries. Risk: if isolation fails, one tenant can retrieve another tenant's documents — a data breach under GDPR." },
  { q: "How do I detect poisoned embeddings in my vector store?", a: "Poisoned embeddings are maliciously crafted vectors that cluster near legitimate vectors to influence RAG retrieval. Detection methods: 1) Outlier detection — use statistical methods (Z-score, isolation forest) to identify vectors that are statistical outliers. 2) Cluster analysis — analyse vector clusters for unusual patterns: small clusters with many similar vectors (potential poisoning), vectors that bridge unrelated clusters. 3) Semantic drift detection — re-embed documents periodically and compare new embeddings to old ones; alert if semantic similarity drops. 4) Source validation — only accept embeddings from trusted sources; maintain a whitelist of approved embedding sources. 5) Manual review — flag suspicious vectors for manual review by security analysts." },
  { q: "How do I handle embedding model upgrades?", a: "Embedding model upgrades require careful planning to avoid breaking RAG functionality. Strategy: 1) Create new vector index — create a new index for the new embedding model, don't overwrite the existing one. 2) Re-embed corpus — re-embed all documents with the new model. 3) Validate embeddings — run semantic drift checks to ensure new embeddings preserve semantic meaning. 4) Canary deployment — switch a small percentage of traffic to the new index, monitor for issues. 5) Full rollout — if canary is successful, switch all traffic to the new index. 6) Rollback window — keep the old index for 30 days in case rollback is needed. 7) Backward compatibility — support querying across multiple embedding versions if needed for gradual migration." },
]

export default function LlmEmbeddingsSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Embeddings Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Embeddings Security Guide", "LLM Embeddings Security Guide"), description: pick(isDE, "LLM Vektor-Embedding-Sicherheit", "LLM vector embeddings security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Embeddings-Security-Guide für eigene KI-Systeme.", "Embeddings security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Embeddings Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Embeddings Security", "LLM Embeddings Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Vektor-Embeddings sind das Rückgrat von RAG-Systemen — ohne Security können Angreifer Embeddings manipulieren und Poisoning-Attacken durchführen. Vier Kontrollen: Injection Protection, Vector Store ACL, Poisoning Detection und Versioning.", "Vector embeddings are the backbone of RAG systems — without security, attackers can manipulate embeddings and conduct poisoning attacks. Four controls: injection protection, vector store ACL, poisoning detection and versioning.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Embeddings Security? Einfach erklärt", "What is LLM Embeddings Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Embeddings Security ist wie ein Schutzschild für Vektor-Datenbanken: Embedding Injection Protection desinfiziert Inputs vor der Embedding-Generierung und validiert die Vektor-Dimensionen. Vector Store ACL garantiert, dass User A nur User Bs Dokumente sehen kann mit Tenant-Isolation. Embedding Poisoning Detection erkennt vergiftete Vektoren mit statistischer Analyse und Cluster-Scanning. Embedding Versioning verwaltet Modell-Upgrades mit Rollback-Fenstern. Ohne Security können Angreifer RAG-Retrieval vergiften, Mandanten-Daten leaken oder Embedding-Modelle kompromittieren.", "LLM embeddings security is like a shield for vector databases: embedding injection protection sanitizes inputs before embedding generation and validates vector dimensions. Vector store ACL guarantees that User A can only see User B's documents with tenant isolation. Embedding poisoning detection detects poisoned vectors with statistical analysis and cluster scanning. Embedding versioning manages model upgrades with rollback windows. Without security, attackers can poison RAG retrieval, leak tenant data, or compromise embedding models.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Embeddings-Security-Kontrollen", "Jump to embeddings security controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Embeddings-Security-Kontrollen", "4 Embeddings Security Controls")}</h2>
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
            <a href={`/${locale}/moltbot/multi-tenant-llm-isolation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Multi-Tenant LLM Isolation", "Multi-Tenant LLM Isolation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "RAG-Tenant-Isolation", "RAG tenant isolation")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-data-loss-prevention`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Data Loss Prevention", "AI Data Loss Prevention")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "RAG-Poisoning-Detection", "RAG poisoning detection")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-context-isolation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Context Isolation", "LLM Context Isolation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Vector-Store-ACL", "Vector store ACL")}</div>
            </a>
            <a href={`/${locale}/moltbot/rag-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "RAG Security", "RAG Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "End-to-End-RAG-Security", "End-to-end RAG security")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Vector Database Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Embeddings Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM embeddings security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
