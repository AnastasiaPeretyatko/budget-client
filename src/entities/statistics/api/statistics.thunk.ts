import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { getActivityRequest, getDashboardSummaryRequest, getTopExpensesRequest } from './statistics.service'
import { ActivityItem, DashboardSummaryResponse, TopExpenseItem } from '../types/statistics.type'

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
