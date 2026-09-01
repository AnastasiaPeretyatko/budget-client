import { AppDispatch, RootState } from '@/app/store'
import { createTransactionThunk } from '@/entities/transaction'
import { fetchSavingAccountByIdThunk } from '@/entities/saving-account'
import { CategorySearchSelect } from '@/features/category-management'
import { SavingAccountSearchSelect } from '@/features/saving-account-management'
import FieldInput from '@/shared/ui/FieldInput'
import BaseDatePicker from '@/shared/ui/date-picker'
import { SearchSelectOption } from '@/shared/ui/search-select'
import { Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowRightLong } from 'react-icons/fa6'
import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'
import { useNotifications } from '@/shared/hooks/useNotifications'

type Props = {
  onClose: () => void
}

const TransferTransactionModal = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [categoryId, setCategoryId] = useState('')
  const [fromOption, setFromOption] = useState<SearchSelectOption | undefined>(
    activeSavingAccount
      ? { label: activeSavingAccount.name, value: activeSavingAccount.id }
      : undefined
  )
  const [toOption, setToOption] = useState<SearchSelectOption | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSwap = () => {
    setFromOption(toOption)
    setToOption(fromOption)
    setErrors((prev) => ({ ...prev, fromAccountId: '', toAccountId: '' }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!amount.trim()) newErrors.amount = 'Обязательное поле'
    if (!description.trim()) newErrors.description = 'Обязательное поле'
    if (!fromOption?.value) newErrors.fromAccountId = 'Обязательное поле'
    if (!toOption?.value) newErrors.toAccountId = 'Обязательное поле'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setIsLoading(true)
    dispatch(createTransactionThunk({
      fromAccountId: fromOption?.value || undefined,
      toAccountId: toOption?.value || undefined,
      categoryId: categoryId || undefined,
      amount,
      description: description || null,
      date: new Date(date),
      type: TransactionTypeEnum.TRANSFER
    }))
      .unwrap()
      .then(() => {
        showSuccessMessage('Transaction created')
        if (activeSavingAccount) {
          dispatch(fetchSavingAccountByIdThunk(activeSavingAccount.id))
        }
        onClose()
      })
      .catch((err: string) => showErrorMessage(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <VStack width={'100%'} gap={4}>
      <HStack width={'100%'} gap={4} align={'end'}>
        <SavingAccountSearchSelect label='From' value={fromOption} onChange={(_, option) => { setFromOption(option); setErrors((prev) => ({ ...prev, fromAccountId: '' })) }} invalid={!!errors.fromAccountId} errorText={errors.fromAccountId}/>
        <IconButton aria-label='Поменять местами' variant='ghost' size='sm' onClick={handleSwap} mb='4px'>
          <FaArrowRightLong style={{ minWidth: 20, fontSize: 16 }} />
        </IconButton>
        <SavingAccountSearchSelect label='To' value={toOption} onChange={(_, option) => { setToOption(option); setErrors((prev) => ({ ...prev, toAccountId: '' })) }} invalid={!!errors.toAccountId} errorText={errors.toAccountId}/>
      </HStack>
      <HStack width={'100%'} gap={4}>
        <FieldInput label="Amount" onChange={(e) => { setAmount(e.target.value); setErrors((prev) => ({ ...prev, amount: '' })) }} required invalid={!!errors.amount} errorText={errors.amount}/>
        <FieldInput label="Description" onChange={(e) => { setDescription(e.target.value); setErrors((prev) => ({ ...prev, description: '' })) }} required invalid={!!errors.description} errorText={errors.description}/>
      </HStack>
      <CategorySearchSelect label='Category' onChange={(val) => setCategoryId(val)}/>
      <BaseDatePicker selectionMode='single' label='Event day' defaultDate={date} onChangeValue={(dates) => setDate(dates[0])} />
      <Button width={'100%'} size="sm" borderRadius={10} onClick={handleSave} loading={isLoading}>
        Save
      </Button>
    </VStack>
  )
}

export default TransferTransactionModal
