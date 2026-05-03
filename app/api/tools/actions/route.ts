// GitHub Actions Auditor backend — validates workflow files for security best practices

import { NextResponse } from "next/server"
import * as YAML from "js-yaml"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface Finding {
  severity: "info" | "warn" | "critical"
  field: string
  message: string
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

function analyzeActions(yamlContent: string): { score: number; findings: Finding[] } {
  const findings: Finding[] = []
  let score = 100

  let workflow: Record<string, unknown>
  try {
    workflow = (YAML.load(yamlContent) as Record<string, unknown>) || {}
  } catch (e) {
    return {
      score: 0,
      findings: [
        {
          severity: "critical",
          field: "yaml",
          message: `YAML parse error: ${e instanceof Error ? e.message : "Unknown"}`,
          suggestion: "Fix YAML syntax.",
        },
      ],
    }
  }

  const jobs = (workflow.jobs as Record<string, unknown>) || {}

  for (const [jobName, jobConfig] of Object.entries(jobs)) {
    const job = jobConfig as Record<string, unknown>
    const steps = (job.steps as Record<string, unknown>[]) || []

    for (const step of steps) {
      const uses = step.uses as string | undefined

      if (!uses) continue

      // Check for pinned actions (not using @latest or branch names)
      if (
        uses.includes("@") &&
        !uses.match(/@[0-9a-f]{40}/) &&
        !uses.includes("@main") &&
        !uses.includes("@develop") &&
        !uses.includes("@master")
      ) {
        const match = uses.match(/^([^@]+)@([^@]+)/)
        if (match && !/^v\d+\.\d+\.\d+/.test(match[2])) {
          score -= 5
          findings.push({
            severity: "warn",
            field: `jobs.${jobName}.steps[].uses`,
            message: `Action not pinned to commit or semver tag: ${uses}`,
            suggestion: `Use exact commit hash: ${match[1]}@<commit-sha> or semver: ${match[1]}@v1.2.3`,
          })
        }
      } else if (!uses.includes("@")) {
        score -= 10
        findings.push({
          severity: "critical",
          field: `jobs.${jobName}.steps[].uses`,
          message: `Action not pinned: ${uses}`,
          suggestion: "Always pin actions to a commit SHA or semver tag, never to branches.",
        })
      }

      // Check for secrets in step outputs
      const with_ = step.with as Record<string, unknown>
      if (with_) {
        for (const [key, value] of Object.entries(with_)) {
          if (typeof value === "string" && /secret|password|token|key|api/i.test(value)) {
            if (!value.includes("${{ secrets")) {
              score -= 15
              findings.push({
                severity: "critical",
                field: `jobs.${jobName}.steps[].with.${key}`,
                message: "Potential hardcoded secret detected",
                suggestion: "Use ${{ secrets.SECRET_NAME }} instead of hardcoding.",
              })
            }
          }
        }
      }
    }

    // Check for privileged containers
    const container = job["container"] as Record<string, unknown> | undefined
    if (container?.options && typeof container.options === "string" && container.options.includes("--privileged")) {
      score -= 20
      findings.push({
        severity: "critical",
        field: `jobs.${jobName}.container.options`,
        message: "Privileged mode detected",
        suggestion: "Avoid --privileged. Use granular capabilities if needed.",
      })
    }

    // Check for self-hosted runners
    const runsOn = job["runs-on"]
    if (typeof runsOn === "string" && (runsOn.includes("self-hosted") || runsOn.includes("ubuntu-latest"))) {
      if (runsOn.includes("self-hosted")) {
        findings.push({
          severity: "warn",
          field: `jobs.${jobName}.runs-on`,
          message: "Using self-hosted runner",
          suggestion: "Self-hosted runners need strong security. Ensure ephemeral runners are deleted after use.",
        })
      }
    }

    // Check for artifact retention
    const artifactRetention = job["retention-days"] as number | undefined
    if (!artifactRetention || artifactRetention > 30) {
      findings.push({
        severity: "info",
        field: `jobs.${jobName}.retention-days`,
        message: `Artifact retention is ${artifactRetention || "default (90 days)"}`,
        suggestion: "Consider lower retention (e.g., 5-14 days) to reduce storage and exposure.",
      })
    }

    // Check for OIDC token usage
    if (!JSON.stringify(job).includes("id-token")) {
      findings.push({
        severity: "info",
        field: `jobs.${jobName}`,
        message: "Not using OIDC tokens for AWS/cloud auth",
        suggestion: 'Consider: permissions: { id-token: write } with aws-actions/configure-aws-credentials@v2',
      })
    }
  }

  // Check overall permissions
  const permissions = workflow.permissions as Record<string, unknown> | string | undefined
  if (!permissions) {
    score -= 10
    findings.push({
      severity: "warn",
      field: "permissions",
      message: "No explicit permissions set",
      suggestion: "Add permissions: { contents: read, id-token: write } to limit token scope.",
    })
  }

  if (score < 0) score = 0

  return { score, findings }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { workflow } = body as { workflow?: string }

    if (!workflow || typeof workflow !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'workflow' parameter." }, { status: 400 })
    }

    const { score, findings } = analyzeActions(workflow)
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
