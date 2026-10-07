import { http } from '@/shared/api';
import { BatchTransaction, TransactionType } from '../types/transaction.type';
import { AxiosResponse } from 'axios';
import { GetAllTransactionArgs, GetAllTransactionResponse } from './transaction.thunk';

export const getAllTransactionRequest = (params: GetAllTransactionArgs): Promise<AxiosResponse<GetAllTransactionResponse>> => http.post('/transition/all', { ...params })

export const postBatchTransactionRequest = (data: BatchTransaction[]) => http.post<TransactionType[]>('/transition/batch', data)
