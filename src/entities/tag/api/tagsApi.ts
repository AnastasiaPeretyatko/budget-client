import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import {
  CleanupTagsResponse,
  CreateTagDto,
  GetTagsParams,
  MergeTagsDto,
  MergeTagsResponse,
  TagType,
  TagWithStatsType,
  UpdateTagDto
} from '../types/tag.type';

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  tagTypes: ['Tags'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getTags: build.query<TagWithStatsType[], GetTagsParams | void>({
      query: (params) => ({ url: '/tags/all', method: 'GET', params: params || undefined }),
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
    }),
    updateTag: build.mutation<TagType, { id: string, data: UpdateTagDto }>({
      query: ({ id, data }) => ({ url: `/tags/${id}`, method:'PATCH', data }),
      invalidatesTags: [{ type: 'Tags', id: 'LIST' }]
    }),
    deleteTag: build.mutation<void, string>({
      query: (id) => ({ url: `/tags/${id}`, method:'DELETE' }),
      invalidatesTags: [{ type: 'Tags', id: 'LIST' }]
    }),
    mergeTags: build.mutation<MergeTagsResponse, MergeTagsDto>({
      query: (data) => ({ url: '/tags/merge', method:'POST', data }),
      invalidatesTags: [{ type: 'Tags', id: 'LIST' }]
    }),
    cleanupTags: build.mutation<CleanupTagsResponse, void>({
      query: () => ({ url: '/tags/cleanup', method:'POST' }),
      invalidatesTags: [{ type: 'Tags', id: 'LIST' }]
    })
  })
})

export const {
  useAddTagMutation,
  useGetTagsQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useMergeTagsMutation,
  useCleanupTagsMutation
} = tagsApi
