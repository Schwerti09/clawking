import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/runtime-policy-enforcement"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Runtime Policy Enforcement: OPA, Falco & Admission Webhooks | ClawGuru OpenClaw", "Runtime Policy Enforcement: OPA, Falco & Admission Webhooks | ClawGuru OpenClaw")
  const description = pick(isDE, "Runtime Security Policies selbst hosten: OPA Gatekeeper für Kubernetes, Falco-Regeln für Runtime-Detection, Admission Webhooks für Deploy-time-Enforcement. Policy-as-Code mit OpenClaw.", "Self-hosted runtime security policies: OPA Gatekeeper for Kubernetes, Falco rules for runtime detection, admission webhooks for deploy-time enforcement. Policy-as-code with OpenClaw.")
  return {
    title, description,
    keywords: ["runtime policy enforcement", "opa gatekeeper kubernetes", "falco rules", "kubernetes admission webhook security", "policy as code", "openclaw runtime policy"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const POLICY_LAYERS = [
  { layer: "Admission (Deploy-time)", tool: "OPA Gatekeeper", when: "Before workload is admitted to cluster", examples: ["Block images from untrusted registries", "Require resource limits on all containers", "Deny privileged containers", "Enforce pod security standards", "Require labels (owner, env, app)"], rego: `# OPA policy: deny privileged containers
package kubernetes.admission

deny[msg] {
  input.request.kind.kind == "Pod"
  container := input.request.object.spec.containers[_]
  container.securityContext.privileged == true
  msg := sprintf("Privileged container denied: %v", [container.name])
}` },
  { layer: "Runtime (Execution-time)", tool: "Falco", when: "While workload is running", examples: ["Alert on unexpected shell in container", "Detect /etc/shadow read", "Alert on outbound connection to unexpected IP", "Detect process spawning from unexpected parent", "Alert on kernel module load"], rego: `- rule: Shell Spawned in Container
  desc: Unexpected shell execution in container
  condition: >
    spawned_process and container
    and proc.name in (shell_binaries)
    and not proc.pname in (allowed_shell_parents)
  output: >
    Shell spawned (user=%user.name container=%container.name
    parent=%proc.pname shell=%proc.name)
  priority: WARNING` },
  { layer: "Network (Traffic-time)", tool: "Cilium NetworkPolicy", when: "On every network packet", examples: ["Deny all egress by default", "Allow only declared service-to-service paths", "Block direct pod-to-pod across namespaces", "Require L7 HTTP policy for external traffic"], rego: `apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
spec:
  endpointSelector:
    matchLabels: {app: api-server}
  ingress:
  - fromEndpoints:
    - matchLabels: {app: frontend}
    toPorts:
    - ports: [{port: "8080", protocol: TCP}]
  egress:
  - toEndpoints:
    - matchLabels: {app: postgres}` },
]

const FAQ = [
  { q: "What is the difference between admission control and runtime enforcement?", a: "Admission control (OPA Gatekeeper, Kyverno) runs at deploy-time — when you kubectl apply or Helm install. It acts as a gatekeeper: if the manifest violates policy, deployment is rejected before any container starts. Runtime enforcement (Falco) runs while containers are executing. It can't prevent a violating container from starting (if admission didn't catch it), but it detects violations in real-time and triggers alerts or automatic responses. Both are necessary: admission prevents known-bad deployments; runtime catches unexpected behavior in already-running workloads." },
  { q: "Should I use OPA Gatekeeper or Kyverno?", a: "Both are CNCF projects for Kubernetes policy enforcement. Key differences: OPA Gatekeeper uses Rego (OPA's policy language) — very powerful but has a learning curve. Kyverno uses YAML-based policies — much easier to start with, less powerful for complex logic. For most teams: start with Kyverno for quick policy wins (deny privileged, require labels, enforce image registry). Graduate to OPA Gatekeeper if you need complex logic (cross-resource validation, external data lookups). OpenClaw integrates with both." },
  { q: "How do I write Falco rules without false positives overwhelming my team?", a: "Falco rule tuning strategy: 1) Start with Falco's default rules — don't write custom rules until you understand the noise. 2) Run in alert-only mode for 2 weeks — collect what fires. 3) Add exceptions for known-good patterns: not (proc.name = 'my-app' and proc.pname = 'supervisord'). 4) Use tagged rules — enable only rules relevant to your stack. 5) Set up Falco alerts → OpenClaw → suppress duplicate alerts with a 5-minute dedup window. 6) Only escalate CRITICAL and ERROR priority to on-call. WARNING goes to a monitoring dashboard for weekly review." },
  { q: "How does OpenClaw integrate OPA and Falco into unified policy management?", a: "OpenClaw provides a unified policy dashboard that aggregates: OPA Gatekeeper audit results (which running workloads currently violate policy), Falco alert stream (runtime violations in real-time), Cilium network policy violations, and custom OpenClaw security check results. From the OpenClaw dashboard you can: push updated OPA policies to Gatekeeper, enable/disable Falco rules, see policy coverage (what % of your workloads have each policy applied), and trigger automated remediation for common violations." },
]

export default function RuntimePolicyEnforcementPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "OpenClaw", item: `${SITE_URL}/${locale}/openclaw` },
      { "@type": "ListItem", position: 3, name: "Runtime Policy Enforcement", item: `${SITE_URL}/${locale}${PATH}` },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up">
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Policy-Enforcement-Guide für eigene Kubernetes-Cluster.", "Policy enforcement guide for your own Kubernetes clusters.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Runtime Policy Enforcement · Policy-as-Code</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "Runtime Policy Enforcement: OPA, Falco & Cilium", "Runtime Policy Enforcement: OPA, Falco & Cilium")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Drei Enforcement-Schichten, drei Zeitpunkte: OPA stoppt schlechte Deployments bevor sie starten. Falco erkennt schlechtes Verhalten während der Ausführung. Cilium blockiert unerlaubten Netzwerkverkehr in Echtzeit.", "Three enforcement layers, three time points: OPA stops bad deployments before they start. Falco detects bad behavior during execution. Cilium blocks unauthorized network traffic in real-time.")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {[
            { value: "3", label: pick(isDE, "Enforcement-Schichten", "Enforcement layers") },
            { value: "OPA", label: pick(isDE, "Deploy-time", "Deploy-time") },
            { value: "Falco", label: pick(isDE, "Runtime", "Runtime") },
            { value: "Cilium", label: pick(isDE, "Network", "Network") },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl text-center hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="text-2xl font-black text-cyan-400">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            {pick(isDE, "3 Policy-Schichten", "3 Policy Layers")}
          </h2>
          <div className="space-y-6">
            {POLICY_LAYERS.map((pl) => (
              <div key={pl.layer} className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
                <div className="px-5 py-4 border-b border-gray-700/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-100 text-lg">{pl.layer}</span>
                    <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{pl.tool}</span>
                  </div>
                  <p className="text-xs text-gray-400">{pick(isDE, "Wann:", "When:")} {pl.when}</p>
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-gray-400 mb-2">{pick(isDE, "Beispiel-Policies:", "Example policies:")}</div>
                    <div className="flex flex-wrap gap-2">
                      {pl.examples.map((e) => <span key={e} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{e}</span>)}
                    </div>
                  </div>
                  <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-3 rounded-lg border border-gray-700/50 font-mono text-xs overflow-x-auto"><pre>{pl.rego}</pre></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Häufige Fragen", "Frequently Asked Questions")}</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-xl p-4 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
                <summary className="font-semibold text-gray-100 cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/openclaw-vs-falco`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">OpenClaw vs Falco</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Runtime Security Vergleich", "Runtime security comparison")}</div>
            </a>
            <a href={`/${locale}/openclaw/supply-chain-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Supply Chain Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "SBOM + Sigstore für Policy-Input", "SBOM + Sigstore for policy input")}</div>
            </a>
            <a href={`/${locale}/solutions/zero-trust-architecture`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Zero Trust Architecture</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Policy als ZT-Säule", "Policy as ZT pillar")}</div>
            </a>
            <a href={`/${locale}/moltbot/ai-red-teaming`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">AI Red Teaming</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Policies testen", "Test your policies")}</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Runtime Policy Security Score Calculator — Wie sicher sind deine Policies?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen Runtime Policy Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du OPA Gatekeeper oder Kyverno aktiviert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, für alle Namespaces</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Hast du Falco für Runtime Detection?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, mit Alerts</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Hast du Network Policies (Cilium)?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Default Deny</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Testst du deine Policies regelmäßig?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Automated Tests</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Hast du Policy Violation Alerts?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Real-time Alerts</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Runtime Policy Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">72/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Gut — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für Policy Audit & Detailed Report</div>
                  <a href={`/${locale}/pricing`} className="block bg-gray-900 text-gray-300 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition-colors">
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
              <a href={`/${locale}/pricing#daypass`} className="bg-gray-900 text-purple-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
                Daypass kaufen — €3
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
