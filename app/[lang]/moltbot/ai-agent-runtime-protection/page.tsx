import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-runtime-protection"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Runtime Protection: Laufzeitschutz für AI-Agents | ClawGuru", "AI Agent Runtime Protection: Runtime Protection for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Runtime Protection für Moltbot. RASP, eBPF-basierter Laufzeitschutz, Syscall Filtering und Behavioral Monitoring für AI-Agent-Prozesse.", "AI agent runtime protection for Moltbot. RASP, eBPF-based runtime protection, syscall filtering and behavioral monitoring for AI agent processes.")
  return {
    title, description,
    keywords: ["ai agent runtime protection", "rasp", "ebpf", "syscall filtering", "behavioral monitoring", "moltbot security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentRuntimeProtectionPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "AI Agent Runtime Protection", item: `${SITE_URL}/${locale}${PATH}` },
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
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot AI Agent Runtime Protection Guide", "Moltbot AI Agent Runtime Protection Guide"), description: pick(isDE, "AI Agent Runtime Protection", "AI agent runtime protection"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Runtime-Schutz-Guide für eigene KI-Systeme.", "Runtime protection guide for your own AI systems.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Runtime Protection</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "AI Agent Runtime Protection", "AI Agent Runtime Protection")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "AI Agent Runtime Protection für Moltbot. RASP, eBPF-basierter Laufzeitschutz, Syscall Filtering und Behavioral Monitoring für AI-Agent-Prozesse.", "AI agent runtime protection for Moltbot. RASP, eBPF-based runtime protection, syscall filtering and behavioral monitoring for AI agent processes.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Runtime Protection? Einfach erklärt", "What is Runtime Protection? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Runtime Protection ist wie ein Bodyguard für AI-Agent-Prozesse: es überwacht und schützt die Anwendung während sie läuft. RASP (Runtime Application Self-Protection) schützt von innen und blockiert Angriffe in Echtzeit. eBPF-basierter Laufzeitschutz nutzt Linux Kernel für hochperformante Überwachung. Syscall Filtering (seccomp) erlaubt nur bestimmte System Calls. Process Isolation trennt jeden Agent in eigenen Namespace. Behavioral Baseline erfasst normales Verhalten und erkennt Anomalien. Ohne Runtime Protection können Angreifer Prozesse manipulieren, Memory Injection durchführen oder System Calls missbrauchen.", "Runtime protection is like a bodyguard for AI agent processes: it monitors and protects the application while it runs. RASP (Runtime Application Self-Protection) protects from within and blocks attacks in real-time. eBPF-based runtime protection uses Linux kernel for high-performance monitoring. Syscall filtering (seccomp) allows only certain system calls. Process isolation separates each agent in its own namespace. Behavioral baseline captures normal behavior and detects anomalies. Without runtime protection, attackers can manipulate processes, perform memory injection, or abuse system calls.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Kernkonzepten und Implementierung", "Jump to core concepts and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Kernkonzepte", "Core Concepts")}</h2>
          <div className="space-y-4">
            {[
              ["1. RASP (Runtime Application Self-Protection)", pick(isDE, "RASP schützt AI-Agent-Prozesse von innen. Erkennt und blockiert Angriffe in Echtzeit ohne externes Tool.", "RASP protects AI agent processes from within. Detects and blocks attacks in real-time without external tool.")],
              ["2. eBPF-basierter Laufzeitschutz", pick(isDE, "eBPF-Programme im Linux Kernel für hochperformante Verhaltensüberwachung. Falco oder Tetragon für AI-Workloads.", "eBPF programs in Linux kernel for high-performance behavioral monitoring. Falco or Tetragon for AI workloads.")],
              ["3. Syscall Filtering (seccomp)", pick(isDE, "Seccomp-Profile für AI-Agent-Container. Nur erlaubte System Calls werden ausgeführt — alles andere wird geblockt.", "Seccomp profiles for AI agent containers. Only allowed system calls are executed — everything else is blocked.")],
              ["4. Process Isolation", pick(isDE, "Jeder AI-Agent läuft in einem isolierten Prozess. Namespace-Isolation und Cgroup-Limits verhindern Ressourcenmissbrauch.", "Each AI agent runs in an isolated process. Namespace isolation and cgroup limits prevent resource abuse.")],
              ["5. Behavioral Baseline", pick(isDE, "Normale Agent-Aktivität als Baseline erfassen. Abweichungen vom Normalverhalten werden sofort erkannt und gemeldet.", "Capture normal agent activity as baseline. Deviations from normal behavior are immediately detected and reported.")],
            ].map(([t, d]) => (
              <div key={t as string} className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <h3 className="font-bold text-cyan-400 mb-2">{t}</h3>
                <p className="text-sm text-gray-300">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Fortgeschrittene Techniken", "Advanced Techniques")}</h2>
          <div className="space-y-4">
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 hover:border-green-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-green-300 mb-2">{pick(isDE, "Tetragon für AI-Workloads", "Tetragon for AI Workloads")}</h3><p className="text-sm text-green-200">{pick(isDE, "Cilium Tetragon für granulares Kernel-Level Monitoring. Process Execution, Network Connections und File Access überwachen.", "Cilium Tetragon for granular kernel-level monitoring. Monitor process execution, network connections and file access.")}</p></div>
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 hover:border-blue-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-blue-300 mb-2">{pick(isDE, "AppArmor Profile", "AppArmor Profiles")}</h3><p className="text-sm text-blue-200">{pick(isDE, "AppArmor Mandatory Access Control für AI-Agent-Prozesse. Fein-granulare Dateisystem- und Netzwerkrechte.", "AppArmor mandatory access control for AI agent processes. Fine-grained filesystem and network permissions.")}</p></div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "Memory Protection", "Memory Protection")}</h3><p className="text-sm text-yellow-200">{pick(isDE, "ASLR, DEP und Stack Canaries für AI-Agent-Prozesse. Schutz vor Buffer Overflow und Memory Injection.", "ASLR, DEP and stack canaries for AI agent processes. Protection against buffer overflow and memory injection.")}</p></div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 hover:border-red-500/30 transition-all duration-300 shadow-xl"><h3 className="font-semibold text-red-300 mb-2">{pick(isDE, "Auto-Kill bei Anomalien", "Auto-Kill on Anomalies")}</h3><p className="text-sm text-red-200">{pick(isDE, "Automatisches Beenden von AI-Agent-Prozessen bei erkannten Anomalien. Fail-Safe statt Weiterarbeiten unter Angriff.", "Automatic termination of AI agent processes on detected anomalies. Fail-safe instead of continuing under attack.")}</p></div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Implementierungsschritte", "Implementation Steps")}</h2>
          <div className="space-y-6">
            {[
              [1, pick(isDE, "Seccomp-Profile erstellen", "Create seccomp profiles"), pick(isDE, "Minimal-Syscall-Profile für jeden AI-Agent-Typ erstellen. Mit strace/seccomp-bpf das notwendige Set ermitteln.", "Create minimal syscall profiles for each AI agent type. Determine necessary set with strace/seccomp-bpf.")],
              [2, pick(isDE, "Falco oder Tetragon deployen", "Deploy Falco or Tetragon"), pick(isDE, "eBPF-basiertes Runtime Security Tool deployen. Falco-Regeln für AI-spezifische Threats konfigurieren.", "Deploy eBPF-based runtime security tool. Configure Falco rules for AI-specific threats.")],
              [3, pick(isDE, "AppArmor Profile aktivieren", "Enable AppArmor profiles"), pick(isDE, "AppArmor Profile für AI-Agent-Container schreiben und aktivieren. Im Enforce-Modus deployen.", "Write and enable AppArmor profiles for AI agent containers. Deploy in enforce mode.")],
              [4, pick(isDE, "Behavioral Baseline aufbauen", "Build behavioral baseline"), pick(isDE, "Normales Verhalten der AI-Agents in Production aufzeichnen. Grundlage für Anomalie-Detection.", "Record normal behavior of AI agents in production. Foundation for anomaly detection.")],
              [5, pick(isDE, "Alert-Routing konfigurieren", "Configure alert routing"), pick(isDE, "Runtime-Alerts an SIEM und On-Call-Team routen. Kritische Anomalien: sofortige Eskalation.", "Route runtime alerts to SIEM and on-call team. Critical anomalies: immediate escalation.")],
            ].map(([n, t, d]) => (
              <div key={n as number} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</div>
                <div><div className="font-semibold text-gray-100 mb-2">{t}</div><div className="text-sm text-gray-300">{d}</div></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, "Infrastruktur prüfen", "Check infrastructure")}</div></a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, "Expert-validierte Security Runbooks", "Expert-validated security runbooks")}</div></a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div></a>
            <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">AI Agent Security</div><div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10", "OWASP LLM Top 10")}</div></a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Runtime Protection Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Runtime-Schutz-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with runtime protection implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
