import { PlanRange } from '@/entities/statistics'
import { Tabs } from '@chakra-ui/react'
import moment from 'moment'

type Props = {
  value: PlanRange
  onChange: (range: PlanRange) => void
  // Длина текущего цикла — для подписи вкладки
  cycleDays?: number | null
}

const getTabs = (cycleDays?: number | null): { value: PlanRange, label: string }[] => [
  { value: 'all', label: 'За всё время' },
  { value: 'cycle', label: cycleDays ? `Текущий цикл (${cycleDays} дн.)` : 'Текущий цикл' },
  { value: 'half_year', label: 'Последние 6 мес.' },
  {
    value: 'year',
    label: `${moment().subtract(1, 'year').year()}-${moment().year()}г. (последний год)`
  },
]

const PlanRangeTabs = ({ value, onChange, cycleDays }: Props) => {
  return (
    <Tabs.Root
      size={'sm'}
      variant={'primary'}
      value={value}
      onValueChange={e => onChange(e.value as PlanRange)}
    >
      <Tabs.List padding={1}>
        {getTabs(cycleDays).map(tab => (
          <Tabs.Trigger key={tab.value} value={tab.value}>{tab.label}</Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
    </Tabs.Root>
  )
}

export default PlanRangeTabs
