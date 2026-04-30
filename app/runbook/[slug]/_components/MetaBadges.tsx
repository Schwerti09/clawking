// Derived metadata badges (severity, time-to-fix, reading time).
// Pure server component — no client runtime cost.

type Props = {
  clawScore: number
  wordCount: number
  stepCount: number
  tags: string[]
}

function severityFromTags(tags: string[]): { label: string; color: string; ring: string } {
  const has = (p: string) => tags.some((t) => t.toLowerCase().includes(p))
  if (has("severity:p1") || has("p1")) {
    return { label: "P1 · Critical", color: "text-red-300", ring: "border-red-500/40 bg-red-500/10" }
  }
  if (has("severity:p2") || has("p2")) {
    return { label: "P2 · High", color: "text-orange-300", ring: "border-orange-500/40 bg-orange-500/10" }
  }
  if (has("severity:p3") || has("p3")) {
    return { label: "P3 · Medium", color: "text-yellow-300", ring: "border-yellow-500/40 bg-yellow-500/10" }
  }
  return { label: "Hardening", color: "text-cyan-300", ring: "border-cyan-500/40 bg-cyan-500/10" }
}

function timeToFix(stepCount: number): { label: string; minutes: number } {
  if (stepCount <= 4) return { label: "15–30 min", minutes: 20 }
  if (stepCount <= 7) return { label: "30–60 min", minutes: 45 }
  if (stepCount <= 10) return { label: "1–2 h", minutes: 90 }
  return { label: "2–4 h", minutes: 180 }
}

function readingTime(words: number): number {
  return Math.max(2, Math.round(words / 220))
}

export default function MetaBadges({ clawScore, wordCount, stepCount, tags }: Props) {
  const sev = severityFromTags(tags)
  const ttf = timeToFix(stepCount)
  const rt = readingTime(wordCount)

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Runbook metadata">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-black ${sev.ring} ${sev.color}`}
      >
        <span aria-hidden="true">●</span>
        {sev.label}
      </span>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-700 bg-black/30 text-[11px] font-mono text-gray-300">
        <span aria-hidden="true">⏱</span>
        Fix: {ttf.label}
      </span>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-700 bg-black/30 text-[11px] font-mono text-gray-300">
        <span aria-hidden="true">📖</span>
        {rt} min read
      </span>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-700 bg-black/30 text-[11px] font-mono text-gray-300">
        <span aria-hidden="true">🪜</span>
        {stepCount} steps
      </span>
    </div>
  )
}
