// Secret Pattern Scanner backend — scans code for hardcoded credentials
// using regex patterns for API keys, private keys, tokens, etc.

import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface Secret {
  type: string
  severity: "high" | "critical"
  pattern: string
  line: number
  column: number
  matched: string
  advice: string
}

interface Result {
  totalLines: number
  secretsFound: number
  secrets: Secret[]
}

const PATTERNS = [
  {
    type: "AWS Access Key",
    severity: "critical" as const,
    pattern: /AKIA[0-9A-Z]{16}/g,
    advice: "AWS access key detected. Rotate immediately in IAM console.",
  },
  {
    type: "AWS Secret Key",
    severity: "critical" as const,
    pattern: /aws_secret_access_key\s*=\s*[A-Za-z0-9/+=]{40}/gi,
    advice: "AWS secret key found. Rotate in IAM console.",
  },
  {
    type: "Private Key (PEM)",
    severity: "critical" as const,
    pattern: /-----BEGIN (RSA|DSA|EC|OPENSSH|PGP) PRIVATE KEY-----/gi,
    advice: "Private key detected. Never commit keys. Use secrets management.",
  },
  {
    type: "API Key (Generic)",
    severity: "high" as const,
    pattern: /api[_-]?key\s*[=:]\s*['\"]?([A-Za-z0-9\-_]{20,})['\"]?/gi,
    advice: "API key pattern found. Move to environment variables or secrets manager.",
  },
  {
    type: "Slack Token",
    severity: "critical" as const,
    pattern: /xox[baprs]-[0-9]{10,13}-[A-Za-z0-9\-]{27,36}/g,
    advice: "Slack token detected. Revoke immediately at api.slack.com.",
  },
  {
    type: "Discord Webhook",
    severity: "critical" as const,
    pattern: /https:\/\/discord\.com\/api\/webhooks\/[0-9]{18}\/[A-Za-z0-9_-]{65,}/g,
    advice: "Discord webhook URL exposed. Regenerate in Discord settings.",
  },
  {
    type: "GitHub Token",
    severity: "critical" as const,
    pattern: /ghp_[A-Za-z0-9_]{36}/g,
    advice: "GitHub personal access token found. Revoke at github.com/settings/tokens.",
  },
  {
    type: "Database Password",
    severity: "high" as const,
    pattern: /(password|passwd|pwd)\s*[=:]\s*['\"]([^'\"]+)['\"]/gi,
    advice: "Database credential pattern found. Use environment variables or secrets vault.",
  },
  {
    type: "Azure Storage Key",
    severity: "critical" as const,
    pattern: /DefaultEndpointsProtocol=https;.*?AccountKey=[A-Za-z0-9+/=]{88}/gi,
    advice: "Azure storage connection string detected. Rotate keys in Azure Portal.",
  },
  {
    type: "GCP Service Account",
    severity: "critical" as const,
    pattern: /"type":\s*"service_account"/g,
    advice: "GCP service account JSON detected. Rotate keys immediately.",
  },
  {
    type: "SSH Private Key",
    severity: "critical" as const,
    pattern: /-----BEGIN OPENSSH PRIVATE KEY-----/gi,
    advice: "SSH private key found. Rotate keys and update authorized_keys.",
  },
  {
    type: "JWT Token",
    severity: "high" as const,
    pattern: /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
    advice: "JWT token found in code. Tokens should come from environment or config.",
  },
  {
    type: "Stripe Key",
    severity: "critical" as const,
    pattern: /sk_live_[A-Za-z0-9]{24}/g,
    advice: "Stripe secret key exposed. Revoke at dashboard.stripe.com/apikeys.",
  },
  {
    type: "NPM Token",
    severity: "high" as const,
    pattern: /npm_[A-Za-z0-9]{36}/g,
    advice: "NPM token detected. Revoke at npmjs.com/settings/tokens.",
  },
]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { code } = body as { code?: string }

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'code' parameter." }, { status: 400 })
    }

    const lines = code.split("\n")
    const secrets: Secret[] = []
    const seenMatches = new Set<string>()

    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum]

      for (const patternDef of PATTERNS) {
        const regex = new RegExp(patternDef.pattern.source, "g")
        let match

        while ((match = regex.exec(line)) !== null) {
          const matched = match[0]
          const key = `${patternDef.type}:${matched.slice(0, 20)}`

          if (!seenMatches.has(key)) {
            seenMatches.add(key)
            secrets.push({
              type: patternDef.type,
              severity: patternDef.severity,
              pattern: patternDef.pattern.toString().slice(0, 40),
              line: lineNum + 1,
              column: match.index + 1,
              matched: matched.length > 50 ? matched.slice(0, 47) + "..." : matched,
              advice: patternDef.advice,
            })
          }
        }
      }
    }

    return NextResponse.json({
      totalLines: lines.length,
      secretsFound: secrets.length,
      secrets: secrets.sort((a, b) => b.severity.localeCompare(a.severity)).slice(0, 50),
    } as Result)
  } catch (e) {
    return NextResponse.json(
      { error: `Server error: ${e instanceof Error ? e.message : "Unknown"}` },
      { status: 500 }
    )
  }
}
