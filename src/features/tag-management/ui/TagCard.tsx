import { useAppDispatch } from '@/app/store'
import { deleteTagThunk, TagType } from '@/entities/tag'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseTag from '@/shared/ui/tag'
import { HStack, IconButton, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import EditTagRow from './EditTagRow'

const TagCard = ({ tag }: {tag: TagType}) => {
  const dispatch = useAppDispatch()
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  const [editingId, setEditingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    dispatch(deleteTagThunk(id))
      .unwrap()
      .then(() => showSuccessMessage('Тег удалён'))
      .catch(() => showErrorMessage('Ошибка при удалении тега'))
  }

  if (editingId === tag.id) {
    return (
      <EditTagRow
        key={tag.id}
        tag={tag}
        onClose={() => setEditingId(null)}
      />
    )
  }
  return (
    <HStack width={'100%'} p={2} cursor={'pointer'}>
      <VStack align={'start'} width={'100%'} gap={0}>
        <BaseTag background={tag.color} color={'white'} borderRadius={10} px={3} py={1} fontSize={'sm'}>
          #{tag.name}
        </BaseTag>
      </VStack>
      <HStack gap={1}>
        <IconButton
          aria-label="Редактировать"
          size="xs"
          variant="ghost"
          onClick={() => setEditingId(tag.id)}
        >
          <MdEdit />
        </IconButton>
        <IconButton
          aria-label="Удалить"
          size="xs"
          variant="ghost"
          colorPalette="red"
          onClick={() => handleDelete(tag.id)}
        >
          <MdDelete />
        </IconButton>
      </HStack>
    </HStack>
  )
}

export default TagCard
