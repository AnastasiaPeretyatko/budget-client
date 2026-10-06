import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { authReducer } from '@/entities/auth'
import { savingReducer } from '@/entities/saving-account'
import { transactionsReducer } from '@/entities/transaction'
import { workspacesReducer } from '@/entities/workspace'
import { billingPeriodReducer, selectedPeriodReducer } from '@/entities/bulling-period'
import { categoryReducer } from '@/entities/category'
import { statisticsReducer } from '@/entities/statistics'
import { userReducer } from '@/entities/user'
import { tagReducer } from '@/entities/tag'
import { templatesApi } from '@/entities/template/api/templatesApi'
import { transactionApi } from '@/entities/transaction/api/transactionApi'
import { envelopesApi } from '@/entities/envelope/api/envelopesApi'
import { billingPeriodApi } from '@/entities/bulling-period/api/billing-periodApi'
import { envelopeApi } from '@/entities/envelope/api/envelopApi'
import { categoriesApi } from '@/entities/category/api/categoriesApi'
import { tagsApi } from '@/entities/tag/api/tagsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    savingAccounts: savingReducer,
    workspaces: workspacesReducer,
    billingPeriod: billingPeriodReducer,
    selectedPeriod: selectedPeriodReducer,
    categories: categoryReducer,
    statistics: statisticsReducer,
    user: userReducer,
    tags: tagReducer,
    [templatesApi.reducerPath]: templatesApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [envelopesApi.reducerPath]: envelopesApi.reducer,
    [envelopeApi.reducerPath]: envelopeApi.reducer,
    [billingPeriodApi.reducerPath]: billingPeriodApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer
  },
  middleware: (getDefaultMiddlewars) => getDefaultMiddlewars().concat(
    templatesApi.middleware,
    envelopesApi.middleware,
    transactionApi.middleware,
    billingPeriodApi.middleware,
    envelopeApi.middleware,
    categoriesApi.middleware,
    tagsApi.middleware
  )
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
