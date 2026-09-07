import { HStack, Text, VStack } from '@chakra-ui/react'
import Progress from '@/shared/ui/progress'
import { CategoryStatisticsItem } from '@/entities/statistics'

const AnaliticCategoryCard = ({ category }: {category: CategoryStatisticsItem}) => {
  return (
    <HStack width={'100%'} align={'center'} gap={2}>
      {/* {category.} */}

      <VStack width={'100%'} align={'start'} gap={1}>
        <Text fontSize="sm">{category.categoryName}</Text>
        <Progress  spend={28000} remaining={+category.total}/>
      </VStack>

    </HStack>
  )
}

export default AnaliticCategoryCard
