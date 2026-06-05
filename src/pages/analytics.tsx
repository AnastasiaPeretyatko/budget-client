import LatestActivePeriodTag from '@/features/billing_period/LatestActivePeriodTag'
import CategoryPieCard from '@/widgets/analytics/CategoryPieCard'
import { Heading, HStack, VStack } from '@chakra-ui/react'

const AnalyticsPage = () => {
  return (
    <VStack width={'100%'} align={'start'} gap={6}>
      <HStack width={'100%'} align={'start'} gap={4}>
        <Heading size={'2xl'}>Analytics</Heading>
        <LatestActivePeriodTag/>
      </HStack>
      <HStack width={'100%'} align={'start'} gap={4}>
        <CategoryPieCard />
      </HStack>
    </VStack>
  )
}

export default AnalyticsPage
