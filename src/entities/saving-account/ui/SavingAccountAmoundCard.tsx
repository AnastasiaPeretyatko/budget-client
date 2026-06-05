import { COLOR } from '@/shared/config/colors'
import { Card, Heading, Text } from '@chakra-ui/react'

type Props = {
  savingAccountAmound: string
}

const SavingAccountAmoundCard = ({ savingAccountAmound }: Props) => {
  return (
    <Card.Root width={'100%'}>
      <Card.Body display={'flex'} flexDir={'column'} gap={2}>
        <Text color={COLOR.LABEL} fontWeight={500} fontSize={'sm'}>Expected Balabce</Text>
        <Heading>{savingAccountAmound} ₽</Heading>
      </Card.Body>
    </Card.Root>
  )
}

export default SavingAccountAmoundCard
