import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Simulate fetching sync status
    const syncStatus = {
      id,
      provider: "salesforce",
      status: "completed",
      leadsImported: 42,
      leadsSynced: 42,
      lastSyncAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: syncStatus,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch sync status" }, { status: 500 })
  }
}
