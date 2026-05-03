"use client"

import { useState } from "react"

interface DnsResult {
  domain: string
  records: Array<{ type: string; value: string; severity?: string; message?: string }>
  findings: Array<{ severity: "info" | "warn" | "critical"; record: string; message: string; suggestion: string }>
  hijackRisk: "low" | "medium" | "high"
}

export function DnsTakeoverClient() {
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DnsResult | null>(null)

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain.trim()) return
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const r = await fetch("/api/tools/dns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domain.trim() }),
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
      <div className="rounded-lg border border-cyan-500/30 bg-white/[0.02] p-8">
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Domain or subdomain
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g., example.com or api.example.com"
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !domain.trim()}
            className="w-full px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/30 disabled:opacity-50 transition-all font-medium"
          >
            {loading ? "Scanning..." : "Check Takeover Risk"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-lg border border-red-500/30 bg-red-500/5 text-red-300 text-sm font-mono">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <div className={`px-4 py-3 rounded-xl border font-mono ${
              result.hijackRisk === "high"
                ? "text-red-300 border-red-400/40 bg-red-500/10"
                : result.hijackRisk === "medium"
                  ? "text-amber-300 border-amber-400/40 bg-amber-500/10"
                  : "text-emerald-300 border-emerald-400/40 bg-emerald-500/10"
            }`}>
              <div className="text-xs tracking-widest opacity-70">HIJACK RISK</div>
              <div className="text-3xl font-black capitalize">{result.hijackRisk}</div>
            </div>

            {result.records.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-100">DNS Records</h3>
                {result.records.slice(0, 10).map((record, i) => (
                  <div key={i} className="p-3 rounded border border-cyan-500/20 bg-cyan-500/5 text-cyan-100 text-sm">
                    <div className="font-semibold">{record.type}</div>
                    <div className="text-xs opacity-80 break-all">{record.value}</div>
                  </div>
                ))}
              </div>
            )}

            {result.findings.length > 0 && (
              <div className="space-y-2">
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
                    <div className="font-semibold">{finding.message}</div>
                    <div className="text-xs opacity-75 mt-1">{finding.suggestion}</div>
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
