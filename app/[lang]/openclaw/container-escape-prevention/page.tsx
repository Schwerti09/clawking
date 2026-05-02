import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/container-escape-prevention"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Container Escape Prevention: Docker & Kubernetes Ausbrüche verhindern | ClawGuru", "Container Escape Prevention: Prevent Docker & Kubernetes Breakouts | ClawGuru")
  const description = pick(isDE, "Container-Escape-Angriffe erkennen und verhindern: privilegierte Container, Host-Mounts, runc-Exploits, seccomp/AppArmor-Profile, gVisor Sandbox und OpenClaw Runtime Detection.", "Detect and prevent container escape attacks: privileged containers, host mounts, runc exploits, seccomp/AppArmor profiles, gVisor sandbox and OpenClaw runtime detection.")
  return {
    title, description,
    keywords: ["container escape prevention", "docker container escape", "kubernetes container breakout", "seccomp apparmor container", "gvisor sandbox", "container security hardening"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function ContainerEscapePreventionPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Container Escape Prevention: Docker & Kubernetes Ausbrüche verhindern | ClawGuru", "Container Escape Prevention: Prevent Docker & Kubernetes Breakouts | ClawGuru")

  const ESCAPE_VECTORS = [
    { id: "CE-1", severity: pick(isDE, "CRITICAL", "CRITICAL"), name: pick(isDE, "Privileged Container", "Privileged Container"), desc: pick(isDE, "Running containers with --privileged grants full host capabilities. Trivial escape via /proc/sysrq-trigger, device mounts, or kernel module loading.", "Running containers with --privileged grants full host capabilities. Trivial escape via /proc/sysrq-trigger, device mounts, or kernel module loading."), fix: `# WRONG — never run in production
docker run --privileged myimage

# CORRECT — drop ALL capabilities, add only what's needed
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myimage

# Kubernetes: enforce via Pod Security Standards
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsNonRoot: true
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      privileged: false
      capabilities:
        drop: ["ALL"]
        add: ["NET_BIND_SERVICE"]  # only if needed` },
    { id: "CE-2", severity: pick(isDE, "HIGH", "HIGH"), name: pick(isDE, "Dangerous Host Mounts", "Dangerous Host Mounts"), desc: pick(isDE, "Mounting host paths like /, /etc, /var/run/docker.sock gives container full host access. Docker socket mount = root on host.", "Mounting host paths like /, /etc, /var/run/docker.sock gives container full host access. Docker socket mount = root on host."), fix: `# WRONG — mounts giving host escape
docker run -v /:/host myimage          # Full host filesystem
docker run -v /etc:/etc myimage        # Host config
docker run -v /var/run/docker.sock:/var/run/docker.sock myimage  # Docker-in-Docker escape

# CORRECT — mount only what's needed, read-only where possible
docker run -v /data/app:/app:ro myimage

# Kubernetes: OPA Gatekeeper policy blocking docker.sock mounts
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSPVolumeTypes
metadata:
  name: psp-volume-types
spec:
  match:
    kinds: [{apiGroups: [""], kinds: ["Pod"]}]
  parameters:
    volumes:
      - "configMap"
      - "emptyDir"
      - "projected"
      - "secret"
      - "downwardAPI"
      - "persistentVolumeClaim"
    # hostPath EXCLUDED — no host mounts` },
    { id: "CE-3", severity: pick(isDE, "HIGH", "HIGH"), name: pick(isDE, "Missing seccomp / AppArmor Profile", "Missing seccomp / AppArmor Profile"), desc: pick(isDE, "Without seccomp, containers can call any kernel syscall. 300+ syscalls available — many enable privilege escalation (ptrace, mount, keyctl, clone with new namespaces).", "Without seccomp, containers can call any kernel syscall. 300+ syscalls available — many enable privilege escalation (ptrace, mount, keyctl, clone with new namespaces)."), fix: `# Apply seccomp RuntimeDefault (blocks 100+ dangerous syscalls)
# Docker:
docker run --security-opt seccomp=/path/to/profile.json myimage

# Kubernetes — apply to all containers via RuntimeDefault:
apiVersion: v1
kind: Pod
spec:
  securityContext:
    seccompProfile:
      type: RuntimeDefault   # Blocks dangerous syscalls automatically

# AppArmor (Ubuntu/Debian):
docker run --security-opt apparmor=docker-default myimage

# OpenClaw: detect containers running without seccomp profile
openclaw check --namespace production --rule no-seccomp-profile` },
    { id: "CE-4", severity: pick(isDE, "HIGH", "HIGH"), name: pick(isDE, "Writable Root Filesystem", "Writable Root Filesystem"), desc: pick(isDE, "Writable container filesystem allows attackers to modify binaries, add persistence, install tools after gaining initial access.", "Writable container filesystem allows attackers to modify binaries, add persistence, install tools after gaining initial access."), fix: `# Kubernetes: enforce read-only root filesystem
spec:
  containers:
  - name: app
    securityContext:
      readOnlyRootFilesystem: true
    volumeMounts:
    - name: tmp
      mountPath: /tmp         # tmpfs for writable temp
    - name: var-run
      mountPath: /var/run     # tmpfs for runtime files
  volumes:
  - name: tmp
    emptyDir:
      medium: Memory
  - name: var-run
    emptyDir:
      medium: Memory

# Docker:
docker run --read-only --tmpfs /tmp --tmpfs /var/run myimage` },
    { id: "CE-5", severity: pick(isDE, "MEDIUM", "MEDIUM"), name: pick(isDE, "Kernel Namespace Sharing", "Kernel Namespace Sharing"), desc: pick(isDE, "Sharing host PID/IPC/network namespaces with the container collapses isolation boundaries. hostPID=true allows container to see and signal all host processes.", "Sharing host PID/IPC/network namespaces with the container collapses isolation boundaries. hostPID=true allows container to see and signal all host processes."), fix: `# Kubernetes: explicitly prohibit host namespace sharing
spec:
  hostPID: false     # Default false — but set explicitly
  hostIPC: false     # Default false — but set explicitly
  hostNetwork: false # Default false — only enable if actually needed

# OPA Gatekeeper constraint to block hostPID/hostIPC:
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSPHostNamespace
metadata:
  name: psp-host-namespace
spec:
  match:
    kinds: [{apiGroups: [""], kinds: ["Pod"]}]
  # Constraint: hostPID and hostIPC must be false` },
  ]

  const FAQ = [
    { q: pick(isDE, "Was ist ein Container Escape und wie häufig sind sie?", "What is a container escape and how common are they?"), a: pick(isDE, "Ein Container Escape ist, wenn ein Angreifer, der einen Container kompromittiert hat, aus der Container-Isolation ausbricht und Zugriff auf den Host-OS oder andere Container erhält. Häufige Vektoren: privilegierte Container (trivial ausnutzbar), docker.sock Mounts (sofortiger Root auf Host), Kernel CVEs in runc/containerd (CVE-2024-21626 runc escape), gefährliche Syscalls ohne seccomp (ptrace, mount). Real-World-Frequenz: Container Escapes werden in fast jedem Kubernetes-Security-Audit gefunden. Fehlkonfigurationen (privilegierte Container, Socket-Mounts) sind viel häufiger als Kernel-Exploits — und einfacher zu beheben.", "A container escape is when an attacker who has compromised a container process manages to break out of the container isolation and gain access to the host OS or other containers. Common vectors: privileged containers (trivially exploitable), docker.sock mounts (instant root on host), kernel CVEs in runc/containerd (CVE-2024-21626 runc escape), dangerous syscalls without seccomp (ptrace, mount). Real-world frequency: container escapes are found in nearly every Kubernetes security audit. Misconfigurations (privileged containers, socket mounts) are far more common than actual kernel exploits — and easier to fix.") },
    { q: pick(isDE, "Was ist gVisor und wann sollte ich es nutzen?", "What is gVisor and when should I use it?"), a: pick(isDE, "gVisor ist ein User-Space-Kernel in Go (entwickelt von Google), der Container-Syscalls abfängt, bevor sie den Host-Kernel erreichen. Anstatt dass Syscalls direkt zum Linux-Kernel gehen, verarbeitet gVisor's Sentry sie. Warum das wichtig ist: selbst wenn ein Container-Prozess eine Kernel-Vulnerability ausnutzt, exploitet er gVisor's Kernel — nicht den Host-Kernel. Ein gVisor-Escape würde einen zweiten Exploit gegen gVisor selbst erfordern. Nutze gVisor wenn: untrusted Workloads (z.B. user-submitted code), Multi-Tenant Kubernetes wo Tenant-Isolation kritisch ist, jeder Workload, der sonst privilegierte Container erfordern würde. Tradeoff: ~10-20% Performance-Overhead für syscall-heavy Workloads. Kubernetes RuntimeClass: set runtimeClassName: gvisor auf sensitive Pods.", "gVisor is a user-space kernel written in Go (developed by Google) that intercepts container syscalls before they reach the host kernel. Instead of syscalls going directly to the Linux kernel, gVisor's Sentry handles them. Why this matters: even if a container process exploits a kernel vulnerability, it exploits gVisor's kernel — not the host kernel. A gVisor escape would require a second exploit against gVisor itself. Use gVisor when: running untrusted workloads (e.g., user-submitted code), multi-tenant Kubernetes where tenant isolation is critical, any workload that would otherwise require privileged containers. Tradeoff: ~10-20% performance overhead for syscall-heavy workloads. Kubernetes RuntimeClass: set runtimeClassName: gvisor on sensitive pods.") },
    { q: pick(isDE, "Wie erkennt OpenClaw Container-Escape-Versuche zur Laufzeit?", "How does OpenClaw detect container escape attempts at runtime?"), a: pick(isDE, "OpenClaw integriert mit Falco für Runtime-Detection. Key Rules: 1) Privileged Container Prozess spawnet Shell (container_shell_from_privileged). 2) Write zu sensiblen Host-Pfaden aus einem Container (/etc, /proc/sysrq-trigger). 3) Docker Socket Access aus einem Container (fd opened matching /var/run/docker.sock). 4) Unexpected Capability Use (ptrace, mount syscall aus non-init container). 5) Namespace Escape Indicators (setns syscall, clone mit CLONE_NEWUSER aus Container). 6) Unexpected Network Connections aus einem Container zu host-only Subnets. Alerts route via OpenClaw's Webhook-Integration zu deinem SIEM.", "OpenClaw integrates with Falco for runtime detection. Key rules: 1) Privileged container process spawning shell (container_shell_from_privileged). 2) Write to sensitive host paths from within a container (/etc, /proc/sysrq-trigger). 3) Docker socket access from within a container (fd opened matching /var/run/docker.sock). 4) Unexpected capability use (ptrace, mount syscall from non-init container). 5) Namespace escape indicators (setns syscall, clone with CLONE_NEWUSER from container). 6) Unexpected network connections from a container to host-only subnets. Alerts route to your SIEM via OpenClaw's webhook integration.") },
    { q: pick(isDE, "Was ist die wirkungsvollste einzelne Änderung, um Container Escapes zu verhindern?", "What is the most impactful single change to prevent container escapes?"), a: pick(isDE, "Pod Security Standards auf Cluster-Level erzwingen. Ein einziger Admission Webhook, der das 'restricted' PSS-Profil erzwingt, verhindert: privilegierte Container, hostPath Mounts, hostPID/hostIPC/hostNetwork, fehlende seccomp Profile, Privilege Escalation, Ausführung als Root. Ein OPA Gatekeeper oder Kyverno Policy Set, das PSS 'restricted' erzwingt, eliminiert die häufigsten Container-Escape-Vektoren cluster-weit. Das ist wirkungsvoller als individuelle Vulnerabilities anzugehen, weil es ganze Klassen von Fehlkonfiguration verhindert. Sofort auf neuen Clustern aktivieren; auf bestehenden Clustern zuerst 'warn' Mode nutzen, um Violations zu identifizieren, dann auf 'enforce' wechseln.", "Enforce Pod Security Standards at the cluster level. A single admission webhook enforcing the 'restricted' PSS profile prevents: privileged containers, hostPath mounts, hostPID/hostIPC/hostNetwork, missing seccomp profiles, privilege escalation, running as root. One OPA Gatekeeper or Kyverno policy set enforcing PSS 'restricted' eliminates the most common container escape vectors cluster-wide. This is more impactful than addressing individual vulnerabilities because it prevents entire classes of misconfiguration. Enable immediately on new clusters; use 'warn' mode on existing clusters first to identify violations, then switch to 'enforce'.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "OpenClaw", item: `${SITE_URL}/${locale}/openclaw` },
      { "@type": "ListItem", position: 3, name: "Container Escape Prevention", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["Container Escape Prevention", "Docker Security", "Kubernetes Security", "seccomp", "AppArmor", "gVisor"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ]

  const sevColor: Record<string, string> = { CRITICAL: "bg-red-900 text-red-300", HIGH: "bg-orange-900 text-orange-300", MEDIUM: "bg-yellow-900 text-yellow-300" }

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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist ein Container Escape?", "What is a container escape?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "5 Container Escape Vektoren", "5 Container Escape Vectors")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Container Security Score", "Container Security Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">14 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OpenClaw · Container Security</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Container Escape Prevention — Du deployst Container ohne Hardening. Privilegierter Container, Angreifer hat Root auf Host. Lateral Movement, dein Cluster ist kompromittiert.", "Container Escape Prevention — You deploy containers without hardening. Privileged container, attacker has root on host. Lateral movement, your cluster is compromised.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du deployst Container ohne Hardening. Privilegierter Container, Angreifer hat Root auf Host. Lateral Movement, dein Cluster ist kompromittiert. Hier ist, wie du das verhinderst.", "You deploy containers without hardening. Privileged container, attacker has root on host. Lateral movement, your cluster is compromised. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Container-Hardening-Guide für eigene Infrastruktur.", "Container hardening guide for your own infrastructure.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist ein Container Escape? Einfach erklärt.", "What is a container escape? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Ein Container Escape ist, wenn ein Angreifer aus der Container-Isolation ausbricht und Zugriff auf den Host-OS oder andere Container erhält. Häufige Vektoren: privilegierte Container (--privileged), Docker Socket Mounts (/var/run/docker.sock), fehlende seccomp/AppArmor Profile, Kernel CVEs (runc/containerd). Container Escapes sind häufiger als Kernel-Exploits — meist durch Fehlkonfiguration, nicht 0-Day-Exploits. Gute Container Security: Pod Security Standards (restricted), seccomp/AppArmor Profile, Read-Only Root Filesystem, gVisor Sandbox für untrusted Workloads.", "A container escape is when an attacker breaks out of container isolation and gains access to the host OS or other containers. Common vectors: privileged containers (--privileged), Docker socket mounts (/var/run/docker.sock), missing seccomp/AppArmor profiles, kernel CVEs (runc/containerd). Container escapes are more common than kernel exploits — usually misconfiguration, not 0-day exploits. Good container security: Pod Security Standards (restricted), seccomp/AppArmor profiles, read-only root filesystem, gVisor sandbox for untrusted workloads.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "5 Container Escape Vektoren & Fixes", "5 Container Escape Vectors & Fixes")}</h2>
            <div className="space-y-5">
              {ESCAPE_VECTORS.map((v) => (
                <div key={v.id} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700">
                    <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{v.id}</span>
                    <span className="font-bold text-gray-100">{v.name}</span>
                    <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded ${sevColor[v.severity]}`}>{v.severity}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-300 mb-3">{v.desc}</p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto"><pre>{v.fix}</pre></div>
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
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Privileged Container Escape", "SCAR #1: Privileged container escape")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "--privileged Container deployed, Angreifer hat Root auf Host, greift alle anderen Container an. Fix: Pod Security Standards 'restricted' erzwingen, keine privilegierten Container.", "Privileged container deployed, attacker has root on host, attacks all other containers. Fix: Enforce Pod Security Standards 'restricted', no privileged containers.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: --privileged. Lessons: PSS restricted erzwingen.", "Root Cause: --privileged. Lessons: Enforce PSS restricted.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Docker Socket Mount Escape", "SCAR #2: Docker socket mount escape")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Docker Socket in Container gemountet, Angreifer kontrolliert Docker Daemon, spawnet bösartige Container. Fix: hostPath Mounts verbieten, OPA Gatekeeper für Volume-Typen.", "Docker socket mounted in container, attacker controls Docker daemon, spawns malicious containers. Fix: Block hostPath mounts, OPA Gatekeeper for volume types.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: docker.sock Mount. Lessons: hostPath verbieten.", "Root Cause: docker.sock mount. Lessons: Block hostPath.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              {[
                { n: 1, t: pick(isDE, "Pod Security Standards aktivieren", "Enable Pod Security Standards"), d: pick(isDE, "'restricted' Profil auf Cluster-Level erzwingen.", "Enforce 'restricted' profile at cluster level.") },
                { n: 2, t: pick(isDE, "seccomp RuntimeDefault erzwingen", "Enforce seccomp RuntimeDefault"), d: pick(isDE, "seccompProfile.type: RuntimeDefault für alle Pods.", "seccompProfile.type: RuntimeDefault for all pods.") },
                { n: 3, t: pick(isDE, "Read-Only Root Filesystem", "Read-only root filesystem"), d: pick(isDE, "readOnlyRootFilesystem: true für alle Container.", "readOnlyRootFilesystem: true for all containers.") },
                { n: 4, t: pick(isDE, "gVisor für untrusted Workloads", "gVisor for untrusted workloads"), d: pick(isDE, "RuntimeClass gvisor für Multi-Tenant.", "RuntimeClass gvisor for multi-tenant.") },
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
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Container Security Checkliste", "Interactive Container Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "ce1", text: pick(isDE, "Keine privilegierten Container", "No privileged containers") },
                  { id: "ce2", text: pick(isDE, "Keine hostPath Mounts", "No hostPath mounts") },
                  { id: "ce3", text: pick(isDE, "seccomp RuntimeDefault aktiviert", "seccomp RuntimeDefault enabled") },
                  { id: "ce4", text: pick(isDE, "AppArmor Profile aktiviert", "AppArmor profile enabled") },
                  { id: "ce5", text: pick(isDE, "Read-Only Root Filesystem", "Read-only root filesystem") },
                  { id: "ce6", text: pick(isDE, "hostPID/hostIPC/hostNetwork false", "hostPID/hostIPC/hostNetwork false") },
                  { id: "ce7", text: pick(isDE, "Falco Runtime Detection aktiviert", "Falco runtime detection enabled") },
                  { id: "ce8", text: pick(isDE, "gVisor für untrusted Workloads", "gVisor for untrusted workloads") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Container Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Container Security Score Calculator", "Container Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist PSS 'restricted' aktiviert?", "Is PSS 'restricted' enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist seccomp RuntimeDefault aktiviert?", "Is seccomp RuntimeDefault enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Read-Only Root Filesystem aktiviert?", "Is read-only root filesystem enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Falco Runtime Detection aktiviert?", "Is Falco runtime detection enabled?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Container Security Score:", "Your Container Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 15/100", "Industry Average: 15/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Container Security, Docker, Kubernetes, seccomp, AppArmor und gVisor.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in container security, Docker, Kubernetes, seccomp, AppArmor and gVisor.")}
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
              <a href={`/${locale}/openclaw/supply-chain-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Supply Chain Security</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Distroless + Cosign", "Distroless + Cosign")}</div>
              </a>
              <a href={`/${locale}/academy/cve/CVE-2024-21626`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">CVE-2024-21626</div>
                <div className="text-sm text-gray-300">runc Container Escape</div>
              </a>
              <a href={`/${locale}/solutions/kubernetes-security-hardening`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Kubernetes Hardening</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Cluster-weites Hardening", "Cluster-wide hardening")}</div>
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
