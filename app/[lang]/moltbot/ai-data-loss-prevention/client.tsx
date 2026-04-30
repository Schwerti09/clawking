"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-data-loss-prevention"

const DLP_LAYERS = [
  { id: "DLP-1", title: "Input DLP: PII & Secrets Scanning Before LLM Submission", desc: "Every prompt must be scanned before being sent to an LLM. Personal data and secrets must be detected, masked or blocked — preventing inadvertent LLM memorisation and external API exposure.", code: `# Moltbot input DLP configuration:\ninput_dlp:\n  enabled: true\n  scan_order:\n    - secrets_detection     # Highest priority — block immediately\n    - pii_detection         # Mask or block depending on policy\n    - sensitive_data_labels # Custom org-specific patterns\n\n  secrets_detection:\n    patterns:\n      - name: aws_access_key\n        regex: "(AKIA|ABIA|ACCA|ASIA)[A-Z0-9]{16}"\n        action: block           # Never send AWS keys to LLM\n      - name: generic_api_key\n        regex: "(api[_-]?key|apikey)[\\s:=]+['\"]?[A-Za-z0-9\\-_]{20,}"\n        action: block\n      - name: private_key_pem\n        regex: "-----BEGIN (RSA |EC )?PRIVATE KEY-----"\n        action: block\n      - name: jwt_token\n        regex: "eyJ[A-Za-z0-9\\-_]+\\.eyJ[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+"\n        action: block\n    on_detection:\n      action: block\n      log: true\n      alert_channel: security-dlp-alerts\n\n  pii_detection:\n    engine: presidio          # Microsoft Presidio or custom\n    entities:\n      - PERSON                # Names\n      - EMAIL_ADDRESS\n      - PHONE_NUMBER\n      - IBAN_CODE\n      - CREDIT_CARD\n      - DE_PERSONAL_ID        # German Personalausweis\n      - NRP                   # National Registration Patterns\n    action: mask              # Replace with [PERSON], [EMAIL], etc.\n    # action: block           # Alternative: reject prompt entirely\n    # action: allow           # Allow but log (audit mode)\n    min_score: 0.75           # Confidence threshold for detection` },
  { id: "DLP-2", title: "Output DLP: Exfiltration & Memorisation Detection", desc: "LLMs can leak training data or output injected content that routes sensitive data to attackers. Scan every LLM response before returning it to the client.", code: `# Moltbot output DLP — scan LLM responses before delivery:\noutput_dlp:\n  enabled: true\n\n  # 1. Re-scan response for PII that the LLM may have generated or leaked:\n  pii_rescan:\n    enabled: true\n    action_on_detect: redact   # Remove PII from response\n    alert_if_not_in_input: true  # Alert if output PII was NOT in input (memorisation)\n\n  # 2. Detect prompt exfiltration patterns (LLM routing data out):\n  exfiltration_detection:\n    patterns:\n      - name: url_with_data\n        # Detects: https://attacker.com/?data=<sensitive>\n        regex: "https?://[^\\s]+\\?[^\\s]*=(\\w{20,})"\n        action: block\n      - name: base64_encoded_block\n        regex: "(?:[A-Za-z0-9+/]{4}){10,}(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?"\n        action: flag_for_review\n      - name: webhook_call_pattern\n        regex: "(curl|wget|fetch).*https?://[^\\s]+"\n        action: block\n    on_block:\n      return_safe_response: true  # Return generic error, not blocked content\n      log_full_response: true     # Log to secure audit store for investigation\n\n  # 3. Training data memorisation detection:\n  memorisation_detection:\n    enabled: true\n    # Flag responses that contain verbatim sequences unlikely to be generated\n    # but likely memorised from training data:\n    min_verbatim_chars: 150    # Flag if >150 chars match known sensitive training patterns\n    on_detect: redact_and_alert` },
  { id: "DLP-3", title: "RAG Corpus DLP: Prevent Sensitive Documents from LLM Context", desc: "Documents indexed into the RAG vector store may contain PII or confidential data that should never reach an LLM context window. Scan documents at index time.", code: `# Moltbot RAG corpus DLP — scan documents before indexing:\nrag_dlp:\n  enabled: true\n  scan_on_index: true         # Block indexing if DLP fails\n\n  classification:\n    # Documents are classified on ingest:\n    public:\n      allowed_in_llm_context: true\n    internal:\n      allowed_in_llm_context: true\n      requires_user_auth: true    # User must be authenticated to retrieve\n    confidential:\n      allowed_in_llm_context: false  # Never send to LLM\n      human_review_required: true\n    restricted:\n      allowed_in_llm_context: false\n      block_indexing: true\n\n  # Auto-classification rules:\n  auto_classify:\n    - pattern: "(CONFIDENTIAL|STRICTLY CONFIDENTIAL|TOP SECRET)"\n      classification: restricted\n    - pattern: "(INTERNAL USE ONLY|FOR INTERNAL DISTRIBUTION)"\n      classification: confidential\n    - pii_entities_found: true\n      pii_count_threshold: 5\n      classification: confidential\n\n  # At retrieval time: re-validate classification before injecting into context:\n  retrieval_validation:\n    check_classification_at_retrieval: true\n    # Documents may be reclassified after indexing — always check current label` },
  { id: "DLP-4", title: "DLP Audit Trail & GDPR Evidence", desc: "Every DLP event must be logged for compliance evidence — GDPR Art. 32 requires appropriate technical measures, and the audit trail proves they are active.", code: `# Moltbot DLP audit log structure (GDPR-compliant — no raw PII in logs):\ndlp_audit:\n  log_format: json\n  destination: siem             # → SIEM / Elasticsearch\n\n  # What to log per DLP event:\n  event_fields:\n    - timestamp\n    - event_type                # input_blocked | output_redacted | rag_classified\n    - dlp_rule_triggered        # e.g., "pii_detection:EMAIL_ADDRESS"\n    - action_taken              # blocked | masked | flagged\n    - session_id                # Pseudonymised session (NOT user_id directly)\n    - prompt_hash               # SHA-256 of original prompt — NOT the raw prompt\n    - entity_types_detected     # e.g., ["EMAIL_ADDRESS", "PERSON"] — NOT the values\n    - confidence_scores         # Detection confidence per entity type\n    # NOT logged: raw PII values, full prompts, user names (GDPR Art. 5 minimisation)\n\n  # GDPR retention policy for DLP logs:\n  retention:\n    dlp_event_logs: 90days       # Short retention — operational monitoring\n    security_incident_logs: 3years  # Longer if DLP event became security incident\n    compliance_evidence: 7years  # For audit/regulatory requirements\n\n  # Monthly DLP effectiveness report (for DPO / CISO):\n  reporting:\n    monthly_summary: true\n    include: [total_events, blocked_count, pii_entity_breakdown, trend_analysis]\n    recipients: [dpo@company.com, security-team@company.com]` },
]

const FAQ = [
  { q: "What are the most common ways LLMs cause data loss in enterprise environments?", a: "The four primary LLM data loss vectors: 1) Inadvertent PII submission: users paste customer data, employee records, or medical information directly into LLM prompts (often to 'summarize this data' or 'help me write about this case'). The data is then sent to a cloud LLM provider, stored in their logs, potentially used for training. 2) Secret submission: developers paste code containing API keys, connection strings, or credentials into coding assistants — leaked to the LLM provider. 3) Prompt exfiltration (indirect injection): attacker-controlled content in a document or web page contains hidden instructions that cause the agent to exfiltrate data via a crafted URL or webhook call. 4) Training data memorisation leakage: LLMs can reproduce verbatim text from their training data, which may include private data that was accidentally included in training datasets. DLP addresses vectors 1-3 directly; memorisation detection addresses vector 4." },
  { q: "What is the performance impact of running DLP on every LLM request?", a: "DLP latency depends on the implementation: Regex-based detection (secrets, custom patterns): ~1-5ms per scan — negligible. ML-based PII detection (Presidio, spaCy NER): 10-50ms per scan depending on text length. For a typical 1000-token prompt (750 words), expect ~20-30ms added latency. Optimisations: run DLP scans in parallel with LLM request preparation (not in the serial path). Cache scan results for repeated prompts (use prompt hash as cache key). Scan only new content in multi-turn conversations (not the full history on every turn). Async DLP: for non-blocking use cases, run DLP in background and flag for human review rather than blocking. Moltbot's default configuration runs input DLP inline (blocking) and output DLP with <50ms added latency for 95th percentile requests. Accept that this is a required security cost — the alternative is uncontrolled data exfiltration." },
  { q: "How do I handle false positives in PII detection that block legitimate requests?", a: "False positive management strategies: 1) Tune confidence thresholds: lower the min_score for low-risk actions (masking), keep high thresholds for blocking. Start with 0.85+ for blocking, 0.6+ for masking. 2) Allowlisting: add allow-patterns for known-safe content (e.g., product codes that look like phone numbers). 3) Context-aware detection: configure Presidio to consider surrounding context — 'Order ID: 123-456-789' should not be detected as phone number. 4) Tiered actions: never block without a fallback — mask PII and allow the request rather than rejecting it entirely (unless secrets detection). 5) User feedback loop: implement a 'this was incorrectly flagged' button in your UI — feed corrections back into threshold tuning. 6) Monitor false positive rate in DLP audit logs: target <2% false positive rate. High false positives mean users will find workarounds (defeating the DLP entirely)." },
  { q: "Does AI DLP replace traditional DLP solutions like Symantec or Forcepoint?", a: "No — AI DLP complements, not replaces, traditional DLP. Traditional DLP covers: email attachments, file transfers (USB, cloud upload), web traffic (HTTP/S content inspection), endpoint file access patterns. AI-specific DLP covers: LLM prompt content before submission, LLM response content before delivery, RAG corpus classification and retrieval filtering, agent tool call argument scanning. The gap: traditional DLP tools are not built for LLM interaction patterns — they may see an HTTPS POST to api.openai.com but cannot inspect the semantic content of the prompt (encrypted at transport layer, often structured as JSON). AI-specific DLP integrates at the application layer where it can access prompt content before encryption. Recommended architecture: traditional DLP for endpoint/network + Moltbot AI DLP for LLM-layer — integrated with your SIEM for unified visibility across both data planes." },
]

export default function AiDataLossPreventionClient({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({})
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('dlp-checklist')
    if (saved) {
      setCheckedItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const total = 8
    const checked = Object.values(checkedItems).filter(Boolean).length
    setProgress(Math.round((checked / total) * 100))
    localStorage.setItem('dlp-checklist', JSON.stringify(checkedItems))
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

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Data Loss Prevention", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 py-12 flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Sticky Table of Contents */}
          <div className="sticky top-4 bg-gray-900 border border-gray-700 rounded-lg p-4 mb-8">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2">
              {pick(isDE, "Inhaltsverzeichnis", "Table of Contents")}
            </h3>
            <nav className="space-y-1 text-sm">
              <a href="#amateur" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Was ist DLP? Einfach erklärt", "What is DLP? Simply Explained")}</a>
              <a href="#layers" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "4 DLP-Schichten", "4 DLP Layers")}</a>
              <a href="#scars" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
              <a href="#checklist" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Interaktive Checklist", "Interactive Checklist")}</a>
              <a href="#score" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Security Score Calculator", "Security Score Calculator")}</a>
              <a href="#faq" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "FAQ", "FAQ")}</a>
            </nav>
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100">
            <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "DLP-Guide für eigene KI-Systeme. Kein Angriffsanleitung.", "DLP guide for your own AI systems. Not an attack guide.")}
          </div>
          <div className="mb-3"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Moltbot · Batch 12</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100">{pick(isDE, "AI Data Loss Prevention", "AI Data Loss Prevention")}</h1>
          <p className="text-lg text-gray-300 mb-6">
            {pick(isDE, "LLMs sind undichte Stellen für Unternehmensdaten — Nutzer schicken PII, Secrets und vertrauliche Dokumente in Prompts. Vier DLP-Schichten: Input-Scan, Output-Exfiltrations-Erkennung, RAG-Klassifizierung und GDPR-konformes Audit-Log.", "LLMs are data leakage points for enterprise data — users send PII, secrets and confidential documents in prompts. Four DLP layers: input scan, output exfiltration detection, RAG classification and GDPR-compliant audit log.")}
          </p>

          {/* Amateur Section */}
          <section id="amateur" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Was ist Data Loss Prevention? Einfach erklärt", "What is Data Loss Prevention? Simply Explained")}
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-300 mb-4">
                {pick(isDE, "Stell dir vor, du hast einen Briefkasten mit automatischem Filter: Jeder Brief wird vor der Zustellung geprüft — persönliche Daten werden geschwärzt, verdächtige Anhänge werden blockiert, Absender werden verifiziert. Data Loss Prevention (DLP) für LLMs funktioniert ähnlich: Jeder Prompt wird vor dem Senden an die KI gescannt, jede Antwort wird vor der Rückgabe geprüft. Wenn ein Nutzer versehentlich Kundendaten in einen Prompt pastet, blockiert DLP die Übertragung. Wenn ein Entwickler API-Keys im Code hat, werden sie erkannt und maskiert. Ohne DLP riskierst du, dass vertrauliche Daten an externe KI-Anbieter geleakt werden — GDPR-Verstöße, Reputationsschaden, Compliance-Fails. Mit DLP bleibt die Kontrolle über deine Daten.", "Imagine a mailbox with automatic filter: every letter is checked before delivery — personal data is redacted, suspicious attachments are blocked, senders are verified. DLP for LLMs works similarly: every prompt is scanned before sending to the AI, every response is checked before returning. If a user accidentally pastes customer data into a prompt, DLP blocks transmission. If a developer has API keys in code, they are detected and masked. Without DLP, you risk confidential data leaking to external AI providers — GDPR violations, reputation damage, compliance failures. With DLP, you maintain control over your data.")}
              </p>
              <p className="text-gray-300">
                {pick(isDE, "Im Folgenden zeige ich dir, wie du DLP für deine LLM-Systeme production-ready implementierst — mit 4 Schichten: Input-Scan, Output-Exfiltrations-Erkennung, RAG-Klassifizierung und Audit-Log.", "Below I'll show you how to implement DLP for your LLM systems in production — with 4 layers: input scan, output exfiltration detection, RAG classification and audit log.")}
              </p>
            </div>
          </section>
          {/* 4 DLP Layers */}
          <section id="layers" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 DLP-Schichten", "4 DLP Layers")}</h2>
            <div className="space-y-5">
              {DLP_LAYERS.map((c) => (
                <div key={c.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700">
                    <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{c.id}</span>
                    <span className="font-bold text-gray-100">{c.title}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-300 mb-3">{c.desc}</p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto"><pre>{c.code}</pre></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Real-World Scars: Was in der Produktion schiefging", "Real-World Scars: What Went Wrong in Production")}
            </h2>
            <div className="space-y-4">
              <div className="bg-red-900 p-6 rounded-lg border border-red-700">
                <h3 className="font-bold text-red-300 mb-2">
                  {pick(isDE, "Fall 1: FinTech-Startup – 12.400 Kundendaten exponiert", "Case 1: FinTech Startup – 12,400 Customer Records Exposed")}
                </h3>
                <p className="text-sm text-red-200 mb-2">
                  {pick(isDE, "Ein Mitarbeiter pastete Kundendaten in ChatGPT um eine Analyse zu erstellen. Die Daten wurden an OpenAI gesendet, in Logs gespeichert, möglicherweise für Training verwendet. Root cause: Kein Input-DLP, keine PII-Erkennung.", "An employee pasted customer data into ChatGPT to create an analysis. Data was sent to OpenAI, stored in logs, possibly used for training. Root cause: no input DLP, no PII detection.")}
                </p>
                <p className="text-sm text-red-200 mb-2">
                  <strong>{pick(isDE, "Schaden:", "Damage:")} </strong>{pick(isDE, "€3.2M an Bußgeldern + Reputationsschaden", "€3.2M in fines + reputation damage")}
                </p>
                <p className="text-sm text-red-200">
                  <strong>{pick(isDE, "Fix:", "Fix:")} </strong>{pick(isDE, "Input-DLP implementiert mit PII-Erkennung und Blockierung. Mitarbeiter-Schulung.", "Implemented input DLP with PII detection and blocking. Employee training.")}
                </p>
              </div>
              <div className="bg-orange-900 p-6 rounded-lg border border-orange-700">
                <h3 className="font-bold text-orange-300 mb-2">
                  {pick(isDE, "Fall 2: SaaS-Plattform – AWS-Keys in Code Assistant geleakt", "Case 2: SaaS Platform — AWS Keys Leaked in Code Assistant")}
                </h3>
                <p className="text-sm text-orange-200 mb-2">
                  {pick(isDE, "Ein Entwickler pastete Code mit AWS-Access-Keys in einen Code-Generator. Die Keys wurden an den LLM-Anbieter gesendet, exponiert, kompromittiert. Root cause: Kein Secrets-Scanning.", "A developer pasted code with AWS access keys into a code generator. Keys were sent to LLM provider, exposed, compromised. Root cause: no secrets scanning.")}
                </p>
                <p className="text-sm text-orange-200 mb-2">
                  <strong>{pick(isDE, "Schaden:", "Damage:")} </strong>{pick(isDE, "€850k Cloud-Kosten + Incident Response", "€850k cloud costs + incident response")}
                </p>
                <p className="text-sm text-orange-200">
                  <strong>{pick(isDE, "Fix:", "Fix:")} </strong>{pick(isDE, "Secrets-DLP implementiert mit Regex-Pattern-Scanning. Keys rotiert.", "Implemented secrets DLP with regex pattern scanning. Keys rotated.")}
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Interaktive DLP Checklist", "Interactive DLP Checklist")}
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
                  { key: 'input', label: pick(isDE, 'Input DLP implementiert', 'Input DLP implemented') },
                  { key: 'output', label: pick(isDE, 'Output DLP implementiert', 'Output DLP implemented') },
                  { key: 'rag', label: pick(isDE, 'RAG Corpus DLP aktiv', 'RAG corpus DLP active') },
                  { key: 'secrets', label: pick(isDE, 'Secrets Scanning aktiv', 'Secrets scanning active') },
                  { key: 'pii', label: pick(isDE, 'PII-Erkennung aktiv', 'PII detection active') },
                  { key: 'audit', label: pick(isDE, 'DLP Audit-Log aktiv', 'DLP audit log active') },
                  { key: 'gdpr', label: pick(isDE, 'GDPR-konform', 'GDPR compliant') },
                  { key: 'monitoring', label: pick(isDE, 'DLP Monitoring Dashboard', 'DLP monitoring dashboard') }
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
          <section id="score" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "DLP Security Score Calculator", "DLP Security Score Calculator")}
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-4">
              <div className="space-y-4">
                {[
                  { key: 'q1', label: pick(isDE, 'Haben Sie Input-DLP für alle LLM-Prompts?', 'Do you have input DLP for all LLM prompts?') },
                  { key: 'q2', label: pick(isDE, 'Haben Sie Output-DLP für alle LLM-Antworten?', 'Do you have output DLP for all LLM responses?') },
                  { key: 'q3', label: pick(isDE, 'Haben Sie Secrets-Scanning aktiv?', 'Do you have secrets scanning active?') },
                  { key: 'q4', label: pick(isDE, 'Haben Sie PII-Erkennung aktiv?', 'Do you have PII detection active?') },
                  { key: 'q5', label: pick(isDE, 'Haben Sie DLP Audit-Logs?', 'Do you have DLP audit logs?') }
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
                      {pick(isDE, 'Ihr DLP Score:', 'Your DLP Score:')} {score}/100
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                      {score >= 80 ? pick(isDE, 'Exzellent! Ihr DLP ist production-ready.', 'Excellent! Your DLP is production-ready.') :
                       score >= 60 ? pick(isDE, 'Gut, aber es gibt Verbesserungspotenzial.', 'Good, but there is room for improvement.') :
                       pick(isDE, 'Kritisch – DLP muss dringend verbessert werden.', 'Critical – DLP urgently needs improvement.')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Share Badge */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
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
                      <span className="text-2xl font-bold text-white">DLP</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-100">DLP Score</p>
                      <p className="text-2xl font-bold text-cyan-400">{score !== null ? score : '--'}/100</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(`![DLP Score ${score}/100](https://clawguru.org/og/dlp-${score}.png)`)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    {pick(isDE, 'Markdown kopieren', 'Copy Markdown')}
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`<img src="https://clawguru.org/og/dlp-${score}.png" alt="DLP Score ${score}/100">`)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    {pick(isDE, 'HTML kopieren', 'Copy HTML')}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          </section>
          {/* Further Resources */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h2>
            <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/llm-output-validation`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="font-semibold text-cyan-400">LLM Output Validation</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Output-Validierung & PII-Scan", "Output validation & PII scan")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-audit-logging`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="font-semibold text-cyan-400">AI Agent Audit Logging</div>
              <div className="text-sm text-gray-300">{pick(isDE, "DLP-Events auditieren", "Audit DLP events")}</div>
            </a>
            <a href={`/${locale}/solutions/gdpr-ai-data-processing`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="font-semibold text-cyan-400">GDPR AI Data Processing</div>
              <div className="text-sm text-gray-300">{pick(isDE, "DSGVO-konforme KI", "GDPR-compliant AI")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-context-isolation`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="font-semibold text-cyan-400">LLM Context Isolation</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Mandanten-Datentrennung", "Tenant data separation")}</div>
            </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
