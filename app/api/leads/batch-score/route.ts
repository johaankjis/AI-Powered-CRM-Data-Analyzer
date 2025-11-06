import { NextResponse } from "next/server"
import { mockLeadScores } from "@/lib/mock-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { leadIds } = body

    if (!leadIds || !Array.isArray(leadIds)) {
      return NextResponse.json({ success: false, error: "Lead IDs array is required" }, { status: 400 })
    }

    // Simulate batch scoring with mock data
    const scores = mockLeadScores.filter((score) => leadIds.includes(score.leadId))

    return NextResponse.json({
      success: true,
      data: scores,
      count: scores.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to batch score leads" }, { status: 500 })
  }
}
