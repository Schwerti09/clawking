import { NextRequest, NextResponse } from 'next/server'
import { isAuthorizedBySharedSecret, isFeatureEnabled } from '@/lib/api-security'
import { runSecurityHeaderCheck } from '@/lib/security-check-core'

/**
 * GET /api/security-check?domain=<domain>&source=extension
 *
 * Called by the ClawBrowser extension (popup.js + background.js) to fetch
 * a real security score for the current tab's domain.  No auth required –
 * the result is purely a public HTTP-header heuristic (nothing secret is
 * revealed).  Rate-limiting is handled by Next.js edge middleware.
 */
export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('domain') || ''
  const d = domain.trim()

  if (!d) {
    return NextResponse.json({ error: 'Missing domain parameter' }, { status: 400 })
  }

  try {
    const result = await runSecurityHeaderCheck(d)
    return NextResponse.json(result, {
      headers: {
        // 5-minute public cache – avoids hammering the origin for every tab switch.
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
        // Allow the browser extension (and any browser) to read this response.
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Extension security check error:', error)
    return NextResponse.json(
      { error: 'Check failed', score: null },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const enforceRealMode = isFeatureEnabled('SECURITY_CHECK_REAL_ENABLED')
  if (
    enforceRealMode &&
    !isAuthorizedBySharedSecret(req, 'SECURITY_CHECK_SECRET') &&
    !isAuthorizedBySharedSecret(req, 'CRON_SECRET')
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!enforceRealMode) {
      // Deploy-safe default: keep legacy bypass while flag is disabled.
      return NextResponse.json({
        ok: true,
        message: 'Security check bypassed for deployment',
        status: 'safe',
        enforcementEnabled: false,
      })
    }

    const { target } = (await req.json().catch(() => ({}))) as { target?: string }
    const t = (target || '').trim()
    if (!t) return NextResponse.json({ error: 'Missing target' }, { status: 400 })

    const result = await runSecurityHeaderCheck(t)
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'private, max-age=0, no-store' }
    })
  } catch (error) {
    console.error('Security check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}