import { RootState } from '@/app/store';
import { TransactionTypeEnum } from '@/entities/transaction';
import { SavingAccountSearchSelect } from '@/features/saving-account-management';
import { SearchSelectOption } from '@/shared/ui/search-select';
import { HStack, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

type Props = {
  type: TransactionTypeEnum;
  onChange: (data: {fromAccountId?: string, toAccountId?: string}) => void;
}

const SavingAccountSearchSelectGroup = ({ type, onChange }: Props) => {
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)

  const [errors, setErrors] = useState<Record<string, string>>({})

  const [fromOption, setFromOption] = useState<SearchSelectOption | undefined>(
    activeSavingAccount
      ? { label: activeSavingAccount.name, value: activeSavingAccount.id }
      : undefined
  )
  const [toOption, setToOption] = useState<SearchSelectOption | undefined>(undefined)

  const handleSwap = () => {
    setFromOption(toOption)
    setToOption(fromOption)
    setErrors((prev) => ({ ...prev, fromAccountId: '', toAccountId: '' }))
  }

  useEffect(() => {
    onChange({ fromAccountId: fromOption?.value, toAccountId: toOption?.value })
  }, [fromOption, onChange, toOption])

  return (
    <HStack width={'100%'} gap={4} align={'end'}>
      {
        (type === TransactionTypeEnum.EXPENSE || type === TransactionTypeEnum.TRANSFER)&& (
          <SavingAccountSearchSelect
            label='Откуда'
            value={fromOption}
            onChange={(_, option) => { setFromOption(option); setErrors((prev) => ({ ...prev, fromAccountId: '' })) }}
            invalid={!!errors.fromAccountId}
            errorText={errors.fromAccountId}
          />
        )
      }

      {
        type === TransactionTypeEnum.TRANSFER && (
          <IconButton aria-label='Поменять местами' variant='ghost' size='sm' onClick={handleSwap} mb='4px'>
            <FaArrowRightLong style={{ minWidth: 20, fontSize: 16 }} />
          </IconButton>

        )
      }

      {
        (type === TransactionTypeEnum.INCOME || type === TransactionTypeEnum.TRANSFER) && (
          <SavingAccountSearchSelect
            label='Куда'
            value={toOption}
            onChange={(_, option) => { setToOption(option); setErrors((prev) => ({ ...prev, toAccountId: '' })) }}
            invalid={!!errors.toAccountId}
            errorText={errors.toAccountId}
          />
        )
      }
    </HStack>
  )
}

export default SavingAccountSearchSelectGroup
