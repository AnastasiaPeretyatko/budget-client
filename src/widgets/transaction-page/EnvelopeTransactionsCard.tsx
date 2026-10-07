import { Heading, Card, Text, HStack, Spinner } from '@chakra-ui/react'
import FilterType from './FilterType'
import SearchInput from '@/shared/ui/search-input'
import TransactionsTable from './TransactionsTable'
import { useGetTransactionQuery } from '@/entities/transaction/api/transactionApi'
import { BasePagination } from '@/shared/ui/pagination'
import { useState } from 'react'
import { TransactionTypeEnum } from '@/entities/transaction'
import { useSelectedPeriod } from '@/entities/billing-period/api/useSelectedPeriod'
import useDebounce from '@/shared/hooks/useDebounce'

type Props = {
  accountId?: string
}
const LIMIT = 10
const SEARCH_DEBOUNCE_MS = 400

const EnvelopeTransactionsCard = ({ accountId }: Props) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<TransactionTypeEnum | 'all'>('all')
  const [search, setSearch] = useState<string>('')
  const { dateBetween } = useSelectedPeriod()

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

  const { data: transaction, isLoading } = useGetTransactionQuery(
    {
      filter: {
        accountId,
        type: filter === 'all' ? null : filter as TransactionTypeEnum,
        date: dateBetween && { between: dateBetween },
      },
      paging: { offset: (page * LIMIT) - LIMIT },
      search: debouncedSearch
    },
    { skip: !accountId || !dateBetween }
  )

  // при смене фильтра результаты другие — возвращаемся на первую страницу
  const handleFilterChange = (type: TransactionTypeEnum | 'all') => {
    setFilter(type)
    setPage(1)
  }

  return (
    <Card.Root width={'100%'} variant={'primary'} gap={2}>
      <Heading fontSize={'18px'}>История операций по конверту</Heading>
      <Text fontSize={'12px'} color={'text.sidebar'}>Транзакции, списанные из лимита категории Супермаркет и еда</Text>
      <HStack width={'100%'}>
        <SearchInput width={'50%'} placeholder='Поиск...' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <FilterType filter={filter} onChangeFilter={handleFilterChange}/>
      </HStack>
      {
        isLoading ? <Spinner/> : (
          <TransactionsTable transactions={transaction?.rows || []}/>
        )
      }
      {!!transaction?.count &&
        <BasePagination
          // BasePagination помнит страницу у себя — пересоздаём его, когда страница сбрасывается
          key={`${debouncedSearch}|${filter}`}
          count={transaction?.count || 0}
          onChangePage={setPage}
        />
      }
    </Card.Root>
  )
}

export default EnvelopeTransactionsCard
