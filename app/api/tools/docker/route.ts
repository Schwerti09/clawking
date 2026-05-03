// Docker Hardening Grader backend — analyzes Dockerfile for security best practices

import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface Finding {
  severity: "info" | "warn" | "critical"
  rule: string
  description: string
  suggestion: string
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

function analyzeDockerfile(content: string): { score: number; findings: Finding[] } {
  const findings: Finding[] = []
  let score = 100

  const lines = content.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))

  // Check FROM directive
  const fromLine = lines.find((l) => l.toUpperCase().startsWith("FROM"))
  if (!fromLine) {
    score -= 50
    findings.push({
      severity: "critical",
      rule: "Missing FROM",
      description: "Every Dockerfile must start with a FROM directive.",
      suggestion: "Add FROM <image:tag> as the first instruction.",
    })
  } else {
    const imageMatch = fromLine.match(/FROM\s+([^\s:]+):?([^\s]*)/i)
    const image = imageMatch?.[1]?.toLowerCase()
    const tag = imageMatch?.[2]?.toLowerCase()

    if (!tag || tag === "latest") {
      score -= 15
      findings.push({
        severity: "warn",
        rule: "Missing or latest base image tag",
        description: "Using 'latest' or no tag is fragile. Images change without your control.",
        suggestion: "Use a specific version tag, e.g., ubuntu:22.04 or node:18-alpine.",
      })
    }

    // Check for distroless or alpine
    if (image?.includes("distroless") || image?.includes("alpine")) {
      findings.push({
        severity: "info",
        rule: "Minimal base image",
        description: "Using distroless or Alpine is a good security practice.",
        suggestion: "Consider this best practice confirmed.",
      })
    }
  }

  // Check for USER directive
  if (!lines.some((l) => l.toUpperCase().startsWith("USER"))) {
    score -= 20
    findings.push({
      severity: "critical",
      rule: "Container runs as root",
      description: "Containers should run as a non-root user to limit privilege escalation.",
      suggestion: "Add USER <username> before any ENTRYPOINT/CMD.",
    })
  } else {
    const userLine = lines.find((l) => l.toUpperCase().startsWith("USER"))
    if (userLine?.includes("root")) {
      score -= 20
      findings.push({
        severity: "critical",
        rule: "Explicit root user",
        description: "Running as root defeats security sandboxing.",
        suggestion: "Create a non-root user (e.g., appuser) and switch to it.",
      })
    }
  }

  // Check for HEALTHCHECK
  if (!lines.some((l) => l.toUpperCase().startsWith("HEALTHCHECK"))) {
    findings.push({
      severity: "info",
      rule: "No HEALTHCHECK",
      description: "Health checks help orchestrators detect and restart failed containers.",
      suggestion: 'Add HEALTHCHECK CMD curl -f http://localhost/ || exit 1',
    })
  }

  // Check for secrets in RUN
  const runLines = lines.filter((l) => l.toUpperCase().startsWith("RUN"))
  if (runLines.some((l) => /password|secret|key|token/i.test(l))) {
    score -= 25
    findings.push({
      severity: "critical",
      rule: "Hardcoded secrets in RUN",
      description: "Secrets in Dockerfile layers are baked into the image and visible in history.",
      suggestion: "Use BuildKit secrets: RUN --mount=type=secret,id=secret_id.",
    })
  }

  // Check for apt-get/yum without cleanup
  const aptLines = lines.filter((l) => /apt-get|yum install/i.test(l))
  if (aptLines.length > 0) {
    const hasCacheClear = content.includes("apt-get clean") || content.includes("rm -rf /var/lib/apt/lists")
    if (!hasCacheClear) {
      score -= 10
      findings.push({
        severity: "warn",
        rule: "Package manager cache not cleared",
        description: "Apt/yum caches bloat the layer. Always clean up.",
        suggestion: "Add && apt-get clean && rm -rf /var/lib/apt/lists/* to RUN lines.",
      })
    }
  }

  // Check for multi-stage builds
  const fromCount = lines.filter((l) => l.toUpperCase().startsWith("FROM")).length
  if (fromCount < 2) {
    findings.push({
      severity: "info",
      rule: "No multi-stage build detected",
      description: "Multi-stage builds reduce final image size by keeping build tools out.",
      suggestion: "Consider using a builder stage to compile, then copy artifacts to a final stage.",
    })
  }

  // Check for exposing unnecessary ports
  const exposeLines = lines.filter((l) => l.toUpperCase().startsWith("EXPOSE"))
  if (exposeLines.length > 3) {
    score -= 5
    findings.push({
      severity: "warn",
      rule: "Multiple EXPOSE directives",
      description: "Exposing many ports increases attack surface.",
      suggestion: "Only EXPOSE ports that are actually needed.",
    })
  }

  // Check CMD/ENTRYPOINT
  const hasCmd = lines.some((l) => l.toUpperCase().startsWith("CMD") || l.toUpperCase().startsWith("ENTRYPOINT"))
  if (!hasCmd) {
    score -= 10
    findings.push({
      severity: "warn",
      rule: "No CMD or ENTRYPOINT",
      description: "Container needs to know what to run.",
      suggestion: "Add ENTRYPOINT or CMD with exec form: ['executable', 'param1', 'param2']",
    })
  }

  // Check for privileged operations
  if (content.includes("--privileged")) {
    score -= 20
    findings.push({
      severity: "critical",
      rule: "Privileged mode in dockerfile",
      description: "Privileged containers bypass most security boundaries.",
      suggestion: "Avoid --privileged. Use capabilities() for specific needs instead.",
    })
  }

  if (score < 0) score = 0

  return { score, findings }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { dockerfile } = body as { dockerfile?: string }

    if (!dockerfile || typeof dockerfile !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'dockerfile' parameter." }, { status: 400 })
    }

    const { score, findings } = analyzeDockerfile(dockerfile)
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
