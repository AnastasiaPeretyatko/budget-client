import { http } from '@/shared/api'
import { BillingPeriodType, CreateBillingPeriodDto, UpdateBillingPeriodDto } from '../types/billing-period.type'
import { AxiosResponse } from 'axios'

export const getAllBillingPeriodsRequest = (): Promise<AxiosResponse<BillingPeriodType[]>> =>
  http.get('/billing-period')

export const createBillingPeriodRequest = (
  data: CreateBillingPeriodDto
): Promise<AxiosResponse<BillingPeriodType>> =>
  http.post('/billing-period', data)

export const updateBillingPeriodRequest = (
  id: string,
  data: UpdateBillingPeriodDto
): Promise<AxiosResponse<BillingPeriodType>> =>
  http.patch(`/billing-period/${id}`, data)

export const getDaysFromStartRequest = (): Promise<AxiosResponse<{ days: number }>> =>
  http.get('/billing-period/days-from-start')

export const getLatestActivePeriod = (): Promise<AxiosResponse<{startDate: string; endDate: string}>> =>
  http.get('/billing-period/latest')
