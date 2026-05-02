'use client'

// NEXT-LEVEL UPGRADE 2026: Language Switcher with persistent cookie + URL prefix
// Supports all locales with proper flag/name display and RTL indication.

import { useCallback, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { SUPPORTED_LOCALES, type Locale, isRTL } from "@/lib/i18n"

type LocaleMeta = { flag: string; name: string; native: string }

const LOCALE_META: Partial<Record<Locale, LocaleMeta>> = {
  // ── Core (previously supported) ──────────────────────────────────────────
  de:  { flag: "🇩🇪", name: "Deutsch",     native: "Deutsch" },
  en:  { flag: "🇺🇸", name: "English",     native: "English" },
  es:  { flag: "🇪🇸", name: "Spanish",     native: "Español" },
  fr:  { flag: "🇫🇷", name: "French",      native: "Français" },
  pt:  { flag: "🇧🇷", name: "Portuguese",  native: "Português" },
  it:  { flag: "🇮🇹", name: "Italian",     native: "Italiano" },
  ru:  { flag: "🇷🇺", name: "Russian",     native: "Русский" },
  zh:  { flag: "🇨🇳", name: "Chinese",     native: "中文" },
  ja:  { flag: "🇯🇵", name: "Japanese",    native: "日本語" },
  ar:  { flag: "🇸🇦", name: "Arabic",      native: "العربية" },
  nl:  { flag: "🇳🇱", name: "Dutch",       native: "Nederlands" },
  hi:  { flag: "🇮🇳", name: "Hindi",       native: "हिन्दी" },
  tr:  { flag: "🇹🇷", name: "Turkish",     native: "Türkçe" },
  pl:  { flag: "🇵🇱", name: "Polish",      native: "Polski" },
  ko:  { flag: "🇰🇷", name: "Korean",      native: "한국어" },
  af:  { flag: "🇿🇦", name: "Afrikaans",   native: "Afrikaans" },
  // ── Round 14 quality locales ─────────────────────────────────────────────
  he:  { flag: "🇮🇱", name: "Hebrew",      native: "עברית" },
  uk:  { flag: "🇺🇦", name: "Ukrainian",   native: "Українська" },
  vi:  { flag: "🇻🇳", name: "Vietnamese",  native: "Tiếng Việt" },
  id:  { flag: "🇮🇩", name: "Indonesian",  native: "Bahasa Indonesia" },
  sv:  { flag: "🇸🇪", name: "Swedish",     native: "Svenska" },
  fi:  { flag: "🇫🇮", name: "Finnish",     native: "Suomi" },
  ro:  { flag: "🇷🇴", name: "Romanian",    native: "Română" },
  cs:  { flag: "🇨🇿", name: "Czech",       native: "Čeština" },
  th:  { flag: "🇹🇭", name: "Thai",        native: "ภาษาไทย" },
  bn:  { flag: "🇧🇩", name: "Bengali",     native: "বাংলা" },
  el:  { flag: "🇬🇷", name: "Greek",       native: "Ελληνικά" },
  hu:  { flag: "🇭🇺", name: "Hungarian",   native: "Magyar" },
  da:  { flag: "🇩🇰", name: "Danish",      native: "Dansk" },
  no:  { flag: "🇳🇴", name: "Norwegian",   native: "Norsk" },
  ms:  { flag: "🇲🇾", name: "Malay",       native: "Bahasa Melayu" },
  bg:  { flag: "🇧🇬", name: "Bulgarian",   native: "Български" },
  // ── Extended locales (structural, noindex until translated) ──────────────
  sk:  { flag: "🇸🇰", name: "Slovak",      native: "Slovenčina" },
  sl:  { flag: "🇸🇮", name: "Slovenian",   native: "Slovenščina" },
  hr:  { flag: "🇭🇷", name: "Croatian",    native: "Hrvatski" },
  sr:  { flag: "🇷🇸", name: "Serbian",     native: "Srpski" },
  ca:  { flag: "🇪🇸", name: "Catalan",     native: "Català" },
  eu:  { flag: "🇪🇸", name: "Basque",      native: "Euskara" },
  gl:  { flag: "🇪🇸", name: "Galician",    native: "Galego" },
  lt:  { flag: "🇱🇹", name: "Lithuanian",  native: "Lietuvių" },
  lv:  { flag: "🇱🇻", name: "Latvian",     native: "Latviešu" },
  et:  { flag: "🇪🇪", name: "Estonian",    native: "Eesti" },
  fa:  { flag: "🇮🇷", name: "Persian",     native: "فارسی" },
  ur:  { flag: "🇵🇰", name: "Urdu",        native: "اردو" },
  sw:  { flag: "🇰🇪", name: "Swahili",     native: "Kiswahili" },
  am:  { flag: "🇪🇹", name: "Amharic",     native: "አማርኛ" },
  my:  { flag: "🇲🇲", name: "Burmese",     native: "မြန်မာဘာသာ" },
  km:  { flag: "🇰🇭", name: "Khmer",       native: "ភាសាខ្មែរ" },
  lo:  { flag: "🇱🇦", name: "Lao",         native: "ລາວ" },
  ne:  { flag: "🇳🇵", name: "Nepali",      native: "नेपाली" },
  si:  { flag: "🇱🇰", name: "Sinhala",     native: "සිංහල" },
  ka:  { flag: "🇬🇪", name: "Georgian",    native: "ქართული" },
  hy:  { flag: "🇦🇲", name: "Armenian",    native: "Հայերեն" },
  az:  { flag: "🇦🇿", name: "Azerbaijani", native: "Azərbaycan" },
  kk:  { flag: "🇰🇿", name: "Kazakh",      native: "Қазақша" },
  uz:  { flag: "🇺🇿", name: "Uzbek",       native: "O'zbek" },
  mn:  { flag: "🇲🇳", name: "Mongolian",   native: "Монгол" },
  is:  { flag: "🇮🇸", name: "Icelandic",   native: "Íslenska" },
  mt:  { flag: "🇲🇹", name: "Maltese",     native: "Malti" },
  sq:  { flag: "🇦🇱", name: "Albanian",    native: "Shqip" },
  mk:  { flag: "🇲🇰", name: "Macedonian",  native: "Македонски" },
  bs:  { flag: "🇧🇦", name: "Bosnian",     native: "Bosanski" },
  cy:  { flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", name: "Welsh",       native: "Cymraeg" },
  ga:  { flag: "🇮🇪", name: "Irish",       native: "Gaeilge" },
  fil: { flag: "🇵🇭", name: "Filipino",    native: "Filipino" },
  ta:  { flag: "🇮🇳", name: "Tamil",       native: "தமிழ்" },
  te:  { flag: "🇮🇳", name: "Telugu",      native: "తెలుగు" },
  mr:  { flag: "🇮🇳", name: "Marathi",     native: "मराठी" },
  gu:  { flag: "🇮🇳", name: "Gujarati",    native: "ગુજરાતી" },
  kn:  { flag: "🇮🇳", name: "Kannada",     native: "ಕನ್ನಡ" },
  ml:  { flag: "🇮🇳", name: "Malayalam",   native: "മലയാളം" },
  pa:  { flag: "🇮🇳", name: "Punjabi",     native: "ਪੰਜਾਬੀ" },
  or:  { flag: "🇮🇳", name: "Odia",        native: "ଓଡ଼ିଆ" },
  as:  { flag: "🇮🇳", name: "Assamese",    native: "অসমীয়া" },
  jv:  { flag: "🇮🇩", name: "Javanese",    native: "Basa Jawa" },
  su:  { flag: "🇮🇩", name: "Sundanese",   native: "Basa Sunda" },
  yo:  { flag: "🇳🇬", name: "Yoruba",      native: "Yorùbá" },
  ig:  { flag: "🇳🇬", name: "Igbo",        native: "Igbo" },
  ha:  { flag: "🇳🇬", name: "Hausa",       native: "Hausa" },
  zu:  { flag: "🇿🇦", name: "Zulu",        native: "isiZulu" },
  rw:  { flag: "🇷🇼", name: "Kinyarwanda", native: "Kinyarwanda" },
  so:  { flag: "🇸🇴", name: "Somali",      native: "Soomaali" },
  ti:  { flag: "🇪🇷", name: "Tigrinya",    native: "ትግርኛ" },
  ky:  { flag: "🇰🇬", name: "Kyrgyz",      native: "Кыргызча" },
  tg:  { flag: "🇹🇯", name: "Tajik",       native: "Тоҷикӣ" },
  tk:  { flag: "🇹🇲", name: "Turkmen",     native: "Türkmen" },
  mi:  { flag: "🇳🇿", name: "Māori",       native: "Te Reo Māori" },
  sm:  { flag: "🇼🇸", name: "Samoan",      native: "Gagana Samoa" },
  haw: { flag: "🇺🇸", name: "Hawaiian",    native: "ʻŌlelo Hawaiʻi" },
  ps:  { flag: "🇦🇫", name: "Pashto",      native: "پښتو" },
  lb:  { flag: "🇱🇺", name: "Luxembourgish", native: "Lëtzebuergesch" },
  fo:  { flag: "🇫🇴", name: "Faroese",     native: "Føroyskt" },
  br:  { flag: "🇫🇷", name: "Breton",      native: "Brezhoneg" },
  oc:  { flag: "🇫🇷", name: "Occitan",     native: "Occitan" },
  co:  { flag: "🇫🇷", name: "Corsican",    native: "Corsu" },
  tt:  { flag: "🇷🇺", name: "Tatar",       native: "Татарча" },
  cv:  { flag: "🇷🇺", name: "Chuvash",     native: "Чӑвашла" },
  rn:  { flag: "🇧🇮", name: "Kirundi",     native: "Ikirundi" },
  om:  { flag: "🇪🇹", name: "Oromo",       native: "Afaan Oromoo" },
  to:  { flag: "🇹🇴", name: "Tongan",      native: "Lea fakatonga" },
}

// Favoriten-Sprachen — only quality-translated locales shown in the top row
const FAVORITE_LOCALES: Locale[] = ["de", "en", "es", "fr", "pt", "it", "ru", "zh", "ja", "ko", "ar", "hi"]

function getLocaleMeta(locale: Locale): LocaleMeta {
  return LOCALE_META[locale] ?? {
    flag: "🌐",
    name: locale.toUpperCase(),
    native: locale.toUpperCase(),
  }
}

interface LanguageSwitcherProps {
  currentLocale?: Locale
  /** Visual variant */
  variant?: "compact" | "full"
}

export default function LanguageSwitcher({
  currentLocale = "de",
  variant = "compact",
}: LanguageSwitcherProps) {
  const pathname = usePathname()

  // Suchfeld-Status
  const [search, setSearch] = useState("")

  // Favoriten und gefilterte Sprachen
  const filteredLocales = useMemo(() => {
    if (!search.trim()) return SUPPORTED_LOCALES
    const s = search.trim().toLowerCase()
    return SUPPORTED_LOCALES.filter(l => {
      const meta = getLocaleMeta(l)
      return (
        l.toLowerCase().includes(s) ||
        meta.name.toLowerCase().includes(s) ||
        meta.native.toLowerCase().includes(s)
      )
    })
  }, [search])

  const handleChange = useCallback(
    (locale: Locale) => {
      if (locale === currentLocale) return

      // NEXT-LEVEL UPGRADE 2026: Persist in cookie (1 year)
      document.cookie = `cg_locale=${locale}; max-age=${60 * 60 * 24 * 365}; path=/; samesite=lax`

      // Build localized URL: strip existing locale prefix, add new one
      const segments = pathname.split("/").filter(Boolean)
      const firstSegment = segments[0] as Locale
      const hasLocalePrefix = SUPPORTED_LOCALES.includes(firstSegment)

      const restPath = hasLocalePrefix ? segments.slice(1).join("/") : segments.join("/")
      const newPath = `/${locale}${restPath ? "/" + restPath : ""}`

      window.location.assign(newPath)
    },
    [currentLocale, pathname]
  )

  if (variant === "full") {
    // Modernes, scrollbares, filterbares Sprachmenü mit Favoriten
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="mb-2 flex items-center gap-2">
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-200 focus:outline-none focus:border-cyan-500"
            placeholder="Sprache suchen / Search language..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Sprache suchen"
          />
        </div>
        {/* Favoriten */}
        {(!search.trim() && FAVORITE_LOCALES.length > 0) && (
          <div className="mb-2 grid grid-cols-5 gap-2">
            {FAVORITE_LOCALES.map(locale => {
              if (!SUPPORTED_LOCALES.includes(locale)) return null
              const meta = getLocaleMeta(locale)
              const isActive = locale === currentLocale
              return (
                <button
                  key={locale}
                  onClick={() => handleChange(locale)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all ${
                    isActive
                      ? "bg-[#00ff9d]/10 border-[#00ff9d]/50 text-[#00ff9d]"
                      : "border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                  }`}
                  title={meta.name}
                >
                  <span className="text-lg">{meta.flag}</span>
                  <span className="text-xs font-bold">{meta.native}</span>
                  <span className="text-[10px] text-gray-500">{locale.toUpperCase()}</span>
                  {isRTL(locale) && (
                    <span className="text-[10px] text-gray-500">RTL</span>
                  )}
                  <span className="text-yellow-400 text-xs mt-0.5">★</span>
                </button>
              )
            })}
          </div>
        )}
        {/* Gefilterte Sprachen (scrollbar) */}
        <div className="max-h-64 overflow-y-auto grid grid-cols-5 gap-2 pr-1 custom-scrollbar">
          {filteredLocales.map(locale => {
            // Favoriten im oberen Block nicht doppelt anzeigen
            if (!search.trim() && FAVORITE_LOCALES.includes(locale)) return null
            const meta = getLocaleMeta(locale)
            const isActive = locale === currentLocale
            return (
              <button
                key={locale}
                onClick={() => handleChange(locale)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all ${
                  isActive
                    ? "bg-[#00ff9d]/10 border-[#00ff9d]/50 text-[#00ff9d]"
                    : "border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                }`}
                title={meta.name}
              >
                <span className="text-lg">{meta.flag}</span>
                <span className="text-xs font-bold">{meta.native}</span>
                <span className="text-[10px] text-gray-500">{locale.toUpperCase()}</span>
                {isRTL(locale) && (
                  <span className="text-[10px] text-gray-500">RTL</span>
                )}
              </button>
            )
          })}
        </div>
        {/* Doku: Modernisiertes Sprachmenü 2026, Features: Suche, Favoriten, Scroll, Flagge+Name+Code */}
        <div className="mt-4 text-xs text-gray-500">
          <b>Modernisiertes Sprachmenü (2026):</b> Suchfeld, Favoriten (★), Scrollbar, Flagge, Name, Sprachcode. Vollständig für 30+ Sprachen optimiert.
        </div>
      </div>
    )
  }

  return (
    // NEXT-LEVEL UPGRADE 2026: Compact language switcher
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors text-gray-400 hover:text-gray-200">
        <Globe className="w-3.5 h-3.5" />
        <span className="text-xs font-bold">{getLocaleMeta(currentLocale).flag}</span>
        <span className="text-xs">{currentLocale.toUpperCase()}</span>
      </button>

      {/* Dropdown: modernisiert, mit Suche, Favoriten, Scrollbar */}
      <div className="absolute right-0 top-full mt-1 w-64 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50 overflow-hidden">
        <div className="p-2 border-b border-gray-800 bg-black/80">
          <input
            type="text"
            className="w-full px-2 py-1 rounded bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:border-cyan-500 text-xs"
            placeholder="Sprache suchen / Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Sprache suchen"
          />
        </div>
        {/* Favoriten */}
        {(!search.trim() && FAVORITE_LOCALES.length > 0) && (
          <div className="grid grid-cols-3 gap-1 px-2 pt-2">
            {FAVORITE_LOCALES.map(locale => {
              if (!SUPPORTED_LOCALES.includes(locale)) return null
              const meta = getLocaleMeta(locale)
              const isActive = locale === currentLocale
              return (
                <button
                  key={locale}
                  onClick={() => handleChange(locale)}
                  className={`flex items-center gap-2 w-full px-2 py-1 rounded text-left border transition-all ${
                    isActive
                      ? "bg-[#00ff9d]/10 border-[#00ff9d]/50 text-[#00ff9d]"
                      : "border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                  }`}
                  title={meta.name}
                >
                  <span className="text-base">{meta.flag}</span>
                  <span className="text-xs font-bold">{meta.native}</span>
                  <span className="text-[10px] text-gray-500">{locale.toUpperCase()}</span>
                  {isRTL(locale) && (
                    <span className="text-[10px] text-gray-500 ml-1">RTL</span>
                  )}
                  <span className="text-yellow-400 text-xs ml-auto">★</span>
                </button>
              )
            })}
          </div>
        )}
        {/* Gefilterte Sprachen (scrollbar) */}
        <div className="max-h-56 overflow-y-auto grid grid-cols-3 gap-1 px-2 pb-2 custom-scrollbar">
          {filteredLocales.map(locale => {
            if (!search.trim() && FAVORITE_LOCALES.includes(locale)) return null
            const meta = getLocaleMeta(locale)
            const isActive = locale === currentLocale
            return (
              <button
                key={locale}
                onClick={() => handleChange(locale)}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded text-left border transition-all ${
                  isActive
                    ? "bg-[#00ff9d]/10 border-[#00ff9d]/50 text-[#00ff9d]"
                    : "border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                }`}
                title={meta.name}
              >
                <span className="text-base">{meta.flag}</span>
                <span className="text-xs font-bold">{meta.native}</span>
                <span className="text-[10px] text-gray-500">{locale.toUpperCase()}</span>
                {isRTL(locale) && (
                  <span className="text-[10px] text-gray-500 ml-1">RTL</span>
                )}
              </button>
            )
          })}
        </div>
        <div className="px-2 pb-2 text-[10px] text-gray-500">Modernisiertes Sprachmenü: Suche, Favoriten, Scroll, Flagge+Name+Code</div>
      </div>
    </div>
  )
}
