"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Analytics } from "@/lib/types"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface AnalyticsChartsProps {
  analytics: Analytics
}

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Lead Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.topSources}
                dataKey="count"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {analytics.topSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #262626",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="range" stroke="#a1a1a1" />
              <YAxis stroke="#a1a1a1" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #262626",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border md:col-span-2">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.recentActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="date" stroke="#a1a1a1" />
              <YAxis stroke="#a1a1a1" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #262626",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="newLeads" stroke="#3b82f6" strokeWidth={2} name="New Leads" />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
