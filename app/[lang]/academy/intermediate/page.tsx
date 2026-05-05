import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { TRACKS, getHubContent } from "@/lib/academy/hubContent"
import { TrackShowcase } from "@/components/academy/TrackShowcase"
import { MissionList } from "@/components/academy/MissionList"
import { buildAuthoredArticleSchema } from "@/lib/seo/author"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const TRACK_SLUG = "intermediate"

export const revalidate = 3600
export const dynamic = "force-static"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const copy = getHubContent(locale).tracks[TRACK_SLUG]
  const pageUrl = `${SITE_URL}/${locale}/academy/${TRACK_SLUG}`
  const title = `${copy?.title ?? "Stack Hardening"} — Academy ∞ | ClawGuru`
  const datePublished = "2026-04-22"
  const dateModified = "2026-05-05"

  const articleSchema = buildAuthoredArticleSchema({
    headline: title,
    description: copy?.tagline,
    url: pageUrl,
    datePublished,
    dateModified,
    inLanguage: locale,
    articleType: "TechArticle",
  })

  return {
    title,
    description: copy?.tagline,
    openGraph: { title, description: copy?.tagline, url: pageUrl, type: "website" },
    alternates: buildLocalizedAlternates(locale, `/academy/${TRACK_SLUG}`),
    robots: "index, follow",
    other: {
      "article:published_time": `${datePublished}T00:00:00Z`,
      "article:modified_time": `${dateModified}T00:00:00Z`,
      "article:author": "Schwerti",
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}

export default function StackHardeningTrackPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const track = TRACKS.find((t) => t.slug === TRACK_SLUG)
  if (!track) notFound()

  return (
    <div className="min-h-screen bg-[#05070a] text-gray-100">
      <TrackShowcase
        locale={locale}
        track={track}
        missionsSlot={<MissionList locale={locale} trackSlug={TRACK_SLUG} accent={track.accent} />}
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AuthorBox locale={locale} variant="compact" />
        <LastUpdated date="2026-05-05" publishedDate="2026-04-22" locale={locale} showPublished />
      </div>
    </div>
  )
}
