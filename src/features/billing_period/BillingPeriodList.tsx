import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  fetchBillingPeriodsThunk,
  archiveBillingPeriodThunk,
  BillingPeriodType,
} from '@/entities/bulling-period'
import { useEffect, useState } from 'react'
import { VStack, HStack, Text, IconButton, Spinner, Badge } from '@chakra-ui/react'
import { MdArchive, MdEdit } from 'react-icons/md'
import moment from 'moment'
import EditBillingPeriodRow from './EditBillingPeriodRow'

const BillingPeriodList = () => {
  const dispatch = useAppDispatch()
  const { billingPeriods, isLoading } = useAppSelector(state => state.billingPeriod)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchBillingPeriodsThunk())
  }, [dispatch])

  const handleArchive = (id: string) => {
    dispatch(archiveBillingPeriodThunk(id))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <VStack align="stretch" gap={3} width="100%">
      {billingPeriods.length === 0 && (
        <Text color="gray.500" fontSize="sm">Нет периодов</Text>
      )}
      {billingPeriods.map(bp => (
        editingId === bp.id ? (
          <EditBillingPeriodRow
            key={bp.id}
            billingPeriod={bp}
            onClose={() => setEditingId(null)}
          />
        ) : (
          <HStack
            key={bp.id}
            padding={3}
            borderRadius={8}
            borderWidth="1px"
            borderColor="gray.700"
            justifyContent="space-between"
            opacity={bp.status === 'completed' ? 0.6 : 1}
          >
            <HStack gap={3}>
              <VStack align="start" gap={0}>
                <Text fontWeight={600} fontSize="sm">
                  {moment(bp.startDate).format('DD.MM.YYYY')} — {moment(bp.endDate).format('DD.MM.YYYY')}
                </Text>
              </VStack>
              <Badge
                colorPalette={bp.status === 'active' ? 'green' : 'gray'}
                size="sm"
              >
                {bp.status === 'active' ? 'Активный' : 'Завершён'}
              </Badge>
            </HStack>
            <HStack gap={1}>
              <IconButton
                aria-label="Редактировать"
                size="xs"
                variant="ghost"
                onClick={() => setEditingId(bp.id)}
              >
                <MdEdit />
              </IconButton>
              {bp.status === 'active' && (
                <IconButton
                  aria-label="В архив"
                  size="xs"
                  variant="ghost"
                  colorPalette="orange"
                  onClick={() => handleArchive(bp.id)}
                >
                  <MdArchive />
                </IconButton>
              )}
            </HStack>
          </HStack>
        )
      ))}
    </VStack>
  )
}

export default BillingPeriodList
