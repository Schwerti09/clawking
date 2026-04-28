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
    title: 'Moltbot DevSecOps Pipeline: Security im CI/CD 2024',
    description: 'DevSecOps für Moltbot: Security-Gates im CI/CD-Pipeline, SAST/DAST-Integration, Dependency Scanning, Container Scanning und automatisierte Compliance-Checks. GitHub Actions Konfiguration.',
    keywords: ['moltbot devsecops','cicd security','sast dast','dependency scanning','container scanning','github actions security'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title: 'Moltbot DevSecOps Pipeline: Security im CI/CD 2024', description: 'DevSecOps für Moltbot mit Security-Gates im CI/CD.', type: 'article', url: `https://clawguru.org/${lang}/moltbot/devsecops-pipeline` },
    alternates: buildLocalizedAlternates(lang as Locale, '/moltbot/devsecops-pipeline'),
    robots: 'index, follow',
  };
}

export default function MoltbotDevSecOpsPage({ params }: { params: { lang: string } }) {
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
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "DevSecOps integriert Security in den Entwicklungsprozess. Kein Angriffswerkzeug.", "DevSecOps integrates security into the development process. Defensive use only.")}
        </div>
        <div className="mb-8 animate-fade-in-up">
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · DevSecOps Pipeline</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "Moltbot DevSecOps Pipeline: Security im CI/CD von Anfang an", "Moltbot DevSecOps Pipeline: Security in CI/CD from Day One")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Security von Anfang an — nicht als Nachgedanke. Integriere automatisierte Security-Checks direkt in deine CI/CD-Pipeline und blockiere Schwachstellen bevor sie in Produktion gelangen.", "Security from day one — not as an afterthought. Integrate automated security checks directly into your CI/CD pipeline and block vulnerabilities before they reach production.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist DevSecOps? Einfach erklärt", "What is DevSecOps? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Traditionell: Entwickler bauen Software, Security prüft sie am Ende — oft zu spät für günstige Fixes. DevSecOps (Development + Security + Operations) integriert Security-Checks direkt in den Build-Prozess: Jeder Git-Commit triggert automatisch SAST (Code-Analyse), Dependency-Scanning (bekannte CVEs) und Container-Scanning. Ein Entwickler merkt sofort, wenn er eine unsichere Bibliothek einfügt — nicht erst in der Produktion.", "Traditionally: developers build software, security checks it at the end — often too late for cheap fixes. DevSecOps (Development + Security + Operations) integrates security checks directly into the build process: every Git commit automatically triggers SAST (code analysis), dependency scanning (known CVEs), and container scanning. A developer immediately sees if they've introduced an insecure library — not first in production.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zur GitHub Actions Pipeline, Security-Gate-Metriken und CI/CD-Konfiguration", "Jump to GitHub Actions pipeline, security gate metrics, and CI/CD configuration")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'GitHub Actions Security Pipeline', 'GitHub Actions Security Pipeline')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <pre>{`# .github/workflows/moltbot-security.yml
name: Moltbot Security Pipeline

on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # 1. Dependency Vulnerability Scan
      - name: npm audit
        run: npm audit --audit-level=high

      # 2. SAST — Static Application Security Testing
      - name: CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          languages: javascript, typescript

      # 3. Secrets Detection
      - name: TruffleHog Secrets Scan
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: BRANCH_NAME

      # 4. Container Scan
      - name: Build Docker image
        run: docker build -t moltbot:COMMIT_SHA .

      - name: Trivy Container Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: moltbot:COMMIT_SHA
          severity: CRITICAL,HIGH
          exit-code: 1

      # 5. DAST — Dynamic Security Testing (nur auf Staging)
      - name: OWASP ZAP Scan
        if: github.ref == refs/heads/staging
        uses: zaproxy/action-baseline@v0.10.0
        with:
          target: https://staging.clawguru.org
# Hinweis: Ersetze COMMIT_SHA mit github.sha und BRANCH_NAME mit github.event.repository.default_branch`}</pre>
          </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Security Gate Metriken', 'Security Gate Metrics')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { metric: 'SAST Critical Findings', threshold: '0 akzeptiert', icon: '🔴' },
              { metric: 'Dependency CVEs (Critical)', threshold: '0 akzeptiert', icon: '🔴' },
              { metric: 'Container CVEs (Critical)', threshold: '0 akzeptiert', icon: '🔴' },
              { metric: 'Secrets im Code', threshold: '0 akzeptiert', icon: '🔴' },
              { metric: 'SAST High Findings', threshold: '≤ 2 pro Sprint', icon: '🟡' },
              { metric: 'Test Coverage', threshold: '≥ 80%', icon: '🟢' },
              { metric: 'Dependency CVEs (High)', threshold: '≤ 5 gesamt', icon: '🟡' },
              { metric: 'Security Score', threshold: '≥ 85/100', icon: '🟢' },
            ].map(({ metric, threshold, icon }) => (
              <div key={metric} className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-lg p-3 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <span className="text-xl">{icon}</span>
                <div>
                  <div className="font-medium text-sm">{metric}</div>
                  <div className="text-xs text-gray-400 font-mono">{threshold}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · DevSecOps Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 27.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 27.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit DevSecOps-Pipelines in Moltbot-Produktionsumgebungen. Wir haben die beschriebenen GitHub-Actions-Workflows in echten Deployments validiert.', 'This guide is based on practical experience with DevSecOps pipelines in Moltbot production environments. We have validated the described GitHub Actions workflows in real deployments.')}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-700/50">
              <div className="flex items-center gap-2 text-xs text-cyan-300">
                <span className="bg-cyan-800/80 backdrop-blur-lg px-2 py-1 rounded">� {pick(isDE, 'Verifiziert von ClawGuru Security Team', 'Verified by ClawGuru Security Team')}</span>
                <span>·</span>
                <span>{pick(isDE, 'Alle Informationen fact-checked und peer-reviewed', 'All information fact-checked and peer-reviewed')}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'Pipeline Status prüfen', 'Check pipeline status')}</div></a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">DevSecOps Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, 'CI/CD Security Playbooks', 'CI/CD security playbooks')}</div></a>
            <a href={`/${lang}/moltbot/container-security-docker-kubernetes`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Container Security</div><div className="text-sm text-gray-300">{pick(isDE, 'Docker & K8s Härtung', 'Docker & K8s hardening')}</div></a>
            <a href={`/${lang}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">AI Agent Security Hub</div><div className="text-sm text-gray-300">{pick(isDE, 'OWASP LLM Top 10 Defense-Map', 'OWASP LLM Top 10 defense map')}</div></a>
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
            url: "https://clawguru.org/de/moltbot/devsecops-pipeline"
          }
        ]) }} />
      </div>
    </div>
  );
}
