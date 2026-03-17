import { http } from '@/common/services.config';
import { BaseTransactionType } from '../types/transaction.type';

export const postTransactionRequest = (data: BaseTransactionType) => http.post('/transition', data)

export const getAllTransactionRequest = () => http.get('/transition')