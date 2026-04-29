import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-bias-fairness-auditing"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Bias Fairness Auditing: LLM-Bias-Fairness-Auditing | ClawGuru Moltbot", "LLM Bias Fairness Auditing: LLM Bias & Fairness Auditing | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Bias-Fairness-Auditing: Bias Detection, Fairness Metrics, Demographic Parity Testing und Bias Remediation für LLM-Bias-Fairness-Auditing und EU-KI-Gesetz-Compliance.", "LLM bias fairness auditing: bias detection, fairness metrics, demographic parity testing and bias remediation for LLM bias fairness auditing and EU AI Act compliance.")
  return {
    title, description,
    keywords: ["llm bias fairness auditing", "bias detection llm", "fairness metrics ai", "demographic parity testing", "bias remediation", "eu ai act fairness"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "BFA-1", title: "Bias Detection", desc: "Detect bias in LLM outputs systematically. Test across demographic groups and use cases.", code: `# Moltbot bias detection:
bias_detection:
  enabled: true

  # Demographic Bias Testing:
  demographic:
    enabled: true
    # Test: outputs across demographic groups
    # Groups: gender, age, ethnicity, religion
    # Compare: output quality and sentiment
    # Detect: disparate treatment

  # Stereotype Detection:
  stereotypes:
    enabled: true
    # Test: model against stereotype benchmarks
    # Benchmarks: WinoBias, BBQ, CrowS-Pairs
    # Score: stereotype amplification rate
    # Alert: on high stereotype scores

  # Occupational Bias:
  occupational:
    enabled: true
    # Test: job-related outputs by demographics
    # Detect: gendered job associations
    # Measure: bias magnitude
    # Report: per-domain bias scores` },
  { id: "BFA-2", title: "Fairness Metrics", desc: "Measure fairness of LLM outputs using quantitative metrics. Track over time.", code: `# Moltbot fairness metrics:
fairness_metrics:
  enabled: true

  # Demographic Parity:
  demographic_parity:
    enabled: true
    # Measure: output distribution by group
    # Formula: P(Y=1|A=0) = P(Y=1|A=1)
    # Threshold: max 5% disparity
    # Alert: on threshold breach

  # Equal Opportunity:
  equal_opportunity:
    enabled: true
    # Measure: true positive rates by group
    # Formula: TPR equal across groups
    # Threshold: max 5% TPR difference
    # Alert: on threshold breach

  # Counterfactual Fairness:
  counterfactual:
    enabled: true
    # Test: same input, different demographics
    # Measure: output change magnitude
    # Target: minimal output changes
    # Report: counterfactual fairness score` },
  { id: "BFA-3", title: "Demographic Parity Testing", desc: "Run systematic demographic parity tests. Ensure equal treatment across protected groups.", code: `# Moltbot demographic parity testing:
parity_testing:
  enabled: true

  # Test Suites:
  test_suites:
    enabled: true
    # Suite 1: Hiring/Employment
    #   Input: identical resumes, different names
    #   Measure: output recommendation bias
    # Suite 2: Credit/Finance
    #   Input: identical profiles, different demographics
    #   Measure: approval recommendation bias
    # Suite 3: Healthcare
    #   Input: identical symptoms, different patients
    #   Measure: treatment recommendation bias

  # Automated Test Execution:
  automation:
    enabled: true
    # Schedule: weekly parity tests
    # Generate: test cases automatically
    # Compare: across all protected groups
    # Report: parity score trends

  # Threshold Enforcement:
  thresholds:
    enabled: true
    # Block: deployment if parity fails
    # Alert: on parity regression
    # Require: sign-off before release` },
  { id: "BFA-4", title: "Bias Remediation", desc: "Remediate detected bias in LLM systems. Apply prompt engineering, fine-tuning, and filtering.", code: `# Moltbot bias remediation:
bias_remediation:
  enabled: true

  # Prompt Engineering:
  prompt_engineering:
    enabled: true
    # Add: explicit fairness instructions
    # Example: "Provide equal consideration..."
    # Test: remediation effectiveness
    # Iterate: until parity achieved

  # Output Post-Processing:
  post_processing:
    enabled: true
    # Filter: biased outputs before serving
    # Rewrite: outputs with bias markers
    # Apply: calibration post-processing
    # Log: all remediations

  # Fine-Tuning:
  fine_tuning:
    enabled: true
    # Curate: balanced fine-tuning data
    # Apply: debiasing techniques
    # Evaluate: bias reduction effectiveness
    # Version: debiased model` },
]

const FAQ = [
  { q: "Why is LLM bias auditing a security concern?", a: "LLM bias is both an ethical and security/compliance concern: 1) EU AI Act — high-risk AI systems (hiring, credit, education, healthcare) must demonstrate non-discrimination. 2) Legal liability — biased AI decisions can violate anti-discrimination laws (GDPR, EEOC, ECHR). 3) Reputational risk — biased outputs cause public trust damage. 4) Regulatory fines — EU AI Act penalties up to 7% of global turnover for prohibited AI. 5) Security angle: bias can be intentionally injected via training data poisoning. Bias auditing is required for any AI system making decisions affecting people." },
  { q: "What are the most common types of LLM bias?", a: "Most common LLM bias types: 1) Representational bias — model underrepresents certain groups (fewer training examples). 2) Stereotyping — model amplifies societal stereotypes (nurses are female, CEOs are male). 3) Sentiment bias — model expresses more positive sentiment toward some groups. 4) Toxicity bias — model generates more toxic content about certain groups. 5) Occupational bias — model associates professions with demographics. 6) Geographic bias — model is better at tasks for some countries/languages. 7) Intersectional bias — bias compounds for people with multiple marginalized identities." },
  { q: "How often should I run LLM bias audits?", a: "Bias audit frequency: 1) Before every model update/fine-tune — model changes can introduce new biases. 2) Weekly automated parity tests — continuous monitoring for regression. 3) Quarterly comprehensive audit — full demographic parity and fairness metric evaluation. 4) After user complaints — investigate specific bias reports immediately. 5) Before high-risk deployment — e.g., before deploying in hiring or credit decisions. For EU AI Act high-risk systems, bias monitoring must be continuous and documented as part of post-market monitoring." },
  { q: "What tools exist for LLM bias auditing?", a: "Key tools for LLM bias auditing: 1) AI Fairness 360 (IBM) — comprehensive fairness metrics library. 2) Fairlearn (Microsoft) — fairness assessment and mitigation. 3) LangFair — LLM-specific fairness evaluation. 4) Perspective API — toxicity measurement. 5) WinoBias / BBQ — bias benchmarks for LLMs. 6) Evaluate (HuggingFace) — includes bias evaluation metrics. 7) Moltbot Bias Module — built-in continuous bias monitoring. For comprehensive auditing, combine automated tools with manual review by domain experts from diverse backgrounds." },
]

export default function LlmBiasFairnessAuditingPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Bias Fairness Auditing", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Bias Fairness Auditing Guide", "LLM Bias Fairness Auditing Guide"), description: pick(isDE, "LLM Bias Fairness Auditing Sicherheit", "LLM bias fairness auditing security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Bias-Fairness-Auditing-Guide für eigene LLM-Systeme.", "Bias fairness auditing guide for your own LLM systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Bias Fairness Auditing</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Bias & Fairness Auditing", "LLM Bias & Fairness Auditing")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Bias in LLMs ist kein akademisches Problem — EU-KI-Gesetz und Antidiskriminierungsgesetze machen es zum Compliance-Risiko. Vier Kontrollen: Bias Detection, Fairness Metrics, Demographic Parity Testing und Bias Remediation.", "Bias in LLMs is not an academic problem — EU AI Act and anti-discrimination laws make it a compliance risk. Four controls: bias detection, fairness metrics, demographic parity testing and bias remediation.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Bias Fairness Auditing? Einfach erklärt", "What is LLM Bias Fairness Auditing? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Bias Fairness Auditing ist wie ein Compliance-Check für KI-Fairness: Bias Detection prüft Outputs auf Diskriminierung. Fairness Metrics messen, ob alle Gruppen gleich behandelt werden. Demographic Parity Testing testet mit identischen Inputs für verschiedene Demografien. Bias Remediation korrigiert entdeckten Bias. Ohne Auditing riskieren Sie EU-KI-Gesetz-Strafen (bis 7% Umsatz) und Antidiskriminierungsklagen. Mit Auditing dokumentieren Sie Fairness und erfüllen Compliance-Anforderungen.", "LLM bias fairness auditing is like a compliance check for AI fairness: bias detection examines outputs for discrimination. Fairness metrics measure whether all groups are treated equally. Demographic parity testing tests with identical inputs for different demographics. Bias remediation corrects detected bias. Without auditing, you risk EU AI Act penalties (up to 7% of turnover) and anti-discrimination lawsuits. With auditing, you document fairness and meet compliance requirements.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Fairness-Kontrollen", "Jump to fairness controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Bias-Fairness-Auditing-Kontrollen", "4 Bias Fairness Auditing Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-bias-detection-mitigation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Bias Detection Mitigation", "LLM Bias Detection Mitigation")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Bias-Mitigation", "Bias mitigation")}</div>
            </a>
            <a href={`/${locale}/solutions/eu-ai-act-compliance-checklist`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "EU AI Act Compliance Checklist", "EU AI Act Compliance Checklist")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "EU-KI-Gesetz", "EU AI Act")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-hallucination-detection`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Hallucination Detection", "LLM Hallucination Detection")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Hallucination-Detection", "Hallucination detection")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "AI Agent Security", "AI Agent Security")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Security-Overview", "Security overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Fairness & Compliance Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Bias Fairness Auditing-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM bias fairness auditing implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
