import { AUTOPILOT_PLANS, mapAutopilotPlanToCheckoutProduct } from "@/lib/autopilot-offering"
import { DAY_PASS_EUR } from "@/lib/pricing"
import { checkoutPriceAmountCents, discountedAnnualAmountCents } from "@/lib/stripe-pricing"

describe("pricing checkout consistency", () => {
  test("monthly public plan prices match checkout price metadata", () => {
    expect(checkoutPriceAmountCents("daypass", false)).toBe(DAY_PASS_EUR * 100)
    expect(checkoutPriceAmountCents("starter", false)).toBe(AUTOPILOT_PLANS.starter.monthlyPriceEur * 100)
    expect(checkoutPriceAmountCents("pro", false)).toBe(AUTOPILOT_PLANS.pro.monthlyPriceEur * 100)
    expect(checkoutPriceAmountCents("scale", false)).toBe(AUTOPILOT_PLANS.scale.monthlyPriceEur * 100)
  })

  test("annual public plan prices keep the 20% discount model", () => {
    expect(checkoutPriceAmountCents("starter", true)).toBe(
      discountedAnnualAmountCents(AUTOPILOT_PLANS.starter.monthlyPriceEur)
    )
    expect(checkoutPriceAmountCents("pro", true)).toBe(
      discountedAnnualAmountCents(AUTOPILOT_PLANS.pro.monthlyPriceEur)
    )
    expect(checkoutPriceAmountCents("scale", true)).toBe(
      discountedAnnualAmountCents(AUTOPILOT_PLANS.scale.monthlyPriceEur)
    )
  })

  test("scale card mapping resolves to scale checkout product", () => {
    expect(mapAutopilotPlanToCheckoutProduct("scale")).toBe("scale")
  })
})
