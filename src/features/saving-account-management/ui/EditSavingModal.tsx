import { Button, Checkbox, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { EnvelopesType } from '@/entities/envelope/types/envelopes.type'
import BaseModalV2 from '@/shared/ui/modal_v2'
import IconPicker from '@/shared/ui/icon-picker/IconPicker'
import FieldInput from '@/shared/ui/FieldInput'
import BaseTextarea from '@/shared/ui/textarea'
import ColorPicker from '@/shared/ui/color-picker'
import { CATEGORY_COLORS } from '@/entities/category/constants/category-colors'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useUpdateEnvelopeMutation } from '@/entities/envelope/api/envelopApi'
import { PenIcon } from 'lucide-react'
import { transfOnlyData } from '@/shared/utils/transfOnlyData'

const EditSavingModal = ({ envelope }: {envelope: EnvelopesType}) => {
  const [updateEvelopes, { isLoading }]= useUpdateEnvelopeMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { dirtyFields }
  } = useForm<EnvelopesType>({ defaultValues: envelope })
  const [isOpen, setIsOpen] = useBoolean()

  const onSubmit: SubmitHandler<EnvelopesType> = async(data) => {
    try {
      await updateEvelopes({
        id: envelope.id,
        data: transfOnlyData<EnvelopesType>(dirtyFields, data),
      }).unwrap()

      setIsOpen.off()
      showSuccessMessage('Накопительный счет успешно обновлен')
    } catch (err) {
      showErrorMessage('Ошибка обновления накопительного счета', err)
    }
  }

  return (
    <BaseModalV2
      trigger={<IconButton variant={'secondary'} aria-label='Настройки конверта'><PenIcon/></IconButton>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Heading>Обновить {envelope.name} конверт</Heading>
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
        <Checkbox.Root
          // checked={isSafe}
          // onCheckedChange={e => setIsSafe(!!e.checked)}
          {...register('isSafe')}
          colorPalette={'green'}
          size={'sm'}
          alignItems={'start'}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
          <Checkbox.Label>
            <Text fontSize={'12px'} fontWeight={700}>Резервный сейф</Text>
            <Text fontSize={'11px'} color={'label'} fontWeight={400}>
                    Переводы на этот конверт учитываются на странице «План» как деньги, отложенные в резерв
            </Text>
          </Checkbox.Label>
        </Checkbox.Root>
        <HStack width={'100%'}>
          <Button  variant={'outline'}>Отменить</Button>
          <Button flex={1} variant={'primary'} type='submit' loading={isLoading} disabled={Object.keys(dirtyFields).length === 0}>Сохранить</Button>
        </HStack>
      </VStack>
    </BaseModalV2>
  )
}

export default EditSavingModal
