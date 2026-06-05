import { http } from '@/shared/api'
import { ActivityItem, StatisticsByCategoryDto, StatisticsByCategoryResponse, TopExpenseItem, TotalSummaryResponse } from '../types/statistics.type'
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
