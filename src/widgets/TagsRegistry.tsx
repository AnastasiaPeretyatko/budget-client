import { TagWithStatsType } from '@/entities/tag'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { Box, Card, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import TagDeleteDialog from './TagDeleteDialog'
import TagEditModal from './TagEditModal'

const pluralTransactions = (n: number) => {
  const abs = Math.abs(n)
  if (abs % 10 === 1 && abs % 100 !== 11) return 'транзакция'
  if (abs % 10 >= 2 && abs % 10 <= 4 && (abs % 100 < 10 || abs % 100 >= 20)) return 'транзакции'
  return 'транзакций'
}

type Props = {
  tags: TagWithStatsType[]
}

const TagsRegistry = ({ tags }: Props) => {
  return (
    <Card.Root width={'100%'} variant={'primary'} gap={4}>
      <HStack width={'100%'} justify={'space-between'}>
        <Heading size={'md'}>Реестр меток ({tags.length} активных)</Heading>
        <Text fontSize={'12px'} color={'label'}>Сортировка: по частоте применения</Text>
      </HStack>

      {tags.length === 0 && <Text color={'label'}>Тегов пока нет</Text>}

      <Grid width={'100%'} templateColumns={'repeat(2, 1fr)'} gap={3}>
        {tags.map(tag => (
          <HStack
            key={tag.id}
            justify={'space-between'}
            p={3}
            borderRadius={12}
            borderWidth={'1px'}
            borderColor={'#E2E8F0'}
            bg={'#F8FAFC'}
          >
            <HStack gap={3}>
              <Box
                px={2}
                py={1}
                borderRadius={'8px'}
                fontSize={'12px'}
                fontWeight={700}
                bg={tag.color + '30'}
                color={tag.color}
              >
                #{tag.name}
              </Box>
              <VStack align={'start'} gap={0}>
                <Text fontSize={'11px'} fontWeight={600}>
                  {tag.transactionCount} {pluralTransactions(tag.transactionCount)}
                </Text>
                {tag.periodAmount !== null && (
                  <Text fontSize={'11px'} color={'label'}>
                    {formattingMonay(tag.periodAmount)} за {tag.periodDays ? `${tag.periodDays} дн.` : 'период'}
                  </Text>
                )}
              </VStack>
            </HStack>
            <HStack gap={0}>
              <TagEditModal tag={tag} />
              <TagDeleteDialog tag={tag} />
            </HStack>
          </HStack>
        ))}
      </Grid>
    </Card.Root>
  )
}

export default TagsRegistry
