"use client"

import { RUNBOOK_COUNT_LONG_EN } from "@/lib/stats"
import { motion, easeOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

type Props = { dict?: Record<string, string> }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
}

export default function WhySection({ dict = {} }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const reasons = [
    {
      title: dict.why_r1_title || "Ready immediately",
      desc: dict.why_r1_desc || "No weeks for onboarding. Productive in 5 minutes – from day one.",
    },
    {
      title: dict.why_r2_title || "Scalable knowledge",
      desc: dict.why_r2_desc || `${RUNBOOK_COUNT_LONG_EN} runbooks grow with every new requirement. Your knowledge scales automatically.`,
    },
    {
      title: dict.why_r3_title || "Verifiable security",
      desc: dict.why_r3_desc || "Every execution is documented. Git commit, audit report, certificate – for the next audit.",
    },
  ]

  const differentiators = [
    {
      title: dict.why_d1_title || "Mycelial Engine",
      desc: dict.why_d1_desc || "Semantic connection of millions of runbooks. The Engine finds the right path – not just an answer.",
    },
    {
      title: dict.why_d2_title || "AI-powered execution",
      desc: dict.why_d2_desc || "Automated, context-aware, and in your environment. From identification to proof – in seconds.",
    },
    {
      title: dict.why_d3_title || "Open Source",
      desc: dict.why_d3_desc || "No vendor lock-in. Code, issues and roadmap are public – transparent development without hype.",
    },
  ]

  return (
    <section ref={ref} className="py-16" style={{ background: "var(--surface-0)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20">
            {dict.why_badge || "Why"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            {dict.why_title || "Why ClawGuru?"}
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            {dict.why_sub || "We solve the core problem of SecOps: knowledge where it's needed, in executable form – instantly verifiable."}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-6">{dict.why_benefits_heading || "Key Benefits"}</h3>
            <div className="space-y-4">
              {reasons.map((r) => (
                <motion.div key={r.title} variants={itemVariants} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">{r.title}</div>
                    <div className="text-gray-400 text-sm">{r.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">{dict.why_diff_heading || "Differentiators"}</h3>
            <div className="space-y-4">
              {differentiators.map((d) => (
                <motion.div key={d.title} variants={itemVariants} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold">{d.title}</div>
                    <div className="text-gray-400 text-sm">{d.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}