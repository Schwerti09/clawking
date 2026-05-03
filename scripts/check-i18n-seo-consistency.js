const fs = require("node:fs")
const path = require("node:path")
const {
  QUALITY_LOCALES_REGEX,
  SUPPORTED_LOCALES_REGEX,
  parseLocaleArrayLiteral,
  parseSitemapLocales,
  compareLocaleSets,
} = require("../lib/audit/i18n-seo-consistency")

const ROOT = process.cwd()
const I18N_PATH = path.join(ROOT, "lib", "i18n.ts")
const NETLIFY_BUILD_ENV_PATH = path.join(ROOT, "scripts", "netlify-build-env.sh")

function main() {
  const i18nSource = fs.readFileSync(I18N_PATH, "utf8")
  const netlifySource = fs.readFileSync(NETLIFY_BUILD_ENV_PATH, "utf8")

  const qualityLocales = parseLocaleArrayLiteral(i18nSource, QUALITY_LOCALES_REGEX)
  const supportedLocales = parseLocaleArrayLiteral(i18nSource, SUPPORTED_LOCALES_REGEX)
  const sitemapLocales = parseSitemapLocales(netlifySource)

  const qualityVsSitemap = compareLocaleSets(qualityLocales, sitemapLocales)

  const expectedSupportedCount = Number(process.env.EXPECTED_SUPPORTED_LOCALES || 0)
  const expectedQualityCount = Number(process.env.EXPECTED_QUALITY_LOCALES || 32)

  const errors = []

  if (expectedSupportedCount > 0 && supportedLocales.length !== expectedSupportedCount) {
    errors.push(`SUPPORTED_LOCALES count mismatch: expected ${expectedSupportedCount}, got ${supportedLocales.length}`)
  }

  if (qualityLocales.length !== expectedQualityCount) {
    errors.push(`QUALITY_LOCALES count mismatch: expected ${expectedQualityCount}, got ${qualityLocales.length}`)
  }

  if (!qualityVsSitemap.ok) {
    if (qualityVsSitemap.missing.length) {
      errors.push(`SITEMAP_100K_LOCALES missing QUALITY entries: ${qualityVsSitemap.missing.join(", ")}`)
    }
    if (qualityVsSitemap.extra.length) {
      errors.push(`SITEMAP_100K_LOCALES has extra non-QUALITY entries: ${qualityVsSitemap.extra.join(", ")}`)
    }
  }

  if (errors.length > 0) {
    console.error("[check:i18n-seo-consistency] FAILED")
    for (const error of errors) console.error(`- ${error}`)
    process.exit(1)
  }

  console.log("[check:i18n-seo-consistency] OK")
  console.log(`- SUPPORTED_LOCALES: ${supportedLocales.length}`)
  console.log(`- QUALITY_LOCALES: ${qualityLocales.length}`)
  console.log(`- SITEMAP_100K_LOCALES: ${sitemapLocales.length}`)
}

main()
