export type BillingPeriodStatus = 'active' | 'completed'

export type CreateBillingPeriodDto = {
  startDate: string
  endDate: string
}

export type UpdateBillingPeriodDto = {
  startDate?: string
  endDate?: string
  status?: BillingPeriodStatus
  startDay?: number
}

export type BillingPeriodType = {
  id: string
  startDate: string
  endDate: string
  status: BillingPeriodStatus
  startDay?: number | null
  workspaceId: string
  createdAt: string
}

export type LatestPeriodType = {
  id: string
  startDate: string
  endDate: string
}

export type BillingPeriodResult = 'success' | 'overspent' | 'no_plan'

export type BillingPeriodHistoryItem = {
  id: string
  startDate: string
  endDate: string
  daysTotal: number | null
  planned: string | null
  spent: string
  delta: string | null
  result: BillingPeriodResult
}

export type BillingPeriodSummaryCategory = {
  categoryId: string
  name: string
  icon: string | null
  color: string | null
  planned: string | null
  spent: string
  delta: string | null
}

export type BillingPeriodSummaryType = {
  period: {
    id: string
    status: BillingPeriodStatus
    startDate: string
    endDate: string | null
    startDay: number | null
    daysTotal: number | null
    daysLeft: number | null
    daysPassed: number | null
  }
  planned: string | null
  plannedCategories: number
  spent: string
  delta: string | null
  pace: { expectedSpent: string | null, deltaPercent: number | null } | null
  forecast: { spent: string | null, balance: string | null } | null
  uncategorizedSpent: string
  categories: BillingPeriodSummaryCategory[]
}
