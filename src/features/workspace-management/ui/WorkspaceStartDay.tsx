import { Heading, Input, Text, VStack } from '@chakra-ui/react'
import  { useState } from 'react'

const WorkspaceStartDay = () => {
  const [day, setDay] = useState<number>()

  return (
    <VStack width={'100%'} align={'start'} gap={4}>
      <VStack align={'start'} gap={0}>
        <Heading fontSize={'18px'}>День зарплаты</Heading>
        <Text fontSize={'sm'} color={'label'}>Аналитические данные рассчитываются за один месяц,
        начиная с даты выплаты зарплаты.</Text>
      </VStack>
      <Input variant={'primary'} placeholder='Введите день' type='number' value={day} onChange={e => setDay(+e.target.value)} max={31}/>
    </VStack>
  )
}

export default WorkspaceStartDay
