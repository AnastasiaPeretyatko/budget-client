import { Card, Grid, Heading, HStack, VStack } from '@chakra-ui/react'
import CategoryList from '@/features/category-management/ui/CategoryList'
import BillingPeriodList from '@/features/billing_period/BillingPeriodList'
import { TagList } from '@/features/tag-management'

const ViewPage = () => {
  return (
    <VStack width="100%" align="start" gap={6}>
      <HStack width="100%" justify="space-between">
        <Heading>Справочники</Heading>
      </HStack>

      <Grid width="100%" templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
        <Card.Root borderRadius={16} border="none">
          <Card.Body p={5} gap={4} display="flex" flexDir="column">
            <Heading size="md">Категории</Heading>
            <CategoryList />
          </Card.Body>
        </Card.Root>

        <Card.Root borderRadius={16} border="none">
          <Card.Body p={5} gap={4} display="flex" flexDir="column">
            <Heading size="md">Платёжные периоды</Heading>
            <BillingPeriodList />
          </Card.Body>
        </Card.Root>

        <Card.Root borderRadius={16} border="none">
          <Card.Body p={5} gap={4} display="flex" flexDir="column">
            <Heading size="md">Теги</Heading>
            <TagList />
          </Card.Body>
        </Card.Root>
      </Grid>
    </VStack>
  )
}

export default ViewPage
