"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { LeadsTable } from "@/components/leads-table"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { CRMSyncPanel } from "@/components/crm-sync-panel"
import type { Lead, Analytics } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [leadsRes, analyticsRes] = await Promise.all([fetch("/api/leads"), fetch("/api/analytics")])

      const leadsData = await leadsRes.json()
      const analyticsData = await analyticsRes.json()

      if (leadsData.success) {
        setLeads(leadsData.data)
      }

      if (analyticsData.success) {
        setAnalytics(analyticsData.data)
      }
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleScoreLead = async (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId)
    if (!lead) return

    try {
      toast({
        title: "Scoring Lead",
        description: "AI is analyzing the lead...",
      })

      const response = await fetch("/api/leads/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead }),
      })

      const result = await response.json()

      if (result.success) {
        // Update lead with new score
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, score: result.data.score } : l)))

        toast({
          title: "Lead Scored",
          description: `Score: ${result.data.score} (${result.data.prediction} priority)`,
        })
      }
    } catch (error) {
      console.error("[v0] Error scoring lead:", error)
      toast({
        title: "Error",
        description: "Failed to score lead",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="p-6 space-y-6">
        <StatsCards analytics={analytics} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <AnalyticsCharts analytics={analytics} />
            <LeadsTable leads={leads} onScoreLead={handleScoreLead} />
          </div>
          <div>
            <CRMSyncPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
