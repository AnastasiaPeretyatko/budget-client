import { AppDispatch } from '@/app/store'
import DropdownMenu from '@/shared/ui/menu'
import { deleteSavingAccountThunk } from '@/entities/saving-account'
import { Button } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

const SavingCardActions = ({ id }: {id: string}) => {
  const dispatch = useDispatch<AppDispatch>()

  const menuItems = useMemo(() => {
    return [
      {
        value: 'Edit',
        onClick: () => console.log('edit')
      },
      {
        value: 'Delete',
        onClick: () => dispatch(deleteSavingAccountThunk(id))
      }
    ]
  }, [dispatch, id])

  return (
    <DropdownMenu
      buttonTrigger={<Button variant={'surface'} size={'sm'}>...</Button>}
      menuItems={menuItems}
    />
  )
}

export default SavingCardActions
