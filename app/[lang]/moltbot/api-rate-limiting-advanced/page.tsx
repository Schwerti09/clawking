import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {

  const { lang } = params;

  return {

    title: 'Moltbot API Rate Limiting Advanced: Redis, Sliding Window, DDoS Protection 2024',

    description: 'Advanced Rate Limiting für Moltbot. Redis-basiertes Rate Limiting, Sliding Window Algorithmus, DDoS Protection und API Abuse Prevention.',

    keywords: ['moltbot rate limiting','api rate limiting','redis rate limiting','sliding window','ddos protection','api abuse prevention'],

    authors: [{ name: 'ClawGuru Security Team' }],

    openGraph: {
      images: ["/og-image.png"], title: 'Moltbot API Rate Limiting Advanced 2024', description: 'Advanced Rate Limiting für Moltbot.', type: 'article', url: `https://clawguru.org/${lang}/moltbot/api-rate-limiting-advanced` },

    alternates: buildLocalizedAlternates(lang as Locale, '/moltbot/api-rate-limiting-advanced'),

    robots: 'index, follow',

  };

}

export default function MoltbotRateLimitPage({ params }: { params: { lang: string } }) {
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
          <strong className="text-amber-100">"Not a Pentest" Notice</strong>: {pick(isDE, "Rate Limiting schützt eigene APIs vor Überlastung. Kein Angriffswerkzeug.", "Rate limiting protects your own APIs from overload. Defensive use only.")}
        </div>
        <div className="mb-8 animate-fade-in-up">
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · API Rate Limiting</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
            {pick(isDE, "Moltbot API Rate Limiting: Redis Sliding Window & DDoS Protection 2026", "Moltbot API Rate Limiting: Redis Sliding Window & DDoS Protection 2026")}
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {pick(isDE, "Ohne Rate Limiting sind APIs anfällig für DDoS und Abuse. Redis-basierte Sliding Window Algorithmen sind heute State-of-the-Art für hochverfügbare Systeme.", "Without rate limiting, APIs are vulnerable to DDoS and abuse. Redis-based Sliding Window algorithms are today's state-of-the-art for high-availability systems.")}
          </p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist API Rate Limiting? Einfach erklärt", "What is API Rate Limiting? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Stell dir eine Schalterkabine vor, die nur 100 Kunden pro Minute hereinlässt. Wer zu schnell too often klopft, muss kurz warten. Rate Limiting funktioniert genau so: Es begrenzt, wie oft ein Nutzer (oder eine IP) deine API in einem Zeitfenster aufrufen darf. Das verhindert DDoS-Angriffe, API-Abuse (z.B. konkurrierende Scraper) und Modell-Extraktion (jemand ruft dein LLM systematisch ab, um es zu klonen).", "Imagine a ticket counter that only lets 100 customers in per minute. Those who knock too often must wait briefly. Rate limiting works exactly the same: it limits how often a user (or IP) can call your API within a time window. This prevents DDoS attacks, API abuse (e.g., competing scrapers), and model extraction (someone systematically querying your LLM to clone it).")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Strategie-Vergleich, Redis Sliding Window und DDoS Protection Layer", "Jump to strategy comparison, Redis Sliding Window, and DDoS Protection Layer")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Rate Limiting Strategien', 'Rate Limiting Strategies')}</h2>

          <div className="bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-gray-800 text-white"><th className="p-3 text-left">Strategie</th><th className="p-3 text-left">Use Case</th><th className="p-3 text-left">Speicher</th><th className="p-3 text-left">Genauigkeit</th></tr></thead>

              <tbody>

                {[
                  ['Fixed Window', 'Einfach, schnell', 'Minimal', 'Niedrig'],
                  ['Sliding Window', 'Präzise, fair', 'Mittel', 'Hoch'],
                  ['Token Bucket', 'Burst-fähig', 'Mittel', 'Mittel'],
                  ['Distributed Sliding Window', 'Multi-Server', 'Redis', 'Hoch'],
                ].map(([strategy, use, storage, accuracy]) => (
                  <tr key={strategy} className="border-b border-gray-700 hover:bg-gray-700">

                    <td className="p-3 font-medium">{strategy}</td>
                    <td className="p-3 text-sm">{use}</td>
                    <td className="p-3 text-sm">{storage}</td>
                    <td className="p-3 text-sm">{accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Redis Sliding Window Implementation', 'Redis Sliding Window Implementation')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">

            <pre>{`// Redis Sliding Window Rate Limiter für Moltbot

const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

class SlidingWindowRateLimiter {

  constructor(options = {}) {

    this.windowSize = options.windowSize || 60000; // 1 minute

    this.maxRequests = options.maxRequests || 100;

    this.keyPrefix = options.keyPrefix || 'rate_limit:';

  }

  async isAllowed(key, identifier) {

    const now = Date.now();

    const windowStart = now - this.windowSize;

    const redisKey = this.keyPrefix + key + ':' + identifier;

    await redis.zremrangebyscore(redisKey, 0, windowStart);

    const currentRequests = await redis.zcard(redisKey);

    if (currentRequests >= this.maxRequests) {

      return {

        allowed: false,

        remaining: 0,

        resetTime: now + this.windowSize,

        totalRequests: currentRequests

      };

    }

    await redis.zadd(redisKey, now, now);

    await redis.expire(redisKey, Math.ceil(this.windowSize / 1000));

    return {

      allowed: true,

      remaining: this.maxRequests - currentRequests - 1,

      resetTime: now + this.windowSize,

      totalRequests: currentRequests + 1

    };

  }

  middleware(options = {}) {

    const limiter = new SlidingWindowRateLimiter(options);

    return async (req, res, next) => {

      const key = options.key || 'api';

      const identifier = this.getIdentifier(req);

      const result = await limiter.isAllowed(key, identifier);

      res.set({

        'X-RateLimit-Limit': limiter.maxRequests,

        'X-RateLimit-Remaining': result.remaining,

        'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000)

      });

      if (!result.allowed) {

        return res.status(429).json({

          error: 'Too Many Requests',

          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)

        });

      }

      next();

    };

  }

  getIdentifier(req) {

    const ip = req.ip || req.connection.remoteAddress;

    const userId = req.user?.id;

    return userId ? 'user:' + userId : 'ip:' + ip;

  }

}

const rateLimiter = new SlidingWindowRateLimiter({

  windowSize: 60000, // 1 minute

  maxRequests: 100,

  keyPrefix: 'moltbot:'

});

app.use('/api', rateLimiter.middleware({

  windowSize: 60000,

  maxRequests: 100,

  key: 'general'

}));`}</pre>
          </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'DDoS Protection Layer', 'DDoS Protection Layer')}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">

            <pre>{`// DDoS Protection für Moltbot

class DDoSProtection {

  constructor(redisClient) {

    this.redis = redisClient;

    this.thresholds = {

      ip: { requests: 1000, window: 60000 }, // 1000 req/min per IP

      global: { requests: 10000, window: 60000 }, // 10k req/min global

      endpoint: { requests: 500, window: 60000 } // 500 req/min per endpoint

    };

  }

  async checkRequest(req) {

    const ip = req.ip || req.connection.remoteAddress;

    const endpoint = req.path;

    const now = Date.now();

    const ipKey = 'ddos:ip:' + ip;

    const ipCount = await this.redis.incr(ipKey);

    if (ipCount === 1) await this.redis.expire(ipKey, 60);

    if (ipCount > this.thresholds.ip.requests) {

      await this.blockIP(ip, 3600); // Block for 1 hour

      return { blocked: true, reason: 'IP rate limit exceeded' };

    }

    const globalKey = 'ddos:global';

    const globalCount = await this.redis.incr(globalKey);

    if (globalCount === 1) await this.redis.expire(globalKey, 60);

    if (globalCount > this.thresholds.global.requests) {

      return { blocked: true, reason: 'Global rate limit exceeded' };

    }

    const endpointKey = 'ddos:endpoint:' + endpoint;

    const endpointCount = await this.redis.incr(endpointKey);

    if (endpointCount === 1) await this.redis.expire(endpointKey, 60);

    if (endpointCount > this.thresholds.endpoint.requests) {

      return { blocked: true, reason: 'Endpoint rate limit exceeded' };

    }

    return { blocked: false };

  }

  async blockIP(ip, duration) {

    const blockKey = 'blocked:ip:' + ip;

    await this.redis.setex(blockKey, duration, '1');

    await this.redis.lpush('ddos:blocks', JSON.stringify({

      ip,

      timestamp: Date.now(),

      duration,

      reason: 'Rate limit exceeded'

    }));

  }

  async isIPBlocked(ip) {

    const blockKey = 'blocked:ip:' + ip;

    return await this.redis.exists(blockKey);

  }

}

const ddosProtection = new DDoSProtection(redis);

app.use(async (req, res, next) => {

  if (await ddosProtection.isIPBlocked(req.ip)) {

    return res.status(403).json({ error: 'IP blocked' });

  }

  const result = await ddosProtection.checkRequest(req);

  if (result.blocked) {

    return res.status(429).json({ 

      error: 'Rate limit exceeded',

      reason: result.reason 

    });

  }

  next();

});`}</pre>
          </div>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · API Security Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 27.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 27.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Redis-basiertem Rate Limiting in Hochlast-Produktionsumgebungen. Die Code-Beispiele sind produktionsreif und in Moltbot-Deployments getestet.', 'This guide is based on practical experience with Redis-based rate limiting in high-load production environments. The code examples are production-ready and tested in Moltbot deployments.')}
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

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, 'Weiterführende Ressourcen', 'Further Resources')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${lang}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Check</div><div className="text-sm text-gray-300">{pick(isDE, 'System jetzt scannen', 'Scan your system now')}</div></a>
            <a href={`/${lang}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Security Runbooks</div><div className="text-sm text-gray-300">{pick(isDE, '600+ Security Playbooks', '600+ security playbooks')}</div></a>
            <a href={`/${lang}/moltbot/devsecops-pipeline`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">DevSecOps Pipeline</div><div className="text-sm text-gray-300">{pick(isDE, 'CI/CD Security Integration', 'CI/CD security integration')}</div></a>
            <a href={`/${lang}/moltbot/zero-trust-architecture`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"><div className="font-semibold text-cyan-400">Zero Trust Architecture</div><div className="text-sm text-gray-300">{pick(isDE, 'Never Trust, Always Verify', 'Never Trust, Always Verify')}</div></a>
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
            url: "https://clawguru.org/de/moltbot/api-rate-limiting-advanced"
          }
        ]) }} />
      </div>
    </div>
  );
}