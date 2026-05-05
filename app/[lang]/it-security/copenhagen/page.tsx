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
    ? "IT Security Copenhagen 2026 — GDPR & NIS2"
    : "IT Security Copenhagen 2026 — GDPR & NIS2";
  const description = isDE
    ? "IT Security Copenhagen: GDPR, NIS2-Richtlinie, ISO 27001, NIS 2.0 für Kopenhagener Unternehmen. Enterprise Security Compliance."
    : "IT Security Copenhagen: GDPR, NIS2 directive, ISO 27001, NIS 2.0 for Copenhagen companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Copenhagen",
      "GDPR Copenhagen",
      "NIS2",
      "ISO 27001 Copenhagen",
      "Cybersecurity Copenhagen",
      "Enterprise Security",
      "Compliance Copenhagen",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/copenhagen"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/copenhagen`,
    },
  };
}

export default function CopenhagenITSecurityPage({
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
    ? "IT Security Copenhagen 2026 — GDPR & NIS2"
    : "IT Security Copenhagen 2026 — GDPR & NIS2";

  const subtitle = isDE
    ? "Enterprise Security für Kopenhagener Unternehmen"
    : "Enterprise Security for Copenhagen Companies";

  const description = isDE
    ? "Copenhagen ist ein Tech-Hub mit strengen Datenschutzanforderungen. GDPR, NIS2-Richtlinie, ISO 27001 und NIS 2.0 sind für Kopenhagener Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Copenhagen is a tech hub with strict data protection requirements. GDPR, NIS2 directive, ISO 27001, and NIS 2.0 are essential for Copenhagen companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Copenhagen-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Copenhagen-Spezifische Compliance" : "Copenhagen-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">GDPR</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Kopenhagener Unternehmen müssen GDPR-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Copenhagen companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">NIS2</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "NIS2-Richtlinie verlangt Cybersicherheit für kritische Infrastruktur in der EU."
                  : "NIS2 directive requires cybersecurity for critical infrastructure in the EU."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">Danish NIS Law</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Dänisches NIS-Gesetz implementiert NIS2 für kritische Infrastruktur."
                  : "Danish NIS law implements NIS2 for critical infrastructure."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Kopenhagener Kunden."
                  : "ISO 27001 certification demonstrates information security management for Copenhagen customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Copenhagen Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Kopenhagener Tech-Ökosystem" : "Copenhagen Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Unity, Trustpilot, Zendesk, Siteimprove"
                  : "Startups & Scaleups: Unity, Trustpilot, Zendesk, Siteimprove"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Maersk, Novo Nordisk, Danske Bank, Vestas"
                  : "Enterprise: Maersk, Novo Nordisk, Danske Bank, Vestas"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: University of Copenhagen, DTU, Aarhus University"
                  : "Research: University of Copenhagen, DTU, Aarhus University"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Danish Government, Danish DPA, CFCS"
                  : "Government: Danish Government, Danish DPA, CFCS"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="copenhagen-it-security"
            title={isDE ? "Copenhagen IT Security Checklist" : "Copenhagen IT Security Checklist"}
            items={[
              isDE ? "GDPR-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "NIS2 Anforderungen erfüllt" : "NIS2 requirements met",
              isDE ? "Danish NIS Law implementiert" : "Danish NIS law implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "Danish DPA Registrierung" : "Danish DPA registration",
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
            {isDE ? "Copenhagen IT Security Assessment" : "Copenhagen IT Security Assessment"}
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
