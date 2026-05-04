"use client"

import { motion, easeOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

type Props = { dict?: Record<string, string> }

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

export default function ProblemSection({ dict = {} }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const points = [
    {
      icon: "🚨",
      title: dict.problem_p1_title || "Exposed stack, unclear priority",
      desc: dict.problem_p1_desc || "Gateways, auth gaps, key leaks: teams see the noise, but not the order of action.",
    },
    {
      icon: "⚡",
      title: dict.problem_p2_title || "30-second signal, concrete weak spots",
      desc: dict.problem_p2_desc || "The check gives fast posture feedback so your team can prioritize immediately.",
    },
    {
      icon: "🛠️",
      title: dict.problem_p3_title || "Runbook path from issue to fix",
      desc: dict.problem_p3_desc || "Move from diagnosis to implementation and verification without tab-chaos.",
    },
  ]

  return (
    <section ref={ref} className="py-16" style={{ background: "var(--surface-1)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
            {dict.problem_badge || "The Problem"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            {dict.problem_title || "From exposure to fix in three steps"}
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            {dict.problem_sub || "A simple operating path: detect the weak spots, prioritize, execute, and re-check."}
          </p>
        </motion.div>

        {/* Cards with stagger */}
        <motion.div
          className="grid md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-2xl p-6 border border-white/10 bg-white/3 hover:border-red-500/20 transition-all duration-300 group cursor-pointer"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {/* Animated icon */}
              <motion.div
                className="text-3xl mb-3 inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {p.icon}
              </motion.div>
              <div className="text-white font-bold text-base mb-2">{p.title}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
