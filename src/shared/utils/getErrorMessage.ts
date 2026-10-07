// Достаёт текст ошибки из ответа axiosBaseQuery: { status, data }
export const getErrorMessage = (error: unknown, fallback = 'Unknown error'): string => {
  const data = (error as { data?: unknown } | null)?.data
  if (typeof data === 'string') return data

  const message = (data as { message?: unknown } | undefined)?.message
  if (typeof message === 'string') return message
  if (Array.isArray(message)) return message.join(', ')

  return fallback
}
