"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Lead } from "@/lib/types"
import { ArrowUpDown, Sparkles } from "lucide-react"

interface LeadsTableProps {
  leads: Lead[]
  onScoreLead: (leadId: string) => void
}

export function LeadsTable({ leads, onScoreLead }: LeadsTableProps) {
  const [sortBy, setSortBy] = useState<"score" | "date">("score")

  const sortedLeads = [...leads].sort((a, b) => {
    if (sortBy === "score") {
      return (b.score || 0) - (a.score || 0)
    }
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  const getStatusColor = (status: Lead["status"]) => {
    const colors = {
      new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      contacted: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      qualified: "bg-green-500/10 text-green-500 border-green-500/20",
      converted: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      lost: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return colors[status]
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">Lead Pipeline</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setSortBy(sortBy === "score" ? "date" : "score")}>
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by {sortBy === "score" ? "Date" : "Score"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="pb-3 font-medium">Lead</th>
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium">Source</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Score</th>
                <th className="pb-3 font-medium">Deal Value</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-border/50 text-sm hover:bg-muted/50">
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </div>
                  </td>
                  <td className="py-4 text-foreground">{lead.company}</td>
                  <td className="py-4 text-muted-foreground">{lead.source}</td>
                  <td className="py-4">
                    <Badge variant="outline" className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <span className={`font-semibold ${getScoreColor(lead.score || 0)}`}>{lead.score || "N/A"}</span>
                  </td>
                  <td className="py-4 text-foreground">${lead.dealValue?.toLocaleString() || "N/A"}</td>
                  <td className="py-4">
                    <Button variant="ghost" size="sm" onClick={() => onScoreLead(lead.id)}>
                      <Sparkles className="mr-1 h-3 w-3" />
                      Score
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
