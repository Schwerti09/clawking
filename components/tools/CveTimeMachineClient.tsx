"use client"

import { useState } from "react"

export function CveTimeMachineClient() {
  const [library, setLibrary] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!library.trim()) return
    setLoading(true)
    // API call will go here
    setTimeout(() => setLoading(false), 500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg border border-amber-500/30 bg-white/[0.02] p-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Library name (npm, pip, gem, etc.)
            </label>
            <input
              type="text"
              value={library}
              onChange={(e) => setLibrary(e.target.value)}
              placeholder="e.g., lodash, django, rails"
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !library.trim()}
            className="w-full px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 hover:bg-amber-500/30 disabled:opacity-50 transition-all font-medium"
          >
            {loading ? "Scanning..." : "Get CVE Timeline"}
          </button>
        </form>

        <div className="mt-8 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-100 text-sm">
          <p className="font-semibold mb-2">Coming Soon:</p>
          <ul className="list-disc pl-5 space-y-1 text-amber-100/80">
            <li>Full CVE history timeline</li>
            <li>Severity distribution visualization</li>
            <li>Patched vs. vulnerable version ranges</li>
            <li>Data sourced from NVD + GitHub Security Advisories</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
