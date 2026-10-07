import { useUpdateCategoriesMutation } from '@/entities/category/api/categoriesApi'
import { CategoryType, CreateCategoryDto, MacroFundEnum } from '@/entities/category'
import { CATEGORY_COLORS } from '@/entities/category/constants/category-colors'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { ICON_NAMES } from '@/shared/ui/icon-picker'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, IconButton, Text, VStack } from '@chakra-ui/react'
import { Archive, Pen } from 'lucide-react'
import React from 'react'
import CategoryArchiveDialog from './CategoryArchiveDialog'
import CategoryForm from './CategoryForm'

type Props = {
  category: CategoryType
}

const CategoriesEditModal = ({ category }: Props) => {
  const [updateCategory, { isLoading }] = useUpdateCategoriesMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()

  const handleUpdate = async (data: CreateCategoryDto) => {
    try {
      await updateCategory({ id: category.id, data }).unwrap()
      setIsOpen.off()
      showSuccessMessage('Категория успешно обновлена')
    } catch (error) {
      showErrorMessage('Ошибка при обновлении категории', error)
    }
  }

  return (
    <BaseModalV2
      size='lg'
      trigger={<IconButton size={'xs'} variant={'secondary'}><Pen/></IconButton>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <VStack width={'100%'} align={'start'} gap={1} mb={2}>
        <Heading size={'md'}>Редактирование категории</Heading>
        <Text fontSize={'sm'} color={'label'}>
          Параметры бюджетного лимита и автоматического распределения
        </Text>
      </VStack>
      <CategoryForm
        defaultValues={{
          name: category.name,
          // у старых категорий в icon может лежать эмодзи, а не имя иконки
          icon: ICON_NAMES.find(name => name === category.icon) ?? 'Wallet',
          color: category.color ?? CATEGORY_COLORS[0],
          macroFund: category.macroFund ?? MacroFundEnum.ESSENTIALS,
          defaultLimit: category.defaultLimit ?? '',
          rolloverToReserve: category.rolloverToReserve ?? false,
          allowOverspendFromFund: category.allowOverspendFromFund ?? false,
        }}
        onSubmit={handleUpdate}
        onCancel={setIsOpen.off}
        isLoading={isLoading}
        submitText='Сохранить изменения'
        archiveButton={
          <CategoryArchiveDialog
            id={category.id}
            trigger={<Button variant={'unstyle'} color={'red.500'}><Archive/> В архив</Button>}
          />
        }
      />
    </BaseModalV2>
  )
}

export default CategoriesEditModal
