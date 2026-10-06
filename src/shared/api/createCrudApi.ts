import { http } from '@/shared/api'

export function createCrudApi<
  TEntity,
  TCreateDto = Partial<TEntity>,
  TUpdateDto = Partial<TEntity>
>(baseUrl: string) {
  return {
    findAll: (params?: Record<string, number | string>) =>
      http.get<TEntity[]>(baseUrl, { params }),

    findOne: (id: string) =>
      http.get<TEntity>(`${baseUrl}/${id}`),

    create: (body: TCreateDto) =>
      http.post<TEntity>(baseUrl, body),

    update: (id: string, body: TUpdateDto) =>
      http.patch<TEntity>(`${baseUrl}/${id}`, body),

    remove: (id: string) =>
      http.delete<{ message: string }>(`${baseUrl}/${id}`),
  }
}
