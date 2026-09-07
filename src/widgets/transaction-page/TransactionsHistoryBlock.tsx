import AddTransactionModal from '@/features/transaction-management/ui/AddTransactionModal'
import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'
import { fetchTagsThunk } from '@/entities/tag'
import { fetchBillingPeriodsThunk } from '@/entities/bulling-period'
import CheckboxDropdown, { CheckboxDropdownValue } from '@/shared/ui/checkbox-dropdown'
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import TransactionList from '../transaction-list/TransactionList'
import PeriodFilter from './PeriodFilter'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import RadioMenu from '@/shared/ui/radio-menu'

const typeFilters: { label: string; value: TransactionTypeEnum | 'All' }[] = [
  { label: 'Все', value: 'All' },
  { label: 'Расходы', value: TransactionTypeEnum.EXPENSE },
  { label: 'Доходы', value: TransactionTypeEnum.INCOME },
  { label: 'Переводы', value: TransactionTypeEnum.TRANSFER },
]

const TransactionsHistoryBlock = () => {
  const dispatch = useAppDispatch()
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)
  const { tags } = useSelector((state: RootState) => state.tags)
  const { billingPeriods } = useSelector((state: RootState) => state.billingPeriod)
  const [activeType, setActiveType] = useState<TransactionTypeEnum | 'All'>('All')
  const [tagFilter, setTagFilter] = useState<CheckboxDropdownValue>({})
  // undefined = не трогали (по умолчанию активный период), null = явно выбраны все периоды
  const [userPeriodId, setUserPeriodId] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    dispatch(fetchTagsThunk(undefined))
    dispatch(fetchBillingPeriodsThunk())
  }, [dispatch])

  const activePeriodId = useMemo(
    () => billingPeriods.find(p => p.status === 'active')?.id,
    [billingPeriods]
  )

  const periodId = userPeriodId === undefined ? activePeriodId : (userPeriodId ?? undefined)

  const handleTypeChange = (value: TransactionTypeEnum | 'All') => {
    setActiveType(prev => prev === value ? 'All' : value)
  }

  const tagItems = tags.map(t => ({ label: t.name, value: t.id, color: t.color }))

  const dateBetween = useMemo(() => {
    const period = billingPeriods.find(p => p.id === periodId)
    return period ? [period.startDate, period.endDate] : undefined
  }, [billingPeriods, periodId])

  return (
    <VStack width={'100%'} align={'start'} gap={4} height="calc(100vh - 200px)">
      <HStack width={'100%'} justify={'space-between'} flexShrink={0}>
        <HStack maxW={'100%'} gap={2} flexShrink={0} flexWrap="wrap">
          <RadioMenu
            items={typeFilters}
            onChange={handleTypeChange}
            triggerButton={<Button size={'xs'}>Фильтр{activeType && <Text>| {typeFilters.find(el => el.value === activeType)?.label}</Text>}</Button>}
            value={activeType}
          />
          {/* <CheckboxDropdown label='Тип транзакции' items={typeFilters} value={activeType} allLabel='Все' onChange={handleTypeChange}/> */}
          <CheckboxDropdown
            label="Теги"
            items={tagItems}
            value={tagFilter}
            onChange={setTagFilter}
            allLabel="Все теги"
          />
          <PeriodFilter
            periods={billingPeriods}
            value={periodId}
            onChange={(id) => setUserPeriodId(id ?? null)}
          />
        </HStack>
        {/* <Heading size={'md'}>Transactions</Heading> */}
        <AddTransactionModal/>
      </HStack>

      <Box width="100%" flex={1} overflowY="auto" minH={0}>
        <TransactionList
          accountId={activeSavingAccount!.id}
          type={activeType === 'All' ? undefined : activeType}
          tagFilter={tagFilter}
          dateBetween={dateBetween}
        />
      </Box>
    </VStack>
  )
}

export default TransactionsHistoryBlock
