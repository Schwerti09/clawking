// NEXT-LEVEL UPGRADE 2026: Zero-Knowledge Security Check Page
// 100% client-side – no data ever leaves the browser.

import type { Metadata } from "next"
import Container from "@/components/shared/Container"
import ZeroKnowledgeCheck from "@/components/security/ZeroKnowledgeCheck"

export const metadata: Metadata = {
  title: "Zero-Knowledge Security Check | ClawGuru",
  description:
    "Analysiere Configs, Logs und Code vollständig im Browser. Kein Datentransfer, keine Server-Calls – 100% Zero-Knowledge Sicherheitsanalyse.",
  alternates: { canonical: "/security/zero-knowledge" },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Was bedeutet Zero-Knowledge Security Check?', acceptedAnswer: { '@type': 'Answer', text: 'Zero-Knowledge Security Check bedeutet: die gesamte Analyse läuft im Browser des Nutzers, keine Daten verlassen das Gerät. Configs, Logs und Code werden lokal verarbeitet — kein Server-Call, keine Speicherung, kein Tracking. Ideal für sensible Produktions-Configs, die nicht an externe Dienste gesendet werden dürfen (DSGVO, HIPAA, interne Security-Policies).' } },
    { '@type': 'Question', name: 'Welche Daten kann ich im Zero-Knowledge Check analysieren?', acceptedAnswer: { '@type': 'Answer', text: 'Zero-Knowledge Check unterstützt: nginx/Apache Config-Files (Prüfung auf Security-Headers, TLS-Config). Docker Compose/Kubernetes YAML (Sicherheits-Misconfigs). .env-Dateien (Secrets-Leaks-Erkennung, nie an Server senden). SSH Config (Hardening-Prüfung). Firewall-Regeln (ufw, iptables). Alle Analysen: 100% client-seitig in WebAssembly oder JavaScript.' } },
    { '@type': 'Question', name: 'Wie unterscheidet sich Zero-Knowledge vom normalen Security Check?', acceptedAnswer: { '@type': 'Answer', text: 'Normaler ClawGuru Check: analysiert extern sichtbare Eigenschaften (HTTP Headers, TLS) durch Server-seitige Anfragen. Zero-Knowledge Check: analysiert interne Config-Files die du hochlädst, vollständig client-seitig. Kombination ideal: externer Check für öffentliche Exposition + Zero-Knowledge für interne Config-Qualität. Keine dieser Methoden ersetzt einen Pentest.' } },
    { '@type': 'Question', name: 'Ist der Zero-Knowledge Check wirklich sicher?', acceptedAnswer: { '@type': 'Answer', text: 'Zero-Knowledge Sicherheitsgarantien: Browser-Isolation verhindert Datenaustausch mit Servern. Kein Netzwerk-Request bei der Analyse (überprüfbar im Browser DevTools: Network-Tab zeigt keine Requests beim Upload). Open-Source-Code verifizierbar. Empfehlung für hochsensible Daten: zusätzlich offline-Analyse mit lokalen Tools (lynis, docker-bench-security) erwägen.' } },
  ],
}

export default function ZeroKnowledgePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,157,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="py-16 max-w-3xl mx-auto relative z-10">
          <div className="mb-2 text-xs text-gray-500 uppercase tracking-widest animate-fade-in-up">Security · Zero-Knowledge</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Zero-Knowledge Check
          </h1>
          <p className="text-gray-300 text-lg mb-2 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Analysiere Configs, Logs und Code vollständig im Browser.
          </p>
          <p className="text-gray-500 text-sm mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Kein Datentransfer · Kein Server-Call · Kein Tracking. Deine Daten bleiben 100% lokal.
          </p>

        {/* NEXT-LEVEL UPGRADE 2026: Zero-Knowledge Check Component */}
        <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <ZeroKnowledgeCheck />
        </div>

        {/* How it works */}
        <div className="mt-8 p-5 rounded-2xl border border-gray-700/50 bg-gray-800/80 backdrop-blur-lg shadow-2xl hover:border-cyan-500/30 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-base font-black mb-3 text-gray-100">Wie funktioniert Zero-Knowledge Mode?</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-[#00ff9d] font-bold mt-0.5">1.</span>
              <span>Du fügst deinen Code, deine Config oder dein Log in das Textfeld ein.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#00ff9d] font-bold mt-0.5">2.</span>
              <span>Die Analyse läuft vollständig in deinem Browser – kein Byte verlässt dein Gerät.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#00ff9d] font-bold mt-0.5">3.</span>
              <span>Befunde werden mit Schweregrad und Fix-Empfehlung angezeigt.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#00ff9d] font-bold mt-0.5">4.</span>
              <span>Ein deterministischer ZK-Hash beweist, dass die Analyse lokal stattfand.</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
    </div>
  )
}
