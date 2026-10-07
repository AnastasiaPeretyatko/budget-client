import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { authReducer } from '@/entities/auth'
import { workspacesReducer } from '@/entities/workspace'
import { selectedPeriodReducer } from '@/entities/bulling-period'
import { userApi } from '@/entities/user/api/userApi'
import { workspaceApi } from '@/entities/workspace/api/workspaceApi'
import { templatesApi } from '@/entities/template/api/templatesApi'
import { transactionApi } from '@/entities/transaction/api/transactionApi'
import { envelopesApi } from '@/entities/envelope/api/envelopesApi'
import { billingPeriodApi } from '@/entities/bulling-period/api/billing-periodApi'
import { envelopeApi } from '@/entities/envelope/api/envelopApi'
import { categoriesApi } from '@/entities/category/api/categoriesApi'
import { tagsApi } from '@/entities/tag/api/tagsApi'
import { statisticsApi } from '@/entities/statistics/api/statisticsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspaces: workspacesReducer,
    selectedPeriod: selectedPeriodReducer,
    [templatesApi.reducerPath]: templatesApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [envelopesApi.reducerPath]: envelopesApi.reducer,
    [envelopeApi.reducerPath]: envelopeApi.reducer,
    [billingPeriodApi.reducerPath]: billingPeriodApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer
  },
  middleware: (getDefaultMiddlewars) => getDefaultMiddlewars().concat(
    templatesApi.middleware,
    envelopesApi.middleware,
    transactionApi.middleware,
    billingPeriodApi.middleware,
    envelopeApi.middleware,
    categoriesApi.middleware,
    tagsApi.middleware,
    statisticsApi.middleware,
    userApi.middleware,
    workspaceApi.middleware
  )
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
