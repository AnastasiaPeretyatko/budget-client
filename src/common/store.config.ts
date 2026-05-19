import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../entities/transaction/api/transaction.slice'
import savingReducer from '../entities/saving-account/api/saving-account.slice'
import authReducer from '../entities/auth/api/auth.slice'
import workspacesReducer from '../entities/workspace/api/workspace.slice'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    saving: savingReducer,
    workspaces: workspacesReducer
  }
})
