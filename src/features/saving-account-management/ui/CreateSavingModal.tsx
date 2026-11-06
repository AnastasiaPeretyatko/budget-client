import { Button, HStack, VStack } from '@chakra-ui/react'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { useAddEvelopesMutation } from '@/entities/envelope/api/envelopesApi'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { BaseEnvelopesType } from '@/entities/envelope/types/envelopes.type'
import BaseModalV2 from '@/shared/ui/modal_v2'
import IconPicker from '@/shared/ui/icon-picker/IconPicker'
import FieldInput from '@/shared/ui/FieldInput'
import BaseTextarea from '@/shared/ui/textarea'
import ColorPicker from '@/shared/ui/color-picker'
import { CATEGORY_COLORS } from '@/entities/category/constants/category-colors'
import { useBoolean } from '@/shared/hooks/useBoolean'

const CreateSavingModal = ({ lastIndex }: {lastIndex: number}) => {
  const [addEvelopes, { isLoading }]= useAddEvelopesMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const { register, handleSubmit, control, watch } = useForm<BaseEnvelopesType>()
  const [isOpen, setIsOpen] = useBoolean()

  const onSubmit: SubmitHandler<BaseEnvelopesType> = async(data) => {
    await addEvelopes({ ...data, index: lastIndex + 1 })
      .unwrap()
      .then(() => {
        setIsOpen.off()
        showSuccessMessage('Накопительный счет успешно создан')
      })
      .catch(err => showErrorMessage('Ошибка создания накопительного счета', err))
  }

  return (
    <BaseModalV2
      trigger={<Button variant={'primary'}>Создать конверт</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <VStack as={'form'} width={'100%'} gap={4} align={'start'} onSubmit={handleSubmit(onSubmit)}>
        <HStack width={'100%'} gap={4}>
          <Controller
            control={control}
            name='icon'
            render={({ field }) => <IconPicker value={field.value} onChange={field.onChange} color={watch('color')}/>}
          />
          <FieldInput label='Название' variant={'primary'} placeholder='Введите название' {...register('name')}/>
        </HStack>
        <Controller
          control={control}
          name='color'
          render={({ field }) => (
            <ColorPicker
              colors={CATEGORY_COLORS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <FieldInput label='Сумма' variant={'primary'} placeholder='Начальная сумма' defaultValue={0} {...register('amount')}/>
        <BaseTextarea label='Описание' placeholder='Ввидите описание' {...register('description')}/>
        <HStack width={'100%'}>
          <Button  variant={'outline'}>Отменить</Button>
          <Button flex={1} variant={'primary'} type='submit' loading={isLoading}>Сохранить</Button>
        </HStack>
      </VStack>
    </BaseModalV2>
  )
}

export default CreateSavingModal
