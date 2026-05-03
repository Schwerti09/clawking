import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.WEBHOOK_SHARED_SECRET || process.env.CRON_SECRET || ""
  if (!secret) return true

  const auth = req.headers.get("authorization") ?? ""
  const bearer = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : ""
  const headerToken = req.headers.get("x-webhook-secret")?.trim() ?? ""

  return bearer === secret || headerToken === secret
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, provider: "google-chat", error: "unauthorized" }, { status: 401 })
  }

  try {
    const ct = req.headers.get("content-type") || ""
    let payload: any = null
    if (ct.includes("application/json")) payload = await req.json()
    else if (ct.includes("application/x-www-form-urlencoded")) {
      const fd = await req.formData()
      payload = Object.fromEntries(fd.entries())
    } else {
      payload = await req.text()
    }
    return NextResponse.json({ ok: true, provider: "google-chat", received: Boolean(payload), ts: Date.now() }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ ok: false, provider: "google-chat", error: String(e) }, { status: 200 })
  }
}

export async function GET() {
  return new NextResponse("Webhook endpoint", { status: 200 })
}
