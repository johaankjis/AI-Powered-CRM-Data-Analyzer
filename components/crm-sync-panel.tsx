"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle2 } from "lucide-react"

const CRM_PROVIDERS = [
  { id: "salesforce", name: "Salesforce", icon: "☁️" },
  { id: "hubspot", name: "HubSpot", icon: "🟠" },
  { id: "pipedrive", name: "Pipedrive", icon: "🟢" },
  { id: "zoho", name: "Zoho CRM", icon: "🔵" },
]

export function CRMSyncPanel() {
  const [syncing, setSyncing] = useState<string | null>(null)

  const handleSync = async (provider: string) => {
    setSyncing(provider)
    // Simulate sync
    setTimeout(() => {
      setSyncing(null)
    }, 2000)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">CRM Integrations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {CRM_PROVIDERS.map((provider) => (
            <div
              key={provider.id}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{provider.icon}</span>
                <div>
                  <p className="font-medium text-foreground">{provider.name}</p>
                  <p className="text-xs text-muted-foreground">Last synced: 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Connected
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSync(provider.id)}
                  disabled={syncing === provider.id}
                >
                  {syncing === provider.id ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Sync
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
