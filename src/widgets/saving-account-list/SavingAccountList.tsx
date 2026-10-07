import { useGetEnvelopesQuery } from '@/entities/envelope/api/envelopesApi'
import { SavingAccountCard } from '@/entities/saving-account'
import { CreateSavingModal } from '@/features/saving-account-management'
import { Box } from '@chakra-ui/react'

type Props = {
  isDisplayCreteModal?: boolean
  limit?: number
  wrap?: boolean
}

const SavingAccountList = ({ isDisplayCreteModal = false, limit, wrap = false }: Props) => {
  const { data: savingAccounts = [] } = useGetEnvelopesQuery()

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
        />
      ))}
      {isDisplayCreteModal && <CreateSavingModal />}
    </Box>
  )
}

export default SavingAccountList
