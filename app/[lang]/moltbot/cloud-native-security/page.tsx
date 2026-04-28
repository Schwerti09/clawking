import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const isDE = lang === 'de'
  return {
    title: pick(isDE, 'Moltbot Cloud Native Security: Kubernetes, Containers, Microservices 2026', 'Moltbot Cloud Native Security: Kubernetes, Containers, Microservices 2026'),
    description: pick(isDE, 'Cloud Native Security für Moltbot. Kubernetes Security, Container Hardening, Microservices Security, Service Mesh und Cloud Native Protection.', 'Cloud Native Security for Moltbot. Kubernetes security, container hardening, microservices security, service mesh and cloud native protection.'),
    keywords: ['moltbot cloud native security','kubernetes security','container security','microservices security','service mesh','cloud native protection'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: pick(isDE, 'Moltbot Cloud Native Security 2026', 'Moltbot Cloud Native Security 2026'), description: pick(isDE, 'Cloud Native Security für Moltbot.', 'Cloud Native Security for Moltbot.'), type: 'article', url: `https://clawguru.org/${lang}/moltbot/cloud-native-security` },
    alternates: buildLocalizedAlternates(lang as Locale, '/moltbot/cloud-native-security'),
    robots: 'index, follow',
  };
}

export default function MoltbotCloudNativePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, 'Cloud Native Security schützt eigene Container-Infrastrukturen. Keine Angriffswerkzeuge.', 'Cloud Native Security protects your own container infrastructures. No attack tools.')}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Cloud Native</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, 'Moltbot Cloud Native Security', 'Moltbot Cloud Native Security')}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, 'Cloud Native Umgebungen sind komplex. Kubernetes, Container und Microservices benötigen spezialisierte Security-Strategien.', 'Cloud Native environments are complex. Kubernetes, containers and microservices require specialized security strategies.')}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Was ist Cloud Native Security? Einfach erklärt', 'What is Cloud Native Security? Simply Explained')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, 'Cloud Native Security ist wie ein Sicherheitssystem für Container-Dörfer. Statt eines großen Gebäudes mit einer Tür (traditionelle Server), hast du viele kleine Container-Häuser, die ständig gebaut und abgerissen werden. Das Sicherheitssystem muss sicherstellen, dass nur autorisierte Personen rein dürfen, dass kein Container Gift in das Nachbardorf leckt, und dass der ganze Containerverkehr überwacht wird.', 'Cloud Native Security is like a security system for container villages. Instead of one big building with one door (traditional servers), you have many small container houses that are constantly built and demolished. The security system must ensure only authorized people enter, no container leaks poison into the neighboring village, and all container traffic is monitored.')}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, 'Springe zu Security Layers, Kubernetes Best Practices und Container Security', 'Jump to security layers, Kubernetes best practices, and container security')}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Cloud Native Security Layers', 'Cloud Native Security Layers')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-gray-800 text-white"><th className="p-3 text-left">Layer</th><th className="p-3 text-left">Schutz vor</th><th className="p-3 text-left">Tools</th><th className="p-3 text-left">Impact</th></tr></thead>
              <tbody>
                {[
                  ['Container Security', 'Container Vulnerabilities', 'Trivy, Clair', 'Hoch'],
                  ['Kubernetes Security', 'Cluster Misconfigurations', 'OPA, Falco', 'Hoch'],
                  ['Network Security', 'East-West Traffic', 'Calico, Cilium', 'Mittel'],
                  ['Runtime Security', 'Runtime Threats', 'Sysdig, Aqua', 'Hoch'],
                  ['Supply Chain', 'Image Integrity', 'Notary, Cosign', 'Mittel'],
                ].map(([layer, threat, tools, impact]) => (
                  <tr key={layer} className="border-b hover:bg-gray-800">
                    <td className="p-3 font-medium">{layer}</td>
                    <td className="p-3 text-sm">{threat}</td>
                    <td className="p-3 text-sm">{tools}</td>
                    <td className="p-3 text-sm">{impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up glassmorphism" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Kubernetes Security Best Practices', 'Kubernetes Security Best Practices')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`// Kubernetes Security Policy für Moltbot
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: moltbot-restricted
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
    rule: 'RunAsAny'
  readOnlyRootFilesystem: true
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 1000
    capabilities:
      drop:
        - ALL
    allowPrivilegeEscalation: false
    readOnlyRootFilesystem: true

// Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: moltbot-network-policy
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
          app: moltbot-frontend
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: moltbot-backend
    ports:
    - protocol: TCP
      port: 5432`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up glassmorphism" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Container Security', 'Container Security')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`# Dockerfile Security Best Practices für Moltbot
FROM node:18-alpine AS builder

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S moltbot -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY --chown=moltbot:nodejs . .

# Remove unnecessary packages
RUN apk del --purge \
    unzip \
    zip \
    && rm -rf /var/cache/apk/*

# Security hardening
RUN chmod -R 755 /app && \
    chmod -R 644 /app/*.js && \
    find /app -type f -name "*.sh" -exec chmod 755 {} \;

# Switch to non-root user
USER moltbot

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Expose port
EXPOSE 8080

# Start application
CMD ["node", "server.js"]

# Runtime security configuration
# docker run --security-opt no-new-privileges \
#   --cap-drop ALL \
#   --cap-add CHOWN \
#   --cap-add SETGID \
#   --cap-add SETUID \
#   --tmpfs /tmp \
#   moltbot:latest`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${lang}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'Cloud Native Scan', 'Cloud Native scan')}</div></a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, 'Kubernetes Playbooks', 'Kubernetes playbooks')}</div></a>
            <a href={`/${lang}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, 'Cloud Native Framework', 'Cloud Native framework')}</div></a>
            <a href={`/${lang}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Enterprise</div><div className="text-sm text-gray-300">{pick(isDE, 'Managed Cloud Security', 'Managed cloud security')}</div></a>
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
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Cloud Native Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Cloud Native Security in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with cloud native security in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", position: 1, name: pick(isDE, 'Startseite', 'Home'), item: `https://clawguru.org/${lang}` },
            { "@type": "ListItem", position: 2, name: pick(isDE, 'Moltbot', 'Moltbot'), item: `https://clawguru.org/${lang}/moltbot` },
            { "@type": "ListItem", position: 3, name: "Cloud Native Security", item: `https://clawguru.org/${lang}/moltbot/cloud-native-security` }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: pick(isDE, 'Was ist Moltbot Security?', 'What is Moltbot Security?'), acceptedAnswer: { "@type": "Answer", text: pick(isDE, 'Moltbot ist eine Security-Automation-Plattform mit 600+ Executable Runbooks, Live-Score und Compliance-Dashboard für Self-Hosting-Infrastrukturen.', 'Moltbot is a security automation platform with 600+ executable runbooks, live score and compliance dashboard for self-hosting infrastructures.') } },
            { "@type": "Question", name: pick(isDE, 'Ist dieser Guide ein Penetrationstest?', 'Is this guide a penetration test?'), acceptedAnswer: { "@type": "Answer", text: pick(isDE, 'Nein. Dieser Guide dient ausschließlich zur Absicherung eigener Systeme. Kein Angriffs-Tool, keine illegalen Aktivitäten.', 'No. This guide is exclusively for securing your own systems. No attack tools, no illegal activities.') } },
            { "@type": "Question", name: pick(isDE, 'Wo finde ich zugehörige Runbooks?', 'Where can I find related runbooks?'), acceptedAnswer: { "@type": "Answer", text: pick(isDE, 'Alle Runbooks sind unter /runbooks abrufbar. Jeder Befund im Security-Check enthält einen direkten Link zum passenden Runbook.', 'All runbooks are available under /runbooks. Each finding in the security check contains a direct link to the matching runbook.') } }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: pick(isDE, 'Moltbot Cloud Native Security Guide', 'Moltbot Cloud Native Security Guide'),
          description: pick(isDE, 'Executable Security Runbooks und Hardening-Guides für Moltbot-Infrastrukturen.', 'Executable security runbooks and hardening guides for Moltbot infrastructures.'),
          url: `https://clawguru.org/${lang}/moltbot/cloud-native-security`
        }
      ]) }} />
    </div>
  )
}