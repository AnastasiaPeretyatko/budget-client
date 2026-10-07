import { createSlice } from '@reduxjs/toolkit'
import { fetchTransactionsThunk, postBatchTransactionThunk } from './transaction.thunk'
import { TransactionType } from '../types/transaction.type'
import { insertSortedByDate } from '@/shared/lib/insertSorted'

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
      .addCase(postBatchTransactionThunk.pending, state => {
        state.error = undefined
      })
      .addCase(postBatchTransactionThunk.fulfilled, (state, { payload }) => {
        payload.map(p => insertSortedByDate(state.transactions, p, t => t.date))
      })
      .addCase(postBatchTransactionThunk.rejected, (state, { payload }) => {
        state.error = payload
        state.isLoading = false
      })
  }
})

export default transactions.reducer;
