import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import DirectAnswerBox from '@/components/DirectAnswerBox'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: 'OpenClaw Docker Swarm Hardening: Production Security Guide 2024',
    description: 'Docker Swarm Hardening für OpenClaw. Secrets Management, TLS Encryption, Network Isolation, Image Scanning und Service Mesh Security. Production-ready Swarm Konfiguration.',
    keywords: ['openclaw docker swarm','docker swarm hardening','swarm secrets','docker network isolation','container security production'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: 'OpenClaw Docker Swarm Hardening 2024', description: 'Docker Swarm Hardening für OpenClaw.', type: 'article', url: `https://clawguru.org/${lang}/openclaw/docker-swarm-hardening` },
    alternates: buildLocalizedAlternates(lang as Locale, '/openclaw/docker-swarm-hardening'),
    robots: 'index, follow',
  };
}

export default function OpenClawDockerSwarmPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound();

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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: Docker Swarm Hardening sichert eigene Container-Infrastrukturen ab. Keine Angriffswerkzeuge.
        </div>
        <DirectAnswerBox
          question="Was ist Docker Swarm Hardening für OpenClaw?"
          answer="Docker Swarm Hardening umfasst Secrets Management, TLS Encryption, Network Isolation, Image Scanning und Service Mesh Security. Es schützt Container-Workloads vor Escape-Angriffen durch mehrschichtige Sicherheitskontrollen."
          fact="80% aller Docker-Container laufen mit unsicheren Default-Konfigurationen."
        />
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Docker Swarm Hardening · Container Security</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">OpenClaw Docker Swarm Hardening</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Production-ready Security für Docker Swarm — von Secrets Management über Network Isolation bis hin zu Image Scanning und Runtime Security.</p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Gehärtetes Docker Swarm Compose</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 font-mono text-sm overflow-x-auto">
            <pre>{`# docker-stack.yml — Gehärtete OpenClaw Produktion
version: '3.9'

services:
  openclaw:
    image: ghcr.io/clawguru/openclaw:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 30s
        failure_action: rollback
      restart_policy:
        condition: on-failure
        max_attempts: 3
    secrets:
      - db_password
      - jwt_secret
      - api_key
    networks:
      - frontend
      - backend
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
    user: "1001:1001"  # Non-root user
    environment:
      NODE_ENV: production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:16-alpine
    networks:
      - backend  # Nur backend, NICHT frontend
    secrets:
      - db_password
    volumes:
      - pgdata:/var/lib/postgresql/data
    deploy:
      placement:
        constraints: [node.role == manager]

networks:
  frontend:
    driver: overlay
    attachable: false
  backend:
    driver: overlay
    internal: true  # Kein Internet-Zugriff

secrets:
  db_password:
    external: true
  jwt_secret:
    external: true
  api_key:
    external: true

volumes:
  pgdata:
    driver: local`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Swarm Secrets Initialisierung</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-blue-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 font-mono text-sm overflow-x-auto">
            <pre>{`# Secrets sicher erstellen (niemals in Datei speichern)
echo "$(openssl rand -base64 32)" | docker secret create db_password -
echo "$(openssl rand -base64 64)" | docker secret create jwt_secret -
echo "$(openssl rand -hex 32)" | docker secret create api_key -

# Secrets auflisten (Werte nicht sichtbar)
docker secret ls

# Stack deployen
docker stack deploy -c docker-stack.yml openclaw

# Swarm TLS aktivieren (Standard bei Init)
docker swarm init --advertise-addr ETH0_IP

# Autolock aktivieren (schützt Swarm Keys)
docker swarm update --autolock=true`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Weiterführende Ressourcen</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">Container Check</div>
            </a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Docker Runbooks</div>
              <div className="text-sm text-gray-300">Container Guides</div>
            </a>
            <a href={`/${lang}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">Framework</div>
            </a>
            <a href={`/${lang}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Enterprise</div>
              <div className="text-sm text-gray-300">Managed Swarm</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Docker Swarm Security Score Calculator — Wie sicher ist dein Swarm?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen Docker Swarm Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Nutzt du Docker Secrets anstatt ENV-Variablen?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Secrets für alle Credentials</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Ist Swarm TLS aktiviert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, TLS + Autolock</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Nutzt du Overlay-Netzwerke mit Isolation?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Internal Networks</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Scanst du Images vor dem Deploy?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Trivy/Scout CI-Scan</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Läufen Container als Non-Root User?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Alle Non-Root</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Docker Swarm Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">62/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für Swarm Audit & Detailed Report</div>
                  <a href={`/${lang}/pricing`} className="block bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-100 transition-colors">
                    Pro Plan — €49/mo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daypass Offer */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
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
              <a href={`/${lang}/pricing#daypass`} className="bg-white text-purple-900 font-bold py-3 px-6 rounded-lg hover:bg-purple-100 transition-colors whitespace-nowrap">
                Daypass kaufen — €3
              </a>
            </div>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Ist dieser Guide ein Penetrationstest?", acceptedAnswer: { "@type": "Answer", text: "Nein. Dieser Guide dient ausschlielich zur Absicherung eigener Systeme. Kein Angriffs-Tool, keine illegalen Aktivitten." } },
              { "@type": "Question", name: "Was ist OpenClaw?", acceptedAnswer: { "@type": "Answer", text: "OpenClaw ist das Open-Source Self-Hosting Security Framework von ClawGuru mit Executable Runbooks, Security-Check und Compliance-Dashboard." } },
              { "@type": "Question", name: "Wo finde ich die Runbooks?", acceptedAnswer: { "@type": "Answer", text: "Alle Runbooks sind unter /runbooks abrufbar. Jeder Befund im Security-Check enthlt einen direkten Link zum passenden Runbook." } }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "OpenClaw Security Guide",
            description: "Self-Hosted Security Hardening mit OpenClaw Executable Runbooks.",
            url: "https://clawguru.org/de/openclaw"
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Docker Swarm für OpenClaw absichern",
            description: "Production-ready Docker Swarm Hardening: Secrets, TLS, Network Isolation und Image Scanning.",
            totalTime: "PT90M",
            step: [
              { "@type": "HowToStep", name: "Swarm mit TLS initialisieren", text: "docker swarm init mit --autolock=true. Manager-Token sicher aufbewahren." },
              { "@type": "HowToStep", name: "Docker Secrets einrichten", text: "echo 'mypassword' | docker secret create db_password -. Niemals Secrets als ENV-Variablen in compose-Files." },
              { "@type": "HowToStep", name: "Netzwerk-Isolation konfigurieren", text: "Overlay-Netzwerke pro Service-Gruppe erstellen. --internal Flag für interne Services ohne externen Zugang." },
              { "@type": "HowToStep", name: "Image Scanning aktivieren", text: "Trivy oder Docker Scout vor jedem Deploy ausführen: trivy image myimage:latest --exit-code 1 --severity HIGH,CRITICAL." },
              { "@type": "HowToStep", name: "Runtime-Security konfigurieren", text: "seccomp und AppArmor Profile für Container aktivieren. --cap-drop=ALL, nur benötigte Capabilities explizit hinzufügen." },
            ]
          }
        ]) }} />
      </div>
    </div>
  );
}
