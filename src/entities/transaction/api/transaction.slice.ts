import { createSlice } from '@reduxjs/toolkit'
import { getAllTransactionThunk, postTransactionThunk } from './transaction.thunk'
import { TransactionType } from '../types/transaction.type'

type TInitialState = {
  transaction: TransactionType[]
  count: number
  isLoading: boolean
  error?: string
}

const initialState: TInitialState = {
  transaction: [],
  count: 0,
  isLoading: false
}

const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postTransactionThunk.pending, state => {
        state.error = undefined
      })
      .addCase(postTransactionThunk.fulfilled, (state, { payload }) => {
        state.transaction.push(payload)
      })
      .addCase(postTransactionThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(getAllTransactionThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(getAllTransactionThunk.fulfilled, (state, { payload }) => {
        state.transaction = payload.rows
        state.count = payload.count
        state.isLoading = false
      })
      .addCase(getAllTransactionThunk.rejected, (state, { payload }) => {
        state.error = payload
        state.isLoading = false
      })
  }
})

export default transactions.reducer;
