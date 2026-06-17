import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { getActivityRequest, getDashboardSummaryRequest, getStatisticsByCategoryRequest, getTopExpensesRequest, getTotalSummaryRequest } from './statistics.service'
import { ActivityItem, DashboardSummaryResponse, StatisticsByCategoryDto, StatisticsByCategoryResponse, PeriodComparisonResponse, TopExpenseItem, TotalSummaryResponse } from '../types/statistics.type'
import { RootState } from '@/app/store'

export const fetchStatisticsByCategoryThunk = createAsyncThunk<
  StatisticsByCategoryResponse,
  StatisticsByCategoryDto,
  { rejectValue: string }
>('statistics/fetchByCategory', async (dto, { rejectWithValue }) => {
  try {
    const res = await getStatisticsByCategoryRequest(dto)
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

const emptyStats: StatisticsByCategoryResponse = {
  totalSpent: 0,
  items: [],
  uncategorized: { total: 0, count: 0, percent: 0 },
}

export const fetchPeriodComparisonThunk = createAsyncThunk<
  PeriodComparisonResponse,
  void,
  { state: RootState; rejectValue: string }
>('statistics/fetchPeriodComparison', async (_, { getState, rejectWithValue }) => {
  try {
    const { billingPeriods } = getState().billingPeriod
    const { activeSavingAccount } = getState().savingAccounts

    const sorted = [...billingPeriods].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )

    if (sorted.length < 2) {
      return { current: emptyStats, previous: emptyStats }
    }

    const [currentPeriod, previousPeriod] = sorted

    const [currentRes, previousRes] = await Promise.all([
      getStatisticsByCategoryRequest({
        accountId: activeSavingAccount?.id,
        date: { between: [currentPeriod.startDate, currentPeriod.endDate] },
      }),
      getStatisticsByCategoryRequest({
        accountId: activeSavingAccount?.id,
        date: { between: [previousPeriod.startDate, previousPeriod.endDate] },
      }),
    ])

    return { current: currentRes.data, previous: previousRes.data }
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

export const fetchTotalSummaryThunk = createAsyncThunk<
  TotalSummaryResponse,
  void,
  { rejectValue: string }
>('statistics/fetchTotalSummary', async (_, { rejectWithValue }) => {
  try {
    const res = await getTotalSummaryRequest()
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

export const fetchActivityThunk = createAsyncThunk<
  ActivityItem[],
  void,
  { rejectValue: string }
>('statistics/fetchActivity', async (_, { rejectWithValue }) => {
  try {
    const res = await getActivityRequest()
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

export const fetchTopExpensesThunk = createAsyncThunk<
  TopExpenseItem[],
  void,
  { rejectValue: string }
>('statistics/fetchTopExpenses', async (_, { rejectWithValue }) => {
  try {
    const res = await getTopExpensesRequest()
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

export const fetchDashboardSummaryThunk = createAsyncThunk<
  DashboardSummaryResponse,
  void,
  { rejectValue: string }
>('statistics/fetchDashboardSummary', async (_, { rejectWithValue }) => {
  try {
    const res = await getDashboardSummaryRequest()
    return res.data
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    return rejectWithValue(
      axiosError.response?.data?.message ?? axiosError.message ?? 'Unknown error'
    )
  }
})
