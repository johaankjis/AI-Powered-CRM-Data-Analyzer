import { NextResponse } from "next/server"
import { mockLeads } from "@/lib/mock-data"
import { calculateAnalytics } from "@/lib/utils/analytics"

export async function GET() {
  try {
    const analytics = calculateAnalytics(mockLeads)

    return NextResponse.json({
      success: true,
      data: analytics,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 })
  }
}
