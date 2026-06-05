'use client'

import { AppDispatch, RootState } from '@/app/store'
import { fetchTopExpensesThunk } from '@/entities/statistics'
import { COLOR } from '@/shared/config/colors'
import { Box, Card, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DashboardTransactions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { topExpenses, isTopExpensesLoading } = useSelector(
    (state: RootState) => state.statistics
  )

  useEffect(() => {
    dispatch(fetchTopExpensesThunk())
  }, [dispatch])

  return (
    <VStack width="100%" align="start" gap={4}>
      <Heading size="md">Топ-10 покупок</Heading>

      {isTopExpensesLoading ? (
        <Spinner />
      ) : !topExpenses.length ? (
        <Text fontSize="sm" color={COLOR.LABEL}>
          Нет данных о расходах
        </Text>
      ) : (
        <VStack width="100%" gap={2}>
          {topExpenses.map((item, index) => (
            <Card.Root key={item.id} width="100%" borderRadius={12} border="none" p={0} m={0}>
              <Card.Body display="flex" flexDir="row" gap={2} alignItems="center">
                <Box
                  minW={10}
                  minH={10}
                  borderRadius="50%"
                  backgroundColor="gray.900"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight={700}
                  fontSize="sm"
                  color="gray.400"
                >
                  {index + 1}
                </Box>
                <Box
                  minW={10}
                  minH={10}
                  borderRadius="50%"
                  backgroundColor="gray.900"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xl"
                >
                  {item.category?.icon}
                </Box>
                <VStack flex={1} align="start" gap={0}>
                  <Text fontWeight={600}>
                    {item.category?.name ?? 'Без категории'}
                  </Text>
                  {item.description && (
                    <Text fontSize="xs" color={COLOR.LABEL}>
                      {item.description}
                    </Text>
                  )}
                </VStack>
                <VStack align="end" gap={0}>
                  <Text fontWeight={800}>
                    -{item.amount} ₽
                  </Text>
                  <Text fontSize="xs" color={COLOR.LABEL}>
                    {moment(item.date).format('DD MMM YYYY')}
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          ))}
        </VStack>
      )}
    </VStack>
  )
}

export default DashboardTransactions
