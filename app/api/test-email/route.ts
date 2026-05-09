import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export const runtime = "nodejs"

export async function GET() {
  const TEST_RECIPIENT = process.env.TEST_EMAIL_RECIPIENT || "rolf@clawguru.org"

  try {
    const { id } = await sendEmail({
      to: TEST_RECIPIENT,
      subject: "ClawGuru – Test-Mail",
      html: `<p>Dies ist eine automatische Test-Mail, um zu prüfen, ob Resend korrekt konfiguriert ist.</p>`,
      replyTo: "support@clawguru.org",
    })

    return NextResponse.json({ success: true, message: "Test-Mail gesendet", id: id ?? null })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[test-email] Fehler beim Senden:", message)
    return NextResponse.json(
      { success: false, message: "Test-Mail fehlgeschlagen", error: message },
      { status: 500 }
    )
  }
}
