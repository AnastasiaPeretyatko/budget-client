import EnvelopeInfoCard from '@/widgets/transaction-page/EnvelopeInfoCard'
import EnvelopeTransactionsCard from '@/widgets/transaction-page/EnvelopeTransactionsCard'
import { VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const BudgetPage = () => {
  const router = useRouter()
  const id = router.query.id as string | undefined

  return (
    <VStack width={'100%'} gap={4} align={'start'}>
      <EnvelopeInfoCard/>
      <EnvelopeTransactionsCard key={id} accountId={id}/>
    </VStack>
  )
}

export default BudgetPage
