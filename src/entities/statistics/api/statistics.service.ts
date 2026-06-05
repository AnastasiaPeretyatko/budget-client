import { http } from '@/shared/api'
import { StatisticsByCategoryDto, StatisticsByCategoryResponse } from '../types/statistics.type'
import { AxiosResponse } from 'axios'

export const getStatisticsByCategoryRequest = (
  dto: StatisticsByCategoryDto
): Promise<AxiosResponse<StatisticsByCategoryResponse>> =>
  http.post('/statistics/by-category', dto)
