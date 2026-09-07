import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'

// Recipe = аналог theme.components.*.variants из Chakra v2.
// base — общие стили, variants — наборы вариаций, defaultVariants — значения по умолчанию.
export const amountTextRecipe = defineRecipe({
  className: 'amount-text',
  base: {
    fontWeight: 500,
    lineHeight: 'shorter',
  },
  variants: {
    tone: {
      income: { color: 'income.fg' },
      expense: { color: 'expense.fg' },
      danger: { color: 'danger.fg' },
      period: { color: 'period.fg' },
      label: { color: 'label.fg' },
    },
    size: {
      xs: { fontSize: 'xs' },
      sm: { fontSize: 'sm' },
      md: { fontSize: 'md' },
      lg: { fontSize: 'lg', fontWeight: 600 },
    },
  },
  defaultVariants: {
    tone: 'label',
    size: 'sm',
  },
})

// Slot recipe = аналог составного компонента v2 (multi-part / parts).
// Описываем стили для каждого «слота» составного компонента, а variant `tone`
// разом перекрашивает нужные слоты (акцентный градиент фона + бейдж с иконкой).
const toneVariant = (token: string) => ({
  root: {
    // токен-ссылки в произвольном градиенте не резолвятся, поэтому берём CSS-переменную
    background: `linear-gradient(135deg, color-mix(in srgb, var(--chakra-colors-${token}) 9%, transparent) 0%, transparent 60%)`,
  },
  badge: {
    bg: `color-mix(in srgb, var(--chakra-colors-${token}) 16%, transparent)`,
    color: `${token}.fg`,
  },
})

export const summaryCardRecipe = defineSlotRecipe({
  className: 'summary-card',
  slots: ['root', 'body', 'header', 'label', 'value', 'badge'],
  base: {
    root: { flex: 1, borderRadius: 'lg', overflow: 'hidden' },
    body: { p: 4 },
    header: { display: 'flex', alignItems: 'center', gap: 1 },
    label: { color: 'label.fg', fontWeight: 500, fontSize: 'sm' },
    value: { minW: 0 },
    badge: {
      flexShrink: 0,
      w: '44px',
      h: '44px',
      borderRadius: 'full',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
    },
  },
  variants: {
    tone: {
      primary: toneVariant('primary'),
      income: toneVariant('income'),
      expense: toneVariant('expense'),
      period: toneVariant('period'),
    },
  },
  defaultVariants: {
    tone: 'primary',
  },
})

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        income: { value: COLOR.INCOME_TEXT },
        expense: { value: COLOR.EXPENSE_TEXT },
        danger: { value: COLOR.DANGER_TEXT },
        period: { value: COLOR.PERIOD_TEXT },
        primary: { value: COLOR.PRIMARY_COLOR },
        label: { value: COLOR.LABEL },
        border: { value: COLOR.BORDER },
        background: { value: COLOR.BACKGROUND },
      },
    },
    // Semantic tokens — «смысловые» ссылки на raw-токены. Здесь удобно
    // разводить значения для light/dark режимов, если появятся.
    semanticTokens: {
      colors: {
        income: { fg: { value: '{colors.income}' } },
        expense: { fg: { value: '{colors.expense}' } },
        danger: { fg: { value: '{colors.danger}' } },
        period: { fg: { value: '{colors.period}' } },
        primary: { fg: { value: '{colors.primary}' } },
        label: { value: { base: '#5f5e59', _dark: '#bcbab6' } },
        bg: {
          tabs: { value: { base: '#eeeceb', _dark: '#2c2c2c' } }
        },
        text: {
          sidebar: { value: { base: '#676661', _dark: '#BCBAB6' } }
        }
      },
    },
    recipes: {
      amountText: amountTextRecipe,
    },
    slotRecipes: {
      summaryCard: summaryCardRecipe,
    },
  },
})

export const system = createSystem(defaultConfig, config)
