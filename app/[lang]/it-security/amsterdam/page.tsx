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
    ? "IT Security Amsterdam 2026 — DSGVO & AVG"
    : "IT Security Amsterdam 2026 — GDPR & AVG";
  const description = isDE
    ? "IT Security Amsterdam: DSGVO, AVG (Algemene verordening gegevensbescherming), ISO 27001, NEN 7510 für Amsterdamer Unternehmen. Enterprise Security Compliance."
    : "IT Security Amsterdam: GDPR, AVG (Algemene verordening gegevensbescherming), ISO 27001, NEN 7510 for Amsterdam companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Amsterdam",
      "DSGVO Amsterdam",
      "AVG",
      "NEN 7510",
      "ISO 27001 Amsterdam",
      "Cybersecurity Amsterdam",
      "Enterprise Security",
      "Compliance Amsterdam",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/amsterdam"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/amsterdam`,
    },
  };
}

export default function AmsterdamITSecurityPage({
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
    ? "IT Security Amsterdam 2026 — DSGVO & AVG"
    : "IT Security Amsterdam 2026 — GDPR & AVG";

  const subtitle = isDE
    ? "Enterprise Security für Amsterdamer Unternehmen"
    : "Enterprise Security for Amsterdam Companies";

  const description = isDE
    ? "Amsterdam ist ein Tech-Hub mit strengen Datenschutzanforderungen. DSGVO, AVG, NEN 7510 und ISO 27001 sind für Amsterdamer Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Amsterdam is a tech hub with strict data protection requirements. GDPR, AVG, NEN 7510, and ISO 27001 are essential for Amsterdam companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Amsterdam-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Amsterdam-Spezifische Compliance" : "Amsterdam-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DSGVO (GDPR)</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Amsterdamer Unternehmen müssen DSGVO-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Amsterdam companies must operate GDPR-compliant."}
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
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Amsterdamer Kunden."
                  : "ISO 27001 certification demonstrates information security management for Amsterdam customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Amsterdam Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Amsterdamer Tech-Ökosystem" : "Amsterdam Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Booking.com, Adyen, Takeaway.com, WeTransfer"
                  : "Startups & Scaleups: Booking.com, Adyen, Takeaway.com, WeTransfer"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: ING, Philips, Heineken, AkzoNobel"
                  : "Enterprise: ING, Philips, Heineken, AkzoNobel"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: Universiteit van Amsterdam, VU Amsterdam, CWI"
                  : "Research: University of Amsterdam, VU Amsterdam, CWI"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Amsterdam Gemeente, Dutch DPA, NCSC-NL"
                  : "Government: Amsterdam Municipality, Dutch DPA, NCSC-NL"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="amsterdam-it-security"
            title={isDE ? "Amsterdam IT Security Checklist" : "Amsterdam IT Security Checklist"}
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
            {isDE ? "Amsterdam IT Security Assessment" : "Amsterdam IT Security Assessment"}
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
