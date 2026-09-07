import { createSlice } from '@reduxjs/toolkit'
import { fetchTransactionsThunk, createTransactionThunk, deleteTransactionThunk, updateTransactionThunk, postBatchTransactionThunk } from './transaction.thunk'
import { TransactionType } from '../types/transaction.type'
import { insertSortedByDate } from '@/shared/lib/insertSorted'

type TransactionState = {
  transactions: TransactionType[]
  selectedTransactions?: TransactionType[]
  count: number
  isLoading: boolean
  error?: string
}

const initialState: TransactionState = {
  transactions: [],
  selectedTransactions: [],
  count: 0,
  isLoading: false
}

const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setSelectedTransactions: (state, { payload }: { payload: string }) => {
      const transaction = state.transactions.find(t => t.id === payload)
      if (!transaction) return

      const isSelected = state.selectedTransactions?.some(t => t.id === payload)
      if (isSelected) {
        state.selectedTransactions = state.selectedTransactions?.filter(t => t.id !== payload)
      } else {
        state.selectedTransactions?.push(transaction)
      }
    },
    resetSelectedTransactions: (state) => {
      state.selectedTransactions = []
    }
  },
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

export const { setSelectedTransactions, resetSelectedTransactions } = transactions.actions

export default transactions.reducer;
