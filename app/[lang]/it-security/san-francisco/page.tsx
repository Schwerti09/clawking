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
    ? "IT Security San Francisco 2026 — CCPA & NIST Framework"
    : "IT Security San Francisco 2026 — CCPA & NIST Framework";
  const description = isDE
    ? "IT Security San Francisco: CCPA, CPRA, NIST CSF, ISO 27001 für San Francisco Unternehmen. Enterprise Security Compliance."
    : "IT Security San Francisco: CCPA, CPRA, NIST CSF, ISO 27001 for San Francisco companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security San Francisco",
      "CCPA",
      "CPRA",
      "NIST CSF",
      "ISO 27001 San Francisco",
      "Cybersecurity San Francisco",
      "Enterprise Security",
      "Compliance San Francisco",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/san-francisco"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/san-francisco`,
    },
  };
}

export default function SanFranciscoITSecurityPage({
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
    ? "IT Security San Francisco 2026 — CCPA & NIST Framework"
    : "IT Security San Francisco 2026 — CCPA & NIST Framework";

  const subtitle = isDE
    ? "Enterprise Security für San Francisco Unternehmen"
    : "Enterprise Security for San Francisco Companies";

  const description = isDE
    ? "San Francisco ist ein Tech-Hub mit strengen Datenschutzanforderungen. CCPA, CPRA, NIST CSF und ISO 27001 sind für San Francisco Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "San Francisco is a tech hub with strict data protection requirements. CCPA, CPRA, NIST CSF, and ISO 27001 are essential for San Francisco companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* San Francisco-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "San Francisco-Spezifische Compliance" : "San Francisco-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">CCPA/CPRA</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "California Consumer Privacy Act (CCPA) und CPRA verlangen Datenschutzrechte für Kalifornien."
                  : "California Consumer Privacy Act (CCPA) and CPRA require data privacy rights for California."}
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
              <h4 className="font-semibold text-blue-400 mb-3">GDPR</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "GDPR gilt für Unternehmen mit EU-Kunden im Silicon Valley."
                  : "GDPR applies to companies with EU customers in Silicon Valley."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für San Francisco Kunden."
                  : "ISO 27001 certification demonstrates information security management for San Francisco customers."}
              </p>
            </div>
          </div>
        </section>

        {/* San Francisco Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "San Francisco Tech-Ökosystem" : "San Francisco Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Airbnb, Uber, Slack, Zoom"
                  : "Startups & Scaleups: Airbnb, Uber, Slack, Zoom"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Salesforce, Oracle, Adobe, Google (SF Office)"
                  : "Enterprise: Salesforce, Oracle, Adobe, Google (SF Office)"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: Stanford, UC Berkeley, UCSF"
                  : "Research: Stanford, UC Berkeley, UCSF"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: SF City Government, CA AG, CISA"
                  : "Government: SF City Government, CA AG, CISA"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="san-francisco-it-security"
            title={isDE ? "San Francisco IT Security Checklist" : "San Francisco IT Security Checklist"}
            items={[
              isDE ? "CCPA/CPRA Compliance durchgeführt" : "CCPA/CPRA compliance conducted",
              isDE ? "NIST CSF implementiert" : "NIST CSF implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "GDPR Compliance (falls zutreffend)" : "GDPR compliance (if applicable)",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "CA AG Registrierung" : "CA AG registration",
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
            {isDE ? "San Francisco IT Security Assessment" : "San Francisco IT Security Assessment"}
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
