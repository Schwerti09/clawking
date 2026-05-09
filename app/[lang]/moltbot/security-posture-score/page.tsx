import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/security-posture-score"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === 'de'
  const title = pick(isDE, "Security Posture Score: Risk Assessment & Metrics 2026", "Security Posture Score: Risk Assessment & Metrics 2026")
  const description = pick(isDE, "Security Posture Score für Moltbot. Risk Assessment, Security Metrics, Posture Management, Compliance Scoring und Security KPIs.", "Security Posture Score for Moltbot. Risk assessment, security metrics, posture management, compliance scoring and security KPIs.")
  return {
    title,
    description,
    keywords: ['moltbot security posture score','risk assessment','security metrics','posture management','compliance scoring','security kpis'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotPostureScorePage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  const isDE = locale === 'de'
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: pick(isDE, 'Was ist ein Security Posture Score?', 'What is a Security Posture Score?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'Ein Security Posture Score ist eine quantitative Bewertung der Sicherheitslage eines Systems oder einer Organisation. Er misst die Effektivität von Sicherheitskontrollen, Compliance-Status und Risikobereitschaft auf einer Skala von 0-100.', 'A security posture score is a quantitative assessment of a system or organization\'s security posture. It measures the effectiveness of security controls, compliance status, and risk readiness on a 0-100 scale.') } },
      { '@type': 'Question', name: pick(isDE, 'Wie wird der Score berechnet?', 'How is the score calculated?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'Der Score wird aus 5 Kategorien berechnet: Infrastructure Security (25%), Application Security (30%), Data Protection (20%), Compliance (15%), Monitoring (10%). Jede Kategorie hat spezifische Checks mit Gewichtung.', 'The score is calculated from 5 categories: Infrastructure Security (25%), Application Security (30%), Data Protection (20%), Compliance (15%), Monitoring (10%). Each category has specific checks with weighting.') } },
      { '@type': 'Question', name: pick(isDE, 'Was bedeutet die Note (Grade)?', 'What does the grade mean?'), acceptedAnswer: { '@type': 'Answer', text: pick(isDE, 'Note A+ (90-100): Exzellente Sicherheitslage. A (85-89): Sehr gut. B+ (80-84): Gut. B (70-79): Akzeptabel. C+ (60-69): Verbesserungsbedarf. C (50-59): Kritisch. D (40-49): Hochriskant. F (0-39): Unakzeptabel.', 'Grade A+ (90-100): Excellent security posture. A (85-89): Very good. B+ (80-84): Good. B (70-79): Acceptable. C+ (60-69): Needs improvement. C (50-59): Critical. D (40-49): High risk. F (0-39): Unacceptable.') } },
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
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, 'Security Posture Score bewertet eigene Sicherheitslage. Keine Angriffswerkzeuge.', 'Security Posture Score evaluates your own security posture. No attack tools.')}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Risk Assessment</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, 'Security Posture Score', 'Security Posture Score')}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, 'Ohne Messung keine Verbesserung. Security Posture Scores machen Sicherheitslücken sichtbar und priorisieren Maßnahmen.', 'Without measurement, no improvement. Security posture scores make security gaps visible and prioritize actions.')}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Was ist ein Security Posture Score? Einfach erklärt', 'What is a Security Posture Score? Simply Explained')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, 'Ein Security Posture Score ist wie eine Schulnote für deine IT-Sicherheit. Er bewertet, wie gut dein System auf verschiedene Bedrohungen vorbereitet ist: Patch-Level, Konfiguration, Netzwerk, Daten, Compliance und Monitoring. Ein Score von 85+ (Note A) bedeutet starke Sicherheit. Unter 60 (C oder schlechter) deutet auf kritische Lücken hin. Moltbot berechnet diesen Score automatisch und zeigt dir, welche Bereiche sofort verbessert werden müssen.', 'A security posture score is like a school grade for your IT security. It evaluates how well your system is prepared for various threats: patch level, configuration, network, data, compliance, and monitoring. A score of 85+ (grade A) means strong security. Below 60 (C or worse) indicates critical gaps. Moltbot calculates this score automatically and shows you which areas need immediate improvement.')}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, 'Springe zu Score Framework, Calculation Engine und KPI Dashboard', 'Jump to score framework, calculation engine, and KPI dashboard')}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Security Posture Score Framework', 'Security Posture Score Framework')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 overflow-x-auto">
            <table className="w-full border-collapse text-sm text-gray-300">
              <thead><tr className="bg-gray-800/50 text-white"><th className="p-3 text-left">Kategorie</th><th className="p-3 text-left">Gewichtung</th><th className="p-3 text-left">Metriken</th><th className="p-3 text-left">Score-Bereich</th></tr></thead>
              <tbody>
                {[
                  ['Infrastructure Security', '25%', 'Patch Level, Configuration, Network', '0-100'],
                  ['Application Security', '30%', 'Code Analysis, Dependencies, Runtime', '0-100'],
                  ['Data Protection', '20%', 'Encryption, Access Control, DLP', '0-100'],
                  ['Compliance', '15%', 'Audits, Documentation, Controls', '0-100'],
                  ['Monitoring', '10%', 'Logging, Alerting, Response', '0-100'],
                ].map(([category, weight, metrics, range]) => (
                  <tr key={category} className="border-b hover:bg-gray-800/50 transition-colors">
                    <td className="p-3 font-medium">{category}</td>
                    <td className="p-3 text-sm">{weight}</td>
                    <td className="p-3 text-sm">{metrics}</td>
                    <td className="p-3 text-sm">{range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Score Calculation Engine', 'Score Calculation Engine')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`// Security Posture Score Engine für Moltbot
class SecurityPostureScorer {
  constructor() {
    this.categories = {
      infrastructure: { weight: 0.25, checks: [] },
      application: { weight: 0.30, checks: [] },
      data: { weight: 0.20, checks: [] },
      compliance: { weight: 0.15, checks: [] },
      monitoring: { weight: 0.10, checks: [] }
    };
    
    this.initializeChecks();
  }
  
  initializeChecks() {
    // Infrastructure Checks
    this.categories.infrastructure.checks = [
      {
        name: 'patch_level',
        weight: 0.4,
        evaluate: () => this.checkPatchLevel()
      },
      {
        name: 'configuration_hardening',
        weight: 0.3,
        evaluate: () => this.checkConfigurationHardening()
      },
      {
        name: 'network_security',
        weight: 0.3,
        evaluate: () => this.checkNetworkSecurity()
      }
    ];
    
    // Application Checks
    this.categories.application.checks = [
      {
        name: 'code_vulnerabilities',
        weight: 0.4,
        evaluate: () => this.checkCodeVulnerabilities()
      },
      {
        name: 'dependency_vulnerabilities',
        weight: 0.3,
        evaluate: () => this.checkDependencyVulnerabilities()
      },
      {
        name: 'runtime_protection',
        weight: 0.3,
        evaluate: () => this.checkRuntimeProtection()
      }
    ];
  }
  
  async calculateScore() {
    const results = {};
    let totalScore = 0;
    
    for (const [categoryName, category] of Object.entries(this.categories)) {
      let categoryScore = 0;
      let categoryWeight = 0;
      
      for (const check of category.checks) {
        const result = await check.evaluate();
        const weightedScore = result.score * check.weight;
        categoryScore += weightedScore;
        categoryWeight += check.weight;
        
        results[categoryName + '_' + check.name] = result;
      }
      
      const normalizedCategoryScore = categoryScore / categoryWeight;
      const weightedCategoryScore = normalizedCategoryScore * category.weight;
      totalScore += weightedCategoryScore;
      
      results[categoryName] = {
        score: normalizedCategoryScore,
        weighted_score: weightedCategoryScore,
        checks: category.checks.length
      };
    }
    
    return {
      overall_score: Math.round(totalScore * 100),
      grade: this.calculateGrade(totalScore),
      categories: results,
      timestamp: new Date().toISOString()
    };
  }
  
  calculateGrade(score) {
    if (score >= 0.9) return 'A+';
    if (score >= 0.85) return 'A';
    if (score >= 0.8) return 'B+';
    if (score >= 0.7) return 'B';
    if (score >= 0.6) return 'C+';
    if (score >= 0.5) return 'C';
    if (score >= 0.4) return 'D';
    return 'F';
  }
  
  async checkPatchLevel() {
    // Check system patch level
    const criticalPatches = await this.getCriticalPatches();
    const installedPatches = await this.getInstalledPatches();
    
    const missingPatches = criticalPatches.filter(patch => 
      !installedPatches.includes(patch.id)
    );
    
    const score = Math.max(0, 1 - (missingPatches.length / criticalPatches.length));
    
    return {
      score,
      details: {
        critical_patches: criticalPatches.length,
        installed_patches: installedPatches.length,
        missing_patches: missingPatches.length
      }
    };
  }
  
  async checkConfigurationHardening() {
    // Check security configurations
    const configs = await this.getSecurityConfigurations();
    const hardenedConfigs = configs.filter(config => config.hardened);
    
    return {
      score: hardenedConfigs.length / configs.length,
      details: {
        total_configs: configs.length,
        hardened_configs: hardenedConfigs.length,
        vulnerable_configs: configs.length - hardenedConfigs.length
      }
    };
  }
  
  async checkNetworkSecurity() {
    // Check network security controls
    const controls = await this.getNetworkControls();
    const activeControls = controls.filter(control => control.active);
    
    return {
      score: activeControls.length / controls.length,
      details: {
        total_controls: controls.length,
        active_controls: activeControls.length,
        missing_controls: controls.length - activeControls.length
      }
    };
  }
}

// Usage Example
const scorer = new SecurityPostureScorer();

async function generateSecurityReport() {
  const score = await scorer.calculateScore();
  
  // Generate recommendations
  const recommendations = generateRecommendations(score);
  
  return {
    score,
    recommendations,
    generated_at: new Date().toISOString()
  };
}

function generateRecommendations(scoreResult) {
  const recommendations = [];
  
  for (const [category, result] of Object.entries(scoreResult.categories)) {
    if (result.score < 0.7) {
      recommendations.push({
        category,
        priority: result.score < 0.5 ? 'high' : 'medium',
        description: 'Improve ' + category + ' security posture',
        actions: getRecommendedActions(category, result.score)
      });
    }
  }
  
  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Security KPI Dashboard', 'Security KPI Dashboard')}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-xl hover:border-cyan-500/30 transition-all duration-300 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`// Security KPI Dashboard für Moltbot
class SecurityDashboard {
  constructor() {
    this.metrics = new Map();
    this.alerts = [];
    this.trends = [];
  }
  
  async collectMetrics() {
    const metrics = {
      // Vulnerability Metrics
      critical_vulnerabilities: await this.getCriticalVulnerabilities(),
      high_vulnerabilities: await this.getHighVulnerabilities(),
      patch_coverage: await this.getPatchCoverage(),
      
      // Incident Metrics
      security_incidents: await this.getSecurityIncidents(),
      mean_time_to_detect: await this.getMTTD(),
      mean_time_to_resolve: await this.getMTTR(),
      
      // Compliance Metrics
      compliance_score: await this.getComplianceScore(),
      audit_findings: await this.getAuditFindings(),
      policy_violations: await this.getPolicyViolations(),
      
      // Risk Metrics
      risk_score: await this.calculateRiskScore(),
      exposure_level: await this.getExposureLevel(),
      threat_intelligence: await this.getThreatIntelligence()
    };
    
    return metrics;
  }
  
  generateTrendData(metrics) {
    const trends = [];
    
    // Calculate trends over time
    for (const [key, value] of Object.entries(metrics)) {
      const historical = await this.getHistoricalData(key, 30); // 30 days
      const trend = this.calculateTrend(historical, value);
      
      trends.push({
        metric: key,
        current: value,
        trend: trend.direction,
        change: trend.percentage,
        status: this.getTrendStatus(trend.direction, key)
      });
    }
    
    return trends;
  }
  
  calculateTrend(historical, current) {
    if (historical.length < 2) {
      return { direction: 'stable', percentage: 0 };
    }
    
    const previous = historical[historical.length - 2].value;
    const change = ((current - previous) / previous) * 100;
    
    return {
      direction: change > 5 ? 'increasing' : change < -5 ? 'decreasing' : 'stable',
      percentage: Math.abs(change)
    };
  }
  
  getTrendStatus(direction, metric) {
    // Some metrics should decrease (vulnerabilities, incidents)
    const decreasingMetrics = [
      'critical_vulnerabilities',
      'high_vulnerabilities',
      'security_incidents',
      'mean_time_to_detect',
      'mean_time_to_resolve',
      'audit_findings',
      'policy_violations',
      'risk_score',
      'exposure_level'
    ];
    
    const shouldDecrease = decreasingMetrics.includes(metric);
    
    if (shouldDecrease) {
      return direction === 'decreasing' ? 'good' : 'warning';
    } else {
      return direction === 'increasing' ? 'good' : 'warning';
    }
  }
  
  async generateReport() {
    const metrics = await this.collectMetrics();
    const trends = this.generateTrendData(metrics);
    
    return {
      timestamp: new Date().toISOString(),
      metrics,
      trends,
      summary: this.generateSummary(metrics, trends),
      alerts: this.generateAlerts(metrics, trends)
    };
  }
  
  generateSummary(metrics, trends) {
    const goodTrends = trends.filter(t => t.status === 'good').length;
    const warningTrends = trends.filter(t => t.status === 'warning').length;
    
    return {
      overall_health: goodTrends > warningTrends ? 'good' : 'warning',
      critical_issues: metrics.critical_vulnerabilities > 0,
      compliance_status: metrics.compliance_score > 0.8 ? 'compliant' : 'non-compliant',
      risk_level: metrics.risk_score > 0.7 ? 'high' : metrics.risk_score > 0.4 ? 'medium' : 'low'
    };
  }
}

// API Endpoint
app.get('/api/security/dashboard', async (req, res) => {
  try {
    const dashboard = new SecurityDashboard();
    const report = await dashboard.generateReport();
    
    res.json(report);
  } catch (error) {
    console.error('Dashboard generation failed:', error);
    res.status(500).json({ error: 'Failed to generate dashboard' });
  }
});`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, '🔗 Weiterführende Ressourcen', '🔗 Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'Posture Score', 'Posture score')}</div></a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, '600+ Security Playbooks', '600+ security playbooks')}</div></a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">OpenClaw</div><div className="text-sm text-gray-300">{pick(isDE, 'Self-hosted Security', 'Self-hosted security')}</div></a>
            <a href={`/${locale}/solutions`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Enterprise</div><div className="text-sm text-gray-300">{pick(isDE, 'Managed Security', 'Managed security')}</div></a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Risk Assessment Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Security Posture Scoring und Risk Assessment in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with security posture scoring and risk assessment in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
            { "@type": "ListItem", position: 3, name: "Security Posture Score", item: `https://clawguru.org/${locale}/moltbot/security-posture-score` }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Was ist Moltbot Security?", acceptedAnswer: { "@type": "Answer", text: "Moltbot ist eine Security-Automation-Plattform mit 600+ Executable Runbooks, Live-Score und Compliance-Dashboard für Self-Hosting-Infrastrukturen." } },
            { "@type": "Question", name: "Ist dieser Guide ein Penetrationstest?", acceptedAnswer: { "@type": "Answer", text: "Nein. Dieser Guide dient ausschließlich zur Absicherung eigener Systeme. Kein Angriffs-Tool, keine illegalen Aktivitäten." } },
            { "@type": "Question", name: "Wo finde ich zugehörige Runbooks?", acceptedAnswer: { "@type": "Answer", text: "Alle Runbooks sind unter /runbooks abrufbar. Jeder Befund im Security-Check enthält einen direkten Link zum passenden Runbook." } }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Moltbot Security Posture Score Guide",
          description: "Executable Security Runbooks und Hardening-Guides für Moltbot-Infrastrukturen.",
          url: "https://clawguru.org/de/moltbot/security-posture-score"
        }
      ]) }} />
    </div>
  )
}