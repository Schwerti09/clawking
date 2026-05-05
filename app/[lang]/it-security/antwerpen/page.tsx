import type { Metadata } from "next";
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/config";
import { getCoreSecurityLinks } from "@/lib/core-security-links";
import InteractiveChecklist from "@/app/runbook/[slug]/_components/InteractiveChecklist";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale)
    ? params.lang
    : "de") as Locale;

  const isDE = locale === "de";
  const title = isDE
    ? "IT Security Antwerpen 2026 — DSGVO & GDPR"
    : "IT Security Antwerp 2026 — GDPR & GDPR";
  const description = isDE
    ? "IT Security Antwerpen: DSGVO, GDPR, ISO 27001, NBN ISO/IEC 27001 für Antwerpener Unternehmen. Enterprise Security Compliance."
    : "IT Security Antwerp: GDPR, GDPR, ISO 27001, NBN ISO/IEC 27001 for Antwerp companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Antwerpen",
      "DSGVO Antwerpen",
      "GDPR",
      "NBN ISO/IEC 27001",
      "ISO 27001 Antwerpen",
      "Cybersecurity Antwerpen",
      "Enterprise Security",
      "Compliance Antwerpen",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/antwerpen"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/antwerpen`,
    },
  };
}

export default function AntwerpenITSecurityPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = (SUPPORTED_LOCALES.includes(params.lang as Locale)
    ? params.lang
    : "de") as Locale;

  const isDE = locale === "de";
  const prefix = locale === "de" ? "/de" : "/en";
  const coreLinks = getCoreSecurityLinks(locale);

  const title = isDE
    ? "IT Security Antwerpen 2026 — DSGVO & GDPR"
    : "IT Security Antwerp 2026 — GDPR & GDPR";

  const subtitle = isDE
    ? "Enterprise Security für Antwerpener Unternehmen"
    : "Enterprise Security for Antwerp Companies";

  const description = isDE
    ? "Antwerpen ist ein Tech-Hub mit strengen Datenschutzanforderungen. DSGVO, GDPR, NBN ISO/IEC 27001 und ISO 27001 sind für Antwerpener Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Antwerp is a tech hub with strict data protection requirements. GDPR, GDPR, NBN ISO/IEC 27001, and ISO 27001 are essential for Antwerp companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Antwerpen-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Antwerpen-Spezifische Compliance" : "Antwerp-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DSGVO (GDPR)</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Antwerpener Unternehmen müssen DSGVO-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Antwerp companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">Belgian GDPR</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Belgische Datenschutzgesetzgebung ergänzt DSGVO für öffentliche Stellen in Belgien."
                  : "Belgian data protection legislation supplements GDPR for public authorities in Belgium."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">NBN ISO/IEC 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "NBN ISO/IEC 27001 ist belgischer Standard für Informationssicherheit."
                  : "NBN ISO/IEC 27001 is Belgian standard for information security."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Antwerpener Kunden."
                  : "ISO 27001 certification demonstrates information security management for Antwerp customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Antwerpen Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Antwerpener Tech-Ökosystem" : "Antwerp Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Ansys, Materialise, Barco, Rombit"
                  : "Startups & Scaleups: Ansys, Materialise, Barco, Rombit"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Port of Antwerp, KBC, Borealis, Atlas Copco"
                  : "Enterprise: Port of Antwerp, KBC, Borealis, Atlas Copco"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: University of Antwerp, Antwerp Management School, VITO"
                  : "Research: University of Antwerp, Antwerp Management School, VITO"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Antwerpen Stad, Belgian Government, APD"
                  : "Government: Antwerp City, Belgian Government, APD"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="antwerpen-it-security"
            title={isDE ? "Antwerpen IT Security Checklist" : "Antwerp IT Security Checklist"}
            items={[
              isDE ? "DSGVO-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "Belgian GDPR Anforderungen erfüllt" : "Belgian GDPR requirements met",
              isDE ? "NBN ISO/IEC 27001 implementiert" : "NBN ISO/IEC 27001 implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "APD Registrierung" : "APD registration",
              isDE ? "Security Awareness Training durchgeführt" : "Security awareness training conducted",
              isDE ? "Incident Response Plan definiert" : "Incident Response Plan defined",
              isDE ? "Backup & Recovery getestet" : "Backup & Recovery tested",
              isDE ? "Access Control implementiert" : "Access Control implemented",
              isDE ? "Encryption at Rest aktiviert" : "Encryption at Rest enabled",
              isDE ? "TLS/SSL für alle Verbindungen" : "TLS/SSL for all connections",
              isDE ? "Security Monitoring konfiguriert" : "Security Monitoring configured",
              isDE ? "Penetration Testing geplant" : "Penetration Testing planned",
            ]}
          />
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            {isDE ? "Antwerpen IT Security Assessment" : "Antwerp IT Security Assessment"}
          </h2>
          <a href={coreLinks.check} className="inline-block px-6 py-3 bg-gray-800 text-blue-400 rounded-lg font-semibold">
            {isDE ? "Assessment Starten" : "Start Assessment"}
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <a href={`${prefix}/openclaw-security-check`} className="rounded-lg border border-white/30 px-3 py-2 text-white hover:bg-white/10">OpenClaw Security Hub</a>
            <a href={`${prefix}/ai-agent-security`} className="rounded-lg border border-white/30 px-3 py-2 text-white hover:bg-white/10">AI Agent Security</a>
            <a href={`${prefix}/runbooks/security`} className="rounded-lg border border-white/30 px-3 py-2 text-white hover:bg-white/10">Security Runbooks</a>
            <a href={coreLinks.methodology} className="rounded-lg border border-white/30 px-3 py-2 text-white hover:bg-white/10">Methodology</a>
          </div>
        </section>
      </div>
    </main>
  );
}
