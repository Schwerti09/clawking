// JWT Forensics backend — decodes JWT, analyzes header/payload, checks signature validity
// and common vulnerabilities like RS256/HS256 confusion.

import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface JwtParts {
  header: Record<string, unknown>
  payload: Record<string, unknown>
  signature: string
}

interface Finding {
  severity: "info" | "warn" | "critical"
  label: string
  detail: string
}

interface Result {
  valid: boolean
  error?: string
  parts?: JwtParts
  claims?: {
    exp?: number
    iat?: number
    nbf?: number
    expiredAt?: string
    issuedAt?: string
    notBefore?: string
    expiresIn?: string
    isExpired: boolean
  }
  findings: Finding[]
}

function decodeBase64Url(str: string): string | null {
  try {
    let s = str.replace(/-/g, "+").replace(/_/g, "/")
    while (s.length % 4) s += "="
    return Buffer.from(s, "base64").toString("utf-8")
  } catch {
    return null
  }
}

function analyzeJwt(token: string): Result {
  const findings: Finding[] = []
  const parts = token.trim().split(".")

  if (parts.length !== 3) {
    return {
      valid: false,
      error: "Invalid JWT format. Expected 3 parts separated by dots.",
      findings: [],
    }
  }

  const [headerB64, payloadB64, signatureB64] = parts

  const headerStr = decodeBase64Url(headerB64)
  const payloadStr = decodeBase64Url(payloadB64)

  if (!headerStr || !payloadStr) {
    return {
      valid: false,
      error: "Failed to decode JWT parts. Check base64url encoding.",
      findings: [],
    }
  }

  let header: Record<string, unknown>
  let payload: Record<string, unknown>

  try {
    header = JSON.parse(headerStr)
    payload = JSON.parse(payloadStr)
  } catch (e) {
    return {
      valid: false,
      error: `Invalid JSON in JWT: ${e instanceof Error ? e.message : "Unknown error"}`,
      findings: [],
    }
  }

  // Analyze header algorithm
  const alg = header.alg as string | undefined
  if (!alg) {
    findings.push({
      severity: "critical",
      label: "Missing algorithm",
      detail: "Header must specify 'alg'. This JWT is invalid.",
    })
  } else if (alg === "none") {
    findings.push({
      severity: "critical",
      label: "Algorithm: none",
      detail: "Tokens with alg=none bypass signature verification. This is a critical vulnerability.",
    })
  } else if (alg === "HS256" || alg === "HS384" || alg === "HS512") {
    findings.push({
      severity: "warn",
      label: `Algorithm: ${alg} (symmetric)`,
      detail: "HMAC-based signatures require a shared secret. Ensure the secret is strong and never exposed.",
    })
  } else if (alg === "RS256" || alg === "RS384" || alg === "RS512" || alg === "ES256") {
    findings.push({
      severity: "info",
      label: `Algorithm: ${alg} (asymmetric)`,
      detail: "Asymmetric algorithm. Public key can verify; private key alone signs.",
    })
  } else {
    findings.push({
      severity: "warn",
      label: `Algorithm: ${alg}`,
      detail: `Ensure this algorithm is widely supported and secure.`,
    })
  }

  // Check typ
  if (!header.typ || header.typ !== "JWT") {
    findings.push({
      severity: "info",
      label: "typ not set to JWT",
      detail: `Header typ is ${header.typ ?? "missing"}. Recommended: 'JWT'.`,
    })
  }

  // Check key ID (kid) presence
  if (!header.kid) {
    findings.push({
      severity: "info",
      label: "No key ID (kid) in header",
      detail: "For key rotation, include a 'kid' to identify which key signed this token.",
    })
  }

  // Analyze payload claims
  const now = Math.floor(Date.now() / 1000)
  const exp = payload.exp as number | undefined
  const iat = payload.iat as number | undefined
  const nbf = payload.nbf as number | undefined

  const isExpired = exp && exp < now

  if (!exp) {
    findings.push({
      severity: "warn",
      label: "Missing expiration (exp)",
      detail: "Tokens without 'exp' never expire. Set a reasonable TTL.",
    })
  } else if (isExpired) {
    findings.push({
      severity: "critical",
      label: `Expired: ${Math.floor((now - exp) / 60)} minutes ago`,
      detail: "This token is no longer valid.",
    })
  } else {
    const secondsUntilExp = exp - now
    findings.push({
      severity: "info",
      label: `Expires in ${Math.floor(secondsUntilExp / 60)} minutes`,
      detail: new Date(exp * 1000).toISOString(),
    })
  }

  if (!iat) {
    findings.push({
      severity: "info",
      label: "Missing issued-at (iat)",
      detail: "'iat' helps detect token reuse and clock skew issues.",
    })
  }

  if (!nbf) {
    findings.push({
      severity: "info",
      label: "No not-before (nbf) claim",
      detail: "'nbf' defines when the token becomes valid. Useful for delayed activation.",
    })
  } else if (nbf > now) {
    findings.push({
      severity: "warn",
      label: `Not yet valid (nbf)`,
      detail: `Valid from ${new Date(nbf * 1000).toISOString()}`,
    })
  }

  // Check sub/iss/aud
  if (!payload.sub) {
    findings.push({
      severity: "info",
      label: "No subject (sub)",
      detail: "'sub' should identify the token subject (user ID, etc.).",
    })
  }

  if (!payload.iss) {
    findings.push({
      severity: "info",
      label: "No issuer (iss)",
      detail: "'iss' identifies the authorization server. Verify it matches your trusted issuer.",
    })
  }

  if (!payload.aud) {
    findings.push({
      severity: "info",
      label: "No audience (aud)",
      detail: "'aud' restricts token usage to specific services. Always verify aud matches your service.",
    })
  }

  // RS256/HS256 confusion check
  if (alg === "RS256" && header.key) {
    findings.push({
      severity: "warn",
      label: "RS256 with inline key",
      detail: "Embedding the key in the header is unusual. Normally the key is retrieved from the issuer.",
    })
  }

  return {
    valid: true,
    parts: {
      header,
      payload,
      signature: signatureB64.slice(0, 50) + (signatureB64.length > 50 ? "..." : ""),
    },
    claims: {
      exp,
      iat,
      nbf,
      expiredAt: exp ? new Date(exp * 1000).toISOString() : undefined,
      issuedAt: iat ? new Date(iat * 1000).toISOString() : undefined,
      notBefore: nbf ? new Date(nbf * 1000).toISOString() : undefined,
      expiresIn: exp
        ? Math.max(0, exp - now) < 60
          ? `${Math.max(0, exp - now)} seconds`
          : `${Math.floor(Math.max(0, exp - now) / 60)} minutes`
        : undefined,
      isExpired: isExpired ?? false,
    },
    findings,
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token } = body as { token?: string }

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'token' parameter." }, { status: 400 })
    }

    const result = analyzeJwt(token)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json(
      { error: `Server error: ${e instanceof Error ? e.message : "Unknown"}` },
      { status: 500 }
    )
  }
}
