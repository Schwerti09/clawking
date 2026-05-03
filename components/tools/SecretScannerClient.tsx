"use client"

import { useState } from "react"

interface Secret {
  type: string
  severity: "high" | "critical"
  pattern: string
  line: number
  column: number
  matched: string
  advice: string
}

interface ScanResult {
  totalLines: number
  secretsFound: number
  secrets: Secret[]
}

export function SecretScannerClient() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ScanResult | null>(null)

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const r = await fetch("/api/tools/secret-scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
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
      <div className="rounded-lg border border-pink-500/30 bg-white/[0.02] p-8">
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Source code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste code (Python, JS, Go, etc.) to scan for hardcoded secrets..."
              rows={12}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-pink-400/50 font-mono text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full px-4 py-2 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-200 hover:bg-pink-500/30 disabled:opacity-50 transition-all font-medium"
          >
            {loading ? "Scanning..." : "Find Secrets"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-lg border border-red-500/30 bg-red-500/5 text-red-300 text-sm font-mono">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-4">
            <div className="flex gap-4">
              <div className="px-4 py-3 rounded-lg border border-pink-500/30 bg-pink-500/5">
                <div className="text-xs text-pink-300 opacity-70">TOTAL LINES</div>
                <div className="text-2xl font-bold text-pink-200">{result.totalLines}</div>
              </div>
              <div className="px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/5">
                <div className="text-xs text-red-300 opacity-70">SECRETS FOUND</div>
                <div className="text-2xl font-bold text-red-200">{result.secretsFound}</div>
              </div>
            </div>

            {result.secrets.length > 0 && (
              <div className="space-y-2">
                {result.secrets.map((secret, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded border text-sm ${
                      secret.severity === "critical"
                        ? "border-red-500/30 bg-red-500/5 text-red-200"
                        : "border-orange-500/30 bg-orange-500/5 text-orange-200"
                    }`}
                  >
                    <div className="font-semibold">{secret.type}</div>
                    <div className="text-xs opacity-80">Line {secret.line}:{secret.column}</div>
                    <div className="text-xs mt-1 bg-black/20 p-1 rounded font-mono break-all">{secret.matched}</div>
                    <div className="text-xs mt-1 opacity-90">{secret.advice}</div>
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
