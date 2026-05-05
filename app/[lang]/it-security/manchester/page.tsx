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
    ? "IT Security Manchester 2026 — GDPR & UK Data Protection Act"
    : "IT Security Manchester 2026 — GDPR & UK Data Protection Act";
  const description = isDE
    ? "IT Security Manchester: GDPR, UK Data Protection Act, ISO 27001, Cyber Essentials für Manchester Unternehmen. Enterprise Security Compliance."
    : "IT Security Manchester: GDPR, UK Data Protection Act, ISO 27001, Cyber Essentials for Manchester companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Manchester",
      "GDPR Manchester",
      "UK Data Protection Act",
      "ISO 27001 Manchester",
      "Cyber Essentials",
      "Cybersecurity Manchester",
      "Enterprise Security",
      "Compliance Manchester",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/manchester"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/manchester`,
    },
  };
}

export default function ManchesterITSecurityPage({
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
    ? "IT Security Manchester 2026 — GDPR & UK Data Protection Act"
    : "IT Security Manchester 2026 — GDPR & UK Data Protection Act";

  const subtitle = isDE
    ? "Enterprise Security für Manchester Unternehmen"
    : "Enterprise Security for Manchester Companies";

  const description = isDE
    ? "Manchester ist ein Tech-Hub mit strengen Datenschutzanforderungen. GDPR, UK Data Protection Act, ISO 27001 und Cyber Essentials sind für Manchester Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Manchester is a tech hub with strict data protection requirements. GDPR, UK Data Protection Act, ISO 27001, and Cyber Essentials are essential for Manchester companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Manchester-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Manchester-Spezifische Compliance" : "Manchester-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">GDPR</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "General Data Protection Regulation gilt EU-weit und im UK. Manchester Unternehmen müssen GDPR-konform operieren."
                  : "General Data Protection Regulation applies EU-wide and in the UK. Manchester companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">UK Data Protection Act</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "UK Data Protection Act 2018 ergänzt GDPR für öffentliche Stellen im Vereinigten Königreich."
                  : "UK Data Protection Act 2018 supplements GDPR for public authorities in the United Kingdom."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">Cyber Essentials</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Cyber Essentials ist UK-Standard für Basis-Cybersicherheit für Regierungsaufträge."
                  : "Cyber Essentials is UK standard for basic cybersecurity for government contracts."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Manchester Kunden."
                  : "ISO 27001 certification demonstrates information security management for Manchester customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Manchester Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Manchester Tech-Ökosystem" : "Manchester Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: The Hut Group, AO.com, Auto Trader, OnTheMarket"
                  : "Startups & Scaleups: The Hut Group, AO.com, Auto Trader, OnTheMarket"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Co-op Group, Manchester Airport, Kellogg's, BAE Systems"
                  : "Enterprise: Co-op Group, Manchester Airport, Kellogg's, BAE Systems"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: University of Manchester, Manchester Metropolitan, Graphene"
                  : "Research: University of Manchester, Manchester Metropolitan, Graphene"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Manchester City Council, NCSC North, ICO"
                  : "Government: Manchester City Council, NCSC North, ICO"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="manchester-it-security"
            title={isDE ? "Manchester IT Security Checklist" : "Manchester IT Security Checklist"}
            items={[
              isDE ? "GDPR-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "UK Data Protection Act erfüllt" : "UK Data Protection Act met",
              isDE ? "Cyber Essentials Zertifizierung" : "Cyber Essentials certification",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "ICO-Registrierung abgeschlossen" : "ICO registration completed",
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
            {isDE ? "Manchester IT Security Assessment" : "Manchester IT Security Assessment"}
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
