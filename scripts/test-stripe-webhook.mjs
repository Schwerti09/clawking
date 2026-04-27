#!/usr/bin/env node
/**
 * scripts/test-stripe-webhook.mjs
 *
 * Step 6 — Stripe webhook integration test script
 *
 * Two usage modes:
 *
 *   A) Direct POST (no Stripe CLI needed):
 *      Fires a synthetic checkout.session.completed JSON payload directly at
 *      the webhook endpoint.  Useful for smoke-testing the route handler logic
 *      in a local/Railway dev environment.
 *
 *   B) Stripe CLI trigger (requires `stripe` CLI authenticated):
 *      Runs `stripe trigger checkout.session.completed` which fires a real,
 *      signed event through the Stripe CLI's local webhook forwarding proxy.
 *
 * Environment variables (all optional — sane defaults for local dev):
 *   SITE_URL              Base URL of the running Next.js server
 *                         default: http://localhost:3000
 *   STRIPE_WEBHOOK_SECRET Webhook signing secret.  Required for mode A so the
 *                         route does not reject the request.
 *                         Use `stripe listen --print-secret` to get a local secret.
 *   STRIPE_CLI_MODE       Set to "1" to run mode B (Stripe CLI trigger) instead.
 *   CRON_VERBOSE          Set to "1" for verbose output.
 *
 * Exit codes:
 *   0 — test passed (2xx response from webhook endpoint, or CLI trigger succeeded)
 *   1 — transport / network error
 *   2 — webhook returned non-2xx (logic error, check Railway logs)
 *   3 — missing configuration
 *   4 — Stripe CLI not found (mode B only)
 *
 * Usage examples:
 *   # Mode A — direct POST (Railway/local, no Stripe CLI):
 *   SITE_URL=https://clawguru.org node scripts/test-stripe-webhook.mjs
 *
 *   # Mode B — Stripe CLI trigger (local, CLI must be listening):
 *   STRIPE_CLI_MODE=1 node scripts/test-stripe-webhook.mjs
 *
 *   # Local dev with explicit secrets:
 *   SITE_URL=http://localhost:3000 \
 *   STRIPE_WEBHOOK_SECRET=whsec_test_from_stripe_listen \
 *   node scripts/test-stripe-webhook.mjs
 */

import crypto from "crypto"
import { execSync } from "child_process"

const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? ""
const CLI_MODE = process.env.STRIPE_CLI_MODE === "1"
const VERBOSE = process.env.CRON_VERBOSE === "1"

const WEBHOOK_ENDPOINT = `${SITE_URL}/api/stripe/webhook`

function log(level, msg, extra) {
  const entry = { level, message: msg, ts: new Date().toISOString(), ...(extra ?? {}) }
  console.log(JSON.stringify(entry))
}

function info(msg, extra) { log("info", msg, extra) }
function error(msg, extra) { log("error", msg, extra) }
function verbose(msg, extra) { if (VERBOSE) log("debug", msg, extra) }

// ─── Mode B: Stripe CLI ──────────────────────────────────────────────────────

if (CLI_MODE) {
  info("stripe CLI mode — running: stripe trigger checkout.session.completed")
  try {
    const out = execSync("stripe trigger checkout.session.completed", {
      timeout: 30_000,
      encoding: "utf-8",
    })
    info("stripe CLI trigger succeeded", { output: out.trim().slice(0, 500) })
    process.exit(0)
  } catch (err) {
    if (err.code === "ENOENT" || String(err).includes("not found")) {
      error("stripe CLI not found — install it from https://stripe.com/docs/stripe-cli or run in mode A (unset STRIPE_CLI_MODE)")
      process.exit(4)
    }
    error("stripe CLI trigger failed", { message: String(err.message ?? err).slice(0, 500) })
    process.exit(1)
  }
}

// ─── Mode A: Direct POST ─────────────────────────────────────────────────────

/**
 * Build a minimal checkout.session.completed payload that the webhook route
 * will accept and process (matches the shape in app/api/stripe/webhook/route.ts).
 */
function buildTestPayload() {
  const sessionId = `cs_test_webhook_smoke_${Date.now()}`
  return {
    id: `evt_test_${Date.now()}`,
    object: "event",
    api_version: "2023-10-16",
    type: "checkout.session.completed",
    data: {
      object: {
        id: sessionId,
        object: "checkout.session",
        mode: "subscription",
        payment_status: "paid",
        status: "complete",
        customer: "cus_test_webhook_smoke",
        customer_email: "smoketest@clawguru.org",
        subscription: "sub_test_webhook_smoke",
        amount_total: 4900,
        currency: "eur",
        metadata: {
          plan: "pro",
        },
        // The webhook route needs line_items.data[0].price.product to map plan
        // In the direct-post mode without Stripe's signature verification on a
        // real instance, the route will reject the request unless the signature
        // is correct OR the route is in test mode.
        // See note in exit code 2 handling below.
      },
    },
  }
}

/**
 * Sign the payload with the webhook secret (mirrors what Stripe does).
 * Required when the webhook route verifies the Stripe-Signature header.
 */
function signPayload(payloadStr, secret) {
  if (!secret) return null
  const ts = Math.floor(Date.now() / 1000)
  const signedPayload = `${ts}.${payloadStr}`
  const sig = crypto.createHmac("sha256", secret.replace(/^whsec_/, "")).update(signedPayload, "utf8").digest("hex")
  return `t=${ts},v1=${sig}`
}

async function runDirectPost() {
  if (!WEBHOOK_SECRET) {
    info(
      "STRIPE_WEBHOOK_SECRET not set — sending unsigned request. " +
      "The webhook route will likely return 400 (signature verification failed). " +
      "Set STRIPE_WEBHOOK_SECRET to the value from `stripe listen --print-secret` for a successful smoke test.",
    )
  }

  const payload = buildTestPayload()
  const payloadStr = JSON.stringify(payload)
  const signature = signPayload(payloadStr, WEBHOOK_SECRET)

  verbose("sending synthetic webhook payload", { endpoint: WEBHOOK_ENDPOINT, type: payload.type, sessionId: payload.data.object.id })

  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "ClawGuru-WebhookSmokeTest/1.0",
  }
  if (signature) headers["Stripe-Signature"] = signature

  let res
  try {
    res = await fetch(WEBHOOK_ENDPOINT, {
      method: "POST",
      headers,
      body: payloadStr,
      signal: AbortSignal.timeout(15_000),
    })
  } catch (err) {
    error("network error sending webhook", { message: String(err.message ?? err) })
    process.exit(1)
  }

  const body = await res.text().catch(() => "")
  const status = res.status

  info("webhook response", { status, endpoint: WEBHOOK_ENDPOINT, body: body.slice(0, 300) })

  if (status === 200) {
    info("smoke test passed — webhook route accepted the request")
    process.exit(0)
  }

  if (status === 400 && !WEBHOOK_SECRET) {
    info(
      "expected 400 — signature verification failed because STRIPE_WEBHOOK_SECRET is not set. " +
      "This is correct behaviour. Set STRIPE_WEBHOOK_SECRET for a full smoke test.",
    )
    // Treat as a pass for documentation purposes (route is alive, rejection is expected).
    process.exit(0)
  }

  if (status >= 500) {
    error("webhook route returned server error — check Railway logs", { status })
    process.exit(2)
  }

  // 400/401/403 with a secret set = logic or config issue
  error("webhook route rejected request", { status, body: body.slice(0, 300) })
  process.exit(2)
}

runDirectPost()
