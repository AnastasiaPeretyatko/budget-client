'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchTotalSummaryThunk } from '@/entities/statistics'
import { fetchDaysFromStartThunk } from '@/entities/bulling-period'
import { getLatestActivePeriod } from '@/entities/bulling-period/api/bulling-period.service'
import { COLOR } from '@/shared/config/colors'
import { Box, Card, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'

const formatAmount = (value: number) =>
  value.toLocaleString('ru-RU', { minimumFractionDigits: 2 })

const DashboardSummaryCards = () => {
  const dispatch = useAppDispatch()
  const { workspaceTotalSpent, workspaceTotalIncome, isSummaryLoading } = useSelector(
    (state: RootState) => state.statistics
  )
  const { daysFromStart } = useSelector(
    (state: RootState) => state.billingPeriod
  )

  const [totalDays, setTotalDays] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchTotalSummaryThunk())
    dispatch(fetchDaysFromStartThunk())
    getLatestActivePeriod()
      .then(({ data }) => {
        const start = moment(data.startDate)
        const end = moment(data.endDate)
        setTotalDays(end.diff(start, 'days'))
      })
      .catch(() => {})
  }, [dispatch])

  const percent = useMemo(() => {
    if (!totalDays || totalDays <= 0) return 0
    return Math.min(Math.round((daysFromStart / totalDays) * 100), 100)
  }, [daysFromStart, totalDays])

  return (
    <HStack width="100%" gap={4} align="stretch">
      <Card.Root flex={1} p={0}>
        <Card.Body display="flex" flexDir="column" gap={2} justifyContent="center" padding={2}>
          <Text color={COLOR.LABEL} fontWeight={500} fontSize="sm">
            Общие расходы
          </Text>
          {isSummaryLoading ? (
            <Spinner size="sm" />
          ) : (
            <Heading size="lg">{formatAmount(workspaceTotalSpent)} ₽</Heading>
          )}
        </Card.Body>
      </Card.Root>

      <Card.Root flex={1}>
        <Card.Body display="flex" flexDir="column" gap={2} justifyContent="center">
          <Text color={COLOR.LABEL} fontWeight={500} fontSize="sm">
            Общий доход
          </Text>
          {isSummaryLoading ? (
            <Spinner size="sm" />
          ) : (
            <Heading size="lg" color={COLOR.INCOME_TEXT}>{formatAmount(workspaceTotalIncome)} ₽</Heading>
          )}
        </Card.Body>
      </Card.Root>

      <Card.Root flex={1}>
        <Card.Body display="flex" flexDir="column" gap={2} justifyContent="center">
          <Text color={COLOR.LABEL} fontWeight={500} fontSize="sm">
            Дней с начала периода
          </Text>
          <VStack width="100%" align="start" gap={1}>
            <HStack width="100%" justify="space-between">
              <Text fontWeight={700} fontSize="lg">
                {daysFromStart}
              </Text>
              {totalDays !== null && (
                <Text fontSize="xs" color={COLOR.LABEL}>
                  из {totalDays}
                </Text>
              )}
            </HStack>
            <Box width="100%" height="8px" borderRadius="full" bg="gray.800" overflow="hidden">
              <Box
                height="100%"
                width={`${percent}%`}
                borderRadius="full"
                bg="blue.500"
                transition="width 0.4s ease"
              />
            </Box>
          </VStack>
        </Card.Body>
      </Card.Root>
    </HStack>
  )
}

export default DashboardSummaryCards
