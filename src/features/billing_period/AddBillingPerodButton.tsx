import { COLOR } from '@/shared/config/colors'
import BaseDatePicker from '@/shared/ui/date-picker'
import BasePopover from '@/shared/ui/popover'
import { Box, Button, Float, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { createBillingPeriodThunk } from '@/entities/bulling-period'
import Label from '@/shared/ui/label'

const AddBillingPeriodButton = () => {
  const dispatch = useAppDispatch()
  const { isLoading, hasNoActivePeriod } = useAppSelector(state => state.billingPeriod)
  const [dates, setDates] = useState<string[]>([])

  const handleApply = () => {
    if (dates.length < 2) return
    dispatch(createBillingPeriodThunk({
      startDate: dates[0],
      endDate: dates[1],
    }))
  }

  const triggerButton = (
    <Box position={'relative'} display={'inline-flex'}>
      <Button size={'xs'}>+ Новый период</Button>
      {hasNoActivePeriod && (
        <Float placement={'top-end'} offsetX={'0'} offsetY={'0'}>
          <Box w={2.5} h={2.5} bg={COLOR.EXPENSE_TEXT} borderRadius={'full'} />
        </Float>
      )}
    </Box>
  )

  return (
    <BasePopover TriggerButton={triggerButton}>
      <VStack align={'start'} gap={4}>
        <Label >Добавьте новый период</Label>
        <BaseDatePicker selectionMode='range' onChangeValue={(dates) => setDates(dates)} />
        <Button
          width={'100%'}
          size={'xs'}
          onClick={handleApply}
          loading={isLoading}
          disabled={dates.length < 2}
        >
          Сохранить
        </Button>
      </VStack>
    </BasePopover>
  )
}

export default AddBillingPeriodButton
