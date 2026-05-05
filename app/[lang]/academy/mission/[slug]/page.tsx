import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { MissionRunner } from "@/components/academy/MissionRunner"
import { getMission } from "@/lib/academy/missions"
import { buildAuthoredArticleSchema } from "@/lib/seo/author"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"

export const revalidate = 3600
export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  // Claude works on Academy - leave disabled
  return []
}

export async function generateMetadata(
  { params }: { params: { lang: string; slug: string } }
): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const mission = getMission(params.slug)
  if (!mission) return { title: "Mission not found | ClawGuru Academy" }

  const title = `${mission.title} — Mission | ClawGuru Academy ∞`
  const pageUrl = `${SITE_URL}/${locale}/academy/mission/${params.slug}`
  const datePublished = "2026-04-22"
  const dateModified = "2026-05-05"

  const articleSchema = buildAuthoredArticleSchema({
    headline: title,
    description: mission.brief,
    url: pageUrl,
    datePublished,
    dateModified,
    inLanguage: locale,
    articleType: "TechArticle",
  })

  return {
    title,
    description: mission.brief,
    openGraph: { title, description: mission.brief, url: pageUrl, type: "article" },
    alternates: buildLocalizedAlternates(locale, `/academy/mission/${params.slug}`),
    robots: "index, follow",
    other: {
      "article:published_time": `${datePublished}T00:00:00Z`,
      "article:modified_time": `${dateModified}T00:00:00Z`,
      "article:author": "Schwerti",
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}

export default function MissionPage({ params }: { params: { lang: string; slug: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const mission = getMission(params.slug)
  if (!mission) notFound()

  return (
    <div className="min-h-screen bg-[#05070a] text-gray-100">
      <MissionRunner missionSlug={params.slug} backHref={`/${locale}/academy`} locale={locale} />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AuthorBox locale={locale} variant="compact" />
        <LastUpdated date="2026-05-05" publishedDate="2026-04-22" locale={locale} showPublished />
      </div>
    </div>
  )
}
