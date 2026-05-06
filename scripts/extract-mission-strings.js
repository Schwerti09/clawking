/**
 * extract-mission-strings.js
 *
 * Extract all mission strings from mission files and add them to en.json
 * under a new "missions" section for i18n translation.
 */

const fs = require("fs")
const path = require("path")

const MISSIONS_DIR = path.join(__dirname, "../lib/academy/missions")
const DICT_DIR = path.join(__dirname, "../dictionaries")
const EN_DICT = path.join(DICT_DIR, "en.json")

// Read all mission files
const missionFiles = fs.readdirSync(MISSIONS_DIR)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'missionEngine.ts')

console.log(`Found ${missionFiles.length} mission files`)

// Extract strings from each mission
const missionStrings = {}

for (const file of missionFiles) {
  const filePath = path.join(MISSIONS_DIR, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  
  // Extract slug from filename
  const slug = file.replace('.ts', '')
  
  // Extract title
  const titleMatch = content.match(/title:\s*"([^"]+)"/)
  const title = titleMatch ? titleMatch[1] : ''
  
  // Extract brief
  const briefMatch = content.match(/brief:\s*"([^"]+)"/)
  const brief = briefMatch ? briefMatch[1] : ''
  
  // Extract welcome
  const welcomeMatch = content.match(/welcome:\s*"([^"]+)"/)
  const welcome = welcomeMatch ? welcomeMatch[1] : ''
  
  // Extract success
  const successMatch = content.match(/success:\s*"([^"]+)"/)
  const success = successMatch ? successMatch[1] : ''
  
  // Extract goals
  const goals = []
  const goalRegex = /{ id:\s*"([^"]+)",\s*label:\s*"([^"]+)",\s*hint:\s*"([^"]+)" }/g
  let goalMatch
  while ((goalMatch = goalRegex.exec(content)) !== null) {
    goals.push({
      id: goalMatch[1],
      label: goalMatch[2],
      hint: goalMatch[3]
    })
  }
  
  if (title || brief || welcome || success || goals.length > 0) {
    missionStrings[slug] = {
      title,
      brief,
      welcome,
      success,
      goals: goals.reduce((acc, g) => {
        acc[`${g.id}_label`] = g.label
        acc[`${g.id}_hint`] = g.hint
        return acc
      }, {})
    }
  }
}

console.log(`Extracted strings from ${Object.keys(missionStrings).length} missions`)

// Read en.json
const enDict = JSON.parse(fs.readFileSync(EN_DICT, 'utf-8'))

// Add missions section
enDict.missions = missionStrings

// Write back to en.json
fs.writeFileSync(EN_DICT, JSON.stringify(enDict, null, 2) + '\n', 'utf-8')

console.log(`Added ${Object.keys(missionStrings).length} missions to en.json`)
console.log(`Total mission strings: ${Object.keys(missionStrings).reduce((acc, slug) => {
  const m = missionStrings[slug]
  return acc + 1 + (m.title ? 1 : 0) + (m.brief ? 1 : 0) + (m.welcome ? 1 : 0) + (m.success ? 1 : 0) + Object.keys(m.goals).length
}, 0)}`)
