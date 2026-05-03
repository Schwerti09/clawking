"use client"

import { useState } from "react"

interface RunbookResult {
  incident: string
  runbook: string
  status: "success" | "error"
  error?: string
}

export function RunbookGeneratorClient() {
  const [incident, setIncident] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<RunbookResult | null>(null)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!incident.trim()) return
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const r = await fetch("/api/tools/runbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incident: incident.trim() }),
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
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Incident description
            </label>
            <textarea
              value={incident}
              onChange={(e) => setIncident(e.target.value)}
              placeholder="Describe the incident (e.g., 'API latency spike to 5s, DB CPU at 95%, error rate 2%')..."
              rows={8}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-400/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !incident.trim()}
            className="w-full px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-200 hover:bg-blue-500/30 disabled:opacity-50 transition-all font-medium"
          >
            {loading ? "Generating..." : "Create Runbook"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-lg border border-red-500/30 bg-red-500/5 text-red-300 text-sm font-mono">
            {error}
          </div>
        )}

        {result && result.status === "success" && (
          <div className="mt-8 p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <div className="prose prose-invert max-w-none text-sm">
              <div className="text-gray-100 space-y-4">
                <div className="bg-black/30 p-4 rounded font-mono text-xs overflow-auto max-h-96 whitespace-pre-wrap">
                  {result.runbook}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result.runbook)
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-200 hover:bg-blue-500/30 text-sm font-medium"
                >
                  Copy Runbook
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
