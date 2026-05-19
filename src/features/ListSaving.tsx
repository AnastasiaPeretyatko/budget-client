import { AppDispatch, RootState } from '@/common/store.config'
import { getAllSavingThunk } from '@/entities/saving-account/api/saving-account.thunk'
import { HStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardSaving from './CardSaving'
import CreateSavingModal from './CreateSavingModal'

const ListSaving = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { saving } = useSelector((state: RootState) => state.saving)

  useEffect(() => {
    dispatch(getAllSavingThunk())
  }, [dispatch])

  return (
    <HStack alignItems={'stretch'} gap={4} flexWrap={'wrap'}>
      {
        saving.map((item) => (
          <CardSaving key={item.id} saving={item}/>
        ))
      }
      <CreateSavingModal/>
    </HStack>
  )
}

export default ListSaving
