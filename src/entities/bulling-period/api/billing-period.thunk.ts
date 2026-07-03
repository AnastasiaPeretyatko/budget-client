import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createBillingPeriodRequest,
  getLatestActivePeriod,
  getAllBillingPeriodsRequest,
  updateBillingPeriodRequest
} from './bulling-period.service'
import { BillingPeriodType, CreateBillingPeriodDto, UpdateBillingPeriodDto } from '../types/billing-period.type'

export const fetchBillingPeriodsThunk = createAsyncThunk<
  BillingPeriodType[],
  void,
  { rejectValue: string }
>('billingPeriod/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await getAllBillingPeriodsRequest()
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

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

export const updateBillingPeriodThunk = createAsyncThunk<
  BillingPeriodType,
  { id: string; data: UpdateBillingPeriodDto },
  { rejectValue: string }
>('billingPeriod/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await updateBillingPeriodRequest(id, data)
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

export const archiveBillingPeriodThunk = createAsyncThunk<
  BillingPeriodType,
  string,
  { rejectValue: string }
>('billingPeriod/archive', async (id, { rejectWithValue }) => {
  try {
    const res = await updateBillingPeriodRequest(id, { status: 'completed' })
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

export const fetchLatestPeriodThunk = createAsyncThunk<
  { startDate: string; endDate: string },
  void,
  { rejectValue: string }
>('billingPeriod/fetchLatest', async (_, { rejectWithValue }) => {
  try {
    const res = await getLatestActivePeriod()
    if (!res.data.data) return rejectWithValue('No active billing period')
    return res.data.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})
