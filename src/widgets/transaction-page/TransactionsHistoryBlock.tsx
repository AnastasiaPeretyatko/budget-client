import AddTransactionModal from '@/features/transaction-management/ui/AddTransactionModal'
import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'
import { Box, Button, Heading, HStack, VStack } from '@chakra-ui/react'
import TransactionList from '../transaction-list/TransactionList'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const typeFilters = [
  { label: 'Все', value: undefined },
  { label: 'Расходы', value: TransactionTypeEnum.EXPENSE },
  { label: 'Доходы', value: TransactionTypeEnum.INCOME },
  { label: 'Переводы', value: TransactionTypeEnum.TRANSFER },
] as const

const TransactionsHistoryBlock = () => {
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)
  const [activeType, setActiveType] = useState<TransactionTypeEnum | undefined>(undefined)

  return (
    <VStack width={'100%'} align={'start'} gap={4} height="calc(100vh - 200px)">
      <HStack width={'100%'} justify={'space-between'} flexShrink={0}>
        <Heading size={'md'}>Transactions</Heading>
        <AddTransactionModal/>
      </HStack>
      <HStack gap={1} flexShrink={0}>
        {typeFilters.map((f) => (
          <Button
            key={f.label}
            size="xs"
            variant={activeType === f.value ? 'solid' : 'ghost'}
            colorPalette={activeType === f.value ? 'blue' : 'gray'}
            borderRadius="full"
            fontSize="xs"
            onClick={() => setActiveType(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </HStack>
      <Box width="100%" flex={1} overflowY="auto" minH={0}>
        <TransactionList accountId={activeSavingAccount!.id} type={activeType}/>
      </Box>
    </VStack>
  )
}

export default TransactionsHistoryBlock
