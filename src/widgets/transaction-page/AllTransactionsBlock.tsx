import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'
import { fetchTransactionsThunk } from '@/entities/transaction'
import { fetchTagsThunk } from '@/entities/tag'
import { fetchBillingPeriodsThunk } from '@/entities/bulling-period'
import CheckboxDropdown, { CheckboxDropdownValue } from '@/shared/ui/checkbox-dropdown'
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import PeriodFilter from './PeriodFilter'
import TransactionsTable from './TransactionsTable'
import { buildTagFilter } from '../transaction-list/TransactionList'
import RadioMenu from '@/shared/ui/radio-menu'

const typeFilters = [
  { label: 'Все', value: 'All' },
  { label: 'Расходы', value: TransactionTypeEnum.EXPENSE },
  { label: 'Доходы', value: TransactionTypeEnum.INCOME },
  { label: 'Переводы', value: TransactionTypeEnum.TRANSFER },
]

const AllTransactionsBlock = () => {
  const dispatch = useAppDispatch()
  const { tags } = useSelector((state: RootState) => state.tags)
  const { billingPeriods } = useSelector((state: RootState) => state.billingPeriod)
  const { transactions, isLoading } = useSelector((state: RootState) => state.transactions)

  const [activeType, setActiveType] = useState<string>('All')
  const [tagFilter, setTagFilter] = useState<CheckboxDropdownValue>({})
  const [periodId, setPeriodId] = useState<string | undefined>(undefined)

  useEffect(() => {
    dispatch(fetchTagsThunk(undefined))
    dispatch(fetchBillingPeriodsThunk())
  }, [dispatch])

  const handleTypeChange = (value: string) => {
    setActiveType(prev => prev === value ? 'All' : value)
  }

  const tagItems = tags.map(t => ({ label: t.name, value: t.id, color: t.color }))

  const dateBetween = useMemo(() => {
    const period = billingPeriods.find(p => p.id === periodId)
    return period ? [period.startDate, period.endDate] : undefined
  }, [billingPeriods, periodId])

  const tagFilterKey = JSON.stringify(tagFilter)
  const dateBetweenKey = JSON.stringify(dateBetween)

  useEffect(() => {
    const tag = buildTagFilter(tagFilter)
    dispatch(fetchTransactionsThunk({
      filter: {
        ...(activeType !== 'All' ? { type: activeType } : {}),
        ...(tag ? { tag } : {}),
        ...(dateBetween && dateBetween.length === 2 ? { date: { between: dateBetween } } : {}),
      },
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activeType, tagFilterKey, dateBetweenKey])

  return (
    <VStack width="100%" align="start" gap={4}>

      <HStack gap={2} flexWrap="wrap">
        <RadioMenu
          items={typeFilters}
          onChange={handleTypeChange}
          triggerButton={<Button size={'xs'}>Фильтр{activeType && <Text>| {typeFilters.find(el => el.value === activeType)?.label}</Text>}</Button>}
          value={activeType}
        />
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
          onChange={setPeriodId}
        />
      </HStack>
      <Box width="100%" flex={1} minH={0}>
        <TransactionsTable transactions={transactions} loading={isLoading} />
      </Box>
    </VStack>
  )
}

export default AllTransactionsBlock
