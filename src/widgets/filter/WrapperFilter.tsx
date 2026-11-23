import { useGetCategoriesQuery } from '@/entities/category/api/categoriesApi'
import { CheckboxUI, Label } from '@/shared/ui'
import BasePopover from '@/shared/ui/popover'
import SearchInput from '@/shared/ui/search-input'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const WrapperFilter = () => {
  return (
    <HStack w={'100%'} p={4} borderRadius={10} bg={'bg.body'} boxShadow={'md'}>
      <SearchInput/>
      <CategoryFilter/>
    </HStack>
  )
}

const CategoryFilter = () => {
  const { data } = useGetCategoriesQuery()
  const [selected, setSelected] = useState<string[]>([])

  return (
    <BasePopover TriggerButton={<Button>Категории <ChevronDown/></Button>}>
      <Label mb={2}>Фильтр по категориям</Label>
      <VStack width={'100%'} align={'start'}>
        {data?.map(c => (
          <CheckboxUI key={c.id} label={c.name} checked={selected.includes(c.id)} onChange={() => }/>
          ))}
      </VStack>
    </BasePopover>
  )
}

export default WrapperFilter
