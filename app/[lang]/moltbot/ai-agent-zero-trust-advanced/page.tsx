import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import AIAgentZeroTrustAdvancedClient from "./client"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-zero-trust-advanced"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Zero Trust Advanced: Fortgeschrittene Zero Trust für AI-Agents | ClawGuru", "AI Agent Zero Trust Advanced: Advanced Zero Trust for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Zero Trust Advanced für Moltbot-Deployments. Never Trust, Always Verify für AI-Agents. Identity Verification, Least Privilege, Continuous Validation und Micro-Segmentation. Mit Moltbot automatisierbar.", "AI agent zero trust advanced for Moltbot deployments. Never trust, always verify for AI agents. Identity verification, least privilege, continuous validation and micro-segmentation. Automatable with Moltbot.")
  return {
    title,
    description,
    keywords: [
      "ai agent zero trust", "never trust always verify", "identity verification",
      "least privilege", "continuous validation", "micro segmentation",
      "moltbot security", "ai agent zero trust 2026",
      "security check", "runbooks", "openclaw"
    ],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      images: ["/og-image.png"]
    },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentZeroTrustAdvancedPage({ params }: PageProps) {
  return <AIAgentZeroTrustAdvancedClient params={params} />
}
