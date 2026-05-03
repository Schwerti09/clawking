// Runbook Generator backend — generates incident response runbooks using LLM

import { NextResponse } from "next/server"
import { Anthropic } from "@anthropic-ai/sdk"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface Result {
  incident: string
  runbook: string
  status: "success" | "error"
  error?: string
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function generateRunbook(incidentDescription: string): Promise<string> {
  const prompt = `You are an expert incident response specialist. Generate a structured, actionable Markdown runbook for the following incident:

INCIDENT DESCRIPTION:
${incidentDescription}

Create a comprehensive runbook with these sections:
1. **Incident Summary** - Brief overview
2. **Severity Assessment** - Low/Medium/High/Critical with justification
3. **Immediate Actions (First 5 Minutes)** - Quick mitigation steps
4. **Investigation Phase** - Detailed troubleshooting steps
5. **Escalation Path** - When and whom to notify
6. **Communication Template** - Stakeholder notification message
7. **Resolution Steps** - How to resolve the incident
8. **Verification** - How to confirm resolution
9. **Post-Incident Review** - Action items and lessons learned
10. **Prevention** - Long-term preventive measures

Format as clean Markdown with code blocks for commands. Be specific and actionable.`

  const message = await anthropic.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  })

  const textBlock = message.content.find((block) => block.type === "text")
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in response")
  }

  return textBlock.text
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { incident } = body as { incident?: string }

    if (!incident || typeof incident !== "string" || !incident.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid 'incident' parameter. Describe the incident." },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured on server." },
        { status: 500 }
      )
    }

    const runbook = await generateRunbook(incident)

    const result: Result = {
      incident: incident.slice(0, 200),
      runbook,
      status: "success",
    }

    return NextResponse.json(result)
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json(
      {
        error: `Failed to generate runbook: ${errorMessage}`,
        status: "error",
      },
      { status: 500 }
    )
  }
}
