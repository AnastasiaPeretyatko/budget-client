import React, { useEffect, useState } from 'react'
import RadioMenu from './radio-menu'
import { TransactionTypeEnum } from '@/entities/transaction'
import { Button, Text } from '@chakra-ui/react'

const typeFilters = [
  { label: 'Все', value: null },
  { label: 'Расходы', value: TransactionTypeEnum.EXPENSE },
  { label: 'Доходы', value: TransactionTypeEnum.INCOME },
  { label: 'Переводы', value: TransactionTypeEnum.TRANSFER },
]

type Props = {
  onChangeType: (type: TransactionTypeEnum | null) => void;
}

const FilterTransactionType = ({ onChangeType }: Props) => {
  const [activeType, setActiveType] = useState<TransactionTypeEnum | null>(null)

  const handleTypeChange = (value: TransactionTypeEnum | null) => {
    setActiveType(prev => prev === value ? null : value)
  }

  useEffect(() => {
    onChangeType(activeType)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType])

  return (
    <RadioMenu
      items={typeFilters}
      onChange={handleTypeChange}
      triggerButton={<Button size={'xs'}>Фильтр{activeType && <Text>| {typeFilters.find(el => el.value === activeType)?.label}</Text>}</Button>}
      value={activeType}
    />
  )
}

export default FilterTransactionType
