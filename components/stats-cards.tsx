"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Target, BarChart3 } from "lucide-react"
import type { Analytics } from "@/lib/types"

interface StatsCardsProps {
  analytics: Analytics
}

export function StatsCards({ analytics }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Leads",
      value: analytics.totalLeads,
      icon: Users,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Qualified Leads",
      value: analytics.qualifiedLeads,
      icon: Target,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Conversion Rate",
      value: `${analytics.conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      trend: "+3.2%",
      trendUp: true,
    },
    {
      title: "Avg Score",
      value: analytics.averageScore.toFixed(0),
      icon: BarChart3,
      trend: "+5.1",
      trendUp: true,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <span className={stat.trendUp ? "text-green-500" : "text-red-500"}>{stat.trend}</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
