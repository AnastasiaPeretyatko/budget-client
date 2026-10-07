import { useRouter } from 'next/router'
import { useAppDispatch } from '@/app/store'
import { resetApiCache } from '@/app/resetApiCache'
import { setActiveWorkspace } from '@/entities/workspace'
import { setSelectedPeriodId } from '@/entities/billing-period'

type Options = {
  // Куда перейти после смены. Без него остаёмся на странице (кроме страниц с id в адресе)
  redirectTo?: string
}

// Единое место смены рабочего пространства: и для селекта в хедере, и для карточки на странице выбора
export const useSwitchWorkspace = ({ redirectTo }: Options = {}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  return (id: string) => {
    // http.ts берёт X-Workspace-Id из localStorage при каждом запросе
    localStorage.setItem('workspaceId', id)
    // период и кэш принадлежали прежнему пространству
    localStorage.removeItem('period')
    dispatch(setSelectedPeriodId(null))
    dispatch(resetApiCache())
    // смена activeWorkspaceId перемонтирует страницу (key в AppGuard), и данные запросятся заново
    dispatch(setActiveWorkspace(id))
    // Страница с id в адресе (/budgets/[id]) относилась к прежнему пространству: такого счёта в новом нет
    const target = redirectTo ?? (router.pathname.includes('[') ? '/budgets' : null)
    if (target) router.push(target)
  }
}
