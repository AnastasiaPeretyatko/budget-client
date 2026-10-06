import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { EnvelopesType } from '../types/envelopes.type';

export const envelopeApi = createApi({
  reducerPath: 'envelopeApi',
  tagTypes: ['Envelope'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getEnvelope: build.query<EnvelopesType, string>({
      query: (id) => ({ url: `/saving/${id}`, method:'GET' }),
      providesTags: (result, error, id) => [{ type: 'Envelope', id }],
    }),
    // updateEvelope: build.mutation<EnvelopesType, BaseEnvelopesType>({
    //   query: (data) => ({ url: `/saving/${id}`, method:'PATCH', data }),
    //   invalidatesTags: [{ type: 'Envelope', id: 'LIST' }]
    // })
  })
})

export const { useGetEnvelopeQuery } = envelopeApi
