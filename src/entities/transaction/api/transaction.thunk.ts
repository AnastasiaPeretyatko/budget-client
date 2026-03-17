import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseTransactionType, TransactionType } from '../types/transaction.type'
import { getAllTransactionRequest, postTransactionRequest } from './transaction.service'

export const postTransactionThunk = createAsyncThunk<{data: TransactionType, message: string}, BaseTransactionType>('/transaction.create', async (data) => {
  try {
    const res = await postTransactionRequest(data);
    return {
      data: res.data.data,
      message: ''
    }
  } catch (error) {
    console.log(error)
  }
})

export const getAllTransactionThunk = createAsyncThunk<
  { rows: TransactionType[]; count: number },
  void
>('transaction/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await getAllTransactionRequest();

    return {
      rows: res.data.rows,
      count: res.data.count,
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});