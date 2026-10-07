import { http } from '@/shared/api'
import { ActivityItem, DashboardSummaryResponse, TopExpenseItem } from '../types/statistics.type'
import { AxiosResponse } from 'axios'

export const getActivityRequest = (): Promise<AxiosResponse<ActivityItem[]>> =>
  http.get('/statistics/activity')

export const getTopExpensesRequest = (): Promise<AxiosResponse<TopExpenseItem[]>> =>
  http.get('/statistics/top-expenses')

export const getDashboardSummaryRequest = (): Promise<AxiosResponse<DashboardSummaryResponse>> =>
  http.get('/statistics/dashboard')
