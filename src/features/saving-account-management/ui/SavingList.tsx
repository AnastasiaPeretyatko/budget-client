import { AppDispatch, RootState } from '@/app/store'
import { fetchSavingAccountsThunk } from '@/entities/saving-account'
import { HStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SavingCard from './SavingCard'
import CreateSavingModal from './CreateSavingModal'

const SavingList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { savingAccounts } = useSelector((state: RootState) => state.savingAccounts)

  useEffect(() => {
    dispatch(fetchSavingAccountsThunk())
  }, [dispatch])

  return (
    <HStack alignItems={'stretch'} gap={4} flexWrap={'wrap'}>
      {
        savingAccounts.map((item) => (
          <SavingCard key={item.id} savingAccount={item}/>
        ))
      }
      <CreateSavingModal/>
    </HStack>
  )
}

export default SavingList
