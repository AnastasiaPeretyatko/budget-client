import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseTransactionType, TransactionType } from '../types/transaction.type'
import { getAllTransactionRequest, postTransactionRequest } from './transaction.service'

export type GetAllTransactionResponse = {
  rows: TransactionType[];
  count: number;
};

export type GetAllTransactionArgs = {
  paging?: {
    limit?: number;
    offset?: number;
  };
  filter: {
    fromAccountId?: string;
    toAccountId?: string;
    categoryId?: string;
    workspaceId: string;
  };
};

type RejectType = string; // или кастомный тип ошибки

export const postTransactionThunk = createAsyncThunk<
  {data: TransactionType, message: string},
  BaseTransactionType,
  { rejectValue: RejectType }
>('/transaction.create', async (data, { rejectWithValue }) => {
  try {
    const res = await postTransactionRequest(data);
    return {
      data: res.data,
      message: ''
    }
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
})

export const getAllTransactionThunk = createAsyncThunk<
  GetAllTransactionResponse,
  GetAllTransactionArgs,
  { rejectValue: RejectType }
>(
  'transaction/getAll',
  async ({ paging, filter }, { rejectWithValue }) => {
    try {
      console.log({ filter });
      const res = await getAllTransactionRequest({ paging, filter });

      return {
        rows: res.data.rows,
        count: res.data.count,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);
