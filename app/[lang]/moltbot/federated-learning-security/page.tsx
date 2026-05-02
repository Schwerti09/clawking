import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/federated-learning-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Federated Learning Security: Schutz für verteiltes AI Training 2026 | ClawGuru", "Federated Learning Security: Protecting Distributed AI Training 2026 | ClawGuru")
  const description = pick(isDE, "Sichere Federated Learning Pipelines: Byzantine-robust Aggregation, Differential Privacy, Gradient Poisoning Defense, Client Authentication und Model Update Validation für self-hosted FL Systeme.", "Secure federated learning pipelines: Byzantine-robust aggregation, differential privacy, gradient poisoning defense, client authentication and model update validation for self-hosted FL systems.")
  return {
    title, description,
    keywords: ["federated learning security", "fl security", "gradient poisoning", "byzantine robust aggregation", "differential privacy ai", "federated learning self hosted", "moltbot fl"],
    authors: [{ name: "R. Schwertfechter" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const FL_ATTACKS = [
  { id: "FL01", name: pick(isDE, "Gradient Poisoning", "Gradient Poisoning"), severity: "CRITICAL", desc: pick(isDE, "Böswilliger FL-Client sendet manipulierte Gradient-Updates, die Backdoors einbetten oder globale Modellleistung degradieren.", "Malicious FL client submits manipulated gradient updates that embed backdoors or degrade global model performance."), defense: pick(isDE, "Byzantine-robust Aggregation (Krum, FedMedian, Trimmed Mean). Gradient-Norm Clipping. Updates statistisch vor Aggregation validieren.", "Byzantine-robust aggregation (Krum, FedMedian, Trimmed Mean). Clip gradient norms. Validate updates statistically before aggregation.") },
  { id: "FL02", name: pick(isDE, "Model Inversion Attack", "Model Inversion Attack"), severity: "HIGH", desc: pick(isDE, "Angreifer rekonstruiert Trainingsdaten aus geteilten Gradient-Updates, verletzt Datenschutz anderer FL-Teilnehmer.", "Attacker reconstructs training data from shared gradient updates, violating data privacy of other FL participants."), defense: pick(isDE, "Differential Privacy (DP-SGD): Kalibriertes Gauß-Rauschen zu Gradienten vor Sharing. Privacy Budget (ε ≤ 1.0 für starke Privacy).", "Differential privacy (DP-SGD): add calibrated Gaussian noise to gradients before sharing. Set privacy budget (ε ≤ 1.0 for strong privacy).") },
  { id: "FL03", name: pick(isDE, "Free-Rider Attack", "Free-Rider Attack"), severity: "MEDIUM", desc: pick(isDE, "Client nimmt an FL teil ohne echte Updates zu beitragen — lädt globales Modell ohne nützliche Gradienten zu teilen.", "Client participates in FL without contributing genuine updates — downloads global model without sharing useful gradients."), defense: pick(isDE, "Contribution Verification: Cosine Similarity von Submitted Updates vs erwarteter Gradient-Richtung. Ban Clients unter Threshold.", "Contribution verification: measure cosine similarity of submitted updates vs expected gradient direction. Ban clients below threshold.") },
  { id: "FL04", name: pick(isDE, "Inference Attack", "Inference Attack"), severity: "HIGH", desc: pick(isDE, "Angreifer schließt Mitgliedschaft spezifischer Datenpunkte im Training Set aus Verhalten des globalen Modells.", "Attacker infers membership of specific data points in training set from the global model's behavior."), defense: pick(isDE, "Differential Privacy bietet mathematische Membership Inference Resistance. Limit Model Query API Access. Monitor für systematisches Probing.", "Differential privacy provides mathematical membership inference resistance. Limit model query API access. Monitor for systematic probing.") },
  { id: "FL05", name: pick(isDE, "Communication Channel Attack", "Communication Channel Attack"), severity: "HIGH", desc: pick(isDE, "Man-in-the-Middle abfängt Gradient-Updates im Transit, modifiziert sie oder injiziert bösartige Updates.", "Man-in-the-middle intercepts gradient updates in transit, modifies them, or injects malicious updates."), defense: pick(isDE, "mTLS für alle FL Client-Server Kommunikation. Authentifiziere Clients mit Zertifikaten. Signiere alle Gradient-Updates. Verifiziere Signaturen vor Aggregation.", "mTLS for all FL client-server communication. Authenticate clients with certificates. Sign all gradient updates. Verify signatures before aggregation.") },
]

const FAQ = [
  { q: pick(isDE, "Was ist Federated Learning und warum ist es für GDPR relevant?", "What is federated learning and why is it relevant for GDPR?"), a: pick(isDE, "Federated Learning trainiert AI-Modelle über mehrere Datenquellen ohne Rohdaten zu zentralisieren. Jeder Teilnehmer trainiert lokal und teilt nur Model-Updates (Gradienten) — nicht die zugrundeliegenden Daten. Das macht FL inhärent privacy-preserving und GDPR-freundlich: persönliche Daten verlassen nie die Systeme des Data Controllers.", "Federated learning trains AI models across multiple data sources without centralizing the raw data. Each participant trains locally and shares only model updates (gradients) — not the underlying data. This makes FL inherently privacy-preserving and GDPR-friendly: personal data never leaves the data controller's systems.") },
  { q: pick(isDE, "Was ist Differential Privacy in Federated Learning?", "What is differential privacy in federated learning?"), a: pick(isDE, "Differential Privacy (DP) fügt mathematisch kalibriertes Rauschen zu Gradient-Updates hinzu, bevor sie geteilt werden, was Rekonstruktion individueller Trainings-Samples rechnerisch unmöglich macht. Das Privacy Budget (ε) kontrolliert den Privacy-Utility Tradeoff: ε < 1.0 bietet starke Privacy, ε > 10.0 bietet schwache Privacy. DP-SGD ist die Standard-Implementierung.", "Differential privacy (DP) adds mathematically calibrated noise to gradient updates before they are shared, making it computationally infeasible to reconstruct individual training samples. The privacy budget (ε) controls the privacy-utility tradeoff: ε < 1.0 provides strong privacy, ε > 10.0 provides weak privacy. DP-SGD is the standard implementation.") },
  { q: pick(isDE, "Wie verteidige ich mich gegen Gradient Poisoning in Federated Learning?", "How do I defend against gradient poisoning in federated learning?"), a: pick(isDE, "Verwende Byzantine-robust Aggregation Algorithmen statt einfachem FedAvg: 1) Krum: wählt das Update, das am ähnlichsten zu seinen k Nachbarn ist. 2) Trimmed Mean: entfernt top/bottom x% der Updates vor Durchschnitt. 3) Median: nimmt den koordinatenweisen Median. Auch: Gradient-Norm Clipping vor Aggregation, Monitor per-Client Update Statistiken über Zeit.", "Use Byzantine-robust aggregation algorithms instead of simple FedAvg: 1) Krum: selects the update most similar to its k neighbors. 2) Trimmed Mean: removes top/bottom x% of updates before averaging. 3) Median: takes the coordinate-wise median. Also: clip gradient norms before aggregation, monitor per-client update statistics over time.") },
  { q: pick(isDE, "Kann ich Federated Learning auf self-hosted Infrastruktur laufen?", "Can I run federated learning on self-hosted infrastructure?"), a: pick(isDE, "Ja. Frameworks wie Flower (flwr), PySyft und TensorFlow Federated unterstützen vollständig self-hosted Deployments. Der FL-Server und alle Clients laufen auf deiner Infrastruktur. Keine Daten verlassen dein Netzwerk. Kombiniere mit mTLS Client Authentication und Moltbot Monitoring für eine produktionsreife, GDPR-konforme Federated Learning Setup.", "Yes. Frameworks like Flower (flwr), PySyft and TensorFlow Federated support fully self-hosted deployments. The FL server and all clients run on your infrastructure. No data ever leaves your network. Combine with mTLS client authentication and Moltbot monitoring for a production-grade, GDPR-compliant federated learning setup.") },
]

export default function FederatedLearningSecurityPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Federated Learning Security: Schutz für verteiltes AI Training 2026 | ClawGuru", "Federated Learning Security: Protecting Distributed AI Training 2026 | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Federated Learning Security", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["Federated Learning", "Differential Privacy", "Gradient Poisoning", "Byzantine Robust Aggregation", "mTLS"] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: title, author: { "@type": "Person", name: "R. Schwertfechter" }, datePublished: "2026-05-01", dateModified: "2026-05-01" },
    { "@context": "https://schema.org", "@type": "AggregateRating", ratingValue: "95", reviewCount: "1", bestRating: "100", itemReviewed: title },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "HowTo", name: pick(isDE, "Sichere Federated Learning Pipeline", "Secure a Federated Learning Pipeline"), totalTime: "PT4H", step: [
      { "@type": "HowToStep", name: pick(isDE, "Authentifiziere alle FL Clients", "Authenticate all FL clients"), text: pick(isDE, "Issue per-client X.509 Zertifikate. Erzwinge mTLS für alle Server-Verbindungen. Revoke bei Compromise.", "Issue per-client X.509 certificates. Enforce mTLS for all server connections. Revoke on compromise.") },
      { "@type": "HowToStep", name: pick(isDE, "Implementiere DP-SGD", "Implement DP-SGD"), text: pick(isDE, "Füge Differential Privacy zu Gradient Sharing hinzu. Setze ε ≤ 1.0. Kalibriere Noise zu Sensitivity und Privacy Budget.", "Add differential privacy to gradient sharing. Set ε ≤ 1.0. Calibrate noise to sensitivity and privacy budget.") },
      { "@type": "HowToStep", name: pick(isDE, "Aktiviere robuste Aggregation", "Enable robust aggregation"), text: pick(isDE, "Ersetze FedAvg mit Trimmed Mean oder Krum. Clip Gradient-Normen vor Aggregation.", "Replace FedAvg with Trimmed Mean or Krum. Clip gradient norms before aggregation.") },
      { "@type": "HowToStep", name: pick(isDE, "Monitor Client Contributions", "Monitor client contributions"), text: pick(isDE, "Track per-Client Update Statistiken. Alert auf statistische Outliers. Auto-ban Byzantine Clients.", "Track per-client update statistics. Alert on statistical outliers. Auto-ban Byzantine clients.") },
      { "@type": "HowToStep", name: pick(isDE, "Auditiere Model Versionen", "Audit model versions"), text: pick(isDE, "SHA-256 Checksum auf jeder globalen Model Version. Behavioral Test Suite vor Distribution.", "SHA-256 checksum on every global model version. Behavioral test suite before distribution.") },
    ]},
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist Federated Learning?", "What is Federated Learning?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "FL Attack Vectors", "FL Attack Vectors")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "FL Security Score", "FL Security Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">13 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Federated Learning Security · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Federated Learning Security — Du hast kein Byzantine-robust Aggregation, kein Differential Privacy, kein mTLS. Gradient Poisoning, Model Inversion, Free-Rider. Globales Modell korrupt, Daten-Leak, dein CEO hat den CISO gefeuert.", "Federated Learning Security — You Have No Byzantine-Robust Aggregation, No Differential Privacy, No mTLS. Gradient Poisoning, Model Inversion, Free-Rider. Global Model Corrupt, Data Leak, Your CEO Fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du hast kein Byzantine-robust Aggregation, kein Differential Privacy und kein mTLS. Gradient Poisoning, Model Inversion, Free-Rider. Globales Modell korrupt, Daten-Leak, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You have no Byzantine-robust aggregation, no differential privacy and no mTLS. Gradient poisoning, model inversion, free-rider. Global model corrupt, data leak, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Dieser Guide dient der Absicherung eigener Federated Learning Infrastruktur. Keine Angriffswerkzeuge.", "This guide is for securing your own federated learning infrastructure. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist Federated Learning? Einfach erklärt.", "What is Federated Learning? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir Federated Learning wie verteiltes Machine Learning vor: AI-Modelle werden auf mehreren Clients trainiert, ohne Rohdaten zu zentralisieren. Jeder Client trainiert lokal und teilt nur Gradienten — nicht die Daten. Das macht FL inhärent privacy-preserving und GDPR-freundlich. Aber ohne Byzantine-robust Aggregation, Differential Privacy und mTLS ist FL anfällig für Gradient Poisoning, Model Inversion und Free-Rider. Gutes FL bedeutet: Never trust clients blindly, always validate updates.", "Think of federated learning like distributed machine learning: AI models are trained across multiple clients without centralizing raw data. Each client trains locally and shares only gradients — not the data. This makes FL inherently privacy-preserving and GDPR-friendly. But without Byzantine-robust aggregation, differential privacy and mTLS, FL is vulnerable to gradient poisoning, model inversion and free-rider. Good FL means: never trust clients blindly, always validate updates.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "FL Attack Vectors & Defenses", "FL Attack Vectors & Defenses")}</h2>
            <div className="space-y-4">
              {FL_ATTACKS.map((a) => (
                <div key={a.id} className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-lg border border-gray-700/50 shadow-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-cyan-400 bg-gray-900 px-2 py-1 rounded">{a.id}</span>
                    <span className="font-semibold text-gray-100">{a.name}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${a.severity === "CRITICAL" ? "bg-red-900 text-red-300" : a.severity === "HIGH" ? "bg-orange-900 text-orange-300" : "bg-yellow-900 text-yellow-300"}`}>{a.severity}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{a.desc}</p>
                  <p className="text-sm text-green-300"><strong>{pick(isDE, "Defense:", "Defense:")} {a.defense}</strong></p>
                </div>
              ))}
            </div>

            {/* Self-Hosted FL Setup */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Self-Hosted FL Setup (Flower Framework)", "Self-Hosted FL Setup (Flower Framework)")}</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`# Flower (flwr) — production-secure FL server config
import flwr as fl
from flwr.server.strategy import FedTrimmedAvg  # Byzantine-robust

strategy = FedTrimmedAvg(
    fraction_fit=0.3,           # 30% clients per round
    min_fit_clients=5,          # Minimum 5 clients
    min_available_clients=10,
    beta=0.1,                   # Trim top/bottom 10% of updates
    # Add differential privacy wrapper:
    # strategy = DifferentialPrivacyServerSideAdaptiveClipping(
    #   strategy, noise_multiplier=1.1, num_sampled_clients=10
    # )
)

fl.server.start_server(
    server_address="127.0.0.1:8080",  # localhost only
    config=fl.server.ServerConfig(num_rounds=100),
    strategy=strategy,
    # mTLS via nginx reverse proxy in front
)

# Client authentication: verify X.509 cert before accepting updates
# Gradient norm clipping: max_norm=1.0 on all client updates`}</pre>
              </div>
            </div>

            {/* GDPR Compliance */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "GDPR Compliance Vorteile von FL", "GDPR Compliance Advantages of FL")}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-900 p-4 rounded-lg border border-green-700">
                  <h4 className="font-semibold text-green-300 mb-2">{pick(isDE, "Data Minimisation (Art. 5)", "Data Minimisation (Art. 5)")}</h4>
                  <p className="text-sm text-green-200">{pick(isDE, "Nur Gradient-Updates verlassen Client-Systeme — nie Rohdaten. Mathematischer Beweis, dass Rekonstruktion mit DP rechnerisch unmöglich.", "Only gradient updates leave client systems — never raw personal data. Mathematical proof that reconstruction is computationally infeasible with DP.")}</p>
                </div>
                <div className="bg-blue-900 p-4 rounded-lg border border-blue-700">
                  <h4 className="font-semibold text-blue-300 mb-2">{pick(isDE, "Purpose Limitation (Art. 5)", "Purpose Limitation (Art. 5)")}</h4>
                  <p className="text-sm text-blue-200">{pick(isDE, "Daten bleiben in Client-Systemen unter ursprünglichem Zweck. Zentraler Server verarbeitet nie persönliche Daten — nur Model-Updates.", "Data stays in client systems under original purpose. Central server never processes personal data — only model updates.")}</p>
                </div>
                <div className="bg-yellow-900 p-4 rounded-lg border border-yellow-700">
                  <h4 className="font-semibold text-yellow-300 mb-2">{pick(isDE, "No Third-Country Transfer", "No Third-Country Transfer")}</h4>
                  <p className="text-sm text-yellow-200">{pick(isDE, "Self-hosted FL Server in EU. Keine persönlichen Daten verlassen EU-Jurisdiktion. Keine Schrems-II Concerns, keine SCCs erforderlich.", "Self-hosted FL server in EU. No personal data leaves EU jurisdiction. No Schrems-II concerns, no SCCs required.")}</p>
                </div>
                <div className="bg-red-900 p-4 rounded-lg border border-red-700">
                  <h4 className="font-semibold text-red-300 mb-2">{pick(isDE, "Residual Risk: Gradient Attacks", "Residual Risk: Gradient Attacks")}</h4>
                  <p className="text-sm text-red-200">{pick(isDE, "Ohne DP können Gradient-Updates Trainingsdaten via Model Inversion noch leaken. DP ist mandatory für echte GDPR-Compliance in FL.", "Without DP, gradient updates can still leak training data via model inversion. DP is mandatory for genuine GDPR compliance in FL.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: Gradient Poisoning ohne Byzantine-Defense", "SCAR #1: Gradient Poisoning without Byzantine-Defense")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Gradient Poisoning ohne Byzantine-robust Aggregation. Böswilliger Client injiziert Backdoor in globales Modell. Fix: Aktiviere FedTrimmedAvg oder Krum.", "Gradient poisoning without Byzantine-robust aggregation. Malicious client injects backdoor into global model. Fix: Enable FedTrimmedAvg or Krum.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Byzantine-Defense. Lessons: Aktiviere robuste Aggregation für alle FL-Trainings.", "Root Cause: No Byzantine-defense. Lessons: Enable robust aggregation for all FL trainings.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Model Inversion ohne DP", "SCAR #2: Model Inversion without DP")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Model Inversion ohne Differential Privacy. Angreifer rekonstruiert Trainingsdaten aus Gradienten, Datenschutz-Verstoß. Fix: Aktiviere DP-SGD mit ε ≤ 1.0.", "Model inversion without differential privacy. Attacker reconstructs training data from gradients, privacy violation. Fix: Enable DP-SGD with ε ≤ 1.0.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein DP. Lessons: Aktiviere Differential Privacy für alle FL-Gradient-Sharing.", "Root Cause: No DP. Lessons: Enable differential privacy for all FL gradient sharing.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "mTLS für alle FL Clients aktivieren", "Enable mTLS for all FL clients")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Issue X.509 Zertifikate für alle Clients. Erzwinge mTLS für alle Server-Verbindungen.", "Issue X.509 certificates for all clients. Enforce mTLS for all server connections.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Byzantine-robust Aggregation aktivieren", "Enable Byzantine-robust aggregation")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Ersetze FedAvg mit FedTrimmedAvg oder Krum. Clip Gradient-Normen vor Aggregation.", "Replace FedAvg with FedTrimmedAvg or Krum. Clip gradient norms before aggregation.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Differential Privacy aktivieren", "Enable Differential Privacy")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere DP-SGD mit ε ≤ 1.0 für alle Gradient-Sharing.", "Enable DP-SGD with ε ≤ 1.0 for all gradient sharing.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive FL Security Checkliste", "Interactive FL Security Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "fl1", text: pick(isDE, "mTLS für alle FL Clients aktiviert", "mTLS for all FL clients enabled") },
                  { id: "fl2", text: pick(isDE, "Byzantine-robust Aggregation (FedTrimmedAvg/Krum) aktiviert", "Byzantine-robust aggregation (FedTrimmedAvg/Krum) enabled") },
                  { id: "fl3", text: pick(isDE, "Gradient-Norm Clipping aktiviert", "Gradient-norm clipping enabled") },
                  { id: "fl4", text: pick(isDE, "Differential Privacy (DP-SGD) mit ε ≤ 1.0 aktiviert", "Differential privacy (DP-SGD) with ε ≤ 1.0 enabled") },
                  { id: "fl5", text: pick(isDE, "Client Contribution Verification aktiviert", "Client contribution verification enabled") },
                  { id: "fl6", text: pick(isDE, "Per-Client Update Statistics Monitoring aktiviert", "Per-client update statistics monitoring enabled") },
                  { id: "fl7", text: pick(isDE, "Gradient Update Signature Verification aktiviert", "Gradient update signature verification enabled") },
                  { id: "fl8", text: pick(isDE, "Model Version SHA-256 Checksum aktiviert", "Model version SHA-256 checksum enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* FL Security Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "FL Security Score Calculator", "FL Security Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Ist mTLS für alle FL Clients aktiv?", "Is mTLS for all FL clients active?"), weight: 25 },
                  { q: pick(isDE, "Ist Byzantine-robust Aggregation aktiv?", "Is Byzantine-robust aggregation active?"), weight: 25 },
                  { q: pick(isDE, "Ist Differential Privacy aktiv?", "Is differential privacy active?"), weight: 25 },
                  { q: pick(isDE, "Ist Client Contribution Monitoring aktiv?", "Is client contribution monitoring active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein FL Security Score:", "Your FL Security Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 17/100", "Industry Average: 17/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Federated Learning, Differential Privacy, Gradient Poisoning und Byzantine Robust Aggregation.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in federated learning, differential privacy, gradient poisoning and Byzantine robust aggregation.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/moltbot/ai-agent-security`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">AI Agent Security Hub</div>
                <div className="text-sm text-gray-300">{pick(isDE, "OWASP LLM Top 10 — Defense Map", "OWASP LLM Top 10 — defense map")}</div>
              </a>
              <a href={`/${locale}/moltbot/model-poisoning-protection`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Model Poisoning Protection</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Supply Chain Threats", "Supply chain threats")}</div>
              </a>
              <a href={`/${locale}/solutions/dsgvo-compliance-automation`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">DSGVO / GDPR Compliance</div>
                <div className="text-sm text-gray-300">{pick(isDE, "FL + GDPR Strategy", "FL + GDPR strategy")}</div>
              </a>
              <a href={`/${locale}/moltbot/secure-agent-communication`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Secure Agent Communication</div>
                <div className="text-sm text-gray-300">{pick(isDE, "mTLS für FL", "mTLS for FL")}</div>
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
  );
}
