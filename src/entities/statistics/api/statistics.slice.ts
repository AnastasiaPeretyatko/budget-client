import { createSlice } from '@reduxjs/toolkit'
import { fetchActivityThunk, fetchTopExpensesThunk, fetchDashboardSummaryThunk } from './statistics.thunk'
import { ActivityItem, DashboardSummaryResponse, TopExpenseItem } from '../types/statistics.type'

type StatisticsState = {
  activity: ActivityItem[]
  isActivityLoading: boolean
  topExpenses: TopExpenseItem[]
  isTopExpensesLoading: boolean
  dashboardSummary: DashboardSummaryResponse | null
  isDashboardSummaryLoading: boolean
}

const initialState: StatisticsState = {
  activity: [],
  isActivityLoading: false,
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
