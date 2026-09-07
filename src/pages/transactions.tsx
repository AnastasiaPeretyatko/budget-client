import { Heading, HStack, VStack } from '@chakra-ui/react'
import AllTransactionsBlock from '@/widgets/transaction-page/AllTransactionsBlock'

const TransactionsPage = () => {
  return (
    <VStack width="100%" align="start" gap={6}>
      <HStack width="100%" justify="space-between">
        <Heading>Транзакции</Heading>
      </HStack>
      <AllTransactionsBlock />
    </VStack>
  )
}

export default TransactionsPage
