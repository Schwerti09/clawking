import type { Metadata } from "next"
import Link from "next/link"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { HeaderDoctorClient } from "@/components/tools/HeaderDoctorClient"
import { getTool } from "@/lib/tools"
import { buildAuthoredArticleSchema, buildPersonSchema, buildOrganizationSchema } from "@/lib/seo/author"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
const SLUG = "header-doctor"

export const revalidate = 3600
export const dynamic = "force-static"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const t = getTool(SLUG)
  const pageUrl = `${SITE_URL}/${locale}/tools/${SLUG}`
  const title = `${t?.name ?? "Header Doctor"} — Free security-header scanner | ClawGuru Arsenal`
  const description = t?.description
  const datePublished = "2026-04-22"
  const dateModified = "2026-05-05"

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t?.name,
    description,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    url: pageUrl,
    author: buildPersonSchema(),
    publisher: buildOrganizationSchema(),
    datePublished,
    dateModified,
  }

  return {
    title,
    description,
    openGraph: { title, description, url: pageUrl, type: "website" },
    alternates: buildLocalizedAlternates(locale, `/tools/${SLUG}`),
    robots: "index, follow",
    other: {
      "application/ld+json": JSON.stringify(softwareSchema),
      "article:published_time": `${datePublished}T00:00:00Z`,
      "article:modified_time": `${dateModified}T00:00:00Z`,
      "article:author": "Schwerti",
    },
  }
}

export default function HeaderDoctorPage({ params }: { params: { lang: string } }) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  return (
    <div className="min-h-screen bg-[#05070a] text-gray-100">
      <section className="border-b border-white/5 py-14 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.1),_transparent_60%)]" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href={`/${locale}/tools`} className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 mb-5">← The Arsenal</Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-300 text-[10px] font-mono tracking-[0.25em] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              TOOL · LIVE
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">Header Doctor 🩺</h1>
            <p className="text-base md:text-xl text-emerald-200/80 mb-3">Security headers graded, with copy-paste fixes.</p>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              Paste any public URL. We fetch and evaluate HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and more. Missing or weak headers ship with a ready-to-paste nginx/apache/express snippet.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <HeaderDoctorClient />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <AuthorBox locale={locale} variant="compact" />
        <LastUpdated date="2026-05-05" publishedDate="2026-04-22" locale={locale} showPublished />
      </div>
    </div>
  )
}
