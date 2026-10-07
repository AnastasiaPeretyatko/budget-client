import FieldInput from '@/shared/ui/FieldInput'
import { Button, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'

type PeriodFormType = {
  startDate: string
  endDate: string
}

type Props = {
  defaultValues: PeriodFormType
  onSubmit: (data: PeriodFormType) => void
  onCancel: () => void
  isLoading: boolean
  submitText: string
  children?: React.ReactNode
}

const PeriodForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitText,
  children
}: Props) => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<PeriodFormType>({
    defaultValues
  })

  return (
    <VStack as={'form'} width={'100%'} align={'start'} gap={4} onSubmit={handleSubmit(onSubmit)}>
      <HStack width={'100%'} align={'start'} gap={4}>
        <FieldInput
          label='Начало цикла'
          type='date'
          required
          invalid={!!errors.startDate}
          errorText={errors.startDate?.message}
          {...register('startDate', { required: 'Укажите дату начала' })}
        />
        <FieldInput
          label='Конец цикла'
          type='date'
          required
          invalid={!!errors.endDate}
          errorText={errors.endDate?.message}
          {...register('endDate', {
            required: 'Укажите дату конца',
            validate: value => value >= getValues('startDate') || 'Конец раньше начала'
          })}
        />
      </HStack>
      {children}
      <HStack width={'100%'} justify={'end'}>
        <Button variant={'secondary'} onClick={onCancel}>Отмена</Button>
        <Button variant={'primary'} type='submit' loading={isLoading}>{submitText}</Button>
      </HStack>
    </VStack>
  )
}

export default PeriodForm
