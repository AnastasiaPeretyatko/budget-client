import { createSlice } from '@reduxjs/toolkit'
import { fetchStatisticsByCategoryThunk, fetchPeriodComparisonThunk, fetchActivityThunk, fetchTotalSummaryThunk, fetchTopExpensesThunk, fetchDashboardSummaryThunk } from './statistics.thunk'
import { ActivityItem, CategoryStatisticsItem, DashboardSummaryResponse, TopExpenseItem, UncategorizedStatistics, PeriodComparisonResponse } from '../types/statistics.type'

type StatisticsState = {
  totalSpent: number
  items: CategoryStatisticsItem[]
  uncategorized: UncategorizedStatistics | null
  isLoading: boolean
  error?: string
  periodComparison: PeriodComparisonResponse | null
  isComparisonLoading: boolean
  activity: ActivityItem[]
  isActivityLoading: boolean
  workspaceTotalSpent: number
  workspaceTotalIncome: number
  isSummaryLoading: boolean
  topExpenses: TopExpenseItem[]
  isTopExpensesLoading: boolean
  dashboardSummary: DashboardSummaryResponse | null
  isDashboardSummaryLoading: boolean
}

const initialState: StatisticsState = {
  totalSpent: 0,
  items: [],
  uncategorized: null,
  isLoading: false,
  periodComparison: null,
  isComparisonLoading: false,
  activity: [],
  isActivityLoading: false,
  workspaceTotalSpent: 0,
  workspaceTotalIncome: 0,
  isSummaryLoading: false,
  topExpenses: [],
  isTopExpensesLoading: false,
  dashboardSummary: null,
  isDashboardSummaryLoading: false,
}

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStatisticsByCategoryThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchStatisticsByCategoryThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.totalSpent = payload.totalSpent
        state.items = payload.items
        state.uncategorized = payload.uncategorized
      })
      .addCase(fetchStatisticsByCategoryThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(fetchPeriodComparisonThunk.pending, state => {
        state.isComparisonLoading = true
      })
      .addCase(fetchPeriodComparisonThunk.fulfilled, (state, { payload }) => {
        state.isComparisonLoading = false
        state.periodComparison = payload
      })
      .addCase(fetchPeriodComparisonThunk.rejected, state => {
        state.isComparisonLoading = false
      })
      .addCase(fetchActivityThunk.pending, state => {
        state.isActivityLoading = true
      })
      .addCase(fetchActivityThunk.fulfilled, (state, { payload }) => {
        state.isActivityLoading = false
        state.activity = payload
      })
      .addCase(fetchActivityThunk.rejected, state => {
        state.isActivityLoading = false
      })
      .addCase(fetchTotalSummaryThunk.pending, state => {
        state.isSummaryLoading = true
      })
      .addCase(fetchTotalSummaryThunk.fulfilled, (state, { payload }) => {
        state.isSummaryLoading = false
        state.workspaceTotalSpent = Number(payload.totalSpent)
        state.workspaceTotalIncome = Number(payload.totalIncome)
      })
      .addCase(fetchTotalSummaryThunk.rejected, state => {
        state.isSummaryLoading = false
      })
      .addCase(fetchTopExpensesThunk.pending, state => {
        state.isTopExpensesLoading = true
      })
      .addCase(fetchTopExpensesThunk.fulfilled, (state, { payload }) => {
        state.isTopExpensesLoading = false
        state.topExpenses = payload
      })
      .addCase(fetchTopExpensesThunk.rejected, state => {
        state.isTopExpensesLoading = false
      })
      .addCase(fetchDashboardSummaryThunk.pending, state => {
        state.isDashboardSummaryLoading = true
      })
      .addCase(fetchDashboardSummaryThunk.fulfilled, (state, { payload }) => {
        state.isDashboardSummaryLoading = false
        state.dashboardSummary = payload
      })
      .addCase(fetchDashboardSummaryThunk.rejected, state => {
        state.isDashboardSummaryLoading = false
      })
  },
})

export default statisticsSlice.reducer
