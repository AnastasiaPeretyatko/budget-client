import { useMemo } from 'react'
import { useAppSelector } from '@/app/store'
import { useGetPeriodsQuery } from './billing-periodApi'

export const useSelectedPeriod = () => {
  const selectedPeriodId = useAppSelector(state => state.selectedPeriod.selectedPeriodId)
  const { data: periods } = useGetPeriodsQuery()

  const period = useMemo(
    () => periods?.find(p => p.id === selectedPeriodId),
    [periods, selectedPeriodId],
  )

  const dateBetween = useMemo(
    () => (period ? [period.startDate, period.endDate] : undefined),
    [period],
  )

  return { selectedPeriodId, period, dateBetween }
}
