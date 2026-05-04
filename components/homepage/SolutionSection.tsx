"use client"

import { RUNBOOK_COUNT_LONG_EN, RUNBOOK_COUNT_LONG_DE } from "@/lib/stats"
import { pick } from "@/lib/i18n-pick"
import type { Locale } from "@/lib/i18n"
import { motion, easeOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

type Props = { prefix?: string; dict?: Record<string, string>; locale?: Locale }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function SolutionSection({ prefix = "", dict = {}, locale = "en" }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const isDE = locale === "de"

  const pillars = [
    {
      number: "01",
      title: dict.solution_p1_title || "Mycelial Engine",
      desc: dict.solution_p1_desc || `${isDE ? RUNBOOK_COUNT_LONG_DE : RUNBOOK_COUNT_LONG_EN} – die größte katalogisierte Runbook-Sammlung. Jede Zeile wurde von Security Engineers überprüft.`,
    },
    {
      number: "02",
      title: dict.solution_p2_title || "AI-powered Execution",
      desc: dict.solution_p2_desc || isDE
        ? "KI-generierte Aktions-Pläne direkt für deinen Stack. Nicht generisch – sondern für dein Setup optimiert."
        : "AI-generated action plans tailored to your stack. Not generic – optimized for YOUR setup.",
    },
    {
      number: "03",
      title: dict.solution_p3_title || "Verifiable Results",
      desc: dict.solution_p3_desc || isDE
        ? "Jeder Schritt ist nachverfolgbar. Keine Black-Box-Empfehlungen. Security Score, Findings, Audit-Trail."
        : "Every step is traceable. No black-box recommendations. Security Score, findings, audit trail.",
    },
  ]

  return (
    <section ref={ref} className="py-16" style={{ background: "var(--surface-0)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20">
            {dict.solution_badge || "The Solution"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            {dict.solution_title || "From check to operational security"}
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            {dict.solution_sub || pick(
              isDE,
              "Drei Säulen für sofortige Sicherheit: Schnelle Diagnostik, intelligente Pläne, verifiable Results.",
              "Three pillars for immediate security: fast diagnostics, intelligent plans, verifiable results."
            )}
          </p>
        </motion.div>

        {/* Pillars with stagger */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Animated circle background */}
              <motion.div
                className="w-20 h-20 rounded-full mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-black text-2xl relative z-10 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {pillar.number}
              </motion.div>

              {/* Content */}
              <h3 className="text-white font-bold text-lg mb-3">{pillar.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>

              {/* Animated underline */}
              <motion.div
                className="mt-4 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: 40 } : { width: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
