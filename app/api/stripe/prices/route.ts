import { NextResponse } from "next/server"
import { isStripeActive, apiUnavailableResponse } from "@/lib/api-guard"
import { LOOKUP_KEYS } from "@/lib/stripe-pricing"

export const dynamic = "force-dynamic"

/**
 * GET /api/stripe/prices
 *
 * Returns pricing information using stable lookup_keys (v2 unified API).
 * Each price is identified by its lookup_key for stable identification across
 * price rotations and API key changes.
 *
 * Lookup keys follow format: clawguru_{product}_{interval}
 */
export async function GET() {
  if (!isStripeActive()) return apiUnavailableResponse()

  return NextResponse.json({
    daypass: {
      lookupKey: LOOKUP_KEYS.daypass,
      amount: 900,
      currency: "eur",
      interval: "one_time",
    },
    pro_monthly: {
      lookupKey: LOOKUP_KEYS.pro_monthly,
      amount: 9900,
      currency: "eur",
      interval: "month",
    },
    pro_annual: {
      lookupKey: LOOKUP_KEYS.pro_annual,
      amount: 95040,
      currency: "eur",
      interval: "year",
    },
    team_monthly: {
      lookupKey: LOOKUP_KEYS.team_monthly,
      amount: 24900,
      currency: "eur",
      interval: "month",
    },
    team_annual: {
      lookupKey: LOOKUP_KEYS.team_annual,
      amount: 239040,
      currency: "eur",
      interval: "year",
    },
    enterprise: {
      lookupKey: LOOKUP_KEYS.team_monthly,
      amount: null,
      currency: "eur",
      interval: "custom",
    },
  })
}
