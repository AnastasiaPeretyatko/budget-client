import { http } from '@/shared/api';
import { BaseSavingAccountType } from '../types/saving-account.type';

export const getAllSavingRequest = () => http.get('/saving')

export const postSavingRequest = (data: BaseSavingAccountType) => http.post('/saving', data)

export const deleteSavingRequest = (id: string) => http.delete(`/saving/${id}`)

