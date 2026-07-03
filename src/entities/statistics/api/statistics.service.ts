import { http } from '@/shared/api'
import { ActivityItem, BalanceHistoryItem, DashboardSummaryResponse, StatisticsByCategoryDto, StatisticsByCategoryResponse, TopExpenseItem, TotalSummaryResponse } from '../types/statistics.type'
import { AxiosResponse } from 'axios'

export const getStatisticsByCategoryRequest = (
  dto: StatisticsByCategoryDto
): Promise<AxiosResponse<StatisticsByCategoryResponse>> =>
  http.post('/statistics/by-category', dto)

export const getActivityRequest = (): Promise<AxiosResponse<ActivityItem[]>> =>
  http.get('/statistics/activity')

export const getTotalSummaryRequest = (): Promise<AxiosResponse<TotalSummaryResponse>> =>
  http.get('/statistics/total-spent')

export const getTopExpensesRequest = (): Promise<AxiosResponse<TopExpenseItem[]>> =>
  http.get('/statistics/top-expenses')

export const getDashboardSummaryRequest = (): Promise<AxiosResponse<DashboardSummaryResponse>> =>
  http.get('/statistics/dashboard')

export const getBalanceHistoryRequest = (accountId: string): Promise<AxiosResponse<BalanceHistoryItem[]>> =>
  http.get('/statistics/balance-history', { params: { accountId } })
