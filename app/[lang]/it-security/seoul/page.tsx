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
    ? "IT Security Seoul 2026 — PIPA & KISA"
    : "IT Security Seoul 2026 — PIPA & KISA";
  const description = isDE
    ? "IT Security Seoul: PIPA (Personal Information Protection Act), KISA Guidelines, ISO 27001 für Seouler Unternehmen. Enterprise Security Compliance."
    : "IT Security Seoul: PIPA (Personal Information Protection Act), KISA Guidelines, ISO 27001 for Seoul companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Seoul",
      "PIPA",
      "KISA",
      "ISO 27001 Seoul",
      "Cybersecurity Seoul",
      "Enterprise Security",
      "Compliance Seoul",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/seoul"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/seoul`,
    },
  };
}

export default function SeoulITSecurityPage({
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
    ? "IT Security Seoul 2026 — PIPA & KISA"
    : "IT Security Seoul 2026 — PIPA & KISA";

  const subtitle = isDE
    ? "Enterprise Security für Seouler Unternehmen"
    : "Enterprise Security for Seoul Companies";

  const description = isDE
    ? "Seoul ist ein Tech-Hub mit strengen Datenschutzanforderungen. PIPA, KISA-Richtlinien und ISO 27001 sind für Seouler Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Seoul is a tech hub with strict data protection requirements. PIPA, KISA guidelines, and ISO 27001 are essential for Seoul companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Seoul-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Seoul-Spezifische Compliance" : "Seoul-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">PIPA</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Personal Information Protection Act verlangt Datenschutzmaßnahmen in Südkorea."
                  : "Personal Information Protection Act requires data protection measures in South Korea."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">KISA Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Korea Internet & Security Agency veröffentlicht Cybersicherheit-Richtlinien."
                  : "Korea Internet & Security Agency publishes cybersecurity guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">K-ISMS</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Korea Information Security Management System ist Standard für Informationssicherheit."
                  : "Korea Information Security Management System is standard for information security."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Seouler Kunden."
                  : "ISO 27001 certification demonstrates information security management for Seoul customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Seoul Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Seouler Tech-Ökosystem" : "Seoul Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Coupang, Naver, Kakao, Toss"
                  : "Startups & Scaleups: Coupang, Naver, Kakao, Toss"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: Samsung, LG, Hyundai, SK Group"
                  : "Enterprise: Samsung, LG, Hyundai, SK Group"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: Seoul National University, KAIST, ETRI"
                  : "Research: Seoul National University, KAIST, ETRI"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Korean Government, PIPC, KISA, MSIT"
                  : "Government: Korean Government, PIPC, KISA, MSIT"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="seoul-it-security"
            title={isDE ? "Seoul IT Security Checklist" : "Seoul IT Security Checklist"}
            items={[
              isDE ? "PIPA Compliance durchgeführt" : "PIPA compliance conducted",
              isDE ? "KISA Guidelines implementiert" : "KISA guidelines implemented",
              isDE ? "K-ISMS implementiert" : "K-ISMS implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "PIPC Registrierung" : "PIPC registration",
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
            {isDE ? "Seoul IT Security Assessment" : "Seoul IT Security Assessment"}
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
