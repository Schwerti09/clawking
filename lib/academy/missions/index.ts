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
import { incidentLogAnalysisMission } from "./incident-log-analysis"
import { tlsCertificateRotationMission } from "./tls-certificate-rotation"
import { postgresRlsMission } from "./postgres-rls"
import { githubActionsHardeningMission } from "./github-actions-hardening"
import { prometheusAlertingMission } from "./prometheus-alerting"
import { gdprDataMinimizationMission } from "./gdpr-data-minimization"
import { incidentDetectionBasicsMission } from "./incident-detection-basics"
import { nis2EngineeringControlsMission } from "./nis2-engineering-controls"
import { adversarialPatternRecognitionMission } from "./adversarial-pattern-recognition"
import { hodlbergSeedRoundBreachMission } from "./hodlberg-seed-round-breach"
import { hodlbergSeriesABreachMission } from "./hodlberg-series-a-breach"
import { hodlbergIpoBreachMission } from "./hodlberg-ipo-breach"
import { hodlbergAcquisitionBreachMission } from "./hodlberg-acquisition-breach"
import { hodlbergInsiderThreatMission } from "./hodlberg-insider-threat"
import { hodlbergStateSponsoredMission } from "./hodlberg-state-sponsored"
import { hodlbergCatastropheMission } from "./hodlberg-catastrophe"
import { hodlbergResurrectionMission } from "./hodlberg-resurrection"
import { hodlbergRedemptionMission } from "./hodlberg-redemption"
import { hodlbergLegacyMission } from "./hodlberg-legacy"
import { hodlbergEpilogueMission } from "./hodlberg-epilogue"
import { hodlbergFinaleMission } from "./hodlberg-finale"
import { incidentTriagePressureMission } from "./incident-triage-pressure"
import { incidentContainmentPlaybooksMission } from "./incident-containment-playbooks"
import { incidentForensicsMission } from "./incident-forensics"
import { incidentRecoveryMission } from "./incident-recovery"
import { incidentRootCauseMission } from "./incident-root-cause"
import { incidentPostmortemMission } from "./incident-postmortem"
import { incidentPlaybooksMission } from "./incident-playbooks"
import { incidentCommunicationMission } from "./incident-communication"
import { incidentDrillsMission } from "./incident-drills"
import { complianceDoraMission } from "./compliance-dora"
import { complianceEuAiActMission } from "./compliance-eu-ai-act"
import { complianceDsgvoArt32Mission } from "./compliance-dsgvo-art32"
import { complianceEvidenceCollectionMission } from "./compliance-evidence-collection"
import { complianceSoc2Mission } from "./compliance-soc2"
import { complianceIso27001Mission } from "./compliance-iso27001"
import { complianceThirdPartyRiskMission } from "./compliance-third-party-risk"
import { adversarialSupplyChainMission } from "./adversarial-supply-chain"
import { adversarialSocialEngineeringMission } from "./adversarial-social-engineering"
import { adversarialRansomwareMission } from "./adversarial-ransomware"
import { adversarialMlSecurityMission } from "./adversarial-ml-security"
import { adversarialRedTeamingMission } from "./adversarial-red-teaming"
import { adversarialBlueTeamingMission } from "./adversarial-blue-teaming"
import { adversarialPurpleTeamingMission } from "./adversarial-purple-teaming"
import { adversarialThreatIntelMission } from "./adversarial-threat-intel"
import { adversarialOsintMission } from "./adversarial-osint"

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
  // Incident Response (advanced track)
  [incidentLogAnalysisMission.slug]:      incidentLogAnalysisMission,
  // Certificate Management (intermediate track)
  [tlsCertificateRotationMission.slug]:   tlsCertificateRotationMission,
  // Database Security (intermediate track)
  [postgresRlsMission.slug]:              postgresRlsMission,
  // CI/CD Security (intermediate track)
  [githubActionsHardeningMission.slug]:   githubActionsHardeningMission,
  // Monitoring & Observability (intermediate track)
  [prometheusAlertingMission.slug]:      prometheusAlertingMission,
  // Compliance (advanced track)
  [gdprDataMinimizationMission.slug]:    gdprDataMinimizationMission,
  [nis2EngineeringControlsMission.slug]: nis2EngineeringControlsMission,
  [complianceDoraMission.slug]:          complianceDoraMission,
  [complianceEuAiActMission.slug]:       complianceEuAiActMission,
  [complianceDsgvoArt32Mission.slug]:   complianceDsgvoArt32Mission,
  [complianceEvidenceCollectionMission.slug]: complianceEvidenceCollectionMission,
  [complianceSoc2Mission.slug]:         complianceSoc2Mission,
  [complianceIso27001Mission.slug]:     complianceIso27001Mission,
  [complianceThirdPartyRiskMission.slug]: complianceThirdPartyRiskMission,
  // Incident Response (advanced track)
  [incidentDetectionBasicsMission.slug]:  incidentDetectionBasicsMission,
  [incidentTriagePressureMission.slug]:   incidentTriagePressureMission,
  [incidentContainmentPlaybooksMission.slug]: incidentContainmentPlaybooksMission,
  [incidentForensicsMission.slug]:        incidentForensicsMission,
  [incidentRecoveryMission.slug]:         incidentRecoveryMission,
  [incidentRootCauseMission.slug]:        incidentRootCauseMission,
  [incidentPostmortemMission.slug]:       incidentPostmortemMission,
  [incidentPlaybooksMission.slug]:        incidentPlaybooksMission,
  [incidentCommunicationMission.slug]:    incidentCommunicationMission,
  [incidentDrillsMission.slug]:           incidentDrillsMission,
  // Adversarial Defense (advanced track)
  [adversarialPatternRecognitionMission.slug]: adversarialPatternRecognitionMission,
  [adversarialSupplyChainMission.slug]: adversarialSupplyChainMission,
  [adversarialSocialEngineeringMission.slug]: adversarialSocialEngineeringMission,
  [adversarialRansomwareMission.slug]: adversarialRansomwareMission,
  [adversarialMlSecurityMission.slug]: adversarialMlSecurityMission,
  [adversarialRedTeamingMission.slug]: adversarialRedTeamingMission,
  [adversarialBlueTeamingMission.slug]: adversarialBlueTeamingMission,
  [adversarialPurpleTeamingMission.slug]: adversarialPurpleTeamingMission,
  [adversarialThreatIntelMission.slug]: adversarialThreatIntelMission,
  [adversarialOsintMission.slug]: adversarialOsintMission,
  // Story (story track)
  [hodlbergSeedRoundBreachMission.slug]: hodlbergSeedRoundBreachMission,
  [hodlbergSeriesABreachMission.slug]: hodlbergSeriesABreachMission,
  [hodlbergIpoBreachMission.slug]: hodlbergIpoBreachMission,
  [hodlbergAcquisitionBreachMission.slug]: hodlbergAcquisitionBreachMission,
  [hodlbergInsiderThreatMission.slug]: hodlbergInsiderThreatMission,
  [hodlbergStateSponsoredMission.slug]: hodlbergStateSponsoredMission,
  [hodlbergCatastropheMission.slug]: hodlbergCatastropheMission,
  [hodlbergResurrectionMission.slug]: hodlbergResurrectionMission,
  [hodlbergRedemptionMission.slug]: hodlbergRedemptionMission,
  [hodlbergLegacyMission.slug]: hodlbergLegacyMission,
  [hodlbergEpilogueMission.slug]: hodlbergEpilogueMission,
  [hodlbergFinaleMission.slug]: hodlbergFinaleMission,
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
  { slug: "tls-certificate-rotation", track: "intermediate", order: 12, xp: 240, durationMin: 13, accent: "cyan" },
  { slug: "postgres-rls",            track: "intermediate", order: 13, xp: 260, durationMin: 14, accent: "blue" },
  { slug: "github-actions-hardening", track: "intermediate", order: 14, xp: 270, durationMin: 15, accent: "amber" },
  { slug: "prometheus-alerting",     track: "intermediate", order: 15, xp: 250, durationMin: 14, accent: "cyan" },
  // Auth & Identity (auth track)
  { slug: "jwt-alg-none",       track: "auth",         order: 1, xp: 200, durationMin: 10, accent: "violet" },
  { slug: "session-security",   track: "auth",         order: 2, xp: 220, durationMin: 11, accent: "violet" },
  { slug: "oauth2-pkce",        track: "auth",         order: 3, xp: 230, durationMin: 12, accent: "violet" },
  // AI Agent Security (advanced track)
  { slug: "prompt-injection-defense", track: "advanced", order: 1, xp: 280, durationMin: 15, accent: "red" },
  { slug: "ai-agent-permissions",     track: "advanced", order: 2, xp: 260, durationMin: 14, accent: "red" },
  { slug: "llm-output-sanitize",      track: "advanced", order: 3, xp: 240, durationMin: 13, accent: "red" },
  { slug: "llm-rate-limiting",        track: "advanced", order: 4, xp: 250, durationMin: 12, accent: "red" },
  // Incident Response (advanced track)
  { slug: "incident-log-analysis",    track: "advanced", order: 1, xp: 280, durationMin: 16, accent: "red" },
  { slug: "incident-detection-basics", track: "advanced", order: 2, xp: 250, durationMin: 12, accent: "red" },
  { slug: "incident-triage-pressure", track: "advanced", order: 3, xp: 260, durationMin: 13, accent: "red" },
  { slug: "incident-containment-playbooks", track: "advanced", order: 4, xp: 270, durationMin: 14, accent: "red" },
  { slug: "incident-forensics",       track: "advanced", order: 5, xp: 280, durationMin: 15, accent: "red" },
  { slug: "incident-recovery",        track: "advanced", order: 6, xp: 290, durationMin: 16, accent: "red" },
  { slug: "incident-root-cause",      track: "advanced", order: 7, xp: 300, durationMin: 17, accent: "red" },
  { slug: "incident-postmortem",       track: "advanced", order: 8, xp: 310, durationMin: 18, accent: "red" },
  { slug: "incident-playbooks",       track: "advanced", order: 9, xp: 320, durationMin: 19, accent: "red" },
  { slug: "incident-communication",   track: "advanced", order: 10, xp: 330, durationMin: 20, accent: "red" },
  { slug: "incident-drills",          track: "advanced", order: 11, xp: 340, durationMin: 21, accent: "red" },
  // Compliance (advanced track)
  { slug: "gdpr-data-minimization",   track: "advanced", order: 1, xp: 290, durationMin: 17, accent: "violet" },
  { slug: "nis2-engineering-controls", track: "advanced", order: 2, xp: 280, durationMin: 15, accent: "violet" },
  { slug: "compliance-dora",          track: "advanced", order: 3, xp: 300, durationMin: 18, accent: "violet" },
  { slug: "compliance-eu-ai-act",     track: "advanced", order: 4, xp: 310, durationMin: 19, accent: "violet" },
  { slug: "compliance-dsgvo-art32",   track: "advanced", order: 5, xp: 320, durationMin: 20, accent: "violet" },
  { slug: "compliance-evidence-collection", track: "advanced", order: 6, xp: 330, durationMin: 21, accent: "violet" },
  { slug: "compliance-soc2",          track: "advanced", order: 7, xp: 340, durationMin: 22, accent: "violet" },
  { slug: "compliance-iso27001",      track: "advanced", order: 8, xp: 350, durationMin: 23, accent: "violet" },
  { slug: "compliance-third-party-risk", track: "advanced", order: 9, xp: 360, durationMin: 24, accent: "violet" },
  // Adversarial Defense (advanced track)
  { slug: "adversarial-pattern-recognition", track: "advanced", order: 1, xp: 300, durationMin: 18, accent: "red" },
  { slug: "adversarial-supply-chain",   track: "advanced", order: 2, xp: 320, durationMin: 20, accent: "red" },
  { slug: "adversarial-social-engineering", track: "advanced", order: 3, xp: 330, durationMin: 21, accent: "red" },
  { slug: "adversarial-ransomware",    track: "advanced", order: 4, xp: 340, durationMin: 22, accent: "red" },
  { slug: "adversarial-ml-security",   track: "advanced", order: 5, xp: 350, durationMin: 23, accent: "red" },
  { slug: "adversarial-red-teaming",   track: "advanced", order: 6, xp: 360, durationMin: 24, accent: "red" },
  { slug: "adversarial-blue-teaming",  track: "advanced", order: 7, xp: 370, durationMin: 25, accent: "red" },
  { slug: "adversarial-purple-teaming", track: "advanced", order: 8, xp: 380, durationMin: 26, accent: "red" },
  { slug: "adversarial-threat-intel",  track: "advanced", order: 9, xp: 390, durationMin: 27, accent: "red" },
  { slug: "adversarial-osint",         track: "advanced", order: 10, xp: 400, durationMin: 28, accent: "red" },
  // Story (story track)
  { slug: "hodlberg-seed-round-breach", track: "story", order: 1, xp: 350, durationMin: 20, accent: "pink" },
  { slug: "hodlberg-series-a-breach",   track: "story", order: 2, xp: 370, durationMin: 22, accent: "pink" },
  { slug: "hodlberg-ipo-breach",       track: "story", order: 3, xp: 390, durationMin: 24, accent: "pink" },
  { slug: "hodlberg-acquisition-breach", track: "story", order: 4, xp: 410, durationMin: 26, accent: "pink" },
  { slug: "hodlberg-insider-threat",   track: "story", order: 5, xp: 430, durationMin: 28, accent: "pink" },
  { slug: "hodlberg-state-sponsored",  track: "story", order: 6, xp: 450, durationMin: 30, accent: "pink" },
  { slug: "hodlberg-catastrophe",      track: "story", order: 7, xp: 470, durationMin: 32, accent: "pink" },
  { slug: "hodlberg-resurrection",     track: "story", order: 8, xp: 490, durationMin: 34, accent: "pink" },
  { slug: "hodlberg-redemption",      track: "story", order: 9, xp: 510, durationMin: 36, accent: "pink" },
  { slug: "hodlberg-legacy",          track: "story", order: 10, xp: 530, durationMin: 38, accent: "pink" },
  { slug: "hodlberg-epilogue",       track: "story", order: 11, xp: 550, durationMin: 40, accent: "pink" },
  { slug: "hodlberg-finale",         track: "story", order: 12, xp: 570, durationMin: 42, accent: "pink" },
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
