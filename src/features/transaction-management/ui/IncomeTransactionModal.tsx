import { AppDispatch, RootState } from '@/app/store'
import { createTransactionThunk } from '@/entities/transaction'
import { fetchSavingAccountByIdThunk } from '@/entities/saving-account'
import { CategorySearchSelect } from '@/features/category-management'
import FieldInput from '@/shared/ui/FieldInput'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  onClose: () => void
}

const IncomeTransactionModal = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (!activeSavingAccount) return
    setIsLoading(true)
    try {
      await dispatch(createTransactionThunk({
        toAccountId: activeSavingAccount.id,
        categoryId: categoryId || undefined,
        amount,
        description: description || null,
        date: new Date(date),
      })).unwrap()
      dispatch(fetchSavingAccountByIdThunk(activeSavingAccount.id))
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack width={'100%'} gap={4}>
      <HStack width={'100%'} gap={4}>
        <FieldInput label="Amount" onChange={(val) => setAmount(val)} required/>
        <FieldInput label="Description" onChange={(val) => setDescription(val)} required/>
      </HStack>
      <CategorySearchSelect label='Category' value={categoryId} onChange={(val) => setCategoryId(val)}/>
      <FieldInput label='Event day' onChange={(val) => setDate(val)} type='date'/>
      <Button width={'100%'} size="sm" borderRadius={10} onClick={handleSave} loading={isLoading}>
        Save
      </Button>
    </VStack>
  )
}

export default IncomeTransactionModal
