import { useAppDispatch } from '@/app/store'
import { archiveBillingPeriodThunk, BillingPeriodType } from '@/entities/bulling-period'
import BaseTag from '@/shared/ui/tag'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { MdArchive, MdEdit } from 'react-icons/md'
import EditBillingPeriodRow from './EditBillingPeriodRow'
import moment from 'moment'

const BillingCard = ({ billing }: {billing: BillingPeriodType}) => {
  const dispatch = useAppDispatch()
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleArchive = (id: string) => {
    dispatch(archiveBillingPeriodThunk(id))
  }

  if (editingId === billing.id) {
    return (
      <EditBillingPeriodRow
        key={billing.id}
        billingPeriod={billing}
        onClose={() => setEditingId(null)}
      />
    )
  }

  return (
    <HStack width={'100%'} cursor={'pointer'}>
      <HStack width={'100%'}>
        <Text fontSize={'sm'}>{moment(billing.startDate).format('DD.MM.YYYY')} - {moment(billing.endDate).format('DD.MM.YYYY')}</Text>
        <BaseTag colorPalette={billing.status === 'active' ? 'green' : 'gray'}>
          {billing.status === 'active' ? 'Активный' : 'Завершён'}
        </BaseTag>
      </HStack>
      <HStack gap={1}>
        <IconButton
          aria-label="Редактировать"
          size="xs"
          variant="ghost"
          onClick={() => setEditingId(billing.id)}
        >
          <MdEdit />
        </IconButton>
        {billing.status === 'active' && (
          <IconButton
            aria-label="В архив"
            size="xs"
            variant="ghost"
            colorPalette="orange"
            onClick={() => handleArchive(billing.id)}
          >
            <MdArchive />
          </IconButton>
        )}
      </HStack>
    </HStack>
  )
}

export default BillingCard
