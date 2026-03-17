import { createSlice } from '@reduxjs/toolkit'
import { getAllTransactionThunk, postTransactionThunk } from './transaction.thunk'
import { TransactionType } from '../types/transaction.type'

export type TParams = {}

type TInitialState = {
  transaction: TransactionType[]
  count: number
}

const initialState: TInitialState = {
  transaction: [],
  count: 0
}

const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postTransactionThunk.pending, state => {})
      .addCase(postTransactionThunk.fulfilled, (state, {payload}) => {
        state.transaction.push(payload.data)
      })
      .addCase(getAllTransactionThunk.fulfilled, (state, {payload}) => {
        state.transaction = payload.rows
        state.count = payload.count
      })
    }
})

export default transactions.reducer;
