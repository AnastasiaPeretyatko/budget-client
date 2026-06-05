import { AppDispatch, RootState } from '@/app/store'
import { createTransactionThunk } from '@/entities/transaction'
import { fetchSavingAccountByIdThunk } from '@/entities/saving-account'
import { CategorySearchSelect } from '@/features/category-management'
import { SavingAccountSearchSelect } from '@/features/saving-account-management'
import FieldInput from '@/shared/ui/FieldInput'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowRightLong } from 'react-icons/fa6'
import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'

type Props = {
  onClose: () => void
}

const TransferTransactionModal = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [fromAccountId, setFromAccountId] = useState('')
  const [toAccountId, setToAccountId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!amount.trim()) newErrors.amount = 'Обязательное поле'
    if (!description.trim()) newErrors.description = 'Обязательное поле'
    if (!fromAccountId) newErrors.fromAccountId = 'Обязательное поле'
    if (!toAccountId) newErrors.toAccountId = 'Обязательное поле'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setIsLoading(true)
    try {
      await dispatch(createTransactionThunk({
        fromAccountId: fromAccountId || undefined,
        toAccountId: toAccountId || undefined,
        categoryId: categoryId || undefined,
        amount,
        description: description || null,
        date: new Date(date),
        type: TransactionTypeEnum.TRANSFER
      })).unwrap()
      if (activeSavingAccount) {
        dispatch(fetchSavingAccountByIdThunk(activeSavingAccount.id))
      }
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack width={'100%'} gap={4}>
      <HStack width={'100%'} gap={4} align={'end'}>
        <SavingAccountSearchSelect label='From' value={fromAccountId} onChange={(val) => { setFromAccountId(val); setErrors((prev) => ({ ...prev, fromAccountId: '' })) }} invalid={!!errors.fromAccountId} errorText={errors.fromAccountId}/>
        <FaArrowRightLong style={{ minWidth: 20, fontSize: 16, margin: '0 8px 8px' }} />
        <SavingAccountSearchSelect label='To' value={toAccountId} onChange={(val) => { setToAccountId(val); setErrors((prev) => ({ ...prev, toAccountId: '' })) }} invalid={!!errors.toAccountId} errorText={errors.toAccountId}/>
      </HStack>
      <HStack width={'100%'} gap={4}>
        <FieldInput label="Amount" onChange={(e) => { setAmount(e.target.value); setErrors((prev) => ({ ...prev, amount: '' })) }} required invalid={!!errors.amount} errorText={errors.amount}/>
        <FieldInput label="Description" onChange={(e) => { setDescription(e.target.value); setErrors((prev) => ({ ...prev, description: '' })) }} required invalid={!!errors.description} errorText={errors.description}/>
      </HStack>
      <CategorySearchSelect label='Category' value={categoryId} onChange={(val) => setCategoryId(val)}/>
      <FieldInput label='Event day' onChange={(e) => setDate(e.target.value)} type='date'/>
      <Button width={'100%'} size="sm" borderRadius={10} onClick={handleSave} loading={isLoading}>
        Save
      </Button>
    </VStack>
  )
}

export default TransferTransactionModal
