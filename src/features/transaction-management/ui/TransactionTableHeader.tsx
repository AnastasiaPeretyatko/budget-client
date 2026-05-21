/* eslint-disable max-len */
import { AppDispatch, RootState } from '@/app/store'
import { Button, HStack, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SavingAccountSelect } from '@/features/saving-account-management'
import { fetchTransactionsThunk } from '@/entities/transaction'

const TransactionTableHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { activeWorkspaceId } = useSelector((state: RootState) => state.workspaces)

  const [filter, setFilter] = useState<{ fromAccountId?: string; toAccountId?: string; categoryId?: string }>({})
  const isDisplayReset = Object.keys(filter).length > 0

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === 'Enter') // dispatch(fetchTransactionsThunk({}))
  }

  useEffect(() => {
    if (!activeWorkspaceId) return

    dispatch(
      fetchTransactionsThunk({
        filter: {
          ...filter,
          workspaceId: activeWorkspaceId,
        },
      }),
    )
  }, [dispatch, filter, activeWorkspaceId])

  return (
    <HStack width={'100%'} backgroundColor={'#111111'} padding={2} borderRadius={8}>
      <Input placeholder='Поиск' size={'sm'} width={80} onKeyDown={handleKeyDown}/>
      <HStack width='100%' justify={'end'}>
        <SavingAccountSelect
          onChange={(val) => setFilter(prev => ({ ...prev, fromAccountId: val }))}
          placeholder='От'
          maxWidth='30%'
          value={filter?.fromAccountId || ''}
        />
        <SavingAccountSelect
          onChange={(val) => setFilter(prev => ({ ...prev, toAccountId: val }))}
          placeholder='До'
          maxWidth='30%'
          value={filter?.toAccountId}
        />
        {
          isDisplayReset && <Button size={'xs'} variant={'surface'} onClick={() => setFilter({})}>Reset</Button>
        }
      </HStack>
    </HStack>
  )
}

export default TransactionTableHeader
