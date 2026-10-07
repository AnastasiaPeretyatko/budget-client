import { useAddPeriodMutation } from '@/entities/billing-period/api/billing-periodApi'
import { BillingPeriodType } from '@/entities/billing-period'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import PeriodForm from './PeriodForm'

const DATE_FORMAT = 'YYYY-MM-DD'

type Props = {
  // текущий открытый цикл: нет его, значит создаём первый период
  period?: BillingPeriodType
}

// Следующий цикл начинается на следующий день после конца текущего и длится столько же
const getDefaultDates = (period?: BillingPeriodType) => {
  if (!period?.endDate) return { startDate: moment().format(DATE_FORMAT), endDate: '' }

  const length = moment(period.endDate).diff(period.startDate, 'days')
  const start = moment(period.endDate).add(1, 'day')

  return {
    startDate: start.format(DATE_FORMAT),
    endDate: start.clone().add(length, 'days').format(DATE_FORMAT)
  }
}

const NextPeriodModal = ({ period }: Props) => {
  const [addPeriod, { isLoading }] = useAddPeriodMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()

  const handleCreate = async (data: { startDate: string, endDate: string }) => {
    try {
      await addPeriod(data).unwrap()
      setIsOpen.off()
      showSuccessMessage('Новый цикл создан')
    } catch (error) {
      showErrorMessage('Ошибка при создании цикла', error)
    }
  }

  return (
    <BaseModalV2
      size='sm'
      trigger={
        <Button variant={'primary'}>
          {period ? '+ Настроить следующий период' : '+ Создать период'}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <VStack width={'100%'} align={'start'} gap={1} mb={2}>
        <Heading size={'md'}>{period ? 'Следующий период' : 'Новый период'}</Heading>
        <Text fontSize={'sm'} color={'label'}>Укажите даты нового цикла</Text>
      </VStack>
      <PeriodForm
        defaultValues={getDefaultDates(period)}
        onSubmit={handleCreate}
        onCancel={setIsOpen.off}
        isLoading={isLoading}
        submitText='Создать цикл'
      >
        {period && (
          <Text fontSize={'12px'} color={'#B45309'}>
            Текущий цикл будет сразу закрыт, а его итоги сохранятся в архиве.
          </Text>
        )}
      </PeriodForm>
    </BaseModalV2>
  )
}

export default NextPeriodModal
