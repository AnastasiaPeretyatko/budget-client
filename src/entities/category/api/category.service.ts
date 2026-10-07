import { http } from '@/shared/api'
import { CategoryType, CreateCategoryDto } from '../types/category.type'

export const getAllCategoryRequest = (search?: string) =>
  http.get<CategoryType[]>('/categories/all', { params: { search } })

export const postCategoryRequest = (data: CreateCategoryDto) =>
  http.post<CategoryType>('/categories', data)
