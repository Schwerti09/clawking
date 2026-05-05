import type { Mission } from "../missionEngine"
import { nginxHstsMission } from "./nginx-hsts"
import { sshHardeningMission } from "./ssh-hardening"
import { ufwFirewallMission } from "./ufw-firewall"
import { letsEncryptMission } from "./lets-encrypt"
import { misconfigHuntMission } from "./misconfig-hunt"
import { dockerNonrootMission } from "./docker-nonroot"
import { postgresHardeningMission } from "./postgres-hardening"
import { reverseProxyRatelimitMission } from "./reverse-proxy-ratelimit"
import { backupRestoreDrillMission } from "./backup-restore-drill"
import { secretsRotationMission } from "./secrets-rotation"
import { k8sNetworkpolicyMission } from "./k8s-networkpolicy"
import { nginxAccessControlMission } from "./nginx-access-control"
import { dockerComposeHardeningMission } from "./docker-compose-hardening"
import { redisAuthAclMission } from "./redis-auth-acl"
import { jwtAlgNoneMission } from "./jwt-alg-none"
import { sessionSecurityMission } from "./session-security"
import { promptInjectionDefenseMission } from "./prompt-injection-defense"
import { aiAgentPermissionsMission } from "./ai-agent-permissions"
import { llmOutputSanitizeMission } from "./llm-output-sanitize"
import { llmRateLimitingMission } from "./llm-rate-limiting"
import { k8sPodSecurityMission } from "./k8s-pod-security"
import { oauth2PkceMission } from "./oauth2-pkce"
import { awsS3BucketPolicyMission } from "./aws-s3-bucket-policy"
import { fail2banSetupMission } from "./fail2ban-setup"

// Mission registry. Add new missions here; they become instantly routable via
// /academy/mission/[slug]. Mission metadata on the hub + track pages is pulled
// from MISSION_INDEX below, which associates each mission with a track.
export const MISSIONS: Record<string, Mission> = {
  // Foundations (beginner)
  [nginxHstsMission.slug]:        nginxHstsMission,
  [sshHardeningMission.slug]:     sshHardeningMission,
  [ufwFirewallMission.slug]:      ufwFirewallMission,
  [letsEncryptMission.slug]:      letsEncryptMission,
  [misconfigHuntMission.slug]:    misconfigHuntMission,
  // Stack Hardening (intermediate)
  [dockerNonrootMission.slug]:            dockerNonrootMission,
  [postgresHardeningMission.slug]:        postgresHardeningMission,
  [reverseProxyRatelimitMission.slug]:    reverseProxyRatelimitMission,
  [backupRestoreDrillMission.slug]:       backupRestoreDrillMission,
  [secretsRotationMission.slug]:          secretsRotationMission,
  [k8sNetworkpolicyMission.slug]:         k8sNetworkpolicyMission,
  [nginxAccessControlMission.slug]:       nginxAccessControlMission,
  [dockerComposeHardeningMission.slug]:   dockerComposeHardeningMission,
  [redisAuthAclMission.slug]:             redisAuthAclMission,
  // Auth & Identity (auth track)
  [jwtAlgNoneMission.slug]:       jwtAlgNoneMission,
  [sessionSecurityMission.slug]:  sessionSecurityMission,
  [oauth2PkceMission.slug]:       oauth2PkceMission,
  // AI Agent Security (advanced track)
  [promptInjectionDefenseMission.slug]:   promptInjectionDefenseMission,
  [aiAgentPermissionsMission.slug]:       aiAgentPermissionsMission,
  [llmOutputSanitizeMission.slug]:        llmOutputSanitizeMission,
  [llmRateLimitingMission.slug]:          llmRateLimitingMission,
  // Kubernetes Security (intermediate track)
  [k8sPodSecurityMission.slug]:          k8sPodSecurityMission,
  // Cloud Security (intermediate track)
  [awsS3BucketPolicyMission.slug]:       awsS3BucketPolicyMission,
  // Network Security (beginner track)
  [fail2banSetupMission.slug]:           fail2banSetupMission,
}

export interface MissionIndexEntry {
  slug: string
  track: string
  order: number
  xp: number
  durationMin: number
  accent: "emerald" | "blue" | "red" | "cyan" | "amber" | "violet" | "pink" | "lime"
}

// Stable ordering + metadata per track. Single source of truth for track pages.
export const MISSION_INDEX: MissionIndexEntry[] = [
  // Foundations (beginner) — Linux + nginx basics
  { slug: "nginx-hsts",         track: "beginner",     order: 1, xp: 120, durationMin: 5,  accent: "emerald" },
  { slug: "ssh-hardening",      track: "beginner",     order: 2, xp: 140, durationMin: 6,  accent: "emerald" },
  { slug: "ufw-firewall",       track: "beginner",     order: 3, xp: 130, durationMin: 5,  accent: "emerald" },
  { slug: "lets-encrypt",       track: "beginner",     order: 4, xp: 150, durationMin: 7,  accent: "emerald" },
  { slug: "misconfig-hunt",     track: "beginner",     order: 5, xp: 160, durationMin: 8,  accent: "emerald" },
  { slug: "fail2ban-setup",     track: "beginner",     order: 6, xp: 200, durationMin: 10, accent: "emerald" },
  // Stack Hardening (intermediate) — containers, databases, runtime hardening
  { slug: "docker-nonroot",          track: "intermediate", order: 1, xp: 150, durationMin: 7,  accent: "blue" },
  { slug: "postgres-hardening",      track: "intermediate", order: 2, xp: 180, durationMin: 10, accent: "blue" },
  { slug: "reverse-proxy-ratelimit", track: "intermediate", order: 3, xp: 200, durationMin: 9,  accent: "blue" },
  { slug: "backup-restore-drill",    track: "intermediate", order: 4, xp: 220, durationMin: 12, accent: "blue" },
  { slug: "secrets-rotation",        track: "intermediate", order: 5, xp: 240, durationMin: 13, accent: "blue" },
  { slug: "k8s-networkpolicy",       track: "intermediate", order: 6, xp: 260, durationMin: 14, accent: "blue" },
  { slug: "nginx-access-control",    track: "intermediate", order: 7, xp: 195, durationMin: 9,  accent: "cyan" },
  { slug: "docker-compose-hardening",track: "intermediate", order: 8, xp: 210, durationMin: 10, accent: "cyan" },
  { slug: "redis-auth-acl",          track: "intermediate", order: 9, xp: 230, durationMin: 11, accent: "cyan" },
  { slug: "k8s-pod-security",       track: "intermediate", order: 10, xp: 270, durationMin: 15, accent: "blue" },
  { slug: "aws-s3-bucket-policy",   track: "intermediate", order: 11, xp: 250, durationMin: 12, accent: "amber" },
  // Auth & Identity (auth track)
  { slug: "jwt-alg-none",       track: "auth",         order: 1, xp: 200, durationMin: 10, accent: "violet" },
  { slug: "session-security",   track: "auth",         order: 2, xp: 220, durationMin: 11, accent: "violet" },
  { slug: "oauth2-pkce",        track: "auth",         order: 3, xp: 230, durationMin: 12, accent: "violet" },
  // AI Agent Security (advanced track)
  { slug: "prompt-injection-defense", track: "advanced", order: 1, xp: 280, durationMin: 15, accent: "red" },
  { slug: "ai-agent-permissions",     track: "advanced", order: 2, xp: 260, durationMin: 14, accent: "red" },
  { slug: "llm-output-sanitize",      track: "advanced", order: 3, xp: 240, durationMin: 13, accent: "red" },
  { slug: "llm-rate-limiting",        track: "advanced", order: 4, xp: 250, durationMin: 12, accent: "red" },
]

export function getMission(slug: string): Mission | undefined {
  return MISSIONS[slug]
}

export function listMissionSlugs(): string[] {
  return Object.keys(MISSIONS)
}

export function listMissionsForTrack(trackSlug: string): MissionIndexEntry[] {
  return MISSION_INDEX.filter((m) => m.track === trackSlug).sort((a, b) => a.order - b.order)
}
