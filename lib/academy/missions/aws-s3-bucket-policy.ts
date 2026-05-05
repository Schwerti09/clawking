// Mission M-023 — "AWS S3 Bucket Policy: restrict public access and enforce encryption"
import type { Mission, MissionState } from "../missionEngine"
import { bold, cyan, dim, gold, green, resolvePath, yellow } from "../missionEngine"

const BUCKET_POLICY_INITIAL = `# /app/bucket-policy.json — public bucket, no encryption
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::hodlberg-uploads/*"
    }
  ]
}
`

const README = `Mission M-023 — AWS S3 Bucket Policy
======================================

BRIEF
  Your S3 bucket allows public read access and has no encryption. A
  misconfiguration could expose all user uploads. Restrict access,
  enforce encryption, and block public ACLs.

OBJECTIVES
  1. Inspect the bucket policy
  2. Remove public read access
  3. Add specific IAM role restriction
  4. Add encryption requirement
  5. Block public ACLs
  6. Validate with AWS CLI

HINTS
  cat bucket-policy.json
  patch public-access
  patch iam-role
  patch encryption
  patch block-acls
  aws s3api put-bucket-policy
`

const initialState: MissionState = {
  cwd: "/app",
  fs: {
    "/app/README": { content: README, mode: "ro" },
    "/app/bucket-policy.json": { content: BUCKET_POLICY_INITIAL, mode: "rw" },
  },
  env: { PUBLIC_ACCESS: "yes", IAM_ROLE: "no", ENCRYPTION: "no", BLOCK_ACLS: "no", APPLIED: "no" },
  goalsMet: [],
  history: [],
}

export const awsS3BucketPolicyMission: Mission = {
  slug: "aws-s3-bucket-policy",
  title: "AWS S3 Bucket Policy: restrict public access and enforce encryption",
  brief: "Your S3 bucket allows public read access with no encryption. Harden it: remove public access, restrict to IAM role, enforce encryption, block public ACLs.",
  prompt: "defender@hodlberg-aws:/app$ ",
  welcome:
    bold(cyan("╭─────────────────────────────────────────────╮")) + "\r\n" +
    bold(cyan("│ ")) + bold("MISSION M-023 — AWS S3 BUCKET POLICY") + bold(cyan("      │")) + "\r\n" +
    bold(cyan("╰─────────────────────────────────────────────╯")) + "\r\n\r\n" +
    "hodlberg-uploads bucket · S3 · us-east-1\r\n" +
    dim("Read the brief: ") + cyan("cat README") + dim("  ·  ") + cyan("help") + "\r\n",
  goals: [
    { id: "inspect", label: "Inspect the bucket policy", hint: "cat bucket-policy.json" },
    { id: "public", label: "Remove public read access", hint: "patch public-access" },
    { id: "iam", label: "Add specific IAM role restriction", hint: "patch iam-role" },
    { id: "encryption", label: "Add encryption requirement", hint: "patch encryption" },
    { id: "acls", label: "Block public ACLs", hint: "patch block-acls" },
    { id: "apply", label: "Validate with AWS CLI", hint: "aws s3api put-bucket-policy" },
  ],
  success:
    gold("╭─────────────────────────────────────────────╮") + "\r\n" +
    gold("│  🏆  MISSION COMPLETE — BUCKET SECURED    │") + "\r\n" +
    gold("╰─────────────────────────────────────────────╯") + "\r\n" +
    dim("Defender XP: ") + green("+250") + dim("   S3 bucket: IAM-only access, AES-256 encryption enforced, public ACLs blocked.") + "\r\n",
  commands: {
    help: () => ({ stdout:
      bold("Commands") + "\r\n  " + cyan("help  ls  cat <f>  pwd  cd  clear  hint  goals") + "\r\n" +
      "  " + cyan("patch public-access | iam-role | encryption | block-acls") + "\r\n" +
      "  " + cyan("aws s3api put-bucket-policy") + "\r\n" }),
    pwd: ({ state }) => ({ stdout: state.cwd }),
    cd: ({ state, args }) => ({ statePatch: { cwd: resolvePath(state.cwd, args[0] ?? "/app") }, stdout: "" }),
    ls: ({ state }) => ({ stdout: Object.keys(state.fs).join("  ") }),
    cat: ({ state, args }) => {
      if (!args[0]) return { stderr: "cat: missing file" }
      const path = resolvePath(state.cwd, args[0])
      const entry = state.fs[path] ?? (args[0] === "README" ? state.fs["/app/README"] : undefined) ?? (args[0] === "bucket-policy.json" ? state.fs["/app/bucket-policy.json"] : undefined)
      if (!entry) return { stderr: `cat: ${args[0]}: no such file` }
      return { stdout: entry.content, goalMet: path === "/app/bucket-policy.json" ? "inspect" : undefined }
    },
    patch: ({ state, args }) => {
      const p = "/app/bucket-policy.json"
      let c = state.fs[p]?.content ?? ""
      if (args[0] === "public-access") {
        if (!/"Principal": "\*"/m.test(c)) return { stdout: yellow("already patched"), goalMet: "public" }
        c = c.replace('"Principal": "*",', '"Principal": { "AWS": "arn:aws:iam::123456789012:role/HodlbergAppRole" },')
        return { stdout: green("Replaced public principal with IAM role"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, PUBLIC_ACCESS: "no" } }, goalMet: "public" }
      }
      if (args[0] === "iam-role") {
        if (/HodlbergAppRole/m.test(c)) return { stdout: yellow("already patched"), goalMet: "iam" }
        c = c.replace('"Principal": { "AWS": "arn:aws:iam::123456789012:role/HodlbergAppRole" },', '"Principal": { "AWS": "arn:aws:iam::123456789012:role/HodlbergAppRole" },\n        "Condition": {\n          "StringEquals": {\n            "aws:PrincipalArn": "arn:aws:iam::123456789012:role/HodlbergAppRole"\n          }\n        }')
        return { stdout: green("Added IAM role condition"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, IAM_ROLE: "yes" } }, goalMet: "iam" }
      }
      if (args[0] === "encryption") {
        if (/s3:x-amz-server-side-encryption/m.test(c)) return { stdout: yellow("already patched"), goalMet: "encryption" }
        c = c.replace('"Resource": "arn:aws:s3:::hodlberg-uploads/*"', '"Resource": "arn:aws:s3:::hodlberg-uploads/*",\n        "Condition": {\n          "StringEquals": {\n            "s3:x-amz-server-side-encryption": "AES256"\n          }\n        }')
        return { stdout: green("Added encryption requirement"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, ENCRYPTION: "yes" } }, goalMet: "encryption" }
      }
      if (args[0] === "block-acls") {
        if (/BlockPublicAcls/m.test(c)) return { stdout: yellow("already patched"), goalMet: "acls" }
        c = c.replace('"Sid": "PublicReadGetObject",', '"Sid": "DenyPublicACLs",\n      "Effect": "Deny",\n      "Principal": "*",\n      "Action": ["s3:PutObjectAcl", "s3:PutObjectVersionAcl"],\n      "Resource": "arn:aws:s3:::hodlberg-uploads/*",\n      "Condition": {\n        "Bool": {\n          "aws:SecureTransport": "false"\n        }\n      },\n    },\n    {\n      "Sid": "PublicReadGetObject",')
        return { stdout: green("Added public ACL block"), statePatch: { fs: { [p]: { content: c, mode: "rw" } }, env: { ...state.env, BLOCK_ACLS: "yes" } }, goalMet: "acls" }
      }
      return { stderr: "patch: unknown. Try 'patch public-access' / 'patch iam-role' / 'patch encryption' / 'patch block-acls'" }
    },
    aws: ({ state, args }) => {
      if (args[0] === "s3api" && args[1] === "put-bucket-policy") {
        const c = state.fs["/app/bucket-policy.json"]?.content ?? ""
        if (state.env.PUBLIC_ACCESS === "yes") return { stderr: "aws: error — policy still allows public access" }
        if (state.env.ENCRYPTION === "no") return { stderr: "aws: error — encryption not enforced" }
        if (state.env.BLOCK_ACLS === "no") return { stderr: "aws: error — public ACLs not blocked" }
        return {
          stdout: green("Bucket policy updated for hodlberg-uploads"),
          statePatch: { env: { ...state.env, APPLIED: "yes" } },
          goalMet: "apply",
        }
      }
      return { stderr: "aws: command not supported. Try 'aws s3api put-bucket-policy'" }
    },
    hint: ({ state }) => {
      const r = awsS3BucketPolicyMission.goals.find((g) => !state.goalsMet.includes(g.id))
      return { stdout: r ? dim("→ ") + yellow(r.label) + dim("  (" + (r.hint ?? "") + ")") : green("All goals met.") }
    },
    goals: ({ state }) => ({ stdout: bold("Goals") + "\r\n" + awsS3BucketPolicyMission.goals.map((g) => (state.goalsMet.includes(g.id) ? green("  ✓ ") + dim(g.label) : dim("  · ") + g.label)).join("\r\n") }),
    clear: () => ({ stdout: "\x1b[2J\x1b[H" }),
    exit: () => ({ stdout: dim("— session closed —") }),
  },
  initialState,
}
