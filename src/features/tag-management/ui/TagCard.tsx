import { TagType } from '@/entities/tag'
import { COLOR } from '@/shared/config/colors'
import BaseTag from '@/shared/ui/tag'
import { Button, HStack, Text, VStack } from '@chakra-ui/react'

const TagCard = ({ tag }: {tag: TagType}) => {
  return (
    <HStack width={'100%'} p={2} cursor={'pointer'}>
      <VStack align={'start'} width={'100%'} gap={0}>
        <BaseTag colorPalette={tag.color}>{tag.name}</BaseTag>
      </VStack>
      <HStack gap={0}>
        <Text fontSize={'sm'} color={COLOR.LABEL}>24</Text>
        <Button size={'sm'} color={COLOR.LABEL} variant={'ghost'}>{'>'}</Button>
      </HStack>
    </HStack>
  )
}

export default TagCard
