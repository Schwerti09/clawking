import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/openclaw/secrets-rotation-automation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const title = "Secrets Rotation Automation: Vault Management 2026 | OpenClaw"
  const description = "Automatisierte Secrets-Rotation mit HashiCorp Vault, Kubernetes Secrets und DSGVO-konformem Credential Management — für selbst-gehostete Infrastrukturen."
  return {
    title,
    description,
    keywords: ["secrets rotation", "vault automation", "credential management", "hashicorp vault", "kubernetes secrets"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      images: ["/og-image.png"],
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Warum ist automatisierte Secrets-Rotation wichtig?', acceptedAnswer: { '@type': 'Answer', text: 'Statische Secrets (Passwörter, API-Keys, Zertifikate) sind das größte Risiko für Credential-Leaks. Automatisierte Rotation begrenzt das Exposure-Fenster: Selbst bei einem Leak ist ein rotiertes Secret in Minuten wertlos.' } },
    { '@type': 'Question', name: 'Wie funktioniert HashiCorp Vault Secrets Rotation?', acceptedAnswer: { '@type': 'Answer', text: 'Vault generiert dynamische Credentials on-demand (z.B. kurzlebige DB-Passwörter), rotiert sie automatisch nach TTL und widerruft sie nach Ablauf. Anwendungen erhalten Tokens mit minimalem TTL — nie dauerhafte Credentials.' } },
    { '@type': 'Question', name: 'Welche Secrets sollten rotiert werden?', acceptedAnswer: { '@type': 'Answer', text: 'Alle kritischen Credentials: Datenbank-Passwörter (täglich), API-Keys (monatlich), TLS-Zertifikate (90 Tage), SSH-Keys (jährlich), Service-Account-Tokens (wöchentlich). Vault und External Secrets Operator automatisieren diesen Prozess.' } },
    { '@type': 'Question', name: 'Wie integriere ich Vault mit Kubernetes?', acceptedAnswer: { '@type': 'Answer', text: 'Mit dem Vault Agent Injector oder External Secrets Operator können Pods automatisch Secrets aus Vault beziehen — als gemountete Dateien oder Umgebungsvariablen. Kubernetes Service Accounts authentifizieren sich via Vault Kubernetes Auth Method.' } },
  ],
}

export default function SecretsRotationAutomationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#1e1b4b] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="bg-amber-900/80 backdrop-blur-lg border-l-4 border-amber-500 p-4 mb-8 text-sm text-amber-100 rounded-r-lg shadow-lg animate-fade-in-up">
          <strong className="text-amber-100">&quot;Not a Pentest&quot; Hinweis</strong>: Dieser Guide dient der Absicherung eigener Secrets-Infrastrukturen. Kein Angriffs-Tool.
        </div>
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Secrets Rotation Automation · Vault Management</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-100 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">Secrets Rotation Automation: Vault Management</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">Vollständig automatisierte Secrets-Rotation mit HashiCorp Vault, Kubernetes-Integration und Compliance-konformem Credential Management.</p>
        </div>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Secrets Management Grundlagen</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl mb-4 border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <h3 className="font-semibold mb-2 text-gray-100">Kernkomponenten</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Automatisierte Credential-Rotations-Policies</li>
              <li>Zero-Trust-Zugriffskontrolle</li>
              <li>Audit Trails und Compliance-Logging</li>
              <li>Dynamische Secrets-Generierung</li>
              <li>Multi-Cloud Secrets-Orchestrierung</li>
            </ul>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">HashiCorp Vault Konfiguration</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# Vault configuration for automated rotation
# vault-config.hcl

listener "tcp" {
  address = "0.0.0.0:8200"
  tls_disable = false
  tls_cert_file = "/etc/vault/tls/vault.crt"
  tls_key_file = "/etc/vault/tls/vault.key"
}

storage "consul" {
  address = "consul.service.consul:8500"
  path = "vault/"
}

api_addr = "https://vault.example.com"
cluster_addr = "https://vault.example.com:8201"

# Enable audit logging
ui = true

# Enable authentication methods
auth "kubernetes" {
  type = "kubernetes"
}

auth "jwt" {
  type = "jwt"
}

# Enable secrets engines
secrets "database" {
  type = "database"
}

secrets "kv" {
  type = "kv"
  options = {
    version = "2"
  }
}

secrets "transit" {
  type = "transit"
} `}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Database Secrets Rotation</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# Enable database secrets engine with rotation
vault secrets enable database

# Configure PostgreSQL database connection
vault write database/config/postgresql \
    plugin_name="postgresql-database-plugin" \
    connection_url="postgresql://username:password@postgres.example.com:5432/mydb" \
    allowed_roles="readonly,readwrite" \
    username="vault" \
    password="vault_password"

# Create database roles with rotation
vault write database/roles/readonly \
    db_name="postgresql" \
    creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' NOINHERIT; GRANT SELECT ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \
    default_ttl="1h" \
    max_ttl="24h"

vault write database/roles/readwrite \
    db_name="postgresql" \
    creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' NOINHERIT; GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \
    default_ttl="30m" \
    max_ttl="12h"

# Configure automatic rotation
vault write database/rotate-root/postgresql`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Kubernetes Integration</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`# Kubernetes auth method configuration
vault auth enable kubernetes

# Configure Kubernetes auth
vault write auth/kubernetes/config \
    kubernetes_host="https://kubernetes.default.svc:443" \
    kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
    token_reviewer_jwt=@/var/run/secrets/kubernetes.io/serviceaccount/token

# Create policy for database access
vault policy write db-policy - <<'EOF'
path "database/creds/readonly" {
  capabilities = ["read"]
}
path "database/creds/readwrite" {
  capabilities = ["read"]
}
EOF

# Create Kubernetes role
vault write auth/kubernetes/role/database-role \
    bound_service_account_names="app-sa" \
    bound_service_account_namespaces="default" \
    policies="db-policy" \
    ttl="1h" \
    max_ttl="24h"

# Kubernetes secret configuration
apiVersion: v1
kind: Secret
metadata:
  name: vault-secret
  annotations:
    vault.hashicorp.com/agent-inject: "true"
    vault.hashicorp.com/role: "database-role"
    vault.hashicorp.com/agent-inject-secret-database: "database/creds/readonly"
type: Opaque`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Automation Scripts</h2>
          <div className="bg-gray-900/80 backdrop-blur-lg text-green-400 p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20 overflow-x-auto">
            <pre>
{`#!/bin/bash
# secrets-rotation.sh - Automated secrets rotation

# Configuration
VAULT_ADDR="https://vault.example.com"
VAULT_TOKEN="$VAULT_TOKEN"
LOG_FILE="/var/log/secrets-rotation.log"

# Function to rotate database credentials
rotate_database_credentials() {
    local db_name="$1"
    echo "$(date): Rotating credentials for db_name" >> "$LOG_FILE"
    
    # Rotate root credentials
    vault write -f "database/rotate-root/db_name"
    
    # Revoke existing leases
    vault lease revoke -prefix "database/creds/"
    
    echo "$(date): Successfully rotated db_name credentials" >> "$LOG_FILE"
}

# Function to rotate AWS credentials
rotate_aws_credentials() {
    echo "$(date): Rotating AWS credentials" >> "$LOG_FILE"
    
    # Rotate AWS access keys
    vault write -f "aws/rotate-root"
    
    # Revoke existing leases
    vault lease revoke -prefix "aws/creds/"
    
    echo "$(date): Successfully rotated AWS credentials" >> "$LOG_FILE"
}

# Function to validate rotation success
validate_rotation() {
    local service="$1"
    local test_command="$2"
    
    if eval "$test_command"; then
        echo "$(date): Validation successful for service" >> "$LOG_FILE"
        return 0
    else
        echo "$(date): Validation failed for service" >> "$LOG_FILE"
        return 1
    fi
}

# Main rotation workflow
main() {
    echo "$(date): Starting secrets rotation" >> "$LOG_FILE"
    
    # Rotate database credentials
    rotate_database_credentials "postgresql"
    
    # Rotate AWS credentials
    rotate_aws_credentials
    
    # Validate rotations
    validate_rotation "postgresql" "vault read database/creds/readonly"
    validate_rotation "aws" "vault read aws/creds/sts"
    
    echo "$(date): Secrets rotation completed" >> "$LOG_FILE"
}

# Execute main function
main "$@"`}
            </pre>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Compliance and Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-900/80 backdrop-blur-lg p-4 rounded-xl border border-blue-700/50 shadow-2xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-blue-500/20">
              <h3 className="font-semibold text-blue-300 mb-2">Audit Logging</h3>
              <p className="text-sm text-blue-200">Enable comprehensive audit trails for all secrets access and rotation events.</p>
            </div>
            <div className="bg-green-900/80 backdrop-blur-lg p-4 rounded-xl border border-green-700/50 shadow-2xl hover:border-green-500/30 transition-all duration-300 hover:shadow-green-500/20">
              <h3 className="font-semibold text-green-300 mb-2">Compliance Reports</h3>
              <p className="text-sm text-green-200">Generate automated compliance reports for SOC2, ISO27001, and GDPR requirements.</p>
            </div>
            <div className="bg-yellow-900/80 backdrop-blur-lg p-4 rounded-xl border border-yellow-700/50 shadow-2xl hover:border-yellow-500/30 transition-all duration-300 hover:shadow-yellow-500/20">
              <h3 className="font-semibold text-yellow-300 mb-2">Alerting</h3>
              <p className="text-sm text-yellow-200">Configure alerts for failed rotations, expiring secrets, and unusual access patterns.</p>
            </div>
            <div className="bg-red-900/80 backdrop-blur-lg p-4 rounded-xl border border-red-700/50 shadow-2xl hover:border-red-500/30 transition-all duration-300 hover:shadow-red-500/20">
              <h3 className="font-semibold text-red-300 mb-2">Backup and Recovery</h3>
              <p className="text-sm text-red-200">Implement automated backup and disaster recovery procedures for secrets data.</p>
            </div>
          </div>
        </section>

        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Further Resources</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href={`/${locale}/securitycheck`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Security Check</div>
              <div className="text-sm text-gray-300">Scan your system now</div>
            </a>
            <a href={`/${locale}/runbooks`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Runbooks</div>
              <div className="text-sm text-gray-300">600+ security playbooks</div>
            </a>
            <a href={`/${locale}/openclaw`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">OpenClaw Framework</div>
              <div className="text-sm text-gray-300">Self-hosted security</div>
            </a>
            <a href={`/${locale}/solutions/kubernetes-security-hardening`} className="block bg-gray-800/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
              <div className="font-semibold text-cyan-400">Kubernetes Security</div>
              <div className="text-sm text-gray-300">Complete hardening guide</div>
            </a>
          </div>
        </section>

        {/* Security Score Calculator */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Secrets Rotation Security Score Calculator — Wie sicher sind deine Secrets?</h2>
          <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/20">
            <p className="text-gray-300 mb-4 text-sm">
              Beantworte 5 Fragen und erhalte deinen Secrets Rotation Security Score (0-100). Dieser Score basiert auf Best Practices aus der Produktion.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">1. Hast du einen Secrets Manager (Vault, AWS Secrets Manager)?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Vault/AWS Secrets Manager</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">2. Rotierst du Secrets automatisch?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Automated Rotation</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">3. Hast du Audit Logging für Secrets?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Comprehensive Audit</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">4. Hast du Secrets in Git?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Ja (schlecht)</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Nein, nur in Vault</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">5. Hast du Alerts für Secret Leaks?</label>
                <select className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors">
                  <option value="0">Nein</option>
                  <option value="50">Teilweise</option>
                  <option value="100">Ja, Real-time Alerts</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Secrets Rotation Security Score berechnen
            </button>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hidden">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">65/100</div>
                <div className="text-sm text-gray-300 mb-4">Dein Score: Mittel — Raum für Verbesserung</div>
                <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 rounded-lg border border-cyan-700">
                  <div className="text-sm text-cyan-300 mb-2">Upgrade zu Pro für Secrets Audit & Detailed Report</div>
                  <a href={`/${locale}/pricing`} className="block bg-gray-900 text-gray-300 font-semibold py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition-colors">
                    Pro Plan — €49/mo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daypass Offer */}
        <section className="mb-10 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 rounded-xl border border-purple-700 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Daypass — 24h Full Access für €3</h3>
                <p className="text-purple-200 text-sm mb-4">Einmalig pro User/Kreditkarte. Volle 24 Stunden Zugang zu allen Security-Tools.</p>
                <div className="flex gap-2 text-xs text-purple-300">
                  <span className="bg-purple-800 px-2 py-1 rounded">✓ Security Check</span>
                  <span className="bg-purple-800 px-2 py-1 rounded">✓ Runbooks</span>
                  <span className="bg-purple-800 px-2 py-1 rounded">✓ AI Copilot</span>
                </div>
              </div>
              <a href={`/${locale}/pricing#daypass`} className="bg-gray-900 text-purple-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
                Daypass kaufen — €3
              </a>
            </div>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "Was ist OpenClaw Secrets Rotation?", acceptedAnswer: { "@type": "Answer", text: "Automatisierte Secret-Rotation dreht API-Keys, Passwörter und Zertifikate ohne manuellen Eingriff — minimiert Exposure-Fenster bei Credential-Leaks." } },
            { "@type": "Question", name: "Wie funktioniert HashiCorp Vault mit OpenClaw?", acceptedAnswer: { "@type": "Answer", text: "Vault speichert Secrets zentral, rotiert sie automatisch per Lease-Renewal und injiziert sie sicher per Kubernetes Sidecar oder API-Call in die Anwendung." } },
            { "@type": "Question", name: "Wie oft sollten Secrets rotiert werden?", acceptedAnswer: { "@type": "Answer", text: "Kritische Credentials (DB-Passwörter, API-Keys): alle 30 Tage. TLS-Zertifikate: automatisch vor Ablauf (Let's Encrypt alle 60 Tage). Session-Secrets: wöchentlich." } },
          ]},
          { "@context": "https://schema.org", "@type": "WebPage", name: "OpenClaw Secrets Rotation Automation", description: "Automatisierte Secret-Rotation für OpenClaw mit HashiCorp Vault.", url: "https://clawguru.org/de/openclaw/secrets-rotation-automation" },
          { "@context": "https://schema.org", "@type": "HowTo", name: "Automatische Secrets-Rotation für OpenClaw einrichten",
            description: "HashiCorp Vault für automatische Credential-Rotation auf OpenClaw Infrastruktur konfigurieren.",
            totalTime: "PT90M",
            step: [
              { "@type": "HowToStep", name: "HashiCorp Vault installieren", text: "apt install vault oder Docker: docker run -d --cap-add=IPC_LOCK vault:latest. vault operator init ausführen." },
              { "@type": "HowToStep", name: "Secrets Engine aktivieren", text: "vault secrets enable database. Datenbankverbindung konfigurieren und Rotation-Intervall setzen." },
              { "@type": "HowToStep", name: "Applikations-Policy erstellen", text: "vault policy write myapp policy.hcl. Minimal-Rechte: nur Lesen des eigenen Secret-Pfads." },
              { "@type": "HowToStep", name: "Kubernetes-Integration einrichten", text: "vault auth enable kubernetes. ServiceAccount-Token für automatischen Login konfigurieren." },
              { "@type": "HowToStep", name: "Rotation testen und überwachen", text: "vault lease renew <lease_id>. Vault-Audit-Log auf erfolgreiche Rotationen prüfen." },
            ]
          }
        ]) }} />
      </div>
    </div>
  )
}
