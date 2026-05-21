import BaseModal from '@/shared/ui/modal'
import AddSavingButton from './AddSavingButton'
import { Input, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/store'
import { createSavingAccountThunk } from '@/entities/saving-account'

const CreateSavingModal = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch<AppDispatch>()

  const handleSave = (close: () => void) => {
    dispatch(createSavingAccountThunk({ name, amount, description })).then(() => close())
  }

  return (
    <BaseModal title='Создать новый накопительный счет' buttonTrigger={<AddSavingButton/>} onClickSave={handleSave}>
      <Input placeholder='Название' onChange={e => setName(e.target.value)}/>
      <Input placeholder='Сумма' onChange={e => setAmount(e.target.value)}/>
      <Textarea placeholder='Описание' onChange={e => setDescription(e.target.value)}/>
    </BaseModal>
  )
}

export default CreateSavingModal
