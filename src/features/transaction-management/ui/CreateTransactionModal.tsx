import { Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { SavingAccountSearchSelect } from '@/features/saving-account-management'
import { CategorySearchSelect } from '@/features/category-management'

const CreateTransactionModal = () => {
  const [fromAccountId, setFromAccountId] = useState<string>()
  const [toAccountId, setToAccountId] = useState<string>()
  const [categoryId, setCategoryId] = useState<string>()

  return (
    <VStack>
      <Heading>Create transaction</Heading>
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
      <Input type="date" defaultValue={moment(new Date()).format('YYYY-MM-DD')}/>
      <Textarea placeholder='Описание'/>
      <Input placeholder="Сумма"/>
    </VStack>
  )
}

export default CreateTransactionModal
