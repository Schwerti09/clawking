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
    ? "IT Security Athens 2026 — GDPR & DPA"
    : "IT Security Athens 2026 — GDPR & DPA";
  const description = isDE
    ? "IT Security Athens: GDPR, DPA-Richtlinien, ISO 27001, NIS 2.0 für Athen Unternehmen. Enterprise Security Compliance."
    : "IT Security Athens: GDPR, DPA guidelines, ISO 27001, NIS 2.0 for Athens companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Athens",
      "GDPR Athens",
      "DPA",
      "ISO 27001 Athens",
      "Cybersecurity Athens",
      "Enterprise Security",
      "Compliance Athens",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/athens"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/athens`,
    },
  };
}

export default function AthensITSecurityPage({
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
    ? "IT Security Athens 2026 — GDPR & DPA"
    : "IT Security Athens 2026 — GDPR & DPA";

  const subtitle = isDE
    ? "Enterprise Security für Athen Unternehmen"
    : "Enterprise Security for Athens Companies";

  const description = isDE
    ? "Athen ist ein Tech-Hub mit strengen Datenschutzanforderungen. GDPR, DPA-Richtlinien, ISO 27001 und NIS 2.0 sind für Athen Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Athens is a tech hub with strict data protection requirements. GDPR, DPA guidelines, ISO 27001, and NIS 2.0 are essential for Athens companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Athens-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Athen-Spezifische Compliance" : "Athens-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">GDPR</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Athen Unternehmen müssen GDPR-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Athens companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DPA Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Hellenic Data Protection Authority veröffentlicht Datenschutz-Richtlinien."
                  : "Hellenic Data Protection Authority publishes data protection guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">Greek NIS Law</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Griechisches NIS-Gesetz implementiert NIS2 für kritische Infrastruktur."
                  : "Greek NIS law implements NIS2 for critical infrastructure."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Athen Kunden."
                  : "ISO 27001 certification demonstrates information security management for Athens customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Athens Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Athen Tech-Ökosystem" : "Athens Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Viva Wallet, Workable, Skroutz, Blueground"
                  : "Startups & Scaleups: Viva Wallet, Workable, Skroutz, Blueground"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: National Bank of Greece, Mytilineos, Coca-Cola HBC, Eurobank"
                  : "Enterprise: National Bank of Greece, Mytilineos, Coca-Cola HBC, Eurobank"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: National Technical University, University of Athens, NCSR Demokritos"
                  : "Research: National Technical University, University of Athens, NCSR Demokritos"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Greek Government, DPA, Greek CSIRT"
                  : "Government: Greek Government, DPA, Greek CSIRT"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="athens-it-security"
            title={isDE ? "Athen IT Security Checklist" : "Athens IT Security Checklist"}
            items={[
              isDE ? "GDPR-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "DPA Guidelines implementiert" : "DPA guidelines implemented",
              isDE ? "Greek NIS Law implementiert" : "Greek NIS law implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "DPA Registrierung" : "DPA registration",
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
            {isDE ? "Athen IT Security Assessment" : "Athens IT Security Assessment"}
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
