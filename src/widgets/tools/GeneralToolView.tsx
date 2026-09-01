import BillingToolCard from '@/features/tool-card/BillingToolCard'
import CategoryToolCard from '@/features/tool-card/CategoryToolCard'
import TagToolCard from '@/features/tool-card/TagToolCard'
import { Grid, Text, VStack } from '@chakra-ui/react'

const GeneralToolView = () => {
  return (
    <VStack width={'100%'} align={'start'}>
      <Text>Обзор справочника</Text>
      <Grid width={'100%'} templateColumns={'repeat(3, 1fr)'} gap={8}>
        <CategoryToolCard/>
        <TagToolCard/>
        <BillingToolCard/>
      </Grid>
    </VStack>
  )
}

export default GeneralToolView
