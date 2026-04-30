import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import PageClient from "./PageClient"

interface PageProps { params: { lang: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-agent-context-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const pageUrl = `${SITE_URL}/${locale}${PATH}`
  const isDE = locale === "de"
  const title = pick(isDE, "AI Agent Context Security: Kontext-Sicherheit für AI-Agents | ClawGuru", "AI Agent Context Security: Context Security for AI Agents | ClawGuru")
  const description = pick(isDE, "AI Agent Context Security für Moltbot. Context Window Isolation, Prompt Injection Prevention, Cross-Session Contamination und Kontext-Manipulation verhindern.", "AI agent context security for Moltbot. Context window isolation, prompt injection prevention, cross-session contamination and context manipulation prevention.")
  return {
    title, description,
    keywords: ["ai agent context security", "context window isolation", "prompt injection", "cross session contamination", "context manipulation", "moltbot security", "context security 2026"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: pageUrl, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow"
  }
}

export default function AIAgentContextSecurityPage({ params }: PageProps) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()
  return <PageClient locale={locale} />
}
