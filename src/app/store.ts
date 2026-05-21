import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@/entities/auth'
import { savingReducer } from '@/entities/saving-account'
import { transactionsReducer } from '@/entities/transaction'
import { workspacesReducer } from '@/entities/workspace'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    savingAccounts: savingReducer,
    workspaces: workspacesReducer
  }
})
