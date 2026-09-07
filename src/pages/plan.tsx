import AnalyticsByCategoryCard from '@/features/plan/AnalyticsByCategoryCard'
import RemainingFundsCard from '@/features/plan/RemainingFundsCard'
import { Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'

const PlanPage = () => {
  return (
    <VStack width={'100%'} align={'start'} gap={6}>
      <Heading>План <Text as={'span'} fontSize={'sm'} color={'gray.500'}>{moment().format('MMMM')}</Text></Heading>
      <Grid
        width={'100%'}
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem colSpan={1}>
          <RemainingFundsCard />
        </GridItem>

        <GridItem colSpan={2}>
          <AnalyticsByCategoryCard />
        </GridItem>
      </Grid>
    </VStack>
  )
}

export default PlanPage
