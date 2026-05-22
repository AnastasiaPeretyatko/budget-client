import { http } from '@/shared/api';
import { BaseSavingAccountType, SavingAccountType } from '../types/saving-account.type';

export const getAllSavingRequest = (search?: string) =>
  http.get<SavingAccountType[]>('/saving', { params: { search } })

export const postSavingRequest = (data: BaseSavingAccountType) => http.post('/saving', data)

export const getSavingByIdRequest = (id: string) =>
  http.get<SavingAccountType>(`/saving/${id}`)

export const deleteSavingRequest = (id: string) => http.delete(`/saving/${id}`)

