import { createSlice } from '@reduxjs/toolkit'
import { fetchTransactionsThunk, createTransactionThunk } from './transaction.thunk'
import { TransactionType } from '../types/transaction.type'

type TransactionState = {
  transactions: TransactionType[]
  count: number
  isLoading: boolean
  error?: string
}

const initialState: TransactionState = {
  transactions: [],
  count: 0,
  isLoading: false
}

const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTransactionThunk.pending, state => {
        state.error = undefined
      })
      .addCase(createTransactionThunk.fulfilled, (state, { payload }) => {
        state.transactions.push(payload)
      })
      .addCase(createTransactionThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(fetchTransactionsThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchTransactionsThunk.fulfilled, (state, { payload }) => {
        state.transactions = payload.rows
        state.count = payload.count
        state.isLoading = false
      })
      .addCase(fetchTransactionsThunk.rejected, (state, { payload }) => {
        state.error = payload
        state.isLoading = false
      })
  }
})

export default transactions.reducer;
