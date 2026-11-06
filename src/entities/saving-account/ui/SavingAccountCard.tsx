import { Badge, Box, Button, Card, Heading, HStack, IconButton, Text } from '@chakra-ui/react'
import { GripVertical, Utensils } from 'lucide-react'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import Progress from '@/shared/ui/progress'
import { useRouter } from 'next/router'
import { AddTransactionModal } from '@/features/transaction-management'
import { useSortable } from '@dnd-kit/react/sortable';
import { EnvelopesType } from '@/entities/envelope/types/envelopes.type'

type Props = {
  savingAccount: EnvelopesType
}

const SavingAccountCard = ({ savingAccount }: Props) => {
  const router = useRouter()
  const { ref, handleRef } = useSortable({ id: savingAccount.id, index: savingAccount.index })

  const periodExpense = Number(savingAccount.periodExpense)
  const periodMax = Number(savingAccount.periodStartBalance) + Number(savingAccount.periodIncome)

  return (
    <Card.Root ref={ref} variant={'primary'} gap={4}>
      <HStack width={'100%'}>
        <Box p={'8px'} bg={'#FFF1F2'} borderRadius={'12px'}><Utensils size={'16px'}/></Box>
        <Heading cursor={'pointer'} flex={1} fontSize={'12px'} fontWeight={'bold'} onClick={() => router.push(`/budgets/${savingAccount.id}`)}>{savingAccount.name}</Heading>
        {savingAccount.isSafe && <Badge>Сейф</Badge>}
        <IconButton ref={handleRef} variant={'unstyle'}><GripVertical width={20}/></IconButton>
      </HStack>
      <Box>
        <Text fontSize={'12px'} color={'#94A3B8'}>Осталось в конверте:</Text>
        <Heading fontSize={'20px'}>{formattingMonay(savingAccount.amount)}</Heading>
        <Progress spend={periodExpense} remaining={periodMax}/>
      </Box>
      <HStack width={'100%'}>
        <Button flex={1} variant={'secondary'} onClick={e => e.stopPropagation()} disabled>Расход</Button>
        <AddTransactionModal envelope={savingAccount} nameButton='Перевести'/>
      </HStack>

    </Card.Root>
  )
}

export default SavingAccountCard
