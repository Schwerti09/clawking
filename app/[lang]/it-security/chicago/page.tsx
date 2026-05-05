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
    ? "IT Security Chicago 2026 — Illinois Biometric Act & NIST Framework"
    : "IT Security Chicago 2026 — Illinois Biometric Act & NIST Framework";
  const description = isDE
    ? "IT Security Chicago: Illinois Biometric Information Privacy Act, NIST CSF, ISO 27001, HIPAA für Chicago Unternehmen. Enterprise Security Compliance."
    : "IT Security Chicago: Illinois Biometric Information Privacy Act, NIST CSF, ISO 27001, HIPAA for Chicago companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Chicago",
      "Illinois Biometric Act",
      "NIST CSF",
      "ISO 27001 Chicago",
      "HIPAA",
      "Cybersecurity Chicago",
      "Enterprise Security",
      "Compliance Chicago",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/chicago"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/chicago`,
    },
  };
}

export default function ChicagoITSecurityPage({
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
    ? "IT Security Chicago 2026 — Illinois Biometric Act & NIST Framework"
    : "IT Security Chicago 2026 — Illinois Biometric Act & NIST Framework";

  const subtitle = isDE
    ? "Enterprise Security für Chicago Unternehmen"
    : "Enterprise Security for Chicago Companies";

  const description = isDE
    ? "Chicago ist ein Tech-Hub mit strengen Datenschutzanforderungen. Illinois Biometric Act, NIST CSF, ISO 27001 und HIPAA sind für Chicago Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Chicago is a tech hub with strict data protection requirements. Illinois Biometric Act, NIST CSF, ISO 27001, and HIPAA are essential for Chicago companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Chicago-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Chicago-Spezifische Compliance" : "Chicago-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">Illinois Biometric Act</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Illinois Biometric Information Privacy Act verlangt Schutz biometrischer Daten."
                  : "Illinois Biometric Information Privacy Act requires protection of biometric data."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">NIST CSF</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "NIST Cybersecurity Framework ist US-Standard für Cybersicherheit."
                  : "NIST Cybersecurity Framework is US standard for cybersecurity."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">HIPAA</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "HIPAA verlangt Datenschutz für Gesundheitsdaten im Gesundheitswesen."
                  : "HIPAA requires data protection for health data in healthcare."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Chicago Kunden."
                  : "ISO 27001 certification demonstrates information security management for Chicago customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Chicago Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Chicago Tech-Ökosystem" : "Chicago Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Grubhub, Groupon, Tempus, Uptake"
                  : "Startups & Scaleups: Grubhub, Groupon, Tempus, Uptake"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Boeing Chicago, United Airlines, McDonald's, Walgreens"
                  : "Enterprise: Boeing Chicago, United Airlines, McDonald's, Walgreens"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: University of Chicago, Northwestern, Argonne"
                  : "Research: University of Chicago, Northwestern, Argonne"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Illinois Government, Chicago City, CISA"
                  : "Government: Illinois Government, Chicago City, CISA"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="chicago-it-security"
            title={isDE ? "Chicago IT Security Checklist" : "Chicago IT Security Checklist"}
            items={[
              isDE ? "Illinois Biometric Act Compliance durchgeführt" : "Illinois Biometric Act compliance conducted",
              isDE ? "NIST CSF implementiert" : "NIST CSF implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "HIPAA Compliance (falls zutreffend)" : "HIPAA compliance (if applicable)",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "Illinois AG Registrierung" : "Illinois AG registration",
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
            {isDE ? "Chicago IT Security Assessment" : "Chicago IT Security Assessment"}
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
