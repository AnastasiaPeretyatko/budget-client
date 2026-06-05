import { http } from '@/shared/api'
import { CategoryType, CreateCategoryDto, UpdateCategoryDto } from '../types/category.type'

export const getAllCategoryRequest = (search?: string) =>
  http.get<CategoryType[]>('/categories/all', { params: { search } })

export const postCategoryRequest = (name: string) =>
  http.post<CategoryType>('/categories', { name })

export const updateCategoryRequest = (id: string, data: UpdateCategoryDto) =>
  http.patch<CategoryType>(`/categories/${id}`, data)

export const archiveCategoryRequest = (id: string) =>
  http.delete<{ message: string }>(`/categories/${id}`)
