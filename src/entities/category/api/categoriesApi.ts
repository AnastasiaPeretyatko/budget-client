import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { CategoryType, CreateCategoryDto, UpdateCategoryDto } from '../types/category.type';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Categories'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getCategories: build.query<CategoryType[], { search?: string } | void>({
      query: (arg) => ({ url: '/categories/all', method: 'GET', params: { search: arg?.search || undefined } }),
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Categories' as const, id })),
          { type: 'Categories', id: 'LIST' },
        ]
        : [{ type: 'Categories', id: 'LIST' }],
    }),
    addCategories: build.mutation<CategoryType, CreateCategoryDto>({
      query: (data) => ({ url: '/categories', method:'POST', data }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    }),
    updateCategories: build.mutation<CategoryType, { id: string, data: UpdateCategoryDto }>({
      query: ({ id, data }) => ({ url: `/categories/${id}`, method:'PATCH', data }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    }),
    archiveCategories: build.mutation<void, string>({
      query: (id) => ({ url: `/categories/${id}`, method:'DELETE' }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    }),
  })
})

export const {
  useAddCategoriesMutation,
  useGetCategoriesQuery,
  useUpdateCategoriesMutation,
  useArchiveCategoriesMutation
} = categoriesApi
