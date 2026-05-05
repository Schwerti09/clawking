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
    ? "IT Security Lisbon 2026 — GDPR & CNPD"
    : "IT Security Lisbon 2026 — GDPR & CNPD";
  const description = isDE
    ? "IT Security Lisbon: GDPR, CNPD-Richtlinien, ISO 27001, NIS 2.0 für Lissabon Unternehmen. Enterprise Security Compliance."
    : "IT Security Lisbon: GDPR, CNPD guidelines, ISO 27001, NIS 2.0 for Lisbon companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Lisbon",
      "GDPR Lisbon",
      "CNPD",
      "ISO 27001 Lisbon",
      "Cybersecurity Lisbon",
      "Enterprise Security",
      "Compliance Lisbon",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/lisbon"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/lisbon`,
    },
  };
}

export default function LisbonITSecurityPage({
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
    ? "IT Security Lisbon 2026 — GDPR & CNPD"
    : "IT Security Lisbon 2026 — GDPR & CNPD";

  const subtitle = isDE
    ? "Enterprise Security für Lissabon Unternehmen"
    : "Enterprise Security for Lisbon Companies";

  const description = isDE
    ? "Lissabon ist ein Tech-Hub mit strengen Datenschutzanforderungen. GDPR, CNPD-Richtlinien, ISO 27001 und NIS 2.0 sind für Lissabon Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Lisbon is a tech hub with strict data protection requirements. GDPR, CNPD guidelines, ISO 27001, and NIS 2.0 are essential for Lisbon companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Lisbon-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Lissabon-Spezifische Compliance" : "Lisbon-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">GDPR</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Lissabon Unternehmen müssen GDPR-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Lisbon companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">CNPD Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Comissão Nacional de Proteção de Dados veröffentlicht Datenschutz-Richtlinien."
                  : "Comissão Nacional de Proteção de Dados publishes data protection guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">Portuguese NIS Law</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Portugiesisches NIS-Gesetz implementiert NIS2 für kritische Infrastruktur."
                  : "Portuguese NIS law implements NIS2 for critical infrastructure."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Lissabon Kunden."
                  : "ISO 27001 certification demonstrates information security management for Lisbon customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Lisbon Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Lissabon Tech-Ökosystem" : "Lisbon Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Unbabel, Remote, Talkdesk, OutSystems"
                  : "Startups & Scaleups: Unbabel, Remote, Talkdesk, OutSystems"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: EDP, Galp Energia, Mota-Engil, Jerónimo Martins"
                  : "Enterprise: EDP, Galp Energia, Mota-Engil, Jerónimo Martins"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: University of Lisbon, Instituto Superior Técnico, INESC"
                  : "Research: University of Lisbon, Instituto Superior Técnico, INESC"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Portuguese Government, CNPD, CIRC"
                  : "Government: Portuguese Government, CNPD, CIRC"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="lisbon-it-security"
            title={isDE ? "Lissabon IT Security Checklist" : "Lisbon IT Security Checklist"}
            items={[
              isDE ? "GDPR-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "CNPD Guidelines implementiert" : "CNPD guidelines implemented",
              isDE ? "Portuguese NIS Law implementiert" : "Portuguese NIS law implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "CNPD Registrierung" : "CNPD registration",
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
            {isDE ? "Lissabon IT Security Assessment" : "Lisbon IT Security Assessment"}
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
