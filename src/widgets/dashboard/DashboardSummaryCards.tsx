'use client'

import { useMemo } from 'react'
import { useGetDashboardSummaryQuery } from '@/entities/statistics/api/statisticsApi'
import { useGetLatestPeriodQuery } from '@/entities/billing-period/api/billing-periodApi'
import { Grid, GridItem } from '@chakra-ui/react'
import moment from 'moment'
import { BalanceCard, TotalIncomeCard, TotalSpentCard } from '@/entities/statistics'
import { PeriodProgressCard } from '@/entities/billing-period'
import { useIsMobile } from '@/shared/hooks/useIsMobile'

const DashboardSummaryCards = () => {
  const isMobile = useIsMobile()

  const {
    data: dashboardSummary,
    isLoading: isDashboardSummaryLoading
  } = useGetDashboardSummaryQuery()
  const { data: latestPeriod } = useGetLatestPeriodQuery()

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
    <Grid width="100%" gap={2} templateColumns={{ base: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, 1fr)" }}>
      <GridItem colSpan={{ base: 2, lg: 1 }}>
        <BalanceCard
          balance={Number(dashboardSummary?.balance ?? 0)}
          isLoading={isDashboardSummaryLoading}
          change={dashboardSummary?.balanceChange}
        />
      </GridItem>
      <GridItem>
        <TotalIncomeCard
          value={Number(dashboardSummary?.totalIncome ?? 0)}
          isLoading={isDashboardSummaryLoading}
          change={dashboardSummary?.incomeChange}
        />
      </GridItem>
      <GridItem>
        <TotalSpentCard
          value={Number(dashboardSummary?.totalExpenses ?? 0)}
          isLoading={isDashboardSummaryLoading}
          change={dashboardSummary?.expensesChange}
        />
      </GridItem>
      {
        !isMobile &&
        <PeriodProgressCard
          daysRemaining={daysRemaining}
          totalDays={totalDays}
          percent={periodPercent}
        />
      }

    </Grid>
  )
}

export default DashboardSummaryCards
