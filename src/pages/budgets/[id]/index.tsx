import { AppDispatch, RootState } from '@/app/store'
import { fetchSavingAccountByIdThunk, SavingAccountCard } from '@/entities/saving-account'
import { TransactionTable, TransactionTableHeader } from '@/features/transaction-management'
import CreateTransactionModal from '@/features/transaction-management/ui/CreateTransactionModal'
import { Heading, HStack, VStack } from '@chakra-ui/react'
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
    <VStack width={'100%'} padding={4} gap={4} align={'start'}>
      <Heading size={'2xl'}>{activeSavingAccount.name}</Heading>
      <HStack width={'100%'} justify={'space-between'} gap={4}>
        <SavingAccountCard savingAccount={activeSavingAccount} />
        <CreateTransactionModal />
      </HStack>
      <TransactionTableHeader/>
      <TransactionTable accountId={id}/>
    </VStack>
  )
}

export default BudgetPage
