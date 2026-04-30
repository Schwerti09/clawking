"use client"
// Persistent interactive checklist with progress tracker.
// Saves state to localStorage per slug so users can resume across sessions.
import { useEffect, useMemo, useState } from "react"

export default function InteractiveChecklist({
  slug,
  items,
  title = "Verification Checklist",
}: {
  slug: string
  items: string[]
  title?: string
}) {
  const storageKey = `clawguru:runbook-checklist:${slug}`
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false))
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as boolean[]
        if (Array.isArray(parsed) && parsed.length === items.length) {
          setChecked(parsed)
        }
      }
    } catch {}
    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked))
    } catch {}
  }, [checked, hydrated, storageKey])

  const done = useMemo(() => checked.filter(Boolean).length, [checked])
  const total = items.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const allDone = done === total && total > 0

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  function reset() {
    setChecked(items.map(() => false))
  }

  return (
    <section
      className="rounded-3xl border border-gray-800 bg-gradient-to-b from-black/40 to-black/20 p-6 shadow-2xl"
      aria-label={title}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-base font-black text-gray-100">{title}</h3>
        <div className="text-xs text-gray-400 font-mono">
          {done}/{total} · {pct}%
        </div>
      </div>

      <div className="mb-5 h-2 rounded-full bg-gray-800 overflow-hidden" aria-hidden="true">
        <div
          className={[
            "h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none",
            allDone
              ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
              : "bg-gradient-to-r from-cyan-500 to-blue-500",
          ].join(" ")}
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => {
          const isOn = checked[i]
          return (
            <li key={i}>
              <label
                className={[
                  "flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                  isOn
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-gray-800 bg-black/30 hover:border-gray-700 hover:bg-black/40",
                ].join(" ")}
              >
                <input
                  type="checkbox"
                  checked={!!isOn}
                  onChange={() => toggle(i)}
                  className="mt-0.5 h-5 w-5 rounded border-gray-600 bg-black/40 text-emerald-500 focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-0"
                  aria-label={`Mark step ${i + 1} as done`}
                />
                <span
                  className={[
                    "text-sm leading-relaxed",
                    isOn ? "text-emerald-200 line-through decoration-emerald-500/50" : "text-gray-200",
                  ].join(" ")}
                >
                  <span className="font-mono text-xs text-gray-500 mr-2">#{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </span>
              </label>
            </li>
          )
        })}
      </ul>

      {allDone && (
        <div
          className="mt-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 flex items-center gap-3"
          role="status"
          aria-live="polite"
        >
          <span className="text-2xl">🎉</span>
          <div className="flex-1">
            <div className="font-black text-emerald-200 text-sm">All checks complete</div>
            <div className="text-xs text-emerald-300/80 mt-0.5">
              Run a verification check to lock in your hardening.
            </div>
          </div>
          <a
            href="/check"
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-black bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
          >
            Verify now →
          </a>
        </div>
      )}

      {done > 0 && !allDone && (
        <button
          type="button"
          onClick={reset}
          className="mt-4 text-xs text-gray-500 hover:text-gray-300 underline underline-offset-2"
        >
          Reset checklist
        </button>
      )}
    </section>
  )
}
