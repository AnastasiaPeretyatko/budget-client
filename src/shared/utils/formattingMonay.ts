export const formattingmonay = (value?: string | number): string => {
  return Number(value)?.toLocaleString('ru-RU') || '0'
}
