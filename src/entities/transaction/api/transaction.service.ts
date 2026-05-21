import { http } from '@/shared/api';
import { BaseTransactionType, TransactionType } from '../types/transaction.type';
import { AxiosResponse } from 'axios';
import { GetAllTransactionArgs, GetAllTransactionResponse } from './transaction.thunk';

export const postTransactionRequest = (data: BaseTransactionType): Promise<AxiosResponse<TransactionType>> => http.post('/transition', data)

export const getAllTransactionRequest = ( params: GetAllTransactionArgs): Promise<AxiosResponse<GetAllTransactionResponse>> => http.post('/transition/all',  { ...params })
