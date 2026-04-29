#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs")
const path = require("path")

const ROOT = process.cwd()
const DICT_DIR = path.join(ROOT, "dictionaries")

const ACTIVE_LOCALES = [
  "de",
  "en",
  "es",
  "fr",
  "pt",
  "it",
  "ru",
  "zh",
  "ja",
  "ko",
  "ar",
  "nl",
  "hi",
  "tr",
  "pl",
  "af",
  "he",
  "uk",
  "vi",
  "id",
  "sv",
  "fi",
  "ro",
  "cs",
  "th",
  "bn",
  "el",
  "hu",
  "da",
  "no",
  "ms",
  "bg",
  "fa",
  "ur",
  "ta",
  "te",
  "mr",
  "gu",
  "kn",
  "ml",
  "et",
  "lv",
  "lt",
  "sk",
  "sl",
  "hr",
  "sr",
  "ca",
  "eu",
  "gl",
  "fil",
  "sw",
  "zu",
  "am",
  "km",
  "lo",
  "my",
  "ne",
  "si",
  "ka",
  "hy",
  "az",
  "kk",
  "uz",
  "mn",
  "is",
  "mt",
  "sq",
  "mk",
  "bs",
  "cy",
  "ga",
  "lb",
  "fo",
  "ps",
  "yo",
  "ig",
  "ha",
  "rw",
  "rn",
  "so",
  "ti",
  "om",
  "ky",
  "tg",
  "tk",
  "pa",
  "or",
  "as",
  "jv",
  "su",
  "mi",
  "sm",
  "to",
  "haw",
  "br",
  "co",
  "oc",
  "tt",
  "cv",
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8")
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function normalizeBySchema(schemaNode, localeNode, enNode) {
  if (Array.isArray(schemaNode)) {
    if (Array.isArray(localeNode)) return localeNode
    if (Array.isArray(enNode)) return enNode
    return schemaNode
  }

  if (isPlainObject(schemaNode)) {
    const out = {}
    const localeObj = isPlainObject(localeNode) ? localeNode : {}
    const enObj = isPlainObject(enNode) ? enNode : {}
    for (const key of Object.keys(schemaNode)) {
      out[key] = normalizeBySchema(schemaNode[key], localeObj[key], enObj[key])
    }
    return out
  }

  if (typeof localeNode === typeof schemaNode) return localeNode
  if (typeof enNode === typeof schemaNode) return enNode
  return schemaNode
}

function flattenForStats(value, prefix = "", out = {}) {
  if (Array.isArray(value)) {
    out[prefix] = "array"
    return out
  }
  if (isPlainObject(value)) {
    for (const key of Object.keys(value)) {
      const next = prefix ? `${prefix}.${key}` : key
      flattenForStats(value[key], next, out)
    }
    return out
  }
  out[prefix] = typeof value
  return out
}

function main() {
  const dePath = path.join(DICT_DIR, "de.json")
  const enPath = path.join(DICT_DIR, "en.json")
  const de = readJson(dePath)
  const en = readJson(enPath)

  const deFlat = flattenForStats(de)
  console.log("locale missing extra type_mismatch")

  for (const locale of ACTIVE_LOCALES) {
    const filePath = path.join(DICT_DIR, `${locale}.json`)
    if (!fs.existsSync(filePath)) {
      console.log(`${locale} MISSING_FILE`)
      continue
    }
    const current = readJson(filePath)
    const normalized = normalizeBySchema(de, current, en)
    writeJson(filePath, normalized)

    const flat = flattenForStats(normalized)
    const missing = Object.keys(deFlat).filter((k) => !(k in flat)).length
    const extra = Object.keys(flat).filter((k) => !(k in deFlat)).length
    const typeMismatch = Object.keys(deFlat).filter(
      (k) => k in flat && flat[k] !== deFlat[k]
    ).length
    console.log(`${locale} ${missing} ${extra} ${typeMismatch}`)
  }
}

main()
