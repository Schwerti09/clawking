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
    ? "IT Security Lima 2026 — Personal Data Protection Law & INDECOPI"
    : "IT Security Lima 2026 — Personal Data Protection Law & INDECOPI";
  const description = isDE
    ? "IT Security Lima: Personal Data Protection Law, INDECOPI Guidelines, ISO 27001 für Lima Unternehmen. Enterprise Security Compliance."
    : "IT Security Lima: Personal Data Protection Law, INDECOPI Guidelines, ISO 27001 for Lima companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Lima",
      "Personal Data Protection Law",
      "INDECOPI",
      "ISO 27001 Lima",
      "Cybersecurity Lima",
      "Enterprise Security",
      "Compliance Lima",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/lima"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/lima`,
    },
  };
}

export default function LimaITSecurityPage({
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
    ? "IT Security Lima 2026 — Personal Data Protection Law & INDECOPI"
    : "IT Security Lima 2026 — Personal Data Protection Law & INDECOPI";

  const subtitle = isDE
    ? "Enterprise Security für Lima Unternehmen"
    : "Enterprise Security for Lima Companies";

  const description = isDE
    ? "Lima ist ein Tech-Hub mit strengen Datenschutzanforderungen. Personal Data Protection Law, INDECOPI-Richtlinien und ISO 27001 sind für Lima Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Lima is a tech hub with strict data protection requirements. Personal Data Protection Law, INDECOPI guidelines, and ISO 27001 are essential for Lima companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Lima-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Lima-Spezifische Compliance" : "Lima-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">Personal Data Protection Law</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Ley de Protección de Datos Personales verlangt Datenschutzmaßnahmen in Peru."
                  : "Ley de Protección de Datos Personales requires data protection measures in Peru."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">INDECOPI Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual veröffentlicht Datenschutz-Richtlinien."
                  : "Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual publishes data protection guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">INDECOPI-ISO/IEC 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "INDECOPI-ISO/IEC 27001 ist peruanischer Standard für Informationssicherheit."
                  : "INDECOPI-ISO/IEC 27001 is Peruvian standard for information security."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Lima Kunden."
                  : "ISO 27001 certification demonstrates information security management for Lima customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Lima Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Lima Tech-Ökosystem" : "Lima Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Crehana, Yape, PlazaVea, Cineplanet"
                  : "Startups & Scaleups: Crehana, Yape, PlazaVea, Cineplanet"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Grupo Gloria, Banco de Crédito del Perú, Telefónica del Perú, Buenaventura"
                  : "Enterprise: Grupo Gloria, Banco de Crédito del Perú, Telefónica del Perú, Buenaventura"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: Pontificia Universidad Católica del Perú, Universidad Nacional Mayor de San Marcos, CONCYTEC"
                  : "Research: Pontificia Universidad Católica del Perú, Universidad Nacional Mayor de San Marcos, CONCYTEC"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Peruvian Government, INDECOPI, Ministry of Justice"
                  : "Government: Peruvian Government, INDECOPI, Ministry of Justice"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="lima-it-security"
            title={isDE ? "Lima IT Security Checklist" : "Lima IT Security Checklist"}
            items={[
              isDE ? "Personal Data Protection Law Compliance durchgeführt" : "Personal Data Protection Law compliance conducted",
              isDE ? "INDECOPI Guidelines implementiert" : "INDECOPI guidelines implemented",
              isDE ? "INDECOPI-ISO/IEC 27001 implementiert" : "INDECOPI-ISO/IEC 27001 implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "INDECOPI Registrierung" : "INDECOPI registration",
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
            {isDE ? "Lima IT Security Assessment" : "Lima IT Security Assessment"}
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
