const QUALITY_LOCALES_REGEX = /export\s+const\s+QUALITY_LOCALES\s*:\s*Locale\[\]\s*=\s*\[([\s\S]*?)\]/m
const SUPPORTED_LOCALES_REGEX = /export\s+const\s+SUPPORTED_LOCALES\s*:\s*Locale\[\]\s*=\s*\[([\s\S]*?)\]/m
const SITEMAP_EXPORT_REGEX = /export\s+SITEMAP_100K_LOCALES\s*=\s*"([^"]*)"/

function parseLocaleArrayLiteral(content, regex) {
  const match = content.match(regex)
  if (!match) return []
  return (match[1].match(/"([a-z]{2}(?:-[a-z]{2})?)"/gi) || [])
    .map((part) => part.replace(/"/g, "").toLowerCase())
}

function parseSitemapLocales(shellContent) {
  const match = shellContent.match(SITEMAP_EXPORT_REGEX)
  if (!match) return []
  return match[1]
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
}

function compareLocaleSets(expected, actual) {
  const expectedSet = new Set(expected)
  const actualSet = new Set(actual)

  const missing = expected.filter((locale) => !actualSet.has(locale))
  const extra = actual.filter((locale) => !expectedSet.has(locale))

  return {
    ok: missing.length === 0 && extra.length === 0,
    missing,
    extra,
  }
}

module.exports = {
  QUALITY_LOCALES_REGEX,
  SUPPORTED_LOCALES_REGEX,
  parseLocaleArrayLiteral,
  parseSitemapLocales,
  compareLocaleSets,
}
