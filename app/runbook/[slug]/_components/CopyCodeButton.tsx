"use client"
// Inline copy-to-clipboard button designed to live inside a code block header.
import { useState } from "react"

export default function CopyCodeButton({ code, label = "Copy" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard?.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // graceful no-op
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors",
        copied
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
          : "border-gray-700 bg-black/40 text-gray-400 hover:border-gray-500 hover:text-gray-200",
      ].join(" ")}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
      <span>{copied ? "Copied" : label}</span>
    </button>
  )
}
