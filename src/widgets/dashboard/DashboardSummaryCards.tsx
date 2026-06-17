'use client'

import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchDashboardSummaryThunk } from '@/entities/statistics'
import { fetchLatestPeriodThunk } from '@/entities/bulling-period'
import { HStack } from '@chakra-ui/react'
import moment from 'moment'
import { BalanceCard, TotalIncomeCard, TotalSpentCard } from '@/entities/statistics'
import { PeriodProgressCard } from '@/entities/bulling-period'

const DashboardSummaryCards = () => {
  const dispatch = useAppDispatch()
  const { dashboardSummary, isDashboardSummaryLoading } =
    useSelector((state: RootState) => state.statistics)
  const { latestPeriod } = useSelector((state: RootState) => state.billingPeriod)

  useEffect(() => {
    dispatch(fetchDashboardSummaryThunk())
    dispatch(fetchLatestPeriodThunk())
  }, [dispatch])

  const totalDays = useMemo(() => {
    if (!latestPeriod) return null
    return moment(latestPeriod.endDate).diff(moment(latestPeriod.startDate), 'days')
  }, [latestPeriod])

  const daysFromStart = useMemo(() => {
    if (!latestPeriod) return 0
    return moment().diff(moment(latestPeriod.startDate), 'days')
  }, [latestPeriod])

  const periodPercent = useMemo(() => {
    if (!totalDays || totalDays <= 0) return 0
    return Math.min(Math.round((daysFromStart / totalDays) * 100), 100)
  }, [daysFromStart, totalDays])

  const daysRemaining = totalDays !== null ? Math.max(totalDays - daysFromStart, 0) : 0

  return (
    <HStack width="100%" gap={4} align="stretch">
      <BalanceCard
        balance={Number(dashboardSummary?.balance ?? 0)}
        isLoading={isDashboardSummaryLoading}
        change={dashboardSummary?.balanceChange}
      />
      <TotalIncomeCard
        value={Number(dashboardSummary?.totalIncome ?? 0)}
        isLoading={isDashboardSummaryLoading}
        change={dashboardSummary?.incomeChange}
      />
      <TotalSpentCard
        value={Number(dashboardSummary?.totalExpenses ?? 0)}
        isLoading={isDashboardSummaryLoading}
        change={dashboardSummary?.expensesChange}
      />
      <PeriodProgressCard
        daysRemaining={daysRemaining}
        totalDays={totalDays}
        percent={periodPercent}
      />
    </HStack>
  )
}

export default DashboardSummaryCards
