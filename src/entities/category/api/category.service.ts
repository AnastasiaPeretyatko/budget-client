import { http } from '@/shared/api'
import { CategoryType } from '../types/category.type'

export const getAllCategoryRequest = (search?: string) =>
  http.get<CategoryType[]>('/category', { params: { search } })
