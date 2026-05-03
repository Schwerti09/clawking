import {
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

  it("falls back starter to STRIPE_PRICE_PRO when dedicated starter price is missing", async () => {
    process.env.STRIPE_PRICE_PRO = "price_pro_fallback"
    await expect(
      resolveCheckoutPriceWithOptions("starter", false, { allowCreate: false, allowLookup: false })
    ).resolves.toBe("price_pro_fallback")
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

