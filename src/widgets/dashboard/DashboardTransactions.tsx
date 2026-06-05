'use client'

import { Heading, VStack } from '@chakra-ui/react'
import TransactionList from '../transaction-list/TransactionList'

const DashboardTransactions = () => {
  return (
    <VStack width="100%" align="start" gap={4}>
      <Heading size="md">Последние транзакции</Heading>
      <TransactionList limit={10} />
    </VStack>
  )
}

export default DashboardTransactions
