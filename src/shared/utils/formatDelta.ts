import { formattingMonay } from './formattingMonay'

// Сумма со знаком: "+1 600 ₽" / "-4 000 ₽". Нет значения — прочерк.
export const formatDelta = (value?: string | null): string => {
  if (value === null || value === undefined) return '—'

  const amount = Number(value)
  return `${amount > 0 ? '+' : ''}${formattingMonay(amount)}`
}
