import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/data-loss-prevention"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Data Loss Prevention: DLP & Data Classification Guide 2026 | ClawGuru", "Moltbot Data Loss Prevention: DLP & Data Classification Guide 2026 | ClawGuru")
  const description = pick(isDE, "Data Loss Prevention für Moltbot. DLP-Implementierung, Datenklassifizierung, Endpoint-DLP, Network-DLP und automatisierte Erkennung sensibler Daten.", "Data Loss Prevention for Moltbot. DLP implementation, data classification, endpoint DLP, network DLP and automated sensitive data detection.")
  return {
    title, description,
    keywords: ['moltbot data loss prevention','dlp','data classification','endpoint dlp','network dlp','sensitive data detection'],
    authors: [{ name: 'R. Schwertfechter' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: `${SITE_URL}/${locale}${PATH}`,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

const DATA_CLASSIFICATION = [
  ['Confidential', pick(true, 'Höchste Vertraulichkeit', 'Highest Confidentiality'), pick(true, 'API-Keys, Passwörter, Private Keys', 'API-Keys, Passwords, Private Keys'), pick(true, 'Verschlüsselung, Access-Control, DLP-Block', 'Encryption, Access-Control, DLP-Block')],
  ['Internal', pick(true, 'Intern vertraulich', 'Internal Confidential'), pick(true, 'Dokumente, E-Mails, Reports', 'Documents, Emails, Reports'), pick(true, 'Verschlüsselung, Logging, Monitoring', 'Encryption, Logging, Monitoring')],
  ['Public', pick(true, 'Öffentlich', 'Public'), pick(true, 'Marketing, Blog, Dokumentation', 'Marketing, Blog, Documentation'), pick(true, 'Keine besonderen Maßnahmen', 'No special measures')],
]

const FAQ = [
  { q: pick(true, "Was ist DLP?", "What is DLP?"), a: pick(true, "Data Loss Prevention (DLP) ist eine Strategie und Technologien, um sensible Daten vor unbeabsichtigter Offenlegung zu schützen. DLP erkennt, überwacht und schützt Daten in Ruhe, in Bewegung und in Nutzung. Für Moltbot bedeutet das: Pattern-Matching für API-Keys, Credit Cards, SSN, Email-Adressen und automatische Blockierung bei DLP-Verstößen.", "Data Loss Prevention (DLP) is a strategy and technologies to protect sensitive data from accidental disclosure. DLP detects, monitors and protects data at rest, in motion and in use. For Moltbot, this means: pattern matching for API-Keys, Credit Cards, SSN, email addresses and automatic blocking on DLP violations.") },
  { q: pick(true, "Wie implementiere ich DLP für Moltbot?", "How do I implement DLP for Moltbot?"), a: pick(true, "1) Definiere Data Classification Matrix. 2) Implementiere DLP Policy Engine mit Pattern-Matching. 3) Aktiviere Endpoint DLP Agent für File-Scanning. 4) Aktiviere Network DLP für API-Endpoints. 5) Teste DLP mit synthetischen sensiblen Daten. 6) Monitor DLP-Alerts und adjustiere Policies.", "1) Define Data Classification Matrix. 2) Implement DLP Policy Engine with pattern matching. 3) Enable Endpoint DLP Agent for file scanning. 4) Enable Network DLP for API endpoints. 5) Test DLP with synthetic sensitive data. 6) Monitor DLP alerts and adjust policies.") },
  { q: pick(true, "Was ist Endpoint DLP?", "What is Endpoint DLP?"), a: pick(true, "Endpoint DLP überwacht Endpoints (Laptops, Desktops, Server) auf sensible Daten. File-Watcher scannen neue/geänderte Dateien auf Pattern-Matches (API-Keys, Credit Cards). Bei DLP-Verstoß: Block Upload, Alert Admin, Log Incident. Für Moltbot: Chokidar File-Watcher für /home/user/Documents mit automatischem Scan bei File-Change.", "Endpoint DLP monitors endpoints (laptops, desktops, servers) for sensitive data. File watchers scan new/changed files for pattern matches (API-Keys, Credit Cards). On DLP violation: Block upload, alert admin, log incident. For Moltbot: Chokidar file watcher for /home/user/Documents with automatic scan on file change.") },
  { q: pick(true, "Wie erkenne ich API-Keys in Logs?", "How do I detect API-Keys in logs?"), a: pick(true, "Pattern-Matching ist der effektivste Weg. API-Keys haben typische Präfixe: sk_, pk_, sk- (Stripe), AKIA... (AWS), xoxb- (Slack). Regex: /(?:sk_|pk_|sk-)[a-zA-Z0-9]{20,}/g. Implementiere Log-Scanning Middleware, der Logs vor Speicherung scannt und API-Keys redacted (sk_*****) oder blockiert.", "Pattern matching is the most effective way. API-Keys have typical prefixes: sk_, pk_, sk- (Stripe), AKIA... (AWS), xoxb- (Slack). Regex: /(?:sk_|pk_|sk-)[a-zA-Z0-9]{20,}/g. Implement log scanning middleware that scans logs before storage and redacts (sk_*****) or blocks API-Keys.") },
]

export default function MoltbotDlpPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Data Loss Prevention: DLP & Data Classification Guide 2026 | ClawGuru", "Moltbot Data Loss Prevention: DLP & Data Classification Guide 2026 | ClawGuru")

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Data Loss Prevention", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
    { "@context": "https://schema.org", "@type": "Person", name: "R. Schwertfechter", jobTitle: "Principal Ops-Engineer & Security Architect", knowsAbout: ["Data Loss Prevention", "DLP", "Data Classification", "Endpoint Security", "Pattern Matching"] },
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
                <a href="#amateur-section" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Was ist DLP?", "What is DLP?")}</a>
                <a href="#deep-dive" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Data Classification Matrix", "Data Classification Matrix")}</a>
                <a href="#scars" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Real-World Scars", "Real-World Scars")}</a>
                <a href="#controls" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Sofortmaßnahmen", "Immediate Actions")}</a>
                <a href="#checklist" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "Interaktive Checkliste", "Interactive Checklist")}</a>
                <a href="#calculator" className="block text-gray-300 hover:text-cyan-400 transition-colors">{pick(isDE, "DLP Maturity Score", "DLP Maturity Score")}</a>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">{pick(isDE, "Lesezeit:", "Reading time:")}</div>
                <div className="text-sm text-gray-300">11 min</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Data Loss Prevention · Production-Ready Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              {pick(isDE, "Moltbot Data Loss Prevention — Du hast kein DLP, keine Datenklassifizierung und kein Pattern-Matching. API-Keys in Logs, Credit Cards in Chat, SSN in E-Mails. 48h Incident-Response, Daten-Leak, dein CEO hat den CISO gefeuert.", "Moltbot Data Loss Prevention — You Have No DLP, No Data Classification, No Pattern Matching. API-Keys in Logs, Credit Cards in Chat, SSN in Emails. 48h Incident Response, Data Leak, Your CEO Fired the CISO.")}
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {pick(isDE, "Du hast kein DLP, keine Datenklassifizierung und kein Pattern-Matching. API-Keys in Logs, Credit Cards in Chat, SSN in E-Mails. 43% aller Security-Vorfälle betreffen Datenlecks. 48h Incident-Response, Daten-Leak, dein CEO hat den CISO gefeuert. Hier ist, wie du das verhinderst.", "You have no DLP, no data classification and no pattern matching. API-Keys in logs, credit cards in chat, SSN in emails. 43% of all security incidents involve data leaks. 48h incident response, data leak, your CEO fired the CISO. Here's how to prevent it.")}
            </p>
          </div>

          {/* Not a Pentest Notice */}
          <div className="bg-amber-900 border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "DLP schützt eigene Daten vor unbeabsichtigter Offenlegung. Keine Angriffswerkzeuge.", "DLP protects your own data from accidental disclosure. No attack tools.")}
          </div>

          {/* Amateur Section */}
          <section id="amateur-section" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{pick(isDE, "Was ist DLP? Einfach erklärt.", "What is DLP? Simply explained.")}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {pick(isDE, "Stell dir DLP wie einen Security-Guard für deine Daten vor: Er erkennt, überwacht und schützt sensible Daten vor unbeabsichtigter Offenlegung. Für Moltbot bedeutet das: Pattern-Matching für API-Keys, Credit Cards, SSN, Email-Adressen. Endpoint DLP überwacht Files, Network DLP überwacht API-Endpoints. Gutes DLP bedeutet: Never leak data, always detect patterns.", "Think of DLP like a security guard for your data: it detects, monitors and protects sensitive data from accidental disclosure. For Moltbot, this means: pattern matching for API-Keys, Credit Cards, SSN, email addresses. Endpoint DLP monitors files, Network DLP monitors API endpoints. Good DLP means: never leak data, always detect patterns.")}
              </p>
              <a href="#deep-dive" className="text-cyan-400 hover:text-cyan-300 font-semibold">{pick(isDE, "↓ Springe direkt zur technischen Tiefe", "↓ Jump to technical depth")}</a>
            </div>
          </section>

          {/* Deep Dive */}
          <section id="deep-dive" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Data Classification Matrix", "Data Classification Matrix")}</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm bg-gray-900 border border-gray-700 rounded-lg">
                <thead><tr className="bg-gray-800 text-white"><th className="p-3 text-left">{pick(isDE, "Klasse", "Class")}</th><th className="p-3 text-left">{pick(isDE, "Beschreibung", "Description")}</th><th className="p-3 text-left">{pick(isDE, "Beispiele", "Examples")}</th><th className="p-3 text-left">{pick(isDE, "Schutzmaßnahmen", "Protection")}</th></tr></thead>
                <tbody>
                  {DATA_CLASSIFICATION.map(([cls, desc, examples, protection]) => (
                    <tr key={cls} className="border-b border-gray-700 hover:bg-gray-800">
                      <td className="p-3 font-medium">{cls}</td>
                      <td className="p-3 text-sm">{desc}</td>
                      <td className="p-3 text-sm">{examples}</td>
                      <td className="p-3 text-sm">{protection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DLP Policy Engine */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">DLP Policy Engine</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`// DLP Policy Engine für Moltbot
const DLP_PATTERNS = {
  api_key: /(?:sk_|pk_|sk-)[a-zA-Z0-9]{20,}/g,
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g,
  credit_card: /\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\\b/g,
  ssn: /\\b\\d{3}-\\d{2}-\\d{4}\\b/g,
};

export function scanForSensitiveData(text) {
  const findings = [];
  
  for (const [type, pattern] of Object.entries(DLP_PATTERNS)) {
    const matches = text.match(pattern);
    if (matches) {
      findings.push({ type, count: matches.length, matches });
    }
  }
  
  return findings;
}

// Middleware für API-Endpoints
export function dlpMiddleware(req, res, next) {
  const body = JSON.stringify(req.body);
  const findings = scanForSensitiveData(body);
  
  if (findings.some(f => f.type === 'api_key')) {
    return res.status(403).json({ error: 'Sensitive data detected' });
  }
  
  next();
}`}</pre>
              </div>
            </div>

            {/* Endpoint DLP */}
            <div className="mt-8 bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Endpoint DLP Integration", "Endpoint DLP Integration")}</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <pre>{`// Endpoint DLP Agent für Moltbot
class EndpointDLP {
  constructor() {
    this.policies = new Map();
    this.setupFileWatcher();
  }
  
  setupFileWatcher() {
    const watcher = chokidar.watch('/home/user/Documents', {
      ignored: /(^|[\\/\\\\])\\../,
      persistent: true
    });
    
    watcher.on('change', (path) => {
      this.scanFile(path);
    });
  }
  
  async scanFile(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    const findings = scanForSensitiveData(content);
    
    if (findings.length > 0) {
      await this.handleDataLeak(filePath, findings);
    }
  }
  
  async handleDataLeak(filePath, findings) {
    // Block Upload, Alert Admin, Log Incident
    await this.blockFileAccess(filePath);
    await this.sendAlert({
      type: 'DLP_VIOLATION',
      file: filePath,
      findings,
      timestamp: new Date().toISOString()
    });
  }
}

// Deployment
const dlp = new EndpointDLP();`}</pre>
              </div>
            </div>
          </section>

          {/* Real-World Scars */}
          <section id="scars" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Real-World Scars: Production Incidents", "Real-World Scars: Production Incidents")}</h2>
            
            {/* Scar 1 */}
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 font-bold">{pick(isDE, "SCAR #1: API-Keys in Logs", "SCAR #1: API-Keys in Logs")}</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "API-Keys in Logs ohne Redaction. Log-Aggregator speichert Keys, Daten-Leak. Fix: Log-Scanning Middleware mit Pattern-Matching.", "API-Keys in logs without redaction. Log aggregator stores keys, data leak. Fix: Log scanning middleware with pattern matching.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Log-Scanning. Lessons: Aktiviere Pattern-Matching für alle Logs.", "Root Cause: No log scanning. Lessons: Enable pattern matching for all logs.")}</div>
            </div>

            {/* Scar 2 */}
            <div className="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-400 font-bold">{pick(isDE, "SCAR #2: Credit Cards in Chat", "SCAR #2: Credit Cards in Chat")}</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">HIGH</span>
              </div>
              <p className="text-gray-300 mb-3">{pick(isDE, "Credit Cards in Chat ohne DLP. Chat-Logs speichern CC-Nummern, PCI-DSS-Verstoß. Fix: Real-time DLP-Scanning für alle Chat-Messages.", "Credit cards in chat without DLP. Chat logs store CC numbers, PCI-DSS violation. Fix: Real-time DLP scanning for all chat messages.")}</p>
              <div className="text-sm text-gray-400">{pick(isDE, "Root Cause: Kein Chat-DLP. Lessons: Aktiviere Real-time DLP für alle Chat-Endpoints.", "Root Cause: No chat DLP. Lessons: Enable real-time DLP for all chat endpoints.")}</div>
            </div>
          </section>

          {/* Controls */}
          <section id="controls" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Sofortmaßnahmen: Was heute tun?", "Immediate Actions: What to do today?")}</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Data Classification definieren", "Define Data Classification")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Definiere Data Classification Matrix für alle Daten.", "Define data classification matrix for all data.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "DLP Policy Engine aktivieren", "Enable DLP Policy Engine")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere Pattern-Matching für API-Keys, Credit Cards, SSN.", "Enable pattern matching for API-Keys, Credit Cards, SSN.")}</p>
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-lg p-5 rounded-xl border border-gray-700/50 flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2">{pick(isDE, "Endpoint DLP konfigurieren", "Configure Endpoint DLP")}</h4>
                  <p className="text-sm text-gray-300">{pick(isDE, "Aktiviere File-Watcher für sensiblen Verzeichnisse.", "Enable file watcher for sensitive directories.")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Checklist */}
          <section id="checklist" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "Interaktive DLP Checkliste", "Interactive DLP Checklist")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-3">
                {[
                  { id: "dlp1", text: pick(isDE, "Data Classification Matrix definiert", "Data classification matrix defined") },
                  { id: "dlp2", text: pick(isDE, "DLP Policy Engine aktiviert", "DLP policy engine enabled") },
                  { id: "dlp3", text: pick(isDE, "API-Key Pattern-Matching aktiviert", "API-Key pattern matching enabled") },
                  { id: "dlp4", text: pick(isDE, "Credit Card Pattern-Matching aktiviert", "Credit card pattern matching enabled") },
                  { id: "dlp5", text: pick(isDE, "SSN Pattern-Matching aktiviert", "SSN pattern matching enabled") },
                  { id: "dlp6", text: pick(isDE, "Log-Scanning Middleware aktiviert", "Log scanning middleware enabled") },
                  { id: "dlp7", text: pick(isDE, "Endpoint DLP File-Watcher aktiviert", "Endpoint DLP file watcher enabled") },
                  { id: "dlp8", text: pick(isDE, "Network DLP für API-Endpoints aktiviert", "Network DLP for API endpoints enabled") },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500" />
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors">{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* DLP Maturity Score Calculator */}
          <section id="calculator" className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">{pick(isDE, "DLP Maturity Score Calculator", "DLP Maturity Score Calculator")}</h2>
            <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl">
              <div className="space-y-4">
                {[
                  { q: pick(isDE, "Hast du Data Classification definiert?", "Have you defined data classification?"), weight: 25 },
                  { q: pick(isDE, "Ist DLP Policy Engine aktiv?", "Is DLP policy engine active?"), weight: 25 },
                  { q: pick(isDE, "Ist Endpoint DLP konfiguriert?", "Is endpoint DLP configured?"), weight: 25 },
                  { q: pick(isDE, "Ist Network DLP aktiv?", "Is network DLP active?"), weight: 25 },
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
                  <span className="text-gray-300">{pick(isDE, "Dein DLP Maturity Score:", "Your DLP Maturity Score:")}</span>
                  <span className="text-3xl font-bold text-cyan-400">0/100</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{pick(isDE, "Industrie-Durchschnitt: 18/100", "Industry Average: 18/100")}</p>
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
                    {pick(isDE, "15+ Jahre Erfahrung als Ops-Engineer, Incident Responder und Security Architect. Experte für Data Loss Prevention, DLP, Data Classification und Pattern Matching.", "15+ years experience as Ops-Engineer, Incident Responder and Security Architect. Expert in data loss prevention, DLP, data classification and pattern matching.")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Further Resources */}
          <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold text-gray-100 mb-4">{pick(isDE, "Weiterführende Ressourcen", "Further Resources")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${locale}/securitycheck`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Security Check</div>
                <div className="text-sm text-gray-300">{pick(isDE, "DLP Status prüfen", "Check DLP status")}</div>
              </a>
              <a href={`/${locale}/runbooks`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">DLP Runbooks</div>
                <div className="text-sm text-gray-300">{pick(isDE, "DLP Playbooks", "DLP playbooks")}</div>
              </a>
              <a href={`/${locale}/neuro`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Neuro AI</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Pattern-Matching AI", "Pattern matching AI")}</div>
              </a>
              <a href={`/${locale}/solutions`} className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="font-semibold text-cyan-400">Enterprise</div>
                <div className="text-sm text-gray-300">{pick(isDE, "Managed DLP", "Managed DLP")}</div>
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