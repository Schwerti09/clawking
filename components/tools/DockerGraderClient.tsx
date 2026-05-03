"use client"

import { useState } from "react"

interface DockerResult {
  score: number
  grade: "A" | "B" | "C" | "D" | "F"
  findings: Array<{ severity: "info" | "warn" | "critical"; rule: string; description: string; suggestion: string }>
}

const gradeColor: Record<string, string> = {
  A: "text-emerald-300 border-emerald-400/40 bg-emerald-500/10",
  B: "text-lime-300 border-lime-400/40 bg-lime-500/10",
  C: "text-amber-300 border-amber-400/40 bg-amber-500/10",
  D: "text-orange-300 border-orange-400/40 bg-orange-500/10",
  F: "text-red-300 border-red-400/40 bg-red-500/10",
}

export function DockerGraderClient() {
  const [dockerfile, setDockerfile] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DockerResult | null>(null)

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dockerfile.trim()) return
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const r = await fetch("/api/tools/docker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dockerfile: dockerfile.trim() }),
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
        <form onSubmit={handleGrade} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Dockerfile content
            </label>
            <textarea
              value={dockerfile}
              onChange={(e) => setDockerfile(e.target.value)}
              placeholder="Paste your Dockerfile..."
              rows={12}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 font-mono text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !dockerfile.trim()}
            className="w-full px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/30 disabled:opacity-50 transition-all font-medium"
          >
            {loading ? "Grading..." : "Grade Hardening"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-lg border border-red-500/30 bg-red-500/5 text-red-300 text-sm font-mono">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <div className={`px-4 py-3 rounded-xl border font-mono ${gradeColor[result.grade]}`}>
              <div className="text-xs tracking-widest opacity-70">GRADE</div>
              <div className="text-3xl font-black">{result.grade}</div>
              <div className="text-xs mt-1">{result.score}/100</div>
            </div>

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
                    <div className="font-semibold">{finding.rule}</div>
                    <div className="text-xs opacity-80 mt-1">{finding.description}</div>
                    <div className="text-xs opacity-75 mt-1 bg-black/20 p-1 rounded">{finding.suggestion}</div>
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
