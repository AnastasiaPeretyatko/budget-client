import { useGetPeriodsQuery } from '@/entities/billing-period/api/billing-periodApi';
import formatPeriod from '@/shared/utils/formatPeriod';
import { createListCollection, Portal, Select } from '@chakra-ui/react';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setSelectedPeriodId } from '@/entities/billing-period';

const BillingPeriodSelect = () => {
  const dispatch = useAppDispatch()
  const { data: billingPeriods, isLoading } = useGetPeriodsQuery()
  const currentId = useAppSelector(state => state.selectedPeriod.selectedPeriodId)

  useEffect(() => {
    if (!billingPeriods) return
    const exists = (id: string | null) => !!id && billingPeriods.some(b => b.id === id)
    if (exists(currentId)) return

    const storedId = localStorage.getItem('period')
    const activeId = billingPeriods.find(b => b.status === 'active')?.id
    dispatch(setSelectedPeriodId(exists(storedId) ? storedId : activeId ?? null))
  }, [billingPeriods, currentId, dispatch])

  const collection = useMemo(
    () => createListCollection({
      items: (billingPeriods || []).map(b => ({
        label: formatPeriod(b.startDate, b.endDate),
        value: b.id,
      })),
    }),
    [billingPeriods],
  )

  const onSelectPeriod = (e: { value: string[] }) => {
    dispatch(setSelectedPeriodId(e.value[0]))
    localStorage.setItem('period', e.value[0])
  }

  return (
    <Select.Root
      variant={'primary'}
      collection={collection}
      value={currentId ? [currentId] : []}
      onValueChange={onSelectPeriod}
      disabled={isLoading}
    >
      <Select.HiddenSelect />
      <Select.Control >
        <Select.Trigger justifyContent={'start'} gap={2}>
          <CalendarIcon size={'16px'} color='#94A3B8'/>
          <Select.ValueText placeholder="Select framework"/>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default BillingPeriodSelect
