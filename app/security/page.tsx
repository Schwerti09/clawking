import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { SEO_TARGET_KEYWORDS_2026 } from "@/lib/seo/targets"

export const metadata = {
  title: "Security Hub | ClawGuru",
  description: "Security Hub: CVE-Klassen, Misconfigs und Runbooks für schnelle Incident-Response.",
  keywords: SEO_TARGET_KEYWORDS_2026,
  alternates: { canonical: "/security" },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Was ist der ClawGuru Security Hub?', acceptedAnswer: { '@type': 'Answer', text: 'Der ClawGuru Security Hub ist das zentrale Portal für Security-Ressourcen: CVE-Klassen-Dokumentation, Misconfiguration-Patterns, Incident-Response-Runbooks und Hardening-Guides. Ziel: Praktische, sofort umsetzbare Security-Anleitungen für Self-Hosted und Cloud-Infrastruktur — kein theoretisches Framework, sondern operative Checklisten.' } },
    { '@type': 'Question', name: 'Welche CVE-Klassen sind am häufigsten bei Self-Hosted?', acceptedAnswer: { '@type': 'Answer', text: 'Häufigste CVE-Klassen bei Self-Hosted: 1) Exposed Admin Panels (kein Auth, öffentlich erreichbar). 2) Default Credentials (nie geänderte Passwörter). 3) Unpatched Dependencies (veraltete npm/pip/apt Pakete). 4) Misconfigured CORS/CSP (zu permissiv). 5) Secrets in Repos (API-Keys in Git). 6) Unverschlüsselte Kommunikation (HTTP statt HTTPS intern). ClawGuru Security Check erkennt viele dieser Klassen automatisch.' } },
    { '@type': 'Question', name: 'Was sind die häufigsten Security Misconfigurations?', acceptedAnswer: { '@type': 'Answer', text: 'Top Security Misconfigs 2026: Fehlende Security Headers (HSTS, CSP, X-Frame-Options). Offene Ports ohne Firewall. Docker-Container mit --privileged. Kubernetes Pods ohne SecurityContext. S3 Buckets public. SSH mit Password-Auth statt Key-Auth. MongoDB/Redis ohne Auth. Nginx/Apache ohne Rate Limiting. Alle prüfbar mit ClawGuru Security Check in 30 Sekunden.' } },
    { '@type': 'Question', name: 'Wie starte ich mit Security-Hardening?', acceptedAnswer: { '@type': 'Answer', text: 'Security-Hardening Einstieg: 1) ClawGuru Security Check ausführen (30 Sekunden, kostenlos). 2) Top-3-Findings priorisieren (höchster Impact, einfachste Umsetzung). 3) Passendes Runbook auswählen und umsetzen. 4) Re-Check nach jeder Änderung. 5) Monitoring einrichten (Prometheus + Alertmanager). Quick Wins: HTTPS aktivieren, Security Headers setzen, SSH absichern. Diese 3 Schritte lösen 60% der häufigsten Findings.' } },
  ],
}

export default function Security() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="py-16 max-w-4xl mx-auto relative z-10">
          <SectionTitle
            kicker="Hub"
            title="Security"
            subtitle="CVE-Klassen, Misconfigs, Runbooks. Ziel: Handeln, nicht scrollen."
          />

          <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <a className="p-6 rounded-2xl border border-gray-700/50 bg-gray-800/80 backdrop-blur-lg shadow-2xl hover:border-red-500/30 transition-all duration-300" href="/security/notfall-leitfaden">
              <div className="text-red-400 font-black">Notfall-Leitfaden</div>
              <div className="text-gray-400">0–60 Minuten Runbook, wenn du exponiert bist.</div>
            </a>
            <a className="p-6 rounded-2xl border border-gray-700/50 bg-gray-800/80 backdrop-blur-lg shadow-2xl hover:border-cyan-500/30 transition-all duration-300" href="/openclaw-security-2026#cves">
              <div className="text-cyan-400 font-black">CVE & Angriffsklassen</div>
              <div className="text-gray-400">Was zählt + wie du mitigierst.</div>
            </a>
            <a className="p-6 rounded-2xl border border-gray-700/50 bg-gray-800/80 backdrop-blur-lg shadow-2xl hover:border-orange-500/30 transition-all duration-300" href="/tools">
              <div className="text-orange-400 font-black">Tools</div>
              <div className="text-gray-400">Validatoren, Checklisten, Reports.</div>
            </a>
            <a className="p-6 rounded-2xl border border-gray-700/50 bg-gray-800/80 backdrop-blur-lg shadow-2xl hover:border-green-500/30 transition-all duration-300" href="/copilot">
              <div className="text-green-400 font-black">Copilot</div>
              <div className="text-gray-400">Konversation → Prioritäten → Runbook.</div>
            </a>
            {/* NEXT-LEVEL UPGRADE 2026: Zero-Knowledge Check link */}
            <a className="p-6 rounded-2xl border border-[#00ff9d]/30 bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 md:col-span-2 backdrop-blur-lg shadow-2xl transition-all duration-300" href="/security/zero-knowledge">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#00ff9d] font-black">🔒 Zero-Knowledge Check</span>
                <span className="text-xs px-2 py-0.5 rounded-full border border-[#00ff9d]/40 text-[#00ff9d] font-bold">NEU 2026</span>
              </div>
              <div className="text-gray-400">Config, Log oder Code lokal analysieren – kein Byte verlässt den Browser.</div>
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
