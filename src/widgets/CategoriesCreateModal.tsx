import { useAddCategoriesMutation } from '@/entities/category/api/categoriesApi'
import { CreateCategoryDto } from '@/entities/category'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import CategoryForm from './CategoryForm'

const CategoriesCreateModal = () => {
  const [addCategory, { isLoading }] = useAddCategoriesMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()

  const handleCreate = async (data: CreateCategoryDto) => {
    try {
      await addCategory(data).unwrap()
      setIsOpen.off()
      showSuccessMessage('Категория успешно создана')
    } catch {
      showErrorMessage('Ошибка при создании категории')
    }
  }

  return (
    <BaseModalV2
      size='lg'
      trigger={<Button variant={'primary'}>Новая категория</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <VStack width={'100%'} align={'start'} gap={1} mb={2}>
        <Heading size={'md'}>Создание категории</Heading>
        <Text fontSize={'sm'} color={'label'}>
          Параметры бюджетного лимита и автоматического распределения
        </Text>
      </VStack>
      <CategoryForm
        onSubmit={handleCreate}
        onCancel={setIsOpen.off}
        isLoading={isLoading}
        submitText='Создать категорию'
      />
    </BaseModalV2>
  )
}

export default CategoriesCreateModal
