import { useEffect, useRef, useState } from 'react'

// Грузит варианты для выпадающего списка с сервера.
// Когда меняется search — ждёт debounceMs (чтобы не слать запрос на каждую букву) и запрашивает заново.
export const useAsyncOptions = <T,>(
  fetchOptions: (search: string) => Promise<T[]>,
  debounceMs = 400,
) => {
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // всегда держим свежую функцию, но не перезапускаем из-за неё запрос
  const fetchRef = useRef(fetchOptions)
  useEffect(() => {
    fetchRef.current = fetchOptions
  })

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)

    // пустой поиск (первая загрузка / сброс) — без задержки
    const timer = setTimeout(async () => {
      try {
        const items = await fetchRef.current(search)
        if (!cancelled) setOptions(items)
      } catch {
        if (!cancelled) setOptions([])
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }, search ? debounceMs : 0)

    // новый ввод отменяет предыдущий запрос — его результат больше не нужен
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [search, debounceMs])

  return { options, isLoading, search, setSearch }
}
