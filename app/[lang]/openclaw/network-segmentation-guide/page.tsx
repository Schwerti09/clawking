import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/network-segmentation-guide"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Network Segmentation Guide: Zero-Trust-Netzwerk für Kubernetes | ClawGuru", "Network Segmentation Guide: Zero-Trust Networking for Kubernetes | ClawGuru")
  const description = pick(isDE, "Kubernetes-Netzwerksegmentierung mit Cilium, NetworkPolicies und Service Mesh: Namespace-Isolation, Default-Deny, mTLS zwischen Services und AI-Agent-Netzwerksicherheit.", "Kubernetes network segmentation with Cilium, NetworkPolicies and service mesh: namespace isolation, default deny, mTLS between services and AI agent network security.")
  return {
    title, description,
    keywords: ["kubernetes network segmentation", "kubernetes network policy", "cilium network policy", "kubernetes zero trust network", "service mesh security", "k8s namespace isolation"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const SEGMENTATION_LAYERS = [
  { id: "NS-1", title: "Default-Deny Baseline", desc: "Start with deny-all for every namespace. Add explicit allow rules only for required communication paths.", code: `# Step 1: Apply default-deny to every application namespace
# This NetworkPolicy denies ALL ingress and egress by default
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: moltbot-agents    # Apply to each namespace
spec:
  podSelector: {}              # Matches ALL pods in namespace
  policyTypes:
  - Ingress
  - Egress
  # No rules = deny all ingress and egress

---
# Allow DNS egress (required for service discovery)
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns-egress
  namespace: moltbot-agents
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - ports:
    - port: 53
      protocol: UDP
    - port: 53
      protocol: TCP` },
  { id: "NS-2", title: "Namespace Isolation", desc: "Prevent cross-namespace communication unless explicitly required. Separate concerns: AI agents, databases, monitoring, ingress — each in isolated namespaces.", code: `# Allow moltbot-agents to reach llm-gateway in llm-services namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-llm-gateway-egress
  namespace: moltbot-agents
spec:
  podSelector:
    matchLabels:
      app: moltbot-agent
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: llm-services
      podSelector:
        matchLabels:
          app: llm-gateway
    ports:
    - port: 8080
      protocol: TCP

# Deny: moltbot-agents → database namespace (agents never touch DB directly)
# Deny: moltbot-agents → monitoring namespace
# Allow: monitoring namespace → moltbot-agents (metrics scraping only)
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-prometheus-scrape
  namespace: moltbot-agents
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: monitoring
    ports:
    - port: 9090   # metrics port only` },
  { id: "NS-3", title: "mTLS with Istio/Cilium", desc: "Mutual TLS encrypts and authenticates all service-to-service communication. Even if network segmentation is bypassed, mTLS prevents unauthorized service access.", code: `# Istio: enforce STRICT mTLS cluster-wide
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: strict-mtls
  namespace: istio-system   # Cluster-wide policy
spec:
  mtls:
    mode: STRICT    # Reject any non-mTLS connection

---
# AuthorizationPolicy: allow only specific service-to-service calls
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: moltbot-agent-authz
  namespace: moltbot-agents
spec:
  selector:
    matchLabels:
      app: moltbot-agent
  action: ALLOW
  rules:
  - from:
    - source:
        principals:
        - "cluster.local/ns/ingress-nginx/sa/ingress-nginx"  # Only ingress can call agents
  # All other callers: implicitly denied

---
# Cilium alternative: mTLS via CiliumNetworkPolicy with SPIFFE identity
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: moltbot-mtls-policy
spec:
  endpointSelector:
    matchLabels:
      app: moltbot-agent
  ingress:
  - fromEntities:
    - cluster   # Only in-cluster traffic
    toPorts:
    - ports:
      - port: "8080"
      rules:
        http: [{}]  # L7 inspection enabled` },
  { id: "NS-4", title: "Egress Control for AI Agents", desc: "AI agents must not make arbitrary outbound connections. Strict egress control prevents data exfiltration and C2 communication if an agent is compromised.", code: `# Cilium FQDN-based egress: only allow specific external hosts
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: moltbot-agent-egress
  namespace: moltbot-agents
spec:
  endpointSelector:
    matchLabels:
      app: moltbot-agent
  egress:
  # Allow: LLM gateway (internal)
  - toEndpoints:
    - matchLabels:
        app: llm-gateway
    toPorts:
    - ports: [{port: "8080", protocol: TCP}]

  # Allow: specific external APIs (if using cloud LLM)
  - toFQDNs:
    - matchName: "api.openai.com"
    toPorts:
    - ports: [{port: "443", protocol: TCP}]

  # Block: everything else including:
  # - AWS metadata (169.254.169.254)
  # - Internal admin interfaces
  # - All other external IPs

  egressDeny:
  - toCIDRSet:
    - cidr: "169.254.169.254/32"   # Block cloud metadata API
    - cidr: "10.0.0.0/8"           # Block internal unless explicitly allowed above
      except:
      - cidr: "10.0.1.0/24"        # Allow: LLM gateway subnet` },
]

const FAQ = [
  { q: "What is the difference between Kubernetes NetworkPolicy and Cilium NetworkPolicy?", a: "Kubernetes NetworkPolicy (standard): L3/L4 only (IP addresses and ports). Requires a CNI plugin that implements it (Calico, Cilium, Weave). No L7 awareness (can't filter by HTTP method or path). No FQDN support (can't allow api.openai.com — only IP ranges). Cilium NetworkPolicy (extended): Adds L7 policy (HTTP methods, paths, gRPC methods, DNS). FQDN-based egress (allow by domain name, Cilium resolves DNS). SPIFFE/SPIRE identity support. Tighter integration with Cilium's eBPF dataplane. In practice: use standard NetworkPolicy for basic isolation (works with any CNI). Add Cilium CiliumNetworkPolicy for L7 filtering and FQDN-based egress when using Cilium CNI." },
  { q: "Does network segmentation break AI agent functionality?", a: "Only if implemented too aggressively without testing. Common breakage points: DNS not allowed — agents can't resolve service names. Solved: always add explicit DNS egress (port 53). LLM gateway blocked — agents can't reach the LLM. Solved: explicit egress rule to LLM gateway namespace/pod selector. Tool APIs blocked — agents with external API tools can't call them. Solved: FQDN-based egress rules for each tool's domain. Metrics blocked — Prometheus can't scrape agent metrics. Solved: ingress rule allowing monitoring namespace. Recommended approach: start with default-deny + DNS allow, then add rules as agents fail. Use 'dry-run' mode in some CNI plugins to preview what would be blocked before enforcing." },
  { q: "How do I segment the network for multi-tenant AI deployments?", a: "Multi-tenant network segmentation for AI: Tenant namespace isolation: each tenant gets their own namespace with default-deny. No cross-tenant traffic allowed (strict namespaceSelector rules). Shared services access: tenants can reach shared LLM gateway, but each tenant's agents are isolated from other tenants' agents. Database isolation: each tenant's vector store in a separate namespace, accessible only from that tenant's agent namespace. Monitoring: centralized monitoring namespace scrapes all tenant namespaces (one-directional). Ingress: single ingress gateway routes to tenant namespaces based on tenant ID in request headers. Cilium SPIFFE identities ensure that even if a tenant's pod gets a different IP (e.g., after restart), the identity-based policy still applies correctly." },
  { q: "Should I use Istio service mesh or just NetworkPolicies?", a: "Both serve different purposes and are complementary: NetworkPolicy (L3/L4): controls which pods can communicate at the network level. Low overhead. Works with any CNI. Mandatory baseline for any production cluster. Istio service mesh (L7 + mTLS): mutual TLS authentication between all services. L7 AuthorizationPolicy (RBAC for service-to-service calls). Traffic management (circuit breaking, retries, canary). Observability (traces, metrics per service pair). Higher complexity and resource overhead (~50-100MB per sidecar). Recommendation: always use NetworkPolicy as the baseline. Add Istio for high-security environments (financial, healthcare) where service-to-service authentication and L7 RBAC are required. For AI workloads: mTLS ensures that a compromised agent can't impersonate the LLM gateway." },
]

export default function NetworkSegmentationGuidePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "OpenClaw", item: `${SITE_URL}/${locale}/openclaw` },
      { "@type": "ListItem", position: 3, name: "Network Segmentation Guide", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up">
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Netzwerksegmentierungs-Guide für eigene Kubernetes-Infrastruktur.", "Network segmentation guide for your own Kubernetes infrastructure.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OpenClaw · Network Segmentation</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "Network Segmentation Guide", "Network Segmentation Guide")}
          </h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {pick(isDE, "Kubernetes-Netzwerke sind standardmäßig flach — jeder Pod kann jeden anderen erreichen. Vier Schichten: Default-Deny-Baseline, Namespace-Isolation, mTLS und Egress-Control für KI-Agenten.", "Kubernetes networks are flat by default — every pod can reach every other pod. Four layers: default-deny baseline, namespace isolation, mTLS and egress control for AI agents.")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {[
            { value: "Default", label: pick(isDE, "Deny-All zuerst", "Deny-all first") },
            { value: "mTLS", label: pick(isDE, "Service-Auth", "Service auth") },
            { value: "FQDN", label: pick(isDE, "Domain-Egress", "Domain egress") },
            { value: "L7", label: pick(isDE, "HTTP-Path-Filter", "HTTP path filter") },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl text-center hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-2xl font-black text-cyan-400">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "4 Segmentierungsschichten", "4 Segmentation Layers")}</h2>
          <div className="space-y-5">
            {SEGMENTATION_LAYERS.map((s) => (
              <div key={s.id} className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700">
                  <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{s.id}</span>
                  <span className="font-bold text-gray-100">{s.title}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">{s.desc}</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto"><pre>{s.code}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 shadow-2xl">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/openclaw/ebpf-security-monitoring`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">eBPF Security Monitoring</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Cilium L7-Enforcement", "Cilium L7 enforcement")}</div>
            </a>
            <a href={`/${locale}/openclaw/runtime-policy-enforcement`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Runtime Policy Enforcement</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OPA + Cilium Policies", "OPA + Cilium policies")}</div>
            </a>
            <a href={`/${locale}/solutions/zero-trust-architecture`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Zero Trust Architecture</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Netzwerk im ZT-Kontext", "Network in ZT context")}</div>
            </a>
            <a href={`/${locale}/moltbot/secure-agent-deployment`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Secure Agent Deployment</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Zero-Egress für AI-Agenten", "Zero-egress for AI agents")}</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Network Segmentation Security Score Calculator — Wie sicher ist dein Netzwerk?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen Network Segmentation Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du Default-Deny Network Policies?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Default-Deny aktiv</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Hast du Namespace-Isolation?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, strikte Namespace-Trennung</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Hast du mTLS aktiviert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Istio/Cilium mTLS</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Hast du Egress-Control?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, FQDN-basiertes Egress</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Hast du L7-Policy Enforcement?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, HTTP-Path-Filter</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Network Segmentation Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">35/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für Network Audit & Detailed Report</div>
                  <a href={`/${locale}/pricing`} className="block bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-100 transition-colors">
                    Pro Plan — €49/mo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daypass Offer */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 rounded-xl border border-purple-700 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Daypass — 24h Full Access für €3</h3>
                <p className="text-purple-200 text-sm mb-4">Einmalig pro User/Kreditkarte. Volle 24 Stunden Zugang zu allen Security-Tools.</p>
                <div className="flex gap-2 text-xs text-purple-300">
                  <span className="bg-purple-800 px-2 py-1 rounded">✓ Security Check</span>
                  <span className="bg-purple-800 px-2 py-1 rounded">✓ Runbooks</span>
                  <span className="bg-purple-800 px-2 py-1 rounded">✓ AI Copilot</span>
                </div>
              </div>
              <a href={`/${locale}/pricing#daypass`} className="bg-white text-purple-900 font-bold py-3 px-6 rounded-lg hover:bg-purple-100 transition-colors whitespace-nowrap">
                Daypass kaufen — €3
              </a>
            </div>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
    </div>
  )
}
