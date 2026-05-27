import AddTransactionModal from '@/features/transaction-management/ui/AddTransactionModal'
import { Heading, HStack, VStack } from '@chakra-ui/react'
import TransactionList from '../transaction-list/TransactionList'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const TransactionsHistoryBlock = () => {
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)

  return (
    <VStack width={'100%'} align={'start'} gap={4}>
      <HStack width={'100%'} justify={'space-between'}>
        <Heading size={'md'} color={'gray.400'}>Transactions</Heading>
        <AddTransactionModal/>
      </HStack>
      <TransactionList accountId={activeSavingAccount!.id}/>
    </VStack>
  )
}

export default TransactionsHistoryBlock
