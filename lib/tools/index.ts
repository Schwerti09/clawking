// Registry of Arsenal tools. Each entry drives both the tools hub and the
// per-tool page metadata.

export type ToolStatus = "live" | "soon"

export interface Tool {
  slug: string
  name: string
  tagline: string
  description: string
  icon: string
  accent: "emerald" | "cyan" | "violet" | "amber" | "red" | "blue" | "pink" | "lime"
  status: ToolStatus
}

export const TOOLS: Tool[] = [
  {
    slug: "header-doctor",
    name: "Header Doctor",
    tagline: "Security headers graded + specific fixes.",
    description: "Paste any public URL. Get a per-header verdict, a score, and drop-in nginx/apache/express snippets for every gap.",
    icon: "🩺",
    accent: "emerald",
    status: "live",
  },
  {
    slug: "tls-xray",
    name: "TLS X-Ray",
    tagline: "Full TLS chain + protocol + cipher analysis.",
    description: "Inspect live certificates: chain, SANs, key strength, expiry, negotiated protocol and cipher. No API keys, no third-party dependencies.",
    icon: "🔬",
    accent: "cyan",
    status: "live",
  },
  {
    slug: "prompt-injection-sandbox",
    name: "Prompt Injection Sandbox",
    tagline: "Stress-test your system prompt against 40+ payloads.",
    description: "Paste your AI agent's system prompt. We run it against a curated library of known prompt-injection and jailbreak patterns and highlight likely bypasses.",
    icon: "🧪",
    accent: "violet",
    status: "live",
  },
  { slug: "cve-time-machine",   name: "CVE Time Machine",   tagline: "A library's full CVE history, visualized.",                 description: "Full CVE history timeline for any library with severity distribution and patched version ranges.", icon: "⏳", accent: "amber",  status: "live" },
  { slug: "password-entropy",   name: "Password Entropy Lab", tagline: "Rainbow-table-grade entropy visualization.",              description: "Analyze password strength, entropy bits, cracking time estimates, and compliance with NIST guidelines.", icon: "🔑", accent: "red",    status: "live" },
  { slug: "jwt-forensics",      name: "JWT Forensics",      tagline: "Decode + vulnerability scan + signature demo.",             description: "Decode JWTs, scan for algorithm confusion, weak keys, and verify signature mechanics.", icon: "🪪", accent: "blue",   status: "live" },
  { slug: "docker-grader",      name: "Docker Hardening Grader", tagline: "Paste Dockerfile → score + auto-fix.",                 description: "Grade Dockerfiles for security, detect base image vulnerabilities, analyze layers, and get remediation.", icon: "🐳", accent: "cyan",   status: "live" },
  { slug: "k8s-auditor",        name: "K8s Policy Auditor", tagline: "OPA-powered manifest audit.",                               description: "Audit Kubernetes manifests for RBAC, network policies, resource quotas, and Pod security policies.", icon: "⚓", accent: "violet", status: "live" },
  { slug: "nginx-scanner",      name: "Nginx Config Scanner", tagline: "Misconfig detector with explanations.",                   description: "Detect Nginx misconfigurations, SSL/TLS issues, insecure upstreams, and path traversal risks.", icon: "🕵️", accent: "emerald",status: "live" },
  { slug: "secret-scanner",     name: "Secret Pattern Scanner", tagline: "Find hardcoded credentials in pasted code.",            description: "Scan code for API keys, private keys, database credentials, and cloud tokens with severity ratings.", icon: "🔎", accent: "pink",   status: "live" },
  { slug: "actions-auditor",    name: "GitHub Actions Auditor", tagline: "Workflow security grade.",                              description: "Grade GitHub Actions workflows for action pinning, secrets, branch protection, and OIDC token usage.", icon: "⚙️", accent: "lime",   status: "live" },
  { slug: "dns-takeover",       name: "DNS Takeover Scanner", tagline: "Subdomain hijack risk map.",                              description: "Check DNS records for dangling CNAMEs, third-party service bindings, and subdomain hijack vectors.", icon: "🌐", accent: "cyan",   status: "live" },
  { slug: "nis2-gap",           name: "NIS2/EUVD Gap Scanner", tagline: "Compliance checklist + evidence.",                       description: "Generate NIS2 Directive & EUVD compliance checklists with gap analysis and remediation roadmap.", icon: "📑", accent: "amber",  status: "live" },
  { slug: "runbook-generator",  name: "Runbook Generator",  tagline: "Incident description → full Markdown runbook.",             description: "Generate incident response runbooks with escalation paths, communication templates, and review sections.", icon: "📘", accent: "blue",   status: "live" },
  { slug: "ai-jailbreak",       name: "AI Jailbreak Tester", tagline: "EU AI Act bias + robustness testing.",                     description: "Test AI models for EU AI Act compliance, bias, robustness, fairness, and harmful content boundaries.", icon: "🤖", accent: "red",    status: "live" },
]

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug)
}

export function listLiveTools(): Tool[] {
  return TOOLS.filter((t) => t.status === "live")
}
