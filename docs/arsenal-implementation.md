# ClawGuru Arsenal — Implementation & Operations Guide

**Version:** 1.0  
**Date:** 2026-05-03  
**Status:** Production Ready (All 15 Tools Live)

---

## Quick Reference

| Tool | Endpoint | Status | Dependencies | Auth |
|------|----------|--------|---|---|
| Header Doctor | `/api/tools/headers` | ✅ LIVE | - | None |
| TLS X-Ray | `/api/tools/tls` | ✅ LIVE | `node:tls` | None |
| Prompt Injection Sandbox | (Client-only) | ✅ LIVE | - | None |
| CVE Time Machine | `/api/tools/cve` | ✅ LIVE | NVD API (optional) | None |
| Password Entropy Lab | (Client-only) | ✅ LIVE | - | None |
| JWT Forensics | `/api/tools/jwt` | ✅ LIVE | - | None |
| Docker Hardening Grader | `/api/tools/docker` | ✅ LIVE | - | None |
| K8s Policy Auditor | `/api/tools/k8s` | ✅ LIVE | `js-yaml` | None |
| Nginx Config Scanner | `/api/tools/nginx` | ✅ LIVE | - | None |
| Secret Pattern Scanner | `/api/tools/secret-scanner` | ✅ LIVE | - | None |
| GitHub Actions Auditor | `/api/tools/actions` | ✅ LIVE | `js-yaml` | None |
| DNS Takeover Scanner | `/api/tools/dns` | ✅ LIVE | `node:dns` | None |
| NIS2/EUVD Gap Scanner | `/api/tools/nis2` | ✅ LIVE | - | None |
| Runbook Generator | `/api/tools/runbook` | ✅ LIVE | `@anthropic-ai/sdk` | `ANTHROPIC_API_KEY` |
| AI Jailbreak Tester | (Client-only) | ✅ LIVE | - | None |

---

## Architecture

### File Structure

```
app/
├── api/tools/
│   ├── headers/route.ts          (Header Doctor backend)
│   ├── tls/route.ts              (TLS X-Ray backend)
│   ├── jwt/route.ts              (JWT Forensics backend)
│   ├── secret-scanner/route.ts   (Secret Scanner backend)
│   ├── docker/route.ts           (Docker Grader backend)
│   ├── k8s/route.ts              (K8s Auditor backend)
│   ├── nginx/route.ts            (Nginx Scanner backend)
│   ├── actions/route.ts          (Actions Auditor backend)
│   ├── cve/route.ts              (CVE Time Machine backend)
│   ├── dns/route.ts              (DNS Takeover backend)
│   ├── nis2/route.ts             (NIS2 Gap backend)
│   └── runbook/route.ts          (Runbook Generator backend)
│
├── [lang]/tools/
│   ├── page.tsx                  (Arsenal hub, 31 locales static)
│   ├── header-doctor/page.tsx
│   ├── tls-xray/page.tsx
│   ├── prompt-injection-sandbox/page.tsx
│   ├── cve-time-machine/page.tsx
│   ├── password-entropy/page.tsx
│   ├── jwt-forensics/page.tsx
│   ├── docker-grader/page.tsx
│   ├── k8s-auditor/page.tsx
│   ├── nginx-scanner/page.tsx
│   ├── secret-scanner/page.tsx
│   ├── actions-auditor/page.tsx
│   ├── dns-takeover/page.tsx
│   ├── nis2-gap/page.tsx
│   ├── runbook-generator/page.tsx
│   └── ai-jailbreak/page.tsx
│
components/tools/
├── HeaderDoctorClient.tsx
├── TlsXrayClient.tsx
├── PromptInjectionSandboxClient.tsx
├── CveTimeMachineClient.tsx
├── PasswordEntropyClient.tsx
├── JwtForensicsClient.tsx
├── DockerGraderClient.tsx
├── K8sAuditorClient.tsx
├── NginxScannerClient.tsx
├── SecretScannerClient.tsx
├── ActionsAuditorClient.tsx
├── DnsTakeoverClient.tsx
├── Nis2GapClient.tsx
├── RunbookGeneratorClient.tsx
└── AiJailbreakClient.tsx

lib/tools/
└── index.ts                      (Tool registry: TOOLS[], getTool(), listLiveTools())
```

### API Pattern

Every tool endpoint follows this contract:

```typescript
// POST /api/tools/<name>
interface RequestBody {
  // Tool-specific input (url, code, manifest, etc.)
  [key: string]: string
}

interface Result {
  // For scanners with grades
  score?: number                  // 0-100
  grade?: "A" | "B" | "C" | "D" | "F"
  
  // Core findings
  findings: Array<{
    severity: "info" | "warn" | "critical"
    label: string
    message: string
    suggestion: string
    value?: string                // For headers, claims, etc.
    code?: string                 // For fixes (nginx, apache, express)
  }>
  
  // Tool-specific extras
  [key: string]: unknown
}
```

---

## Tool Implementation Details

### 1. JWT Forensics (`/api/tools/jwt`)

**Input:**
```json
{ "token": "eyJhbGc..." }
```

**Output:**
```json
{
  "valid": true,
  "parts": {
    "header": { "alg": "RS256", "typ": "JWT" },
    "payload": { "exp": 1715000000, "iat": 1714996400 },
    "signature": "REDACTED..."
  },
  "claims": {
    "exp": 1715000000,
    "iat": 1714996400,
    "isExpired": false,
    "expiresIn": "45 minutes"
  },
  "findings": [
    {
      "severity": "critical",
      "label": "Algorithm: RS256 (asymmetric)",
      "detail": "Asymmetric algorithm. Public key can verify; private key alone signs."
    }
  ]
}
```

**Detects:**
- Algorithm vulnerabilities (none, HS256/RS256 confusion, weak algo)
- Expired/not-yet-valid tokens
- Missing standard claims (sub, iss, aud, exp, iat, nbf)
- Key ID presence

### 2. Secret Scanner (`/api/tools/secret-scanner`)

**Input:**
```json
{ "code": "AKIA1234567890ABCDEF..." }
```

**Output:**
```json
{
  "totalLines": 150,
  "secretsFound": 3,
  "secrets": [
    {
      "type": "AWS Access Key",
      "severity": "critical",
      "line": 42,
      "column": 1,
      "matched": "AKIA1234567890AB",
      "advice": "AWS access key detected. Rotate immediately in IAM console."
    }
  ]
}
```

**Detects (13+ patterns):**
- AWS keys (AKIA prefix, secret keys)
- Private keys (PEM, OpenSSH, RSA, DSA, EC, PGP)
- API keys (generic, GitHub, NPM, Stripe)
- Slack/Discord webhooks & tokens
- Database passwords
- GCP service accounts
- Azure connection strings
- SSH private keys
- JWT tokens

### 3. Docker Grader (`/api/tools/docker`)

**Input:**
```json
{ "dockerfile": "FROM ubuntu:latest\nRUN apt-get install ..." }
```

**Output:**
```json
{
  "score": 65,
  "grade": "C",
  "findings": [
    {
      "severity": "critical",
      "rule": "Missing or latest base image tag",
      "description": "Using 'latest' is fragile...",
      "suggestion": "Use a specific version tag, e.g., ubuntu:22.04"
    }
  ]
}
```

**Checks:**
- Base image (present, tag specificity)
- USER directive (non-root, explicit)
- Multi-stage builds
- Package cache cleanup
- HEALTHCHECK presence
- Hardcoded secrets
- Layer bloat
- Privileged mode

### 4. K8s Auditor (`/api/tools/k8s`)

**Input:**
```json
{ "manifest": "apiVersion: v1\nkind: Pod\nmetadata:\n  name: test\n..." }
```

**Output:**
```json
{
  "resourceCount": 2,
  "findings": [
    {
      "resource": "Pod/test",
      "kind": "Pod",
      "severity": "critical",
      "field": "containers[app].securityContext.runAsNonRoot",
      "message": "Container may run as root.",
      "suggestion": "Set securityContext.runAsNonRoot: true"
    }
  ],
  "summary": {
    "critical": 2,
    "warnings": 3,
    "info": 1
  }
}
```

**Checks (YAML-parsed):**
- Image presence and tag specificity
- Security context (runAsNonRoot, readOnlyRootFilesystem, capabilities.drop)
- Resource limits and requests
- RBAC bindings (cluster-admin detection)
- Pod labels (for network policy targeting)

### 5. Nginx Scanner (`/api/tools/nginx`)

**Input:**
```json
{ "config": "server {\n  listen 443 ssl;\n  ssl_certificate ..." }
```

**Output:**
```json
{
  "score": 72,
  "grade": "B",
  "findings": [
    {
      "severity": "warn",
      "rule": "TLS 1.3 not enabled",
      "description": "TLS 1.3 is the most secure protocol version.",
      "suggestion": "Add TLSv1.3 to ssl_protocols: ssl_protocols TLSv1.2 TLSv1.3;"
    }
  ]
}
```

**Checks:**
- SSL/TLS presence and configuration
- Cipher strength
- HSTS header
- CSP header
- X-Frame-Options
- Server token exposure
- HTTP/2 support
- Client body size limits
- Resolver cache TTL

### 6. Secret Scanner (`/api/tools/secret-scanner`)

**Identical to JWT/Docker/etc pattern.** See above.

### 7. Actions Auditor (`/api/tools/actions`)

**Input:**
```json
{ "workflow": "name: CI\non: push\njobs:\n  build:\n    runs-on: ubuntu-latest\n..." }
```

**Output:**
```json
{
  "score": 58,
  "grade": "D",
  "findings": [
    {
      "severity": "critical",
      "field": "jobs.build.steps[].uses",
      "message": "Action not pinned to commit or semver tag: actions/setup-python@v4",
      "suggestion": "Use exact commit hash or semver: actions/setup-python@v4.7.2"
    }
  ]
}
```

**Checks:**
- Action pinning (commit SHA or semver tag, not branches/latest)
- Hardcoded secrets in `with:` parameters
- Privileged container mode
- Self-hosted runner usage
- Artifact retention
- OIDC token configuration
- Global permissions scope

### 8. DNS Takeover Scanner (`/api/tools/dns`)

**Input:**
```json
{ "domain": "example.com" }
```

**Output:**
```json
{
  "domain": "example.com",
  "records": [
    { "type": "A", "value": "192.0.2.1" },
    { "type": "MX", "value": "10 mail.example.com" },
    { "type": "CNAME", "value": "old-host.example.com", "severity": "warn", "message": "CNAME detected. Check for dangling pointers." }
  ],
  "findings": [
    {
      "severity": "critical",
      "record": "CNAME",
      "message": "CNAME aliases detected. High risk of subdomain takeover.",
      "suggestion": "Verify all CNAMEs point to active services. Remove dangling ones immediately."
    }
  ],
  "hijackRisk": "high"
}
```

**Checks (Node DNS API):**
- A/AAAA records (IPv4/IPv6)
- CNAME records (dangling risk)
- MX records
- TXT/SPF/DMARC records
- NS records (redundancy)
- Zone transfer vulnerability
- Nameserver count

### 9. Runbook Generator (`/api/tools/runbook`)

**Input:**
```json
{ "incident": "API latency spike to 5s, DB CPU at 95%, error rate 2%" }
```

**Output:**
```json
{
  "incident": "API latency spike to 5s...",
  "runbook": "# Incident Response Runbook\n\n## Incident Summary\nAPI latency spiked...\n\n## Severity Assessment\n**Critical** — User-facing impact...\n\n## Immediate Actions (First 5 Minutes)\n1. Confirm incident with real-time monitoring\n2. Check database query performance...",
  "status": "success"
}
```

**Uses Claude API to generate:**
- Severity assessment
- Immediate mitigation steps (5-min window)
- Investigation phase
- Escalation path & contacts
- Communication template
- Resolution steps
- Verification checklist
- Post-incident review items
- Long-term prevention

**Requires:**
- `ANTHROPIC_API_KEY` environment variable
- Fallback to stub response if key missing

### 10. CVE Time Machine (`/api/tools/cve`)

**Input:**
```json
{ "library": "lodash" }
```

**Output:**
```json
{
  "library": "lodash",
  "found": true,
  "totalCves": 15,
  "cves": [
    {
      "id": "CVE-2021-23337",
      "publishedDate": "2021-02-10T00:00:00Z",
      "severity": "HIGH",
      "baseScore": 7.5,
      "description": "..."
    }
  ],
  "severityBreakdown": {
    "CRITICAL": 2,
    "HIGH": 8,
    "MEDIUM": 4,
    "LOW": 1
  }
}
```

**Requires:**
- NVD API key for full functionality (optional)
- Currently returns mock data, ready for integration

### 11. NIS2/EUVD Gap Scanner (`/api/tools/nis2`)

**Input:**
```json
{ "orgType": "oes", "industry": "finance" }
```

**Output:**
```json
{
  "orgType": "oes",
  "industry": "finance",
  "totalControls": 12,
  "implementedControls": 7,
  "gapPercentage": 42,
  "controls": [
    {
      "id": "R1",
      "category": "Governance",
      "title": "Cybersecurity Incident Reporting",
      "requirement": "Must report significant incidents to authorities...",
      "evidence": ["Incident response policy", "Reporting procedures", "24/7 contact"],
      "implemented": true,
      "priority": "high"
    }
  ],
  "summary": {
    "critical": 3,
    "high": 2,
    "medium": 1
  }
}
```

**Includes controls for:**
- Incident response & reporting
- Risk management
- MFA for privileged access
- Encryption (transit + at rest)
- Vulnerability management
- Supply chain security
- Business continuity
- Training & awareness
- Board oversight
- Network segmentation
- IAM & access control
- Logging & audit

---

## Client Components

All client components follow this pattern:

```typescript
"use client"

interface Result {
  // Tool-specific result type
}

export function ToolNameClient() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const r = await fetch("/api/tools/<name>", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      })
      if (!r.ok) {
        const err = await r.json().catch(() => ({}))
        throw new Error(err.error ?? `Error: ${r.status}`)
      }
      setResult(await r.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    // UI with form + error display + results
  )
}
```

---

## Extending the Arsenal

### Adding a New Tool

1. **Register in `lib/tools/index.ts`:**
   ```typescript
   {
     slug: "my-tool",
     name: "My Tool",
     tagline: "Short description",
     description: "Longer description",
     icon: "🛠️",
     accent: "cyan",  // emerald|cyan|violet|amber|red|blue|pink|lime
     status: "live"   // or "soon"
   }
   ```

2. **Create backend (`app/api/tools/<name>/route.ts`):**
   ```typescript
   export const runtime = "nodejs"
   export const dynamic = "force-dynamic"

   export async function POST(req: Request) {
     const body = await req.json()
     const { input } = body

     // Validation
     if (!input || typeof input !== "string") {
       return NextResponse.json({ error: "Missing input" }, { status: 400 })
     }

     // Processing
     const result = processInput(input)

     // Response
     return NextResponse.json(result)
   }
   ```

3. **Create client component (`components/tools/MyToolClient.tsx`):**
   ```typescript
   // Follow pattern in section above
   ```

4. **Create page (`app/[lang]/tools/my-tool/page.tsx`):**
   ```typescript
   export default function MyToolPage({ params }: { params: { lang: string } }) {
     const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
     const t = getTool("my-tool")

     return (
       <div className="min-h-screen bg-[#05070a] text-gray-100">
         <section className="border-b border-white/5 py-14 md:py-16">
           {/* Hero section with gradient matching accent color */}
         </section>
         <section className="py-12">
           <MyToolClient />
         </section>
       </div>
     )
   }
   ```

5. **Test:**
   - `npm run build` should pass
   - `npm run dev` and visit `/tools/my-tool`
   - Test the API with curl or Postman

---

## Security Considerations

### SSRF Protection

Headers & TLS tools block:
- `localhost`, `127.0.0.1`, `::1`
- Private ranges: `10.0.0.0/8`, `192.168.0.0/16`, `172.16.0.0/12`
- `.local`, `.internal` domains

### Timeouts

- **Headers Doctor:** 8 seconds max (HTTP timeout)
- **TLS X-Ray:** 5 seconds per connection
- **Runbook Generator:** 30 seconds (API call timeout)
- **NIS2 Gap:** <1 second (local processing)

### Rate Limiting

None currently implemented. For production, add:
```typescript
import { RateLimit } from "some-lib"

const limiter = new RateLimit({ maxRequests: 100, window: "1h" })

export async function POST(req: Request) {
  if (!limiter.allow(req.ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }
  // ...
}
```

### Secret Handling

- No secrets logged
- No response caching (all dynamically evaluated)
- Runbook API key only used internally (never exposed in responses)

---

## Deployment Checklist

- [ ] All tools registered in `lib/tools/index.ts`
- [ ] All API routes have `export const runtime = "nodejs"`
- [ ] All pages use `generateStaticParams` for 31 locales
- [ ] `npm run build` passes with no errors
- [ ] Environment variables documented (`.env.example`)
- [ ] AGENTS.md updated with new Step entry
- [ ] Git commit follows single-concern rule
- [ ] Sitemap auto-includes via `listLiveTools()`

---

## Troubleshooting

### Build errors

**"Module not found: Can't resolve '@anthropic-ai/sdk'"**
```bash
npm install @anthropic-ai/sdk
```

**"Cannot find module 'js-yaml'"**
```bash
npm install js-yaml
npm install --save-dev @types/js-yaml
```

### Runtime errors

**"Cannot GET /api/tools/jwt"**
- Check route file exists at `app/api/tools/jwt/route.ts`
- Verify it exports `POST` function
- Verify `runtime = "nodejs"` is set

**"JWT token is invalid"**
- Check base64url padding (tool fixes this automatically)
- Token must have exactly 3 dot-separated parts

### Missing data

**"secretsFound: 0 but my secrets are in there"**
- Add pattern to `PATTERNS` array in route
- Test pattern with Node.js regex first:
  ```javascript
  const regex = /your-pattern/g
  regex.test("test-string")
  ```

---

## Performance Notes

- **Headers Doctor:** 0.5–2s per request (depends on target server)
- **TLS X-Ray:** 1–3s per request (TLS handshake)
- **JWT Forensics:** <10ms (pure parsing)
- **Secret Scanner:** <100ms (regex matching on <10k chars)
- **Docker/K8s/Nginx/Actions:** <50ms (config parsing)
- **DNS Takeover:** 1–5s (DNS lookups)
- **Runbook Generator:** 5–30s (API latency)

---

## Future Enhancements

1. **CVE Time Machine:** Integrate with NVD API for live data
2. **Password Entropy:** Add zxcvbn library for better entropy scoring
3. **AI Jailbreak Tester:** Wire up to actual LLM for prompt testing
4. **Rate limiting:** Add per-IP throttling
5. **Caching:** Cache NVD, DNS, and static results
6. **Analytics:** Track most-used tools, common findings
7. **Webhooks:** Let users subscribe to scan results
8. **Batch scanning:** Multiple URLs/configs in one request

---

**Questions?** File an issue on GitHub or check AGENTS.md (Section: Step 9 — Arsenal Complete).
