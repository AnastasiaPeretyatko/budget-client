import { SavingAccountList } from '@/widgets/saving-account-list'
import { Heading, VStack } from '@chakra-ui/react'

const BudgetsPage = () => {
  return (
    <VStack width={'100%'} align={'start'}>
      <Heading>Budgets</Heading>
      <SavingAccountList/>
    </VStack>
  )
}

export default BudgetsPage
