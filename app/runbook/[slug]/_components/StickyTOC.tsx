"use client"
// Sticky table-of-contents sidebar with active-section highlighting via IntersectionObserver.
// Hidden on mobile (shown as inline MiniTabs instead).
import { useEffect, useState } from "react"

export type TocItem = { id: string; label: string; level?: 1 | 2 }

export default function StickyTOC({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "")

  useEffect(() => {
    if (!items.length || typeof window === "undefined") return
    const ids = items.map((i) => i.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <aside
      className="hidden lg:block sticky top-24 w-64 shrink-0"
      aria-label="Table of contents"
    >
      <nav className="rounded-2xl border border-gray-800 bg-black/40 backdrop-blur-md p-4 shadow-xl">
        <div className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-3">
          On this page
        </div>
        <ul className="space-y-1 text-sm">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={[
                    "block rounded-lg px-3 py-1.5 transition-colors border-l-2",
                    item.level === 2 ? "pl-6 text-xs" : "",
                    isActive
                      ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
