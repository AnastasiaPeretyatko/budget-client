import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'
import { Card, Circle, Float, HStack, IconButton, VStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import SearchInput from '@/shared/ui/search-input'
import FilterType from './FilterType'
import TransactionsTable from './TransactionsTable'
import { useGetTransactionQuery } from '@/entities/transaction/api/transactionApi'
import { useSelectedPeriod } from '@/entities/billing-period/api/useSelectedPeriod'
import { BasePagination } from '@/shared/ui/pagination'
import TransactionCategoriesBox from '@/features/transaction-management/ui/TransactionCategoriesBox'
import TransactionTagsBox from '@/features/transaction-management/ui/TransactionTagsBox'
import { Funnel } from 'lucide-react'
import { useBoolean } from '@/shared/hooks/useBoolean'
import useDebounce from '@/shared/hooks/useDebounce'

const LIMIT = 10
const SEARCH_DEBOUNCE_MS = 400

const AllTransactionsBlock = () => {
  const [filter, setFilter] = useState<TransactionTypeEnum | 'all'>('all')
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(1)
  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const [tagIds, setTagIds] = useState<string[]>([])

  const [isOpenFilter, setOpenFilter] = useBoolean()

  const { selectedPeriodId } = useSelectedPeriod()

  // в поле показываем search сразу, а на сервер отправляем debouncedSearch — после паузы в наборе
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS)

  // Страницу сбрасываем не при наборе, а когда новый поиск реально применился: тогда запрос сразу идёт
  // за первой страницей. setState прямо во время рендера — штатный приём React: он перерисует компонент
  // до отправки запроса, поэтому запроса со старой страницей не будет.
  const [appliedSearch, setAppliedSearch] = useState(debouncedSearch)
  if (appliedSearch !== debouncedSearch) {
    setAppliedSearch(debouncedSearch)
    setPage(1)
  }

  const { data, isLoading } = useGetTransactionQuery({
    filter: { periodId: selectedPeriodId!, type: filter === 'all' ? null : filter as TransactionTypeEnum, categoryIds, tag: { in: tagIds } },
    paging: { offset: (page * LIMIT) - LIMIT },
    search: debouncedSearch,
  },)

  // при смене фильтра результаты другие — возвращаемся на первую страницу
  const handleFilterChange = (type: TransactionTypeEnum | 'all') => {
    setFilter(type)
    setPage(1)
  }

  // Боксы категорий и тегов ждут обычный setState, поэтому оборачиваем его:
  // после каждого изменения выбора возвращаемся на первую страницу
  const handleCategoryIds: Dispatch<SetStateAction<string[]>> = (value) => {
    setCategoryIds(value)
    setPage(1)
  }

  const handleTagIds: Dispatch<SetStateAction<string[]>> = (value) => {
    setTagIds(value)
    setPage(1)
  }

  return (
    <VStack width="100%" align="start" gap={4}>
      <Card.Root variant={'primary'} width={'100%'} gap={4} divideY={'1px'}>
        <HStack width={'100%'}>
          <SearchInput width={'50%'} placeholder='Поиск...' value={search} onChange={(e) => setSearch(e.target.value)}/>
          <FilterType filter={filter} onChangeFilter={handleFilterChange}/>
          <IconButton variant={'secondary'} onClick={setOpenFilter.toggle} position={'relative'}>
            <Funnel/>
            {(!!categoryIds.length || !!tagIds.length) && <Float><Circle w={2} h={2} bg={'red'}/></Float>}
          </IconButton>
        </HStack>
        {
          isOpenFilter && (
            <>
              <TransactionCategoriesBox
                categoryIds={categoryIds}
                setCategoryIds={handleCategoryIds}
              />
              <TransactionTagsBox tagIds={tagIds} setTagIds={handleTagIds}/>
            </>
          )
        }
      </Card.Root>
      {
        !!data && (
          <Card.Root variant={'primary'} width={'100%'}>
            <TransactionsTable transactions={data?.rows} loading={isLoading} />
            {!!data?.count && (
              <BasePagination
                // BasePagination помнит страницу у себя — пересоздаём его, когда страница сбрасывается
                key={`${debouncedSearch}|${filter}|${categoryIds}|${tagIds}`}
                count={data?.count}
                onChangePage={setPage}
              />
            )}
          </Card.Root>
        )
      }

      {/* <HStack gap={2} flexWrap="wrap">
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
      </Box> */}
    </VStack>
  )
}

export default AllTransactionsBlock
