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
export type CheckoutProduct = "daypass" | "pro" | "team" | "msp" | "enterprise" | "starter" | "scale"

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

function normalizeLookupProduct(product: CheckoutProduct): "daypass" | "pro" | "team" | "starter" | "msp" {
  switch (product) {
    case "enterprise":
    case "scale":
      return "team"
    case "starter":
      return "starter"
    case "daypass":
    case "pro":
    case "team":
    case "msp":
      return product
  }
}

function envCandidates(product: CheckoutProduct, annual: boolean): string[] {
  switch (product) {
    case "daypass":
      return ["STRIPE_PRICE_DAYPASS"]
    case "starter":
      // Starter is a subscription-tier in consulting; prefer dedicated price id.
      // Fallback to PRO if only legacy env vars exist in an older deployment.
      return annual
        ? ["STRIPE_PRICE_STARTER_ANNUAL", "STRIPE_PRICE_PRO_ANNUAL", "STRIPE_PRICE_PRO_YEARLY"]
        : ["STRIPE_PRICE_STARTER", "STRIPE_PRICE_PRO", "STRIPE_PRICE_PRO_MONTHLY"]
    case "pro":
      return annual
        ? ["STRIPE_PRICE_PRO_ANNUAL", "STRIPE_PRICE_PRO_YEARLY", "STRIPE_PRICE_PRO"]
        : ["STRIPE_PRICE_PRO", "STRIPE_PRICE_PRO_MONTHLY"]
    case "team":
      return annual
        ? ["STRIPE_PRICE_TEAM_ANNUAL", "STRIPE_PRICE_TEAM_YEARLY", "STRIPE_PRICE_TEAM"]
        : ["STRIPE_PRICE_TEAM", "STRIPE_PRICE_TEAM_MONTHLY"]
    case "scale":
      return annual
        ? ["STRIPE_PRICE_SCALE_ANNUAL", "STRIPE_PRICE_ENTERPRISE_ANNUAL", "STRIPE_PRICE_TEAM_ANNUAL", "STRIPE_PRICE_TEAM"]
        : ["STRIPE_PRICE_SCALE", "STRIPE_PRICE_ENTERPRISE", "STRIPE_PRICE_TEAM"]
    case "enterprise":
      return ["STRIPE_PRICE_ENTERPRISE", "STRIPE_PRICE_TEAM"]
    case "msp":
      return annual
        ? ["STRIPE_PRICE_MSP_ANNUAL", "STRIPE_PRICE_MSP"]
        : ["STRIPE_PRICE_MSP"]
  }
}

export function resolvePriceFromEnv(product: CheckoutProduct, annual: boolean): string | null {
  for (const envName of envCandidates(product, annual)) {
    const value = process.env[envName]?.trim()
    if (value) return value
  }
  return null
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

async function findExistingPriceByLookupKey(lookupKey: LookupKey): Promise<string | null> {
  const stripe = getStripe()
  const existing = await stripe.prices.list({
    lookup_keys: [lookupKey],
    limit: 1,
  })
  return existing.data[0]?.id ?? null
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
  product: CheckoutProduct,
  annual: boolean
): Promise<string> {
  return resolveCheckoutPriceWithOptions(product, annual, { allowCreate: true, allowLookup: true })
}

export async function resolveCheckoutPriceWithOptions(
  product: CheckoutProduct,
  annual: boolean,
  options: { allowCreate: boolean; allowLookup?: boolean }
): Promise<string> {
  const envPrice = resolvePriceFromEnv(product, annual)
  if (envPrice) return envPrice

  const lookupProduct = normalizeLookupProduct(product)
  const lookupKey = getLookupKey(lookupProduct, annual)
  const allowLookup = options.allowLookup !== false
  if (allowLookup) {
    const existing = await findExistingPriceByLookupKey(lookupKey)
    if (existing) return existing
  }

  if (!options.allowCreate) {
    throw new Error(
      `No checkout price resolvable for product=${product}, annual=${annual}. ` +
        `Checked env vars: ${envCandidates(product, annual).join(", ")}. ` +
        `${allowLookup ? `Checked lookup_key: ${lookupKey}.` : "Lookup check disabled."}`
    )
  }

  try {
    return await getOrCreatePrice(lookupKey)
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    throw new Error(
      `Checkout price resolution failed for product=${product}, annual=${annual}. ` +
        `Checked env vars: ${envCandidates(product, annual).join(", ")}. ` +
        `Lookup/create failed for key=${lookupKey}: ${msg}`
    )
  }
}

/**
 * Derive an access plan from a Stripe subscription by reading price.lookup_key
 * This is used by both the webhook and dashboard to identify the plan tier
 * Supports all product types and handles annual/monthly variants transparently
 */
export function planFromSubscription(subscription: any): string {
  const price = subscription.items?.data?.[0]?.price
  const lookupKey = price?.lookup_key ?? ""
  const priceId = price?.id ?? ""

  // Map lookup_key to plan string
  if (lookupKey.includes("team")) return "team"
  if (lookupKey.includes("starter")) return "starter"
  if (lookupKey.includes("scale")) return "team"
  if (lookupKey.includes("msp")) return "msp"

  // Fallback: map by explicit env price ids when lookup_key is absent.
  const isTeamLike = isTeamLikePriceId(priceId)
  if (isTeamLike) return "team"

  const isStarterLike = isStarterLikePriceId(priceId)
  if (isStarterLike) return "starter"

  const isMsp = isMspPriceId(priceId)
  if (isMsp) return "msp"

  // Default: pro covers both pro_monthly and pro_annual
  return "pro"
}

function nonEmpty(values: Array<string | undefined>): string[] {
  return values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value) => value.length > 0)
}

function isTeamLikePriceId(priceId: string): boolean {
  return nonEmpty([
    process.env.STRIPE_PRICE_TEAM,
    process.env.STRIPE_PRICE_TEAM_ANNUAL,
    process.env.STRIPE_PRICE_ENTERPRISE,
    process.env.STRIPE_PRICE_SCALE,
    process.env.STRIPE_PRICE_SCALE_ANNUAL,
  ]).includes(priceId)
}

function isStarterLikePriceId(priceId: string): boolean {
  return nonEmpty([
    process.env.STRIPE_PRICE_STARTER,
    process.env.STRIPE_PRICE_STARTER_ANNUAL,
  ]).includes(priceId)
}

function isMspPriceId(priceId: string): boolean {
  return nonEmpty([
    process.env.STRIPE_PRICE_MSP,
    process.env.STRIPE_PRICE_MSP_ANNUAL,
  ]).includes(priceId)
}

export function planFromPriceId(priceId: string): "daypass" | "pro" | "team" {
  if (!priceId) return "pro"
  if (priceId === (process.env.STRIPE_PRICE_DAYPASS ?? "").trim()) return "daypass"
  if (isTeamLikePriceId(priceId) || isMspPriceId(priceId)) return "team"
  if (isStarterLikePriceId(priceId)) return "pro"
  return "pro"
}
