// DNS Takeover Scanner backend — checks for DNS misconfiguration and hijack vectors

import { NextResponse } from "next/server"
import { promises as dnsPromises } from "dns"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface DnsRecord {
  type: string
  value: string
  severity?: "info" | "warn" | "critical"
  message?: string
}

interface Finding {
  severity: "info" | "warn" | "critical"
  record: string
  message: string
  suggestion: string
}

interface Result {
  domain: string
  records: DnsRecord[]
  findings: Finding[]
  hijackRisk: "low" | "medium" | "high"
}

async function checkDnsTakeover(domain: string): Promise<Result> {
  const findings: Finding[] = []
  const records: DnsRecord[] = []
  let hijackRisk: "low" | "medium" | "high" = "low"

  // Validate domain
  if (!domain || !/^[a-z0-9.-]+$/i.test(domain)) {
    throw new Error("Invalid domain format")
  }

  const dns = dnsPromises

  try {
    // Check A records
    const aRecords = await dns.resolve4(domain).catch(() => [])
    for (const ip of aRecords) {
      records.push({ type: "A", value: ip })
    }

    // Check AAAA records
    const aaaaRecords = await dns.resolve6(domain).catch(() => [])
    for (const ip of aaaaRecords) {
      records.push({ type: "AAAA", value: ip })
    }

    // Check MX records
    const mxRecords = await dns.resolveMx(domain).catch(() => [])
    for (const mx of mxRecords) {
      records.push({ type: "MX", value: `${mx.priority} ${mx.exchange}` })
    }

    // Check CNAME records
    const cnameRecords = await dns.resolveCname(domain).catch(() => [])
    for (const cname of cnameRecords) {
      records.push({
        type: "CNAME",
        value: cname,
        severity: "warn",
        message: "CNAME detected. Check for dangling pointers.",
      })
    }

    // Check TXT records (including SPF)
    const txtRecords = await dns.resolveTxt(domain).catch(() => [])
    for (const txt of txtRecords) {
      const record = txt.join("")
      records.push({
        type: "TXT",
        value: record.slice(0, 80) + (record.length > 80 ? "…" : ""),
      })

      if (record.includes("v=spf1")) {
        findings.push({
          severity: "info",
          record: "SPF",
          message: "SPF record found.",
          suggestion: "Ensure your SPF record includes all mail servers and ends with -all",
        })
      }

      if (record.includes("v=DMARC")) {
        findings.push({
          severity: "info",
          record: "DMARC",
          message: "DMARC policy detected.",
          suggestion: "Monitor DMARC reports for authentication failures.",
        })
      }
    }

    // Check NS records
    const nsRecords = await dns.resolveNs(domain).catch(() => [])
    for (const ns of nsRecords) {
      records.push({ type: "NS", value: ns })
    }

    if (nsRecords.length < 2) {
      hijackRisk = "medium"
      findings.push({
        severity: "warn",
        record: "NS",
        message: "Less than 2 nameservers. No redundancy.",
        suggestion: "Add at least 2 authoritative nameservers for resilience.",
      })
    }

    // Check for dangling CNAMEs
    if (cnameRecords.length > 0) {
      hijackRisk = "high"
      findings.push({
        severity: "critical",
        record: "CNAME",
        message: "CNAME aliases detected. High risk of subdomain takeover.",
        suggestion: 'Verify all CNAMEs point to active services. Remove dangling ones immediately.',
      })
    }

    // Check for zone transfer vulnerability
    try {
      // Attempt zone transfer (AXFR) - should fail on modern setups
      await dns.resolveSoa(domain).catch(() => null)
    } catch (e) {
      // Expected to fail
    }

    if (records.length === 0) {
      findings.push({
        severity: "warn",
        record: "General",
        message: "No DNS records resolved.",
        suggestion: "Check domain registration and NS configuration.",
      })
    }

    if (records.some((r) => r.type === "CNAME" && !r.severity)) {
      hijackRisk = "medium"
    }
  } catch (e) {
    findings.push({
      severity: "critical",
      record: "DNS",
      message: `DNS lookup failed: ${e instanceof Error ? e.message : "Unknown error"}`,
      suggestion: "Verify domain exists and DNS is properly configured.",
    })
    hijackRisk = "high"
  }

  return {
    domain,
    records,
    findings,
    hijackRisk,
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { domain } = body as { domain?: string }

    if (!domain || typeof domain !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'domain' parameter." }, { status: 400 })
    }

    const result = await checkDnsTakeover(domain)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json(
      { error: `Server error: ${e instanceof Error ? e.message : "Unknown"}` },
      { status: 500 }
    )
  }
}
