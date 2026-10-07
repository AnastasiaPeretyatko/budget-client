import { useGetEnvelopesQuery } from '@/entities/envelope/api/envelopesApi'
import BasePopover from '@/shared/ui/popover'
import { IconButton, Text, Input, HStack, VStack, } from '@chakra-ui/react'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'
import { IoIosCheckmark } from 'react-icons/io'

const SavingAccountToggle = () => {
  const router = useRouter()
  const { data: savingAccounts = [] } = useGetEnvelopesQuery()
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

  return (
    <BasePopover TriggerButton={<IconButton size={'xs'} variant={'ghost'} aria-label="Toggle Saving Account"><ChevronDown/></IconButton>}>
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
