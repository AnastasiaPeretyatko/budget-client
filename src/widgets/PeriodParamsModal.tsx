import { useUpdatePeriodMutation } from '@/entities/bulling-period/api/billing-periodApi'
import { BillingPeriodType } from '@/entities/bulling-period'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import { SlidersHorizontal } from 'lucide-react'
import React from 'react'
import PeriodForm from './PeriodForm'

type Props = {
  period: BillingPeriodType
}

const PeriodParamsModal = ({ period }: Props) => {
  const [updatePeriod, { isLoading }] = useUpdatePeriodMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()

  const handleUpdate = async (data: { startDate: string, endDate: string }) => {
    try {
      await updatePeriod({ id: period.id, data }).unwrap()
      setIsOpen.off()
      showSuccessMessage('Параметры цикла обновлены')
    } catch {
      showErrorMessage('Ошибка при обновлении цикла')
    }
  }

  return (
    <BaseModalV2
      size='sm'
      trigger={<Button variant={'secondary'}><SlidersHorizontal/> Параметры цикла</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <VStack width={'100%'} align={'start'} gap={1} mb={2}>
        <Heading size={'md'}>Параметры цикла</Heading>
        <Text fontSize={'sm'} color={'label'}>Измените даты текущего открытого цикла</Text>
      </VStack>
      <PeriodForm
        defaultValues={{ startDate: period.startDate, endDate: period.endDate ?? '' }}
        onSubmit={handleUpdate}
        onCancel={setIsOpen.off}
        isLoading={isLoading}
        submitText='Сохранить'
      />
    </BaseModalV2>
  )
}

export default PeriodParamsModal
