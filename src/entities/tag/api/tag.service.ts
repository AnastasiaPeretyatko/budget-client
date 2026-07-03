import { http } from '@/shared/api'
import { TagType, CreateTagDto, UpdateTagDto } from '../types/tag.type'

export const getAllTagsRequest = (search?: string) =>
  http.get<TagType[]>('/tags/all', { params: { search } })

export const postTagRequest = (data: CreateTagDto) =>
  http.post<TagType>('/tags', data)

export const updateTagRequest = (id: string, data: UpdateTagDto) =>
  http.patch<TagType>(`/tags/${id}`, data)

export const deleteTagRequest = (id: string) =>
  http.delete<{ message: string }>(`/tags/${id}`)
