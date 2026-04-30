import type { Metadata } from "next"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { pick } from "@/lib/i18n-pick"
import AiIncidentResponseClient from "./client"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const PATH = "/moltbot/ai-incident-response"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const isDE = locale === "de"
  const title = pick(isDE, "AI Incident Response: Playbook für KI-Agent-Sicherheitsvorfälle | ClawGuru", "AI Incident Response: Playbook for AI Agent Security Incidents | ClawGuru")
  const description = pick(isDE, "AI-spezifisches Incident-Response-Playbook: Prompt-Injection-Angriffe, kompromittierte Agenten, Datenlecks durch RAG, Model-Poisoning. Detection, Containment, Recovery und Post-Mortem mit Moltbot.", "AI-specific incident response playbook: prompt injection attacks, compromised agents, RAG data leaks, model poisoning. Detection, containment, recovery and post-mortem with Moltbot.")
  return {
    title, description,
    keywords: ["ai incident response", "llm incident response", "ai security incident", "prompt injection incident", "moltbot incident response", "ai agent compromise"],
    authors: [{ name: "ClawGuru Security Team" }],
    openGraph: { title, description, type: "article", url: `${SITE_URL}/${locale}${PATH}`, images: ["/og-image.png"] },
    alternates: buildLocalizedAlternates(locale, PATH),
    robots: "index, follow",
  }
}

export default function AiIncidentResponsePage({ params }: { params: { lang: string } }) {
  return <AiIncidentResponseClient params={params} />
}
