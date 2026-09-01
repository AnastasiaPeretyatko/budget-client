import { AppDispatch, RootState } from '@/app/store'
import { fetchSavingAccountByIdThunk } from '@/entities/saving-account'
import TransactionTabs from '@/widgets/transaction-page/TransactionTabs'
import { Heading, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const BudgetPage = () => {
  const router = useRouter()
  const id = router.query.id as string | undefined

  const dispatch = useDispatch<AppDispatch>()
  const { activeSavingAccount, isLoading } = useSelector((state: RootState) => state.savingAccounts)

  useEffect(() => {
    if (id) dispatch(fetchSavingAccountByIdThunk(id))
  }, [dispatch, id])

  return (
    <VStack width={'100%'} padding={4} gap={4} align={'start'}>
      <TransactionTabs>
        <Heading size={'2xl'} mt={1} whiteSpace={'nowrap'}>{activeSavingAccount?.name}</Heading>
      </TransactionTabs>
    </VStack>
  )
}

export default BudgetPage
