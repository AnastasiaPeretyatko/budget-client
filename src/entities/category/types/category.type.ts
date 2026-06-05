export type CategoryType = {
  id: string
  name: string
  description?: string
  icon?: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export type CreateCategoryDto = {
  name: string
  description?: string
  icon?: string
}

export type UpdateCategoryDto = {
  name?: string
  description?: string
  icon?: string
}
