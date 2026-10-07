import { http } from '@/shared/api'
import { TagType } from '../types/tag.type'

export const getAllTagsRequest = (search?: string) =>
  http.get<TagType[]>('/tags/all', { params: { search } })
