import AddTransactionModal from '@/features/transaction-management/ui/AddTransactionModal'
import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'
import { fetchTagsThunk } from '@/entities/tag'
import CheckboxDropdown, { CheckboxDropdownValue } from '@/shared/ui/checkbox-dropdown'
import { Box, Button, Heading, HStack, VStack } from '@chakra-ui/react'
import TransactionList from '../transaction-list/TransactionList'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'

const typeFilters = [
  { label: 'Все', value: undefined },
  { label: 'Расходы', value: TransactionTypeEnum.EXPENSE },
  { label: 'Доходы', value: TransactionTypeEnum.INCOME },
  { label: 'Переводы', value: TransactionTypeEnum.TRANSFER },
] as const

const TransactionsHistoryBlock = () => {
  const dispatch = useAppDispatch()
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)
  const { tags } = useSelector((state: RootState) => state.tags)
  const [activeType, setActiveType] = useState<TransactionTypeEnum | undefined>(undefined)
  const [tagFilter, setTagFilter] = useState<CheckboxDropdownValue>({})

  useEffect(() => {
    dispatch(fetchTagsThunk(undefined))
  }, [dispatch])

  const handleTypeChange = (value: TransactionTypeEnum | undefined) => {
    setActiveType(prev => prev === value ? undefined : value)
  }

  const tagItems = tags.map(t => ({ label: t.name, value: t.id, color: t.color }))

  return (
    <VStack width={'100%'} align={'start'} gap={4} height="calc(100vh - 200px)">
      <HStack width={'100%'} justify={'space-between'} flexShrink={0}>
        <Heading size={'md'}>Transactions</Heading>
        <AddTransactionModal/>
      </HStack>
      <HStack gap={2} flexShrink={0} flexWrap="wrap">
        {typeFilters.map((f) => (
          <Button
            key={f.label}
            size="xs"
            variant={activeType === f.value ? 'solid' : 'ghost'}
            colorPalette={activeType === f.value ? 'blue' : 'gray'}
            borderRadius="full"
            fontSize="xs"
            onClick={() => handleTypeChange(f.value)}
          >
            {f.label}
          </Button>
        ))}
        <CheckboxDropdown
          label="Теги"
          items={tagItems}
          value={tagFilter}
          onChange={setTagFilter}
          allLabel="Все теги"
        />
      </HStack>
      <Box width="100%" flex={1} overflowY="auto" minH={0}>
        <TransactionList accountId={activeSavingAccount!.id} type={activeType} tagFilter={tagFilter} />
      </Box>
    </VStack>
  )
}

export default TransactionsHistoryBlock
