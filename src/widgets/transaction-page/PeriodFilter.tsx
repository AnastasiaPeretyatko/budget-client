"use client"

import { BillingPeriodType } from '@/entities/bulling-period'
import { COLOR } from '@/shared/config/colors'
import { Box, Button, HStack, Popover, Portal, Text, VStack } from '@chakra-ui/react'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu'
import { useState } from 'react'
import moment from 'moment'

type Props = {
  periods: BillingPeriodType[]
  value?: string
  onChange: (periodId: string | undefined) => void
  allLabel?: string
}

const formatPeriod = (period: BillingPeriodType) =>
  `${moment(period.startDate).format('DD MMM')} – ${moment(period.endDate).format('DD MMM YY')}`

const PeriodFilter = ({ periods, value, onChange, allLabel = 'Все периоды' }: Props) => {
  const [open, setOpen] = useState(false)

  const selected = periods.find((p) => p.id === value)

  const handleSelect = (periodId: string | undefined) => {
    onChange(periodId)
    setOpen(false)
  }

  return (
    <Popover.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      lazyMount
      unmountOnExit
      positioning={{ placement: 'bottom-start' }}
    >
      <Popover.Trigger asChild>
        <Button
          size="xs"
          variant="outline"
          borderRadius="full"
          fontSize="xs"
          borderColor={selected ? 'blue.500' : COLOR.BORDER}
          color={selected ? 'blue.400' : undefined}
          gap={1}
          px={3}
        >
          <Text color={COLOR.LABEL} fontSize="xs" fontWeight={400}>Период:</Text>
          {selected ? formatPeriod(selected) : allLabel}
          {open ? <LuChevronUp size={12} /> : <LuChevronDown size={12} />}
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            width="260px"
            p={2}
            borderColor={COLOR.BORDER}
            borderRadius={12}
            boxShadow="lg"
          >
            <VStack align="stretch" gap={0} maxH="280px" overflowY="auto">
              <HStack
                px={3}
                py={2}
                borderRadius={8}
                cursor="pointer"
                _hover={{ bg: 'gray.800' }}
                onClick={() => handleSelect(undefined)}
              >
                <Text fontSize="sm" fontWeight={!value ? 600 : 400}>{allLabel}</Text>
              </HStack>

              {periods.length === 0 && (
                <Text fontSize="sm" color={COLOR.LABEL} px={3} py={2}>Нет периодов</Text>
              )}

              {periods.map((period) => (
                <HStack
                  key={period.id}
                  px={3}
                  py={2}
                  borderRadius={8}
                  cursor="pointer"
                  justify="space-between"
                  _hover={{ bg: 'gray.800' }}
                  onClick={() => handleSelect(period.id)}
                >
                  <Text fontSize="sm" fontWeight={value === period.id ? 600 : 400}>
                    {formatPeriod(period)}
                  </Text>
                  {period.status === 'active' && (
                    <Box w="8px" h="8px" borderRadius="full" bg="green.400" flexShrink={0} />
                  )}
                </HStack>
              ))}
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

export default PeriodFilter
