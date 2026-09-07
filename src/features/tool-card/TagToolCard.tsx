import { useAppDispatch, useAppSelector } from '@/app/store'
import { COLOR } from '@/shared/config/colors'
import { Button, Card, Flex, HStack, Input, Link, Spinner, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchTagsThunk } from '@/entities/tag'
import TagCard from '../tag-management/ui/TagCard'
import { TbTags } from 'react-icons/tb'
import CreateTagRow from '../tag-management/ui/CreateTagRow'

const TagToolCard = () => {
  const dispatch = useAppDispatch()

  const { tags, isLoading } = useAppSelector(state => state.tags)

  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    dispatch(fetchTagsThunk(undefined))
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Card.Root p={2} display={'flex'} flexDir={'column'} gap={4} alignItems={'center'}>
      <VStack height={'100%'} width={'100%'}>
        <HStack width={'100%'} gap={4}>
          <Flex justify={'center'} align={'center'} p={4} borderRadius={10} background={COLOR.INCOME_TEXT} color={'white'}><TbTags/></Flex>
          <VStack align={'start'} gap={0} width={'100%'}>
            <Text>Теги</Text>
            <Text fontSize={'sm'} color={COLOR.LABEL}>12 тегов</Text>
          </VStack>
          <Button size={'sm'} variant={'subtle'} onClick={() => setIsAdding(true)}>
            + Добавить
          </Button>
        </HStack>
        <Input placeholder='Поиск категории...'/>

        <VStack width={'100%'} borderRadius={4}>
          {isAdding && (
            <CreateTagRow onCreated={() => setIsAdding(false)} />
          )}
          {tags.map(tag => <TagCard  key={tag.id}  tag={tag}/>)}
        </VStack>
      </VStack>
      <Link color={'blue.400'}>Посмотреть все теги</Link>
    </Card.Root>
  )
}

export default TagToolCard
