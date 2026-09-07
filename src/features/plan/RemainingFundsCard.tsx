import { RootState, useAppDispatch } from '@/app/store'
import CategoryPieCard from '@/widgets/analytics/CategoryPieCard'
import { useSelector } from 'react-redux'
import { Card, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { fetchLatestPeriodThunk } from '@/entities/bulling-period'
import { fetchDashboardSummaryThunk } from '@/entities/statistics'
import { formattingmonay } from '@/shared/utils/formattingMonay'

const RemainingFundsCard = () => {
  const dispatch = useAppDispatch()
  const { dashboardSummary } = useSelector((state: RootState) => state.statistics)
  const { latestPeriod } = useSelector((state: RootState) => state.billingPeriod)

  const countDaysRemaining = () => {
    if (!latestPeriod) return 0
    // eslint-disable-next-line max-len
    const totalDays = new Date(latestPeriod.endDate).getTime() - new Date(latestPeriod.startDate).getTime()
    const daysFromStart = new Date().getTime() - new Date(latestPeriod.startDate).getTime()
    // eslint-disable-next-line max-len
    const daysRemaining = Math.max(Math.ceil((totalDays - daysFromStart) / (1000 * 60 * 60 * 24)), 0)
    return daysRemaining
  }

  const countDailyBudget = () => {
    if (!latestPeriod || !dashboardSummary) return 0
    const daysRemaining = countDaysRemaining()
    if (daysRemaining <= 0) return 0
    return Math.floor(+dashboardSummary.balance / daysRemaining)
  }

  useEffect(() => {
    if (!dashboardSummary) {
      dispatch(fetchDashboardSummaryThunk())
      dispatch(fetchLatestPeriodThunk())
    }
  }, [dispatch, dashboardSummary])

  return (
    <Card.Root p={4} width={'100%'} flexDirection={'column'} gap={1}>
      <Text fontSize={'xs'} color={'gray.500'}>
        Осталось
      </Text>
      <Heading size={'3xl'}>{formattingmonay(dashboardSummary?.balance)} ₽</Heading>
      <Text color={'gray.500'} fontSize={'xs'}>
        {formattingmonay(countDailyBudget())} ₽ в день - ещё {countDaysRemaining()} дней
      </Text>
      <CategoryPieCard />
    </Card.Root>
  )
}

export default RemainingFundsCard
