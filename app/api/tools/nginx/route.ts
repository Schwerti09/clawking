// Nginx Config Scanner backend — detects misconfigurations and security issues

import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface Finding {
  severity: "info" | "warn" | "critical"
  rule: string
  description: string
  suggestion: string
  context?: string
}

interface Result {
  score: number
  grade: "A" | "B" | "C" | "D" | "F"
  findings: Finding[]
}

function gradeFromScore(score: number): Result["grade"] {
  if (score >= 90) return "A"
  if (score >= 75) return "B"
  if (score >= 60) return "C"
  if (score >= 40) return "D"
  return "F"
}

function analyzeNginx(content: string): { score: number; findings: Finding[] } {
  const findings: Finding[] = []
  let score = 100

  const lines = content.split("\n")
  const text = content.toLowerCase()

  // Check for SSL/TLS
  if (!text.includes("ssl_certificate") && !text.includes("ssl_protocols")) {
    score -= 30
    findings.push({
      severity: "critical",
      rule: "No SSL/TLS configuration",
      description: "HTTP traffic is unencrypted. SSL/TLS is mandatory.",
      suggestion: 'Add: ssl_certificate /path/to/cert; ssl_certificate_key /path/to/key; ssl_protocols TLSv1.2 TLSv1.3;',
    })
  } else {
    if (!text.includes("tlsv1.3")) {
      score -= 10
      findings.push({
        severity: "warn",
        rule: "TLS 1.3 not enabled",
        description: "TLS 1.3 is the most secure protocol version.",
        suggestion: "Add TLSv1.3 to ssl_protocols: ssl_protocols TLSv1.2 TLSv1.3;",
      })
    }

    // Check weak ciphers
    if (text.includes("!ecdhe") || text.includes("3des") || text.includes("des")) {
      score -= 20
      findings.push({
        severity: "critical",
        rule: "Weak ciphers detected",
        description: "Your cipher list includes deprecated/weak ciphers.",
        suggestion: "Use Mozilla recommended ciphers: ssl_ciphers HIGH:!aNULL:!MD5;",
      })
    }

    if (!text.includes("ssl_prefer_server_ciphers")) {
      score -= 5
      findings.push({
        severity: "info",
        rule: "Server cipher preference not set",
        description: "Server should choose ciphers, not the client.",
        suggestion: "Add: ssl_prefer_server_ciphers on;",
      })
    }
  }

  // Check HSTS
  if (!text.includes("strict-transport-security")) {
    score -= 15
    findings.push({
      severity: "critical",
      rule: "Missing HSTS header",
      description: "Browsers won't enforce HTTPS on repeat visits.",
      suggestion: 'Add: add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;',
    })
  }

  // Check X-Frame-Options
  if (!text.includes("x-frame-options")) {
    score -= 10
    findings.push({
      severity: "warn",
      rule: "Missing X-Frame-Options",
      description: "Clickjacking is possible.",
      suggestion: 'Add: add_header X-Frame-Options "DENY" always;',
    })
  }

  // Check CSP
  if (!text.includes("content-security-policy")) {
    score -= 12
    findings.push({
      severity: "warn",
      rule: "Missing Content-Security-Policy",
      description: "XSS protection not configured.",
      suggestion: 'Add: add_header Content-Security-Policy "default-src \'self\'" always;',
    })
  }

  // Check for unsafe upstreams
  const upstreamMatches = content.match(/upstream\s+\w+\s*\{([^}]*)\}/gi) || []
  for (const upstream of upstreamMatches) {
    if (/server\s+127\.0\.0\.1|server\s+localhost/i.test(upstream)) {
      findings.push({
        severity: "info",
        rule: "Upstream on localhost detected",
        description: "Local upstream is normal for microservices.",
        suggestion: "Ensure firewall restricts access to this port.",
      })
    }
  }

  // Check for HTTP/2
  if (!text.includes("http2") && !text.includes("spdy")) {
    findings.push({
      severity: "info",
      rule: "HTTP/2 not enabled",
      description: "HTTP/2 provides better performance.",
      suggestion: "Add http2 to listen: listen 443 ssl http2;",
    })
  }

  // Check for client body size limits
  if (!text.includes("client_max_body_size")) {
    findings.push({
      severity: "warn",
      rule: "No client_max_body_size limit",
      description: "Unlimited upload size can lead to DoS.",
      suggestion: "Add: client_max_body_size 10m; (adjust as needed)",
    })
  }

  // Check for resolver (for dynamic DNS)
  if (text.includes("resolver") && text.includes("$") && !text.includes("valid=")) {
    score -= 5
    findings.push({
      severity: "info",
      rule: "DNS resolver cache not set",
      description: "Dynamic DNS lookups should have cache TTL.",
      suggestion: "Add valid parameter: resolver 8.8.8.8 valid=300s;",
    })
  }

  // Check for exposed server version
  if (!text.includes("server_tokens off")) {
    score -= 5
    findings.push({
      severity: "warn",
      rule: "Server version exposed",
      description: "Nginx version is visible in responses.",
      suggestion: "Add: server_tokens off;",
    })
  }

  // Check for path traversal protection
  if (!text.includes("if") || !text.match(/if\s*\(\s*\$uri\s*~*/i)) {
    findings.push({
      severity: "info",
      rule: "No explicit path traversal rules",
      description: "Common practice is to deny access to sensitive paths.",
      suggestion: 'Add: location ~ /\\.\\./ { deny all; }',
    })
  }

  if (score < 0) score = 0

  return { score, findings }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { config } = body as { config?: string }

    if (!config || typeof config !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'config' parameter." }, { status: 400 })
    }

    const { score, findings } = analyzeNginx(config)
    const result: Result = {
      score,
      grade: gradeFromScore(score),
      findings,
    }

    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json(
      { error: `Server error: ${e instanceof Error ? e.message : "Unknown"}` },
      { status: 500 }
    )
  }
}
