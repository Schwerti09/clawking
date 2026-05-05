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
    ? "IT Security Buenos Aires 2026 — PDP Law & AAIP"
    : "IT Security Buenos Aires 2026 — PDP Law & AAIP";
  const description = isDE
    ? "IT Security Buenos Aires: PDP Law (Personal Data Protection Law), AAIP Guidelines, ISO 27001 für Buenos Aires Unternehmen. Enterprise Security Compliance."
    : "IT Security Buenos Aires: PDP Law (Personal Data Protection Law), AAIP Guidelines, ISO 27001 for Buenos Aires companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Buenos Aires",
      "PDP Law",
      "AAIP",
      "ISO 27001 Buenos Aires",
      "Cybersecurity Buenos Aires",
      "Enterprise Security",
      "Compliance Buenos Aires",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/buenos-aires"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/buenos-aires`,
    },
  };
}

export default function BuenosAiresITSecurityPage({
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
    ? "IT Security Buenos Aires 2026 — PDP Law & AAIP"
    : "IT Security Buenos Aires 2026 — PDP Law & AAIP";

  const subtitle = isDE
    ? "Enterprise Security für Buenos Aires Unternehmen"
    : "Enterprise Security for Buenos Aires Companies";

  const description = isDE
    ? "Buenos Aires ist ein Tech-Hub mit strengen Datenschutzanforderungen. PDP Law, AAIP-Richtlinien und ISO 27001 sind für Buenos Aires Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Buenos Aires is a tech hub with strict data protection requirements. PDP Law, AAIP guidelines, and ISO 27001 are essential for Buenos Aires companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Buenos Aires-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Buenos Aires-Spezifische Compliance" : "Buenos Aires-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">PDP Law</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Personal Data Protection Law verlangt Datenschutzmaßnahmen in Argentinien."
                  : "Personal Data Protection Law requires data protection measures in Argentina."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">AAIP Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Agencia de Acceso a la Información Pública veröffentlicht Datenschutz-Richtlinien."
                  : "Agencia de Acceso a la Información Pública publishes data protection guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">IRAM-ISO/IEC 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "IRAM-ISO/IEC 27001 ist argentinischer Standard für Informationssicherheit."
                  : "IRAM-ISO/IEC 27001 is Argentine standard for information security."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Buenos Aires Kunden."
                  : "ISO 27001 certification demonstrates information security management for Buenos Aires customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Buenos Aires Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Buenos Aires Tech-Ökosystem" : "Buenos Aires Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: MercadoLibre, Globant, Despegar, Auth0"
                  : "Startups & Scaleups: MercadoLibre, Globant, Despegar, Auth0"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Grupo Financiero Galicia, YPF, Techint, Arcor"
                  : "Enterprise: Grupo Financiero Galicia, YPF, Techint, Arcor"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: University of Buenos Aires, CONICET, INTI"
                  : "Research: University of Buenos Aires, CONICET, INTI"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Argentine Government, AAIP, Ministry of Justice"
                  : "Government: Argentine Government, AAIP, Ministry of Justice"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="buenos-aires-it-security"
            title={isDE ? "Buenos Aires IT Security Checklist" : "Buenos Aires IT Security Checklist"}
            items={[
              isDE ? "PDP Law Compliance durchgeführt" : "PDP Law compliance conducted",
              isDE ? "AAIP Guidelines implementiert" : "AAIP guidelines implemented",
              isDE ? "IRAM-ISO/IEC 27001 implementiert" : "IRAM-ISO/IEC 27001 implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "AAIP Registrierung" : "AAIP registration",
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
            {isDE ? "Buenos Aires IT Security Assessment" : "Buenos Aires IT Security Assessment"}
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
