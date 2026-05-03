import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/microservices-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const title = "Microservices Security: Architektur-Patterns 2026 | OpenClaw"
  const description = "Microservices Security mit Zero-Trust-Architektur, API-Gateway-Absicherung, Service Mesh mTLS und Container Security Patterns für selbst-gehostete Infrastrukturen."
  return {
    title,
    description,
    keywords: ["microservices security", "zero trust architecture", "api gateway security", "service mesh", "container security"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      images: ["/og-image.png"],
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Was ist Zero-Trust in Microservices?', acceptedAnswer: { '@type': 'Answer', text: 'Zero-Trust bedeutet: kein Service vertraut einem anderen per Default. Jede Kommunikation wird authentifiziert (mTLS), autorisiert (RBAC) und protokolliert — unabhängig davon, ob der Aufrufer intern oder extern ist.' } },
    { '@type': 'Question', name: 'Wie sichere ich die Kommunikation zwischen Microservices ab?', acceptedAnswer: { '@type': 'Answer', text: 'Mutual TLS (mTLS) verschlüsselt und authentifiziert Service-zu-Service-Kommunikation. Service Meshes wie Istio oder Linkerd implementieren mTLS automatisch, ohne Änderung am Anwendungscode.' } },
    { '@type': 'Question', name: 'Was ist der größte Sicherheitsrisiko bei Microservices?', acceptedAnswer: { '@type': 'Answer', text: 'Die größten Risiken sind: unsichere Service-Kommunikation (kein mTLS), zu weitreichende RBAC-Berechtigungen, unsichere API Gateways, fehlende Netzwerk-Segmentierung und unkontrollierte Secrets-Verteilung.' } },
    { '@type': 'Question', name: 'Welche Tools empfiehlt OpenClaw für Microservices Security?', acceptedAnswer: { '@type': 'Answer', text: 'OpenClaw empfiehlt: Istio/Linkerd für Service Mesh mTLS, OPA/Kyverno für Policy-as-Code, Falco für Runtime-Detection, Trivy für Container-Scanning und HashiCorp Vault für Secrets Management.' } },
  ],
}

export default function MicroservicesSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()

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
          <strong className="text-amber-100">&quot;Not a Pentest&quot; Hinweis</strong>: Dieser Guide dient der Absicherung eigener Microservices-Infrastrukturen. Kein Angriffs-Tool.
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Microservices Security · Zero-Trust Architecture</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">Microservices Security: Architektur-Patterns</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Vollständige Microservices-Absicherung mit Zero-Trust-Architektur, API-Gateway-Security, Service Mesh und Container Security Patterns.</p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Microservices Security Grundlagen</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl mb-4 border border-gray-700/50 shadow-2xl">
            <h3 className="font-semibold mb-2 text-gray-100">Grundlegende Security-Prinzipien</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Zero-Trust-Netzwerkarchitektur</li>
              <li>Defense-in-Depth-Strategie</li>
              <li>Minimale Zugriffsprivilegien (Least Privilege)</li>
              <li>Gesicherte Service-zu-Service-Kommunikation</li>
              <li>Umfassende Observability und Logging</li>
            </ul>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Zero-Trust-Architektur</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# Zero-Trust Network Policy Example
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: zero-trust-policy
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: api-gateway
    - podSelector:
        matchLabels:
          app: auth-service
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432

# Service Account with RBAC
apiVersion: v1
kind: ServiceAccount
metadata:
  name: microservice-sa
  namespace: production
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: microservice-role
  namespace: production
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: microservice-binding
  namespace: production
subjects:
- kind: ServiceAccount
  name: microservice-sa
  namespace: production
roleRef:
  kind: Role
  name: microservice-role
  apiGroup: rbac.authorization.k8s.io`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">API Gateway Security</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# Kong API Gateway Security Configuration
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rate-limiting
  namespace: production
config:
  minute: 100
  hour: 1000
  policy: local
plugin: rate-limiting

---
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: jwt-auth
  namespace: production
config:
  key_claim_name: "iss"
  secret_is_base64: false
plugin: jwt

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  namespace: production
  annotations:
    konghq.com/plugins: rate-limiting,jwt-auth
spec:
  ingressClassName: kong
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /v1
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 8080

# JWT Authentication Configuration
apiVersion: v1
kind: Secret
metadata:
  name: jwt-secret
  namespace: production
type: Opaque
stringData:
  rsa-key: |
    -----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEAzK8Q...
    -----END RSA PRIVATE KEY-----`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Container Security Patterns</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# Secure Container Configuration
apiVersion: v1
kind: Pod
metadata:
  name: secure-microservice
  namespace: production
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
  containers:
  - name: app
    image: nginx:1.21-alpine
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
      runAsNonRoot: true
      runAsUser: 1000
    resources:
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "256Mi"
        cpu: "200m"
    volumeMounts:
    - name: tmp
      mountPath: /tmp
    - name: cache
      mountPath: /var/cache/nginx
  volumes:
  - name: tmp
    emptyDir: {}
  - name: cache
    emptyDir: {}

# Pod Security Policy
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  fsGroup:
    rule: 'RunAsAny'`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Service Mesh Integration</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# Istio Service Mesh Security
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT

---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: allow-specific-services
  namespace: production
spec:
  selector:
    matchLabels:
      app: user-service
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/frontend-sa"]
  - to:
    - operation:
        methods: ["GET", "POST"]
        paths: ["/api/v1/*"]

---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: user-service
  namespace: production
spec:
  hosts:
  - user-service
  http:
  - match:
    - uri:
        prefix: "/health"
    route:
    - destination:
        host: user-service
        port:
          number: 8080
    timeout: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s

---
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  name: jwt-auth
  namespace: production
spec:
  selector:
    matchLabels:
      app: user-service
  jwtRules:
  - issuer: "https://auth.example.com"
    jwksUri: "https://auth.example.com/.well-known/jwks.json"
    forwardOriginalToken: true`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700 shadow-2xl hover:border-blue-500 transition-all duration-300">
              <h3 className="font-semibold text-blue-300 mb-2">Image Security</h3>
              <p className="text-sm text-blue-200">Use minimal base images, scan for vulnerabilities, and sign images with cosign.</p>
            </div>
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700 shadow-2xl hover:border-green-500 transition-all duration-300">
              <h3 className="font-semibold text-green-300 mb-2">Secrets Management</h3>
              <p className="text-sm text-green-200">Never store secrets in containers, use external secret management systems.</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700 shadow-2xl hover:border-yellow-500 transition-all duration-300">
              <h3 className="font-semibold text-yellow-300 mb-2">Network Segmentation</h3>
              <p className="text-sm text-yellow-200">Implement network policies and service mesh for defense in depth.</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700 shadow-2xl hover:border-red-500 transition-all duration-300">
              <h3 className="font-semibold text-red-300 mb-2">Observability</h3>
              <p className="text-sm text-red-200">Comprehensive logging, metrics, and tracing for security monitoring.</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Weiterführende Ressourcen</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">Scan your system now</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">600+ security playbooks</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">OpenClaw Framework</div>
              <div className="text-sm text-gray-300">Self-hosted security</div>
            </a>
            <a href={`/${locale}/solutions/kubernetes-security-hardening`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Kubernetes Security</div>
              <div className="text-sm text-gray-300">Complete hardening guide</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Microservices Security Score Calculator — Wie sicher sind deine Microservices?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen Microservices Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du mTLS aktiviert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Service Mesh mTLS</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Hast du Network Policies?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Zero-Trust Policies</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Hast du RBAC pro Service?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Minimal RBAC</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Hast du API Gateway mit Rate Limiting?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Kong/Traefik mit Limits</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Hast du Container Security Policies?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, PSP/SecurityContext</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Microservices Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">40/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für Microservices Audit & Detailed Report</div>
                  <a href={`/${locale}/pricing`} className="block bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-100 transition-colors">
                    Pro Plan — €49/mo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daypass Offer */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "Wie sichere ich Microservices in OpenClaw ab?", acceptedAnswer: { "@type": "Answer", text: "Zero-Trust zwischen Services: mTLS für alle Service-to-Service Kommunikation, RBAC per Namespace, NetworkPolicies für Netzwerksegmentierung." } },
            { "@type": "Question", name: "Was ist mTLS bei Microservices?", acceptedAnswer: { "@type": "Answer", text: "Mutual TLS (mTLS) authentifiziert beide Seiten einer Verbindung gegenseitig — jeder Service beweist seine Identität per Zertifikat. Verhindert Lateral Movement bei kompromittierten Services." } },
            { "@type": "Question", name: "Brauche ich ein Service Mesh für OpenClaw?", acceptedAnswer: { "@type": "Answer", text: "Für kleine Deployments (< 5 Services) reichen NetworkPolicies. Ab 5+ Services empfehlen wir Istio oder Linkerd für automatisches mTLS, Tracing und Traffic Management." } },
          ]},
          { "@context": "https://schema.org", "@type": "WebPage", name: "OpenClaw Microservices Security", description: "Zero-Trust Microservices-Sicherheit für OpenClaw.", url: "https://clawguru.org/de/openclaw/microservices-security" },
          { "@context": "https://schema.org", "@type": "HowTo", name: "Microservices für OpenClaw absichern",
            description: "Zero-Trust Architektur für OpenClaw Microservices: mTLS, NetworkPolicies, RBAC und Observability.",
            totalTime: "PT120M",
            step: [
              { "@type": "HowToStep", name: "Kubernetes NetworkPolicies erstellen", text: "Default-Deny für alle Namespaces setzen. Explizite Allow-Rules nur für benötigte Service-Kommunikation." },
              { "@type": "HowToStep", name: "mTLS mit Istio aktivieren", text: "istioctl install --set profile=minimal. PeerAuthentication mit mode: STRICT im Namespace deployen." },
              { "@type": "HowToStep", name: "RBAC per Service konfigurieren", text: "ServiceAccount pro Microservice anlegen. RBAC-Roles mit minimalen Rechten binden." },
              { "@type": "HowToStep", name: "Secrets per Vault injizieren", text: "Vault Agent Sidecar Injector aktivieren. Secrets nie als ENV-Variablen, sondern als gemountete Files." },
              { "@type": "HowToStep", name: "Distributed Tracing einrichten", text: "Jaeger oder Zipkin deployen. Alle Services instrumentieren für Security-Event-Korrelation." },
            ]
          }
        ]) }} />
      </div>
    </div>
  )
}
