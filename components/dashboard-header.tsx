"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Download, Settings } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">CRM Data Analyzer</h1>
          <p className="text-sm text-muted-foreground">AI-powered lead scoring and analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync CRM
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
