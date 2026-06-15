import BaseModal from '@/shared/ui/modal'
import AddSavingButton from './AddSavingButton'
import { Input, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/store'
import { createSavingAccountThunk } from '@/entities/saving-account'
import { useNotifications } from '@/shared/hooks/useNotifications'

const CreateSavingModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const handleSave = (close: () => void) => {
    dispatch(createSavingAccountThunk({ name, amount, description }))
      .unwrap()
      .then(() => {
        showSuccessMessage('Накопительный счет успешно создан')
        close()
      })
      .catch(() => showErrorMessage('Ошибка создания накопительного счета'))
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
