"use client"

import { useState } from "react"

interface K8sResult {
  resourceCount: number
  findings: Array<{ resource: string; kind: string; severity: string; field: string; message: string; suggestion: string }>
  summary: { critical: number; warnings: number; info: number }
}

export function K8sAuditorClient() {
  const [manifest, setManifest] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<K8sResult | null>(null)

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!manifest.trim()) return
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const r = await fetch("/api/tools/k8s", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manifest: manifest.trim() }),
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
      <div className="rounded-lg border border-violet-500/30 bg-white/[0.02] p-8">
        <form onSubmit={handleAudit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Kubernetes manifest (YAML)
            </label>
            <textarea
              value={manifest}
              onChange={(e) => setManifest(e.target.value)}
              placeholder="Paste your K8s manifest (Deployment, Pod, etc.)..."
              rows={12}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-violet-400/50 font-mono text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !manifest.trim()}
            className="w-full px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-200 hover:bg-violet-500/30 disabled:opacity-50 transition-all font-medium"
          >
            {loading ? "Auditing..." : "Run OPA Audit"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-lg border border-red-500/30 bg-red-500/5 text-red-300 text-sm font-mono">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <div className="flex gap-4 flex-wrap">
              <div className="px-4 py-3 rounded-lg border border-violet-500/30 bg-violet-500/5">
                <div className="text-xs text-violet-300 opacity-70">RESOURCES</div>
                <div className="text-2xl font-bold text-violet-200">{result.resourceCount}</div>
              </div>
              {result.summary.critical > 0 && (
                <div className="px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/5">
                  <div className="text-xs text-red-300 opacity-70">CRITICAL</div>
                  <div className="text-2xl font-bold text-red-200">{result.summary.critical}</div>
                </div>
              )}
              {result.summary.warnings > 0 && (
                <div className="px-4 py-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
                  <div className="text-xs text-amber-300 opacity-70">WARNINGS</div>
                  <div className="text-2xl font-bold text-amber-200">{result.summary.warnings}</div>
                </div>
              )}
            </div>

            {result.findings.length > 0 && (
              <div className="space-y-2">
                {result.findings.slice(0, 20).map((finding, i) => (
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
                    <div className="text-xs opacity-80 mt-1">{finding.resource}</div>
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
