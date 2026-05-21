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

export const postTransactionThunk = createAsyncThunk<
  TransactionType,
  BaseTransactionType,
  { rejectValue: string }
>('transaction/create', async (data, { rejectWithValue }) => {
  try {
    const res = await postTransactionRequest(data);
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const getAllTransactionThunk = createAsyncThunk<
  GetAllTransactionResponse,
  GetAllTransactionArgs,
  { rejectValue: string }
>(
  'transaction/getAll',
  async ({ paging, filter }, { rejectWithValue }) => {
    try {
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
