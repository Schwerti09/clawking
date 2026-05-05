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
    ? "IT Security Wien 2026 — DSGVO-compliance & DSG 2018"
    : "IT Security Vienna 2026 — GDPR Compliance & DSG 2018";
  const description = isDE
    ? "IT Security Wien: DSGVO, DSG 2018, BSI-Grundschutz, ISO 27001 für Wiener Unternehmen. Enterprise Security Compliance."
    : "IT Security Vienna: GDPR, DSG 2018, BSI baseline protection, ISO 27001 for Vienna companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Wien",
      "DSGVO Wien",
      "DSG 2018",
      "BSI-Grundschutz",
      "ISO 27001 Wien",
      "Cybersecurity Wien",
      "Enterprise Security",
      "Compliance Wien",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/wien"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/wien`,
    },
  };
}

export default function WienITSecurityPage({
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
    ? "IT Security Wien 2026 — DSGVO-compliance & DSG 2018"
    : "IT Security Vienna 2026 — GDPR Compliance & DSG 2018";

  const subtitle = isDE
    ? "Enterprise Security für Wiener Unternehmen"
    : "Enterprise Security for Vienna Companies";

  const description = isDE
    ? "Wien ist ein Tech-Hub mit strengen Datenschutzanforderungen. DSGVO, DSG 2018, BSI-Grundschutz und ISO 27001 sind für Wiener Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Vienna is a tech hub with strict data protection requirements. GDPR, DSG 2018, BSI baseline protection, and ISO 27001 are essential for Vienna companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Wien-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Wien-Spezifische Compliance" : "Vienna-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DSGVO (GDPR)</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Wiener Unternehmen müssen DSGVO-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Vienna companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DSG 2018</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Österreichisches Datenschutzgesetz (DSG 2018) ergänzt DSGVO für öffentliche Stellen in Österreich."
                  : "Austrian Data Protection Act (DSG 2018) supplements GDPR for public authorities in Austria."}
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
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Wiener Kunden."
                  : "ISO 27001 certification demonstrates information security management for Vienna customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Wien Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Wiener Tech-Ökosystem" : "Vienna Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Bitpanda, Shpock, Runtastic, Wikitude"
                  : "Startups & Scaleups: Bitpanda, Shpock, Runtastic, Wikitude"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: OMV, Verbund, Erste Group, Vienna Insurance"
                  : "Enterprise: OMV, Verbund, Erste Group, Vienna Insurance"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: TU Wien, Universität Wien, AIT"
                  : "Research: TU Vienna, University of Vienna, AIT"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Österreichischer Nationalrat, Behörden, BSI Wien"
                  : "Government: Austrian Parliament, Authorities, BSI Vienna"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="wien-it-security"
            title={isDE ? "Wien IT Security Checklist" : "Vienna IT Security Checklist"}
            items={[
              isDE ? "DSGVO-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "DSG 2018 Anforderungen erfüllt" : "DSG 2018 requirements met",
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
            {isDE ? "Wien IT Security Assessment" : "Vienna IT Security Assessment"}
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
