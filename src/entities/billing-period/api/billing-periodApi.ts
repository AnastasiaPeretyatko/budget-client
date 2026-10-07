import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import {
  BillingPeriodHistoryItem,
  BillingPeriodSummaryType,
  BillingPeriodType,
  CreateBillingPeriodDto,
  LatestPeriodType,
  UpdateBillingPeriodDto
} from '../types/billing-period.type';

// После любого изменения периода пересчитываются и итоги, и история
const INVALIDATES = [
  { type: 'BillingPeriod' as const, id: 'LIST' },
  { type: 'BillingPeriod' as const, id: 'SUMMARY' },
  { type: 'BillingPeriod' as const, id: 'HISTORY' },
  { type: 'BillingPeriod' as const, id: 'LATEST' },
]

export const billingPeriodApi = createApi({
  reducerPath: 'billing-periodApi',
  tagTypes: ['BillingPeriod'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getPeriods: build.query<BillingPeriodType[], void>({
      query: () => ({ url: '/billing-period', method: 'GET' }),
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'BillingPeriod' as const, id })),
          { type: 'BillingPeriod', id: 'LIST' },
        ]
        : [{ type: 'BillingPeriod', id: 'LIST' }],
    }),
    // Сервер отвечает { data: период | null }: null значит «активного периода нет»
    getLatestPeriod: build.query<LatestPeriodType | null, void>({
      query: () => ({ url: '/billing-period/latest', method: 'GET' }),
      transformResponse: (response: { data: LatestPeriodType | null }) => response.data,
      providesTags: [{ type: 'BillingPeriod', id: 'LATEST' }],
    }),
    getPeriodSummary: build.query<BillingPeriodSummaryType, string>({
      query: (id) => ({ url: `/billing-period/${id}/summary`, method: 'GET' }),
      providesTags: [{ type: 'BillingPeriod', id: 'SUMMARY' }],
    }),
    getPeriodsHistory: build.query<BillingPeriodHistoryItem[], void>({
      query: () => ({ url: '/billing-period/history', method: 'GET' }),
      providesTags: [{ type: 'BillingPeriod', id: 'HISTORY' }],
    }),
    addPeriod: build.mutation<BillingPeriodType, CreateBillingPeriodDto>({
      query: (data) => ({ url: '/billing-period', method:'POST', data }),
      invalidatesTags: INVALIDATES
    }),
    updatePeriod: build.mutation<BillingPeriodType, { id: string, data: UpdateBillingPeriodDto }>({
      query: ({ id, data }) => ({ url: `/billing-period/${id}`, method:'PATCH', data }),
      invalidatesTags: INVALIDATES
    })
  })
})

export const {
  useAddPeriodMutation,
  useGetLatestPeriodQuery,
  useGetPeriodsQuery,
  useGetPeriodSummaryQuery,
  useGetPeriodsHistoryQuery,
  useUpdatePeriodMutation
} = billingPeriodApi
