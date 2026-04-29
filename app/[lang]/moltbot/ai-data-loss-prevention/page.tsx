import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import AiDataLossPreventionClient from "./client"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-data-loss-prevention"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Data Loss Prevention: Datenverlust durch LLMs verhindern | ClawGuru Moltbot", "AI Data Loss Prevention: Prevent Data Leakage via LLMs | ClawGuru Moltbot")
  const description = pick(isDE, "KI-DLP für Moltbot: PII-Erkennung in Prompts, Secrets-Scanning vor LLM-Übermittlung, Output-Exfiltrations-Erkennung und GDPR-konforme Datenmaskierung für LLM-Systeme.", "AI DLP for Moltbot: PII detection in prompts, secrets scanning before LLM submission, output exfiltration detection and GDPR-compliant data masking for LLM systems.")
  return {
    title, description,
    keywords: ["ai data loss prevention", "llm dlp", "ai dlp moltbot", "pii detection llm", "secrets scanning llm", "ai data exfiltration prevention"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function AiDataLossPreventionPage({ params }: { params: { lang: string } }) {
  return <AiDataLossPreventionClient params={params} />
}
