import { AppDispatch, RootState } from '@/app/store'
import { fetchSavingAccountsThunk } from '@/entities/saving-account'
import { SavingAccountCard } from '@/entities/saving-account'
import { CreateSavingModal } from '@/features/saving-account-management'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  isDisplayCreteModal?: boolean
  limit?: number
  wrap?: boolean
}

const SavingAccountList = ({ isDisplayCreteModal = false, limit, wrap = false }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { savingAccounts } = useSelector((state: RootState) => state.savingAccounts)

  const handleOpenBudgetClick = (id: string) => {
    router.push(`/budgets/${id}`)
  }

  useEffect(() => {
    dispatch(fetchSavingAccountsThunk())
  }, [dispatch])

  const visibleAccounts = limit ? savingAccounts.slice(0, limit) : savingAccounts

  return (
    <Box
      display={'grid'}
      gridTemplateColumns={'repeat(auto-fill, minmax(280px, 350px))'}
      alignItems={'stretch'}
      gap={4}
      width={'100%'}
    >
      {visibleAccounts.map((account) => (
        <SavingAccountCard
          key={account.id}
          savingAccount={account}
          onClick={handleOpenBudgetClick}
        />
      ))}
      {isDisplayCreteModal && <CreateSavingModal />}
    </Box>
  )
}

export default SavingAccountList
