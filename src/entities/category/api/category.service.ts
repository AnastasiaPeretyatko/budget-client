import { http } from '@/shared/api'
import { CategoryType } from '../types/category.type'

export const getAllCategoryRequest = (search?: string) =>
  http.get<CategoryType[]>('/categories/all', { params: { search } })

export const postCategoryRequest = (name: string) =>
  http.post<CategoryType>('/categories', { name })
