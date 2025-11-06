import { NextResponse } from "next/server"
import { mockLeads } from "@/lib/mock-data"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockLeads,
      count: mockLeads.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newLead = {
      id: String(mockLeads.length + 1),
      ...body,
      createdAt: new Date(),
      status: "new" as const,
    }

    mockLeads.push(newLead)

    return NextResponse.json({
      success: true,
      data: newLead,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 })
  }
}
