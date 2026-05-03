// K8s Policy Auditor backend — validates Kubernetes manifests against security policies

import { NextResponse } from "next/server"
import * as YAML from "js-yaml"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface Finding {
  resource: string
  kind: string
  severity: "info" | "warn" | "critical"
  field: string
  message: string
  suggestion: string
}

interface Result {
  resourceCount: number
  findings: Finding[]
  summary: {
    critical: number
    warnings: number
    info: number
  }
}

function auditManifest(yamlContent: string): Finding[] {
  const findings: Finding[] = []

  let documents: unknown[] = []
  try {
    documents = (YAML.loadAll(yamlContent) as unknown[]).filter((doc) => doc && typeof doc === "object")
  } catch (e) {
    return [
      {
        resource: "unknown",
        kind: "ParseError",
        severity: "critical",
        field: "yaml",
        message: `YAML parse error: ${e instanceof Error ? e.message : "Unknown error"}`,
        suggestion: "Fix YAML syntax.",
      },
    ]
  }

  for (const doc of documents) {
    const resource = doc as Record<string, unknown>
    const kind = resource.kind as string | undefined
    const metadata = resource.metadata as Record<string, unknown> | undefined
    const name = metadata?.name as string | undefined
    const spec = resource.spec as Record<string, unknown> | undefined

    if (!kind || !spec) continue

    const resourceName = `${kind}/${name || "unknown"}`

    // Common security checks
    if (kind === "Pod" || kind === "Deployment" || kind === "StatefulSet") {
      const containers = (spec.containers as Record<string, unknown>[] | undefined) || []

      for (const container of containers) {
        const containerName = container.name || "unnamed"
        const image = container.image as string | undefined

        // Check image
        if (!image) {
          findings.push({
            resource: resourceName,
            kind,
            severity: "critical",
            field: `containers[${containerName}].image`,
            message: "Missing container image.",
            suggestion: "Specify a container image.",
          })
        } else if (!image.includes(":")) {
          findings.push({
            resource: resourceName,
            kind,
            severity: "critical",
            field: `containers[${containerName}].image`,
            message: `Image ${image} missing tag or digest.`,
            suggestion: "Always specify a version tag or digest, never 'latest'.",
          })
        }

        // Check image pull policy
        const imagePullPolicy = container.imagePullPolicy as string | undefined
        if (!imagePullPolicy || imagePullPolicy === "Always") {
          findings.push({
            resource: resourceName,
            kind,
            severity: "info",
            field: `containers[${containerName}].imagePullPolicy`,
            message: "Image pull policy not restricted.",
            suggestion: "Set imagePullPolicy: IfNotPresent for consistency.",
          })
        }

        // Check security context
        const securityContext = container.securityContext as Record<string, unknown> | undefined

        if (!securityContext?.runAsNonRoot) {
          findings.push({
            resource: resourceName,
            kind,
            severity: "critical",
            field: `containers[${containerName}].securityContext.runAsNonRoot`,
            message: "Container may run as root.",
            suggestion: "Set securityContext.runAsNonRoot: true",
          })
        }

        if (!securityContext?.readOnlyRootFilesystem) {
          findings.push({
            resource: resourceName,
            kind,
            severity: "warn",
            field: `containers[${containerName}].securityContext.readOnlyRootFilesystem`,
            message: "Root filesystem is writable.",
            suggestion: "Set securityContext.readOnlyRootFilesystem: true if possible.",
          })
        }

        // Check capabilities
        const capabilities = securityContext?.capabilities as Record<string, unknown> | undefined
        if (!capabilities?.drop || !(capabilities.drop as unknown[]).includes("ALL")) {
          findings.push({
            resource: resourceName,
            kind,
            severity: "warn",
            field: `containers[${containerName}].securityContext.capabilities.drop`,
            message: "Not dropping all Linux capabilities.",
            suggestion: "Set securityContext.capabilities.drop: [ALL]",
          })
        }

        // Check resource limits
        const resources = container.resources as Record<string, unknown> | undefined
        if (!resources?.limits) {
          findings.push({
            resource: resourceName,
            kind,
            severity: "warn",
            field: `containers[${containerName}].resources.limits`,
            message: "No resource limits defined.",
            suggestion: "Define resources.limits.memory and resources.limits.cpu",
          })
        }

        if (!resources?.requests) {
          findings.push({
            resource: resourceName,
            kind,
            severity: "warn",
            field: `containers[${containerName}].resources.requests`,
            message: "No resource requests defined.",
            suggestion: "Define resources.requests.memory and resources.requests.cpu",
          })
        }
      }
    }

    // RBAC checks
    if (kind === "RoleBinding" || kind === "ClusterRoleBinding") {
      const roleRef = spec.roleRef as Record<string, unknown> | undefined
      if (roleRef?.name === "cluster-admin") {
        findings.push({
          resource: resourceName,
          kind,
          severity: "critical",
          field: "roleRef.name",
          message: "Binding to cluster-admin role.",
          suggestion: "Use a more restrictive role with minimal necessary permissions.",
        })
      }
    }

    // Network policy checks
    if (kind === "Deployment" || kind === "Pod") {
      const podSpec = kind === "Deployment" ? (spec.template as Record<string, unknown> | undefined)?.spec : spec
      const labels = metadata?.labels as Record<string, unknown> | undefined

      if (!labels || Object.keys(labels).length === 0) {
        findings.push({
          resource: resourceName,
          kind,
          severity: "warn",
          field: "metadata.labels",
          message: "No labels defined. Cannot be targeted by network policies.",
          suggestion: "Add meaningful labels for network policy selection.",
        })
      }
    }
  }

  return findings
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { manifest } = body as { manifest?: string }

    if (!manifest || typeof manifest !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'manifest' parameter." }, { status: 400 })
    }

    const findings = auditManifest(manifest)
    const resourceCount = (manifest.match(/^kind:/gm) || []).length

    const summary = {
      critical: findings.filter((f) => f.severity === "critical").length,
      warnings: findings.filter((f) => f.severity === "warn").length,
      info: findings.filter((f) => f.severity === "info").length,
    }

    return NextResponse.json({
      resourceCount,
      findings,
      summary,
    } as Result)
  } catch (e) {
    return NextResponse.json(
      { error: `Server error: ${e instanceof Error ? e.message : "Unknown"}` },
      { status: 500 }
    )
  }
}
