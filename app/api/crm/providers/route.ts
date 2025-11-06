import { NextResponse } from "next/server"

const supportedProviders = [
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Sync leads from Salesforce CRM",
    icon: "☁️",
    requiresAuth: true,
    fields: ["apiKey", "instanceUrl"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync leads from HubSpot CRM",
    icon: "🟠",
    requiresAuth: true,
    fields: ["apiKey"],
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Sync leads from Pipedrive CRM",
    icon: "🟢",
    requiresAuth: true,
    fields: ["apiKey", "domain"],
  },
  {
    id: "zoho",
    name: "Zoho CRM",
    description: "Sync leads from Zoho CRM",
    icon: "🔵",
    requiresAuth: true,
    fields: ["apiKey", "region"],
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: supportedProviders,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch CRM providers" }, { status: 500 })
  }
}
