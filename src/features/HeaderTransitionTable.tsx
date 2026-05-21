import { AppDispatch, RootState } from '@/common/store.config'
import { Button, HStack, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SelectListSavingAccount from './SelectListSavingAccount'
import { getAllTransactionThunk } from '@/entities/transaction/api/transaction.thunk'

const HeaderTransitionTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { activeWorkspaceId } = useSelector((state: RootState) => state.workspaces)

  const [filter, setFilter] = useState<{ fromAccountId?: string; toAccountId?: string; categoryId?: string }>({})
  const isDisplayReset = Object.keys(filter).length > 0

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === 'Enter') // dispatch(getAllTransactionThunk({}))
  }

  useEffect(() => {
    if (!activeWorkspaceId) return

    dispatch(
      getAllTransactionThunk({
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
        <SelectListSavingAccount
          onChange={(val) => setFilter(prev => ({ ...prev, fromAccountId: val }))}
          placeholder='От'
          maxWidth='30%'
          value={filter?.fromAccountId || ''}
        />
        <SelectListSavingAccount
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

export default HeaderTransitionTable
