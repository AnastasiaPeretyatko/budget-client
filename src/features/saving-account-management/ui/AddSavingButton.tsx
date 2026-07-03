import { Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { COLOR } from '@/shared/config/colors'

const AddSavingButton = () => {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      borderRadius={'2xl'}
      border={`2px dashed ${COLOR.BORDER}`}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      color={'gray.500'}
      _hover={{ cursor: 'pointer', borderColor: COLOR.PRIMARY_COLOR, color: COLOR.PRIMARY_COLOR }}
      transition={'all 0.2s'}
    >
      <VStack gap={2}>
        <Text fontSize={'2xl'} lineHeight={1}>+</Text>
        <Text fontSize={'sm'}>Создать накопительный</Text>
      </VStack>
    </Box>
  )
}

export default AddSavingButton
