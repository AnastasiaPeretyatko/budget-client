import { AppDispatch, RootState } from '@/app/store'
import { fetchSavingAccountsThunk } from '@/entities/saving-account'
import { SavingAccountCard } from '@/entities/saving-account'
import { CreateSavingModal } from '@/features/saving-account-management'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  isDisplayCreteModal?: boolean
  direction?: 'row' | 'column'
}

const SavingAccountList = ({ isDisplayCreteModal = false, direction = 'row' }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { savingAccounts } = useSelector((state: RootState) => state.savingAccounts)

  const handleOpenBudgetClick = (id: string) => {
    router.push(`/budgets/${id}`)
  }

  useEffect(() => {
    dispatch(fetchSavingAccountsThunk())
  }, [dispatch])

  return (
    <Flex gap={4} direction={direction}>
      {isDisplayCreteModal && <CreateSavingModal/>}
      {
        savingAccounts.map((account) => (
          <SavingAccountCard
            key={account.id}
            savingAccount={account}
            onClick={handleOpenBudgetClick}
          />
        ))
      }
    </Flex>
  )
}

export default SavingAccountList
