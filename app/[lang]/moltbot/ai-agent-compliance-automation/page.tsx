import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import PageClient from "./PageClient"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-compliance-automation"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Compliance Automation: Automatisierte Compliance für AI-Agents | ClawGuru", "AI Agent Compliance Automation: Automated Compliance for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Compliance Automation für Moltbot. GDPR, EU AI Act, SOC 2, ISO 27001 Compliance automatisiert für AI-Agent-Systeme. Policy as Code und kontinuierliche Compliance.", "AI agent compliance automation for Moltbot. GDPR, EU AI Act, SOC 2, ISO 27001 compliance automated for AI agent systems. Policy as code and continuous compliance.")
  return {
    title, description,
    keywords: ["ai agent compliance automation", "gdpr ai", "eu ai act compliance", "soc 2", "iso 27001", "policy as code", "moltbot security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentComplianceAutomationPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  return <PageClient locale={locale} />
}
