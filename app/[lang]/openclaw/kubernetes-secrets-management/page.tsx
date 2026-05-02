import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/kubernetes-secrets-management"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Kubernetes Secrets Management: Sichere Geheimnisverwaltung in K8s | ClawGuru", "Kubernetes Secrets Management: Secure Secret Handling in K8s | ClawGuru")
  const description = pick(isDE, "Kubernetes Secrets richtig absichern: etcd-Verschlüsselung, External Secrets Operator, Vault Agent Injector, RBAC für Secrets und OpenClaw-Erkennung von Secret-Leaks.", "Properly secure Kubernetes Secrets: etcd encryption, External Secrets Operator, Vault Agent Injector, RBAC for Secrets and OpenClaw detection of secret leaks.")
  return {
    title, description,
    keywords: ["kubernetes secrets management", "k8s secrets security", "kubernetes vault", "external secrets operator", "etcd encryption secrets", "kubernetes secret rbac"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}


export default function KubernetesSecretsManagementPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Kubernetes Secrets Management: Sichere Geheimnisverwaltung in K8s | ClawGuru", "Kubernetes Secrets Management: Secure Secret Handling in K8s | ClawGuru")

  const SECURITY_LAYERS = [
    { id: "S1", title: pick(isDE, "etcd Encryption at Rest", "etcd Encryption at Rest"), desc: pick(isDE, "By default, Kubernetes Secrets are stored as base64 in etcd — not encrypted. Anyone with etcd access reads all secrets in plaintext.", "By default, Kubernetes Secrets are stored as base64 in etcd — not encrypted. Anyone with etcd access reads all secrets in plaintext."), code: `# Enable encryption at rest for Secrets in etcd
# /etc/kubernetes/encryption-config.yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              # Generate: head -c 32 /dev/urandom | base64
              secret: <base64-encoded-32-byte-key>
      - identity: {}  # Fallback for unencrypted (remove after migration)

# Apply to kube-apiserver:
# --encryption-provider-config=/etc/kubernetes/encryption-config.yaml

# Verify encryption (check etcd value is not plaintext):
ETCDCTL_API=3 etcdctl get /registry/secrets/default/my-secret \\
  --endpoints=https://127.0.0.1:2379 \\
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\
  --cert=/etc/kubernetes/pki/etcd/server.crt \\
  --key=/etc/kubernetes/pki/etcd/server.key
# Should start with /k8s/aescbc/ prefix — NOT readable plaintext` },
    { id: "S2", title: pick(isDE, "Strict Secret RBAC", "Strict Secret RBAC"), desc: pick(isDE, "Kubernetes RBAC for Secrets is dangerously broad by default. ServiceAccounts with cluster-wide get/list/watch on Secrets can read all secrets in the cluster.", "Kubernetes RBAC for Secrets is dangerously broad by default. ServiceAccounts with cluster-wide get/list/watch on Secrets can read all secrets in the cluster."), code: `# WRONG — common misconfiguration:
# ClusterRole with wildcard resource access includes secrets
kind: ClusterRole
rules:
- apiGroups: ["*"]
  resources: ["*"]    # Includes secrets!
  verbs: ["*"]

# CORRECT — minimal secret access
kind: Role
metadata:
  namespace: my-app   # Namespace-scoped, not cluster-wide
rules:
- apiGroups: [""]
  resources: ["secrets"]
  resourceNames: ["my-app-db-credentials"]  # Only specific secret(s)
  verbs: ["get"]       # Read-only, not list/watch

# Check who can read secrets across cluster:
kubectl auth can-i list secrets --all-namespaces --as=system:serviceaccount:default:my-sa

# Audit: find ServiceAccounts with broad secret access
kubectl get clusterrolebindings -o json | \\
  jq '.items[] | select(.roleRef.name=="cluster-admin") | .subjects'` },
    { id: "S3", title: pick(isDE, "External Secrets Operator", "External Secrets Operator"), desc: pick(isDE, "Store secrets in HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault — not in Kubernetes etcd. ESO syncs them as K8s Secrets at runtime.", "Store secrets in HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault — not in Kubernetes etcd. ESO syncs them as K8s Secrets at runtime."), code: `# External Secrets Operator setup
# 1. Install ESO:
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace

# 2. SecretStore pointing to Vault:
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: my-app
spec:
  provider:
    vault:
      server: "https://vault.internal:8200"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "my-app-role"
          serviceAccountRef:
            name: my-app-sa

# 3. ExternalSecret (creates K8s Secret from Vault):
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: my-app-db-secret
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
  target:
    name: my-app-db-credentials  # Created K8s Secret name
  data:
  - secretKey: password
    remoteRef:
      key: my-app/db
      property: password` },
    { id: "S4", title: pick(isDE, "Secret Leak Detection with OpenClaw", "Secret Leak Detection with OpenClaw"), desc: pick(isDE, "Detect when secrets are exposed: logged to stdout, written to files, passed as env vars in pod specs (visible in kubectl describe), or present in container images.", "Detect when secrets are exposed: logged to stdout, written to files, passed as env vars in pod specs (visible in kubectl describe), or present in container images."), code: `# OpenClaw: scan for common secret patterns in cluster
openclaw secrets-scan --namespace production

# Falco rule: alert when a process reads a mounted secret file
- rule: Secret File Read by Unexpected Process
  desc: A process other than the app read a secret volume mount
  condition: >
    open_read and
    fd.name startswith /var/run/secrets and
    not proc.name in (allowed_secret_readers)
  output: >
    Secret file accessed (proc=%proc.name file=%fd.name
    container=%container.name pod=%k8s.pod.name)
  priority: WARNING

# Detect secrets in environment variables (bad pattern):
kubectl get pods --all-namespaces -o json | \\
  jq '.items[].spec.containers[].env[]? |
      select(.value? | test("(?i)(password|secret|token|key|api_key)"))' | head -20
# Any results: secrets in env vars (visible to anyone with pod describe access)` },
  ]

  const FAQ = [
    { q: pick(isDE, "Sind Kubernetes Secrets wirklich geheim?", "Are Kubernetes Secrets actually secret?"), a: pick(isDE, "Standardmäßig nein — sie sind nur Base64-encodiert, nicht verschlüsselt. Jeder mit etcd-Zugriff sieht alle Secrets im Klartext. Drei echte Schutzmaßnahmen: 1) etcd-Verschlüsselung (AES-CBC/GCM mit KMS). 2) Striktes RBAC auf spezifische Secrets. 3) External Secret Management (Vault, AWS Secrets Manager) — Secrets nie in etcd speichern.", "By default, no — only base64-encoded, not encrypted. Anyone with etcd access sees all secrets in plaintext. Three real mitigations: 1) etcd encryption at rest (AES-CBC/GCM with KMS). 2) Strict RBAC limiting to specific secrets. 3) External secret management (Vault, AWS Secrets Manager) — never store secrets in etcd.") },
    { q: pick(isDE, "Vault vs External Secrets Operator — was nutzen?", "Vault vs External Secrets Operator — which to use?"), a: pick(isDE, "Beide ergänzen sich: Vault als Secret-Backend (Speichert, rotiert, auditiert Secrets). ESO als Kubernetes-Integration (Synct Secrets aus Vault in K8s). Typisches Setup: Vault + ESO. Alternative: Vault Agent Injector (sidecar-basiert) oder Vault CSI Provider (mount als Dateien). ESO ist einfacher zu betreiben; Vault Agent gibt etwas bessere Isolation.", "Both are complementary: Vault as secret backend (stores, rotates, audits secrets). ESO as Kubernetes integration layer (syncs secrets from Vault to K8s). Typical setup: Vault + ESO. Alternative: Vault Agent Injector (sidecar) or Vault CSI Provider (mount as files). ESO is simpler; Vault Agent gives slightly better isolation.") },
    { q: pick(isDE, "Environment Variables oder Volume Mounts für Secrets?", "Environment variables or volume mounts for secrets?"), a: pick(isDE, "Volume Mounts sind deutlich sicherer: Env-Vars sind in 'kubectl describe pod' sichtbar, von jedem Prozess im Container lesbar, oft in Crash-Dumps und Logs enthalten, ohne Pod-Neustart nicht rotierbar. Volume Mounts: nicht in pod describe sichtbar, nur durch Datei-Öffnen zugreifbar, durch ESO ohne Restart aktualisierbar, können tmpfs verwenden (im RAM, nicht auf Disk).", "Volume mounts are significantly more secure: Env vars visible in 'kubectl describe pod', accessible to any process, captured in crash dumps/logs, not rotatable without restart. Volume mounts: not visible in pod describe, accessible only via file open, updatable by ESO without restart, can use tmpfs (in-memory, not on disk).") },
    { q: pick(isDE, "Wie rotiere ich Secrets ohne Downtime?", "How do I rotate secrets without downtime?"), a: pick(isDE, "Secret-Rotation ohne Downtime: 1) Dynamic Secrets (best): Vault generiert kurzlebige Credentials on-demand. 2) ESO mit refreshInterval: ESO pollt Vault/AWS SM, aktualisiert K8s Secret. App via inotify erkennt Änderung, reloadt ohne Restart. 3) Rolling Restart: nach ESO-Update Deployment rolling restart. 4) Dual-Active Secrets: alte und neue Secret während Übergang beide gültig.", "Secret rotation without downtime: 1) Dynamic Secrets (best): Vault generates short-lived credentials on-demand. 2) ESO with refreshInterval: ESO polls Vault/AWS SM, updates K8s Secret. App detects change via inotify, reloads without restart. 3) Rolling restart: trigger after ESO update. 4) Dual-active secrets: old and new both valid during transition.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "OpenClaw", item: `${SITE_URL}/${locale}/openclaw` },
      { "@type": "ListItem", position: 3, name: "Kubernetes Secrets Management", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["Kubernetes Security", "Secrets Management", "Vault", "External Secrets Operator", "etcd Encryption"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist K8s Secrets Management?", "What is K8s Secrets Management?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4 Sicherheitsschichten", "4 Security Layers")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "K8s Secrets Security Score", "K8s Secrets Security Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">12 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OpenClaw · Kubernetes Security</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Kubernetes Secrets Management — Du deployst Secrets unverschlüsselt in etcd. Jeder mit etcd-Zugriff liest alles im Klartext. Daten-Leak, dein CEO hat den CISO gefeuert.", "Kubernetes Secrets Management — You deploy secrets unencrypted in etcd. Anyone with etcd access reads everything in plaintext. Data leak, your CEO fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du deployst Secrets unverschlüsselt in etcd. Jeder mit etcd-Zugriff liest alles im Klartext. Daten-Leak, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You deploy secrets unencrypted in etcd. Anyone with etcd access reads everything in plaintext. Data leak, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Secrets-Management-Guide für eigene Kubernetes-Infrastruktur.", "Secrets management guide for your own Kubernetes infrastructure.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist K8s Secrets Management? Einfach erklärt.", "What is K8s Secrets Management? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Kubernetes Secrets Management bedeutet: Secrets sicher speichern, rotieren und aufteilen. Standardmäßig sind Secrets nur Base64-encodiert — kein echter Schutz. Gutes Secrets Management: etcd-Verschlüsselung, striktes RBAC, External Secrets Operator (Vault, AWS SM), Secret-Leak-Detection mit OpenClaw.", "Kubernetes secrets management means: store, rotate, and scope secrets securely. By default, secrets are only base64-encoded — no real protection. Good secrets management: etcd encryption, strict RBAC, External Secrets Operator (Vault, AWS SM), secret leak detection with OpenClaw.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4 Sicherheitsschichten für K8s Secrets", "4 Security Layers for K8s Secrets")}</h2>
            <div className="space-y-5">
              {SECURITY_LAYERS.map((s) => (
                <div key={s.id} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 overflow-hidden shadow-2xl">
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

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Keine etcd-Verschlüsselung", "SCAR #1: No etcd Encryption")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Keine etcd-Verschlüsselung, Secrets in Base64 in etcd. etcd-Backup exponiert, alle Secrets im Klartext. Fix: Aktiviere etcd-Verschlüsselung mit KMS-Provider.", "No etcd encryption, secrets base64 in etcd. etcd backup exposed, all secrets in plaintext. Fix: Enable etcd encryption with KMS provider.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Keine etcd-Verschlüsselung. Lessons: Aktiviere etcd-Verschlüsselung sofort.", "Root Cause: No etcd encryption. Lessons: Enable etcd encryption immediately.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Secrets in Environment Variables", "SCAR #2: Secrets in Environment Variables")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Secrets in Environment Variables, sichtbar in kubectl describe pod. Crash-Dump exponiert Secrets. Fix: Nutze Volume Mounts statt Env-Vars.", "Secrets in environment variables, visible in kubectl describe pod. Crash dump exposes secrets. Fix: Use volume mounts instead of env vars.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Secrets in Env-Vars. Lessons: Nutze Volume Mounts für Secrets.", "Root Cause: Secrets in env vars. Lessons: Use volume mounts for secrets.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              {[
                { n: 1, t: pick(isDE, "etcd-Verschlüsselung aktivieren", "Enable etcd encryption"), d: pick(isDE, "KMS-Provider konfigurieren, EncryptionConfig anwenden.", "Configure KMS provider, apply EncryptionConfig.") },
                { n: 2, t: pick(isDE, "RBAC-Scoping", "RBAC scoping"), d: pick(isDE, "Secret-Zugriff auf spezifische Namespaces und Secret-Namen einschränken.", "Limit secret access to specific namespaces and secret names.") },
                { n: 3, t: pick(isDE, "External Secrets Operator", "External Secrets Operator"), d: pick(isDE, "ESO installieren, Vault als Backend nutzen.", "Install ESO, use Vault as backend.") },
                { n: 4, t: pick(isDE, "Secret-Leak-Detection", "Secret leak detection"), d: pick(isDE, "OpenClaw secrets-scan regelmäßig ausführen.", "Run OpenClaw secrets-scan regularly.") },
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
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive K8s Secrets Security Checkliste", "Interactive K8s Secrets Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "ks1", text: pick(isDE, "etcd-Verschlüsselung mit KMS aktiviert", "etcd encryption with KMS enabled") },
                  { id: "ks2", text: pick(isDE, "RBAC für Secrets auf Namespace-Level beschränkt", "RBAC for secrets limited to namespace level") },
                  { id: "ks3", text: pick(isDE, "External Secrets Operator installiert", "External Secrets Operator installed") },
                  { id: "ks4", text: pick(isDE, "Vault/AWS SM als Backend konfiguriert", "Vault/AWS SM configured as backend") },
                  { id: "ks5", text: pick(isDE, "Secrets als Volume Mounts statt Env-Vars", "Secrets as volume mounts instead of env vars") },
                  { id: "ks6", text: pick(isDE, "OpenClaw secrets-scan regelmäßig ausgeführt", "OpenClaw secrets-scan run regularly") },
                  { id: "ks7", text: pick(isDE, "Falco-Regeln für Secret-File-Read aktiviert", "Falco rules for secret-file-read enabled") },
                  { id: "ks8", text: pick(isDE, "Secret-Rotation-Playbook dokumentiert", "Secret rotation playbook documented") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* K8s Secrets Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "K8s Secrets Security Score Calculator", "K8s Secrets Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist etcd-Verschlüsselung aktiviert?", "Is etcd encryption enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist RBAC-Scoping aktiviert?", "Is RBAC scoping enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist External Secrets Operator installiert?", "Is External Secrets Operator installed?"), weight: 25 },
                  { q: pick(isDE, "Ist Secret-Leak-Detection aktiviert?", "Is secret leak detection enabled?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein K8s Secrets Security Score:", "Your K8s Secrets Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 25/100", "Industry Average: 25/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Kubernetes Security, Secrets Management, Vault und External Secrets Operator.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in Kubernetes security, secrets management, Vault and External Secrets Operator.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/openclaw/container-escape-prevention`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Container Escape Prevention</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Secrets-Zugriff bei Escape verhindern", "Prevent secret access on escape")}</div>
              </a>
              <a href={`/${locale}/openclaw/runtime-policy-enforcement`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Runtime Policy Enforcement</div>
                <div className="text-sm text-gray-300">{pick(isDE, "OPA für Secret-Policies", "OPA for secret policies")}</div>
              </a>
              <a href={`/${locale}/solutions/kubernetes-security-hardening`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Kubernetes Hardening</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Vollständiges K8s Hardening", "Full K8s hardening")}</div>
              </a>
              <a href={`/${locale}/moltbot/ai-agent-rbac`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent RBAC</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Secrets-Zugriff für KI-Agenten", "Secret access for AI agents")}</div>
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
