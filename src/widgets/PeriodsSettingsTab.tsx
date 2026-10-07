import {
  useGetPeriodsHistoryQuery,
  useGetPeriodsQuery,
  useGetPeriodSummaryQuery
} from '@/entities/billing-period/api/billing-periodApi'
import { VStack } from '@chakra-ui/react'
import React from 'react'
import CurrentCycleCard from './CurrentCycleCard'
import PeriodsHistoryTable from './PeriodsHistoryTable'

const PeriodsSettingsTab = () => {
  const { data: periods = [] } = useGetPeriodsQuery()
  const activePeriod = periods.find(period => period.status === 'active')

  // refetchOnMountOrArgChange: цифры зависят от транзакций, поэтому при открытии вкладки берём свежие
  const { data: summary } = useGetPeriodSummaryQuery(activePeriod?.id ?? '', {
    skip: !activePeriod,
    refetchOnMountOrArgChange: true
  })
  const { data: history = [] } = useGetPeriodsHistoryQuery(undefined, {
    refetchOnMountOrArgChange: true
  })

  return (
    <VStack width={'100%'} align={'start'}>
      <CurrentCycleCard period={activePeriod} summary={summary}/>
      <PeriodsHistoryTable history={history}/>
    </VStack>
  )
}

export default PeriodsSettingsTab
