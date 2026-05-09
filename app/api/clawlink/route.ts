import { NextResponse } from 'next/server';

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const js = `/*! ClawLink v3.0 - Mycelial Singularity Engine */
window.ClawLink = {
  version: "3.0",
  connected: true,
  send: function(data) { /* ClawLink → Mycelium */ }
};`;

  return new NextResponse(js, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "X-ClawLink-Version": "3.0"
    }
  });
}
