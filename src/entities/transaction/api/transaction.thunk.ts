import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { BatchTransaction, TransactionType, TransactionTypeEnum } from '../types/transaction.type'
import { getAllTransactionRequest, postBatchTransactionRequest } from './transaction.service'

export type UpdateTransactionArgs = {
  id: string
  data: {
    fromAccountId?: string
    toAccountId?: string
    categoryId?: string
    tagIds?: string[]
    amount?: string
    description?: string | null
    date?: Date
    type?: TransactionTypeEnum
  }
}

export type GetAllTransactionResponse = {
  rows: TransactionType[];
  count: number;
};

export type TagFilterOperator =
  | { eq: string }
  | { in: string[] }
  | { nin: string[] }

export type GetAllTransactionArgs = {
  paging?: {
    limit?: number;
    offset?: number;
  };
  filter?: {
    fromAccountId?: string;
    toAccountId?: string;
    categoryId?: string;
    accountId?: string;
    date?: { between: string[] };
    type?: string;
    tag?: TagFilterOperator;
  };
};

export const postBatchTransactionThunk = createAsyncThunk<
TransactionType[],
BatchTransaction[],
{rejectValue: string}
>('transaction/batch', async (data, { rejectWithValue }) => {
  try {
    const res = await postBatchTransactionRequest(data)
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    return rejectWithValue(
      axiosError.response?.data?.message ?? axiosError.message ?? 'Unknown error'
    )
  }
})

export const fetchTransactionsThunk = createAsyncThunk<
  GetAllTransactionResponse,
  GetAllTransactionArgs,
  { rejectValue: string }
>(
  'transaction/getAll',
  async ({ paging, filter }, { rejectWithValue }) => {
    try {
      const res = await getAllTransactionRequest({ paging, filter })
      return {
        rows: res.data.rows,
        count: res.data.count,
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      return rejectWithValue(
        axiosError.response?.data?.message ?? axiosError.message ?? 'Unknown error'
      )
    }
  }
)
