import { AppDispatch } from '@/common/store.config'
import MenuComponent from '@/components/ui/menu'
import { deleteSavingThunk } from '@/entities/saving-account/api/saving-account.thunk'
import { Button } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

const ActionSavingCard = ({ id }: {id: string}) => {
  const dispatch = useDispatch<AppDispatch>()

  const list = useMemo(() => {
    return [
      {
        value: 'Edit',
        onClick: () => console.log('edit')
      },
      {
        value: 'Delete',
        onClick: () => dispatch(deleteSavingThunk(id))
      }
    ]
  }, [dispatch, id])

  return (
    <MenuComponent
      buttonTrigger={<Button variant={'surface'} size={'sm'}>...</Button>}
      list={list}
    />
  )
}

export default ActionSavingCard
