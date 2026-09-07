import { RootState } from '@/app/store'
import AnaliticCategoryCard from '@/entities/category/ui/AnaliticCategoryCard'
import { Card } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const AnalyticsByCategoryCard = () => {
  const { items, uncategorized, isLoading } = useSelector(
    (state: RootState) => state.statistics
  )
  // const { showErrorMessage, showSuccessMessage } = useNotifications()

  return (
    <Card.Root p={4} width={'100%'} height={'100%'} flexDirection={'column'} gap={2} alignItems={'start'}>
      <Card.Title>Категории</Card.Title>
      <Card.Body width={'100%'} p={0} >
        {items.map((category) => (
          <AnaliticCategoryCard key={category.categoryId} category={category} />
        ))}
      </Card.Body>
    </Card.Root>
  )
}

export default AnalyticsByCategoryCard
