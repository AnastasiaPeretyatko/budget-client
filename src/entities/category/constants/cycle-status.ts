import { CategoryCycleStatusEnum } from '../types/category.type'

export const CYCLE_STATUS_CONFIG = {
  [CategoryCycleStatusEnum.OK]: { color: '#00855D' },
  [CategoryCycleStatusEnum.WARNING]: { color: '#F59E0B' },
  [CategoryCycleStatusEnum.EXCEEDED]: { color: '#F43F5E' },
  [CategoryCycleStatusEnum.NO_LIMIT]: { color: '#94A3B8' },
} as const
