import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { TransactionType } from '../types/transaction.type'
import { COLOR } from '@/shared/config/colors';

type Props = {
  accountId: string;
  transaction: TransactionType
}

const TransactionCard = ({ accountId, transaction }: Props) => {
  const isExpense = useMemo(() => {
    return accountId === transaction.fromAccountId
  }, [accountId, transaction.fromAccountId])

  return (
    <Card.Root width={'100%'} margin={0} padding={0} borderRadius={12} border={'none'}>
      <Card.Body width={'100%'} padding={4}>
        <HStack gap={4}>
          <Box width={16} height={16} borderRadius={'50%'} backgroundColor={'gray.900'}></Box>
          <VStack>
            <Text fontSize={'lg'} fontWeight={800} color={!isExpense ? COLOR.INCOME_TEXT : ''}>
              {!isExpense && '+'} {transaction.amount} ₽
            </Text>
            <Text color={'gray.300'} fontSize={'sm'}>{transaction.category?.name}</Text>
          </VStack>
        </HStack>

      </Card.Body>
    </Card.Root>
  )
}

export default TransactionCard
