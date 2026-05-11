"use client"

import type { Locale } from "@/lib/i18n"
import { motion, easeOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

type Props = { locale: Locale; prefix?: string; dict?: Record<string, string> }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function TrustSection({ locale, prefix = "", dict = {} }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const isDE = locale === "de"

  // 5 Proof Blocks — Seriös & Technical
  const proofBlocks = [
    {
      id: "eu",
      icon: "🇪🇺",
      title: isDE ? "EU-Sicherheit zuerst" : "EU-First Security",
      items: [
        isDE ? "In der EU gehostet" : "EU-hosted",
        isDE ? "DSGVO-konform" : "GDPR compliant",
        isDE ? "Kein US Cloud-Lock-in" : "No US cloud lock-in",
        isDE ? "Transparente Datenpolitik" : "Transparent data policy",
      ],
      accent: "text-blue-400",
      bgGradient: "from-blue-500/10 to-blue-600/5",
    },
    {
      id: "runbooks",
      icon: "📊",
      title: isDE ? "Kuratierte Runbooks" : "Curated Runbooks",
      items: [
        isDE ? "Manuell analysiert & validiert" : "Human-reviewed & validated",
        isDE ? "Ausführbar per CLI & API" : "Executable via CLI & API",
        isDE ? "Täglich aktualisiert" : "Updated daily",
        isDE ? "Live Scanner starten →" : "Try scanner now →",
      ],
      accent: "text-emerald-400",
      bgGradient: "from-emerald-500/10 to-emerald-600/5",
      link: `${prefix}/arsenal`,
    },
    {
      id: "intel",
      icon: "📡",
      title: isDE ? "Real-Time Threat Intel" : "Real-Time Threat Intel",
      items: [
        isDE ? "OpsWall überwacht 24/7" : "OpsWall monitors 24/7",
        isDE ? "CVE-Updates täglich" : "CVE updates daily",
        isDE ? "Threat-Kategorien live" : "Live threat categories",
        isDE ? "OpsWall öffnen →" : "Open OpsWall →",
      ],
      accent: "text-cyan-400",
      bgGradient: "from-cyan-500/10 to-cyan-600/5",
      link: `${prefix}/live`,
    },
    {
      id: "compliance",
      icon: "📋",
      title: isDE ? "Compliance-Status" : "Compliance Status",
      items: [
        isDE ? "DSGVO Art. 25 & 32 umgesetzt" : "GDPR Art. 25 & 32 implemented",
        isDE ? "Alle Daten in Frankfurt (EU)" : "All data in Frankfurt (EU)",
        isDE ? "SOC 2 Type II: Q3 2026" : "SOC 2 Type II: Q3 2026",
        isDE ? "ISO 27001: H2 2026" : "ISO 27001: H2 2026",
      ],
      accent: "text-violet-400",
      bgGradient: "from-violet-500/10 to-violet-600/5",
    },
    {
      id: "support",
      icon: "⏱️",
      title: isDE ? "Garantierte Response" : "Guaranteed Response",
      items: [
        isDE ? "< 60s vom Kauf bis Access" : "< 60s from purchase to access",
        isDE ? "99,98% Uptime SLA" : "99.98% Uptime SLA",
        isDE ? "24/7 Incident Support" : "24/7 Incident Support",
        isDE ? "Deutschland-Support" : "Germany-based support",
      ],
      accent: "text-orange-400",
      bgGradient: "from-orange-500/10 to-orange-600/5",
    },
  ]

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
              {isDE ? "Vertrauenswürdigkeit ohne Hype" : "Trust Without Hype"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {isDE ? "Warum Ingenieure ClawGuru vertrauen" : "Why Engineers Trust ClawGuru"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {isDE
              ? "Keine Fake-Logos, keine Storytelling. Nur echte Proof: EU-gehostet, DSGVO umgesetzt, Zertifizierungen in Vorbereitung."
              : "No fake logos, no storytelling. Just real proof: EU-hosted, GDPR implemented, certifications in progress."}
          </p>
        </motion.div>

        {/* 5 Proof Blocks */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {proofBlocks.map((block) => (
            <motion.a
              key={block.id}
              href={block.link || "#"}
              target={block.link?.startsWith("http") ? "_blank" : undefined}
              rel={block.link?.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`rounded-2xl border border-white/10 bg-gradient-to-br ${block.bgGradient} p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 group cursor-pointer`}
            >
              <div className={`text-3xl mb-3 group-hover:scale-110 transition-transform`}>
                {block.icon}
              </div>
              <div className={`font-bold text-sm ${block.accent} mb-3`}>{block.title}</div>
              <ul className="space-y-2">
                {block.items.map((item, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className={`shrink-0 mt-1 ${block.accent}`}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.a>
          ))}
        </motion.div>

        {/* Live Demo CTA — HeroSecurityCheck embedded */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 p-8 md:p-12 backdrop-blur-sm text-center"
        >
          <div className="mb-4">
            <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
                {isDE ? "Jetzt testen" : "Try Now"}
              </span>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
            {isDE ? "Scan dein Stack – 30 Sekunden, kostenlos" : "Scan your stack – 30 seconds, free"}
          </h3>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            {isDE
              ? "Sehe selbst, was ClawGuru erkennt. Keine Anmeldung nötig. Die Sicherheitsbewertung ist sofort da."
              : "See for yourself what ClawGuru finds. No signup required. Security score is instant."}
          </p>
          <a
            href={`${prefix}/check`}
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-105"
          >
            {isDE ? "🔍 Jetzt Scannen" : "🔍 Scan Now"}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
