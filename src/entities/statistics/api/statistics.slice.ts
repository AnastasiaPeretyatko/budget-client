import { createSlice } from '@reduxjs/toolkit'
import { fetchStatisticsByCategoryThunk, fetchPeriodComparisonThunk, fetchActivityThunk } from './statistics.thunk'
import { ActivityItem, CategoryStatisticsItem, UncategorizedStatistics, PeriodComparisonResponse } from '../types/statistics.type'

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
  },
})

export default statisticsSlice.reducer
