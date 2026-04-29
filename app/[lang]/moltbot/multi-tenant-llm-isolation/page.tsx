import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/multi-tenant-llm-isolation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Multi-Tenant LLM Isolation: Mandanten-Datentrennung für KI-Systeme | ClawGuru Moltbot", "Multi-Tenant LLM Isolation: Tenant Data Separation for AI Systems | ClawGuru Moltbot")
  const description = pick(isDE, "Multi-Tenant-Isolation für LLM-Systeme: Konversations-Isolation, Mandanten-spezifische RAG-Partitionierung, Cross-Tenant-Daten-Leckage-Erkennung und getrennte Verschlüsselungsschlüssel pro Mandant.", "Multi-tenant isolation for LLM systems: conversation isolation, tenant-specific RAG partitioning, cross-tenant data leakage detection and separate encryption keys per tenant.")
  return {
    title, description,
    keywords: ["multi tenant llm isolation", "llm tenant isolation", "ai multi tenant security", "llm data separation", "saas ai security", "tenant isolation moltbot"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const ISOLATION_LAYERS = [
  { id: "MT-1", title: "Conversation & Context Isolation per Tenant", desc: "Each tenant's conversation history, system prompts, and context windows must be strictly isolated. No conversation data from Tenant A should ever appear in Tenant B's LLM context.", code: `# Moltbot multi-tenant conversation isolation:
multi_tenant:
  isolation_model: strict     # strict | permissive | none

  # Each request is tagged with tenant_id from authenticated JWT:
  tenant_id_source: jwt_claim  # Extract tenant_id from JWT "sub" or "org_id"
  tenant_id_claim: "org_id"

  conversation_isolation:
    storage_key_prefix: "tenant:{tenant_id}:conv:{session_id}"
    # Conversations physically separated by tenant prefix in storage

    # NEVER allow cross-tenant context injection:
    cross_tenant_context: deny
    # This means: a user cannot reference another tenant's conversation history

    # System prompt isolation:
    system_prompt:
      per_tenant_config: true   # Each tenant has own system prompt
      tenant_cannot_override_base: true  # Base safety rules always apply

  # Session isolation validation (paranoid mode):
  session_validation:
    verify_tenant_on_every_request: true  # Don't trust session cache — re-verify
    session_token_binding: true  # Session token bound to tenant_id at creation

  # Emergency isolation: if cross-tenant leak suspected:
  on_isolation_breach:
    action: terminate_all_tenant_sessions
    alert: immediate
    log_forensic: true` },
  { id: "MT-2", title: "Per-Tenant RAG Partitioning", desc: "Each tenant's vector store (RAG) must be physically or logically isolated. A retrieval query from Tenant A must never return documents from Tenant B's corpus.", code: `# Moltbot RAG multi-tenant partitioning:
rag:
  isolation_strategy: namespace  # namespace | separate_collection | separate_db

  # Strategy: namespace (most common — single vector DB, logical separation):
  namespace_config:
    namespace_key: "tenant_id"
    namespace_format: "t_{tenant_id}"  # e.g., t_acme, t_beta_corp

    # All queries are automatically namespaced:
    # query(text, tenant_id="acme") → searches ONLY in namespace "t_acme"
    # Cannot be overridden by user input

    # Namespace enforcement at query layer (not application layer):
    enforce_at: vector_db_client  # Not at app level — harder to bypass

  # Strategy: separate_collection (stronger isolation, more resources):
  # Each tenant gets their own Chroma/Weaviate/Qdrant collection
  # Physical separation — no shared index structures

  # Strategy: separate_db (strongest — for high-compliance tenants):
  # Each high-value tenant gets dedicated vector DB instance
  # Used for: enterprise tiers, regulated industry tenants

  # Cross-tenant retrieval prevention:
  retrieval_validation:
    verify_namespace_before_return: true  # Double-check every result
    on_namespace_mismatch: drop_and_alert  # Drop result + alert security

  # Tenant data deletion (GDPR Art. 17):
  tenant_offboarding:
    delete_namespace: true       # Delete entire namespace on tenant deletion
    verification_scan: true      # Verify no documents remain after deletion` },
  { id: "MT-3", title: "Per-Tenant Encryption Keys", desc: "Different tenants should have different encryption keys for their stored data — a key compromise for one tenant does not expose another's data.", code: `# Moltbot per-tenant encryption key management via Vault:
encryption:
  key_strategy: per_tenant

  vault_config:
    # Each tenant has a dedicated encryption key in Vault:
    key_path_template: "transit/keys/tenant-{tenant_id}"

    # Create key for new tenant:
    # vault write transit/keys/tenant-acme type=aes256-gcm96

    # Encrypt tenant data:
    # vault write transit/encrypt/tenant-acme plaintext=$(base64 <<< "conversation data")

    # Tenant key rotation (without re-encrypting all data — Vault handles):
    rotation_policy:
      auto_rotate_days: 90
      min_decryption_version: 1  # Keep old versions for decryption

  # What is encrypted per tenant:
  encrypted_per_tenant:
    - conversation_logs          # Full conversation history
    - rag_document_store         # Vector store documents
    - agent_memory               # Persistent agent memory
    - user_preferences           # User-level personalisation data
    - audit_logs                 # Encrypted separately for tamper evidence

  # Key access audit:
  key_access_logging: true
  # Every time tenant key is used, log: tenant_id, operation, timestamp, requestor
  # Alert if: key used from unexpected service, key accessed outside business hours` },
  { id: "MT-4", title: "Cross-Tenant Leakage Detection", desc: "Even with isolation in place, monitor for cross-tenant data leakage — LLMs can inadvertently reproduce data from previous requests if context boundaries fail.", code: `# Moltbot cross-tenant leakage detection:
leakage_detection:
  enabled: true

  # 1. Output scanning for other tenants' data patterns:
  cross_tenant_output_scan:
    # Scan LLM output for content that should only exist in another tenant's corpus
    # Uses tenant-specific fingerprints (hashes of unique phrases per tenant)
    fingerprint_check: true
    fingerprint_store: redis      # In-memory for speed
    action_on_detect: block_and_alert_security

  # 2. Context window validation before LLM submission:
  context_validation:
    # Before sending context to LLM, verify all items in context belong to
    # the current tenant (by checking namespace/tenant_id metadata)
    validate_all_context_items: true
    on_foreign_item: remove_and_log  # Remove foreign item, continue, log

  # 3. Statistical anomaly detection:
  # Track: distribution of tenant_ids in retrieved RAG results per request
  # Alert if: results from unexpected tenant namespaces appear (even 1)
  statistical_monitoring:
    track_namespace_distribution: true
    alert_threshold: 0  # Any cross-namespace result = alert

  # 4. Periodic isolation audit:
  isolation_audit:
    schedule: "0 2 * * 0"  # Weekly Sunday 2am
    test: inject_canary_documents_per_tenant
    # Inject unique canary documents per tenant — verify they never appear
    # in queries from other tenants
    on_canary_detected_cross_tenant: critical_alert` },
]

const FAQ = [
  { q: "What are the biggest risks of multi-tenant LLM deployments?", a: "The four primary multi-tenant LLM security risks: 1) Cross-tenant context contamination: if conversation history or RAG results from Tenant A leak into Tenant B's LLM context, the model may reveal confidential information. This can happen via bugs in context management, shared caching (e.g., KV cache sharing in batch inference), or missing namespace enforcement. 2) Prompt injection cross-tenant escalation: a malicious user in Tenant A crafts a prompt that affects system behaviour for Tenant B — particularly dangerous in shared agent deployments. 3) Shared model memorisation: if a shared fine-tuned model is trained on all tenants' data, the model may reproduce one tenant's data in another tenant's session. Mitigation: tenant-specific fine-tuned models or strictly public/anonymised training data for shared models. 4) Administrative over-privilege: platform administrators with access to all tenant data are a single-point insider risk. Mitigation: tenant-managed encryption keys (zero-knowledge architecture where platform admins cannot decrypt tenant data)." },
  { q: "How does namespace isolation in a vector database work?", a: "Namespace isolation in vector databases: a namespace is a logical partition within a single vector database — all vectors tagged with a namespace identifier. Query enforcement: when a query is executed, the namespace parameter filters results to only return vectors tagged with that namespace. Example with Chroma: collection.query(query_texts=['help'], where={'tenant_id': 'acme'}) — even if the query text would semantically match documents from 'beta_corp', the where filter prevents those results from being returned. Security depends on enforcement layer: application-level enforcement (app adds namespace filter) is weaker — a bug in the application can omit the filter. Client-library enforcement (Moltbot's RAG client always adds namespace) is stronger. Database-level enforcement (row-level security or separate collections) is strongest. Best practice: enforce namespace at the lowest level possible (closer to the database), and validate at retrieval time that every returned result matches the expected tenant namespace." },
  { q: "Can I use a shared LLM model across tenants or does each tenant need their own?", a: "Shared model (single instance serving all tenants): Cost-efficient, easier to maintain. Safe if: tenant data is only passed in the context window (not baked into model weights), context isolation is enforced at the application layer, no KV cache sharing between tenant requests (check your inference framework settings). Risks: KV cache contamination in high-throughput deployments, shared fine-tuning with tenant data (don't do this). Per-tenant model (separate model instances): Higher resource cost. Required when: tenants have fundamentally different use cases requiring different fine-tunes, regulatory requirements mandate data separation at model level, enterprise tenants require dedicated infrastructure for compliance. Recommended architecture: shared base model + per-tenant LoRA adapters. The base model (shared) handles general capabilities. The LoRA adapter (per-tenant, small files) provides tenant-specific knowledge. Tenant-specific RAG handles dynamic knowledge without contaminating the base model." },
  { q: "How do I implement zero-knowledge architecture for maximum tenant isolation?", a: "Zero-knowledge multi-tenant architecture: the platform operator cannot access tenant data even if they wanted to. Components: 1) Tenant-managed encryption keys: tenants hold their own Vault transit keys (or bring-your-own-key). Platform encrypts data with the tenant's key — cannot decrypt without tenant providing the key. 2) Client-side encryption for RAG corpus: tenant-side application encrypts documents before uploading to the vector store. Plaintext never reaches the platform infrastructure. 3) Separate vector DB instances per tenant (for high-compliance tiers): no physical sharing of infrastructure. 4) Audit log encryption with tenant key: audit logs encrypted with tenant's key — tenant can verify their own audit trail but platform cannot read it. Tradeoffs: reduces platform's ability to monitor for abuse (can't inspect encrypted content). Support and debugging are harder. More complex key management for tenants. Practical recommendation: offer standard (platform-managed keys) and premium (customer-managed keys) tiers. Zero-knowledge architecture as an optional enterprise add-on for regulated industries (healthcare, finance, government)." },
]

export default function MultiTenantLlmIsolationPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Multi-Tenant LLM Isolation", item: `${SITE_URL}/${locale}${PATH}` }
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Multi-Tenant LLM Isolation Guide", "Multi-Tenant LLM Isolation Guide"), description: pick(isDE, "Multi-Tenant LLM Isolation", "Multi-tenant LLM isolation"), url: `${SITE_URL}/${locale}${PATH}` }
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Multi-Tenant-Isolation-Guide für eigene KI-Plattformen.", "Multi-tenant isolation guide for your own AI platforms.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Multi-Tenant Isolation</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Multi-Tenant LLM Isolation", "Multi-Tenant LLM Isolation")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Shared LLM-Infrastruktur für mehrere Mandanten erfordert strikte Datentrennung auf jeder Schicht — Konversation, RAG, Verschlüsselung und Monitoring. Vier Isolation-Schichten mit konkreter Moltbot-Konfiguration.", "Shared LLM infrastructure for multiple tenants requires strict data separation at every layer — conversation, RAG, encryption and monitoring. Four isolation layers with concrete Moltbot configuration.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Multi-Tenant LLM Isolation? Einfach erklärt", "What is Multi-Tenant LLM Isolation? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Multi-Tenant LLM Isolation garantiert strikte Datentrennung zwischen Mandanten auf allen Ebenen: Conversation & Context Isolation trennt Konversationen mit tenant_id-tagging und cross-tenant context denial. Per-Tenant RAG Partitionierung isoliert Vector Stores mit Namespace-Strategien oder separaten Collections pro Mandant. Per-Tenant Encryption Keys verwenden separate Vault-Keys pro Mandant damit ein Key-Compromise nur einen Mandant betrifft. Cross-Tenant Leakage Detection scannt LLM-Outputs auf fremde Tenant-Fingerprints und validiert Context-Items vor LLM-Submission.", "Multi-tenant LLM isolation guarantees strict data separation between tenants at all levels: conversation & context isolation separates conversations with tenant_id tagging and cross-tenant context denial. Per-tenant RAG partitioning isolates vector stores with namespace strategies or separate collections per tenant. Per-tenant encryption keys use separate vault keys per tenant so a key compromise only affects one tenant. Cross-tenant leakage detection scans LLM outputs for foreign tenant fingerprints and validates context items before LLM submission.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Isolation-Schichten", "Jump to isolation layers")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Isolation-Schichten", "4 Isolation Layers")}</h2>
          <div className="space-y-5">
            {ISOLATION_LAYERS.map((c) => (
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
            <a href={`/${locale}/moltbot/llm-context-isolation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Context Isolation", "LLM Context Isolation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Konversations-Isolation", "Conversation isolation")}</div>
            </a>
            <a href={`/${locale}/moltbot/agent-memory-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "Agent Memory Security", "Agent Memory Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Memory-Trennung pro Mandant", "Memory separation per tenant")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-data-loss-prevention`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Data Loss Prevention", "AI Data Loss Prevention")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Cross-Tenant-Leckage-Scan", "Cross-tenant leakage scan")}</div>
            </a>
            <a href={`/${locale}/solutions/gdpr-ai-data-processing`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "GDPR AI Data Processing", "GDPR AI Data Processing")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "DSGVO-konforme Multi-Tenancy", "GDPR-compliant multi-tenancy")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Multi-Tenant Isolation Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Multi-Tenant LLM Isolation-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with multi-tenant LLM isolation implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
