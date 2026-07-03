import { createSlice } from '@reduxjs/toolkit'
import {
  createBillingPeriodThunk,
  fetchLatestPeriodThunk,
  fetchBillingPeriodsThunk,
  updateBillingPeriodThunk,
  archiveBillingPeriodThunk
} from './billing-period.thunk'
import { BillingPeriodType } from '../types/billing-period.type'

type LatestPeriod = { startDate: string; endDate: string }

type BillingPeriodState = {
  billingPeriods: BillingPeriodType[]
  latestPeriod: LatestPeriod | null
  hasNoActivePeriod: boolean
  isLoading: boolean
  error?: string
}

const initialState: BillingPeriodState = {
  billingPeriods: [],
  latestPeriod: null,
  hasNoActivePeriod: false,
  isLoading: false,
}

const billingPeriodSlice = createSlice({
  name: 'billingPeriod',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBillingPeriodsThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchBillingPeriodsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.billingPeriods = payload
      })
      .addCase(fetchBillingPeriodsThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(createBillingPeriodThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(createBillingPeriodThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.hasNoActivePeriod = false
        state.billingPeriods.unshift(payload)
      })
      .addCase(createBillingPeriodThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(updateBillingPeriodThunk.fulfilled, (state, { payload }) => {
        const idx = state.billingPeriods.findIndex(bp => bp.id === payload.id)
        if (idx !== -1) state.billingPeriods[idx] = payload
      })
      .addCase(archiveBillingPeriodThunk.fulfilled, (state, { payload }) => {
        const idx = state.billingPeriods.findIndex(bp => bp.id === payload.id)
        if (idx !== -1) state.billingPeriods[idx] = payload
      })
      .addCase(fetchLatestPeriodThunk.fulfilled, (state, { payload }) => {
        state.hasNoActivePeriod = false
        state.latestPeriod = payload
      })
      .addCase(fetchLatestPeriodThunk.rejected, state => {
        state.hasNoActivePeriod = true
        state.latestPeriod = null
      })
  },
})

export default billingPeriodSlice.reducer
