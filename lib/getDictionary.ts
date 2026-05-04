// Server-side dictionary loader for i18n
// Loads the appropriate JSON dictionary for a given locale and merges with
// the English fallback so that missing keys never produce empty strings.

import type { Locale } from "@/lib/i18n"
import { DEFAULT_LOCALE } from "@/lib/i18n"

/** Shape of every dictionary JSON file */
export type Dictionary = {
  common: {
    ctaDashboard: string
    ctaMissionControl: string
  }
  runbook: {
    back_to_intel: string
    back_to_oracle: string
    back_to_neuro: string
  }
  share: {
    myceliumBtn: string
    myceliumXBtn: string
    myceliumLinkedinBtn: string
    myceliumCta: string
    myceliumPost: string
    myceliumCount: string
    myceliumGenerating: string
    myceliumCopied: string
  }
  copilot: {
    greeting: string
    followup1: string
    followup2: string
    followup3: string
    followup4: string
    error: string
    mode: string
    emergencyLink: string
    launchpad: string
    you: string
    thinking: string
    placeholder: string
    send: string
    tip: string
    proAccess: string
    proTitle: string
    proDesc: string
    proLabel: string
    proSub: string
    dayPassLabel: string
    dayPassSub: string
    dayPassBtn: string
    allPlans: string
    links: string
    llmTitle: string
    llmDesc: string
    pageSubtitle: string
    prefillNote: string
    voiceTitle: string
    voiceDesc: string
    voiceUpgrade: string
    sandboxTitle: string
    sandboxDesc: string
  }
  live: {
    title: string
    subtitle: string
  }
  runbooks: {
    subtitle: string
  }
  hero: {
    badge: string
    /** Text displayed after the gradient "ClawGuru" brand prefix in the hero h1 */
    titleSuffix: string
    subtitle: string
    ctaMycelium: string
    ctaCopilot: string
    ctaProKits: string
    ctaIntel: string
    knowledgeEdges: string
    genesisProtocol: string
    nodeTooltip: string
    scrollLabel: string
    miniCopilotTitle: string
    miniCopilotSubtitle: string
    miniCopilotPlaceholder: string
    miniCopilotSubmit: string
    popularPromptsTitle: string
    noLoginNote: string
    featureCopilot: string
    featureCopilotDesc: string
    featureVault: string
    featureVaultDesc: string
    featureAcademy: string
    featureAcademyDesc: string
  }
  nav: {
    live: string
    securityCheck: string
    copilot: string
    sandbox: string
    runbooks: string
    intelFeed: string
    pricing: string
    emergency: string
    proKits: string
    more: string
    clawVerse: string
    summon: string
    oracle: string
    neuro: string
    mycelium: string
    tags: string
    academy: string
    vault: string
    report: string
    downloads: string
    cases: string
    costs: string
    about: string
    login: string
    footerDescription: string
    footerDisclaimer: string
    footerHubs: string
    footerLegal: string
    imprint: string
    privacy: string
    terms: string
    trustCenter: string
    footerTrustCenter: string
    footerDiscord: string
    footerAffiliate: string
  }
  dayPass: {
    label: string
  }
  jackpot: {
    kicker: string
    title: string
    subtitle: string
    liveScore: string
    liveScoreDesc: string
    copilotRunbooks: string
    copilotRunbooksDesc: string
    kitsTemplates: string
    kitsTemplatesDesc: string
    liveOpsWall: string
    liveOpsWallDesc: string
    runbooksLink: string
    allPlans: string
    discordOpsRoom: string
    proTip: string
    activateAccess: string
    then: string
  }
  faq: {
    kicker: string
    title: string
    subtitle: string
    q1: string
    a1: string
    q2: string
    a2: string
    q3: string
    a3: string
    q4: string
    a4: string
  }
  home: {
    clawVerseKicker: string
    clawVerseTitle: string
    clawVerseDesc: string
    clawVerseCta: string
    genesisProtocol: string
    myceliumTitle: string
    myceliumDesc: string
    openMycelium: string
  }

  pricing: {
    accessBadge: string
    title: string
    subtitle: string
    emergencyText: string
    emergencyLink: string
    featureComparison: string
    voiceCopilotLimited: string
    dayPassBadge: string
    dayPassDesc: string
    dayPassBtn: string
    dayPassMeta: string
    dayPassOnce: string
    mostPopular: string
    proBadge: string
    proDesc: string
    proBtn: string
    cancelable: string
    teamBadge: string
    teamDesc: string
    teamBtn: string
    enterpriseDesc: string
    enterpriseBtn: string
    enterpriseContact: string
    contactSectionTitle: string
    contactSectionDesc: string
    instantAccess: string
    instantAccessDesc: string
    noAccount: string
    noAccountDesc: string
    paymentIssue: string
    paymentIssueDesc: string
    faqDuration: string
    faqDurationA: string
    faqTransfer: string
    faqTransferA: string
    faqNoAccess: string
    faqNoAccessA: string
    faqCancel: string
    faqCancelA: string
    faqNewPro: string
    faqNewProA: string
    faqIntelligence: string
    faqIntelligenceA: string
    recoverLink: string
    monthly: string
    grpSecurity: string
    grpOps: string
    grpKnowledge: string
    grpLimits: string
    grpAllDayPass: string
    grpFeatureUnlocks: string
    grpIntelligence: string
    grpDeployment: string
    grpProExtras: string
    grpAllPro: string
    grpTeamCollab: string
    grpRoadmap: string
    grpEnterpriseUnlocks: string
    grpIntelFeedApi: string
    grpEnterpriseSupport: string
    newBadge: string
  }
  summon: {
    example_queries_items: string[]
    input_placeholder: string
    start_label: string
    analyzing_label: string
    attack_label: string
    attack_desc: string
    defense_label: string
    defense_desc: string
    recovery_label: string
    recovery_desc: string
    optimize_label: string
    optimize_desc: string
    voice_label: string
    voice_stop_label: string
    voice_lang: string
    voice_unsupported: string
    voice_no_speech: string
    voice_no_mic: string
    voice_perm_denied: string
    voice_error: string
    error_boundary_fallback: string
    free_limit_title: string
    free_limit_desc: string
    daypass_btn: string
    clawscore_label: string
    confidence_label: string
    eta_label: string
    view_link_label: string
    copy_label: string
    share_x_label: string
    share_linkedin_label: string
  }
  oracle: {
    title: string
    subtitle: string
    scope_label: string
    scope_placeholder: string
    add_scope: string
    remove: string
    predict_btn: string
    scope_hint: string
    risk_radar: string
    live_score: string
    cve_title: string
    runbook_label: string
    severity_low: string
    severity_medium: string
    severity_high: string
    severity_critical: string
    clawscore_label: string
    loading: string
    fetch_error: string
  }
  neuro: {
    title: string
    subtitle: string
    pick_stack: string
    add_stack: string
    input_placeholder: string
    recommend: string
    recommendations: string
    plan_title: string
    score_title: string
    confidence: string
    loading: string
    fetch_error: string
    available_label: string
    chosen_label: string
    runbook_label: string
    retry: string
  }
  intel: {
    hero_badge: string
    hero_title: string
    hero_subline: string
    cta_daypass: string
    upgrade_premium_label: string
    upgrade_title: string
    upgrade_text: string
    upgrade_button: string
    live_header: string
    live_loading: string
    live_error: string
    export_csv: string
    export_json: string
    export_pdf: string
    fix_link_label: string
    free_teaser_text: string
    free_teaser_button: string
    analyzer_header: string
    analyzer_input_placeholder: string
    analyzing_label: string
    analyze_btn: string
    feed_loading: string
    examples_label: string
    published_label: string
    recommended_runbook_label: string
    link_oracle: string
    link_mycelium: string
    link_neuro: string
    link_fix_page: string
    analyzer_error: string
    predictive_header: string
    predictive_loading: string
    predictive_more: string
    predictive_error: string
    myceliumPreview_header: string
    scope_all: string
    stats_header: string
    stats_loading: string
    stats_error: string
    tile_new_7d: string
    tile_with_runbooks: string
    tile_avg_cvss: string
    tile_top_services: string
    spark_title: string
  }
  vorstellung?: Record<string, unknown>
  homepage?: Record<string, unknown>
  roast?: Record<string, unknown>
  check: {
    page_title: string
    page_subtitle: string
    badge_no_reg: string
    badge_time: string
    badge_share: string
    proof_heading: string
    proof_1_title: string
    proof_1_desc: string
    proof_2_title: string
    proof_2_desc: string
    proof_3_title: string
    proof_3_desc: string
    score_methodology_heading: string
    score_methodology_desc: string
    methodology_title: string
    methodology_desc: string
    methodology_bullet1: string
    methodology_bullet2: string
    methodology_bullet3: string
    methodology_link: string
    harden_title: string
    harden_desc: string
    faq_title: string
    faq_q1: string
    faq_a1: string
    faq_q2: string
    faq_a2: string
    faq_q3: string
    faq_a3: string
    faq_q4: string
    faq_a4: string
    faq_q5: string
    faq_a5: string
  }
}

// Supported dictionary locales (JSON files that exist in /dictionaries)
const DICTIONARY_LOCALES = [
  "de", "en", "es", "fr", "pt", "it", "ru", "zh", "ja", "ar", "nl", "hi", "tr", "pl", "ko", "af",
  // Round 14 — wire loaders so dict files are actually used instead of EN fallback
  "he", "uk", "vi", "id", "sv", "fi", "ro", "cs", "th", "bn", "el", "hu", "da", "no",
  // 100-Language Rollout — Tier 1+2 completion (23.04.2026)
  "ms", "bg",
  // 100-Language Rollout — Tier 3 (29.04.2026)
  "fa", "ur", "ta", "te", "mr", "gu", "kn", "ml", "et", "lv", "lt", "sk", "sl", "hr", "sr", "ca", "eu", "gl",
  // 100-Language Rollout — Tier 4 (29.04.2026)
  "fil", "sw", "zu", "am", "km", "lo", "my", "ne", "si", "ka", "hy", "az", "kk", "uz", "mn", "is", "mt", "sq", "mk", "bs", "cy", "ga", "lb", "fo", "ps",
  // 100-Language Rollout — Tier 5 (29.04.2026)
  "yo", "ig", "ha", "rw", "rn", "so", "ti", "om", "ky", "tg", "tk", "pa", "or", "as", "jv", "su", "mi", "sm", "to", "haw", "br", "co", "oc", "tt", "cv",
] as const
type DictionaryLocale = (typeof DICTIONARY_LOCALES)[number]

const loaders: Record<DictionaryLocale, () => Promise<Dictionary>> = {
  de: () => import("@/dictionaries/de.json").then((m) => m.default as unknown as Dictionary),
  en: () => import("@/dictionaries/en.json").then((m) => m.default as unknown as Dictionary),
  es: () => import("@/dictionaries/es.json").then((m) => m.default as unknown as Dictionary),
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default as unknown as Dictionary),
  pt: () => import("@/dictionaries/pt.json").then((m) => m.default as unknown as Dictionary),
  it: () => import("@/dictionaries/it.json").then((m) => m.default as unknown as Dictionary),
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default as unknown as Dictionary),
  zh: () => import("@/dictionaries/zh.json").then((m) => m.default as unknown as Dictionary),
  ja: () => import("@/dictionaries/ja.json").then((m) => m.default as unknown as Dictionary),
  ar: () => import("@/dictionaries/ar.json").then((m) => m.default as unknown as Dictionary),
  nl: () => import("@/dictionaries/nl.json").then((m) => m.default as unknown as Dictionary),
  hi: () => import("@/dictionaries/hi.json").then((m) => m.default as unknown as Dictionary),
  tr: () => import("@/dictionaries/tr.json").then((m) => m.default as unknown as Dictionary),
  pl: () => import("@/dictionaries/pl.json").then((m) => m.default as unknown as Dictionary),
  ko: () => import("@/dictionaries/ko.json").then((m) => m.default as unknown as Dictionary),
  af: () => import("@/dictionaries/af.json").then((m) => m.default as unknown as Dictionary),
  he: () => import("@/dictionaries/he.json").then((m) => m.default as unknown as Dictionary),
  uk: () => import("@/dictionaries/uk.json").then((m) => m.default as unknown as Dictionary),
  vi: () => import("@/dictionaries/vi.json").then((m) => m.default as unknown as Dictionary),
  id: () => import("@/dictionaries/id.json").then((m) => m.default as unknown as Dictionary),
  sv: () => import("@/dictionaries/sv.json").then((m) => m.default as unknown as Dictionary),
  fi: () => import("@/dictionaries/fi.json").then((m) => m.default as unknown as Dictionary),
  ro: () => import("@/dictionaries/ro.json").then((m) => m.default as unknown as Dictionary),
  cs: () => import("@/dictionaries/cs.json").then((m) => m.default as unknown as Dictionary),
  th: () => import("@/dictionaries/th.json").then((m) => m.default as unknown as Dictionary),
  bn: () => import("@/dictionaries/bn.json").then((m) => m.default as unknown as Dictionary),
  el: () => import("@/dictionaries/el.json").then((m) => m.default as unknown as Dictionary),
  hu: () => import("@/dictionaries/hu.json").then((m) => m.default as unknown as Dictionary),
  da: () => import("@/dictionaries/da.json").then((m) => m.default as unknown as Dictionary),
  no: () => import("@/dictionaries/no.json").then((m) => m.default as unknown as Dictionary),
  ms: () => import("@/dictionaries/ms.json").then((m) => m.default as unknown as Dictionary),
  bg: () => import("@/dictionaries/bg.json").then((m) => m.default as unknown as Dictionary),
  fa: () => import("@/dictionaries/fa.json").then((m) => m.default as unknown as Dictionary),
  ur: () => import("@/dictionaries/ur.json").then((m) => m.default as unknown as Dictionary),
  ta: () => import("@/dictionaries/ta.json").then((m) => m.default as unknown as Dictionary),
  te: () => import("@/dictionaries/te.json").then((m) => m.default as unknown as Dictionary),
  mr: () => import("@/dictionaries/mr.json").then((m) => m.default as unknown as Dictionary),
  gu: () => import("@/dictionaries/gu.json").then((m) => m.default as unknown as Dictionary),
  kn: () => import("@/dictionaries/kn.json").then((m) => m.default as unknown as Dictionary),
  ml: () => import("@/dictionaries/ml.json").then((m) => m.default as unknown as Dictionary),
  et: () => import("@/dictionaries/et.json").then((m) => m.default as unknown as Dictionary),
  lv: () => import("@/dictionaries/lv.json").then((m) => m.default as unknown as Dictionary),
  lt: () => import("@/dictionaries/lt.json").then((m) => m.default as unknown as Dictionary),
  sk: () => import("@/dictionaries/sk.json").then((m) => m.default as unknown as Dictionary),
  sl: () => import("@/dictionaries/sl.json").then((m) => m.default as unknown as Dictionary),
  hr: () => import("@/dictionaries/hr.json").then((m) => m.default as unknown as Dictionary),
  sr: () => import("@/dictionaries/sr.json").then((m) => m.default as unknown as Dictionary),
  ca: () => import("@/dictionaries/ca.json").then((m) => m.default as unknown as Dictionary),
  eu: () => import("@/dictionaries/eu.json").then((m) => m.default as unknown as Dictionary),
  gl: () => import("@/dictionaries/gl.json").then((m) => m.default as unknown as Dictionary),
  fil: () => import("@/dictionaries/fil.json").then((m) => m.default as unknown as Dictionary),
  sw: () => import("@/dictionaries/sw.json").then((m) => m.default as unknown as Dictionary),
  zu: () => import("@/dictionaries/zu.json").then((m) => m.default as unknown as Dictionary),
  am: () => import("@/dictionaries/am.json").then((m) => m.default as unknown as Dictionary),
  km: () => import("@/dictionaries/km.json").then((m) => m.default as unknown as Dictionary),
  lo: () => import("@/dictionaries/lo.json").then((m) => m.default as unknown as Dictionary),
  my: () => import("@/dictionaries/my.json").then((m) => m.default as unknown as Dictionary),
  ne: () => import("@/dictionaries/ne.json").then((m) => m.default as unknown as Dictionary),
  si: () => import("@/dictionaries/si.json").then((m) => m.default as unknown as Dictionary),
  ka: () => import("@/dictionaries/ka.json").then((m) => m.default as unknown as Dictionary),
  hy: () => import("@/dictionaries/hy.json").then((m) => m.default as unknown as Dictionary),
  az: () => import("@/dictionaries/az.json").then((m) => m.default as unknown as Dictionary),
  kk: () => import("@/dictionaries/kk.json").then((m) => m.default as unknown as Dictionary),
  uz: () => import("@/dictionaries/uz.json").then((m) => m.default as unknown as Dictionary),
  mn: () => import("@/dictionaries/mn.json").then((m) => m.default as unknown as Dictionary),
  is: () => import("@/dictionaries/is.json").then((m) => m.default as unknown as Dictionary),
  mt: () => import("@/dictionaries/mt.json").then((m) => m.default as unknown as Dictionary),
  sq: () => import("@/dictionaries/sq.json").then((m) => m.default as unknown as Dictionary),
  mk: () => import("@/dictionaries/mk.json").then((m) => m.default as unknown as Dictionary),
  bs: () => import("@/dictionaries/bs.json").then((m) => m.default as unknown as Dictionary),
  cy: () => import("@/dictionaries/cy.json").then((m) => m.default as unknown as Dictionary),
  ga: () => import("@/dictionaries/ga.json").then((m) => m.default as unknown as Dictionary),
  lb: () => import("@/dictionaries/lb.json").then((m) => m.default as unknown as Dictionary),
  fo: () => import("@/dictionaries/fo.json").then((m) => m.default as unknown as Dictionary),
  ps: () => import("@/dictionaries/ps.json").then((m) => m.default as unknown as Dictionary),
  yo: () => import("@/dictionaries/yo.json").then((m) => m.default as unknown as Dictionary),
  ig: () => import("@/dictionaries/ig.json").then((m) => m.default as unknown as Dictionary),
  ha: () => import("@/dictionaries/ha.json").then((m) => m.default as unknown as Dictionary),
  rw: () => import("@/dictionaries/rw.json").then((m) => m.default as unknown as Dictionary),
  rn: () => import("@/dictionaries/rn.json").then((m) => m.default as unknown as Dictionary),
  so: () => import("@/dictionaries/so.json").then((m) => m.default as unknown as Dictionary),
  ti: () => import("@/dictionaries/ti.json").then((m) => m.default as unknown as Dictionary),
  om: () => import("@/dictionaries/om.json").then((m) => m.default as unknown as Dictionary),
  ky: () => import("@/dictionaries/ky.json").then((m) => m.default as unknown as Dictionary),
  tg: () => import("@/dictionaries/tg.json").then((m) => m.default as unknown as Dictionary),
  tk: () => import("@/dictionaries/tk.json").then((m) => m.default as unknown as Dictionary),
  pa: () => import("@/dictionaries/pa.json").then((m) => m.default as unknown as Dictionary),
  or: () => import("@/dictionaries/or.json").then((m) => m.default as unknown as Dictionary),
  as: () => import("@/dictionaries/as.json").then((m) => m.default as unknown as Dictionary),
  jv: () => import("@/dictionaries/jv.json").then((m) => m.default as unknown as Dictionary),
  su: () => import("@/dictionaries/su.json").then((m) => m.default as unknown as Dictionary),
  mi: () => import("@/dictionaries/mi.json").then((m) => m.default as unknown as Dictionary),
  sm: () => import("@/dictionaries/sm.json").then((m) => m.default as unknown as Dictionary),
  to: () => import("@/dictionaries/to.json").then((m) => m.default as unknown as Dictionary),
  haw: () => import("@/dictionaries/haw.json").then((m) => m.default as unknown as Dictionary),
  br: () => import("@/dictionaries/br.json").then((m) => m.default as unknown as Dictionary),
  co: () => import("@/dictionaries/co.json").then((m) => m.default as unknown as Dictionary),
  oc: () => import("@/dictionaries/oc.json").then((m) => m.default as unknown as Dictionary),
  tt: () => import("@/dictionaries/tt.json").then((m) => m.default as unknown as Dictionary),
  cv: () => import("@/dictionaries/cv.json").then((m) => m.default as unknown as Dictionary),
}

/** Returns the best available dictionary locale for the given locale. */
function resolveLoader(locale: Locale): DictionaryLocale {
  if ((DICTIONARY_LOCALES as readonly string[]).includes(locale)) {
    return locale as DictionaryLocale
  }
  // Fall back to English for unsupported locales, then to DEFAULT_LOCALE
  if ((DICTIONARY_LOCALES as readonly string[]).includes("en")) return "en"
  return DEFAULT_LOCALE as DictionaryLocale
}

/**
 * Loads the dictionary for the given locale.
 * Falls back to English (then German) for any missing keys so the UI
 * never shows an empty string or throws an error.
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const targetKey = resolveLoader(locale)

  try {
    const dict = await loaders[targetKey]()

    // For non-default locales, deep-merge with the English fallback so that
    // any missing key is automatically filled in.
    if (targetKey !== "en") {
      const fallback = await loaders["en"]()
      return deepMerge(fallback, dict)
    }

    return dict
  } catch {
    // Last-resort: return default-locale dictionary
    return loaders[DEFAULT_LOCALE as DictionaryLocale]()
  }
}

/** Recursively fills missing keys in `target` from `source`. */
function deepMerge<T extends object>(source: T, target: Partial<T>): T {
  const result = { ...source } as T
  for (const key of Object.keys(source) as (keyof T)[]) {
    const sv = source[key]
    const tv = target[key]
    if (tv !== undefined && tv !== null) {
      if (typeof sv === "object" && !Array.isArray(sv) && typeof tv === "object") {
        result[key] = deepMerge(sv as object, tv as object) as T[keyof T]
      } else {
        result[key] = tv as T[keyof T]
      }
    }
  }
  return result
}
