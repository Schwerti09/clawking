"use client"

import { useState } from "react"
import { trackEvent } from "@/lib/analytics"
import { COUPON_SESSION_KEY } from "@/components/marketing/CouponBanner"
import {
  mapAutopilotPlanToCheckoutProduct,
  suggestAutopilotPlan,
  type UpgradeSignals,
} from "@/lib/autopilot-offering"
import { markCheckoutError, markCheckoutRedirect, markCheckoutStart } from "@/lib/retention-client"

export default function BuyButton({
  product,
  label,
  className,
  style,
  analyticsSource,
  annual,
  autoRecommend,
  upgradeSignals,
}: {
  product: "daypass" | "pro" | "team" | "msp"
  label: string
  className?: string
  style?: React.CSSProperties
  analyticsSource?: string
  annual?: boolean
  autoRecommend?: boolean
  upgradeSignals?: UpgradeSignals
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retries, setRetries] = useState(0)

  async function go() {
    const recommendedPlan = autoRecommend && upgradeSignals
      ? suggestAutopilotPlan(upgradeSignals)
      : undefined
    const resolvedProduct = recommendedPlan
      ? mapAutopilotPlanToCheckoutProduct(recommendedPlan)
      : product

    const normalizedSignals = upgradeSignals
      ? {
          workspaces: Math.max(1, Math.min(999, Math.floor(upgradeSignals.workspaces))),
          needsApiExports: !!upgradeSignals.needsApiExports,
          needsPolicyControls: !!upgradeSignals.needsPolicyControls,
        }
      : undefined

    trackEvent("pricing_click", {
      product: resolvedProduct,
      source: analyticsSource ?? "buy_button",
      annual: !!annual,
      recommended_plan: recommendedPlan ?? null,
      upgrade_signals: normalizedSignals ? JSON.stringify(normalizedSignals) : null,
    })
    trackEvent("checkout_start", {
      source: analyticsSource ?? "buy_button",
      product: resolvedProduct,
      annual: !!annual,
      recommended_plan: recommendedPlan ?? null,
      upgrade_signals: normalizedSignals ? JSON.stringify(normalizedSignals) : null,
    })
    markCheckoutStart()
    setError(null)
    setLoading(true)
    const coupon = typeof window !== "undefined"
      ? (sessionStorage.getItem(COUPON_SESSION_KEY) ?? undefined)
      : undefined

    const maxRetries = 1
    let attempt = 0

    while (attempt <= maxRetries) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)

        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: resolvedProduct,
            annual: !!annual,
            coupon_code: coupon ?? undefined,
            recommended_plan: recommendedPlan ?? undefined,
            upgrade_signals: normalizedSignals,
          }),
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        let data: unknown = null
        try {
          const text = await res.text()
          data = JSON.parse(text)
        } catch {
          setError("Checkout antwortet nicht als JSON. Bitte versuche es später erneut.")
          return
        }

        const dataObj = (data && typeof data === "object" ? (data as { error?: unknown; url?: unknown }) : {})

        if (!res.ok) {
          const errMsg = typeof dataObj.error === "string" ? dataObj.error : `Checkout-Fehler (${res.status})`
          if (res.status >= 500 && attempt < maxRetries) {
            attempt++
            await new Promise(r => setTimeout(r, 1000))
            continue
          }
          setError(errMsg)
          trackEvent("checkout_error", {
            source: analyticsSource ?? "buy_button",
            product: resolvedProduct,
            error: errMsg,
          })
          markCheckoutError()
          return
        }

        if (typeof dataObj.url !== "string" || !dataObj.url) {
          setError("Keine Checkout-URL erhalten. Bitte kontaktiere Support.")
          return
        }

        trackEvent("checkout_redirect", {
          source: analyticsSource ?? "buy_button",
          product: resolvedProduct,
          recommended_plan: recommendedPlan ?? null,
        })
        markCheckoutRedirect()
        setLoading(false)
        window.location.href = dataObj.url
        return
      } catch (err) {
        if (err instanceof TypeError && err.name === "AbortError") {
          setError("Anfrage hat zu lange gedauert. Bitte versuche es erneut.")
        } else if (attempt < maxRetries) {
          attempt++
          await new Promise(r => setTimeout(r, 1000))
          continue
        } else {
          setError("Checkout-Verbindung fehlgeschlagen. Bitte prüfe deine Internetverbindung.")
          trackEvent("checkout_error", {
            source: analyticsSource ?? "buy_button",
            product: resolvedProduct,
            error: "network_error",
          })
          markCheckoutError()
        }
        setLoading(false)
        return
      }
    }
  }

  return (
    <div>
      <button
        onClick={go}
        disabled={loading}
        className={
          className ||
          "px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 disabled:opacity-60"
        }
        style={style}
      >
        {loading ? "…" : label}
      </button>
      {error && (
        <div className="mt-2 p-3 rounded-lg bg-red-900/20 border border-red-700/40 text-sm text-red-300">
          {error}
        </div>
      )}
    </div>
  )
}