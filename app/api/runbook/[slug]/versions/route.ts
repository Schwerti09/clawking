/**
 * GET  /api/runbook/[slug]/versions  – list all versions + forks
 * POST /api/runbook/[slug]/versions  – create a fork (or Darwinian evolve)
 *
 * Auth: user session cookie (cg_user) required for POST.
 */

import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken, USER_SESSION_COOKIE } from "@/lib/auth"
import { getVersions, createFork } from "@/lib/runbook-versions"
import { withApiHandler } from "@/lib/ops/with-api-handler"

export const dynamic = "force-dynamic"

export const GET = withApiHandler(async (
  _req: NextRequest,
  ctx
) => {
  const { slug } = ctx!.params!
  const { getRunbook } = await import("@/lib/pseo")
  const runbook = getRunbook(slug)
  if (!runbook) {
    return NextResponse.json({ error: "Runbook not found" }, { status: 404 })
  }
  const versions = getVersions(runbook)
  return NextResponse.json({ slug, versions })
})

export const POST = withApiHandler(async (
  req: NextRequest,
  ctx
) => {
  const { slug } = ctx!.params!
  const { getRunbook } = await import("@/lib/pseo")

  // Auth check
  const jar = await cookies()
  const token = jar.get(USER_SESSION_COOKIE)?.value
  const session = token ? verifySessionToken(token) : null
  if (!session) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const runbook = getRunbook(slug)
  if (!runbook) {
    return NextResponse.json({ error: "Runbook not found" }, { status: 404 })
  }

  const body = await req.json().catch(() => ({})) as {
    title?: string
    changes?: string
    evolve?: boolean
  }

  const fork = createFork(runbook, {
    userEmail: session.email,
    title: body.title,
    changes: body.changes,
    evolve: body.evolve === true,
  })

  return NextResponse.json({ fork }, { status: 201 })
})
