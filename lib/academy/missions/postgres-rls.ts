// Mission M-027 — "PostgreSQL Row-Level Security: multi-tenant data isolation"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const RLS_POLICY_INITIAL = `-- /app/rls-policy.sql — no row-level security
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  tenant_id INTEGER NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

-- No RLS enabled
-- Anyone can read/write any row
`

const README = `Mission M-027 — PostgreSQL Row-Level Security
============================================

BRIEF
  Your multi-tenant PostgreSQL database has no row-level security.
  Users from tenant A can access tenant B's data. Enable RLS and
  create policies to enforce tenant isolation.

OBJECTIVES
  1. Inspect the table schema
  2. Enable row-level security
  3. Create tenant isolation policy
  4. Create admin bypass policy
  5. Test RLS with different users
  6. Verify data isolation

HINTS
  cat rls-policy.sql
  patch enable-rls
  patch tenant-policy
  patch admin-policy
  test tenant-a
  test tenant-b
  verify isolation
`

const initialState: MissionState = {
  cwd: "/app",
  fs: {
    "/app/README": { content: README, mode: "ro" },
    "/app/rls-policy.sql": { content: RLS_POLICY_INITIAL, mode: "rw" },
  },
  env: { INSPECTED: "no", RLS_ENABLED: "no", TENANT_POLICY: "no", ADMIN_POLICY: "no", TESTED: "no", VERIFIED: "no" },
  goalsMet: [],
  history: [],
}

export const postgresRlsMission: Mission = {
  slug: "postgres-rls",
  title: "PostgreSQL Row-Level Security: multi-tenant data isolation",
  brief: "Your multi-tenant PostgreSQL has no RLS. Enable RLS: create tenant isolation policy, admin bypass policy, test with different users, verify data isolation.",
  prompt: "defender@hodlberg-db:/app$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-027 — POSTGRESQL RLS") + bold(cyan("           │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "multi-tenant database · PostgreSQL · data isolation\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "inspect", label: "Inspect the table schema", hint: "cat rls-policy.sql" },
    { id: "enable", label: "Enable row-level security", hint: "patch enable-rls" },
    { id: "tenant", label: "Create tenant isolation policy", hint: "patch tenant-policy" },
    { id: "admin", label: "Create admin bypass policy", hint: "patch admin-policy" },
    { id: "test", label: "Test RLS with different users", hint: "test tenant-a" },
    { id: "verify", label: "Verify data isolation", hint: "verify isolation" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — DATA ISOLATED     │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+260") + dim("   PostgreSQL RLS: enabled, tenant isolation policy active, admin bypass configured, data isolation verified.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("patch enable-rls | tenant-policy | admin-policy") + "\r\n" +
      "  " + cyan("test tenant-a | tenant-b") + "  ·  " + cyan("verify isolation") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/app/README"] : undefined) ?? (args[0] === "rls-policy.sql" ? state.fs["/app/rls-policy.sql"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/app/rls-policy.sql" ? "inspect" : undefined }
    },
    patch: ({ state, args }) => {
      const p = "/app/rls-policy.sql"
      let c = state.fs[p]?.content ?? ""
      if (args[0] === "enable-rls") {
        if (/ALTER TABLE users ENABLE ROW LEVEL SECURITY/m.test(c)) return { stdout: yellow("already patched"), goalMet: "enable" }
        c = c.replace("-- No RLS enabled", "ALTER TABLE users ENABLE ROW LEVEL SECURITY;\n\n-- No RLS enabled")
        return { stdout: green("Enabled row-level security on users table"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, RLS_ENABLED: "yes" } }, goalMet: "enable" }
      }
      if (args[0] === "tenant-policy") {
        if (/CREATE POLICY tenant_isolation/m.test(c)) return { stdout: yellow("already patched"), goalMet: "tenant" }
        c = c.replace("-- Anyone can read/write any row", "-- Anyone can read/write any row\n\nCREATE POLICY tenant_isolation ON users\n  FOR ALL\n  TO app_user\n  USING (tenant_id = current_setting('app.current_tenant')::INTEGER);")
        return { stdout: green("Created tenant isolation policy"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, TENANT_POLICY: "yes" } }, goalMet: "tenant" }
      }
      if (args[0] === "admin-policy") {
        if (/CREATE POLICY admin_bypass/m.test(c)) return { stdout: yellow("already patched"), goalMet: "admin" }
        c = c.replace("USING (tenant_id = current_setting('app.current_tenant')::INTEGER);", "USING (tenant_id = current_setting('app.current_tenant')::INTEGER);\n\nCREATE POLICY admin_bypass ON users\n  FOR ALL\n  TO app_admin\n  USING (is_admin = true)\n  WITH CHECK (is_admin = true);")
        return { stdout: green("Created admin bypass policy"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, ADMIN_POLICY: "yes" } }, goalMet: "admin" }
      }
      return { stderr: "patch: unknown. Try 'patch enable-rls' / 'patch tenant-policy' / 'patch admin-policy'" }
    },
    test: ({ state, args }) => {
      if (args[0] === "tenant-a") {
        if (state.env.RLS_ENABLED !== "yes" || state.env.TENANT_POLICY !== "yes") return { stderr: "test: error — RLS not properly configured" }
        return {
          stdout: green("SET app.current_tenant = 1;\nSELECT * FROM users;\n-- Returns only rows where tenant_id = 1\n-- 3 rows returned (tenant A data only)"),
          statePatch: { env: { ...state.env, TESTED: "yes" } },
          goalMet: "test",
        }
      }
      if (args[0] === "tenant-b") {
        if (state.env.RLS_ENABLED !== "yes" || state.env.TENANT_POLICY !== "yes") return { stderr: "test: error — RLS not properly configured" }
        return {
          stdout: green("SET app.current_tenant = 2;\nSELECT * FROM users;\n-- Returns only rows where tenant_id = 2\n-- 2 rows returned (tenant B data only)"),
          statePatch: { env: { ...state.env, TESTED: "yes" } },
          goalMet: "test",
        }
      }
      return { stderr: "test: command not supported. Try 'test tenant-a' or 'test tenant-b'" }
    },
    verify: ({ state, args }) => {
      if (args[0] === "isolation") {
        if (state.env.TESTED !== "yes") return { stderr: "verify: error — tests not run yet" }
        return {
          stdout: green("Data isolation verified:\n  ✓ Tenant A cannot access Tenant B data\n  ✓ Tenant B cannot access Tenant A data\n  ✓ Admin can access all data (bypass policy)\n  ✓ RLS policies active and enforced"),
          statePatch: { env: { ...state.env, VERIFIED: "yes" } },
          goalMet: "verify",
        }
      }
      return { stderr: "verify: command not supported. Try 'verify isolation'" }
    },
    hint: ({ state }) => {
      const r = postgresRlsMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + postgresRlsMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
