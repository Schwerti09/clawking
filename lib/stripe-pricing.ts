import { getStripe } from "@/lib/stripe"

/**
 * Stable lookup_key format: clawguru_{product}_{interval}
 * Used for identifying prices across Stripe price rotation
 */
export const LOOKUP_KEYS = {
  daypass: "clawguru_daypass_onetime",
  pro_monthly: "clawguru_pro_monthly",
  pro_annual: "clawguru_pro_annual",
  starter_monthly: "clawguru_starter_monthly",
  starter_annual: "clawguru_starter_annual",
  team_monthly: "clawguru_team_monthly",
  team_annual: "clawguru_team_annual",
  msp_monthly: "clawguru_msp_monthly",
} as const

type LookupKey = (typeof LOOKUP_KEYS)[keyof typeof LOOKUP_KEYS]

/**
 * Price metadata: amount in cents (EUR), currency, and interval
 * Amounts match lib/autopilot-offering.ts with 20% annual discount
 */
const PRICE_METADATA: Record<
  LookupKey,
  { amount_cents: number; currency: "eur"; type: "one_time" | "recurring"; interval?: string }
> = {
  clawguru_daypass_onetime: {
    amount_cents: 900,
    currency: "eur",
    type: "one_time",
  },
  clawguru_pro_monthly: {
    amount_cents: 9900,
    currency: "eur",
    type: "recurring",
    interval: "month",
  },
  clawguru_pro_annual: {
    amount_cents: 95040, // 99 * 0.8 * 12 = 950.4 → 95040 cents
    currency: "eur",
    type: "recurring",
    interval: "year",
  },
  clawguru_starter_monthly: {
    amount_cents: 2900,
    currency: "eur",
    type: "recurring",
    interval: "month",
  },
  clawguru_starter_annual: {
    amount_cents: 27840, // 29 * 0.8 * 12 = 278.4 → 27840 cents
    currency: "eur",
    type: "recurring",
    interval: "year",
  },
  clawguru_team_monthly: {
    amount_cents: 24900,
    currency: "eur",
    type: "recurring",
    interval: "month",
  },
  clawguru_team_annual: {
    amount_cents: 239040, // 249 * 0.8 * 12 = 2387.2 → 239040 cents
    currency: "eur",
    type: "recurring",
    interval: "year",
  },
  clawguru_msp_monthly: {
    amount_cents: 49900,
    currency: "eur",
    type: "recurring",
    interval: "month",
  },
}

/**
 * Map of (product, annual) → lookup_key
 */
export function getLookupKey(
  product: "daypass" | "pro" | "team" | "starter" | "msp",
  annual: boolean
): LookupKey {
  if (product === "daypass") return LOOKUP_KEYS.daypass
  if (product === "starter")
    return annual ? LOOKUP_KEYS.starter_annual : LOOKUP_KEYS.starter_monthly
  if (product === "pro")
    return annual ? LOOKUP_KEYS.pro_annual : LOOKUP_KEYS.pro_monthly
  if (product === "team")
    return annual ? LOOKUP_KEYS.team_annual : LOOKUP_KEYS.team_monthly
  if (product === "msp") return LOOKUP_KEYS.msp_monthly
  throw new Error(`Unknown product: ${product}`)
}

/**
 * Retrieve or create a Stripe Price with a lookup_key
 * Fetches existing price by lookup_key; if not found, creates a new one
 */
export async function getOrCreatePrice(lookupKey: LookupKey): Promise<string> {
  const stripe = getStripe()
  const meta = PRICE_METADATA[lookupKey]

  if (!meta) {
    throw new Error(`No price metadata for lookup_key: ${lookupKey}`)
  }

  // Check if price already exists
  const existing = await stripe.prices.list({
    lookup_keys: [lookupKey],
    limit: 1,
  })

  if (existing.data.length > 0) {
    return existing.data[0].id
  }

  // Price doesn't exist; create it
  const productId = getProductIdForLookupKey(lookupKey)

  const createParams: Parameters<typeof stripe.prices.create>[0] = {
    currency: meta.currency,
    lookup_key: lookupKey,
    product: productId,
    transfer_lookup_key: true,
  }

  if (meta.type === "one_time") {
    createParams.unit_amount = meta.amount_cents
  } else if (meta.type === "recurring" && meta.interval) {
    createParams.recurring = { interval: meta.interval as "month" | "year" }
    createParams.unit_amount = meta.amount_cents
  }

  const newPrice = await stripe.prices.create(createParams)
  return newPrice.id
}

/**
 * Resolve product ID from env vars, or create a product inline
 * Used when creating prices if the product doesn't exist yet
 */
function getProductIdForLookupKey(lookupKey: LookupKey): string {
  let productId: string | undefined

  if (lookupKey.includes("daypass")) {
    productId = process.env.STRIPE_PRODUCT_DAYPASS
  } else if (lookupKey.includes("team")) {
    productId = process.env.STRIPE_PRODUCT_TEAM
  } else if (lookupKey.includes("pro")) {
    productId = process.env.STRIPE_PRODUCT_PRO
  } else if (lookupKey.includes("starter")) {
    productId = process.env.STRIPE_PRODUCT_STARTER
  } else if (lookupKey.includes("msp")) {
    productId = process.env.STRIPE_PRODUCT_MSP
  }

  if (!productId) {
    throw new Error(
      `No STRIPE_PRODUCT_* env var found for lookup_key: ${lookupKey}. ` +
        `Please set STRIPE_PRODUCT_DAYPASS, STRIPE_PRODUCT_PRO, STRIPE_PRODUCT_TEAM, ` +
        `STRIPE_PRODUCT_STARTER, or STRIPE_PRODUCT_MSP.`
    )
  }

  return productId
}

/**
 * Resolve a checkout price ID given product and annual flag
 * Called from app/api/stripe/checkout/route.ts
 */
export async function resolveCheckoutPrice(
  product: "daypass" | "pro" | "team" | "msp" | "enterprise",
  annual: boolean
): Promise<string> {
  // Map enterprise to team (fallback)
  const mappedProduct =
    product === "enterprise"
      ? ("team" as const)
      : (product as "daypass" | "pro" | "team" | "starter" | "msp")

  const lookupKey = getLookupKey(mappedProduct, annual)
  return getOrCreatePrice(lookupKey)
}

/**
 * Derive an access plan from a Stripe subscription by reading price.lookup_key
 * This is used by both the webhook and dashboard to identify the plan tier
 * Supports all product types and handles annual/monthly variants transparently
 */
export function planFromSubscription(subscription: any): string {
  const lookupKey = subscription.items?.data?.[0]?.price?.lookup_key ?? ""

  // Map lookup_key to plan string
  if (lookupKey.includes("team")) return "team"
  if (lookupKey.includes("starter")) return "starter"
  if (lookupKey.includes("scale")) return "team"
  if (lookupKey.includes("msp")) return "msp"

  // Default: pro covers both pro_monthly and pro_annual
  return "pro"
}
