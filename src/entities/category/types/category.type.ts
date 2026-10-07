import { IconName } from '@/shared/ui/icon-picker'

export enum MacroFundEnum {
  ESSENTIALS = 'essentials',
  LIFESTYLE = 'lifestyle',
  SAVINGS = 'savings',
}

export enum CategoryCycleStatusEnum {
  OK = 'ok',
  WARNING = 'warning',
  EXCEEDED = 'exceeded',
  NO_LIMIT = 'no_limit',
}

export type CategoryCycleType = {
  startDate: string
  endDate: string | null
  daysTotal: number | null
  daysLeft: number | null
  spent: string
  remaining: string | null
  percent: number | null
  transactionCount: number
  status: CategoryCycleStatusEnum
}

export type CategoryType = {
  id: string
  name: string
  description?: string | null
  icon?: string | null
  color?: string | null
  macroFund?: MacroFundEnum | null
  defaultLimit?: string | null
  rolloverToReserve?: boolean
  allowOverspendFromFund?: boolean
  cycle?: CategoryCycleType | null
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export type CreateCategoryDto = {
  name: string
  description?: string
  icon?: string
  color?: string
  macroFund?: MacroFundEnum
  defaultLimit?: string | null
  rolloverToReserve?: boolean
  allowOverspendFromFund?: boolean
}

export type UpdateCategoryDto = {
  name?: string
  description?: string
  icon?: string
  color?: string
  macroFund?: MacroFundEnum
  defaultLimit?: string | null
  rolloverToReserve?: boolean
  allowOverspendFromFund?: boolean
}

// Тип для формы: лимит хранится строкой (так с ним работает input),
// пустая строка превращается в null при отправке на сервер.
export type CategoryFormType = {
  name: string
  icon: IconName
  color: string
  macroFund: MacroFundEnum
  defaultLimit: string
  rolloverToReserve: boolean
  allowOverspendFromFund: boolean
}
