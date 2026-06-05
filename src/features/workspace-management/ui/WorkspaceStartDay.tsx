import { Heading, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const WorkspaceStartDay = () => {
  const [day, setDay] = useState<number>()

  return (
    <VStack width={'100%'} align={'start'}>
      <Heading>Salary Day</Heading>
      <Text>Analitics are calculated for one month, starting from the salary day</Text>
      <Input type='number' value={day} onChange={e => setDay(+e.target.value)} max={31}/>
    </VStack>
  )
}

export default WorkspaceStartDay
