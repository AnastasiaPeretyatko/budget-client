'use client'

import { COLOR } from '@/shared/config/colors'
import { Card, Heading, HStack, Text } from '@chakra-ui/react'

// TODO: заменить на реальные данные с бэка
const useDashboardSummary = () => {
  return {
    totalBalance: 0,
    totalSpent: 0,
    isLoading: false,
  }
}

const formatAmount = (value: number) =>
  value.toLocaleString('ru-RU', { minimumFractionDigits: 2 })

const DashboardSummaryCards = () => {
  const { totalBalance, totalSpent } = useDashboardSummary()

  return (
    <HStack width="100%" gap={4}>
      <Card.Root width="100%">
        <Card.Body display="flex" flexDir="column" gap={2}>
          <Text color={COLOR.LABEL} fontWeight={500} fontSize="sm">
            Total Balance
          </Text>
          <Heading size="lg">{formatAmount(totalBalance)} ₽</Heading>
        </Card.Body>
      </Card.Root>

      <Card.Root width="100%">
        <Card.Body display="flex" flexDir="column" gap={2}>
          <Text color={COLOR.LABEL} fontWeight={500} fontSize="sm">
            Spent This Period
          </Text>
          <Heading size="lg">{formatAmount(totalSpent)} ₽</Heading>
        </Card.Body>
      </Card.Root>
    </HStack>
  )
}

export default DashboardSummaryCards
