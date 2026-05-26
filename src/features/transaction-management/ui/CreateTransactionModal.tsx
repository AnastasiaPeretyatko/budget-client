import { Button, Grid, GridItem, Heading, HStack, Input, Textarea, VStack } from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { createTransactionThunk } from '@/entities/transaction'
import { SavingAccountSearchSelect } from '@/features/saving-account-management'
import { CategorySearchSelect } from '@/features/category-management'

const CreateTransactionModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { activeWorkspaceId } = useSelector((state: RootState) => state.workspaces)

  const [fromAccountId, setFromAccountId] = useState<string>()
  const [toAccountId, setToAccountId] = useState<string>()
  const [categoryId, setCategoryId] = useState<string>()
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  const resetForm = () => {
    setFromAccountId(undefined)
    setToAccountId(undefined)
    setCategoryId(undefined)
    setDate(moment(new Date()).format('YYYY-MM-DD'))
    setDescription('')
    setAmount('')
  }

  const handleSave = () => {
    if (!activeWorkspaceId || !amount) return

    dispatch(createTransactionThunk({
      fromAccountId,
      toAccountId,
      categoryId,
      amount,
      description: description || null,
      date: new Date(date),
    }))

    resetForm()
  }

  return (
    <VStack width={'50%'} padding={4} gap={4} borderRadius={8} border={'1px solid gray'}>
      <Heading>Create transaction</Heading>
      <Grid templateColumns="1fr 1fr" gap={4} width={'100%'}>
        <GridItem display="flex" flexDirection="column" gap={4}>
          <SavingAccountSearchSelect
            value={fromAccountId}
            onChange={setFromAccountId}
            placeholder="Откуда"
          />
          <SavingAccountSearchSelect
            value={toAccountId}
            onChange={setToAccountId}
            placeholder="Куда"
          />
          <CategorySearchSelect
            value={categoryId}
            onChange={setCategoryId}
          />
        </GridItem>
        <GridItem display="flex" flexDirection="column" gap={4}>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)}/>
          <Textarea placeholder='Описание' value={description} onChange={e => setDescription(e.target.value)}/>
          <Input placeholder="Сумма" value={amount} onChange={e => setAmount(e.target.value)}/>
        </GridItem>
      </Grid>

      <HStack maxW={'100%'}>
        <Button minW={'100%'} onClick={handleSave}>Сохранить</Button>
        <Button onClick={resetForm}>X</Button>
      </HStack>
    </VStack>
  )
}

export default CreateTransactionModal
