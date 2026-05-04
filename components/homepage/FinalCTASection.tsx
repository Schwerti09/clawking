"use client"

import type { Locale } from "@/lib/i18n"
import { getHomepageCroCopy } from "@/lib/homepage-cro-i18n"
import { ArrowRight, Calendar, Shield } from "lucide-react"
import { pick } from "@/lib/i18n-pick"
import { motion, easeOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

type Props = { locale: Locale; prefix?: string; dict?: Record<string, string> }

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

export default function FinalCTASection({ locale, prefix = "", dict = {} }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const cro = getHomepageCroCopy(locale)
  const isDE = locale === "de"
  const title = dict.final_cta_title || cro.finalTitle
  const sub = dict.final_cta_sub || cro.finalSub
  const primary = dict.final_cta_primary || (pick(isDE, "Kostenlosen Check starten", "Start free check"))
  const secondary = pick(isDE, "Strategy Call buchen", "Book a Strategy Call")

  return (
    <section ref={ref} className="py-20 relative overflow-hidden" style={{ background: "var(--surface-0)" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(0,255,157,0.06), transparent 60%)",
        }}
      />
      <motion.div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
          {title}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          {sub}
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <motion.a
            href={`${prefix}/check`}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 255, 157, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-black bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 text-white shadow-lg shadow-cyan-500/20 transition-all"
            data-track="final_cta_primary_check"
          >
            <Shield className="h-4 w-4" aria-hidden />
            {primary}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </motion.a>
          <motion.a
            href={`${prefix}/consulting`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl border border-white/15 hover:border-cyan-400/40 font-bold text-gray-200 transition-all duration-300"
            data-track="final_cta_secondary_strategy_call"
          >
            <Calendar className="h-4 w-4" aria-hidden />
            {secondary}
          </motion.a>
        </motion.div>
        <motion.p variants={itemVariants} className="mt-5 text-xs text-gray-500">
          {pick(isDE, "Keine Kreditkarte · 30 Sekunden · DSGVO / EU-Hosting", "No credit card · 30 seconds · GDPR / EU-hosted")}
        </motion.p>
      </motion.div>
    </section>
  )
}
