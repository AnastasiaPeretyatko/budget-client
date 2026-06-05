import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react'
import { SavingAccountType } from '../types/saving-account.type'
import Progress from '@/shared/ui/progress'

type Props = {
  savingAccount: SavingAccountType
  onClick?: (id: string) => void
}

const SavingAccountCard = ({ savingAccount, onClick }: Props) => {
  return (
    <Card.Root width="100%" minW={72} minH={'100%'} _hover={{ cursor: 'pointer', backgroundColor: 'gray.900' }} onClick={() => onClick && onClick(savingAccount.id)}>
      <Card.Body display={'flex'} flexDirection={'column'} padding={4} gap={4}>
        <HStack width={'100%'} gap={4}>
          <Box minW={10} minH={10} borderRadius={"100%"} backgroundColor={'gray.800'}/>
          <VStack width={'100%'} align={'start'} gap={0}>
            <Text>{savingAccount.name}</Text>
            <Text fontSize={'xs'} color={'gray.400'}>Item {savingAccount.transactionCount}</Text>
          </VStack>
          <Text fontSize={'sm'}>{savingAccount.amount}₽</Text>
        </HStack>
        <Progress remaining={+savingAccount.remaining} spend={+savingAccount.spend} />
      </Card.Body>
    </Card.Root>
  )
}

export default SavingAccountCard
