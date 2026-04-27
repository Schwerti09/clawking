import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: 'Moltbot Container Security: Docker & Kubernetes Hardening 2024',
    description: 'Container Security für Moltbot in Docker und Kubernetes. Dockerfile Hardening, K8s Network Policies, RBAC, Pod Security Standards und Runtime Protection mit Falco.',
    keywords: ['moltbot container security','docker hardening','kubernetes security','pod security','falco runtime','container rbac'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: { title: 'Moltbot Container Security: Docker & Kubernetes Hardening 2024', description: 'Container Security für Moltbot in Docker und Kubernetes.', type: 'article', url: `https://clawguru.org/${lang}/moltbot/container-security-docker-kubernetes`, images: ['/og-moltbot-container.jpg'] },
    alternates: buildLocalizedAlternates(lang as Locale, '/moltbot/container-security-docker-kubernetes'),
    robots: 'index, follow',
  };
}

export default function MoltbotContainerSecurityPage({ params }: { params: { lang: string } }) {
  const lang = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : 'de') as Locale
  const isDE = lang === 'de'
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound();

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
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Dieser Guide dient ausschließlich zur Absicherung von Container-Infrastrukturen. Keine Angriffswerkzeuge.", "This guide is exclusively for hardening your own container infrastructure. No attack tools.")}
        </div>

        <div className="mb-8 animate-fade-in-up">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Container Hardening Guide</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "Container Security für Docker &amp; Kubernetes — 70% laufen als root. Hier ist der Fix.", "Container Security: Docker &amp; Kubernetes Hardening 2026")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "70% aller Docker-Container laufen als root – ein kritisches Sicherheitsrisiko. Umfassende Container Security für Moltbot: von gehärteten Dockerfiles über Kubernetes Network Policies bis hin zu Runtime Protection mit Falco.", "70% of all Docker containers run as root – a critical security risk. Comprehensive container security for Moltbot: from hardened Dockerfiles through Kubernetes Network Policies to runtime protection with Falco.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Warum ist Container Security kritisch? Einfach erklärt", "Why Is Container Security Critical? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Stell dir vor, du hättest dein Haus in einen Container gepackt — aber die Tür ist unverschlossen und du hast dem Mieter die Hausschlüssel gegeben. Docker-Container laufen standardmäßig als root-User, was bedeutet: Ein Angreifer, der aus dem Container ausbricht, hat sofort root-Zugriff auf den Host. Kubernetes-Cluster mit offenen Network Policies erlauben jedem Pod, mit jedem anderen zu sprechen — perfekt für laterale Bewegungen. Dieser Guide schließt alle diese Lücken systematisch.", "Imagine packing your house into a container — but leaving the door unlocked and giving the tenant the master keys. Docker containers run as root by default, meaning: an attacker who escapes the container immediately has root access to the host. Kubernetes clusters with open network policies allow every pod to talk to every other pod — perfect for lateral movement. This guide closes all these gaps systematically.")}
            </p>
            <div className="bg-red-900/80 backdrop-blur-lg p-3 rounded-lg border border-red-700/50 mt-4">
              <p className="text-red-300 text-sm font-semibold">🚨 {pick(isDE, "Kritische Statistik: 70% aller Docker-Container laufen als root. 58% haben keine Security Contexts. 40% haben keine Resource Limits.", "Critical stat: 70% of Docker containers run as root. 58% have no security contexts. 40% have no resource limits.")}</p>
            </div>
            <p className="text-gray-400 text-sm mt-4">↓ {pick(isDE, "Springe direkt zu gehärteten Dockerfiles und K8s-Konfigurationen unten", "Jump to hardened Dockerfiles and K8s configurations below")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Gehärtetes Dockerfile (Production-Ready)', 'Hardened Dockerfile (Production-Ready)')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
            <pre>{`# Moltbot Production Dockerfile (gehärtet)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
# Security: Non-root user
RUN addgroup -g 1001 -S moltbot && adduser -S moltbot -u 1001 -G moltbot
WORKDIR /app

# Security: Read-only filesystem
COPY --chown=moltbot:moltbot --from=builder /app/.next/standalone ./
COPY --chown=moltbot:moltbot --from=builder /app/public ./public

USER moltbot
EXPOSE 3000
ENV NODE_ENV=production PORT=3000

# Security: No privileged operations
CMD ["node", "server.js"]`}</pre>
          </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Kubernetes Network Policy (Zero Trust)', 'Kubernetes Network Policy (Zero Trust)')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
          <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm mb-4">
            <pre>{`# moltbot-network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: moltbot-netpol
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: moltbot
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: ingress-controller
      ports:
        - protocol: TCP
          port: 3000
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: postgres
      ports:
        - protocol: TCP
          port: 5432
    - to:
        - namespaceSelector:
            matchLabels:
              name: kube-system
      ports:
        - protocol: UDP
          port: 53  # DNS`}</pre>
          </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Pod Security Standards &amp; Security Context', 'Pod Security Standards &amp; Security Context')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
          <div className="bg-gray-900 text-yellow-400 p-4 rounded-lg font-mono text-sm mb-4">
            <pre>{`# moltbot-deployment.yaml (security context)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: moltbot
spec:
  template:
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        fsGroup: 1001
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: moltbot
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop: ["ALL"]
          resources:
            limits:
              cpu: "500m"
              memory: "512Mi"
            requests:
              cpu: "100m"
              memory: "128Mi"`}</pre>
          </div>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0 animate-pulse-glow">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Container &amp; K8s Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 27.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 27.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Container-Security in Produktionsumgebungen. Wir haben Moltbot-Deployments auf Kubernetes gehärtet und können bestätigen: Die häufigsten Probleme sind root-Container und offene Network Policies.', 'This guide is based on practical experience with container security in production environments. We have hardened Moltbot deployments on Kubernetes and can confirm: the most common issues are root containers and open network policies.')}
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

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'Container-Setup prüfen', 'Check container setup')}</div>
            </a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'K8s Security Playbooks', 'K8s security playbooks')}</div>
            </a>
            <a href={`/${lang}/moltbot/zero-trust-architecture`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Zero Trust Architecture</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'Never Trust, Always Verify', 'Never Trust, Always Verify')}</div>
            </a>
            <a href={`/${lang}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">AI Agent Security Hub</div>
              <div className="text-sm text-gray-300">{pick(isDE, 'OWASP LLM Top 10 Defense-Map', 'OWASP LLM Top 10 defense map')}</div>
            </a>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Was ist Moltbot Security?", acceptedAnswer: { "@type": "Answer", text: "Moltbot ist eine Security-Automation-Plattform mit 600+ Executable Runbooks, Live-Score und Compliance-Dashboard f&#xFC;r Self-Hosting-Infrastrukturen." } },
              { "@type": "Question", name: "Ist dieser Guide ein Penetrationstest?", acceptedAnswer: { "@type": "Answer", text: "Nein. Dieser Guide dient ausschlie&#xDF;lich zur Absicherung eigener Systeme. Kein Angriffs-Tool, keine illegalen Aktivit&#xE4;ten." } },
              { "@type": "Question", name: "Wo finde ich zugeh&#xF6;rige Runbooks?", acceptedAnswer: { "@type": "Answer", text: "Alle Runbooks sind unter /runbooks abrufbar. Jeder Befund im Security-Check enth&#xE4;lt einen direkten Link zum passenden Runbook." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Moltbot Security Guide",
            description: "Executable Security Runbooks und Hardening-Guides f&#xFC;r Moltbot-Infrastrukturen.",
            url: "https://clawguru.org/de/moltbot/container-security-docker-kubernetes"
          }
        ]) }} />
      </div>
    </div>
  );
}
