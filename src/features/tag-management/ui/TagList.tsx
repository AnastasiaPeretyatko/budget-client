import { useAppDispatch, useAppSelector } from '@/app/store'
import { fetchTagsThunk, deleteTagThunk } from '@/entities/tag'
import { useEffect, useState } from 'react'
import { VStack, HStack, Text, IconButton, Spinner, Input, Box } from '@chakra-ui/react'
import { MdDelete, MdEdit, MdAdd } from 'react-icons/md'
import EditTagRow from './EditTagRow'
import CreateTagRow from './CreateTagRow'
import { useNotifications } from '@/shared/hooks/useNotifications'

const TagList = () => {
  const dispatch = useAppDispatch()
  const { showSuccessMessage, showErrorMessage } = useNotifications()
  const { tags, isLoading } = useAppSelector(state => state.tags)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    dispatch(fetchTagsThunk(undefined))
  }, [dispatch])

  const handleDelete = (id: string) => {
    dispatch(deleteTagThunk(id))
      .unwrap()
      .then(() => showSuccessMessage('Тег удалён'))
      .catch(() => showErrorMessage('Ошибка при удалении тега'))
  }

  const filtered = tags.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <VStack align="stretch" gap={3} width="100%">
      <HStack gap={2}>
        <Input
          placeholder="Поиск тегов..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="sm"
          borderRadius={8}
          flex={1}
        />
        <IconButton
          aria-label="Добавить тег"
          size="sm"
          variant="ghost"
          onClick={() => setIsAdding(prev => !prev)}
        >
          <MdAdd />
        </IconButton>
      </HStack>
      {isAdding && (
        <CreateTagRow onCreated={() => setIsAdding(false)} />
      )}
      {filtered.length === 0 && (
        <Text color="gray.500" fontSize="sm">Теги не найдены</Text>
      )}
      {filtered.map(tag => (
        editingId === tag.id ? (
          <EditTagRow
            key={tag.id}
            tag={tag}
            onClose={() => setEditingId(null)}
          />
        ) : (
          <HStack
            key={tag.id}
            padding={3}
            borderRadius={8}
            borderWidth="1px"
            borderColor="gray.700"
            justifyContent="space-between"
          >
            <HStack gap={2}>
              <Box
                width="14px"
                height="14px"
                borderRadius="full"
                flexShrink={0}
                style={{ backgroundColor: tag.color }}
              />
              <Text fontWeight={600} fontSize="sm">{tag.name}</Text>
            </HStack>
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
      ))}
    </VStack>
  )
}

export default TagList
