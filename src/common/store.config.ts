import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../entities/transaction/api/transaction.slice'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer
  }
})