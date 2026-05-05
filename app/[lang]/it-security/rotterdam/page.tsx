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
    ? "IT Security Rotterdam 2026 — DSGVO & AVG"
    : "IT Security Rotterdam 2026 — GDPR & AVG";
  const description = isDE
    ? "IT Security Rotterdam: DSGVO, AVG (Algemene verordening gegevensbescherming), ISO 27001, NEN 7510 für Rotterdamer Unternehmen. Enterprise Security Compliance."
    : "IT Security Rotterdam: GDPR, AVG (Algemene verordening gegevensbescherming), ISO 27001, NEN 7510 for Rotterdam companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Rotterdam",
      "DSGVO Rotterdam",
      "AVG",
      "NEN 7510",
      "ISO 27001 Rotterdam",
      "Cybersecurity Rotterdam",
      "Enterprise Security",
      "Compliance Rotterdam",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/rotterdam"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/rotterdam`,
    },
  };
}

export default function RotterdamITSecurityPage({
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
    ? "IT Security Rotterdam 2026 — DSGVO & AVG"
    : "IT Security Rotterdam 2026 — GDPR & AVG";

  const subtitle = isDE
    ? "Enterprise Security für Rotterdamer Unternehmen"
    : "Enterprise Security for Rotterdam Companies";

  const description = isDE
    ? "Rotterdam ist ein Tech-Hub mit strengen Datenschutzanforderungen. DSGVO, AVG, NEN 7510 und ISO 27001 sind für Rotterdamer Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Rotterdam is a tech hub with strict data protection requirements. GDPR, AVG, NEN 7510, and ISO 27001 are essential for Rotterdam companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Rotterdam-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Rotterdam-Spezifische Compliance" : "Rotterdam-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DSGVO (GDPR)</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Rotterdamer Unternehmen müssen DSGVO-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Rotterdam companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">AVG</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Algemene verordening gegevensbescherming (AVG) ist die niederländische Umsetzung der DSGVO."
                  : "Algemene verordening gegevensbescherming (AVG) is the Dutch implementation of GDPR."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">NEN 7510</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "NEN 7510 ist niederländischer Standard für Informationssicherheit im Gesundheitswesen."
                  : "NEN 7510 is Dutch standard for information security in healthcare."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Rotterdamer Kunden."
                  : "ISO 27001 certification demonstrates information security management for Rotterdam customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Rotterdam Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Rotterdamer Tech-Ökosystem" : "Rotterdam Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Coolblue, Picnic, Sendcloud, Felyx"
                  : "Startups & Scaleups: Coolblue, Picnic, Sendcloud, Felyx"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Rotterdam Port, Unilever, Shell Rotterdam, Van Oord"
                  : "Enterprise: Rotterdam Port, Unilever, Shell Rotterdam, Van Oord"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: Erasmus Universiteit Rotterdam, TU Delft, Deltares"
                  : "Research: Erasmus University Rotterdam, TU Delft, Deltares"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Rotterdam Gemeente, Dutch DPA, NCSC-NL"
                  : "Government: Rotterdam Municipality, Dutch DPA, NCSC-NL"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="rotterdam-it-security"
            title={isDE ? "Rotterdam IT Security Checklist" : "Rotterdam IT Security Checklist"}
            items={[
              isDE ? "DSGVO-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "AVG Anforderungen erfüllt" : "AVG requirements met",
              isDE ? "NEN 7510 implementiert (falls zutreffend)" : "NEN 7510 implemented (if applicable)",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "Dutch DPA Registrierung" : "Dutch DPA registration",
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
            {isDE ? "Rotterdam IT Security Assessment" : "Rotterdam IT Security Assessment"}
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
