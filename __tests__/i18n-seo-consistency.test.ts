const {
  QUALITY_LOCALES_REGEX,
  parseLocaleArrayLiteral,
  parseSitemapLocales,
  compareLocaleSets,
} = require("@/lib/audit/i18n-seo-consistency")

describe("i18n/SEO consistency helpers", () => {
  it("parses QUALITY_LOCALES from i18n source", () => {
    const source = `export const QUALITY_LOCALES: Locale[] = ["de", "en", "fr"]`
    expect(parseLocaleArrayLiteral(source, QUALITY_LOCALES_REGEX)).toEqual(["de", "en", "fr"])
  })

  it("parses SITEMAP_100K_LOCALES from shell export", () => {
    const source = `export SITEMAP_100K_LOCALES="de,en,fr"`
    expect(parseSitemapLocales(source)).toEqual(["de", "en", "fr"])
  })

  it("compares locale sets and reports missing/extra values", () => {
    const result = compareLocaleSets(["de", "en"], ["de", "fr"])
    expect(result.ok).toBe(false)
    expect(result.missing).toEqual(["en"])
    expect(result.extra).toEqual(["fr"])
  })
})
