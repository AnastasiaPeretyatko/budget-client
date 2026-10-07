import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { PlanRange, PlanStatisticsType } from '../types/plan-statistics.type';
import { ActivityItem, DashboardSummaryResponse, TopExpenseItem } from '../types/statistics.type';

// Любая операция меняет все цифры статистики — мутации транзакций сбрасывают этот тег
export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  tagTypes: ['Statistics'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getPlanStatistics: build.query<PlanStatisticsType, PlanRange>({
      query: (range) => ({ url: '/statistics/plan', method: 'GET', params: { range } }),
      providesTags: ['Statistics'],
    }),
    getDashboardSummary: build.query<DashboardSummaryResponse, void>({
      query: () => ({ url: '/statistics/dashboard', method: 'GET' }),
      providesTags: ['Statistics'],
    }),
    getActivity: build.query<ActivityItem[], void>({
      query: () => ({ url: '/statistics/activity', method: 'GET' }),
      providesTags: ['Statistics'],
    }),
    getTopExpenses: build.query<TopExpenseItem[], void>({
      query: () => ({ url: '/statistics/top-expenses', method: 'GET' }),
      providesTags: ['Statistics'],
    }),
  })
})

export const {
  useGetPlanStatisticsQuery,
  useGetDashboardSummaryQuery,
  useGetActivityQuery,
  useGetTopExpensesQuery
} = statisticsApi
