import { NextRequest, NextResponse } from "next/server"
import { getRequestId } from "./request-id"
import { logTelemetry } from "./telemetry"

type RouteHandler = (
  req: NextRequest,
  ctx?: { params?: Record<string, string> }
) => Promise<NextResponse>

export function withApiHandler(fn: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    const requestId = getRequestId(req.headers)
    try {
      return await fn(req, ctx)
    } catch (err) {
      logTelemetry("api.error", {
        requestId,
        path: req.nextUrl.pathname,
        method: req.method,
        error: err instanceof Error ? err.message : String(err),
      })
      return NextResponse.json(
        { error: "Internal server error", requestId },
        { status: 500 }
      )
    }
  }
}
