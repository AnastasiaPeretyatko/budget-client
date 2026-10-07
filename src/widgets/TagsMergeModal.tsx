import { useMergeTagsMutation } from '@/entities/tag/api/tagsApi'
import { TagWithStatsType } from '@/entities/tag'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import Label from '@/shared/ui/label'
import { Button, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

type TagChipsProps = {
  tags: TagWithStatsType[]
  selectedIds: (string | null)[]
  disabledIds?: (string | null)[]
  onToggle: (id: string) => void
}

const TagChips = ({ tags, selectedIds, disabledIds = [], onToggle }: TagChipsProps) => (
  <Flex width={'100%'} flexWrap={'wrap'} gap={2}>
    {tags.map(tag => (
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
        data-current={selectedIds.includes(tag.id) ? '' : undefined}
        disabled={disabledIds.includes(tag.id)}
        onClick={() => onToggle(tag.id)}
      ># {tag.name}</Button>
    ))}
  </Flex>
)

type FormProps = {
  tags: TagWithStatsType[]
  onClose: () => void
}

const TagsMergeForm = ({ tags, onClose }: FormProps) => {
  const [mergeTags, { isLoading }] = useMergeTagsMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [sourceIds, setSourceIds] = useState<string[]>([])
  const [targetId, setTargetId] = useState<string | null>(null)

  const toggleSource = (id: string) => {
    setSourceIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const selectTarget = (id: string) => {
    setTargetId(prev => prev === id ? null : id)
    setSourceIds(prev => prev.filter(item => item !== id))
  }

  const handleMerge = async () => {
    if (!targetId) return

    try {
      const { mergedTags, movedTransactions } = await mergeTags({ sourceIds, targetId }).unwrap()
      showSuccessMessage(`Объединено тегов: ${mergedTags}, перенесено транзакций: ${movedTransactions}`)
      onClose()
    } catch {
      showErrorMessage('Ошибка при объединении тегов')
    }
  }

  return (
    <>
      <VStack width={'100%'} align={'start'} gap={1} mb={2}>
        <Heading size={'md'}>Объединение тегов</Heading>
        <Text fontSize={'sm'} color={'label'}>
          Транзакции выбранных тегов перейдут на итоговый тег, а сами теги будут удалены.
        </Text>
      </VStack>
      <VStack width={'100%'} align={'start'}>
        <Label color={'#64748B'}>Какие теги объединить:</Label>
        <TagChips
          tags={tags}
          selectedIds={sourceIds}
          disabledIds={[targetId]}
          onToggle={toggleSource}
        />
      </VStack>
      <VStack width={'100%'} align={'start'}>
        <Label color={'#64748B'}>В какой тег:</Label>
        <TagChips tags={tags} selectedIds={[targetId]} onToggle={selectTarget} />
      </VStack>
      <HStack width={'100%'} justify={'end'}>
        <Button variant={'secondary'} onClick={onClose}>Отмена</Button>
        <Button
          variant={'primary'}
          onClick={handleMerge}
          loading={isLoading}
          disabled={!sourceIds.length || !targetId}
        >
          Объединить
        </Button>
      </HStack>
    </>
  )
}

type Props = {
  tags: TagWithStatsType[]
}

const TagsMergeModal = ({ tags }: Props) => {
  const [isOpen, setIsOpen] = useBoolean()

  return (
    <BaseModalV2
      size='lg'
      trigger={<Button variant={'secondary'}>Объединить теги</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <TagsMergeForm tags={tags} onClose={setIsOpen.off} />
    </BaseModalV2>
  )
}

export default TagsMergeModal
