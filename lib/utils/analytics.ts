import type { Lead, Analytics } from "../types"

export function calculateAnalytics(leads: Lead[]): Analytics {
  const totalLeads = leads.length
  const qualifiedLeads = leads.filter((l) => l.status === "qualified" || l.status === "converted").length
  const convertedLeads = leads.filter((l) => l.status === "converted").length
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0
  const averageScore = leads.reduce((sum, lead) => sum + (lead.score || 0), 0) / totalLeads || 0

  // Calculate top sources
  const sourceCounts = leads.reduce(
    (acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  const topSources = Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Calculate score distribution
  const scoreRanges = [
    { range: "0-20", min: 0, max: 20 },
    { range: "21-40", min: 21, max: 40 },
    { range: "41-60", min: 41, max: 60 },
    { range: "61-80", min: 61, max: 80 },
    { range: "81-100", min: 81, max: 100 },
  ]
  const scoreDistribution = scoreRanges.map(({ range, min, max }) => ({
    range,
    count: leads.filter((l) => (l.score || 0) >= min && (l.score || 0) <= max).length,
  }))

  // Calculate recent activity (last 7 days)
  const today = new Date()
  const recentActivity = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - i))
    const dateStr = date.toISOString().split("T")[0]

    const newLeads = leads.filter((l) => l.createdAt.toISOString().split("T")[0] === dateStr).length

    const conversions = leads.filter(
      (l) => l.status === "converted" && l.lastContactedAt?.toISOString().split("T")[0] === dateStr,
    ).length

    return {
      date: dateStr,
      newLeads,
      conversions,
    }
  })

  return {
    totalLeads,
    qualifiedLeads,
    conversionRate,
    averageScore,
    topSources,
    scoreDistribution,
    recentActivity,
  }
}
