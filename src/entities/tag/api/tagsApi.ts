import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { CreateTagDto, TagType } from '../types/tag.type';

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  tagTypes: ['Tags'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getTags: build.query<TagType[],void>({
      query: () => ({ url: '/tags/all', method: 'GET' }),
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Tags' as const, id })),
          { type: 'Tags', id: 'LIST' },
        ]
        : [{ type: 'Tags', id: 'LIST' }],
    }),
    addTag: build.mutation<TagType, CreateTagDto>({
      query: (data) => ({ url: '/tags', method:'POST', data }),
      invalidatesTags: [{ type: 'Tags', id: 'LIST' }]
    })
  })
})

export const { useAddTagMutation, useGetTagsQuery } = tagsApi
