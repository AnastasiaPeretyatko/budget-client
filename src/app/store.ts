import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { authReducer } from '@/entities/auth'
import { savingReducer } from '@/entities/saving-account'
import { transactionsReducer } from '@/entities/transaction'
import { workspacesReducer } from '@/entities/workspace'
import { billingPeriodReducer } from '@/entities/bulling-period'
import { categoryReducer } from '@/entities/category'
import { statisticsReducer } from '@/entities/statistics'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    savingAccounts: savingReducer,
    workspaces: workspacesReducer,
    billingPeriod: billingPeriodReducer,
    categories: categoryReducer,
    statistics: statisticsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
