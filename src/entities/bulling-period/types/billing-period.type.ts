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
  startDay?: number
  workspaceId: string
  createdAt: string
}
