import { http } from '@/shared/api'
import { ActivityItem, StatisticsByCategoryDto, StatisticsByCategoryResponse } from '../types/statistics.type'
import { AxiosResponse } from 'axios'

export const getStatisticsByCategoryRequest = (
  dto: StatisticsByCategoryDto
): Promise<AxiosResponse<StatisticsByCategoryResponse>> =>
  http.post('/statistics/by-category', dto)

export const getActivityRequest = (): Promise<AxiosResponse<ActivityItem[]>> =>
  http.get('/statistics/activity')
