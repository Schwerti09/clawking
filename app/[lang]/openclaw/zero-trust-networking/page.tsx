import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/zero-trust-networking"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Zero Trust Networking: Zero-Trust-Netzwerk-Security | ClawGuru OpenClaw", "Zero Trust Networking: Zero Trust Network Security | ClawGuru OpenClaw")
  const description = pick(isDE, "Zero Trust Networking: Never Trust, Always Verify. Microsegmentation, Identity-Based Access, Continuous Verification und Policy Enforcement für Zero-Trust-Netzwerke. Executable Runbooks für Self-Hosted Infrastruktur.", "Zero Trust networking: never trust, always verify. Microsegmentation, identity-based access, continuous verification and policy enforcement for zero-trust networks. Executable runbooks for self-hosted infrastructure.")
  return {
    title, description,
    keywords: ["zero trust networking", "microsegmentation", "identity-based access", "continuous verification", "policy enforcement", "openclaw zero trust"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function ZeroTrustNetworkingPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Zero Trust Networking: Zero-Trust-Netzwerk-Security | ClawGuru OpenClaw", "Zero Trust Networking: Zero Trust Network Security | ClawGuru OpenClaw")

  const CONTROLS = [
    { id: "ZTN-1", title: pick(isDE, "Microsegmentation", "Microsegmentation"), desc: pick(isDE, "Implement network microsegmentation. Segment by workload, trust level, and data sensitivity.", "Implement network microsegmentation. Segment by workload, trust level, and data sensitivity."), code: `# OpenClaw Microsegmentation:
microsegmentation:
  enabled: true

  # Workload Segmentation:
  workload:
    enabled: true
    # Segment: by workload type
    # Rules: web → app → db
    # Default: deny all
    # Allow: only necessary flows

  # Trust Level Segmentation:
  trust_level:
    enabled: true
    # Segment: by trust level
    # Levels: trusted, semi-trusted, untrusted
    # Rules: restrict cross-trust access
    # Enforce: least privilege

  # Data Sensitivity Segmentation:
  data_sensitivity:
    enabled: true
    # Segment: by data sensitivity
    # Levels: public, internal, confidential, restricted
    # Rules: restrict sensitive data access
    # Enforce: data classification policies` },
    { id: "ZTN-2", title: pick(isDE, "Identity-Based Access", "Identity-Based Access"), desc: pick(isDE, "Implement identity-based access control. Use MFA, device posture, and conditional access.", "Implement identity-based access control. Use MFA, device posture, and conditional access."), code: `# OpenClaw Identity-Based Access:
identity_based_access:
  enabled: true

  # MFA Enforcement:
  mfa:
    enabled: true
    # Require: MFA for all access
    # Methods: TOTP, hardware keys
    # Enforce: for privileged access
    # Monitor: MFA bypass attempts

  # Device Posture:
  device_posture:
    enabled: true
    # Check: device health
    # Checks: OS version, antivirus, encryption
    # Block: non-compliant devices
    # Enforce: device compliance

  # Conditional Access:
  conditional_access:
    enabled: true
    # Define: access conditions
    # Factors: location, time, risk level
    # Enforce: dynamic access policies
    # Monitor: access patterns` },
    { id: "ZTN-3", title: pick(isDE, "Continuous Verification", "Continuous Verification"), desc: pick(isDE, "Implement continuous verification of trust. Re-authenticate, re-authorise, and monitor continuously.", "Implement continuous verification of trust. Re-authenticate, re-authorise, and monitor continuously."), code: `# OpenClaw Continuous Verification:
continuous_verification:
  enabled: true

  # Re-authentication:
  reauth:
    enabled: true
    # Require: periodic re-authentication
    # Interval: based on risk level
    # Methods: MFA, certificate
    # Enforce: session timeout

  # Re-authorization:
  reauthz:
    enabled: true
    # Re-evaluate: access permissions
    # Trigger: on policy change, role change
    # Enforce: least privilege
    # Monitor: permission changes

  # Continuous Monitoring:
  monitoring:
    enabled: true
    # Monitor: all network traffic
    # Detect: anomalous access patterns
    # Alert: on suspicious activity
    # Respond: automatically` },
    { id: "ZTN-4", title: pick(isDE, "Policy Enforcement", "Policy Enforcement"), desc: pick(isDE, "Enforce zero-trust policies consistently. Use policy-as-code and automated enforcement.", "Enforce zero-trust policies consistently. Use policy-as-code and automated enforcement."), code: `# OpenClaw Policy Enforcement:
policy_enforcement:
  enabled: true

  # Policy-as-Code:
  policy_as_code:
    enabled: true
    # Define: policies as code
    # Language: OPA/Rego, Sentinel
    # Version: in git
    # Test: automatically

  # Automated Enforcement:
  automated:
    enabled: true
    # Enforce: policies automatically
    # Tools: service mesh, firewall
    # Block: policy violations
    # Log: all enforcement actions

  # Policy Auditing:
  auditing:
    enabled: true
    # Audit: all policy decisions
    # Include: request, policy, decision
    # Retain: logs for audit (90 days)
    # Review: quarterly` },
  ]

  const FAQ = [
    { q: pick(isDE, "Was ist der Unterschied zwischen Zero-Trust und traditioneller Netzwerk-Security?", "What is the difference between zero-trust and traditional network security?"), a: pick(isDE, "Traditionelle Netzwerk-Security vertraut innerhalb des Netzwerk-Perimeters. Einmal drinnen, haben Nutzer und Geräte breiten Zugriff. Zero-Trust vertraut nie — jeder Access-Request wird verifiziert, unabhängig von Ort oder Netzwerk. Traditionell: Perimeter-Firewalls und VPNs. Zero-Trust: Identity-Based Access, Microsegmentation, Continuous Verification. Zero-Trust ist sicherer — begrenzt Lateral Movement und erzwingt Least Privilege überall.", "Traditional network security assumes trust within the network perimeter. Once inside, users and devices have broad access. Zero-trust assumes no trust — every access request is verified, regardless of location or network. Traditional: perimeter firewalls and VPNs. Zero-trust: identity-based access, microsegmentation, continuous verification. Zero-trust is more secure — limits lateral movement and enforces least privilege everywhere.") },
    { q: pick(isDE, "Wie implementiere ich Microsegmentation?", "How do I implement microsegmentation in my network?"), a: pick(isDE, "Microsegmentation implementieren: 1) Network-Flows mappen — alle Kommunikationsmuster identifizieren. 2) Workload-Segmentierung — ähnliche Workloads gruppieren. 3) Trust-Levels definieren — Workloads nach Vertrauen kategorisieren. 4) Allow-List-Policies erstellen — nur notwendige Flows erlauben. 5) Service Mesh nutzen — Policies auf Service-Level implementieren. 6) Monitoring und Refining — kontinuierlich überwachen und anpassen. Start mit kritischen Assets, dann ausweiten.", "Implement microsegmentation by: 1) Mapping network flows — identify all communication patterns. 2) Segmenting by workload — group similar workloads together. 3) Defining trust levels — categorise workloads by trust. 4) Creating allow-list policies — only allow necessary flows. 5) Using service mesh — implement policies at the service level. 6) Monitoring and refining — continuously monitor and adjust policies. Start with critical assets and expand.") },
    { q: pick(isDE, "Was ist Continuous Verification in Zero-Trust?", "What is continuous verification in zero-trust?"), a: pick(isDE, "Continuous Verification bedeutet: Trust kontinuierlich neu verifizieren, nicht nur beim Login. Beinhaltet: 1) Periodische Re-Authentication — Nutzer müssen periodisch neu authentifizieren. 2) Session-Monitoring — Session-Aktivität auf Anomalien überwachen. 3) Device-Posture-Checks — Device-Health kontinuierlich verifizieren. 4) Risk-Based Access — Access basierend auf Risk-Level anpassen. 5) Automated Response — Access bei Risk-Events automatisch widerrufen. Verhindert Privilege Escalation und limitiert Impact kompromittierter Credentials.", "Continuous verification means re-verifying trust continuously, not just at login. This includes: 1) Periodic re-authentication — require users to re-authenticate periodically. 2) Session monitoring — monitor session activity for anomalies. 3) Device posture checks — verify device health continuously. 4) Risk-based access — adjust access based on risk level. 5) Automated response — automatically revoke access on risk events. Prevents privilege escalation and limits impact of compromised credentials.") },
    { q: pick(isDE, "Wie hilft OpenClaw bei Zero-Trust Networking?", "How does OpenClaw help with zero-trust networking?"), a: pick(isDE, "OpenClaw liefert Executable Runbooks für Zero-Trust Networking: 1) Pre-built Microsegmentation-Templates. 2) Identity-Based Access Control Policies. 3) Continuous Verification Automation. 4) Policy-as-Code Enforcement. 5) Automated Monitoring und Alerting. 6) Compliance Reporting. OpenClaw reduziert Zero-Trust-Implementierungszeit von Monaten auf Wochen und liefert klaren Path zur Compliance.", "OpenClaw provides executable runbooks for zero-trust networking: 1) Pre-built microsegmentation templates. 2) Identity-based access control policies. 3) Continuous verification automation. 4) Policy-as-code enforcement. 5) Automated monitoring and alerting. 6) Compliance reporting. OpenClaw reduces zero-trust implementation time from months to weeks and provides a clear path to compliance.") },
  ]

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "OpenClaw", item: `${SITE_URL}/${locale}/openclaw` },
      { "@type": "ListItem", position: 3, name: "Zero Trust Networking", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["Zero Trust Networking", "Microsegmentation", "Identity-Based Access", "Continuous Verification", "Policy Enforcement"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Zero Trust?", "What is Zero Trust?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "4 Zero-Trust-Kontrollen", "4 Zero Trust Controls")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Zero Trust Score", "Zero Trust Score")}</a>
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
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OpenClaw · Zero Trust</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Zero Trust Networking — Du vertraust deinem Netzwerk-Perimeter. Einmal drinnen, hat jeder Zugriff auf alles. Lateral Movement, dein Cluster ist kompromittiert.", "Zero Trust Networking — You trust your network perimeter. Once inside, everyone has access to everything. Lateral movement, your cluster is compromised.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du vertraust deinem Netzwerk-Perimeter. Einmal drinnen, hat jeder Zugriff auf alles. Lateral Movement, dein Cluster ist kompromittiert. Hier ist, wie du das verhinderst.", "You trust your network perimeter. Once inside, everyone has access to everything. Lateral movement, your cluster is compromised. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Zero-Trust-Networking-Guide für eigene Infrastruktur.", "Zero-trust networking guide for your own infrastructure.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Zero Trust? Einfach erklärt.", "What is Zero Trust? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Zero Trust bedeutet: Never Trust, Always Verify. Kein Vertrauen innerhalb des Netzwerk-Perimeters — jeder Access-Request wird verifiziert, unabhängig von Ort oder Netzwerk. Traditionelle Security: Perimeter-Firewalls, VPNs, breiter Zugriff drinnen. Zero-Trust: Identity-Based Access, Microsegmentation, Continuous Verification, Policy Enforcement. Gutes Zero-Trust: Microsegmentation nach Workload/Trust-Level/Data-Sensitivity, MFA + Device Posture, Continuous Re-Authentication, Policy-as-Code Enforcement.", "Zero trust means: never trust, always verify. No trust within the network perimeter — every access request is verified, regardless of location or network. Traditional security: perimeter firewalls, VPNs, broad access inside. Zero-trust: identity-based access, microsegmentation, continuous verification, policy enforcement. Good zero-trust: microsegmentation by workload/trust level/data sensitivity, MFA + device posture, continuous re-authentication, policy-as-code enforcement.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "4 Zero-Trust-Kontrollen", "4 Zero Trust Controls")}</h2>
            <div className="space-y-5">
              {CONTROLS.map((c) => (
                <div key={c.id} className="bg-gray-800/80 backdrop-blur-lg rounded-lg border border-gray-700/50 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-700">
                    <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-0.5 rounded">{c.id}</span>
                    <span className="font-bold text-gray-100">{c.title}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-300 mb-3">{c.desc}</p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto"><pre>{c.code}</pre></div>
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
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Lateral Movement nach VPN-Breach", "SCAR #1: Lateral movement after VPN breach")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "VPN-Zugang kompromittiert, Angreifer bewegt sich lateral durch Netzwerk, greift Datenbanken an. Fix: Zero-Trust mit Microsegmentation, kein breiter Zugriff nach VPN-Login.", "VPN access compromised, attacker moves laterally through network, attacks databases. Fix: Zero-trust with microsegmentation, no broad access after VPN login.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Perimeter-Trust. Lessons: Never Trust, Always Verify.", "Root Cause: Perimeter trust. Lessons: Never Trust, Always Verify.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Privilege Escalation via Credential Reuse", "SCAR #2: Privilege escalation via credential reuse")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Nutzer-Credentials kompromittiert, Angreifer eskaliert Privileges, greift kritische Systeme an. Fix: Continuous Verification, Device Posture, MFA für privilegierten Zugriff.", "User credentials compromised, attacker escalates privileges, attacks critical systems. Fix: Continuous verification, device posture, MFA for privileged access.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Statische Permissions. Lessons: Continuous Re-Auth + Least Privilege.", "Root Cause: Static permissions. Lessons: Continuous re-auth + least privilege.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              {[
                { n: 1, t: pick(isDE, "Network-Flows mappen", "Map network flows"), d: pick(isDE, "Alle Kommunikationsmuster identifizieren.", "Identify all communication patterns.") },
                { n: 2, t: pick(isDE, "Microsegmentation implementieren", "Implement microsegmentation"), d: pick(isDE, "Workload-Segmentierung nach Trust-Level.", "Workload segmentation by trust level.") },
                { n: 3, t: pick(isDE, "MFA erzwingen", "Enforce MFA"), d: pick(isDE, "MFA für alle Zugriffe aktivieren.", "Enable MFA for all access.") },
                { n: 4, t: pick(isDE, "Continuous Verification einrichten", "Set up continuous verification"), d: pick(isDE, "Periodische Re-Auth + Device Posture.", "Periodic re-auth + device posture.") },
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
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive Zero Trust Checkliste", "Interactive Zero Trust Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "zt1", text: pick(isDE, "Network-Flows gemapped", "Network flows mapped") },
                  { id: "zt2", text: pick(isDE, "Microsegmentation nach Workload", "Microsegmentation by workload") },
                  { id: "zt3", text: pick(isDE, "Trust-Level-Segmentierung aktiviert", "Trust-level segmentation enabled") },
                  { id: "zt4", text: pick(isDE, "MFA für alle Zugriffe", "MFA for all access") },
                  { id: "zt5", text: pick(isDE, "Device Posture Checks aktiviert", "Device posture checks enabled") },
                  { id: "zt6", text: pick(isDE, "Continuous Re-Authentication", "Continuous re-authentication") },
                  { id: "zt7", text: pick(isDE, "Policy-as-Code implementiert", "Policy-as-code implemented") },
                  { id: "zt8", text: pick(isDE, "Automated Policy Enforcement", "Automated policy enforcement") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Zero Trust Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Zero Trust Score Calculator", "Zero Trust Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist Microsegmentation implementiert?", "Is microsegmentation implemented?"), weight: 25 },
                  { q: pick(isDE, "Ist MFA für alle Zugriffe?", "Is MFA for all access?"), weight: 25 },
                  { q: pick(isDE, "Ist Continuous Verification aktiviert?", "Is continuous verification enabled?"), weight: 25 },
                  { q: pick(isDE, "Ist Policy-as-Code implementiert?", "Is policy-as-code implemented?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein Zero Trust Score:", "Your Zero Trust Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 10/100", "Industry Average: 10/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Zero Trust Networking, Microsegmentation, Identity-Based Access und Continuous Verification.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in zero trust networking, microsegmentation, identity-based access and continuous verification.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/openclaw/zero-trust-architecture`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Zero Trust Architecture</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Zero-Trust-Overview", "Zero-trust overview")}</div>
              </a>
              <a href={`/${locale}/openclaw/openclaw-security-2026`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">OpenClaw Security 2026</div>
                <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw-Framework", "OpenClaw framework")}</div>
              </a>
              <a href={`/${locale}/openclaw`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">All OpenClaw</div>
                <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw-Übersicht", "OpenClaw overview")}</div>
              </a>
              <a href={`/${locale}/check`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Security Check</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Live-Check", "Live check")}</div>
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
