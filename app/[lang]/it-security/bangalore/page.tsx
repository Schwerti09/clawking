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
    ? "IT Security Bangalore 2026 — DPDP Act & CERT-In"
    : "IT Security Bangalore 2026 — DPDP Act & CERT-In";
  const description = isDE
    ? "IT Security Bangalore: DPDP Act (Digital Personal Data Protection Act), CERT-In Guidelines, ISO 27001 für Bangalore Unternehmen. Enterprise Security Compliance."
    : "IT Security Bangalore: DPDP Act (Digital Personal Data Protection Act), CERT-In Guidelines, ISO 27001 for Bangalore companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Bangalore",
      "DPDP Act",
      "CERT-In",
      "ISO 27001 Bangalore",
      "Cybersecurity Bangalore",
      "Enterprise Security",
      "Compliance Bangalore",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/bangalore"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/bangalore`,
    },
  };
}

export default function BangaloreITSecurityPage({
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
    ? "IT Security Bangalore 2026 — DPDP Act & CERT-In"
    : "IT Security Bangalore 2026 — DPDP Act & CERT-In";

  const subtitle = isDE
    ? "Enterprise Security für Bangalore Unternehmen"
    : "Enterprise Security for Bangalore Companies";

  const description = isDE
    ? "Bangalore ist ein Tech-Hub mit strengen Datenschutzanforderungen. DPDP Act, CERT-In-Richtlinien und ISO 27001 sind für Bangalore Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Bangalore is a tech hub with strict data protection requirements. DPDP Act, CERT-In guidelines, and ISO 27001 are essential for Bangalore companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Bangalore-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Bangalore-Spezifische Compliance" : "Bangalore-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">DPDP Act</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Digital Personal Data Protection Act verlangt Datenschutzmaßnahmen in Indien."
                  : "Digital Personal Data Protection Act requires data protection measures in India."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">CERT-In Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Indian Computer Emergency Response Team veröffentlicht Cybersicherheit-Richtlinien."
                  : "Indian Computer Emergency Response Team publishes cybersecurity guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">IS 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "IS 27001 ist indischer Standard für Informationssicherheit-Management."
                  : "IS 27001 is Indian standard for information security management."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Bangalore Kunden."
                  : "ISO 27001 certification demonstrates information security management for Bangalore customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Bangalore Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Bangalore Tech-Ökosystem" : "Bangalore Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Flipkart, Zomato, BYJU'S, Razorpay"
                  : "Startups & Scaleups: Flipkart, Zomato, BYJU'S, Razorpay"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Infosys, Wipro, Tata Consultancy Services, HCL"
                  : "Enterprise: Infosys, Wipro, Tata Consultancy Services, HCL"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: Indian Institute of Science, IISc Bangalore, ISRO"
                  : "Research: Indian Institute of Science, IISc Bangalore, ISRO"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Indian Government, MeitY, CERT-In, DPDPB"
                  : "Government: Indian Government, MeitY, CERT-In, DPDPB"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="bangalore-it-security"
            title={isDE ? "Bangalore IT Security Checklist" : "Bangalore IT Security Checklist"}
            items={[
              isDE ? "DPDP Act Compliance durchgeführt" : "DPDP Act compliance conducted",
              isDE ? "CERT-In Guidelines implementiert" : "CERT-In guidelines implemented",
              isDE ? "IS 27001 implementiert" : "IS 27001 implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "DPDPB Registrierung" : "DPDPB registration",
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
            {isDE ? "Bangalore IT Security Assessment" : "Bangalore IT Security Assessment"}
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
