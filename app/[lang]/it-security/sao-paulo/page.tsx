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
    ? "IT Security São Paulo 2026 — LGPD & ANPD"
    : "IT Security São Paulo 2026 — LGPD & ANPD";
  const description = isDE
    ? "IT Security São Paulo: LGPD (Lei Geral de Proteção de Dados), ANPD Guidelines, ISO 27001 für São Paulo Unternehmen. Enterprise Security Compliance."
    : "IT Security São Paulo: LGPD (Lei Geral de Proteção de Dados), ANPD Guidelines, ISO 27001 for São Paulo companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security São Paulo",
      "LGPD",
      "ANPD",
      "ISO 27001 São Paulo",
      "Cybersecurity São Paulo",
      "Enterprise Security",
      "Compliance São Paulo",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/sao-paulo"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/sao-paulo`,
    },
  };
}

export default function SaoPauloITSecurityPage({
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
    ? "IT Security São Paulo 2026 — LGPD & ANPD"
    : "IT Security São Paulo 2026 — LGPD & ANPD";

  const subtitle = isDE
    ? "Enterprise Security für São Paulo Unternehmen"
    : "Enterprise Security for São Paulo Companies";

  const description = isDE
    ? "São Paulo ist ein Tech-Hub mit strengen Datenschutzanforderungen. LGPD, ANPD-Richtlinien und ISO 27001 sind für São Paulo Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "São Paulo is a tech hub with strict data protection requirements. LGPD, ANPD guidelines, and ISO 27001 are essential for São Paulo companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* São Paulo-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "São Paulo-Spezifische Compliance" : "São Paulo-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">LGPD</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Lei Geral de Proteção de Dados verlangt Datenschutzmaßnahmen in Brasilien."
                  : "Lei Geral de Proteção de Dados requires data protection measures in Brazil."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ANPD Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Autoridade Nacional de Proteção de Dados veröffentlicht Datenschutz-Richtlinien."
                  : "Autoridade Nacional de Proteção de Dados publishes data protection guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ABNT NBR ISO/IEC 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ABNT NBR ISO/IEC 27001 ist brasilianischer Standard für Informationssicherheit."
                  : "ABNT NBR ISO/IEC 27001 is Brazilian standard for information security."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für São Paulo Kunden."
                  : "ISO 27001 certification demonstrates information security management for São Paulo customers."}
              </p>
            </div>
          </div>
        </section>

        {/* São Paulo Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "São Paulo Tech-Ökosystem" : "São Paulo Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Nubank, iFood, Loft, Creditas"
                  : "Startups & Scaleups: Nubank, iFood, Loft, Creditas"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Itaú Unibanco, Banco do Brasil, Petrobras, Embraer"
                  : "Enterprise: Itaú Unibanco, Banco do Brasil, Petrobras, Embraer"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: University of São Paulo, FGV, FAPESP"
                  : "Research: University of São Paulo, FGV, FAPESP"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Brazilian Government, ANPD, Ministry of Justice"
                  : "Government: Brazilian Government, ANPD, Ministry of Justice"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="sao-paulo-it-security"
            title={isDE ? "São Paulo IT Security Checklist" : "São Paulo IT Security Checklist"}
            items={[
              isDE ? "LGPD Compliance durchgeführt" : "LGPD compliance conducted",
              isDE ? "ANPD Guidelines implementiert" : "ANPD guidelines implemented",
              isDE ? "ABNT NBR ISO/IEC 27001 implementiert" : "ABNT NBR ISO/IEC 27001 implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "ANPD Registrierung" : "ANPD registration",
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
            {isDE ? "São Paulo IT Security Assessment" : "São Paulo IT Security Assessment"}
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
