import { AppDispatch } from '@/app/store'
import { createTransactionThunk } from '@/entities/transaction'
import { CategorySearchSelect } from '@/features/category-management'
import { SavingAccountSearchSelect } from '@/features/saving-account-management'
import FieldInput from '@/shared/ui/FieldInput'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaArrowRightLong } from 'react-icons/fa6'

type Props = {
  onClose: () => void
}

const TransferTransactionModal = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [fromAccountId, setFromAccountId] = useState('')
  const [toAccountId, setToAccountId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await dispatch(createTransactionThunk({
        fromAccountId: fromAccountId || undefined,
        toAccountId: toAccountId || undefined,
        categoryId: categoryId || undefined,
        amount,
        description: description || null,
        date: new Date(date),
      })).unwrap()
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack width={'100%'} gap={4}>
      <HStack width={'100%'} gap={4} align={'end'}>
        <SavingAccountSearchSelect label='From' value={fromAccountId} onChange={(val) => setFromAccountId(val)}/>
        <FaArrowRightLong style={{ minWidth: 20, fontSize: 16, margin: '0 8px 8px' }} />
        <SavingAccountSearchSelect label='To' value={toAccountId} onChange={(val) => setToAccountId(val)}/>
      </HStack>
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

export default TransferTransactionModal
