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
    ? "IT Security Mexico City 2026 — LFPDPPP & INAI"
    : "IT Security Mexico City 2026 — LFPDPPP & INAI";
  const description = isDE
    ? "IT Security Mexico City: LFPDPPP (Ley Federal de Protección de Datos Personales), INAI Guidelines, ISO 27001 für Mexico City Unternehmen. Enterprise Security Compliance."
    : "IT Security Mexico City: LFPDPPP (Ley Federal de Protección de Datos Personales), INAI Guidelines, ISO 27001 for Mexico City companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Mexico City",
      "LFPDPPP",
      "INAI",
      "ISO 27001 Mexico City",
      "Cybersecurity Mexico City",
      "Enterprise Security",
      "Compliance Mexico City",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/mexico-city"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/mexico-city`,
    },
  };
}

export default function MexicoCityITSecurityPage({
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
    ? "IT Security Mexico City 2026 — LFPDPPP & INAI"
    : "IT Security Mexico City 2026 — LFPDPPP & INAI";

  const subtitle = isDE
    ? "Enterprise Security für Mexico City Unternehmen"
    : "Enterprise Security for Mexico City Companies";

  const description = isDE
    ? "Mexico City ist ein Tech-Hub mit strengen Datenschutzanforderungen. LFPDPPP, INAI-Richtlinien und ISO 27001 sind für Mexico City Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Mexico City is a tech hub with strict data protection requirements. LFPDPPP, INAI guidelines, and ISO 27001 are essential for Mexico City companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Mexico City-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Mexico City-Spezifische Compliance" : "Mexico City-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">LFPDPPP</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Ley Federal de Protección de Datos Personales verlangt Datenschutzmaßnahmen in Mexiko."
                  : "Ley Federal de Protección de Datos Personales requires data protection measures in Mexico."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">INAI Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales veröffentlicht Datenschutz-Richtlinien."
                  : "Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales publishes data protection guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">NOM-151-SCFI-2016</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "NOM-151-SCFI-2016 ist mexikanischer Standard für elektronische Signaturen und Informationssicherheit."
                  : "NOM-151-SCFI-2016 is Mexican standard for electronic signatures and information security."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Mexico City Kunden."
                  : "ISO 27001 certification demonstrates information security management for Mexico City customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Mexico City Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Mexico City Tech-Ökosystem" : "Mexico City Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Kavak, Bitso, Clip, Konfio"
                  : "Startups & Scaleups: Kavak, Bitso, Clip, Konfio"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Grupo Bimbo, América Móvil, Cemex, Grupo México"
                  : "Enterprise: Grupo Bimbo, América Móvil, Cemex, Grupo México"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: UNAM, IPN, Tec de Monterrey"
                  : "Research: UNAM, IPN, Tec de Monterrey"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Mexican Government, INAI, Ministry of the Interior"
                  : "Government: Mexican Government, INAI, Ministry of the Interior"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="mexico-city-it-security"
            title={isDE ? "Mexico City IT Security Checklist" : "Mexico City IT Security Checklist"}
            items={[
              isDE ? "LFPDPPP Compliance durchgeführt" : "LFPDPPP compliance conducted",
              isDE ? "INAI Guidelines implementiert" : "INAI guidelines implemented",
              isDE ? "NOM-151-SCFI-2016 implementiert" : "NOM-151-SCFI-2016 implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "INAI Registrierung" : "INAI registration",
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
            {isDE ? "Mexico City IT Security Assessment" : "Mexico City IT Security Assessment"}
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
