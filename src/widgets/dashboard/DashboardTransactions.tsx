'use client'

import { AppDispatch, RootState } from '@/app/store'
import { fetchTopExpensesThunk } from '@/entities/statistics'
import { fetchTransactionsThunk, TransactionType } from '@/entities/transaction'
import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'
import { COLOR } from '@/shared/config/colors'
import { Box, Card, Grid, Heading, HStack, Link, Spinner, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import NextLink from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuArrowDown, LuArrowUp, LuArrowLeftRight } from 'react-icons/lu'

const TOP_LIMIT = 5
const RECENT_LIMIT = 5

const TransactionTypeIcon = ({ transaction }: { transaction: TransactionType }) => {
  if (transaction.type === TransactionTypeEnum.INCOME) {
    return (
      <Box
        minW={10} minH={10} borderRadius="50%"
        backgroundColor="green.900"
        display="flex" alignItems="center" justifyContent="center"
      >
        <LuArrowDown color={COLOR.INCOME_TEXT} />
      </Box>
    )
  }
  if (transaction.type === TransactionTypeEnum.TRANSFER) {
    return (
      <Box
        minW={10} minH={10} borderRadius="50%"
        backgroundColor="purple.900"
        display="flex" alignItems="center" justifyContent="center"
      >
        <LuArrowLeftRight color={COLOR.PRIMARY_COLOR} />
      </Box>
    )
  }
  return (
    <Box
      minW={10} minH={10} borderRadius="50%"
      backgroundColor="orange.900"
      display="flex" alignItems="center" justifyContent="center"
    >
      <LuArrowUp color={COLOR.EXPENSE_TEXT} />
    </Box>
  )
}

const getTransactionLabel = (transaction: TransactionType) => {
  if (transaction.type === TransactionTypeEnum.TRANSFER) {
    return `${transaction.fromAccount?.name ?? 'Наличные'} → ${transaction.toAccount?.name ?? 'Наличные'}`
  }
  return transaction.fromAccount?.name ?? transaction.toAccount?.name ?? 'Наличные'
}

const getTransactionAmount = (transaction: TransactionType) => {
  if (transaction.type === TransactionTypeEnum.INCOME) {
    return { prefix: '+', color: COLOR.INCOME_TEXT }
  }
  if (transaction.type === TransactionTypeEnum.TRANSFER) {
    return { prefix: '-', color: COLOR.PRIMARY_COLOR }
  }
  return { prefix: '-', color: COLOR.DANGER_TEXT }
}

const DashboardTransactions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { topExpenses, isTopExpensesLoading } = useSelector((state: RootState) => state.statistics)
  const { transactions, isLoading: isTransactionsLoading } = useSelector((state: RootState) => state.transactions)

  useEffect(() => {
    dispatch(fetchTopExpensesThunk())
    dispatch(fetchTransactionsThunk({ paging: { limit: RECENT_LIMIT, offset: 0 } }))
  }, [dispatch])

  const topFive = topExpenses.slice(0, TOP_LIMIT)
  const recentFive = transactions.slice(0, RECENT_LIMIT)

  return (
    <Grid width="100%" templateColumns="1fr 1fr" gap={4}>
      {/* Left column: Top-5 purchases */}
      <Card.Root borderRadius={16} border="none">
        <Card.Body p={5} gap={4} display="flex" flexDir="column">
          <HStack justify="space-between">
            <Heading size="md">Топ-5 покупок</Heading>
            <Link as={NextLink} href="/budgets" fontSize="sm" color={COLOR.PRIMARY_COLOR}>
              Все покупки &rsaquo;
            </Link>
          </HStack>

          {isTopExpensesLoading ? (
            <Spinner />
          ) : !topFive.length ? (
            <Text fontSize="sm" color={COLOR.LABEL}>Нет данных о расходах</Text>
          ) : (
            <VStack gap={3}>
              {topFive.map((item, index) => (
                <HStack key={item.id} width="100%" gap={3}>
                  <Box
                    minW={8} minH={8} borderRadius="50%"
                    backgroundColor="gray.800"
                    display="flex" alignItems="center" justifyContent="center"
                    fontWeight={700} fontSize="sm" color="gray.400"
                  >
                    {index + 1}
                  </Box>
                  <Box
                    minW={10} minH={10} borderRadius="50%"
                    backgroundColor="gray.800"
                    display="flex" alignItems="center" justifyContent="center"
                    fontSize="xl"
                  >
                    {item.category?.icon}
                  </Box>
                  <VStack flex={1} align="start" gap={0}>
                    <Text fontWeight={600} fontSize="sm">
                      {item.category?.name ?? 'Без категории'}
                    </Text>
                    <Text fontSize="xs" color={COLOR.LABEL}>
                      {moment(item.date).format('DD MMM YYYY')}
                    </Text>
                  </VStack>
                  <Text fontWeight={700} fontSize="sm" color={COLOR.DANGER_TEXT}>
                    -{item.amount} ₽
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
        </Card.Body>
      </Card.Root>

      {/* Right column: Recent transactions */}
      <Card.Root borderRadius={16} border="none">
        <Card.Body p={5} gap={4} display="flex" flexDir="column">
          <HStack justify="space-between">
            <Heading size="md">Последние операции</Heading>
            <Link as={NextLink} href="/budgets" fontSize="sm" color={COLOR.PRIMARY_COLOR}>
              Все операции &rsaquo;
            </Link>
          </HStack>

          {isTransactionsLoading ? (
            <Spinner />
          ) : !recentFive.length ? (
            <Text fontSize="sm" color={COLOR.LABEL}>Нет операций</Text>
          ) : (
            <VStack gap={3}>
              {recentFive.map((transaction) => {
                const { prefix, color } = getTransactionAmount(transaction)
                return (
                  <HStack key={transaction.id} width="100%" gap={3}>
                    <TransactionTypeIcon transaction={transaction} />
                    <VStack flex={1} align="start" gap={0}>
                      <Text fontWeight={600} fontSize="sm">
                        {transaction.category?.name ?? getTransactionLabel(transaction)}
                      </Text>
                      <Text fontSize="xs" color={COLOR.LABEL}>
                        {getTransactionLabel(transaction)}
                      </Text>
                    </VStack>
                    <VStack align="end" gap={0}>
                      <Text fontWeight={700} fontSize="sm" color={color}>
                        {prefix}{transaction.amount} ₽
                      </Text>
                      <Text fontSize="xs" color={COLOR.LABEL}>
                        {moment(transaction.date).format('DD MMM YYYY')}
                      </Text>
                    </VStack>
                  </HStack>
                )
              })}
            </VStack>
          )}
        </Card.Body>
      </Card.Root>
    </Grid>
  )
}

export default DashboardTransactions
