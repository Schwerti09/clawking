import type { Metadata } from "next"
import Container from "@/components/shared/Container"
import { SUPPORTED_LOCALES, type Locale, buildLocalizedAlternates } from "@/lib/i18n"
import { BASE_URL } from "@/lib/config"

export const revalidate = 3600

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const locale = (SUPPORTED_LOCALES.includes(props.params.lang as Locale) ? props.params.lang : "de") as Locale
  const pageUrl = `${BASE_URL}/${locale}/case-studies/teilnehmen`
  const title = "Case Study Teilnahme — Eure Security-Story bei ClawGuru | ClawGuru"
  const description =
    "20 Minuten eurer Zeit, Sichtbarkeit bei 3.000+ DevOps-Leads. Werde Teil unserer Case Studies — kein Druck, volle Freigabe, Backlink inklusive."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: pageUrl,
      images: ["/og-image.png"],
    },
    alternates: buildLocalizedAlternates(locale, "/case-studies/teilnehmen"),
    robots: "index, follow",
  }
}

const BENEFITS = [
  {
    icon: "🔗",
    title: "Backlink",
    desc: "DoFollow-Link von clawguru.org auf eure Website — dauerhaft.",
  },
  {
    icon: "👀",
    title: "Sichtbarkeit",
    desc: "Eure Story vor 3.000+ DevOps-Leads und CTOs in DACH.",
  },
  {
    icon: "📄",
    title: "Euer Asset",
    desc: "Nutzt den Case Study frei — Investor-Deck, Blog, LinkedIn, Sales.",
  },
  {
    icon: "🎁",
    title: "Pro-Upgrade",
    desc: "1 Monat ClawGuru Pro kostenlos als Dankeschön.",
  },
]

const STEPS = [
  { nr: "1", title: "20-Min-Call", desc: "Lockeres Gespräch — 6 Fragen, kein Formular. Du erzählst, wir hören zu." },
  { nr: "2", title: "Wir schreiben", desc: "Wir formulieren 250 Wörter. Klar, präzise, keine Marketing-Sprache." },
  { nr: "3", title: "Du gibst frei", desc: "Nichts geht live ohne dein OK. Änderungswünsche? Kein Problem." },
  { nr: "4", title: "Live + LinkedIn", desc: "Veröffentlichung auf clawguru.org + optionaler Co-Post auf LinkedIn." },
]

const FAQ = [
  {
    q: "Wie viel Zeit kostet mich das?",
    a: "Maximal 20 Minuten für den Call. Alles andere machen wir.",
  },
  {
    q: "Muss ich meinen echten Firmennamen nennen?",
    a: "Nein. Anonymisierung ist möglich — aber Named Case Studies performen 3× besser für beide Seiten.",
  },
  {
    q: "Bekomme ich den Text vorab?",
    a: "Ja. Nichts geht live ohne eure schriftliche Freigabe.",
  },
  {
    q: "Was, wenn ich nicht zufrieden bin?",
    a: "Dann veröffentlichen wir nicht. Kein Druck, kein Vertrag, kein Risiko.",
  },
]

export default function TeilnehmenPage() {
  return (
    <Container>
      <div className="py-12 md:py-16 max-w-3xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-3">Case Study Programm</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Eure Security-Story verdient Sichtbarkeit.
          </h1>
          <p className="text-lg text-gray-300">
            20 Minuten eurer Zeit. Keine PR-Abteilung nötig. Volle Kontrolle über den finalen Text.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <div className="text-2xl mb-2">{b.icon}</div>
              <div className="font-bold text-gray-100 mb-1">{b.title}</div>
              <div className="text-sm text-gray-300">{b.desc}</div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <h2 className="text-2xl font-bold text-gray-100 mb-6">So läuft es ab</h2>
        <div className="space-y-4 mb-12">
          {STEPS.map((s) => (
            <div key={s.nr} className="flex items-start gap-4 bg-gray-800 border border-gray-700 rounded-lg p-5">
              <div className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {s.nr}
              </div>
              <div>
                <div className="font-bold text-gray-100">{s.title}</div>
                <div className="text-sm text-gray-300">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* What we ask */}
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Was wir euch im Call fragen</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-12">
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">1.</span>
              Was war der Auslöser — wann habt ihr gemerkt, dass ihr eine Lösung braucht?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">2.</span>
              Wie habt ihr das vorher gelöst? (Scripts, Wiki, gar nichts?)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">3.</span>
              Was hat euch an ClawGuru überzeugt?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">4.</span>
              Wie schnell wart ihr produktiv?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">5.</span>
              Ein konkretes Beispiel — Incident, Audit, Nachtschicht — wo es den Unterschied gemacht hat?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">6.</span>
              Was würdet ihr einem skeptischen CTO sagen?
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Häufige Fragen</h2>
        <div className="space-y-4 mb-12">
          {FAQ.map((f) => (
            <div key={f.q} className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <div className="font-bold text-gray-100 mb-1">{f.q}</div>
              <div className="text-sm text-gray-300">{f.a}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gray-800 border border-cyan-700 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-gray-100 mb-2">Bereit? Schreib uns einfach.</h2>
          <p className="text-gray-300 text-sm mb-4">
            Antworte auf die E-Mail, die dich hierher gebracht hat — oder schick eine kurze Nachricht an:
          </p>
          <a
            href="mailto:casestudy@clawguru.org?subject=Case%20Study%20Teilnahme"
            className="inline-block px-6 py-3 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            casestudy@clawguru.org →
          </a>
          <p className="text-xs text-gray-500 mt-3">Kein Druck. Kein Vertrag. Jederzeit absagbar.</p>
        </div>

      </div>
    </Container>
  )
}
