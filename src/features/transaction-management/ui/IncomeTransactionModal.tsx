import { AppDispatch, RootState } from '@/app/store'
import { createTransactionThunk } from '@/entities/transaction'
import { fetchSavingAccountByIdThunk } from '@/entities/saving-account'
import { CategorySearchSelect } from '@/features/category-management'
import FieldInput from '@/shared/ui/FieldInput'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'

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
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!amount.trim()) newErrors.amount = 'Обязательное поле'
    if (!description.trim()) newErrors.description = 'Обязательное поле'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!activeSavingAccount) return
    if (!validate()) return
    setIsLoading(true)
    try {
      await dispatch(createTransactionThunk({
        toAccountId: activeSavingAccount.id,
        categoryId: categoryId || undefined,
        amount,
        description: description || null,
        date: new Date(date),
        type: TransactionTypeEnum.INCOME
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

export default IncomeTransactionModal
