import { COLOR } from '@/shared/config/colors'
import { Card, Heading, Text } from '@chakra-ui/react'

type Props = {
  daysNumber: number
}

const DaysBeforeStartMonthCard = ({ daysNumber }: Props) => {
  return (
    <Card.Root width={'100%'}>
      <Card.Body display={'flex'} flexDir={'column'} gap={2}>
        <Text color={COLOR.LABEL} fontWeight={500} fontSize={'sm'}>Days Before Salary</Text>
        <Heading>{daysNumber} days</Heading>
      </Card.Body>
    </Card.Root>
  )
}

export default DaysBeforeStartMonthCard
