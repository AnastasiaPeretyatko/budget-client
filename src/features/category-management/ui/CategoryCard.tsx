import { CategoryType } from '@/entities/category'
import { COLOR } from '@/shared/config/colors'
import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'

const CategoryCard = ({ category }: {category: CategoryType}) => {
  return (
    <HStack width={'100%'} p={2} cursor={'pointer'}>
      <Flex justify={'center'} align={'center'} p={2} borderRadius={10}>
        {category.icon && <Text fontSize="lg">{category.icon}</Text>}
      </Flex>

      <VStack align={'start'} width={'100%'} gap={0}>
        <Text>{category.name}</Text>
        <Text fontSize={'sm'} color={COLOR.LABEL}>Доход</Text>
      </VStack>
      <HStack gap={0}>
        <Text fontSize={'sm'} color={COLOR.LABEL}>24</Text>
        <Button size={'sm'} color={COLOR.LABEL} variant={'ghost'}>{'>'}</Button>
      </HStack>
    </HStack>
  )
}

export default CategoryCard
