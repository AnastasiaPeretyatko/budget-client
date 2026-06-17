export type CategoryStatisticsItem = {
  categoryId: string
  categoryName: string
  total: number
  count: number
  percent: number
}

export type UncategorizedStatistics = {
  total: number
  count: number
  percent: number
}

export type StatisticsByCategoryResponse = {
  totalSpent: number
  items: CategoryStatisticsItem[]
  uncategorized: UncategorizedStatistics
}

export type StatisticsByCategoryDto = {
  accountId?: string
  date?: {
    between?: [string, string]
  }
}

export type PeriodComparisonResponse = {
  current: StatisticsByCategoryResponse
  previous: StatisticsByCategoryResponse
}

export type TotalSummaryResponse = {
  totalSpent: string
  totalIncome: string
}

export type TopExpenseItem = {
  id: string
  amount: string
  description?: string | null
  date: string
  category?: {
    id: string
    name: string
    icon?: string
  } | null
}

export type ActivityItem = {
  date: string
  count: number
}

export type DashboardChangeItem = {
  percent: number
  sign: '+' | '-'
}

export type DashboardSummaryResponse = {
  totalIncome: string
  totalExpenses: string
  balance: string
  incomeChange: DashboardChangeItem
  expensesChange: DashboardChangeItem
  balanceChange: DashboardChangeItem
}

