import { AppDispatch } from '@/common/store.config'
import { Button, HStack, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import SelectListSavingAccount from './SelectListSavingAccount'
import { useRouter } from 'next/router'
import { getAllTransactionThunk } from '@/entities/transaction/api/transaction.thunk'

const HeaderTransitionTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const [filter, setFilter] = useState({})
  console.log({ filter });
  const isDisplayReset = Object.keys(filter).length > 0

  const workspaceId = typeof router.query.id === 'string' ? router.query.id : undefined

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === 'Enter') // dispatch(getAllTransactionThunk({}))
  }

  useEffect(() => {
    if (!workspaceId) return

    dispatch(
      getAllTransactionThunk({
        filter: {
          ...filter,
          workspaceId,
        },
      }),
    )
  }, [dispatch, filter, workspaceId])

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
