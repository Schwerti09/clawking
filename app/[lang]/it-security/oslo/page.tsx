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
    ? "IT Security Oslo 2026 — GDPR & NIS2"
    : "IT Security Oslo 2026 — GDPR & NIS2";
  const description = isDE
    ? "IT Security Oslo: GDPR, NIS2-Richtlinie, ISO 27001, NIS 2.0 für Oslo Unternehmen. Enterprise Security Compliance."
    : "IT Security Oslo: GDPR, NIS2 directive, ISO 27001, NIS 2.0 for Oslo companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Oslo",
      "GDPR Oslo",
      "NIS2",
      "ISO 27001 Oslo",
      "Cybersecurity Oslo",
      "Enterprise Security",
      "Compliance Oslo",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/oslo"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/oslo`,
    },
  };
}

export default function OsloITSecurityPage({
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
    ? "IT Security Oslo 2026 — GDPR & NIS2"
    : "IT Security Oslo 2026 — GDPR & NIS2";

  const subtitle = isDE
    ? "Enterprise Security für Oslo Unternehmen"
    : "Enterprise Security for Oslo Companies";

  const description = isDE
    ? "Oslo ist ein Tech-Hub mit strengen Datenschutzanforderungen. GDPR, NIS2-Richtlinie, ISO 27001 und NIS 2.0 sind für Oslo Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Oslo is a tech hub with strict data protection requirements. GDPR, NIS2 directive, ISO 27001, and NIS 2.0 are essential for Oslo companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Oslo-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Oslo-Spezifische Compliance" : "Oslo-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">GDPR</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Oslo Unternehmen müssen GDPR-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Oslo companies must operate GDPR-compliant."}
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
              <h4 className="font-semibold text-blue-400 mb-3">Norwegian NIS Law</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Norwegisches NIS-Gesetz implementiert NIS2 für kritische Infrastruktur."
                  : "Norwegian NIS law implements NIS2 for critical infrastructure."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Oslo Kunden."
                  : "ISO 27001 certification demonstrates information security management for Oslo customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Oslo Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Oslo Tech-Ökosystem" : "Oslo Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Kahoot, Opera, Vipps, DNB"
                  : "Startups & Scaleups: Kahoot, Opera, Vipps, DNB"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Equinor, Telenor, DNB, Norsk Hydro"
                  : "Enterprise: Equinor, Telenor, DNB, Norsk Hydro"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: University of Oslo, NTNU, SINTEF"
                  : "Research: University of Oslo, NTNU, SINTEF"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Norwegian Government, Norwegian DPA, NSM"
                  : "Government: Norwegian Government, Norwegian DPA, NSM"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="oslo-it-security"
            title={isDE ? "Oslo IT Security Checklist" : "Oslo IT Security Checklist"}
            items={[
              isDE ? "GDPR-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "NIS2 Anforderungen erfüllt" : "NIS2 requirements met",
              isDE ? "Norwegian NIS Law implementiert" : "Norwegian NIS law implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "Norwegian DPA Registrierung" : "Norwegian DPA registration",
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
            {isDE ? "Oslo IT Security Assessment" : "Oslo IT Security Assessment"}
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
