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
    ? "IT Security Tokio 2026 — APPI & JIS"
    : "IT Security Tokyo 2026 — APPI & JIS";
  const description = isDE
    ? "IT Security Tokio: APPI (Act on the Protection of Personal Information), JIS Q 27001, ISO 27001 für Tokioter Unternehmen. Enterprise Security Compliance."
    : "IT Security Tokyo: APPI (Act on the Protection of Personal Information), JIS Q 27001, ISO 27001 for Tokyo companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Tokio",
      "APPI",
      "JIS Q 27001",
      "ISO 27001 Tokio",
      "Cybersecurity Tokio",
      "Enterprise Security",
      "Compliance Tokio",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/tokyo"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/tokyo`,
    },
  };
}

export default function TokyoITSecurityPage({
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
    ? "IT Security Tokio 2026 — APPI & JIS"
    : "IT Security Tokyo 2026 — APPI & JIS";

  const subtitle = isDE
    ? "Enterprise Security für Tokioter Unternehmen"
    : "Enterprise Security for Tokyo Companies";

  const description = isDE
    ? "Tokio ist ein Tech-Hub mit strengen Datenschutzanforderungen. APPI, JIS Q 27001 und ISO 27001 sind für Tokioter Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Tokyo is a tech hub with strict data protection requirements. APPI, JIS Q 27001, and ISO 27001 are essential for Tokyo companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Tokio-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Tokio-Spezifische Compliance" : "Tokyo-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">APPI</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Act on the Protection of Personal Information verlangt Datenschutzmaßnahmen in Japan."
                  : "Act on the Protection of Personal Information requires data protection measures in Japan."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">JIS Q 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "JIS Q 27001 ist japanischer Standard für Informationssicherheit-Management."
                  : "JIS Q 27001 is Japanese standard for information security management."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">NISC Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "National Center of Incident Readiness and Strategy for Cybersecurity veröffentlicht Richtlinien."
                  : "National Center of Incident Readiness and Strategy for Cybersecurity publishes guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Tokioter Kunden."
                  : "ISO 27001 certification demonstrates information security management for Tokyo customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Tokio Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Tokioter Tech-Ökosystem" : "Tokyo Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Mercari, SmartNews, Preferred Networks, Sansan"
                  : "Startups & Scaleups: Mercari, SmartNews, Preferred Networks, Sansan"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: SoftBank, Sony, Toyota, Mitsubishi UFJ"
                  : "Enterprise: SoftBank, Sony, Toyota, Mitsubishi UFJ"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: University of Tokyo, Tokyo Institute of Technology, RIKEN"
                  : "Research: University of Tokyo, Tokyo Institute of Technology, RIKEN"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Japanese Government, PPC, NISC, METI"
                  : "Government: Japanese Government, PPC, NISC, METI"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="tokyo-it-security"
            title={isDE ? "Tokio IT Security Checklist" : "Tokyo IT Security Checklist"}
            items={[
              isDE ? "APPI Compliance durchgeführt" : "APPI compliance conducted",
              isDE ? "JIS Q 27001 implementiert" : "JIS Q 27001 implemented",
              isDE ? "NISC Guidelines befolgt" : "NISC guidelines followed",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "PPC Registrierung" : "PPC registration",
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
            {isDE ? "Tokio IT Security Assessment" : "Tokyo IT Security Assessment"}
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
