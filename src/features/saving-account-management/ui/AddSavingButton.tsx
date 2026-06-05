import { Card } from '@chakra-ui/react'
import React from 'react'

const AddSavingButton = () => {
  return (
    <Card.Root width={64} minH={'100%'} _hover={{ cursor: 'pointer', backgroundColor: 'gray.900' }}>
      <Card.Body alignItems={'center'} justifyContent={'center'} fontSize={'4xl'} color={'gray.600'}>
            +
      </Card.Body>
    </Card.Root>
  )
}

export default AddSavingButton
