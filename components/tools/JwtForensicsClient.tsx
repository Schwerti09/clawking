"use client"

import { useState } from "react"

interface JwtResult {
  valid: boolean
  error?: string
  parts?: {
    header: Record<string, unknown>
    payload: Record<string, unknown>
    signature: string
  }
  claims?: {
    exp?: number
    iat?: number
    nbf?: number
    isExpired: boolean
    expiresIn?: string
  }
  findings: Array<{ severity: "info" | "warn" | "critical"; label: string; detail: string }>
}

export function JwtForensicsClient() {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<JwtResult | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) return
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const r = await fetch("/api/tools/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim() }),
      })
      if (!r.ok) {
        const err = (await r.json().catch(() => ({}))) as { error?: string }
        throw new Error(err.error ?? `Error: ${r.status}`)
      }
      setResult(await r.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg border border-blue-500/30 bg-white/[0.02] p-8">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              JWT Token
            </label>
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste a JWT token (eyJhbGc...)"
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400/50 font-mono text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="w-full px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-200 hover:bg-blue-500/30 disabled:opacity-50 transition-all font-medium"
          >
            {loading ? "Analyzing..." : "Decode & Scan"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-lg border border-red-500/30 bg-red-500/5 text-red-300 text-sm font-mono">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            {result.valid && result.parts && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <h3 className="font-semibold text-blue-200 mb-2">Header</h3>
                  <pre className="text-xs text-gray-300 overflow-auto bg-black/20 p-2 rounded">
                    {JSON.stringify(result.parts.header, null, 2)}
                  </pre>
                </div>
                <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <h3 className="font-semibold text-blue-200 mb-2">Payload</h3>
                  <pre className="text-xs text-gray-300 overflow-auto bg-black/20 p-2 rounded">
                    {JSON.stringify(result.parts.payload, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {result.findings && result.findings.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-100">Security Findings</h3>
                {result.findings.map((finding, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded border text-sm ${
                      finding.severity === "critical"
                        ? "border-red-500/30 bg-red-500/5 text-red-200"
                        : finding.severity === "warn"
                          ? "border-amber-500/30 bg-amber-500/5 text-amber-200"
                          : "border-blue-500/30 bg-blue-500/5 text-blue-200"
                    }`}
                  >
                    <div className="font-semibold">{finding.label}</div>
                    <div className="text-xs opacity-80">{finding.detail}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
