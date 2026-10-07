// Сумма с сервера приходит строкой ("1550.00") — для графиков и расчётов нужно число
export const toNumber = (value?: string | null): number => Number(value ?? 0) || 0
