import { useAppDispatch, useAppSelector } from '@/app/store'
import { fetchCategoriesThunk, archiveCategoryThunk } from '@/entities/category'
import { useEffect, useState } from 'react'
import { VStack, HStack, Text, IconButton, Spinner, Input } from '@chakra-ui/react'
import { MdArchive, MdEdit, MdAdd } from 'react-icons/md'
import EditCategoryRow from './EditCategoryRow'
import CreateCategoryRow from './CreateCategoryRow'

const CategoryList = () => {
  const dispatch = useAppDispatch()
  const { categories, isLoading } = useAppSelector(state => state.categories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    dispatch(fetchCategoriesThunk(undefined))
  }, [dispatch])

  const handleArchive = (id: string) => {
    dispatch(archiveCategoryThunk(id))
  }

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <VStack align="stretch" gap={3} width="100%">
      <HStack gap={2}>
        <Input
          placeholder="Поиск категорий..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="sm"
          borderRadius={8}
          flex={1}
        />
        <IconButton
          aria-label="Добавить категорию"
          size="sm"
          variant="ghost"
          onClick={() => setIsAdding(prev => !prev)}
        >
          <MdAdd />
        </IconButton>
      </HStack>
      {isAdding && (
        <CreateCategoryRow onCreated={() => setIsAdding(false)} />
      )}
      {filtered.length === 0 && (
        <Text color="gray.500" fontSize="sm">Категории не найдены</Text>
      )}
      {filtered.map(category => (
        editingId === category.id ? (
          <EditCategoryRow
            key={category.id}
            category={category}
            onClose={() => setEditingId(null)}
          />
        ) : (
          <HStack
            key={category.id}
            padding={3}
            borderRadius={8}
            borderWidth="1px"
            borderColor="gray.700"
            justifyContent="space-between"
          >
            <HStack gap={2}>
              {category.icon && <Text fontSize="lg">{category.icon}</Text>}
              <VStack align="start" gap={0}>
                <Text fontWeight={600} fontSize="sm">{category.name}</Text>
                {category.description && (
                  <Text color="gray.500" fontSize="xs">{category.description}</Text>
                )}
              </VStack>
            </HStack>
            <HStack gap={1}>
              <IconButton
                aria-label="Редактировать"
                size="xs"
                variant="ghost"
                onClick={() => setEditingId(category.id)}
              >
                <MdEdit />
              </IconButton>
              <IconButton
                aria-label="В архив"
                size="xs"
                variant="ghost"
                colorPalette="orange"
                onClick={() => handleArchive(category.id)}
              >
                <MdArchive />
              </IconButton>
            </HStack>
          </HStack>
        )
      ))}
    </VStack>
  )
}

export default CategoryList
