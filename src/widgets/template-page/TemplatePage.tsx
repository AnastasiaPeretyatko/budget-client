import { useGetTemplatesQuery } from '@/entities/template/api/templatesApi'
import { HStack, VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import TemplateList from '../template-list/TemplateList'
import { BasePagination } from '@/shared/ui/pagination'
import SearchInput from '@/shared/ui/search-input'
import FilterTransactionType from '@/shared/ui/filter-transaction-type'
import { TransactionTypeEnum } from '@/entities/transaction'

const LIMIT = 10

const TemplatePage = () => {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [filterType, setFilterType] = useState<TransactionTypeEnum | null>(null)

  const { data } = useGetTemplatesQuery({ search, page, type: filterType! })

  const countPages = useMemo(() => {
    return Math.ceil((data?.count ?? 0)/LIMIT)
  }, [data?.count])

  return (
    <VStack width={'100%'} gap={4}>
      <HStack width={'100%'} gap={10}>
        <SearchInput placeholder='Поиск шаблонов...' onChange={val => setSearch(val)}/>

        <FilterTransactionType onChangeType={setFilterType}/>
      </HStack>
      {data?.data && <TemplateList templates={data.data}/>}
      {countPages > 1 &&
        <BasePagination
          count={countPages}
          onChangePage={setPage}
        />
      }
    </VStack>
  )
}

export default TemplatePage
