import { http } from '@/shared/api';
import { BaseTransactionType, TransactionType } from '../types/transaction.type';
import { AxiosResponse } from 'axios';
import { GetAllTransactionArgs, GetAllTransactionResponse, UpdateTransactionArgs } from './transaction.thunk';

export const postTransactionRequest = (data: BaseTransactionType): Promise<AxiosResponse<TransactionType>> => http.post('/transition', data)

export const getAllTransactionRequest = (params: GetAllTransactionArgs): Promise<AxiosResponse<GetAllTransactionResponse>> => http.post('/transition/all', { ...params })

export const deleteTransactionRequest = (id: string): Promise<AxiosResponse<void>> => http.delete(`/transition/${id}`)

export const updateTransactionRequest = (id: string, data: UpdateTransactionArgs['data']): Promise<AxiosResponse<TransactionType>> => http.patch(`/transition/${id}`, data)
