// Hub page: /[lang]/runbooks/kubernetes
// Strong hub for Kubernetes runbooks

import Container from "@/components/shared/Container"
import { type Locale, SUPPORTED_LOCALES, buildLocalizedAlternates } from "@/lib/i18n"
import Link from "next/link"
import { buildAuthoredArticleSchema } from "@/lib/seo/author"
import AuthorBox from "@/components/seo/AuthorBox"
import LastUpdated from "@/components/seo/LastUpdated"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata(props: { params: { lang: string } }) {
  const params = props.params;
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://clawguru.org"
  const pageUrl = `${base}/${locale}/runbooks/kubernetes`
  const title = `Kubernetes Runbooks – RBAC, Networking, Security 2026 | ClawGuru`
  const description = `Alle ClawGuru Kubernetes-Runbooks: RBAC, NetworkPolicy, Pod Security, Incident Response, Monitoring. Ops-Guides für K8s 2026.`
  const datePublished = "2026-04-22"
  const dateModified = "2026-05-05"

  const articleSchema = buildAuthoredArticleSchema({
    headline: title,
    description,
    url: pageUrl,
    datePublished,
    dateModified,
    inLanguage: locale,
    articleType: "TechArticle",
  })

  return {
    title,
    description,
    alternates: buildLocalizedAlternates(locale, "/runbooks/kubernetes"),
    openGraph: { title, description, url: pageUrl, type: "article" },
    other: {
      "article:published_time": `${datePublished}T00:00:00Z`,
      "article:modified_time": `${dateModified}T00:00:00Z`,
      "article:author": "Schwerti",
      "application/ld+json": JSON.stringify(articleSchema),
    },
  }
}

export default async function KubernetesHubPage(props: { params: { lang: string } }) {
  const params = props.params;
  const { materializedRunbooks } = await import("@/lib/pseo")
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale) ? params.lang : "de") as Locale

  const { getRunbook } = await import("@/lib/pseo")
  const k8sRunbooks = materializedRunbooks()
    .filter((r) => r.tags.includes("provider:kubernetes"))
    .filter((r) => getRunbook(r.slug) !== null)
    .slice(0, 80)

  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kubernetes Runbooks – ClawGuru",
    description: "Kubernetes Security, Networking und Ops-Runbooks",
    url: `/${locale}/runbooks/kubernetes`,
    hasPart: k8sRunbooks.slice(0, 20).map((r) => ({
      "@type": "HowTo",
      name: r.title,
      url: `/${locale}/runbook/${r.slug}`,
    })),
  }

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
      />
      <div className="py-16 max-w-5xl mx-auto">
        <div className="mb-2 text-xs text-gray-400 uppercase tracking-widest">Hub · Kubernetes</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4">⎈ Kubernetes Runbooks</h1>
        <p id="direct-answer" className="text-gray-300 text-lg mb-10 max-w-2xl border-l-4 border-brand-cyan pl-4">
          RBAC, NetworkPolicy, PodSecurity, Incident Response und Monitoring für Kubernetes – praxiserprobte Runbooks für Cluster-Admins und Ops-Teams in 2026.
        </p>

        {/* Hub navigation */}
        <div className="flex gap-3 mb-10 flex-wrap">
          <Link href={`/${locale}/runbooks/cloud`} className="px-4 py-2 rounded-xl border border-gray-700 text-sm hover:border-brand-cyan/50">Cloud</Link>
          <Link href={`/${locale}/runbooks/docker`} className="px-4 py-2 rounded-xl border border-gray-700 text-sm hover:border-brand-cyan/50">Docker</Link>
          <Link href={`/${locale}/runbooks/security`} className="px-4 py-2 rounded-xl border border-gray-700 text-sm hover:border-brand-cyan/50">Security</Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {k8sRunbooks.map((r) => (
            <Link
              key={r.slug}
              href={`/${locale}/runbook/${r.slug}`}
              className="p-4 rounded-xl border border-gray-800 hover:border-brand-cyan/40 text-sm"
            >
              <div className="font-bold text-white mb-1">{r.title}</div>
              <div className="text-gray-400 text-xs line-clamp-2">{r.summary}</div>
              <div className="mt-2 text-xs text-brand-cyan">Score: {r.clawScore}</div>
            </Link>
          ))}
        </div>

        {k8sRunbooks.length === 0 && (
          <p className="text-gray-400">Keine Kubernetes-Runbooks gefunden.</p>
        )}

        {/* E-E-A-T: AuthorBox and LastUpdated */}
        <div className="mt-12 max-w-5xl mx-auto">
          <AuthorBox locale={locale} variant="compact" />
          <LastUpdated date="2026-05-05" publishedDate="2026-04-22" locale={locale} showPublished />
        </div>
      </div>
    </Container>
  )
}
