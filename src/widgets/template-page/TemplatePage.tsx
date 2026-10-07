import { useGetTemplatesQuery } from '@/entities/template/api/templatesApi'
import { Card, Circle, Float, HStack, IconButton, VStack } from '@chakra-ui/react'
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'
import TemplateList from '../template-list/TemplateList'
import { BasePagination } from '@/shared/ui/pagination'
import SearchInput from '@/shared/ui/search-input'
import FilterType from '../transaction-page/FilterType'
import { TransactionTypeEnum } from '@/entities/transaction'
import TransactionCategoriesBox from '@/features/transaction-management/ui/TransactionCategoriesBox'
import TransactionTagsBox from '@/features/transaction-management/ui/TransactionTagsBox'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { Funnel } from 'lucide-react'

const LIMIT = 10

const TemplatePage = () => {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [filterType, setFilterType] = useState<TransactionTypeEnum | 'all'>('all')

  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const [tagIds, setTagIds] = useState<string[]>([])
  const [isOpenFilter, setOpenFilter] = useBoolean()

  const { data } = useGetTemplatesQuery({
    search,
    page,
    type: filterType === 'all' ? undefined : filterType,
    categoryIds: categoryIds.length ? categoryIds : undefined,
    tagIds: tagIds.length ? tagIds : undefined,
  })

  // при смене поиска или фильтра результаты другие — возвращаемся на первую страницу
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleTypeChange = (type: TransactionTypeEnum | 'all') => {
    setFilterType(type)
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

  const countPages = useMemo(() => {
    return Math.ceil((data?.count ?? 0)/LIMIT)
  }, [data?.count])

  return (
    <VStack width={'100%'} gap={4}>
      <Card.Root variant={'primary'} width={'100%'} gap={4} divideY={'1px'}>
        <HStack width={'100%'} gap={2}>
          <SearchInput width={'50%'} placeholder='Поиск шаблонов...' value={search} onChange={handleSearchChange}/>
          <FilterType filter={filterType} onChangeFilter={handleTypeChange}/>
          <IconButton variant={'secondary'} onClick={setOpenFilter.toggle} position={'relative'}>
            <Funnel/>
            {(!!categoryIds.length || !!tagIds.length) && <Float><Circle w={2} h={2} bg={'red'}/></Float>}
          </IconButton>
        </HStack>
        {isOpenFilter && (
          <>
            <TransactionCategoriesBox categoryIds={categoryIds} setCategoryIds={handleCategoryIds}/>
            <TransactionTagsBox tagIds={tagIds} setTagIds={handleTagIds}/>
          </>
        )}
      </Card.Root>
      {data?.data && <TemplateList templates={data.data}/>}
      {countPages > 1 &&
        <BasePagination
          // BasePagination помнит страницу у себя — пересоздаём его, когда страница сбрасывается
          key={`${search}|${filterType}|${categoryIds}|${tagIds}`}
          count={countPages}
          onChangePage={setPage}
        />
      }
    </VStack>
  )
}

export default TemplatePage
