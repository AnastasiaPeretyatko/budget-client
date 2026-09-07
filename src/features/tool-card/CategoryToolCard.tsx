import { useAppDispatch, useAppSelector } from '@/app/store'
import { COLOR } from '@/shared/config/colors'
import { Button, Card, Flex, HStack, Input, Link, Spinner, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import CategoryCard from '../category-management/ui/CategoryCard'
import { fetchCategoriesThunk } from '@/entities/category'
import CreateCategoryRow from '../category-management/ui/CreateCategoryRow'

const CategoryToolCard = () => {
  const dispatch = useAppDispatch()

  const { categories, isLoading } = useAppSelector(state => state.categories)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    dispatch(fetchCategoriesThunk(undefined))
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Card.Root p={2} display={'flex'} flexDir={'column'} gap={4} alignItems={'center'}>
      <VStack height={'100%'} width={'100%'}>
        <HStack width={'100%'} gap={4}>
          <Flex justify={'center'} align={'center'} p={4} borderRadius={10} background={COLOR.PRIMARY_COLOR} color={'white'}><BiCategoryAlt/></Flex>
          <VStack align={'start'} gap={0} width={'100%'}>
            <Text>Категории</Text>
            <Text fontSize={'sm'} color={COLOR.LABEL}>{categories.length} категорий</Text>
          </VStack>
          <Button size={'sm'} variant={'subtle'} onClick={() => setIsAdding(true)}>
            + Добавить
          </Button>
        </HStack>
        <Input size={'sm'} placeholder='Поиск категории...'/>
        <VStack width={'100%'} borderRadius={4}>
          {isAdding && (
            <CreateCategoryRow onCreated={() => setIsAdding(false)} />
          )}
          {categories.map(c => <CategoryCard  key={c.id}  category={c}/>)}

        </VStack>
      </VStack>

      <Link color={'blue.400'}>Посмотреть все категории</Link>
    </Card.Root>
  )
}

export default CategoryToolCard
