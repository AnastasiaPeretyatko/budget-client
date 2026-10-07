import { useUpdateTagMutation } from '@/entities/tag/api/tagsApi'
import { CreateTagDto, TagWithStatsType } from '@/entities/tag'
import { TAG_COLOR_PRESETS } from '@/shared/config/colors'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import ColorPicker from '@/shared/ui/color-picker'
import FieldInput from '@/shared/ui/FieldInput'
import Label from '@/shared/ui/label'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, HStack, IconButton, VStack } from '@chakra-ui/react'
import { Pen } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  tag: TagWithStatsType
}

const COLORS = TAG_COLOR_PRESETS.map(color => color.value)

const TagEditModal = ({ tag }: Props) => {
  const [updateTag, { isLoading }] = useUpdateTagMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()

  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateTagDto>({
    defaultValues: { name: tag.name, color: tag.color }
  })

  const onSubmit = async (data: CreateTagDto) => {
    try {
      await updateTag({ id: tag.id, data }).unwrap()
      setIsOpen.off()
      showSuccessMessage('Тег успешно обновлён')
    } catch {
      showErrorMessage('Ошибка при обновлении тега')
    }
  }

  return (
    <BaseModalV2
      size='sm'
      trigger={<IconButton size={'xs'} variant={'plain'}><Pen/></IconButton>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Heading size={'md'}>Редактирование тега</Heading>
      <VStack as={'form'} width={'100%'} align={'start'} gap={6} onSubmit={handleSubmit(onSubmit)}>
        <FieldInput
          label='Имя метки / Хештег:'
          startElement={'#'}
          invalid={!!errors.name}
          errorText={errors.name?.message}
          {...register('name', {
            validate: value => !!value.trim() || 'Введите название',
            pattern: {
              value: /^#?[\p{L}\p{N}_\- ]+$/u,
              message: 'Только буквы, цифры, «_» и «-»'
            }
          })}
        />
        <VStack align={'start'}>
          <Label color={'#64748B'}>Цветовая гамма:</Label>
          <Controller
            control={control}
            name='color'
            render={({ field }) => (
              <ColorPicker colors={COLORS} value={field.value} onChange={field.onChange} />
            )}
          />
        </VStack>
        <HStack width={'100%'} justify={'end'}>
          <Button variant={'secondary'} onClick={setIsOpen.off}>Отмена</Button>
          <Button variant={'primary'} type='submit' loading={isLoading}>Сохранить</Button>
        </HStack>
      </VStack>
    </BaseModalV2>
  )
}

export default TagEditModal
