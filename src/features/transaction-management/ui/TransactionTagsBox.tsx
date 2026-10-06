import { useGetTagsQuery } from '@/entities/tag/api/tagsApi';
import { Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react';

type Props = {
  tagIds: string[];
  setTagIds: Dispatch<SetStateAction<string[]>>
}

const TransactionTagsBox = ({ tagIds, setTagIds }: Props) => {
  const { data, isLoading } = useGetTagsQuery()

  return (
    <VStack width={'100%'} align={'start'} pt={2}>
      <Heading fontSize={'16px'} textTransform={'uppercase'}>Пользовательские теги</Heading>
      <Flex width={'100%'} flexWrap={'wrap'} gap={2}>
        {
          data?.map(tag => {
            const isActive = tagIds.includes(tag.id)
            return (
              <Button
                key={tag.id}
                variant={'categories'}
                size={'xs'}
                color={tag.color}
                borderColor={tag.color}
                _current={{
                  bg: tag.color,
                  color: 'white'
                }}
                data-current={isActive ? '' : undefined}
                onClick={() => {
                  setTagIds(prev =>
                    prev.includes(tag.id) ?
                      prev.filter(item => item !== tag.id) :
                      [...prev, tag.id])
                }}
              ># {tag.name}</Button>
            )
          })
        }
      </Flex>
    </VStack>
  )
}

export default TransactionTagsBox
