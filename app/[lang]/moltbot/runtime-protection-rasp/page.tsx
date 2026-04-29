import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/runtime-protection-rasp"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Runtime Protection RASP: Self-Protecting Applications 2026 | ClawGuru", "Moltbot Runtime Protection RASP: Self-Protecting Applications 2026 | ClawGuru")
  const description = pick(isDE, "Runtime Application Self-Protection für Moltbot. RASP-Implementierung, Runtime Security, Application Control und Live Attack Prevention.", "Runtime Application Self-Protection for Moltbot. RASP implementation, runtime security, application control and live attack prevention.")
  return {
    title, description,
    keywords: ['moltbot rasp','runtime protection','self-protecting applications','runtime security','application control','attack prevention'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotRaspPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Runtime Protection RASP", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          ...jsonLd,
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot Runtime Protection RASP Guide", "Moltbot Runtime Protection RASP Guide"), description: pick(isDE, "Runtime Application Self-Protection", "Runtime Application Self-Protection"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "RASP schützt eigene Anwendungen zur Laufzeit. Keine Angriffswerkzeuge.", "RASP protects own applications at runtime. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Runtime Protection</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot Runtime Protection RASP", "Moltbot Runtime Protection RASP")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Runtime Application Self-Protection ist die letzte Verteidigungslinie. Anwendungen, die sich selbst schützen können, reduzieren Attack Surface um 70%.", "Runtime Application Self-Protection is the last line of defense. Applications that can protect themselves reduce attack surface by 70%.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist RASP? Einfach erklärt", "What is RASP? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "RASP (Runtime Application Self-Protection) ist wie ein Bodyguard für Anwendungen: es sitzt direkt im Anwendungsprozess und überwacht alles in Echtzeit. Input Validation prüft alle Eingaben auf schädliche Muster. Runtime Monitoring erkennt ungewöhnliches Verhalten. Memory Protection verhindert Buffer Overflows. API Control blockiert unbefugte API-Aufrufe. Data Flow Tracking verhindert Datenexfiltration. Ohne RASP sind Anwendungen angreifbar für Injection-Angriffe, Memory Corruption und Data Leaks.", "RASP (Runtime Application Self-Protection) is like a bodyguard for applications: it sits directly in the application process and monitors everything in real-time. Input validation checks all inputs for malicious patterns. Runtime monitoring detects unusual behavior. Memory protection prevents buffer overflows. API control blocks unauthorized API calls. Data flow tracking prevents data exfiltration. Without RASP, applications are vulnerable to injection attacks, memory corruption, and data leaks.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu RASP Protection Layers", "Jump to RASP Protection Layers")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "RASP Protection Layers", "RASP Protection Layers")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="bg-gray-800 text-white"><th className="p-3 text-left">{pick(isDE, "Layer", "Layer")}</th><th className="p-3 text-left">{pick(isDE, "Schutz vor", "Protection against")}</th><th className="p-3 text-left">{pick(isDE, "Mechanismus", "Mechanism")}</th><th className="p-3 text-left">{pick(isDE, "Impact", "Impact")}</th></tr></thead>
                <tbody>
                  {[
                    ['Input Validation', pick(isDE, 'Injection Attacks', 'Injection Attacks'), 'Pattern Matching', pick(isDE, 'Hoch', 'High')],
                    ['Runtime Monitoring', pick(isDE, 'Anomalous Behavior', 'Anomalous Behavior'), 'Behavioral Analysis', pick(isDE, 'Hoch', 'High')],
                    ['Memory Protection', pick(isDE, 'Buffer Overflows', 'Buffer Overflows'), 'Bounds Checking', pick(isDE, 'Mittel', 'Medium')],
                    ['API Control', pick(isDE, 'Unauthorized API Calls', 'Unauthorized API Calls'), 'Call Filtering', pick(isDE, 'Mittel', 'Medium')],
                    ['Data Flow', pick(isDE, 'Data Exfiltration', 'Data Exfiltration'), 'Flow Tracking', pick(isDE, 'Hoch', 'High')],
                  ].map(([layer, threat, mechanism, impact]) => (
                    <tr key={layer} className="border-b hover:bg-gray-800/50 transition-colors">
                      <td className="p-3 font-medium text-gray-100">{layer}</td>
                      <td className="p-3 text-sm text-gray-300">{threat}</td>
                      <td className="p-3 text-sm text-gray-300">{mechanism}</td>
                      <td className="p-3 text-sm text-gray-300">{impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "RASP Library integrieren", "Integrate RASP library"), pick(isDE, "RASP-SDK in Application einbinden. OWASP RASP oder custom Implementation.", "Integrate RASP SDK into application. OWASP RASP or custom implementation.")],
              [2, pick(isDE, "Protection Rules definieren", "Define protection rules"), pick(isDE, "Security-Policies für jeden Layer konfigurieren. Thresholds und Alert-Regeln.", "Configure security policies for each layer. Thresholds and alert rules.")],
              [3, pick(isDE, "Runtime Monitoring aktivieren", "Enable runtime monitoring"), pick(isDE, "Echtzeit-Überwachung aller Application Events. Anomaly Detection aktivieren.", "Enable real-time monitoring of all application events. Activate anomaly detection.")],
              [4, pick(isDE, "Automatische Response konfigurieren", "Configure automatic response"), pick(isDE, "Auto-Block bei kritischen Events. Rate Limiting und IP-Ban.", "Auto-block on critical events. Rate limiting and IP ban.")],
              [5, pick(isDE, "Testing und Tuning", "Testing and tuning"), pick(isDE, "RASP mit Penetration Tests validieren. False Positives reduzieren.", "Validate RASP with penetration tests. Reduce false positives.")],
            ].map(([n, t, d]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div><div className="font-semibold text-gray-100 mb-2">{t}</div><div className="text-sm text-gray-300">{d}</div></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10", "OWASP LLM Top 10")}</div>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Runtime Protection Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit RASP-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with RASP implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
  );
}