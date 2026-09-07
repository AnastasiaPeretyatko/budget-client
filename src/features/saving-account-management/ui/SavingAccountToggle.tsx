import { RootState, useAppDispatch } from '@/app/store'
import { fetchSavingAccountsThunk } from '@/entities/saving-account'
import BasePopover from '@/shared/ui/popover'
import { IconButton, Text, Input, HStack, VStack, } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import { IoIosCheckmark } from 'react-icons/io'
import { useSelector } from 'react-redux'

const SavingAccountToggle = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { savingAccounts } = useSelector((state: RootState) => state.savingAccounts);
  const [search, setSearch] = React.useState('');

  // eslint-disable-next-line max-len
  const [selectedAccountId, setSelectedAccountId] = React.useState<string | null>(router.query.id as string | null);

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccountId(accountId);
    router.push(`/budgets/${accountId}`);
  };

  // eslint-disable-next-line max-len
  const listItems = savingAccounts.reduce((acc: { label: string; value: string; onClick: () => void }[], account) => {
    if (account.name.toLowerCase().includes(search.toLowerCase())) {
      acc.push({
        label: account.name,
        value: account.id,
        onClick: () => handleSelectAccount(account.id),
      });
    }
    return acc;
  }, []);

  useEffect(() => {
    if (savingAccounts.length === 0) {
      dispatch(fetchSavingAccountsThunk());
    }
  }, [dispatch, savingAccounts.length]);

  return (
    <BasePopover TriggerButton={<IconButton size={'xs'} variant={'ghost'} aria-label="Toggle Saving Account"><FaAngleDown/></IconButton>}>
      <VStack width={'100%'} align={'start'}>
        <Text>Выберите счет</Text>
        <Input size={'xs'} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск счета..." />
        <VStack width={'100%'} maxHeight={'200px'} overflowY={'auto'} gap={0}>
          {listItems.map(item => (
            <HStack
              width={'100%'}
              p={1}
              key={item.value}
              onClick={item.onClick}
              cursor={'pointer'}
              _notLast={{
                borderBottom: '1px solid #e4e4e7'
              }}
            >{item.label} {item.value === selectedAccountId && <IoIosCheckmark/>}</HStack>
          ))}
        </VStack>
      </VStack>
    </BasePopover>
  )
}

export default SavingAccountToggle
