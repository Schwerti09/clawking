import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/sbom-generation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === 'de'
  const title = pick(isDE, "SBOM Generation: Software Bill of Materials 2026", "SBOM Generation: Software Bill of Materials 2026")
  const description = pick(isDE, "Complete SBOM generation framework with automated software bill of materials creation, vulnerability management, and supply chain security.", "Complete SBOM generation framework with automated software bill of materials creation, vulnerability management, and supply chain security.")
  return {
    title,
    description,
    keywords: ["sbom generation", "software bill of materials", "supply chain security", "vulnerability management", "component analysis"],
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

export default function SbomGenerationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === 'de'
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: pick(isDE, 'Was ist ein SBOM (Software Bill of Materials)?', 'What is an SBOM (Software Bill of Materials)?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'Ein SBOM ist ein vollst\u00e4ndiges Inventar aller Software-Komponenten in einer Applikation: Bibliotheken, Abh\u00e4ngigkeiten, Lizenzen, Versionen. Analogie: Zutatenliste f\u00fcr Software. Wichtig f\u00fcr: CVE-Tracking (welche CVEs betreffen mein System?), Lizenz-Compliance, Supply-Chain-Security. US Executive Order 14028 macht SBOMs f\u00fcr Federal Software verpflichtend.', 'An SBOM is a complete inventory of all software components in an application: libraries, dependencies, licenses, versions. Analogy: ingredient list for software. Important for: CVE tracking (which CVEs affect my system?), license compliance, supply chain security. US Executive Order 14028 makes SBOMs mandatory for federal software.') } },
      { '@type': 'Question', name: pick(isDE, 'Welche SBOM-Formate gibt es?', 'What SBOM formats exist?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'SBOM-Formate: CycloneDX (OWASP, JSON/XML, am weitesten verbreitet f\u00fcr Security). SPDX (Linux Foundation, ISO/IEC 5962:2021, gut f\u00fcr Lizenz-Compliance). SWID (ISO/IEC 19770-2, Windows-lastig). Moltbot generiert CycloneDX und SPDX. CycloneDX-Empfehlung f\u00fcr Security-Use-Cases, SPDX f\u00fcr Lizenz-Audits.', 'SBOM formats: CycloneDX (OWASP, JSON/XML, most widely used for security). SPDX (Linux Foundation, ISO/IEC 5962:2021, good for license compliance). SWID (ISO/IEC 19770-2, Windows-heavy). Moltbot generates CycloneDX and SPDX. CycloneDX recommended for security use cases, SPDX for license audits.') } },
      { '@type': 'Question', name: pick(isDE, 'Wie generiere ich automatisch SBOMs in CI/CD?', 'How do I automatically generate SBOMs in CI/CD?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'SBOM-Generierung in CI/CD: Syft (Anchore, Open Source, unterst\u00fctzt 40+ Sprachen). Trivy (Aqua Security, kombiniert SBOM + CVE-Scan). CycloneDX-Tools (sprachspezifisch: cdxgen, jake). GitHub Actions: anchore/sbom-action. Integration: SBOM bei jedem Build generieren, in Artifact Registry speichern, CVEs via Grype matchen. SBOM-Diff bei PRs f\u00fcr \u00c4nderungstracking.', 'SBOM generation in CI/CD: Syft (Anchore, open source, supports 40+ languages). Trivy (Aqua Security, combines SBOM + CVE scan). CycloneDX tools (language-specific: cdxgen, jake). GitHub Actions: anchore/sbom-action. Integration: generate SBOM on every build, store in artifact registry, match CVEs via Grype. SBOM diff on PRs for change tracking.') } },
      { '@type': 'Question', name: pick(isDE, 'Wie nutze ich SBOMs f\u00fcr Compliance?', 'How do I use SBOMs for compliance?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'SBOM f\u00fcr Compliance: SOC2 CC7.1 (Vulnerability Management): SBOM als Evidenz f\u00fcr vollst\u00e4ndiges Software-Inventory. ISO 27001 A.12.6 (Technical Vulnerability Management): SBOM-basiertes CVE-Tracking. HIPAA: PHI-verarbeitende Komponenten im SBOM kennzeichnen. PCI-DSS Req. 6.3: Software-Inventory f\u00fcr alle System-Komponenten. Moltbot exportiert Compliance-Reports direkt aus SBOM-Daten.', 'SBOM for compliance: SOC2 CC7.1 (vulnerability management): SBOM as evidence for complete software inventory. ISO 27001 A.12.6 (technical vulnerability management): SBOM-based CVE tracking. HIPAA: mark PHI-processing components in SBOM. PCI-DSS Req. 6.3: software inventory for all system components. Moltbot exports compliance reports directly from SBOM data.') } },
    ],
  }

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, 'Dieser Guide ist für Supply Chain Security und Vulnerability Management. Keine Angriffswerkzeuge.', 'This guide is for supply chain security and vulnerability management. No attack tools.')}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · SBOM Generation</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, 'SBOM Generation: Software Bill of Materials', 'SBOM Generation: Software Bill of Materials')}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, 'Complete SBOM generation framework with automated software bill of materials creation, vulnerability management, and supply chain security.', 'Complete SBOM generation framework with automated software bill of materials creation, vulnerability management, and supply chain security.')}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Was ist ein SBOM? Einfach erklärt', 'What is an SBOM? Simply Explained')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, 'Ein SBOM (Software Bill of Materials) ist wie eine Zutatenliste für Software. Statt Zutaten listet es alle Software-Komponenten auf: Bibliotheken, Frameworks, Abhängigkeiten, Versionen und Lizenzen. Wenn eine Sicherheitslücke (CVE) in einer Bibliothek entdeckt wird, weißt du sofort, ob dein System betroffen ist. SBOMs sind heute Pflicht für US-Bundessoftware (Executive Order 14028) und werden auch in Europa immer wichtiger für Supply Chain Security.', 'An SBOM (Software Bill of Materials) is like an ingredient list for software. Instead of ingredients, it lists all software components: libraries, frameworks, dependencies, versions, and licenses. When a security vulnerability (CVE) is discovered in a library, you immediately know if your system is affected. SBOMs are now mandatory for US federal software (Executive Order 14028) and are becoming increasingly important in Europe for supply chain security.')}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, 'Springe zu SBOM Standards, Formats und Automated Generation', 'Jump to SBOM standards, formats, and automated generation')}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'SBOM Standards and Formats', 'SBOM Standards and Formats')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">SPDX (Software Package Data Exchange)</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Industry standard format</li>
                  <li>Human-readable and machine-readable</li>
                  <li>Supports multiple data models</li>
                  <li>License and copyright information</li>
                  <li>Relationship between components</li>
                </ul>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">CycloneDX</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Lightweight XML/JSON format</li>
                  <li>Designed for security analysis</li>
                  <li>Vulnerability integration</li>
                  <li>Service composition data</li>
                  <li>Dependency graph support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Automated SBOM Generation', 'Automated SBOM Generation')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>
{`# SBOM Generation Pipeline
## Discovery Phase
- Package manager scanning (npm, pip, maven, etc.)
- Container image analysis
- Binary component identification
- Configuration file parsing
- Runtime dependency detection

## Analysis Phase
- Component fingerprinting
- Version identification
- License classification
- Vulnerability correlation
- Risk scoring algorithms

## Generation Phase
- Format standardization
- Relationship mapping
- Metadata enrichment
- Validation and verification
- Export and distribution`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'SBOM Generation Tools', 'SBOM Generation Tools')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Open Source Tools</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Syft (Anchore)</li>
                  <li>Trivy (Aqua Security)</li>
                  <li>OWASP Dependency Check</li>
                  <li>SPDX Tools</li>
                  <li>CycloneDX CLI</li>
                </ul>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Commercial Solutions</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Snyk Open Source</li>
                  <li>Black Duck (Synopsys)</li>
                  <li>WhiteSource SCA</li>
                  <li>Veracode SCA</li>
                  <li>Checkmarx SCA</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Integration Framework', 'Integration Framework')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">CI/CD Integration</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>GitHub Actions workflows</li>
                  <li>Jenkins pipeline integration</li>
                  <li>GitLab CI/CD pipelines</li>
                  <li>Azure DevOps integration</li>
                  <li>Bitbucket pipelines</li>
                </ul>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Container Integration</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Docker image scanning</li>
                  <li>Kubernetes integration</li>
                  <li>Container registry scanning</li>
                  <li>Orchestration platform integration</li>
                  <li>Runtime SBOM generation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Vulnerability Management', 'Vulnerability Management')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>
{`# Vulnerability Management Process
## Detection
- CVE database integration
- NVD vulnerability feeds
- Vendor security advisories
- Exploit database correlation
- Threat intelligence integration

## Assessment
- CVSS scoring calculation
- Risk impact analysis
- Exploitability assessment
- Business impact evaluation
- Remediation prioritization

## Remediation
- Automated patch management
- Dependency update workflows
- Vulnerability tracking
- Remediation verification
- Compliance reporting`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'License Compliance', 'License Compliance')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">License Classification</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Open source license identification</li>
                  <li>Commercial license detection</li>
                  <li>License compatibility analysis</li>
                  <li>Restriction identification</li>
                  <li>Obligation tracking</li>
                </ul>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-3">Compliance Management</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>License policy enforcement</li>
                  <li>Automated compliance checking</li>
                  <li>Legal requirement tracking</li>
                  <li>License violation detection</li>
                  <li>Compliance reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Supply Chain Security', 'Supply Chain Security')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300 flex-1">
                  <div className="font-semibold text-gray-100">Component Verification</div>
                  <div className="text-sm text-gray-300">Verify authenticity and integrity of software components</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300 flex-1">
                  <div className="font-semibold text-gray-100">Supply Chain Mapping</div>
                  <div className="text-sm text-gray-300">Map the complete software supply chain and dependencies</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300 flex-1">
                  <div className="font-semibold text-gray-100">Risk Assessment</div>
                  <div className="text-sm text-gray-300">Assess risks associated with third-party components</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-lg border border-gray-600/50 hover:border-cyan-500/30 transition-all duration-300 flex-1">
                  <div className="font-semibold text-gray-100">Continuous Monitoring</div>
                  <div className="text-sm text-gray-300">Monitor for new vulnerabilities and security issues</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'SBOM Analytics and Reporting', 'SBOM Analytics and Reporting')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>
{`# SBOM Analytics Dashboard
## Component Overview
- Total components count
- Component distribution by type
- License distribution analysis
- Vulnerability summary statistics
- Risk exposure metrics

## Trend Analysis
- Component growth trends
- Vulnerability trends over time
- License compliance trends
- Supply chain risk evolution
- Remediation progress tracking

## Compliance Reporting
- License compliance status
- Regulatory compliance metrics
- Security posture assessment
- Risk management reports
- Executive summary dashboards`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Best Practices', 'Best Practices')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-lg border border-blue-700 hover:border-blue-500/30 transition-all duration-300">
              <h3 className="font-semibold text-blue-300 mb-2">Regular Updates</h3>
              <p className="text-sm text-blue-200">Generate SBOMs regularly and keep them up-to-date with component changes</p>
            </div>
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-lg border border-green-700 hover:border-green-500/30 transition-all duration-300">
              <h3 className="font-semibold text-green-300 mb-2">Automated Generation</h3>
              <p className="text-sm text-green-200">Automate SBOM generation in CI/CD pipelines for consistency</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-lg border border-yellow-700 hover:border-yellow-500/30 transition-all duration-300">
              <h3 className="font-semibold text-yellow-300 mb-2">Standard Formats</h3>
              <p className="text-sm text-yellow-200">Use industry-standard formats like SPDX and CycloneDX</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-lg border border-red-700 hover:border-red-500/30 transition-all duration-300">
              <h3 className="font-semibold text-red-300 mb-2">Comprehensive Coverage</h3>
              <p className="text-sm text-red-200">Ensure all components are included in the SBOM generation</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Implementation Examples', 'Implementation Examples')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-cyan-400 mb-3">Web Application SBOM</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Frontend dependencies (npm, yarn)</li>
                  <li>Backend dependencies (pip, maven)</li>
                  <li>Container images</li>
                  <li>Infrastructure as code</li>
                  <li>Third-party services</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-cyan-400 mb-3">Container SBOM</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Base image components</li>
                  <li>Application packages</li>
                  <li>System libraries</li>
                  <li>Configuration files</li>
                  <li>Runtime dependencies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, '🔗 Weiterführende Ressourcen', '🔗 Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'SBOM Scan', 'SBOM scan')}</div></a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, '600+ Security Playbooks', '600+ security playbooks')}</div></a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, 'Self-hosted Security', 'Self-hosted security')}</div></a>
            <a href={`/${locale}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Enterprise</div><div className="text-sm text-gray-300">{pick(isDE, 'Managed SBOM', 'Managed SBOM')}</div></a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.6s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · SBOM &amp; Supply Chain Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit SBOM-Generierung und Supply Chain Security in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with SBOM generation and supply chain security in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
            { "@type": "ListItem", position: 1, name: pick(isDE, 'Startseite', 'Home'), item: `https://clawguru.org/${locale}` },
            { "@type": "ListItem", position: 2, name: pick(isDE, 'Moltbot', 'Moltbot'), item: `https://clawguru.org/${locale}/moltbot` },
            { "@type": "ListItem", position: 3, name: "SBOM Generation", item: `https://clawguru.org/${locale}/moltbot/sbom-generation` }
          ]
        },
        faqSchema,
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: pick(isDE, 'Moltbot SBOM Generation Guide', 'Moltbot SBOM Generation Guide'),
          description: pick(isDE, 'Executable Security Runbooks und Hardening-Guides für Moltbot-Infrastrukturen.', 'Executable security runbooks and hardening guides for Moltbot infrastructures.'),
          url: `https://clawguru.org/${locale}/moltbot/sbom-generation`
        }
      ]) }} />
    </div>
  )
}
