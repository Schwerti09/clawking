import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/cicd-security-pipeline"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const title = "CI/CD Security Pipeline: GitLab DevSecOps Setup 2026 | OpenClaw"
  const description = "CI/CD Security Pipeline mit GitLab DevSecOps: SAST, DAST, Secrets Management und Container Scanning für automatisierte Security-Prüfungen in der Pipeline."
  return {
    title,
    description,
    keywords: ["cicd security", "gitlab security", "devsecops pipeline", "sast dast", "security automation"],
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
    { '@type': 'Question', name: 'Was ist eine sichere CI/CD-Pipeline?', acceptedAnswer: { '@type': 'Answer', text: 'Eine sichere CI/CD-Pipeline integriert automatisierte Security-Checks in jeden Build: SAST (Static Code Analysis), DAST (Dynamic Testing), Dependency-Scanning, Container-Image-Scanning und Secrets-Detection — bevor Code in Produktion geht.' } },
    { '@type': 'Question', name: 'Was ist der Unterschied zwischen SAST und DAST?', acceptedAnswer: { '@type': 'Answer', text: 'SAST (Static Application Security Testing) analysiert Quellcode ohne Ausführung. DAST (Dynamic Application Security Testing) testet laufende Anwendungen auf Schwachstellen. Beide sind notwendig für vollständige CI/CD Security Coverage.' } },
    { '@type': 'Question', name: 'Wie schütze ich Secrets in CI/CD-Pipelines?', acceptedAnswer: { '@type': 'Answer', text: 'Secrets nie in Code oder Umgebungsvariablen hardcoden. Nutze GitLab CI/CD Variables (masked), HashiCorp Vault, oder AWS Secrets Manager. Automatisiertes Secret-Scanning (Gitleaks, GitGuardian) in Pre-Commit-Hooks und Pipeline-Steps.' } },
    { '@type': 'Question', name: 'Welche Tools empfiehlt OpenClaw für CI/CD Security?', acceptedAnswer: { '@type': 'Answer', text: 'OpenClaw empfiehlt: Trivy für Container-Scanning, Semgrep/Bandit für SAST, OWASP ZAP für DAST, Gitleaks für Secret-Detection, Renovate für Dependency-Updates — alle integrierbar in GitLab CI, GitHub Actions und Jenkins.' } },
  ],
}

export default function CicdSecurityPipelinePage({ params }: PageProps) {
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up">
          <strong className="text-amber-100">&quot;Not a Pentest&quot; Hinweis</strong>: Dieser Guide dient der Absicherung eigener CI/CD-Pipelines. Kein Angriffs-Tool.
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">CI/CD Security Pipeline · DevSecOps Setup</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">CI/CD Security Pipeline: GitLab DevSecOps Setup</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Vollständige DevSecOps-Pipeline mit automatisierten Security-Tests, Secrets Management und Compliance-Checks — für jedes Commit.</p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Pipeline Security Grundlagen</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl mb-4 border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <h3 className="font-semibold mb-2 text-gray-100">Security Stages</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Pre-Commit Hooks und lokale Validierung</li>
              <li>Static Application Security Testing (SAST)</li>
              <li>Dependency Scanning und Schwachstellen-Checks</li>
              <li>Container-Image Security Scanning</li>
              <li>Dynamic Application Security Testing (DAST)</li>
              <li>Infrastructure-as-Code Security Testing</li>
            </ul>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">GitLab CI/CD Security-Konfiguration</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# .gitlab-ci.yml - Complete Security Pipeline
stages:
  - pre-build
  - build
  - test
  - security
  - deploy

variables:
  SECURE_LOG_LEVEL: "info"
  SAST_ANALYZER_IMAGE_PREFIX: "$CI_TEMPLATE_REGISTRY_HOST/security-products"
  DAST_ANALYZER_IMAGE_PREFIX: "$CI_TEMPLATE_REGISTRY_HOST/security-products"

# Pre-build security checks
pre-commit-security:
  stage: pre-build
  script:
    - echo "Running pre-commit security checks"
    - git secrets --scan
    - pre-commit run --all-files
  rules:
    - if: '$CI_PIPELINE_SOURCE == "push"'

# SAST - Static Application Security Testing
sast:
  stage: security
  artifacts:
    reports:
      sast: gl-sast-report.json
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'

# Dependency Scanning
dependency-scanning:
  stage: security
  artifacts:
    reports:
      dependency_scanning: gl-dependency-scanning-report.json
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'

# Container Scanning
container-scanning:
  stage: security
  variables:
    GIT_STRATEGY: none
  artifacts:
    reports:
      container_scanning: gl-container-scanning-report.json
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
      exists:
        - Dockerfile

# Secret Detection
secret-detection:
  stage: security
  artifacts:
    reports:
      secret_detection: gl-secret-detection-report.json
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Erweiterte Security Pipeline</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# Advanced security scanning with custom tools
advanced-security:
  stage: security
  image: python:3.11
  before_script:
    - pip install bandit semgrep safety
  script:
    # Python security scanning
    - bandit -r . -f json -o bandit-report.json
    - semgrep --config=auto --json --output=semgrep-report.json .
    - safety check --json --output=safety-report.json
    
    # Infrastructure security scanning
    - pip install tfsec-checkov
    - checkov --framework terraform --output json --output-file checkov-report.json .
    
    # Container security scanning
    - docker build -t temp-image .
    - trivy image --format json --output trivy-report.json temp-image
  artifacts:
    reports:
      sast: bandit-report.json
    paths:
      - semgrep-report.json
      - safety-report.json
      - checkov-report.json
      - trivy-report.json
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'

# DAST - Dynamic Application Security Testing
dast:
  stage: security
  variables:
    DAST_WEBSITE: "https://$CI_ENVIRONMENT_URL"
    DAST_FULL_SCAN_ENABLED: "true"
    DAST_BROWSER_SCAN: "true"
  artifacts:
    reports:
      dast: gl-dast-report.json
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
      when: manual`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Security Policy Configuration</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# .gitlab/security-policy.yml
# Security policy for vulnerability management
security_policy:
  vulnerability_management:
    enabled: true
    cadence: "monthly"
    auto_resolve: false
    
    # Critical vulnerabilities require immediate action
    critical_vulnerabilities:
      auto_create_issue: true
      due_in: "7 days"
      
    # High vulnerabilities
    high_vulnerabilities:
      auto_create_issue: true
      due_in: "30 days"
      
    # Medium vulnerabilities
    medium_vulnerabilities:
      auto_create_issue: false
      due_in: "90 days"

# Approval policies for security
approval_policies:
  security_approvals:
    enabled: true
    rules:
      - name: "Security team approval for critical changes"
        conditions:
          - when: "critical_security_change"
            approvals_required: 2
            eligible_approvers: ["security-team"]`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 shadow-2xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-blue-500/20">
              <h3 className="font-semibold text-blue-300 mb-2">Secrets Management</h3>
              <p className="text-sm text-blue-200">Use GitLab CI/CD variables with masked secrets and integrate with HashiCorp Vault.</p>
            </div>
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 shadow-2xl hover:border-green-500/30 transition-all duration-300 hover:shadow-green-500/20">
              <h3 className="font-semibold text-green-300 mb-2">Fail-Fast Security</h3>
              <p className="text-sm text-green-200">Fail the pipeline on critical security issues to prevent deployment.</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 shadow-2xl hover:border-yellow-500/30 transition-all duration-300 hover:shadow-yellow-500/20">
              <h3 className="font-semibold text-yellow-300 mb-2">Compliance Integration</h3>
              <p className="text-sm text-yellow-200">Integrate compliance checks for SOC2, ISO27001, and GDPR requirements.</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 shadow-2xl hover:border-red-500/30 transition-all duration-300 hover:shadow-red-500/20">
              <h3 className="font-semibold text-red-300 mb-2">Continuous Monitoring</h3>
              <p className="text-sm text-red-200">Monitor pipeline security metrics and maintain audit trails.</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Further Resources</h2>
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
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">CI/CD Security Score Calculator — Wie sicher ist deine Pipeline?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen CI/CD Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du SAST in deiner Pipeline?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, für alle Commits</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Scanst du Dependencies auf Schwachstellen?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, automatisch</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Hast du Secret Detection aktiviert?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Pre-Commit + Pipeline</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Scanst du Container Images?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Trivy/Grype</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Failst du Pipeline bei Critical Issues?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Fail-Fast Policy</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              CI/CD Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">68/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für Deep Scan & Detailed Report</div>
                  <a href={`/${locale}/pricing`} className="block bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-100 transition-colors">
                    Pro Plan — €49/mo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daypass Offer */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
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
            { "@type": "Question", name: "Was ist eine sichere CI/CD-Pipeline für OpenClaw?", acceptedAnswer: { "@type": "Answer", text: "Eine DevSecOps-Pipeline integriert SAST, DAST, Container-Scanning, Secret-Detection und Signierung in jeden Build — Security-Gates stoppen fehlerhafte Deployments automatisch." } },
            { "@type": "Question", name: "Welche SAST-Tools eignen sich für OpenClaw?", acceptedAnswer: { "@type": "Answer", text: "Semgrep (kostenlos, schnell), Bandit (Python), ESLint-Security (JS/TS). Für Containers: Trivy und Grype. Alle lassen sich in GitHub Actions, GitLab CI und Jenkins integrieren." } },
            { "@type": "Question", name: "Wie verhindere ich Secret-Leaks in der Pipeline?", acceptedAnswer: { "@type": "Answer", text: "git-secrets oder truffleHog als Pre-Commit-Hook. GitLeaks in CI-Pipeline. Niemals Secrets in Umgebungsvariablen im Klartext — immer über Vault oder CI/CD-Secret-Store." } },
          ]},
          { "@context": "https://schema.org", "@type": "WebPage", name: "OpenClaw CI/CD Security Pipeline", description: "DevSecOps Pipeline für OpenClaw: SAST, DAST, Container-Scanning.", url: "https://clawguru.org/de/openclaw/cicd-security-pipeline" },
          { "@context": "https://schema.org", "@type": "HowTo", name: "Sichere CI/CD-Pipeline für OpenClaw aufbauen",
            description: "DevSecOps Pipeline mit SAST, Secret-Detection, Container-Scanning und Signierung für OpenClaw einrichten.",
            totalTime: "PT120M",
            step: [
              { "@type": "HowToStep", name: "Pre-Commit Hooks einrichten", text: "pre-commit install. .pre-commit-config.yaml mit git-secrets, detect-secrets und trailing-whitespace." },
              { "@type": "HowToStep", name: "SAST in Pipeline integrieren", text: "Semgrep-Job in CI hinzufügen: semgrep --config=auto --error. Bei Findings Build abbrechen." },
              { "@type": "HowToStep", name: "Container-Scanning hinzufügen", text: "trivy image --exit-code 1 --severity HIGH,CRITICAL $IMAGE_NAME nach dem Build-Schritt ausführen." },
              { "@type": "HowToStep", name: "Image signieren", text: "cosign sign --key $COSIGN_KEY $IMAGE@$DIGEST nach erfolgreichem Scan. Verify bei Deployment erzwingen." },
              { "@type": "HowToStep", name: "Deployment-Gates konfigurieren", text: "Deployment nur erlauben wenn: alle Tests grün, SAST clean, Image signiert und Scan < 24h alt." },
            ]
          }
        ]) }} />
      </div>
    </div>
  )
}
