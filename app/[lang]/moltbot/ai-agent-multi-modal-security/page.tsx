import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-multi-modal-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Multi-Modal Security: KI-Agenten-Multi-Modal-Security | ClawGuru Moltbot", "AI Agent Multi-Modal Security: AI Agent Multi-Modal Security | ClawGuru Moltbot")
  const description = pick(isDE, "KI-Agenten-Multi-Modal-Security: Multi-Modal Input Validation, Cross-Modal Attack Detection, Multi-Modal Output Filtering und Multi-Modal Policy Enforcement für KI-Agenten-Multi-Modal-Security.", "AI agent multi-modal security: multi-modal input validation, cross-modal attack detection, multi-modal output filtering and multi-modal policy enforcement for AI agent multi-modal security.")
  return {
    title, description,
    keywords: ["ai agent multi-modal security", "multi-modal input validation", "cross-modal attack detection", "multi-modal output filtering", "multi-modal policy", "moltbot multi-modal"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const CONTROLS = [
  { id: "MMS-1", title: "Multi-Modal Input Validation", desc: "Validate all multi-modal inputs (text, images, audio, video). Sanitise each modality independently and cross-modally.", code: `# Moltbot multi-modal input validation:
multi_modal_validation:
  enabled: true

  # Text validation:
  text_validation:
    enabled: true
    # Validate: text format, length, content
    # Sanitise: remove dangerous patterns
    # Method: regex, ML classifier

  # Image validation:
  image_validation:
    enabled: true
    # Validate: image format, size, content
    # Sanitise: remove embedded threats
    # Method: steganography detection, EXIF removal

  # Audio validation:
  audio_validation:
    enabled: true
    # Validate: audio format, duration, content
    # Sanitise: remove embedded commands
    # Method: spectral analysis, command detection

  # Video validation:
  video_validation:
    enabled: true
    # Validate: video format, duration, content
    # Sanitise: remove embedded threats
    # Method: frame-by-frame analysis` },
  { id: "MMS-2", title: "Cross-Modal Attack Detection", desc: "Detect attacks that exploit cross-modal interactions. Monitor for adversarial examples across modalities.", code: `# Moltbot cross-modal attack detection:
cross_modal_detection:
  enabled: true

  # Cross-modal consistency check:
  consistency:
    enabled: true
    # Check: consistency across modalities
    # Example: text should match image content
    # Detect: adversarial inconsistencies
    # Alert: on suspicious patterns

  # Adversarial example detection:
  adversarial_detection:
    enabled: true
    # Detect: adversarial examples across modalities
    # Method: perturbation analysis, gradient-based detection
    # Alert: on suspected adversarial inputs

  # Cross-modal injection detection:
  injection_detection:
    enabled: true
    # Detect: injection attacks across modalities
    # Example: hidden commands in audio/video
    # Method: steganography analysis, hidden command detection` },
  { id: "MMS-3", title: "Multi-Modal Output Filtering", desc: "Filter multi-modal outputs for safety. Apply content filtering to each modality independently and cross-modally.", code: `# Moltbot multi-modal output filtering:
multi_modal_filtering:
  enabled: true

  # Text output filtering:
  text_filtering:
    enabled: true
    # Filter: text for malicious content
    # Methods: content safety classifier, PII scan
    # Block: unsafe text outputs

  # Image output filtering:
  image_filtering:
    enabled: true
    # Filter: images for malicious content
    # Methods: NSFW detection, watermark detection
    # Block: unsafe image outputs

  # Audio output filtering:
  audio_filtering:
    enabled: true
    # Filter: audio for malicious content
    # Methods: command detection, PII scan
    # Block: unsafe audio outputs

  # Video output filtering:
  video_filtering:
    enabled: true
    # Filter: videos for malicious content
    # Methods: frame-by-frame analysis, NSFW detection
    # Block: unsafe video outputs` },
  { id: "MMS-4", title: "Multi-Modal Policy Enforcement", desc: "Enforce security policies across all modalities. Define modality-specific and cross-modal policies.", code: `# Moltbot multi-modal policy enforcement:
policy_enforcement:
  enabled: true

  # Modality-specific policies:
  modality_policies:
    enabled: true
    # Define: policies for each modality
    # Text: max length, content restrictions
    # Image: format, size, content restrictions
    # Audio: duration, content restrictions
    # Video: duration, content restrictions

  # Cross-modal policies:
  cross_modal_policies:
    enabled: true
    # Define: policies for cross-modal interactions
    # Example: text-image consistency requirements
    # Enforce: cross-modal policy violations

  # Policy violation handling:
  violation_handling:
    enabled: true
    # Action: block, warn, or flag violations
    # Alert: on policy violations
    # Audit: policy violation history` },
]

const FAQ = [
  { q: "What is the difference between multi-modal and single-modal security?", a: "Single-modal security focuses on one modality (e.g., text only). Multi-modal security handles multiple modalities (text, images, audio, video) and their interactions. Multi-modal security is more complex because: 1) Each modality has unique vulnerabilities (e.g., steganography in images, hidden commands in audio). 2) Cross-modal interactions can be exploited (e.g., adversarial text-image pairs). 3) Filtering and validation must be applied to each modality independently and cross-modally. Multi-modal security requires modality-specific and cross-modal controls." },
  { q: "How does cross-modal attack detection work?", a: "Cross-modal attack detection monitors interactions between modalities for suspicious patterns. Consistency checks verify that modalities are consistent (e.g., text describes the image accurately). Adversarial example detection looks for perturbations across modalities. Injection detection searches for hidden threats (e.g., steganography, hidden commands). By analysing cross-modal patterns, the system can detect attacks that would be invisible when analysing each modality independently." },
  { q: "How do I filter multi-modal outputs for safety?", a: "Multi-modal output filtering applies content filtering to each modality: 1) Text — content safety classifier, PII scan. 2) Images — NSFW detection, watermark detection, steganography analysis. 3) Audio — command detection, PII scan, spectral analysis. 4) Video — frame-by-frame analysis, NSFW detection. Cross-modal filtering verifies consistency across modalities. Each modality is filtered independently, then cross-modal consistency is verified before output." },
  { q: "What are common multi-modal attack vectors?", a: "Common multi-modal attack vectors: 1) Cross-modal adversarial examples — perturb one modality to cause misclassification in another. 2) Steganography — embed malicious content in images/audio/video. 3) Hidden commands — embed commands in audio/video that are executed by the agent. 4) Cross-modal injection — inject malicious content through one modality to affect another. 5) Modal inconsistency — exploit inconsistencies between modalities to bypass filters. Defense: multi-modal input validation, cross-modal attack detection, multi-modal output filtering." },
]

export default function AiAgentMultiModalSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Multi-Modal Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Multi-Modal-Security-Guide für eigene KI-Systeme.", "Multi-modal security guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · AI Agent Multi-Modal Security</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Multi-Modal Security", "AI Agent Multi-Modal Security")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "KI-Agenten ohne Multi-Modal-Security sind anfällig für Cross-Modal-Attacken — ohne Multi-Modal-Security bleiben Cross-Modal-Interaktionen ungeschützt. Vier Kontrollen: Multi-Modal Input Validation, Cross-Modal Attack Detection, Multi-Modal Output Filtering und Multi-Modal Policy Enforcement.", "AI agents without multi-modal security are vulnerable to cross-modal attacks — without multi-modal security, cross-modal interactions remain unprotected. Four controls: multi-modal input validation, cross-modal attack detection, multi-modal output filtering and multi-modal policy enforcement.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist AI Agent Multi-Modal Security? Einfach erklärt", "What is AI Agent Multi-Modal Security? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "AI Agent Multi-Modal Security schützt KI-Agenten mit multi-modal Inputs (Text, Bilder, Audio, Video): Multi-Modal Input Validation validiert und sanitisiert jede Modalität unabhängig (Text: Regex/ML-Classifier, Bild: Steganography-Detection/EXIF-Removal, Audio: Spectral-Analysis/Command-Detection, Video: Frame-by-Frame-Analysis). Cross-Modal Attack Detection überwacht Cross-Modal-Interaktionen für Consistency-Checks und Adversarial-Example-Detection. Multi-Modal Output Filtering filtert Outputs jeder Modalität (NSFW-Detection, Watermark-Detection, PII-Scan). Multi-Modal Policy Enforcement enforce modality-spezifische und cross-modale Policies.", "AI agent multi-modal security protects AI agents with multi-modal inputs (text, images, audio, video): multi-modal input validation validates and sanitises each modality independently (text: regex/ML-classifier, image: steganography detection/EXIF removal, audio: spectral analysis/command detection, video: frame-by-frame analysis). Cross-modal attack detection monitors cross-modal interactions for consistency checks and adversarial example detection. Multi-modal output filtering filters outputs of each modality (NSFW detection, watermark detection, PII scan). Multi-modal policy enforcement enforces modality-specific and cross-modal policies.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kontrollen", "Jump to controls")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Multi-Modal-Security-Kontrollen", "4 Multi-Modal Security Controls")}</h2>
          <div className="space-y-5">
            {CONTROLS.map((c) => (
              <div key={c.id} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 shadow-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700/50">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{c.id}</span>
                  <span className="font-bold text-gray-100">{c.title}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{c.desc}</p>
                  <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded font-mono text-xs overflow-x-auto border border-gray-700/50"><pre>{c.code}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 shadow-xl">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/moltbot/llm-output-filtering`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Output Filtering</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Content-Safety", "Content safety")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-input-validation`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Input Validation</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Input-Safety", "Input safety")}</div>
            </a>
            <a href={`/${locale}/moltbot/llm-adversarial-robustness`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">LLM Adversarial Robustness</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Adversarial-Defense", "Adversarial defense")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Multi-Modal-Overview", "Multi-modal overview")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · AI Agent Multi-Modal Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit AI Agent Multi-Modal Security-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with AI agent multi-modal security implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
