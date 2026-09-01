import { useAppDispatch, useAppSelector } from '@/app/store'
import { COLOR } from '@/shared/config/colors'
import { Button, Card, Flex, HStack, Input, Link, Spinner, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import CategoryCard from '../category-management/ui/CategoryCard'
import { fetchCategoriesThunk } from '@/entities/category'

const CategoryToolCard = () => {
  const dispatch = useAppDispatch()

  const { categories, isLoading } = useAppSelector(state => state.categories)

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
            <Text fontSize={'sm'} color={COLOR.LABEL}>18 категорий - 4 подкатегории</Text>
          </VStack>
          <Button size={'sm'} variant={'subtle'}>Управление {'>'}</Button>
        </HStack>
        <Input placeholder='Поиск категории...'/>
        <VStack width={'100%'} borderRadius={4} borderColor={'gray.800'} borderWidth={'1px'}>
          {
            categories.map(c => <CategoryCard  key={c.id}  category={c}/>)
          }
        </VStack>
      </VStack>

      <Link color={'blue.400'}>Посмотреть все категории</Link>
    </Card.Root>
  )
}

export default CategoryToolCard
