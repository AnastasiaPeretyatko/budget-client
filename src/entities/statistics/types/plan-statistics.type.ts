import { CategoryCycleStatusEnum, MacroFundEnum } from '@/entities/category'

export type PlanRange = 'all' | 'cycle' | 'half_year' | 'year'

export type PlanTimelinePoint = {
  from: string
  to: string
  planned: string | null
  // null — день ещё не наступил
  spent: string | null
}

export type PlanCategoryItem = {
  categoryId: string
  name: string
  icon: string | null
  color: string | null
  macroFund: MacroFundEnum | null
  // null — у конверта нет лимита
  planned: string | null
  spent: string
  percent: number | null
  status: CategoryCycleStatusEnum
}

export type PlanTagSlice = {
  // null — «Без тегов» и «Остальные теги»
  tagId: string | null
  name: string
  color: string | null
  total: string
  count: number
  percent: number
}

export type PlanFundItem = {
  fund: MacroFundEnum
  planned: string
  spent: string
  // Доли от суммы по трём фондам, %. null — данных нет
  plannedShare: number | null
  actualShare: number | null
}

export type PlanStatisticsType = {
  range: PlanRange
  from: string | null
  to: string | null
  periodsCount: number
  // Длина текущего цикла (для подписи вкладки)
  cycleDays: number | null
  totals: {
    planned: string
    spent: string
    toSafe: string
  }
  safeAccountsCount: number
  discipline: {
    respected: number
    total: number
  }
  timeline: {
    granularity: 'day' | 'period'
    points: PlanTimelinePoint[]
  }
  categories: PlanCategoryItem[]
  // Расходы без категории или у категории без макро-фонда
  unassignedSpent: string
  funds: PlanFundItem[]
  tags: PlanTagSlice[]
}
