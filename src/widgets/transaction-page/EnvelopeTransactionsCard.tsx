import { Heading, Card, Text, HStack, Spinner } from '@chakra-ui/react'
import FilterType from './FilterType'
import SearchInput from '@/shared/ui/search-input'
import TransactionsTable from './TransactionsTable'
import { useGetTransactionQuery } from '@/entities/transaction/api/transactionApi'
import { BasePagination } from '@/shared/ui/pagination'
import { useState } from 'react'
import { TransactionTypeEnum } from '@/entities/transaction'
import { useSelectedPeriod } from '@/entities/bulling-period/api/useSelectedPeriod'

type Props = {
  accountId?: string
}
const LIMIT = 10

const EnvelopeTransactionsCard = ({ accountId }: Props) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<TransactionTypeEnum | 'all'>('all')
  const [search, setSearch] = useState<string>('')
  const { dateBetween } = useSelectedPeriod()

  const { data: transaction, isLoading } = useGetTransactionQuery(
    {
      filter: {
        accountId,
        type: filter === 'all' ? null : filter as TransactionTypeEnum,
        date: dateBetween && { between: dateBetween },
      },
      paging: { offset: (page * LIMIT) - LIMIT },
      search
    },
    { skip: !accountId || !dateBetween }
  )

  return (
    <Card.Root width={'100%'} variant={'primary'} gap={2}>
      <Heading fontSize={'18px'}>История операций по конверту</Heading>
      <Text fontSize={'12px'} color={'text.sidebar'}>Транзакции, списанные из лимита категории Супермаркет и еда</Text>
      <HStack width={'100%'}>
        <SearchInput width={'50%'} placeholder='Поиск...' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <FilterType filter={filter} onChangeFilter={setFilter}/>
      </HStack>
      {
        isLoading ? <Spinner/> : (
          <TransactionsTable transactions={transaction?.rows || []}/>
        )
      }
      {!!transaction?.count &&
        <BasePagination count={transaction?.count || 0} onChangePage={setPage}/>
      }
    </Card.Root>
  )
}

export default EnvelopeTransactionsCard
