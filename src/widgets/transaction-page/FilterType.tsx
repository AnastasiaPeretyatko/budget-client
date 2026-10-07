import { TransactionTypeEnum } from '@/entities/transaction'
import { Tabs } from '@chakra-ui/react'

// у Tabs значение должно быть строкой, поэтому для "Все" используем 'all' вместо null
const typeFilters = [
  { label: 'Все', value: 'all' },
  { label: 'Расходы', value: TransactionTypeEnum.EXPENSE },
  { label: 'Доходы', value: TransactionTypeEnum.INCOME },
  { label: 'Переводы', value: TransactionTypeEnum.TRANSFER },
]

type Props = {
  filter: TransactionTypeEnum | 'all'
  onChangeFilter: (type: TransactionTypeEnum | 'all') => void
}

const FilterType = ({ filter, onChangeFilter }: Props) => {
  return (
    <Tabs.Root
      value={filter}
      onValueChange={e => onChangeFilter(e.value as TransactionTypeEnum | 'all')}
      variant={'plain'}
      size={'sm'}
      width={'fit-content'}
      css={{ '--tabs-height': '24px', '--tabs-trigger-radius': '8px' }}
    >
      <Tabs.List bg={'#F1F5F9'} borderRadius={'12px'} p={'4px'} gap={0} boxShadow={'sm'}>
        {
          typeFilters.map(type => (
            <Tabs.Trigger
              key={type.value}
              value={type.value}
              px={'12px'}
              py={'4px'}
              fontSize={'12px'}
              color={'#475569'}
              _selected={{ color: '#1E293B' }}
            >
              {type.label}
            </Tabs.Trigger>
          ))
        }
        {/* Indicator — это и есть «плавающий» белый фон: сам замеряет выбранную кнопку и переезжает к ней */}
        <Tabs.Indicator bg={'white'} borderRadius={'8px'} boxShadow={'xs'} />
      </Tabs.List>
    </Tabs.Root>
  )
}

export default FilterType
