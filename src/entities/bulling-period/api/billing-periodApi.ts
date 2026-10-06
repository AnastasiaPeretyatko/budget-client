import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { BillingPeriodType, CreateBillingPeriodDto } from '../types/billing-period.type';

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
    addPeriod: build.mutation<BillingPeriodType, CreateBillingPeriodDto>({
      query: (data) => ({ url: '/billing-period', method:'POST', data }),
      invalidatesTags: [{ type: 'BillingPeriod', id: 'LIST' }]
    })
  })
})

export const { useAddPeriodMutation, useGetPeriodsQuery } = billingPeriodApi
