import { Badge, Box, Button, Card, Heading, HStack, Text } from '@chakra-ui/react'
import { SavingAccountType } from '../types/saving-account.type'
import { Utensils } from 'lucide-react'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import Progress from '@/shared/ui/progress'
import { useRouter } from 'next/router'
import { AddTransactionModal } from '@/features/transaction-management'

type Props = {
  savingAccount: SavingAccountType
}

const SavingAccountCard = ({ savingAccount }: Props) => {
  const router = useRouter()
  const periodExpense = Number(savingAccount.periodExpense)
  const periodMax = Number(savingAccount.periodStartBalance) + Number(savingAccount.periodIncome)

  return (
    <Card.Root variant={'primary'} gap={4}>
      <HStack width={'100%'}>
        <Box p={'8px'} bg={'#FFF1F2'} borderRadius={'12px'}><Utensils size={'16px'}/></Box>
        <Heading cursor={'pointer'} flex={1} fontSize={'12px'} fontWeight={'bold'} onClick={() => router.push(`/budgets/${savingAccount.id}`)}>{savingAccount.name}</Heading>
        {savingAccount.isSafe && <Badge>Сейф</Badge>}
      </HStack>
      <Box>
        <Text fontSize={'12px'} color={'#94A3B8'}>Осталось в конверте:</Text>
        <Heading fontSize={'20px'}>{formattingMonay(savingAccount.amount)} <Text as={'span'} fontSize={'12px'} color={'#94A3B8'}>₽</Text></Heading>
        <Progress spend={periodExpense} remaining={periodMax}/>
      </Box>
      <HStack width={'100%'}>
        <Button variant={'secondary'} onClick={e => e.stopPropagation()}>Расход</Button>
        <AddTransactionModal envelope={savingAccount} nameButton='Перевести'/>
      </HStack>

    </Card.Root>
  )
}

export default SavingAccountCard
