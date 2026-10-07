import { useGetCategoriesQuery } from '@/entities/category/api/categoriesApi'
import SearchInput from '@/shared/ui/search-input'
import useDebounce from '@/shared/hooks/useDebounce'
import { Card, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import CategoriesCreateModal from './CategoriesCreateModal'
import CatigoriesTable from './CatigoriesTable'

const SEARCH_DEBOUNCE_MS = 400

const CategoriesSettingsTab = () => {
  const [search, setSearch] = useState<string>('')

  // в поле показываем search сразу, а на сервер отправляем debouncedSearch — после паузы в наборе
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS)

  // пустой поиск = запрос без аргументов, чтобы использовать общий кэш с остальными местами, где грузятся все категории
  const { data } = useGetCategoriesQuery(debouncedSearch ? { search: debouncedSearch } : undefined)

  return (
    <VStack width={'100%'} align={'start'}>
      <Card.Root width={'100%'} variant={'primary'} flexDir={'row'} gap={4}>
        <SearchInput placeholder='Поиск категории...' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <CategoriesCreateModal/>

      </Card.Root>

      {!!data?.length && <CatigoriesTable data={data}/>}
      {data && !data.length && (
        <Text color={'label'}>{debouncedSearch ? 'Ничего не найдено' : 'Категорий пока нет'}</Text>
      )}
    </VStack>
  )

}

export default CategoriesSettingsTab
