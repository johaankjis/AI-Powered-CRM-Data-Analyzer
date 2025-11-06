export interface Lead {
  id: string
  name: string
  email: string
  company: string
  phone?: string
  source: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  score?: number
  createdAt: Date
  lastContactedAt?: Date
  dealValue?: number
  industry?: string
  employeeCount?: number
  website?: string
}

export interface LeadScore {
  leadId: string
  score: number
  confidence: number
  factors: {
    engagement: number
    companySize: number
    industry: number
    dealValue: number
    responseTime: number
  }
  prediction: "high" | "medium" | "low"
  recommendations: string[]
  calculatedAt: Date
}

export interface CRMSync {
  id: string
  provider: "salesforce" | "hubspot" | "pipedrive" | "zoho"
  status: "pending" | "syncing" | "completed" | "failed"
  leadsImported: number
  leadsSynced: number
  lastSyncAt?: Date
  error?: string
}

export interface Analytics {
  totalLeads: number
  qualifiedLeads: number
  conversionRate: number
  averageScore: number
  topSources: { source: string; count: number }[]
  scoreDistribution: { range: string; count: number }[]
  recentActivity: {
    date: string
    newLeads: number
    conversions: number
  }[]
}
