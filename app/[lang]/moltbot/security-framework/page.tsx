import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n';
import { pick } from '@/lib/i18n-pick';

interface PageProps {
  params: { lang: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = params;
  
  return {
    title: pick(lang === 'de', "Moltbot Security Framework: Vollständiger Überblick 2026", "Moltbot Security Framework: Complete Overview 2026"),
    description: pick(lang === 'de', "Fundamentale Architektur und Security-Prinzipien von Moltbot mit Best Practices für 2026. Vollständiger Security Framework Guide mit Implementierungsstrategien.", "Fundamental architecture and security principles of Moltbot with best practices for 2026. Complete security framework guide with implementation strategies."),
    keywords: ["moltbot security framework", "moltbot architecture", "security principles", "bot security", "ai agent security", "security best practices 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: {
      title: pick(lang === 'de', "Moltbot Security Framework: Vollständiger Überblick 2026", "Moltbot Security Framework: Complete Overview 2026"),
      description: pick(lang === 'de', "Fundamentale Architektur und Security-Prinzipien von Moltbot mit Best Practices für 2026.", "Fundamental architecture and security principles of Moltbot with best practices for 2026."),
      type: "article",
      url: `https://clawguru.org/${lang}/moltbot/security-framework`,
      images: ["/og-moltbot-security-framework.jpg"]
    },
    twitter: {
      card: "summary_large_image",
      title: pick(lang === 'de', "Moltbot Security Framework: Vollständiger Überblick 2026", "Moltbot Security Framework: Complete Overview 2026"),
      description: pick(lang === 'de', "Fundamentale Architektur und Security-Prinzipien von Moltbot mit Best Practices für 2026.", "Fundamental architecture and security principles of Moltbot with best practices for 2026."),
      images: ["/og-moltbot-security-framework.jpg"]
    },
    alternates: buildLocalizedAlternates(lang as Locale, '/moltbot/security-framework'),
    robots: "index, follow"
  };
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default function MoltbotSecurityFrameworkPage({ params }: PageProps) {
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
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Dieser Guide dient ausschließlich zu Bildungs- und Hardening-Zwecken. Kein Angriffswerkzeug.", "This guide is for educational and hardening purposes only. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up">
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Security Framework</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "Moltbot Security Framework: Vollständiger Überblick 2026", "Moltbot Security Framework: Complete Overview 2026")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Fundamentale Architektur und Security-Prinzipien von Moltbot mit Best Practices für 2026. Vollständiger Security Framework Guide mit Implementierungsstrategien.", "Fundamental architecture and security principles of Moltbot with best practices for 2026. Complete security framework guide with implementation strategies.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist das Moltbot Security Framework? Einfach erklärt", "What is the Moltbot Security Framework? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Stell dir Moltbot als einen Wachmann vor, der deine Systeme schützt. Das Security Framework ist sein Regelwerk: Zero Trust bedeutet, er vertraut niemandem blind — jeder Besucher muss sich ausweisen. Defense in Depth bedeutet mehrere Sicherheitsschichten — wie ein Hochsicherheitsgebäude mit Zäunen, Kameras, Sicherheitsschleusen und Tresoren. Secure by Design bedeutet, dass Sicherheit von Anfang an eingebaut ist, nicht nachträglich aufgeklebt.", "Think of Moltbot as a security guard protecting your systems. The Security Framework is his rulebook: Zero Trust means he trusts no one blindly — every visitor must show ID. Defense in Depth means multiple security layers — like a high-security building with fences, cameras, security airlocks, and vaults. Secure by Design means security is built in from the start, not added as an afterthought.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Framework-Architektur, Authentication und Threat Detection", "Jump to framework architecture, authentication, and threat detection")}</p>
          </div>
        </section>

        <div className="prose prose-invert max-w-none">

          <section className="mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Executive Summary', 'Executive Summary')}</h2>
            <p>
              Das <strong>Moltbot Security Framework</strong> stellt einen umfassenden Ansatz für die Absicherung von autonomen Bot-Systemen dar. In einer Zeit, in der AI-gesteuerte Automatisierung kritische Geschäftsprozesse steuert, ist ein robustes Security Framework überlebenswichtig.
            </p>
            
            <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="font-semibold mb-2 text-gray-100">Kernprinzipien:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li><strong>Zero Trust Architecture</strong> - Jede Anfrage muss verifiziert werden</li>
                <li><strong>Defense in Depth</strong> - Mehrschichtige Sicherheitskontrollen</li>
                <li><strong>Secure by Design</strong> - Security von Anfang an integriert</li>
                <li><strong>Continuous Monitoring</strong> - Permanente Überwachung und Anpassung</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-12 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Framework-Architektur', 'Framework Architecture')}</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Schicht 1: Perimeter Security</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Network Level Protection</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <pre>{`network_security:
  firewall_rules:
    - allow: "10.0.0.0/8"
      ports: [443, 8080]
      description: "Internal network access"
    - deny: "0.0.0.0/0"
      ports: [22, 3389]
      description: "Block remote management"
  ddos_protection:
    rate_limit: "1000 req/min"
    burst_limit: "5000 req"
    blacklist_duration: "3600s"`}</pre>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">API Gateway Security</h4>
                <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm">
                  <pre>{`interface APIGatewayConfig {
  rateLimiting: {
    requests: number;
    window: string;
    burst: number;
  };
  authentication: {
    required: boolean;
    methods: ('JWT' | 'OAuth2' | 'API-Key')[];
  };
  validation: {
    schema: object;
    sanitization: boolean;
  };
}`}</pre>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Schicht 2: Application Security</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Input Validation & Sanitization</h4>
                <div className="bg-gray-900 text-yellow-400 p-4 rounded-lg font-mono text-sm">
                  <pre>{`// Input Sanitization Middleware
const sanitizeInput = (input) => {
  return {
    data: DOMPurify.sanitize(input),
    metadata: {
      length: input.length,
      type: typeof input,
      timestamp: Date.now()
    }
  };
};`}</pre>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Session Management</h4>
                <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-sm">
                  <pre>{`// Rate Limiting Implementation
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});`}</pre>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Schicht 3: Data Security</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Encryption at Rest</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <pre>{`database_security:
  encryption:
    algorithm: "AES-256-GCM"
    key_rotation: "90d"
    backup_encryption: true
  access_control:
    principle_of_least_privilege: true
    role_based_access: true
    audit_logging: true`}</pre>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Data in Transit Protection</h4>
                <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm">
                  <pre>{`// TLS Configuration Best Practices
const tlsConfig = {
  minVersion: 'TLSv1.2',
  ciphers: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_GCM_SHA256'
  ],
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
};`}</pre>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Authentication &amp; Authorization', 'Authentication &amp; Authorization')}</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Multi-Factor Authentication (MFA)</h3>
              <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-sm">
                <pre>{`// MFA Implementation
interface MFAConfig {
  enabled: boolean;
  methods: ('TOTP' | 'SMS' | 'Email' | 'Hardware-Key')[];
  backup_codes: {
    count: number;
    expiration: string;
  };
  session_management: {
    max_concurrent: number;
    timeout: string;
  };
}`}</pre>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Role-Based Access Control (RBAC)</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <pre>{`// RBAC Configuration
roles:
  admin:
    permissions:
      - "user:*"
      - "system:*"
      - "audit:read"
  operator:
    permissions:
      - "bot:read"
      - "bot:update"
      - "monitoring:read"
  viewer:
    permissions:
      - "bot:read"
      - "monitoring:read"`}</pre>
              </div>
            </div>
          </section>
          
          <section className="mb-12 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Monitoring &amp; Logging', 'Monitoring &amp; Logging')}</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Security Event Monitoring</h3>
              <div className="bg-gray-900 text-yellow-400 p-4 rounded-lg font-mono text-sm">
                <pre>{`// Security Event Monitoring
interface SecurityEvent {
  id: string;
  timestamp: Date;
  type: 'AUTHENTICATION' | 'AUTHORIZATION' | 'DATA_ACCESS' | 'SYSTEM';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  source: {
    ip: string;
    userAgent: string;
    userId?: string;
  };
  details: {
    action: string;
    resource: string;
    result: 'SUCCESS' | 'FAILURE';
  };
}`}</pre>
              </div>
            </div>
          </section>
          
          <section className="mb-12 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Threat Detection &amp; Response', 'Threat Detection &amp; Response')}</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Automated Threat Detection</h3>
              <div className="bg-gray-900 text-red-400 p-4 rounded-lg font-mono text-sm">
                <pre>{`// Threat Detection Engine
class ThreatDetectionEngine {
  private patterns: ThreatPattern[] = [];
  
  async analyzeRequest(request: IncomingRequest): Promise<ThreatAssessment> {
    const threats = await Promise.all([
      this.detectSQLInjection(request),
      this.detectXSS(request),
      this.detectCSRF(request),
      this.detectRateLimitAbuse(request),
      this.detectAnomalousBehavior(request)
    ]);
    
    return {
      riskScore: this.calculateRiskScore(threats),
      detectedThreats: threats.filter(t => t.confidence > 0.8),
      recommendations: this.generateRecommendations(threats)
    };
  }
}`}</pre>
              </div>
            </div>
          </section>
          
          <section className="mb-12 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Implementation Guide', 'Implementation Guide')}</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Step 1: Foundation Setup</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <pre>{`# 1. Security Dependencies Installation
npm install helmet cors express-rate-limit bcryptjs jsonwebtoken
npm install @types/bcryptjs @types/jsonwebtoken --save-dev

# 2. Environment Configuration
cp .env.example .env.local
# Configure security variables
SECURITY_KEY=your-256-bit-secret-key
JWT_SECRET=your-jwt-secret
MFA_SECRET=your-mfa-secret`}</pre>
              </div>
            </div>
          </section>
          
          <section className="mb-12 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <a href={`/${lang}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <div className="font-semibold text-cyan-400">Security Check</div>
                <div className="text-sm text-gray-300">{pick(isDE, 'System jetzt scannen', 'Scan your system now')}</div>
              </a>
              <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <div className="font-semibold text-cyan-400">Security Runbooks</div>
                <div className="text-sm text-gray-300">{pick(isDE, '600+ Security Playbooks', '600+ security playbooks')}</div>
              </a>
              <a href={`/${lang}/moltbot/zero-trust-architecture`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <div className="font-semibold text-cyan-400">Zero Trust Architecture</div>
                <div className="text-sm text-gray-300">{pick(isDE, 'Never Trust, Always Verify', 'Never Trust, Always Verify')}</div>
              </a>
              <a href={`/${lang}/moltbot/ai-agent-security`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <div className="font-semibold text-cyan-400">AI Agent Security Hub</div>
                <div className="text-sm text-gray-300">{pick(isDE, 'OWASP LLM Top 10 Defense-Map', 'OWASP LLM Top 10 defense map')}</div>
              </a>
            </div>
          </section>
        </div>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Security Framework Architects</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 27.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 27.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Security Frameworks in Produktionsumgebungen. Das beschriebene Moltbot Security Framework ist in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with security frameworks in production environments. The Moltbot Security Framework described has been proven in real deployments and continuously improved.')}
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
            url: "https://clawguru.org/de/moltbot/security-framework"
          }
        ]) }} />
      </div>
    </div>
  );
}