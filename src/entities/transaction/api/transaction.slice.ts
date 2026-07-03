import { createSlice } from '@reduxjs/toolkit'
import { fetchTransactionsThunk, createTransactionThunk, deleteTransactionThunk, updateTransactionThunk } from './transaction.thunk'
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
      .addCase(createTransactionThunk.pending, state => {
        state.error = undefined
      })
      .addCase(createTransactionThunk.fulfilled, (state, { payload }) => {
        insertSortedByDate(state.transactions, payload, t => t.date)
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
      .addCase(deleteTransactionThunk.fulfilled, (state, { payload }) => {
        state.transactions = state.transactions.filter(t => t.id !== payload)
        state.count = Math.max(0, state.count - 1)
      })
      .addCase(updateTransactionThunk.fulfilled, (state, { payload }) => {
        const index = state.transactions.findIndex(t => t.id === payload.id)
        if (index !== -1) state.transactions[index] = payload
      })
  }
})

export default transactions.reducer;
