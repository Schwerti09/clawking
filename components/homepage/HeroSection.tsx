"use client"

import Container from "@/components/shared/Container"
import type { Locale } from "@/lib/i18n"
import { getHomepageCroCopy } from "@/lib/homepage-cro-i18n"
import { ArrowRight, Calendar, Shield } from "lucide-react"
import { pick } from "@/lib/i18n-pick"
import { motion, easeOut } from "framer-motion"
import { useState, useEffect } from "react"

type Props = { locale: Locale; prefix?: string; dict?: Record<string, string> }

// Simple Typewriter effect for the subheader rotation
function TypewriterSubheader({ isDE }: { isDE: boolean }) {
  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const texts = isDE
    ? ["4,2M Runbooks.", "Live Intelligence.", "Zero Bullshit."]
    : ["4.2M Runbooks.", "Live Intelligence.", "Zero Bullshit."]

  useEffect(() => {
    if (!texts[textIndex]) return

    const currentText = texts[textIndex]
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else {
      // Text complete, wait 2s then move to next
      const timeout = setTimeout(() => {
        setDisplayText("")
        setCharIndex(0)
        setTextIndex((prev) => (prev + 1) % texts.length)
      }, 2500)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, textIndex, texts])

  return (
    <span className="text-brand-cyan font-black">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
}

export default function HeroSection({ locale, prefix = "", dict = {} }: Props) {
  const cro = getHomepageCroCopy(locale)
  const isDE = locale === "de"
  const t = {
    badge: dict.hero_badge || (pick(isDE, "Security Intelligence Engine · 4.2M Runbooks · Expert-Reviewed", "Security Intelligence Engine · 4.2M Runbooks · Expert-Reviewed")),
    title: dict.hero_title || cro.heroH1,
    sub: dict.hero_sub || cro.heroSubtitle,
    primary: dict.hero_primary || (pick(isDE, "Kostenloser Security Check", "Free Security Check")),
    secondary: pick(isDE, "Strategy Call buchen", "Book a Strategy Call"),
    trust: dict.hero_note || cro.heroTrustLine,
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-32" style={{ background: "var(--surface-0)" }}>
      {/* Ambient gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 80% at 20% 20%, rgba(0,255,157,0.12), transparent 50%), " +
            "radial-gradient(ellipse 70% 70% at 80% 30%, rgba(139,92,246,0.1), transparent 50%)",
          maskImage: "radial-gradient(100% 100% at 50% 50%, black, transparent)",
        }}
      />

      {/* Animated corner orbs */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: "linear-gradient(135deg, #00ff9d, #00b8ff)" }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-15"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container>
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={badgeVariants} className="inline-block mb-6">
            <div className="px-4 py-1.5 rounded-full text-xs font-semibold border border-cyan-500/30 bg-cyan-500/10 text-cyan-200 tracking-widest hover:border-cyan-400/50 transition-all">
              ✨ {t.badge}
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl font-black leading-tight text-white tracking-tight"
          >
            {t.title}
          </motion.h1>

          {/* Animated Subheader with Typewriter */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg sm:text-2xl text-gray-300 max-w-2xl mx-auto h-12 sm:h-auto flex items-center justify-center"
          >
            <TypewriterSubheader isDE={isDE} />
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto"
          >
            {t.sub}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={`${prefix}/check`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 255, 157, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-brand-cyan to-brand-violet hover:opacity-90 text-white shadow-xl shadow-cyan-500/30 transition-all"
              data-track="hero_primary_check"
            >
              <Shield className="h-5 w-5" aria-hidden />
              {t.primary}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </motion.a>

            <motion.a
              href={`${prefix}/consulting`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/60 font-bold text-gray-200 transition-all duration-300 backdrop-blur-sm hover:bg-white/5"
              data-track="hero_secondary_strategy_call"
            >
              <Calendar className="h-5 w-5" aria-hidden />
              {t.secondary}
            </motion.a>
          </motion.div>

          {/* Trust Signals */}
          <motion.div variants={itemVariants} className="mt-8">
            <p className="text-xs text-gray-400 mb-4">{t.trust}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-green-400">✓</span> {pick(isDE, "Keine Kreditkarte", "No credit card")}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-400">✓</span> {pick(isDE, "30 Sekunden", "30 seconds")}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-400">✓</span> {pick(isDE, "EU-gehostet", "EU-hosted")}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-400">✓</span> {pick(isDE, "GDPR-konform", "GDPR-compliant")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-white rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
