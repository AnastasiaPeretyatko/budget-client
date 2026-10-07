import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseTemplateType, TemplateType } from '../types/template.type';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { ParamsType } from '@/shared/types/params.type';
import { TransactionTypeEnum } from '@/entities/transaction';

export type GetTemplatesParams = Partial<ParamsType> & {
  type?: TransactionTypeEnum
  categoryIds?: string[]
  tagIds?: string[]
}

export const templatesApi = createApi({
  reducerPath: 'templatesApi',
  tagTypes: ['Templates'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getTemplates: build.query<{data: TemplateType[], count: number}, GetTemplatesParams>({
      query: (params) => ({ url: 'templates', method: 'GET', params }),
      providesTags: (result) => result?.data
        ? [
          ...result.data.map(({ id }) => ({ type: 'Templates' as const, id })),
          { type: 'Templates', id: 'LIST' },
        ]
        : [{ type: 'Templates', id: 'LIST' }],
    }),
    addTemplate: build.mutation<TemplateType, BaseTemplateType>({
      query: (data) =>({ url: `templates`, method: 'POST', data }),
      invalidatesTags: [{ type: 'Templates', id: 'LIST' }]
    }),
    updateTemplate: build.mutation<TemplateType, {id:string; body: BaseTemplateType}>({
      query: ({ id, body:data }) =>({ url: `templates/${id}`, method: 'PATCH', data }),
      invalidatesTags: [{ type: 'Templates', id: 'LIST' }]
    }),
    deleteTemplate: build.mutation<TemplateType, string>({
      query: (id: string) =>({ url: `templates/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Templates', id: 'LIST' }]
    }),
  })
})

export const {
  useGetTemplatesQuery,
  useAddTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation
} = templatesApi
