import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { BaseEnvelopesType, EnvelopesType } from '../types/envelopes.type';

export const envelopesApi = createApi({
  reducerPath: 'envelopesApi',
  tagTypes: ['Envelopes'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getEnvelopes: build.query<EnvelopesType[],void>({
      query: () => ({ url: '/saving', method: 'GET' }),
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Envelopes' as const, id })),
          { type: 'Envelopes', id: 'LIST' },
        ]
        : [{ type: 'Envelopes', id: 'LIST' }],
    }),
    addEvelopes: build.mutation<EnvelopesType, BaseEnvelopesType>({
      query: (data) => ({ url: '/saving', method:'POST', data }),
      invalidatesTags: [{ type: 'Envelopes', id: 'LIST' }]
    })
  })
})

export const { useGetEnvelopesQuery, useAddEvelopesMutation } = envelopesApi
