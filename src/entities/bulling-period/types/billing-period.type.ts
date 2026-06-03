export type CreateBillingPeriodDto = {
  startDate: string
  endDate: string
}

export type BillingPeriodType = {
  id: string
  startDate: string
  endDate: string
  workspaceId: string
  createdAt: string
}
