import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react'
import { SavingAccountType } from '../types/saving_account.type'
import Progress from '@/components/ui/progress'

type Props = {
  saving: SavingAccountType
}

const SavingAccountCard = ({ saving }: Props) => {
  return (
    <Card.Root width={64} minH={'100%'} _hover={{ cursor: 'pointer', backgroundColor: 'gray.900' }}>
      <Card.Body display={'flex'} flexDirection={'column'} padding={4} gap={4}>
        <HStack width={'100%'} gap={4}>
          <Box minW={10} minH={10} borderRadius={"100%"} backgroundColor={'gray.800'}/>
          <VStack width={'100%'} align={'start'} gap={0}>
            <Text>{saving.name}</Text>
            <Text fontSize={'xs'} color={'gray.400'}>Item {saving.transactionCount}</Text>
          </VStack>
          <Text fontSize={'sm'}>{saving.amount}₽</Text>
        </HStack>
        <Progress remaining={+saving.remaining} spend={+saving.spend} />
      </Card.Body>
    </Card.Root>
  )
}

export default SavingAccountCard
