import { AppDispatch, RootState } from '@/app/store'
import { fetchSavingAccountsThunk } from '@/entities/saving-account'
import { SavingAccountCard } from '@/entities/saving-account'
import { CreateSavingModal } from '@/features/saving-account-management'
import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SavingAccountList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { savingAccounts } = useSelector((state: RootState) => state.savingAccounts)

  useEffect(() => {
    dispatch(fetchSavingAccountsThunk())
  }, [dispatch])

  return (
    <Flex gap={4}>
      <CreateSavingModal/>
      {
        savingAccounts.map((account) => (
          <SavingAccountCard key={account.id} savingAccount={account}/>
        ))
      }
    </Flex>
  )
}

export default SavingAccountList
