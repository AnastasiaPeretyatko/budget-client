import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import { buttonRecipe } from './button-recipe'
import { inputRecipe } from './input-recipe'
import { selectRecipe } from './select-recipe'
import { comboboxRecipe } from './combobox-recipe'
import { cardRecipe, summaryCardRecipe } from './card-recipe'
import { progressRecipe } from './progress-recipe'
import { tableRecipe } from './table-recipe'
import { badgeRecipe } from './badge-recipe'
import { textareaRecipe } from './textarea-recipe'
import { datePickerRecipe } from './datepicker-recipe'

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
export const toneVariant = (token: string) => ({
  root: {
    // токен-ссылки в произвольном градиенте не резолвятся, поэтому берём CSS-переменную
    background: `linear-gradient(135deg, color-mix(in srgb, var(--chakra-colors-${token}) 9%, transparent) 0%, transparent 60%)`,
  },
  badge: {
    bg: `color-mix(in srgb, var(--chakra-colors-${token}) 16%, transparent)`,
    color: `${token}.fg`,
  },
})

const config = defineConfig({
  globalCss: {
    "html, body": {
      background: '#FAF8FF'
    }
  },
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
        second_primary: { value: '#E2E7FF' },
        label: { value: { base: '#94A3B8', _dark: '#bcbab6' } },
        bg: {
          body: { value: { base: '#ffffff', _dark: '#0C1018' } },
          default: { value: { base: '#eeeceb', _dark: '#0E121A' } },
          default_light: { value: { base: '#eeeceb', _dark: '#121724' } },
        },
        outline: { value: { base: '#ffffff', _dark: '#1A1F2B' } },
        text: {
          sidebar: { value: { base: '#676661', _dark: '#BCBAB6' } }
        },
        input:{
          bg: { value: { base: '#F2F3FF', _dark: '#030304' } }
        }
      },
    },
    recipes: {
      amountText: amountTextRecipe,
      button: buttonRecipe,
      input: inputRecipe,
      badge: badgeRecipe,
      textarea: textareaRecipe
    },
    slotRecipes: {
      card: cardRecipe,
      select: selectRecipe,
      combobox: comboboxRecipe,
      progress: progressRecipe,
      summaryCard: summaryCardRecipe,
      table: tableRecipe,
      datePicker: datePickerRecipe,
    },
  },
})

export const system = createSystem(defaultConfig, config)
