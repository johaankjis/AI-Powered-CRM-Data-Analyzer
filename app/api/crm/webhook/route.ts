import { NextResponse } from "next/server"
import { mockLeads } from "@/lib/mock-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event, data } = body

    console.log("[v0] Webhook received:", event, data)

    // Handle different webhook events
    switch (event) {
      case "lead.created":
        // Add new lead from CRM
        const newLead = {
          id: String(mockLeads.length + 1),
          ...data,
          createdAt: new Date(),
        }
        mockLeads.push(newLead)
        break

      case "lead.updated":
        // Update existing lead
        const leadIndex = mockLeads.findIndex((l) => l.id === data.id)
        if (leadIndex !== -1) {
          mockLeads[leadIndex] = { ...mockLeads[leadIndex], ...data }
        }
        break

      case "lead.deleted":
        // Remove lead
        const deleteIndex = mockLeads.findIndex((l) => l.id === data.id)
        if (deleteIndex !== -1) {
          mockLeads.splice(deleteIndex, 1)
        }
        break

      default:
        console.log("[v0] Unknown webhook event:", event)
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
    })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json({ success: false, error: "Failed to process webhook" }, { status: 500 })
  }
}
