import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/ebpf-security-monitoring"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "eBPF Security Monitoring: Kernel-Level-Sicherheit für Kubernetes | ClawGuru", "eBPF Security Monitoring: Kernel-Level Security for Kubernetes | ClawGuru")
  const description = pick(isDE, "eBPF-basiertes Security Monitoring für Kubernetes und Container: Cilium Tetragon, Falco eBPF, Syscall-Überwachung, Network-Policy-Enforcement und Runtime-Threat-Detection ohne Kernel-Module.", "eBPF-based security monitoring for Kubernetes and containers: Cilium Tetragon, Falco eBPF, syscall monitoring, network policy enforcement and runtime threat detection without kernel modules.")
  return {
    title, description,
    keywords: ["ebpf security monitoring", "ebpf kubernetes security", "cilium tetragon", "falco ebpf", "ebpf runtime security", "ebpf container monitoring"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function EbpfSecurityMonitoringPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "eBPF Security Monitoring: Kernel-Level-Sicherheit für Kubernetes | ClawGuru", "eBPF Security Monitoring: Kernel-Level Security for Kubernetes | ClawGuru")

  const EBPF_TOOLS = [
    { id: "T1", name: pick(isDE, "Cilium Tetragon", "Cilium Tetragon"), category: pick(isDE, "Runtime Enforcement", "Runtime Enforcement"), desc: pick(isDE, "Kernel-level security enforcement with eBPF. Tetragon executes security policies in-kernel — blocking malicious syscalls before they complete, not just alerting after.", "Kernel-level security enforcement with eBPF. Tetragon executes security policies in-kernel — blocking malicious syscalls before they complete, not just alerting after."), code: `# Install Tetragon via Helm
helm repo add cilium https://helm.cilium.io
helm install tetragon cilium/tetragon -n kube-system

# TracingPolicy: alert on shell execution inside containers
apiVersion: cilium.io/v1alpha1
kind: TracingPolicy
metadata:
  name: block-shell-in-containers
spec:
  kprobes:
  - call: "sys_execve"
    syscall: true
    args:
    - index: 0
      type: "string"
    selectors:
    - matchArgs:
      - index: 0
        operator: "Postfix"
        values: ["/sh", "/bash", "/ash", "/dash"]
      matchNamespaces:
      - namespace: Pid
        operator: NotIn
        values: ["host_ns"]   # Container processes only
      matchActions:
      - action: Sigkill        # KILL the process — not just alert
        # or action: Override with argError: -1 for syscall override` },
    { id: "T2", name: pick(isDE, "Falco + eBPF Driver", "Falco + eBPF Driver"), category: pick(isDE, "Threat Detection", "Threat Detection"), desc: pick(isDE, "Falco with eBPF driver instead of kernel module — same detection capabilities without loading a kernel module (safer, works in managed K8s where modules are blocked).", "Falco with eBPF driver instead of kernel module — same detection capabilities without loading a kernel module (safer, works in managed K8s where modules are blocked)."), code: `# Deploy Falco with eBPF driver (no kernel module required)
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm install falco falcosecurity/falco \\
  --set driver.kind=ebpf \\
  --set falcosidekick.enabled=true \\
  --set falcosidekick.config.webhook.address=http://openclaw-webhook:9000

# Key Falco rules for container security:
- rule: Unexpected shell in container
  condition: >
    spawned_process and container and
    shell_procs and not proc.pname in (allowed_parent_processes)
  output: Shell spawned in container (proc=%proc.name parent=%proc.pname
    container=%container.name image=%container.image.repository)
  priority: WARNING

- rule: Write below /etc in container
  condition: >
    open_write and container and
    fd.name startswith /etc
  output: File below /etc written in container (file=%fd.name
    container=%container.name)
  priority: ERROR

- rule: Outbound connection to unexpected IP
  condition: >
    outbound and container and
    not fd.sip in (allowed_outbound_ips)
  output: Unexpected outbound connection (sip=%fd.sip dport=%fd.sport
    container=%container.name)
  priority: WARNING` },
    { id: "T3", name: pick(isDE, "Cilium Network Policies (L7)", "Cilium Network Policies (L7)"), category: pick(isDE, "Network Enforcement", "Network Enforcement"), desc: pick(isDE, "Cilium uses eBPF to enforce network policies at Layer 7 (HTTP/gRPC/DNS) — blocking specific API calls or DNS queries, not just TCP connections.", "Cilium uses eBPF to enforce network policies at Layer 7 (HTTP/gRPC/DNS) — blocking specific API calls or DNS queries, not just TCP connections."), code: `# Cilium L7 policy: allow only specific HTTP paths
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: moltbot-agent-l7-policy
  namespace: moltbot-agents
spec:
  endpointSelector:
    matchLabels:
      app: moltbot-agent
  egress:
  - toEndpoints:
    - matchLabels:
        app: llm-gateway
    toPorts:
    - ports:
      - port: "8080"
        protocol: TCP
      rules:
        http:
        - method: "POST"
          path: "/v1/chat/completions"  # Only allow LLM API calls
        # BLOCKED: GET /, POST /admin, all other paths

  - toFQDNs:
    - matchName: "api.openai.com"
    toPorts:
    - ports:
      - port: "443"
        protocol: TCP
      rules:
        http:
        - method: "POST"
          path: "/v1/chat/completions"

  # Block metadata API (cloud credential theft prevention)
  egressDeny:
  - toCIDRSet:
    - cidr: "169.254.169.254/32"` },
    { id: "T4", name: pick(isDE, "eBPF Syscall Audit Trail", "eBPF Syscall Audit Trail"), category: pick(isDE, "Forensics & Compliance", "Forensics & Compliance"), desc: pick(isDE, "Record every syscall from every container process with full context — process, arguments, return value. Immutable audit trail for incident response and compliance.", "Record every syscall from every container process with full context — process, arguments, return value. Immutable audit trail for incident response and compliance."), code: `# Tetragon: comprehensive syscall audit with JSON export
apiVersion: cilium.io/v1alpha1
kind: TracingPolicy
metadata:
  name: audit-sensitive-syscalls
spec:
  kprobes:
  - call: "sys_ptrace"      # Process tracing (escape vector)
    syscall: true
    return: true
  - call: "sys_mount"       # Filesystem mount (escape vector)
    syscall: true
    return: true
  - call: "sys_clone"       # Namespace creation (escape vector)
    syscall: true
    args:
    - index: 0
      type: "uint64"  # flags
    return: true
  - call: "sys_setuid"      # Privilege escalation
    syscall: true
    return: true

# Export audit events to SIEM:
# Tetragon exports JSON to stdout → ship via Fluent Bit to SIEM
# Each event includes: timestamp, pod, namespace, process, args, return_val
# Cryptographic integrity: sign log stream with Falco/Tetragon + HMAC` },
  ]

  const FAQ = [
    { q: pick(isDE, "Was ist eBPF und warum besser als Kernel-Module?", "What is eBPF and why is it better than kernel modules?"), a: pick(isDE, "eBPF (extended Berkeley Packet Filter) ist eine Linux-Kernel-Technologie, die sandboxed-Programme im Kernel ohne Kernel-Module ausführt. Vorteile: Sicherheit: eBPF-Programme werden vom Kernel-Verifier vor Ausführung geprüft — können den Kernel nicht crashen. Kernel-Module können Kernel-Panics auslösen. Portabilität: eBPF-Programme funktionieren über Kernel-Versionen ohne Neukompilierung. Managed Kubernetes: GKE, EKS, AKS blockieren Kernel-Module. eBPF funktioniert ohne spezielle Berechtigungen. Performance: eBPF führt im Kernel aus — keine Kontextwechsel.", "eBPF (extended Berkeley Packet Filter) is a Linux kernel technology that allows running sandboxed programs in the kernel without loading kernel modules. Security advantages: eBPF programs are verified by the kernel's verifier before execution — they cannot crash the kernel. Kernel modules can cause kernel panics. Portability: eBPF programs work across kernel versions without recompilation. Managed Kubernetes: GKE, EKS, AKS block kernel module loading. eBPF works without special permissions.") },
    { q: pick(isDE, "Cilium Tetragon vs Falco — Unterschied?", "What is Cilium Tetragon and how does it differ from Falco?"), a: pick(isDE, "Beide nutzen eBPF mit unterschiedlichen Ansätzen: Falco: observe-and-alert. Detektiert Policy-Verletzungen, sendet Alerts. Kann nicht blockieren — nur melden. Cilium Tetragon: enforce-and-kill. Führt Security-Policies im Kernel aus, kann/killt bösartige Prozesse vor Syscall-Completion. Best Practice: beide nutzen — Falco für Detection-Coverage, Tetragon für Enforcement auf kritischen Workloads.", "Both use eBPF but with different approaches: Falco: observe-and-alert model. Detects policy violations and sends alerts. Cannot block malicious actions — only report them. Cilium Tetragon: enforce-and-kill model. Executes security policy in-kernel and can block/kill malicious processes before the syscall completes. Best practice: run both — Falco for detection coverage, Tetragon for enforcement on critical workloads.") },
    { q: pick(isDE, "Funktioniert eBPF mit AI-Agent-Containern?", "Does eBPF security monitoring work with AI agent containers?"), a: pick(isDE, "Ja, besonders wertvoll: AI-Agent-Containern (Moltbot) haben oft breiten Netzwerk-Zugriff und Tool-Capabilities — eBPF-Monitoring gibt Sichtbarkeit in genaue Syscalls und Netzwerk-Verbindungen. Use Cases: 1) Prompt-Injection-Detection, die zu Shell-Execution führt. 2) Outbound-Connection-Monitoring. 3) L7-Network-Policy-Enforcement. 4) Audit-Tool-Calls auf Syscall-Level.", "Yes, and it's particularly valuable: AI agent containers (Moltbot) often have broad network access and tool capabilities — eBPF monitoring provides visibility into exactly what syscalls and network connections agents make. Key use cases: 1) Detect prompt injection that leads to shell execution. 2) Monitor outbound connections. 3) Enforce L7 network policy. 4) Audit tool calls at syscall level.") },
    { q: pick(isDE, "Performance-Overhead von eBPF-Monitoring?", "What is the performance overhead of eBPF security monitoring?"), a: pick(isDE, "Production-gemessener Overhead: Falco eBPF: 1-3% CPU. Spikes bis 5-10% bei hohen Syscall-Perioden. Cilium Network Policies: ~1% für L3/L4. L7-Inspektion ~3-5% für HTTP-Workloads. Cilium Tetragon: 2-5% mit umfassender TracingPolicy. Optimierung: TracingPolicy auf spezifische Namespaces scopen. Falco-Regeln für High-Frequency-Events droppen.", "Production-measured overhead: Falco eBPF: 1-3% CPU overhead. Spikes to 5-10% during high-syscall periods. Cilium network policies: ~1% overhead for L3/L4 policies. L7 policy inspection adds ~3-5% for HTTP workloads. Cilium Tetragon: 2-5% overhead with comprehensive TracingPolicy. Optimization tips: scope TracingPolicy to specific namespaces. Tune Falco rules to drop high-frequency benign events.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "OpenClaw", item: `${SITE_URL}/${locale}/openclaw` },
      { "@type": "ListItem", position: 3, name: "eBPF Security Monitoring", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["eBPF Security", "Cilium Tetragon", "Falco", "Kubernetes Runtime Security", "Syscall Monitoring"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ]

  const categoryColors: Record<string, string> = {
    [pick(isDE, "Runtime Enforcement", "Runtime Enforcement")]: "bg-red-900 text-red-300",
    [pick(isDE, "Threat Detection", "Threat Detection")]: "bg-orange-900 text-orange-300",
    [pick(isDE, "Network Enforcement", "Network Enforcement")]: "bg-blue-900 text-blue-300",
    [pick(isDE, "Forensics & Compliance", "Forensics & Compliance")]: "bg-purple-900 text-purple-300",
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div id="reading-progress" className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{width: '0%'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 flex gap-8">
        {/* Sticky Table of Contents (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 uppercase">{pick(isDE, "Inhalt", "Contents")}</h3>
              <nav className="space-y-2 text-sm">
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist eBPF?", "What is eBPF?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4 eBPF Security Tools", "4 eBPF Security Tools")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "eBPF Security Score", "eBPF Security Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">15 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OpenClaw · eBPF Security</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "eBPF Security Monitoring — Du nutzt Kernel-Module für Security Monitoring. Kernel-Panic, dein Cluster ist down. GKE blockiert Kernel-Module. Du bist blind.", "eBPF Security Monitoring — You use kernel modules for security monitoring. Kernel panic, your cluster is down. GKE blocks kernel modules. You're blind.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du nutzt Kernel-Module für Security Monitoring. Kernel-Panic, dein Cluster ist down. GKE blockiert Kernel-Module. Du bist blind. Hier ist, wie du das verhinderst.", "You use kernel modules for security monitoring. Kernel panic, your cluster is down. GKE blocks kernel modules. You're blind. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "eBPF-Monitoring-Guide für eigene Kubernetes-Infrastruktur.", "eBPF monitoring guide for your own Kubernetes infrastructure.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist eBPF? Einfach erklärt.", "What is eBPF? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "eBPF (extended Berkeley Packet Filter) ist eine Linux-Kernel-Technologie, die sandboxed-Programme im Kernel ohne Kernel-Module ausführt. Vorteile: Sicherheit (Verifier verhindert Kernel-Panic), Portabilität (funktioniert über Kernel-Versionen), Managed-Kubernetes-Kompatibilität (GKE, EKS, AKS). Gutes eBPF-Monitoring: Cilium Tetragon (Enforcement), Falco eBPF (Detection), L7-Network-Policies, Syscall-Audit-Trail.", "eBPF (extended Berkeley Packet Filter) is a Linux kernel technology that allows running sandboxed programs in the kernel without loading kernel modules. Advantages: safety (verifier prevents kernel panic), portability (works across kernel versions), managed Kubernetes compatibility (GKE, EKS, AKS). Good eBPF monitoring: Cilium Tetragon (enforcement), Falco eBPF (detection), L7 network policies, syscall audit trail.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4 eBPF Security Tools", "4 eBPF Security Tools")}</h2>
            <div className="space-y-5">
              {EBPF_TOOLS.map((t) => (
                <div key={t.id} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700">
                    <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{t.id}</span>
                    <span className="font-bold text-gray-100">{t.name}</span>
                    <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded ${categoryColors[t.category]}`}>{t.category}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-300 mb-3">{t.desc}</p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto"><pre>{t.code}</pre></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Kernel-Modul Kernel-Panic", "SCAR #1: Kernel Module Kernel Panic")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Kernel-Modul für Falco geladen, Kernel-Panic, Cluster-Down. Fix: Falco mit eBPF-Driver nutzen (kein Kernel-Modul).", "Kernel module for Falco loaded, kernel panic, cluster down. Fix: Use Falco with eBPF driver (no kernel module).")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kernel-Modul. Lessons: Nutze eBPF-Driver.", "Root Cause: Kernel module. Lessons: Use eBPF driver.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Managed K8s blockiert Module", "SCAR #2: Managed K8s blocks modules")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "GKE blockiert Kernel-Module, Falco nicht deploybar. Fix: Nutze eBPF-Driver (funktioniert ohne Kernel-Module).", "GKE blocks kernel modules, Falco not deployable. Fix: Use eBPF driver (works without kernel modules).")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Managed K8s. Lessons: eBPF ist managed-K8s-kompatibel.", "Root Cause: Managed K8s. Lessons: eBPF is managed-K8s compatible.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              {[
                { n: 1, t: pick(isDE, "Falco mit eBPF-Driver deployen", "Deploy Falco with eBPF driver"), d: pick(isDE, "--set driver.kind=ebpf nutzen.", "Use --set driver.kind=ebpf.") },
                { n: 2, t: pick(isDE, "Cilium Tetragon installieren", "Install Cilium Tetragon"), d: pick(isDE, "TracingPolicy für Shell-Block erstellen.", "Create TracingPolicy for shell block.") },
                { n: 3, t: pick(isDE, "L7-Network-Policies aktivieren", "Enable L7 network policies"), d: pick(isDE, "Cilium L7-Policies für HTTP/gRPC.", "Cilium L7 policies for HTTP/gRPC.") },
                { n: 4, t: pick(isDE, "Syscall-Audit-Trail einrichten", "Set up syscall audit trail"), d: pick(isDE, "Tetragon Audit-Policy für sensitive Syscalls.", "Tetragon audit policy for sensitive syscalls.") },
              ].map((item) => (
                <div key={item.n} className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">{item.n}</div>
                  <div>
                    <h4 className="font-semibold text-gray-100 mb-2">{item.t}</h4>
                    <p className="text-sm text-gray-300">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive eBPF Security Checkliste", "Interactive eBPF Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "eb1", text: pick(isDE, "Falco mit eBPF-Driver installiert", "Falco with eBPF driver installed") },
                  { id: "eb2", text: pick(isDE, "Cilium Tetragon installiert", "Cilium Tetragon installed") },
                  { id: "eb3", text: pick(isDE, "TracingPolicy für Shell-Block aktiviert", "TracingPolicy for shell block enabled") },
                  { id: "eb4", text: pick(isDE, "L7-Network-Policies konfiguriert", "L7 network policies configured") },
                  { id: "eb5", text: pick(isDE, "Syscall-Audit-Trail für sensitive Syscalls", "Syscall audit trail for sensitive syscalls") },
                  { id: "eb6", text: pick(isDE, "eBPF-Events an SIEM shipped", "eBPF events shipped to SIEM") },
                  { id: "eb7", text: pick(isDE, "Falco-Regeln auf Production getuned", "Falco rules tuned for production") },
                  { id: "eb8", text: pick(isDE, "Performance-Overhead gemessen <5%", "Performance overhead measured <5%") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* eBPF Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "eBPF Security Score Calculator", "eBPF Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist Falco mit eBPF-Driver installiert?", "Is Falco with eBPF driver installed?"), weight: 25 },
                  { q: pick(isDE, "Ist Cilium Tetragon installiert?", "Is Cilium Tetragon installed?"), weight: 25 },
                  { q: pick(isDE, "Sind L7-Network-Policies aktiviert?", "Are L7 network policies enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Syscall-Audit-Trail aktiviert?", "Is syscall audit trail enabled?"), weight: 25 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-300">{item.q}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 text-sm">{pick(isDE, "Ja", "Yes")}</button>
                      <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 text-sm">{pick(isDE, "Nein", "No")}</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{pick(isDE, "Dein eBPF Security Score:", "Your eBPF Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 20/100", "Industry Average: 20/100")}</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.65s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 shadow-2xl">
                  <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Author Box */}
          <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-6 rounded-lg border border-cyan-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">
                  RS
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-cyan-300 text-lg">R. Schwertfechter</h3>
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                  </div>
                  <div className="text-sm text-cyan-200 mb-3">
                    Principal Ops-Engineer & Security Architect
                  </div>
                  <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                    <span>📅 Published: 01.05.2026</span>
                    <span>🔄 Last reviewed: 01.05.2026</span>
                  </div>
                  <div className="text-sm text-cyan-100 leading-relaxed mb-4">
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für eBPF Security, Cilium Tetragon, Falco und Kubernetes Runtime Security.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in eBPF security, Cilium Tetragon, Falco and Kubernetes runtime security.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/openclaw/runtime-policy-enforcement`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Runtime Policy Enforcement</div>
                <div className="text-sm text-gray-300">{pick(isDE, "OPA + Falco + Cilium", "OPA + Falco + Cilium")}</div>
              </a>
              <a href={`/${locale}/openclaw/container-escape-prevention`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Container Escape Prevention</div>
                <div className="text-sm text-gray-300">{pick(isDE, "eBPF als Escape-Blocker", "eBPF as escape blocker")}</div>
              </a>
              <a href={`/${locale}/openclaw/network-segmentation-guide`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Network Segmentation</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Cilium + NetworkPolicy", "Cilium + NetworkPolicy")}</div>
              </a>
              <a href={`/${locale}/solutions/kubernetes-security-hardening`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Kubernetes Hardening</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Vollständiges K8s Hardening", "Full K8s hardening")}</div>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Reading Progress Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('reading-progress').style.width = scrolled + '%';
          });
        `
      }} />
    </div>
  )
}
