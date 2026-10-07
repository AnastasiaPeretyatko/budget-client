import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import BaseDrawer from '@/shared/ui/drawer'

import { ArrowLeftRight } from 'lucide-react'
import FieldInput from '@/shared/ui/FieldInput'
import BaseTextarea from '@/shared/ui/textarea'
import { EnvelopesType } from '@/entities/envelope/types/envelopes.type'
import EnvelopeSelectWrapper from './EnvelopeSelectWrapper'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { CategorySearchSelect } from '@/features/category-management'
import { TagSelectInput } from '@/features/tag-management'
import { TransactionFormType } from '@/entities/transaction'
import BaseDatePicker from '@/shared/ui/date-picker'
import moment from 'moment'
import { useAddTransactionMutation } from '@/entities/transaction/api/transactionApi'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { generateTransactionType } from '@/shared/utils/generatetransactionType'
import { getErrorMessage } from '@/shared/utils/getErrorMessage'

type Props = {
  envelope?: EnvelopesType;
  nameButton: string;
}

const AMOUNT_CONST = ['500', '1000', '3000', '5000']

const AddTransactionModal = ({ envelope, nameButton }: Props) => {
  const [addTransaction, { isLoading }] = useAddTransactionMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const { register, setValue, handleSubmit, control, reset, watch } = useForm<TransactionFormType>({
    defaultValues: {
      fromAccountId: envelope?.id,
      toAccountId: '',
      // categoryId: '',
      tagIds: [],
      // в форме дата — строка 'YYYY-MM-DD' (так с ней работает BaseDatePicker), в Date она превращается при отправке
      date: moment().format('YYYY-MM-DD'),
    },
  })

  const onSubmit: SubmitHandler<TransactionFormType> = async (data) => {
    try {
      // Календарь отдаёт только день (без часов), поэтому к выбранному дню
      // добавляем текущее время на момент создания транзакции
      const now = moment()
      const date = moment(data.date).set({ hour: now.hour(), minute: now.minute() }).toDate()

      // .unwrap() превращает ошибку запроса в настоящее исключение — иначе catch её не увидит
      await addTransaction({
        ...data,
        date,
        type: generateTransactionType(data.fromAccountId, data.toAccountId)
      }).unwrap()
      showSuccessMessage('Транзакция успешно создана')
      reset()
    } catch (error) {
      showErrorMessage(getErrorMessage(error, 'Ошибка при создании транзакции'))
    }
  }

  return (
    <BaseDrawer trigger={<Button variant={'primary'} onClick={e => e.stopPropagation()}>{nameButton}</Button>}>
      <VStack as={'form'} height={'100%'} onSubmit={handleSubmit(onSubmit)}>
        <VStack width={'100%'} align={'start'} mb={10}>
          <HStack>
            <Box p={4} borderRadius={'12px'} bg={'#D1FAE5'}><ArrowLeftRight size={'14px'}/></Box>
            <Heading fontSize={'18px'}>Ручной перевод капитала</Heading>
          </HStack>
          <Text fontSize={'12px'} color={'#94A3B8'}>Фиксация перераспределения средств между конвертами без банковских транзакций.</Text>
        </VStack>
        <VStack width={'100%'} align={'start'} gap={4} flex={1}>
          <VStack align={'start'} width={'100%'} gap={4}>
            <EnvelopeSelectWrapper control={control} />
            <FieldInput label='Сумма распределения:' {...register('amount')}>
              {envelope && <Button
                size={'xs'}
                variant={'unstyle'}
                color={'primary'}
                fontWeight={'600'}
                onClick={() => setValue('amount', envelope?.amount)}
              >
                Вся сумма остатка
              </Button>}
            </FieldInput>
            <HStack width={'100%'}>
              {
                AMOUNT_CONST.map(num => <Button key={num} variant={'badge'} onClick={() => setValue('amount', num)}>+ {num} ₽</Button>)
              }
            </HStack>
            <Controller
              control={control}
              name='categoryId'
              render={({ field }) => <CategorySearchSelect label='Категория' onChange={field.onChange} />}
            />
            <Controller
              control={control}
              name='tagIds'
              render={({ field }) => <TagSelectInput label='Теги' onChange={field.onChange} />}
            />
          </VStack>
          <BaseTextarea label='Причина перемещения/заметка:' {...register('description')}/>
          <Controller
            control={control}
            name='date'
            render={({ field }) => (
              <BaseDatePicker
                selectionMode='single'
                label='Выберите дату'
                defaultDate={field.value}
                onChangeValue={(dates) => field.onChange(dates[0])}
              />
            )}
          />
        </VStack>
        <HStack width={'100%'} gap={4} pt={4} borderTop={'1px solid #F1F5F9'}>
          <Button flex={1} variant={'secondary'}>Отмена</Button>
          <Button flex={1} variant={'primary'} type='submit' loading={isLoading}>Зафиксировать перевод</Button>
        </HStack>
      </VStack>
    </BaseDrawer>
  )
}

export default AddTransactionModal
