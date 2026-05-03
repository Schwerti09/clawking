"use client"

import { useState } from "react"

export function AiJailbreakClient() {
  const [model, setModel] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!model.trim() || !systemPrompt.trim()) return
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg border border-red-500/30 bg-white/[0.02] p-8">
        <form onSubmit={handleTest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Model name
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g., GPT-4, Claude 3, Llama"
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-400/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              System prompt
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Paste the system prompt you want to test..."
              rows={8}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-400/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !model.trim() || !systemPrompt.trim()}
            className="w-full px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 hover:bg-red-500/30 disabled:opacity-50 transition-all font-medium"
          >
            {loading ? "Testing..." : "Run EU AI Act Tests"}
          </button>
        </form>

        <div className="mt-8 p-4 rounded-lg border border-red-500/20 bg-red-500/5 text-red-100 text-sm">
          <p className="font-semibold mb-2">Coming Soon:</p>
          <ul className="list-disc pl-5 space-y-1 text-red-100/80">
            <li>EU AI Act bias testing</li>
            <li>Robustness against adversarial input</li>
            <li>Fairness across demographic groups</li>
            <li>Transparency & explainability checks</li>
            <li>Harmful content boundary testing</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
