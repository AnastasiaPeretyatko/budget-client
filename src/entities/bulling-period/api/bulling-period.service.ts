import { http } from '@/shared/api'
import { BillingPeriodType, CreateBillingPeriodDto } from '../types/billing-period.type'
import { AxiosResponse } from 'axios'

export const createBillingPeriodRequest = (
  data: CreateBillingPeriodDto
): Promise<AxiosResponse<BillingPeriodType>> =>
  http.post('/billing-period', data)
