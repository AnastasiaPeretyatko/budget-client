import { createAsyncThunk } from '@reduxjs/toolkit'
import { createBillingPeriodRequest } from './bulling-period.service'
import { BillingPeriodType, CreateBillingPeriodDto } from '../types/billing-period.type'

export const createBillingPeriodThunk = createAsyncThunk<
  BillingPeriodType,
  CreateBillingPeriodDto,
  { rejectValue: string }
>('billingPeriod/create', async (data, { rejectWithValue }) => {
  try {
    const res = await createBillingPeriodRequest(data)
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})
