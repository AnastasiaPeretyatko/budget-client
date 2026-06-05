import { COLOR } from '@/shared/config/colors'
import BaseTag from '@/shared/ui/tag'
import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const WorkspaceBanner = () => {
  return (
    <VStack width={'100%'} align={'start'} bgColor={COLOR.BACKGROUND} padding={6} borderRadius={10} gap={2}>
      <Heading size={'sm'}>📚 Что такое рабочие пространства?</Heading>
      <Text color={COLOR.LABEL} fontSize={'sm'}>
        Рабочие пространства помогают разделять ваши финансы по целям:
      </Text>
      <HStack>
        <BaseTag>Личные финансы</BaseTag>
        <BaseTag>Отпуск</BaseTag>
        <BaseTag>Покупки</BaseTag>
        <BaseTag>Хобби</BaseTag>
        <BaseTag>Инвестиции</BaseTag>
        <BaseTag>и другое</BaseTag>
      </HStack>
    </VStack>
  )
}

export default WorkspaceBanner
