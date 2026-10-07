import { useAddTagMutation } from '@/entities/tag/api/tagsApi'
import { CreateTagDto, TagWithStatsType } from '@/entities/tag'
import { TAG_COLOR_PRESETS } from '@/shared/config/colors'
import { useNotifications } from '@/shared/hooks/useNotifications'
import ColorPicker from '@/shared/ui/color-picker'
import FieldInput from '@/shared/ui/FieldInput'
import Label from '@/shared/ui/label'
import { Button, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import TagsCleanupDialog from './TagsCleanupDialog'
import TagsMergeModal from './TagsMergeModal'

type Props = {
  tags: TagWithStatsType[]
}

const COLORS = TAG_COLOR_PRESETS.map(color => color.value)

const TagCreateCard = ({ tags }: Props) => {
  const [addTag, { isLoading }] = useAddTagMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<CreateTagDto>({
    defaultValues: { name: '', color: COLORS[0] }
  })

  const onSubmit = async (data: CreateTagDto) => {
    try {
      await addTag(data).unwrap()
      showSuccessMessage('Тег успешно создан')
      reset()
    } catch (error) {
      showErrorMessage('Ошибка при создании тега', error)
    }
  }

  return (
    <Card.Root width={'100%'} variant={'primary'} gap={4}>
      <HStack width={'100%'} align={'start'} justify={'space-between'} gap={4}>
        <VStack align={'start'} gap={1}>
          <Heading size={'md'}>Экспресс-создание тега</Heading>
          <Text fontSize={'12px'} color={'label'}>
            Теги служат для сквозного фильтра чеков независимо от назначенного конверта
            (проекты, события, члены семьи).
          </Text>
        </VStack>
        <HStack>
          <TagsMergeModal tags={tags} />
          <TagsCleanupDialog tags={tags} />
        </HStack>
      </HStack>

      <HStack as={'form'} width={'100%'} align={'start'} gap={6} onSubmit={handleSubmit(onSubmit)}>
        <FieldInput
          label='Имя метки / Хештег:'
          placeholder='например, ремонт_кухни'
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
        <Button variant={'primary'} type='submit' loading={isLoading} alignSelf={'end'}>
          + Добавить тег
        </Button>
      </HStack>
    </Card.Root>
  )
}

export default TagCreateCard
