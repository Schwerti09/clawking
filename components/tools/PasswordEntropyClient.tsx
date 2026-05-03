"use client"

import { useState } from "react"

export function PasswordEntropyClient() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg border border-red-500/30 bg-white/[0.02] p-8">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password or passphrase
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to analyze..."
                className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-400/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 p-4 rounded-lg border border-red-500/20 bg-red-500/5 text-red-100 text-sm">
          <p className="font-semibold mb-2">Coming Soon:</p>
          <ul className="list-disc pl-5 space-y-1 text-red-100/80">
            <li>Entropy calculation (bits of randomness)</li>
            <li>Rainbow-table cracking time estimates</li>
            <li>Character composition analysis</li>
            <li>Pattern detection (common passwords, keyboard walks)</li>
            <li>Comparison to NIST guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
