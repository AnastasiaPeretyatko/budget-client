import { useAppDispatch } from '@/app/store'
import { updateBillingPeriodThunk, BillingPeriodType } from '@/entities/bulling-period'
import { HStack, Input, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { MdCheck, MdClose } from 'react-icons/md'

type Props = {
  billingPeriod: BillingPeriodType
  onClose: () => void
}

const EditBillingPeriodRow = ({ billingPeriod, onClose }: Props) => {
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState(billingPeriod.startDate?.split('T')[0] || '')
  const [endDate, setEndDate] = useState(billingPeriod.endDate?.split('T')[0] || '')

  const handleSave = () => {
    dispatch(updateBillingPeriodThunk({
      id: billingPeriod.id,
      data: {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      },
    })).then(() => onClose())
  }

  return (
    <HStack
      padding={3}
      borderRadius={8}
      borderWidth="1px"
      borderColor="blue.500"
      gap={2}
    >
      <Input
        size="sm"
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        flex={1}
      />
      <Input
        size="sm"
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
        flex={1}
      />
      <IconButton aria-label="Сохранить" size="xs" variant="ghost" colorPalette="green" onClick={handleSave}>
        <MdCheck />
      </IconButton>
      <IconButton aria-label="Отмена" size="xs" variant="ghost" onClick={onClose}>
        <MdClose />
      </IconButton>
    </HStack>
  )
}

export default EditBillingPeriodRow
