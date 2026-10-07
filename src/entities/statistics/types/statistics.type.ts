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
