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
    ? "IT Security Dublin 2026 — GDPR & DPC"
    : "IT Security Dublin 2026 — GDPR & DPC";
  const description = isDE
    ? "IT Security Dublin: GDPR, DPC-Richtlinien, ISO 27001, NIS 2.0 für Dublin Unternehmen. Enterprise Security Compliance."
    : "IT Security Dublin: GDPR, DPC guidelines, ISO 27001, NIS 2.0 for Dublin companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Dublin",
      "GDPR Dublin",
      "DPC",
      "ISO 27001 Dublin",
      "Cybersecurity Dublin",
      "Enterprise Security",
      "Compliance Dublin",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/dublin"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/dublin`,
    },
  };
}

export default function DublinITSecurityPage({
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
    ? "IT Security Dublin 2026 — GDPR & DPC"
    : "IT Security Dublin 2026 — GDPR & DPC";

  const subtitle = isDE
    ? "Enterprise Security für Dublin Unternehmen"
    : "Enterprise Security for Dublin Companies";

  const description = isDE
    ? "Dublin ist ein Tech-Hub mit strengen Datenschutzanforderungen. GDPR, DPC-Richtlinien, ISO 27001 und NIS 2.0 sind für Dublin Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Dublin is a tech hub with strict data protection requirements. GDPR, DPC guidelines, ISO 27001, and NIS 2.0 are essential for Dublin companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Dublin-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Dublin-Spezifische Compliance" : "Dublin-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">GDPR</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Dublin Unternehmen müssen GDPR-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Dublin companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DPC Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Data Protection Commission veröffentlicht Datenschutz-Richtlinien."
                  : "Data Protection Commission publishes data protection guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">Irish NIS Law</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Irisches NIS-Gesetz implementiert NIS2 für kritische Infrastruktur."
                  : "Irish NIS law implements NIS2 for critical infrastructure."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Dublin Kunden."
                  : "ISO 27001 certification demonstrates information security management for Dublin customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Dublin Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Dublin Tech-Ökosystem" : "Dublin Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Intercom, Stripe, Fenergo, Flipdish"
                  : "Startups & Scaleups: Intercom, Stripe, Fenergo, Flipdish"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: AIB, Bank of Ireland, Ryanair, CRH"
                  : "Enterprise: AIB, Bank of Ireland, Ryanair, CRH"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: Trinity College Dublin, University College Dublin, SFI"
                  : "Research: Trinity College Dublin, University College Dublin, SFI"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Irish Government, DPC, NCSC Ireland"
                  : "Government: Irish Government, DPC, NCSC Ireland"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="dublin-it-security"
            title={isDE ? "Dublin IT Security Checklist" : "Dublin IT Security Checklist"}
            items={[
              isDE ? "GDPR-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "DPC Guidelines implementiert" : "DPC guidelines implemented",
              isDE ? "Irish NIS Law implementiert" : "Irish NIS law implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "DPC Registrierung" : "DPC registration",
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
            {isDE ? "Dublin IT Security Assessment" : "Dublin IT Security Assessment"}
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
