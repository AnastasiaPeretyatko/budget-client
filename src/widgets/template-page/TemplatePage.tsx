import { useGetTemplatesQuery } from '@/entities/template/api/templatesApi'
import { Card, Circle, Float, HStack, IconButton, VStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import TemplateList from '../template-list/TemplateList'
import { BasePagination } from '@/shared/ui/pagination'
import SearchInput from '@/shared/ui/search-input'
import FilterType from '../transaction-page/FilterType'
import { TransactionTypeEnum } from '@/entities/transaction'
import TransactionCategoriesBox from '@/features/transaction-management/ui/TransactionCategoriesBox'
import TransactionTagsBox from '@/features/transaction-management/ui/TransactionTagsBox'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { Funnel } from 'lucide-react'
import useDebounce from '@/shared/hooks/useDebounce'

const LIMIT = 10
const SEARCH_DEBOUNCE_MS = 400

const TemplatePage = () => {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [filterType, setFilterType] = useState<TransactionTypeEnum | 'all'>('all')

  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const [tagIds, setTagIds] = useState<string[]>([])
  const [isOpenFilter, setOpenFilter] = useBoolean()

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

  const { data } = useGetTemplatesQuery({
    search: debouncedSearch,
    page,
    type: filterType === 'all' ? undefined : filterType,
    categoryIds: categoryIds.length ? categoryIds : undefined,
    tagIds: tagIds.length ? tagIds : undefined,
  })

  // при смене фильтра результаты другие — возвращаемся на первую страницу
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

  // count с сервера — общее число шаблонов, число страниц BasePagination считает сам
  const total = data?.count ?? 0

  return (
    <VStack width={'100%'} gap={4}>
      <Card.Root variant={'primary'} width={'100%'} gap={4} divideY={'1px'}>
        <HStack width={'100%'} gap={2}>
          <SearchInput width={'50%'} placeholder='Поиск шаблонов...' value={search} onChange={(e) => setSearch(e.target.value)}/>
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
      {total > LIMIT &&
        <BasePagination
          // BasePagination помнит страницу у себя — пересоздаём его, когда страница сбрасывается
          key={`${debouncedSearch}|${filterType}|${categoryIds}|${tagIds}`}
          count={total}
          onChangePage={setPage}
        />
      }
    </VStack>
  )
}

export default TemplatePage
