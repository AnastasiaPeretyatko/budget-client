import { Box, Heading, VStack, SimpleGrid } from '@chakra-ui/react'
import CategoryList from '@/features/category-management/ui/CategoryList'
import BillingPeriodList from '@/features/billing_period/BillingPeriodList'

const ViewPage = () => {
  return (
    <VStack width="100%" align="start" gap={6} padding={4}>
      <Heading size="lg">Справочники</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} width="100%">
        <Box>
          <Heading size="md" marginBottom={4}>Категории</Heading>
          <CategoryList />
        </Box>
        <Box>
          <Heading size="md" marginBottom={4}>Платёжные периоды</Heading>
          <BillingPeriodList />
        </Box>
      </SimpleGrid>
    </VStack>
  )
}

export default ViewPage
