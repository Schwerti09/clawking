import {
  getProductIdForLookupKey,
  planFromPriceId,
  planFromSubscription,
  resolveCheckoutPriceWithOptions,
} from "@/lib/stripe-pricing"

const TRACKED_ENV_VARS = [
  "STRIPE_PRICE_DAYPASS",
  "STRIPE_PRICE_STARTER",
  "STRIPE_PRICE_STARTER_ANNUAL",
  "STRIPE_PRICE_PRO",
  "STRIPE_PRICE_PRO_MONTHLY",
  "STRIPE_PRICE_PRO_ANNUAL",
  "STRIPE_PRICE_PRO_YEARLY",
  "STRIPE_PRICE_TEAM",
  "STRIPE_PRICE_TEAM_ANNUAL",
  "STRIPE_PRICE_ENTERPRISE",
  "STRIPE_PRICE_SCALE",
  "STRIPE_PRICE_SCALE_ANNUAL",
  "STRIPE_PRICE_MSP",
  "STRIPE_PRICE_MSP_ANNUAL",
  // product IDs used for price auto-creation
  "STRIPE_PRODUCT_DAYPASS",
  "STRIPE_PRODUCT_STARTER",
  "STRIPE_PRODUCT_PRO",
  "STRIPE_PRODUCT_TEAM",
  "STRIPE_PRODUCT_MSP",
] as const

const SAVED_ENV: Record<string, string | undefined> = {}

function resetEnv() {
  for (const name of TRACKED_ENV_VARS) {
    delete process.env[name]
  }
}

beforeAll(() => {
  for (const name of TRACKED_ENV_VARS) {
    SAVED_ENV[name] = process.env[name]
  }
})

afterAll(() => {
  for (const name of TRACKED_ENV_VARS) {
    if (SAVED_ENV[name] === undefined) delete process.env[name]
    else process.env[name] = SAVED_ENV[name]
  }
})

beforeEach(() => {
  resetEnv()
})

describe("stripe-pricing resolver", () => {
  it("uses direct STRIPE_PRICE_DAYPASS first", async () => {
    process.env.STRIPE_PRICE_DAYPASS = "price_daypass_direct"
    await expect(
      resolveCheckoutPriceWithOptions("daypass", false, { allowCreate: false, allowLookup: false })
    ).resolves.toBe("price_daypass_direct")
  })

  it("resolves starter from STRIPE_PRICE_STARTER", async () => {
    process.env.STRIPE_PRICE_STARTER = "price_starter_direct"
    await expect(
      resolveCheckoutPriceWithOptions("starter", false, { allowCreate: false, allowLookup: false })
    ).resolves.toBe("price_starter_direct")
  })

  it("does not fall back starter to pro env price", async () => {
    process.env.STRIPE_PRICE_PRO = "price_pro_fallback"
    await expect(
      resolveCheckoutPriceWithOptions("starter", false, { allowCreate: false, allowLookup: false })
    ).rejects.toThrow("No checkout price resolvable for product=starter")
  })

  it("falls back scale to enterprise/team env prices", async () => {
    process.env.STRIPE_PRICE_ENTERPRISE = "price_enterprise_fallback"
    await expect(
      resolveCheckoutPriceWithOptions("scale", false, { allowCreate: false, allowLookup: false })
    ).resolves.toBe("price_enterprise_fallback")
  })

  it("throws clear error when no env price is resolvable and lookup is disabled", async () => {
    await expect(
      resolveCheckoutPriceWithOptions("msp", false, { allowCreate: false, allowLookup: false })
    ).rejects.toThrow("No checkout price resolvable for product=msp")
  })
})

describe("getProductIdForLookupKey fallback chain", () => {
  afterEach(() => {
    delete process.env.STRIPE_PRODUCT_STARTER
    delete process.env.STRIPE_PRODUCT_PRO
    delete process.env.STRIPE_PRODUCT_TEAM
    delete process.env.STRIPE_PRODUCT_MSP
    delete process.env.STRIPE_PRODUCT_DAYPASS
  })

  it("returns STRIPE_PRODUCT_STARTER when set for starter lookup key", () => {
    process.env.STRIPE_PRODUCT_STARTER = "prod_starter"
    process.env.STRIPE_PRODUCT_PRO = "prod_pro"
    expect(getProductIdForLookupKey("clawguru_starter_monthly")).toBe("prod_starter")
  })

  it("falls back to STRIPE_PRODUCT_PRO for starter when STRIPE_PRODUCT_STARTER is missing", () => {
    process.env.STRIPE_PRODUCT_PRO = "prod_pro_fallback"
    expect(getProductIdForLookupKey("clawguru_starter_monthly")).toBe("prod_pro_fallback")
    expect(getProductIdForLookupKey("clawguru_starter_annual")).toBe("prod_pro_fallback")
  })

  it("falls back to STRIPE_PRODUCT_TEAM for starter when both STARTER and PRO are missing", () => {
    process.env.STRIPE_PRODUCT_TEAM = "prod_team_fallback"
    expect(getProductIdForLookupKey("clawguru_starter_monthly")).toBe("prod_team_fallback")
  })

  it("throws with helpful message including expected amount when no product ID is available", () => {
    expect(() => getProductIdForLookupKey("clawguru_starter_monthly")).toThrow(
      "€29.00"
    )
    expect(() => getProductIdForLookupKey("clawguru_starter_monthly")).toThrow(
      "STRIPE_PRICE_STARTER=price_xxx"
    )
  })

  it("falls back to STRIPE_PRODUCT_TEAM for pro when STRIPE_PRODUCT_PRO is missing", () => {
    process.env.STRIPE_PRODUCT_TEAM = "prod_team"
    expect(getProductIdForLookupKey("clawguru_pro_monthly")).toBe("prod_team")
  })

  it("falls back to STRIPE_PRODUCT_PRO for team when STRIPE_PRODUCT_TEAM is missing", () => {
    process.env.STRIPE_PRODUCT_PRO = "prod_pro"
    expect(getProductIdForLookupKey("clawguru_team_monthly")).toBe("prod_pro")
  })

  it("falls back msp to team then pro product", () => {
    process.env.STRIPE_PRODUCT_PRO = "prod_pro"
    expect(getProductIdForLookupKey("clawguru_msp_monthly")).toBe("prod_pro")
    process.env.STRIPE_PRODUCT_TEAM = "prod_team"
    expect(getProductIdForLookupKey("clawguru_msp_monthly")).toBe("prod_team")
    process.env.STRIPE_PRODUCT_MSP = "prod_msp"
    expect(getProductIdForLookupKey("clawguru_msp_monthly")).toBe("prod_msp")
  })

  it("daypass uses only STRIPE_PRODUCT_DAYPASS (no fallback)", () => {
    process.env.STRIPE_PRODUCT_PRO = "prod_pro"
    expect(() => getProductIdForLookupKey("clawguru_daypass_onetime")).toThrow(
      "No STRIPE_PRODUCT_* env var found"
    )
    process.env.STRIPE_PRODUCT_DAYPASS = "prod_daypass"
    expect(getProductIdForLookupKey("clawguru_daypass_onetime")).toBe("prod_daypass")
  })
})

describe("stripe-pricing plan fallback", () => {
  it("maps explicit price id to daypass/team/pro", () => {
    process.env.STRIPE_PRICE_DAYPASS = "price_day"
    process.env.STRIPE_PRICE_TEAM = "price_team"
    expect(planFromPriceId("price_day")).toBe("daypass")
    expect(planFromPriceId("price_team")).toBe("team")
    expect(planFromPriceId("price_unknown")).toBe("pro")
  })

  it("planFromSubscription falls back to price-id mapping if lookup_key is missing", () => {
    process.env.STRIPE_PRICE_ENTERPRISE = "price_ent"
    const subscription = {
      items: {
        data: [
          {
            price: {
              id: "price_ent",
            },
          },
        ],
      },
    }
    expect(planFromSubscription(subscription)).toBe("team")
  })
})
