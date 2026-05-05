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
    ? "IT Security Prague 2026 — GDPR & UOOU"
    : "IT Security Prague 2026 — GDPR & UOOU";
  const description = isDE
    ? "IT Security Prague: GDPR, UOOU-Richtlinien, ISO 27001, NIS 2.0 für Prager Unternehmen. Enterprise Security Compliance."
    : "IT Security Prague: GDPR, UOOU guidelines, ISO 27001, NIS 2.0 for Prague companies. Enterprise security compliance.";

  return {
    title,
    description,
    keywords: [
      "IT Security Prague",
      "GDPR Prague",
      "UOOU",
      "ISO 27001 Prague",
      "Cybersecurity Prague",
      "Enterprise Security",
      "Compliance Prague",
    ],
    alternates: buildLocalizedAlternates(locale, "/it-security/prague"),
    openGraph: {
      images: ["/og-image.png"],
      title,
      description,
      type: "article",
      url: `${BASE_URL}/${locale}/it-security/prague`,
    },
  };
}

export default function PragueITSecurityPage({
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
    ? "IT Security Prague 2026 — GDPR & UOOU"
    : "IT Security Prague 2026 — GDPR & UOOU";

  const subtitle = isDE
    ? "Enterprise Security für Prager Unternehmen"
    : "Enterprise Security for Prague Companies";

  const description = isDE
    ? "Prag ist ein Tech-Hub mit strengen Datenschutzanforderungen. GDPR, UOOU-Richtlinien, ISO 27001 und NIS 2.0 sind für Prager Unternehmen essenziell. ClawGuru hilft bei der Compliance-Umsetzung."
    : "Prague is a tech hub with strict data protection requirements. GDPR, UOOU guidelines, ISO 27001, and NIS 2.0 are essential for Prague companies. ClawGuru helps with compliance implementation.";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">{title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{subtitle}</h2>
          <p className="text-gray-300 text-lg mb-8">{description}</p>
        </div>

        {/* Prague-Specific Compliance Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Prag-Spezifische Compliance" : "Prague-Specific Compliance"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">GDPR</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Datenschutz-Grundverordnung gilt EU-weit. Prager Unternehmen müssen GDPR-konform operieren."
                  : "General Data Protection Regulation applies EU-wide. Prague companies must operate GDPR-compliant."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">UOOU Guidelines</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Úřad pro ochranu osobních údajů veröffentlicht Datenschutz-Richtlinien."
                  : "Úřad pro ochranu osobních údajů publishes data protection guidelines."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">Czech NIS Law</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "Tschechisches NIS-Gesetz implementiert NIS2 für kritische Infrastruktur."
                  : "Czech NIS law implements NIS2 for critical infrastructure."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">ISO 27001</h4>
              <p className="text-sm text-gray-300">
                {isDE
                  ? "ISO 27001 Zertifizierung zeigt Informationssicherheit-Management für Prager Kunden."
                  : "ISO 27001 certification demonstrates information security management for Prague customers."}
              </p>
            </div>
          </div>
        </section>

        {/* Prague Tech Hub Context */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            {isDE ? "Prager Tech-Ökosystem" : "Prague Tech Ecosystem"}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Startups & Scaleups: Avast, Kiwi.com, Rossum, Productboard"
                  : "Startups & Scaleups: Avast, Kiwi.com, Rossum, Productboard"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Enterprise: ČEZ Group, ČSOB, Škoda Auto, O2 Czech Republic"
                  : "Enterprise: ČEZ Group, ČSOB, Škoda Auto, O2 Czech Republic"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Research: Charles University, Czech Technical University, CAS"
                  : "Research: Charles University, Czech Technical University, CAS"}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {isDE
                  ? "Government: Czech Government, UOOU, NÚKIB"
                  : "Government: Czech Government, UOOU, NÚKIB"}
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Checklist */}
        <div className="mb-8">
          <InteractiveChecklist
            slug="prague-it-security"
            title={isDE ? "Prag IT Security Checklist" : "Prague IT Security Checklist"}
            items={[
              isDE ? "GDPR-Compliance Audit durchgeführt" : "GDPR compliance audit conducted",
              isDE ? "UOOU Guidelines implementiert" : "UOOU guidelines implemented",
              isDE ? "Czech NIS Law implementiert" : "Czech NIS law implemented",
              isDE ? "ISO 27001 Zertifizierung angestrebt" : "ISO 27001 certification pursued",
              isDE ? "Data Protection Officer benannt" : "Data Protection Officer appointed",
              isDE ? "Verarbeitungsverzeichnis gepflegt" : "Record of processing activities maintained",
              isDE ? "UOOU Registrierung" : "UOOU registration",
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
            {isDE ? "Prag IT Security Assessment" : "Prague IT Security Assessment"}
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
