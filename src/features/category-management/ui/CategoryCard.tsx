import { useAppDispatch } from '@/app/store'
import { archiveCategoryThunk, CategoryType } from '@/entities/category'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { MdArchive, MdEdit } from 'react-icons/md'
import EditCategoryRow from './EditCategoryRow'

const CategoryCard = ({ category }: {category: CategoryType}) => {
  const dispatch = useAppDispatch()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleArchive = (id: string) => {
    dispatch(archiveCategoryThunk(id)).unwrap()
      .then(() => {
        showSuccessMessage('Категория успешно отправлена в архив')
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        showErrorMessage(error.message || 'Ошибка при архивировании категории')
      })
  }

  if (editingId === category.id) {
    return (
      <EditCategoryRow
        key={category.id}
        category={category}
        onClose={() => setEditingId(null)}
      />
    )
  }

  return (
    <HStack width={'100%'} p={2} cursor={'pointer'}>
      <Flex justify={'center'} align={'center'} p={2}>
        {category.icon && <Text fontSize="lg">{category.icon}</Text>}
      </Flex>

      <VStack align={'start'} width={'100%'} gap={0}>
        <Text>{category.name}</Text>
      </VStack>

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
}

export default CategoryCard
