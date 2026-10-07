import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { PlanRange, PlanStatisticsType } from '../types/plan-statistics.type';

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getPlanStatistics: build.query<PlanStatisticsType, PlanRange>({
      query: (range) => ({ url: '/statistics/plan', method: 'GET', params: { range } }),
    }),
  })
})

export const { useGetPlanStatisticsQuery } = statisticsApi
