import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { lead } = body

    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead data is required" }, { status: 400 })
    }

    // Use AI to analyze the lead and generate a score
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `You are a CRM lead scoring expert. Analyze this lead and provide a score from 0-100 based on their likelihood to convert.

Lead Information:
- Name: ${lead.name}
- Company: ${lead.company}
- Industry: ${lead.industry || "Unknown"}
- Employee Count: ${lead.employeeCount || "Unknown"}
- Deal Value: $${lead.dealValue || 0}
- Source: ${lead.source}
- Status: ${lead.status}

Consider factors like:
1. Company size and industry fit
2. Deal value potential
3. Lead source quality
4. Current engagement status

Respond with ONLY a JSON object in this exact format:
{
  "score": <number 0-100>,
  "confidence": <number 0-1>,
  "prediction": "<high|medium|low>",
  "factors": {
    "engagement": <number 0-100>,
    "companySize": <number 0-100>,
    "industry": <number 0-100>,
    "dealValue": <number 0-100>,
    "responseTime": <number 0-100>
  },
  "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
}`,
    })

    // Parse the AI response
    let scoreData
    try {
      scoreData = JSON.parse(text)
    } catch {
      // Fallback to rule-based scoring if AI parsing fails
      scoreData = calculateRuleBasedScore(lead)
    }

    const leadScore = {
      leadId: lead.id,
      ...scoreData,
      calculatedAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: leadScore,
    })
  } catch (error) {
    console.error("[v0] Lead scoring error:", error)
    return NextResponse.json({ success: false, error: "Failed to score lead" }, { status: 500 })
  }
}

// Fallback rule-based scoring
function calculateRuleBasedScore(lead: any) {
  let score = 50 // Base score

  // Company size factor
  if (lead.employeeCount) {
    if (lead.employeeCount > 500) score += 15
    else if (lead.employeeCount > 200) score += 10
    else if (lead.employeeCount > 50) score += 5
  }

  // Deal value factor
  if (lead.dealValue) {
    if (lead.dealValue > 50000) score += 20
    else if (lead.dealValue > 30000) score += 15
    else if (lead.dealValue > 10000) score += 10
  }

  // Source quality factor
  const sourceScores: Record<string, number> = {
    Referral: 15,
    Conference: 12,
    LinkedIn: 10,
    Website: 8,
    "Email Campaign": 5,
    "Trade Show": 10,
  }
  score += sourceScores[lead.source] || 5

  // Status factor
  if (lead.status === "qualified") score += 10
  else if (lead.status === "contacted") score += 5

  // Cap at 100
  score = Math.min(100, score)

  return {
    score,
    confidence: 0.75,
    prediction: score > 80 ? "high" : score > 60 ? "medium" : "low",
    factors: {
      engagement: Math.random() * 100,
      companySize: lead.employeeCount ? lead.employeeCount / 10 : 50,
      industry: 70,
      dealValue: lead.dealValue ? lead.dealValue / 1000 : 50,
      responseTime: 65,
    },
    recommendations: [
      score > 80 ? "High priority - Schedule demo within 24 hours" : "Follow up with personalized email",
      "Research company background and pain points",
      "Connect with decision makers on LinkedIn",
    ],
  }
}
