import { createSlice } from '@reduxjs/toolkit'
import { createBillingPeriodThunk } from './billing-period.thunk'
import { BillingPeriodType } from '../types/billing-period.type'

type BillingPeriodState = {
  billingPeriods: BillingPeriodType[]
  isLoading: boolean
  error?: string
}

const initialState: BillingPeriodState = {
  billingPeriods: [],
  isLoading: false,
}

const billingPeriodSlice = createSlice({
  name: 'billingPeriod',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createBillingPeriodThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(createBillingPeriodThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.billingPeriods.push(payload)
      })
      .addCase(createBillingPeriodThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
  },
})

export default billingPeriodSlice.reducer
