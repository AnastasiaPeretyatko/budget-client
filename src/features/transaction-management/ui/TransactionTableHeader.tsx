/* eslint-disable max-len */
import { AppDispatch } from '@/app/store'
import { Button, HStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SavingAccountSearchSelect } from '@/features/saving-account-management'
import { fetchTransactionsThunk } from '@/entities/transaction'
import FilterTransitionPopover from './FilterTransitionPopover'

const TransactionTableHeader = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [filter, setFilter] = useState<{ fromAccountId?: string; toAccountId?: string; categoryId?: string }>({})
  const isDisplayReset = Object.keys(filter).length > 0

  useEffect(() => {
    dispatch(fetchTransactionsThunk({ filter }))
  }, [dispatch, filter])

  return (
    <HStack width={'100%'} backgroundColor={'#111111'} padding={2} borderRadius={8} justify={'space-between'}>
      <HStack width='50%'>
        <SavingAccountSearchSelect onChange={(val) => setFilter(prev => ({ ...prev, fromAccountId: val }))} value={filter?.fromAccountId || ''}/>
        <SavingAccountSearchSelect onChange={(val) => setFilter(prev => ({ ...prev, fromAccountId: val }))} value={filter?.toAccountId || ''}/>
        {
          isDisplayReset && <Button size={'xs'} variant={'surface'} onClick={() => setFilter({})}>Reset</Button>
        }
      </HStack>

      <FilterTransitionPopover/>
      {/* <HStack>
        <Button size={'sm'}>WEEKLY</Button>
        <Button size={'sm'}>MONTH</Button>
        <BaseDatePicker selectionMode='range'/>
      </HStack> */}
    </HStack>
  )
}

export default TransactionTableHeader
