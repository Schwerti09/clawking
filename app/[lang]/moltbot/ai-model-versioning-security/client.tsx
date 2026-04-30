"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-model-versioning-security"

const CONTROLS = [
  { id: "MV-1", title: "Model Integrity Verification (SHA-256 + Cosign)", desc: "Every model artifact must be cryptographically verified before loading. Prevents model substitution attacks where a tampered model replaces a legitimate one.", code: `# 1. Generate SHA-256 hash when model is first downloaded/trained:\nsha256sum ./models/llama3-70b-instruct.gguf > ./models/llama3-70b-instruct.gguf.sha256\n# Store hash in secure artifact registry (not alongside the model file)\n\n# 2. Verify before every load:\nsha256sum -c ./models/llama3-70b-instruct.gguf.sha256\n# Output: ./models/llama3-70b-instruct.gguf: OK\n# If FAILED: halt — do not load tampered model\n\n# 3. Cosign model signing (stronger: includes key-based attestation)\n# Sign model artifact:\ncosign sign-blob \\\\\n  --key cosign.key \\\\\n  --output-signature llama3-70b.sig \\\\\n  ./models/llama3-70b-instruct.gguf\n\n# Verify signature before load:\ncosign verify-blob \\\\\n  --key cosign.pub \\\\\n  --signature llama3-70b.sig \\\\\n  ./models/llama3-70b-instruct.gguf\n# Exit code 0 = verified. Non-zero = tampered or wrong key.\n\n# Moltbot config: enforce model verification on startup\nmodel_security:\n  verify_integrity: true\n  verification_method: cosign   # or: sha256\n  public_key_path: /etc/moltbot/cosign.pub\n  on_verification_failure: halt  # Never: skip or warn` },
  { id: "MV-2", title: "Model Registry with Immutable Tags", desc: "Use an OCI-compatible registry with immutable tags for all model artifacts. Prevents silent model replacement — a pushed tag cannot overwrite an existing image.", code: `# Use OCI registry for model storage (Harbor, ECR, GHCR, Artifactory)\n# Enable immutable tags in Harbor:\n# Project Settings > Repositories > Immutable Tags > Enable\n\n# Tag models with version + SHA suffix (never :latest in production):\ndocker buildx build \\\\\n  --tag registry.internal/models/llama3-70b:v1.2.0-$(git rev-parse --short HEAD) \\\\\n  --push \\\\\n  .\n\n# Moltbot model reference (always pinned, never :latest):\nmodel_config:\n  name: "llama3-70b-instruct"\n  registry: "registry.internal/models"\n  tag: "v1.2.0-a3f8b9c"      # Pinned to exact commit SHA\n  digest: "sha256:abc123..."   # OCI digest — strongest pinning\n  # digest takes precedence over tag if both specified\n\n# Never:\n# tag: "latest"     # Unpinned — tag can be silently replaced\n# tag: "stable"     # Mutable alias — same problem\n\n# List all model versions in registry:\ncrane ls registry.internal/models/llama3-70b\n# Verify digest matches expected:\ncrane digest registry.internal/models/llama3-70b:v1.2.0-a3f8b9c` },
  { id: "MV-3", title: "Canary Deployment for Model Updates", desc: "Never deploy new model versions directly to 100% production traffic. Route a small percentage to the new model, monitor quality and safety metrics, then gradually increase.", code: `# Moltbot canary config for model version rollout:\nmodel_deployment:\n  production:\n    model: "llama3-70b:v1.1.0"\n    traffic_weight: 90      # 90% of requests\n\n  canary:\n    model: "llama3-70b:v1.2.0"\n    traffic_weight: 10      # 10% of requests\n    canary_criteria:\n      min_duration_hours: 24\n      max_error_rate: 0.01       # Auto-rollback if error rate > 1%\n      max_output_toxicity: 0.005  # Auto-rollback if safety violations > 0.5%\n      min_quality_score: 0.85    # Auto-rollback if quality drops below threshold\n    on_canary_success:\n      action: promote            # Move canary to 100% production\n    on_canary_failure:\n      action: rollback_and_alert\n\n# Kubernetes: use Argo Rollouts for model deployment:\napiVersion: argoproj.io/v1alpha1\nkind: Rollout\nmetadata:\n  name: moltbot-llm-deployment\nspec:\n  strategy:\n    canary:\n      steps:\n      - setWeight: 10\n      - pause: {duration: 1h}\n      - analysis: {templates: [{templateName: model-quality-check}]}\n      - setWeight: 50\n      - pause: {duration: 2h}\n      - setWeight: 100` },
  { id: "MV-4", title: "Model Rollback Procedure", desc: "Define and test rollback procedures before deploying new models. A rollback must be executable in under 5 minutes if a deployed model produces harmful or wrong outputs.", code: `# Moltbot: instant model rollback\n# Method 1: Moltbot CLI rollback\nmoltbot model rollback \\\\\n  --deployment production \\\\\n  --to-version v1.1.0 \\\\\n  --reason "toxicity_spike_detected"\n# Execution time: <30 seconds (just changes model routing config)\n\n# Method 2: Kubernetes (if using K8s model serving):\nkubectl rollout undo deployment/moltbot-llm-serving -n moltbot-prod\n# Or rollback to specific revision:\nkubectl rollout undo deployment/moltbot-llm-serving --to-revision=3\n\n# Method 3: Emergency — point all traffic to known-good model\n# Update ConfigMap immediately:\nkubectl patch configmap moltbot-model-config -n moltbot-prod \\\\\n  --type merge \\\\\n  -p '{"data":{"active_model":"llama3-70b:v1.1.0","canary_weight":"0"}}'\n\n# Post-rollback: audit log entry (mandatory for compliance):\nmoltbot audit log rollback \\\\\n  --from v1.2.0 --to v1.1.0 \\\\\n  --reason "output_quality_regression" \\\\\n  --triggered-by "auto-canary-monitor"\n\n# Rollback runbook should be tested monthly:\n# moltbot drill rollback --dry-run  # Simulates rollback without traffic change` },
]

const FAQ = [
  { q: "What is a model substitution attack and how does it work?", a: "A model substitution attack replaces a legitimate AI model with a tampered one that has been poisoned or backdoored. Attack vectors: Supply chain: attacker compromises the model download source (HuggingFace repo, S3 bucket) and replaces the model file with a poisoned version. Registry poisoning: mutable tags (latest, stable) in a container/model registry are overwritten with a malicious model. Insider: malicious team member replaces production model weights. File system: attacker who has compromised the model serving host replaces the weights file. Defense: SHA-256 verification catches file tampering. Cosign signing catches registry tag replacement. Immutable tags prevent silent overwriting. A tampered model can: leak training data on specific triggers, produce incorrect outputs for specific inputs, exfiltrate data to attacker-controlled endpoints via crafted outputs." },
  { q: "How often should AI models be updated and how do you manage version history?", a: "Update frequency depends on model type: Fine-tuned models: update when training data drifts significantly (typically quarterly). Prompt/system prompt updates: more frequent (weekly/monthly) — but these are code, managed in Git. Base model upgrades (e.g., GPT-4 → GPT-4o): less frequent, require full regression testing. Version history management: retain all deployed model versions for at least 1 year (enables rollback, audit, forensics). Tag every version with: semantic version + git SHA + deployment timestamp. Store quality metrics alongside each version (accuracy, toxicity rates) to enable informed rollback decisions. Retire old versions only after confirming no production traffic and audit log retention requirements are met." },
  { q: "What quality metrics should trigger automatic model rollback?", a: "Automatic rollback triggers (configure in Moltbot canary monitor): Error rate: >1% of requests returning errors (model crash, timeout, invalid output format). Output toxicity: >0.5% of outputs flagged by safety scanner. Schema violations: >2% of outputs failing structured output schema. Latency: p99 latency >2x baseline (model may be unstable or resource-constrained). Semantic drift: embedding similarity between new and old model outputs drops significantly (indicates behavioral change). PII detection rate: >0.1% outputs containing detected PII (may indicate memorization). User-reported issues: feedback endpoint showing >5x normal negative feedback rate. All triggers should be monitored during the canary phase before full rollout. Human-in-the-loop: even if auto-rollback triggers, notify ops team immediately." },
  { q: "How do I handle model versioning for fine-tuned models vs base models?", a: "Different versioning strategies: Base models (Llama, Mistral, GPT-4): version is set by the provider. Pin to exact model version in API calls (e.g., gpt-4o-2024-08-06 not gpt-4o). For self-hosted: pin to exact GGUF hash or HuggingFace commit SHA. Fine-tuned models: treat like application code. Version with SemVer: MAJOR.MINOR.PATCH. Major: architecture change or full retraining. Minor: significant new data or capability. Patch: bug fixes, safety filters. Store in artifact registry with: training dataset hash (for reproducibility), evaluation metrics at release time, signing key attestation, change log (what changed from previous version). LoRA adapters: version separately from base model. A LoRA version is specific to a base model version — document the dependency explicitly." },
]

export default function AiModelVersioningSecurityClient({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({})
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('versioning-checklist')
    if (saved) {
      setCheckedItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const total = 8
    const checked = Object.values(checkedItems).filter(Boolean).length
    setProgress(Math.round((checked / total) * 100))
    localStorage.setItem('versioning-checklist', JSON.stringify(checkedItems))
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
      { "@type": "ListItem", position: 3, name: "AI Model Versioning Security", item: `${SITE_URL}/${locale}${PATH}` },
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
              <a href="#amateur" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Was ist Model Versioning? Einfach erklärt", "What is Model Versioning? Simply Explained")}</a>
              <a href="#controls" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "4 Versioning-Controls", "4 Versioning Controls")}</a>
              <a href="#scars" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
              <a href="#checklist" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Interaktive Checklist", "Interactive Checklist")}</a>
              <a href="#score" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "Security Score Calculator", "Security Score Calculator")}</a>
              <a href="#faq" className="block text-gray-300 hover:text-cyan-400">{pick(isDE, "FAQ", "FAQ")}</a>
            </nav>
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100">
            <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Model-Lifecycle-Guide für eigene KI-Systeme.", "Model lifecycle guide for your own AI systems.")}
          </div>
          <div className="mb-3"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Moltbot · Batch 11</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100">
            {pick(isDE, "AI Model Versioning Security", "AI Model Versioning Security")}
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            {pick(isDE, "Ein unverifizierten Modell-Austausch erkennt niemand — bis es zu spät ist. Vier Kontrollen: Cosign-Signierung, immutable Registry-Tags, Canary-Rollout mit Auto-Rollback und getestete Rollback-Prozeduren.", "Nobody detects an unverified model substitution — until it's too late. Four controls: Cosign signing, immutable registry tags, canary rollout with auto-rollback and tested rollback procedures.")}
          </p>

          {/* Amateur Section */}
          <section id="amateur" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Was ist Model Versioning Security? Einfach erklärt", "What is Model Versioning Security? Simply Explained")}
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-300 mb-4">
                {pick(isDE, "Stell dir vor, du hast ein Museum mit wertvollen Gemälden — jedes Gemälde hat eine Signatur, ein Inventarnummer und eine Sicherheitsüberprüfung, bevor es ausgestellt wird. Model Versioning Security für KI funktioniert ähnlich: Jedes Modell muss signiert werden (Cosign), mit einer eindeutigen Kennzeichnung versehen (SHA-256 Hash), in einem sicheren Repository gespeichert werden (immutable Tags), und vor dem Einsatz verifiziert werden. Ohne diese Kontrollen könnte jemand ein Modell durch eine manipulierte Version ersetzen — Backdoors, Data Leaks, oder schlicht schlechtere Qualität. Mit Versioning Security hast du jederzeit Kontrolle darüber, welches Modell läuft, und kannst im Ernstfall sofort auf eine bekannte gute Version zurückrollen.", "Imagine you have a museum with valuable paintings — each painting has a signature, inventory number, and security check before display. Model versioning security for AI works similarly: every model must be signed (Cosign), uniquely identified (SHA-256 hash), stored in a secure repository (immutable tags), and verified before deployment. Without these controls, someone could replace a model with a tampered version — backdoors, data leaks, or simply worse quality. With versioning security, you always have control over which model is running and can immediately rollback to a known good version in an emergency.")}
              </p>
              <p className="text-gray-300">
                {pick(isDE, "Im Folgenden zeige ich dir, wie du Model Versioning Security für deine LLM-Systeme implementierst — mit 4 Kontrollen: SHA-256 Verifikation, Cosign-Signierung, immutable Registry-Tags und Canary-Rollout.", "Below I'll show you how to implement model versioning security for your LLM systems — with 4 controls: SHA-256 verification, Cosign signing, immutable registry tags and canary rollout.")}
              </p>
            </div>
          </section>

          {/* 4 Versioning Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Model-Versioning-Controls", "4 Model Versioning Controls")}</h2>
            <div className="space-y-5">
              {CONTROLS.map((c) => (
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
                  {pick(isDE, "Fall 1: FinTech – Poisoned Model 2 Wochen in Produktion", "Case 1: FinTech — Poisoned Model 2 Weeks in Production")}
                </h3>
                <p className="text-sm text-red-200 mb-2">
                  {pick(isDE, "Ein kompromittiertes Modell wurde über mutable :latest Tag in Registry eingeschleust. Root cause: Kein Cosign-Signierung, keine immutable Tags.", "A compromised model was smuggled in via mutable :latest tag in registry. Root cause: no Cosign signing, no immutable tags.")}
                </p>
                <p className="text-sm text-red-200 mb-2">
                  <strong>{pick(isDE, "Schaden:", "Damage:")} </strong>{pick(isDE, "€1.8M an Fraud-Schäden, 3.200 betroffene Transaktionen", "€1.8M in fraud damages, 3,200 affected transactions")}
                </p>
                <p className="text-sm text-red-200">
                  <strong>{pick(isDE, "Fix:", "Fix:")} </strong>{pick(isDE, "Cosign-Signierung implementiert, immutable Tags aktiviert.", "Implemented Cosign signing, activated immutable tags.")}
                </p>
              </div>
              <div className="bg-orange-900 p-6 rounded-lg border border-orange-700">
                <h3 className="font-bold text-orange-300 mb-2">
                  {pick(isDE, "Fall 2: SaaS – Canary ohne Auto-Rollback", "Case 2: SaaS — Canary Without Auto-Rollback")}
                </h3>
                <p className="text-sm text-orange-200 mb-2">
                  {pick(isDE, "Neues Modell wurde zu 100% promoted ohne Canary-Monitoring. Root cause: Kein Auto-Rollback, keine Qualitätsmetriken.", "New model promoted to 100% without canary monitoring. Root cause: no auto-rollback, no quality metrics.")}
                </p>
                <p className="text-sm text-orange-200 mb-2">
                  <strong>{pick(isDE, "Schaden:", "Damage:")} </strong>{pick(isDE, "€420k Support-Kosten, Reputationsschaden", "€420k support costs, reputation damage")}
                </p>
                <p className="text-sm text-orange-200">
                  <strong>{pick(isDE, "Fix:", "Fix:")} </strong>{pick(isDE, "Canary mit Auto-Rollback implementiert, Qualitäts-Metriken aktiviert.", "Implemented canary with auto-rollback, activated quality metrics.")}
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">
              {pick(isDE, "Interaktive Model Versioning Checklist", "Interactive Model Versioning Checklist")}
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
                  { key: 'sha256', label: pick(isDE, 'SHA-256 Verifikation aktiv', 'SHA-256 verification active') },
                  { key: 'cosign', label: pick(isDE, 'Cosign-Signierung implementiert', 'Cosign signing implemented') },
                  { key: 'immutable', label: pick(isDE, 'Immutable Registry-Tags', 'Immutable registry tags') },
                  { key: 'pinned', label: pick(isDE, 'Model-Pinning (kein :latest)', 'Model pinning (no :latest)') },
                  { key: 'canary', label: pick(isDE, 'Canary-Deployment', 'Canary deployment') },
                  { key: 'rollback', label: pick(isDE, 'Rollback-Prozedur getestet', 'Rollback procedure tested') },
                  { key: 'registry', label: pick(isDE, 'Secure Model Registry', 'Secure model registry') },
                  { key: 'audit', label: pick(isDE, 'Model-Change Audit-Log', 'Model change audit log') }
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
              {pick(isDE, "Model Versioning Security Calculator", "Model Versioning Security Calculator")}
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-4">
              <div className="space-y-4">
                {[
                  { key: 'q1', label: pick(isDE, 'Haben Sie SHA-256 Verifikation für Modelle?', 'Do you have SHA-256 verification for models?') },
                  { key: 'q2', label: pick(isDE, 'Haben Sie Cosign-Signierung implementiert?', 'Do you have Cosign signing implemented?') },
                  { key: 'q3', label: pick(isDE, 'Nutzen Sie immutable Registry-Tags?', 'Do you use immutable registry tags?') },
                  { key: 'q4', label: pick(isDE, 'Haben Sie Canary-Deployment?', 'Do you have canary deployment?') },
                  { key: 'q5', label: pick(isDE, 'Haben Sie getestete Rollback-Prozedur?', 'Do you have tested rollback procedure?') }
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
                      {pick(isDE, 'Ihr Versioning Security Score:', 'Your Versioning Security Score:')} {score}/100
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                      {score >= 80 ? pick(isDE, 'Exzellent! Ihr Versioning ist production-ready.', 'Excellent! Your versioning is production-ready.') :
                       score >= 60 ? pick(isDE, 'Gut, aber es gibt Verbesserungspotenzial.', 'Good, but there is room for improvement.') :
                       pick(isDE, 'Kritisch – Versioning muss dringend verbessert werden.', 'Critical – Versioning urgently needs improvement.')}
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
                      <span className="text-2xl font-bold text-white">MV</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-100">Versioning Score</p>
                      <p className="text-2xl font-bold text-cyan-400">{score !== null ? score : '--'}/100</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(`![Versioning Score ${score}/100](https://clawguru.org/og/versioning-${score}.png)`)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    {pick(isDE, 'Markdown kopieren', 'Copy Markdown')}
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`<img src="https://clawguru.org/og/versioning-${score}.png" alt="Versioning Score ${score}/100">`)}
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
              <a href={`/${locale}/moltbot/ai-supply-chain`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Supply Chain Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Modell-Poisoning verhindern", "Prevent model poisoning")}</div>
              </a>
              <a href={`/${locale}/moltbot/secure-agent-deployment`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Secure Agent Deployment</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Cosign für Container", "Cosign for containers")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-audit-logging`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Audit Logging</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Model-Wechsel auditieren", "Audit model changes")}</div>
              </a>
              <a href={`/${locale}/moltbot/llm-output-validation`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">LLM Output Validation</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Canary-Qualität messen", "Measure canary quality")}</div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
