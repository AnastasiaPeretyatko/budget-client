import { useAddTransactionsBatchMutation } from '@/entities/transaction/api/transactionApi'
import { COLOR } from '@/shared/config/colors'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseDrawer from '@/shared/ui/drawer'
import Label from '@/shared/ui/label'
import { getErrorMessage } from '@/shared/utils/getErrorMessage'
import parseLineToTransaction from '@/shared/utils/parseLineToTransaction'
import { Button, Heading, Textarea, VStack } from '@chakra-ui/react'
import { useRef } from 'react'

const AddTransactionDrawer = () => {
  const [addTransactionsBatch, { isLoading }] = useAddTransactionsBatchMutation()
  const { showErrorMessage } = useNotifications()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const onSendTransaction = async () => {
    const text = textAreaRef.current?.value.trim();
    if (!text) return

    const newTransactions = text
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(parseLineToTransaction)

    if (!newTransactions) return

    try {
      await addTransactionsBatch(newTransactions).unwrap()
      if (textAreaRef.current) textAreaRef.current.value = ''
    } catch (err) {
      showErrorMessage(getErrorMessage(err))
    }
  }

  return (
    <BaseDrawer>
      <VStack width={'100%'} height={'100%'} align={'start'}>
        <Heading size={'xl'} mb={4}>Новая операция</Heading>
        <Label fontSize={'xs'}>напишите как есть </Label>
        <Textarea
          ref={textAreaRef}
          resize={'none'}
          width={'100%'}
          height={'100%'}
          border={'none'}
          p={0}
          _focusVisible={{
            outline: 'none'
          }}
          _placeholder={{
            color: COLOR.LABEL,
            fontSize: 'xs'
          }}
          placeholder='Например: Кофе 420 с Тинькофф'
        />
        <Button size={'xs'} onClick={onSendTransaction} loading={isLoading}>Отправить</Button>
      </VStack>
    </BaseDrawer>
  )
}

export default AddTransactionDrawer
