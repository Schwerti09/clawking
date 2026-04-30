import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import AiModelVersioningSecurityClient from "./client"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-model-versioning-security"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Model Versioning Security: Sichere Modell-Lifecycle-Verwaltung | ClawGuru Moltbot", "AI Model Versioning Security: Secure Model Lifecycle Management | ClawGuru Moltbot")
  const description = pick(isDE, "Sichere KI-Modell-Versionierung: Modell-Signierung mit Cosign, SHA-256-Verifikation, Rollback-Strategie, Canary-Deployments für LLMs und Schutz vor Model-Substitution-Angriffen.", "Secure AI model versioning: model signing with Cosign, SHA-256 verification, rollback strategy, canary deployments for LLMs and protection against model substitution attacks.")
  return {
    title, description,
    keywords: ["ai model versioning security", "llm model signing", "model integrity verification", "ai model lifecycle", "model substitution attack", "cosign ai model"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function AiModelVersioningSecurityPage({ params }: { params: { lang: string } }) {
  return <AiModelVersioningSecurityClient params={params} />
}
