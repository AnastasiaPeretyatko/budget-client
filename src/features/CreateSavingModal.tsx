import ModalComponent from '@/components/ui/modal'
import CardCreateSavingButton from './CardCreateSavingButton'
import { Input, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/common/store.config'
import { postSavingThunk } from '@/entities/saving-account/api/saving-account.thunk'

const CreateSavingModal = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch<AppDispatch>()

  const onSaveNewSaving = (close: () => void) => {
    dispatch(postSavingThunk({ name, amount, description })).then(() => close())
  }

  return (
    <ModalComponent title='Создать новый накопительный счет' buttonTrigger={<CardCreateSavingButton/>} onClickSave={onSaveNewSaving}>
      <Input placeholder='Название' onChange={e => setName(e.target.value)}/>
      <Input placeholder='Сумма' onChange={e => setAmount(e.target.value)}/>
      <Textarea placeholder='Описание' onChange={e => setDescription(e.target.value)}/>
    </ModalComponent>
  )
}

export default CreateSavingModal
