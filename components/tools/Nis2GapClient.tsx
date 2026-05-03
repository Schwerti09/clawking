"use client"

import { useState } from "react"

export function Nis2GapClient() {
  const [orgType, setOrgType] = useState("oes")
  const [industry, setIndustry] = useState("")

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg border border-amber-500/30 bg-white/[0.02] p-8">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Organization type
            </label>
            <select
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 focus:outline-none focus:border-amber-400/50"
            >
              <option value="oes">Operator of Essential Services (OES)</option>
              <option value="dsp">Digital Service Provider (DSP)</option>
              <option value="dnsp">DNS/Cloud/Infrastructure Provider</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Industry sector
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Energy, Healthcare, Finance..."
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400/50"
            />
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 hover:bg-amber-500/30 disabled:opacity-50 transition-all font-medium"
          >
            Generate Compliance Checklist
          </button>
        </form>

        <div className="mt-8 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-100 text-sm">
          <p className="font-semibold mb-2">Coming Soon:</p>
          <ul className="list-disc pl-5 space-y-1 text-amber-100/80">
            <li>NIS2 Directive control mapping</li>
            <li>EUVD (Cyber Resilience Act) alignment</li>
            <li>Sector-specific gap analysis</li>
            <li>Evidence checklist with examples</li>
            <li>Remediation roadmap per control</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
