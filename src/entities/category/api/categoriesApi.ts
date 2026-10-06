import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { CategoryType, CreateCategoryDto } from '../types/category.type';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Categories'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getCategories: build.query<CategoryType[],void>({
      query: () => ({ url: '/categories/all', method: 'GET' }),
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
    })
  })
})

export const { useAddCategoriesMutation, useGetCategoriesQuery } = categoriesApi
