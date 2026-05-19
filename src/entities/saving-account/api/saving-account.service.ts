import { http } from '@/common/services.config';
import { BaseSavingAccountType } from '../types/saving_account.type';

export const getAllSavingRequest = () => http.get('/saving')

export const postSavingRequest = (data: BaseSavingAccountType) => http.post('/saving', data)

export const deleteSavingRequest = (id: string) => http.delete(`/saving/${id}`)

