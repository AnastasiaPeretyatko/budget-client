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
