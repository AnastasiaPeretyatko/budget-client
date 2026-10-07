import { useGetCategoriesQuery } from '@/entities/category/api/categoriesApi'
import SearchInput from '@/shared/ui/search-input'
import { Card, VStack } from '@chakra-ui/react'
import React from 'react'
import CategoriesCreateModal from './CategoriesCreateModal'
import CatigoriesTable from './CatigoriesTable'

const CategoriesSettingsTab = () => {
  const { data } = useGetCategoriesQuery()

  return (
    <VStack width={'100%'} align={'start'}>
      <Card.Root width={'100%'} variant={'primary'} flexDir={'row'} gap={4}>
        <SearchInput placeholder='Поиск категории...'/>
        <CategoriesCreateModal/>

      </Card.Root>

      {!!data?.length && <CatigoriesTable data={data}/>}
    </VStack>
  )

}

export default CategoriesSettingsTab
