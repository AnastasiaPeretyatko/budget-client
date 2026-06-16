'use client'

import { useEffect, useMemo, useState, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchTotalSummaryThunk, fetchPeriodComparisonThunk } from '@/entities/statistics'
import { fetchDaysFromStartThunk } from '@/entities/bulling-period'
import { getLatestActivePeriod } from '@/entities/bulling-period/api/bulling-period.service'
import { COLOR } from '@/shared/config/colors'
import { Box, Card, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { InfoTip } from '@/shared/ui/toggle-tip'
import ProgressCircleUI from '@/shared/ui/progress-circle'
import moment from 'moment'
import { RiWalletLine } from 'react-icons/ri'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'

const formatAmount = (value: number) =>
  value.toLocaleString('ru-RU', { minimumFractionDigits: 2 })

const pluralDays = (n: number) => {
  const abs = Math.abs(n)
  if (abs % 10 === 1 && abs % 100 !== 11) return 'день'
  if (abs % 10 >= 2 && abs % 10 <= 4 && (abs % 100 < 10 || abs % 100 >= 20)) return 'дня'
  return 'дней'
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ChangeLabel = ({ percent }: { percent: number | null }) => {
  if (percent === null) return null
  const positive = percent >= 0
  const color = positive ? COLOR.INCOME_TEXT : COLOR.DANGER_TEXT
  const sign = positive ? '+' : ''
  return (
    <Text fontSize="xs" color={color} fontWeight={500}>
      {sign}{Math.round(percent)}% к прошлому периоду
    </Text>
  )
}

interface IconBadgeProps {
  icon: ReactNode
  bg: string
}

const IconBadge = ({ icon, bg }: IconBadgeProps) => (
  <Box
    flexShrink={0}
    w="44px"
    h="44px"
    borderRadius="full"
    bg={bg}
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontSize="20px"
    color="white"
  >
    {icon}
  </Box>
)

// ---------------------------------------------------------------------------
// Base card skeleton
// ---------------------------------------------------------------------------

interface SummaryCardProps {
  label: string
  value: ReactNode
  change?: ReactNode
  badge: ReactNode
  isLoading?: boolean
  accentColor: string
}

const SummaryCard = ({ label, value, change, badge, isLoading, accentColor }: SummaryCardProps) => (
  <Card.Root
    flex={1}
    style={{
      background: `linear-gradient(135deg, ${accentColor}18 0%, transparent 60%)`,
    }}
  >
    <Card.Body p={4}>
      <HStack width="100%" justify="space-between" align="center">
        <VStack align="start" gap={1} flex={1} minW={0}>
          <HStack gap={1}>
            <Text color={COLOR.LABEL} fontWeight={500} fontSize="sm">{label}</Text>
            <InfoTip />
          </HStack>
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <>
              {value}
              {change}
            </>
          )}
        </VStack>
        {badge}
      </HStack>
    </Card.Body>
  </Card.Root>
)

// ---------------------------------------------------------------------------
// Concrete cards
// ---------------------------------------------------------------------------

const BalanceCard = ({
  balance,
  isLoading,
  changePercent,
}: {
  balance: number
  isLoading: boolean
  changePercent: number | null
}) => (
  <SummaryCard
    label="Текущий баланс"
    accentColor={COLOR.PRIMARY_COLOR}
    isLoading={isLoading}
    value={<Heading size="lg">{formatAmount(balance)} ₽</Heading>}
    change={<ChangeLabel percent={changePercent} />}
    badge={
      <IconBadge
        bg="rgba(174,144,254,0.18)"
        icon={<RiWalletLine color={COLOR.PRIMARY_COLOR} />}
      />
    }
  />
)

const TotalIncomeCard = ({
  value,
  isLoading,
  changePercent,
}: {
  value: number
  isLoading: boolean
  changePercent: number | null
}) => (
  <SummaryCard
    label="Общий доход"
    accentColor={COLOR.INCOME_TEXT}
    isLoading={isLoading}
    value={<Heading size="lg" color={COLOR.INCOME_TEXT}>{formatAmount(value)} ₽</Heading>}
    change={<ChangeLabel percent={changePercent} />}
    badge={
      <IconBadge
        bg="rgba(97,209,97,0.15)"
        icon={<FiArrowDown color={COLOR.INCOME_TEXT} />}
      />
    }
  />
)

const TotalSpentCard = ({
  value,
  isLoading,
  changePercent,
}: {
  value: number
  isLoading: boolean
  changePercent: number | null
}) => (
  <SummaryCard
    label="Общие расходы"
    accentColor={COLOR.EXPENSE_TEXT}
    isLoading={isLoading}
    value={<Heading size="lg">{formatAmount(value)} ₽</Heading>}
    change={<ChangeLabel percent={changePercent} />}
    badge={
      <IconBadge
        bg="rgba(249,115,22,0.15)"
        icon={<FiArrowUp color={COLOR.EXPENSE_TEXT} />}
      />
    }
  />
)

const PeriodProgressCard = ({
  daysRemaining,
  totalDays,
  percent,
}: {
  daysRemaining: number
  totalDays: number | null
  percent: number
}) => (
  <SummaryCard
    label="До конца периода"
    accentColor={COLOR.PERIOD_TEXT}
    value={
      <Heading size="lg">
        {daysRemaining} {pluralDays(daysRemaining)}
      </Heading>
    }
    change={
      totalDays !== null ? (
        <Text fontSize="xs" color={COLOR.LABEL}>
          {totalDays - daysRemaining} из {totalDays} дней
        </Text>
      ) : undefined
    }
    badge={
      <ProgressCircleUI value={percent} size="md" colorPalette="blue" width="44px" height="44px" />
    }
  />
)

// ---------------------------------------------------------------------------
// Widget
// ---------------------------------------------------------------------------

const DashboardSummaryCards = () => {
  const dispatch = useAppDispatch()
  const { workspaceTotalSpent, workspaceTotalIncome, isSummaryLoading, periodComparison } =
    useSelector((state: RootState) => state.statistics)
  const { daysFromStart } = useSelector((state: RootState) => state.billingPeriod)

  const [totalDays, setTotalDays] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchTotalSummaryThunk())
    dispatch(fetchDaysFromStartThunk())
    dispatch(fetchPeriodComparisonThunk())
    getLatestActivePeriod()
      .then(({ data }) => {
        const start = moment(data.startDate)
        const end = moment(data.endDate)
        setTotalDays(end.diff(start, 'days'))
      })
      .catch(() => {})
  }, [dispatch])

  const periodPercent = useMemo(() => {
    if (!totalDays || totalDays <= 0) return 0
    return Math.min(Math.round((daysFromStart / totalDays) * 100), 100)
  }, [daysFromStart, totalDays])

  const daysRemaining = totalDays !== null ? Math.max(totalDays - daysFromStart, 0) : 0

  const spentChangePercent = useMemo(() => {
    const prev = periodComparison?.previous?.totalSpent
    const curr = periodComparison?.current?.totalSpent
    if (!prev || prev === 0 || curr === undefined) return null
    return ((curr - prev) / prev) * 100
  }, [periodComparison])

  const balance = workspaceTotalIncome - workspaceTotalSpent

  return (
    <HStack width="100%" gap={4} align="stretch">
      <BalanceCard
        balance={balance}
        isLoading={isSummaryLoading}
        changePercent={null}
      />
      <TotalIncomeCard
        value={workspaceTotalIncome}
        isLoading={isSummaryLoading}
        changePercent={null}
      />
      <TotalSpentCard
        value={workspaceTotalSpent}
        isLoading={isSummaryLoading}
        changePercent={spentChangePercent}
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
