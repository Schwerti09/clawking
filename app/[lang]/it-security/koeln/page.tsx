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
    ? "IT Security Köln 2026 — DSGVO-compliance & DSG NRW"
    : "IT Security Cologne 2026 — GDPR Compliance & DSG NRW";
  const description = isDE
    ? "IT Security Köln: DSGVO, DSG NRW, BSI-Grundschutz, ISO 27001 für Kölner Unternehmen. Enterprise Security Compliance."
    : "IT Security Cologne: GDPR, DSG NRW, BSI baseline protection, ISO 27001 for Cologne companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Köln",
      "DSGVO Köln",
      "DSG NRW",
      "BSI-Grundschutz",
      "ISO 27001 Köln",
      "Cybersecurity Köln",
      "Enterprise Security",
      "Compliance Köln",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/koeln"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/koeln`,
    },
  };
}

export default function KoelnITSecurityPage({
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
    ? "IT Security Köln 2026 — DSGVO-compliance & DSG NRW"
    : "IT Security Cologne 2026 — GDPR Compliance & DSG NRW";

  const subtitle = isDE
    ? "Enterprise Security für Kölner Unternehmen"
    : "Enterprise Security for Cologne Companies";

  const description = isDE
    ? "Köln ist ein Tech-Hub mit strengen Datenschutzanforderungen. DSGVO, DSG NRW, BSI-Grundschutz und ISO 27001 sind für Kölner Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Cologne is a tech hub with strict data protection requirements. GDPR, DSG NRW, BSI baseline protection, and ISO 27001 are essential for Cologne companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Köln-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Köln-Spezifische Compliance" : "Cologne-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DSGVO (GDPR)</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Kölner Unternehmen müssen DSGVO-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Cologne companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DSG NRW</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutzgesetz Nordrhein-Westfalen (DSG NRW) ergänzt DSGVO für öffentliche Stellen in NRW."
                  : "Data Protection Act North Rhine-Westphalia (DSG NRW) supplements GDPR for public authorities in NRW."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">BSI-Grundschutz</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "BSI-Grundschutz-Kompendium ist Standard für Informationssicherheit in Deutschland."
                  : "BSI baseline protection compendium is standard for information security in Germany."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Kölner Kunden."
                  : "ISO 27001 certification demonstrates information security management for Cologne customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Köln Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Kölner Tech-Ökosystem" : "Cologne Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Trivago, SinnerSchrader, DeepL (Düsseldorf), Adjust"
                  : "Startups & Scaleups: Trivago, SinnerSchrader, DeepL (Düsseldorf), Adjust"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: REWE, Deutsche Telekom, Ford Köln, RTL"
                  : "Enterprise: REWE, Deutsche Telekom, Ford Cologne, RTL"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: Universität zu Köln, TH Köln, Fraunhofer"
                  : "Research: University of Cologne, TH Cologne, Fraunhofer"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Landtag NRW, Behörden, BSI Köln"
                  : "Government: NRW State Parliament, Authorities, BSI Cologne"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="koeln-it-security"
            title={isDE ? "Köln IT Security Checklist" : "Cologne IT Security Checklist"}
            items={[
              isDE ? "DSGVO-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "DSG NRW Anforderungen erfüllt" : "DSG NRW requirements met",
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
            {isDE ? "Köln IT Security Assessment" : "Cologne IT Security Assessment"}
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
