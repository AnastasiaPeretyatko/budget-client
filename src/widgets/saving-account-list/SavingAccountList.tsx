import { AppDispatch, RootState } from '@/common/store.config'
import { getAllSavingThunk } from '@/entities/saving-account/api/saving-account.thunk'
import SavingAccountCard from '@/entities/saving-account/components/SavingAccountCard'
import CreateSavingModal from '@/features/CreateSavingModal'
import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SavingAccountList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { saving } = useSelector((state: RootState) => state.saving)

  useEffect(() => {
    dispatch(getAllSavingThunk())
  }, [dispatch])

  return (
    <Flex gap={4}>
      <CreateSavingModal/>
      {saving.map((item) => (<SavingAccountCard key={item.id} saving={item}/>))}
    </Flex>
  )
}

export default SavingAccountList
