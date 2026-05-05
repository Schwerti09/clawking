// Mission M-030 — "GDPR Data Minimization: reduce data collection to essential only"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const DATA_SCHEMA_INITIAL = `# /app/user-schema.sql — excessive data collection
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Collects more data than needed for authentication
-- Violates GDPR data minimization principle
`

const README = `Mission M-030 — GDPR Data Minimization
======================================

BRIEF
  Your user schema collects excessive data (phone, address, DOB,
  IP, user-agent) not needed for authentication. This violates
  GDPR data minimization principle. Reduce data collection to
  essential fields only and implement data retention policy.

OBJECTIVES
  1. Inspect the user schema
  2. Remove non-essential fields
  3. Add data retention policy
  4. Add right-to-be-forgotten function
  5. Update privacy policy documentation
  6. Validate compliance

HINTS
  cat user-schema.sql
  patch remove-excess
  patch retention
  patch rtbf
  patch privacy-policy
  validate compliance
`

const initialState: MissionState = {
  cwd: "/app",
  fs: {
    "/app/README": { content: README, mode: "ro" },
    "/app/user-schema.sql": { content: DATA_SCHEMA_INITIAL, mode: "rw" },
  },
  env: { INSPECTED: "no", EXCESS_REMOVED: "no", RETENTION: "no", RTBF: "no", PRIVACY_POLICY: "no", VALIDATED: "no" },
  goalsMet: [],
  history: [],
}

export const gdprDataMinimizationMission: Mission = {
  slug: "gdpr-data-minimization",
  title: "GDPR Data Minimization: reduce data collection to essential only",
  brief: "Your user schema collects excessive data (phone, address, DOB, IP, user-agent). Reduce to essential fields: implement data retention policy, right-to-be-forgotten, update privacy policy.",
  prompt: "defender@hodlberg-compliance:/app$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-030 — GDPR DATA MINIMIZATION") + bold(cyan(" │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "GDPR compliance · data minimization · privacy\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "inspect", label: "Inspect the user schema", hint: "cat user-schema.sql" },
    { id: "remove", label: "Remove non-essential fields", hint: "patch remove-excess" },
    { id: "retention", label: "Add data retention policy", hint: "patch retention" },
    { id: "rtbf", label: "Add right-to-be-forgotten function", hint: "patch rtbf" },
    { id: "privacy", label: "Update privacy policy documentation", hint: "patch privacy-policy" },
    { id: "validate", label: "Validate compliance", hint: "validate compliance" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — GDPR COMPLIANT    │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+290") + dim("   GDPR: essential data only, 90-day retention, right-to-be-forgotten implemented, privacy policy updated.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("patch remove-excess | retention | rtbf | privacy-policy") + "\r\n" +
      "  " + cyan("validate compliance") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/app/README"] : undefined) ?? (args[0] === "user-schema.sql" ? state.fs["/app/user-schema.sql"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/app/user-schema.sql" ? "inspect" : undefined }
    },
    patch: ({ state, args }) => {
      const p = "/app/user-schema.sql"
      let c = state.fs[p]?.content ?? ""
      if (args[0] === "remove-excess") {
        if (/phone TEXT NOT NULL/m.test(c) === false) return { stdout: yellow("already patched"), goalMet: "remove" }
        c = c.replace("  phone TEXT NOT NULL,\n  address TEXT NOT NULL,\n  date_of_birth DATE NOT NULL,\n  ip_address TEXT NOT NULL,\n  user_agent TEXT NOT NULL,", "  -- Removed non-essential fields per GDPR data minimization")
        return { stdout: green("Removed non-essential fields (phone, address, DOB, IP, user-agent)"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, EXCESS_REMOVED: "yes" } }, goalMet: "remove" }
      }
      if (args[0] === "retention") {
        if (/RETENTION POLICY/m.test(c)) return { stdout: yellow("already patched"), goalMet: "retention" }
        c = c.replace("created_at TIMESTAMP DEFAULT NOW()", "created_at TIMESTAMP DEFAULT NOW()\n\n-- GDPR RETENTION POLICY\n-- User data retained for 90 days after last login\n-- Automatic deletion via scheduled job")
        return { stdout: green("Added 90-day data retention policy"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, RETENTION: "yes" } }, goalMet: "retention" }
      }
      if (args[0] === "rtbf") {
        if (/right_to_be_forgotten/m.test(c)) return { stdout: yellow("already patched"), goalMet: "rtbf" }
        c = c.replace("-- Automatic deletion via scheduled job", "-- Automatic deletion via scheduled job\n\n-- RIGHT TO BE FORGOTTEN (GDPR Art. 17)\nCREATE OR REPLACE FUNCTION right_to_be_forgotten(user_id INTEGER)\nRETURNS VOID AS $$\nBEGIN\n  DELETE FROM users WHERE id = user_id;\n  DELETE FROM user_sessions WHERE user_id = user_id;\n  DELETE FROM audit_logs WHERE user_id = user_id;\nEND;\n$$ LANGUAGE plpgsql;")
        return { stdout: green("Added right-to-be-forgotten function"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, RTBF: "yes" } }, goalMet: "rtbf" }
      }
      if (args[0] === "privacy-policy") {
        if (/PRIVACY POLICY/m.test(c)) return { stdout: yellow("already patched"), goalMet: "privacy" }
        c = c.replace("END;\n$$ LANGUAGE plpgsql;", "END;\n$$ LANGUAGE plpgsql;\n\n-- PRIVACY POLICY UPDATE\n-- Updated per GDPR data minimization principle\n-- Only essential data collected (email, password_hash)\n-- 90-day retention policy implemented\n-- Right-to-be-forgotten function available")
        return { stdout: green("Updated privacy policy documentation"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, PRIVACY_POLICY: "yes" } }, goalMet: "privacy" }
      }
      return { stderr: "patch: unknown. Try 'patch remove-excess' / 'patch retention' / 'patch rtbf' / 'patch privacy-policy'" }
    },
    validate: ({ state, args }) => {
      if (args[0] === "compliance") {
        if (state.env.EXCESS_REMOVED !== "yes" || state.env.RETENTION !== "yes" || state.env.RTBF !== "yes" || state.env.PRIVACY_POLICY !== "yes") return { stderr: "validate: error — not all GDPR requirements met" }
        return {
          stdout: green("GDPR compliance validation:\n  ✓ Data minimization: only essential fields\n  ✓ Retention policy: 90 days after last login\n  ✓ Right-to-be-forgotten: function implemented\n  ✓ Privacy policy: updated and documented\n  ✓ GDPR Article 25 (Data Protection by Design) compliant"),
          statePatch: { env: { ...state.env, VALIDATED: "yes" } },
          goalMet: "validate",
        }
      }
      return { stderr: "validate: command not supported. Try 'validate compliance'" }
    },
    hint: ({ state }) => {
      const r = gdprDataMinimizationMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + gdprDataMinimizationMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
