import BaseModal from '@/shared/ui/modal'
import { Button, Checkbox, Input, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { useAddEvelopesMutation } from '@/entities/envelope/api/envelopesApi'

const CreateSavingModal = () => {
  const [addEvelopes]= useAddEvelopesMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isSafe, setIsSafe] = useState(false)

  const handleSave = async(close: () => void) => {
    try {
      await addEvelopes({ name, amount, description, isSafe }).unwrap()
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
      <Checkbox.Root
        checked={isSafe}
        onCheckedChange={e => setIsSafe(!!e.checked)}
        colorPalette={'green'}
        size={'sm'}
        alignItems={'start'}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
        <Checkbox.Label>
          <Text fontSize={'12px'} fontWeight={700}>Резервный сейф</Text>
          <Text fontSize={'11px'} color={'label'} fontWeight={400}>
            Переводы сюда учитываются на странице «План» как отложенные в резерв
          </Text>
        </Checkbox.Label>
      </Checkbox.Root>
    </BaseModal>
  )
}

export default CreateSavingModal
