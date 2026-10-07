import { MacroFundEnum } from '../types/category.type'
import { Sprout, ShieldCheck, TrendingUp } from 'lucide-react'

export const MACRO_FUND_CONFIG = {
  [MacroFundEnum.ESSENTIALS]: {
    label: 'Базовые обязательства',
    share: 50,
    description: 'Обязательные регулярные траты и прожиточный фонд',
    icon: ShieldCheck,
    bg: '#EFF6FF',
    color: '#1D4ED8',
  },
  [MacroFundEnum.LIFESTYLE]: {
    label: 'Качество жизни',
    share: 30,
    description: 'Свободные траты, удовольствия и развлечения',
    icon: Sprout,
    bg: '#FFFBEB',
    color: '#B45309',
  },
  [MacroFundEnum.SAVINGS]: {
    label: 'Капитал и резерв',
    share: 20,
    description: 'Инвестиции, подушка безопасности и цели',
    icon: TrendingUp,
    bg: '#ECFDF5',
    color: '#047857',
  },
} as const
