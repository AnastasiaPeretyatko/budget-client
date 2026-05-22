import { AppDispatch, RootState } from '@/app/store'
import { fetchSavingAccountByIdThunk, SavingAccountCard } from '@/entities/saving-account'
import { TransactionTable } from '@/features/transaction-management'
import CreateTransactionModal from '@/features/transaction-management/ui/CreateTransactionModal'
import { HStack, VStack } from '@chakra-ui/react'
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

  if (isLoading || !activeSavingAccount) return null

  return (
    <VStack width={'100%'}>
      <HStack width={'100%'}>
        <SavingAccountCard savingAccount={activeSavingAccount} />
        <CreateTransactionModal />
      </HStack>
      <TransactionTable/>
    </VStack>
  )
}

export default BudgetPage
