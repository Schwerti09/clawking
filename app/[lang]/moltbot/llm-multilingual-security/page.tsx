import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/llm-multilingual-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "LLM Multilingual Security: LLM-Mehrsprachige-Sicherheit | ClawGuru Moltbot", "LLM Multilingual Security: LLM Multilingual Security | ClawGuru Moltbot")
  const description = pick(isDE, "LLM-Mehrsprachige-Sicherheit: Cross-Language Injection Defense, Multilingual Content Filtering, Language-Specific Bias Detection und Multilingual Audit Logging für LLM-Mehrsprachige-Sicherheit.", "LLM multilingual security: cross-language injection defense, multilingual content filtering, language-specific bias detection and multilingual audit logging for LLM multilingual security.")
  return {
    title, description,
    keywords: ["llm multilingual security", "cross-language injection defense", "multilingual content filtering", "language bias detection", "multilingual audit logging", "moltbot multilingual"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "MLS-1", title: "Cross-Language Injection Defense", desc: "Defend against prompt injection attacks delivered in non-English languages. Most filters are English-only.", code: `# Moltbot cross-language injection defense:
cross_language_injection:
  enabled: true

  # Multi-Language Pattern Detection:
  patterns:
    enabled: true
    # Detect: injection patterns in all languages
    # Languages: DE, EN, FR, ES, ZH, JA, AR, RU
    # Patterns: "Ignoriere vorherige Anweisungen"
    # Update: patterns regularly per language

  # Translation-Based Defense:
  translation:
    enabled: true
    # Translate: input to English for analysis
    # Apply: English injection detection
    # Block: if injection detected post-translation
    # Log: cross-language attack attempts

  # Unicode/Encoding Defense:
  encoding:
    enabled: true
    # Normalize: Unicode before processing
    # Detect: homoglyph attacks
    # Detect: zero-width character injection
    # Detect: RTL override attacks` },
  { id: "MLS-2", title: "Multilingual Content Filtering", desc: "Filter harmful content across all supported languages. Do not rely on English-only filters.", code: `# Moltbot multilingual content filtering:
multilingual_filtering:
  enabled: true

  # Per-Language Content Policies:
  policies:
    enabled: true
    # Apply: same content policy across all languages
    # Adapt: culturally sensitive content per locale
    # Update: policies as regulations change
    # Test: per-language filter effectiveness

  # Toxicity Detection:
  toxicity:
    enabled: true
    # Detect: toxic content in all languages
    # Tools: multilingual models (mBERT, XLM-R)
    # Threshold: consistent across languages
    # Alert: on high toxicity scores

  # Hate Speech Detection:
  hate_speech:
    enabled: true
    # Detect: hate speech per language context
    # Account: for cultural differences
    # Block: globally prohibited content
    # Log: all hate speech detections` },
  { id: "MLS-3", title: "Language-Specific Bias Detection", desc: "Detect bias that manifests differently in different languages. English bias tests miss non-English bias.", code: `# Moltbot language-specific bias detection:
language_bias:
  enabled: true

  # Per-Language Bias Testing:
  testing:
    enabled: true
    # Test: bias in each supported language
    # Use: language-native test datasets
    # Languages: native speaker reviewed
    # Report: per-language bias scores

  # Gendered Language:
  gendered:
    enabled: true
    # Handle: grammatically gendered languages (DE, FR, ES)
    # Test: gendered noun bias
    # Detect: grammatical gender amplifying bias
    # Remediate: with neutral alternatives

  # Cultural Bias:
  cultural:
    enabled: true
    # Detect: culturally specific biases
    # Test: with local cultural context
    # Review: by native speakers
    # Update: bias tests per culture` },
  { id: "MLS-4", title: "Multilingual Audit Logging", desc: "Log AI interactions in all languages with consistent audit trail. Enable cross-language forensics.", code: `# Moltbot multilingual audit logging:
multilingual_audit:
  enabled: true

  # Language-Tagged Logs:
  language_tags:
    enabled: true
    # Tag: each log entry with detected language
    # Include: original text + language ID
    # Normalize: to UTF-8 encoding
    # Preserve: original characters

  # Cross-Language Search:
  search:
    enabled: true
    # Enable: log search across languages
    # Translate: queries to search logs
    # Index: content in original language
    # Support: regex + semantic search

  # Regulatory Compliance:
  compliance:
    enabled: true
    # GDPR: store logs in EU
    # Translate: regulatory reports as needed
    # Retain: per jurisdiction requirements
    # Export: in required formats` },
]

const FAQ = [
  { q: "Why is multilingual security a specific concern for LLMs?", a: "Multilingual security is critical because: 1) Most security filters are English-centric — attackers switch to other languages to bypass them. 2) LLMs have unequal capability across languages — security may be weaker in low-resource languages. 3) Grammatically gendered languages create additional bias vectors. 4) Cultural context affects what constitutes harmful content. 5) Cross-language attacks use translation as an obfuscation layer. 6) Regulations vary by jurisdiction — GDPR, EU AI Act, local laws may have language-specific requirements." },
  { q: "What are the most common cross-language injection attacks?", a: "Most common cross-language injection attacks: 1) Direct translation — same injection in another language (German: 'Ignoriere deine vorherigen Anweisungen'). 2) Mixed-language — English base with key phrases in another language. 3) Transliteration — phonetic transcription bypasses keyword filters. 4) Script switching — Arabic, Chinese, or Cyrillic to bypass Latin script filters. 5) Unicode obfuscation — homoglyphs that look like Latin characters. 6) Low-resource language attacks — languages where model safety training is weakest. Defense: translate inputs before applying injection detection." },
  { q: "How do I test multilingual security for my LLM?", a: "Test multilingual security by: 1) Run your full injection test suite in each supported language. 2) Use native speakers to craft natural-sounding attacks (translators miss cultural nuance). 3) Test all bypass techniques: script switching, mixed language, transliteration. 4) Run bias tests with language-native datasets (not translated English datasets). 5) Test content filter consistency across languages — same harmful content should be blocked in all languages. 6) Check for language-specific jailbreaks (some models have weaker safety in specific languages). Budget for quarterly multilingual security testing." },
  { q: "How does grammatical gender in European languages affect LLM bias?", a: "Grammatically gendered languages (German, French, Spanish, etc.) create unique bias challenges: 1) Occupational nouns — in German, 'Arzt' (male doctor) vs 'Ärztin' (female doctor). Models may default to masculine forms. 2) Default gender assumptions — when generating text about professionals, models may default to masculine grammar. 3) Gendered pronouns — models may assign incorrect genders. 4) Translation bias — translating between gendered/non-gendered languages amplifies bias. Mitigation: use gender-neutral forms where available (e.g., German gender star: Ärzt*in), test explicitly with feminine/diverse inputs, use language-native bias benchmarks." },
]

export default function LlmMultilingualSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "LLM Multilingual Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "LLM Multilingual Security Guide", "LLM Multilingual Security Guide"), description: pick(isDE, "LLM Mehrsprachige Sicherheit", "LLM multilingual security"), url: `${SITE_URL}/${locale}${PATH}` },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Multilingual-Security-Guide für eigene LLM-Systeme.", "Multilingual security guide for your own LLM systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · LLM Multilingual Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "LLM Multilingual Security", "LLM Multilingual Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Die meisten Security-Filter sind English-only — Angreifer wechseln einfach die Sprache. Vier Kontrollen: Cross-Language Injection Defense, Multilingual Content Filtering, Language-Specific Bias Detection und Multilingual Audit Logging.", "Most security filters are English-only — attackers simply switch the language. Four controls: cross-language injection defense, multilingual content filtering, language-specific bias detection and multilingual audit logging.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist LLM Multilingual Security? Einfach erklärt", "What is LLM Multilingual Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "LLM Multilingual Security schützt vor sprachspezifischen Angriffen: Cross-Language Injection Defense erkennt Injection-Patterns in allen Sprachen mit Multi-Language Pattern Detection und Translation-Based Defense. Multilingual Content Filtering filtert schädlichen Content über alle Sprachen mit per-language Policies und Multilingual Toxicity Detection. Language-Specific Bias Detection testet Bias pro Sprache mit language-native Datasets und berücksichtigt grammatical Gender. Multilingual Audit Logging taggt Logs mit Language-IDs für cross-language Forensics. Ohne Multilingual Security sind Angreifer in Nicht-Englisch-Sprachen ungeschützt.", "LLM multilingual security protects against language-specific attacks: cross-language injection defense detects injection patterns in all languages with multi-language pattern detection and translation-based defense. Multilingual content filtering filters harmful content across all languages with per-language policies and multilingual toxicity detection. Language-specific bias detection tests bias per language with language-native datasets and accounts for grammatical gender. Multilingual audit logging tags logs with language IDs for cross-language forensics. Without multilingual security, attackers in non-English languages remain unprotected.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Multilingual-Security-Kontrollen", "Jump to multilingual security controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Multilingual-Security-Kontrollen", "4 Multilingual Security Controls")}</h2>
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
            <a href={`/${locale}/moltbot/llm-prompt-injection-detection`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Prompt Injection Detection", "LLM Prompt Injection Detection")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Injection-Detection", "Injection detection")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-bias-fairness-auditing`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Bias Fairness Auditing", "LLM Bias Fairness Auditing")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Bias-Auditing", "Bias auditing")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-output-filtering`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">{pick(isDE, "LLM Output Filtering", "LLM Output Filtering")}</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Output-Filtering", "Output filtering")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Multilingual Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit LLM Multilingual Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with LLM multilingual security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
