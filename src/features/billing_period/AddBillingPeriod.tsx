import { useAppDispatch } from '@/app/store'
import { createBillingPeriodThunk } from '@/entities/bulling-period'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseDatePicker from '@/shared/ui/date-picker'
import { HStack, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'

const AddBillingPeriod = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch()
  const [dates, setDates] = useState<string[]>([])
  const { showErrorMessage,showSuccessMessage } = useNotifications()

  const handleApply = () => {
    if (dates.length < 2) return
    dispatch(createBillingPeriodThunk({
      startDate: dates[0],
      endDate: dates[1],
    })).unwrap().then(() => {
      showSuccessMessage('Платежный период успешно создан')
      onClose()
    }).catch((error) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      showErrorMessage(error.message || 'Ошибка при создании платежного периода')
    })
  }

  return (
    <HStack width={'100%'}>
      <BaseDatePicker selectionMode='range' onChangeValue={(dates) => setDates(dates)} />
      <IconButton
        aria-label="Создать"
        size="sm"
        variant="solid"
        colorPalette="green"
        onClick={handleApply}
        flexShrink={0}
      >
        <MdAdd />
      </IconButton>
    </HStack>
  )
}

export default AddBillingPeriod
