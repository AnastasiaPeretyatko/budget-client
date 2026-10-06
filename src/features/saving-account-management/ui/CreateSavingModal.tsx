import BaseModal from '@/shared/ui/modal'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { useAddEvelopesMutation } from '@/entities/envelope/api/envelopesApi'

const CreateSavingModal = () => {
  const [addEvelopes]= useAddEvelopesMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const handleSave = (close: () => void) => {
    try {
      addEvelopes({ name, amount, description })
      showSuccessMessage('Накопительный счет успешно создан')
      close()
    } catch (error) {
      showErrorMessage('Ошибка создания накопительного счета')
    }
  }

  return (
    <BaseModal title='Создать новый накопительный счет' buttonTrigger={<Button variant={'primary'}>Создать конверт</Button>} onClickSave={handleSave}>
      <Input variant={'primary'} placeholder='Название' onChange={e => setName(e.target.value)}/>
      <Input variant={'primary'} placeholder='Сумма' onChange={e => setAmount(e.target.value)}/>
      <Textarea variant={'primary'} placeholder='Описание' onChange={e => setDescription(e.target.value)}/>
    </BaseModal>
  )
}

export default CreateSavingModal
