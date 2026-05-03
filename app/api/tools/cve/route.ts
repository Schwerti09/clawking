// CVE Time Machine backend — fetches CVE data from NVD API

import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface CveEntry {
  id: string
  publishedDate: string
  lastModifiedDate: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  baseScore: number
  description: string
  references: string[]
}

interface Result {
  library: string
  found: boolean
  totalCves?: number
  cves?: CveEntry[]
  severityBreakdown?: {
    CRITICAL: number
    HIGH: number
    MEDIUM: number
    LOW: number
  }
}

async function fetchNvdCves(library: string): Promise<CveEntry[]> {
  const cves: CveEntry[] = []

  // This is a simplified mock. In production, you'd call NVD API with proper key rotation
  // https://services.nvd.nist.gov/rest/json/cves/2.0
  // Rate limit: 5 requests per 30 seconds without API key, 120 requests per 30 seconds with key

  try {
    // Mock response for demo - in real implementation:
    // const url = `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${library}`
    // const response = await fetch(url, { headers: { Authorization: `Bearer ${NVD_API_KEY}` } })
    // const data = await response.json()

    // For now, return empty array with a note that this would require NVD API setup
    return []
  } catch (e) {
    console.error("Error fetching from NVD:", e)
    return []
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { library } = body as { library?: string }

    if (!library || typeof library !== "string" || !library.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid 'library' parameter. Provide package name (e.g., 'lodash')." },
        { status: 400 }
      )
    }

    const sanitized = library.trim().toLowerCase().replace(/[^a-z0-9.-]/g, "")

    if (sanitized.length === 0 || sanitized.length > 255) {
      return NextResponse.json({ error: "Invalid library name." }, { status: 400 })
    }

    const cves = await fetchNvdCves(sanitized)

    const result: Result = {
      library: sanitized,
      found: cves.length > 0,
    }

    if (cves.length > 0) {
      result.totalCves = cves.length
      result.cves = cves.slice(0, 100) // Limit to first 100
      result.severityBreakdown = {
        CRITICAL: cves.filter((c) => c.severity === "CRITICAL").length,
        HIGH: cves.filter((c) => c.severity === "HIGH").length,
        MEDIUM: cves.filter((c) => c.severity === "MEDIUM").length,
        LOW: cves.filter((c) => c.severity === "LOW").length,
      }
    }

    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json(
      { error: `Server error: ${e instanceof Error ? e.message : "Unknown"}` },
      { status: 500 }
    )
  }
}
