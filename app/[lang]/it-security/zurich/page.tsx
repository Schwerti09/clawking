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
    ? "IT Security Zürich 2026 — DSGVO-compliance & FADP"
    : "IT Security Zurich 2026 — GDPR Compliance & FADP";
  const description = isDE
    ? "IT Security Zürich: DSGVO, FADP, BSI-Grundschutz, ISO 27001 für Zürcher Unternehmen. Enterprise Security Compliance."
    : "IT Security Zurich: GDPR, FADP, BSI baseline protection, ISO 27001 for Zurich companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Zürich",
      "DSGVO Zürich",
      "FADP",
      "BSI-Grundschutz",
      "ISO 27001 Zürich",
      "Cybersecurity Zürich",
      "Enterprise Security",
      "Compliance Zürich",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/zurich"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/zurich`,
    },
  };
}

export default function ZurichITSecurityPage({
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
    ? "IT Security Zürich 2026 — DSGVO-compliance & FADP"
    : "IT Security Zurich 2026 — GDPR Compliance & FADP";

  const subtitle = isDE
    ? "Enterprise Security für Zürcher Unternehmen"
    : "Enterprise Security for Zurich Companies";

  const description = isDE
    ? "Zürich ist ein Tech-Hub mit strengen Datenschutzanforderungen. DSGVO, FADP, BSI-Grundschutz und ISO 27001 sind für Zürcher Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Zurich is a tech hub with strict data protection requirements. GDPR, FADP, BSI baseline protection, and ISO 27001 are essential for Zurich companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Zürich-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Zürich-Spezifische Compliance" : "Zurich-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DSGVO (GDPR)</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Zürcher Unternehmen müssen DSGVO-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Zurich companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">FADP</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Schweizerisches Datenschutzgesetz (FADP) ergänzt DSGVO für öffentliche Stellen in der Schweiz."
                  : "Swiss Federal Data Protection Act (FADP) supplements GDPR for public authorities in Switzerland."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">BSI-Grundschutz</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "BSI-Grundschutz-Kompendium ist Standard für Informationssicherheit im deutschsprachigen Raum."
                  : "BSI baseline protection compendium is standard for information security in German-speaking regions."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Zürcher Kunden."
                  : "ISO 27001 certification demonstrates information security management for Zurich customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Zürich Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Zürcher Tech-Ökosystem" : "Zurich Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: DFINITY, Nexo, Crypto Finance, Tally"
                  : "Startups & Scaleups: DFINITY, Nexo, Crypto Finance, Tally"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: UBS, Credit Suisse, Zurich Insurance, Swiss Re"
                  : "Enterprise: UBS, Credit Suisse, Zurich Insurance, Swiss Re"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: ETH Zürich, Universität Zürich, IBM Research"
                  : "Research: ETH Zurich, University of Zurich, IBM Research"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Schweizer Bundesrat, Behörden, MELANI Zürich"
                  : "Government: Swiss Federal Council, Authorities, MELANI Zurich"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="zurich-it-security"
            title={isDE ? "Zürich IT Security Checklist" : "Zurich IT Security Checklist"}
            items={[
              isDE ? "DSGVO-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "FADP Anforderungen erfüllt" : "FADP requirements met",
              isDE ? "BSI-Grundschutz implementiert" : "BSI baseline protection implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "DSB-Ansprechpartner bekannt" : "DPO contact known",
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
            {isDE ? "Zürich IT Security Assessment" : "Zurich IT Security Assessment"}
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
