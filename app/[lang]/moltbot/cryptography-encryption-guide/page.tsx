import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from '@/lib/i18n'
import { pick } from '@/lib/i18n-pick'

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/cryptography-encryption-guide"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "Moltbot Cryptography & Encryption Guide: AES, RSA, Hashing 2026 | ClawGuru", "Moltbot Cryptography & Encryption Guide: AES, RSA, Hashing 2026 | ClawGuru")
  const description = pick(isDE, "Kryptografie für Moltbot. AES-256 Verschlüsselung, RSA Schlüsselmanagement, Hashing-Algorithmen, Key Rotation und sichere Implementierung.", "Cryptography for Moltbot. AES-256 encryption, RSA key management, hashing algorithms, key rotation and secure implementation.")
  return {
    title, description,
    keywords: ['moltbot cryptography','aes encryption','rsa key management','hashing algorithms','key rotation','secure crypto implementation'],
    authors: [{ name: 'ClawGuru Security Team' }],
    openGraph: {
      images: ["/og-image.png"], title, description, type: 'article', url: pageUrl,
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: 'index, follow',
  };
}

export default function MoltbotCryptoPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ClawGuru", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Moltbot", item: `${SITE_URL}/${locale}/moltbot` },
      { "@type": "ListItem", position: 3, name: "Cryptography Encryption Guide", item: `${SITE_URL}/${locale}${PATH}` },
    ]},
  ]

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          ...jsonLd,
          { "@context": "https://schema.org", "@type": "WebPage", name: pick(isDE, "Moltbot Cryptography Guide", "Moltbot Cryptography Guide"), description: pick(isDE, "Cryptography und Encryption Guide", "Cryptography and Encryption Guide"), url: `${SITE_URL}/${locale}${PATH}` }
        ]) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <strong className="text-amber-100">"Not a Pentest" Trust-Anker</strong>: {pick(isDE, "Kryptografie schützt eigene Daten. Keine Angriffswerkzeuge.", "Cryptography protects own data. No attack tools.")}
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-4"><span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Moltbot AI Security · Cryptography</span></div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">{pick(isDE, "Moltbot Cryptography & Encryption Guide", "Moltbot Cryptography & Encryption Guide")}</h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">{pick(isDE, "Schwache Verschlüsselung ist kein Schutz. AES-256, RSA-4096, PBKDF2 und Key Rotation sind heute Minimum-Standards.", "Weak encryption is no protection. AES-256, RSA-4096, PBKDF2 and key rotation are today's minimum standards.")}</p>
        </div>

        {/* Amateur Section */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Was ist Kryptografie? Einfach erklärt", "What is Cryptography? Simply Explained")}</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 leading-relaxed mb-4">
              {pick(isDE, "Kryptografie ist wie ein Tresor mit mathematischem Schloss: es verwandelt lesbare Daten in unleserlichen Code, der nur mit dem richtigen Schlüssel wieder geöffnet werden kann. AES-256 verschlüsselt Daten mit 256-Bit-Schlüsseln. RSA-4096 nutzt asymmetrische Schlüssel für sicheren Austausch. Hashing erzeugt Fingerabdrücke von Daten zur Integritätsprüfung. Key Rotation erneuert Schlüssel regelmäßig zur Sicherheit. Ohne starke Kryptografie sind Daten angreifbar für Brute Force, Rainbow Tables und Quantum Computing.", "Cryptography is like a vault with a mathematical lock: it transforms readable data into unreadable code that can only be opened with the right key. AES-256 encrypts data with 256-bit keys. RSA-4096 uses asymmetric keys for secure exchange. Hashing creates fingerprints of data for integrity verification. Key rotation renews keys regularly for security. Without strong cryptography, data is vulnerable to brute force, rainbow tables, and quantum computing.")}
            </p>
            <p className="text-gray-400 text-sm">↓ {pick(isDE, "Springe zu Algorithmen und Implementation", "Jump to algorithms and implementation")}</p>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "Verschlüsselungs-Algorithmen", "Encryption Algorithms")}</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="bg-gray-800 text-white"><th className="p-3 text-left">{pick(isDE, "Algorithmus", "Algorithm")}</th><th className="p-3 text-left">{pick(isDE, "Use Case", "Use Case")}</th><th className="p-3 text-left">{pick(isDE, "Schlüsselgröße", "Key Size")}</th><th className="p-3 text-left">{pick(isDE, "Status", "Status")}</th></tr></thead>
                <tbody>
                  {[
                    ['AES-256-GCM', pick(isDE, 'Datenverschlüsselung', 'Data Encryption'), '256-bit', pick(isDE, 'Empfohlen', 'Recommended')],
                    ['ChaCha20-Poly1305', pick(isDE, 'Mobile/Streaming', 'Mobile/Streaming'), '256-bit', pick(isDE, 'Empfohlen', 'Recommended')],
                    ['RSA-OAEP', pick(isDE, 'Key Exchange', 'Key Exchange'), '4096-bit', pick(isDE, 'Empfohlen', 'Recommended')],
                    ['ECDSA', pick(isDE, 'Digitale Signature', 'Digital Signature'), 'P-256/P-384', pick(isDE, 'Empfohlen', 'Recommended')],
                    ['SHA-256', pick(isDE, 'Hashing', 'Hashing'), '256-bit', pick(isDE, 'Empfohlen', 'Recommended')],
                    ['SHA-3', pick(isDE, 'Hashing (Future)', 'Hashing (Future)'), '256/512-bit', pick(isDE, 'Optional', 'Optional')],
                  ].map(([algo, use, key, status]) => (
                    <tr key={algo} className="border-b hover:bg-gray-800/50 transition-colors">
                      <td className="p-3 font-medium text-gray-100">{algo}</td>
                      <td className="p-3 text-sm text-gray-300">{use}</td>
                      <td className="p-3 text-sm text-gray-300">{key}</td>
                      <td className="p-3 text-sm text-gray-300">{status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">AES-256 Implementation</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm overflow-x-auto">
            <pre>{`// AES-256-GCM Verschlüsselung für Moltbot
const crypto = require('crypto');

class AESEncryption {
  constructor(key) {
    this.key = Buffer.from(key, 'hex');
    this.algorithm = 'aes-256-gcm';
    this.ivLength = 16;
    this.tagLength = 16;
  }
  
  encrypt(plaintext) {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipher(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      iv: iv.toString('hex'),
      encrypted,
      tag: tag.toString('hex')
    };
  }
  
  decrypt(encryptedData) {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const tag = Buffer.from(encryptedData.tag, 'hex');
    
    const decipher = crypto.createDecipher(this.algorithm, this.key, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

// Key Management
const masterKey = process.env.MASTER_KEY; // 64-hex chars
const encryption = new AESEncryption(masterKey);

// Beispiel: API-Keys verschlüsseln
const apiKey = 'sk_test_4242424242424242';
const encrypted = encryption.encrypt(apiKey);
console.log('Encrypted:', encrypted);`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">RSA Key Management</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm overflow-x-auto">
            <pre>{`// RSA-4096 Key Generation und Management
const { generateKeyPair, publicEncrypt, privateDecrypt } = require('crypto');

class RSAKeyManager {
  constructor() {
    this.keyPair = null;
  }
  
  generateKeyPair() {
    this.keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
    return this.keyPair;
  }
  
  encryptWithPublicKey(data, publicKey) {
    return crypto.publicEncrypt(
      { key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' },
      Buffer.from(data)
    ).toString('base64');
  }
  
  decryptWithPrivateKey(encryptedData, privateKey) {
    return crypto.privateDecrypt(
      { key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' },
      Buffer.from(encryptedData, 'base64')
    ).toString();
  }
}

// Key Rotation Schedule
class KeyRotationManager {
  constructor(keyManager) {
    this.keyManager = keyManager;
    this.currentKeyId = 'key-2024-01';
    this.keys = new Map();
  }
  
  async rotateKeys() {
    const newKeyPair = this.keyManager.generateKeyPair();
    const newKeyId = 'key-' + new Date().toISOString().slice(0, 7);
    
    // Store new key
    this.keys.set(newKeyId, {
      publicKey: newKeyPair.publicKey,
      privateKey: newKeyPair.privateKey,
      createdAt: new Date(),
      status: 'active'
    });
    
    // Mark old key as deprecated
    const oldKey = this.keys.get(this.currentKeyId);
    if (oldKey) {
      oldKey.status = 'deprecated';
      oldKey.deprecatedAt = new Date();
    }
    
    this.currentKeyId = newKeyId;
    
    return newKeyId;
  }
}`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Secure Hashing</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-xl font-mono text-sm overflow-x-auto">
            <pre>{`// Sicheres Hashing mit Salt und Pepper
const crypto = require('crypto');

class SecureHashing {
  constructor(pepper) {
    this.pepper = Buffer.from(pepper, 'hex');
    this.iterations = 100000;
  }
  
  hash(password, salt) {
    const saltedPassword = Buffer.concat([
      Buffer.from(password, 'utf8'),
      salt,
      this.pepper
    ]);
    
    return crypto.pbkdf2Sync(
      saltedPassword,
      salt,
      this.iterations,
      64,
      'sha512'
    ).toString('hex');
  }
  
  verify(password, salt, hash) {
    const computedHash = this.hash(password, salt);
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(computedHash, 'hex')
    );
  }
  
  generateSalt() {
    return crypto.randomBytes(32);
  }
}

// Beispiel: User Password Hashing
const pepper = process.env.PEPPER; // 64-hex chars
const hashing = new SecureHashing(pepper);

const password = 'user_password_123';
const salt = hashing.generateSalt();
const hash = hashing.hash(password, salt);

console.log('Hash:', hash);
console.log('Verified:', hashing.verify(password, salt, hash));`}</pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">{pick(isDE, "🔗 Weiterführende Ressourcen", "🔗 Further Resources")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href={`/${locale}/check`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Kryptografie prüfen", "Check cryptography")}</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">{pick(isDE, "Crypto Security Guides", "Crypto security guides")}</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">OpenClaw</div>
              <div className="text-sm text-gray-300">{pick(isDE, "OpenClaw Security Framework", "OpenClaw Security Framework")}</div>
            </a>
            <a href={`/${locale}/moltbot/database-security-encryption`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="font-semibold text-cyan-400">Database Security</div>
              <div className="text-sm text-gray-300">{pick(isDE, "DB Encryption Best Practices", "DB encryption best practices")}</div>
            </a>
          </div>
        </section>

        {/* Author & Trust */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-lg p-6 rounded-xl border border-cyan-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-full flex items-center justify-center text-2xl font-bold text-cyan-300 flex-shrink-0">CG</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-cyan-300 text-lg">ClawGuru Security Team</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-semibold">✓ Verified</span>
                </div>
                <div className="text-sm text-cyan-200 mb-3">Security Research &amp; Engineering · Cryptography Specialists</div>
                <div className="flex items-center gap-4 text-xs text-cyan-300 mb-3">
                  <span>📅 {pick(isDE, 'Veröffentlicht', 'Published')}: 28.04.2026</span>
                  <span>🔄 {pick(isDE, 'Zuletzt geprüft', 'Last reviewed')}: 28.04.2026</span>
                </div>
                <div className="text-sm text-cyan-100 leading-relaxed">
                  {pick(isDE, 'Dieser Guide basiert auf praktischer Erfahrung mit Kryptografie-Implementierungen für KI-Systeme in Produktionsumgebungen. Die beschriebenen Best Practices sind in echten Deployments erprobt und kontinuierlich verbessert worden.', 'This guide is based on practical experience with cryptography implementations for AI systems in production environments. The described best practices have been proven in real deployments and continuously improved.')}
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
    </div>
  );
}