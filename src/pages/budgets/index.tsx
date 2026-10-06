import GeneralEnvelopePoolCard from '@/features/GeneralEnvelopePoolCard'
import CurrentEnvelopesList from '@/widgets/CurrentEnvelopesList'
import { VStack } from '@chakra-ui/react'

const BudgetsPage = () => {
  return (
    <VStack width={'100%'} align={'start'} gap={4}>
      <GeneralEnvelopePoolCard />
      <CurrentEnvelopesList/>
      {/* <SavingAccountList isDisplayCreteModal wrap /> */}
    </VStack>
  )
}

export default BudgetsPage
