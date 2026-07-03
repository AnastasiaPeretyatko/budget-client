import { AppDispatch } from '@/app/store'
import { TransactionType, TransactionTypeEnum, updateTransactionThunk } from '@/entities/transaction'
import { CategorySearchSelect } from '@/features/category-management'
import { SavingAccountSearchSelect } from '@/features/saving-account-management'
import TagSelectInput, { TagSelectOption } from '@/features/tag-management/ui/TagSelectInput'
import BaseDatePicker from '@/shared/ui/date-picker'
import FieldInput from '@/shared/ui/FieldInput'
import BaseModal from '@/shared/ui/modal'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaArrowRightLong } from 'react-icons/fa6'

type Props = {
  transaction: TransactionType
  trigger: React.ReactNode
}

const EditTransactionModal = ({ transaction, trigger }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  const [amount, setAmount] = useState(transaction.amount)
  const [description, setDescription] = useState(transaction.description ?? '')
  const [date, setDate] = useState(new Date(transaction.date).toISOString().split('T')[0])
  const [categoryId, setCategoryId] = useState(transaction.category?.id ?? '')
  const [tagIds, setTagIds] = useState<string[]>(transaction.tags?.map(t => t.id) ?? [])
  // eslint-disable-next-line max-len
  const initialTagOptions: TagSelectOption[] = (transaction.tags ?? []).map(t => ({ label: t.name, value: t.id, color: t.color }))
  const [fromAccountId, setFromAccountId] = useState(transaction.fromAccount?.id ?? '')
  const [toAccountId, setToAccountId] = useState(transaction.toAccount?.id ?? '')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isTransfer = transaction.type === TransactionTypeEnum.TRANSFER
  const isIncome = transaction.type === TransactionTypeEnum.INCOME

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!amount.trim()) newErrors.amount = 'Обязательное поле'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = (close: () => void) => {
    if (!validate()) return
    setIsLoading(true)
    dispatch(updateTransactionThunk({
      id: transaction.id,
      data: {
        amount,
        description: description || null,
        date: new Date(date),
        categoryId: categoryId || undefined,
        tagIds,
        fromAccountId: fromAccountId || undefined,
        toAccountId: toAccountId || undefined,
      }
    }))
      .unwrap()
      .then(() => {
        showSuccessMessage('Транзакция обновлена')
        close()
      })
      .catch((err: string) => showErrorMessage(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <BaseModal
      title='Редактирование транзакции'
      buttonTrigger={trigger}
      onClickSave={handleSave}
      confirmLabel={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <VStack width='100%' gap={4}>
        {isTransfer && (
          <HStack width='100%' gap={4} align='end'>
            <SavingAccountSearchSelect
              label='Откуда'
              value={fromAccountId}
              onChange={(val) => setFromAccountId(val)}
            />
            <FaArrowRightLong style={{ minWidth: 20, fontSize: 16, margin: '0 8px 8px' }} />
            <SavingAccountSearchSelect
              label='Куда'
              value={toAccountId}
              onChange={(val) => setToAccountId(val)}
            />
          </HStack>
        )}
        {!isTransfer && !isIncome && (
          <SavingAccountSearchSelect
            label='Счёт списания'
            value={fromAccountId}
            onChange={(val) => setFromAccountId(val)}
          />
        )}
        {!isTransfer && isIncome && (
          <SavingAccountSearchSelect
            label='Счёт зачисления'
            value={toAccountId}
            onChange={(val) => setToAccountId(val)}
          />
        )}
        <HStack width='100%' gap={4}>
          <FieldInput
            label='Сумма'
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setErrors((prev) => ({ ...prev, amount: '' })) }}
            required
            invalid={!!errors.amount}
            errorText={errors.amount}
          />
          <FieldInput
            label='Описание'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </HStack>
        <CategorySearchSelect
          label='Категория'
          value={categoryId}
          onChange={(val) => setCategoryId(val)}
        />
        <TagSelectInput label='Теги' defaultSelected={initialTagOptions} onChange={setTagIds} />
        <BaseDatePicker
          selectionMode='single'
          label='Дата'
          defaultDate={date}
          onChangeValue={(dates) => setDate(dates[0])}
        />
      </VStack>
    </BaseModal>
  )
}

export default EditTransactionModal
