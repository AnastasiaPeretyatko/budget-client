import { BillingPeriodResult } from '../types/billing-period.type'

type ResultConfig = { label: string, bg: string, color: string }

export const PERIOD_RESULT_CONFIG: Record<BillingPeriodResult, ResultConfig> = {
  success: { label: 'Завершен успешно', bg: '#ECFDF5', color: '#047857' },
  overspent: { label: 'Перерасход', bg: '#FFFBEB', color: '#B45309' },
  no_plan: { label: 'Без плана', bg: '#F1F5F9', color: '#64748B' },
}

export const PERIOD_DELTA_COLOR = {
  positive: '#059669',
  negative: '#E11D48',
}
