"use client"
// Fixed-top progress bar indicating scroll depth of the current article.
// Uses rAF-throttled scroll listener + respects prefers-reduced-motion.
import { useEffect, useState } from "react"

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const doc = document.documentElement
      const scrolled = doc.scrollTop || document.body.scrollTop
      const height = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight
      const pct = height > 0 ? Math.min(100, (scrolled / height) * 100) : 0
      setProgress(pct)
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        update()
        raf = 0
      })
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 transition-[width] duration-150 ease-out will-change-[width] motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
