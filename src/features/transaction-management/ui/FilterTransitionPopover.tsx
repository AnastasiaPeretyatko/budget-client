import { AppDispatch } from '@/app/store'
import { fetchTransactionsThunk } from '@/entities/transaction'
import BaseDatePicker from '@/shared/ui/date-picker'
import BasePopover from '@/shared/ui/popover'
import { Button, Heading, IconButton, RadioGroup, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { CiFilter } from 'react-icons/ci'
import { useDispatch } from 'react-redux'

const List = [
  { value: "WEEKLY", label: "Weekly" },
  { value: "Month", label: "Month" }
]

const FilterTransitionPopover = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [filterDate, setFilterDate] = useState<string[]>([])

  const handleChengeDate = (dates: string[]) => setFilterDate(dates)

  const fetchTransaction = () => {
    dispatch(fetchTransactionsThunk({ filter: { between: filterDate } }))
  }

  return (
    <BasePopover
      TriggerButton={<IconButton size={'sm'}><CiFilter /></IconButton>}
    >
      <VStack width={'100%'} gap={4} alignItems={'start'}>
        <Heading size={'lg'}>Filter</Heading>
        <RadioGroup.Root value={filterDate} onValueChange={(e) => setFilterDate(e.value)} display={'flex'} width={'100%'} flexDir={'column'} gap={4}>
          {List.map(item =>          (
            <RadioGroup.Item key={item.label} value={item.value}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText >{item.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
        <Heading size={'md'}>Select an interval</Heading>
        <BaseDatePicker selectionMode='range' onChangeValue={handleChengeDate}/>
        <Button width={'100%'} size={'xs'} onClick={fetchTransaction}>Apply</Button>
      </VStack>

    </BasePopover>
  )
}

export default FilterTransitionPopover
