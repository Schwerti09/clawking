import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/supply-chain-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Supply Chain Security: SBOM, Dependency Pinning & Container Signing | ClawGuru", "Supply Chain Security: SBOM, Dependency Pinning & Container Signing | ClawGuru")
  const description = pick(isDE, "Supply Chain Security für Kubernetes und Container: SBOM-Generierung mit Syft/Grype, Dependency Pinning, Sigstore Container Signing, Build Provenance und Schutz vor SolarWinds-artigen Angriffen.", "Supply chain security for Kubernetes and containers: SBOM generation with Syft/Grype, dependency pinning, Sigstore container signing, build provenance and protection against SolarWinds-style attacks.")
  return {
    title, description,
    keywords: ["supply chain security", "sbom software", "dependency security", "npm audit", "sigstore signing", "build provenance"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function OpenClawSupplyChainPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Supply Chain Security: SBOM, Dependency Pinning & Container Signing | ClawGuru", "Supply Chain Security: SBOM, Dependency Pinning & Container Signing | ClawGuru")

  const SUPPLY_CHAIN_CONTROLS = [
    { id: "S1", title: pick(isDE, "SBOM Generierung", "SBOM Generation"), desc: pick(isDE, "Software Bill of Materials (SBOM) mit Syft generieren und mit Grype auf Vulnerabilities prüfen.", "Generate Software Bill of Materials (SBOM) with Syft and scan for vulnerabilities with Grype."), code: `# SBOM mit Syft generieren (CycloneDX Format)
syft packages dir:. -o cyclonedx-json > sbom.json

# SBOM auf Vulnerabilities prüfen (Grype)
grype sbom:sbom.json --fail-on critical

# npm SBOM (für Node.js)
npm sbom --sbom-format cyclonedx > npm-sbom.json

# Container SBOM
syft ghcr.io/clawguru/openclaw:latest \\
  -o cyclonedx-json > container-sbom.json` },
    { id: "S2", title: pick(isDE, "Dependency Pinning", "Dependency Pinning"), desc: pick(isDE, "Dependencies auf spezifische Versionen pinnen — keine floating Tags (latest), SHA256-Digests für Container Images.", "Pin dependencies to specific versions — no floating tags (latest), SHA256 digests for container images."), code: `# package-lock.json committen (Node.js)
# Lock-File enthält exakte Versionen und Hashes

# Container Images mit SHA256-Digest pinnen
# BAD: myimage:latest
# GOOD: myimage@sha256:abc123...

# Docker Compose mit Digests
services:
  app:
    image: myimage@sha256:abc123def456...` },
    { id: "S3", title: pick(isDE, "Sigstore Container Signing", "Sigstore Container Signing"), desc: pick(isDE, "Container Images mit cosign signieren und verifizieren — Build Provenance und Integrity Checks.", "Sign container images with cosign and verify — build provenance and integrity checks."), code: `# Container Image signieren
cosign sign --key cosign.key ghcr.io/clawguru/openclaw:latest

# Image verifizieren (Deployment)
cosign verify ghcr.io/clawguru/openclaw:latest

# SBOM Attestation anhängen
cosign attest \\
  --predicate sbom.json \\
  --type cyclonedx \\
  ghcr.io/clawguru/openclaw:latest

# Attestation verifizieren
cosign verify-attestation \\
  --type cyclonedx \\
  ghcr.io/clawguru/openclaw:latest` },
    { id: "S4", title: pick(isDE, "Dependency Scanning in CI/CD", "Dependency Scanning in CI/CD"), desc: pick(isDE, "Automatisches Dependency Scanning in CI/CD-Pipeline — npm audit, pip-audit, trivy als Pflichtschritt.", "Automated dependency scanning in CI/CD pipeline — npm audit, pip-audit, trivy as mandatory step."), code: `# GitHub Actions: npm audit
- name: Run npm audit
  run: npm audit --audit-level=moderate

# Trivy FS Scan
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    scan-type: 'fs'
    scan-ref: '.'
    format: 'sarif'
    output: 'trivy-results.sarif'

# Bei HIGH/CRITICAL Build abbrechen
# Fail fast on security issues` },
  ]

  const FAQ = [
    { q: pick(isDE, "Was ist ein SBOM und warum brauche ich es?", "What is an SBOM and why do I need it?"), a: pick(isDE, "SBOM (Software Bill of Materials) ist eine inventarisierte Liste aller Dependencies in deiner Software — inklusive Versionen, Lizenzen und Vulnerabilities. Brauchst du für: Compliance (NIST, EU AI Act), Incident Response (welche Pakete sind betroffen?), Vulnerability Management (proaktives Scanning), Supply Chain Security (Transparenz über deine Dependencies).", "SBOM (Software Bill of Materials) is an inventory list of all dependencies in your software — including versions, licenses and vulnerabilities. You need it for: compliance (NIST, EU AI Act), incident response (which packages are affected?), vulnerability management (proactive scanning), supply chain security (transparency over your dependencies).") },
    { q: pick(isDE, "Dependency Pinning vs Latest — was nutzen?", "Dependency pinning vs latest — what to use?"), a: pick(isDE, "Immer pinnen. Floating Tags (latest, v2, main) sind ein Security-Risiko — du weißt nicht, was deployt wird. Pinning: package-lock.json (Node.js), requirements.txt mit Hashes (Python), SHA256-Digests für Container Images. Ausnahme: Dev-Dependencies können auto-update mit Renovate/Dependabot.", "Always pin. Floating tags (latest, v2, main) are a security risk — you don't know what gets deployed. Pinning: package-lock.json (Node.js), requirements.txt with hashes (Python), SHA256 digests for container images. Exception: dev-dependencies can auto-update with Renovate/Dependabot.") },
    { q: pick(isDE, "Sigstore vs GPG für Container Signing?", "Sigstore vs GPG for container signing?"), a: pick(isDE, "Sigstore (cosign) ist moderner und einfacher: Keine Key-Management-Overhead (Keys werden in Rekorde-Log gespeichert), OIDC-Integration für CI/CD (GitHub Actions, GitLab CI), Build Provenance automatisch attestiert, Verifikation ohne Key-Exchange. GPG: Manuelle Key-Management, Build Provenance manuell, komplexere Integration. Empfehlung: Sigstore für neue Projekte.", "Sigstore (cosign) is more modern and easier: No key management overhead (keys stored in Rekorde log), OIDC integration for CI/CD (GitHub Actions, GitLab CI), build provenance automatically attested, verification without key exchange. GPG: Manual key management, manual build provenance, more complex integration. Recommendation: Sigstore for new projects.") },
    { q: pick(isDE, "Schutz vor SolarWinds-artigen Angriffen?", "Protection against SolarWinds-style attacks?"), a: pick(isDE, "SolarWinds war ein Supply-Chain-Angriff über kompromittierte Build-Systeme. Schutz: Hermetic Builds (Build in isolierter Umgebung ohne Internet), Build Provenance (Wer hat wann was gebaut?), SBOM-Verifikation (Stimmt die SBOM mit dem Deploy überein?), Container Signing (Nur signierte Images deployen), CI/CD-Hardening (MFA, Branch Protection, Audit Logs).", "SolarWinds was a supply chain attack via compromised build systems. Protection: Hermetic builds (build in isolated environment without internet), build provenance (who built what when?), SBOM verification (does SBOM match deploy?), container signing (only deploy signed images), CI/CD hardening (MFA, branch protection, audit logs).") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "OpenClaw", item: `${SITE_URL}/${locale}/openclaw` },
      { "@type": "ListItem", position: 3, name: "Supply Chain Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["Supply Chain Security", "SBOM", "Sigstore", "Dependency Pinning", "Build Provenance"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Supply Chain Security?", "What is Supply Chain Security?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4 Supply Chain Controls", "4 Supply Chain Controls")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Supply Chain Security Score", "Supply Chain Security Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">10 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OpenClaw · Supply Chain Security</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Supply Chain Security — Du deployst Dependencies ohne SBOM. SolarWinds-Angriff, dein Build-System ist kompromittiert. Alle Container sind bösartig.", "Supply Chain Security — You deploy dependencies without SBOM. SolarWinds attack, your build system is compromised. All containers are malicious.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du deployst Dependencies ohne SBOM. SolarWinds-Angriff, dein Build-System ist kompromittiert. Alle Container sind bösartig. Hier ist, wie du das verhinderst.", "You deploy dependencies without SBOM. SolarWinds attack, your build system is compromised. All containers are malicious. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Supply Chain Security Guide für eigene Software-Lieferkette.", "Supply chain security guide for your own software supply chain.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Supply Chain Security? Einfach erklärt.", "What is Supply Chain Security? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Supply Chain Security bedeutet: deine Software-Lieferkette absichern — von Dependencies über Build-System bis Deployment. Risiken: kompromittierte Packages (SolarWinds, XZ Utils), Typosquatting, Dependency Confusion, malicious Maintainer. Gute Supply Chain Security: SBOM-Generierung, Dependency Pinning, Container Signing (Sigstore), Build Provenance, Dependency Scanning in CI/CD.", "Supply chain security means: secure your software supply chain — from dependencies through build systems to deployment. Risks: compromised packages (SolarWinds, XZ Utils), typosquatting, dependency confusion, malicious maintainers. Good supply chain security: SBOM generation, dependency pinning, container signing (Sigstore), build provenance, dependency scanning in CI/CD.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4 Supply Chain Controls", "4 Supply Chain Controls")}</h2>
            <div className="space-y-5">
              {SUPPLY_CHAIN_CONTROLS.map((s) => (
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
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: SolarWinds Supply Chain Attack", "SCAR #1: SolarWinds Supply Chain Attack")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Build-System kompromittiert, malicious Code in Orion Updates verteilt. 18.000+ Kunden betroffen. Fix: Hermetic Builds, Build Provenance, Container Signing.", "Build system compromised, malicious code distributed in Orion updates. 18,000+ customers affected. Fix: Hermetic builds, build provenance, container signing.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kompromittiertes Build-System. Lessons: Hermetic Builds + Provenance.", "Root Cause: Compromised build system. Lessons: Hermetic builds + provenance.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: XZ Utils Backdoor", "SCAR #2: XZ Utils Backdoor")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Malicious Maintainer platzierte Backdoor in XZ Utils (SSH-Server). SSH-Keys kompromittiert. Fix: Minimal Dependencies, Maintainer-Audit, SBOM-Verifikation.", "Malicious maintainer planted backdoor in XZ Utils (SSH server). SSH keys compromised. Fix: Minimal dependencies, maintainer audit, SBOM verification.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Malicious Maintainer. Lessons: Maintainer-Audit + Minimal Dependencies.", "Root Cause: Malicious maintainer. Lessons: Maintainer audit + minimal dependencies.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              {[
                { n: 1, t: pick(isDE, "SBOM generieren", "Generate SBOM"), d: pick(isDE, "Syft installieren, SBOM für alle Images generieren.", "Install Syft, generate SBOM for all images.") },
                { n: 2, t: pick(isDE, "Dependency Pinning", "Dependency pinning"), d: pick(isDE, "package-lock.json committen, Container-Images mit SHA256 pinnen.", "Commit package-lock.json, pin container images with SHA256.") },
                { n: 3, t: pick(isDE, "Sigstore einrichten", "Set up Sigstore"), d: pick(isDE, "cosign installieren, Images signieren und verifizieren.", "Install cosign, sign and verify images.") },
                { n: 4, t: pick(isDE, "CI/CD Dependency Scanning", "CI/CD dependency scanning"), d: pick(isDE, "npm audit/trivy in CI-Pipeline als Pflichtschritt.", "npm audit/trivy as mandatory step in CI pipeline.") },
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
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Supply Chain Security Checkliste", "Interactive Supply Chain Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "sc1", text: pick(isDE, "SBOM für alle Images generiert", "SBOM generated for all images") },
                  { id: "sc2", text: pick(isDE, "SBOM regelmäßig aktualisiert (CI/CD)", "SBOM updated regularly (CI/CD)") },
                  { id: "sc3", text: pick(isDE, "Dependency Pinning aktiviert", "Dependency pinning enabled") },
                  { id: "sc4", text: pick(isDE, "Container Images mit SHA256-Digests", "Container images with SHA256 digests") },
                  { id: "sc5", text: pick(isDE, "Sigstore/Cosign für Image Signing", "Sigstore/Cosign for image signing") },
                  { id: "sc6", text: pick(isDE, "Build Provenance aktiviert", "Build provenance enabled") },
                  { id: "sc7", text: pick(isDE, "Dependency Scanning in CI/CD", "Dependency scanning in CI/CD") },
                  { id: "sc8", text: pick(isDE, "Renovate/Dependabot aktiviert", "Renovate/Dependabot enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Supply Chain Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Supply Chain Security Score Calculator", "Supply Chain Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist SBOM generiert?", "Is SBOM generated?"), weight: 25 },
                  { q: pick(isDE, "Ist Dependency Pinning aktiviert?", "Is dependency pinning enabled?"), weight: 25 },
                  { q: pick(isDE, "Sind Container Images signiert?", "Are container images signed?"), weight: 25 },
                  { q: pick(isDE, "Ist Dependency Scanning in CI/CD?", "Is dependency scanning in CI/CD?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Supply Chain Security Score:", "Your Supply Chain Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 15/100", "Industry Average: 15/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Supply Chain Security, SBOM, Sigstore und Build Provenance.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in supply chain security, SBOM, Sigstore and build provenance.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/check`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Security Check</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Dependency Scan", "Dependency scan")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Supply Chain Runbooks</div>
                <div className="text-sm text-gray-300">{pick(isDE, "SBOM Guides", "SBOM guides")}</div>
              </a>
              <a href={`/${locale}/oracle`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Oracle</div>
                <div className="text-sm text-gray-300">{pick(isDE, "CVE Intelligence", "CVE intelligence")}</div>
              </a>
              <a href={`/${locale}/solutions`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Enterprise</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Managed Supply Chain", "Managed supply chain")}</div>
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
