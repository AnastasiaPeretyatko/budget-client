import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { EnvelopesType } from '../types/envelopes.type';
import { envelopesApi } from './envelopesApi';

export type UpdateEnvelopeDto = {
  name?: string
  description?: string
  isSafe?: boolean
}

export const envelopeApi = createApi({
  reducerPath: 'envelopeApi',
  tagTypes: ['Envelope'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getEnvelope: build.query<EnvelopesType, string>({
      query: (id) => ({ url: `/saving/${id}`, method:'GET' }),
      providesTags: (result, error, id) => [{ type: 'Envelope', id }],
    }),
    updateEnvelope: build.mutation<EnvelopesType, { id: string, data: UpdateEnvelopeDto }>({
      query: ({ id, data }) => ({ url: `/saving/${id}`, method:'PATCH', data }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Envelope', id }],
      // Список конвертов лежит в другом api со своим кэшем — помечаем его устаревшим
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(envelopesApi.util.invalidateTags(['Envelopes']))
        } catch {
          // запрос не удался — данные не менялись, обновлять нечего
        }
      },
    }),
  })
})

export const { useGetEnvelopeQuery, useUpdateEnvelopeMutation } = envelopeApi
