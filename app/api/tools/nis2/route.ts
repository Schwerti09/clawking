// NIS2/EUVD Gap Scanner backend — generates compliance checklists

import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface Control {
  id: string
  category: string
  title: string
  requirement: string
  evidence: string[]
  implemented: boolean
  priority: "high" | "medium" | "low"
}

interface Result {
  orgType: "oes" | "dsp" | "dnsp"
  industry: string
  totalControls: number
  implementedControls: number
  gapPercentage: number
  controls: Control[]
  summary: {
    critical: number
    high: number
    medium: number
  }
}

const NIS2_CONTROLS = [
  {
    id: "R1",
    category: "Governance",
    title: "Cybersecurity Incident Reporting",
    requirement:
      "Must report significant incidents to authorities within 24 hours. Operators must maintain incident response plans.",
    evidence: ["Incident response policy", "Reporting procedures", "24/7 contact for authorities"],
    priority: "high" as const,
  },
  {
    id: "R2",
    category: "Governance",
    title: "Risk Management Framework",
    requirement: "Annual risk assessments, risk treatment plans, documented mitigation strategies.",
    evidence: ["Annual risk assessment report", "Risk register", "Treatment plan"],
    priority: "high" as const,
  },
  {
    id: "R3",
    category: "Technical",
    title: "Multi-Factor Authentication",
    requirement: "MFA required for privileged accounts accessing critical systems.",
    evidence: ["MFA policy", "System logs showing MFA enforcement", "Access control documentation"],
    priority: "high" as const,
  },
  {
    id: "R4",
    category: "Technical",
    title: "Encryption in Transit & at Rest",
    requirement: "Sensitive data encrypted with strong algorithms (AES-256, TLS 1.3).",
    evidence: ["Encryption standards document", "System configuration audit", "Certificate management logs"],
    priority: "high" as const,
  },
  {
    id: "R5",
    category: "Technical",
    title: "Vulnerability Management",
    requirement: "Continuous scanning, patch management, penetration testing at least yearly.",
    evidence: ["Vulnerability scan results", "Patch management log", "Pentest report"],
    priority: "high" as const,
  },
  {
    id: "R6",
    category: "Operational",
    title: "Supply Chain Security",
    requirement: "Third-party vendors must meet security requirements. Contracts must include security clauses.",
    evidence: ["Vendor security policy", "Third-party risk assessment", "Contracts with SLAs"],
    priority: "medium" as const,
  },
  {
    id: "R7",
    category: "Operational",
    title: "Business Continuity & Disaster Recovery",
    requirement: "Backup strategies, recovery plans, tested at least annually. RPO ≤ 24h, RTO ≤ 72h.",
    evidence: ["BC/DR plan", "Backup schedule", "Recovery test report"],
    priority: "medium" as const,
  },
  {
    id: "R8",
    category: "Operational",
    title: "Awareness & Training",
    requirement: "Annual cybersecurity training for all staff. Role-specific training for critical roles.",
    evidence: ["Training records", "Training materials", "Completion attestations"],
    priority: "medium" as const,
  },
  {
    id: "R9",
    category: "Governance",
    title: "Board Oversight & Governance",
    requirement: "CISO or equivalent reports to board. Governance structures must reflect cybersecurity priority.",
    evidence: ["Organizational chart", "Board meeting minutes", "Cybersecurity policy"],
    priority: "medium" as const,
  },
  {
    id: "R10",
    category: "Technical",
    title: "Network Segmentation & Monitoring",
    requirement: "Critical systems segmented. Real-time monitoring, SIEM, alerting on anomalies.",
    evidence: ["Network diagram", "Firewall rules", "SIEM logs", "Monitoring dashboard"],
    priority: "high" as const,
  },
  {
    id: "R11",
    category: "Technical",
    title: "Access Control & IAM",
    requirement: "Principle of least privilege (PoLP). Regular access reviews. Disable unused accounts.",
    evidence: ["IAM policy", "Access matrix", "Quarterly review records"],
    priority: "high" as const,
  },
  {
    id: "R12",
    category: "Operational",
    title: "Logging & Audit Trails",
    requirement: "Centralized logging. Retain logs for at least 12 months. Protect against tampering.",
    evidence: ["Log retention policy", "SIEM configuration", "Log integrity verification"],
    priority: "medium" as const,
  },
]

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { orgType, industry } = body as { orgType?: string; industry?: string }

    if (!orgType || !["oes", "dsp", "dnsp"].includes(orgType)) {
      return NextResponse.json(
        { error: "Invalid orgType. Must be 'oes', 'dsp', or 'dnsp'." },
        { status: 400 }
      )
    }

    if (!industry || typeof industry !== "string" || !industry.trim()) {
      return NextResponse.json(
        { error: "Invalid industry parameter." },
        { status: 400 }
      )
    }

    // Simulate implementation status based on industry/org type
    const controls = NIS2_CONTROLS.map((control) => {
      // OES typically have higher implementation rates
      const implementedOesRate = 0.7
      const implementedDspRate = 0.5
      const implementedDnspRate = 0.8

      const rate = orgType === "oes" ? implementedOesRate : orgType === "dsp" ? implementedDspRate : implementedDnspRate
      const randomOffset = (Math.random() - 0.5) * 0.2 // ±10% variation
      const implemented = Math.random() < Math.max(0.2, Math.min(1, rate + randomOffset))

      return {
        ...control,
        implemented,
      }
    })

    const implementedCount = controls.filter((c) => c.implemented).length
    const gapPercentage = Math.round(((NIS2_CONTROLS.length - implementedCount) / NIS2_CONTROLS.length) * 100)

    const result: Result = {
      orgType: orgType as "oes" | "dsp" | "dnsp",
      industry: industry.trim(),
      totalControls: controls.length,
      implementedControls: implementedCount,
      gapPercentage,
      controls,
      summary: {
        critical: controls.filter((c) => !c.implemented && c.priority === "high").length,
        high: controls.filter((c) => !c.implemented && c.priority === "medium").length,
        medium: controls.filter((c) => !c.implemented && c.priority === "low").length,
      },
    }

    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json(
      { error: `Server error: ${e instanceof Error ? e.message : "Unknown"}` },
      { status: 500 }
    )
  }
}
