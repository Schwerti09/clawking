"use client"

import { motion, easeOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

type Props = { prefix?: string; dict?: Record<string, string> }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function ToolsSection({ prefix = "", dict = {} }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const tools = [
    {
      id: "summon",
      emoji: "🔴",
      title: dict.tools_t1_title || "Summon",
      desc: dict.tools_t1_desc || "Describe your problem – ClawGuru finds matching runbooks and starts execution.",
      preview: "$ summon 'SSL cert expires in 7 days'\n→ Found 12 matching runbooks\n→ Starting renewal flow...",
      accent: "text-red-400",
      accentGlow: "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
      href: `${prefix}/summon`,
    },
    {
      id: "intel",
      emoji: "🧠",
      title: dict.tools_t2_title || "Intel Feed",
      desc: dict.tools_t2_desc || "Real-time threat intelligence. Automated risk analysis for your infrastructure.",
      preview: "CVE-2025-1234: Critical RCE in Log4j\nAffects: 243 of your instances\nAction: Apply patch 2.17.1",
      accent: "text-amber-400",
      accentGlow: "group-hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]",
      href: `${prefix}/intel`,
    },
    {
      id: "opswall",
      emoji: "🛡️",
      title: dict.tools_t3_title || "OpsWall",
      desc: dict.tools_t3_desc || "Live monitoring of your systems. Detection of anomalies and threats in real time.",
      preview: "⚠️  Unusual SSH activity from 192.168.1.x\n🔴 Database query timeout detected\n✅ DDoS mitigation active",
      accent: "text-cyan-400",
      accentGlow: "group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]",
      href: `${prefix}/live`,
    },
    {
      id: "threatmap",
      emoji: "🗺️",
      title: dict.tools_t4_title || "ThreatMap",
      desc: dict.tools_t4_desc || "Visualized attack surface. See where your vulnerabilities are – before attackers do.",
      preview: "Attack Surface: 47 entry points\nCritical: 3 | High: 12 | Medium: 18\nRecommended: Focus on tier 1-2",
      accent: "text-purple-400",
      accentGlow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
      href: `${prefix}/threatmap`,
    },
    {
      id: "perfection",
      emoji: "⚡",
      title: dict.tools_t5_title || "Perfection",
      desc: dict.tools_t5_desc || "Automated configuration checks. CIS Benchmarks, STIG, BSI – instantly on your stack.",
      preview: "CIS Benchmark: 76/100 Pass Rate\nFailed: SSH root login enabled\n→ Fixing with Ansible...",
      accent: "text-yellow-400",
      accentGlow: "group-hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]",
      href: `${prefix}/perfection`,
    },
    {
      id: "neuro",
      emoji: "🧬",
      title: dict.tools_t6_title || "Neuro",
      desc: dict.tools_t6_desc || "AI-powered vulnerability analysis. Proactive identification of risks in code and infrastructure.",
      preview: "Scanning 3.2M lines of code...\n⚠️  SQL injection risk in /api/search\n🔍 Severity: High | Fix available",
      accent: "text-emerald-400",
      accentGlow: "group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
      href: `${prefix}/neuro`,
    },
  ]

  return (
    <section ref={ref} className="relative py-20 overflow-hidden" style={{ background: "var(--surface-1)" }}>
      {/* Animated neural grid background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="w-full h-full" style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header with stats */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {dict.tools_badge || "Live Tools & Automation"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            {dict.tools_title || "Tools for real security operations"}
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            {dict.tools_sub || "From incident response to hardening to compliance – everything in one platform."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <span className="text-indigo-400">◆</span> 15 Live Security Tools
            </span>
            <span className="flex items-center gap-1">
              <span className="text-indigo-400">◆</span> Zero Setup Required
            </span>
            <span className="flex items-center gap-1">
              <span className="text-indigo-400">◆</span> Free to Start
            </span>
          </div>
        </motion.div>

        {/* Tools grid with stagger */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {tools.map((t) => (
            <motion.a
              key={t.id}
              href={t.href}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group block rounded-2xl p-6 border border-white/10 backdrop-blur-sm transition-all duration-300 ${t.accentGlow}`}
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {/* Emoji and title */}
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  className="text-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  {t.emoji}
                </motion.div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold text-white mb-1 group-hover:${t.accent} transition-colors`}>
                    {t.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-mono mb-2 opacity-60">
                    API • Live • Real-time
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{t.desc}</p>

              {/* Hover preview – slides in */}
              <motion.div
                className="overflow-hidden rounded-lg bg-black/40 border border-white/5"
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <pre className={`text-xs font-mono p-3 text-green-300 whitespace-pre-wrap break-words max-h-16 overflow-hidden ${t.accent}`}>
                  {t.preview}
                </pre>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}